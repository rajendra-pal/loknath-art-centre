'use client';

import * as React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { SectionHeading } from '@/components/ui/section-heading';
import { BrushDivider } from '@/components/ui/brush-divider';
import { featuredArtwork } from '@/lib/data';
import { useLanguage } from '@/lib/i18n/context';
import { tr } from '@/lib/i18n/strings';

export function FeaturedArtwork() {
  const { t, language } = useLanguage();
  const [emblaRef, embla] = useEmblaCarousel({ loop: true, align: 'start' });
  const [selected, setSelected] = React.useState(0);

  React.useEffect(() => {
    if (!embla) return;
    embla.on('select', () => setSelected(embla.selectedScrollSnap()));
  }, [embla]);

  return (
    <section id="students" className="relative section-pad">
      <div className="container">
        <SectionHeading
          eyebrow={tr('featuredEyebrow', language)}
          title={
            language === 'bn' ? (
              <>
                তৈরি হওয়া <span className="brush-underline">মাস্টারপিস</span>
              </>
            ) : (
              <>
                <span className="brush-underline">Masterpieces</span> made here
              </>
            )
          }
          description={tr('featuredDescription', language)}
        />

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
                    className="group relative h-[240px] sm:h-[280px] md:h-[320px] w-full overflow-hidden rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-2xl transition-all"
                  >
                    <img
                      src={a.image}
                      alt={t(a.title)}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-700/90 via-ink-700/25 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                      <p className="text-xs font-semibold uppercase tracking-widest text-palette-yellow">
                        {t(a.medium)}
                      </p>
                      <h3 className="mt-2 font-display text-2xl font-bold">
                        {t(a.title)}
                      </h3>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              onClick={() => embla?.scrollPrev()}
              className="grid h-12 w-12 place-items-center rounded-full border border-ink-200 bg-white text-ink-500 transition hover:border-palette-orange hover:text-palette-orange"
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
                    i === selected
                      ? 'w-8 bg-palette-orange'
                      : 'w-2 bg-ink-200 hover:bg-ink-300'
                  }`}
                  aria-label={`${tr('slideAria', language)} ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={() => embla?.scrollNext()}
              className="grid h-12 w-12 place-items-center rounded-full border border-ink-200 bg-white text-ink-500 transition hover:border-palette-orange hover:text-palette-orange"
              aria-label={tr('nextSlide', language)}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <BrushDivider color="#3B82F6" className="mt-16" />
      </div>
    </section>
  );
}
