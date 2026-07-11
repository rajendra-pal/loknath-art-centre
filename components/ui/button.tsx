'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    const variants = {
      primary:
        'bg-gradient-to-r from-palette-orange to-palette-rose text-white shadow-lg shadow-palette-orange/30 hover:shadow-palette-orange/50',
      secondary:
        'bg-ink-500 text-white shadow-lg shadow-ink-500/30 hover:bg-ink-600',
      outline:
        'border-2 border-ink-200 bg-white/60 text-ink-500 backdrop-blur hover:border-palette-orange hover:text-palette-orange',
      ghost: 'text-ink-500 hover:bg-ink-50',
    } as const;
    const sizes = {
      sm: 'h-10 px-4 text-sm',
      md: 'h-12 px-6 text-base',
      lg: 'h-14 px-8 text-lg',
    } as const;
    return (
      <button
        ref={ref}
        className={cn(
          'splash-btn relative inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-palette-orange focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
          variants[variant],
          sizes[size],
          className
        )}
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          e.currentTarget.style.setProperty('--x', `${e.clientX - r.left}px`);
          e.currentTarget.style.setProperty('--y', `${e.clientY - r.top}px`);
        }}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';
