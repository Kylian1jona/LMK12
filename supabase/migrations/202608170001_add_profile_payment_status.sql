alter table public.learnmaster_profiles add column if not exists first_name text not null default '';
alter table public.learnmaster_profiles add column if not exists last_name text not null default '';
alter table public.learnmaster_profiles add column if not exists payment_status text not null default 'pending';
alter table public.learnmaster_profiles add column if not exists payment_due_on date;
alter table public.learnmaster_profiles add column if not exists payment_status_updated_at timestamptz not null default now();

update public.learnmaster_profiles
set first_name = coalesce(first_name, ''),
    last_name = coalesce(last_name, ''),
    payment_status = case
      when payment_status in ('active', 'pending', 'late', 'suspended') then payment_status
      else 'pending'
    end,
    payment_status_updated_at = coalesce(payment_status_updated_at, pg_catalog.now())
where first_name is null
   or last_name is null
   or payment_status is null
   or payment_status not in ('active', 'pending', 'late', 'suspended')
   or payment_status_updated_at is null;

alter table public.learnmaster_profiles alter column first_name set default '';
alter table public.learnmaster_profiles alter column first_name set not null;
alter table public.learnmaster_profiles alter column last_name set default '';
alter table public.learnmaster_profiles alter column last_name set not null;
alter table public.learnmaster_profiles alter column payment_status set default 'pending';
alter table public.learnmaster_profiles alter column payment_status set not null;
alter table public.learnmaster_profiles alter column payment_status_updated_at set default now();
alter table public.learnmaster_profiles alter column payment_status_updated_at set not null;

do $$
begin
  if not exists (
    select 1
    from pg_catalog.pg_constraint
    where conname = 'learnmaster_profiles_payment_status_check'
      and conrelid = 'public.learnmaster_profiles'::pg_catalog.regclass
  ) then
    alter table public.learnmaster_profiles
      add constraint learnmaster_profiles_payment_status_check
      check (payment_status in ('active', 'pending', 'late', 'suspended'));
  end if;
end;
$$;

create or replace function public.protect_learnmaster_admin_role()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if current_user not in ('postgres', 'service_role', 'supabase_admin') then
    if tg_op = 'INSERT' then
      new.is_admin := false;
      new.payment_status := 'pending';
      new.payment_due_on := null;
      new.payment_status_updated_at := pg_catalog.now();
    elsif new.is_admin is distinct from old.is_admin
       or new.payment_status is distinct from old.payment_status
       or new.payment_due_on is distinct from old.payment_due_on
       or new.payment_status_updated_at is distinct from old.payment_status_updated_at then
      raise exception 'administrator and payment fields can only be changed by a trusted server role'
        using errcode = '42501';
    end if;
  end if;
  return new;
end;
$$;

drop trigger if exists protect_learnmaster_admin_role on public.learnmaster_profiles;
create trigger protect_learnmaster_admin_role
before insert or update on public.learnmaster_profiles
for each row execute procedure public.protect_learnmaster_admin_role();

create or replace function public.learnmaster_admin_summary()
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
begin
  if auth.uid() is null or not exists (
    select 1
    from public.learnmaster_profiles as admin_profile
    where admin_profile.user_id = auth.uid()
      and admin_profile.is_admin = true
  ) then
    raise exception 'administrator access required' using errcode = '42501';
  end if;

  return pg_catalog.jsonb_build_object(
    'accounts', (select count(*) from public.learnmaster_profiles),
    'learners', (select count(*) from public.learnmaster_profiles),
    'consents', (select count(*) from public.learnmaster_parent_consents),
    'active_accounts', (select count(*) from public.learnmaster_profiles where payment_status = 'active'),
    'pending_accounts', (select count(*) from public.learnmaster_profiles where payment_status = 'pending'),
    'late_accounts', (select count(*) from public.learnmaster_profiles where payment_status = 'late'),
    'suspended_accounts', (select count(*) from public.learnmaster_profiles where payment_status = 'suspended')
  );
end;
$$;
revoke all on function public.learnmaster_admin_summary() from public;
grant execute on function public.learnmaster_admin_summary() to authenticated;

create or replace function public.learnmaster_admin_payment_accounts()
returns table (
  user_id uuid,
  email text,
  username text,
  display_name text,
  first_name text,
  last_name text,
  payment_status text,
  payment_due_on date,
  payment_status_updated_at timestamptz,
  total_days_late integer,
  months_late integer,
  remaining_days_late integer
)
language plpgsql
security definer
set search_path = ''
as $$
begin
  if auth.uid() is null or not exists (
    select 1
    from public.learnmaster_profiles as admin_profile
    where admin_profile.user_id = auth.uid()
      and admin_profile.is_admin = true
  ) then
    raise exception 'administrator access required' using errcode = '42501';
  end if;

  return query
  select
    profile.user_id,
    profile.email,
    profile.username,
    profile.display_name,
    profile.first_name,
    profile.last_name,
    profile.payment_status,
    profile.payment_due_on,
    profile.payment_status_updated_at,
    lateness.total_days_late,
    (lateness.total_days_late / 30)::integer as months_late,
    (lateness.total_days_late % 30)::integer as remaining_days_late
  from public.learnmaster_profiles as profile
  cross join lateral (
    select case
      when profile.payment_due_on is not null and profile.payment_due_on < current_date
        then (current_date - profile.payment_due_on)::integer
      else 0
    end as total_days_late
  ) as lateness
  order by
    pg_catalog.lower(coalesce(nullif(profile.last_name, ''), profile.username)),
    pg_catalog.lower(coalesce(nullif(profile.first_name, ''), profile.username)),
    profile.created_at;
end;
$$;
revoke all on function public.learnmaster_admin_payment_accounts() from public;
grant execute on function public.learnmaster_admin_payment_accounts() to authenticated;

create or replace function public.learnmaster_admin_update_payment(
  account_user_id uuid,
  new_status text,
  new_due_on date
)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  normalized_status text := pg_catalog.lower(pg_catalog.btrim(new_status));
  updated_profile public.learnmaster_profiles%rowtype;
  late_days integer;
begin
  if auth.uid() is null or not exists (
    select 1
    from public.learnmaster_profiles as admin_profile
    where admin_profile.user_id = auth.uid()
      and admin_profile.is_admin = true
  ) then
    raise exception 'administrator access required' using errcode = '42501';
  end if;

  if normalized_status is null
     or normalized_status not in ('active', 'pending', 'late', 'suspended') then
    raise exception 'invalid payment status' using errcode = '22023';
  end if;

  update public.learnmaster_profiles
  set payment_status = normalized_status,
      payment_due_on = new_due_on,
      payment_status_updated_at = pg_catalog.now(),
      updated_at = pg_catalog.now()
  where user_id = account_user_id
  returning * into updated_profile;

  if not found then
    raise exception 'LearnMaster account not found' using errcode = 'P0002';
  end if;

  late_days := case
    when updated_profile.payment_due_on is not null
         and updated_profile.payment_due_on < current_date
      then (current_date - updated_profile.payment_due_on)::integer
    else 0
  end;

  return pg_catalog.jsonb_build_object(
    'user_id', updated_profile.user_id,
    'payment_status', updated_profile.payment_status,
    'payment_due_on', updated_profile.payment_due_on,
    'payment_status_updated_at', updated_profile.payment_status_updated_at,
    'total_days_late', late_days,
    'months_late', (late_days / 30)::integer,
    'remaining_days_late', (late_days % 30)::integer
  );
end;
$$;
revoke all on function public.learnmaster_admin_update_payment(uuid, text, date) from public;
grant execute on function public.learnmaster_admin_update_payment(uuid, text, date) to authenticated;

create or replace function public.create_learnmaster_profile()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  profile_username text;
  profile_first_name text;
  profile_last_name text;
  profile_display_name text;
begin
  profile_username := coalesce(
    nullif(pg_catalog.btrim(new.raw_user_meta_data ->> 'username'), ''),
    nullif(pg_catalog.split_part(coalesce(new.email, ''), '@', 1), ''),
    'learner'
  );
  profile_first_name := coalesce(
    nullif(pg_catalog.btrim(new.raw_user_meta_data ->> 'first_name'), ''),
    ''
  );
  profile_last_name := coalesce(
    nullif(pg_catalog.btrim(new.raw_user_meta_data ->> 'last_name'), ''),
    ''
  );
  profile_display_name := coalesce(
    nullif(pg_catalog.btrim(new.raw_user_meta_data ->> 'display_name'), ''),
    nullif(pg_catalog.btrim(pg_catalog.concat_ws(' ', profile_first_name, profile_last_name)), ''),
    profile_username,
    'Learner'
  );

  insert into public.learnmaster_profiles as profile (
    user_id,
    email,
    username,
    display_name,
    first_name,
    last_name
  )
  values (
    new.id,
    new.email,
    profile_username,
    profile_display_name,
    profile_first_name,
    profile_last_name
  )
  on conflict (user_id) do update set
    email = excluded.email,
    username = excluded.username,
    display_name = excluded.display_name,
    first_name = coalesce(nullif(excluded.first_name, ''), profile.first_name),
    last_name = coalesce(nullif(excluded.last_name, ''), profile.last_name),
    updated_at = pg_catalog.now();
  return new;
end;
$$;
revoke all on function public.create_learnmaster_profile() from public;

drop trigger if exists on_learnmaster_user_created on auth.users;
create trigger on_learnmaster_user_created
after insert or update of raw_user_meta_data, email on auth.users
for each row execute procedure public.create_learnmaster_profile();

insert into public.learnmaster_profiles as profile (
  user_id,
  email,
  username,
  display_name,
  first_name,
  last_name
)
select
  users.id,
  users.email,
  coalesce(
    nullif(pg_catalog.btrim(users.raw_user_meta_data ->> 'username'), ''),
    nullif(pg_catalog.split_part(coalesce(users.email, ''), '@', 1), ''),
    'learner'
  ),
  coalesce(
    nullif(pg_catalog.btrim(users.raw_user_meta_data ->> 'display_name'), ''),
    nullif(pg_catalog.btrim(pg_catalog.concat_ws(
      ' ',
      nullif(pg_catalog.btrim(users.raw_user_meta_data ->> 'first_name'), ''),
      nullif(pg_catalog.btrim(users.raw_user_meta_data ->> 'last_name'), '')
    )), ''),
    nullif(pg_catalog.btrim(users.raw_user_meta_data ->> 'username'), ''),
    nullif(pg_catalog.split_part(coalesce(users.email, ''), '@', 1), ''),
    'Learner'
  ),
  coalesce(nullif(pg_catalog.btrim(users.raw_user_meta_data ->> 'first_name'), ''), ''),
  coalesce(nullif(pg_catalog.btrim(users.raw_user_meta_data ->> 'last_name'), ''), '')
from auth.users as users
on conflict (user_id) do update set
  email = excluded.email,
  username = excluded.username,
  display_name = excluded.display_name,
  first_name = coalesce(nullif(excluded.first_name, ''), profile.first_name),
  last_name = coalesce(nullif(excluded.last_name, ''), profile.last_name),
  updated_at = pg_catalog.now();

update public.learnmaster_profiles as profile
set
  first_name = case
    when pg_catalog.btrim(profile.first_name) <> '' then profile.first_name
    when pg_catalog.btrim(profile.display_name) <> ''
         and pg_catalog.lower(pg_catalog.btrim(profile.display_name))
           <> pg_catalog.lower(pg_catalog.btrim(profile.username))
      then pg_catalog.split_part(pg_catalog.btrim(profile.display_name), ' ', 1)
    else ''
  end,
  last_name = case
    when pg_catalog.btrim(profile.last_name) <> '' then profile.last_name
    when pg_catalog.btrim(profile.display_name) <> ''
         and pg_catalog.lower(pg_catalog.btrim(profile.display_name))
           <> pg_catalog.lower(pg_catalog.btrim(profile.username))
         and pg_catalog.strpos(pg_catalog.btrim(profile.display_name), ' ') > 0
      then pg_catalog.btrim(pg_catalog.substr(
        pg_catalog.btrim(profile.display_name),
        pg_catalog.strpos(pg_catalog.btrim(profile.display_name), ' ') + 1
      ))
    else ''
  end
where pg_catalog.btrim(profile.first_name) = ''
   or pg_catalog.btrim(profile.last_name) = '';
