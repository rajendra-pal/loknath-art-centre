'use client';

import { useEffect, useMemo, useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import { showToast } from '@/components/ui/toaster';

type Order = { total: number; status: string; paymentMethod: string };
type Student = { monthly_fee: number; paid_months: string[] };
type Product = { name: string; stock: number };
const currency = (value: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value);

export function AdminReports() {
  const [orders, setOrders] = useState<Order[]>([]); const [students, setStudents] = useState<Student[]>([]); const [products, setProducts] = useState<Product[]>([]); const [saving, setSaving] = useState(false);
  const load = async () => {
    const [{ data: orderRows, error: ordersError }, { data: studentRows, error: studentsError }, { data: productRows, error: productsError }] = await Promise.all([
      supabase.from('store_orders').select('order_data'), supabase.from('students').select('monthly_fee, paid_months'), supabase.from('products').select('name, stock'),
    ]);
    const error = ordersError || studentsError || productsError;
    if (error) { console.error(error); showToast({ title: 'Unable to load reports', description: error.message, variant: 'destructive' }); return; }
    setOrders((orderRows ?? []).map((row) => row.order_data as Order)); setStudents(studentRows ?? []); setProducts(productRows ?? []);
  };
  useEffect(() => { void load(); }, []);
  const summary = useMemo(() => {
    const studentIncome = students.reduce((total, student) => total + Number(student.monthly_fee) * (student.paid_months?.length ?? 0), 0);
    const deliveredCod = orders.filter((order) => order.paymentMethod === 'Cash on Delivery' && order.status === 'Delivered').reduce((total, order) => total + Number(order.total), 0);
    const onlineIncome = orders.filter((order) => order.paymentMethod !== 'Cash on Delivery' && ['Confirmed', 'Delivered'].includes(order.status)).reduce((total, order) => total + Number(order.total), 0);
    return { studentIncome, deliveredCod, onlineIncome, total: studentIncome + deliveredCod + onlineIncome, orderCount: orders.length, studentCount: students.length, topProduct: [...products].sort((a, b) => a.stock - b.stock)[0]?.name ?? 'No data' };
  }, [orders, products, students]);
  const generate = async () => { setSaving(true); const { data, error } = await supabase.from('reports').insert({ report_type: 'revenue', title: `Revenue report ${new Date().toLocaleDateString('en-IN')}`, description: 'Generated from live Supabase data.', data: summary, date_from: new Date().toISOString().slice(0, 10), date_to: new Date().toISOString().slice(0, 10) }).select(); setSaving(false); if (error) { console.error(error); showToast({ title: 'Unable to generate report', description: error.message, variant: 'destructive' }); throw error; } showToast({ title: 'Report saved', description: `Report ${data?.[0]?.id ?? ''} created.`, variant: 'success' }); };
  return <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/40"><div className="flex flex-wrap items-center justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-palette-purple">Business analytics</p><h2 className="mt-1 font-display text-3xl font-bold text-slate-900">Reports overview</h2></div><button onClick={() => void generate()} disabled={saving} className="rounded-xl bg-palette-purple px-4 py-2 text-sm font-bold text-white disabled:opacity-60">{saving ? 'Generating…' : 'Generate report'}</button></div><div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"><Metric label="Total income" value={currency(summary.total)} /><Metric label="Orders" value={summary.orderCount} /><Metric label="Students" value={summary.studentCount} /><Metric label="Top product signal" value={summary.topProduct} /></div><div className="mt-6 grid gap-3 sm:grid-cols-3"><Metric label="Student fees" value={currency(summary.studentIncome)} /><Metric label="Online payments" value={currency(summary.onlineIncome)} /><Metric label="Delivered COD" value={currency(summary.deliveredCod)} /></div></section>;
}
function Metric({ label, value }: { label: string; value: string | number }) { return <div className="rounded-2xl bg-slate-50 p-4"><p className="text-xs font-bold uppercase tracking-wide text-slate-500">{label}</p><p className="mt-2 text-xl font-bold text-slate-900">{value}</p></div>; }
