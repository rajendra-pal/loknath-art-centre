-- Diagnostic: explain why "Toggle active failed: {}" is appearing.
--
-- Symptom: clicking the green pill in /admin/courses triggers
--   PATCH .../courses?id=eq.c1&select=id,is_active 406 (Not Acceptable)
--   PostgrestError: PGRST116 / "The result contains 0 rows"
--
-- The 0-rows + 406 + PGRST116 combination is the signature of a row that
-- EXISTS in the table but the UPDATE is being filtered to 0 rows by an
-- RLS policy. The function public.is_admin() is the only gate.
--
-- Run these one at a time in the Supabase SQL editor and read the "Results"
-- panel. Paste the output back if anything is unexpected.

-- 1. Confirm the row exists.
select id, title, is_active from public.courses where id = 'c1';

-- 2. Confirm the function exists, is callable by the authenticated role,
--    and reads from public.accounts (set search_path = public pins this).
select
  n.nspname as schema,
  p.proname as function_name,
  pg_get_functiondef(p.oid) as definition
from pg_proc p
join pg_namespace n on n.oid = p.pronamespace
where p.proname = 'is_admin';

-- 3. Show the policies on public.courses — the one we care about is the
--    "Courses admin write" policy, which gates UPDATE/INSERT/DELETE.
select
  policyname,
  cmd,
  roles,
  qual,
  with_check
from pg_policies
where schemaname = 'public' and tablename = 'courses'
order by policyname;

-- 4. Show all rows in public.accounts. The signed-in admin user MUST be
--    in this list with role='admin'. If their row is missing or role is
--    'customer', is_admin() returns false and every UPDATE silently
--    matches 0 rows.
select id, email, role, created_at
from public.accounts
order by created_at desc;

-- 5. Last-resort bypass for admins (NOT a permanent fix — for diagnosis
--    only): this query would be what the toggle is effectively trying to
--    do. Run as the postgres role. If it returns 1 row, the DB is fine
--    and the bug is purely RLS on the calling user.
update public.courses set is_active = is_active where id = 'c1'
returning id, is_active;