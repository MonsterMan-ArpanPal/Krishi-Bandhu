"use client";

import { useState } from "react";
import { login, signup } from "./actions";
import { Mail, Lock, TrendingUp, Leaf, Sparkles, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
    <div className="min-h-screen relative flex items-center justify-center p-4 sm:p-6 md:p-12 overflow-x-hidden selection:bg-[#22c55e] selection:text-white font-outfit text-white">
      
      {/* Inject Fonts, Custom Animations, and Glassmorphism Styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,100..900;1,9..144,100..900&family=Outfit:wght@100..900&display=swap');
        
        @keyframes kenburns {
          0% { transform: scale(1.0); }
          100% { transform: scale(1.08); }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .font-fraunces {
          font-family: 'Fraunces', serif;
        }
        
        .font-outfit {
          font-family: 'Outfit', sans-serif;
        }

        .kenburns-bg {
          animation: kenburns 20s infinite alternate ease-in-out;
        }

        .fade-in-up-1 {
          opacity: 0;
          animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          animation-delay: 0.1s;
        }

        .fade-in-up-2 {
          opacity: 0;
          animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          animation-delay: 0.25s;
        }

        .glass-pane {
          background: rgba(255, 255, 255, 0.08) !important;
          backdrop-filter: blur(24px) saturate(180%) !important;
          -webkit-backdrop-filter: blur(24px) saturate(180%) !important;
          border: 1px solid rgba(255, 255, 255, 0.25) !important;
          box-shadow: 0 8px 48px rgba(0, 0, 0, 0.35) !important;
          border-radius: 24px !important;
        }

        .glass-card-inner {
          background: rgba(255, 255, 255, 0.12) !important;
          backdrop-filter: blur(12px) saturate(140%) !important;
          -webkit-backdrop-filter: blur(12px) saturate(140%) !important;
          border: 1px solid rgba(255, 255, 255, 0.18) !important;
          border-radius: 16px !important;
        }

        .glass-input {
          background: rgba(255, 255, 255, 0.08) !important;
          border: 1px solid rgba(255, 255, 255, 0.2) !important;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          color: #ffffff !important;
        }

        .glass-input:focus {
          background: rgba(255, 255, 255, 0.12) !important;
          border-color: rgba(34, 197, 94, 0.5) !important;
          box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.35) !important;
          outline: none;
        }

        .vignette-overlay {
          background: radial-gradient(circle, transparent 45%, rgba(0,0,0,0.55) 100%);
          pointer-events: none;
        }
      `}} />

      {/* Background Image Layer - Vivid, Saturated & Immersive */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat kenburns-bg"
        style={{ 
          backgroundImage: "url('/login_background.png')" 
        }} 
      />
      
      {/* Vignette Overlay (Only at extreme edges) */}
      <div className="absolute inset-0 z-0 vignette-overlay pointer-events-none" />

      {/* Content Container (50/50 Horizontal Split on Desktop) */}
      <div className="relative w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch z-10 my-6">
        
        {/* LEFT PANEL: LOGIN FORM */}
        <div className="glass-pane p-8 sm:p-10 flex flex-col justify-between fade-in-up-1">
          
          <div>
            {/* Seedling Sprout Logo */}
            <div className="flex flex-col items-center text-center mb-6">
              <div className="w-12 h-12 bg-[#1a6b3c] rounded-xl flex items-center justify-center mb-3 shadow-md border border-white/10">
                <span className="text-2xl" role="img" aria-label="sprout">🌱</span>
              </div>
              <h1 className="text-3.5xl font-extrabold font-fraunces text-white tracking-tight drop-shadow-sm">
                Krishi Bandhu
              </h1>
              <p className="text-[#34d399] font-bold text-xs mt-1 uppercase tracking-widest">
                INTELLIGENT FARMER ASSISTANT
              </p>
            </div>

            {/* Form Fields */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-white uppercase tracking-widest mb-1.5 ml-1">
                  Email Address
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-white/60">
                    <Mail size={16} />
                  </span>
                  <input 
                    name="email"
                    type="email" 
                    required
                    placeholder="farmer@example.com"
                    className="w-full glass-input rounded-xl pl-11 pr-4 py-3 text-sm font-semibold placeholder:text-white/30 text-white"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-[10px] font-bold text-white uppercase tracking-widest mb-1.5 ml-1">
                  Password
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-white/60">
                    <Lock size={16} />
                  </span>
                  <input 
                    name="password"
                    type={showPassword ? "text" : "password"} 
                    required
                    placeholder="••••••••"
                    className="w-full glass-input rounded-xl pl-11 pr-12 py-3 text-sm font-semibold placeholder:text-white/30 text-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-4 text-white/60 hover:text-white transition-colors cursor-pointer"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="bg-red-500/20 text-red-100 text-xs p-3 rounded-xl border border-red-500/30 font-semibold animate-fade-in">
                  {error}
                </div>
              )}

              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-[#166534] hover:bg-[#15803d] text-white font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all hover:scale-[1.02] hover:shadow-[0_0_15px_rgba(34,197,94,0.4)] active:scale-[0.98] border border-emerald-500/20 disabled:opacity-70 mt-6 cursor-pointer"
              >
                {isLoading ? (
                  <span className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Sign In</span>
                    <span className="text-lg">→</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Form Toggle Link */}
          <div className="mt-8 text-center border-t border-white/10 pt-4">
            <p className="text-xs text-white/70 font-semibold">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button 
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError(null);
                }}
                type="button"
                className="ml-1.5 text-white font-bold hover:text-[#34d399] transition-colors focus:outline-none cursor-pointer hover:underline"
              >
                {isLogin ? "Sign Up" : "Sign In"}
              </button>
            </p>
          </div>

        </div>

        {/* RIGHT PANEL: INFO SECTION */}
        <div className="glass-pane p-8 sm:p-10 flex flex-col justify-between fade-in-up-2">
          
          <div className="space-y-6">
            {/* Quote Block */}
            <div className="relative pt-4">
              <h2 className="text-2.5xl sm:text-3xl font-fraunces font-bold text-white leading-tight tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]">
                &quot;The true foundation of our nation is in the hands that tend the soil.&quot;
              </h2>
            </div>
            
            {/* Emerald Green Horizontal Rule */}
            <div className="w-[60px] h-[3px] bg-[#34d399] rounded-full" />

            {/* Feature Cards List */}
            <div className="space-y-4">
              {/* Feature 1 */}
              <div className="glass-card-inner p-4 flex gap-4 transition-all duration-300 hover:bg-white/15">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#34d399] shrink-0">
                  <Sparkles size={18} />
                </div>
                <div className="space-y-0.5">
                  <h3 className="font-bold text-white text-base">
                    Krishi Bandhu: <span className="text-[#34d399]">Your Intelligent Farm Partner</span>
                  </h3>
                  <p className="text-[#bbf7d0] text-xs leading-relaxed">
                    Combining a rich agricultural heritage with AI-driven precision to provide instant guidance.
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="glass-card-inner p-4 flex gap-4 transition-all duration-300 hover:bg-white/15">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#34d399] shrink-0">
                  <TrendingUp size={18} />
                </div>
                <div className="space-y-0.5">
                  <h3 className="font-bold text-white text-base">
                    Market Data & Climate Forecasts
                  </h3>
                  <p className="text-[#bbf7d0] text-xs leading-relaxed">
                    Access critical market data, climate forecasts, and real-time disease diagnostics to maximize your yield.
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="glass-card-inner p-4 flex gap-4 transition-all duration-300 hover:bg-white/15">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#34d399] shrink-0">
                  <Leaf size={18} />
                </div>
                <div className="space-y-0.5">
                  <h3 className="font-bold text-white text-base">
                    Sustainable & Prosperous Ecosystem
                  </h3>
                  <p className="text-[#bbf7d0] text-xs leading-relaxed">
                    Our mission is to foster a sustainable, highly-profitable ecosystem for your family and your land.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 text-center text-xs text-white/50 font-semibold font-outfit">
            Empowering Farmers Through Precision AI
          </div>

        </div>

      </div>
    </div>
  );
}
