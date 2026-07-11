'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Heart, X } from 'lucide-react';
import { useAuth } from '@/components/auth/auth-context';
import { Button } from '@/components/ui/button';
import { formatPrice } from '@/lib/utils';
import { showToast } from '@/components/ui/toaster';

const wishlist = [
  { id: 'p1', name: 'প্রিমিয়াম ওয়াটারকালার সেট (২৪ রঙ)', image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=200&q=80', price: 899 },
  { id: 'p4', name: 'আর্টিস্ট অয়েল কালার (১২টি টিউব)', image: 'https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=200&q=80', price: 1499 },
  { id: 'p7', name: 'সফট পাস্তেল (৩৬ রঙ)', image: 'https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?w=200&q=80', price: 449 },
];

export default function WishlistPage() {
  const { user, loading, openLogin } = useAuth();

  if (loading) {
    return (
      <div className="grid min-h-[60vh] place-items-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-palette-orange border-t-transparent" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="grid min-h-[60vh] place-items-center px-4">
        <div className="max-w-md text-center">
          <Heart className="mx-auto h-12 w-12 fill-palette-rose text-palette-rose" />
          <h1 className="mt-4 font-display text-3xl font-bold text-ink-500">
            ইচ্ছেতালিকা দেখতে লগইন করুন
          </h1>
          <Button onClick={() => openLogin('login', 'customer')} className="mt-6">
            লগইন
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-10">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h1 className="font-display text-4xl font-bold text-ink-500">আমার ইচ্ছেতালিকা</h1>
          <p className="mt-2 text-ink-400">আপনার পছন্দের পণ্য</p>
        </div>
        <Link href="/account" className="text-sm font-semibold text-palette-orange hover:underline">
          ← প্রোফাইলে ফিরে যান
        </Link>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {wishlist.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="group relative overflow-hidden rounded-3xl border border-white/60 bg-white/90 shadow-lg backdrop-blur-sm"
          >
            <button
              aria-label="Remove"
              onClick={() => showToast({ title: 'ইচ্ছেতালিকা থেকে সরানো হয়েছে' })}
              className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-ink-400 backdrop-blur-sm transition hover:text-palette-rose"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="aspect-square overflow-hidden bg-cream-200">
              <img src={p.image} alt={p.name} className="h-full w-full object-cover transition group-hover:scale-110" />
            </div>
            <div className="p-5">
              <h3 className="line-clamp-2 font-display font-bold text-ink-500">{p.name}</h3>
              <div className="mt-3 font-display text-xl font-bold text-palette-orange">
                {formatPrice(p.price)}
              </div>
              <Button size="sm" className="mt-3 w-full">
                কার্টে যোগ করুন
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
