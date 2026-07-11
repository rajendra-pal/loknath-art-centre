import * as React from 'react';
import { cn } from '@/lib/utils';

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        'flex h-12 w-full rounded-2xl border border-ink-200 bg-white/70 px-4 py-2 text-base text-ink-500 placeholder:text-ink-300 focus-visible:border-palette-orange focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-palette-orange/30 disabled:cursor-not-allowed disabled:opacity-50 backdrop-blur-sm transition-all',
        className
      )}
      {...props}
    />
  )
);
Input.displayName = 'Input';

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        'flex min-h-[140px] w-full rounded-2xl border border-ink-200 bg-white/70 px-4 py-3 text-base text-ink-500 placeholder:text-ink-300 focus-visible:border-palette-orange focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-palette-orange/30 disabled:cursor-not-allowed disabled:opacity-50 backdrop-blur-sm transition-all resize-none',
        className
      )}
      {...props}
    />
  )
);
Textarea.displayName = 'Textarea';
