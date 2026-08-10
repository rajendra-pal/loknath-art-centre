'use client';

import { useAuth } from '@/components/auth/auth-context';
import { LogIn, User as UserIcon, Mail, Phone, Calendar, ShieldCheck, LogOut, Edit3, Languages } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useState } from 'react';
import { Input, Textarea } from '@/components/ui/input';
import { showToast } from '@/components/ui/toaster';
import { LanguageToggle } from '@/components/language-toggle';
import { useLanguage } from '@/lib/i18n/context';
import { tr } from '@/lib/i18n/strings';

export default function AccountPage() {
  const { user, loading, openLogin, logout, updateProfile } = useAuth();
  const { language } = useLanguage();
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    if (!loading && !user) {
      // Don't redirect; show the login prompt instead
    }
  }, [user, loading, router]);

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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md text-center"
        >
          <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-palette-orange/10">
            <LogIn className="h-8 w-8 text-palette-orange" />
          </div>
          <h1 className="mt-6 font-display text-3xl font-bold text-ink-500">
            {tr('loginRequired', language)}
          </h1>
          <p className="mt-3 text-ink-400">
            {tr('loginPrompt', language)}
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <Button onClick={() => openLogin('login', 'customer')}>{tr('login', language)}</Button>
            <Button variant="outline" onClick={() => openLogin('register', 'customer')}>
              {tr('createAccount', language)}
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  const startEditing = () => { setPhone(user.phone || ''); setAddress(user.address || ''); setEditing(true); };
  const saveProfile = async () => {
    const result = await updateProfile({ phone, address });
    if (!result.ok) { showToast({ title: tr('auth.profileUpdateFailed', language), description: result.error }); return; }
    setEditing(false);
    showToast({ title: tr('auth.profileUpdated', language), variant: 'success' });
  };

  return (
    <div className="container pb-10 pt-28">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="overflow-hidden rounded-3xl bg-gradient-to-br from-palette-orange via-palette-rose to-palette-purple p-8 text-white shadow-2xl md:p-12"
      >
        <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
          <div className="grid h-20 w-20 place-items-center rounded-full bg-white/20 backdrop-blur">
            <UserIcon className="h-10 w-10" />
          </div>
          <div>
            <span
              className={`inline-flex items-center gap-1 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase backdrop-blur`}
            >
              {user.role === 'admin' ? (
                <ShieldCheck className="h-3 w-3" />
              ) : (
                <UserIcon className="h-3 w-3" />
              )}
              {user.role === 'admin' ? tr('adminBadge', language) : tr('customerBadge', language)}
            </span>
            <h1 className="mt-2 font-display text-3xl font-bold md:text-4xl">
              {user.name}
            </h1>
            <p className="text-white/80">{user.email}</p>
          </div>
        </div>
      </motion.div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="rounded-3xl border border-white/60 bg-white/90 p-6 shadow-lg backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-2xl font-bold text-ink-500">
                {tr('profileInfo', language)}
              </h2>
              {editing ? (
  <div className="flex gap-2">
    <Button size="sm" onClick={saveProfile}>
      {tr('save', language)}
    </Button>

    <Button
      size="sm"
      variant="outline"
      onClick={() => {
        setPhone(user.phone || '');
        setAddress(user.address || '');
        setEditing(false);
      }}
    >
      {tr('cancel', language)}
    </Button>
  </div>
) : (
  <button
    onClick={startEditing}
    className="inline-flex items-center gap-1.5 text-sm font-semibold text-palette-orange hover:underline"
  >
    <Edit3 className="h-4 w-4" />
    {tr('edit', language)}
  </button>
)}
            </div>
            <div className="mt-6 space-y-4">
              {[
                { icon: UserIcon, label: tr('name', language), value: user.name },
                { icon: Mail, label: tr('email', language), value: user.email },
                { icon: Phone, label: tr('phone', language), value: user.phone || tr('notAdded', language) },
                { icon: Calendar, label: tr('joinedAt', language), value: user.joinedAt },
              ].map((f) => (
                <div key={f.label} className="flex items-center gap-4 rounded-2xl bg-ink-50/50 p-4">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-palette-orange/10 text-palette-orange">
                    <f.icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs text-ink-400">{f.label}</div>
                    <div className="font-semibold text-ink-500">{editing && f.icon === Phone ? <Input value={phone} onChange={(event) => setPhone(event.target.value)} placeholder={tr('phonePlaceholder', language)} className="mt-1 h-10" /> : f.value}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-start gap-4 rounded-2xl bg-ink-50/50 p-4">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-palette-orange/10 text-palette-orange">
                <Edit3 className="h-4 w-4" />
              </div>

              <div className="flex-1">
                <div className="text-xs text-ink-400">
                  {tr('address', language)}
                </div>

                {editing ? (
                  <Textarea
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="mt-2 min-h-[110px]"
                    placeholder={tr('addressPlaceholder', language)}
                  />
                ) : (
                  <div className="font-semibold text-ink-500">
                    {user.address || tr('notAdded', language)}
                  </div>
                )}
              </div>
            </div>
            {/* {editing && <div className="mt-6 rounded-2xl border border-palette-orange/20 bg-palette-orange/5 p-5"><h3 className="font-bold text-ink-500">ফোন ও ঠিকানা সম্পাদনা করুন</h3><div className="mt-4 grid gap-3"><Input value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="Phone number" /><Textarea value={address} onChange={(event) => setAddress(event.target.value)} placeholder="Full address" className="min-h-[100px]" /><div className="flex gap-3"><Button onClick={saveProfile}>সংরক্ষণ করুন</Button><Button variant="outline" onClick={() => setEditing(false)}>বাতিল করুন</Button></div></div></div>} */}
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-3xl border border-white/60 bg-white/90 p-5 shadow-lg backdrop-blur-sm">
            <div className="flex items-center gap-2 text-sm font-semibold text-ink-500">
              <Languages className="h-4 w-4 text-palette-orange" />
              {tr('languageLabel', language)}
            </div>
            <p className="mt-1 text-xs text-ink-400">{tr('languageHint', language)}</p>
            <div className="mt-4">
              <LanguageToggle variant="segmented" className="w-full justify-between" />
            </div>
          </div>
          <Link
            href="/account/orders"
            className="block rounded-3xl border border-white/60 bg-white/90 p-5 shadow-lg backdrop-blur-sm transition hover:shadow-xl"
          >
            <div className="text-sm font-semibold text-ink-500">{tr('myOrders', language)}</div>
            <p className="mt-1 text-xs text-ink-400">{tr('ordersHint', language)}</p>
          </Link>
          <Link
            href="/account/wishlist"
            className="block rounded-3xl border border-white/60 bg-white/90 p-5 shadow-lg backdrop-blur-sm transition hover:shadow-xl"
          >
            <div className="text-sm font-semibold text-ink-500">{tr('wishlist', language)}</div>
            <p className="mt-1 text-xs text-ink-400">{tr('wishlistHint', language)}</p>
          </Link>
          {user.role === 'admin' && (
            <Link
              href="/admin"
              className="block rounded-3xl border border-palette-purple/30 bg-palette-purple/5 p-5 transition hover:bg-palette-purple/10"
            >
              <div className="flex items-center gap-2 text-sm font-semibold text-palette-purple">
                <ShieldCheck className="h-4 w-4" />
                {tr('adminDashboard', language)}
              </div>
            </Link>
          )}
          <button
            onClick={logout}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-red-50 px-5 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-100"
          >
            <LogOut className="h-4 w-4" />
            {tr('logout', language)}
          </button>
        </div>
      </div>
    </div>
  );
}
