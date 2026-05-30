"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { login, signup } from "./actions";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const particlesRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

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

  /* ── Floating particles ── */
  useEffect(() => {
    const container = particlesRef.current;
    if (!container) return;
    for (let i = 0; i < 20; i++) {
      const p = document.createElement("div");
      p.className = "kb-particle";
      p.style.left = `${Math.random() * 100}%`;
      p.style.animationDelay = `${Math.random() * 15}s`;
      p.style.animationDuration = `${10 + Math.random() * 10}s`;
      const size = 2 + Math.random() * 4;
      p.style.width = `${size}px`;
      p.style.height = `${size}px`;
      container.appendChild(p);
    }
    return () => { container.innerHTML = ""; };
  }, []);

  /* ── Intersection observer for feature cards ── */
  useEffect(() => {
    const items = featuresRef.current?.querySelectorAll(".kb-feature-item");
    if (!items) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.opacity = "1";
            (entry.target as HTMLElement).style.transform = "translateY(0)";
          }
        });
      },
      { threshold: 0.1 },
    );
    items.forEach((item, i) => {
      const el = item as HTMLElement;
      el.style.opacity = "0";
      el.style.transform = "translateY(20px)";
      el.style.transition = `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.1}s`;
      obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  /* ── 3D tilt handler ── */
  const handleTilt = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = (y - rect.height / 2) / 50;
    const rotateY = (rect.width / 2 - x) / 50;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01,1.01,1.01)`;
  }, []);

  const resetTilt = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = "perspective(1000px) rotateX(0) rotateY(0) scale3d(1,1,1)";
  }, []);

  return (
    <>
      {/* ═══════ ALL STYLES ═══════ */}
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap');

        :root {
          --kb-primary-green: #1a5c3a;
          --kb-primary-green-dark: #124029;
          --kb-primary-green-light: #2d8a5e;
          --kb-accent-gold: #d4a843;
          --kb-accent-gold-light: #e8c76a;
          --kb-glass-bg: rgba(255,255,255,0.08);
          --kb-glass-border: rgba(255,255,255,0.18);
          --kb-glass-highlight: rgba(255,255,255,0.05);
          --kb-text-primary: #ffffff;
          --kb-text-secondary: rgba(255,255,255,0.75);
          --kb-text-muted: rgba(255,255,255,0.5);
        }

        /* ── Background ── */
        .kb-bg-container { position:fixed; inset:0; z-index:0; overflow:hidden; }
        .kb-bg-image {
          position:absolute; inset:0;
          background: url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2832&auto=format&fit=crop') center/cover no-repeat;
          transform: scale(1.1);
          animation: kbKenBurns 20s ease-in-out infinite alternate;
        }
        .kb-bg-overlay {
          position:absolute; inset:0;
          background:
            radial-gradient(ellipse at 20% 50%, rgba(26,92,58,0.4) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 80%, rgba(212,168,67,0.15) 0%, transparent 50%),
            linear-gradient(135deg, rgba(10,15,10,0.85) 0%, rgba(18,64,41,0.75) 50%, rgba(10,15,10,0.9) 100%);
          backdrop-filter: blur(2px);
        }
        .kb-grain {
          position:absolute; inset:0; opacity:0.03; pointer-events:none;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
        }
        @keyframes kbKenBurns {
          0%   { transform: scale(1.1) translate(0,0); }
          100% { transform: scale(1.2) translate(-2%,-1%); }
        }

        /* ── Floating particles ── */
        .kb-particles { position:fixed; inset:0; z-index:1; pointer-events:none; overflow:hidden; }
        .kb-particle {
          position:absolute; width:4px; height:4px;
          background: var(--kb-accent-gold); border-radius:50%; opacity:0;
          animation: kbFloatUp 15s infinite;
        }
        @keyframes kbFloatUp {
          0%   { transform: translateY(100vh) scale(0); opacity:0; }
          10%  { opacity:0.6; }
          90%  { opacity:0.6; }
          100% { transform: translateY(-10vh) scale(1); opacity:0; }
        }

        /* ── Layout ── */
        .kb-main {
          position:relative; z-index:2; min-height:100vh;
          display:flex; align-items:center; justify-content:center; padding:2rem;
          font-family:'Plus Jakarta Sans',sans-serif; color:var(--kb-text-primary);
        }
        .kb-grid {
          display:grid; grid-template-columns:1fr 1fr; gap:3rem;
          max-width:1200px; width:100%; align-items:center;
        }
        @media(max-width:900px) {
          .kb-grid { grid-template-columns:1fr; gap:2rem; }
          .kb-info-section { order:-1; }
          .kb-glass { padding:2rem !important; }
          .kb-quote { font-size:1.35rem !important; }
        }
        @media(max-width:480px) {
          .kb-main { padding:1rem; }
          .kb-glass { padding:1.5rem !important; border-radius:20px !important; }
          .kb-quote { font-size:1.15rem !important; }
        }

        /* ── Glass card ── */
        .kb-glass {
          background: var(--kb-glass-bg);
          border: 1px solid var(--kb-glass-border);
          border-radius: 24px; padding: 3rem;
          backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
          box-shadow: 0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 var(--kb-glass-highlight);
          position:relative; overflow:hidden;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .kb-glass::before {
          content:''; position:absolute; top:0; left:-100%; width:100%; height:100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent);
          transition: left 0.7s ease;
        }
        .kb-glass:hover::before { left:100%; }

        /* ── Auth section slide-in ── */
        .kb-auth-section { animation: kbSlideLeft 0.8s cubic-bezier(0.16,1,0.3,1) forwards; opacity:0; }
        @keyframes kbSlideLeft {
          from { opacity:0; transform:translateX(-40px); }
          to   { opacity:1; transform:translateX(0); }
        }

        /* ── Logo ── */
        .kb-logo { display:flex; align-items:center; gap:1rem; margin-bottom:2.5rem; }
        .kb-logo-icon {
          width:52px; height:52px;
          background: linear-gradient(135deg, var(--kb-primary-green-light), var(--kb-primary-green));
          border-radius:16px; display:flex; align-items:center; justify-content:center;
          box-shadow: 0 4px 20px rgba(26,92,58,0.4);
          position:relative; overflow:hidden;
        }
        .kb-logo-icon::after {
          content:''; position:absolute; inset:0;
          background: linear-gradient(135deg, transparent 40%, rgba(255,255,255,0.2) 100%);
        }
        .kb-logo-icon svg { width:28px; height:28px; color:white; z-index:1; position:relative; }
        .kb-logo-text h1 { font-size:1.75rem; font-weight:700; letter-spacing:-0.02em; line-height:1.2; color:white; }
        .kb-logo-text span { font-size:0.7rem; text-transform:uppercase; letter-spacing:0.2em; color:var(--kb-accent-gold); font-weight:600; }

        /* ── Auth header ── */
        .kb-auth-header { margin-bottom:2rem; }
        .kb-auth-header h2 {
          font-size:1.5rem; font-weight:700; margin-bottom:0.5rem;
          background: linear-gradient(135deg, #fff 0%, var(--kb-accent-gold-light) 100%);
          -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
        }
        .kb-auth-header p { color:var(--kb-text-secondary); font-size:0.95rem; line-height:1.6; }

        /* ── Inputs ── */
        .kb-form-group { margin-bottom:1.5rem; position:relative; }
        .kb-label {
          display:block; font-size:0.75rem; font-weight:600; text-transform:uppercase;
          letter-spacing:0.1em; color:var(--kb-text-muted); margin-bottom:0.5rem;
          transition:color 0.3s ease;
        }
        .kb-input-wrap { position:relative; }
        .kb-input {
          width:100%; padding:1rem 1rem 1rem 3rem;
          background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1);
          border-radius:14px; color:var(--kb-text-primary);
          font-family:inherit; font-size:0.95rem; transition:all 0.3s ease; outline:none;
        }
        .kb-input::placeholder { color:var(--kb-text-muted); }
        .kb-input:focus {
          background:rgba(255,255,255,0.08);
          border-color:var(--kb-accent-gold);
          box-shadow:0 0 0 4px rgba(212,168,67,0.1);
        }
        .kb-input-icon {
          position:absolute; left:1rem; top:50%; transform:translateY(-50%);
          color:var(--kb-text-muted); transition:color 0.3s ease; pointer-events:none;
        }
        .kb-input:focus ~ .kb-input-icon { color:var(--kb-accent-gold); }
        .kb-toggle-pw {
          position:absolute; right:1rem; top:50%; transform:translateY(-50%);
          background:none; border:none; color:var(--kb-text-muted); cursor:pointer;
          padding:0.25rem; transition:color 0.3s ease;
        }
        .kb-toggle-pw:hover { color:var(--kb-text-primary); }

        /* ── Form options row ── */
        .kb-options { display:flex; justify-content:space-between; align-items:center; margin-bottom:1.5rem; font-size:0.85rem; }
        .kb-checkbox-wrap { display:flex; align-items:center; gap:0.5rem; cursor:pointer; }
        .kb-checkbox-wrap input { display:none; }
        .kb-checkmark {
          width:18px; height:18px; border:2px solid rgba(255,255,255,0.2); border-radius:6px;
          display:flex; align-items:center; justify-content:center; transition:all 0.3s ease;
        }
        .kb-checkbox-wrap input:checked + .kb-checkmark { background:var(--kb-accent-gold); border-color:var(--kb-accent-gold); }
        .kb-checkbox-wrap .kb-cb-label { color:var(--kb-text-secondary); }
        .kb-forgot { color:var(--kb-accent-gold); text-decoration:none; font-weight:600; transition:opacity 0.3s ease; cursor:pointer; background:none; border:none; font-family:inherit; font-size:inherit; }
        .kb-forgot:hover { opacity:0.8; text-decoration:underline; }

        /* ── Primary button ── */
        .kb-btn {
          width:100%; padding:1rem;
          background:linear-gradient(135deg, var(--kb-primary-green-light), var(--kb-primary-green));
          border:none; border-radius:14px; color:white; font-family:inherit;
          font-size:1rem; font-weight:700; cursor:pointer; position:relative; overflow:hidden;
          transition:all 0.3s ease; box-shadow:0 4px 20px rgba(26,92,58,0.4);
          display:flex; align-items:center; justify-content:center; gap:0.5rem;
        }
        .kb-btn::before {
          content:''; position:absolute; top:0; left:-100%; width:100%; height:100%;
          background:linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transition:left 0.5s ease;
        }
        .kb-btn:hover::before { left:100%; }
        .kb-btn:hover { transform:translateY(-2px); box-shadow:0 8px 30px rgba(26,92,58,0.5); }
        .kb-btn:active { transform:translateY(0); }
        .kb-btn:disabled { opacity:0.7; cursor:not-allowed; }
        .kb-btn .kb-btn-arrow { transition:transform 0.3s ease; }
        .kb-btn:hover .kb-btn-arrow { transform:translateX(4px); }

        /* ── Divider ── */
        .kb-divider { display:flex; align-items:center; gap:1rem; margin:1.5rem 0; color:var(--kb-text-muted); font-size:0.8rem; }
        .kb-divider::before, .kb-divider::after { content:''; flex:1; height:1px; background:rgba(255,255,255,0.1); }

        /* ── Social buttons ── */
        .kb-social-row { display:flex; gap:1rem; margin-bottom:1.5rem; }
        .kb-social-btn {
          flex:1; padding:0.75rem;
          background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1);
          border-radius:12px; color:var(--kb-text-primary); cursor:pointer;
          transition:all 0.3s ease; display:flex; align-items:center; justify-content:center;
        }
        .kb-social-btn:hover { background:rgba(255,255,255,0.1); border-color:rgba(255,255,255,0.2); transform:translateY(-2px); }

        /* ── Signup prompt ── */
        .kb-signup-prompt { text-align:center; color:var(--kb-text-secondary); font-size:0.9rem; }
        .kb-signup-link { color:var(--kb-accent-gold); background:none; border:none; font-family:inherit; font-size:inherit; font-weight:700; cursor:pointer; transition:opacity 0.3s ease; }
        .kb-signup-link:hover { opacity:0.8; text-decoration:underline; }

        /* ── Info section slide-in ── */
        .kb-info-section { animation: kbSlideRight 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s forwards; opacity:0; }
        @keyframes kbSlideRight {
          from { opacity:0; transform:translateX(40px); }
          to   { opacity:1; transform:translateX(0); }
        }

        /* ── Quote ── */
        .kb-quote-block { margin-bottom:2.5rem; }
        .kb-quote {
          font-family:'Playfair Display',serif; font-size:1.75rem; font-style:italic;
          line-height:1.4; color:var(--kb-text-primary); position:relative;
          padding-left:1.5rem; border-left:3px solid var(--kb-accent-gold);
        }
        .kb-accent-line {
          width:60px; height:4px;
          background:linear-gradient(90deg, var(--kb-accent-gold), transparent);
          border-radius:2px; margin-top:1.5rem;
        }

        /* ── Feature cards ── */
        .kb-features { display:flex; flex-direction:column; gap:1rem; }
        .kb-feature-item {
          display:flex; gap:1.25rem; padding:1.25rem;
          background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.06);
          border-radius:16px; transition:all 0.3s ease; cursor:default;
        }
        .kb-feature-item:hover { background:rgba(255,255,255,0.06); border-color:rgba(255,255,255,0.12); transform:translateX(8px); }
        .kb-feat-icon {
          width:48px; height:48px; min-width:48px;
          background:linear-gradient(135deg, rgba(212,168,67,0.2), rgba(212,168,67,0.05));
          border:1px solid rgba(212,168,67,0.2); border-radius:14px;
          display:flex; align-items:center; justify-content:center;
          color:var(--kb-accent-gold); transition:all 0.3s ease;
        }
        .kb-feature-item:hover .kb-feat-icon { background:linear-gradient(135deg, rgba(212,168,67,0.3), rgba(212,168,67,0.1)); transform:scale(1.1); }
        .kb-feat-title { font-size:1rem; font-weight:700; margin-bottom:0.35rem; color:var(--kb-text-primary); }
        .kb-feat-title span { color:var(--kb-accent-gold); font-weight:600; }
        .kb-feat-desc { font-size:0.85rem; color:var(--kb-text-secondary); line-height:1.5; }

        /* ── Tagline ── */
        .kb-tagline { margin-top:2rem; font-size:0.8rem; text-transform:uppercase; letter-spacing:0.2em; color:var(--kb-text-muted); text-align:right; }
        .kb-tagline span { color:var(--kb-accent-gold); font-weight:600; }

        /* ── Error message ── */
        .kb-error { background:rgba(255,107,107,0.15); border:1px solid rgba(255,107,107,0.3); border-radius:12px; padding:0.75rem 1rem; color:#ff6b6b; font-size:0.85rem; font-weight:600; margin-bottom:1rem; }

        /* ── Autofill fix ── */
        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus {
          -webkit-text-fill-color: var(--kb-text-primary);
          -webkit-box-shadow: 0 0 0px 1000px rgba(26,92,58,0.3) inset;
          transition: background-color 5000s ease-in-out 0s;
        }
      `}} />

      {/* ═══ ANIMATED BACKGROUND ═══ */}
      <div className="kb-bg-container">
        <div className="kb-bg-image" />
        <div className="kb-bg-overlay" />
        <div className="kb-grain" />
      </div>

      {/* ═══ FLOATING PARTICLES ═══ */}
      <div className="kb-particles" ref={particlesRef} />

      {/* ═══ MAIN CONTENT ═══ */}
      <div className="kb-main">
        <div className="kb-grid">

          {/* ──────── LEFT: AUTH ──────── */}
          <div className="kb-auth-section">
            <div className="kb-glass" onMouseMove={handleTilt} onMouseLeave={resetTilt}>

              {/* Logo */}
              <div className="kb-logo">
                <div className="kb-logo-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2v20" />
                    <path d="M12 2c0 0-4 4-4 10s4 6 4 6" />
                    <path d="M12 2c0 0 4 4 4 10s-4 6-4 6" />
                    <path d="M8 22h8" />
                  </svg>
                </div>
                <div className="kb-logo-text">
                  <h1>Krishi Bandhu</h1>
                  <span>Intelligent Farmer Assistant</span>
                </div>
              </div>

              {/* Header */}
              <div className="kb-auth-header">
                <h2>{isLogin ? "Welcome back, Farmer" : "Join the Community"}</h2>
                <p>
                  {isLogin
                    ? "Sign in to access your personalized dashboard, crop insights, and market forecasts."
                    : "Create an account to unlock AI-powered farming insights and personalized guidance."}
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit}>
                {/* Email */}
                <div className="kb-form-group">
                  <label className="kb-label">Email Address</label>
                  <div className="kb-input-wrap">
                    <input name="email" type="email" required placeholder="farmer@example.com" className="kb-input" />
                    <svg className="kb-input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  </div>
                </div>

                {/* Password */}
                <div className="kb-form-group">
                  <label className="kb-label">Password</label>
                  <div className="kb-input-wrap">
                    <input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      placeholder="Enter your password"
                      className="kb-input"
                      style={{ paddingRight: "3rem" }}
                    />
                    <svg className="kb-input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                    <button type="button" className="kb-toggle-pw" onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                          <circle cx="12" cy="12" r="3" />
                          <path d="m4 4 16 16" />
                        </svg>
                      ) : (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                {/* Options row */}
                <div className="kb-options">
                  <label className="kb-checkbox-wrap">
                    <input type="checkbox" checked={rememberMe} onChange={() => setRememberMe(!rememberMe)} />
                    <span className="kb-checkmark">
                      {rememberMe && (
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                    </span>
                    <span className="kb-cb-label">Remember me</span>
                  </label>
                  <button type="button" className="kb-forgot">Forgot password?</button>
                </div>

                {/* Error */}
                {error && <div className="kb-error">{error}</div>}

                {/* Submit */}
                <button type="submit" className="kb-btn" disabled={isLoading}>
                  {isLoading ? (
                    <span style={{ width: 20, height: 20, border: "2px solid rgba(255,255,255,0.3)", borderTop: "2px solid white", borderRadius: "50%", display: "inline-block", animation: "spin 1s linear infinite" }} />
                  ) : (
                    <>
                      <span>{isLogin ? "Sign In" : "Create Account"}</span>
                      <svg className="kb-btn-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                      </svg>
                    </>
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="kb-divider">or continue with</div>

              {/* Social */}
              <div className="kb-social-row">
                <button type="button" className="kb-social-btn" aria-label="Sign in with Google">
                  <svg width="20" height="20" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                </button>
                <button type="button" className="kb-social-btn" aria-label="Sign in with Phone">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </button>
              </div>

              {/* Toggle sign up / sign in */}
              <p className="kb-signup-prompt">
                {isLogin ? "Don\u2019t have an account? " : "Already have an account? "}
                <button type="button" className="kb-signup-link" onClick={() => { setIsLogin(!isLogin); setError(null); }}>
                  {isLogin ? "Create account" : "Sign In"}
                </button>
              </p>
            </div>
          </div>

          {/* ──────── RIGHT: INFO ──────── */}
          <div className="kb-info-section">
            <div className="kb-glass" onMouseMove={handleTilt} onMouseLeave={resetTilt}>

              {/* Quote */}
              <div className="kb-quote-block">
                <blockquote className="kb-quote">
                  &ldquo;The true foundation of our nation is in the hands that tend the soil.&rdquo;
                </blockquote>
                <div className="kb-accent-line" />
              </div>

              {/* Features */}
              <div className="kb-features" ref={featuresRef}>
                <div className="kb-feature-item">
                  <div className="kb-feat-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2v4" /><path d="m16.2 7.8 2.9-2.9" /><path d="M18 12h4" />
                      <path d="m16.2 16.2 2.9 2.9" /><path d="M12 18v4" /><path d="m4.9 19.1 2.9-2.9" />
                      <path d="M2 12h4" /><path d="m4.9 4.9 2.9 2.9" /><circle cx="12" cy="12" r="3" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="kb-feat-title">Krishi Bandhu: <span>Your Intelligent Farm Partner</span></h3>
                    <p className="kb-feat-desc">Combining a rich agricultural heritage with AI-driven precision to provide instant guidance, crop diagnostics, and personalized recommendations.</p>
                  </div>
                </div>

                <div className="kb-feature-item">
                  <div className="kb-feat-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 3v18h18" /><path d="m19 9-5 5-4-4-3 3" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="kb-feat-title">Market Data & <span>Climate Forecasts</span></h3>
                    <p className="kb-feat-desc">Access critical market data, hyperlocal climate forecasts, and real-time disease diagnostics to maximize your yield and profitability.</p>
                  </div>
                </div>

                <div className="kb-feature-item">
                  <div className="kb-feat-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
                      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="kb-feat-title">Sustainable & <span>Prosperous Ecosystem</span></h3>
                    <p className="kb-feat-desc">Our mission is to foster a sustainable, highly-profitable ecosystem for your family and your land through precision agriculture.</p>
                  </div>
                </div>
              </div>

              {/* Tagline */}
              <p className="kb-tagline">Empowering Farmers Through <span>Precision AI</span></p>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
