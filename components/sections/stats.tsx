'use client';

import { motion, useInView, animate } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { stats } from '@/lib/data';

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
  return (
    <section className="relative section-pad">
      <div className="container">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              className="group relative overflow-hidden rounded-3xl border border-white/60 bg-white/80 p-8 shadow-lg shadow-ink-500/5 backdrop-blur-sm transition-all hover:shadow-2xl"
            >
              {/* Watercolor wash background */}
              <div
                className="pointer-events-none absolute -top-12 -right-12 h-32 w-32 rounded-full blur-2xl opacity-20 transition group-hover:opacity-40"
                style={{ background: s.color }}
              />

              <div
                className="font-display text-6xl font-bold"
                style={{ color: s.color }}
              >
                <Counter to={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-2 text-sm font-medium uppercase tracking-widest text-ink-400">
                {s.label}
              </div>

              {/* Hand-drawn accent */}
              <svg
                viewBox="0 0 100 12"
                className="mt-4 h-2 w-24 overflow-visible"
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
