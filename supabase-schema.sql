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

alter table public.learnmaster_profiles enable row level security;

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
