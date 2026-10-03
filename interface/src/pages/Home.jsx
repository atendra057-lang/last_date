import React, { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  MoreHorizontal, X, Sparkles, Laugh, HeartHandshake, Landmark, ChefHat,
  Gamepad2, Music, Code, Dumbbell, Compass, Check, Layers, Heart, MessageCircle, Send, Bookmark, Repeat
} from "lucide-react";
import Navbar from "../components/Navbar";
import StoryBar from "../components/StoryBar";
import BottomNav from "../components/BottomNav";
import ReelCard from "../components/ReelCard";
import DirectMessages from "../components/DirectMessages";
import ProfilePage from "../components/ProfilePage";
import ReelFullscreen from "../components/ReelFullscreen";
import ShopPage from "../components/ShopPage";
import SettingsPage from "../components/SettingsPage";

const CATEGORIES = [
  { id: "funny", label: "Funny", desc: "Humor, comedy & trending memes", icon: Laugh, color: "#C9A76A" },
  { id: "romantic", label: "Romantic", desc: "Romance, wholesome & love stories", icon: HeartHandshake, color: "#E58FA8" },
  { id: "politics", label: "Politics", desc: "News, current affairs & debates", icon: Landmark, color: "#8B95FF" },
  { id: "cooking", label: "Cooking", desc: "Recipes, street food & culinary arts", icon: ChefHat, color: "#8FBF8F" },
  { id: "gaming", label: "Gaming", desc: "Esports, gaming clips & tech streams", icon: Gamepad2, color: "#F59E0B" },
  { id: "music", label: "Music", desc: "Trending audio, covers & beats", icon: Music, color: "#EC4899" },
  { id: "tech", label: "Tech & Coding", desc: "Dev tips, AI, gadgets & software", icon: Code, color: "#3B82F6" },
  { id: "fitness", label: "Fitness", desc: "Workouts, health tips & motivation", icon: Dumbbell, color: "#10B981" },
  { id: "travel", label: "Travel", desc: "Wanderlust, scenic views & nature", icon: Compass, color: "#06B6D4" },
  { id: "fashion", label: "Fashion & Style", desc: "Outfits, aesthetics & beauty tips", icon: Sparkles, color: "#A855F7" },
];

// Placeholder feed data — replace with real API data later.
// `reason` powers the subtle "Why this reel?" trust feature.
const REELS = [
  {
    id: "r1",
    username: "dev_ops",
    caption: "just a regular tuesday ✂️",
    reason: "Shown because you follow similar creators",
    video: "/videos/Cooking/cook1.mp4",
  },
  {
    id: "r2",
    username: "meher_",
    caption: "five minutes of peace before the day starts",
    reason: "Shown because it's trending in Relaxing",
    video: "/videos/Cooking/cook2.mp4",
  },
  {
    id: "r3",
    username: "arjun.k",
    caption: "this recipe took three tries to get right",
    reason: "Shown because you selected Cooking",
    video: "/videos/Cooking/cook3.mp4",
  },
  {
    id: "r4",
    username: "kavya",
    caption: "studio lights, take two",
    reason: "Shown because friends you follow liked this",
    video: "/videos/Cooking/cook4.mp4",
  },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState("home");
  const [activeReasonId, setActiveReasonId] = useState(null);
  const [fullscreenReel, setFullscreenReel] = useState(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const reelRefs = useRef([]);
  const activeReel = REELS.find((r) => r.id === activeReasonId);

  // IntersectionObserver — play only when reel is ≥70% visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.dataset.index);
            setActiveIndex(idx);
          }
        });
      },
      { threshold: 0.7 }
    );
    reelRefs.current.forEach((el) => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  const pickCategory = (cat) => {
    setActiveCategory(cat);
    setSheetOpen(false);
  };

  return (
    <div className="h-screen bg-white flex flex-col relative overflow-hidden">
      {activeTab === "messages" ? (
        <DirectMessages onBack={() => setActiveTab("home")} />
      ) : activeTab === "settings" ? (
        <SettingsPage onBack={() => setActiveTab("profile")} />
      ) : activeTab === "profile" ? (
        <ProfilePage onBack={() => setActiveTab("home")} onSettings={() => setActiveTab("settings")} />
      ) : activeTab === "shop" ? (
        <ShopPage onBack={() => setActiveTab("home")} />
      ) : (
        <>
          <Navbar />
          <StoryBar />

          {/* Active mood chip — iPhone glass badge */}
          {activeCategory && (
            <div className="px-5 pt-3">
              <button
                onClick={() => setActiveCategory(null)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md border border-white/20 shadow-sm transition-transform active:scale-95"
                style={{ background: activeCategory.color + "33", color: "#FFFFFF", borderColor: activeCategory.color + "88" }}
              >
                <activeCategory.icon size={13} color={activeCategory.color} />
                {activeCategory.label}
                <X size={13} className="opacity-80" />
              </button>
            </div>
          )}

          {/* Feed */}
          <div className="flex-1 overflow-y-auto snap-y snap-mandatory scrollbar-none pb-28">
            {REELS.map((reel, i) => (
              <div
                key={reel.id}
                ref={(el) => (reelRefs.current[i] = el)}
                data-index={i}
                className="relative snap-start flex flex-col bg-white"
              >
                <div onClick={() => setFullscreenReel(reel)} className="cursor-pointer">
                  <ReelCard reel={reel} isActive={activeIndex === i && !fullscreenReel} isFeedMode={true} />
                </div>

                {/* Separator / Action Bar */}
                <div className="flex flex-col px-3.5 py-2.5 bg-white/60 backdrop-blur-xl border border-white/60 shadow-[0_4px_16px_rgba(0,0,0,0.06)] rounded-[22px] mx-2 -mt-5 relative z-10 mb-5">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-5">
                      <button onClick={() => setFullscreenReel(reel)} className="flex items-center gap-1.5 active:scale-90 transition-transform">
                        <Heart size={23} className="text-slate-800 hover:text-slate-500 transition-colors" strokeWidth={1.5} />
                        <span className="text-[13.5px] font-medium text-slate-800">{reel.likes || "1.2K"}</span>
                      </button>
                      <button onClick={() => setFullscreenReel(reel)} className="flex items-center gap-1.5 active:scale-90 transition-transform">
                        <MessageCircle size={23} className="text-slate-800 hover:text-slate-500 transition-colors" strokeWidth={1.5} />
                        <span className="text-[13.5px] font-medium text-slate-800">{reel.comments || "33"}</span>
                      </button>
                      <button onClick={() => setFullscreenReel(reel)} className="flex items-center gap-1.5 active:scale-90 transition-transform">
                        <Repeat size={23} className="text-slate-800 hover:text-slate-500 transition-colors" strokeWidth={1.5} />
                        <span className="text-[13.5px] font-medium text-slate-800">{reel.shares || "45"}</span>
                      </button>
                      <button onClick={() => setFullscreenReel(reel)} className="flex items-center gap-1.5 active:scale-90 transition-transform">
                        <Send size={23} className="text-slate-800 hover:text-slate-500 transition-colors" strokeWidth={1.5} />
                      </button>
                    </div>
                  </div>
                  <p className="text-[13.5px] text-slate-900 line-clamp-2 mt-0.5">
                    <span className="font-semibold mr-1.5">{reel.username}</span>
                    {reel.caption}
                  </p>
                  <button onClick={() => setFullscreenReel(reel)} className="text-[13px] text-slate-500 mt-1 text-left font-medium">
                    View all 842 comments
                  </button>
                </div>

                {/* "Why this reel?" button */}
                <button
                  onClick={() => setActiveReasonId(reel.id)}
                  className="absolute top-5 right-4 w-8 h-8 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-md border border-white/15
                             flex items-center justify-center active:scale-90 transition-all z-30"
                  aria-label="More options"
                >
                  <MoreHorizontal size={16} className="text-white" />
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      <BottomNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onReelsClick={() => setSheetOpen(true)}
      />

      {/* "Why this reel?" sheet in iPhone Glass style */}
      <AnimatePresence>
        {activeReel && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-[3px] z-40"
              onClick={() => setActiveReasonId(null)}
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 260 }}
              className="fixed left-0 right-0 bottom-0 z-50 mx-auto max-w-md
                         bg-black/45 backdrop-blur-3xl border border-white/20 rounded-t-[32px] px-6 pt-3 pb-8 shadow-[0_-12px_40px_rgba(0,0,0,0.6)] ring-1 ring-white/10"
            >
              <div className="w-12 h-1.5 rounded-full bg-white/20 mx-auto mb-5" />

              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-periwinkle/30 border border-periwinkle/40 backdrop-blur-md flex items-center justify-center">
                    <Sparkles size={15} className="text-white" />
                  </div>
                  <span className="text-white font-semibold text-sm drop-shadow-xs">Why this reel?</span>
                </div>
                <button
                  onClick={() => setActiveReasonId(null)}
                  className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center text-white/80"
                >
                  <X size={15} />
                </button>
              </div>

              <p className="text-white/90 text-sm leading-relaxed mb-1.5 font-normal">
                {activeReel.reason}.
              </p>
              <p className="text-white/60 text-xs leading-relaxed">
                You can adjust what shows up on your feed anytime from your preferences.
              </p>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Mood / category preference floating scrollable popover (iPhone Light Theme Glass style) */}
      <AnimatePresence>
        {sheetOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-0 bg-black/15 backdrop-blur-[2px] z-40"
              onClick={() => setSheetOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.88, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.88, y: 15 }}
              transition={{ type: "spring", damping: 25, stiffness: 340 }}
              className="fixed bottom-20 left-0 right-0 mx-auto z-50 w-64 sm:w-72 max-w-[85vw]
                         bg-white/30 backdrop-blur-3xl border border-white/70 rounded-[28px] p-3.5
                         shadow-[0_16px_40px_rgba(0,0,0,0.15)] ring-1 ring-white/40 flex flex-col max-h-[310px]"
            >
              {/* Header handle & title */}
              <div className="flex items-center justify-between px-2 pt-0.5 pb-2 shrink-0 border-b border-black/10 mb-2">
                <span className="text-slate-900 font-bold text-[11px] tracking-wider uppercase opacity-90">
                  Select Mood
                </span>
                <button
                  onClick={() => setSheetOpen(false)}
                  className="w-5 h-5 rounded-full bg-white/40 hover:bg-white/70 backdrop-blur-md flex items-center justify-center text-slate-800 transition-colors shadow-xs"
                >
                  <X size={12} />
                </button>
              </div>

              {/* Scrollable vertical stacked cards (~3 visible at a time) */}
              <div className="overflow-y-auto flex-1 space-y-2 pr-0.5 py-0.5 scrollbar-none">
                <button
                  onClick={() => pickCategory(null)}
                  className={`w-full flex items-center justify-between p-2.5 rounded-2xl border transition-all text-left backdrop-blur-md ${
                    !activeCategory
                      ? "border-slate-900/80 bg-slate-900/85 text-white shadow-md ring-1 ring-slate-800"
                      : "border-white/60 bg-white/40 hover:bg-white/60 text-slate-900 shadow-xs"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border backdrop-blur-sm ${
                      !activeCategory ? "bg-white/20 border-white/30 text-white" : "bg-white/70 border-white/80 text-slate-900 shadow-xs"
                    }`}>
                      <Layers size={16} />
                    </div>
                    <div className="min-w-0">
                      <div className="font-bold text-[15px] tracking-tight truncate">All Feeds</div>
                    </div>
                  </div>
                  {!activeCategory && (
                    <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm">
                      <Check size={12} className="text-slate-900 stroke-[3]" />
                    </div>
                  )}
                </button>

                {CATEGORIES.map((cat) => {
                  const isSelected = activeCategory?.id === cat.id;
                  const IconComponent = cat.icon;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => pickCategory(cat)}
                      className={`w-full flex items-center justify-between p-2.5 rounded-2xl border transition-all text-left group backdrop-blur-md ${
                        isSelected
                          ? "border-slate-900/80 bg-slate-900/85 text-white shadow-md ring-1 ring-slate-800"
                          : "border-white/60 bg-white/40 hover:bg-white/60 text-slate-900 shadow-xs"
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border border-white/60 transition-transform group-hover:scale-105 shadow-xs backdrop-blur-sm"
                          style={{ background: isSelected ? "rgba(255,255,255,0.2)" : cat.color + "28" }}
                        >
                          <IconComponent size={16} color={isSelected ? "#FFFFFF" : cat.color} strokeWidth={2} />
                        </div>
                        <div className="min-w-0">
                          <div className="font-bold text-[15px] tracking-tight truncate">{cat.label}</div>
                        </div>
                      </div>
                      {isSelected ? (
                        <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center shrink-0 ml-1 shadow-sm">
                          <Check size={12} className="text-slate-900 stroke-[3]" />
                        </div>
                      ) : (
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-400 group-hover:bg-slate-600 shrink-0 ml-1 transition-colors" />
                      )}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Fullscreen Reel Overlay */}
      <AnimatePresence>
        {fullscreenReel && (
          <ReelFullscreen
            reels={REELS}
            initialReelId={fullscreenReel.id}
            onClose={() => setFullscreenReel(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

