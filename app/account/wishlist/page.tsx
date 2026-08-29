'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Heart, X, ShoppingCart, ArrowLeft, Store } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { useAuth } from '@/components/auth/auth-context';
import { Button } from '@/components/ui/button';
import { formatPrice } from '@/lib/utils';
import { showToast } from '@/components/ui/toaster';
import { useLanguage } from '@/lib/i18n/context';
import { tr } from '@/lib/i18n/strings';
import { supabase } from '@/lib/supabase/client';

type WishlistProduct = {
  id: string;
  productId: string;
  name: string;
  nameBn?: string;
  price: number;
  image: string;
};

export default function WishlistPage() {
  const { user, loading, openLogin } = useAuth();
  const { language } = useLanguage();
  const [items, setItems] = useState<WishlistProduct[]>([]);
  const [loadingItems, setLoadingItems] = useState(true);
  const [addingToCartId, setAddingToCartId] = useState<string | null>(null);

  const loadWishlist = useCallback(async (accountId: string) => {
    setLoadingItems(true);
    try {
      const { data, error } = await supabase
        .from('wishlists')
        .select('id, product_id, products(id, name, name_bn, price, image)')
        .eq('account_id', accountId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Failed to load wishlist:', error);
        showToast({
          title: language === 'bn' ? 'ইচ্ছেতালিকা লোড ব্যর্থ' : 'Unable to load wishlist',
          description: error.message,
          variant: 'destructive',
        });
        setLoadingItems(false);
        return;
      }

      const mapped: WishlistProduct[] = (data ?? []).flatMap((row: any) => {
        const product = row.products;
        if (!product) return [];
        return [
          {
            id: row.id,
            productId: row.product_id,
            name: product.name || '',
            nameBn: product.name_bn || product.name || '',
            price: Number(product.price) || 0,
            image: product.image || '/logo.png',
          },
        ];
      });

      setItems(mapped);
    } catch (err) {
      console.error('Error fetching wishlist:', err);
    } finally {
      setLoadingItems(false);
    }
  }, [language]);

  useEffect(() => {
    if (!user) {
      setItems([]);
      setLoadingItems(false);
      return;
    }

    void loadWishlist(user.id);
    const onFocus = () => { void loadWishlist(user.id); };
    window.addEventListener('focus', onFocus);
    return () => {
      window.removeEventListener('focus', onFocus);
    };
  }, [user, loadWishlist]);

  const removeFromWishlist = async (productId: string) => {
    if (!user) return;
    const previous = items;
    setItems((prev) => prev.filter((item) => item.productId !== productId));

    const { error } = await supabase
      .from('wishlists')
      .delete()
      .eq('account_id', user.id)
      .eq('product_id', productId);

    if (error) {
      console.error('Failed to remove from wishlist:', error);
      setItems(previous);
      showToast({
        title: language === 'bn' ? 'মুছে ফেলা যায়নি' : 'Unable to remove item',
        description: error.message,
        variant: 'destructive',
      });
      return;
    }

    showToast({ title: tr('removedFromWishlist', language) });
  };

  const addToCart = async (item: WishlistProduct) => {
    if (!user) {
      openLogin('login', 'customer');
      return;
    }

    setAddingToCartId(item.productId);
    try {
      const { data: existing } = await supabase
        .from('cart_items')
        .select('quantity')
        .eq('account_id', user.id)
        .eq('product_id', item.productId)
        .maybeSingle();

      if (existing) {
        const { error } = await supabase
          .from('cart_items')
          .update({ quantity: (existing.quantity || 1) + 1 })
          .eq('account_id', user.id)
          .eq('product_id', item.productId);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('cart_items')
          .insert({
            account_id: user.id,
            product_id: item.productId,
            quantity: 1,
          });

        if (error) throw error;
      }

      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('loknath-cart-updated'));
      }

      showToast({
        title: tr('addedToCart', language),
        description: language === 'bn' && item.nameBn ? item.nameBn : item.name,
        variant: 'success',
      });
    } catch (err: any) {
      console.error('Add to cart failed:', err);
      showToast({
        title: language === 'bn' ? 'কার্টে যোগ করা যায়নি' : 'Could not add to cart',
        description: err?.message,
        variant: 'destructive',
      });
    } finally {
      setAddingToCartId(null);
    }
  };

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
            {tr('wishlistLoginRequired', language)}
          </h1>
          <Button onClick={() => openLogin('login', 'customer')} className="mt-6">
            {tr('login', language)}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-10">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl font-bold text-ink-500">{tr('wishlistTitle', language)}</h1>
          <p className="mt-2 text-ink-400">{tr('wishlistSubtitle', language)}</p>
        </div>
        <Link
          href="/account"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-palette-orange transition hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          {tr('backToProfile', language)}
        </Link>
      </div>

      {loadingItems ? (
        <div className="grid min-h-[40vh] place-items-center">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-palette-orange border-t-transparent" />
        </div>
      ) : items.length === 0 ? (
        <div className="rounded-3xl border border-white/60 bg-white/90 p-12 text-center shadow-lg backdrop-blur-sm">
          <Heart className="mx-auto h-16 w-16 text-palette-rose/40" />
          <h2 className="mt-4 font-display text-2xl font-bold text-ink-500">
            {language === 'bn' ? 'আপনার ইচ্ছেতালিকা খালি' : 'Your wishlist is empty'}
          </h2>
          <p className="mt-2 text-sm text-ink-400">
            {language === 'bn'
              ? 'আর্ট স্টোরে গিয়ে আপনার পছন্দের সামগ্রী খুঁজে নিন।'
              : 'Explore the art store and add your favorite supplies.'}
          </p>
          <Link href="/store" className="mt-6 inline-block">
            <Button className="inline-flex items-center gap-2">
              <Store className="h-4 w-4" />
              {language === 'bn' ? 'স্টোরে যান' : 'Go to Store'}
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p, i) => {
            const displayName = language === 'bn' && p.nameBn ? p.nameBn : p.name;
            return (
              <motion.div
                key={p.productId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="group relative overflow-hidden rounded-3xl border border-white/60 bg-white/90 shadow-lg backdrop-blur-sm"
              >
                <button
                  aria-label="Remove"
                  onClick={() => removeFromWishlist(p.productId)}
                  className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-ink-400 backdrop-blur-sm transition hover:text-palette-rose"
                >
                  <X className="h-4 w-4" />
                </button>
                <div className="aspect-square overflow-hidden bg-cream-200">
                  <img
                    src={p.image}
                    alt={displayName}
                    className="h-full w-full object-cover transition group-hover:scale-110"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = '/logo.png';
                    }}
                  />
                </div>
                <div className="p-5">
                  <h3 className="line-clamp-2 font-display font-bold text-ink-500">{displayName}</h3>
                  <div className="mt-3 font-display text-xl font-bold text-palette-orange">
                    {formatPrice(p.price)}
                  </div>
                  <Button
                    size="sm"
                    className="mt-3 w-full inline-flex items-center justify-center gap-2"
                    disabled={addingToCartId === p.productId}
                    onClick={() => addToCart(p)}
                  >
                    <ShoppingCart className="h-4 w-4" />
                    {addingToCartId === p.productId
                      ? tr('saving', language)
                      : tr('addToCartCta', language)}
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
