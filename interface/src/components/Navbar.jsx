import React from "react";
import { Heart, PlusSquare, Search } from "lucide-react";

export default function Navbar() {
  return (
    <div className="sticky top-0 z-30 flex items-center justify-between px-5 py-3.5 bg-white/85 backdrop-blur-2xl border-b border-slate-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.03)] relative">
      <div className="flex-1 flex justify-start">
        <button
          aria-label="Create"
          className="w-9 h-9 rounded-full bg-slate-100/90 hover:bg-slate-200/90 backdrop-blur-md border border-slate-200/80 flex items-center justify-center transition-all active:scale-95 shadow-xs"
        >
          <PlusSquare size={19} className="text-slate-800" strokeWidth={1.9} />
        </button>
      </div>
      
      <span className="absolute left-1/2 -translate-x-1/2 font-display text-xl text-slate-900 tracking-tight font-semibold">
        Intent
      </span>

      <div className="flex-1 flex justify-end gap-3">
        <button
          aria-label="Search"
          className="w-9 h-9 rounded-full bg-slate-100/90 hover:bg-slate-200/90 backdrop-blur-md border border-slate-200/80 flex items-center justify-center transition-all active:scale-95 shadow-xs"
        >
          <Search size={18} className="text-slate-800" strokeWidth={1.9} />
        </button>
        <button
          aria-label="Activity"
          className="w-9 h-9 rounded-full bg-slate-100/90 hover:bg-slate-200/90 backdrop-blur-md border border-slate-200/80 flex items-center justify-center transition-all active:scale-95 shadow-xs"
        >
          <Heart size={19} className="text-slate-800" strokeWidth={1.9} />
        </button>
      </div>
    </div>
  );
}
