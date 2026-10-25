'use client';

import React from 'react';
import { RigidBody } from '@react-three/rapier';
import { Mesh } from 'three';

export default function Desk() {
  return (
    <group>
      {/* The Desk Surface */}
      <RigidBody type="fixed" colliders="cuboid">
        <mesh receiveShadow castShadow position={[0, -0.5, 0]}>
          <boxGeometry args={[4, 0.1, 2]} />
          <meshStandardMaterial color="#f0f0f0" roughness={0.3} metalness={0.1} />
        </mesh>
      </RigidBody>

      {/* Simple Desk Legs */}
      <mesh position={[-1.9, -0.75, -0.9]}>
        <boxGeometry args={[0.1, 1, 0.1]} />
        <meshStandardMaterial color="#333" />
      </mesh>
      <mesh position={[1.9, -0.75, -0.9]}>
        <boxGeometry args={[0.1, 1, 0.1]} />
        <meshStandardMaterial color="#333" />
      </mesh>
      <mesh position={[-1.9, -0.75, 0.9]}>
        <boxGeometry args={[0.1, 1, 0.1]} />
        <meshStandardMaterial color="#333" />
      </mesh>
      <mesh position={[1.9, -0.75, 0.9]}>
        <boxGeometry args={[0.1, 1, 0.1]} />
        <meshStandardMaterial color="#333" />
      </mesh>
    </group>
  );
}
