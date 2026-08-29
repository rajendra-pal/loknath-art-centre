'use client';

import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { SectionHeading } from '@/components/ui/section-heading';
import { BrushDivider } from '@/components/ui/brush-divider';
import { features } from '@/lib/data';
import { useLanguage } from '@/lib/i18n/context';
import { tr, ui } from '@/lib/i18n/strings';

export function WhyChooseUs() {
  const { t, language } = useLanguage();
  return (
    <section className="relative section-pad">
      <div className="container">
        <SectionHeading
          eyebrow={tr('whyChooseEyebrow', language)}
          title={
            language === 'bn' ? (
              <>
                যেখানে ছোট হাত শেখে <span className="whitespace-nowrap"><span className="brush-underline">বড়</span> কিছু</span>
              </>
            ) : (
              <>
                Where little hands learn <span className="whitespace-nowrap"><span className="brush-underline">big</span> things</span>
              </>
            )
          }
          description={tr('whyChooseDescription', language)}
        />

        <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
          {features.map((f, i) => {
            const Icon = (Icons as any)[f.icon] ?? Icons.Sparkles;
            return (
              <motion.div
                key={f.title.en}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                whileHover={{ y: -6, rotate: -0.5 }}
                className="group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/60 bg-white/70 p-3 sm:p-6 backdrop-blur-sm transition-all hover:shadow-2xl hover:shadow-ink-500/10"
              >
                <div
                  className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 sm:h-32 sm:w-32 rounded-full opacity-10 transition-opacity group-hover:opacity-30"
                  style={{ background: f.color }}
                />
                <div
                  className="mb-3 sm:mb-5 inline-grid h-9 w-9 sm:h-14 sm:w-14 place-items-center rounded-xl sm:rounded-2xl shadow-lg transition group-hover:scale-110"
                  style={{ background: f.color }}
                >
                  <Icon className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
                </div>
                <h3 className="font-display text-sm sm:text-lg font-bold text-ink-500">
                  {t(f.title)}
                </h3>
                <p className="mt-1 sm:mt-2 text-xs sm:text-sm leading-relaxed text-ink-400">
                  {t(f.description)}
                </p>
              </motion.div>
            );
          })}
        </div>

        <BrushDivider color="#FF6B35" className="mt-8 sm:mt-16" />
      </div>
    </section>
  );
}
