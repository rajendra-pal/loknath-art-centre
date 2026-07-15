'use client';

import dynamic from 'next/dynamic';

// Lazy load heavy animated components on client only
export function ClientEffects() {
  const CustomCursor = dynamic(
    () => import('@/components/effects/custom-cursor').then(mod => mod.CustomCursor),
    { ssr: false, loading: () => null }
  );

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
      <CustomCursor />
      <FloatingParticles />
      <ClickSplash />
    </>
  );
}