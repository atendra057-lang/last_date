import React, { useState, useRef, useEffect } from "react";
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
  const containerRef = useRef(null);
  const itemRefs = useRef([]);

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
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        const nextIdx = Math.min(REELS.length - 1, activeIndex + 1);
        itemRefs.current[nextIdx]?.scrollIntoView({ behavior: "smooth", block: "start" });
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        const prevIdx = Math.max(0, activeIndex - 1);
        itemRefs.current[prevIdx]?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex]);

  return (
    <div className="w-full h-screen bg-black overflow-hidden flex items-center justify-center select-none">
      <div
        ref={containerRef}
        className="relative w-full h-full max-w-[480px] mx-auto overflow-y-auto snap-y snap-mandatory overscroll-y-contain scrollbar-none"
      >
        {REELS.map((reel, i) => (
          <div
            key={reel.id}
            ref={(el) => (itemRefs.current[i] = el)}
            data-index={i}
            className="w-full h-screen relative shrink-0 snap-start snap-always"
          >
            <ReelPlayer src={reel.src} isActive={activeIndex === i} />
          </div>
        ))}
      </div>
    </div>
  );
}
