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
    <>
      {/* ── Google Fonts + All Keyframes + All Custom Classes ── */}
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,700;9..144,900&family=DM+Sans:ital,wght@0,400;0,500;0,700;1,400&display=swap');

        /* ── Ken Burns slow zoom ── */
        @keyframes kenburns {
          0%   { transform: scale(1.0); }
          100% { transform: scale(1.06); }
        }

        /* ── Initial page-load zoom-out for hero image ── */
        @keyframes heroEntry {
          from { transform: scale(1.06); }
          to   { transform: scale(1.0); }
        }

        /* ── Left panel slides in from left ── */
        @keyframes panelLeft {
          from { opacity: 0; transform: translateX(-40px); }
          to   { opacity: 1; transform: translateX(0); }
        }

        /* ── Right panel slides in from right ── */
        @keyframes panelRight {
          from { opacity: 0; transform: translateX(40px); }
          to   { opacity: 1; transform: translateX(0); }
        }

        /* ── Feature cards stagger fade-in from bottom ── */
        @keyframes cardFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── Reusable font helpers ── */
        .font-fraunces { font-family: 'Fraunces', serif; }
        .font-dm       { font-family: 'DM Sans', sans-serif; }

        /* ── Background Ken Burns (after initial entry) ── */
        .kb-bg {
          animation: heroEntry 1.2s ease-out forwards,
                     kenburns 25s 1.2s infinite alternate ease-in-out;
        }

        /* ── Vignette: ONLY the 4 extreme corners, max ~15 % darkness ── */
        .vignette {
          background: radial-gradient(
            ellipse 120% 120% at 50% 50%,
            transparent 55%,
            rgba(0,0,0,0.15) 100%
          );
          pointer-events: none;
        }

        /* ── Panel entrance animations ── */
        .anim-left {
          opacity: 0;
          animation: panelLeft 0.7s ease-out forwards;
          animation-delay: 0.1s;
        }
        .anim-right {
          opacity: 0;
          animation: panelRight 0.7s ease-out forwards;
          animation-delay: 0.25s;
        }

        /* ── Staggered card animations ── */
        .card-1 { opacity:0; animation: cardFadeUp 0.5s ease-out forwards; animation-delay: 0.40s; }
        .card-2 { opacity:0; animation: cardFadeUp 0.5s ease-out forwards; animation-delay: 0.55s; }
        .card-3 { opacity:0; animation: cardFadeUp 0.5s ease-out forwards; animation-delay: 0.70s; }
      `}} />

      <div className="min-h-screen relative flex items-center justify-center p-5 sm:p-8 md:p-14 overflow-hidden font-dm text-white selection:bg-emerald-500/40">

        {/* ═══ BACKGROUND IMAGE — BRIGHT, VIVID, FULLY VISIBLE ═══ */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat kb-bg will-change-transform"
          style={{ backgroundImage: "url('/login_background.png')" }}
        />

        {/* Subtle 4-corner vignette (≤15 % darkness, center untouched) */}
        <div className="absolute inset-0 z-[1] vignette" />

        {/* ═══ CONTENT GRID ═══ */}
        <div className="relative z-10 w-full max-w-[1120px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">

          {/* ─────────────────────────────────────────────
               LEFT PANEL — LOGIN FORM
              ───────────────────────────────────────────── */}
          <div
            className="anim-left relative flex flex-col justify-between overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.12)",
              backdropFilter: "blur(32px) saturate(200%) brightness(110%)",
              WebkitBackdropFilter: "blur(32px) saturate(200%) brightness(110%)",
              border: "1.5px solid rgba(255,255,255,0.45)",
              borderRadius: 28,
              boxShadow: "0 8px 64px rgba(0,0,0,0.18), inset 0 2px 0 rgba(255,255,255,0.6)",
              padding: "40px 36px",
            }}
          >
            {/* Top shimmer edge (simulates light hitting glass from above) */}
            <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-white/80 to-transparent" />

            <div>
              {/* ── App icon ── */}
              <div className="flex flex-col items-center text-center mb-5">
                <div
                  className="w-[52px] h-[52px] rounded-2xl flex items-center justify-center mb-3"
                  style={{
                    background: "linear-gradient(145deg, #14532d, #166534)",
                    boxShadow: "0 6px 20px rgba(20,83,45,0.5), 0 0 18px rgba(74,222,128,0.25)",
                  }}
                >
                  <span className="text-white text-2xl" role="img" aria-label="sprout">🌱</span>
                </div>

                <h1 className="font-fraunces font-bold text-white text-[30px] leading-tight" style={{ textShadow: "0 2px 12px rgba(0,0,0,0.25)" }}>
                  Krishi Bandhu
                </h1>
                <p className="font-dm font-bold text-[#4ade80] text-[11px] mt-1 uppercase" style={{ letterSpacing: "0.2em" }}>
                  Intelligent Farmer Assistant
                </p>
              </div>

              {/* ── Divider ── */}
              <div className="w-full h-[1px] bg-white/20 mb-6" />

              {/* ── Form ── */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email */}
                <div>
                  <label className="block font-dm font-medium text-white/85 uppercase text-[10px] mb-1.5 ml-0.5" style={{ letterSpacing: "0.15em" }}>
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
                      className="w-full text-sm font-medium text-white placeholder:text-white/[0.38] focus:outline-none"
                      style={{
                        background: "rgba(255,255,255,0.15)",
                        border: "1px solid rgba(255,255,255,0.35)",
                        borderRadius: 14,
                        padding: "13px 16px 13px 44px",
                        transition: "all 0.2s ease",
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = "#4ade80";
                        e.currentTarget.style.boxShadow = "0 0 0 3px rgba(74,222,128,0.3)";
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = "rgba(255,255,255,0.35)";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block font-dm font-medium text-white/85 uppercase text-[10px] mb-1.5 ml-0.5" style={{ letterSpacing: "0.15em" }}>
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
                      className="w-full text-sm font-medium text-white placeholder:text-white/[0.38] focus:outline-none"
                      style={{
                        background: "rgba(255,255,255,0.15)",
                        border: "1px solid rgba(255,255,255,0.35)",
                        borderRadius: 14,
                        padding: "13px 48px 13px 44px",
                        transition: "all 0.2s ease",
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = "#4ade80";
                        e.currentTarget.style.boxShadow = "0 0 0 3px rgba(74,222,128,0.3)";
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = "rgba(255,255,255,0.35)";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 flex items-center pr-4 text-white/55 hover:text-white transition-colors cursor-pointer"
                    >
                      {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                    </button>
                  </div>
                </div>

                {/* Error message */}
                {error && (
                  <div
                    className="text-xs font-semibold text-red-100"
                    style={{
                      background: "rgba(239,68,68,0.22)",
                      border: "1px solid rgba(239,68,68,0.35)",
                      borderRadius: 12,
                      padding: "10px 14px",
                    }}
                  >
                    {error}
                  </div>
                )}

                {/* Sign In button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full text-white font-bold text-[16px] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                  style={{
                    background: "linear-gradient(135deg, #16a34a, #15803d)",
                    borderRadius: 14,
                    padding: 16,
                    border: "1px solid rgba(74,222,128,0.25)",
                    transition: "all 0.18s ease",
                    marginTop: 24,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "linear-gradient(135deg, #22c55e, #16a34a)";
                    e.currentTarget.style.transform = "scale(1.02)";
                    e.currentTarget.style.boxShadow = "0 6px 24px rgba(22,163,74,0.5)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "linear-gradient(135deg, #16a34a, #15803d)";
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  {isLoading ? (
                    <span className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Sign In</span>
                      <span className="text-lg ml-1">→</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* ── Toggle link ── */}
            <div className="mt-7 text-center border-t border-white/15 pt-4">
              <p className="text-[13px] text-white/80 font-dm">
                {isLogin ? "Don\u2019t have an account?" : "Already have an account?"}
                <button
                  onClick={() => { setIsLogin(!isLogin); setError(null); }}
                  type="button"
                  className="ml-1.5 text-[#4ade80] font-bold hover:underline cursor-pointer transition-colors"
                >
                  {isLogin ? "Sign Up" : "Sign In"}
                </button>
              </p>
            </div>
          </div>

          {/* ─────────────────────────────────────────────
               RIGHT PANEL — INFO SECTION
              ───────────────────────────────────────────── */}
          <div
            className="anim-right relative flex flex-col justify-between overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.12)",
              backdropFilter: "blur(32px) saturate(200%) brightness(110%)",
              WebkitBackdropFilter: "blur(32px) saturate(200%) brightness(110%)",
              border: "1.5px solid rgba(255,255,255,0.45)",
              borderRadius: 28,
              boxShadow: "0 8px 64px rgba(0,0,0,0.18), inset 0 2px 0 rgba(255,255,255,0.6)",
              padding: "40px 36px",
            }}
          >
            {/* Top shimmer edge */}
            <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-white/80 to-transparent" />

            <div className="space-y-6">
              {/* ── Quote ── */}
              <h2
                className="font-fraunces font-bold text-white text-[26px] leading-[1.35]"
                style={{ textShadow: "0 2px 16px rgba(0,0,0,0.3)" }}
              >
                &quot;The true foundation of our nation is in the hands that tend the soil.&quot;
              </h2>

              {/* ── Emerald rule with glow ── */}
              <div
                className="rounded-full"
                style={{
                  width: 64,
                  height: 3,
                  background: "#4ade80",
                  boxShadow: "0 0 12px #4ade80",
                }}
              />

              {/* ── Feature cards ── */}
              <div className="space-y-3.5">
                {/* Card 1 */}
                <div
                  className="card-1 flex gap-4 group cursor-default"
                  style={{
                    background: "rgba(255,255,255,0.1)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    borderRadius: 18,
                    padding: 18,
                    transition: "all 0.25s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.18)";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.1)";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
                  }}
                >
                  <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ background: "rgba(74,222,128,0.2)" }}>
                    <Sparkles size={18} className="text-[#4ade80]" />
                  </div>
                  <div>
                    <h3 className="font-dm font-bold text-white text-[15px] leading-snug">
                      Krishi Bandhu: <span className="text-[#4ade80]">Your Intelligent Farm Partner</span>
                    </h3>
                    <p className="font-dm text-[13px] leading-[1.5] mt-0.5" style={{ color: "rgba(255,255,255,0.72)" }}>
                      Combining a rich agricultural heritage with AI-driven precision to provide instant guidance.
                    </p>
                  </div>
                </div>

                {/* Card 2 */}
                <div
                  className="card-2 flex gap-4 group cursor-default"
                  style={{
                    background: "rgba(255,255,255,0.1)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    borderRadius: 18,
                    padding: 18,
                    transition: "all 0.25s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.18)";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.1)";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
                  }}
                >
                  <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ background: "rgba(74,222,128,0.2)" }}>
                    <TrendingUp size={18} className="text-[#4ade80]" />
                  </div>
                  <div>
                    <h3 className="font-dm font-bold text-white text-[15px] leading-snug">
                      Market Data & Climate Forecasts
                    </h3>
                    <p className="font-dm text-[13px] leading-[1.5] mt-0.5" style={{ color: "rgba(255,255,255,0.72)" }}>
                      Access critical market data, climate forecasts, and real-time disease diagnostics to maximize your yield.
                    </p>
                  </div>
                </div>

                {/* Card 3 */}
                <div
                  className="card-3 flex gap-4 group cursor-default"
                  style={{
                    background: "rgba(255,255,255,0.1)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    borderRadius: 18,
                    padding: 18,
                    transition: "all 0.25s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.18)";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.1)";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
                  }}
                >
                  <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ background: "rgba(74,222,128,0.2)" }}>
                    <Leaf size={18} className="text-[#4ade80]" />
                  </div>
                  <div>
                    <h3 className="font-dm font-bold text-white text-[15px] leading-snug">
                      Sustainable & Prosperous Ecosystem
                    </h3>
                    <p className="font-dm text-[13px] leading-[1.5] mt-0.5" style={{ color: "rgba(255,255,255,0.72)" }}>
                      Our mission is to foster a sustainable, highly-profitable ecosystem for your family and your land.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Tagline ── */}
            <p className="pt-5 text-center text-[12px] font-dm italic text-white/50" style={{ fontVariant: "small-caps" }}>
              Empowering Farmers Through Precision AI
            </p>
          </div>

        </div>
      </div>
    </>
  );
}
