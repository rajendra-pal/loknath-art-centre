'use client';

import { useAuth } from './auth-context';
import { LogIn, ShieldCheck, User as UserIcon, LogOut, LayoutDashboard, ShoppingBag, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export function AuthButton() {
  const { user, openLogin, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener('mousedown', onClick);
    return () => window.removeEventListener('mousedown', onClick);
  }, []);

  if (!user) {
    return (
      <div ref={ref} className="relative">
        <button
          onClick={() => openLogin('login', 'customer')}
          className="flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-sm font-semibold text-ink-500 backdrop-blur transition hover:bg-white hover:text-palette-orange"
        >
          <LogIn className="h-4 w-4" />
          <span className="hidden sm:inline">Login</span>
        </button>
      </div>
    );
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-full bg-white/70 py-1 pl-1 pr-3 backdrop-blur transition hover:bg-white"
      >
        <span
          className={cn(
            'grid h-8 w-8 place-items-center rounded-full text-white',
            user.role === 'admin'
              ? 'bg-gradient-to-br from-palette-purple to-palette-rose'
              : 'bg-gradient-to-br from-palette-orange to-palette-rose'
          )}
        >
          {user.role === 'admin' ? <ShieldCheck className="h-4 w-4" /> : <UserIcon className="h-4 w-4" />}
        </span>
        <span className="hidden text-sm font-medium text-ink-500 sm:inline">
          {user.name.split(' ')[0]}
        </span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.96 }}
            className="absolute right-0 top-full mt-2 w-64 overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-2xl"
          >
            <div className="border-b border-ink-100 bg-ink-50/50 p-4">
              <p className="text-sm font-bold text-ink-500">{user.name}</p>
              <p className="truncate text-xs text-ink-400">{user.email}</p>
              <span
                className={cn(
                  'mt-2 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase',
                  user.role === 'admin'
                    ? 'bg-palette-purple/10 text-palette-purple'
                    : 'bg-palette-orange/10 text-palette-orange'
                )}
              >
                {user.role === 'admin' ? <ShieldCheck className="h-3 w-3" /> : <UserIcon className="h-3 w-3" />}
                {user.role === 'admin' ? 'Admin' : 'Customer'}
              </span>
            </div>
            <div className="p-1">
              {user.role === 'admin' && (
                <Link
                  href="/admin"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-ink-500 hover:bg-ink-50"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  Admin Panel
                </Link>
              )}
              <Link
                href="/account"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-ink-500 hover:bg-ink-50"
              >
                <UserIcon className="h-4 w-4" />
                
                My Account
              </Link>
              <Link
                href="/account/orders"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-ink-500 hover:bg-ink-50"
              >
                <ShoppingBag className="h-4 w-4" />
                My Orders
              </Link>
              <Link
                href="/account/wishlist"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-ink-500 hover:bg-ink-50"
              >
                <Heart className="h-4 w-4" />
                My Wishlist
              </Link>
              <button
                onClick={() => {
                  logout();
                  setOpen(false);
                }}
                className="mt-1 flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm text-red-600 hover:bg-red-50"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
