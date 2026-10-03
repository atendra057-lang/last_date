import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, MessageCircle, Send, Bookmark, Music2, X } from "lucide-react";

/**
 * ReelFullscreen — Instagram-style full-screen reel overlay with vertical scrolling.
 */
export default function ReelFullscreen({ reels, initialReelId, onClose }) {
  const [activeIndex, setActiveIndex] = useState(
    Math.max(0, reels.findIndex((r) => r.id === initialReelId))
  );
  const isScrolling = useRef(false);

  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const handleWheel = (e) => {
    if (isScrolling.current) return;
    if (e.deltaY > 30) {
      if (activeIndex < reels.length - 1) {
        isScrolling.current = true;
        setActiveIndex(prev => prev + 1);
        setTimeout(() => { isScrolling.current = false; }, 600);
      }
    } else if (e.deltaY < -30) {
      if (activeIndex > 0) {
        isScrolling.current = true;
        setActiveIndex(prev => prev - 1);
        setTimeout(() => { isScrolling.current = false; }, 600);
      }
    }
  };

  const handleDragEnd = (e, { offset, velocity }) => {
    if (offset.y < -50 || velocity.y < -300) {
      if (activeIndex < reels.length - 1) setActiveIndex(prev => prev + 1);
    } else if (offset.y > 50 || velocity.y > 300) {
      if (activeIndex > 0) setActiveIndex(prev => prev - 1);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ type: "spring", damping: 25, stiffness: 300 }}
      className="fixed inset-0 z-[999] bg-black flex flex-col overflow-hidden"
    >
      {/* ── HEADER ── */}
      <div className="absolute top-0 left-0 right-0 z-50 flex justify-between items-center p-4 bg-gradient-to-b from-black/50 to-transparent pointer-events-none">
        <span className="text-white font-bold text-lg pointer-events-auto">Reels</span>
        <button
          onClick={(e) => { e.stopPropagation(); onClose(); }}
          className="w-9 h-9 rounded-full bg-black/40 backdrop-blur-md border border-white/20
                     flex items-center justify-center text-white hover:bg-black/60 transition-colors active:scale-90 pointer-events-auto"
        >
          <X size={20} />
        </button>
      </div>

      {/* ── SCROLL CONTAINER ── */}
      <div
        className="flex-1 w-full h-full relative touch-none"
        onWheel={handleWheel}
      >
        <motion.div
          drag="y"
          dragConstraints={{ top: 0, bottom: 0 }}
          onDragEnd={handleDragEnd}
          animate={{ y: `-${activeIndex * 100}%` }}
          transition={{ type: "spring", damping: 28, stiffness: 200 }}
          className="w-full h-full"
        >
          {reels.map((reel, i) => (
            <div
              key={reel.id}
              className="w-full h-full relative shrink-0"
            >
              <FullscreenReelItem reel={reel} isActive={activeIndex === i} />
            </div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}

function FullscreenReelItem({ reel, isActive }) {
  const videoRef = useRef(null);
  const [paused, setPaused] = useState(!isActive);
  const [progress, setProgress] = useState(0);
  const [liked, setLiked] = useState(false);
  const [following, setFollowing] = useState(false);
  const [burst, setBurst] = useState(false);
  const lastTap = useRef(0);

  // Play / Pause based on active state
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isActive) {
      video.play().catch(() => { });
      setPaused(false);
    } else {
      video.pause();
      setPaused(true);
    }
  }, [isActive]);

  // Progress Bar tracking (only when active)
  useEffect(() => {
    if (!isActive) return;
    const video = videoRef.current;
    if (!video) return;

    let rafId;
    const tick = () => {
      if (video.duration) setProgress(video.currentTime / video.duration);
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(rafId);
  }, [isActive]);

  const handleTap = useCallback((e) => {
    // double-tap = like
    const now = Date.now();
    if (now - lastTap.current < 280) {
      setLiked(true);
      setBurst(true);
      setTimeout(() => setBurst(false), 650);
    }
    lastTap.current = now;

    // single tap = pause/play
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().catch(() => { });
      setPaused(false);
    } else {
      video.pause();
      setPaused(true);
    }
  }, []);

  return (
    <div
      className="relative flex-1 w-full h-full select-none"
      onClick={handleTap}
    >
      <video
        ref={videoRef}
        src={reel.video}
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* dark scrim */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.3) 35%, transparent 65%, transparent 100%)",
        }}
      />

      {/* Pause overlay */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-300"
        style={{ opacity: paused ? 1 : 0 }}
      >
        <div className="w-16 h-16 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
            <path d="M8 5.14v14l11-7-11-7z" />
          </svg>
        </div>
      </div>

      {/* Double-tap heart burst */}
      <AnimatePresence>
        {burst && (
          <motion.div
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1.15, opacity: 1 }}
            exit={{ scale: 1.6, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none"
          >
            <Heart
              size={100}
              className="text-rose-500 fill-rose-500 drop-shadow-[0_4px_24px_rgba(244,63,94,0.6)]"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── TOP-LEFT: Avatar + Username + Follow ── */}
      <div
        className="absolute top-16 left-4 z-40 flex items-center gap-2.5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 via-pink-500 to-indigo-500 p-[2px] shadow-lg shrink-0">
          <div className="w-full h-full rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center">
            <span className="text-white font-bold text-xs">
              {reel.username.slice(0, 2).toUpperCase()}
            </span>
          </div>
        </div>

        <span
          className="text-white font-semibold text-sm drop-shadow"
          style={{ textShadow: "0 1px 8px rgba(0,0,0,0.6)" }}
        >
          @{reel.username}
        </span>

        <button
          onClick={(e) => { e.stopPropagation(); setFollowing((f) => !f); }}
          className={`text-[11px] font-bold px-3 py-1 rounded-full border transition-all backdrop-blur-md ${following
            ? "border-white/30 bg-white/10 text-white/60"
            : "border-white/60 bg-white/15 text-white hover:bg-white/25"
            }`}
        >
          {following ? "Following" : "Follow"}
        </button>
      </div>

      {/* ── BOTTOM-LEFT: Caption + Audio ── */}
      <div
        className="absolute left-4 bottom-8 z-40 max-w-[70%]"
        onClick={(e) => e.stopPropagation()}
      >
        <p
          className="text-white text-[14px] font-medium leading-relaxed mb-3 drop-shadow"
          style={{ textShadow: "0 1px 10px rgba(0,0,0,0.7)" }}
        >
          {reel.caption}
        </p>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/30 backdrop-blur-sm border border-white/10 inline-flex">
          <Music2 size={14} className="text-white/90 shrink-0" />
          <span
            className="text-white/90 text-[12px] font-medium truncate"
          >
            Original audio · {reel.username}
          </span>
        </div>
      </div>

      {/* ── RIGHT RAIL ── */}
      <div
        className="absolute right-3 bottom-8 z-40 flex flex-col gap-5 items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <RailIcon
          Icon={Heart}
          label={liked ? "128k" : "128k"}
          active={liked}
          onClick={() => setLiked((l) => !l)}
        />
        <RailIcon Icon={MessageCircle} label="842" />
        <RailIcon Icon={Send} label="Share" />
        <RailIcon Icon={Bookmark} label="Save" />
      </div>

      {/* ── PROGRESS BAR ── */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-white/20 z-40">
        <div
          className="h-full bg-white rounded-full transition-none"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
    </div>
  );
}

function RailIcon({ Icon, label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-1.5 active:scale-90 transition-transform group"
    >
      <div
        className={`w-11 h-11 rounded-full flex items-center justify-center backdrop-blur-md transition-all shadow-lg ${active
          ? "text-rose-500"
          : "text-white group-hover:bg-white/10"
          }`}
      >
        <Icon
          size={28}
          fill={active ? "currentColor" : "none"}
          strokeWidth={active ? 0 : 2}
          className="drop-shadow-md"
        />
      </div>
      <span className="text-[11px] text-white font-medium drop-shadow-md">
        {label}
      </span>
    </button>
  );
}
