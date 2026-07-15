'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/lib/supabase/client';
import { OrderOutcomeOverlay } from '@/components/order-outcome-overlay';
import { showToast } from '@/components/ui/toaster';

export type AdminOrder = {
  id: string;
  total: number;
  createdAt: string;
  status: string;
  deliveryDate?: string;
  adminMessage?: string;
  items: Array<{ id: string; name: string; price: number; image: string; quantity: number }>;
  customer: { name: string; email: string; phone: string; address: string; city: string; pincode: string; notes?: string };
  paymentMethod: string;
  paymentStatus: string;
  paymentReference?: string;
};

const currency = (value: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value);

export function AdminOrdersPanel({ orders, selectedOrder, onSelect, onUpdate, onClose }: { orders: AdminOrder[]; selectedOrder: AdminOrder | null; onSelect: (order: AdminOrder) => void; onUpdate: (order: AdminOrder) => void; onClose: () => void }) {
  return <section className="mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/40"><div className="border-b border-slate-100 bg-gradient-to-r from-slate-950 to-slate-700 px-6 py-5 text-white"><div className="flex items-start justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-white/60">Customer purchases</p><div className="mt-1 flex flex-wrap items-center gap-3"><h2 className="text-2xl font-bold">Recent Orders</h2><span className="rounded-full bg-white/10 px-3 py-1 text-sm font-semibold">{orders.length} orders</span></div></div><button onClick={onClose} aria-label="Close recent orders" className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-xl font-light transition hover:bg-white/20">×</button></div></div><div className="grid divide-y divide-slate-100 lg:grid-cols-4 lg:divide-x lg:divide-y-0"><div className="max-h-[530px] overflow-y-auto lg:col-span-1">{orders.length ? orders.slice(0, 12).map((order) => <button key={order.id} onClick={() => onSelect(order)} className={`w-full border-b border-slate-100 px-5 py-4 text-left transition last:border-0 ${selectedOrder?.id === order.id ? 'bg-orange-50 ring-inset ring-2 ring-palette-orange' : 'hover:bg-slate-50'}`}><div className="flex justify-between gap-2"><b className="text-sm text-slate-900">{order.customer.name}</b><span className="text-sm font-bold text-slate-900">{currency(order.total)}</span></div><p className="mt-1 text-xs text-slate-500">{order.id} · {new Date(order.createdAt).toLocaleString('en-IN')}</p><Status status={order.status} /></button>) : <p className="p-6 text-sm text-slate-500">No orders yet.</p>}</div>{selectedOrder && <div className="p-6 lg:col-span-3"><OrderOperations order={selectedOrder} onUpdate={onUpdate} /></div>}</div></section>;
}

function OrderOperations({ order, onUpdate }: { order: AdminOrder; onUpdate: (order: AdminOrder) => void }) {
  const [deliveryDate, setDeliveryDate] = useState(order.deliveryDate || '');
  const [saving, setSaving] = useState(false);
  const [outcome, setOutcome] = useState<'confirmed' | 'cancelled' | null>(null);
  useEffect(() => setDeliveryDate(order.deliveryDate || ''), [order]);
  const save = async (next: AdminOrder, nextOutcome?: 'confirmed' | 'cancelled') => { setSaving(true); const { error } = await supabase.from('store_orders').update({ order_data: next }).eq('id', next.id).select(); setSaving(false); if (error) { console.error(error); showToast({ title: 'Unable to update order', description: error.message, variant: 'destructive' }); throw error; } onUpdate(next); if (nextOutcome) setOutcome(nextOutcome); };
  const names = order.items.map((item) => item.name).join(', ');
  const confirm = () => { if (!deliveryDate) return; void save({ ...order, status: 'Confirmed', deliveryDate, adminMessage: `${names} is coming on ${new Date(`${deliveryDate}T00:00:00`).toLocaleDateString('en-IN')}.` }, 'confirmed'); };
  const deliver = () => void save({ ...order, status: 'Delivered', adminMessage: 'Your order has been delivered successfully.' });
  const cancel = () => void save({ ...order, status: 'Cancelled', adminMessage: 'This order was cancelled by the admin.' }, 'cancelled');
  const isDelivered = order.status === 'Delivered';
  const isConfirmed = order.status === 'Confirmed';
  return <div><OrderOutcomeOverlay outcome={outcome} onClose={() => setOutcome(null)} /><div className="flex flex-wrap items-start justify-between gap-3"><div><p className="text-xs font-bold uppercase tracking-wide text-slate-400">Order details</p><h3 className="mt-1 text-xl font-bold text-slate-900">{order.id}</h3></div><Status status={order.status} /></div><div className="mt-5 grid gap-4 md:grid-cols-2"><Info label="Customer name" value={order.customer.name} /><Info label="Phone number" value={order.customer.phone} /><Info label="Full address" value={`${order.customer.address}, ${order.customer.city} – ${order.customer.pincode}`} /><Info label="Order date & time" value={new Date(order.createdAt).toLocaleString('en-IN')} /><Info label="Payment method" value={order.paymentMethod} /><Info label="Payment status" value={order.paymentStatus} /><Info label="Total price" value={currency(order.total)} /><Info label="Delivery date" value={order.deliveryDate ? new Date(`${order.deliveryDate}T00:00:00`).toLocaleDateString('en-IN') : 'Not set'} /></div><div className="mt-5 rounded-2xl bg-slate-50 p-4"><p className="text-xs font-bold uppercase tracking-wide text-slate-400">Ordered products</p><div className="mt-3 space-y-2">{order.items.map((item) => <div key={item.id} className="flex items-center gap-3 rounded-xl bg-white p-2"><img src={item.image} alt="" className="h-10 w-10 rounded-lg object-cover" /><span className="flex-1 font-semibold text-slate-800">{item.name}</span><span className="text-sm text-slate-500">Qty {item.quantity}</span><b className="text-slate-900">{currency(item.price * item.quantity)}</b></div>)}</div></div>{order.adminMessage && <p className="mt-4 rounded-xl bg-blue-50 p-3 text-sm font-semibold text-blue-800">{order.adminMessage}</p>}<div className="mt-5 border-t border-slate-100 pt-5"><label className="text-sm font-bold text-slate-700">Delivery date</label><div className="mt-2 flex flex-wrap items-center gap-3"><Input type="date" value={deliveryDate} disabled={isDelivered} onChange={(event) => setDeliveryDate(event.target.value)} className="max-w-xs" />{isConfirmed && <span className="rounded-full bg-blue-100 px-3 py-2 text-sm font-bold text-blue-800">✅ Confirmed</span>}{isDelivered && <span className="rounded-full bg-emerald-100 px-3 py-2 text-sm font-bold text-emerald-800">📦 Delivered</span>}{!isConfirmed && !isDelivered && order.status !== 'Cancelled' && <Button onClick={confirm} disabled={saving || !deliveryDate}>অর্ডার নিশ্চিত করুন</Button>}{isConfirmed && <Button onClick={deliver} disabled={saving}>Delivered</Button>}{!isDelivered && order.status !== 'Cancelled' && <Button variant="outline" onClick={cancel} disabled={saving}>অর্ডার বাতিল করুন</Button>}</div></div></div>;
}

function Info({ label, value }: { label: string; value: string }) { return <div><p className="text-xs font-bold uppercase tracking-wide text-slate-400">{label}</p><p className="mt-1 font-semibold leading-relaxed text-slate-800">{value}</p></div>; }
function Status({ status }: { status: string }) { const classes: Record<string, string> = { 'New Order': 'bg-amber-100 text-amber-800', Confirmed: 'bg-blue-100 text-blue-800', Delivered: 'bg-emerald-100 text-emerald-800', Cancelled: 'bg-rose-100 text-rose-800' }; return <span className={`mt-2 inline-flex rounded-full px-2.5 py-1 text-xs font-bold ${classes[status] || 'bg-slate-100 text-slate-700'}`}>{status}</span>; }
