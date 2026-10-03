import React from "react";
import ReelPlayer from "../components/reels/ReelPlayer";

/**
 * ReelsPage — Demo page for testing the ReelPlayer component.
 * Uses free sample videos. Replace with real content later.
 */

// Free public-domain sample videos (short clips, vertical-friendly)
const SAMPLE_REELS = [
  {
    id: "demo-1",
    src: "https://assets.mixkit.co/videos/1224/1224-720.mp4",
    poster: "",
  },
];

export default function ReelsPage() {
  return (
    <div className="h-screen w-full bg-black flex items-center justify-center">
      {/* Container constrains to 9:16 on desktop, full-screen on mobile */}
      <div
        className="relative w-full h-full max-w-[480px] mx-auto overflow-hidden"
        style={{ maxHeight: "100dvh" }}
      >
        {SAMPLE_REELS.map((reel) => (
          <ReelPlayer
            key={reel.id}
            src={reel.src}
            poster={reel.poster}
            isActive={true}
          />
        ))}
      </div>
    </div>
  );
}
