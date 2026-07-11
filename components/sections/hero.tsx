'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { Play, Sparkles, ArrowRight, Star } from 'lucide-react';
import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/components/auth/auth-context';
import { heroContent } from '@/lib/data';
import heroImage from '@/public/images/hero.png';

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

  return (
    <section
      ref={ref}
      id="home"
      className="relative min-h-screen overflow-hidden pt-12"
    >
      {/* Background Image */}
  <div
    className="absolute left-0 right-0 bottom-0 top-20 -z-10 bg-cover bg-center bg-no-repeat"
    style={{
      backgroundImage: "url('/images/hero.png')",
  backgroundSize: "100% auto",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center top",
  top: "50px",
    }}
  />
  {/* <div className="absolute inset-0 bg-white/35 backdrop-blur-[2px] -z-10"></div> */}
      {/* Watercolor washes */}
      {/* <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-palette-orange/20 blur-3xl" />
        <div className="absolute top-40 -right-40 h-[600px] w-[600px] rounded-full bg-palette-purple/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-[400px] w-[400px] rounded-full bg-palette-rose/15 blur-3xl" />
        <div className="absolute top-1/2 right-1/4 h-72 w-72 rounded-full bg-palette-blue/15 blur-3xl" />
      </div> */}

      <div className="container relative z-10 flex items-center min-h-[calc(100vh-80px)]">
        <div className="max-w-2xl flex flex-col justify-end lg:flex-row lg:items-center lg:justify-between gap-8 lg:gap-16">
        {/* <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-12"> */}
          {/* Left content */}
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
              <span>{heroContent.eyebrow}</span>
            </motion.div>

            {/* <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="mt-6 font-bengali text-5xl font-bold leading-[0.95] text-ink-500 sm:text-6xl lg:text-7xl xl:text-8xl"
            >
              <span className="block">{heroContent.headline[0]}</span>
              <span className="block bg-gradient-to-r from-palette-orange via-palette-rose to-palette-purple bg-clip-text text-transparent">
                {heroContent.headline[1]}
              </span>
              <span className="block">{heroContent.headline[2]}</span>
            </motion.h1> */}

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-6 max-w-[480px] text-lg leading-relaxed text-ink-400"
            >
              <span className="font-bold text-ink-500">লোকনাথ আর্ট সেন্টারে</span>
              {' '}
              {heroContent.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <a href="#courses">
                <Button size="lg">
                  {heroContent.primaryCta}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </a>
              <a href="/store">
                <Button size="lg" variant="outline">
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-palette-orange text-white">
                    <Play className="h-3.5 w-3.5 fill-white" />
                  </span>
                  {heroContent.secondaryCta}
                </Button>
              </a>
            </motion.div>

            {/* Social proof */}
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
                <p className="text-xs text-ink-400">{heroContent.socialProof}</p>
              </div>
              
            </motion.div>
          </motion.div>

          {/* Right artistic illustration */}
          <motion.div
            style={{ y: yRight }}
            className="relative h-[520px] lg:h-[600px] xl:h-[980px]"
          >
            {/* Background canvas */}
            {/* <div className="absolute inset-0 rounded-[3rem] border border-white/60 bg-gradient-to-br from-white via-cream-100 to-cream-200 shadow-2xl shadow-ink-500/10">
              <div className="paper-texture absolute inset-0 rounded-[3rem] opacity-50" />
            </div> */}

            {/* Floating paint brushes */}
            {/* <motion.div
              animate={{ rotate: [0, 6, 0], y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-6 -right-2 z-30 h-32 w-12 rotate-[20deg] rounded-full bg-gradient-to-b from-amber-700 via-amber-500 to-amber-300 shadow-2xl"
            >
              <div className="absolute -bottom-2 left-1/2 h-8 w-8 -translate-x-1/2 rounded-full bg-ink-500" />
            </motion.div> */}

            {/* Watercolor splashes */}
            {/* <svg className="absolute -top-12 -left-12 h-40 w-40 text-palette-orange/40" viewBox="0 0 200 200">
              <circle cx="100" cy="100" r="40" fill="currentColor" />
              <circle cx="60" cy="60" r="20" fill="currentColor" />
              <circle cx="150" cy="70" r="15" fill="currentColor" />
              <circle cx="160" cy="140" r="18" fill="currentColor" />
            </svg>
            <svg className="absolute -bottom-10 -right-10 h-44 w-44 text-palette-purple/40" viewBox="0 0 200 200">
              <circle cx="100" cy="100" r="45" fill="currentColor" />
              <circle cx="50" cy="130" r="20" fill="currentColor" />
              <circle cx="150" cy="50" r="22" fill="currentColor" />
            </svg>
            <svg className="absolute top-1/3 right-0 h-28 w-28 text-palette-rose/40" viewBox="0 0 200 200">
              <circle cx="100" cy="100" r="35" fill="currentColor" />
              <circle cx="50" cy="80" r="12" fill="currentColor" />
              <circle cx="160" cy="130" r="15" fill="currentColor" />
            </svg> */}

            {/* Main hero artwork image */}
            {/* <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-6 z-10 overflow-hidden rounded-[2.5rem] shadow-2xl"
            >
              <img
                src={heroImage.src}
                alt="Child painting"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-palette-orange/20 via-transparent to-palette-purple/20" />
            </motion.div> */}

            {/* Floating palette */}
            {/* <motion.div
              animate={{ y: [0, 14, 0], rotate: [0, -3, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute bottom-8 -left-8 z-20 h-28 w-28"
            > */}
              {/* <svg viewBox="0 0 100 100" className="h-full w-full drop-shadow-2xl">
                <path
                  d="M50 8 A 42 42 0 1 1 50 92 A 18 18 0 0 1 50 56 A 18 18 0 0 0 50 8 Z"
                  fill="#FFF9F2"
                  stroke="#2D261B"
                  strokeWidth="1.5"
                />
                <circle cx="28" cy="32" r="6" fill="#FF6B35" />
                <circle cx="50" cy="22" r="6" fill="#FBBF24" />
                <circle cx="72" cy="32" r="6" fill="#8B5CF6" />
                <circle cx="22" cy="58" r="6" fill="#FF5C8A" />
                <circle cx="78" cy="58" r="6" fill="#3B82F6" />
              </svg>
            </motion.div> */}

            {/* Floating paint tube */}
            {/* <motion.div
              animate={{ y: [0, -10, 0], rotate: [0, 8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              className="absolute -top-4 left-12 z-20 h-16 w-32"
            >
              <svg viewBox="0 0 120 60" className="h-full w-full drop-shadow-2xl">
                <rect x="0" y="10" width="100" height="40" rx="6" fill="#FF6B35" />
                <rect x="100" y="20" width="20" height="20" rx="2" fill="#2D261B" />
                <rect x="0" y="10" width="100" height="8" rx="4" fill="#FF8E72" />
              </svg>
            </motion.div> */}

            {/* Bengali heritage pattern */}
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

            {/* Pencil sketch element */}
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
