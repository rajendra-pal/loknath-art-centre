'use client';

import { motion } from 'framer-motion';
import { Award, GraduationCap, Heart, Target } from 'lucide-react';
import { BrushDivider } from '@/components/ui/brush-divider';
import { aboutContent } from '@/lib/data';

export function About() {
  return (
    <section id="about" className="relative overflow-hidden section-pad">
      <div className="container">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative w-full max-w-sm mx-auto lg:mx-0 lg:max-w-lg"
          >
            <div className="absolute inset-0 rotate-3 rounded-[3rem] bg-gradient-to-br from-palette-orange/20 to-palette-purple/20" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[3rem] shadow-2xl">
              <img
                src="/images/rakhal mokhopadhyay.png"
                alt="রাখাল মুখোপাধ্যায় - শিল্পী"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-500/70 via-ink-500/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 z-10 px-6 pb-7 pt-16 text-center">
                <p className="text-2xl font-extrabold leading-tight text-white drop-shadow-lg sm:text-3xl">
                  শিল্পী - রাখাল মুখোপাধ্যায়
                </p>
              </div>
            </div>

            {/* Floating badge */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -left-4 top-10 z-10 rounded-2xl bg-white p-4 shadow-xl"
            >
              <div className="flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-full bg-palette-orange/10">
                  <Award className="h-6 w-6 text-palette-orange" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-ink-500">15+</div>
                  <div className="text-xs text-ink-400">{aboutContent.experienceBadge}</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
              className="absolute -right-4 top-1/2 z-10 rounded-2xl bg-white p-4 shadow-xl"
            >
              <div className="flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-full bg-palette-purple/10">
                  <GraduationCap className="h-6 w-6 text-palette-purple" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-ink-500">৫০০+</div>
                  <div className="text-xs text-ink-400">{aboutContent.studentsBadge}</div>
                </div>
              </div>
            </motion.div>

            {/* Watercolor splash */}
            <svg className="absolute -bottom-10 -left-10 h-40 w-40 text-palette-rose/30" viewBox="0 0 200 200">
              <circle cx="100" cy="100" r="40" fill="currentColor" />
              <circle cx="50" cy="60" r="18" fill="currentColor" />
              <circle cx="150" cy="150" r="20" fill="currentColor" />
            </svg>
          </motion.div>

          {/* Content side */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-palette-purple/20 bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-palette-purple backdrop-blur-sm">
              {aboutContent.badge}
            </div>
            <h2 className="mt-5 heading-lg text-ink-500">
              {aboutContent.titleBefore}{' '}
              <span className="bg-gradient-to-r from-palette-orange to-palette-rose bg-clip-text text-transparent">
                {aboutContent.titleHighlight}
              </span>
              {aboutContent.titleAfter}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink-400">
              {aboutContent.description}
            </p>

            {/* Quote */}
            <blockquote className="my-8 rounded-3xl border-l-4 border-palette-orange bg-white/60 p-6 backdrop-blur-sm">
              <p className="handwritten text-2xl leading-relaxed text-ink-500">
                {aboutContent.quote}
              </p>
              <footer className="mt-3 text-sm text-ink-400">{aboutContent.quoteAuthor}</footer>
            </blockquote>

            {/* Mission & Vision */}
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  icon: Target,
                  title: aboutContent.missionTitle,
                  desc: aboutContent.missionDesc,
                  color: '#FF6B35',
                },
                {
                  icon: Heart,
                  title: aboutContent.visionTitle,
                  desc: aboutContent.visionDesc,
                  color: '#8B5CF6',
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-white/60 bg-white/70 p-5 backdrop-blur-sm"
                >
                  <item.icon
                    className="h-6 w-6"
                    style={{ color: item.color }}
                  />
                  <h4 className="mt-3 font-bold text-ink-500">{item.title}</h4>
                  <p className="mt-1 text-sm leading-relaxed text-ink-400">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <BrushDivider color="#8B5CF6" className="mt-16" />
      </div>
    </section>
  );
}
