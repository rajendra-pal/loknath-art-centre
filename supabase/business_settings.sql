-- Singleton business settings: one row holds the merchant's UPI ID and
-- business name. Lives at the global scope (not per-user) so all admins and
-- all customers see the same UPI ID, and a browser refresh never wipes it.
--
-- The single row is identified by id = 1. We seed it on creation so existing
-- deployments get a default immediately. The seed uses ON CONFLICT DO NOTHING
-- so re-running this file is safe.

create table if not exists public.business_settings (
  id integer primary key default 1 check (id = 1),
  upi_id text,
  business_name text not null default 'Lokenath Art Center',
  phone text,
  updated_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

insert into public.business_settings (id, upi_id, business_name)
values (1, 'loknathartcenter@upi', 'Lokenath Art Center')
on conflict (id) do nothing;

alter table public.business_settings enable row level security;

-- Anyone signed in can read the merchant info (needed by the payment page
-- to render the QR code). Anonymous users are excluded because they cannot
-- place orders — if you want them to read it too, add `to anon` here.
drop policy if exists "Business settings public read" on public.business_settings;
create policy "Business settings public read" on public.business_settings
  for select to authenticated using (true);

-- Only admins can write. Same gate as products/courses — is_admin() reads
-- the role out of public.accounts, so the JWT does not need to be edited.
drop policy if exists "Business settings admin write" on public.business_settings;
create policy "Business settings admin write" on public.business_settings
  for all to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- updated_at trigger — same pattern as the other tables.
drop trigger if exists update_business_settings_updated_at on public.business_settings;
create trigger update_business_settings_updated_at
  before update on public.business_settings
  for each row execute function public.update_updated_at();
