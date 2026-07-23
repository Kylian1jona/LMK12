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
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.learnmaster_profiles add column if not exists is_admin boolean not null default false;

create or replace function public.protect_learnmaster_admin_role()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if new.is_admin is distinct from old.is_admin and current_user not in ('postgres','service_role','supabase_admin') then
    raise exception 'administrator roles can only be changed by a trusted server role';
  end if;
  return new;
end;
$$;
drop trigger if exists protect_learnmaster_admin_role on public.learnmaster_profiles;
create trigger protect_learnmaster_admin_role before update on public.learnmaster_profiles
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
  if not exists (select 1 from public.learnmaster_profiles p where p.user_id = auth.uid() and p.is_admin = true) then
    raise exception 'administrator access required';
  end if;
  return jsonb_build_object(
    'accounts', (select count(*) from public.learnmaster_profiles),
    'learners', (select count(*) from public.learnmaster_profiles),
    'consents', (select count(*) from public.learnmaster_parent_consents)
  );
end;
$$;
revoke all on function public.learnmaster_admin_summary() from public;
grant execute on function public.learnmaster_admin_summary() to authenticated;

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
begin
  insert into public.learnmaster_profiles (user_id, email, username, display_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'username', split_part(coalesce(new.email, ''), '@', 1), 'learner'),
    coalesce(new.raw_user_meta_data ->> 'display_name', new.raw_user_meta_data ->> 'username', split_part(coalesce(new.email, ''), '@', 1), 'Learner')
  )
  on conflict (user_id) do update set
    email = excluded.email,
    username = excluded.username,
    display_name = excluded.display_name,
    updated_at = now();
  return new;
end;
$$;

drop trigger if exists on_learnmaster_user_created on auth.users;
create trigger on_learnmaster_user_created
after insert or update of raw_user_meta_data, email on auth.users
for each row execute procedure public.create_learnmaster_profile();

insert into public.learnmaster_profiles (user_id, email, username, display_name)
select
  users.id,
  users.email,
  coalesce(users.raw_user_meta_data ->> 'username', split_part(coalesce(users.email, ''), '@', 1), 'learner'),
  coalesce(users.raw_user_meta_data ->> 'display_name', users.raw_user_meta_data ->> 'username', split_part(coalesce(users.email, ''), '@', 1), 'Learner')
from auth.users as users
on conflict (user_id) do update set
  email = excluded.email,
  username = excluded.username,
  display_name = excluded.display_name,
  updated_at = now();
