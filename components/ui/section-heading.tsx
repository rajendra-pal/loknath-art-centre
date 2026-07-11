'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}) {
  return (
    <div
      className={cn(
        'max-w-3xl mb-14',
        align === 'center' ? 'mx-auto text-center' : 'text-left',
        className
      )}
    >
      {eyebrow && (
        <div
          className={cn(
            'inline-flex items-center gap-2 mb-4 rounded-full bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-palette-orange backdrop-blur-sm border border-palette-orange/20',
            align === 'center' ? 'mx-auto' : ''
          )}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-palette-orange" />
          {eyebrow}
        </div>
      )}
      <h2 className="heading-lg text-ink-500">{title}</h2>
      {description && (
        <p className="mt-4 text-lg text-ink-400 leading-relaxed">{description}</p>
      )}
    </div>
  );
}
