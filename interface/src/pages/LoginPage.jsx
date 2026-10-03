import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const MOODS = ["funny", "romantic", "political", "culinary"];

export default function LoginPage() {
  const [mode, setMode] = useState("login"); // 'login' | 'signup'
  const [moodIndex, setMoodIndex] = useState(0);
  const navigate = useNavigate();

  // Cycles the headline word every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setMoodIndex((i) => (i + 1) % MOODS.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen w-full bg-slate-50 flex flex-col lg:flex-row relative overflow-hidden">
      {/* Background glowing liquid orbs for glass translucency */}
      <div className="absolute top-1/4 left-1/4 w-[450px] h-[450px] rounded-full bg-brass/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] rounded-full bg-periwinkle/30 blur-3xl pointer-events-none" />

      {/* LEFT: brand hero */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden flex-col justify-between p-14 z-10">
        <span className="relative font-mono text-xs tracking-[0.2em] text-brass uppercase font-semibold">
          An intentional feed
        </span>

        <div className="relative">
          <h1 className="font-display text-6xl text-slate-900 leading-[1.05] mb-6 drop-shadow-sm">
            Feel more of<br />
            what's{" "}
            <span className="italic text-brass transition-opacity duration-500">
              {MOODS[moodIndex]}
            </span>
            .
          </h1>
          <p className="text-slate-600 text-base max-w-sm font-normal leading-relaxed">
            Intent sorts your feed by what you actually want to see —
            no endless scroll, just the moments that match your mood.
          </p>
        </div>

        <div className="relative flex gap-8 font-mono text-xs text-slate-500 uppercase tracking-wide">
          <span>Curated, not endless</span>
          <span>·</span>
          <span>Your mood, your feed</span>
        </div>
      </div>

      {/* RIGHT: auth glass card */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-14 z-10">
        <div className="w-full max-w-sm">
          {/* mobile-only mini wordmark */}
          <div className="lg:hidden text-center mb-10">
            <h1 className="font-display text-4xl text-slate-900 drop-shadow-sm">Intent</h1>
            <p className="text-slate-600 text-sm mt-1">Feel more of what's {MOODS[moodIndex]}.</p>
          </div>

          <div className="bg-white/60 backdrop-blur-3xl border border-white/50 rounded-[32px] p-8 shadow-xl ring-1 ring-black/5">
            {/* Mode toggle */}
            <div className="flex bg-slate-100/50 backdrop-blur-md rounded-2xl p-1 mb-8 border border-white/60">
              <button
                onClick={() => setMode("login")}
                className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  mode === "login"
                    ? "bg-white text-slate-900 shadow-sm border border-white/80"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                Log in
              </button>
              <button
                onClick={() => setMode("signup")}
                className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  mode === "signup"
                    ? "bg-white text-slate-900 shadow-sm border border-white/80"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                Sign up
              </button>
            </div>

            <form
              className="flex flex-col gap-4"
              onSubmit={(e) => {
                e.preventDefault();
                navigate("/home");
              }}
            >         
              {mode === "signup" && (
                <Field label="Username" type="text" placeholder="yourname" />
              )}
              <Field label="Email" type="email" placeholder="you@example.com" />
              <Field label="Password" type="password" placeholder="••••••••" />

              <button
                type="submit"
                className="mt-3 w-full py-3.5 rounded-2xl bg-gradient-to-tr from-brass via-white/90 to-periwinkle text-slate-900 font-bold text-sm
                           hover:brightness-105 active:scale-[0.98] transition-all shadow-[0_4px_20px_rgba(201,167,106,0.3)] border border-white/60"
              >
                {mode === "login" ? "Log in" : "Create account"}
              </button>

              <button
                type="button"
                onClick={() => navigate("/home")}
                className="w-full py-3.5 rounded-2xl bg-white/40 text-slate-700 font-semibold text-sm
                           hover:bg-white/70 hover:text-slate-900 active:scale-[0.98] transition-all border border-white/50"
              >
                Continue without signing in
              </button>
            </form>

            <p className="text-center text-slate-500 text-xs mt-6">
              By continuing you agree to Intent's{" "}
              <span className="text-periwinkle font-medium cursor-pointer hover:underline">Terms</span> and{" "}
              <span className="text-periwinkle font-medium cursor-pointer hover:underline">Privacy Policy</span>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, type, placeholder }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-mono uppercase tracking-wide text-slate-600 font-semibold">{label}</span>
      <input
        type={type}
        placeholder={placeholder}
        className="bg-white/50 border border-white/60 backdrop-blur-md rounded-2xl px-4 py-3 text-slate-900 text-sm
                   placeholder:text-slate-400 outline-none focus:border-periwinkle/40
                   focus:ring-2 focus:ring-periwinkle/20 transition-all shadow-inner"
      />
    </label>
  );
}