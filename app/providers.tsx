'use client';

import { LanguageProvider } from '@/lib/i18n/context';
import { AuthProvider } from '@/components/auth/auth-context';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { AuthModal } from '@/components/auth/auth-modal';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <ThemeProvider attribute="class" defaultTheme="light">
        <AuthProvider>
          {children}
          <Toaster />
          <AuthModal />
        </AuthProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
}
