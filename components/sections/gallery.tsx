'use client';

import * as React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronLeft, ChevronRight, Sparkles, Award } from 'lucide-react';
import { SectionHeading } from '@/components/ui/section-heading';
import { BrushDivider } from '@/components/ui/brush-divider';
import { Dialog, DialogContent, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { galleryCategories, galleryItems, featuredArtwork } from '@/lib/data';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/lib/i18n/context';
import { tr } from '@/lib/i18n/strings';

type LightboxItem = {
  title: any;
  categoryOrMedium: any;
  image: string;
  student?: any;
  age?: number;
};

export function Gallery() {
  const { t, language } = useLanguage();

  // Category filter state
  const allLabel = galleryCategories[0];
  const [active, setActive] = React.useState<string>(allLabel.en);
  const [openItem, setOpenItem] = React.useState<LightboxItem | null>(null);

  // Carousel for Students' Work section
  const [emblaRef, embla] = useEmblaCarousel({ loop: true, align: 'start' });
  const [selectedSlide, setSelectedSlide] = React.useState(0);

  React.useEffect(() => {
    if (!embla) return;
    embla.on('select', () => setSelectedSlide(embla.selectedScrollSnap()));
  }, [embla]);

  const filteredGallery = React.useMemo(
    () =>
      active === allLabel.en
        ? galleryItems
        : galleryItems.filter((g) => t(g.category) === active),
    [active, t, allLabel]
  );

  return (
    <section id="gallery" className="relative section-pad overflow-hidden">
      <div className="container">
        {/* =========================================
            PART 1: MAIN GALLERY HEADER & EXPLORER
           ========================================= */}
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

        {/* Masonry Grid */}
        <motion.div layout className="masonry">
          <AnimatePresence>
            {filteredGallery.map((item, i) => (
              <motion.button
                layout
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: (i % 8) * 0.04 }}
                onClick={() =>
                  setOpenItem({
                    title: item.title,
                    categoryOrMedium: item.category,
                    image: item.image,
                    student: item.student,
                    age: item.age,
                  })
                }
                className="group relative mb-6 block w-full overflow-hidden rounded-2xl bg-white shadow-md shadow-ink-500/5 transition-all hover:shadow-2xl tilt-card"
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
                <span className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-ink-500 opacity-0 transition-opacity group-hover:opacity-100 shadow-sm">
                  <Search className="h-4 w-4" />
                </span>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Decorative Divider */}
        <div className="my-20">
          <BrushDivider color="#FF5C8A" />
        </div>

        {/* =========================================
            PART 2: DEDICATED STUDENT'S WORK SUBSECTION
           ========================================= */}
        <div id="students-work" className="relative rounded-3xl bg-gradient-to-br from-orange-50/70 via-pink-50/50 to-purple-50/60 p-6 sm:p-10 lg:p-12 border border-orange-100/80 shadow-xl">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 rounded-full bg-palette-orange/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-palette-orange">
              <Award className="h-4 w-4" />
              {language === 'bn' ? "শিক্ষার্থীদের কাজ" : "Students' Work"}
            </div>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl font-extrabold text-ink-500">
              {language === 'bn' ? (
                <>
                  তৈরি হওয়া <span className="brush-underline">মাস্টারপিস</span>
                </>
              ) : (
                <>
                  <span className="brush-underline">Masterpieces</span> made here
                </>
              )}
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm sm:text-base text-ink-400">
              {tr('featuredDescription', language)}
            </p>
          </div>

          {/* Carousel Showcase */}
          <div className="relative">
            <div ref={emblaRef} className="overflow-hidden">
              <div className="flex gap-6">
                {featuredArtwork.map((a) => (
                  <div
                    key={a.id}
                    className="relative flex-[0_0_85%] sm:flex-[0_0_48%] lg:flex-[0_0_32%]"
                  >
                    <motion.div
                      whileHover={{ y: -6 }}
                      onClick={() =>
                        setOpenItem({
                          title: a.title,
                          categoryOrMedium: a.medium,
                          image: a.image,
                        })
                      }
                      className="group relative h-[240px] sm:h-[280px] md:h-[320px] w-full cursor-pointer overflow-hidden rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-2xl bg-gray-900 transition-all"
                    >
                      <img
                        src={a.image}
                        alt={t(a.title)}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink-700/90 via-ink-700/25 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                        <div className="flex items-center gap-2">
                          <span className="inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-palette-yellow backdrop-blur-sm">
                            {t(a.medium)}
                          </span>
                          <span className="inline-flex items-center gap-1 rounded-full bg-palette-orange/80 px-2.5 py-0.5 text-[11px] font-bold text-white">
                            <Sparkles className="h-3 w-3" />
                            {language === 'bn' ? 'মাস্টারপিস' : 'Featured'}
                          </span>
                        </div>
                        <h3 className="mt-2 font-display text-xl sm:text-2xl font-bold line-clamp-1">
                          {t(a.title)}
                        </h3>
                      </div>
                      <span className="absolute right-3.5 top-3.5 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-ink-500 opacity-0 transition-opacity group-hover:opacity-100 shadow-md">
                        <Search className="h-4 w-4" />
                      </span>
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>

            {/* Carousel Controls */}
            <div className="mt-8 flex items-center justify-center gap-4">
              <button
                onClick={() => embla?.scrollPrev()}
                className="grid h-12 w-12 place-items-center rounded-full border border-ink-200 bg-white text-ink-500 shadow-sm transition hover:border-palette-orange hover:text-palette-orange hover:shadow-md"
                aria-label={tr('prevSlide', language)}
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <div className="flex items-center gap-2">
                {featuredArtwork.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => embla?.scrollTo(i)}
                    className={`h-2 rounded-full transition-all ${
                      i === selectedSlide
                        ? 'w-8 bg-palette-orange'
                        : 'w-2 bg-ink-200 hover:bg-ink-300'
                    }`}
                    aria-label={`${tr('slideAria', language)} ${i + 1}`}
                  />
                ))}
              </div>
              <button
                onClick={() => embla?.scrollNext()}
                className="grid h-12 w-12 place-items-center rounded-full border border-ink-200 bg-white text-ink-500 shadow-sm transition hover:border-palette-orange hover:text-palette-orange hover:shadow-md"
                aria-label={tr('nextSlide', language)}
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        <BrushDivider color="#3B82F6" className="mt-16" />
      </div>

      {/* Unified Lightbox Dialog */}
      <Dialog open={!!openItem} onOpenChange={(o) => !o && setOpenItem(null)}>
        <DialogContent className="max-w-4xl">
          {openItem && (
            <div className="grid gap-6 md:grid-cols-2">
              <div className="overflow-hidden rounded-2xl bg-gray-100">
                <img
                  src={openItem.image}
                  alt={t(openItem.title)}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <DialogTitle>{t(openItem.title)}</DialogTitle>
                <p className="mt-1 text-sm font-semibold uppercase tracking-widest text-palette-rose">
                  {t(openItem.categoryOrMedium)}
                </p>
                {openItem.student && (
                  <p className="mt-6 text-ink-400">
                    {tr('artistPrefix', language)}{' '}
                    <span className="font-semibold text-ink-500">{t(openItem.student)}</span>
                    {openItem.age ? `, ${tr('agePrefix', language)} ${openItem.age}` : ''}
                  </p>
                )}
                <p className="mt-4 text-sm leading-relaxed text-ink-400">
                  {tr('galleryDialogBody', language)}
                </p>
                <div className="mt-auto pt-6">
                  <DialogClose className="rounded-full border border-ink-200 px-5 py-2 text-sm font-medium text-ink-500 hover:bg-ink-50 transition">
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
