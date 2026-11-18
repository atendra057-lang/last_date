import React, { useState, useRef, useEffect, useLayoutEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, MessageCircle, Send, Bookmark, Music2, X } from "lucide-react";

/**
 * ReelFullscreen — Instagram-style full-screen reel overlay with native GPU-composited vertical scrolling.
 */
export default function ReelFullscreen({ reels, initialReelId, onClose }) {
  const initialIndex = Math.max(0, reels.findIndex((r) => r.id === initialReelId));
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const containerRef = useRef(null);
  const itemRefs = useRef([]);

  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  // Jump instantly to initial reel before paint
  useLayoutEffect(() => {
    const container = containerRef.current;
    if (container && initialIndex > 0) {
      container.scrollTop = initialIndex * container.clientHeight;
    }
  }, [initialIndex]);

  // Track active reel via IntersectionObserver (zero scroll-thread lag)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.dataset.index);
            setActiveIndex(idx);
          }
        });
      },
      { root: container, threshold: 0.6 }
    );

    itemRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [reels.length]);

  // Keyboard navigation for desktop Chrome
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        const nextIdx = Math.min(reels.length - 1, activeIndex + 1);
        itemRefs.current[nextIdx]?.scrollIntoView({ behavior: "smooth", block: "start" });
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        const prevIdx = Math.max(0, activeIndex - 1);
        itemRefs.current[prevIdx]?.scrollIntoView({ behavior: "smooth", block: "start" });
      } else if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, reels.length, onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      className="fixed inset-0 z-[999] bg-black flex flex-col overflow-hidden select-none"
    >
      {/* ── HEADER ── */}
      <div className="absolute top-0 left-0 right-0 z-50 flex justify-between items-center p-4 bg-gradient-to-b from-black/60 to-transparent pointer-events-none">
        <span className="text-white font-bold text-lg pointer-events-auto drop-shadow-md">Reels</span>
        <button
          onClick={(e) => { e.stopPropagation(); onClose(); }}
          className="w-9 h-9 rounded-full bg-black/40 backdrop-blur-md border border-white/20
                     flex items-center justify-center text-white hover:bg-black/60 transition-colors active:scale-90 pointer-events-auto"
        >
          <X size={20} />
        </button>
      </div>

      {/* ── NATIVE GPU-COMPOSITED SCROLL CONTAINER (Instagram-style 120fps snap) ── */}
      <div
        ref={containerRef}
        className="flex-1 w-full h-full overflow-y-auto snap-y snap-mandatory overscroll-y-contain scrollbar-none"
      >
        {reels.map((reel, i) => (
          <div
            key={reel.id}
            ref={(el) => (itemRefs.current[i] = el)}
            data-index={i}
            className="w-full h-full relative shrink-0 snap-start snap-always"
          >
            <FullscreenReelItem reel={reel} isActive={activeIndex === i} />
          </div>
        ))}
      </div>

      {/* ── SLIDE INDICATOR ── */}
      {reels.length > 1 && (
        <div className="absolute right-1.5 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-1.5 pointer-events-none">
          {reels.map((_, idx) => (
            <div
              key={idx}
              className={`w-1 rounded-full transition-all duration-300 ${
                activeIndex === idx
                  ? "h-4 bg-white shadow-sm"
                  : "h-1 bg-white/30"
              }`}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}

function FullscreenReelItem({ reel, isActive }) {
  const videoRef = useRef(null);
  const progressBarRef = useRef(null);
  const [paused, setPaused] = useState(!isActive);
  const [liked, setLiked] = useState(false);
  const [following, setFollowing] = useState(false);
  const [burst, setBurst] = useState(false);
  const lastTap = useRef(0);

  // Play / Pause based on active state
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isActive) {
      video.play().catch(() => {});
      setPaused(false);
    } else {
      video.pause();
      setPaused(true);
      if (progressBarRef.current) {
        progressBarRef.current.style.transform = "scaleX(0)";
      }
    }
  }, [isActive]);

  // Zero-re-render progress bar tracking (mutates DOM style via ref only when active)
  useEffect(() => {
    if (!isActive) return;
    const video = videoRef.current;
    if (!video) return;

    let rafId;
    const tick = () => {
      if (video.duration && progressBarRef.current) {
        const ratio = video.currentTime / video.duration;
        progressBarRef.current.style.transform = `scaleX(${ratio})`;
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(rafId);
  }, [isActive]);

  const handleTap = useCallback(() => {
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
      video.play().catch(() => {});
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
        preload={isActive ? "auto" : "metadata"}
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

      {/* ── PROGRESS BAR (GPU-composited scaleX, zero React re-renders) ── */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-white/20 z-40 overflow-hidden">
        <div
          ref={progressBarRef}
          className="h-full w-full bg-white origin-left will-change-transform"
          style={{ transform: "scaleX(0)" }}
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
