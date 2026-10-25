'use client';

import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import gsap from 'gsap';
import { usePortfolioStore } from '@/store/usePortfolioStore';

export function useCameraTransitions() {
  const { camera } = useThree();
  const { view, selectedObject } = usePortfolioStore();

  useEffect(() => {
    if (view === 'desk') {
      // Return to desk view
      gsap.to(camera.position, {
        x: 5,
        y: 5,
        z: 5,
        duration: 1.5,
        ease: 'power3.inOut',
      });
    } else if (selectedObject) {
      // Zoom into specific object
      const targets: Record<string, [number, number, number]> = {
        work: [0, 0.5, 0],    // Computer
        gallery: [1, 0.5, 0.3], // Camera
        about: [0, 0.2, 0.6],   // Notebook
        contact: [-1.5, 0.8, 0.8], // Lamp
      };

      const targetPos = targets[selectedObject] || [0, 0, 0];

      gsap.to(camera.position, {
        x: targetPos[0] + 0.5,
        y: targetPos[1] + 0.5,
        z: targetPos[2] + 0.5,
        duration: 1.2,
        ease: 'power3.inOut',
        onComplete: () => {
          // Potential trigger for 2D UI transition
        },
      });
    }
  }, [view, selectedObject, camera]);

  return {
    zoomTo: (obj: string) => {
      // This is handled by the useEffect observing selectedObject,
      // but we can add a manual trigger here if needed.
    }
  };
}
