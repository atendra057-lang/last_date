import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, MessageCircle, Send, Bookmark, Music2 } from "lucide-react";
import ReelPlayer from "./reels/ReelPlayer";

export default function ReelCard({ reel, isActive = false, isFeedMode = false }) {
  const [liked, setLiked] = useState(false);
  const [following, setFollowing] = useState(false);
  const [burst, setBurst] = useState(false);
  const lastTap = useRef(0);

  // Double-tap-to-like
  const handleDoubleTap = useCallback(() => {
    const now = Date.now();
    if (now - lastTap.current < 280) {
      setLiked(true);
      setBurst(true);
      setTimeout(() => setBurst(false), 650);
    }
    lastTap.current = now;
  }, []);

  return (
    <div
      onClick={handleDoubleTap}
      className="relative w-full h-[calc(100vh-220px)] min-h-[480px] bg-black overflow-hidden"
    >
      {/* Video */}
      <ReelPlayer src={reel.video} isActive={isActive} />

      {/* ── TOP-LEFT: Avatar + Username + Follow ── */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-2.5">
        {/* Avatar circle */}
        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-500 via-pink-500 to-indigo-500 p-[2px] shadow-md shrink-0">
          <div className="w-full h-full rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center">
            <span className="text-white font-bold text-[11px]">
              {reel.username.slice(0, 2).toUpperCase()}
            </span>
          </div>
        </div>

        {/* Username */}
        <span
          className="text-white font-semibold text-sm drop-shadow-sm"
          style={{ textShadow: "0 1px 6px rgba(0,0,0,0.5)" }}
        >
          @{reel.username}
        </span>

        {/* Follow pill */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setFollowing((f) => !f);
          }}
          className={`text-[11px] font-bold px-3 py-1 rounded-full border transition-all backdrop-blur-md ${following
              ? "border-white/30 bg-white/10 text-white/70"
              : "border-white/50 bg-white/10 text-white hover:bg-white/20"
            }`}
        >
          {following ? "Following" : "Follow"}
        </button>
      </div>

      {/* ── BOTTOM-LEFT: Caption + Audio ── */}
      {!isFeedMode && (
        <div className="absolute left-4 bottom-6 z-20 max-w-[68%]">
          <p
            className="text-white text-[13px] font-medium leading-relaxed mb-2 drop-shadow"
            style={{ textShadow: "0 1px 8px rgba(0,0,0,0.6)" }}
          >
            {reel.caption}
          </p>
          <div className="flex items-center gap-1.5">
            <Music2 size={12} className="text-white/70 shrink-0" />
            <span
              className="text-white/70 text-[11px] font-medium truncate"
              style={{ textShadow: "0 1px 6px rgba(0,0,0,0.5)" }}
            >
              Original audio · {reel.username}
            </span>
          </div>
        </div>
      )}

      {/* ── RIGHT RAIL: Action buttons ── */}
      {!isFeedMode && (
        <div className="absolute right-3 bottom-6 z-20 flex flex-col gap-4 items-center">
          <RailIcon
            Icon={Heart}
            label={liked ? "128k" : "128k"}
            active={liked}
            onClick={(e) => { e.stopPropagation(); setLiked((l) => !l); }}
          />
          <RailIcon Icon={MessageCircle} label="842" />
          <RailIcon Icon={Send} label="Share" />
          <RailIcon Icon={Bookmark} label="Save" />
        </div>
      )}

      {/* ── DOUBLE-TAP HEART BURST ── */}
      <AnimatePresence>
        {burst && (
          <motion.div
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1.15, opacity: 1 }}
            exit={{ scale: 1.5, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none"
          >
            <Heart
              size={96}
              className="text-rose-500 fill-rose-500 drop-shadow-[0_4px_24px_rgba(244,63,94,0.5)]"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function RailIcon({ Icon, label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-1 active:scale-90 transition-transform"
    >
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md border transition-all ${active
            ? "bg-rose-500/20 border-rose-400/40 text-rose-400"
            : "bg-black/30 border-white/15 text-white"
          }`}
      >
        <Icon
          size={19}
          fill={active ? "currentColor" : "none"}
          strokeWidth={1.9}
        />
      </div>
      <span className="text-[10px] text-white/80 font-medium drop-shadow-sm">
        {label}
      </span>
    </button>
  );
}
