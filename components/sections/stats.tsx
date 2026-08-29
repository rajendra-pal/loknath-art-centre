'use client';

import { motion, useInView, animate } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { stats } from '@/lib/data';
import { useLanguage } from '@/lib/i18n/context';

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 2,
      ease: 'easeOut',
      onUpdate: (v) => setVal(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to]);

  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
}

export function Stats() {
  const { t } = useLanguage();
  return (
    <section className="relative section-pad">
      <div className="container">
        <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label.en}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              className="group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/60 bg-white/80 p-4 sm:p-8 shadow-lg shadow-ink-500/5 backdrop-blur-sm transition-all hover:shadow-2xl"
            >
              <div
                className="pointer-events-none absolute -top-12 -right-12 h-32 w-32 rounded-full blur-2xl opacity-20 transition group-hover:opacity-40"
                style={{ background: s.color }}
              />

              <div
                className="font-display text-4xl sm:text-6xl font-bold"
                style={{ color: s.color }}
              >
                <Counter to={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-1 text-[10px] sm:text-sm font-medium uppercase tracking-widest text-ink-400">
                {t(s.label)}
              </div>

              <svg
                viewBox="0 0 100 12"
                className="mt-2 sm:mt-4 h-2 w-16 sm:w-24 overflow-visible"
                style={{ color: s.color }}
              >
                <path
                  d="M2 8 Q 25 2, 50 6 T 98 4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  fill="none"
                  opacity="0.6"
                />
              </svg>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
