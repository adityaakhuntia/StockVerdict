'use client';

import { useState } from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, Tooltip, YAxis } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import GlassCard from '../ui/GlassCard';

interface ChartSectionProps {
  data: Array<{ time: string, price: number }>;
}

export default function ChartSection({ data }: ChartSectionProps) {
  const [timeFilter, setTimeFilter] = useState('1M');
  const [activeIndicators, setActiveIndicators] = useState<string[]>(['RSI']);

  const toggleIndicator = (ind: string) => {
    setActiveIndicators(prev => 
      prev.includes(ind) ? prev.filter(i => i !== ind) : [...prev, ind]
    );
  };

  return (
    <GlassCard className="w-full flex justify-center items-center flex-col p-0 overflow-hidden">
      <div className="w-full flex justify-between items-center px-6 py-4 border-b border-surface-border">
        <div className="flex gap-2">
          {['1D', '1W', '1M', '1Y'].map(tf => (
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              key={tf}
              onClick={() => setTimeFilter(tf)}
              className={`relative px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                timeFilter === tf 
                  ? 'text-primary' 
                  : 'text-foreground/60 hover:text-white'
              }`}
            >
              <span className="relative z-10">{tf}</span>
              {timeFilter === tf && (
                <motion.div 
                  layoutId="activeFilter"
                  className="absolute inset-0 bg-primary/20 border border-primary/50 rounded-md z-0"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </div>
        <div className="flex gap-2">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => toggleIndicator('RSI')}
            className={`px-3 py-1 rounded-md text-xs font-bold transition-colors ${
              activeIndicators.includes('RSI') ? 'bg-secondary/30 text-secondary border border-secondary/50 shadow-[0_0_15px_rgba(157,80,187,0.4)]' : 'bg-surface text-foreground/50'
            }`}
          >
            RSI
          </motion.button>
          <motion.button 
             whileHover={{ scale: 1.05 }}
             whileTap={{ scale: 0.95 }}
             onClick={() => toggleIndicator('MACD')}
             className={`px-3 py-1 rounded-md text-xs font-bold transition-colors ${
               activeIndicators.includes('MACD') ? 'bg-secondary/30 text-secondary border border-secondary/50 shadow-[0_0_15px_rgba(157,80,187,0.4)]' : 'bg-surface text-foreground/50'
             }`}
          >
            MACD
          </motion.button>
        </div>
      </div>
      
      <div className="w-full h-[300px] mt-6 px-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00D2FF" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#00D2FF" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="time" stroke="#555" axisLine={false} tickLine={false} tick={{fill: '#888', fontSize: 12}} />
            <YAxis hide domain={['dataMin - 2', 'dataMax + 2']} />
            <Tooltip 
              contentStyle={{ backgroundColor: 'rgba(19,19,19,0.8)', backdropFilter: 'blur(10px)', borderColor: '#333', borderRadius: '12px', boxShadow: '0 0 20px rgba(0,210,255,0.2)' }}
              itemStyle={{ color: '#00D2FF', fontWeight: 'bold' }}
              cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 2, strokeDasharray: '5 5' }}
              animationDuration={200}
            />
            <Area type="monotone" dataKey="price" stroke="#00D2FF" strokeWidth={4} fillOpacity={1} fill="url(#colorPrice)" isAnimationActive={true} animationDuration={1500} animationEasing="ease-out" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </GlassCard>
  );
}
