-- Server-authoritative subscription selection and access gate.
-- A browser may request a plan, but only a trusted administrator can make it active.

alter table public.learnmaster_profiles
  add column if not exists selected_plan text;

update public.learnmaster_profiles
set selected_plan = case
  when selected_plan is null then null
  when pg_catalog.lower(pg_catalog.btrim(selected_plan)) in (
    'eng', 'math', 'sci', 'hist', 'all', 'elf', 'santa', 'reindeer'
  ) then pg_catalog.lower(pg_catalog.btrim(selected_plan))
  else null
end
where selected_plan is not null
  and (
    selected_plan <> pg_catalog.lower(pg_catalog.btrim(selected_plan))
    or pg_catalog.lower(pg_catalog.btrim(selected_plan)) not in (
      'eng', 'math', 'sci', 'hist', 'all', 'elf', 'santa', 'reindeer'
    )
  );

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

-- Existing profile RLS allows learners to edit ordinary profile fields. Keep all
-- billing and plan fields protected, including selected_plan; the request RPC
-- below runs as a trusted definer and is the only learner-facing write path.
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

-- Recreate the list RPC so the admin page receives the requested plan and the
-- effective status. An active account whose due date has passed is reported as
-- late and cannot receive learning access until it is renewed.
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

-- Keep the same summary shape for the existing admin UI, but count overdue
-- active records as late and exclude them from active access.
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
    'suspended_accounts', (
      select count(*)
      from public.learnmaster_profiles
      where payment_status = 'suspended'
    )
  );
end;
$$;
revoke all on function public.learnmaster_admin_summary() from public;
grant execute on function public.learnmaster_admin_summary() to authenticated;

-- This is the only learner-facing subscription write. It intentionally places
-- every new/change request in pending status and does not grant access.
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

-- Client code must call this on sign-in. It reads the authoritative profile and
-- only grants learning access for an active, non-overdue paid plan.
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

-- Admins can approve/cancel/renew a request, optionally replacing its plan.
-- Passing null for new_plan preserves the existing requested plan. Passing an
-- empty string clears it; an account cannot be made active without a plan.
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
  effective_plan text;
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

-- Retire the older status-only admin route so every activation goes through
-- the plan and due-date validation above.
drop function if exists public.learnmaster_admin_update_payment(uuid, text, date);
