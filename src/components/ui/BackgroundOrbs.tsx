'use client';

import { motion } from 'framer-motion';

export default function BackgroundOrbs() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-50">
      {/* Primary Blue Orb */}
      <motion.div
        className="absolute top-[10%] left-[20%] w-[500px] h-[500px] rounded-full bg-primary/20 blur-[100px] mix-blend-screen"
        animate={{
          x: [0, 50, -20, 0],
          y: [0, -30, 40, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      {/* Secondary Purple Orb */}
      <motion.div
        className="absolute bottom-[20%] right-[10%] w-[600px] h-[600px] rounded-full bg-secondary/15 blur-[120px] mix-blend-screen"
        animate={{
          x: [0, -60, 40, 0],
          y: [0, 50, -20, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Tertiary Green Orb */}
      <motion.div
        className="absolute top-[40%] left-[60%] w-[400px] h-[400px] rounded-full bg-success/10 blur-[100px] mix-blend-screen"
        animate={{
          x: [0, 30, -50, 0],
          y: [0, 60, -30, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Base Grid Overlay (Optional texturing) */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] opacity-20" />
    </div>
  );
}
