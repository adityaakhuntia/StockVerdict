'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Activity } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 w-full z-50 p-6 flex justify-center pointer-events-none">
      <nav className="pointer-events-auto bg-surface/60 backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.6)] rounded-full px-6 py-3.5 flex items-center justify-between gap-12 w-full max-w-4xl transition-all hover:bg-surface/80 hover:border-white/20">
        
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="bg-gradient-to-br from-primary to-secondary p-2 rounded-xl shadow-[0_0_15px_rgba(0,243,255,0.3)] group-hover:scale-110 transition-transform duration-300">
            <Activity className="text-white w-5 h-5 flex-shrink-0" />
          </div>
          <span className="text-xl font-black tracking-tight text-white group-hover:text-primary transition-colors">
            StockVerdict
          </span>
        </Link>
        
        {/* LINKS */}
        <div className="hidden md:flex items-center justify-center gap-10 font-bold text-sm flex-1">
          <Link 
            href="/dashboard" 
            className={`transition-all duration-300 relative ${pathname === '/dashboard' ? 'text-primary drop-shadow-[0_0_12px_rgba(0,243,255,0.8)]' : 'text-foreground/70 hover:text-white'}`}
          >
            Dashboard
            {pathname === '/dashboard' && (
              <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full shadow-[0_0_10px_rgba(0,243,255,1)]" />
            )}
          </Link>
          <Link 
            href="/compare" 
            className={`transition-all duration-300 relative ${pathname === '/compare' ? 'text-secondary drop-shadow-[0_0_12px_rgba(168,85,247,0.8)]' : 'text-foreground/70 hover:text-white'}`}
          >
            Compare
            {pathname === '/compare' && (
              <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-secondary rounded-full shadow-[0_0_10px_rgba(168,85,247,1)]" />
            )}
          </Link>
        </div>

        {/* CTA */}
        <button className="hidden md:flex items-center bg-white text-black hover:bg-gray-200 font-bold py-2.5 px-6 rounded-full transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] hover:scale-105 active:scale-95">
          Get Started
        </button>
        
      </nav>
    </header>
  );
}
