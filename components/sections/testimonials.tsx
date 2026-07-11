'use client';

import * as React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { motion } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { SectionHeading } from '@/components/ui/section-heading';
import { BrushDivider } from '@/components/ui/brush-divider';
import { testimonials } from '@/lib/data';

export function Testimonials() {
  const [emblaRef, embla] = useEmblaCarousel({ loop: true, align: 'start' });
  const [selected, setSelected] = React.useState(0);

  React.useEffect(() => {
    if (!embla) return;
    embla.on('select', () => setSelected(embla.selectedScrollSnap()));
  }, [embla]);

  return (
    <section className="relative section-pad">
      <div className="container">
        <SectionHeading
          eyebrow="পরিবারের কথা"
          title={
            <>
              Studio থেকে <span className="brush-underline">গল্প</span>
            </>
          }
          description="সবচেয়ে বড় পুরস্কার হলো শুনতে পারা কীভাবে শিল্প একটি শিশুর আত্মবিশ্বাস ও আনন্দ বদলে দিয়েছে।"
        />

        <div className="relative">
          <div ref={emblaRef} className="overflow-hidden">
            <div className="flex gap-6">
              {testimonials.map((t) => (
                <div
                  key={t.id}
                  className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%]"
                >
                  <motion.div
                    whileHover={{ y: -6 }}
                    className="relative h-full overflow-hidden rounded-3xl border border-white/60 bg-white/90 p-7 shadow-lg backdrop-blur-sm"
                  >
                    <Quote
                      className="absolute -top-2 -right-2 h-20 w-20 text-palette-orange/10"
                      fill="currentColor"
                    />
                    <div className="flex items-center gap-1 text-palette-orange">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-palette-orange" />
                      ))}
                    </div>
                    <p className="mt-4 leading-relaxed text-ink-500">
                      &ldquo;{t.message}&rdquo;
                    </p>
                    <div className="mt-6 flex items-center gap-3">
                      <img
                        src={t.avatar}
                        alt={t.name}
                        className="h-12 w-12 rounded-full object-cover ring-2 ring-white"
                      />
                      <div>
                        <div className="font-bold text-ink-500">{t.name}</div>
                        <div className="text-xs text-palette-rose">{t.role}</div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              onClick={() => embla?.scrollPrev()}
              aria-label="আগের"
              className="grid h-11 w-11 place-items-center rounded-full border border-ink-200 bg-white text-ink-500 transition hover:border-palette-orange hover:text-palette-orange"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => embla?.scrollTo(i)}
                  aria-label={`স্লাইড ${i + 1}`}
                  className={`h-2 rounded-full transition-all ${
                    i === selected
                      ? 'w-8 bg-palette-orange'
                      : 'w-2 bg-ink-200'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => embla?.scrollNext()}
              aria-label="পরের"
              className="grid h-11 w-11 place-items-center rounded-full border border-ink-200 bg-white text-ink-500 transition hover:border-palette-orange hover:text-palette-orange"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <BrushDivider color="#FF6B35" className="mt-16" />
      </div>
    </section>
  );
}
