'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ctaContent } from '@/lib/data';

export function CTABanner() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <section ref={ref} className="relative overflow-hidden section-pad">
      <div className="container">
        <motion.div
          style={{ y }}
          className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-palette-orange via-palette-rose to-palette-purple p-12 shadow-2xl md:p-16 lg:p-20"
        >
          {/* Decorative splashes */}
          <svg
            className="pointer-events-none absolute -top-12 -left-12 h-60 w-60 text-white/15"
            viewBox="0 0 200 200"
          >
            <circle cx="100" cy="100" r="50" fill="currentColor" />
            <circle cx="50" cy="60" r="20" fill="currentColor" />
            <circle cx="160" cy="140" r="22" fill="currentColor" />
            <circle cx="160" cy="50" r="15" fill="currentColor" />
          </svg>
          <svg
            className="pointer-events-none absolute -bottom-12 -right-12 h-72 w-72 text-white/10"
            viewBox="0 0 200 200"
          >
            <circle cx="100" cy="100" r="60" fill="currentColor" />
            <circle cx="40" cy="50" r="20" fill="currentColor" />
            <circle cx="170" cy="160" r="25" fill="currentColor" />
          </svg>

          <div className="relative grid items-center gap-10 md:grid-cols-2">
            <div>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white backdrop-blur-sm"
              >
                {ctaContent.badge}
              </motion.span>
              <h2 className="mt-5 font-display text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
                {ctaContent.title1}
                <br />
                <span className="handwritten text-5xl text-white/90 lg:text-7xl">
                  {ctaContent.title2}
                </span>
              </h2>
              <p className="mt-4 max-w-md text-lg text-white/90">
                {ctaContent.description}
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-base font-bold text-ink-500 shadow-2xl transition hover:scale-[1.02]"
              >
                {ctaContent.primary} →
              </a>
              <a
                href="tel:+919876543210"
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/40 bg-white/10 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
              >
                {ctaContent.secondary}
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
