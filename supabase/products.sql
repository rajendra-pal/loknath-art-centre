-- =====================================================================
-- products table migration & full art supplies catalog seed
-- =====================================================================
create table if not exists public.products (
  id text primary key,
  name text not null,
  name_bn text,
  category text not null,
  description text,
  price numeric not null,
  original_price numeric,
  image text,
  images text[],
  rating numeric not null default 0,
  reviews_count integer not null default 0,
  stock integer not null default 100,
  badge text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Ensure all columns exist
alter table public.products add column if not exists name text;
alter table public.products add column if not exists name_bn text;
alter table public.products add column if not exists category text;
alter table public.products add column if not exists description text;
alter table public.products add column if not exists price numeric not null default 0;
alter table public.products add column if not exists original_price numeric;
alter table public.products add column if not exists image text;
alter table public.products add column if not exists images text[];
alter table public.products add column if not exists rating numeric not null default 0;
alter table public.products add column if not exists reviews_count integer not null default 0;
alter table public.products add column if not exists stock integer not null default 100;
alter table public.products add column if not exists badge text;
alter table public.products add column if not exists is_active boolean not null default true;
alter table public.products add column if not exists updated_at timestamptz not null default now();

-- Update trigger
create or replace function public.update_updated_at() returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists update_products_updated_at on public.products;
create trigger update_products_updated_at
  before update on public.products
  for each row execute function public.update_updated_at();

-- Enable RLS & Policies
alter table public.products enable row level security;

drop policy if exists "Products public read" on public.products;
create policy "Products public read" on public.products
  for select to anon, authenticated using (true);

drop policy if exists "Products admin write" on public.products;
create policy "Products admin write" on public.products
  for all to anon, authenticated using (true) with check (true);

-- =====================================================================
-- SEED CATALOG: 24 ART PRODUCTS
-- =====================================================================
insert into public.products (id, name, name_bn, category, description, price, original_price, image, rating, reviews_count, stock, badge, is_active)
values
  ('p1', 'Premium Watercolour Set (24 Colours)', 'প্রিমিয়াম ওয়াটারকালার সেট (২৪ রঙ)', 'ওয়াটারকালার', 'Professional artist grade watercolour half pans with vibrant pigments and metal tin palette.', 899, 1299, 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&q=80', 4.8, 142, 50, 'সর্বাধিক বিক্রিত', true),
  ('p2', 'Professional Artist Brush Set (12 Pieces)', 'প্রফেশনাল ব্রাশ সেট (১২টি)', 'ব্রাশ', 'Curated synthetic & natural hair brush set for fine details, washes, and acrylic/oil blending.', 649, 999, 'https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?w=600&q=80', 4.9, 98, 45, 'নতুন আগমন', true),
  ('p3', 'Stretched Canvas Board Pack (5 Pieces)', 'ক্যানভাস বোর্ড প্যাক (৫টি)', 'ক্যানভাস বোর্ড', '100% pure cotton acid-free primed canvas boards (8x10 to 12x16 inch assorted).', 549, null, 'https://images.unsplash.com/photo-1579783901586-d88db74b4da4?w=600&q=80', 4.7, 67, 60, null, true),
  ('p4', 'Artist Oil Colour Studio Box (12 Tubes)', 'আর্টিস্ট অয়েল কালার (১২টি টিউব)', 'অয়েল কালার', 'Rich, buttery texture oil colours with high lightfastness and blendability.', 1499, 1999, 'https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=600&q=80', 4.9, 56, 30, 'সীমিত অফার', true),
  ('p5', 'Heavyweight Hardbound Sketchbook A4 180GSM', 'প্রফেশনাল স্কেচ বুক এ৪ ১৮০ জিএসএম', 'স্কেচ বুক', '100 sheets of acid-free, heavy cartridge paper suitable for pencil, ink, and light washes.', 299, null, 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&q=80', 4.6, 211, 120, null, true),
  ('p6', 'Artist Acrylic Colour Set (18 Shades)', 'অ্যাক্রিলিক কালার সেট (১৮ শেড)', 'অ্যাক্রিলিক কালার', 'Fast-drying, opaque heavy-body acrylic paint tubes with satin finish.', 1199, 1599, 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&q=80', 4.8, 89, 75, 'সর্বাধিক বিক্রিত', true),
  ('p7', 'Professional Soft Pastels (36 Colours)', 'সফট পাস্তেল (৩৬ রঙ)', 'সফট পাস্তেল', 'Velvety smooth soft chalk pastels for velvety gradients and portrait drawing.', 449, null, 'https://images.unsplash.com/photo-1580136579312-94651dfd596d?w=600&q=80', 4.7, 73, 40, null, true),
  ('p8', 'Ultimate Kids Art & Craft Kit (50+ Items)', 'কিডস আর্ট কিট (৫০+ আইটেম)', 'কিডস আর্ট কিট', 'All-in-one art kit with crayons, paints, brushes, clay, scissors, and paper in a durable carrying case.', 799, 1199, 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=600&q=80', 4.9, 178, 90, 'নতুন আগমন', true),
  ('p9', 'Graphite Sketching Pencil Set (12 Grades 9B-2H)', 'গ্রাফাইট স্কেচিং পেন্সিল সেট (১২টি গ্রেড)', 'পেন্সিল', 'Complete shading pencil tin set from ultra-dark 9B to crisp 2H.', 399, 499, 'https://images.unsplash.com/photo-1585336261026-7f5a4d3b40f8?w=600&q=80', 4.8, 156, 85, 'সর্বাধিক বিক্রিত', true),
  ('p10', 'Cotton Canvas Roll 10 Meters High Texture', 'ক্যানভাস রোল (১০ মিটার প্রিমিয়াম টেক্সচার)', 'ক্যানভাস', 'Heavyweight triple gesso-primed canvas roll for custom framing and large paintings.', 1899, 2499, 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=600&q=80', 4.7, 45, 25, null, true),
  ('p11', 'Designer Poster Colour Set (24 Colours)', 'পোস্টার কালার সেট (২৪ রঙ)', 'পোস্টার কালার', 'Opaque vibrant poster paint bottles ideal for design, illustrations, and school projects.', 349, 499, 'https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=600&q=80', 4.5, 89, 65, null, true),
  ('p12', 'Clear Oval Acrylic Artist Mixing Palette', 'প্রফেশনাল অ্যাক্রিলিক মিক্সিং প্যালেট', 'প্যালেট', 'Ergonomic easy-to-clean thumbhole acrylic palette for acrylics and oils.', 199, null, 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&q=80', 4.6, 34, 110, null, true),
  ('p13', 'Oil Painting Stainless Palette Knives (5 Set)', 'প্যালেট নাইফ সেট (৫টি বিভিন্ন শেপ)', 'প্যালেট নাইফ', 'Flexible stainless steel blade knives with natural wood handles for impasto and mixing.', 279, 399, 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&q=80', 4.8, 62, 70, 'সর্বাধিক বিক্রিত', true),
  ('p14', 'Dual-Tip Graphic Art Markers (24 Shades)', 'ডুয়াল-টিপ গ্রাফিক্স আর্ট মার্কার (২৪ রঙ)', 'মার্কার', 'Alcohol-based blendable markers with chisel and fine tips in a travel storage stand.', 849, 1299, 'https://images.unsplash.com/photo-1585336261026-7f5a4d3b40f8?w=600&q=80', 4.9, 115, 45, 'নতুন আগমন', true),
  ('p15', 'Waterproof Archival Fineliner Pens (Set of 8)', 'ওয়াটারপ্রুফ ফাইনলাইনার পেন সেট (৮টি)', 'ফাইনলাইনার', 'Fade-resistant micro pigment fineliners from 0.05mm to Brush tip.', 499, 699, 'https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?w=600&q=80', 4.9, 184, 95, 'সর্বাধিক বিক্রিত', true),
  ('p16', 'Extra Soft Creamy Oil Pastels (50 Shades)', 'প্রিমিয়াম অয়েল পাস্তেল (৫০ শেড)', 'অয়েল পাস্তেল', 'Ultra-smooth blendable oil pastel sticks with scratching tools and blender.', 599, 799, 'https://images.unsplash.com/photo-1580136579312-94651dfd596d?w=600&q=80', 4.7, 92, 60, null, true),
  ('p17', 'Cold-Pressed Watercolour Paper Pad 300GSM', 'ওয়াটারকালার পেপার প্যাড ৩০০ জিএসএম ২০ শিট', 'আর্ট পেপার', '100% cotton cold-pressed heavyweight paper with exquisite surface grain.', 499, 649, 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&q=80', 4.9, 88, 55, 'নতুন আগমন', true),
  ('p18', 'Calligraphy Pen & Bottle Ink Set', 'ক্যালিগ্রাফি পেন ও বোটল কালি সেট', 'ক্যালিগ্রাফি পেন', 'Classic dip pen with 5 interchangeable nibs and deep black waterproof ink.', 599, 899, 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&q=80', 4.8, 41, 40, null, true),
  ('p19', 'Natural Willow Charcoal Sticks & Pencil Set', 'প্রাকৃতিক উইলো চারকোল স্টিক ও পেন্সিল সেট', 'চারকোল', 'Assorted burnt willow charcoal sticks, compressed charcoal pencils, and blending stumps.', 349, null, 'https://images.unsplash.com/photo-1578926375605-eaf7559b1458?w=600&q=80', 4.6, 53, 50, null, true),
  ('p20', 'Artist Blendable Watercolour Pencils (36 Shades)', 'প্রিমিয়াম কালার পেন্সিল সেট (৩৬ শেড)', 'কালার পেন্সিল', 'Soft-core water-soluble colour pencils with rich saturation.', 699, 999, 'https://images.unsplash.com/photo-1585336261026-7f5a4d3b40f8?w=600&q=80', 4.8, 129, 65, 'সর্বাধিক বিক্রিত', true),
  ('p21', 'Precision Metal Geometry & Compass Kit', 'প্রিসিশন মেটাল জ্যামিতি ও কম্পাস সেট', 'জ্যামিতির সরঞ্জাম', 'Heavy-duty steel drafting compass and geometric rulers for mandala and technical drawing.', 399, null, 'https://images.unsplash.com/photo-1579783901586-d88db74b4da4?w=600&q=80', 4.6, 47, 80, null, true),
  ('p22', 'Adjustable Beechwood Tabletop Art Easel', 'অ্যাডজাস্টেবল কাঠের টেবিলটপ আর্ট ইজেল', 'ক্যানভাস', 'Solid beechwood desktop easel with adjustable angle and canvas holder.', 999, 1499, 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=600&q=80', 4.9, 64, 35, 'সীমিত অফার', true),
  ('p23', 'Artist Precision Masking Tape (Pack of 3)', 'আর্ট প্রিসিশন মাস্কিং টেপ (৩টি প্যাক)', 'মাস্কিং টেপ', 'Low-tack residue-free masking tape for clean crisp borders on paper and canvas.', 249, null, 'https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?w=600&q=80', 4.7, 38, 120, null, true),
  ('p24', 'Master Fine Artist Complete Studio Kit (80+ Items)', 'প্রফেশনাল মাস্টার আর্টিস্ট স্টুডিও কিট (৮০+ আইটেম)', 'প্রফেশনাল আর্টিস্ট কিট', 'Ultimate comprehensive collection of acrylics, oils, watercolours, brushes, sketchbooks, easels, and tools in a premium wooden chest.', 2499, 3499, 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&q=80', 5.0, 205, 20, 'সর্বাধিক বিক্রিত', true)
on conflict (id) do update set
  name = excluded.name,
  name_bn = excluded.name_bn,
  category = excluded.category,
  description = excluded.description,
  price = excluded.price,
  original_price = excluded.original_price,
  image = excluded.image,
  rating = excluded.rating,
  reviews_count = excluded.reviews_count,
  stock = excluded.stock,
  badge = excluded.badge,
  is_active = excluded.is_active,
  updated_at = now();
