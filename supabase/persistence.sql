-- Idempotent Supabase migration that adds the tables required for full
-- persistence (events, blogs, course_enrollments). Mirrors schema.sql style:
--   • create table if not exists
--   • update_updated_at trigger via the existing public.update_updated_at() fn
--   • enable row level security
--   • indexes on the columns used for filtering
--   • RLS policies: public read for catalog data, owner-or-admin for personal data
--
-- Safe to re-run.

-- =====================================================================
-- events
-- =====================================================================
create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  date date not null,
  details text not null default '',
  image text,
  is_active boolean not null default true,
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists update_events_updated_at on public.events;
create trigger update_events_updated_at
  before update on public.events
  for each row execute function public.update_updated_at();

create index if not exists idx_events_is_active on public.events(is_active);
create index if not exists idx_events_display_order on public.events(display_order);
create index if not exists idx_events_date on public.events(date);

alter table public.events enable row level security;

drop policy if exists "Events public read" on public.events;
create policy "Events public read" on public.events
  for select to anon, authenticated using (is_active = true);

drop policy if exists "Events admin write" on public.events;
create policy "Events admin write" on public.events
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- =====================================================================
-- blogs
-- =====================================================================
create table if not exists public.blogs (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique,
  category text not null default '',
  content text not null default '',
  image text,
  is_active boolean not null default true,
  published_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists update_blogs_updated_at on public.blogs;
create trigger update_blogs_updated_at
  before update on public.blogs
  for each row execute function public.update_updated_at();

create index if not exists idx_blogs_is_active on public.blogs(is_active);
create index if not exists idx_blogs_published_at on public.blogs(published_at desc);
create index if not exists idx_blogs_slug on public.blogs(slug);

alter table public.blogs enable row level security;

-- Public can read published posts only; admins can read every row.
drop policy if exists "Blogs public read" on public.blogs;
create policy "Blogs public read" on public.blogs
  for select to anon, authenticated using (
    public.is_admin() or is_active = true
  );

drop policy if exists "Blogs admin write" on public.blogs;
create policy "Blogs admin write" on public.blogs
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- =====================================================================
-- course_enrollments
-- =====================================================================
create table if not exists public.course_enrollments (
  id uuid primary key default gen_random_uuid(),
  account_id uuid references auth.users(id) on delete set null,
  course_id text references public.courses(id) on delete set null,
  student_name text not null,
  student_email text not null,
  student_phone text,
  status text not null default 'Pending'
    check (status in ('Pending', 'Approved', 'Completed', 'Cancelled')),
  notes text,
  enrolled_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists update_course_enrollments_updated_at on public.course_enrollments;
create trigger update_course_enrollments_updated_at
  before update on public.course_enrollments
  for each row execute function public.update_updated_at();

create index if not exists idx_course_enrollments_account_id on public.course_enrollments(account_id);
create index if not exists idx_course_enrollments_course_id on public.course_enrollments(course_id);
create index if not exists idx_course_enrollments_status on public.course_enrollments(status);
create index if not exists idx_course_enrollments_enrolled_at on public.course_enrollments(enrolled_at desc);

alter table public.course_enrollments enable row level security;

-- Customers can insert their own enrollment and read their own. Admins
-- (and only admins) get full access.
drop policy if exists "Course enrollments owner read" on public.course_enrollments;
create policy "Course enrollments owner read" on public.course_enrollments
  for select to authenticated using (account_id = auth.uid() or public.is_admin());

drop policy if exists "Course enrollments owner insert" on public.course_enrollments;
create policy "Course enrollments owner insert" on public.course_enrollments
  for insert to authenticated with check (account_id = auth.uid() or public.is_admin());

drop policy if exists "Course enrollments admin update" on public.course_enrollments;
create policy "Course enrollments admin update" on public.course_enrollments
  for update to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "Course enrollments admin delete" on public.course_enrollments;
create policy "Course enrollments admin delete" on public.course_enrollments
  for delete to authenticated using (public.is_admin());

-- =====================================================================
-- wishlists RLS confirmation (existing policy from schema.sql is sufficient:
-- "Wishlist owner access" — using (account_id = auth.uid()) with check
-- (account_id = auth.uid()). No new policy needed.
-- =====================================================================

-- =====================================================================
-- cart_items RLS confirmation (existing policy from schema.sql is sufficient:
-- "Cart owner access" — using (account_id = auth.uid()) with check
-- (account_id = auth.uid()). No new policy needed.
-- =====================================================================
