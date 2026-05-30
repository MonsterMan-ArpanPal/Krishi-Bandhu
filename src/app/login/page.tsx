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
    <div className="min-h-screen relative flex items-center justify-center p-4 md:p-10 bg-emerald-950 text-white overflow-x-hidden selection:bg-[#1B835E] selection:text-white font-sans">
      
      {/* Background Image Layer - Clean and Vibrant */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-100"
        style={{ 
          backgroundImage: "url('/login_background.png')" 
        }} 
      />
      
      {/* Premium Cinematic Vignette Overlay - Keeps background highly visible while ensuring text is readable */}
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-black/80 via-black/40 to-black/85 pointer-events-none" />
      <div className="absolute inset-0 z-0 bg-[#062419]/20 backdrop-blur-[0.5px] pointer-events-none" />

      {/* Ambient Radial Lights to enhance the premium depth */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-emerald-400/20 rounded-full blur-[130px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-teal-400/15 rounded-full blur-[150px] pointer-events-none z-0" />

      {/* Content Container */}
      <div className="relative w-full max-w-6.5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center z-10 py-6">
        
        {/* Left Side: Login Form (Premium Glassmorphism Card) */}
        <div className="lg:col-span-5 order-2 lg:order-1 relative group">
          {/* Subtle Outer Card Glow */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-white/10 to-emerald-400/20 rounded-[2.5rem] blur-xl opacity-60 group-hover:opacity-85 transition duration-1000" />
          
          <div className="relative bg-white/10 backdrop-blur-2xl border border-white/20 p-8 sm:p-10 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.6)] rounded-[2.5rem] flex flex-col justify-between">
            
            <div>
              {/* Header Logo */}
              <div className="flex flex-col items-center text-center mb-8">
                <div className="w-14 h-14 bg-gradient-to-br from-[#1B835E] to-emerald-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-black/30 border border-white/20">
                  <Sprout size={28} className="text-white animate-pulse" />
                </div>
                <h1 className="text-3xl font-extrabold text-white tracking-tight drop-shadow-sm">
                  Krishi Bandhu
                </h1>
                <p className="text-emerald-300 font-semibold text-xs mt-1 uppercase tracking-wider">
                  Intelligent Farmer Assistant
                </p>
              </div>

              {/* Form fields */}
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-[10px] font-bold text-emerald-300 uppercase tracking-widest mb-2 ml-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-emerald-300/70">
                      <Mail size={16} />
                    </span>
                    <input 
                      name="email"
                      type="email" 
                      required
                      placeholder="farmer@example.com"
                      className="w-full bg-black/20 border border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-sm font-semibold focus:outline-none focus:border-emerald-300 focus:ring-4 focus:ring-emerald-500/20 transition-all placeholder:text-white/20 text-white"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-[10px] font-bold text-emerald-300 uppercase tracking-widest mb-2 ml-1">
                    Password
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-emerald-300/70">
                      <Lock size={16} />
                    </span>
                    <input 
                      name="password"
                      type="password" 
                      required
                      placeholder="••••••••"
                      className="w-full bg-black/20 border border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-sm font-semibold focus:outline-none focus:border-emerald-300 focus:ring-4 focus:ring-emerald-500/20 transition-all placeholder:text-white/20 text-white"
                    />
                  </div>
                </div>

                {error && (
                  <div className="bg-red-500/20 text-red-200 text-xs p-3.5 rounded-xl border border-red-500/30 font-semibold animate-fade-in">
                    {error}
                  </div>
                )}

                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-[#1B835E] to-emerald-600 hover:from-emerald-500 hover:to-emerald-600 text-white font-bold py-4 px-4 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-lg shadow-black/40 border border-white/10 disabled:opacity-70 mt-6 cursor-pointer"
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
            <div className="mt-8 text-center border-t border-white/10 pt-6">
              <p className="text-xs text-emerald-300/80 font-semibold">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
                <button 
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setError(null);
                  }}
                  type="button"
                  className="ml-1.5 text-white font-bold hover:text-emerald-200 transition-colors focus:outline-none cursor-pointer hover:underline"
                >
                  {isLogin ? "Sign Up" : "Sign In"}
                </button>
              </p>
            </div>

          </div>
        </div>

        {/* Right Side: Typography & Quote */}
        <div className="lg:col-span-7 order-1 lg:order-2 flex flex-col justify-center space-y-8 px-4 lg:px-6">
          {/* Quote Block */}
          <div className="relative">
            <span className="absolute -top-10 -left-6 text-white/5 text-9xl font-serif pointer-events-none">&ldquo;</span>
            <h2 className="text-3.5xl sm:text-4xl xl:text-5xl font-serif font-medium text-white leading-tight tracking-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)] relative z-10">
              &quot;The true foundation of our nation is in the hands that tend the soil.&quot;
            </h2>
          </div>
          
          {/* Divider line */}
          <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-teal-300 rounded-full shadow-sm" />

          {/* Feature Lists with Premium Glass Cards */}
          <div className="space-y-4 max-w-2xl">
            {/* Feature 1 */}
            <div className="flex gap-4 p-5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all duration-300 group">
              <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-emerald-300 shrink-0 group-hover:scale-110 transition-transform">
                <Sparkles size={20} />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-base md:text-lg">
                  Krishi Bandhu: <span className="text-emerald-300">Your Intelligent Farm Partner</span>
                </h3>
                <p className="text-emerald-200/80 text-sm leading-relaxed">
                  Combining a rich agricultural heritage with AI-driven precision to provide instant guidance.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex gap-4 p-5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all duration-300 group">
              <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-emerald-300 shrink-0 group-hover:scale-110 transition-transform">
                <TrendingUp size={20} />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-base md:text-lg">
                  Market Data & Climate Forecasts
                </h3>
                <p className="text-emerald-200/80 text-sm leading-relaxed">
                  Access critical market data, climate forecasts, and real-time disease diagnostics to maximize your yield.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex gap-4 p-5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all duration-300 group">
              <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-emerald-300 shrink-0 group-hover:scale-110 transition-transform">
                <Leaf size={20} />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-base md:text-lg">
                  Sustainable & Prosperous Ecosystem
                </h3>
                <p className="text-emerald-200/80 text-sm leading-relaxed">
                  Our mission is to foster a sustainable, highly-profitable ecosystem for your family and your land.
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
