'use client';

import * as React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { motion } from 'framer-motion';
import { Star, Heart, ShoppingCart, Zap, BadgeCheck, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { SectionHeading } from '@/components/ui/section-heading';
import { BrushDivider } from '@/components/ui/brush-divider';
import { shopFeatures, storeCategories, products } from '@/lib/data';
import { formatPrice, cn } from '@/lib/utils';
import { showToast } from '@/components/ui/toaster';
import { useAuth } from '@/components/auth/auth-context';

const badgeStyles: Record<string, string> = {
  'সর্বাধিক বিক্রিত': 'bg-palette-orange text-white',
  'নতুন আগমন': 'bg-palette-purple text-white',
  'সীমিত অফার': 'bg-palette-rose text-white',
};

export function Store() {
  const [emblaRef] = useEmblaCarousel({ loop: true, align: 'start' });
  const { user } = useAuth();
  return (
    <section id="store" className="relative overflow-hidden section-pad">
      <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-palette-orange/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 bottom-20 h-96 w-96 rounded-full bg-palette-purple/10 blur-3xl" />

      <div className="container">
        <SectionHeading
          eyebrow="নতুন! আর্ট স্টোর"
          title={
            <>
              প্রিমিয়াম সরঞ্জাম,{' '}
              <span className="brush-underline">সাশ্রয়ী মূল্যে</span>
            </>
          }
          description="একই শিল্পীর কাছ থেকে যিনি আপনার সন্তানদের শেখান। ছাত্র-ছাত্রী, শখের শিল্পী ও পেশাদারদের জন্য বাছাই করা সরঞ্জাম।"
        />

        {/* Category pills */}
        <div className="mb-10 flex flex-wrap items-center justify-center gap-2">
          {storeCategories.slice(0, 12).map((c) => (
            <button
              key={c}
              className="rounded-full bg-white/70 px-4 py-1.5 text-xs font-medium text-ink-500 backdrop-blur-sm transition hover:bg-palette-orange hover:text-white"
            >
              {c}
            </button>
          ))}
          <Link href="/store" className="rounded-full bg-ink-500 px-4 py-1.5 text-xs font-medium text-white hover:bg-ink-600">
            সব দেখুন →
          </Link>
        </div>

        {/* Featured products carousel */}
        <div className="relative -mx-4 px-4">
          <div ref={emblaRef} className="overflow-hidden">
            <div className="flex gap-6">
              {products.map((p) => (
                <div
                  key={p.id}
                  className="flex-[0_0_85%] sm:flex-[0_0_50%] md:flex-[0_0_40%] lg:flex-[0_0_25%]"
                >
                  <motion.div
                    whileHover={{ y: -8 }}
                    className="group relative h-full overflow-hidden rounded-3xl border border-white/60 bg-white/90 shadow-lg backdrop-blur-sm transition-all hover:shadow-2xl"
                  >
                    {/* Badge */}
                    {p.badge && (
                      <span
                        className={cn(
                          'absolute left-4 top-4 z-10 inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold shadow-md',
                          badgeStyles[p.badge]
                        )}
                      >
                        {p.badge === 'সর্বাধিক বিক্রিত' && <BadgeCheck className="h-3 w-3" />}
                        {p.badge === 'নতুন আগমন' && <Sparkles className="h-3 w-3" />}
                        {p.badge === 'সীমিত অফার' && <Zap className="h-3 w-3" />}
                        {p.badge}
                      </span>
                    )}

                    {/* Wishlist */}
                    <button
                      aria-label="Add to wishlist"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (!user) {
                          showToast({ title: 'ইচ্ছেতালিকায় যোগ করতে লগইন করুন' });
                          return;
                        }
                        showToast({ title: `${p.name} সংরক্ষিত!`, variant: 'success' });
                      }}
                      className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-ink-400 backdrop-blur-sm transition hover:text-palette-rose"
                    >
                      <Heart className="h-4 w-4" />
                    </button>

                    {/* Image */}
                    <div className="relative aspect-square overflow-hidden bg-cream-200">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                      />
                    </div>

                    {/* Body */}
                    <div className="p-5">
                      <p className="text-xs uppercase tracking-widest text-palette-orange">
                        {p.category}
                      </p>
                      <h3 className="mt-1 line-clamp-2 font-display font-bold text-ink-500">
                        {p.name}
                      </h3>

                      <div className="mt-2 flex items-center gap-1 text-xs">
                        <Star className="h-3 w-3 fill-palette-yellow text-palette-yellow" />
                        <span className="font-semibold text-ink-500">{p.rating}</span>
                        <span className="text-ink-300">({p.reviews})</span>
                      </div>

                      <div className="mt-3 flex items-baseline gap-2">
                        <span className="font-display text-xl font-bold text-ink-500">
                          {formatPrice(p.price)}
                        </span>
                        {p.originalPrice && (
                          <span className="text-sm text-ink-300 line-through">
                            {formatPrice(p.originalPrice)}
                          </span>
                        )}
                        {p.originalPrice && (
                          <span className="ml-auto rounded-full bg-palette-orange/10 px-2 py-0.5 text-xs font-semibold text-palette-orange">
                            {Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100)}% ছাড়
                          </span>
                        )}
                      </div>

                      <div className="mt-4 flex gap-2">
                        <button
                          onClick={() =>
                            showToast({
                              title: 'কার্টে যোগ হয়েছে',
                              description: p.name,
                              variant: 'success',
                            })
                          }
                          className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-full bg-gradient-to-r from-palette-orange to-palette-rose px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-palette-orange/30 transition hover:shadow-palette-orange/50"
                        >
                          <ShoppingCart className="h-4 w-4" />
                          কার্টে যোগ করুন
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/store"
            className="inline-flex items-center gap-2 rounded-full border-2 border-palette-purple bg-white px-8 py-3 font-semibold text-palette-purple transition hover:bg-palette-purple hover:text-white"
          >
            সম্পূর্ণ স্টোর দেখুন
            <Sparkles className="h-4 w-4" />
          </Link>
        </div>

        {/* Shop features */}
        <div className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-6">
          {shopFeatures.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="rounded-2xl border border-white/60 bg-white/70 p-5 text-center backdrop-blur-sm transition hover:shadow-xl"
            >
              <div
                className="mx-auto grid h-12 w-12 place-items-center rounded-2xl"
                style={{ background: `${f.color}20` }}
              >
                {(() => {
                  const Icon = require('lucide-react')[f.icon] ?? (require('lucide-react').Truck);
                  return <Icon className="h-5 w-5" style={{ color: f.color }} />;
                })()}
              </div>
              <h4 className="mt-3 text-sm font-bold text-ink-500">{f.title}</h4>
              <p className="mt-1 text-xs leading-relaxed text-ink-400">{f.desc}</p>
            </motion.div>
          ))}
        </div>

        <BrushDivider color="#FBBF24" className="mt-16" />
      </div>
    </section>
  );
}
