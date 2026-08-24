-- Automatic non-Stripe plan access with a 14-day overdue grace period.
-- Choosing a plan starts access immediately. No card is charged by this SQL.

create or replace function public.learnmaster_effective_payment_status(
  profile_status text,
  profile_plan text,
  profile_due_on date
)
returns text
language sql
stable
set search_path = ''
as $$
  select case
    when profile_status = 'suspended' then 'suspended'
    when profile_plan is null then 'pending'
    when profile_status in ('active', 'late') and profile_due_on is null then 'suspended'
    when profile_status in ('active', 'late') and current_date > profile_due_on + 14 then 'suspended'
    when profile_status = 'late' then 'late'
    when profile_status = 'active' and profile_due_on < current_date then 'late'
    else profile_status
  end;
$$;

create or replace function public.learnmaster_subscription_access_allowed(
  profile_status text,
  profile_plan text,
  profile_due_on date
)
returns boolean
language sql
stable
set search_path = ''
as $$
  select
    profile_plan is not null
    and profile_due_on is not null
    and profile_status in ('active', 'late')
    and current_date <= profile_due_on + 14;
$$;

revoke all on function public.learnmaster_effective_payment_status(text, text, date) from public;
revoke all on function public.learnmaster_subscription_access_allowed(text, text, date) from public;

-- Existing selected plans no longer need one-by-one administrator approval.
update public.learnmaster_profiles
set payment_status = 'active',
    payment_due_on = coalesce(payment_due_on, current_date + 30),
    payment_status_updated_at = pg_catalog.now(),
    updated_at = pg_catalog.now()
where selected_plan is not null
  and payment_status = 'pending';

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
      payment_status = 'active',
      payment_due_on = current_date + 30,
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
    'payment_status', 'active',
    'payment_due_on', updated_profile.payment_due_on,
    'payment_status_updated_at', updated_profile.payment_status_updated_at,
    'access_allowed', true
  );
end;
$$;
revoke all on function public.learnmaster_request_subscription_plan(text) from public;
grant execute on function public.learnmaster_request_subscription_plan(text) to authenticated;

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
    public.learnmaster_effective_payment_status(profile.payment_status, profile.selected_plan, profile.payment_due_on),
    profile.payment_due_on,
    profile.payment_status_updated_at,
    public.learnmaster_subscription_access_allowed(profile.payment_status, profile.selected_plan, profile.payment_due_on)
  from public.learnmaster_profiles as profile
  where profile.user_id = auth.uid();
$$;
revoke all on function public.learnmaster_current_subscription() from public;
grant execute on function public.learnmaster_current_subscription() to authenticated;

create or replace function public.learnmaster_admin_summary()
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  result jsonb;
begin
  if auth.uid() is null or not exists (
    select 1 from public.learnmaster_profiles
    where user_id = auth.uid() and is_admin = true
  ) then
    raise exception 'administrator access required' using errcode = '42501';
  end if;

  with effective as (
    select public.learnmaster_effective_payment_status(payment_status, selected_plan, payment_due_on) as status
    from public.learnmaster_profiles
  )
  select pg_catalog.jsonb_build_object(
    'accounts', (select count(*) from public.learnmaster_profiles),
    'learners', (select count(*) from public.learnmaster_profiles),
    'consents', (select count(*) from public.learnmaster_parent_consents),
    'active_accounts', count(*) filter (where status = 'active'),
    'pending_accounts', count(*) filter (where status = 'pending'),
    'late_accounts', count(*) filter (where status = 'late'),
    'suspended_accounts', count(*) filter (where status = 'suspended')
  ) into result
  from effective;
  return result;
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
    select 1 from public.learnmaster_profiles
    where user_id = auth.uid() and is_admin = true
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
    public.learnmaster_effective_payment_status(profile.payment_status, profile.selected_plan, profile.payment_due_on),
    profile.selected_plan,
    profile.payment_due_on,
    profile.payment_status_updated_at,
    lateness.total_days_late,
    (lateness.total_days_late / 30)::integer,
    (lateness.total_days_late % 30)::integer
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
    select 1 from public.learnmaster_profiles
    where user_id = auth.uid() and is_admin = true
  ) then
    raise exception 'administrator access required' using errcode = '42501';
  end if;
  if normalized_status not in ('active', 'pending', 'late', 'suspended') then
    raise exception 'invalid payment status' using errcode = '22023';
  end if;

  select * into existing_profile
  from public.learnmaster_profiles
  where user_id = account_user_id;
  if not found then
    raise exception 'LearnMaster account not found' using errcode = 'P0002';
  end if;

  normalized_plan := case
    when new_plan is null then existing_profile.selected_plan
    else nullif(pg_catalog.lower(pg_catalog.btrim(new_plan)), '')
  end;
  if normalized_plan is not null
     and normalized_plan not in ('eng', 'math', 'sci', 'hist', 'all', 'elf', 'santa', 'reindeer') then
    raise exception 'invalid subscription plan' using errcode = '22023';
  end if;
  if normalized_status in ('active', 'late') and (normalized_plan is null or new_due_on is null) then
    raise exception 'active and late subscriptions require a plan and due date' using errcode = '22023';
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
    when updated_profile.payment_due_on is not null and updated_profile.payment_due_on < current_date
      then (current_date - updated_profile.payment_due_on)::integer
    else 0
  end;

  return pg_catalog.jsonb_build_object(
    'user_id', updated_profile.user_id,
    'selected_plan', updated_profile.selected_plan,
    'payment_status', public.learnmaster_effective_payment_status(updated_profile.payment_status, updated_profile.selected_plan, updated_profile.payment_due_on),
    'payment_due_on', updated_profile.payment_due_on,
    'payment_status_updated_at', updated_profile.payment_status_updated_at,
    'total_days_late', late_days,
    'months_late', (late_days / 30)::integer,
    'remaining_days_late', (late_days % 30)::integer,
    'access_allowed', public.learnmaster_subscription_access_allowed(updated_profile.payment_status, updated_profile.selected_plan, updated_profile.payment_due_on)
  );
end;
$$;
revoke all on function public.learnmaster_admin_update_subscription(uuid, text, date, text) from public;
grant execute on function public.learnmaster_admin_update_subscription(uuid, text, date, text) to authenticated;
