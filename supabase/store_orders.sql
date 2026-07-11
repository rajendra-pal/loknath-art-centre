create table if not exists public.store_orders (
  id text primary key,
  customer_email text not null,
  created_at timestamptz not null default now(),
  order_data jsonb not null
);

alter table public.store_orders enable row level security;

create policy "Store orders can be created" on public.store_orders
  for insert to anon, authenticated with check (true);

create policy "Store orders can be read" on public.store_orders
  for select to anon, authenticated using (true);

create policy "Store orders can be updated" on public.store_orders
  for update to anon, authenticated using (true) with check (true);
