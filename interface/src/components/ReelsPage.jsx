import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import ReelPlayer from "./reels/ReelPlayer";

// All cooking reels — paths are relative to /public
const REELS = [
  { id: "cook1", src: "/videos/Cooking/cook1.mp4" },
  { id: "cook2", src: "/videos/Cooking/cook2.mp4" },
  { id: "cook3", src: "/videos/Cooking/cook3.mp4" },
  { id: "cook4", src: "/videos/Cooking/cook4.mp4" },
  { id: "cook5", src: "/videos/Cooking/cook5.mp4" },
  { id: "cook6", src: "/videos/Cooking/cook6.mp4" },
  { id: "cook7", src: "/videos/Cooking/cook7.mp4" },
  { id: "cook8", src: "/videos/Cooking/cook8.mp4" },
  { id: "cook9", src: "/videos/Cooking/cook9.mp4" },
];

export default function ReelsPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const isScrolling = useRef(false);
  const wheelAccumulator = useRef(0);
  const wheelTimeout = useRef(null);

  // Effortless low-friction magnetic wheel scrolling for Chrome & trackpads
  const handleWheel = useCallback((e) => {
    if (isScrolling.current) return;

    wheelAccumulator.current += e.deltaY;
    clearTimeout(wheelTimeout.current);
    wheelTimeout.current = setTimeout(() => {
      wheelAccumulator.current = 0;
    }, 140);

    const THRESHOLD = 16;
    if (wheelAccumulator.current > THRESHOLD) {
      if (activeIndex < REELS.length - 1) {
        isScrolling.current = true;
        wheelAccumulator.current = 0;
        setActiveIndex((prev) => prev + 1);
        setTimeout(() => { isScrolling.current = false; }, 380);
      }
    } else if (wheelAccumulator.current < -THRESHOLD) {
      if (activeIndex > 0) {
        isScrolling.current = true;
        wheelAccumulator.current = 0;
        setActiveIndex((prev) => prev - 1);
        setTimeout(() => { isScrolling.current = false; }, 380);
      }
    }
  }, [activeIndex]);

  // Magnetic drag handling: effortless swipe with low threshold & fluid elasticity
  const handleDragEnd = (e, { offset, velocity }) => {
    const swipeThreshold = 25;
    const velocityThreshold = 70;

    if (offset.y < -swipeThreshold || velocity.y < -velocityThreshold) {
      if (activeIndex < REELS.length - 1) {
        setActiveIndex((prev) => prev + 1);
      }
    } else if (offset.y > swipeThreshold || velocity.y > velocityThreshold) {
      if (activeIndex > 0) {
        setActiveIndex((prev) => prev - 1);
      }
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        if (activeIndex < REELS.length - 1) setActiveIndex((prev) => prev + 1);
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        if (activeIndex > 0) setActiveIndex((prev) => prev - 1);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex]);

  return (
    <div className="w-full h-screen bg-black overflow-hidden flex items-center justify-center select-none">
      <div
        className="relative w-full h-full max-w-[480px] mx-auto overflow-hidden touch-none"
        onWheel={handleWheel}
      >
        <motion.div
          drag="y"
          dragConstraints={{ top: 0, bottom: 0 }}
          dragElastic={0.65}
          onDragEnd={handleDragEnd}
          animate={{ y: `-${activeIndex * 100}%` }}
          transition={{ type: "spring", damping: 30, stiffness: 300, mass: 0.8 }}
          className="w-full h-full cursor-grab active:cursor-grabbing"
        >
          {REELS.map((reel, i) => (
            <div
              key={reel.id}
              className="w-full h-full relative shrink-0"
            >
              <ReelPlayer src={reel.src} isActive={activeIndex === i} />
            </div>
          ))}
        </motion.div>

        {/* Magnetic Slide Indicator */}
        <div className="absolute right-2 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-1.5 pointer-events-none">
          {REELS.map((_, idx) => (
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
      </div>
    </div>
  );
}
