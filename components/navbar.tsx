'use client';

import Image from "next/image";
import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu, X, Phone, Sparkles } from 'lucide-react';
import { navLinks } from '@/lib/data';
import { Button } from '@/components/ui/button';
// import { useTheme } from '@/components/theme-provider';
import { useAuth } from '@/components/auth/auth-context';
import { AuthButton } from '@/components/auth/auth-button';
import { cn } from '@/lib/utils';

export function Navbar() {
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [activeHref, setActiveHref] = React.useState('#home');
  // const { resolvedTheme, setTheme } = useTheme();
  const { openLogin } = useAuth();
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const isStorePage = pathname.startsWith('/store');
  const displayedNavLinks = isStorePage
    ? [
        { label: 'Home', href: '/#home' },
        { label: 'Art Store', href: '/store' },
        { label: 'Contact', href: '/#contact' },
      ]
    : navLinks;
  const isLinkActive = (href: string) =>
    activeHref === href || (href === '/store' && isStorePage);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 30);
  });

  React.useEffect(() => {
    if (pathname !== '/') {
      setActiveHref(pathname);
      return;
    }

    const sectionLinks = navLinks.filter((link) => link.href.startsWith('#'));

    const updateActiveSection = () => {
      const activationLine = window.innerHeight * 0.38;
      let currentHref = sectionLinks[0]?.href ?? '#home';

      for (const link of sectionLinks) {
        const section = document.getElementById(link.href.slice(1));

        if (!section) {
          continue;
        }

        if (section.getBoundingClientRect().top <= activationLine) {
          currentHref = link.href;
        }
      }

      setActiveHref(currentHref);
    };

    updateActiveSection();
    window.addEventListener('scroll', updateActiveSection, { passive: true });
    window.addEventListener('resize', updateActiveSection);

    return () => {
      window.removeEventListener('scroll', updateActiveSection);
      window.removeEventListener('resize', updateActiveSection);
    };
  }, [pathname]);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        isStorePage
          ? 'border-b border-ink-100/50 bg-cream-100/90 backdrop-blur-xl shadow-sm'
          : scrolled
          ? 'border-b border-ink-100/50 bg-cream-100/80 backdrop-blur-xl shadow-sm'
          : 'bg-transparent'
      )}
    >
      <nav className="container flex h-20 items-center justify-between">
        {/* Logo */}
        <Link href={pathname === '/' ? '#home' : '/#home'} className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: -8, scale: 1.05 }}
            className="relative h-14 w-14"
          >
            <Image
              src="/logo.png"
              alt="Loknath Art Centre"
              fill
              className="object-contain"
              priority
            />
          </motion.div>
          <div className="flex flex-col leading-tight">
            <span className="font-display text-lg font-bold text-ink-500">
              Loknath
            </span>
            <span
              className={cn(
                'text-[10px] font-semibold uppercase tracking-[0.18em]',
                isStorePage ? 'text-palette-purple' : 'text-palette-orange'
              )}
            >
              Art Center
            </span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <ul className={cn('hidden xl:flex items-center', isStorePage ? 'gap-8' : 'gap-1')}>
          {displayedNavLinks.map((link) => {
            const isActive = isLinkActive(link.href);

            return (
              <li key={link.href} className="group">
                <Link
                  href={link.href}
                  className={cn(
                    'relative px-3 py-2 text-base font-medium text-ink-500 transition hover:text-palette-orange',
                    isStorePage && 'text-lg',
                    isActive && (isStorePage ? 'text-palette-purple' : 'text-palette-orange')
                  )}
                >
                  <span>{link.label}</span>
                  <span
                    className={cn(
                      'absolute left-3 right-3 -bottom-0.5 h-0.5 origin-left scale-x-0 rounded-full bg-gradient-to-r from-palette-orange to-palette-rose transition-transform duration-300 group-hover:scale-x-100',
                      isStorePage && 'from-palette-purple to-palette-rose',
                      isActive && 'scale-x-100'
                    )}
                  />
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Right side */}
        <div className="hidden xl:flex items-center gap-3">
          {/* <button
            aria-label="Toggle theme"
            onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
            className="grid h-10 w-10 place-items-center rounded-full bg-white/70 text-ink-500 backdrop-blur transition hover:bg-white hover:text-palette-orange"
          >
            {resolvedTheme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button> */}
          <a
            href="tel:+919876543210"
            className="flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-sm font-medium text-ink-500 backdrop-blur transition hover:bg-white"
          >
            <Phone className="h-4 w-4 text-palette-orange" />
            <span className="hidden lg:inline">+91 62963 77408</span>
          </a>
          <AuthButton />
          <Button size="sm" onClick={() => openLogin('register', 'customer')}>
            <Sparkles className="h-4 w-4" />
            Enroll Now
          </Button>
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center gap-2 xl:hidden">
          <AuthButton />
          {/* <button
            aria-label="Toggle theme"
            onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
            className="grid h-10 w-10 place-items-center rounded-full bg-white/70 text-ink-500 backdrop-blur"
          >
            {resolvedTheme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button> */}
          <button
            aria-label="Open menu"
            onClick={() => setOpen(!open)}
            className="grid h-10 w-10 place-items-center rounded-full bg-white/70 text-ink-500 backdrop-blur"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="xl:hidden border-t border-ink-100 bg-cream-100/95 backdrop-blur-xl"
          >
            <div className="container py-6">
              <ul className="space-y-1">
                {displayedNavLinks.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        'flex items-center justify-between rounded-2xl px-4 py-3 text-base font-medium text-ink-500 transition hover:bg-white hover:text-palette-orange',
                        isLinkActive(link.href) &&
                          (isStorePage ? 'bg-white text-palette-purple' : 'bg-white text-palette-orange')
                      )}
                    >
                      {link.label}
                      <span className="text-palette-orange">→</span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-6 flex flex-col gap-3">
                <a
                  href="tel:+916296377408"
                  className="flex items-center justify-center gap-2 rounded-full bg-white px-4 py-3 text-sm font-medium text-ink-500"
                >
                  <Phone className="h-4 w-4 text-palette-orange" />
                  +91 62963 77408
                </a>
                <Button onClick={() => { openLogin('register', 'customer'); setOpen(false); }}>
                  <Sparkles className="h-4 w-4" />
                  Enroll Now
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
