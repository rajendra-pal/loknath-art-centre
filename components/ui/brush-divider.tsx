import * as React from 'react';

export function BrushDivider({ color = '#FF6B35', className = '' }: { color?: string; className?: string }) {
  return (
    <div className={`my-6 flex items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 300 12"
        width="300"
        height="12"
        className="overflow-visible"
        style={{ color }}
      >
        <path
          d="M 4 8 Q 60 2, 120 6 T 220 7 T 296 4"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
          opacity="0.6"
        />
        <circle cx="150" cy="6" r="5" fill="currentColor" opacity="0.7" />
        <circle cx="160" cy="6" r="2" fill="currentColor" opacity="0.5" />
        <circle cx="138" cy="6" r="1.5" fill="currentColor" opacity="0.4" />
      </svg>
    </div>
  );
}
