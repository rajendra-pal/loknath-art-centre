'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Particle = {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
};

const COLORS = ['#FF6B35', '#8B5CF6', '#FF5C8A', '#3B82F6', '#FBBF24', '#10B981'];

export function FloatingParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    // Seed initial floating particles
    const seed: Particle[] = Array.from({ length: 14 }).map((_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: 4 + Math.random() * 8,
      color: COLORS[i % COLORS.length],
    }));
    setParticles(seed);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden">
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full blur-[1.5px]"
            style={{
              left: p.x,
              top: p.y,
              width: p.size,
              height: p.size,
              background: p.color,
              opacity: 0.35,
            }}
            animate={{
              x: [0, 20, -10, 0],
              y: [0, -20, 10, 0],
              scale: [1, 1.2, 0.9, 1],
              opacity: [0.25, 0.45, 0.3, 0.25],
            }}
            transition={{
              duration: 8 + Math.random() * 6,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}