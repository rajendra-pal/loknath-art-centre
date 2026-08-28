create or replace function public.is_admin() returns boolean
  language sql
  security definer
  set search_path = public
  stable
as $$
  select coalesce(
    (select role = 'admin' from public.accounts where id = auth.uid()),
    false
  );
$$;

-- (2) Allow both anon and authenticated to call it (Supabase's PostgREST
--     needs explicit grants — without this, RPCs return 404/PGRST202).
grant execute on function public.is_admin() to anon, authenticated;

-- (3) Re-load the PostgREST schema cache so the function is immediately
--     callable. Supabase also auto-refreshes every ~30s, but this makes
--     the fix take effect on the very next request.
notify pgrst, 'reload schema';

-- (4) Sanity check — should print 1 row, with the same definition we just
--     installed. If it prints 0 rows or a different definition, the
--     recreate didn't take.
select
  p.proname as function_name,
  pg_get_functiondef(p.oid) as definition
from pg_proc p
join pg_namespace n on n.oid = p.pronamespace
where p.proname = 'is_admin';

-- (5) Sanity check — confirm your account row exists with role='admin'.
--     If your email shows role='customer' or no row at all, run:
--       update public.accounts set role = 'admin' where email = '<your-email>';
select id, email, role from public.accounts order by created_at desc;
