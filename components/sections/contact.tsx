'use client';

import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, MessageCircle, Facebook, Instagram, Youtube, Send } from 'lucide-react';
import { SectionHeading } from '@/components/ui/section-heading';
import { Input, Textarea } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { showToast } from '@/components/ui/toaster';
import { contactInfo } from '@/lib/data';
import { useLanguage } from '@/lib/i18n/context';
import { tr, ui } from '@/lib/i18n/strings';
import { useAuth } from '@/components/auth/auth-context';

export function Contact() {
  const { t, language } = useLanguage();
  const { user } = useAuth();
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    showToast({
      title: tr('contactFormSentToast', language),
      description: tr('contactFormSentDescription', language),
      variant: 'success',
    });
    e.currentTarget.reset();
  };

  return (
    <section id="contact" className="relative section-pad">
      <div className="container">
        <SectionHeading
          eyebrow={t(contactInfo.badge)}
          title={
            language === 'bn' ? (
              <>
                একটি <span className="brush-underline">সৃজনশীল</span> যাত্রা শুরু করুন
              </>
            ) : (
              <>
                Start a <span className="brush-underline">creative</span> journey
              </>
            )
          }
          description={t(contactInfo.description)}
        />

        <div className="grid gap-8 lg:grid-cols-5">
          {/* Left: Contact info */}
          <div className="space-y-5 lg:col-span-2">
            {contactInfo.details.map((c, i) => {
              const Icon = (require('lucide-react') as any)[c.icon] ?? MapPin;
              return (
                <motion.div
                  key={`${c.icon}-${i}`}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-start gap-4 rounded-2xl border border-white/60 bg-white/80 p-5 shadow-md backdrop-blur-sm transition hover:shadow-xl"
                >
                  <div
                    className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl"
                    style={{ background: `${c.color}15`, color: c.color }}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-ink-500">{t(c.title)}</h4>
                    {c.lines.map((l, index) => (
                      <p key={`${index}-${language}`} className="text-sm text-ink-400">
                        {t(l)}
                      </p>
                    ))}
                  </div>
                </motion.div>
              );
            })}

            <div className="flex items-center gap-2 pt-2">
              {[
                { icon: Facebook, label: 'Facebook', color: '#3B82F6' },
                { icon: Instagram, label: 'Instagram', color: '#FF5C8A' },
                { icon: Youtube, label: 'YouTube', color: '#FF0000' },
              ].map((s) => (
                <motion.a
                  key={s.label}
                  href="#"
                  whileHover={{ y: -3 }}
                  aria-label={s.label}
                  className="grid h-12 w-12 place-items-center rounded-full bg-white/80 text-ink-500 shadow-md backdrop-blur-sm transition hover:shadow-xl"
                  style={{ color: s.color }}
                >
                  <s.icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Right: Form + Map */}
          <div className="space-y-6 lg:col-span-3">
            <motion.form
              key={user?.id || 'guest'}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              onSubmit={onSubmit}
              className="rounded-3xl border border-white/60 bg-white/80 p-7 shadow-lg backdrop-blur-sm"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-ink-500">
                    {t(contactInfo.form.name)}
                  </label>
                  <Input name="name" required defaultValue={user?.name || ''} placeholder={t(contactInfo.form.placeholders.name)} />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-ink-500">
                    {t(contactInfo.form.phone)}
                  </label>
                  <Input name="phone" type="tel" required defaultValue={user?.phone || ''} placeholder={t(contactInfo.form.placeholders.phone)} />
                </div>
              </div>
              <div className="mt-4">
                <label className="mb-2 block text-sm font-semibold text-ink-500">
                  {t(contactInfo.form.email)}
                </label>
                <Input name="email" type="email" required defaultValue={user?.email || ''} placeholder={t(contactInfo.form.placeholders.email)} />
              </div>
              <div className="mt-4">
                <label className="mb-2 block text-sm font-semibold text-ink-500">
                  {t(contactInfo.form.course)}
                </label>
                <select
                  name="course"
                  className="flex h-12 w-full rounded-2xl border border-ink-200 bg-white/70 px-4 text-base text-ink-500 focus-visible:border-palette-orange focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-palette-orange/30"
                >
                  <option>{language === 'bn' ? 'একটি কোর্স নির্বাচন করুন' : 'Select a course'}</option>
                  <option>{language === 'bn' ? 'বেসিক ড্রয়িং' : 'Basic Drawing'}</option>
                  <option>{language === 'bn' ? 'ওয়াটারকালার পেইন্টিং' : 'Watercolour Painting'}</option>
                  <option>{language === 'bn' ? 'অয়েল পেইন্টিং' : 'Oil Painting'}</option>
                  <option>{language === 'bn' ? 'পোর্ট্রেট ড্রয়িং' : 'Portrait Drawing'}</option>
                  <option>{language === 'bn' ? 'কিডস আর্ট' : 'Kids Art'}</option>
                  <option>{language === 'bn' ? 'প্রফেশনাল ফাইন আর্টস' : 'Professional Fine Arts'}</option>
                </select>
              </div>
              <div className="mt-4">
                <label className="mb-2 block text-sm font-semibold text-ink-500">
                  {t(contactInfo.form.message)}
                </label>
                <Textarea name="message" placeholder={t(contactInfo.form.placeholders.message)} />
              </div>
              <Button type="submit" className="mt-5 w-full" size="lg">
                {t(contactInfo.form.submit)} <Send className="h-4 w-4" />
              </Button>
            </motion.form>

            {/* Map */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="overflow-hidden rounded-3xl border border-white/60 bg-white/80 shadow-lg backdrop-blur-sm"
            >
              <div className="aspect-[16/9] w-full bg-cream-200">
                <iframe
                  title="লোকনাথ আর্ট সেন্টারের অবস্থান"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.427!2d88.3639!3d22.5526!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDMzJzA5LjQiTiA4OMKwMjEnNTAuMCJF!5e0!3m2!1sen!2sin!4v1700000000000"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
