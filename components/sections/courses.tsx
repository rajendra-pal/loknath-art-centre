'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Users, BookOpen, ArrowRight, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { SectionHeading } from '@/components/ui/section-heading';
import { BrushDivider } from '@/components/ui/brush-divider';
import { courses, Course } from '@/lib/data';

const levelColors: Record<string, string> = {
  শুরু: '#10B981',
  মধ্যম: '#3B82F6',
  উচ্চ: '#FF6B35',
  'সকল স্তর': '#8B5CF6',
};

export function Courses() {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  return (
    <section id="courses" className="relative section-pad">
      <div className="container">
        <SectionHeading
          eyebrow="আমাদের কোর্সসমূহ"
          title={
            <>
              ১৫টি কোর্স।<br/> <span className="brush-underline">একটি</span> সৃজনশীল যাত্রা।
            </>
          }
          description="বেসিক ড্রয়িং থেকে শুরু করে প্রোফেসনাল ফাইন আর্টস পর্যন্ত — প্রতিটি বয়স, স্তর ও স্বপ্নের জন্য উপযুক্ত ক্লাস।"
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.5, delay: (i % 6) * 0.05 }}
              whileHover={{ y: -8 }}
              onClick={() => setSelectedCourse(c)}
              className="group relative cursor-pointer overflow-hidden rounded-3xl border border-white/60 bg-white/80 shadow-lg shadow-ink-500/5 backdrop-blur-sm transition-all hover:shadow-2xl"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={c.image}
                  alt={c.titleBn}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-500/60 via-transparent to-transparent" />
                <div
                  className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold backdrop-blur-sm"
                  style={{ color: c.color }}
                >
                  {c.level}
                </div>
                <div
                  className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full"
                  style={{ background: c.color }}
                >
                  <BookOpen className="h-4 w-4 text-white" />
                </div>
              </div>

              {/* Body */}
              <div className="p-6">
                <h3 className="font-display text-xl font-bold text-ink-500">
                  {c.titleBn}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-400 line-clamp-2">
                  {c.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-2 text-xs">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-ink-50 px-3 py-1 text-ink-500">
                    <Users className="h-3 w-3" /> {c.ageGroup}
                  </span>
                  <span
                    className="inline-flex items-center gap-1.5 rounded-full px-3 py-1"
                    style={{
                      background: `${levelColors[c.level]}15`,
                      color: levelColors[c.level],
                    }}
                  >
                    {c.level}
                  </span>
                </div>

                <Link
                  href="#contact"
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-palette-orange transition hover:gap-2.5"
                  onClick={(e) => e.stopPropagation()}
                >
                  বিস্তারিত জানুন
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full border-2 border-palette-orange bg-white px-8 py-3 font-semibold text-palette-orange transition hover:bg-palette-orange hover:text-white"
          >
            সকল কোর্স দেখুন
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <BrushDivider color="#FF6B35" className="mt-16" />
      </div>

      {/* Course Detail Modal */}
      <AnimatePresence>
        {selectedCourse && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={() => setSelectedCourse(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-3xl bg-white"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedCourse(null)}
                className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-lg transition hover:bg-white"
              >
                <X className="h-5 w-5 text-ink-500" />
              </button>

              <div className="flex flex-col lg:flex-row">
                {/* Full Image */}
                <div className="relative w-full lg:w-1/2">
                  <img
                    src={selectedCourse.image}
                    alt={selectedCourse.titleBn}
                    className="h-full w-full object-cover"
                    style={{ height: '100%', minHeight: '300px' }}
                  />
                </div>

                {/* Course Details */}
                <div className="flex w-full flex-col justify-center p-8 lg:w-1/2">
                  <div
                    className="inline-flex w-fit items-center gap-2 rounded-full px-3 py-1 text-sm font-medium"
                    style={{
                      background: `${selectedCourse.color}15`,
                      color: selectedCourse.color,
                    }}
                  >
                    <BookOpen className="h-4 w-4" />
                    {selectedCourse.category}
                  </div>

                  <h2 className="mt-4 font-display text-3xl font-bold text-ink-500">
                    {selectedCourse.titleBn}
                  </h2>

                  <p className="mt-4 text-lg leading-relaxed text-ink-400">
                    {selectedCourse.description}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-4">
                    <div className="flex items-center gap-2 rounded-full bg-ink-50 px-4 py-2">
                      <Users className="h-5 w-5 text-palette-orange" />
                      <span className="font-medium text-ink-500">{selectedCourse.ageGroup}</span>
                    </div>
                    <div
                      className="flex items-center gap-2 rounded-full px-4 py-2"
                      style={{
                        background: `${levelColors[selectedCourse.level]}15`,
                        color: levelColors[selectedCourse.level],
                      }}
                    >
                      <span className="font-medium">{selectedCourse.level}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedCourse(null);
                      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-palette-orange px-8 py-3 font-semibold text-white transition hover:bg-palette-orange/90"
                  >
                    এখনই ভর্তি হোন
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}