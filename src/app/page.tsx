'use client';

import Scene from '@/components/canvas/Scene';
import PortfolioOverlay from '@/components/ui/PortfolioOverlay';

export default function Home() {
  return (
    <main className="relative w-full h-screen overflow-hidden">
      <Scene />
      <PortfolioOverlay />
    </main>
  );
}
