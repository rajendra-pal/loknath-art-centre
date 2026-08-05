'use client';

import { Languages } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/context';
import { cn } from '@/lib/utils';
import type { Language } from '@/lib/i18n/pick';

type Props = {
  className?: string;
  /** Show a stacked EN/বাংলা two-button layout (account settings). */
  variant?: 'segmented' | 'inline';
};

const LABELS: Record<Language, { en: string; bn: string }> = {
  en: { en: 'English', bn: 'ইংরেজি' },
  bn: { en: 'Bengali', bn: 'বাংলা' },
};

export function LanguageToggle({ className, variant = 'inline' }: Props) {
  const { language, setLanguage } = useLanguage();

  if (variant === 'segmented') {
    return (
      <div
        className={cn(
          'inline-flex items-center gap-1 rounded-2xl bg-ink-50/70 p-1',
          className
        )}
        role="group"
        aria-label="Language"
      >
        {(['en', 'bn'] as const).map((code) => (
          <button
            key={code}
            onClick={() => setLanguage(code)}
            aria-pressed={language === code}
            className={cn(
              'rounded-xl px-4 py-2 text-sm font-semibold transition',
              language === code
                ? 'bg-white text-palette-orange shadow'
                : 'text-ink-400 hover:text-ink-500'
            )}
          >
            {LABELS[code][language]}
          </button>
        ))}
      </div>
    );
  }

  return (
    <button
      onClick={() => setLanguage(language === 'en' ? 'bn' : 'en')}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full bg-white/70 px-3 py-1.5 text-xs font-semibold text-ink-500 backdrop-blur transition hover:bg-white',
        className
      )}
      aria-label="Toggle language"
      title={language === 'en' ? 'বাংলা' : 'English'}
    >
      <Languages className="h-3.5 w-3.5" />
      {language === 'en' ? 'বাংলা' : 'English'}
    </button>
  );
}
