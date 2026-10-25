'use client';

import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { RigidBody, RapierRigidBody } from '@react-three/rapier';
import { useGesture } from '@use-gesture/react';
import * as THREE from 'three';

interface DraggableProps {
  children: React.ReactNode;
  initialPosition?: [number, number, number];
}

export default function Draggable({ children, initialPosition = [0, 0, 0] }: DraggableProps) {
  const api = useRef<RapierRigidBody>(null);
  const [isDragging, setIsDragging] = useState(false);
  const targetPosition = useRef(new THREE.Vector3(...initialPosition));

  // Gesture handling
  const bind = useGesture({
    onDrag: ({ event }) => {
      setIsDragging(true);

      // Basic plane projection for the desk (assuming desk is at y=0)
      // In a real scenario, we would use a raycaster to find the intersection with the desk
      // For now, we'll use a simplified mapping of mouse coordinates to 3D space
      const rect = event.target.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const z = ((event.clientY - rect.top) / rect.height) * 2 - 1;

      targetPosition.current.set(x * 5, initialPosition[1], z * 5);
    },
    onDragEnd: () => {
      setIsDragging(false);
    },
  });

  useFrame(() => {
    if (api.current && isDragging) {
      const currentPos = api.current.translation();
      const target = targetPosition.current;

      // Smoothly interpolate to the target position
      api.current.setNextKinematicTranslation({
        x: target.x,
        y: target.y,
        z: target.z
      });
    }
  });

  return (
    <RigidBody
      ref={api}
      type={isDragging ? "kinematicPosition" : "dynamic"}
      colliders="cuboid"
      position={initialPosition}
      linearDamping={0.5}
      angularDamping={0.5}
    >
      <group {...bind()}>
        {children}
      </group>
    </RigidBody>
  );
}
