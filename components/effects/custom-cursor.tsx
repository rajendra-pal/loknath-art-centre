'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export function CustomCursor() {
  const [isBrush, setIsBrush] = useState(false);
  const [showCursor, setShowCursor] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { damping: 25, stiffness: 200, mass: 0.4 };
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);

useEffect(() => {
  if (typeof window === 'undefined') return;

  // Show only on desktop with a mouse
  const mediaQuery = window.matchMedia('(min-width: 1024px) and (hover: hover)');

  const updateCursorVisibility = () => {
    setShowCursor(mediaQuery.matches);
  };

  updateCursorVisibility();

  if (!mediaQuery.matches) return;

  const move = (e: MouseEvent) => {
    cursorX.set(e.clientX);
    cursorY.set(e.clientY);
  };

  const over = (e: MouseEvent) => {
    const target = e.target as HTMLElement;

    setIsBrush(
      !!target.closest(
        'button, a, [role="button"], input, textarea, label, [data-cursor="brush"]'
      )
    );
  };

  window.addEventListener('mousemove', move);
  window.addEventListener('mouseover', over);
  window.addEventListener('resize', updateCursorVisibility);

  return () => {
    window.removeEventListener('mousemove', move);
    window.removeEventListener('mouseover', over);
    window.removeEventListener('resize', updateCursorVisibility);
  };
}, [cursorX, cursorY]);

if (!showCursor) return null;
  return (
    <>
      <motion.div
        className="custom-cursor hidden lg:block"
        style={{ x, y }}
      >
        <svg
          viewBox="0 0 40 40"
          width="100%"
          height="100%"
          className="drop-shadow-md"
        >
          {isBrush ? (
            <g>
              <path
                d="M 8 32 Q 12 28, 18 22 Q 24 16, 30 10 L 32 12 Q 26 18, 20 24 Q 14 30, 10 34 Z"
                fill="#FF6B35"
                stroke="#2D261B"
                strokeWidth="1.2"
              />
              <circle cx="32" cy="10" r="3" fill="#8B5CF6" />
            </g>
          ) : (
            <g>
              <circle cx="20" cy="20" r="9" fill="#FF6B35" opacity="0.55" />
              <circle cx="20" cy="20" r="4" fill="#FF5C8A" opacity="0.85" />
              <circle cx="20" cy="20" r="1.5" fill="#FFF9F2" />
            </g>
          )}
        </svg>
      </motion.div>
    </>
  );
}