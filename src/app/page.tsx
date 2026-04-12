'use client';
import { motion, useScroll, useTransform, Variants } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, BarChart2, Zap, ShieldCheck } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.3 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export default function Home() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, -100]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -50]);

  return (
    <div className="w-full flex-col flex items-center justify-center pt-16 pb-32 overflow-hidden px-4 md:px-0">
      
      {/* Background Graphic / Glow */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.3, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute top-[-10%] left-1/2 transform -translate-x-1/2 w-full max-w-4xl h-[400px] glow-primary rounded-full blur-[120px] pointer-events-none -z-10" 
      />

      {/* Hero Section */}
      <motion.div 
        style={{ y: y1 }}
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-4xl text-center flex flex-col items-center mt-12"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-primary/20 text-primary font-medium text-sm mb-6">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          Live real-time market data
        </div>
        
        <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.1] text-white">
          <span className="text-gradient">Clarity</span> before <br/> you invest.
        </h1>
        
        <p className="mt-6 text-lg md:text-xl text-foreground/70 max-w-2xl font-light">
          A real-time stock intelligence platform that delivers instant <strong className="text-success font-semibold px-2">BUY</strong>, <strong className="text-warning font-semibold pr-2">HOLD</strong>, or <strong className="text-danger font-semibold pr-2">AVOID</strong> decisions using institutional-grade data.
        </p>
        
        <div className="mt-10 flex gap-4 w-full md:w-auto">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/dashboard" className="w-full md:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-secondary text-primary-foreground font-bold py-4 px-8 rounded-full shadow-[0_0_30px_5px_rgba(0,210,255,0.4)] hover:shadow-[0_0_40px_10px_rgba(0,210,255,0.6)] transition-all">
              Analyze a Stock <ArrowRight className="w-5 h-5 group-hover:translate-x-1" />
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/compare" className="w-full md:w-auto flex items-center justify-center gap-2 glass-card font-semibold py-4 px-8 rounded-full hover:bg-surface-border transition-all">
              Compare Stocks
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Features Grid */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        style={{ y: y2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full mt-32 px-6 relative z-10"
      >
        <motion.div variants={itemVariants} className="h-full">
          <GlassCard className="flex flex-col items-start p-8 relative overflow-hidden group h-full border-secondary/10 hover:border-secondary/40 transition-all duration-500 hover:shadow-[0_0_40px_rgba(168,85,247,0.15)] hover:-translate-y-2">
            <div className="absolute top-0 right-0 w-48 h-48 bg-secondary/10 rounded-full blur-[60px] group-hover:bg-secondary/20 transition-all duration-500 pointer-events-none" />
            <div className="p-3.5 rounded-2xl bg-gradient-to-br from-secondary/20 to-transparent mb-8 border border-secondary/20 group-hover:scale-110 shadow-lg shadow-secondary/5 transition-transform duration-500">
              <Zap className="w-6 h-6 text-secondary" />
            </div>
            <h3 className="text-xl font-black mb-3 text-white tracking-wide">AI Analysis</h3>
            <p className="text-foreground/60 leading-relaxed font-light text-sm">
              Our algorithms process thousands of data points to generate plain-English explanations for complex market moves.
            </p>
          </GlassCard>
        </motion.div>

        <motion.div variants={itemVariants} className="h-full">
          <GlassCard className="flex flex-col items-start p-8 relative overflow-hidden group h-full border-primary/10 hover:border-primary/40 transition-all duration-500 hover:shadow-[0_0_40px_rgba(0,243,255,0.15)] hover:-translate-y-2">
            <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 rounded-full blur-[60px] group-hover:bg-primary/20 transition-all duration-500 pointer-events-none" />
            <div className="p-3.5 rounded-2xl bg-gradient-to-br from-primary/20 to-transparent mb-8 border border-primary/20 group-hover:scale-110 shadow-lg shadow-primary/5 transition-transform duration-500">
              <BarChart2 className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-black mb-3 text-white tracking-wide">Real-Time Data</h3>
            <p className="text-foreground/60 leading-relaxed font-light text-sm">
              Stay ahead of the curve with up-to-the-millisecond pricing, volume, and momentum indicators.
            </p>
          </GlassCard>
        </motion.div>

        <motion.div variants={itemVariants} className="h-full">
          <GlassCard className="flex flex-col items-start p-8 relative overflow-hidden group h-full border-success/10 hover:border-success/40 transition-all duration-500 hover:shadow-[0_0_40px_rgba(34,197,94,0.15)] hover:-translate-y-2">
             <div className="absolute top-0 right-0 w-48 h-48 bg-success/10 rounded-full blur-[60px] group-hover:bg-success/20 transition-all duration-500 pointer-events-none" />
            <div className="p-3.5 rounded-2xl bg-gradient-to-br from-success/20 to-transparent mb-8 border border-success/20 group-hover:scale-110 shadow-lg shadow-success/5 transition-transform duration-500">
              <ShieldCheck className="w-6 h-6 text-success" />
            </div>
            <h3 className="text-xl font-black mb-3 text-white tracking-wide">Smart Verdicts</h3>
            <p className="text-foreground/60 leading-relaxed font-light text-sm">
              No more second-guessing. Get a definitive Buy, Hold, or Avoid verdict with our proprietary confidence score.
            </p>
          </GlassCard>
        </motion.div>
      </motion.div>
    </div>
  );
}
