'use client';

import { useState, useEffect } from 'react';

type LoadingScreenProps = {
  loadingText?: string;
};

export function LoadingScreen({
  loadingText = 'কল্পনা যেখানে শিল্প হয়ে ওঠে...',
}: LoadingScreenProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Hide loading screen after content is ready
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Wait for fade out animation
      setTimeout(() => {
        setIsVisible(false);
      }, 800);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9998] flex items-center justify-center transition-all duration-700 ${
        isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      style={{
        background: `
          radial-gradient(ellipse at 20% 20%, rgba(255, 107, 53, 0.15) 0%, transparent 50%),
          radial-gradient(ellipse at 80% 30%, rgba(139, 92, 246, 0.12) 0%, transparent 50%),
          radial-gradient(ellipse at 40% 70%, rgba(255, 92, 138, 0.1) 0%, transparent 50%),
          radial-gradient(ellipse at 90% 80%, rgba(59, 130, 246, 0.08) 0%, transparent 50%),
          linear-gradient(180deg, #FFF9F2 0%, #FFF5EB 50%, #FFF0E5 100%)
        `,
      }}
    >
      {/* Artistic Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating paint splashes */}
        <div className="absolute top-[10%] left-[15%] w-24 h-24 rounded-full bg-orange-400/20 blur-xl animate-pulse" style={{ animationDuration: '3s' }} />
        <div className="absolute top-[20%] right-[20%] w-32 h-32 rounded-full bg-purple-400/15 blur-xl animate-pulse" style={{ animationDuration: '4s', animationDelay: '0.5s' }} />
        <div className="absolute bottom-[30%] left-[25%] w-28 h-28 rounded-full bg-pink-400/20 blur-xl animate-pulse" style={{ animationDuration: '3.5s', animationDelay: '1s' }} />
        <div className="absolute bottom-[20%] right-[15%] w-20 h-20 rounded-full bg-blue-400/15 blur-xl animate-pulse" style={{ animationDuration: '4.5s', animationDelay: '1.5s' }} />

        {/* Paintbrush stroke lines */}
        <svg className="absolute top-0 left-0 w-full h-full opacity-10" viewBox="0 0 400 400">
          <path d="M50 100 Q 100 50, 150 80 T 250 120 T 350 80" stroke="#FF6B35" strokeWidth="3" fill="none" className="animate-draw-stroke" />
          <path d="M80 200 Q 130 150, 180 180 T 280 220 T 380 180" stroke="#8B5CF6" strokeWidth="2" fill="none" className="animate-draw-stroke" style={{ animationDelay: '0.3s' }} />
          <path d="M30 300 Q 80 250, 130 280 T 230 320 T 330 280" stroke="#FF5C8A" strokeWidth="2.5" fill="none" className="animate-draw-stroke" style={{ animationDelay: '0.6s' }} />
        </svg>
      </div>

      {/* Main Loading Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4">
        {/* Logo/Brand Mark */}
        <div className="relative mb-8">
          <div className="w-24 h-24 relative animate-bounce-soft">
            {/* Outer ring */}
            <div className="absolute inset-0 rounded-full border-4 border-orange-400/30" />
            <div className="absolute inset-2 rounded-full border-3 border-purple-400/40" />
            <div className="absolute inset-4 rounded-full border-2 border-pink-400/50" />

            {/* Center art icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <svg className="w-10 h-10 text-orange-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 2L2 7l10 5 10-5-10-5z" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2 17l10 5 10-5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>

          {/* Decorative dots */}
          <div className="absolute -top-2 -right-2 w-3 h-3 rounded-full bg-orange-400 animate-ping" style={{ animationDuration: '2s' }} />
          <div className="absolute -bottom-1 -left-2 w-2 h-2 rounded-full bg-purple-400 animate-ping" style={{ animationDuration: '2s', animationDelay: '0.5s' }} />
          <div className="absolute top-1/2 -right-4 w-2 h-2 rounded-full bg-pink-400 animate-ping" style={{ animationDuration: '2s', animationDelay: '1s' }} />
        </div>

        {/* Brand Text */}
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-2 tracking-tight" style={{ color: '#2D261B' }}>
          <span className="text-orange-500">লোক</span>
          <span className="text-purple-500">নাথ</span>
        </h1>
        <p className="text-lg md:text-xl text-stone-600 mb-6 font-medium handwritten" style={{ fontFamily: "'Caveat', cursive" }}>
          Art Center
        </p>

        {/* Loading Animation */}
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-orange-400 animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-3 h-3 rounded-full bg-orange-500 animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-3 h-3 rounded-full bg-purple-500 animate-bounce" style={{ animationDelay: '300ms' }} />
          <div className="w-3 h-3 rounded-full bg-pink-500 animate-bounce" style={{ animationDelay: '450ms' }} />
          <div className="w-3 h-3 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '600ms' }} />
        </div>

        {/* Loading Text */}
        <p className="mt-6 text-stone-500 text-sm animate-pulse">
          {loadingText}
        </p>
      </div>

      {/* Bottom decorative element */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-1 h-8 rounded-full bg-gradient-to-t from-orange-400/60 to-purple-400/60"
              style={{
                animation: `wave 1.5s ease-in-out infinite`,
                animationDelay: `${i * 0.1}s`,
                transformOrigin: 'bottom'
              }}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes bounce-soft {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        @keyframes draw-stroke {
          from { stroke-dashoffset: 1000; }
          to { stroke-dashoffset: 0; }
        }

        @keyframes wave {
          0%, 100% { transform: scaleY(0.5); }
          50% { transform: scaleY(1); }
        }

        .animate-bounce-soft {
          animation: bounce-soft 2s ease-in-out infinite;
        }

        .animate-draw-stroke {
          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;
          animation: draw-stroke 3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
