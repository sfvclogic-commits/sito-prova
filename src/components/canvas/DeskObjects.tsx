'use client';

import React, { Suspense } from 'react';
import { useGLTF } from '@react-three/drei';
import Draggable from './Draggable';
import InteractiveLamp from './InteractiveLamp';
import { usePortfolioStore } from '@/store/usePortfolioStore';

function Model({ url, scale = 1, position = [0, 0, 0], onClick }: { url: string, scale?: number, position?: [number, number, number], onClick?: () => void }) {
  const { scene } = useGLTF(url);
  return (
    <primitive
      object={scene.clone()}
      scale={scale}
      position={position}
      onClick={(e) => {
        e.stopPropagation();
        onClick?.();
      }}
      castShadow
      receiveShadow
    />
  );
}

export default function DeskObjects() {
  const { setSelectedObject, setView } = usePortfolioStore();

  const handleSelect = (obj: string) => {
    setSelectedObject(obj);
    setView(obj as any);
  };

  return (
    <group>
      {/* Interactive Lamp - custom component */}
      <InteractiveLamp />

      {/* Laptop - High quality GLB */}
      <Draggable initialPosition={[-1, 0, -0.5]}>
        <Suspense fallback={null}>
          <Model
            url="https://cdn.3dassets.dev/assets/27893/v1/model.glb"
            scale={0.01}
            position={[0, 0.1, 0]}
            onClick={() => handleSelect('work')}
          />
        </Suspense>
      </Draggable>

      {/* Notebook & Pen - GLB */}
      <Draggable initialPosition={[0, 0, 0.6]}>
        <Suspense fallback={null}>
          <Model
            url="https://polyfork.dev/cdn/lab-notebook-e60f7a.glb"
            scale={0.5}
            position={[0, 0.05, 0]}
            onClick={() => handleSelect('about')}
          />
        </Suspense>
      </Draggable>

      {/* Camera - Placeholder (will be replaced by GLB) */}
      <Draggable initialPosition={[1, 0, 0.3]}>
        <mesh onClick={() => handleSelect('gallery')} castShadow>
          <boxGeometry args={[0.2, 0.15, 0.1]} />
          <meshStandardMaterial color="#111" roughness={0.2} metalness={0.8} />
        </mesh>
      </Draggable>

      {/* Book - Placeholder */}
      <Draggable initialPosition={[1.2, 0, -0.2]}>
        <mesh castShadow>
          <boxGeometry args={[0.2, 0.3, 0.1]} />
          <meshStandardMaterial color="#8b0000" />
        </mesh>
      </Draggable>

      {/* Printed Photos - Scatter them */}
      {[...Array(3)].map((_, i) => (
        <Draggable key={i} initialPosition={[0.5 + i * 0.3, 0.01, 0.1 + i * 0.1]}>
          <mesh rotation={[-Math.PI / 2, 0, (i * 45) * (Math.PI / 180)]} castShadow>
            <planeGeometry args={[0.2, 0.15]} />
            <meshStandardMaterial color="#fff" roughness={1} />
          </mesh>
        </Draggable>
      ))}
    </group>
  );
}
