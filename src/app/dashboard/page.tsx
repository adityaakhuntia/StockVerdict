'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Search, Info, TrendingUp, TrendingDown, AlertTriangle, Loader2 } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import ScoreGauge from '@/components/ui/ScoreGauge';
import VerdictBadge from '@/components/ui/VerdictBadge';
import ChartSection from '@/components/dashboard/ChartSection';
import { motion, Variants } from 'framer-motion';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

interface StockData {
  ticker: string;
  name: string;
  current_price: number;
  trend: number;
  score: number;
  verdict: 'BUY' | 'HOLD' | 'AVOID';
  chartData: Array<{ time: string; price: number }>;
}

interface Categories {
  us?: string[];
  indian?: string[];
}

function DashboardContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const initialTicker = searchParams?.get('ticker') || 'NVDA';
  const [tickerInput, setTickerInput] = useState("");
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<StockData | null>(null);
  const [categories, setCategories] = useState<Categories | null>(null);

  useEffect(() => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
    // Fetch categories and initial stock data
    fetch(`${API_URL}/stocks/categories`)
      .then(res => res.json())
      .then(d => setCategories(d))
      .catch(console.error);
  }, []);

  useEffect(() => {
    async function fetchStock() {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API_URL}/stock/${initialTicker}`);
        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.detail || "Stock not found");
        }
        const respData = await res.json();
        setData(respData);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchStock();
  }, [initialTicker]);

  const handleManualSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if(tickerInput.trim()) {
      router.push(`/dashboard?ticker=${tickerInput.trim()}`);
    }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="max-w-7xl mx-auto px-6 py-8 w-full flex flex-col gap-8 pb-32"
    >
      
      {/* Top Search Bar */}
      <motion.div variants={itemVariants} className="w-full">
        <form onSubmit={handleManualSearch} className="w-full">
          <GlassCard className="flex items-center gap-4 py-4 px-6 rounded-full w-full max-w-2xl mx-auto shadow-[0_0_20px_5px_rgba(0,0,0,0.4)]">
            <Search className="text-foreground/40 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Enter ANY valid ticker, e.g. TSLA, INFY.NS" 
              className="bg-transparent border-none outline-none w-full text-lg placeholder:text-foreground/40 text-white uppercase"
              value={tickerInput}
              onChange={(e) => setTickerInput(e.target.value.toUpperCase())}
            />
            <button type="submit" className="bg-surface p-2 rounded-lg text-xs font-mono border border-surface-border hover:bg-white/10 transition">
              ENT
            </button>
          </GlassCard>
        </form>
      </motion.div>

      {/* Categories Bar */}
      <motion.div variants={itemVariants} className="flex justify-center flex-wrap gap-2">
         {categories && [...(categories.us || []), ...(categories.indian || [])].map((t) => (
           <button 
             key={t}
             onClick={() => router.push(`/dashboard?ticker=${t}`)}
             className={`px-4 py-1.5 rounded-full text-sm font-semibold transition ${
               initialTicker === t 
                ? 'bg-primary text-primary-foreground shadow-[0_0_15px_rgba(0,243,255,0.4)]' 
                : 'glass-card text-foreground/70 hover:text-white border border-surface-border hover:border-primary/50'
             }`}
           >
             {t}
           </button>
         ))}
      </motion.div>

      {loading && (
         <div className="flex flex-col items-center justify-center py-32 space-y-4">
           <Loader2 className="w-12 h-12 text-primary animate-spin" />
           <p className="text-foreground/60 font-medium animate-pulse">Analyzing {initialTicker} with Institutional Models...</p>
         </div>
      )}

      {!loading && error && (
         <div className="flex flex-col items-center justify-center py-32 space-y-4">
           <AlertTriangle className="w-12 h-12 text-danger" />
           <p className="text-danger shadow-danger text-lg font-bold">{error}</p>
         </div>
      )}

      {!loading && !error && data && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-4">
          {/* Left Column: Score & Verdict */}
          <motion.div variants={itemVariants} className="lg:col-span-1 flex flex-col gap-6">
            <GlassCard className="flex flex-col items-center py-12 relative overflow-hidden border-t-0 hover:border-primary/50 transition-colors duration-500 group">
              {/* Soft background glow */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary opacity-5 group-hover:opacity-10 transition-opacity duration-500 rounded-full blur-[60px] pointer-events-none" />
              
              <h2 className="text-xl font-bold mb-8 relative z-10">StockVerdict Score</h2>
              <div className="relative z-10"><ScoreGauge score={data.score} /></div>
              
              <div className="mt-10 relative z-10">
                <VerdictBadge verdict={data.verdict} size="lg" />
              </div>

              <div className="grid grid-cols-2 gap-4 w-full mt-10 relative z-10">
                <div className="bg-surface/50 p-4 rounded-xl text-center border border-surface-border transition-colors hover:bg-surface">
                  <div className="text-sm text-foreground/50 mb-1">Momentum</div>
                  <div className="text-xl font-bold text-white">Algorithm</div>
                </div>
                <div className="bg-surface/50 p-4 rounded-xl text-center border border-surface-border transition-colors hover:bg-surface">
                  <div className="text-sm text-foreground/50 mb-1">Risk Level</div>
                  <div className={`text-xl font-bold ${data.score >= 70 ? 'text-success' : data.score <= 40 ? 'text-danger' : 'text-warning'}`}>
                    {data.score >= 70 ? 'Low' : data.score <= 40 ? 'High' : 'Medium'}
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* Right Column: Charts & Insights */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            
            {/* Chart Section */}
            <motion.div variants={itemVariants} className="w-full">
              <div className="mb-4 ml-1 flex flex-col md:flex-row justify-between items-start md:items-end gap-2">
                <div>
                  <h1 className="text-3xl font-black tracking-tight flex flex-wrap items-center gap-3">
                    {data.name} <span className="text-sm px-2 py-1 rounded bg-surface border border-surface-border font-mono text-foreground/60">{data.ticker}</span>
                  </h1>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-2xl font-semibold">${data.current_price.toFixed(2)}</span>
                    <span className={`font-medium flex items-center text-sm px-2 py-1 rounded ${data.trend >= 0 ? 'text-success bg-success/10' : 'text-danger bg-danger/10'}`}>
                      {data.trend >= 0 ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
                      {data.trend >= 0 ? '+' : ''}{data.trend.toFixed(2)}%
                    </span>
                  </div>
                </div>
              </div>
              
              <ChartSection data={data.chartData} />
            </motion.div>

             {/* AI Report Section */}
             <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <GlassCard className="p-6 transition-all hover:shadow-[0_0_30px_rgba(0,210,255,0.15)] group">
                  <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-white">
                    <Info className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" /> Model Analysis
                  </h3>
                  <p className="text-foreground/70 text-sm leading-relaxed mb-4">
                    Based on recent volume moving average convergence, {data.ticker} exhibits 
                    a quantitative score of <strong>{data.score}/100</strong>.
                  </p>
                  <div className="w-full h-[1px] bg-surface-border my-4" />
                  <div className="flex items-start gap-3">
                    <div className={`mt-1 w-2 h-2 rounded-full ${data.score >= 50 ? 'bg-success' : 'bg-warning'} flex-shrink-0 animate-pulse`} />
                    <p className="text-xs text-foreground/60">Live algorithm assessment fetched from historical trendlines.</p>
                  </div>
                </GlassCard>
                
                <GlassCard className={`p-6 border ${data.score <= 40 ? 'border-danger/20 hover:bg-danger/5 hover:border-danger/30 hover:shadow-[0_0_30px_rgba(255,59,48,0.1)]' : 'border-surface-border hover:bg-surface'} transition-all group`}>
                  <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-white">
                    <AlertTriangle className={`w-5 h-5 ${data.score <= 40 ? 'text-danger' : 'text-warning'} group-hover:scale-110 transition-transform`} /> 
                    Risks
                  </h3>
                  <div className="flex flex-col gap-3">
                    <div className="bg-surface/50 p-3 rounded-lg border border-surface-border">
                      <p className="text-xs text-foreground/70">
                        Always evaluate fundamental macro-conditions and sector sentiment outside of quantitative analysis.
                      </p>
                    </div>
                  </div>
                </GlassCard>
             </motion.div>
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={
       <div className="w-full h-screen flex justify-center items-center">
         <Loader2 className="w-12 h-12 text-primary animate-spin" />
       </div>
    }>
       <DashboardContent />
    </Suspense>
  )
}
