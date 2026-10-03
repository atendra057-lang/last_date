import React from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";

// Placeholder data — replace with real followed-users' stories later.
const STORIES = [
  { id: "you", name: "Your story", isSelf: true },
  { id: "riya_", name: "riya_" },
  { id: "arjun.k", name: "arjun.k" },
  { id: "meher_", name: "meher_" },
  { id: "dev_ops", name: "dev_ops" },
  { id: "kavya", name: "kavya" },
];

export default function StoryBar() {
  return (
    <div className="flex gap-4 px-5 py-3 overflow-x-auto scrollbar-none bg-white/70 backdrop-blur-xl border-b border-slate-200/80">
      {STORIES.map((s) => (
        <motion.div
          key={s.id}
          whileTap={{ scale: 0.92 }}
          className="flex flex-col items-center gap-1.5 shrink-0 w-14 group cursor-pointer"
        >
          <div className="relative">
            <div
              className={`w-14 h-14 rounded-full flex items-center justify-center transition-transform group-hover:scale-105 shadow-xs ${
                s.isSelf
                  ? "bg-slate-200 border border-slate-300 p-[2px]"
                  : "bg-gradient-to-tr from-amber-500 via-pink-500 to-indigo-500 p-[2px] shadow-[0_0_12px_rgba(99,102,241,0.2)]"
              }`}
            >
              <div className="w-full h-full rounded-full bg-white backdrop-blur-md flex items-center justify-center text-slate-900 font-bold text-sm border border-slate-200/80">
                {s.name[0].toUpperCase()}
              </div>
            </div>
            {s.isSelf && (
              <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full bg-amber-500 flex items-center justify-center border-2 border-white shadow-xs">
                <Plus size={11} className="text-white" strokeWidth={3} />
              </div>
            )}
          </div>
          <span className="text-[10px] text-slate-600 truncate w-full text-center font-medium">
            {s.isSelf ? "You" : s.name}
          </span>
        </motion.div>
      ))}
    </div>
  );
}


