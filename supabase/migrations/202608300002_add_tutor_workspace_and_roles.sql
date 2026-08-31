create table if not exists public.learnmaster_account_roles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  account_role text not null default 'family' check (account_role in ('family','tutor')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.learnmaster_capture_account_role()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.learnmaster_account_roles(user_id,account_role)
  values (new.id,case when new.raw_user_meta_data->>'account_role' = 'tutor' then 'tutor' else 'family' end)
  on conflict (user_id) do update set account_role=excluded.account_role,updated_at=now();
  return new;
end;
$$;

drop trigger if exists learnmaster_capture_account_role_trigger on auth.users;
create trigger learnmaster_capture_account_role_trigger
after insert on auth.users
for each row execute function public.learnmaster_capture_account_role();

insert into public.learnmaster_account_roles(user_id,account_role)
select id,case when raw_user_meta_data->>'account_role'='tutor' then 'tutor' else 'family' end
from auth.users
on conflict (user_id) do nothing;

create unique index if not exists learnmaster_tutors_user_idx on public.learnmaster_tutors(tutor_user_id);

create table if not exists public.learnmaster_tutor_schedule (
  id uuid primary key default gen_random_uuid(),
  tutor_user_id uuid not null references auth.users(id) on delete cascade,
  day_name text not null,
  starts_at time not null,
  ends_at time not null,
  format text not null check (format in ('online','local')),
  created_at timestamptz not null default now()
);

create table if not exists public.learnmaster_tutor_lessons (
  id uuid primary key default gen_random_uuid(),
  tutor_user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  subject text not null,
  plan text not null check (char_length(plan) between 1 and 2000),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.learnmaster_tutor_learners (
  id uuid primary key default gen_random_uuid(),
  tutor_user_id uuid not null references auth.users(id) on delete cascade,
  learner_display_name text not null,
  grade_level text not null,
  learning_goal text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.learnmaster_tutor_assignments (
  id uuid primary key default gen_random_uuid(),
  tutor_user_id uuid not null references auth.users(id) on delete cascade,
  recipient_user_id uuid references auth.users(id) on delete cascade,
  recipient_email text,
  title text not null,
  subject text not null,
  instructions text not null check (char_length(instructions) between 1 and 2000),
  due_on date,
  status text not null default 'assigned' check (status in ('assigned','started','complete')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.learnmaster_account_roles enable row level security;
alter table public.learnmaster_tutor_schedule enable row level security;
alter table public.learnmaster_tutor_lessons enable row level security;
alter table public.learnmaster_tutor_learners enable row level security;
alter table public.learnmaster_tutor_assignments enable row level security;

drop policy if exists "Users can read their own account role" on public.learnmaster_account_roles;
create policy "Users can read their own account role" on public.learnmaster_account_roles for select to authenticated using (user_id=auth.uid());

drop policy if exists "Tutors can create their profile" on public.learnmaster_tutors;
create policy "Tutors can create their profile" on public.learnmaster_tutors for insert to authenticated with check (tutor_user_id=auth.uid() and exists(select 1 from public.learnmaster_account_roles role where role.user_id=auth.uid() and role.account_role='tutor'));
drop policy if exists "Tutors can update their profile" on public.learnmaster_tutors;
create policy "Tutors can update their profile" on public.learnmaster_tutors for update to authenticated using (tutor_user_id=auth.uid()) with check (tutor_user_id=auth.uid());

drop policy if exists "Tutors manage their schedule" on public.learnmaster_tutor_schedule;
create policy "Tutors manage their schedule" on public.learnmaster_tutor_schedule for all to authenticated using (tutor_user_id=auth.uid()) with check (tutor_user_id=auth.uid());
drop policy if exists "Tutors manage their lessons" on public.learnmaster_tutor_lessons;
create policy "Tutors manage their lessons" on public.learnmaster_tutor_lessons for all to authenticated using (tutor_user_id=auth.uid()) with check (tutor_user_id=auth.uid());
drop policy if exists "Tutors manage their learner roster" on public.learnmaster_tutor_learners;
create policy "Tutors manage their learner roster" on public.learnmaster_tutor_learners for all to authenticated using (tutor_user_id=auth.uid()) with check (tutor_user_id=auth.uid());
drop policy if exists "Tutors manage assignments" on public.learnmaster_tutor_assignments;
create policy "Tutors manage assignments" on public.learnmaster_tutor_assignments for all to authenticated using (tutor_user_id=auth.uid()) with check (tutor_user_id=auth.uid());
drop policy if exists "Families read their tutor assignments" on public.learnmaster_tutor_assignments;
create policy "Families read their tutor assignments" on public.learnmaster_tutor_assignments for select to authenticated using (
  recipient_user_id=auth.uid()
  or lower(recipient_email)=lower(coalesce(auth.jwt()->>'email',''))
);

create index if not exists learnmaster_tutor_schedule_user_idx on public.learnmaster_tutor_schedule(tutor_user_id,day_name,starts_at);
create index if not exists learnmaster_tutor_lessons_user_idx on public.learnmaster_tutor_lessons(tutor_user_id,updated_at desc);
create index if not exists learnmaster_tutor_learners_user_idx on public.learnmaster_tutor_learners(tutor_user_id,created_at desc);
create index if not exists learnmaster_tutor_assignments_recipient_idx on public.learnmaster_tutor_assignments(recipient_user_id,created_at desc);
create index if not exists learnmaster_tutor_assignments_email_idx on public.learnmaster_tutor_assignments(lower(recipient_email),created_at desc);

insert into public.learnmaster_tutors
  (id,name,qualification,photo_url,availability,subjects,grade_levels,formats,active)
values
  ('55555555-5555-4555-8555-555555555555','Daniel Kim','M.S. Mathematics · SAT and ACT quantitative coach','','Evenings and Saturday afternoons',array['Math','Homework support'],array['Grade 6','Grade 7','Grade 8','Grade 9','Grade 10','Grade 11','Grade 12'],array['online'],true),
  ('66666666-6666-4666-8666-666666666666','Nia Brooks','B.A. English · Writing and college-readiness tutor','','Mon–Fri, 3:30–6:30 PM',array['English and reading','Homework support'],array['Grade 5','Grade 6','Grade 7','Grade 8','Grade 9','Grade 10','Grade 11','Grade 12'],array['local','online'],true),
  ('77777777-7777-4777-8777-777777777777','Owen Patel','M.S. Physics · Algebra, calculus, and physics tutor','','Tuesday, Thursday, and Sunday',array['Math','Science'],array['Grade 8','Grade 9','Grade 10','Grade 11','Grade 12'],array['online'],true),
  ('88888888-8888-4888-8888-888888888888','Grace Okafor','B.Ed. Early Childhood Education · Literacy specialist','','Weekday mornings and Saturday',array['English and reading','Math','Homework support'],array['Pre-K','Kindergarten','Grade 1','Grade 2','Grade 3'],array['local','online'],true),
  ('99999999-9999-4999-8999-999999999999','Luis Hernandez','M.A. History · Civics and essay-writing instructor','','Wednesday–Sunday evenings',array['History and social studies','English and reading'],array['Grade 6','Grade 7','Grade 8','Grade 9','Grade 10','Grade 11','Grade 12'],array['local','online'],true),
  ('aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa','Sofia Bennett','M.Ed. Special Education · Individual learning support','','Flexible weekday appointments',array['English and reading','Math','Homework support'],array['Kindergarten','Grade 1','Grade 2','Grade 3','Grade 4','Grade 5','Grade 6','Grade 7','Grade 8'],array['online'],true)
on conflict (id) do update set name=excluded.name,qualification=excluded.qualification,availability=excluded.availability,subjects=excluded.subjects,grade_levels=excluded.grade_levels,formats=excluded.formats,active=true,updated_at=now();
