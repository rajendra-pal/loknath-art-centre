'use client';

// One-shot, no-render script. Reads the user's stored language preference
// before React hydrates the rest of the tree, applies it to <html lang>
// and the body font, and then becomes a no-op. Avoiding FOUC means we set
// things synchronously on the first effect, before useLanguage children
// read context values.

import { useEffect } from 'react';

const STORAGE_KEY = 'lac.lang';

function applyLanguage(raw: string | null) {
  const lang: 'en' | 'bn' = raw === 'bn' ? 'bn' : 'en';
  if (typeof document === 'undefined') return;
  if (document.documentElement.lang !== lang) {
    document.documentElement.lang = lang;
  }
  // Switch the body's font utility between font-bengali and font-sans.
  const body = document.body;
  if (!body) return;
  body.classList.remove('font-bengali', 'font-sans');
  body.classList.add(lang === 'bn' ? 'font-bengali' : 'font-sans');
}

export function LanguageBootstrap() {
  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = window.localStorage.getItem(STORAGE_KEY);
    } catch {
      // Storage may be blocked (private mode, file://).
    }
    applyLanguage(stored);

    // Keep class in sync if another tab changes it.
    const onStorage = (event: StorageEvent) => {
      if (event.key !== STORAGE_KEY) return;
      applyLanguage(event.newValue);
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);
  return null;
}
