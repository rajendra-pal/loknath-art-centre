'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Package, ArrowRight } from 'lucide-react';
import { useAuth } from '@/components/auth/auth-context';
import { Button } from '@/components/ui/button';
import { formatPrice } from '@/lib/utils';
import { supabase } from '@/lib/supabase/client';
import { showToast } from '@/components/ui/toaster';
import { OrderOutcomeOverlay } from '@/components/order-outcome-overlay';

type CustomerOrder = {
  id: string;
  createdAt: string;
  items: Array<{
    id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
  }>;
  total: number;
  customer: {
    email: string;
  };
  paymentMethod: string;
  paymentStatus: string;
  status: string;
  deliveryDate?: string;
  adminMessage?: string;
};


const statusColors: Record<string, string> = {
  'New Order': 'bg-orange-100 text-orange-700',
  Processing: 'bg-blue-100 text-blue-700',
  Delivered: 'bg-emerald-100 text-emerald-700',
  Confirmed: 'bg-blue-100 text-blue-700',
  Cancelled: 'bg-rose-100 text-rose-700',
};

export default function OrdersPage() {
  const { user, loading, openLogin } = useAuth();
  const [orders, setOrders] = useState<CustomerOrder[]>([]);
  const [outcome, setOutcome] = useState<'cancelled' | null>(null);

  const cancelOrder = async (order: CustomerOrder) => {
    const updatedOrder = { ...order, status: 'Cancelled', adminMessage: 'This order was cancelled by the customer.' };
    const { error } = await supabase.from('store_orders').update({ order_data: updatedOrder }).eq('id', order.id);
    if (error) {
      console.error(error);
      showToast({ title: 'Unable to cancel order', description: error.message, variant: 'destructive' });
      return;
    }
    {
      setOrders((current) => current.map((item) => item.id === order.id ? updatedOrder : item));
      setOutcome('cancelled');
    }
  };

  useEffect(() => {
    if (!user) return;
    const loadOrders = async () => {
      const { data, error } = await supabase.from('store_orders').select('order_data').order('created_at', { ascending: false });
      if (error) {
        console.error(error);
        showToast({ title: 'Unable to load orders', description: error.message, variant: 'destructive' });
        return;
      }
      setOrders((data ?? []).map((row) => row.order_data as CustomerOrder).filter((order) => order.customer.email === user.email));
    };
    void loadOrders();
    window.addEventListener('focus', loadOrders);
    return () => window.removeEventListener('focus', loadOrders);
  }, [user]);

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
          <Package className="mx-auto h-12 w-12 text-palette-orange" />
          <h1 className="mt-4 font-display text-3xl font-bold text-ink-500">
            Login to view orders
          </h1>
          <Button onClick={() => openLogin('login', 'customer')} className="mt-6">
            Login
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container pb-10 pt-28">
      <OrderOutcomeOverlay outcome={outcome} onClose={() => setOutcome(null)} />
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h1 className="font-display text-4xl font-bold text-ink-500">আমার অর্ডার</h1>
          <p className="mt-2 text-ink-400">আপনার সাম্প্রতিক কেনাকাটার তালিকা</p>
        </div>
        <Link href="/account" className="text-sm font-semibold text-palette-orange hover:underline">
          ← প্রোফাইলে ফিরে যান
        </Link>
      </div>

      {orders.length === 0 ? (
        <div className="rounded-3xl border border-white/60 bg-white/90 p-10 text-center shadow-lg backdrop-blur-sm">
          <Package className="mx-auto h-14 w-14 text-palette-orange" />
          <h2 className="mt-4 font-display text-2xl font-bold text-ink-500">
            No orders yet
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-ink-400">
            You have not ordered any products yet. Browse the art store and choose your favorite items.
          </p>
          <Link href="/store">
            <Button className="mt-6">
              See All Products
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order, i) => {
            const firstItem = order.items[0];

            return (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex flex-col gap-4 rounded-3xl border border-white/60 bg-white/90 p-5 shadow-lg backdrop-blur-sm sm:flex-row sm:items-center"
              >
                <img
                  src={firstItem?.image}
                  alt={firstItem?.name}
                  className="h-24 w-24 rounded-2xl object-cover"
                />
                <div className="flex-1">
                  <div className="text-xs text-ink-400">
                    {order.id} · {new Date(order.createdAt).toLocaleDateString('en-IN')}
                  </div>
                  <h3 className="mt-1 font-bold text-ink-500">
                    {firstItem?.name}
                    {order.items.length > 1 ? ` + ${order.items.length - 1} more` : ''}
                  </h3>
                  <div className="mt-1 text-xs text-ink-400">
                    {order.paymentMethod} · {order.paymentStatus}
                  </div>
                  <span className={`mt-2 inline-block rounded-full px-3 py-1 text-xs font-semibold ${statusColors[order.status] ?? statusColors['New Order']}`}>
                    {order.status}
                  </span>
                  {order.adminMessage && <p className={`mt-3 rounded-xl p-3 text-sm font-semibold ${order.status === 'Cancelled' ? 'bg-rose-50 text-rose-700' : 'bg-blue-50 text-blue-700'}`}>{order.adminMessage}</p>}
                  <div className="mt-3 space-y-2">
                    {order.items.map((item) => <div key={item.id} className="flex items-center gap-2 text-sm text-ink-500"><img src={item.image} alt={item.name} className="h-8 w-8 rounded-lg object-cover" /><span className="flex-1">{item.name} × {item.quantity}</span><b>{formatPrice(item.price * item.quantity)}</b></div>)}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-display text-2xl font-bold text-palette-orange">
                    {formatPrice(order.total)}
                  </div>
                  <button className="mt-1 inline-flex items-center gap-1 text-sm font-semibold text-ink-400 hover:text-ink-500">
                    Details <ArrowRight className="h-3 w-3" />
                  </button>
                  {order.status !== 'Cancelled' && order.status !== 'Delivered' && <button onClick={() => void cancelOrder(order)} className="mt-3 block text-sm font-bold text-rose-600 hover:underline">Cancel order</button>}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
