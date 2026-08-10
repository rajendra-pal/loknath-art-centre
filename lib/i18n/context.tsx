'use client';

// =====================================================
// Language provider — single source of truth for the user's
// chosen UI language. Defaults to 'en' on first visit and
// persists to localStorage['lac.lang'] immediately. When the
// user is signed in, setLanguage also mirrors the choice to
// public.accounts.language via Supabase (best-effort; we don't
// fail the toggle if the network does).
// =====================================================

import * as React from 'react';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Language, Localized, t, tArray } from './pick';
import { supabase } from '@/lib/supabase/client';

const STORAGE_KEY = 'lac.lang';
const VALID: Language[] = ['en', 'bn'];

// Always start with 'en' so SSR and the first client render agree. Reading
// localStorage during useState's initializer would diverge from the server
// (which has no window) and trip React's hydration check. The stored value
// is applied in a post-mount effect below — see `LanguageBootstrap` for the
// <html lang>/body-font side that's already wired.
const INITIAL_LANGUAGE: Language = 'en';

function readStoredLanguage(): Language | null {
  if (typeof window === 'undefined') return null;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === 'en' || stored === 'bn') return stored;
  } catch {
    // localStorage may be blocked (private mode, file://) — fall through.
  }
  return null;
}

type LanguageContextValue = {
  language: Language;
  setLanguage: (next: Language) => void;
  /** Pick the localized value for the current language. */
  t: <T>(value: Localized<T> | T) => T;
  /** Same as t but for arrays. */
  tArray: <T>(value: ReadonlyArray<Localized<T>> | ReadonlyArray<T>) => ReadonlyArray<T>;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(INITIAL_LANGUAGE);

  // Apply the user's stored preference after hydration so the first paint
  // matches the SSR HTML. LanguageBootstrap handles <html lang>/body font;
  // this effect keeps the React-side context value in sync.
  useEffect(() => {
    const stored = readStoredLanguage();
    if (stored && stored !== language) {
      setLanguageState(stored);
    }
    // We intentionally only run on mount — `language` is read once to decide
    // whether a stored value differs, not to react to it.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keep <html lang> in sync so screen readers and CSS work right.
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language === 'bn' ? 'bn' : 'en';
    }
  }, [language]);

  // Cross-tab sync — if another tab flips the toggle, follow it.
  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.key !== STORAGE_KEY) return;
      const next = event.newValue;
      if (next === 'en' || next === 'bn') {
        setLanguageState(next);
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const setLanguage = useCallback((next: Language) => {
    if (!VALID.includes(next)) return;
    setLanguageState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // ignore storage failures
    }

    // Best-effort mirror to Supabase. If the user is anonymous this is a
    // no-op; we don't await it in the UI because a slow network shouldn't
    // make the toggle feel sluggish.
    void (async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user) return;
        await supabase.from('accounts').update({ language: next }).eq('id', user.id);
      } catch {
        // Silent — localStorage stays as source of truth for guest UX.
      }
    })();
  }, []);

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      setLanguage,
      t: <T,>(value: Localized<T> | T) => t(value, language),
      tArray: <T,>(value: ReadonlyArray<Localized<T>> | ReadonlyArray<T>) =>
        tArray(value, language),
    }),
    [language, setLanguage]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used inside LanguageProvider');
  }
  return ctx;
}
