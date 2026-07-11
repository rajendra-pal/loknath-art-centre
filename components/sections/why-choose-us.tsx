'use client';

import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { SectionHeading } from '@/components/ui/section-heading';
import { BrushDivider } from '@/components/ui/brush-divider';
import { features } from '@/lib/data';

export function WhyChooseUs() {
  return (
    <section className="relative section-pad">
      <div className="container">
        <SectionHeading
          eyebrow="কেন অভিভাবকরা আমাদের বেছে নেন"
          title={
            <>
              যেখানে ছোট হাত শেখে <span className='whitespace-nowrap'><span className="brush-underline">বড়</span> কিছু </span>
            </>
          }
          description="আটটি কারণে লোকনাথ আর্ট সেন্টার বাংলার সবচেয়ে প্রিয় আর্ট স্কুল — শিশু, কিশোর এবং উচ্চাকাঙ্ক্ষী শিল্পীদের জন্য।"
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => {
            const Icon = (Icons as any)[f.icon] ?? Icons.Sparkles;
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                whileHover={{ y: -6, rotate: -0.5 }}
                className="group relative overflow-hidden rounded-3xl border border-white/60 bg-white/70 p-6 backdrop-blur-sm transition-all hover:shadow-2xl hover:shadow-ink-500/10"
              >
                <div
                  className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full opacity-10 transition-opacity group-hover:opacity-30"
                  style={{ background: f.color }}
                />
                <div
                  className="mb-5 inline-grid h-14 w-14 place-items-center rounded-2xl shadow-lg transition group-hover:scale-110"
                  style={{ background: f.color }}
                >
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-display text-lg font-bold text-ink-500">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-400">
                  {f.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        <BrushDivider color="#FF6B35" className="mt-16" />
      </div>
    </section>
  );
}
