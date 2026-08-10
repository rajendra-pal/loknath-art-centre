'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';
import { SectionHeading } from '@/components/ui/section-heading';
import { BrushDivider } from '@/components/ui/brush-divider';
import { Dialog, DialogContent, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { galleryCategories, galleryItems } from '@/lib/data';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/lib/i18n/context';
import { tr } from '@/lib/i18n/strings';

export function Gallery() {
  const { t, language } = useLanguage();
  // The "All" category key — same Bengali string as the data fallback.
  const allLabel = galleryCategories[0];
  const [active, setActive] = React.useState<string>(allLabel.en);
  const [openItem, setOpenItem] = React.useState<(typeof galleryItems)[0] | null>(null);

  const filtered = React.useMemo(
    () =>
      active === allLabel.en
        ? galleryItems
        : galleryItems.filter((g) => t(g.category) === active),
    [active, t, allLabel]
  );

  return (
    <section id="gallery" className="relative section-pad">
      <div className="container">
        <SectionHeading
          eyebrow={tr('galleryEyebrow', language)}
          title={
            language === 'bn' ? (
              <>
                তরুণ <span className="brush-underline">কল্পনার</span> একটি ক্যানভাস
              </>
            ) : (
              <>
                A canvas of <span className="brush-underline">young</span> imaginations
              </>
            )
          }
          description={tr('galleryDescription', language)}
        />

        {/* Filter pills */}
        <div className="mb-10 flex flex-wrap items-center justify-center gap-2">
          {galleryCategories.map((cat) => (
            <button
              key={cat.en}
              onClick={() => setActive(t(cat))}
              className={cn(
                'rounded-full px-5 py-2 text-sm font-medium transition-all',
                active === t(cat)
                  ? 'bg-gradient-to-r from-palette-orange to-palette-rose text-white shadow-lg shadow-palette-orange/30'
                  : 'bg-white/70 text-ink-500 hover:bg-white hover:text-palette-orange'
              )}
            >
              {t(cat)}
            </button>
          ))}
        </div>

        {/* Masonry */}
        <motion.div
          layout
          className="masonry"
        >
          <AnimatePresence>
            {filtered.map((item, i) => (
              <motion.button
                layout
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: (i % 8) * 0.04 }}
                onClick={() => setOpenItem(item)}
                className="group relative block w-full overflow-hidden rounded-2xl bg-white shadow-md shadow-ink-500/5 transition-all hover:shadow-2xl tilt-card"
              >
                <div className="relative aspect-auto">
                  <img
                    src={item.image}
                    alt={t(item.title)}
                    className="h-auto w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-ink-500/80 via-ink-500/0 to-transparent opacity-0 transition-opacity group-hover:opacity-100">
                  <div className="absolute bottom-0 left-0 right-0 p-5 text-left">
                    <p className="text-xs font-semibold uppercase tracking-widest text-palette-yellow">
                      {t(item.category)}
                    </p>
                    <h3 className="mt-1 font-display text-lg font-bold text-white">
                      {t(item.title)}
                    </h3>
                    <p className="text-xs text-cream-100/80">
                      {tr('artistPrefix', language)} {t(item.student)}{' '}
                      {item.age ? `· ${tr('agePrefix', language)} ${item.age}` : ''}
                    </p>
                  </div>
                </div>
                <span className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-ink-500 opacity-0 transition-opacity group-hover:opacity-100">
                  <Search className="h-4 w-4" />
                </span>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>

        <BrushDivider color="#FF5C8A" className="mt-16" />
      </div>

      {/* Lightbox */}
      <Dialog open={!!openItem} onOpenChange={(o) => !o && setOpenItem(null)}>
        <DialogContent className="max-w-4xl">
          {openItem && (
            <div className="grid gap-6 md:grid-cols-2">
              <div className="overflow-hidden rounded-2xl">
                <img
                  src={openItem.image}
                  alt={t(openItem.title)}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <DialogTitle>{t(openItem.title)}</DialogTitle>
                <p className="mt-1 text-sm uppercase tracking-widest text-palette-rose">
                  {t(openItem.category)}
                </p>
                <p className="mt-6 text-ink-400">
                  {tr('artistPrefix', language)}{' '}
                  <span className="font-semibold text-ink-500">{t(openItem.student)}</span>
                  {openItem.age ? `, ${tr('agePrefix', language)} ${openItem.age}` : ''}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-ink-400">
                  {tr('galleryDialogBody', language)}
                </p>
                <div className="mt-auto pt-6">
                  <DialogClose className="rounded-full border border-ink-200 px-5 py-2 text-sm font-medium text-ink-500 hover:bg-ink-50">
                    {tr('lightboxClose', language)}
                  </DialogClose>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
