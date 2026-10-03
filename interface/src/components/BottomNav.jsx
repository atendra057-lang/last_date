import React, { useState } from "react";
import { Home, MessageCircle, ShoppingBag, User, Clapperboard } from "lucide-react";

export default function BottomNav({ onReelsClick = () => {}, activeTab, setActiveTab }) {
  const [internalActive, setInternalActive] = useState("home");
  const active = activeTab !== undefined ? activeTab : internalActive;
  const setActive = setActiveTab || setInternalActive;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 px-4 pb-4 pt-2 pointer-events-none">
      <div
        className="pointer-events-auto flex items-center justify-around bg-white/80 backdrop-blur-3xl border border-white/50 rounded-3xl px-5 py-3 ring-1 ring-white/60 max-w-md mx-auto"
        style={{ boxShadow: "0 8px 30px rgba(0,0,0,0.15), 0 2px 8px rgba(0,0,0,0.08)" }}
      >
        <button
          onClick={() => setActive("home")}
          className="p-2 rounded-xl hover:bg-slate-100/80 active:scale-90 transition-all"
          aria-label="home"
        >
          <Home
            size={22}
            className={active === "home" ? "text-slate-900" : "text-slate-400"}
            strokeWidth={active === "home" ? 2.2 : 1.8}
          />
        </button>

        <button
          onClick={() => setActive("messages")}
          className="p-2 rounded-xl hover:bg-slate-100/80 active:scale-90 transition-all"
          aria-label="messages"
        >
          <MessageCircle
            size={22}
            className={active === "messages" ? "text-slate-900" : "text-slate-400"}
            strokeWidth={active === "messages" ? 2.2 : 1.8}
          />
        </button>

        <button
          onClick={onReelsClick}
          className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 via-pink-500 to-indigo-500 flex items-center justify-center active:scale-90 transition-all"
          style={{ boxShadow: "0 4px 16px rgba(99,102,241,0.3)" }}
          aria-label="Reels"
        >
          <Clapperboard size={19} className="text-white" strokeWidth={2.2} />
        </button>

        <button
          onClick={() => setActive("shop")}
          className="p-2 rounded-xl hover:bg-slate-100/80 active:scale-90 transition-all"
          aria-label="shop"
        >
          <ShoppingBag
            size={22}
            className={active === "shop" ? "text-slate-900" : "text-slate-400"}
            strokeWidth={active === "shop" ? 2.2 : 1.8}
          />
        </button>

        <button
          onClick={() => setActive("profile")}
          className="p-2 rounded-xl hover:bg-slate-100/80 active:scale-90 transition-all"
          aria-label="profile"
        >
          <User
            size={22}
            className={active === "profile" ? "text-slate-900" : "text-slate-400"}
            strokeWidth={active === "profile" ? 2.2 : 1.8}
          />
        </button>
      </div>
    </div>
  );
}
