'use client';

import { Check, X } from 'lucide-react';

export function OrderOutcomeOverlay({ outcome, onClose }: { outcome: 'placed' | 'confirmed' | 'cancelled' | null; onClose: () => void }) {
  if (!outcome) return null;
  const cancelled = outcome === 'cancelled';
  const confirmed = outcome === 'confirmed';
  const title = cancelled ? 'Order cancelled' : confirmed ? 'Order confirmed' : 'Order placed successfully';
  const message = cancelled ? 'Your order cancellation has been recorded.' : confirmed ? 'The delivery date has been saved and the customer will be notified.' : 'Thank you. Your order has been sent to Loknath Art Centre.';
  return <div className={`fixed inset-0 z-[100] grid place-items-center p-5 ${cancelled ? 'bg-rose-950/95' : 'bg-emerald-950/95'} backdrop-blur-sm`} role="dialog" aria-modal="true"><div className="w-full max-w-md rounded-[2rem] bg-white p-9 text-center shadow-2xl"><div className={`mx-auto grid h-24 w-24 place-items-center rounded-full ${cancelled ? 'bg-rose-100 text-rose-600' : 'bg-emerald-100 text-emerald-600'}`}>{cancelled ? <X className="h-14 w-14" strokeWidth={3} /> : <Check className="h-14 w-14" strokeWidth={3} />}</div><h2 className="mt-6 font-display text-3xl font-bold text-slate-900">{title}</h2><p className="mt-3 text-slate-500">{message}</p><button onClick={onClose} className={`mt-7 rounded-full px-6 py-3 text-sm font-bold text-white ${cancelled ? 'bg-rose-600 hover:bg-rose-700' : 'bg-emerald-600 hover:bg-emerald-700'}`}>Continue</button></div></div>;
}
