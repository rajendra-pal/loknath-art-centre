'use client';

import { motion } from 'framer-motion';
import { useAuth } from '@/components/auth/auth-context';
import { Button } from '@/components/ui/button';
import { Input, Textarea } from '@/components/ui/input';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { LogIn, Sparkles, Plus, Pencil, CheckCircle2, BarChart3, Users, Package, BookOpen, CalendarDays, X, Settings, CreditCard, DollarSign } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase/client';
import { AdminOrdersPanel } from '@/components/admin-orders-panel';
import { AdminReports } from '@/components/admin-reports';
import { showToast } from '@/components/ui/toaster';
import { useLanguage } from '@/lib/i18n/context';
import { tr } from '@/lib/i18n/strings';
type Order = { id: string; total: number; createdAt: string; status: string; deliveryDate?: string; adminMessage?: string; items: Array<{ id: string; name: string; price: number; image: string; quantity: number }>; customer: { name: string; email: string; phone: string; address: string; city: string; pincode: string; notes?: string }; paymentMethod: string; paymentStatus: string; paymentReference?: string };
type Course = { id: string; title: string; duration: string; fee: number; description: string; image: string; isActive: boolean; displayOrder: number };
type Event = { id: string; title: string; date: string; details: string };
type Student = { id: string; name: string; village: string; phone: string; course: string; monthlyFee: number; paidMonths: string[] };
type Blog = { id: string; title: string; category: string; content: string; image: string; date: string };
type Product = { id: string; name: string; price: number; stock: number; image: string; category: string };
type Section = 'course' | 'event' | 'student' | 'blog' | 'product' | 'report' | 'settings' | 'student_details' | 'income_report';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
const emptyImage = '/logo.png';
const seedStudents: Student[] = [
  { id: 'student-1', name: 'Ananya Das', village: 'Maynaguri', phone: '9876543210', course: 'Drawing', monthlyFee: 800, paidMonths: months },
  { id: 'student-2', name: 'Rohan Roy', village: 'Sultanpur', phone: '9876543211', course: 'Watercolour', monthlyFee: 1000, paidMonths: ['Jan', 'Feb', 'Mar', 'May'] },
  { id: 'student-3', name: 'Moumita Pal', village: 'Maynaguri', phone: '9876543212', course: 'Craft', monthlyFee: 700, paidMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May'] },
];

const money = (value: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value);
const id = () => `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
const normalizeOrder = (value: unknown): Order | null => {
  try {
    const order = typeof value === 'string' ? JSON.parse(value) : value;
    if (!order || typeof order !== 'object' || !('id' in order)) return null;
    return order as Order;
  } catch {
    return null;
  }
};

export default function AdminPage() {
  const { user, loading, openLogin } = useAuth();
  const { language } = useLanguage();
  const router = useRouter();
  useEffect(() => { if (!loading && user && user.role !== 'admin') router.push('/'); }, [loading, router, user]);
  if (loading) return <div className="grid min-h-[60vh] place-items-center"><div className="h-12 w-12 animate-spin rounded-full border-4 border-palette-orange border-t-transparent" /></div>;
  if (!user || user.role !== 'admin') return <div className="grid min-h-[60vh] place-items-center px-4"><div className="max-w-md text-center"><LogIn className="mx-auto h-10 w-10 text-palette-purple" /><h1 className="mt-5 font-display text-3xl font-bold text-ink-500">{tr('adminLoginRequired', language)}</h1><Button onClick={() => openLogin('login', 'admin')} className="mt-6">{tr('adminLoginButton', language)}</Button></div></div>;
  return <AdminDashboard user={user as { id: string; name: string; email: string }} />;
}

function AdminDashboard({ user }: { user: { id: string; name: string; email: string } }) {
  const { language } = useLanguage();
  const [active, setActive] = useState<Section | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showOrdersPanel, setShowOrdersPanel] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);
  useEffect(() => {
    const refreshCourses = async () => {
      let data, error;
      try {
        ({ data, error } = await supabase
          .from('courses')
          .select('id, title, duration, fee, description, image, is_active, display_order'));
      } catch (thrown) {
        // Supabase JS sometimes throws (network/CORS/Auth) instead of returning
        // an error object. Convert the throw into a normalized shape so the
        // rest of the handler treats both paths the same way.
        const message = thrown instanceof Error ? thrown.message : String(thrown);
        console.error('Courses load threw:', thrown);
        showToast({ title: 'কোর্স লোড ব্যর্থ', description: message || 'অনুগ্রহ করে আবার চেষ্টা করুন', variant: 'destructive' });
        return;
      }
      if (error) {
        // PostgrestError's enumerable properties can be empty when the real
        // failure is an Auth/CORS/network issue. Coalesce to a printable form.
        const description = error.message || error.hint || error.details || error.code || 'অনুগ্রহ করে আবার চেষ্টা করুন';
        console.error('Courses load failed:', {
          message: error.message,
          code: error.code,
          details: error.details,
          hint: error.hint,
          raw: error,
          stringified: JSON.stringify(error, Object.getOwnPropertyNames(error)),
        });
        showToast({ title: 'কোর্স লোড ব্যর্থ', description, variant: 'destructive' });
        return;
      }
      setCourses((data ?? []).map((row) => ({
        id: row.id,
        title: row.title ?? '',
        duration: row.duration ?? '',
        fee: row.fee ? Number(row.fee) : 0,
        description: row.description ?? '',
        image: row.image ?? emptyImage,
        isActive: row.is_active ?? true,
        displayOrder: row.display_order ?? 0,
      })));
    };
    void refreshCourses();
    const refreshInterval = window.setInterval(refreshCourses, 15000);
    window.addEventListener('focus', refreshCourses);
    return () => {
      window.removeEventListener('focus', refreshCourses);
      window.clearInterval(refreshInterval);
    };
  }, []);
  const [events, setEvents] = useState<Event[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    const refreshOrders = async () => {
      const { data, error } = await supabase.from('store_orders').select('order_data').order('created_at', { ascending: false });
      if (error) { console.error(error); return; }
      setOrders((data ?? []).map((row) => normalizeOrder(row.order_data)).filter((order): order is Order => Boolean(order)));
    };
    refreshOrders();
    const refreshInterval = window.setInterval(refreshOrders, 10000);
    window.addEventListener('focus', refreshOrders);
    window.addEventListener('loknath-orders-updated', refreshOrders);
    return () => {
      window.removeEventListener('focus', refreshOrders);
      window.removeEventListener('loknath-orders-updated', refreshOrders);
      window.clearInterval(refreshInterval);
    };
  }, []);
  const studentFeeIncome = students.reduce((sum, student) => sum + student.monthlyFee * student.paidMonths.length, 0);
  const orderIncome = orders.reduce((sum, order) => {
    const isCashOnDelivery = order.paymentMethod === 'Cash on Delivery';
    return sum + ((!isCashOnDelivery && (order.status === 'Confirmed' || order.status === 'Delivered')) || (isCashOnDelivery && order.status === 'Delivered') ? order.total : 0);
  }, 0);
  const income = studentFeeIncome + orderIncome;
  const pendingIncome = orders.reduce((sum, order) => sum + (order.paymentMethod === 'Cash on Delivery' && order.status !== 'Delivered' ? order.total : 0), 0);
  const actions: { key: Section; label: string; icon: typeof Plus }[] = [
    { key: 'course', label: tr('addNewCourse', language), icon: Plus },
    { key: 'event', label: tr('eventManagement', language), icon: CalendarDays },
    { key: 'student', label: tr('studentList', language), icon: Users },
    { key: 'blog', label: tr('blogPosts', language), icon: BookOpen },
    { key: 'product', label: tr('productManagement', language), icon: Package },
    { key: 'report', label: tr('reports', language), icon: BarChart3 },
    { key: 'student_details', label: tr('studentInfo', language), icon: Users },
    { key: 'income_report', label: tr('incomeReport', language), icon: DollarSign },
    { key: 'settings', label: tr('upiSettings', language), icon: Settings },
  ];
  return <div className="container pt-28 pb-12">
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="overflow-hidden rounded-3xl bg-gradient-to-br from-palette-purple via-palette-rose to-palette-orange p-8 text-white shadow-2xl md:p-12">
      <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-widest"><Sparkles className="h-3 w-3" />{tr('adminDashboard', language)}</div>
      <h1 className="mt-4 font-display text-4xl font-bold md:text-5xl">{tr('welcomeAdmin', language)}, {user.name}!</h1><p className="mt-2 text-white/85">{user.email}</p>
    </motion.div>
    <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {[
        [tr('totalStudents', language), students.length, '#FF6B35'],
        [tr('activeCourses', language), courses.filter((course) => course.isActive).length, '#8B5CF6'],
        [tr('totalOrders', language), orders.length, '#FF5C8A'],
        [tr('totalIncome', language), money(income), '#10B981'],
      ].map(([label, value, color]) => <div key={String(label)} className="rounded-3xl border border-white/60 bg-white/90 p-6 shadow-lg"><div className="text-sm text-ink-400">{label}</div><div className="mt-2 font-display text-3xl font-bold" style={{ color: String(color) }}>{value}</div></div>)}
    </div>
    <button onClick={() => setShowOrdersPanel(true)} className="mt-8 inline-flex items-center rounded-full bg-slate-900 px-5 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-palette-purple">{tr('recentOrdersBtn', language)}</button>
    <div className="mt-5 grid gap-6 lg:grid-cols-[1fr_1.4fr]">
      <div className="rounded-3xl border border-white/60 bg-white/90 p-6 shadow-lg"><h2 className="font-display text-2xl font-bold text-ink-500">{tr('quickActions', language)}</h2><div className="mt-4 grid grid-cols-2 gap-3">{actions.map(({ key, label, icon: Icon }) => <button key={key} onClick={() => setActive(key)} className="rounded-2xl bg-gradient-to-br from-cream-200 to-white p-4 text-left text-sm font-bold text-ink-500 transition hover:-translate-y-0.5 hover:shadow-md"><Icon className="mb-2 h-5 w-5 text-palette-purple" />{label}</button>)}</div><Link href="/" className="mt-6 inline-flex text-sm font-semibold text-palette-purple hover:underline">← {tr('backToHome', language)}</Link></div>
      <div className="rounded-3xl border border-white/60 bg-white/90 p-6 shadow-lg"><h2 className="font-display text-2xl font-bold text-ink-500">{tr('recentOrders', language)}</h2>{orders.length ? <div className="mt-4 space-y-3">{orders.slice(0, 4).map(order => <div className="flex justify-between rounded-2xl bg-ink-50 p-4" key={order.id}><div><b>{order.customer?.name || tr('customerBadge', language)}</b><p className="text-xs text-ink-400">{order.status}</p></div><b className="text-palette-orange">{money(order.total)}</b></div>)}</div> : <p className="mt-4 rounded-2xl bg-ink-50 p-4 text-ink-400">{tr('noRecentOrders', language)}</p>}</div>
    </div>
    <section className="hidden mt-8 rounded-3xl border border-white/60 bg-white/90 p-6 shadow-lg">
      <h2 className="font-display text-2xl font-bold text-ink-500">অর্ডার পরিচালনা</h2>
      <p className="mt-1 text-sm text-ink-400">অর্ডারে ক্লিক করে পণ্য ও গ্রাহকের সম্পূর্ণ তথ্য দেখুন।</p>
      <div className="mt-4 space-y-3">
        {orders.map((order) => <button key={order.id} onClick={() => setSelectedOrder(order)} className="flex w-full items-center justify-between rounded-2xl bg-ink-50 p-4 text-left transition hover:bg-cream-200"><span><b className="block text-ink-500">{order.id}</b><span className="text-sm text-ink-400">{order.customer.name} · {order.status}</span></span><b className="text-palette-orange">{money(order.total)}</b></button>)}
        {!orders.length && <p className="rounded-2xl bg-ink-50 p-4 text-ink-400">কোনো অর্ডার নেই।</p>}
      </div>
    </section>
    <div className="mt-6 grid gap-5 sm:grid-cols-2"><div className="rounded-3xl border border-emerald-100 bg-emerald-50 p-6 shadow-lg"><p className="text-sm font-semibold text-emerald-700">{tr('totalIncomeCard', language)}</p><p className="mt-2 font-display text-3xl font-bold text-emerald-800">{money(income)}</p><p className="mt-1 text-xs text-emerald-700">{tr('totalIncomeDesc', language)}</p></div><div className="rounded-3xl border border-amber-100 bg-amber-50 p-6 shadow-lg"><p className="text-sm font-semibold text-amber-700">{tr('pendingIncome', language)}</p><p className="mt-2 font-display text-3xl font-bold text-amber-800">{money(pendingIncome)}</p><p className="mt-1 text-xs text-amber-700">{tr('pendingIncomeDesc', language)}</p></div></div>
    {showOrdersPanel && <AdminOrdersPanel orders={orders} selectedOrder={selectedOrder} onSelect={setSelectedOrder} onUpdate={(next) => { setOrders((current) => current.map((order) => order.id === next.id ? next : order)); setSelectedOrder(next); }} onClose={() => { setShowOrdersPanel(false); setSelectedOrder(null); }} />}

    <Dialog open={active !== null} onOpenChange={(open) => { if (!open) setActive(null); }}>
      <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto">
        {active === 'course' && <CoursePanel courses={courses} setCourses={setCourses} />}
        {active === 'event' && <EventPanel events={events} setEvents={setEvents} />}
        {active === 'student' && <StudentPanel students={students} setStudents={setStudents} />}
        {active === 'blog' && <BlogPanel blogs={blogs} setBlogs={setBlogs} />}
        {active === 'product' && <ProductPanel />}
        {active === 'report' && <AdminReports />}
        {active === 'settings' && <SettingsPanel userId={user.id} />}
        {active === 'student_details' && <StudentDetailsPanel />}
        {active === 'income_report' && <IncomeReportPanel />}
      </DialogContent>
    </Dialog>

    {false && <OrderDialog order={selectedOrder} onOpenChange={(open) => !open && setSelectedOrder(null)} onUpdate={(next) => { setOrders((current) => current.map((order) => order.id === next.id ? next : order)); setSelectedOrder(next); }} />}
  </div>;
}

function OrdersManagement({ orders, onSelect }: { orders: Order[]; onSelect: (order: Order) => void }) {
  return <section className="mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/40"><div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 bg-gradient-to-r from-slate-900 to-slate-700 px-6 py-5 text-white"><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-white/60">Store operations</p><h2 className="mt-1 text-2xl font-bold">Orders</h2></div><div className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold">{orders.length} total orders</div></div>{orders.length === 0 ? <div className="p-12 text-center text-slate-500">No customer orders have been placed yet.</div> : <div className="overflow-x-auto"><table className="min-w-[1240px] w-full text-left text-sm"><thead className="bg-slate-50 text-xs font-bold uppercase tracking-wide text-slate-500"><tr><th className="px-5 py-4">Order</th><th className="px-5 py-4">Customer</th><th className="px-5 py-4">Contact & address</th><th className="px-5 py-4">Products</th><th className="px-5 py-4">Payment</th><th className="px-5 py-4">Total</th><th className="px-5 py-4">Status</th><th className="px-5 py-4">Delivery & message</th><th className="px-5 py-4" /></tr></thead><tbody className="divide-y divide-slate-100">{orders.map((order) => <tr key={order.id} className="align-top transition hover:bg-orange-50/50"><td className="px-5 py-5"><b className="block text-slate-900">{order.id}</b><span className="mt-1 block text-xs text-slate-500">{new Date(order.createdAt).toLocaleString('en-IN')}</span></td><td className="px-5 py-5"><b className="text-slate-800">{order.customer.name}</b><span className="mt-1 block text-xs text-slate-500">{order.customer.email}</span></td><td className="max-w-[220px] px-5 py-5 text-slate-600"><b className="block">{order.customer.phone}</b><span className="mt-1 block leading-relaxed">{order.customer.address}, {order.customer.city} – {order.customer.pincode}</span></td><td className="max-w-[230px] px-5 py-5">{order.items.map((item) => <div key={item.id} className="mb-2 flex items-center gap-2 last:mb-0"><img src={item.image} alt="" className="h-8 w-8 rounded-md object-cover" /><span className="text-slate-700">{item.name} <b className="text-slate-900">× {item.quantity}</b></span></div>)}</td><td className="px-5 py-5 text-slate-600"><b className="block text-slate-800">{order.paymentMethod}</b><span className="mt-1 block text-xs">{order.paymentStatus}</span>{order.paymentReference && <span className="mt-1 block text-xs text-slate-400">Ref: {order.paymentReference}</span>}</td><td className="px-5 py-5 font-bold text-slate-900">{money(order.total)}</td><td className="px-5 py-5"><StatusPill status={order.status} /></td><td className="max-w-[220px] px-5 py-5 text-slate-600">{order.deliveryDate && <b className="block text-slate-800">{new Date(`${order.deliveryDate}T00:00:00`).toLocaleDateString('en-IN')}</b>}{order.adminMessage && <span className="mt-1 block text-xs leading-relaxed text-slate-500">{order.adminMessage}</span>}{!order.deliveryDate && !order.adminMessage && <span className="text-slate-400">—</span>}</td><td className="px-5 py-5"><button onClick={() => onSelect(order)} className="rounded-lg bg-slate-900 px-3 py-2 text-xs font-bold text-white transition hover:bg-palette-purple">Manage</button></td></tr>)}</tbody></table></div>}</section>;
}

function StatusPill({ status }: { status: string }) { const styles: Record<string, string> = { 'New Order': 'bg-amber-100 text-amber-800', Confirmed: 'bg-blue-100 text-blue-800', Cancelled: 'bg-rose-100 text-rose-800', Delivered: 'bg-emerald-100 text-emerald-800' }; return <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${styles[status] || 'bg-slate-100 text-slate-700'}`}>{status}</span>; }

function OrderDialog({ order, onOpenChange, onUpdate }: { order: Order | null; onOpenChange: (open: boolean) => void; onUpdate: (order: Order) => void }) {
  const { language } = useLanguage();
  const [deliveryDate, setDeliveryDate] = useState('');
  useEffect(() => setDeliveryDate(order?.deliveryDate || ''), [order]);
  if (!order) return null;
  const productNames = order.items.map((item) => item.name).join(', ');
  const saveOrderUpdate = async (nextOrder: Order) => {
    await supabase.from('store_orders').update({ order_data: nextOrder }).eq('id', nextOrder.id);
    onUpdate(nextOrder);
  };
  const deliveryMsg = language === 'bn'
    ? `${productNames} ${new Date(deliveryDate).toLocaleDateString('en-IN')} তারিখে আসছে।`
    : `${productNames} is coming on ${new Date(deliveryDate).toLocaleDateString('en-IN')}.`;
  const confirm = () => { if (!deliveryDate) return; void saveOrderUpdate({ ...order, status: 'Confirmed', deliveryDate, adminMessage: deliveryMsg }); };
  const cancel = () => void saveOrderUpdate({ ...order, status: 'Cancelled', adminMessage: tr('cancelledByAdmin', language) });
  return <Dialog open={Boolean(order)} onOpenChange={onOpenChange}><DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto"><DialogTitle>{tr('orderDialogTitle', language)} {order.id}</DialogTitle><div className="grid gap-6 md:grid-cols-2"><div><h3 className="font-bold text-ink-500">{tr('productDetailsTitle', language)}</h3><div className="mt-3 space-y-3">{order.items.map((item) => <div key={item.id} className="flex items-center gap-3 rounded-2xl bg-ink-50 p-3"><img src={item.image} alt={item.name} className="h-14 w-14 rounded-xl object-cover" /><div className="flex-1"><b>{item.name}</b><p className="text-sm text-ink-400">{item.quantity} × {money(item.price)}</p></div><b>{money(item.price * item.quantity)}</b></div>)}</div><p className="mt-4 font-display text-2xl font-bold text-palette-orange">{tr('totalLabel', language)} {money(order.total)}</p></div><div className="rounded-2xl bg-ink-50 p-4 text-sm text-ink-500"><h3 className="font-bold">{tr('customerDetailsTitle', language)}</h3><p className="mt-3"><b>{tr('customerNameLabel', language)}</b> {order.customer.name}</p><p><b>{tr('customerPhoneLabel', language)}</b> {order.customer.phone}</p><p><b>{tr('customerEmailLabel', language)}</b> {order.customer.email}</p><p><b>{tr('customerAddressLabel', language)}</b> {order.customer.address}, {order.customer.city} - {order.customer.pincode}</p><p><b>{tr('orderDateLabel', language)}</b> {new Date(order.createdAt).toLocaleString('en-IN')}</p><p><b>{tr('paymentLabel', language)}</b> {order.paymentMethod} · {order.paymentStatus}</p>{order.customer.notes && <p><b>{tr('notesLabel', language)}</b> {order.customer.notes}</p>}</div></div><div className="rounded-2xl border border-ink-100 p-4"><label className="font-bold text-ink-500">{tr('deliveryDateLabel', language)}</label><div className="mt-2 flex flex-wrap gap-3"><Input type="date" value={deliveryDate} onChange={(event) => setDeliveryDate(event.target.value)} className="max-w-xs" /><Button onClick={confirm} disabled={order.status === 'Cancelled'}>{tr('confirmOrder', language)}</Button><Button variant="outline" onClick={cancel} disabled={order.status === 'Cancelled'}>{tr('cancelOrderAction', language)}</Button></div><p className="mt-3 text-sm font-semibold text-ink-400">{tr('currentStatus', language)} {order.status}{order.adminMessage ? ` · ${order.adminMessage}` : ''}</p></div></DialogContent></Dialog>;
}

const readError = (err: unknown): { message: string; code?: string; details?: string; hint?: string; status?: number } => {
  // Supabase JS attaches PostgrestError props (message, code, details, hint)
  // as non-enumerable own properties on the prototype in some versions, so
  // plain property access returns undefined and JSON.stringify yields `{}`.
  // Walk both the own keys (enumerable + non-enumerable) and the prototype
  // chain to extract whatever the SDK actually attached.
  if (!err) return { message: 'Unknown error' };
  if (typeof err === 'string') return { message: err };

  const out: Record<string, unknown> = {};
  const collect = (obj: object) => {
    for (const key of Object.getOwnPropertyNames(obj)) {
      if (out[key] === undefined) {
        const value = (obj as Record<string, unknown>)[key];
        if (value !== undefined && typeof value !== 'function') out[key] = value;
      }
    }
  };
  let cursor: object | null = err as object;
  while (cursor && cursor !== Object.prototype) {
    collect(cursor);
    cursor = Object.getPrototypeOf(cursor);
  }
  const message =
    (out.message as string | undefined) ||
    (out.error_description as string | undefined) ||
    (out.msg as string | undefined) ||
    (err instanceof Error ? err.message : '') ||
    JSON.stringify(err) ||
    'Unknown error';
  return {
    message,
    code: out.code as string | undefined,
    details: out.details as string | undefined,
    hint: out.hint as string | undefined,
    status: out.status as number | undefined,
  };
};

const Panel = ({ title, children }: { title: string; children: React.ReactNode }) => <section className="rounded-3xl border border-white/60 bg-white/90 p-6 shadow-lg"><DialogTitle className="font-display text-2xl font-bold text-ink-500">{title}</DialogTitle>{children}</section>;
const ImageField = ({ value, onChange }: { value?: string; onChange: (image: string) => void }) => (
  <div className="flex items-center gap-3">
    {value && (
      <img
        src={value}
        alt="current"
        className="h-14 w-14 rounded-xl object-cover ring-1 ring-ink-100"
        onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
      />
    )}
    <input
      aria-label="Upload image"
      type="file"
      accept="image/*"
      onChange={(event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = () => onChange(String(reader.result));
          reader.readAsDataURL(file);
        }
      }}
      className="block w-full text-sm text-ink-400 file:mr-4 file:rounded-full file:border-0 file:bg-palette-purple/10 file:px-4 file:py-2 file:font-semibold file:text-palette-purple"
    />
  </div>
);

function CoursePanel({ courses, setCourses }: { courses: Course[]; setCourses: (items: Course[]) => void }) {
  const { language } = useLanguage();
  const [editing, setEditing] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Separate the image draft from `editing` so picking a file before clicking
  // "Update" doesn't depend on `editing` being set, and so the FileReader's
  // async onload can't overwrite the wrong row.
  const [imageDraft, setImageDraft] = useState<string>(emptyImage);

  const loadCourses = async () => {
    setLoading(true);
    setError(null);
    let data: unknown[] | null = null;
    let error: unknown = null;
    try {
      ({ data, error } = await supabase
        .from('courses')
        .select('*')
        .order('display_order', { ascending: true }));
    } catch (thrown) {
      const { message } = readError(thrown);
      console.error('Courses load threw:', thrown);
      setError(message || 'কোর্স লোড ব্যর্থ');
      setLoading(false);
      return;
    }
    if (error) {
      const r = readError(error);
      console.error('Courses load failed:', { ...r, raw: error });
      setError(r.message || 'কোর্স লোড ব্যর্থ');
      setLoading(false);
      return;
    }
    const mapped: Course[] = ((data ?? []) as Array<{
      id: string;
      title?: string | null;
      duration?: string | null;
      fee?: number | string | null;
      description?: string | null;
      image?: string | null;
      is_active?: boolean | null;
      display_order?: number | null;
    }>).map((row) => ({
      id: row.id,
      title: row.title ?? '',
      duration: row.duration ?? '',
      fee: row.fee ? Number(row.fee) : 0,
      description: row.description ?? '',
      image: row.image ?? emptyImage,
      isActive: row.is_active ?? true,
      displayOrder: row.display_order ?? 0,
    }));
    setCourses(mapped);
    setLoading(false);
  };

  useEffect(() => { void loadCourses(); }, []);

  const save = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    setSaving(true);
    setError(null);
    // Same diagnostic as toggleActive — if is_admin() returns false, RLS
    // silently filters the UPDATE/INSERT to 0 rows and the user sees
    // `{}` instead of a permission error.
    try {
      const probe = await supabase.rpc('is_admin');
      console.log('[save] is_admin() =>', probe);
    } catch (probeErr) {
      console.warn('[save] is_admin probe failed:', probeErr);
    }
    const data = Object.fromEntries(new FormData(form));
    const nextOrder = editing
      ? editing.displayOrder
      : (courses.length ? Math.max(...courses.map((c) => c.displayOrder)) + 1 : 1);
    const row = {
      id: editing?.id || id(),
      title: String(data.title),
      title_bn: String(data.title),
      title_en: String(data.title),
      duration: String(data.duration),
      age_group: 'সকল স্তর',
      level: 'সকল স্তর',
      description: String(data.description),
      // Prefer the freshly-picked image, then the row being edited, then the
      // seed fallback. Previously this used `editing?.image` only, which
      // meant picking a file in "new course" mode silently dropped the image.
      image: imageDraft || editing?.image || emptyImage,
      color: '#8B5CF6',
      category: 'General',
      fee: Number(data.fee) || 0,
      display_order: nextOrder,
      is_active: editing?.isActive ?? true,
    };
    const query = editing
      ? supabase.from('courses').update(row).eq('id', row.id)
      : supabase.from('courses').insert(row);
    let saveError: unknown = null;
    try {
      ({ error: saveError } = await query);
    } catch (thrown) {
      const { message } = readError(thrown);
      setSaving(false);
      console.error('Save course threw:', thrown);
      setError(message || 'সংরক্ষণ ব্যর্থ');
      showToast({ title: 'সংরক্ষণ ব্যর্থ', description: message || 'কোর্স সংরক্ষণ করা যায়নি।', variant: 'destructive' });
      return;
    }
    setSaving(false);
    if (saveError) {
      const r = readError(saveError);
      const description = r.message || JSON.stringify(r) || 'সংরক্ষণ ব্যর্থ';
      console.error('Save course failed:', { ...r, raw: saveError });
      setError(description);
      showToast({ title: 'সংরক্ষণ ব্যর্থ', description, variant: 'destructive' });
      return;
    }
    // Reset the form BEFORE clearing `editing` — the form is keyed by
    // `editing?.id || 'new'`, so flipping editing to null unmounts it and
    // event.currentTarget would resolve to null on the next render.
    form.reset();
    setImageDraft(emptyImage);
    setEditing(null);
    await loadCourses();
    // Notify any other tabs (e.g. the public site) that courses just changed.
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('loknath-courses-updated'));
    }
    showToast({ title: editing ? 'কোর্স আপডেট হয়েছে' : 'নতুন কোর্স যোগ হয়েছে', variant: 'success' });
  };

  const toggleActive = async (course: Course) => {
    // Optimistic update — flip locally so the UI responds instantly, then
    // reconcile with the server once the round-trip completes.
    const nextActive = !course.isActive;
    setCourses(courses.map((c) => (c.id === course.id ? { ...c, isActive: nextActive } : c)));
    setError(null);
    let updateError: unknown = null;
    let data: { is_active?: boolean } | null = null;

    // One-time diagnostic so we can see exactly what RLS is reporting for the
    // signed-in user. If `is_admin` returns false, RLS silently filters the
    // UPDATE to 0 rows — which is exactly what the user is seeing.
    try {
      const probe = await supabase.rpc('is_admin');
      console.log('[toggleActive] is_admin() =>', probe);
    } catch (probeErr) {
      console.warn('[toggleActive] is_admin probe failed:', probeErr);
    }
    try {
      // Avoid `.single()` here — it wraps the response as a single-object
      // (Accept: ...vnd.pgrst.object+json). When the UPDATE matches 0 rows
      // (e.g. RLS denies silently), PostgREST returns 406 + PGRST116 instead
      // of the actual policy error. Using `maybeSingle()` gives us the same
      // single-row shape without coercing into 406, and let us inspect the
      // matched-row count directly via the response headers.
      ({ data, error: updateError } = await supabase
        .from('courses')
        .update({ is_active: nextActive })
        .eq('id', course.id)
        .select('id, is_active')
        .maybeSingle());
    } catch (thrown) {
      // Network/CORS failures never produce a PostgrestError — the SDK
      // throws directly. Surface the real message instead of `{}`.
      const { message } = readError(thrown);
      setCourses(courses.map((c) => (c.id === course.id ? { ...c, isActive: course.isActive } : c)));
      console.error('Toggle active threw:', thrown);
      setError(message || 'Toggle failed');
      showToast({ title: 'Toggle failed', description: message || 'Unable to update course visibility.', variant: 'destructive' });
      return;
    }
    if (updateError) {
      // Empty `{message, code, details, hint}` is RLS / auth / network.
      // Use the reflective reader so non-enumerable props still surface.
      const r = readError(updateError);
      const description = r.message || JSON.stringify(r) || 'Toggle failed';
      setCourses(courses.map((c) => (c.id === course.id ? { ...c, isActive: course.isActive } : c)));
      console.error('Toggle active failed:', { ...r, raw: updateError });
      setError(description);
      showToast({ title: 'Toggle failed', description, variant: 'destructive' });
      return;
    }
    // Trust the server's value over the optimistic one in case RLS or a
    // trigger changed it.
    if (data?.is_active !== undefined && data.is_active !== nextActive) {
      setCourses(courses.map((c) => (c.id === course.id ? { ...c, isActive: Boolean(data.is_active) } : c)));
    }
    showToast({ title: nextActive ? 'কোর্স দৃশ্যমান করা হয়েছে' : 'কোর্স লুকানো হয়েছে', variant: 'success' });
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('loknath-courses-updated'));
    }
  };

  const remove = async (courseId: string) => {
    if (!confirm('এই কোর্সটি মুছে ফেলতে চান?')) return;
    // Optimistic remove so the row disappears immediately.
    const previous = courses;
    setCourses(courses.filter((c) => c.id !== courseId));
    setError(null);
    let deleteError: unknown = null;
    try {
      ({ error: deleteError } = await supabase.from('courses').delete().eq('id', courseId));
    } catch (thrown) {
      const { message } = readError(thrown);
      setCourses(previous);
      console.error('Delete threw:', thrown);
      setError(message || 'Delete failed');
      showToast({ title: 'মুছে ফেলা ব্যর্থ', description: message || 'Unable to delete this course.', variant: 'destructive' });
      return;
    }
    if (deleteError) {
      const r = readError(deleteError);
      const description = r.message || JSON.stringify(r) || 'Delete failed';
      setCourses(previous);
      console.error('Delete failed:', { ...r, raw: deleteError });
      setError(description);
      showToast({ title: 'মুছে ফেলা ব্যর্থ', description, variant: 'destructive' });
      return;
    }
    showToast({ title: 'কোর্স মুছে ফেলা হয়েছে', variant: 'success' });
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('loknath-courses-updated'));
    }
  };

  return (
    <Panel title={tr('courseManagement', language)}>
      {error && <p className="mt-4 rounded-2xl bg-rose-50 p-3 text-sm text-rose-700">{error}</p>}
      <form
        key={editing?.id || 'new'}
        onSubmit={save}
        className="mt-5 grid gap-3 md:grid-cols-2"
      >
        <Input name="title" defaultValue={editing?.title} placeholder={tr('courseNamePlaceholder', language)} required />
        <Input name="duration" defaultValue={editing?.duration} placeholder={tr('durationPlaceholder', language)} required />
        <Input name="fee" type="number" defaultValue={editing?.fee} placeholder={tr('monthlyFeePlaceholder', language)} required />
        <ImageField
          value={imageDraft}
          onChange={setImageDraft}
        />
        <Textarea
          name="description"
          defaultValue={editing?.description}
          placeholder={tr('courseDetailsPlaceholder', language)}
          className="md:col-span-2"
          required
        />
        <div className="md:col-span-2 flex gap-2">
          <Button type="submit" disabled={saving}>
            {saving ? tr('savingCourse', language) : editing ? tr('updateCourse', language) : tr('saveNewCourse', language)}
          </Button>
          {editing && (
            <Button type="button" variant="outline" onClick={() => { setEditing(null); setImageDraft(emptyImage); }}>
              {tr('cancel', language)}
            </Button>
          )}
        </div>
      </form>

      {loading ? (
        <div className="mt-6 flex justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-palette-purple border-t-transparent" />
        </div>
      ) : (
        <ItemGrid
          items={courses}
          empty={tr('noCoursesYet', language)}
          render={(course) => (
            <>
              <img
                src={course.image}
                alt=""
                className="h-16 w-16 rounded-xl object-cover"
                onError={(e) => {
                  const img = e.currentTarget;
                  if (img.dataset.fallback !== '1') {
                    img.dataset.fallback = '1';
                    img.src = emptyImage;
                  }
                }}
              />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <b>{course.title}</b>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${course.isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                    {course.isActive ? tr('visibleOnWebsite', language) : tr('hiddenLabel', language)}
                  </span>
                </div>
                <p className="text-sm text-ink-400">
                  {course.duration} · {money(course.fee)}
                </p>
                <p className="text-sm text-ink-400">{course.description}</p>
              </div>
              <button
                onClick={() => toggleActive(course)}
                title={course.isActive ? tr('hideFromWebsite', language) : tr('showOnWebsite', language)}
                aria-label={course.isActive ? tr('hideLabel', language) : tr('showLabel', language)}
                className={`flex h-9 w-16 items-center rounded-full px-1 transition ${course.isActive ? 'bg-emerald-500' : 'bg-slate-300'}`}
              >
                <span className={`inline-block h-7 w-7 transform rounded-full bg-white shadow transition ${course.isActive ? 'translate-x-7' : 'translate-x-0'}`} />
              </button>
              <button onClick={() => { setImageDraft(course.image); setEditing(course); }} aria-label={tr('edit', language)}>
                <Pencil className="h-4 w-4 text-palette-purple" />
              </button>
              <button onClick={() => remove(course.id)} aria-label={tr('delete', language)}>
                <X className="h-4 w-4 text-rose-500" />
              </button>
            </>
          )}
        />
      )}
    </Panel>
  );
}
function EventPanel({ events, setEvents }: { events: Event[]; setEvents: (items: Event[]) => void }) {
  const { language } = useLanguage();
  const [editing, setEditing] = useState<Event | null>(null);
  const save = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); const data = Object.fromEntries(new FormData(event.currentTarget)); const item = { id: editing?.id || id(), title: String(data.title), date: String(data.date), details: String(data.details) }; setEvents(editing ? events.map(value => value.id === item.id ? item : value) : [...events, item]); setEditing(null); event.currentTarget.reset(); };
  return <Panel title={tr('eventPanelTitle', language)}><form onSubmit={save} className="mt-5 grid gap-3 md:grid-cols-2"><Input name="title" defaultValue={editing?.title} placeholder={tr('eventTitlePlaceholder', language)} required /><Input name="date" type="date" defaultValue={editing?.date} required /><Textarea name="details" defaultValue={editing?.details} placeholder={tr('eventDetailsPlaceholder', language)} className="md:col-span-2" required /><Button type="submit">{editing ? tr('updateEvent', language) : tr('addEvent', language)}</Button></form><ItemGrid items={events} empty={tr('noEvents', language)} render={item => <><div className="flex-1"><b>{item.title}</b><p className="text-sm text-ink-400">{item.date} · {item.details}</p></div><button onClick={() => setEditing(item)}><Pencil className="h-4 w-4 text-palette-purple" /></button></>} /></Panel>;
}
function StudentPanel({ students, setStudents }: { students: Student[]; setStudents: (items: Student[]) => void }) {
  const { language } = useLanguage();
  const [village, setVillage] = useState(''); const [editing, setEditing] = useState<Student | null>(null); const filtered = students.filter(student => !village || student.village === village); const save = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); const data = Object.fromEntries(new FormData(event.currentTarget)); const item: Student = { id: editing?.id || id(), name: String(data.name), village: String(data.village), phone: String(data.phone), course: String(data.course), monthlyFee: Number(data.monthlyFee), paidMonths: editing?.paidMonths || [] }; setStudents(editing ? students.map(value => value.id === item.id ? item : value) : [...students, item]); setEditing(null); event.currentTarget.reset(); }; const toggleFee = (student: Student, month: string) => setStudents(students.map(value => value.id === student.id ? { ...value, paidMonths: value.paidMonths.includes(month) ? value.paidMonths.filter(value => value !== month) : [...value.paidMonths, month] } : value)); return <Panel title="ছাত্র তালিকা ও মাসিক ফি"><form onSubmit={save} className="mt-5 grid gap-3 md:grid-cols-3"><Input name="name" defaultValue={editing?.name} placeholder={tr('studentNamePlaceholder', language)} required /><Input name="village" defaultValue={editing?.village} placeholder={tr('villagePlaceholder', language)} required /><Input name="phone" defaultValue={editing?.phone} placeholder={tr('phonePlaceholder', language)} required /><Input name="course" defaultValue={editing?.course} placeholder={tr('coursePlaceholder', language)} required /><Input name="monthlyFee" type="number" defaultValue={editing?.monthlyFee} placeholder={tr('monthlyFeePlaceholder', language)} required /><Button type="submit">{editing ? tr('updateStudent', language) : tr('addStudent', language)}</Button></form><select value={village} onChange={event => setVillage(event.target.value)} className="mt-5 h-11 rounded-xl border border-ink-200 bg-white px-3 text-sm text-ink-500"><option value="">{tr('allVillages', language)}</option>{[...new Set(students.map(student => student.village))].map(value => <option key={value}>{value}</option>)}</select><div className="mt-4 overflow-x-auto"><table className="w-full min-w-[700px] text-left text-sm"><thead className="text-ink-400"><tr><th className="p-2">{tr('name', language)}</th><th>{tr('villagePlaceholder', language)}</th><th>{tr('coursePlaceholder', language)}</th><th>{tr('monthlyFeePlaceholder', language)}</th><th>{tr('confirmFeeColumn', language)}</th><th /></tr></thead><tbody>{filtered.map(student => <tr key={student.id} className="border-t border-ink-100"><td className="p-2 font-semibold">{student.name}<span className="block text-xs font-normal text-ink-400">{student.phone}</span></td><td>{student.village}</td><td>{student.course}</td><td>{money(student.monthlyFee)}</td><td><div className="flex gap-1">{months.map(month => <button title={`${month} fee`} onClick={() => toggleFee(student, month)} key={month} className={`rounded px-2 py-1 text-xs ${student.paidMonths.includes(month) ? 'bg-emerald-100 text-emerald-700' : 'bg-ink-100 text-ink-400'}`}>{month}</button>)}</div></td><td><button onClick={() => setEditing(student)}><Pencil className="h-4 w-4 text-palette-purple" /></button></td></tr>)}</tbody></table></div></Panel>;
}
function BlogPanel({ blogs, setBlogs }: { blogs: Blog[]; setBlogs: (items: Blog[]) => void }) {
  const { language } = useLanguage();
  const [editing, setEditing] = useState<Blog | null>(null); const save = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); const data = Object.fromEntries(new FormData(event.currentTarget)); const item: Blog = { id: editing?.id || id(), title: String(data.title), category: String(data.category), content: String(data.content), image: editing?.image || emptyImage, date: editing?.date || new Date().toLocaleDateString('en-GB') }; setBlogs(editing ? blogs.map(value => value.id === item.id ? item : value) : [item, ...blogs]); setEditing(null); event.currentTarget.reset(); }; return <Panel title={tr('blogPosts', language)}><form onSubmit={save} className="mt-5 grid gap-3 md:grid-cols-2"><Input name="title" defaultValue={editing?.title} placeholder={tr('blogTitlePlaceholder', language)} required /><Input name="category" defaultValue={editing?.category} placeholder={tr('blogCategoryPlaceholder', language)} required /><ImageField value={editing?.image} onChange={image => setEditing(current => ({ ...(current || { id: '', title: '', category: '', content: '', date: '' }), image }))} /><Textarea name="content" defaultValue={editing?.content} placeholder={tr('blogContentPlaceholder', language)} className="md:col-span-2" required /><Button type="submit">{editing ? tr('updatePost', language) : tr('publishPost', language)}</Button></form><ItemGrid items={blogs} empty={tr('noBlogPosts', language)} render={item => <><img src={item.image} alt="" className="h-16 w-16 rounded-xl object-cover" /><div className="flex-1"><b>{item.title}</b><p className="text-sm text-ink-400">{item.category} · {item.date}</p></div><button onClick={() => setEditing(item)}><Pencil className="h-4 w-4 text-palette-purple" /></button></>} /></Panel>;
}
function ProductPanel() {
  const { language } = useLanguage();
  const [products, setProducts] = useState<Product[]>([]); const [editing, setEditing] = useState<Product | null>(null);
  const load = async () => { const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: false }); if (error) { console.error(error); alert(error.message); return; } setProducts((data ?? []).map((p) => ({ id: p.id, name: p.name, category: p.category, price: Number(p.price), stock: p.stock ?? 0, image: p.image || emptyImage }))); };
  useEffect(() => { void load(); }, []);
  const save = async (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); const form = Object.fromEntries(new FormData(event.currentTarget)); const item = { id: editing?.id || id(), name: String(form.name), category: String(form.category), price: Number(form.price), stock: Number(form.stock), image: editing?.image || emptyImage }; const query = editing ? supabase.from('products').update(item).eq('id', item.id).select() : supabase.from('products').insert(item).select(); const { error } = await query; if (error) { console.error(error); alert(error.message); throw error; } setEditing(null); event.currentTarget.reset(); await load(); };
  return <Panel title={tr('productManagement', language)}><form onSubmit={save} className="mt-5 grid gap-3 md:grid-cols-2"><Input name="name" defaultValue={editing?.name} placeholder={tr('productNamePlaceholder', language)} required /><Input name="category" defaultValue={editing?.category} placeholder={tr('productCategoryPlaceholder', language)} required /><Input name="price" type="number" defaultValue={editing?.price} placeholder={tr('pricePlaceholder', language)} required /><Input name="stock" type="number" defaultValue={editing?.stock} placeholder={tr('stockPlaceholder', language)} required /><ImageField value={editing?.image} onChange={image => setEditing(current => ({ ...(current || { id: '', name: '', category: '', price: 0, stock: 0 }), image }))} /><Button type="submit">{editing ? tr('updateProduct', language) : tr('addProduct', language)}</Button></form><ItemGrid items={products} empty={tr('noProducts', language)} render={item => <><img src={item.image} alt="" className="h-16 w-16 rounded-xl object-cover" /><div className="flex-1"><b>{item.name}</b><p className="text-sm text-ink-400">{item.category} · {money(item.price)} · {tr('stockPlaceholder', language)} {item.stock}</p></div><button onClick={() => setEditing(item)}><Pencil className="h-4 w-4 text-palette-purple" /></button></>} /></Panel>;
}
function ItemGrid<T>({ items, empty, render }: { items: T[]; empty: string; render: (item: T) => React.ReactNode }) { return <div className="mt-6 space-y-3">{items.length ? items.map((item, index) => <div key={(item as { id: string }).id || index} className="flex items-center gap-3 rounded-2xl bg-ink-50 p-4">{render(item)}</div>) : <p className="rounded-2xl bg-ink-50 p-4 text-ink-400">{empty}</p>}</div>; }
function Reports({ orders, students, products }: { orders: Order[]; students: Student[]; products: Product[] }) {
  const { language } = useLanguage();
  const feeIncome = students.reduce((sum, student) => sum + student.monthlyFee * student.paidMonths.length, 0); const productIncome = orders.reduce((sum, order) => sum + order.total, 0); const uninterrupted = students.filter(student => months.every(month => student.paidMonths.includes(month))); const topProduct = [...products].sort((a, b) => a.stock - b.stock)[0]; const max = Math.max(feeIncome, productIncome, 1); return <Panel title={tr('reports', language)}><div className="mt-5 grid gap-4 md:grid-cols-2"><ReportCard title={tr('customerReport', language)} value={`${orders.length} ${tr('totalOrdersColumn', language)}`} note={tr('customerReportNote', language)} icon={<Users />} /><ReportCard title={tr('productReport', language)} value={topProduct?.name || tr('noData', language)} note={tr('productReportNote', language)} icon={<Package />} /><ReportCard title={tr('studentReport', language)} value={`${uninterrupted.length} ${language === 'bn' ? 'নিয়মিত' : 'consistent'}`} note={tr('studentReportNote', language)} icon={<CheckCircle2 />} /><ReportCard title={tr('incomeReport', language)} value={money(feeIncome + productIncome)} note={`${tr('studentFeeIncome', language)} & ${tr('productSalesIncome', language)}`} icon={<BarChart3 />} /></div><div className="mt-6 rounded-2xl bg-ink-50 p-5"><h3 className="font-display text-xl font-bold text-ink-500">{tr('incomeComparison', language)}</h3>{[[tr('studentFeeIncome', language), feeIncome, '#8B5CF6'], [tr('productSalesIncome', language), productIncome, '#FF6B35']].map(([label, value, color]) => <div key={String(label)} className="mt-4"><div className="mb-1 flex justify-between font-bold text-ink-500"><span>{label}</span><span>{money(Number(value))}</span></div><div className="h-4 overflow-hidden rounded-full bg-white"><div className="h-full rounded-full" style={{ width: `${(Number(value) / max) * 100}%`, backgroundColor: String(color) }} /></div></div>)}<p className="mt-5 font-bold text-ink-500">{tr('higherIncome', language)} {feeIncome >= productIncome ? tr('higherIncomeStudent', language) : tr('higherIncomeProduct', language)} {language === 'bn' ? 'থেকে' : ''}</p></div></Panel>;
}
function ReportCard({ title, value, note, icon }: { title: string; value: string; note: string; icon: React.ReactNode }) { return <div className="rounded-2xl bg-gradient-to-br from-cream-200 to-white p-5"><div className="flex items-center gap-2 text-palette-purple">{icon}<b>{title}</b></div><div className="mt-4 font-display text-2xl font-bold text-ink-500">{value}</div><p className="mt-1 text-sm text-ink-400">{note}</p></div>; }

function SettingsPanel({ userId }: { userId: string }) {
  const { language } = useLanguage();
  const [upiId, setUpiId] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    async function loadSettings() {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('upi_id, business_name')
          .eq('user_id', userId)
          .maybeSingle();

        if (error) {
          // Handle empty error object - likely table doesn't exist or network issue
          console.warn('Settings query returned empty error - table may not exist');
          // Continue with empty defaults
        } else if (data) {
          setUpiId(data.upi_id || '');
          setBusinessName(data.business_name || 'Lokenath Art Center');
        }
      } catch (err) {
        console.warn('Error loading settings, using defaults:', err);
      }
      setLoading(false);
    }
    loadSettings();
  }, [userId]);

  const handleSave = async (event: FormEvent) => {
    event.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      // Check if profile exists - use maybeSingle to avoid error when no rows
      const { data: existing, error: fetchError } = await supabase
        .from('profiles')
        .select('id')
        .eq('user_id', userId)
        .maybeSingle();

      if (fetchError) {
        // Handle empty error - likely table doesn't exist
        console.warn('Profile fetch returned error:', fetchError);
        setMessage({ type: 'error', text: tr('dbConnectionIssue', language) });
        setSaving(false);
        return;
      }

      if (existing) {
        // Update existing profile
        const { error } = await supabase
          .from('profiles')
          .update({ upi_id: upiId, business_name: businessName, updated_at: new Date().toISOString() })
          .eq('user_id', userId);

        if (error) {
          console.error('Error updating profile:', error);
          throw error;
        }
      } else {
        // Create new profile
        const { error } = await supabase
          .from('profiles')
          .insert({ user_id: userId, upi_id: upiId, business_name: businessName });

        if (error) {
          console.error('Error inserting profile:', error);
          throw error;
        }
      }

      setMessage({ type: 'success', text: tr('upiSaved', language) });
    } catch (err) {
      console.error('Error saving settings:', err);
      const errorMessage = err instanceof Error ? err.message : tr('settingsSaveFailed', language);
      setMessage({ type: 'error', text: errorMessage });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <Panel title={tr('upiTitle', language)}><div className="flex items-center justify-center p-8"><div className="h-8 w-8 animate-spin rounded-full border-4 border-palette-purple border-t-transparent" /></div></Panel>;
  }

  return (
    <Panel title={tr('upiTitle', language)}>
      <div className="mt-5 rounded-2xl bg-gradient-to-r from-orange-50 to-pink-50 p-4">
        <div className="flex items-start gap-3">
          <div className="rounded-full bg-orange-100 p-2">
            <CreditCard className="h-5 w-5 text-orange-600" />
          </div>
          <div>
            <h4 className="font-bold text-orange-800">{tr('upiTitle', language)}</h4>
            <p className="mt-1 text-sm text-orange-700">{tr('upiIntro', language)}</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSave} className="mt-5 grid gap-4">
        <div>
          <label className="block text-sm font-bold text-ink-500 mb-2">
            <DollarSign className="inline h-4 w-4 mr-1" />
            {tr('upiIdLabel', language)}
          </label>
          <Input
            type="text"
            value={upiId}
            onChange={(e) => setUpiId(e.target.value)}
            placeholder={tr('upiIdPlaceholder', language)}
            required
          />
          <p className="mt-1 text-xs text-ink-400">{tr('upiIdHint', language)}</p>
        </div>

        <div>
          <label className="block text-sm font-bold text-ink-500 mb-2">
            {tr('businessNameLabel', language)}
          </label>
          <Input
            type="text"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            placeholder={tr('businessNamePlaceholder', language)}
          />
        </div>

        {upiId && (
          <div className="rounded-2xl bg-emerald-50 p-4">
            <div className="flex items-center gap-2 text-emerald-700">
              <CheckCircle2 className="h-5 w-5" />
              <span className="font-bold">{tr('upiPreview', language)}</span>
            </div>
            <p className="mt-2 text-sm text-emerald-600">
              {tr('upiPreviewShows', language)} <strong>{upiId}</strong>
            </p>
          </div>
        )}

        {message && (
          <div className={`rounded-2xl p-4 ${message.type === 'success' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>
            {message.text}
          </div>
        )}

        <Button type="submit" disabled={saving}>
          {saving ? `${tr('saving', language)}` : tr('saveSettings', language)}
        </Button>
      </form>

      <div className="mt-6 rounded-2xl bg-blue-50 p-4">
        <h4 className="font-bold text-blue-700">{tr('howItWorks', language)}</h4>
        <ol className="mt-2 space-y-2 text-sm text-blue-600">
          <li>{tr('howItWorksStep1', language)}</li>
          <li>{tr('howItWorksStep2', language)}</li>
          <li>{tr('howItWorksStep3', language)}</li>
          <li>{tr('howItWorksStep4', language)}</li>
        </ol>
      </div>
    </Panel>
  );
}

type StudentDetail = {
  id: string;
  name: string;
  email: string;
  phone: string;
  village: string;
  course: string;
  monthly_fee: number;
  paid_months: string[];
  admission_date: string;
  status: string;
  notes: string;
};

function StudentDetailsPanel() {
  const [students, setStudents] = useState<StudentDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<StudentDetail | null>(null);
  const [filter, setFilter] = useState<'All' | 'Active' | 'Inactive'>('All');

  useEffect(() => {
    loadStudents();
  }, []);

  async function loadStudents() {
    setLoading(true);
    const { data, error } = await supabase
      .from('students')
      .select('*')
      .order('created_at', { ascending: false });

    if (data) {
      setStudents(data);
    }
    setLoading(false);
  }

  const filteredStudents = students.filter(s => filter === 'All' || s.status === filter);

  const saveStudent = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { alert('You must be logged in.'); return; }
    const studentData = {
      account_id: user.id,
      name: String(data.name),
      email: String(data.email) || null,
      phone: String(data.phone),
      village: String(data.village) || null,
      course: String(data.course),
      monthly_fee: Number(data.monthly_fee) || 0,
      paid_months: editing?.paid_months || [],
      admission_date: String(data.admission_date) || new Date().toISOString().split('T')[0],
      status: String(data.status) || 'Active',
      notes: String(data.notes) || null,
    };

    try {
      if (editing) {
        const { error } = await supabase
          .from('students')
          .update(studentData)
          .eq('id', editing.id).select();
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('students')
          .insert(studentData).select();
        if (error) throw error;
      }

      event.currentTarget.reset();
      setEditing(null);
      loadStudents();
      showToast({ title: editing ? 'ছাত্র আপডেট হয়েছে' : 'ছাত্র যোগ হয়েছে', variant: 'success' });
    } catch (err) {
      showToast({ title: 'সমস্যা হয়েছে', variant: 'destructive' });
    }
  };

  const deleteStudent = async (id: string) => {
    if (!confirm('এই ছাত্রকে মুছতে চান?')) return;
    const { error } = await supabase.from('students').delete().eq('id', id);
    if (error) { console.error(error); alert(error.message); return; }
    loadStudents();
  };

  const toggleMonth = async (student: StudentDetail, month: string) => {
    const newMonths = student.paid_months.includes(month)
      ? student.paid_months.filter(m => m !== month)
      : [...student.paid_months, month];

    const { error } = await supabase
      .from('students')
      .update({ paid_months: newMonths })
      .eq('id', student.id).select();
    if (error) { console.error(error); alert(error.message); return; }

    loadStudents();
  };

  const showToast = ({ title, variant }: { title: string; variant: string }) => {
    // Simple toast notification
    alert(title);
  };

  return (
    <Panel title="ছাত্র তথ্য (ডেটাবেস)">
      <div className="mt-5 rounded-2xl bg-gradient-to-r from-purple-50 to-pink-50 p-4">
        <p className="text-sm text-purple-700">এই তথ্য ডেটাবেসে সংরক্ষিত হবে এবং রিয়েল-টাইম আপডেট হবে।</p>
      </div>

      <form onSubmit={saveStudent} className="mt-5 grid gap-3 md:grid-cols-3">
        <Input name="name" defaultValue={editing?.name} placeholder="ছাত্রের নাম" required />
        <Input name="email" type="email" defaultValue={editing?.email} placeholder="ইমেল" />
        <Input name="phone" defaultValue={editing?.phone} placeholder="ফোন নম্বর" required />
        <Input name="village" defaultValue={editing?.village} placeholder="গ্রাম" />
        <Input name="course" defaultValue={editing?.course} placeholder="কোর্স" required />
        <Input name="monthly_fee" type="number" defaultValue={editing?.monthly_fee} placeholder="মাসিক ফি" required />
        <Input name="admission_date" type="date" defaultValue={editing?.admission_date} />
        <select name="status" defaultValue={editing?.status || 'Active'} className="h-11 rounded-xl border border-ink-200 bg-white px-3 text-sm text-ink-500">
          <option value="Active">সক্রিয়</option>
          <option value="Inactive">নিষ্ক্রিয়</option>
          <option value="Completed">সম্পন্ন</option>
        </select>
        <Textarea name="notes" defaultValue={editing?.notes} placeholder="নোট" className="md:col-span-3" />
        <div className="md:col-span-3 flex gap-2">
          <Button type="submit">{editing ? 'আপডেট করুন' : 'যোগ করুন'}</Button>
          {editing && <Button type="button" variant="outline" onClick={() => setEditing(null)}>বাতিল</Button>}
        </div>
      </form>

      <div className="mt-5 flex gap-2">
        {(['All', 'Active', 'Inactive'] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-full px-4 py-2 text-sm font-semibold ${filter === f ? 'bg-palette-purple text-white' : 'bg-ink-100 text-ink-500'}`}
          >
            {f === 'All' ? 'সব' : f === 'Active' ? 'সক্রিয়' : 'নিষ্ক্রিয়'}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center p-8"><div className="h-8 w-8 animate-spin rounded-full border-4 border-palette-purple border-t-transparent" /></div>
      ) : filteredStudents.length === 0 ? (
        <p className="mt-4 rounded-2xl bg-ink-50 p-4 text-ink-400">কোনো ছাত্র নেই।</p>
      ) : (
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="bg-ink-50 text-ink-400">
              <tr>
                <th className="p-3">নাম</th>
                <th className="p-3">ফোন</th>
                <th className="p-3">গ্রাম</th>
                <th className="p-3">কোর্স</th>
                <th className="p-3">ফি</th>
                <th className="p-3">মাস</th>
                <th className="p-3">স্ট্যাটাস</th>
                <th className="p-3"></th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map(student => (
                <tr key={student.id} className="border-t border-ink-100">
                  <td className="p-3 font-semibold">{student.name}<span className="block text-xs text-ink-400">{student.email}</span></td>
                  <td className="p-3">{student.phone}</td>
                  <td className="p-3">{student.village}</td>
                  <td className="p-3">{student.course}</td>
                  <td className="p-3 font-bold text-palette-orange">{money(student.monthly_fee)}</td>
                  <td className="p-3">
                    <div className="flex flex-wrap gap-1">
                      {months.map(m => (
                        <button
                          key={m}
                          onClick={() => toggleMonth(student, m)}
                          className={`rounded px-2 py-1 text-xs ${student.paid_months?.includes(m) ? 'bg-emerald-100 text-emerald-700' : 'bg-ink-100 text-ink-400'}`}
                        >
                          {m}
                        </button>
                      ))}
                    </div>
                  </td>
                  <td className="p-3">
                    <span className={`rounded-full px-2 py-1 text-xs font-semibold ${student.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-ink-100 text-ink-400'}`}>
                      {student.status === 'Active' ? 'সক্রিয়' : student.status === 'Inactive' ? 'নিষ্ক্রিয়' : 'সম্পন্ন'}
                    </span>
                  </td>
                  <td className="p-3">
                    <div className="flex gap-2">
                      <button onClick={() => setEditing(student)}><Pencil className="h-4 w-4 text-palette-purple" /></button>
                      <button onClick={() => deleteStudent(student.id)}><X className="h-4 w-4 text-red-500" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Panel>
  );
}

type IncomeRecord = {
  id: string;
  income_type: string;
  amount: number;
  description: string;
  reference_id: string;
  payment_method: string;
  payment_status: string;
  income_date: string;
};

function IncomeReportPanel() {
  const [incomes, setIncomes] = useState<IncomeRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<IncomeRecord | null>(null);
  const [dateFilter, setDateFilter] = useState<'All' | 'Today' | 'ThisMonth'>('All');

  useEffect(() => {
    loadIncomes();
  }, []);

  async function loadIncomes() {
    setLoading(true);
    const { data } = await supabase
      .from('income_report')
      .select('*')
      .order('income_date', { ascending: false });

    if (data) {
      setIncomes(data);
    }
    setLoading(false);
  }

  const filteredIncomes = incomes.filter(income => {
    if (dateFilter === 'All') return true;
    const today = new Date().toISOString().split('T')[0];
    const thisMonth = today.substring(0, 7);

    if (dateFilter === 'Today') return income.income_date === today;
    if (dateFilter === 'ThisMonth') return income.income_date.startsWith(thisMonth);
    return true;
  });

  const totalIncome = filteredIncomes.reduce((sum, i) => sum + (i.payment_status === 'Completed' ? i.amount : 0), 0);

  const saveIncome = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));

    const incomeData = {
      income_type: String(data.income_type),
      amount: Number(data.amount),
      description: String(data.description) || null,
      reference_id: String(data.reference_id) || null,
      payment_method: String(data.payment_method) || null,
      payment_status: String(data.payment_status) || 'Completed',
      income_date: String(data.income_date) || new Date().toISOString().split('T')[0],
    };

    try {
      if (editing) {
        const { error } = await supabase
          .from('income_report')
          .update(incomeData)
          .eq('id', editing.id).select();
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('income_report')
          .insert(incomeData).select();
        if (error) throw error;
      }

      event.currentTarget.reset();
      setEditing(null);
      loadIncomes();
      showToast({ title: editing ? 'আপডেট হয়েছে' : 'যোগ হয়েছে', variant: 'success' });
    } catch (err) {
      showToast({ title: 'সমস্যা হয়েছে', variant: 'destructive' });
    }
  };

  const deleteIncome = async (id: string) => {
    if (!confirm('মুছতে চান?')) return;
    const { error } = await supabase.from('income_report').delete().eq('id', id);
    if (error) { console.error(error); alert(error.message); return; }
    loadIncomes();
  };

  const showToast = ({ title, variant }: { title: string; variant: string }) => {
    alert(title);
  };

  return (
    <Panel title="আয় রিপোর্ট (ডেটাবেস)">
      <div className="mt-5 rounded-2xl bg-gradient-to-r from-green-50 to-emerald-50 p-4">
        <p className="text-sm text-green-700">এই তথ্য ডেটাবেসে সংরক্ষিত হবে এবং রিয়েল-টাইম আপডেট হবে।</p>
      </div>

      <form onSubmit={saveIncome} className="mt-5 grid gap-3 md:grid-cols-3">
        <select name="income_type" defaultValue={editing?.income_type || 'Student Fee'} required className="h-11 rounded-xl border border-ink-200 bg-white px-3 text-sm text-ink-500">
          <option value="Student Fee">ছাত্র ফি</option>
          <option value="Product Sale">পণ্য বিক্রি</option>
          <option value="Course Fee">কোর্স ফি</option>
          <option value="Other">অন্যান্য</option>
        </select>
        <Input name="amount" type="number" defaultValue={editing?.amount} placeholder="টাকার পরিমাণ" required />
        <Input name="income_date" type="date" defaultValue={editing?.income_date} required />
        <Input name="payment_method" defaultValue={editing?.payment_method} placeholder="পেমেন্ট মাধ্যম (UPI/Cash)" className="md:col-span-2" />
        <Input name="description" defaultValue={editing?.description} placeholder="বিবরণ" />
        <Input name="reference_id" defaultValue={editing?.reference_id} placeholder="রেফারেন্স ID (অর্ডার ID)" />
        <select name="payment_status" defaultValue={editing?.payment_status || 'Completed'} className="h-11 rounded-xl border border-ink-200 bg-white px-3 text-sm text-ink-500">
          <option value="Completed">সম্পন্ন</option>
          <option value="Pending">বাকি</option>
          <option value="Failed">ব্যর্থ</option>
        </select>
        <div className="md:col-span-3 flex gap-2">
          <Button type="submit">{editing ? 'আপডেট করুন' : 'যোগ করুন'}</Button>
          {editing && <Button type="button" variant="outline" onClick={() => setEditing(null)}>বাতিল</Button>}
        </div>
      </form>

      <div className="mt-6 rounded-2xl bg-emerald-50 p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-emerald-600">মোট আয়</p>
            <p className="font-display text-3xl font-bold text-emerald-700">{money(totalIncome)}</p>
          </div>
          <div className="flex gap-2">
            {(['All', 'Today', 'ThisMonth'] as const).map(f => (
              <button
                key={f}
                onClick={() => setDateFilter(f)}
                className={`rounded-full px-3 py-1 text-xs font-semibold ${dateFilter === f ? 'bg-emerald-600 text-white' : 'bg-white text-emerald-600'}`}
              >
                {f === 'All' ? 'সব' : f === 'Today' ? 'আজ' : 'এই মাস'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center p-8"><div className="h-8 w-8 animate-spin rounded-full border-4 border-palette-purple border-t-transparent" /></div>
      ) : filteredIncomes.length === 0 ? (
        <p className="mt-4 rounded-2xl bg-ink-50 p-4 text-ink-400">কোনো আয় নেই।</p>
      ) : (
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[800px] text-left text-sm">
            <thead className="bg-ink-50 text-ink-400">
              <tr>
                <th className="p-3">তারিখ</th>
                <th className="p-3">ধরন</th>
                <th className="p-3">বিবরণ</th>
                <th className="p-3">রেফারেন্স</th>
                <th className="p-3">পেমেন্ট</th>
                <th className="p-3">টাকা</th>
                <th className="p-3"></th>
              </tr>
            </thead>
            <tbody>
              {filteredIncomes.map(income => (
                <tr key={income.id} className="border-t border-ink-100">
                  <td className="p-3">{new Date(income.income_date).toLocaleDateString('en-IN')}</td>
                  <td className="p-3">
                    <span className={`rounded-full px-2 py-1 text-xs font-semibold ${
                      income.income_type === 'Student Fee' ? 'bg-purple-100 text-purple-700' :
                      income.income_type === 'Product Sale' ? 'bg-orange-100 text-orange-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {income.income_type === 'Student Fee' ? 'ছাত্র ফি' : income.income_type === 'Product Sale' ? 'পণ্য বিক্রি' : income.income_type === 'Course Fee' ? 'কোর্স ফি' : 'অন্যান্য'}
                    </span>
                  </td>
                  <td className="p-3">{income.description || '—'}</td>
                  <td className="p-3 text-xs">{income.reference_id || '—'}</td>
                  <td className="p-3">
                    <span className={`rounded-full px-2 py-1 text-xs font-semibold ${income.payment_status === 'Completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                      {income.payment_status === 'Completed' ? 'সম্পন্ন' : income.payment_status === 'Pending' ? 'বাকি' : 'ব্যর্থ'}
                    </span>
                  </td>
                  <td className="p-3 font-bold text-palette-orange">{money(income.amount)}</td>
                  <td className="p-3">
                    <div className="flex gap-2">
                      <button onClick={() => setEditing(income)}><Pencil className="h-4 w-4 text-palette-purple" /></button>
                      <button onClick={() => deleteIncome(income.id)}><X className="h-4 w-4 text-red-500" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Panel>
  );
}
