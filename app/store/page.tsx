'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Heart, ShoppingCart, Search, Filter, X, Trash2, Package, Palette, Pencil, Brush, Award, Truck, Clock, Download, Copy, Check, QrCode, AlertCircle, Smartphone, CreditCard, Wallet } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { showToast } from '@/components/ui/toaster';
import { useAuth } from '@/components/auth/auth-context';
import { supabase } from '@/lib/supabase/client';
import { OrderOutcomeOverlay } from '@/components/order-outcome-overlay';
import { cn } from '@/lib/utils';
import { LoadingScreen } from '@/components/loading-screen';
import QRCode from 'qrcode';

// Default store products data
const defaultProducts = [
  {
    id: 'p1',
    name: 'প্রিমিয়াম ওয়াটারকালার সেট (২৪ রঙ)',
    category: 'ওয়াটারকালার',
    price: 899,
    originalPrice: 1299,
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&q=80',
    rating: 4.8,
    reviews: 142,
    badge: 'সর্বাধিক বিক্রিত',
  },
  {
    id: 'p2',
    name: 'প্রফেশনাল ব্রাশ সেট (১২টি)',
    category: 'ব্রাশ',
    price: 649,
    originalPrice: 999,
    image: 'https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?w=400&q=80',
    rating: 4.9,
    reviews: 98,
    badge: 'নতুন আগমন',
  },
  {
    id: 'p3',
    name: 'ক্যানভাস বোর্ড প্যাক (৫টি)',
    category: 'ক্যানভাস',
    price: 549,
    image: 'https://images.unsplash.com/photo-1579783901586-d88db74b4da4?w=400&q=80',
    rating: 4.7,
    reviews: 67,
  },
  {
    id: 'p4',
    name: 'আর্টিস্ট অয়েল কালার (১২টি টিউব)',
    category: 'অয়েল কালার',
    price: 1499,
    originalPrice: 1999,
    image: 'https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=400&q=80',
    rating: 4.9,
    reviews: 56,
    badge: 'সীমিত অফার',
  },
  {
    id: 'p5',
    name: 'প্রফেশনাল স্কেচ বুক এ৪',
    category: 'স্কেচ বুক',
    price: 299,
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&q=80',
    rating: 4.6,
    reviews: 211,
  },
  {
    id: 'p6',
    name: 'অ্যাক্রিলিক কালার সেট (১৮ শেড)',
    category: 'অ্যাক্রিলিক',
    price: 1199,
    originalPrice: 1599,
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400&q=80',
    rating: 4.8,
    reviews: 89,
    badge: 'সর্বাধিক বিক্রিত',
  },
  {
    id: 'p7',
    name: 'সফট পাস্তেল (৩৬ রঙ)',
    category: 'পাস্তেল',
    price: 449,
    image: 'https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?w=400&q=80',
    rating: 4.7,
    reviews: 73,
  },
  {
    id: 'p8',
    name: 'কিডস আর্ট কিট (৫০+ আইটেম)',
    category: 'কিডস আর্ট',
    price: 799,
    originalPrice: 1199,
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&q=80',
    rating: 4.9,
    reviews: 178,
    badge: 'নতুন আগমন',
  },
  {
    id: 'p9',
    name: 'পেন্সিল সেট (২৪টি)',
    category: 'পেন্সিল',
    price: 399,
    image: 'https://images.unsplash.com/photo-1578926375605-eaf7559b1458?w=400&q=80',
    rating: 4.5,
    reviews: 156,
  },
  {
    id: 'p10',
    name: 'ক্যানভাস রোল (১০ মিটার)',
    category: 'ক্যানভাস',
    price: 899,
    image: 'https://images.unsplash.com/photo-1579783901586-d88db74b4da4?w=400&q=80',
    rating: 4.6,
    reviews: 45,
  },
  {
    id: 'p11',
    name: 'পোস্টার কালার সেট (২৪ রঙ)',
    category: 'পোস্টার কালার',
    price: 349,
    originalPrice: 499,
    image: 'https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=400&q=80',
    rating: 4.4,
    reviews: 89,
  },
  {
    id: 'p12',
    name: 'প্রফেশনাল প্যালেট',
    category: 'প্যালেট',
    price: 199,
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400&q=80',
    rating: 4.3,
    reviews: 34,
  },
];

// Category data with icons
const categories = [
  { name: 'ওয়াটারকালার', icon: Palette, image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=300&q=80', count: 24 },
  { name: 'অয়েল কালার', icon: Award, image: 'https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=300&q=80', count: 18 },
  { name: 'অ্যাক্রিলিক', icon: Brush, image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=300&q=80', count: 32 },
  { name: 'পেন্সিল', icon: Pencil, image: 'https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?w=300&q=80', count: 45 },
  { name: 'ব্রাশ', icon: Brush, image: 'https://images.unsplash.com/photo-1578926375605-eaf7559b1458?w=300&q=80', count: 28 },
  { name: 'ক্যানভাস', icon: Package, image: 'https://images.unsplash.com/photo-1579783901586-d88db74b4da4?w=300&q=80', count: 15 },
  { name: 'স্কেচ বুক', icon: Pencil, image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=300&q=80', count: 22 },
  { name: 'পাস্তেল', icon: Palette, image: 'https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?w=300&q=80', count: 19 },
];

type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

type WishlistItem = {
  id: string;
  name: string;
  price: number;
  image: string;
};

type Product = { id: string; name: string; category: string; price: number; originalPrice?: number; image: string; rating: number; reviews: number; badge?: string };

type PaymentMethod = 'Cash on Delivery' | 'UPI' | 'Credit/Debit Card' | 'Net Banking';

type CheckoutDetails = {
  phone: string;
  address: string;
  city: string;
  pincode: string;
  notes: string;
};

type StoreOrder = {
  id: string;
  createdAt: string;
  items: CartItem[];
  total: number;
  customer: {
    name: string;
    email: string;
  } & CheckoutDetails;
  paymentMethod: PaymentMethod;
  paymentStatus: 'COD Selected' | 'Payment Submitted';
  paymentReference?: string;
  status: 'New Order';
};


const badgeStyles: Record<string, string> = {
  'সর্বাধিক বিক্রিত': 'bg-orange-500 text-white',
  'নতুন আগমন': 'bg-purple-500 text-white',
  'সীমিত অফার': 'bg-pink-500 text-white',
};

function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);
}

export default function StorePage() {
  const router = useRouter();
  const { user, openLogin } = useAuth();
  const [selectedCategory, setSelectedCategory] = React.useState<string>('সব দেখুন');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [showCart, setShowCart] = React.useState(false);
  const [showWishlist, setShowWishlist] = React.useState(false);
  const [cart, setCart] = React.useState<CartItem[]>([]);
  const [wishlist, setWishlist] = React.useState<WishlistItem[]>([]);
  const [products, setProducts] = React.useState<Product[]>([]);
  const [showMobileFilters, setShowMobileFilters] = React.useState(false);
  const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(null);
  const [showProductSidebar, setShowProductSidebar] = React.useState(false);
  const [showCheckout, setShowCheckout] = React.useState(false);
  const [showPayment, setShowPayment] = React.useState(false);
  const [paymentMethod, setPaymentMethod] = React.useState<PaymentMethod>('Cash on Delivery');
  const [paymentReference, setPaymentReference] = React.useState('');
  const [orderOutcome, setOrderOutcome] = React.useState<'placed' | null>(null);
  const [paymentTimerKey, setPaymentTimerKey] = React.useState(0);
  const [currentOrderId, setCurrentOrderId] = React.useState('');
  const [paymentStatus, setPaymentStatus] = React.useState<'pending' | 'completed' | 'expired'>('pending');
  const [transactionId, setTransactionId] = React.useState('');
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [checkoutDetails, setCheckoutDetails] = React.useState<CheckoutDetails>({
    phone: '',
    address: '',
    city: '',
    pincode: '',
    notes: '',
  });

  const allCategories = ['সব দেখুন', ...categories.map(c => c.name)];

  React.useEffect(() => {
    const loadStoreData = async () => {
      const [{ data: productRows, error: productsError }, { data: wishlistRows, error: wishlistError }] = await Promise.all([
        supabase.from('products').select('*').eq('is_active', true).order('created_at', { ascending: false }),
        user ? supabase.from('wishlists').select('product_id, products(*)').eq('account_id', user.id) : Promise.resolve({ data: [], error: null }),
      ]);
      if (productsError) { console.error(productsError); showToast({ title: 'Unable to load products', description: productsError.message, variant: 'destructive' }); }
      else setProducts((productRows ?? []).map((product) => ({ id: product.id, name: product.name, category: product.category, price: Number(product.price), originalPrice: product.original_price ? Number(product.original_price) : undefined, image: product.image || '/logo.png', rating: Number(product.rating ?? 0), reviews: product.reviews_count ?? 0, badge: product.badge })));
      if (wishlistError) { console.error(wishlistError); showToast({ title: 'Unable to load wishlist', description: wishlistError.message, variant: 'destructive' }); }
      else setWishlist((wishlistRows ?? []).flatMap((row: any) => row.products ? [{ id: row.products.id, name: row.products.name, price: Number(row.products.price), image: row.products.image || '/logo.png' }] : []));
    };
    void loadStoreData();
  }, [user]);

  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategory === 'সব দেখুন' || p.category === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const promptLogin = () => {
    showToast({
      title: 'Please login or create an account',
      description: 'You need an account before adding products or buying now.',
    });
    openLogin('login', 'customer');
  };

  const addToCart = (product: Product) => {
    if (!user) {
      promptLogin();
      return;
    }

    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        // Item already in cart, open cart sidebar
        setShowCart(true);
        return prev;
      }
      const newCart = [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: 1,
        },
      ];
      // Auto-open cart sidebar when adding new item
      setShowCart(true);
      return newCart;
    });
    showToast({
      title: 'কার্টে যোগ হয়েছে',
      description: product.name,
      variant: 'success',
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const toggleCart = (product: Product) => {
    const isInCart = cart.some((item) => item.id === product.id);

    if (isInCart) {
      removeFromCart(product.id);
      showToast({ title: 'Removed from cart', description: product.name });
      return;
    }

    addToCart(product);
  };

  const buyNow = (product: Product) => {
    if (!user) {
      promptLogin();
      return;
    }

    // First add to cart if not already there
    const isInCart = cart.some((item) => item.id === product.id);
    if (!isInCart) {
      setCart((prev) => [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: 1,
        },
      ]);
    }

    // Open product details sidebar instead of directly going to checkout
    setSelectedProduct(product);
    setShowProductSidebar(true);
    showToast({
      title: 'Ready to buy',
      description: 'Review product details and proceed to payment.',
      variant: 'success',
    });
  };

  const openCheckout = () => {
    if (!user) {
      promptLogin();
      return;
    }

    if (cart.length === 0) {
      showToast({ title: 'Your cart is empty' });
      return;
    }

    setShowCart(false);
    setShowCheckout(true);
  };

  const saveOrder = async () => {
    if (!user) {
      promptLogin();
      return;
    }

    if (!checkoutDetails.phone || !checkoutDetails.address || !checkoutDetails.city || !checkoutDetails.pincode) {
      showToast({
        title: 'Complete delivery details',
        description: 'Phone, address, city, and pincode are required.',
      });
      return;
    }

    if (paymentMethod !== 'Cash on Delivery' && !paymentReference.trim()) {
      showToast({
        title: 'Enter payment reference',
        description: 'Add your UPI transaction ID or payment reference before placing the order.',
      });
      return;
    }

    const order: StoreOrder = {
      id: `LAC-${Date.now()}`,
      createdAt: new Date().toISOString(),
      items: cart,
      total: cartTotal,
      customer: {
        name: user.name,
        email: user.email,
        ...checkoutDetails,
      },
      paymentMethod,
      paymentStatus: paymentMethod === 'Cash on Delivery' ? 'COD Selected' : 'Payment Submitted',
      paymentReference: paymentMethod === 'Cash on Delivery' ? undefined : paymentReference.trim(),
      status: 'New Order',
    };

    const { data, error } = await supabase.from('store_orders').insert({
      id: order.id,
      account_id: user.id,
      customer_email: order.customer.email,
      created_at: order.createdAt,
      order_data: order,
    }).select();
    if (error) {
      console.error(error);
      showToast({ title: 'Unable to save order', description: error.message, variant: 'destructive' });
      throw error;
    }

    setCart([]);
    setShowCheckout(false);
    setCheckoutDetails({
      phone: '',
      address: '',
      city: '',
      pincode: '',
      notes: '',
    });
    setPaymentReference('');
    setOrderOutcome('placed');

    showToast({
      title: 'Order saved successfully',
      description:
        paymentMethod === 'Cash on Delivery'
          ? 'Your Cash on Delivery order has been sent to admin.'
          : 'Payment reference recorded and your order has been sent to admin.',
      variant: 'success',
    });
  };

  const autofillCheckout = () => {
    const nextDetails = { ...checkoutDetails, phone: checkoutDetails.phone || user?.phone || '', address: checkoutDetails.address || user?.address || '', city: checkoutDetails.city || '', pincode: checkoutDetails.pincode || '', notes: checkoutDetails.notes || '' };
    setCheckoutDetails(nextDetails);
    if (!nextDetails.phone || !nextDetails.address || !nextDetails.city || !nextDetails.pincode) showToast({ title: 'Complete your delivery profile', description: 'Some account delivery details are missing. Please enter them before ordering.' });
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: Math.max(1, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const addToWishlist = async (product: Product) => {
    if (!user) {
      showToast({ title: 'ইচ্ছেতালিকায় যোগ করতে লগইন করুন' });
      return;
    }
    const exists = wishlist.find((item) => item.id === product.id);
    if (!exists) {
      const { error } = await supabase.from('wishlists').insert({ account_id: user.id, product_id: product.id }).select();
      if (error) { console.error(error); showToast({ title: 'Unable to save wishlist', description: error.message, variant: 'destructive' }); throw error; }
      setWishlist((prev) => [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
        },
      ]);
      showToast({
        title: 'ইচ্ছেতালিকায় যোগ হয়েছে',
        description: product.name,
        variant: 'success',
      });
    } else {
      showToast({ title: 'এই পণ্য ইচ্ছেতালিকায় আছে' });
    }
  };

  const removeFromWishlist = async (productId: string) => {
    if (!user) return;
    const { error } = await supabase.from('wishlists').delete().eq('account_id', user.id).eq('product_id', productId);
    if (error) { console.error(error); showToast({ title: 'Unable to update wishlist', description: error.message, variant: 'destructive' }); throw error; }
    setWishlist((prev) => prev.filter((item) => item.id !== productId));
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-pink-50">
      <LoadingScreen loadingText="Art Store is loading..." />
      <OrderOutcomeOverlay outcome={orderOutcome} onClose={() => setOrderOutcome(null)} />

      {/* Header Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 pb-16 pt-28 md:pb-20 md:pt-32">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
        </div>

        <div className="container relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="font-bold text-white text-4xl md:text-6xl lg:text-7xl tracking-tight">
              রঙ তুলি
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-lg md:text-xl text-white/90 font-medium">
              শিল্পীর সরঞ্জামের সম্পূর্ণ সংগ্রহ। প্রিমিয়াম মানের আর্ট উপকরণ, সাশ্রয়ী মূল্যে।
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-medium text-white backdrop-blur">
                <Truck className="w-4 h-4" />
                বিনামূল্যে ডেলিভারি
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-medium text-white backdrop-blur">
                <Award className="w-4 h-4" />
                ১০০% মান নিশ্চিত
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="container -mt-8 relative z-10">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.button
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setSelectedCategory(category.name)}
                className={cn(
                  'group relative overflow-hidden rounded-2xl bg-white p-4 text-center shadow-lg transition-all hover:shadow-xl hover:-translate-y-1',
                  selectedCategory === category.name ? 'ring-2 ring-orange-500 shadow-orange-200' : ''
                )}
              >
                <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-orange-100 to-pink-100 group-hover:from-orange-200 group-hover:to-pink-200 transition">
                  <Icon className="w-5 h-5 text-orange-600" />
                </div>
                <p className="text-xs font-semibold text-gray-700 line-clamp-1">{category.name}</p>
                <p className="text-[10px] text-gray-400">{category.count} পণ্য</p>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="sticky top-16 z-40 border-b border-gray-100 bg-white/95 backdrop-blur-md shadow-sm">
        <div className="container py-3">
          <div className="flex flex-wrap items-center gap-3">
            {/* Search */}
            <div className="relative flex-1 min-w-[180px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="পণ্য খুঁজুন..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full border border-gray-200 bg-gray-50 py-2 pl-9 pr-4 text-sm text-gray-700 placeholder:text-gray-400 focus:border-orange-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition"
              />
            </div>

            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 hover:border-orange-500 hover:text-orange-600 lg:hidden transition"
            >
              <Filter className="w-4 h-4" />
              ফিল্টার
            </button>

            {/* Cart Button */}
            <button
              onClick={() => setShowCart(true)}
              className="relative flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 transition hover:border-orange-500 hover:text-orange-600"
            >
              <ShoppingCart className="w-4 h-4" />
              <span className="hidden sm:inline">কার্ট</span>
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-xs font-bold text-white">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Wishlist Button */}
            <button
              onClick={() => setShowWishlist(true)}
              className="relative flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 transition hover:border-pink-500 hover:text-pink-500"
            >
              <Heart className="w-4 h-4" />
              <span className="hidden sm:inline">পছন্দ</span>
              {wishlist.length > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-pink-500 text-xs font-bold text-white">
                  {wishlist.length}
                </span>
              )}
            </button>
          </div>

          {/* Category Pills - Desktop */}
          <div className="mt-3 hidden flex-wrap items-center justify-center gap-2 lg:flex">
            {allCategories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={cn(
                  'rounded-full px-4 py-1.5 text-xs font-medium transition',
                  selectedCategory === category
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-orange-100 hover:text-orange-600'
                )}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Category Pills - Mobile */}
          {showMobileFilters && (
            <div className="mt-3 flex flex-wrap items-center justify-center gap-2 lg:hidden">
              {allCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setSelectedCategory(category);
                    setShowMobileFilters(false);
                  }}
                  className={cn(
                    'rounded-full px-4 py-1.5 text-xs font-medium transition',
                    selectedCategory === category
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-orange-100 hover:text-orange-600'
                  )}
                >
                  {category}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Products Grid */}
      <div className="container py-8">
        <div className="mb-6 text-base font-semibold text-gray-600">
          {selectedCategory} — {filteredProducts.length}টি পণ্য
        </div>

        {filteredProducts.length === 0 ? (
          <div className="py-16 text-center">
            <Package className="mx-auto h-16 w-16 text-gray-300" />
            <p className="mt-4 text-lg text-gray-400">কোনো পণ্য পাওয়া যায়নি</p>
            <button
              onClick={() => {
                setSelectedCategory('সব দেখুন');
                setSearchQuery('');
              }}
              className="mt-4 text-orange-500 hover:underline font-medium"
            >
              সব পণ্য দেখুন
            </button>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product, index) => {
              const isInCart = cart.some((item) => item.id === product.id);

              return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                onClick={() => setSelectedProduct(product)}
                className="group relative cursor-pointer overflow-hidden rounded-2xl bg-white shadow-md transition-all hover:shadow-xl hover:-translate-y-1"
              >
                {/* Badge */}
                {product.badge && (
                  <span
                    className={cn(
                      'absolute left-3 top-3 z-10 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-semibold shadow-sm',
                      badgeStyles[product.badge]
                    )}
                  >
                    {product.badge}
                  </span>
                )}

                {/* Wishlist */}
                <button
                  aria-label="Add to wishlist"
                  onClick={(e) => {
                    e.stopPropagation();
                    addToWishlist(product);
                  }}
                  className={cn(
                    'absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow-sm transition hover:scale-110',
                    wishlist.find((item) => item.id === product.id)
                      ? 'text-pink-500'
                      : 'text-gray-400 hover:text-pink-500'
                  )}
                >
                  <Heart
                    className={cn(
                      'w-4 h-4',
                      wishlist.find((item) => item.id === product.id) && 'fill-current'
                    )}
                  />
                </button>

                {/* Image */}
                <div className="relative aspect-square overflow-hidden bg-gray-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>

                {/* Body */}
                <div className="p-4">
                  <p className="text-[10px] uppercase tracking-wider text-orange-500 font-medium">
                    {product.category}
                  </p>
                  <h3 className="mt-1 line-clamp-2 text-sm font-bold text-gray-800 leading-tight min-h-[2.5rem]">
                    {product.name}
                  </h3>

                  <div className="mt-2 flex items-center gap-1 text-xs">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold text-gray-700">{product.rating}</span>
                    <span className="text-gray-400">({product.reviews})</span>
                  </div>

                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="text-lg font-bold text-gray-800">
                      {formatPrice(product.price)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-xs text-gray-400 line-through">
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                    {product.originalPrice && (
                      <span className="ml-auto rounded-full bg-orange-100 px-2 py-0.5 text-[10px] font-semibold text-orange-600">
                        {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% ছাড়
                      </span>
                    )}
                  </div>

                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleCart(product);
                      }}
                      className={cn(
                        'flex items-center justify-center gap-1.5 rounded-full px-3 py-2 text-xs font-semibold shadow-md transition hover:shadow-lg',
                        isInCart
                          ? 'bg-gray-100 text-gray-700 hover:bg-red-50 hover:text-red-600'
                          : 'bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-orange-500/20 hover:shadow-orange-500/30'
                      )}
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      {isInCart ? 'Remove from Cart' : 'Add to Cart'}
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        buyNow(product);
                      }}
                      className="flex items-center justify-center rounded-full bg-gray-900 px-3 py-2 text-xs font-semibold text-white shadow-md transition hover:bg-orange-600 hover:shadow-lg"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Features Section */}
      <div className="container pb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[
            { icon: Truck, title: 'দ্রুত ডেলিভারি', desc: '৩-৫ দিনে', color: '#FF6B35' },
            { icon: Package, title: 'ক্যাশ অন ডেলিভারি', desc: 'নিরাপদ পেমেন্ট', color: '#8B5CF6' },
            { icon: Award, title: 'মান নিশ্চিত', desc: '১০০% গ্যারান্টি', color: '#10B981' },
            { icon: Star, title: '৫০০+ পণ্য', desc: 'বিস্তৃত পরিসর', color: '#FF5C8A' },
            { icon: Heart, title: 'সহজ রিটার্ন', desc: '৭ দিন নীতি', color: '#3B82F6' },
            { icon: Palette, title: '২৪/৭ সাপোর্ট', desc: 'যেকোনো সময়', color: '#FBBF24' },
          ].map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="rounded-2xl bg-white p-4 text-center shadow-md transition hover:shadow-lg"
              >
                <div
                  className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-xl"
                  style={{ background: `${feature.color}15` }}
                >
                  <Icon className="w-4 h-4" style={{ color: feature.color }} />
                </div>
                <h4 className="text-xs font-bold text-gray-700">{feature.title}</h4>
                <p className="text-[10px] text-gray-400">{feature.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Product Details Popup */}
      <AnimatePresence>
        {selectedProduct && (() => {
          const isInCart = cart.some((item) => item.id === selectedProduct.id);
          const discount = selectedProduct.originalPrice
            ? Math.round(((selectedProduct.originalPrice - selectedProduct.price) / selectedProduct.originalPrice) * 100)
            : null;

          return (
            <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={() => setSelectedProduct(null)}
              />
              <motion.div
                initial={{ opacity: 0, y: 24, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 24, scale: 0.98 }}
                transition={{ duration: 0.22 }}
                className="relative z-10 grid max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-3xl bg-white shadow-2xl md:grid-cols-[1fr_1.1fr]"
              >
                <button
                  aria-label="Close product details"
                  onClick={() => setSelectedProduct(null)}
                  className="absolute right-4 top-4 z-20 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-gray-500 shadow-md transition hover:text-gray-900"
                >
                  <X className="h-4 w-4" />
                </button>

                <div className="relative min-h-[280px] bg-gray-100 md:min-h-full">
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="h-full w-full object-cover"
                  />
                  {selectedProduct.badge && (
                    <span
                      className={cn(
                        'absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-semibold shadow-md',
                        badgeStyles[selectedProduct.badge]
                      )}
                    >
                      {selectedProduct.badge}
                    </span>
                  )}
                </div>

                <div className="p-6 md:p-8">
                  <p className="text-xs font-semibold uppercase tracking-widest text-orange-500">
                    {selectedProduct.category}
                  </p>
                  <h2 className="mt-2 pr-8 text-2xl font-bold leading-tight text-gray-900 md:text-3xl">
                    {selectedProduct.name}
                  </h2>

                  <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-gray-500">
                    <span className="inline-flex items-center gap-1 font-semibold text-gray-700">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      {selectedProduct.rating}
                    </span>
                    <span>{selectedProduct.reviews} reviews</span>
                    {discount !== null && (
                      <span className="rounded-full bg-orange-100 px-2.5 py-1 text-xs font-bold text-orange-600">
                        {discount}% off
                      </span>
                    )}
                  </div>

                  <div className="mt-5 flex items-baseline gap-3">
                    <span className="text-3xl font-extrabold text-gray-900">
                      {formatPrice(selectedProduct.price)}
                    </span>
                    {selectedProduct.originalPrice && (
                      <span className="text-base text-gray-400 line-through">
                        {formatPrice(selectedProduct.originalPrice)}
                      </span>
                    )}
                  </div>

                  <div className="mt-6 grid gap-3 text-sm text-gray-600 sm:grid-cols-2">
                    <div className="rounded-2xl bg-orange-50 p-4">
                      <div className="font-bold text-gray-900">Category</div>
                      <div className="mt-1">{selectedProduct.category}</div>
                    </div>
                    <div className="rounded-2xl bg-purple-50 p-4">
                      <div className="font-bold text-gray-900">Delivery</div>
                      <div className="mt-1">Fast local delivery available</div>
                    </div>
                    <div className="rounded-2xl bg-pink-50 p-4">
                      <div className="font-bold text-gray-900">Quality</div>
                      <div className="mt-1">Carefully selected art material</div>
                    </div>
                    <div className="rounded-2xl bg-blue-50 p-4">
                      <div className="font-bold text-gray-900">Support</div>
                      <div className="mt-1">Contact store before ordering</div>
                    </div>
                  </div>

                  <div className="mt-7 grid gap-3 sm:grid-cols-2">
                    <button
                      onClick={() => toggleCart(selectedProduct)}
                      className={cn(
                        'inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-bold shadow-lg transition',
                        isInCart
                          ? 'bg-gray-100 text-gray-800 hover:bg-red-50 hover:text-red-600'
                          : 'bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-orange-500/20 hover:shadow-orange-500/40'
                      )}
                    >
                      <ShoppingCart className="h-4 w-4" />
                      {isInCart ? 'Remove from Cart' : 'Add to Cart'}
                    </button>
                    <button
                      onClick={() => buyNow(selectedProduct)}
                      className="rounded-full bg-gray-950 px-5 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-orange-600"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          );
        })()}
      </AnimatePresence>

      {/* Checkout Popup */}
      <AnimatePresence>
        {showCheckout && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setShowCheckout(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.98 }}
              transition={{ duration: 0.22 }}
              className="relative z-10 max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl md:p-8"
            >
              <button
                aria-label="Close checkout"
                onClick={() => setShowCheckout(false)}
                className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-gray-100 text-gray-500 transition hover:text-gray-900"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="pr-10">
                <h2 className="text-2xl font-extrabold text-gray-900">Choose payment method</h2>
                <p className="mt-1 text-sm text-gray-500">
                  Add delivery details, select payment, then click Pay Now.
                </p>
              </div>

              <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                <div className="space-y-5">
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500">
                      Delivery details
                    </h3>
                    <button onClick={autofillCheckout} className="mt-2 rounded-full bg-orange-50 px-3 py-1.5 text-xs font-bold text-orange-700 transition hover:bg-orange-100">Autofill from account</button>
                    <div className="mt-3 grid gap-3 sm:grid-cols-2">
                      <input
                        value={checkoutDetails.phone}
                        onChange={(e) => setCheckoutDetails((prev) => ({ ...prev, phone: e.target.value }))}
                        placeholder="Phone number"
                        className="rounded-2xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                      />
                      <input
                        value={checkoutDetails.pincode}
                        onChange={(e) => setCheckoutDetails((prev) => ({ ...prev, pincode: e.target.value }))}
                        placeholder="Pincode"
                        className="rounded-2xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                      />
                      <input
                        value={checkoutDetails.city}
                        onChange={(e) => setCheckoutDetails((prev) => ({ ...prev, city: e.target.value }))}
                        placeholder="City"
                        className="rounded-2xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                      />
                      <input
                        value={user?.email ?? ''}
                        readOnly
                        className="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-500"
                      />
                      <textarea
                        value={checkoutDetails.address}
                        onChange={(e) => setCheckoutDetails((prev) => ({ ...prev, address: e.target.value }))}
                        placeholder="Full delivery address"
                        className="min-h-24 rounded-2xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 sm:col-span-2"
                      />
                      <textarea
                        value={checkoutDetails.notes}
                        onChange={(e) => setCheckoutDetails((prev) => ({ ...prev, notes: e.target.value }))}
                        placeholder="Order notes (optional)"
                        className="min-h-20 rounded-2xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 sm:col-span-2"
                      />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500">
                      Payment method
                    </h3>
                    <div className="mt-3 grid gap-3 sm:grid-cols-2">
                      {(['Cash on Delivery', 'UPI', 'Credit/Debit Card', 'Net Banking'] as PaymentMethod[]).map((method) => (
                        <button
                          key={method}
                          onClick={() => setPaymentMethod(method)}
                          className={cn(
                            'rounded-2xl border px-4 py-3 text-left text-sm font-bold transition',
                            paymentMethod === method
                              ? 'border-orange-500 bg-orange-50 text-orange-700 ring-2 ring-orange-500/20'
                              : 'border-gray-200 bg-white text-gray-700 hover:border-orange-300'
                          )}
                        >
                          {method}
                        </button>
                      ))}
                    </div>
                    {paymentMethod !== 'Cash on Delivery' && (
                      <div className="mt-3 rounded-2xl bg-amber-50 p-3">
                        <p className="text-xs leading-relaxed text-amber-700">
                          Complete the payment in your selected app or bank, then enter its transaction/reference ID below.
                        </p>
                        <input
                          value={paymentReference}
                          onChange={(event) => setPaymentReference(event.target.value)}
                          placeholder="Transaction / payment reference ID"
                          className="mt-3 w-full rounded-xl border border-amber-200 bg-white px-3 py-2 text-sm text-gray-700 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div className="rounded-3xl bg-gray-50 p-5">
                  <h3 className="font-bold text-gray-900">Order summary</h3>
                  <div className="mt-4 space-y-3">
                    {cart.map((item) => (
                      <div key={item.id} className="flex gap-3">
                        <img src={item.image} alt={item.name} className="h-14 w-14 rounded-xl object-cover" />
                        <div className="min-w-0 flex-1">
                          <div className="line-clamp-2 text-xs font-bold text-gray-800">{item.name}</div>
                          <div className="mt-1 text-xs text-gray-500">Qty: {item.quantity}</div>
                        </div>
                        <div className="text-sm font-bold text-gray-900">
                          {formatPrice(item.price * item.quantity)}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-5 border-t border-gray-200 pt-4">
                    <div className="flex items-center justify-between text-lg font-extrabold text-gray-900">
                      <span>Total</span>
                      <span>{formatPrice(cartTotal)}</span>
                    </div>
                    <div className="mt-4 grid gap-3">
                      {paymentMethod !== 'Cash on Delivery' && (
                        <button
                          onClick={() => {
                            // First save order details
                            const orderId = `LAC-${Date.now()}`;
                            const order = {
                              id: orderId,
                              createdAt: new Date().toISOString(),
                              items: cart,
                              total: cartTotal,
                              customer: {
                                name: user?.name,
                                email: user?.email,
                                ...checkoutDetails,
                              },
                              paymentMethod,
                              paymentStatus: 'Pending',
                              status: 'New Order',
                            };
                            // Open payment sidebar on same page
                            setCurrentOrderId(orderId);
                            setPaymentTimerKey(k => k + 1);
                            setPaymentStatus('pending');
                            setTransactionId('');
                            setShowPayment(true);
                          }}
                          className="w-full rounded-full bg-gradient-to-r from-orange-500 to-pink-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-orange-500/20 transition hover:shadow-orange-500/40"
                        >
                          Proceed to Payment
                        </button>
                      )}
                      <button
                        onClick={saveOrder}
                        className={cn(
                          'w-full rounded-full px-5 py-3 text-sm font-bold shadow-lg transition',
                          paymentMethod === 'Cash on Delivery'
                            ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-orange-500/20 hover:shadow-orange-500/40'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        )}
                      >
                        {paymentMethod === 'Cash on Delivery' ? 'Place Cash on Delivery Order' : 'Place Order (Save Details)'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Product Details Sidebar */}
      <AnimatePresence>
        {showProductSidebar && selectedProduct && (() => {
          const isInCart = cart.some((item) => item.id === selectedProduct.id);
          const discount = selectedProduct.originalPrice
            ? Math.round(((selectedProduct.originalPrice - selectedProduct.price) / selectedProduct.originalPrice) * 100)
            : null;

          return (
            <div className="fixed inset-0 z-50 flex justify-end">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/50"
                onClick={() => setShowProductSidebar(false)}
              />
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="relative z-10 flex h-full w-full max-w-md flex-col bg-white shadow-2xl"
              >
                <div className="flex items-center justify-between border-b border-gray-100 p-4">
                  <h2 className="text-lg font-bold text-gray-800">Product Details</h2>
                  <button
                    onClick={() => setShowProductSidebar(false)}
                    className="rounded-full p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto">
                  {/* Product Image */}
                  <div className="relative aspect-square bg-gray-100">
                    <img
                      src={selectedProduct.image}
                      alt={selectedProduct.name}
                      className="h-full w-full object-cover"
                    />
                    {selectedProduct.badge && (
                      <span
                        className={cn(
                          'absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-semibold shadow-md',
                          badgeStyles[selectedProduct.badge]
                        )}
                      >
                        {selectedProduct.badge}
                      </span>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="p-4">
                    <p className="text-xs font-semibold uppercase tracking-widest text-orange-500">
                      {selectedProduct.category}
                    </p>
                    <h3 className="mt-1 text-xl font-bold text-gray-900">
                      {selectedProduct.name}
                    </h3>

                    <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-gray-500">
                      <span className="inline-flex items-center gap-1 font-semibold text-gray-700">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        {selectedProduct.rating}
                      </span>
                      <span>{selectedProduct.reviews} reviews</span>
                      {discount !== null && (
                        <span className="rounded-full bg-orange-100 px-2.5 py-1 text-xs font-bold text-orange-600">
                          {discount}% off
                        </span>
                      )}
                    </div>

                    <div className="mt-4 flex items-baseline gap-3">
                      <span className="text-2xl font-extrabold text-gray-900">
                        {formatPrice(selectedProduct.price)}
                      </span>
                      {selectedProduct.originalPrice && (
                        <span className="text-base text-gray-400 line-through">
                          {formatPrice(selectedProduct.originalPrice)}
                        </span>
                      )}
                    </div>

                    <div className="mt-4 grid gap-3 text-sm text-gray-600">
                      <div className="rounded-xl bg-orange-50 p-3">
                        <div className="font-bold text-gray-900">Category</div>
                        <div className="mt-1">{selectedProduct.category}</div>
                      </div>
                      <div className="rounded-xl bg-purple-50 p-3">
                        <div className="font-bold text-gray-900">Delivery</div>
                        <div className="mt-1">Fast local delivery available</div>
                      </div>
                      <div className="rounded-xl bg-pink-50 p-3">
                        <div className="font-bold text-gray-900">Quality</div>
                        <div className="mt-1">Carefully selected art material</div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-6 grid gap-3">
                      <button
                        onClick={() => {
                          // Add to cart if not already
                          const inCart = cart.some((item) => item.id === selectedProduct.id);
                          if (!inCart) {
                            setCart((prev) => [
                              ...prev,
                              {
                                id: selectedProduct.id,
                                name: selectedProduct.name,
                                price: selectedProduct.price,
                                image: selectedProduct.image,
                                quantity: 1,
                              },
                            ]);
                          }
                          setShowProductSidebar(false);
                          setShowCart(true);
                        }}
                        className={cn(
                          'inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-bold shadow-lg transition',
                          isInCart
                            ? 'bg-gray-100 text-gray-800 hover:bg-red-50 hover:text-red-600'
                            : 'bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-orange-500/20 hover:shadow-orange-500/40'
                        )}
                      >
                        <ShoppingCart className="h-4 w-4" />
                        {isInCart ? 'Already in Cart' : 'Add to Cart'}
                      </button>
                      <button
                        onClick={() => {
                          setShowProductSidebar(false);
                          setShowCheckout(true);
                        }}
                        className="rounded-full bg-gray-950 px-5 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-orange-600"
                      >
                        Proceed to Payment
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          );
        })()}
      </AnimatePresence>

      {/* Cart Sidebar */}
      <AnimatePresence>
        {showCart && (
          <div className="fixed inset-0 z-50 flex justify-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50"
              onClick={() => setShowCart(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative z-10 flex h-full w-full max-w-md flex-col bg-white shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-gray-100 p-4">
                <h2 className="text-lg font-bold text-gray-800">আপনার কার্ট</h2>
                <button
                  onClick={() => setShowCart(false)}
                  className="rounded-full p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4">
                {cart.length === 0 ? (
                  <div className="flex h-full flex-col items-center justify-center text-center">
                    <ShoppingCart className="h-12 w-12 text-gray-300" />
                    <p className="mt-4 text-base text-gray-500">আপনার কার্ট খালি</p>
                    <p className="text-sm text-gray-400">কিছু পণ্য যোগ করুন</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {cart.map((item) => (
                      <div
                        key={item.id}
                        className="flex gap-3 rounded-xl border border-gray-100 p-2"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-16 w-16 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="line-clamp-2 text-xs font-bold text-gray-700">
                            {item.name}
                          </h3>
                          <p className="mt-0.5 text-sm font-semibold text-orange-600">
                            {formatPrice(item.price)}
                          </p>
                          <div className="mt-1.5 flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="flex h-6 w-6 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition hover:border-orange-500 hover:text-orange-500"
                            >
                              -
                            </button>
                            <span className="w-6 text-center text-xs font-semibold text-gray-700">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="flex h-6 w-6 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition hover:border-orange-500 hover:text-orange-500"
                            >
                              +
                            </button>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="ml-auto text-gray-300 hover:text-pink-500 transition"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {cart.length > 0 && (
                <div className="border-t border-gray-100 p-4">
                  <div className="flex items-center justify-between text-base font-bold text-gray-800">
                    <span>মোট</span>
                    <span>{formatPrice(cartTotal)}</span>
                  </div>
                  <button
                    onClick={openCheckout}
                    className="mt-3 w-full rounded-full bg-gradient-to-r from-orange-500 to-pink-500 py-2.5 text-center text-sm font-semibold text-white shadow-lg shadow-orange-500/20 transition hover:shadow-lg hover:shadow-orange-500/30"
                  >
                    অর্ডার নিশ্চিত করুন
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Wishlist Sidebar */}
      <AnimatePresence>
        {showWishlist && (
          <div className="fixed inset-0 z-50 flex justify-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50"
              onClick={() => setShowWishlist(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative z-10 flex h-full w-full max-w-md flex-col bg-white shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-gray-100 p-4">
                <h2 className="text-lg font-bold text-gray-800">আপনার পছন্দ</h2>
                <button
                  onClick={() => setShowWishlist(false)}
                  className="rounded-full p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4">
                {wishlist.length === 0 ? (
                  <div className="flex h-full flex-col items-center justify-center text-center">
                    <Heart className="h-12 w-12 text-gray-300" />
                    <p className="mt-4 text-base text-gray-500">আপনার পছন্দ খালি</p>
                    <p className="text-sm text-gray-400">পছন্দের পণ্য যোগ করুন</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {wishlist.map((item) => (
                      <div
                        key={item.id}
                        className="flex gap-3 rounded-xl border border-gray-100 p-2"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-16 w-16 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="line-clamp-2 text-xs font-bold text-gray-700">
                            {item.name}
                          </h3>
                          <p className="mt-0.5 text-sm font-semibold text-orange-600">
                            {formatPrice(item.price)}
                          </p>
                          <div className="mt-1.5 flex items-center gap-2">
                            <button
                              onClick={() => {
                                const product = defaultProducts.find((p) => p.id === item.id);
                                if (product) addToCart(product);
                              }}
                              className="flex items-center gap-1 rounded-full bg-orange-500 px-2.5 py-1 text-[10px] font-semibold text-white transition hover:bg-pink-500"
                            >
                              <ShoppingCart className="w-3 h-3" />
                              কার্ট
                            </button>
                            <button
                              onClick={() => removeFromWishlist(item.id)}
                              className="ml-auto text-gray-300 hover:text-pink-500 transition"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Payment Sidebar */}
      <AnimatePresence>
        {showPayment && (
          <div className="fixed inset-0 z-50 flex justify-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50"
              onClick={() => setShowPayment(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative z-10 flex h-full w-full max-w-md flex-col bg-white shadow-2xl"
            >
              <PaymentSidebarContent
                orderId={currentOrderId}
                amount={cartTotal}
                items={cart}
                timerKey={paymentTimerKey}
                paymentStatus={paymentStatus}
                transactionId={transactionId}
                setTransactionId={setTransactionId}
                isProcessing={isProcessing}
                setIsProcessing={setIsProcessing}
                onTimeout={() => setPaymentStatus('expired')}
                setPaymentStatus={setPaymentStatus}
                onConfirm={async () => {
                  if (!transactionId.trim()) {
                    showToast({ title: 'Enter Transaction ID', description: 'Please enter your UPI transaction ID after payment' });
                    return;
                  }
                  setIsProcessing(true);
                  try {
                    const order: StoreOrder = {
                      id: currentOrderId,
                      createdAt: new Date().toISOString(),
                      items: cart,
                      total: cartTotal,
                      customer: {
                        name: user?.name || '',
                        email: user?.email || '',
                        ...checkoutDetails,
                      },
                      paymentMethod,
                      paymentStatus: 'Payment Submitted',
                      paymentReference: transactionId.trim(),
                      status: 'New Order',
                    };
                    if (!user) throw new Error('You must be logged in to place an order.');
                    const { error } = await supabase.from('store_orders').insert({ id: order.id, account_id: user.id, customer_email: order.customer.email, created_at: order.createdAt, order_data: order }).select();
                    if (error) { console.error(error); showToast({ title: 'Payment order could not be saved', description: error.message, variant: 'destructive' }); throw error; }
                    setCart([]);
                    setShowPayment(false);
                    setShowCheckout(false);
                    setPaymentStatus('completed');
                    setOrderOutcome('placed');
                    showToast({ title: 'Payment Successful', description: 'Your order has been confirmed!', variant: 'success' });
                  } catch (error) {
                    console.error('Payment error:', error);
                    showToast({ title: 'Payment Failed', description: 'Please try again' });
                  } finally {
                    setIsProcessing(false);
                  }
                }}
                onClose={() => setShowPayment(false)}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Payment Sidebar Component
function PaymentSidebarContent({ orderId, amount, items, timerKey, paymentStatus, transactionId, setTransactionId, isProcessing, setIsProcessing, onTimeout, onConfirm, onClose, setPaymentStatus }: {
  orderId: string;
  amount: number;
  items: CartItem[];
  timerKey: number;
  paymentStatus: 'pending' | 'completed' | 'expired';
  setPaymentStatus: (status: 'pending' | 'completed' | 'expired') => void;
  transactionId: string;
  setTransactionId: (id: string) => void;
  isProcessing: boolean;
  setIsProcessing: (processing: boolean) => void;
  onTimeout: () => void;
  onConfirm: () => void;
  onClose: () => void;
}) {
  const [qrCodeUrl, setQrCodeUrl] = React.useState('');
  const [copied, setCopied] = React.useState(false);
  const [secondsLeft, setSecondsLeft] = React.useState(300);
  const upiId = 'loknathartcenter@upi';

  React.useEffect(() => {
    setSecondsLeft(300);
    setPaymentStatus('pending');
  }, [timerKey]);

  React.useEffect(() => {
    if (secondsLeft <= 0 && paymentStatus === 'pending') {
      onTimeout();
      return;
    }
    const timer = setInterval(() => setSecondsLeft(s => s - 1), 1000);
    return () => clearInterval(timer);
  }, [secondsLeft, paymentStatus, onTimeout]);

  React.useEffect(() => {
    async function generateQR() {
      try {
        const upiString = `upi://pay?pa=${upiId}&pn=Lokenath%20Art%20Center&am=${amount}&tn=${orderId}&cu=INR`;
        const url = await QRCode.toDataURL(upiString, { width: 200, margin: 2 });
        setQrCodeUrl(url);
      } catch (err) { console.error('QR error:', err); }
    }
    if (paymentStatus === 'pending') generateQR();
  }, [orderId, amount, paymentStatus]);

  const handleDownload = () => {
    if (!qrCodeUrl) return;
    const link = document.createElement('a');
    link.download = `payment-${orderId}.png`;
    link.href = qrCodeUrl;
    link.click();
    showToast({ title: 'QR Downloaded', variant: 'success' });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const progress = (secondsLeft / 300) * 100;

  if (paymentStatus === 'expired') {
    return (
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between border-b border-gray-100 p-4">
          <h2 className="text-lg font-bold text-gray-800">Payment</h2>
          <button onClick={onClose} className="rounded-full p-1.5 text-gray-400 hover:bg-gray-100"><X className="w-5 h-5" /></button>
        </div>
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="text-center">
            <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-red-100"><X className="h-8 w-8 text-red-500" /></div>
            <h3 className="text-xl font-bold text-red-600">Time Expired</h3>
            <p className="mt-2 text-sm text-gray-500">Please place a new order</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between border-b border-gray-100 p-4">
        <h2 className="text-lg font-bold text-gray-800">Payment</h2>
        <button onClick={onClose} className="rounded-full p-1.5 text-gray-400 hover:bg-gray-100"><X className="w-5 h-5" /></button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Timer */}
        <div className="rounded-xl bg-orange-50 p-4">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Clock className="h-4 w-4 text-orange-600" />
            <span className="font-bold text-orange-700">Time Remaining</span>
          </div>
          <div className="text-center text-3xl font-bold text-gray-900">{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</div>
          <div className="mt-2 h-2 rounded-full bg-orange-200"><div className="h-full rounded-full bg-orange-500" style={{ width: `${progress}%` }} /></div>
        </div>

        {/* Amount */}
        <div className="rounded-xl bg-gradient-to-r from-orange-500 to-pink-500 p-4 text-center text-white">
          <p className="text-sm opacity-90">Pay Amount</p>
          <p className="text-3xl font-bold">₹{amount}</p>
          <p className="text-sm opacity-80">Order: {orderId}</p>
        </div>

        {/* QR Code */}
        <div className="rounded-xl bg-white p-4 shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-gray-800 flex items-center gap-2"><QrCode className="h-4 w-4 text-orange-500" />Scan & Pay</h3>
            <button onClick={handleDownload} className="text-xs text-orange-500 font-medium flex items-center gap-1"><Download className="h-3 w-3" />Download</button>
          </div>
          <div className="flex justify-center">
            {qrCodeUrl ? (
              <div className="relative">
                <img src={qrCodeUrl} alt="QR" className="h-[180px] w-[180px]" />
                <div className="absolute inset-0 flex items-center justify-center bg-black/5 rounded"><span className="bg-white/90 px-2 py-1 text-xs font-medium rounded">₹{amount}</span></div>
              </div>
            ) : <div className="h-[180px] w-[180px] bg-gray-100 rounded-xl flex items-center justify-center"><span className="text-gray-400 text-sm">Loading...</span></div>}
          </div>
        </div>

        {/* UPI ID */}
        <div className="rounded-xl bg-gray-50 p-3">
          <p className="text-xs text-gray-500 mb-1">Or pay to UPI ID:</p>
          <div className="flex items-center gap-2">
            <code className="flex-1 bg-white px-3 py-2 text-xs font-mono rounded-lg shadow-sm">{upiId}</code>
            <button onClick={handleCopy} className="p-2 rounded-lg bg-white shadow-sm"><Check className="h-4 w-4 text-green-500" style={{ opacity: copied ? 1 : 0 }} /><Copy className="h-4 w-4" style={{ position: copied ? 'absolute' : 'static', opacity: copied ? 0 : 1 }} /></button>
          </div>
        </div>

        {/* Instructions */}
        <div className="rounded-xl bg-blue-50 p-3">
          <h4 className="font-bold text-blue-700 text-sm flex items-center gap-1"><AlertCircle className="h-3 w-3" />How to Pay</h4>
          <ol className="mt-2 text-xs text-blue-600 space-y-1">
            <li>1. Scan QR or copy UPI ID</li>
            <li>2. Open UPI app & pay ₹{amount}</li>
            <li>3. Enter transaction ID below</li>
          </ol>
        </div>

        {/* Transaction Input */}
        <div className="rounded-xl bg-white p-4 shadow-lg">
          <label className="block text-xs font-medium text-gray-600 mb-2">Transaction ID / Reference</label>
          <input type="text" value={transactionId} onChange={e => setTransactionId(e.target.value)} placeholder="e.g., UPI1234567890" className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-orange-500" />
          <button onClick={onConfirm} disabled={isProcessing || !transactionId.trim()} className="mt-3 w-full rounded-full bg-gradient-to-r from-orange-500 to-pink-500 py-2.5 text-sm font-bold text-white disabled:opacity-50">
            {isProcessing ? 'Processing...' : 'Confirm Payment'}
          </button>
        </div>

        {/* Order Summary */}
        <div className="rounded-xl bg-gray-50 p-4">
          <h4 className="font-bold text-gray-700 text-sm mb-2">Order Summary</h4>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {items.map(item => (
              <div key={item.id} className="flex gap-2 text-xs">
                <img src={item.image} alt="" className="h-10 w-10 rounded object-cover" />
                <div className="flex-1 min-w-0"><p className="truncate font-medium">{item.name}</p><p className="text-gray-500">₹{item.price} × {item.quantity}</p></div>
                <p className="font-bold">₹{item.price * item.quantity}</p>
              </div>
            ))}
          </div>
          <div className="mt-3 pt-2 border-t flex justify-between font-bold"><span>Total</span><span>₹{amount}</span></div>
        </div>
      </div>
    </div>
  );
}
