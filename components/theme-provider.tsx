'use client';

import * as React from 'react';

type Theme = 'light' | 'dark' | 'system';

type ThemeContextType = {
  theme: Theme;
  setTheme: (t: Theme) => void;
  resolvedTheme: 'light' | 'dark';
};

const ThemeContext = React.createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({
  children,
  defaultTheme = 'light',
  attribute = 'class',
}: {
  children: React.ReactNode;
  defaultTheme?: Theme;
  attribute?: string;
}) {
  const [theme, setThemeState] = React.useState<Theme>(defaultTheme);
  const [resolvedTheme, setResolved] = React.useState<'light' | 'dark'>('light');

  React.useEffect(() => {
    const stored = (typeof window !== 'undefined' && (localStorage.getItem('theme') as Theme)) || defaultTheme;
    setThemeState(stored);
  }, [defaultTheme]);

  React.useEffect(() => {
    const root = window.document.documentElement;
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const apply = () => {
      const isDark =
        theme === 'dark' || (theme === 'system' && mql.matches);
      if (attribute === 'class') {
        root.classList.toggle('dark', isDark);
      }
      setResolved(isDark ? 'dark' : 'light');
    };
    apply();
    mql.addEventListener('change', apply);
    return () => mql.removeEventListener('change', apply);
  }, [theme, attribute]);

  const setTheme = React.useCallback((t: Theme) => {
    setThemeState(t);
    try {
      localStorage.setItem('theme', t);
    } catch {}
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = React.useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
