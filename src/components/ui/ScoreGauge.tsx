'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

interface ScoreGaugeProps {
  score: number;
}

export default function ScoreGauge({ score }: ScoreGaugeProps) {
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  let glowColor = '';
  let strokeColor = 'stroke-primary';
  
  if (score >= 70) {
    strokeColor = 'stroke-success';
    glowColor = 'bg-success/30 shadow-[0_0_60px_20px_rgba(43,182,115,0.4)]';
  } else if (score <= 40) {
    strokeColor = 'stroke-danger';
    glowColor = 'bg-danger/30 shadow-[0_0_60px_20px_rgba(255,59,48,0.4)]';
  } else {
    strokeColor = 'stroke-warning';
    glowColor = 'bg-warning/30 shadow-[0_0_60px_20px_rgba(245,166,35,0.4)]';
  }

  // Animated Counter
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);
  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    const animation = animate(count, score, { duration: 1.5, ease: "easeOut" });
    const unsubscribe = rounded.on("change", (v) => setDisplayScore(v));
    return () => {
      animation.stop();
      unsubscribe();
    };
  }, [score, count, rounded]);

  return (
    <motion.div 
      className="relative flex items-center justify-center"
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    >
      {/* Breathing background glow */}
      <motion.div 
        className={`absolute rounded-full w-48 h-48 blur-[20px] ${glowColor}`}
        animate={{ scale: [1, 1.1, 1], opacity: [0.6, 0.8, 0.6] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      ></motion.div>

      <svg className="w-56 h-56 transform -rotate-90 z-10 drop-shadow-xl" viewBox="0 0 200 200">
        <circle
          className="text-surface-border stroke-current"
          strokeWidth="12"
          fill="transparent"
          r={radius}
          cx="100"
          cy="100"
        />
        <motion.circle
          className={`${strokeColor}`}
          strokeWidth="12"
          strokeLinecap="round"
          fill="transparent"
          r={radius}
          cx="100"
          cy="100"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          style={{ strokeDasharray: circumference }}
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center z-20">
        <motion.span className="text-5xl font-black text-white tracking-tighter">
          {displayScore}
        </motion.span>
        <span className="text-sm text-foreground/60 uppercase tracking-widest mt-1 font-semibold">
          Score
        </span>
      </div>
    </motion.div>
  );
}
