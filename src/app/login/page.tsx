"use client";

import { useState } from "react";
import { login, signup } from "./actions";
import { ArrowRight, Sprout } from "lucide-react";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    const formData = new FormData(e.currentTarget);
    
    let result;
    if (isLogin) {
      result = await login(formData);
    } else {
      result = await signup(formData);
    }
    
    if (result?.error) {
      setError(result.error);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 relative bg-gradient-to-br from-[#e6f4ea] to-white overflow-hidden text-[#191c1b] font-sans">
      
      {/* Background Dot Grid */}
      <div 
        className="absolute inset-0 z-0 opacity-10 pointer-events-none" 
        style={{ 
          backgroundImage: "radial-gradient(#1B835E 1.5px, transparent 1.5px)", 
          backgroundSize: "32px 32px" 
        }} 
      />

      {/* Subtle Geometric Network Lines on Right Side */}
      <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-1/2 z-0 pointer-events-none">
        <svg width="100%" height="100%" className="opacity-[0.04]">
          <pattern id="network" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
            <circle cx="20" cy="20" r="3" fill="#1B835E" />
            <circle cx="180" cy="80" r="4" fill="#1B835E" />
            <circle cx="80" cy="160" r="2" fill="#1B835E" />
            <line x1="20" y1="20" x2="180" y2="80" stroke="#1B835E" strokeWidth="1" />
            <line x1="180" y1="80" x2="80" y2="160" stroke="#1B835E" strokeWidth="1" />
            <line x1="80" y1="160" x2="20" y2="20" stroke="#1B835E" strokeWidth="1" />
          </pattern>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#network)" />
        </svg>
      </div>

      {/* Left Side: Login Form */}
      <div className="relative z-10 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md bg-white p-8 sm:p-12 shadow-[0_20px_60px_-15px_rgba(27,131,94,0.15)] rounded-[2.5rem] relative">
          
          <div className="flex flex-col items-center text-center mb-10">
            <div className="w-16 h-16 bg-[#1B835E] rounded-2xl flex items-center justify-center mb-5 shadow-lg shadow-emerald-500/20">
              <Sprout size={32} className="text-white" />
            </div>
            <h1 className="text-3xl font-extrabold text-[#1B835E] tracking-tight">Krishi Bandhu</h1>
            <p className="text-[#404943] text-sm mt-1.5 font-medium">Your Intelligent Farmer Assistant</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">
                EMAIL ADDRESS
              </label>
              <input 
                name="email"
                type="email" 
                required
                placeholder="farmer@example.com"
                className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm font-semibold focus:outline-none focus:border-[#1B835E] focus:ring-2 focus:ring-[#1B835E]/10 transition-all placeholder:text-slate-300 placeholder:font-normal"
              />
            </div>
            
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">
                PASSWORD
              </label>
              <input 
                name="password"
                type="password" 
                required
                placeholder="••••••••"
                className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm font-semibold focus:outline-none focus:border-[#1B835E] focus:ring-2 focus:ring-[#1B835E]/10 transition-all placeholder:text-slate-300 placeholder:font-normal"
              />
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 text-xs p-3.5 rounded-xl border border-red-100 font-bold animate-fade-in">
                {error}
              </div>
            )}

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-[#166b4c] hover:bg-[#12583e] text-white font-bold py-4 px-4 rounded-xl flex items-center justify-center gap-2 transition-transform active:scale-[0.98] shadow-lg shadow-emerald-700/20 disabled:opacity-70 mt-4"
            >
              {isLoading ? (
                <span className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  {isLogin ? "Sign In" : "Create Account"}
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <div className="mt-10 text-center">
            <p className="text-xs text-[#404943] font-semibold">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button 
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError(null);
                }}
                type="button"
                className="ml-1.5 text-[#1B835E] font-bold hover:underline focus:outline-none"
              >
                {isLogin ? "Sign Up" : "Sign In"}
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side: Typography & Quote */}
      <div className="relative z-10 hidden lg:flex flex-col justify-center px-12 xl:px-24">
        <h2 className="text-4xl xl:text-5xl font-serif text-[#0e3b2a] leading-[1.15] mb-12 tracking-tight">
          "The true foundation of our nation is in the hands that tend the soil."
        </h2>
        
        <div className="space-y-6 text-[#224f3c] font-medium text-lg xl:text-xl leading-relaxed max-w-2xl">
          <p>
            <span className="font-bold text-[#1B835E]">Krishi Bandhu:</span> Your Intelligent Farm Partner. Combining a rich agricultural heritage with AI-driven precision.
          </p>
          <p>
            Access critical market data, climate forecasts, and real-time disease diagnostics to maximize your yield.
          </p>
          <p>
            Our mission is a sustainable and prosperous ecosystem for your family and your land.
          </p>
        </div>
      </div>
    </div>
  );
}
