'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Facebook, Instagram, Youtube, Send, MapPin, Mail, Phone, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { showToast } from '@/components/ui/toaster';
import { navLinks, storeCategories, footerContent } from '@/lib/data';
import { useAuth } from '@/components/auth/auth-context';

export function Footer() {
  const { openLogin } = useAuth();
  const onSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const email = data.get('email') as string;
    if (!email) return;
    showToast({
      title: footerContent.newsletter.success,
      description: footerContent.newsletter.successDesc,
      variant: 'success',
    });
    e.currentTarget.reset();
  };

  return (
    <footer className="relative mt-20 overflow-hidden bg-ink-500 text-cream-100">
      {/* Watercolor splashes */}
      <div className="pointer-events-none absolute -top-32 -left-20 h-80 w-80 rounded-full bg-palette-orange opacity-20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-palette-purple opacity-20 blur-3xl" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-60 w-60 -translate-x-1/2 rounded-full bg-palette-rose opacity-15 blur-3xl" />

      <div className="container relative py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-12">
          {/* Brand & newsletter */}
          <div className="lg:col-span-5">
            <Link href="#home" className="inline-flex items-center gap-3">
              <svg viewBox="0 0 48 48" className="h-12 w-12">
                <defs>
                  <linearGradient id="footerLogoGrad" x1="0" x2="1" y1="0" y2="1">
                    <stop offset="0%" stopColor="#FF6B35" />
                    <stop offset="50%" stopColor="#FF5C8A" />
                    <stop offset="100%" stopColor="#A78BFA" />
                  </linearGradient>
                </defs>
                <path
                  d="M8 36 Q 10 18, 24 12 Q 38 18, 40 36 Q 24 42, 8 36 Z"
                  fill="url(#footerLogoGrad)"
                />
                <path
                  d="M16 28 Q 20 22, 24 26 Q 28 22, 32 28 Q 28 34, 24 32 Q 20 34, 16 28 Z"
                  fill="#FFF9F2"
                />
              </svg>
              <div>
                <div className="font-display text-2xl font-bold">{footerContent.brand}</div>
                <div className="text-xs uppercase tracking-[0.18em] text-palette-orange">
                  {footerContent.brandSub}
                </div>
              </div>
            </Link>
            <p className="mt-5 max-w-md leading-relaxed text-cream-100/80">
              {footerContent.description}
            </p>

            <form
              onSubmit={onSubscribe}
              className="mt-6 flex max-w-md flex-col gap-3 sm:flex-row"
            >
              <Input
                type="email"
                name="email"
                required
                placeholder={footerContent.newsletter.placeholder}
                className="border-white/20 bg-white/10 text-cream-100 placeholder:text-cream-100/50"
              />
              <Button type="submit">
                <Send className="h-4 w-4" />
                {footerContent.newsletter.button}
              </Button>
            </form>
            <p className="mt-3 text-xs text-cream-100/60">
              {footerContent.newsletter.note}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={() => openLogin('login', 'customer')}
                className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold text-white transition hover:bg-white/20"
              >
                Customer Login
              </button>
              <button
                onClick={() => openLogin('login', 'admin')}
                className="rounded-full border border-palette-purple/50 bg-palette-purple/20 px-4 py-2 text-xs font-semibold text-white transition hover:bg-palette-purple/30"
              >
                Admin Login
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="mb-4 text-sm font-bold uppercase tracking-widest text-palette-orange">
              {footerContent.explore}
            </h4>
            <ul className="space-y-2">
              {navLinks.slice(0, 6).map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-cream-100/80 transition hover:text-palette-orange"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Store Categories */}
          <div className="lg:col-span-2">
            <h4 className="mb-4 text-sm font-bold uppercase tracking-widest text-palette-orange">
              {footerContent.store}
            </h4>
            <ul className="space-y-2">
              {storeCategories.slice(0, 6).map((c) => (
                <li key={c}>
                  <Link
                    href="#store"
                    className="text-sm text-cream-100/80 transition hover:text-palette-orange"
                  >
                    {c}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h4 className="mb-4 text-sm font-bold uppercase tracking-widest text-palette-orange">
              {footerContent.reach}
            </h4>
            <ul className="space-y-3 text-sm text-cream-100/80">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 text-palette-orange" />
                <span>{footerContent.address}</span>
              </li>
              <li>
                <a href="tel:+919876543210" className="flex items-center gap-3 hover:text-palette-orange">
                  <Phone className="h-4 w-4 text-palette-orange" />
                  +91 62963 77408
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@loknathart.in"
                  className="flex items-center gap-3 hover:text-palette-orange"
                >
                  <Mail className="h-4 w-4 text-palette-orange" />
                  hello@loknathart.in
                </a>
              </li>
            </ul>
            <div className="mt-5 flex items-center gap-2">
              {[
                { icon: Facebook, href: '#' },
                { icon: Instagram, href: '#' },
                { icon: Youtube, href: '#' },
              ].map((s, i) => (
                <motion.a
                  key={i}
                  href={s.href}
                  whileHover={{ y: -3, scale: 1.05 }}
                  className="grid h-10 w-10 place-items-center rounded-full bg-white/10 transition hover:bg-palette-orange"
                >
                  <s.icon className="h-4 w-4" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-sm text-cream-100/60">{footerContent.copyright}</p>
          <div className="flex items-center gap-5 text-sm text-cream-100/60">
            <Link href="#" className="hover:text-palette-orange">
              {footerContent.privacy}
            </Link>
            <Link href="#" className="hover:text-palette-orange">
              {footerContent.terms}
            </Link>
            <Link
              href="#home"
              className="inline-flex items-center gap-1 text-palette-orange hover:underline"
            >
              {footerContent.backToTop} <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
