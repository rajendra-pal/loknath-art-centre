'use client';

import * as React from 'react';
import { createContext, useContext } from 'react';
import { supabase } from '@/lib/supabase/client';
import { showToast } from '@/components/ui/toaster';

export type User = {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'admin';
  phone?: string;
  address?: string;
  joinedAt?: string;
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

  openLogin: (
    mode?: 'login' | 'register',
    role?: 'admin' | 'customer'
  ) => void;

  closeLogin: () => void;
  updateProfile: (data: { phone: string; address: string }) => Promise<{ ok: boolean; error?: string }>;

  loginModal: {
    open: boolean;
    mode: 'login' | 'register';
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
    mode: 'login' as 'login' | 'register',
    role: 'customer' as 'customer' | 'admin',
  });

  React.useEffect(() => {
    getCurrentUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
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
      .select('role, name, phone, address')
      .eq('id', user.id)
      .single();

    if (accountError || !account) {
      console.error(accountError);
      showToast({ title: 'Unable to load account', description: accountError?.message ?? 'Account record not found.', variant: 'destructive' });
      setUser(null);
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
    });

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
      title: 'Login Successful',
      variant: 'success',
    });

    return { ok: true };
  }

  async function register({
    name,
    email,
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

    const { error: accountError } = await supabase.from('accounts').insert({
      id: signUpData.user.id,
      name,
      email,
      role: 'customer',
    }).select();

    if (accountError) {
      console.error(accountError);
      showToast({ title: 'Account setup failed', description: accountError.message, variant: 'destructive' });
      return { ok: false, error: accountError.message };
    }

    showToast({
      title: 'Account Created',
      variant: 'success',
    });

    return { ok: true };
  }

  async function loginWithGoogle() {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'http://localhost:3000/auth/callback',
      },
    });
  }

  async function logout() {
    await supabase.auth.signOut();
    setUser(null);

    showToast({
      title: 'Logged out',
    });
  }

  async function updateProfile(data: { phone: string; address: string }) {
    if (!user) return { ok: false, error: 'Not logged in' };
    const updatedUser = { ...user, phone: data.phone, address: data.address };
    const { error: accountError } = await supabase.from('accounts').update({ phone: data.phone, address: data.address }).eq('id', user.id).select();
    if (accountError) { console.error(accountError); showToast({ title: 'Profile update failed', description: accountError.message, variant: 'destructive' }); return { ok: false, error: accountError.message }; }
    setUser(updatedUser);
    return { ok: true };
  }

  function openLogin(
    mode: 'login' | 'register' = 'login',
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
