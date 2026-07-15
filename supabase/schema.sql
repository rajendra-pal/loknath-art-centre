-- Idempotent Supabase schema. Canonical commerce order table: public.store_orders.

create table if not exists public.accounts (
  id uuid primary key references auth.users(id) on delete cascade,
  name text not null default '', email text unique, role text not null default 'customer' check (role in ('customer','admin','student')),
  phone text, address text, joined_at timestamptz not null default now(), created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);

create table if not exists public.products (
  id text primary key, name text not null, name_bn text, category text not null, description text, price numeric not null,
  original_price numeric, image text, images text[], rating numeric not null default 0, reviews_count integer not null default 0,
  stock integer not null default 0, badge text, is_active boolean not null default true, created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);

create table if not exists public.students (
  id uuid primary key default gen_random_uuid(), account_id uuid references auth.users(id) on delete set null, student_id text unique,
  institution text, course text, year_of_study text, guardian_name text, guardian_phone text, name text, email text, phone text,
  village text, monthly_fee numeric not null default 0, paid_months text[] not null default '{}', admission_date date,
  status text not null default 'Active' check (status in ('Active','Inactive','Completed')), notes text,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);

create table if not exists public.store_orders (
  id text primary key, account_id uuid references auth.users(id) on delete set null, customer_email text not null,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now(), order_data jsonb not null,
  transaction_amount numeric, delivery_date date
);

-- Legacy table removal: all application code and foreign keys use store_orders.
drop table if exists public.orders cascade;

create table if not exists public.purchases (
  id uuid primary key default gen_random_uuid(), order_id text references public.store_orders(id) on delete set null,
  account_id uuid references auth.users(id) on delete set null, product_id text references public.products(id) on delete set null,
  product_name text not null, product_price numeric not null, quantity integer not null default 1, total_price numeric not null,
  payment_method text, payment_status text, purchase_date timestamptz not null default now(), created_at timestamptz not null default now()
);

create table if not exists public.reports (
  id uuid primary key default gen_random_uuid(), report_type text not null check (report_type in ('sales','orders','products','customers','inventory','revenue')),
  title text not null, description text, data jsonb, date_from date, date_to date, generated_by uuid references auth.users(id) on delete set null, created_at timestamptz not null default now()
);

create table if not exists public.cart_items (
  id uuid primary key default gen_random_uuid(), account_id uuid not null references auth.users(id) on delete cascade,
  product_id text not null references public.products(id) on delete cascade, quantity integer not null default 1,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now(), unique(account_id, product_id)
);

create table if not exists public.wishlists (
  id uuid primary key default gen_random_uuid(), account_id uuid not null references auth.users(id) on delete cascade,
  product_id text not null references public.products(id) on delete cascade, created_at timestamptz not null default now(), unique(account_id, product_id)
);

create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(), user_id uuid not null unique references auth.users(id) on delete cascade,
  upi_id text, business_name text default 'Lokenath Art Center', phone text, address text, created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);

create table if not exists public.income_report (
  id uuid primary key default gen_random_uuid(), income_type text not null check (income_type in ('Student Fee','Product Sale','Course Fee','Other')),
  amount numeric not null, description text, reference_id text, payment_method text, payment_status text not null default 'Completed', income_date date not null, created_at timestamptz not null default now()
);

-- Existing-project compatibility columns.
alter table public.store_orders add column if not exists account_id uuid references auth.users(id) on delete set null;
alter table public.store_orders add column if not exists updated_at timestamptz not null default now();
alter table public.store_orders add column if not exists transaction_amount numeric;
alter table public.store_orders add column if not exists delivery_date date;
alter table public.profiles add column if not exists phone text;
alter table public.profiles add column if not exists address text;
alter table public.students add column if not exists name text;
alter table public.students add column if not exists email text;
alter table public.students add column if not exists phone text;
alter table public.students add column if not exists village text;
alter table public.students add column if not exists monthly_fee numeric not null default 0;
alter table public.students add column if not exists paid_months text[] not null default '{}';
alter table public.students add column if not exists admission_date date;
alter table public.students add column if not exists status text not null default 'Active';
alter table public.students add column if not exists notes text;

create or replace function public.update_updated_at() returns trigger as $$ begin new.updated_at = now(); return new; end; $$ language plpgsql;
drop trigger if exists update_accounts_updated_at on public.accounts;
create trigger update_accounts_updated_at before update on public.accounts for each row execute function public.update_updated_at();
drop trigger if exists update_students_updated_at on public.students;
create trigger update_students_updated_at before update on public.students for each row execute function public.update_updated_at();
drop trigger if exists update_products_updated_at on public.products;
create trigger update_products_updated_at before update on public.products for each row execute function public.update_updated_at();
drop trigger if exists update_store_orders_updated_at on public.store_orders;
create trigger update_store_orders_updated_at before update on public.store_orders for each row execute function public.update_updated_at();
drop trigger if exists update_cart_items_updated_at on public.cart_items;
create trigger update_cart_items_updated_at before update on public.cart_items for each row execute function public.update_updated_at();
drop trigger if exists update_profiles_updated_at on public.profiles;
create trigger update_profiles_updated_at before update on public.profiles for each row execute function public.update_updated_at();

create index if not exists idx_store_orders_account_id on public.store_orders(account_id);
create index if not exists idx_store_orders_created_at on public.store_orders(created_at desc);
create index if not exists idx_purchases_account_id on public.purchases(account_id);
create index if not exists idx_cart_items_account_id on public.cart_items(account_id);
create index if not exists idx_products_category on public.products(category);
create index if not exists idx_products_is_active on public.products(is_active);
create index if not exists idx_income_report_date on public.income_report(income_date desc);
create index if not exists idx_students_status on public.students(status);

alter table public.accounts enable row level security;
alter table public.products enable row level security;
alter table public.students enable row level security;
alter table public.store_orders enable row level security;
alter table public.purchases enable row level security;
alter table public.reports enable row level security;
alter table public.cart_items enable row level security;
alter table public.wishlists enable row level security;
alter table public.profiles enable row level security;
alter table public.income_report enable row level security;

drop policy if exists "Accounts owner access" on public.accounts;
create policy "Accounts owner access" on public.accounts for all to authenticated using (id = auth.uid()) with check (id = auth.uid());
drop policy if exists "Products public read" on public.products;
create policy "Products public read" on public.products for select to anon, authenticated using (true);
drop policy if exists "Products admin write" on public.products;
create policy "Products admin write" on public.products for all to authenticated using (auth.jwt() -> 'user_metadata' ->> 'role' = 'admin') with check (auth.jwt() -> 'user_metadata' ->> 'role' = 'admin');
drop policy if exists "Students authenticated read" on public.students;
create policy "Students authenticated read" on public.students for select to authenticated using (true);
drop policy if exists "Students admin write" on public.students;
create policy "Students admin write" on public.students for all to authenticated using (auth.jwt() -> 'user_metadata' ->> 'role' = 'admin') with check (auth.jwt() -> 'user_metadata' ->> 'role' = 'admin');
drop policy if exists "Store orders owner or admin read" on public.store_orders;
create policy "Store orders owner or admin read" on public.store_orders for select to authenticated using (account_id = auth.uid() or auth.jwt() -> 'user_metadata' ->> 'role' = 'admin');
drop policy if exists "Store orders owner create" on public.store_orders;
create policy "Store orders owner create" on public.store_orders for insert to authenticated with check (account_id = auth.uid());
drop policy if exists "Store orders owner or admin update" on public.store_orders;
create policy "Store orders owner or admin update" on public.store_orders for update to authenticated using (account_id = auth.uid() or auth.jwt() -> 'user_metadata' ->> 'role' = 'admin') with check (account_id = auth.uid() or auth.jwt() -> 'user_metadata' ->> 'role' = 'admin');
drop policy if exists "Purchases owner or admin read" on public.purchases;
create policy "Purchases owner or admin read" on public.purchases for select to authenticated using (account_id = auth.uid() or auth.jwt() -> 'user_metadata' ->> 'role' = 'admin');
drop policy if exists "Purchases owner create" on public.purchases;
create policy "Purchases owner create" on public.purchases for insert to authenticated with check (account_id = auth.uid());
drop policy if exists "Reports admin access" on public.reports;
create policy "Reports admin access" on public.reports for all to authenticated using (auth.jwt() -> 'user_metadata' ->> 'role' = 'admin') with check (auth.jwt() -> 'user_metadata' ->> 'role' = 'admin');
drop policy if exists "Cart owner access" on public.cart_items;
create policy "Cart owner access" on public.cart_items for all to authenticated using (account_id = auth.uid()) with check (account_id = auth.uid());
drop policy if exists "Wishlist owner access" on public.wishlists;
create policy "Wishlist owner access" on public.wishlists for all to authenticated using (account_id = auth.uid()) with check (account_id = auth.uid());
drop policy if exists "Profiles owner or admin read" on public.profiles;
create policy "Profiles owner or admin read" on public.profiles for select to authenticated using (user_id = auth.uid() or auth.jwt() -> 'user_metadata' ->> 'role' = 'admin');
drop policy if exists "Profiles owner write" on public.profiles;
create policy "Profiles owner write" on public.profiles for all to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());
drop policy if exists "Income admin access" on public.income_report;
create policy "Income admin access" on public.income_report for all to authenticated using (auth.jwt() -> 'user_metadata' ->> 'role' = 'admin') with check (auth.jwt() -> 'user_metadata' ->> 'role' = 'admin');
