'use client';

import { motion } from 'framer-motion';
import { HelpCircle } from 'lucide-react';
import { SectionHeading } from '@/components/ui/section-heading';
import { BrushDivider } from '@/components/ui/brush-divider';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { faqs } from '@/lib/data';

export function FAQ() {
  return (
    <section className="relative section-pad">
      <div className="container max-w-4xl">
        <SectionHeading
          eyebrow="প্রায়শই জিজ্ঞাসিত"
          title={
            <>
              কোনো <span className="brush-underline">প্রশ্ন?</span>
            </>
          }
          description="স্টুডিওতে যোগ দেওয়ার আগে আপনার জানতে চাওয়া সবকিছু।"
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl border border-white/60 bg-white/80 p-4 shadow-lg backdrop-blur-sm md:p-8"
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((f) => (
              <AccordionItem key={f.id} value={f.id}>
                <AccordionTrigger>
                  <span className="flex items-center gap-3">
                    <HelpCircle className="h-5 w-5 text-palette-orange" />
                    {f.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="pl-8 leading-relaxed text-ink-400">{f.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        <BrushDivider color="#FF5C8A" className="mt-16" />
      </div>
    </section>
  );
}
