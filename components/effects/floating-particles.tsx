'use client';

import { useEffect, useState } from 'react';

type Particle = {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  duration: number;
};

const COLORS = ['#FF6B35', '#8B5CF6', '#FF5C8A', '#3B82F6', '#FBBF24', '#10B981'];

export function FloatingParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    // Reduced particle count for better performance
    const seed: Particle[] = Array.from({ length: 6 }).map((_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: 3 + Math.random() * 4,
      color: COLORS[i % COLORS.length],
      duration: 12 + Math.random() * 8,
    }));
    setParticles(seed);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full animate-float"
          style={{
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            background: p.color,
            opacity: 0.3,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.id * 2}s`,
          }}
        />
      ))}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.2;
          }
          25% {
            transform: translate(15px, -15px) scale(1.1);
            opacity: 0.35;
          }
          50% {
            transform: translate(-5px, -10px) scale(0.95);
            opacity: 0.25;
          }
          75% {
            transform: translate(-10px, 10px) scale(1.05);
            opacity: 0.3;
          }
        }
        .animate-float {
          animation: float ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}