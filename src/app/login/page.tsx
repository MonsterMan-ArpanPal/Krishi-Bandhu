"use client";

import { useState } from "react";
import { login, signup } from "./actions";
import { ArrowRight, Sprout, Mail, Lock, TrendingUp, Leaf, Sparkles } from "lucide-react";

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
    <div className="min-h-screen relative flex items-center justify-center p-4 md:p-10 bg-emerald-50 text-slate-800 overflow-x-hidden selection:bg-[#1B835E] selection:text-white font-sans">
      
      {/* Background Image Layer - Sunny & Vibrant */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-100"
        style={{ 
          backgroundImage: "url('/login_background.png')" 
        }} 
      />
      
      {/* Light Overlay to keep the screen bright and cohesive */}
      <div className="absolute inset-0 z-0 bg-white/15 backdrop-blur-[1px] pointer-events-none" />

      {/* Gentle Radial Light highlights for depth */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-white/30 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-emerald-100/40 rounded-full blur-[140px] pointer-events-none z-0" />

      {/* Content Container */}
      <div className="relative w-full max-w-6.5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center z-10 py-6">
        
        {/* Left Side: Login Form (Frosted Light Glassmorphism Card) */}
        <div className="lg:col-span-5 order-2 lg:order-1 relative group">
          {/* Subtle Outer Card Glow */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-white/40 to-emerald-400/20 rounded-[2.5rem] blur-xl opacity-80 group-hover:opacity-100 transition duration-1000" />
          
          <div className="relative bg-white/70 backdrop-blur-2xl border border-white/50 p-8 sm:p-10 shadow-[0_30px_70px_-15px_rgba(4,40,25,0.15)] rounded-[2.5rem] flex flex-col justify-between">
            
            <div>
              {/* Header Logo */}
              <div className="flex flex-col items-center text-center mb-8">
                <div className="w-14 h-14 bg-gradient-to-br from-[#1B835E] to-emerald-600 rounded-2xl flex items-center justify-center mb-4 shadow-md shadow-emerald-950/20 border border-white/20">
                  <Sprout size={28} className="text-white animate-pulse" />
                </div>
                <h1 className="text-3xl font-extrabold text-[#062419] tracking-tight">
                  Krishi Bandhu
                </h1>
                <p className="text-emerald-700/80 font-bold text-xs mt-1 uppercase tracking-wider">
                  Intelligent Farmer Assistant
                </p>
              </div>

              {/* Form fields */}
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-[10px] font-bold text-emerald-800 uppercase tracking-widest mb-2 ml-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-emerald-600">
                      <Mail size={16} />
                    </span>
                    <input 
                      name="email"
                      type="email" 
                      required
                      placeholder="farmer@example.com"
                      className="w-full bg-white/80 border border-emerald-100 rounded-xl pl-11 pr-4 py-3.5 text-sm font-semibold focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all placeholder:text-slate-400 text-[#062419] shadow-sm"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-[10px] font-bold text-emerald-800 uppercase tracking-widest mb-2 ml-1">
                    Password
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-emerald-600">
                      <Lock size={16} />
                    </span>
                    <input 
                      name="password"
                      type="password" 
                      required
                      placeholder="••••••••"
                      className="w-full bg-white/80 border border-emerald-100 rounded-xl pl-11 pr-4 py-3.5 text-sm font-semibold focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all placeholder:text-slate-400 text-[#062419] shadow-sm"
                    />
                  </div>
                </div>

                {error && (
                  <div className="bg-red-50 text-red-600 text-xs p-3.5 rounded-xl border border-red-200 font-semibold animate-fade-in">
                    {error}
                  </div>
                )}

                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full bg-[#1B835E] hover:bg-[#12583e] text-white font-bold py-4 px-4 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-lg shadow-emerald-800/20 border border-emerald-400/20 disabled:opacity-70 mt-6 cursor-pointer"
                >
                  {isLoading ? (
                    <span className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>{isLogin ? "Sign In" : "Create Account"}</span>
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Form Toggle Link */}
            <div className="mt-8 text-center border-t border-slate-200 pt-6">
              <p className="text-xs text-slate-500 font-semibold">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
                <button 
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setError(null);
                  }}
                  type="button"
                  className="ml-1.5 text-[#1B835E] font-bold hover:text-emerald-800 transition-colors focus:outline-none cursor-pointer hover:underline"
                >
                  {isLogin ? "Sign Up" : "Sign In"}
                </button>
              </p>
            </div>

          </div>
        </div>

        {/* Right Side: Typography & Quote (Matching Frosted Glassmorphism Card) */}
        <div className="lg:col-span-7 order-1 lg:order-2 flex flex-col justify-center relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-white/30 to-emerald-400/10 rounded-[2.5rem] blur-xl opacity-75 pointer-events-none" />
          
          <div className="relative bg-white/50 backdrop-blur-xl border border-white/40 p-8 sm:p-10 shadow-[0_30px_70px_-15px_rgba(4,40,25,0.1)] rounded-[2.5rem] flex flex-col justify-center space-y-8">
            
            {/* Quote Block */}
            <div className="relative">
              <span className="absolute -top-10 -left-6 text-[#1B835E]/5 text-9xl font-serif pointer-events-none">&ldquo;</span>
              <h2 className="text-3.5xl sm:text-4xl xl:text-4.5xl font-serif font-bold text-[#062419] leading-tight tracking-tight relative z-10">
                &quot;The true foundation of our nation is in the hands that tend the soil.&quot;
              </h2>
            </div>
            
            {/* Divider line */}
            <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full shadow-sm" />

            {/* Feature Lists with Premium Glass Cards */}
            <div className="space-y-4">
              {/* Feature 1 */}
              <div className="flex gap-4 p-4 rounded-2xl bg-white/60 border border-white/40 hover:border-emerald-300/40 hover:bg-white/80 transition-all duration-300 group shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-[#1B835E] shrink-0 group-hover:scale-110 transition-transform">
                  <Sparkles size={20} />
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-[#062419] text-base md:text-lg">
                    Krishi Bandhu: <span className="text-[#1B835E]">Your Intelligent Farm Partner</span>
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Combining a rich agricultural heritage with AI-driven precision to provide instant guidance.
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex gap-4 p-4 rounded-2xl bg-white/60 border border-white/40 hover:border-emerald-300/40 hover:bg-white/80 transition-all duration-300 group shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-[#1B835E] shrink-0 group-hover:scale-110 transition-transform">
                  <TrendingUp size={20} />
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-[#062419] text-base md:text-lg">
                    Market Data & Climate Forecasts
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Access critical market data, climate forecasts, and real-time disease diagnostics to maximize your yield.
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="flex gap-4 p-4 rounded-2xl bg-white/60 border border-white/40 hover:border-emerald-300/40 hover:bg-white/80 transition-all duration-300 group shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-[#1B835E] shrink-0 group-hover:scale-110 transition-transform">
                  <Leaf size={20} />
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-[#062419] text-base md:text-lg">
                    Sustainable & Prosperous Ecosystem
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Our mission is to foster a sustainable, highly-profitable ecosystem for your family and your land.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
