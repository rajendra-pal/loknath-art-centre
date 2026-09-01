'use client';

import { supabase } from "@/lib/supabase/client";
import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Lock, Mail, Phone, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useAuth } from './auth-context';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/lib/i18n/context';
import { tr } from '@/lib/i18n/strings';
import { showToast } from '@/components/ui/toaster';

export function AuthModal() {
  const { loginModal, closeLogin, login, register, user, updateProfile, resetPassword, updatePassword } = useAuth();
  const { language } = useLanguage();
  const [showPassword, setShowPassword] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [mode, setMode] = React.useState<'login' | 'register' | 'forgot_password' | 'reset_password'>(loginModal.mode);
  const [passwordValue, setPasswordValue] = React.useState('');

  // Local state for logged-in user profile update form
  const [nameValue, setNameValue] = React.useState('');
  const [phoneValue, setPhoneValue] = React.useState('');

  const loginWithGoogle = async () => {
    const origin = typeof window !== 'undefined' && window.location.origin
      ? window.location.origin
      : (process.env.NEXT_PUBLIC_SITE_URL || '');
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${origin}/auth/callback`,
      },
    });

    if (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    setMode(loginModal.mode);
    setPasswordValue('');
    setShowPassword(false);
    setError(null);
    if (user) {
      setNameValue(user.name || '');
      setPhoneValue(user.phone || '');
    }
  }, [loginModal, user]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const data = new FormData(e.currentTarget);

    try {
      if (user) {
        // Logged-in user: update name and phone number
        const name = (data.get('name') as string) || nameValue;
        const phone = (data.get('phone') as string) || phoneValue;

        if (!name) {
          setError(tr('fillAllFields', language));
          return;
        }

        const res = await updateProfile({ name, phone });
        if (!res.ok) {
          setError(res.error ?? tr('profileUpdateFailed', language));
          return;
        }

        showToast({
          title: tr('profileUpdated', language),
          description: tr('enrollmentSuccess', language) ?? 'Profile updated & enrollment confirmed!',
          variant: 'success',
        });
        closeLogin();
        setTimeout(() => {
          document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      } else if (mode === 'login') {
        const email = data.get('email') as string;
        const password = data.get('password') as string;
        const res = await login(email, password);
        if (!res.ok) {
          setError(res.error ?? tr('loginFailed', language));
          return;
        }
        closeLogin();
      } else if (mode === 'forgot_password') {
        const email = data.get('email') as string;
        if (!email) {
          setError(tr('fillAllFields', language));
          return;
        }
        const res = await resetPassword(email);
        if (!res.ok) {
          setError(res.error ?? tr('resetLinkFailed', language));
          return;
        }
        showToast({
          title: tr('resetLinkSent', language),
          variant: 'success',
        });
        setMode('login');
      } else if (mode === 'reset_password') {
        const newPassword = data.get('newPassword') as string;
        if (!newPassword) {
          setError(tr('fillAllFields', language));
          return;
        }
        const res = await updatePassword(newPassword);
        if (!res.ok) {
          setError(res.error ?? tr('updatePasswordFailed', language));
          return;
        }
        showToast({
          title: tr('passwordUpdated', language),
          variant: 'success',
        });
        setMode('login');
      } else {
        const name = data.get('name') as string;
        const email = data.get('email') as string;
        const phone = data.get('phone') as string;
        const password = data.get('password') as string;
        if (!name || !email || !password) {
          setError(tr('fillAllFields', language));
          return;
        }
        const res = await register({ name, email, phone, password });
        if (!res.ok) {
          setError(res.error ?? tr('registrationFailed', language));
          return;
        }
        closeLogin();
      }
    } finally {
      setLoading(false);
    }
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
            className="relative w-full max-w-[420px] overflow-hidden rounded-2xl bg-white shadow-2xl"
          >
            {/* Decorative header */}
            <div
              className="relative h-26 overflow-hidden p-4 pt-5"
              style={{
                background: 'linear-gradient(135deg, #FF6B35 0%, #FF5C8A 100%)',
              }}
            >
              <svg className="absolute -top-6 -left-6 h-28 w-28 text-white/15" viewBox="0 0 200 200">
                <circle cx="100" cy="100" r="50" fill="currentColor" />
                <circle cx="50" cy="60" r="20" fill="currentColor" />
                <circle cx="160" cy="140" r="22" fill="currentColor" />
              </svg>
              <svg className="absolute -bottom-6 -right-6 h-28 w-28 text-white/10" viewBox="0 0 200 200">
                <circle cx="100" cy="100" r="60" fill="currentColor" />
              </svg>
              <button
                aria-label="Close"
                onClick={closeLogin}
                className="absolute right-3 top-3 grid h-7 w-7 place-items-center rounded-full bg-white/20 text-white backdrop-blur transition hover:bg-white/30"
              >
                <X className="h-3.5 w-3.5" />
              </button>
              <div className="relative z-10 text-white">
                <div className="inline-flex items-center gap-1 rounded-full bg-white/20 px-2.5 py-0.5 text-[9px] font-semibold uppercase tracking-widest backdrop-blur">
                  <User className="h-2.5 w-2.5" /> {user ? tr('myAccount', language) : tr('welcome', language)}
                </div>
                <h3 className="mt-1 font-display text-lg font-bold">
                  {user
                    ? tr('enrollNowCta', language)
                    : mode === 'login'
                      ? tr('login', language)
                      : mode === 'register'
                        ? tr('createAccount', language)
                        : mode === 'forgot_password'
                          ? tr('forgotPassword', language)
                          : tr('resetPassword', language)}
                </h3>
              </div>
            </div>

            {/* Body */}
            <div className="p-4 sm:p-5">
              {user ? (
                <form id="auth-form" onSubmit={onSubmit} className="space-y-3">
                  <div className="rounded-xl bg-ink-50 p-2.5 text-xs text-ink-500">
                    <span className="font-semibold text-ink-400">{tr('loggedInAs', language)}:</span>{' '}
                    <span className="font-bold">{user.email}</span>
                  </div>

                  <div>
                    <label className="mb-1 block text-[11px] font-semibold text-ink-500">
                      {tr('fullName', language)}
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-ink-300" />
                      <Input
                        name="name"
                        value={nameValue}
                        onChange={(e) => setNameValue(e.target.value)}
                        required
                        placeholder={tr('fullName', language)}
                        className="h-9 rounded-xl pl-9 text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-1 block text-[11px] font-semibold text-ink-500">
                      {tr('phoneNumber', language)}
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-ink-300" />
                      <Input
                        type="tel"
                        name="phone"
                        value={phoneValue}
                        onChange={(e) => setPhoneValue(e.target.value)}
                        required
                        placeholder={tr('phoneNumber', language)}
                        className="h-9 rounded-xl pl-9 text-xs"
                      />
                    </div>
                  </div>

                  {error && (
                    <div className="rounded-xl bg-red-50 px-3 py-2 text-xs text-red-600">
                      {error}
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full h-9 rounded-xl text-xs font-semibold"
                  >
                    {loading ? tr('pleaseWait', language) : tr('updateProfileAndEnroll', language)}
                    <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
                  </Button>
                </form>
              ) : (
                <form id="auth-form" onSubmit={onSubmit} className="space-y-2.5">
                  {mode === 'login' && (
                    <>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-ink-300" />
                        <Input
                          type="email"
                          name="email"
                          required
                          placeholder={tr('emailAddress', language)}
                          className="h-9 rounded-xl pl-9 text-xs placeholder:text-xs"
                        />
                      </div>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-ink-300" />
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          name="password"
                          value={passwordValue}
                          onChange={(e) => setPasswordValue(e.target.value)}
                          required
                          placeholder={tr('password', language)}
                          className="h-9 rounded-xl pl-9 pr-9 text-xs placeholder:text-xs"
                          minLength={4}
                        />
                        <button
                          type="button"
                          aria-label={tr('togglePassword', language)}
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={() => setShowPassword((v) => !v)}
                          className="absolute right-3 top-1/2 z-10 -translate-y-1/2 text-ink-300 hover:text-ink-500"
                        >
                          {showPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                        </button>
                      </div>
                    </>
                  )}

                  {mode === 'register' && (
                    <>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-ink-300" />
                        <Input
                          name="name"
                          required
                          placeholder={tr('fullName', language)}
                          className="h-9 rounded-xl pl-9 text-xs placeholder:text-xs"
                        />
                      </div>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-ink-300" />
                        <Input
                          type="email"
                          name="email"
                          required
                          placeholder={tr('emailAddress', language)}
                          className="h-9 rounded-xl pl-9 text-xs placeholder:text-xs"
                        />
                      </div>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-ink-300" />
                        <Input
                          type="tel"
                          name="phone"
                          placeholder={tr('phoneNumber', language)}
                          className="h-9 rounded-xl pl-9 text-xs placeholder:text-xs"
                        />
                      </div>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-ink-300" />
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          name="password"
                          value={passwordValue}
                          onChange={(e) => setPasswordValue(e.target.value)}
                          required
                          placeholder={tr('password', language)}
                          className="h-9 rounded-xl pl-9 pr-9 text-xs placeholder:text-xs"
                          minLength={4}
                        />
                        <button
                          type="button"
                          aria-label={tr('togglePassword', language)}
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={() => setShowPassword((v) => !v)}
                          className="absolute right-3 top-1/2 z-10 -translate-y-1/2 text-ink-300 hover:text-ink-500"
                        >
                          {showPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                        </button>
                      </div>
                    </>
                  )}

                  {mode === 'forgot_password' && (
                    <>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-ink-300" />
                        <Input
                          type="email"
                          name="email"
                          required
                          placeholder={tr('emailAddress', language)}
                          className="h-9 rounded-xl pl-9 text-xs placeholder:text-xs"
                        />
                      </div>
                    </>
                  )}

                  {mode === 'reset_password' && (
                    <>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-ink-300" />
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          name="newPassword"
                          value={passwordValue}
                          onChange={(e) => setPasswordValue(e.target.value)}
                          required
                          placeholder={tr('newPassword', language)}
                          className="h-9 rounded-xl pl-9 pr-9 text-xs placeholder:text-xs"
                          minLength={4}
                        />
                        <button
                          type="button"
                          aria-label={tr('togglePassword', language)}
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={() => setShowPassword((v) => !v)}
                          className="absolute right-3 top-1/2 z-10 -translate-y-1/2 text-ink-300 hover:text-ink-500"
                        >
                          {showPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                        </button>
                      </div>
                    </>
                  )}

                  {error && (
                    <div className="rounded-xl bg-red-50 px-3 py-2 text-xs text-red-600">
                      {error}
                    </div>
                  )}

                  <div className="space-y-2 pt-1">
                    {mode === 'login' && (
                      <div className="text-right mb-2">
                        <button
                          type="button"
                          onClick={() => { setMode('forgot_password'); setError(null); }}
                          className="text-xs font-medium text-palette-orange hover:underline"
                        >
                          {tr('forgotPassword', language)}
                        </button>
                      </div>
                    )}
                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full h-9 rounded-xl text-xs font-semibold"
                    >
                      {loading
                        ? tr('pleaseWait', language)
                        : mode === 'login'
                          ? tr('login', language)
                          : mode === 'register'
                            ? tr('createAccount', language)
                            : mode === 'forgot_password'
                              ? tr('sendResetLink', language)
                              : tr('updatePassword', language)}
                      <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
                    </Button>

                    {(mode === 'login' || mode === 'register') && (
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full h-9 rounded-xl text-xs font-semibold"
                        onClick={loginWithGoogle}
                      >
                        <svg className="h-3.5 w-3.5 mr-1.5" viewBox="0 0 24 24" aria-hidden="true">
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
                        {tr('continueWithGoogle', language)}
                      </Button>
                    )}
                  </div>
                </form>
              )}

              {!user && (
                <div className="mt-3.5 text-center text-xs text-ink-400">
                  {mode === 'login' ? (
                    <>
                      {tr('dontHaveAccount', language)}{' '}
                      <button
                        type="button"
                        onClick={() => {
                          setMode('register');
                          setError(null);
                        }}
                        className="font-semibold text-palette-orange hover:underline"
                      >
                        {tr('createAccount', language)}
                      </button>
                    </>
                  ) : (
                    <>
                      {tr('alreadyHaveAccount', language)}{' '}
                      <button
                        type="button"
                        onClick={() => {
                          setMode('login');
                          setError(null);
                        }}
                        className="font-semibold text-palette-orange hover:underline"
                      >
                        {tr('login', language)}
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
