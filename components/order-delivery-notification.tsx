'use client';

import { useEffect } from 'react';
import { useAuth } from '@/components/auth/auth-context';
import { showToast } from '@/components/ui/toaster';
import { supabase } from '@/lib/supabase/client';

type Order = {
  id: string;
  status: string;
  deliveryDate?: string;
  customer: { email: string };
  items: Array<{ name: string }>;
};


export function OrderDeliveryNotification() {
  const { user } = useAuth();

  useEffect(() => {
    if (!user || user.role !== 'customer') return;

    const showNotifications = async () => {
      const { data, error } = await supabase.from('store_orders').select('order_data').order('created_at', { ascending: false });
      if (error) {
        console.error(error);
        showToast({ title: 'Unable to check order updates', description: error.message, variant: 'destructive' });
        return;
      }
      const orders = (data ?? []).map((row) => row.order_data as Order);
      const confirmedOrders = orders.filter((order) =>
        order.customer.email === user.email && (order.status === 'Confirmed' || order.status === 'Delivered')
      );

      confirmedOrders.forEach((order) => {
      const notificationKey = `loknath-delivery-notification-${order.id}-${order.status}-${order.deliveryDate || ''}`;
      if (localStorage.getItem(notificationKey)) return;

      const products = order.items.map((item) => item.name).join(', ');
      showToast({
        title: order.status === 'Delivered' ? 'Order delivered' : 'Order confirmed',
        description: order.status === 'Delivered' ? 'Your order has been delivered successfully.' : `Your product ${products} is coming on ${new Date(`${order.deliveryDate}T00:00:00`).toLocaleDateString('en-IN')}.`,
        variant: 'success',
      });
      localStorage.setItem(notificationKey, 'shown');
    });
    };

    void showNotifications();
  }, [user]);

  return null;
}
