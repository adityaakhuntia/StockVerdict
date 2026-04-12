'use client';
import { motion } from 'framer-motion';

interface VerdictBadgeProps {
  verdict: 'BUY' | 'HOLD' | 'AVOID';
  size?: 'sm' | 'lg';
}

export default function VerdictBadge({ verdict, size = 'sm' }: VerdictBadgeProps) {
  let colors = '';
  
  if (verdict === 'BUY') {
    colors = 'bg-success/20 text-success border-success/30 shadow-[0_0_20px_rgba(43,182,115,0.6)]';
  } else if (verdict === 'HOLD') {
    colors = 'bg-warning/20 text-warning border-warning/30 shadow-[0_0_20px_rgba(245,166,35,0.6)]';
  } else {
    colors = 'bg-danger/20 text-danger border-danger/30 shadow-[0_0_20px_rgba(255,59,48,0.6)]';
  }

  const sizing = size === 'lg' ? 'px-8 py-3 text-2xl font-black' : 'px-4 py-1 text-sm font-bold';

  return (
    <motion.div 
      initial={{ scale: 0.5, opacity: 0, filter: 'brightness(2)' }}
      animate={{ scale: 1, opacity: 1, filter: 'brightness(1)' }}
      transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.2 }}
      className={`inline-flex items-center justify-center border rounded-full uppercase tracking-widest ${colors} ${sizing}`}
    >
      {verdict}
    </motion.div>
  );
}
