'use client';

import dynamic from 'next/dynamic';

// Lazy load heavy animated components on client only
export function ClientEffects() {
  const FloatingParticles = dynamic(
    () => import('@/components/effects/floating-particles').then(mod => mod.FloatingParticles),
    { ssr: false, loading: () => null }
  );

  const ClickSplash = dynamic(
    () => import('@/components/effects/click-splash').then(mod => mod.ClickSplash),
    { ssr: false, loading: () => null }
  );

  return (
    <>
      <FloatingParticles />
      <ClickSplash />
    </>
  );
}
