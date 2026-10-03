import React, { useRef, useEffect, useState, useCallback } from "react";

/**
 * ReelPlayer — Full-screen vertical video player (9:16)
 *
 * Props:
 *   src        — video URL (mp4, webm, etc.)
 *   poster     — optional poster/thumbnail image URL
 *   isActive   — whether this reel is the currently visible one (controls autoplay)
 *
 * Features:
 *   • Autoplay when active, pause when offscreen
 *   • Muted by default (browser autoplay policy)
 *   • Loop
 *   • playsInline (critical for iOS)
 *   • object-fit: cover (fills the 9:16 frame, crops overflow)
 *   • Tap to pause/play
 *   • Thin progress bar at the bottom
 */
export default function ReelPlayer({ src, poster, isActive = true }) {
  const videoRef = useRef(null);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  // Autoplay / pause based on visibility
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isActive) {
      video.play().catch(() => { });
      setPaused(false);
    } else {
      video.pause();
      video.currentTime = 0;
      setPaused(false);
    }
  }, [isActive]);

  // Progress bar — updates every animation frame for smoothness
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let rafId;
    const tick = () => {
      if (video.duration) {
        setProgress(video.currentTime / video.duration);
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(rafId);
  }, []);

  // Tap to pause / resume
  const handleTap = useCallback(() => {
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
      className="relative w-full h-full bg-black overflow-hidden select-none"
      style={{ aspectRatio: "9 / 16" }}
      onClick={handleTap}
    >
      {/* Video element */}
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Pause indicator — fades in/out */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-300"
        style={{ opacity: paused ? 1 : 0 }}
      >
        <div className="w-16 h-16 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="white"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M8 5.14v14l11-7-11-7z" />
          </svg>
        </div>
      </div>

      {/* Bottom progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-white/20 z-10">
        <div
          className="h-full bg-white rounded-full transition-none"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
    </div>
  );
}
