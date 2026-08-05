-- Migration: add public.courses table + seed from live lib/data.ts
-- Run this in the Supabase SQL editor for projects where schema.sql was already applied.
-- Idempotent — safe to run multiple times.

create table if not exists public.courses (
  id text primary key,
  title text not null,
  title_bn text not null,
  title_en text not null,
  duration text not null,
  age_group text not null,
  level text not null check (level in ('শুরু','মধ্যম','উচ্চ','সকল স্তর')),
  description text not null,
  image text,
  color text not null default '#8B5CF6',
  category text not null,
  fee numeric,
  display_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- For projects that already ran an earlier version of this migration, add the new column.
alter table public.courses add column if not exists display_order integer not null default 0;

create index if not exists idx_courses_is_active on public.courses(is_active);
create index if not exists idx_courses_category on public.courses(category);
create index if not exists idx_courses_display_order on public.courses(display_order);

alter table public.courses enable row level security;

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
grant execute on function public.is_admin() to anon, authenticated;

drop policy if exists "Courses public read" on public.courses;
create policy "Courses public read" on public.courses
  for select to anon, authenticated using (true);

drop policy if exists "Courses admin write" on public.courses;
create policy "Courses admin write" on public.courses
  for all to authenticated
  using (public.is_admin())
  with check (public.is_admin());

create or replace function public.update_updated_at() returns trigger as $$
begin new.updated_at = now(); return new; end;
$$ language plpgsql;

drop trigger if exists update_courses_updated_at on public.courses;
create trigger update_courses_updated_at
  before update on public.courses
  for each row execute function public.update_updated_at();

-- Enable Realtime broadcasts on public.courses so the public site updates
-- immediately when the admin toggles/updates a course in another tab.
-- supabase_realtime is created by Supabase when the project is provisioned.
do $$
begin
  if exists (select 1 from pg_publication where pubname = 'supabase_realtime') then
    execute 'alter publication supabase_realtime add table public.courses';
  end if;
end $$;

-- Seed / sync the live set of 15 courses from lib/data.ts.
-- on conflict keeps is_active untouched (preserves admin toggles) but refreshes
-- the rest of the columns. New rows default to is_active = true.
-- display_order preserves the on-site order.
insert into public.courses (id, title, title_bn, title_en, duration, age_group, level, description, image, color, category, fee, display_order, is_active) values
  ('c1',  'Basic Drawing',          'বেসিক ড্রয়িং',         'Basic Drawing',          '৩ মাস',   '6-10 বছর',  'শুরু',     'আঁকার ভিত্তি — রেখা, আকার এবং পর্যবেক্ষণ দক্ষতার প্রথম পাঠ।',                                 '/images/drawing/Basic drawing.jpg',               '#FF6B35', 'ড্রয়িং',     800,   1, true),
  ('c2',  'Pencil Sketch',          'পেন্সিল স্কেচ',         'Pencil Sketch',          '৪ মাস',   '10+ বছর',   'শুরু',     'ছায়া, টেক্সচার ও গ্রাফাইট কৌশলে দক্ষতা অর্জন।',                                                '/images/drawing/pencil sketch.jpg',              '#8B5CF6', 'স্কেচিং',     1000,  2, true),
  ('c3',  'Still Life',             'স্টিল লাইফ',           'Still Life',             '৩ মাস',   '12+ বছর',   'মধ্যম',    'আলো-ছায়া ও কম্পোজিশনের মাধ্যমে বস্তুর চিত্রায়ণ।',                                            '/images/drawing/still life.jpg',                 '#FF5C8A', 'ড্রয়িং',     1000,  3, true),
  ('c4',  'Portrait Drawing',       'পোর্ট্রেট ড্রয়িং',    'Portrait Drawing',       '৬ মাস',   '14+ বছর',   'উচ্চ',     'মানুষের মুখের সাদৃশ্য ও অনুভূতি ধরার শিল্প।',                                                 '/images/drawing/potrait drawing.jpg',            '#3B82F6', 'পোর্ট্রেট',   1500,  4, true),
  ('c5',  'Watercolor Painting',    'ওয়াটারকালার পেইন্টিং', 'Watercolor Painting',    '৪ মাস',   '10+ বছর',   'মধ্যম',    'জল রঙের খেলা — ওয়াশ, ব্লেন্ডিং ও রঙের পরীক্ষা-নিরীক্ষা।',                                  '/images/drawing/market watercolor.jpg',          '#60A5FA', 'পেইন্টিং',    1200,  5, true),
  ('c6',  'Oil Painting',           'অয়েল পেইন্টিং',       'Oil Painting',           '৬ মাস',   '14+ বছর',   'উচ্চ',     'গভীর রঙ ও সমৃদ্ধ গভীরতায় চিরায়ত অয়েল কৌশল।',                                                  '/images/drawing/oil painting.jpg',               '#FBBF24', 'পেইন্টিং',    1500,  6, true),
  ('c7',  'Poster Color',           'পোস্টার কালার',         'Poster Color',           '২ মাস',   '6-12 বছর',  'শুরু',     'স্কুল প্রজেক্টের জন্য উজ্জ্বল ও জোরালো পোস্টার পেইন্টিং।',                                   '/images/drawing/poster color painting.jpg',       '#FF8E72', 'রং',         700,   7, true),
  ('c8',  'Acrylic Painting',       'অ্যাক্রিলিক পেইন্টিং', 'Acrylic Painting',       '৪ মাস',   '15+ বছর',   'মধ্যম',    'দ্রুত শুকনো অ্যাক্রিলিক দিয়ে প্রাণবন্ত আধুনিক শিল্পকর্ম।',                                    '/images/drawing/acrylic painting.jpg',           '#10B981', 'পেইন্টিং',    1200,  8, true),
  ('c9',  'Pastel Art',             'পাস্তেল আর্ট',         'Pastel Art',             '৩ মাস',   '10+ বছর',   'সকল স্তর','সফট ও অয়েল পাস্তেল দিয়ে অভিব্যক্তিপূর্ণ শিল্পকর্ম।',                                       '/images/drawing/pastel art.jpg',                 '#A78BFA', 'রং',         800,   9, true),
  ('c13', 'Canvas Painting',        'ক্যানভাস পেইন্টিং',    'Canvas Painting',        '৪ মাস',   '12+ বছর',   'মধ্যম',    'পেশাদার শিল্পীর মতো টানা ক্যানভাসে কাজ করার অভিজ্ঞতা।',                                       '/images/drawing/canvas painting.png',            '#FF6B35', 'পেইন্টিং',    1200, 10, true),
  ('c14', 'Landscape',              'ল্যান্ডস্কেপ',         'Landscape',              '৪ মাস',   '12+ বছর',   'মধ্যম',    'প্রকৃতির রূপ — আকাশ, পাহাড়, জল ও গাছের চিত্রায়ণ।',                                            '/images/drawing/landscape.jpg',                 '#8B5CF6', 'পেইন্টিং',    1000, 11, true),
  ('c15', 'Modern Art',             'মডার্ন আর্ট',         'Modern Art',             '৬ মাস',   '14+ বছর',   'উচ্চ',     'অ্যাবস্ট্র্যাক্ট ও সমকালীন শিল্পধারা ও কৌশল।',                                                '/images/drawing/modern art.jpg',                 '#FF5C8A', 'আধুনিক',     1500, 12, true),
  ('c16', 'Kids Art',               'কিডস আর্ট',           'Kids Art',               '৩ মাস',   '4-8 বছর',   'শুরু',     'খেলাচ্ছলে আঁকা — যা গড়ে তোলে হাতের দক্ষতা ও সৃজনশীলতা।',                                      '/images/drawing/kids art.jpg',                   '#FBBF24', 'শিশু',       700,  13, true),
  ('c17', 'Exam Preparation',       'পরীক্ষার প্রস্তুতি',   'Exam Preparation',       '৩ মাস',   '10-18 বছর', 'সকল স্তর','মাধ্যমিক, উচ্চমাধ্যমিক ও প্রতিযোগিতামূলক পরীক্ষার আর্ট প্রস্তুতি।',                            '/images/drawing/drawing exam preparation.jpg',    '#3B82F6', 'পরীক্ষা',     1000, 14, true),
  ('c18', 'Professional Fine Arts', 'প্রফেশনাল ফাইন আর্টস', 'Professional Fine Arts', '১২ মাস',  '16+ বছর',   'উচ্চ',     'পেশাদার শিল্পী হওয়ার স্বপ্ন দেখাদের জন্য ক্যারিয়ার-কেন্দ্রিক প্রোগ্রাম।',                    '/images/drawing/professional fine art1.jpg',     '#10B981', 'পেশাদার',     2500, 15, true)
on conflict (id) do update set
  title = excluded.title,
  title_bn = excluded.title_bn,
  title_en = excluded.title_en,
  duration = excluded.duration,
  age_group = excluded.age_group,
  level = excluded.level,
  description = excluded.description,
  image = excluded.image,
  color = excluded.color,
  category = excluded.category,
  fee = excluded.fee,
  display_order = excluded.display_order;

-- Hide the courses that are in the previous seed but not in the live website.
-- These were c10 (Craft Work), c11 (Digital Art), c12 (Mandala).
-- Their IDs are kept so the admin can re-activate them if desired.
update public.courses set is_active = false
  where id in ('c10', 'c11', 'c12');
