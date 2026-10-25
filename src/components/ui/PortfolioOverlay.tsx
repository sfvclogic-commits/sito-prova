'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolioStore } from '@/store/usePortfolioStore';

export default function PortfolioOverlay() {
  const { view, setView } = usePortfolioStore();

  if (view === 'desk') return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 z-50 flex items-center justify-center bg-white"
      >
        <div className="max-w-6xl w-full h-full flex flex-col p-12">
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <h1 className="text-xs uppercase tracking-widest text-gray-400 font-medium">
                Project Exploration / {view}
              </h1>
              <div className="h-px w-12 bg-black" />
            </div>

            <button
              onClick={() => setView('desk')}
              className="group flex items-center gap-2 text-sm font-medium hover:text-gray-500 transition-colors"
            >
              CLOSE
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>

          <div className="flex-1 flex items-center justify-center">
            <div className="text-center max-w-3xl">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-6xl font-light tracking-tight mb-8"
              >
                {view === 'work' && 'Selected Works'}
                {view === 'about' && 'About the Artist'}
                {view === 'contact' && 'Get in Touch'}
                {view === 'gallery' && 'Visual Archive'}
              </motion.h2>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="grid grid-cols-3 gap-8"
              >
                {[1, 2, 3].map((i) => (
                  <div key={i} className="group cursor-pointer">
                    <div className="aspect-[3/4] bg-gray-100 overflow-hidden rounded-sm mb-4">
                      <div className="w-full h-full bg-gray-200 group-hover:scale-105 transition-transform duration-700" />
                    </div>
                    <p className="text-xs uppercase tracking-widest text-gray-500 mb-1">Project 0{i}</p>
                    <p className="text-sm font-medium">Visual Study / 2026</p>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>

          <footer className="flex justify-between items-end text-[10px] uppercase tracking-tighter text-gray-400">
            <p>© 2026 sf-vc-logic.it</p>
            <p>Private Portfolio Interface v1.0</p>
          </footer>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
