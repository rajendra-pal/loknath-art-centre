'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { Play, Sparkles, ArrowRight, Star } from 'lucide-react';
import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/components/auth/auth-context';
import { heroContent } from '@/lib/data';
import { useLanguage } from '@/lib/i18n/context';

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const yLeft = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const yRight = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const { openLogin } = useAuth();
  const { t } = useLanguage();

  return (
    <section
      ref={ref}
      id="home"
      className="relative min-h-screen overflow-hidden pt-12"
    >
      <div
        className="absolute left-0 right-0 bottom-0 top-20 -z-10 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/hero.png')",
          backgroundSize: '100% auto',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center top',
          top: '50px',
        }}
      />

      <div className="container relative z-10 flex items-center min-h-[calc(100vh-80px)]">
        <div className="max-w-2xl flex flex-col justify-end lg:flex-row lg:items-center lg:justify-between gap-8 lg:gap-16">
          <motion.div
            style={{ y: yLeft, opacity }}
            className="relative z-10 pt-52 lg:pt-28 self-center lg:pl-4"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="inline-flex items-center gap-2 rounded-full border border-palette-orange/20 bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-palette-orange backdrop-blur-sm"
            >
              <Sparkles className="h-3 w-3" />
              <span>{t(heroContent.eyebrow)}</span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-6 max-w-[480px] text-lg leading-relaxed text-ink-400"
            >
              <span className="font-bold text-ink-500">{t(heroContent.brandLead)}</span>{' '}
              {t(heroContent.description)}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <a href="#courses">
                <Button size="lg">
                  {t(heroContent.primaryCta)}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </a>
              <a href="/store">
                <Button size="lg" variant="outline">
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-palette-orange text-white">
                    <Play className="h-3.5 w-3.5 fill-white" />
                  </span>
                  {t(heroContent.secondaryCta)}
                </Button>
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="mt-10 flex items-center gap-4"
            >
              <div className="flex -space-x-3">
                {[
                  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80',
                  'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=80&q=80',
                  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&q=80',
                  'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&q=80',
                ].map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt={`Student ${i + 1}`}
                    className="h-10 w-10 rounded-full border-2 border-cream-100 object-cover"
                  />
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1 text-palette-orange">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-palette-orange" />
                  ))}
                  <span className="ml-1 text-sm font-semibold text-ink-500">৪.৯</span>
                </div>
                <p className="text-xs text-ink-400">{t(heroContent.socialProof)}</p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            style={{ y: yRight }}
            className="relative h-[520px] lg:h-[600px] xl:h-[980px]"
          >
            <svg
              className="absolute bottom-16 right-8 h-24 w-24 text-palette-yellow/60"
              viewBox="0 0 100 100"
            >
              <g fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <circle cx="50" cy="50" r="30" />
                <path d="M50 20 L50 80 M20 50 L80 50" />
                <path d="M30 30 L70 70 M70 30 L30 70" />
                <circle cx="50" cy="50" r="12" />
              </g>
            </svg>

            <svg
              className="absolute top-12 left-8 h-20 w-20 text-ink-300/40"
              viewBox="0 0 100 100"
            >
              <path
                d="M20 80 Q 30 60, 50 50 T 80 30"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
              />
              <path
                d="M20 70 Q 35 50, 55 45 T 85 25"
                stroke="currentColor"
                strokeWidth="1"
                fill="none"
                strokeLinecap="round"
                strokeDasharray="2,3"
              />
            </svg>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
