'use client';

import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { SectionHeading } from '@/components/ui/section-heading';
import { BrushDivider } from '@/components/ui/brush-divider';
import { blogPosts } from '@/lib/data';
import { useLanguage } from '@/lib/i18n/context';
import { tr } from '@/lib/i18n/strings';

const categoryColors: Record<string, string> = {
  'ওয়াটারকালার গাইড': '#3B82F6',
  'Watercolour Guide': '#3B82F6',
  'আর্ট ক্যারিয়ার': '#8B5CF6',
  'Art Career': '#8B5CF6',
  'স্কেচিং কৌশল': '#FF6B35',
  'Sketching Tips': '#FF6B35',
  'অয়েল পেইন্টিং টিপস': '#FBBF24',
  'Oil Painting Tips': '#FBBF24',
  'আঁকার টিপস': '#FF5C8A',
  'Drawing Tips': '#FF5C8A',
  'শিশুদের সৃজনশীলতা': '#10B981',
  "Kids' Creativity": '#10B981',
};

export function Blog() {
  const { t, language } = useLanguage();
  return (
    <section id="blog" className="relative section-pad">
      <div className="container">
        <SectionHeading
          eyebrow={tr('blogEyebrow', language)}
          title={
            language === 'bn' ? (
              <>
                টিপস, কৌশল ও <span className="brush-underline">অনুপ্রেরণা</span>
              </>
            ) : (
              <>
                Tips, techniques & <span className="brush-underline">inspiration</span>
              </>
            )
          }
          description={tr('blogDescription', language)}
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((p, i) => (
            <motion.article
              key={p.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.05 }}
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-3xl border border-white/60 bg-white/80 shadow-lg shadow-ink-500/5 backdrop-blur-sm transition-all hover:shadow-2xl"
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={p.image}
                  alt={t(p.title)}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <span
                  className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold backdrop-blur-sm"
                  style={{ color: categoryColors[t(p.category)] ?? '#FF6B35' }}
                >
                  {t(p.category)}
                </span>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 text-xs text-ink-400">
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="h-3 w-3" /> {p.date}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {t(p.readTime)}
                  </span>
                </div>
                <h3 className="mt-3 font-display text-xl font-bold text-ink-500 transition group-hover:text-palette-orange">
                  {t(p.title)}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-400 line-clamp-2">
                  {t(p.excerpt)}
                </p>
                <Link
                  href="#blog"
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-palette-orange transition hover:gap-2.5"
                >
                  {tr('readArticle', language)}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        <BrushDivider color="#10B981" className="mt-16" />
      </div>
    </section>
  );
}
