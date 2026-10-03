import React from "react";
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
  return (
    <div className="w-full h-screen bg-black overflow-hidden">
      {/* 
        Snap-scroll container — each reel snaps to fill the viewport.
        snap-y + snap-mandatory = Instagram-style reel scrolling.
        Each child is exactly 100vh tall.
      */}
      <div className="w-full h-full overflow-y-scroll snap-y snap-mandatory scrollbar-none">
        {REELS.map((reel) => (
          <div
            key={reel.id}
            className="w-full h-screen snap-start snap-always"
          >
            <ReelPlayer src={reel.src} />
          </div>
        ))}
      </div>
    </div>
  );
}
