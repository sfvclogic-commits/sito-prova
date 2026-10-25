'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { RigidBody } from '@react-three/rapier';
import { usePortfolioStore } from '@/store/usePortfolioStore';
import * as THREE from 'three';

export default function InteractiveLamp() {
  const { lampOn, setLampOn, lampRotation, setLampRotation } = usePortfolioStore();
  const groupRef = useRef<THREE.Group>(null);

  // Simple rotation handler for the lamp head
  const handlePointerDown = (e: any) => {
    e.stopPropagation();
    // Toggle light on click
    setLampOn(!lampOn);
  };

  return (
    <RigidBody type="fixed" colliders="cuboid">
      <group ref={groupRef} rotation={[0, lampRotation, 0]}>
        {/* Lamp Base */}
        <mesh position={[0, 0, 0]} castShadow>
          <cylinderGeometry args={[0.2, 0.2, 0.05, 32]} />
          <meshStandardMaterial color="#222" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Lamp Neck */}
        <mesh position={[0, 0.5, 0]} castShadow>
          <cylinderGeometry args={[0.03, 0.03, 1, 16]} />
          <meshStandardMaterial color="#444" />
        </mesh>

        {/* Lamp Head */}
        <group position={[0, 1, 0]}>
          <mesh onClick={handlePointerDown} castShadow>
            <coneGeometry args={[0.3, 0.4, 32]} />
            <meshStandardMaterial color="#222" metalness={0.8} roughness={0.2} />
          </mesh>

          {/* The actual light source */}
          {lampOn && (
            <spotLight
              position={[0, -0.1, 0]}
              angle={0.5}
              penumbra={1}
              intensity={2}
              castShadow
              color="#fffbe0"
              target-position={[0, -1, 0]}
            />
          )}
        </group>
      </group>
    </RigidBody>
  );
}
