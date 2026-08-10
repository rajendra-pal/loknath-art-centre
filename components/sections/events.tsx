'use client';

import { motion } from 'framer-motion';
import { Calendar, Trophy, Hammer, Palette, ArrowRight } from 'lucide-react';
import { SectionHeading } from '@/components/ui/section-heading';
import { BrushDivider } from '@/components/ui/brush-divider';
import { events } from '@/lib/data';
import { useLanguage } from '@/lib/i18n/context';
import { tr } from '@/lib/i18n/strings';

const typeStyles: Record<string, { bg: string; color: string; icon: any }> = {
  প্রতিযোগিতা: { bg: 'bg-palette-orange/10', color: 'text-palette-orange', icon: Trophy },
  Competition: { bg: 'bg-palette-orange/10', color: 'text-palette-orange', icon: Trophy },
  কর্মশালা: { bg: 'bg-palette-purple/10', color: 'text-palette-purple', icon: Hammer },
  Workshop: { bg: 'bg-palette-purple/10', color: 'text-palette-purple', icon: Hammer },
  প্রদর্শনী: { bg: 'bg-palette-rose/10', color: 'text-palette-rose', icon: Palette },
  Exhibition: { bg: 'bg-palette-rose/10', color: 'text-palette-rose', icon: Palette },
  ক্যাম্প: { bg: 'bg-palette-blue/10', color: 'text-palette-blue', icon: Calendar },
  Camp: { bg: 'bg-palette-blue/10', color: 'text-palette-blue', icon: Calendar },
};

export function Events() {
  const { t, language } = useLanguage();
  return (
    <section id="events" className="relative section-pad">
      <div className="container">
        <SectionHeading
          eyebrow={tr('eventsEyebrow', language)}
          title={
            language === 'bn' ? (
              <>
                সৃজনশীলতার <span className="brush-underline">উদযাপন</span>
              </>
            ) : (
              <>
                A celebration of <span className="brush-underline">creativity</span>
              </>
            )
          }
          description={tr('eventsDescription', language)}
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((e, i) => {
            const typeText = t(e.type);
            const style = typeStyles[typeText] ?? typeStyles[t(e.type)];
            const Icon = style.icon;
            return (
              <motion.article
                key={e.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.5, delay: (i % 6) * 0.05 }}
                whileHover={{ y: -8 }}
                className="group relative overflow-hidden rounded-3xl border border-white/60 bg-white/80 shadow-lg shadow-ink-500/5 backdrop-blur-sm transition-all hover:shadow-2xl"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={e.image}
                    alt={t(e.title)}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-500/70 via-ink-500/0 to-transparent" />
                  <span
                    className={`absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full ${style.bg} px-3 py-1 text-xs font-semibold backdrop-blur-sm ${style.color}`}
                  >
                    <Icon className="h-3 w-3" />
                    {typeText}
                  </span>
                  <span className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-ink-500 backdrop-blur-sm">
                    {e.date}
                  </span>
                </div>

                <div className="p-6">
                  <h3 className="font-display text-xl font-bold text-ink-500 transition group-hover:text-palette-orange">
                    {t(e.title)}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-400">
                    {t(e.description)}
                  </p>
                  <button
                    className={`mt-4 inline-flex items-center gap-1.5 text-sm font-semibold ${style.color} transition hover:gap-2.5`}
                  >
                    {tr('learnMoreCta', language)}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </motion.article>
            );
          })}
        </div>

        <BrushDivider color="#8B5CF6" className="mt-16" />
      </div>
    </section>
  );
}
