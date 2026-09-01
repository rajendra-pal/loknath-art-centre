'use client';

import * as React from 'react';
import { createContext, useContext } from 'react';
import { supabase } from '@/lib/supabase/client';
import { showToast } from '@/components/ui/toaster';
import { tr } from '@/lib/i18n/strings';
import type { Language } from '@/lib/i18n/pick';

/** Read the user's current language preference from localStorage (sync). */
function currentLang(): Language {
  if (typeof window === 'undefined') return 'bn';
  try {
    const stored = window.localStorage.getItem('lac.lang');
    return (stored === 'en' ? 'en' : 'bn') as Language;
  } catch {
    return 'bn';
  }
}

export type User = {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'admin';
  phone?: string;
  address?: string;
  avatar?: string;
  joinedAt?: string;
  language?: 'en' | 'bn';
};

type AuthContextType = {
  user: User | null;
  loading: boolean;

  login: (
    email: string,
    password: string,
    role?: 'admin' | 'customer'
  ) => Promise<{ ok: boolean; error?: string }>;

  register: (
    data: {
      name: string;
      email: string;
      phone?: string;
      password: string;
    }
  ) => Promise<{ ok: boolean; error?: string }>;

  loginWithGoogle: () => Promise<void>;

  logout: () => Promise<void>;

  resetPassword: (email: string) => Promise<{ ok: boolean; error?: string }>;

  updatePassword: (newPassword: string) => Promise<{ ok: boolean; error?: string }>;

  openLogin: (
    mode?: 'login' | 'register' | 'forgot_password' | 'reset_password',
    role?: 'admin' | 'customer'
  ) => void;

  closeLogin: () => void;
  updateProfile: (data: { phone?: string; address?: string; avatar?: string; name?: string }) => Promise<{ ok: boolean; error?: string }>;

  loginModal: {
    open: boolean;
    mode: 'login' | 'register' | 'forgot_password' | 'reset_password';
    role: 'admin' | 'customer';
  };
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);


export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = React.useState(true);

  const [user, setUser] = React.useState<User | null>(null);

  const [loginModal, setLoginModal] = React.useState({
    open: false,
    mode: 'login' as 'login' | 'register' | 'forgot_password' | 'reset_password',
    role: 'customer' as 'customer' | 'admin',
  });

  React.useEffect(() => {
    const initializeAuth = async () => {
      await getCurrentUser();

      if (typeof window !== 'undefined' && window.location.search.includes('reset_password=true')) {
        window.history.replaceState(null, '', window.location.pathname);

        // Verify if there's an active session before showing the reset form
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          setLoginModal({ open: true, mode: 'reset_password', role: 'customer' });
        } else {
          console.error('Password reset session not found');
        }
      }
    };

    initializeAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') {
        setLoginModal({ open: true, mode: 'reset_password', role: 'customer' });
      }
      getCurrentUser();
    });

    return () => subscription.unsubscribe();
  }, []);

  async function getCurrentUser() {
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setUser(null);
      setLoading(false);
      return;
    }

    const { data: account, error: accountError } = await supabase
      .from('accounts')
      .select('role, name, phone, address, language')
      .eq('id', user.id)
      .maybeSingle();

    if (accountError) {
      console.error('Account lookup failed:', accountError.message ?? accountError);
      showToast({ title: tr('accountLoadFailed', currentLang()), description: accountError.message ?? 'Account record not found.', variant: 'destructive' });
      setUser(null);
      setLoading(false);
      return;
    }

    if (!account) {
      // No account row yet. Possible reasons:
      //   1. Fresh Google OAuth sign-in (no row has been provisioned).
      //   2. The user previously registered with email/password, so an
      //      `accounts` row already exists under a *different* auth.users.id
      //      but with the same email — the email column is UNIQUE, so a fresh
      //      INSERT would violate the constraint. Re-attach the existing row
      //      to the current auth.uid() instead.
      const fallbackName =
        (user.user_metadata?.full_name as string | undefined) ??
        (user.email ? user.email.split('@')[0] : 'Customer');

      if (user.email) {
        const { data: byEmail, error: byEmailError } = await supabase
          .from('accounts')
          .select('id, role, name, phone, address, language')
          .eq('email', user.email)
          .maybeSingle();

        if (byEmailError) {
          console.error('Account lookup by email failed:', byEmailError.message ?? byEmailError);
          showToast({ title: tr('accountLoadFailed', currentLang()), description: byEmailError.message ?? 'Account record not found.', variant: 'destructive' });
          setUser(null);
          setLoading(false);
          return;
        }

        if (byEmail) {
          // Re-attach the existing account to the current auth user.
          const { data: claimed, error: claimError } = await supabase
            .from('accounts')
            .update({ id: user.id })
            .eq('id', byEmail.id)
            .select('role, name, phone, address, language')
            .single();

          if (claimError || !claimed) {
            console.error('Account re-attach failed:', claimError?.message ?? claimError);
            showToast({ title: tr('accountLoadFailed', currentLang()), description: claimError?.message ?? 'Account record not found.', variant: 'destructive' });
            setUser(null);
            setLoading(false);
            return;
          }

          setUser({
            id: user.id,
            name: claimed.name,
            email: user.email,
            role: claimed.role === 'admin' ? 'admin' : 'customer',
            phone: claimed.phone ?? undefined,
            address: claimed.address ?? undefined,
            joinedAt: user.created_at ? new Date(user.created_at).toLocaleDateString('en-IN') : undefined,
            language: (claimed.language ?? 'en') as 'en' | 'bn',
          });

          // Mirror the stored language into localStorage so the toggle reflects it
          // on this device right away (no extra round-trip on first paint).
          try {
            const stored = (claimed.language ?? 'en') as 'en' | 'bn';
            window.localStorage.setItem('lac.lang', stored);
          } catch { /* ignore */ }

          setLoading(false);
          return;
        }
      }

      const { data: inserted, error: insertError } = await supabase
        .from('accounts')
        .insert({
          id: user.id,
          email: user.email ?? '',
          name: fallbackName,
          role: 'customer',
        })
        .select('role, name, phone, address, language')
        .single();

      if (insertError || !inserted) {
        console.error('Account provisioning failed:', insertError?.message ?? insertError);
        showToast({ title: tr('accountLoadFailed', currentLang()), description: insertError?.message ?? 'Account record not found.', variant: 'destructive' });
        setUser(null);
        setLoading(false);
        return;
      }

      setUser({
        id: user.id,
        name: inserted.name,
        email: user.email || '',
        role: inserted.role === 'admin' ? 'admin' : 'customer',
        phone: inserted.phone ?? undefined,
        address: inserted.address ?? undefined,
        joinedAt: user.created_at ? new Date(user.created_at).toLocaleDateString('en-IN') : undefined,
        language: (inserted.language ?? 'en') as 'en' | 'bn',
      });

      setLoading(false);
      return;
    }

    setUser({
      id: user.id,
      name: account.name,
      email: user.email || '',
      role: account.role === 'admin' ? 'admin' : 'customer',
      phone: account.phone ?? undefined,
      address: account.address ?? undefined,
      joinedAt: user.created_at ? new Date(user.created_at).toLocaleDateString('en-IN') : undefined,
      language: (account.language ?? 'en') as 'en' | 'bn',
    });

    // Mirror stored language into localStorage so the in-page toggle reflects it.
    try {
      window.localStorage.setItem('lac.lang', (account.language ?? 'en') as 'en' | 'bn');
    } catch { /* ignore */ }

    setLoading(false);
  }

  async function login(email: string, password: string, role: 'customer' | 'admin' = 'customer') {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error)
      return {
        ok: false,
        error: error.message,
      };

    showToast({
      title: tr('loginSuccess', currentLang()),
      variant: 'success',
    });

    return { ok: true };
  }

  async function register({
    name,
    email,
    phone,
    password,
  }: {
    name: string;
    email: string;
    phone?: string;
    password: string;
  }) {
    const { data: signUpData, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
        },
      },
    });

    if (error)
      return {
        ok: false,
        error: error.message,
      };

    if (!signUpData.user) {
      return { ok: false, error: 'Supabase did not return a user for this registration.' };
    }

    // The user exists in auth.users now. The accounts row may already exist
    // (e.g. a previous Google sign-in created it under a different
    // auth.users.id) — the email column is UNIQUE, so a blind insert can fail.
    // Check for an existing row by email and re-attach it; otherwise insert.
    const { data: existing } = await supabase
      .from('accounts')
      .select('id')
      .eq('email', email)
      .maybeSingle();

    let accountError: { message: string } | null = null;

    if (existing) {
      const { error: claimError } = await supabase
        .from('accounts')
        .update({ id: signUpData.user.id, name, phone: phone || null, role: 'customer' })
        .eq('id', existing.id);

      if (claimError) accountError = { message: claimError.message };
    } else {
      const { error: insertError } = await supabase.from('accounts').insert({
        id: signUpData.user.id,
        name,
        email,
        phone: phone || null,
        role: 'customer',
      });

      if (insertError) accountError = { message: insertError.message };
    }

    if (accountError) {
      console.error('Account setup failed:', accountError.message);
      showToast({ title: tr('accountSetupFailed', currentLang()), description: accountError.message, variant: 'destructive' });
      return { ok: false, error: accountError.message };
    }

    showToast({
      title: tr('accountCreated', currentLang()),
      variant: 'success',
    });

    return { ok: true };
  }

  async function loginWithGoogle() {
    const origin = typeof window !== 'undefined' && window.location.origin 
      ? window.location.origin 
      : (process.env.NEXT_PUBLIC_SITE_URL || '');
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${origin}/auth/callback`,
      },
    });
  }

  async function logout() {
    await supabase.auth.signOut();
    setUser(null);

    showToast({
      title: tr('loggedOut', currentLang()),
    });
  }

  async function updateProfile(data: { phone?: string; address?: string; avatar?: string; name?: string }) {
    if (!user) return { ok: false, error: 'Not logged in' };
    const updatedUser = { ...user, ...data };
    try {
      const { error } = await supabase.from('accounts').update(data).eq('id', user.id);
      if (error) {
        console.error('Account table update error:', error.message ?? error);
        return { ok: false, error: error.message };
      }
    } catch (e: any) {
      console.warn('Account table update notice:', e);
      return { ok: false, error: e?.message || 'Update failed' };
    }
    setUser(updatedUser);
    return { ok: true };
  }

  async function resetPassword(email: string) {
    const origin = typeof window !== 'undefined' && window.location.origin
      ? window.location.origin
      : (process.env.NEXT_PUBLIC_SITE_URL || '');
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${origin}/auth/callback?type=recovery`,
    });

    if (error) {
      return { ok: false, error: error.message };
    }

    return { ok: true };
  }

  async function updatePassword(newPassword: string) {
    const { error } = await supabase.auth.updateUser({ password: newPassword });

    if (error) {
      return { ok: false, error: error.message };
    }

    showToast({
      title: tr('passwordUpdated', currentLang()),
      variant: 'success',
    });

    return { ok: true };
  }

  function openLogin(
    mode: 'login' | 'register' | 'forgot_password' | 'reset_password' = 'login',
    role: 'customer' | 'admin' = 'customer'
  ) {
    setLoginModal({
      open: true,
      mode,
      role,
    });
  }

  function closeLogin() {
    setLoginModal((p) => ({
      ...p,
      open: false,
    }));
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        loginWithGoogle,
        logout,
        resetPassword,
        updatePassword,
        openLogin,
        closeLogin,
        updateProfile,
        loginModal,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);

  if (!ctx)
    throw new Error('useAuth must be used inside AuthProvider');

  return ctx;
}
