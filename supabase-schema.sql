create table if not exists public.learnmaster_user_data (
  user_id uuid primary key references auth.users(id) on delete cascade,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.learnmaster_user_data enable row level security;

drop policy if exists "Users read their LearnMaster data" on public.learnmaster_user_data;
create policy "Users read their LearnMaster data"
on public.learnmaster_user_data for select
using (auth.uid() = user_id);

drop policy if exists "Users create their LearnMaster data" on public.learnmaster_user_data;
create policy "Users create their LearnMaster data"
on public.learnmaster_user_data for insert
with check (auth.uid() = user_id);

drop policy if exists "Users update their LearnMaster data" on public.learnmaster_user_data;
create policy "Users update their LearnMaster data"
on public.learnmaster_user_data for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "Users delete their LearnMaster data" on public.learnmaster_user_data;
create policy "Users delete their LearnMaster data"
on public.learnmaster_user_data for delete
using (auth.uid() = user_id);

create table if not exists public.learnmaster_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text,
  username text not null,
  display_name text not null,
  first_name text not null default '',
  last_name text not null default '',
  payment_status text not null default 'pending',
  payment_due_on date,
  payment_status_updated_at timestamptz not null default now(),
  selected_plan text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.learnmaster_profiles add column if not exists is_admin boolean not null default false;
alter table public.learnmaster_profiles add column if not exists first_name text not null default '';
alter table public.learnmaster_profiles add column if not exists last_name text not null default '';
alter table public.learnmaster_profiles add column if not exists payment_status text not null default 'pending';
alter table public.learnmaster_profiles add column if not exists payment_due_on date;
alter table public.learnmaster_profiles add column if not exists payment_status_updated_at timestamptz not null default now();
alter table public.learnmaster_profiles add column if not exists selected_plan text;

update public.learnmaster_profiles
set first_name = coalesce(first_name, ''),
    last_name = coalesce(last_name, ''),
    payment_status = case
      when payment_status in ('active', 'pending', 'late', 'suspended') then payment_status
      else 'pending'
    end,
    selected_plan = case
      when selected_plan is null then null
      when pg_catalog.lower(pg_catalog.btrim(selected_plan)) in (
        'eng', 'math', 'sci', 'hist', 'all', 'elf', 'santa', 'reindeer'
      ) then pg_catalog.lower(pg_catalog.btrim(selected_plan))
      else null
    end,
    payment_status_updated_at = coalesce(payment_status_updated_at, pg_catalog.now())
where first_name is null
   or last_name is null
   or payment_status is null
   or payment_status not in ('active', 'pending', 'late', 'suspended')
   or (selected_plan is not null and pg_catalog.lower(pg_catalog.btrim(selected_plan)) not in (
     'eng', 'math', 'sci', 'hist', 'all', 'elf', 'santa', 'reindeer'
   ))
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

do $$
begin
  if not exists (
    select 1
    from pg_catalog.pg_constraint
    where conname = 'learnmaster_profiles_selected_plan_check'
      and conrelid = 'public.learnmaster_profiles'::pg_catalog.regclass
  ) then
    alter table public.learnmaster_profiles
      add constraint learnmaster_profiles_selected_plan_check
      check (
        selected_plan is null
        or selected_plan in ('eng', 'math', 'sci', 'hist', 'all', 'elf', 'santa', 'reindeer')
      );
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
      new.selected_plan := null;
    elsif new.is_admin is distinct from old.is_admin
       or new.payment_status is distinct from old.payment_status
       or new.payment_due_on is distinct from old.payment_due_on
       or new.payment_status_updated_at is distinct from old.payment_status_updated_at
       or new.selected_plan is distinct from old.selected_plan then
      raise exception 'administrator, subscription, and payment fields can only be changed by a trusted server role'
        using errcode = '42501';
    end if;
  end if;
  return new;
end;
$$;
drop trigger if exists protect_learnmaster_admin_role on public.learnmaster_profiles;
create trigger protect_learnmaster_admin_role before insert or update on public.learnmaster_profiles
for each row execute procedure public.protect_learnmaster_admin_role();

create table if not exists public.learnmaster_parent_consents (
  user_id uuid primary key references auth.users(id) on delete cascade,
  privacy_version text not null,
  consented_at timestamptz not null default now()
);

alter table public.learnmaster_parent_consents enable row level security;
drop policy if exists "Parents read their consent" on public.learnmaster_parent_consents;
create policy "Parents read their consent" on public.learnmaster_parent_consents for select using (auth.uid() = user_id);
drop policy if exists "Parents create their consent" on public.learnmaster_parent_consents;
create policy "Parents create their consent" on public.learnmaster_parent_consents for insert with check (auth.uid() = user_id);
drop policy if exists "Parents update their consent" on public.learnmaster_parent_consents;
create policy "Parents update their consent" on public.learnmaster_parent_consents for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

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
    'active_accounts', (
      select count(*)
      from public.learnmaster_profiles
      where payment_status = 'active'
        and selected_plan is not null
        and payment_due_on >= current_date
    ),
    'pending_accounts', (
      select count(*)
      from public.learnmaster_profiles
      where payment_status = 'pending'
         or (payment_status = 'active' and selected_plan is null)
    ),
    'late_accounts', (
      select count(*)
      from public.learnmaster_profiles
      where payment_status = 'late'
         or (
           payment_status = 'active'
           and selected_plan is not null
           and (payment_due_on is null or payment_due_on < current_date)
         )
    ),
    'suspended_accounts', (select count(*) from public.learnmaster_profiles where payment_status = 'suspended')
  );
end;
$$;
revoke all on function public.learnmaster_admin_summary() from public;
grant execute on function public.learnmaster_admin_summary() to authenticated;

drop function if exists public.learnmaster_admin_payment_accounts();
create function public.learnmaster_admin_payment_accounts()
returns table (
  user_id uuid,
  email text,
  username text,
  display_name text,
  first_name text,
  last_name text,
  payment_status text,
  selected_plan text,
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
    case
      when profile.payment_status = 'active'
           and profile.selected_plan is null
        then 'pending'
      when profile.payment_status = 'active'
           and (profile.payment_due_on is null or profile.payment_due_on < current_date)
        then 'late'
      else profile.payment_status
    end as payment_status,
    profile.selected_plan,
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

-- A learner can select a plan, but cannot mark it paid or active. This RPC is
-- the only learner-facing subscription write path and always returns pending.
create or replace function public.learnmaster_request_subscription_plan(new_plan text)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  normalized_plan text := pg_catalog.lower(pg_catalog.btrim(coalesce(new_plan, '')));
  updated_profile public.learnmaster_profiles%rowtype;
begin
  if auth.uid() is null then
    raise exception 'authentication required' using errcode = '42501';
  end if;

  if normalized_plan not in ('eng', 'math', 'sci', 'hist', 'all', 'elf', 'santa', 'reindeer') then
    raise exception 'invalid subscription plan' using errcode = '22023';
  end if;

  update public.learnmaster_profiles
  set selected_plan = normalized_plan,
      payment_status = 'pending',
      payment_due_on = null,
      payment_status_updated_at = pg_catalog.now(),
      updated_at = pg_catalog.now()
  where user_id = auth.uid()
  returning * into updated_profile;

  if not found then
    raise exception 'LearnMaster account not found' using errcode = 'P0002';
  end if;

  return pg_catalog.jsonb_build_object(
    'user_id', updated_profile.user_id,
    'selected_plan', updated_profile.selected_plan,
    'payment_status', updated_profile.payment_status,
    'payment_due_on', updated_profile.payment_due_on,
    'payment_status_updated_at', updated_profile.payment_status_updated_at,
    'access_allowed', false
  );
end;
$$;
revoke all on function public.learnmaster_request_subscription_plan(text) from public;
grant execute on function public.learnmaster_request_subscription_plan(text) to authenticated;

-- Client code calls this after authentication. The database remains the source
-- of truth: only an active, selected, non-overdue plan has learning access.
create or replace function public.learnmaster_current_subscription()
returns table (
  user_id uuid,
  selected_plan text,
  payment_status text,
  payment_due_on date,
  payment_status_updated_at timestamptz,
  access_allowed boolean
)
language sql
stable
security definer
set search_path = ''
as $$
  select
    profile.user_id,
    profile.selected_plan,
    case
      when profile.payment_status = 'active'
           and (profile.payment_due_on is null or profile.payment_due_on < current_date)
        then 'late'
      else profile.payment_status
    end as payment_status,
    profile.payment_due_on,
    profile.payment_status_updated_at,
    (
      profile.payment_status = 'active'
      and profile.selected_plan is not null
      and profile.payment_due_on >= current_date
    ) as access_allowed
  from public.learnmaster_profiles as profile
  where profile.user_id = auth.uid();
$$;
revoke all on function public.learnmaster_current_subscription() from public;
grant execute on function public.learnmaster_current_subscription() to authenticated;

-- Admin approval/renewal route. Passing null for new_plan preserves the
-- request; passing an empty string clears it. Active status requires a plan.
create or replace function public.learnmaster_admin_update_subscription(
  account_user_id uuid,
  new_status text,
  new_due_on date,
  new_plan text default null
)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  normalized_status text := pg_catalog.lower(pg_catalog.btrim(coalesce(new_status, '')));
  normalized_plan text;
  existing_profile public.learnmaster_profiles%rowtype;
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

  if normalized_status not in ('active', 'pending', 'late', 'suspended') then
    raise exception 'invalid payment status' using errcode = '22023';
  end if;

  select *
  into existing_profile
  from public.learnmaster_profiles
  where user_id = account_user_id;

  if not found then
    raise exception 'LearnMaster account not found' using errcode = 'P0002';
  end if;

  if new_plan is null then
    normalized_plan := existing_profile.selected_plan;
  else
    normalized_plan := nullif(pg_catalog.lower(pg_catalog.btrim(new_plan)), '');
    if normalized_plan is not null
       and normalized_plan not in ('eng', 'math', 'sci', 'hist', 'all', 'elf', 'santa', 'reindeer') then
      raise exception 'invalid subscription plan' using errcode = '22023';
    end if;
  end if;

  if normalized_status = 'active' and normalized_plan is null then
    raise exception 'an active subscription requires a selected plan' using errcode = '22023';
  end if;
  if normalized_status = 'active' and new_due_on is null then
    raise exception 'an active subscription requires a next payment due date' using errcode = '22023';
  end if;

  update public.learnmaster_profiles
  set selected_plan = normalized_plan,
      payment_status = normalized_status,
      payment_due_on = new_due_on,
      payment_status_updated_at = pg_catalog.now(),
      updated_at = pg_catalog.now()
  where user_id = account_user_id
  returning * into updated_profile;

  late_days := case
    when updated_profile.payment_due_on is not null
         and updated_profile.payment_due_on < current_date
      then (current_date - updated_profile.payment_due_on)::integer
    else 0
  end;

  return pg_catalog.jsonb_build_object(
    'user_id', updated_profile.user_id,
    'selected_plan', updated_profile.selected_plan,
    'payment_status', case
      when updated_profile.payment_status = 'active' and late_days > 0 then 'late'
      else updated_profile.payment_status
    end,
    'payment_due_on', updated_profile.payment_due_on,
    'payment_status_updated_at', updated_profile.payment_status_updated_at,
    'total_days_late', late_days,
    'months_late', (late_days / 30)::integer,
    'remaining_days_late', (late_days % 30)::integer,
    'access_allowed', (
      updated_profile.payment_status = 'active'
      and updated_profile.selected_plan is not null
      and updated_profile.payment_due_on is not null
      and late_days = 0
    )
  );
end;
$$;
revoke all on function public.learnmaster_admin_update_subscription(uuid, text, date, text) from public;
grant execute on function public.learnmaster_admin_update_subscription(uuid, text, date, text) to authenticated;

-- Retire the older status-only route so activation always validates a plan and
-- a next payment due date through learnmaster_admin_update_subscription.
drop function if exists public.learnmaster_admin_update_payment(uuid, text, date);

alter table public.learnmaster_profiles enable row level security;

create unique index if not exists learnmaster_profiles_username_lower_key
on public.learnmaster_profiles (lower(username));

create or replace function public.learnmaster_login_email(login_username text)
returns text
language sql
stable
security definer
set search_path = ''
as $$
  select profiles.email
  from public.learnmaster_profiles as profiles
  where lower(profiles.username) = lower(trim(login_username))
  limit 1;
$$;

revoke all on function public.learnmaster_login_email(text) from public;
grant execute on function public.learnmaster_login_email(text) to anon, authenticated;

drop policy if exists "Users read their LearnMaster profile" on public.learnmaster_profiles;
create policy "Users read their LearnMaster profile"
on public.learnmaster_profiles for select
using (auth.uid() = user_id);

drop policy if exists "Users create their LearnMaster profile" on public.learnmaster_profiles;
create policy "Users create their LearnMaster profile"
on public.learnmaster_profiles for insert
with check (auth.uid() = user_id);

drop policy if exists "Users update their LearnMaster profile" on public.learnmaster_profiles;
create policy "Users update their LearnMaster profile"
on public.learnmaster_profiles for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create or replace function public.create_learnmaster_profile()
returns trigger
language plpgsql
security definer set search_path = ''
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
