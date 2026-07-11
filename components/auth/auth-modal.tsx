'use client';

import { supabase } from "@/lib/supabase/client";
import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Lock, Mail, Phone, Eye, EyeOff, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';
import { useAuth } from './auth-context';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function AuthModal() {
  const { loginModal, closeLogin, login, register } = useAuth();
  const [showPassword, setShowPassword] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [mode, setMode] = React.useState<'login' | 'register'>(loginModal.mode);
  const [role, setRole] = React.useState<'admin' | 'customer'>(loginModal.role);
  const [passwordValue, setPasswordValue] = React.useState('');

  const loginWithGoogle = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  });

  if (error) {
    console.error(error);
  }
};

  React.useEffect(() => {
    setMode(loginModal.mode);
    setRole(loginModal.role);
    setPasswordValue('');
    setShowPassword(false);
    setError(null);
  }, [loginModal]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const data = new FormData(e.currentTarget);
    const email = data.get('email') as string;
    const password = data.get('password') as string;
    try {
      if (mode === 'login') {
        const res = await login(email, password, role);
        if (!res.ok) {
          setError(res.error ?? 'Login Failed');
          return;
        }
        closeLogin();
      } else {
        const name = data.get('name') as string;
        const phone = data.get('phone') as string;
        if (!name || !email || !password) {
          setError('Fill all required fields');
          return;
        }
        const res = await register({ name, email, phone, password });
        if (!res.ok) {
          setError(res.error ?? 'Registration Failed');
          return;
        }
        closeLogin();
      }
    } finally {
      setLoading(false);
    }
  };

  const fillDemo = (kind: 'admin' | 'customer') => {
    const form = document.getElementById('auth-form') as HTMLFormElement | null;
    if (!form) return;
    (form.elements.namedItem('email') as HTMLInputElement).value =
      kind === 'admin' ? 'admin@loknath.in' : 'demo@loknath.in';
    (form.elements.namedItem('password') as HTMLInputElement).value =
      kind === 'admin' ? 'admin123' : 'demo123';
    setPasswordValue(kind === 'admin' ? 'admin123' : 'demo123');
  };

  return (
    <AnimatePresence>
      {loginModal.open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] grid place-items-center bg-ink-700/70 backdrop-blur-sm p-4"
          onClick={closeLogin}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl"
          >
            {/* Decorative header */}
            <div
              className="relative h-32 overflow-hidden"
              style={{
                background:
                  role === 'admin'
                    ? 'linear-gradient(135deg, #8B5CF6 0%, #FF5C8A 100%)'
                    : 'linear-gradient(135deg, #FF6B35 0%, #FF5C8A 100%)',
              }}
            >
              <svg className="absolute -top-6 -left-6 h-32 w-32 text-white/15" viewBox="0 0 200 200">
                <circle cx="100" cy="100" r="50" fill="currentColor" />
                <circle cx="50" cy="60" r="20" fill="currentColor" />
                <circle cx="160" cy="140" r="22" fill="currentColor" />
              </svg>
              <svg className="absolute -bottom-6 -right-6 h-32 w-32 text-white/10" viewBox="0 0 200 200">
                <circle cx="100" cy="100" r="60" fill="currentColor" />
              </svg>
              <button
                aria-label="Close"
                onClick={closeLogin}
                className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-white/20 text-white backdrop-blur transition hover:bg-white/30"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="absolute bottom-4 left-6 text-white">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest backdrop-blur">
                  {role === 'admin' ? (
                    <>
                      <ShieldCheck className="h-3 w-3" /> Admin Portal
                    </>
                  ) : (
                    <>
                      <User className="h-3 w-3" /> Customer Portal
                    </>
                  )}
                </div>
                <h3 className="mt-2 font-display text-2xl font-bold">
                  {mode === 'login'
                    ? role === 'admin'
                      ? 'Admin Login'
                      : 'Welcome'
                    : 'Create Account'}
                </h3>
              </div>
            </div>

            {/* Body */}
            <div className="p-6">
              {/* Role switcher (only when in login mode) */}
              {mode === 'login' && (
                <div className="mb-4 inline-flex rounded-full bg-ink-50 p-1 text-xs">
                  <button
                    type="button"
                    onClick={() => setRole('customer')}
                    className={cn(
                      'rounded-full px-4 py-1.5 font-semibold transition',
                      role === 'customer' ? 'bg-white text-ink-500 shadow' : 'text-ink-400'
                    )}
                  >
                    Customer
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole('admin')}
                    className={cn(
                      'rounded-full px-4 py-1.5 font-semibold transition',
                      role === 'admin' ? 'bg-white text-ink-500 shadow' : 'text-ink-400'
                    )}
                  >
                    Admin
                  </button>
                </div>
              )}

              <form id="auth-form" onSubmit={onSubmit} className="space-y-3">
                {mode === 'register' && (
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-300" />
                    <Input
                      name="name"
                      required
                      placeholder="Full Name"
                      className="pl-10"
                    />
                  </div>
                )}
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-300" />
                  <Input
                    type="email"
                    name="email"
                    required
                    placeholder="Email Address"
                    className="pl-10"
                  />
                </div>
                {mode === 'register' && (
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-300" />
                    <Input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number"
                      className="pl-10"
                    />
                  </div>
                )}
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-300" />
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={passwordValue}
                    onChange={(e) => setPasswordValue(e.target.value)}
                    required
                    placeholder="Password"
                    className="pl-10 pr-10"
                    minLength={4}
                  />
                  <button
                    type="button"
                    aria-label="Toggle password"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => setShowPassword((visible) => !visible)}
                    className="absolute right-3 top-1/2 z-10 -translate-y-1/2 text-ink-300 hover:text-ink-500"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>

                {error && (
                  <div className="rounded-2xl bg-red-50 px-4 py-2.5 text-sm text-red-600">
                    {error}
                  </div>
                )}

                <div className="space-y-3">
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full"
                    size="lg"
                  >
                    {loading
                      ? "Please wait..."
                      : mode === "login"
                      ? "Login"
                      : "Create Account"}

                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={loginWithGoogle}
                  >
                    <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.84z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06L5.84 9.9C6.71 7.31 9.14 5.38 12 5.38z"
                      />
                    </svg>
                    Continue with Google
                  </Button>
                </div>  
              </form>

              {/* Demo fill helpers */}
              {mode === 'login' && (
                <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
                  <span className="text-ink-400">দ্রুত ডেমো:</span>
                  <button
                    type="button"
                    onClick={() => fillDemo('admin')}
                    className="rounded-full bg-palette-purple/10 px-3 py-1 font-semibold text-palette-purple hover:bg-palette-purple/20"
                  >
                    <ShieldCheck className="mr-1 inline h-3 w-3" />
                    Admin demo
                  </button>
                  <button
                    type="button"
                    onClick={() => fillDemo('customer')}
                    className="rounded-full bg-palette-orange/10 px-3 py-1 font-semibold text-palette-orange hover:bg-palette-orange/20"
                  >
                    <Sparkles className="mr-1 inline h-3 w-3" />
                    Customer demo
                  </button>
                </div>
              )}

              <div className="mt-5 text-center text-sm text-ink-400">
                {mode === 'login' ? (
                  <>
                    Don't have an account?{' '}
                    <button
                      type="button"
                      onClick={() => {
                        setMode('register');
                        setError(null);
                      }}
                      className="font-semibold text-palette-orange hover:underline"
                    >
                      Create Account
                    </button>
                  </>
                ) : (
                  <>
                    Already have an account?{' '}
                    <button
                      type="button"
                      onClick={() => {
                        setMode('login');
                        setError(null);
                      }}
                      className="font-semibold text-palette-orange hover:underline"
                    >
                      Login
                    </button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
