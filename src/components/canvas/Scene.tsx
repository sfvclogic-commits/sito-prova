'use client';

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, PerspectiveCamera } from '@react-three/drei';
import { Physics } from '@react-three/rapier';
import { EffectComposer, Bloom, SSAO } from '@react-three/postprocessing';
import Desk from './Desk';
import DeskObjects from './DeskObjects';
import { useCameraTransitions } from '@/hooks/useCameraTransitions';

export default function Scene() {
  useCameraTransitions();

  return (
    <div className="w-full h-screen bg-slate-100">
      <Canvas shadows dpr={[1, 2]} gl={{ antialias: true }}>
        <PerspectiveCamera makeDefault position={[5, 5, 5]} fov={50} />
        <OrbitControls
          makeDefault
          enablePan={false}
          maxPolarAngle={Math.PI / 2.1}
          minDistance={2}
          maxDistance={10}
        />

        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <Environment preset="city" />

        <Suspense fallback={null}>
          <Physics debug={false}>
            <Desk />
            <DeskObjects />
          </Physics>
        </Suspense>

        <ContactShadows
          position={[0, -0.01, 0]}
          opacity={0.4}
          scale={10}
          blur={2}
          far={4.5}
        />

        <EffectComposer>
          <Bloom intensity={0.5} luminanceThreshold={1} radius={0.4} />
          <SSAO />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
