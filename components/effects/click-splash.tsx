'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

type Splash = {
  id: number;
  x: number;
  y: number;
  color: string;
};

const COLORS = ['#FF6B35', '#8B5CF6', '#FF5C8A', '#3B82F6', '#FBBF24', '#10B981'];

export function ClickSplash() {
  const [splashes, setSplashes] = useState<Splash[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    let id = 0;

    const handle = (e: MouseEvent) => {
      // Skip if clicking interactive elements that have their own feedback
      const target = e.target as HTMLElement;
      if (target.closest('button, a, [role="button"], input, textarea, select, label')) return;

      const splash: Splash = {
        id: id++,
        x: e.clientX,
        y: e.clientY,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      };
      setSplashes((s) => [...s, splash]);
      window.setTimeout(() => {
        setSplashes((s) => s.filter((x) => x.id !== splash.id));
      }, 1100);
    };

    window.addEventListener('click', handle);
    return () => window.removeEventListener('click', handle);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[2] overflow-hidden">
      <AnimatePresence>
        {splashes.map((s) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.4 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="absolute"
            style={{ left: s.x, top: s.y, transform: 'translate(-50%, -50%)' }}
          >
            <svg width="180" height="180" viewBox="0 0 180 180" className="opacity-70">
              <defs>
                <radialGradient id={`grad-${s.id}`} cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor={s.color} stopOpacity="0.7" />
                  <stop offset="100%" stopColor={s.color} stopOpacity="0" />
                </radialGradient>
              </defs>
              <circle cx="90" cy="90" r="50" fill={`url(#grad-${s.id})`} />
              {/* Splatter droplets */}
              {[
                { x: 50, y: 30, r: 6 },
                { x: 130, y: 50, r: 5 },
                { x: 145, y: 100, r: 7 },
                { x: 90, y: 150, r: 6 },
                { x: 30, y: 130, r: 5 },
                { x: 60, y: 60, r: 3 },
                { x: 120, y: 130, r: 3 },
                { x: 150, y: 70, r: 4 },
                { x: 20, y: 90, r: 4 },
              ].map((d, i) => (
                <circle
                  key={i}
                  cx={d.x}
                  cy={d.y}
                  r={d.r}
                  fill={s.color}
                  opacity="0.4"
                />
              ))}
            </svg>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
