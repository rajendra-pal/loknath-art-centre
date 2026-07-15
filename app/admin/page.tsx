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

type Order = { id: string; total: number; createdAt: string; status: string; deliveryDate?: string; adminMessage?: string; items: Array<{ id: string; name: string; price: number; image: string; quantity: number }>; customer: { name: string; email: string; phone: string; address: string; city: string; pincode: string; notes?: string }; paymentMethod: string; paymentStatus: string; paymentReference?: string };
type Course = { id: string; title: string; duration: string; fee: number; description: string; image: string };
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
  const router = useRouter();
  useEffect(() => { if (!loading && user && user.role !== 'admin') router.push('/'); }, [loading, router, user]);
  if (loading) return <div className="grid min-h-[60vh] place-items-center"><div className="h-12 w-12 animate-spin rounded-full border-4 border-palette-orange border-t-transparent" /></div>;
  if (!user || user.role !== 'admin') return <div className="grid min-h-[60vh] place-items-center px-4"><div className="max-w-md text-center"><LogIn className="mx-auto h-10 w-10 text-palette-purple" /><h1 className="mt-5 font-display text-3xl font-bold text-ink-500">অ্যাডমিন অ্যাকাউন্ট প্রয়োজন</h1><Button onClick={() => openLogin('login', 'admin')} className="mt-6">অ্যাডমিন লগইন</Button></div></div>;
  return <AdminDashboard user={user as { id: string; name: string; email: string }} />;
}

function AdminDashboard({ user }: { user: { id: string; name: string; email: string } }) {
  const [active, setActive] = useState<Section | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showOrdersPanel, setShowOrdersPanel] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);
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
    { key: 'course', label: 'নতুন কোর্স যোগ করুন', icon: Plus }, { key: 'event', label: 'ইভেন্ট পরিচালনা', icon: CalendarDays }, { key: 'student', label: 'ছাত্র তালিকা', icon: Users }, { key: 'blog', label: 'ব্লগ পোস্ট', icon: BookOpen }, { key: 'product', label: 'পণ্য ম্যানেজমেন্ট', icon: Package }, { key: 'report', label: 'রিপোর্ট', icon: BarChart3 }, { key: 'student_details', label: 'ছাত্র তথ্য', icon: Users }, { key: 'income_report', label: 'আয় রিপোর্ট', icon: DollarSign }, { key: 'settings', label: 'UPI সেটিংস', icon: Settings },
  ];
  return <div className="container pt-28 pb-12">
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="overflow-hidden rounded-3xl bg-gradient-to-br from-palette-purple via-palette-rose to-palette-orange p-8 text-white shadow-2xl md:p-12">
      <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-widest"><Sparkles className="h-3 w-3" />Admin Dashboard</div>
      <h1 className="mt-4 font-display text-4xl font-bold md:text-5xl">স্বাগতম, {user.name}!</h1><p className="mt-2 text-white/85">{user.email}</p>
    </motion.div>
    <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{[['মোট ছাত্র-ছাত্রী', students.length, '#FF6B35'], ['সক্রিয় কোর্স', courses.length, '#8B5CF6'], ['মোট অর্ডার', orders.length, '#FF5C8A'], ['মোট আয়', money(income), '#10B981']].map(([label, value, color]) => <div key={String(label)} className="rounded-3xl border border-white/60 bg-white/90 p-6 shadow-lg"><div className="text-sm text-ink-400">{label}</div><div className="mt-2 font-display text-3xl font-bold" style={{ color: String(color) }}>{value}</div></div>)}</div>
    <button onClick={() => setShowOrdersPanel(true)} className="mt-8 inline-flex items-center rounded-full bg-slate-900 px-5 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-palette-purple">সাম্প্রতিক অর্ডার দেখুন</button>
    <div className="mt-5 grid gap-6 lg:grid-cols-[1fr_1.4fr]">
      <div className="rounded-3xl border border-white/60 bg-white/90 p-6 shadow-lg"><h2 className="font-display text-2xl font-bold text-ink-500">দ্রুত অ্যাকশন</h2><div className="mt-4 grid grid-cols-2 gap-3">{actions.map(({ key, label, icon: Icon }) => <button key={key} onClick={() => setActive(key)} className="rounded-2xl bg-gradient-to-br from-cream-200 to-white p-4 text-left text-sm font-bold text-ink-500 transition hover:-translate-y-0.5 hover:shadow-md"><Icon className="mb-2 h-5 w-5 text-palette-purple" />{label}</button>)}</div><Link href="/" className="mt-6 inline-flex text-sm font-semibold text-palette-purple hover:underline">← হোমে ফিরে যান</Link></div>
      <div className="rounded-3xl border border-white/60 bg-white/90 p-6 shadow-lg"><h2 className="font-display text-2xl font-bold text-ink-500">সাম্প্রতিক অর্ডার</h2>{orders.length ? <div className="mt-4 space-y-3">{orders.slice(0, 4).map(order => <div className="flex justify-between rounded-2xl bg-ink-50 p-4" key={order.id}><div><b>{order.customer?.name || 'Customer'}</b><p className="text-xs text-ink-400">{order.status}</p></div><b className="text-palette-orange">{money(order.total)}</b></div>)}</div> : <p className="mt-4 rounded-2xl bg-ink-50 p-4 text-ink-400">এখনও কোনো নতুন অর্ডার নেই।</p>}</div>
    </div>
    <section className="hidden mt-8 rounded-3xl border border-white/60 bg-white/90 p-6 shadow-lg">
      <h2 className="font-display text-2xl font-bold text-ink-500">অর্ডার পরিচালনা</h2>
      <p className="mt-1 text-sm text-ink-400">অর্ডারে ক্লিক করে পণ্য ও গ্রাহকের সম্পূর্ণ তথ্য দেখুন।</p>
      <div className="mt-4 space-y-3">
        {orders.map((order) => <button key={order.id} onClick={() => setSelectedOrder(order)} className="flex w-full items-center justify-between rounded-2xl bg-ink-50 p-4 text-left transition hover:bg-cream-200"><span><b className="block text-ink-500">{order.id}</b><span className="text-sm text-ink-400">{order.customer.name} · {order.status}</span></span><b className="text-palette-orange">{money(order.total)}</b></button>)}
        {!orders.length && <p className="rounded-2xl bg-ink-50 p-4 text-ink-400">কোনো অর্ডার নেই।</p>}
      </div>
    </section>
    <div className="mt-6 grid gap-5 sm:grid-cols-2"><div className="rounded-3xl border border-emerald-100 bg-emerald-50 p-6 shadow-lg"><p className="text-sm font-semibold text-emerald-700">Total Income</p><p className="mt-2 font-display text-3xl font-bold text-emerald-800">{money(income)}</p><p className="mt-1 text-xs text-emerald-700">Student fees, confirmed online payments, and delivered COD.</p></div><div className="rounded-3xl border border-amber-100 bg-amber-50 p-6 shadow-lg"><p className="text-sm font-semibold text-amber-700">Pending Income</p><p className="mt-2 font-display text-3xl font-bold text-amber-800">{money(pendingIncome)}</p><p className="mt-1 text-xs text-amber-700">Cash on Delivery orders not yet delivered.</p></div></div>
    {showOrdersPanel && <AdminOrdersPanel orders={orders} selectedOrder={selectedOrder} onSelect={setSelectedOrder} onUpdate={(next) => { setOrders((current) => current.map((order) => order.id === next.id ? next : order)); setSelectedOrder(next); }} onClose={() => { setShowOrdersPanel(false); setSelectedOrder(null); }} />}
    {active === 'course' && <CoursePanel courses={courses} setCourses={setCourses} />}
    {active === 'event' && <EventPanel events={events} setEvents={setEvents} />}
    {active === 'student' && <StudentPanel students={students} setStudents={setStudents} />}
    {active === 'blog' && <BlogPanel blogs={blogs} setBlogs={setBlogs} />}
    {active === 'product' && <ProductPanel />}
    {active === 'report' && <AdminReports />}
    {active === 'settings' && <SettingsPanel userId={user.id} />}
    {active === 'student_details' && <StudentDetailsPanel />}
    {active === 'income_report' && <IncomeReportPanel />}
    {active && <button onClick={() => setActive(null)} className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-ink-400"><X className="h-4 w-4" /> প্যানেল বন্ধ করুন</button>}
    {false && <OrderDialog order={selectedOrder} onOpenChange={(open) => !open && setSelectedOrder(null)} onUpdate={(next) => { setOrders((current) => current.map((order) => order.id === next.id ? next : order)); setSelectedOrder(next); }} />}
  </div>;
}

function OrdersManagement({ orders, onSelect }: { orders: Order[]; onSelect: (order: Order) => void }) {
  return <section className="mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/40"><div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 bg-gradient-to-r from-slate-900 to-slate-700 px-6 py-5 text-white"><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-white/60">Store operations</p><h2 className="mt-1 text-2xl font-bold">Orders</h2></div><div className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold">{orders.length} total orders</div></div>{orders.length === 0 ? <div className="p-12 text-center text-slate-500">No customer orders have been placed yet.</div> : <div className="overflow-x-auto"><table className="min-w-[1240px] w-full text-left text-sm"><thead className="bg-slate-50 text-xs font-bold uppercase tracking-wide text-slate-500"><tr><th className="px-5 py-4">Order</th><th className="px-5 py-4">Customer</th><th className="px-5 py-4">Contact & address</th><th className="px-5 py-4">Products</th><th className="px-5 py-4">Payment</th><th className="px-5 py-4">Total</th><th className="px-5 py-4">Status</th><th className="px-5 py-4">Delivery & message</th><th className="px-5 py-4" /></tr></thead><tbody className="divide-y divide-slate-100">{orders.map((order) => <tr key={order.id} className="align-top transition hover:bg-orange-50/50"><td className="px-5 py-5"><b className="block text-slate-900">{order.id}</b><span className="mt-1 block text-xs text-slate-500">{new Date(order.createdAt).toLocaleString('en-IN')}</span></td><td className="px-5 py-5"><b className="text-slate-800">{order.customer.name}</b><span className="mt-1 block text-xs text-slate-500">{order.customer.email}</span></td><td className="max-w-[220px] px-5 py-5 text-slate-600"><b className="block">{order.customer.phone}</b><span className="mt-1 block leading-relaxed">{order.customer.address}, {order.customer.city} – {order.customer.pincode}</span></td><td className="max-w-[230px] px-5 py-5">{order.items.map((item) => <div key={item.id} className="mb-2 flex items-center gap-2 last:mb-0"><img src={item.image} alt="" className="h-8 w-8 rounded-md object-cover" /><span className="text-slate-700">{item.name} <b className="text-slate-900">× {item.quantity}</b></span></div>)}</td><td className="px-5 py-5 text-slate-600"><b className="block text-slate-800">{order.paymentMethod}</b><span className="mt-1 block text-xs">{order.paymentStatus}</span>{order.paymentReference && <span className="mt-1 block text-xs text-slate-400">Ref: {order.paymentReference}</span>}</td><td className="px-5 py-5 font-bold text-slate-900">{money(order.total)}</td><td className="px-5 py-5"><StatusPill status={order.status} /></td><td className="max-w-[220px] px-5 py-5 text-slate-600">{order.deliveryDate && <b className="block text-slate-800">{new Date(`${order.deliveryDate}T00:00:00`).toLocaleDateString('en-IN')}</b>}{order.adminMessage && <span className="mt-1 block text-xs leading-relaxed text-slate-500">{order.adminMessage}</span>}{!order.deliveryDate && !order.adminMessage && <span className="text-slate-400">—</span>}</td><td className="px-5 py-5"><button onClick={() => onSelect(order)} className="rounded-lg bg-slate-900 px-3 py-2 text-xs font-bold text-white transition hover:bg-palette-purple">Manage</button></td></tr>)}</tbody></table></div>}</section>;
}

function StatusPill({ status }: { status: string }) { const styles: Record<string, string> = { 'New Order': 'bg-amber-100 text-amber-800', Confirmed: 'bg-blue-100 text-blue-800', Cancelled: 'bg-rose-100 text-rose-800', Delivered: 'bg-emerald-100 text-emerald-800' }; return <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${styles[status] || 'bg-slate-100 text-slate-700'}`}>{status}</span>; }

function OrderDialog({ order, onOpenChange, onUpdate }: { order: Order | null; onOpenChange: (open: boolean) => void; onUpdate: (order: Order) => void }) {
  const [deliveryDate, setDeliveryDate] = useState('');
  useEffect(() => setDeliveryDate(order?.deliveryDate || ''), [order]);
  if (!order) return null;
  const productNames = order.items.map((item) => item.name).join(', ');
  const saveOrderUpdate = async (nextOrder: Order) => {
    await supabase.from('store_orders').update({ order_data: nextOrder }).eq('id', nextOrder.id);
    onUpdate(nextOrder);
  };
  const confirm = () => { if (!deliveryDate) return; void saveOrderUpdate({ ...order, status: 'Confirmed', deliveryDate, adminMessage: `${productNames} is coming on ${new Date(deliveryDate).toLocaleDateString('en-IN')}.` }); };
  const cancel = () => void saveOrderUpdate({ ...order, status: 'Cancelled', adminMessage: 'This order was cancelled by the admin.' });
  return <Dialog open={Boolean(order)} onOpenChange={onOpenChange}><DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto"><DialogTitle>অর্ডার বিস্তারিত · {order.id}</DialogTitle><div className="grid gap-6 md:grid-cols-2"><div><h3 className="font-bold text-ink-500">পণ্যের বিবরণ</h3><div className="mt-3 space-y-3">{order.items.map((item) => <div key={item.id} className="flex items-center gap-3 rounded-2xl bg-ink-50 p-3"><img src={item.image} alt={item.name} className="h-14 w-14 rounded-xl object-cover" /><div className="flex-1"><b>{item.name}</b><p className="text-sm text-ink-400">{item.quantity} × {money(item.price)}</p></div><b>{money(item.price * item.quantity)}</b></div>)}</div><p className="mt-4 font-display text-2xl font-bold text-palette-orange">মোট: {money(order.total)}</p></div><div className="rounded-2xl bg-ink-50 p-4 text-sm text-ink-500"><h3 className="font-bold">গ্রাহকের বিবরণ</h3><p className="mt-3"><b>নাম:</b> {order.customer.name}</p><p><b>ফোন:</b> {order.customer.phone}</p><p><b>ইমেল:</b> {order.customer.email}</p><p><b>ঠিকানা:</b> {order.customer.address}, {order.customer.city} - {order.customer.pincode}</p><p><b>অর্ডারের তারিখ:</b> {new Date(order.createdAt).toLocaleString('en-IN')}</p><p><b>পেমেন্ট:</b> {order.paymentMethod} · {order.paymentStatus}</p>{order.customer.notes && <p><b>নোট:</b> {order.customer.notes}</p>}</div></div><div className="rounded-2xl border border-ink-100 p-4"><label className="font-bold text-ink-500">ডেলিভারির তারিখ</label><div className="mt-2 flex flex-wrap gap-3"><Input type="date" value={deliveryDate} onChange={(event) => setDeliveryDate(event.target.value)} className="max-w-xs" /><Button onClick={confirm} disabled={order.status === 'Cancelled'}>অর্ডার নিশ্চিত করুন</Button><Button variant="outline" onClick={cancel} disabled={order.status === 'Cancelled'}>অর্ডার বাতিল করুন</Button></div><p className="mt-3 text-sm font-semibold text-ink-400">বর্তমান অবস্থা: {order.status}{order.adminMessage ? ` · ${order.adminMessage}` : ''}</p></div></DialogContent></Dialog>;
}

const Panel = ({ title, children }: { title: string; children: React.ReactNode }) => <section className="mt-8 rounded-3xl border border-white/60 bg-white/90 p-6 shadow-lg"><h2 className="font-display text-2xl font-bold text-ink-500">{title}</h2>{children}</section>;
const ImageField = ({ onChange }: { onChange: (image: string) => void }) => <input aria-label="Upload image" type="file" accept="image/*" onChange={(event: ChangeEvent<HTMLInputElement>) => { const file = event.target.files?.[0]; if (file) { const reader = new FileReader(); reader.onload = () => onChange(String(reader.result)); reader.readAsDataURL(file); } }} className="block w-full text-sm text-ink-400 file:mr-4 file:rounded-full file:border-0 file:bg-palette-purple/10 file:px-4 file:py-2 file:font-semibold file:text-palette-purple" />;

function CoursePanel({ courses, setCourses }: { courses: Course[]; setCourses: (items: Course[]) => void }) { const [editing, setEditing] = useState<Course | null>(null); const save = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); const data = Object.fromEntries(new FormData(event.currentTarget)); const course: Course = { id: editing?.id || id(), title: String(data.title), duration: String(data.duration), fee: Number(data.fee), description: String(data.description), image: editing?.image || emptyImage }; setCourses(editing ? courses.map(item => item.id === course.id ? course : item) : [...courses, course]); setEditing(null); event.currentTarget.reset(); }; return <Panel title="কোর্স পরিচালনা"><form key={editing?.id || 'new'} onSubmit={save} className="mt-5 grid gap-3 md:grid-cols-2"><Input name="title" defaultValue={editing?.title} placeholder="কোর্সের নাম" required /><Input name="duration" defaultValue={editing?.duration} placeholder="সময়কাল" required /><Input name="fee" type="number" defaultValue={editing?.fee} placeholder="মাসিক ফি" required /><ImageField onChange={image => setEditing(current => ({ ...(current || { id: '', title: '', duration: '', fee: 0, description: '' }), image }))} /><Textarea name="description" defaultValue={editing?.description} placeholder="কোর্সের বিস্তারিত" className="md:col-span-2" required /><Button type="submit">{editing ? 'কোর্স আপডেট করুন' : 'নতুন কোর্স সংরক্ষণ করুন'}</Button></form><ItemGrid items={courses} empty="কোনো কোর্স যোগ করা হয়নি।" render={course => <><img src={course.image} alt="" className="h-16 w-16 rounded-xl object-cover" /><div className="flex-1"><b>{course.title}</b><p className="text-sm text-ink-400">{course.duration} · {money(course.fee)}</p><p className="text-sm text-ink-400">{course.description}</p></div><button onClick={() => setEditing(course)}><Pencil className="h-4 w-4 text-palette-purple" /></button></>} /></Panel>; }
function EventPanel({ events, setEvents }: { events: Event[]; setEvents: (items: Event[]) => void }) { const [editing, setEditing] = useState<Event | null>(null); const save = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); const data = Object.fromEntries(new FormData(event.currentTarget)); const item = { id: editing?.id || id(), title: String(data.title), date: String(data.date), details: String(data.details) }; setEvents(editing ? events.map(value => value.id === item.id ? item : value) : [...events, item]); setEditing(null); event.currentTarget.reset(); }; return <Panel title="ইভেন্ট ও চলমান কোর্স পরিচালনা"><form onSubmit={save} className="mt-5 grid gap-3 md:grid-cols-2"><Input name="title" defaultValue={editing?.title} placeholder="ইভেন্ট / কোর্সের নাম" required /><Input name="date" type="date" defaultValue={editing?.date} required /><Textarea name="details" defaultValue={editing?.details} placeholder="সময়, স্থান এবং বিস্তারিত" className="md:col-span-2" required /><Button type="submit">{editing ? 'আপডেট করুন' : 'ইভেন্ট যোগ করুন'}</Button></form><ItemGrid items={events} empty="কোনো ইভেন্ট নেই।" render={item => <><div className="flex-1"><b>{item.title}</b><p className="text-sm text-ink-400">{item.date} · {item.details}</p></div><button onClick={() => setEditing(item)}><Pencil className="h-4 w-4 text-palette-purple" /></button></>} /></Panel>; }
function StudentPanel({ students, setStudents }: { students: Student[]; setStudents: (items: Student[]) => void }) { const [village, setVillage] = useState(''); const [editing, setEditing] = useState<Student | null>(null); const filtered = students.filter(student => !village || student.village === village); const save = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); const data = Object.fromEntries(new FormData(event.currentTarget)); const item: Student = { id: editing?.id || id(), name: String(data.name), village: String(data.village), phone: String(data.phone), course: String(data.course), monthlyFee: Number(data.monthlyFee), paidMonths: editing?.paidMonths || [] }; setStudents(editing ? students.map(value => value.id === item.id ? item : value) : [...students, item]); setEditing(null); event.currentTarget.reset(); }; const toggleFee = (student: Student, month: string) => setStudents(students.map(value => value.id === student.id ? { ...value, paidMonths: value.paidMonths.includes(month) ? value.paidMonths.filter(value => value !== month) : [...value.paidMonths, month] } : value)); return <Panel title="ছাত্র তালিকা ও মাসিক ফি"><form onSubmit={save} className="mt-5 grid gap-3 md:grid-cols-3"><Input name="name" defaultValue={editing?.name} placeholder="ছাত্রের নাম" required /><Input name="village" defaultValue={editing?.village} placeholder="গ্রাম" required /><Input name="phone" defaultValue={editing?.phone} placeholder="ফোন নম্বর" required /><Input name="course" defaultValue={editing?.course} placeholder="কোর্স" required /><Input name="monthlyFee" type="number" defaultValue={editing?.monthlyFee} placeholder="মাসিক ফি" required /><Button type="submit">{editing ? 'ছাত্র আপডেট করুন' : 'ছাত্র যোগ করুন'}</Button></form><select value={village} onChange={event => setVillage(event.target.value)} className="mt-5 h-11 rounded-xl border border-ink-200 bg-white px-3 text-sm text-ink-500"><option value="">সব গ্রাম</option>{[...new Set(students.map(student => student.village))].map(value => <option key={value}>{value}</option>)}</select><div className="mt-4 overflow-x-auto"><table className="w-full min-w-[700px] text-left text-sm"><thead className="text-ink-400"><tr><th className="p-2">নাম</th><th>গ্রাম</th><th>কোর্স</th><th>মাসিক ফি</th><th>ফি নিশ্চিত করুন</th><th /></tr></thead><tbody>{filtered.map(student => <tr key={student.id} className="border-t border-ink-100"><td className="p-2 font-semibold">{student.name}<span className="block text-xs font-normal text-ink-400">{student.phone}</span></td><td>{student.village}</td><td>{student.course}</td><td>{money(student.monthlyFee)}</td><td><div className="flex gap-1">{months.map(month => <button title={`${month} fee`} onClick={() => toggleFee(student, month)} key={month} className={`rounded px-2 py-1 text-xs ${student.paidMonths.includes(month) ? 'bg-emerald-100 text-emerald-700' : 'bg-ink-100 text-ink-400'}`}>{month}</button>)}</div></td><td><button onClick={() => setEditing(student)}><Pencil className="h-4 w-4 text-palette-purple" /></button></td></tr>)}</tbody></table></div></Panel>; }
function BlogPanel({ blogs, setBlogs }: { blogs: Blog[]; setBlogs: (items: Blog[]) => void }) { const [editing, setEditing] = useState<Blog | null>(null); const save = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); const data = Object.fromEntries(new FormData(event.currentTarget)); const item: Blog = { id: editing?.id || id(), title: String(data.title), category: String(data.category), content: String(data.content), image: editing?.image || emptyImage, date: editing?.date || new Date().toLocaleDateString('en-GB') }; setBlogs(editing ? blogs.map(value => value.id === item.id ? item : value) : [item, ...blogs]); setEditing(null); event.currentTarget.reset(); }; return <Panel title="ব্লগ পোস্ট লিখুন ও সম্পাদনা করুন"><form onSubmit={save} className="mt-5 grid gap-3 md:grid-cols-2"><Input name="title" defaultValue={editing?.title} placeholder="পোস্টের শিরোনাম" required /><Input name="category" defaultValue={editing?.category} placeholder="বিভাগ" required /><ImageField onChange={image => setEditing(current => ({ ...(current || { id: '', title: '', category: '', content: '', date: '' }), image }))} /><Textarea name="content" defaultValue={editing?.content} placeholder="ব্লগের লেখা" className="md:col-span-2" required /><Button type="submit">{editing ? 'পোস্ট আপডেট করুন' : 'পোস্ট প্রকাশ করুন'}</Button></form><ItemGrid items={blogs} empty="এখনও কোনো ব্লগ পোস্ট নেই।" render={item => <><img src={item.image} alt="" className="h-16 w-16 rounded-xl object-cover" /><div className="flex-1"><b>{item.title}</b><p className="text-sm text-ink-400">{item.category} · {item.date}</p></div><button onClick={() => setEditing(item)}><Pencil className="h-4 w-4 text-palette-purple" /></button></>} /></Panel>; }
function ProductPanel() {
  const [products, setProducts] = useState<Product[]>([]); const [editing, setEditing] = useState<Product | null>(null);
  const load = async () => { const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: false }); if (error) { console.error(error); alert(error.message); return; } setProducts((data ?? []).map((p) => ({ id: p.id, name: p.name, category: p.category, price: Number(p.price), stock: p.stock ?? 0, image: p.image || emptyImage }))); };
  useEffect(() => { void load(); }, []);
  const save = async (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); const form = Object.fromEntries(new FormData(event.currentTarget)); const item = { id: editing?.id || id(), name: String(form.name), category: String(form.category), price: Number(form.price), stock: Number(form.stock), image: editing?.image || emptyImage }; const query = editing ? supabase.from('products').update(item).eq('id', item.id).select() : supabase.from('products').insert(item).select(); const { error } = await query; if (error) { console.error(error); alert(error.message); throw error; } setEditing(null); event.currentTarget.reset(); await load(); };
  return <Panel title="পণ্য ম্যানেজমেন্ট"><form onSubmit={save} className="mt-5 grid gap-3 md:grid-cols-2"><Input name="name" defaultValue={editing?.name} placeholder="পণ্যের নাম" required /><Input name="category" defaultValue={editing?.category} placeholder="বিভাগ" required /><Input name="price" type="number" defaultValue={editing?.price} placeholder="মূল্য" required /><Input name="stock" type="number" defaultValue={editing?.stock} placeholder="স্টক" required /><ImageField onChange={image => setEditing(current => ({ ...(current || { id: '', name: '', category: '', price: 0, stock: 0 }), image }))} /><Button type="submit">{editing ? 'পণ্য আপডেট করুন' : 'পণ্য যোগ করুন'}</Button></form><ItemGrid items={products} empty="এখনও কোনো পণ্য যোগ করা হয়নি।" render={item => <><img src={item.image} alt="" className="h-16 w-16 rounded-xl object-cover" /><div className="flex-1"><b>{item.name}</b><p className="text-sm text-ink-400">{item.category} · {money(item.price)} · স্টক {item.stock}</p></div><button onClick={() => setEditing(item)}><Pencil className="h-4 w-4 text-palette-purple" /></button></>} /></Panel>;
}
function ItemGrid<T>({ items, empty, render }: { items: T[]; empty: string; render: (item: T) => React.ReactNode }) { return <div className="mt-6 space-y-3">{items.length ? items.map((item, index) => <div key={(item as { id: string }).id || index} className="flex items-center gap-3 rounded-2xl bg-ink-50 p-4">{render(item)}</div>) : <p className="rounded-2xl bg-ink-50 p-4 text-ink-400">{empty}</p>}</div>; }
function Reports({ orders, students, products }: { orders: Order[]; students: Student[]; products: Product[] }) { const feeIncome = students.reduce((sum, student) => sum + student.monthlyFee * student.paidMonths.length, 0); const productIncome = orders.reduce((sum, order) => sum + order.total, 0); const uninterrupted = students.filter(student => months.every(month => student.paidMonths.includes(month))); const topProduct = [...products].sort((a, b) => a.stock - b.stock)[0]; const max = Math.max(feeIncome, productIncome, 1); return <Panel title="রিপোর্ট"><div className="mt-5 grid gap-4 md:grid-cols-2"><ReportCard title="কাস্টমার রিপোর্ট" value={`${orders.length} অর্ডার`} note="মোট অনলাইন ক্রেতা ও অর্ডার" icon={<Users />} /><ReportCard title="পণ্য রিপোর্ট" value={topProduct?.name || 'ডেটা নেই'} note="স্টক অনুযায়ী জনপ্রিয় পণ্য" icon={<Package />} /><ReportCard title="ছাত্র রিপোর্ট" value={`${uninterrupted.length} নিয়মিত`} note="সব মাসে ফি প্রদানকারী ছাত্র" icon={<CheckCircle2 />} /><ReportCard title="আয় রিপোর্ট" value={money(feeIncome + productIncome)} note="ফি ও পণ্য বিক্রির সম্মিলিত আয়" icon={<BarChart3 />} /></div><div className="mt-6 rounded-2xl bg-ink-50 p-5"><h3 className="font-display text-xl font-bold text-ink-500">আয়ের তুলনা</h3>{[['ছাত্রদের মাসিক ফি', feeIncome, '#8B5CF6'], ['পণ্য বিক্রি', productIncome, '#FF6B35']].map(([label, value, color]) => <div key={String(label)} className="mt-4"><div className="mb-1 flex justify-between font-bold text-ink-500"><span>{label}</span><span>{money(Number(value))}</span></div><div className="h-4 overflow-hidden rounded-full bg-white"><div className="h-full rounded-full" style={{ width: `${(Number(value) / max) * 100}%`, backgroundColor: String(color) }} /></div></div>)}<p className="mt-5 font-bold text-ink-500">বেশি আয়: {feeIncome >= productIncome ? 'ছাত্রদের ফি' : 'পণ্য বিক্রি'} থেকে</p></div></Panel>; }
function ReportCard({ title, value, note, icon }: { title: string; value: string; note: string; icon: React.ReactNode }) { return <div className="rounded-2xl bg-gradient-to-br from-cream-200 to-white p-5"><div className="flex items-center gap-2 text-palette-purple">{icon}<b>{title}</b></div><div className="mt-4 font-display text-2xl font-bold text-ink-500">{value}</div><p className="mt-1 text-sm text-ink-400">{note}</p></div>; }

function SettingsPanel({ userId }: { userId: string }) {
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
        setMessage({ type: 'error', text: 'ডেটাবেস সংযোগ সমস্যা। অনুগ্রহ করে Supabase টেবিল তৈরি করুন।' });
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

      setMessage({ type: 'success', text: 'UPI সেটিংস সফলভাবে সংরক্ষিত হয়েছে!' });
    } catch (err) {
      console.error('Error saving settings:', err);
      const errorMessage = err instanceof Error ? err.message : 'সেটিংস সংরক্ষণে সমস্যা হয়েছে।';
      setMessage({ type: 'error', text: errorMessage });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <Panel title="UPI সেটিংস"><div className="flex items-center justify-center p-8"><div className="h-8 w-8 animate-spin rounded-full border-4 border-palette-purple border-t-transparent" /></div></Panel>;
  }

  return (
    <Panel title="UPI পেমেন্ট সেটিংস">
      <div className="mt-5 rounded-2xl bg-gradient-to-r from-orange-50 to-pink-50 p-4">
        <div className="flex items-start gap-3">
          <div className="rounded-full bg-orange-100 p-2">
            <CreditCard className="h-5 w-5 text-orange-600" />
          </div>
          <div>
            <h4 className="font-bold text-orange-800">UPI পেমেন্ট সেটিংস</h4>
            <p className="mt-1 text-sm text-orange-700">এখানে আপনার UPI ID সেট করুন। গ্রাহকরা এই UPI-তে পেমেন্ট করবেন এবং QR কোড স্বয়ংক্রিয়ভাবে তৈরি হবে।</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSave} className="mt-5 grid gap-4">
        <div>
          <label className="block text-sm font-bold text-ink-500 mb-2">
            <DollarSign className="inline h-4 w-4 mr-1" />
            আপনার UPI ID
          </label>
          <Input
            type="text"
            value={upiId}
            onChange={(e) => setUpiId(e.target.value)}
            placeholder="উদাহরণ: loknathartcenter@okhdfcbank"
            required
          />
          <p className="mt-1 text-xs text-ink-400">আপনার UPI অ্যাপ থেকে পাওয়া UPI ID (যেমন: name@bankname)</p>
        </div>

        <div>
          <label className="block text-sm font-bold text-ink-500 mb-2">
            ব্যবসার নাম (QR কোডে দেখাবে)
          </label>
          <Input
            type="text"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            placeholder="Lokenath Art Center"
          />
        </div>

        {upiId && (
          <div className="rounded-2xl bg-emerald-50 p-4">
            <div className="flex items-center gap-2 text-emerald-700">
              <CheckCircle2 className="h-5 w-5" />
              <span className="font-bold">পূর্বরূপ</span>
            </div>
            <p className="mt-2 text-sm text-emerald-600">
              QR কোডে দেখাবে: <strong>{upiId}</strong>
            </p>
          </div>
        )}

        {message && (
          <div className={`rounded-2xl p-4 ${message.type === 'success' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>
            {message.text}
          </div>
        )}

        <Button type="submit" disabled={saving}>
          {saving ? 'সংরক্ষণ হচ্ছে...' : 'সেটিংস সংরক্ষণ করুন'}
        </Button>
      </form>

      <div className="mt-6 rounded-2xl bg-blue-50 p-4">
        <h4 className="font-bold text-blue-700">কিভাবে কাজ করে?</h4>
        <ol className="mt-2 space-y-2 text-sm text-blue-600">
          <li>1. উপরে আপনার UPI ID দিন (যেমন: yourname@oksbi)</li>
          <li>2. সেটিংস সংরক্ষণ করুন</li>
          <li>3. গ্রাহকরা QR স্ক্যান করে পেমেন্ট করতে পারবেন</li>
          <li>4. টাকা সরাসরি আপনার ব্যাংক অ্যাকাউন্টে যাবে</li>
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
