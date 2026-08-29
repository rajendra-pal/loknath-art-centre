-- =====================================================================
-- students table migration & RLS setup
-- =====================================================================
create table if not exists public.students (
  id uuid primary key default gen_random_uuid(),
  account_id uuid references auth.users(id) on delete set null,
  student_id text,
  name text not null,
  email text,
  phone text not null,
  village text,
  course text not null,
  monthly_fee numeric not null default 0,
  paid_months text[] not null default '{}',
  admission_date date default current_date,
  status text not null default 'Active' check (status in ('Active','Inactive','Completed')),
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Ensure all columns exist
alter table public.students add column if not exists name text;
alter table public.students add column if not exists email text;
alter table public.students add column if not exists phone text;
alter table public.students add column if not exists village text;
alter table public.students add column if not exists course text;
alter table public.students add column if not exists monthly_fee numeric not null default 0;
alter table public.students add column if not exists paid_months text[] not null default '{}';
alter table public.students add column if not exists admission_date date default current_date;
alter table public.students add column if not exists status text not null default 'Active';
alter table public.students add column if not exists notes text;
alter table public.students add column if not exists updated_at timestamptz not null default now();

-- Update trigger
create or replace function public.update_updated_at() returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists update_students_updated_at on public.students;
create trigger update_students_updated_at
  before update on public.students
  for each row execute function public.update_updated_at();

-- Indexes
create index if not exists idx_students_status on public.students(status);
create index if not exists idx_students_created_at on public.students(created_at desc);

-- RLS policies
alter table public.students enable row level security;

drop policy if exists "Students read access" on public.students;
create policy "Students read access" on public.students
  for select to anon, authenticated using (true);

drop policy if exists "Students write access" on public.students;
create policy "Students write access" on public.students
  for all to anon, authenticated using (true) with check (true);
