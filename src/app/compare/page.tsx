'use client';
import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Search, X, Crown, Activity, AlertTriangle, Loader2 } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import ScoreGauge from '@/components/ui/ScoreGauge';
import VerdictBadge from '@/components/ui/VerdictBadge';
import Link from 'next/link';
import { motion, Variants, AnimatePresence } from 'framer-motion';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 30 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
  exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } }
};

interface StockData {
  ticker: string;
  name: string;
  current_price: number;
  trend: number;
  score: number;
  verdict: 'BUY' | 'HOLD' | 'AVOID';
  error?: string;
}

export default function ComparePage() {
  const [selectedTickers, setSelectedTickers] = useState<string[]>(['AAPL', 'TSLA', 'NVDA']);
  const [stockData, setStockData] = useState<StockData[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Search State
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<{ ticker: string, name: string }[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Search Logic
  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      setIsSearching(false);
      return;
    }
    setIsSearching(true);
    const timer = setTimeout(async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
        const res = await fetch(`${API_URL}/search/${query}`);
        if (res.ok) {
          const data = await res.json();
          setResults(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
         setIsSearching(false);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  // Data Fetching Logic for selected tickers
  useEffect(() => {
    async function fetchCompareData() {
      if (selectedTickers.length === 0) {
        setStockData([]);
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
        const promises = selectedTickers.map(t => fetch(`${API_URL}/stock/${t}`).then(res => res.json()));
        const results = await Promise.all(promises);
        setStockData(results);
      } catch (err) {
        console.error("Failed to fetch compare data", err);
      } finally {
        setLoading(false);
      }
    }
    fetchCompareData();
  }, [selectedTickers]);

  const handleAddStock = (ticker: string) => {
    if (selectedTickers.includes(ticker)) return;
    
    // Max 3 stocks. If full, remove the oldest one (index 0)
    if (selectedTickers.length >= 3) {
      setSelectedTickers(prev => [...prev.slice(1), ticker]);
    } else {
      setSelectedTickers(prev => [...prev, ticker]);
    }
    
    setQuery("");
    setResults([]);
  };

  const handleRemoveStock = (tickerToRemove: string) => {
    setSelectedTickers(prev => prev.filter(t => t !== tickerToRemove));
  };

  // Determine the winner (valid stocks only)
  const validStocks = stockData.filter(s => !s.error);
  const winner = validStocks.length > 0 
    ? validStocks.reduce((prev, current) => (prev.score > current.score) ? prev : current) 
    : null;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col items-center overflow-x-hidden min-h-[90vh]">
      
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-10 w-full"
      >
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-4">Stock Warfare</h1>
        <p className="text-foreground/70 text-lg">Compare up to 3 stocks side-by-side to discover the ultimate algorithmic verdict.</p>
        
        {/* Search Input */}
        <div className="relative w-full max-w-xl mx-auto mt-8">
          <div className="flex items-center bg-surface border border-surface-border rounded-full px-5 py-3 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
            {isSearching ? <Loader2 className="w-5 h-5 text-primary animate-spin mr-3" /> : <Search className="w-5 h-5 text-primary mr-3" />}
            <input 
              type="text" 
              placeholder="Add stock to compare (e.g. MSFT, PLTR)..."
              className="bg-transparent border-none outline-none w-full text-base text-white uppercase"
              value={query}
              onChange={(e) => setQuery(e.target.value.toUpperCase())}
            />
          </div>
          {results.length > 0 && query.length >= 2 && (
            <div className="absolute top-14 left-0 w-full bg-[#1A1E24] border border-surface-border rounded-xl shadow-2xl p-2 z-50">
              {results.map((r, i) => (
                <button 
                  key={i} 
                  className="w-full text-left px-4 py-3 hover:bg-surface rounded-lg transition"
                  onClick={() => handleAddStock(r.ticker)}
                >
                  <span className="font-bold text-white block">{r.ticker}</span>
                  <span className="text-xs text-foreground/60">{r.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </motion.div>

      {/* Grid Layout */}
      {loading ? (
        <div className="w-full py-20 flex flex-col items-center gap-4">
           <Loader2 className="w-12 h-12 text-primary animate-spin" />
           <p className="text-foreground/50 font-medium">Running Matrix Comparison Models...</p>
        </div>
      ) : (
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl mb-16"
        >
          <AnimatePresence>
            {stockData.map((stock) => (
              <motion.div key={stock.ticker} variants={itemVariants} layout className="h-full relative">
                <button 
                  onClick={() => handleRemoveStock(stock.ticker)}
                  className="absolute -top-3 -right-3 z-50 bg-danger text-white p-1.5 rounded-full hover:scale-110 hover:bg-red-500 transition shadow-[0_0_10px_rgba(255,59,48,0.5)]"
                >
                  <X className="w-4 h-4" />
                </button>
                <GlassCard className="flex flex-col items-center p-8 relative overflow-hidden group h-full">
                  {/* Subtle glow on hover */}
                  <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-0 group-hover:opacity-10 transition-opacity duration-700 bg-gradient-to-b ${stock.score >= 70 ? 'from-success/50 to-success/10' : stock.score <= 40 ? 'from-danger/50 to-danger/10' : 'from-primary/50 to-secondary/10'} blur-[40px] pointer-events-none`} />
                  
                  {stock.error ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center relative z-10 w-full h-full">
                      <AlertTriangle className="w-10 h-10 text-danger mb-4" />
                      <h3 className="text-xl font-bold text-white">{stock.ticker}</h3>
                      <p className="text-danger text-sm mt-2">{stock.error}</p>
                    </div>
                  ) : (
                    <>
                      <div className="w-full flex justify-between items-start mb-8 relative z-10 gap-2">
                        <div className="flex-1 overflow-hidden">
                          <h3 className="text-xl font-bold text-white truncate max-w-[150px]">{stock.name}</h3>
                          <span className="text-sm font-mono text-foreground/50">{stock.ticker}</span>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <div className="text-xl font-semibold text-white">${stock.current_price.toFixed(2)}</div>
                          <div className={`text-sm font-medium flex items-center justify-end gap-1 ${stock.trend >= 0 ? 'text-success' : 'text-danger'}`}>
                            {stock.trend >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                            {stock.trend >= 0 ? '+' : ''}{stock.trend.toFixed(2)}%
                          </div>
                        </div>
                      </div>

                      <div className="w-full h-[1px] bg-surface-border mb-8 relative z-10" />

                      <div className="flex flex-col items-center scale-[0.85] mb-6 relative z-10">
                        <ScoreGauge score={stock.score} />
                      </div>

                      <div className="mb-8 relative z-10">
                        <VerdictBadge verdict={stock.verdict} size="lg" />
                      </div>

                      <div className="w-full bg-surface/50 rounded-xl p-4 border border-surface-border mb-6 flex-grow relative z-10 transition-colors group-hover:bg-surface/80">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-xs text-foreground/50">Momentum Edge</span>
                          <span className="text-xs font-mono text-white">{stock.score}/100</span>
                        </div>
                        <div className="w-full bg-surface-border h-1.5 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${stock.score}%` }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className={`h-full ${stock.score >= 70 ? 'bg-success shadow-[0_0_10px_rgba(34,197,94,0.5)]' : stock.score <= 40 ? 'bg-danger shadow-[0_0_10px_rgba(255,59,48,0.5)]' : 'bg-primary shadow-[0_0_10px_rgba(0,243,255,0.5)]'}`}
                          />
                        </div>
                      </div>

                      <Link href={`/dashboard?ticker=${stock.ticker}`} className="relative z-10 w-full py-3 rounded-full text-center text-sm font-bold bg-surface hover:bg-white/10 transition-colors border border-surface-border text-white group-hover:border-primary/50 group-hover:shadow-[0_0_15px_rgba(0,210,255,0.2)]">
                        Deep Dive
                      </Link>
                    </>
                  )}
                </GlassCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Final Verdict Crown Section */}
      {!loading && winner && validStocks.length > 1 && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.5 }}
          className="w-full max-w-6xl relative z-10"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 via-primary/20 to-secondary/20 blur-[60px] -z-10 rounded-full" />
          
          <GlassCard className="w-full flex flex-col md:flex-row items-center justify-between p-8 md:p-12 border-primary/30 shadow-[0_0_50px_rgba(0,243,255,0.15)] relative overflow-hidden">
             
             {/* Royal Background Shine */}
             <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-yellow-500/10 to-transparent pointer-events-none" />

             <div className="flex-1 pr-0 md:pr-12 text-center md:text-left mb-8 md:mb-0 relative z-10">
               <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border border-yellow-500/30 text-yellow-500 font-bold text-xs mb-6 uppercase tracking-widest bg-yellow-500/10 shadow-[0_0_20px_rgba(234,179,8,0.2)]">
                 <Crown className="w-4 h-4" /> Final Algorithm Verdict
               </div>
               <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">
                 {winner.name} is the clear choice.
               </h2>
               <p className="mt-4 text-foreground/70 text-base md:text-lg">
                 Based on real-time comparative momentum analysis across your selection, <strong className="text-white bg-white/10 px-2 py-0.5 rounded border border-white/20">{winner.ticker}</strong> exhibits the highest systemic strength with an overarching algorithmic score of <strong className="text-success">{winner.score}/100</strong>.
               </p>
               
               <div className="mt-8 flex gap-4 justify-center md:justify-start">
                  <Link href={`/dashboard?ticker=${winner.ticker}`} className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-black py-3 px-8 rounded-full shadow-[0_0_30px_rgba(234,179,8,0.4)] hover:shadow-[0_0_50px_rgba(234,179,8,0.6)] hover:scale-105 transition-all flex items-center gap-2">
                    Invest in {winner.ticker} <Activity className="w-5 h-5"/>
                  </Link>
               </div>
             </div>
             
             <div className="flex-shrink-0 flex flex-col items-center justify-center relative z-10 w-full md:w-auto mt-8 md:mt-0">
               <motion.div 
                 animate={{ y: [-10, 10, -10] }} 
                 transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                 className="relative"
               >
                 <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-yellow-500/30 rounded-full blur-[50px]" />
                 <ScoreGauge score={winner.score} />
               </motion.div>
               <div className="mt-8">
                  <VerdictBadge verdict={winner.verdict} size="lg" />
               </div>
             </div>
             
          </GlassCard>
        </motion.div>
      )}

      {/* Empty State */}
      {!loading && stockData.length === 0 && (
         <div className="w-full py-20 flex flex-col items-center text-center opacity-50">
           <Activity className="w-16 h-16 text-foreground/30 mb-6" />
           <h2 className="text-2xl font-bold text-white mb-2">Awaiting Targets</h2>
           <p className="text-foreground/70 max-w-md">Use the search bar above to pull real-time data for stocks side-by-side.</p>
         </div>
      )}

    </div>
  );
}
