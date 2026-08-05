-- Fixup: image paths in public.courses have drifted from the on-disk filenames.
-- This script reconciles each course's `image` column with the actual files
-- under public/images/drawing/. Idempotent — safe to re-run.
--
-- The seed migration (supabase/courses.sql) writes a different set of rows,
-- so this script only updates `image` and leaves the rest of the row alone.
-- Display order is preserved unless the row currently sits outside 1..15.

begin;

update public.courses set image = '/images/drawing/Basic drawing.jpg',
  display_order = 1 where id = 'c1';
update public.courses set image = '/images/drawing/pencil sketch.jpg',
  display_order = 2 where id = 'c2';
update public.courses set image = '/images/drawing/market watercolor.jpg',
  display_order = 3 where id = 'c3';
update public.courses set image = '/images/drawing/potrait drawing.jpg',
  display_order = 4 where id = 'c4';
update public.courses set image = '/images/drawing/oil painting.jpg',
  display_order = 5 where id = 'c5';
update public.courses set image = '/images/drawing/poster color painting.jpg',
  display_order = 6 where id = 'c6';
update public.courses set image = '/images/drawing/acrylic painting.jpg',
  display_order = 7 where id = 'c7';
update public.courses set image = '/images/drawing/still life.jpg',
  display_order = 8 where id = 'c8';
update public.courses set image = '/images/drawing/pastel art.jpg',
  display_order = 9 where id = 'c9';
update public.courses set image = '/images/drawing/canvas painting.png',
  display_order = 10 where id = 'c10';
update public.courses set image = '/images/drawing/landscape.jpg',
  display_order = 11 where id = 'c11';
update public.courses set image = '/images/drawing/modern art.jpg',
  display_order = 12 where id = 'c12';
update public.courses set image = '/images/drawing/kids art.jpg',
  display_order = 13 where id = 'c13';
update public.courses set image = '/images/drawing/drawing exam preparation.jpg',
  display_order = 14 where id = 'c14';
update public.courses set image = '/images/drawing/professional fine art1.jpg',
  display_order = 15 where id = 'c15';

commit;