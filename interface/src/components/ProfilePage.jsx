import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Search, Grid, Film, UserSquare2, ChevronUp, Menu, Edit3, Camera, X, Check, Upload, Image as ImageIcon, MoreVertical, MoveVertical } from "lucide-react";

export default function ProfilePage({ onBack, onSettings }) {
  const [isScrolledUp, setIsScrolledUp] = useState(false);
  const scrollRef = useRef(null);
  const isScrolling = useRef(false);

  // Profile editable state
  const [profile, setProfile] = useState({
    name: "Shivansh Saxena",
    username: "shivanshsaxena_ji",
    bio: "President, CS Dept | ABC (DU'26) 🎓\nTech Enthusiast | Researcher 💻\nBuilding, learning, leading 🔹\nDriven by innovation, defined by humility ✨\nwww.fiverr.com/share/K3g6D4",
    avatar: "/shivansh.jpg",
    background: "/bg.jpg",
    bgPositionY: 65,
    posts: "21",
    followers: "790",
    following: "1,976",
  });

  // Modal State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editForm, setEditForm] = useState({ ...profile });

  // File Input Refs
  const avatarInputRef = useRef(null);
  const bgInputRef = useRef(null);

  const wheelAccumulator = useRef(0);
  const wheelTimeout = useRef(null);

  const handleWheel = (e) => {
    if (isScrolling.current || isEditModalOpen) return;

    wheelAccumulator.current += e.deltaY;
    clearTimeout(wheelTimeout.current);
    wheelTimeout.current = setTimeout(() => {
      wheelAccumulator.current = 0;
    }, 120);

    const THRESHOLD = 35;
    if (!isScrolledUp) {
      if (wheelAccumulator.current > THRESHOLD) {
        isScrolling.current = true;
        wheelAccumulator.current = 0;
        setIsScrolledUp(true);
        setTimeout(() => { isScrolling.current = false; }, 380);
      }
    } else {
      if (wheelAccumulator.current < -THRESHOLD && scrollRef.current && scrollRef.current.scrollTop <= 0) {
        isScrolling.current = true;
        wheelAccumulator.current = 0;
        setIsScrolledUp(false);
        setTimeout(() => { isScrolling.current = false; }, 380);
      }
    }
  };

  const handleDragEnd = (e, { offset, velocity }) => {
    if (isEditModalOpen) return;
    const swipeThreshold = 35;
    const velocityThreshold = 120;

    if (!isScrolledUp) {
      if (offset.y < -swipeThreshold || velocity.y < -velocityThreshold) {
        setIsScrolledUp(true);
      }
    } else {
      if (scrollRef.current && scrollRef.current.scrollTop <= 0) {
        if (offset.y > swipeThreshold || velocity.y > velocityThreshold) {
          setIsScrolledUp(false);
        }
      }
    }
  };

  // Image Upload Handlers
  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setEditForm(prev => ({ ...prev, avatar: reader.result }));
        setProfile(prev => ({ ...prev, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBgChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setEditForm(prev => ({ ...prev, background: reader.result }));
        setProfile(prev => ({ ...prev, background: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = () => {
    setProfile({ ...editForm });
    setIsEditModalOpen(false);
  };

  return (
    <div className="relative w-full h-full overflow-hidden bg-black touch-none">
      {/* Hidden File Inputs for quick image editing */}
      <input 
        type="file" 
        ref={avatarInputRef} 
        accept="image/*" 
        className="hidden" 
        onChange={handleAvatarChange} 
      />
      <input 
        type="file" 
        ref={bgInputRef} 
        accept="image/*" 
        className="hidden" 
        onChange={handleBgChange} 
      />

      {/* Full-screen background photo (Fixed) */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <img
          src={profile.background}
          alt="Profile background"
          className="w-full h-full object-cover"
          style={{ objectPosition: `center ${profile.bgPositionY ?? 65}%` }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.0) 30%, rgba(0,0,0,0.2) 60%, rgba(0,0,0,0.8) 100%)",
          }}
        />
      </div>

      {/* Header controls (Fixed Top Bar) */}
      <motion.div 
        className="fixed top-0 left-0 right-0 z-30 flex items-center justify-between p-4 pointer-events-none"
        animate={{ opacity: isScrolledUp ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      >
        <button 
          onClick={onBack}
          className="w-9 h-9 rounded-full bg-black/20 backdrop-blur-md border border-white/15 flex items-center justify-center active:scale-90 transition-all pointer-events-auto"
        >
          <ArrowLeft size={20} className="text-white" strokeWidth={2} />
        </button>
        <button 
          onClick={onSettings}
          className="w-9 h-9 rounded-full bg-black/20 backdrop-blur-md border border-white/15 flex items-center justify-center active:scale-90 transition-all pointer-events-auto"
        >
          <MoreVertical size={18} className="text-white" strokeWidth={2} />
        </button>
      </motion.div>

      {/* Scrollable Content Wrapper */}
      <motion.div
        className="relative z-10 w-full h-[200vh] will-change-transform"
        animate={{ y: isScrolledUp ? "-100vh" : "0vh" }}
        transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
        drag={isScrolledUp ? false : "y"}
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={0.4}
        onDragEnd={handleDragEnd}
        onWheel={handleWheel}
      >
        {/* PAGE 1: Intro / Glass Card */}
        <div className="w-full h-[100vh] relative pointer-events-none">
          {/* Floating glass card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.12, ease: "easeOut" }}
            className="absolute flex flex-col pointer-events-auto"
            style={{
              top: "55%",
              transform: "translateY(-50%)",
              right: "0",
              width: "78%",
              maxWidth: "90%",
              minWidth: "320px",
              background: "rgba(255,255,255,0.07)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "32px 0 0 32px",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08), 0 8px 32px rgba(0,0,0,0.2)",
              padding: "20px",
            }}
          >
            {/* Profile pic + Name row */}
            <div className="flex items-center gap-3">
              <div
                onClick={() => {
                  setEditForm({ ...profile });
                  setIsEditModalOpen(true);
                }}
                className="w-14 h-14 rounded-full shrink-0 border-2 border-white/25 overflow-hidden relative group cursor-pointer"
                style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.2)" }}
              >
                <img
                  src={profile.avatar}
                  alt="Profile"
                  className="w-full h-full object-cover"
                  style={{ objectPosition: "center 15%" }}
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                  <Camera size={16} className="text-white" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h1
                  className="text-white font-extrabold leading-[1.1] whitespace-pre-wrap"
                  style={{
                    fontSize: "clamp(1.3rem, 4.5vw, 1.7rem)",
                    textShadow: "0 1px 12px rgba(0,0,0,0.3)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {profile.name}
                </h1>
                <p className="text-white/60 text-[11px] font-medium">@{profile.username}</p>
              </div>
            </div>

            {/* Divider */}
            <div className="mt-3 mb-3" style={{ height: "1px", background: "rgba(255,255,255,0.12)" }} />

            {/* Stats row */}
            <div className="flex items-center gap-4 mb-4 justify-between px-2">
              {[
                { value: profile.posts, label: "Posts" },
                { value: profile.followers, label: "Followers" },
                { value: profile.following, label: "Following" },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col items-center">
                  <span className="text-white font-bold text-[15px] tracking-tight">{stat.value}</span>
                  <span className="text-white/70 text-[10px] font-medium tracking-wide uppercase mt-0.5">{stat.label}</span>
                </div>
              ))}
            </div>

            {/* Bio */}
            <div className="text-white/80 text-[11px] leading-snug font-medium mb-4 whitespace-pre-wrap break-words">
              {profile.bio}
            </div>

            {/* Action buttons row */}
            <div className="flex items-center gap-2">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setEditForm({ ...profile });
                  setIsEditModalOpen(true);
                }}
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-[12px] font-semibold text-[12px] tracking-tight transition-all shadow-sm"
                style={{ background: "rgba(255,255,255,0.25)", color: "#fff", border: "none" }}
              >
                Edit Profile
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.9 }}
                className="w-9 h-9 rounded-[12px] flex items-center justify-center shrink-0 transition-all"
                style={{ background: "rgba(255,255,255,0.2)", border: "none" }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.9 }}
                className="w-9 h-9 rounded-[12px] flex items-center justify-center shrink-0 transition-all"
                style={{ background: "rgba(255,255,255,0.2)", border: "none" }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/>
                </svg>
              </motion.button>
            </div>
          </motion.div>

          {/* Swipe up hint */}
          <div className="absolute bottom-[20px] left-0 right-0 flex flex-col items-center justify-center animate-bounce opacity-70 pointer-events-none">
            <span className="text-[10px] font-semibold text-white tracking-widest uppercase mb-1 drop-shadow-md">Scroll Up</span>
            <ChevronUp size={16} className="text-white drop-shadow-md" />
          </div>
        </div>

        {/* PAGE 2: Profile Content (Posts, Reels, Tags) */}
        <div 
          ref={scrollRef}
          className={`w-full bg-white h-[100vh] rounded-t-[36px] shadow-[0_-12px_40px_rgba(0,0,0,0.6)] relative z-20 pt-6 pb-24 flex flex-col ${isScrolledUp ? "overflow-y-auto scrollbar-none touch-auto pointer-events-auto" : "overflow-hidden touch-none pointer-events-none"}`}
          onWheel={(e) => {
            if (isScrolledUp && scrollRef.current) {
              if (scrollRef.current.scrollTop > 0 || e.deltaY > 0) {
                e.stopPropagation();
              }
            }
          }}
        >
          {/* Scroll down indicator line */}
          <div className="w-12 h-1 bg-slate-300 rounded-full mx-auto mb-4 shrink-0" />

          {/* User Handle & Stats Top Row */}
          <div className="px-6 mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900 leading-tight">{profile.name}</h2>
              <p className="text-xs text-slate-500 font-medium">@{profile.username}</p>
            </div>
            <button 
              onClick={() => {
                setEditForm({ ...profile });
                setIsEditModalOpen(true);
              }}
              className="px-4 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-900 text-[13px] font-semibold transition-all flex items-center gap-1.5"
            >
              Edit Profile
            </button>
          </div>

          {/* Story Highlights */}
          <div className="flex gap-4 overflow-x-auto px-6 pb-4 scrollbar-none shrink-0">
            {[
              { name: "✨", img: "https://scontent-del3-2.cdninstagram.com/v/t51.75761-15/519417855_18278278774282319_5927517926105315582_n.jpg?stp=c0.560.1440.1440a_dst-jpg_e15_s150x150_tt6&_nc_cat=107&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IlNUT1JZLnhwaWRzLjE0NDAuc2RyLnZpZGVvX2RlZmF1bHRfY292ZXJfZnJhbWUuQzMifQ%3D%3D&_nc_ohc=O1tL0e81wSgQ7kNvwEuq3b1&_nc_oc=AdrcwH-Wb3S8iEeyxXl0sXyW3-VbH2tUqK9u0S0H3i-7&_nc_zt=23&_nc_ht=scontent-del3-2.cdninstagram.com&_nc_gid=m9zOWesEkhc2ClyJ-jQ0EA&_nc_ss=7b6a8&oh=00_AQN_iYFh6OaT03P1Xv2Wv56g-1k&oe=6AC30521" },
              { name: "⚡", img: "https://scontent-del3-1.cdninstagram.com/v/t51.75761-15/516999333_18277647226282319_4030638101704535311_n.jpg?stp=c0.560.1440.1440a_dst-jpg_e15_s150x150_tt6&_nc_cat=104&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IlNUT1JZLnhwaWRzLjE0NDAuc2RyLnZpZGVvX2RlZmF1bHRfY292ZXJfZnJhbWUuQzMifQ%3D%3D&_nc_ohc=Fk1Q0vY2K_cQ7kNvwEEsL1p&_nc_oc=Adog3X-PZg4L5K4hV3-q1H8k1u0&_nc_zt=23&_nc_ht=scontent-del3-1.cdninstagram.com&_nc_gid=m9zOWesEkhc2ClyJ-jQ0EA&_nc_ss=7b6a8&oh=00_AQM-4o6G1t0k-xJ2m0p2G0P&oe=6AC31A0F" },
              { name: "CS", img: "https://scontent-del3-1.cdninstagram.com/v/t51.75761-15/516246408_18277647013282319_4896752701048684705_n.jpg?stp=c0.560.1440.1440a_dst-jpg_e15_s150x150_tt6&_nc_cat=106&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IlNUT1JZLnhwaWRzLjE0NDAuc2RyLnZpZGVvX2RlZmF1bHRfY292ZXJfZnJhbWUuQzMifQ%3D%3D&_nc_ohc=N_n4K4t_m4cQ7kNvwFRt1Z_&_nc_oc=Adp84U0X1L3e2u0P-Q7Z3V0m5T0&_nc_zt=23&_nc_ht=scontent-del3-1.cdninstagram.com&_nc_gid=m9zOWesEkhc2ClyJ-jQ0EA&_nc_ss=7b6a8&oh=00_AQMz9r-5V8a-92z7t2&oe=6AC30521" },
              { name: "Delhi", img: "https://scontent-del3-2.cdninstagram.com/v/t51.82787-15/534005118_18285337588282319_5923985791244304895_n.jpg?stp=c0.560.1440.1440a_dst-jpg_e15_s150x150_tt6&_nc_cat=108&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IlNUT1JZLnhwaWRzLjE0NDAuc2RyLnZpZGVvX2RlZmF1bHRfY292ZXJfZnJhbWUuQzMifQ%3D%3D&_nc_ohc=3B_aF9Z_uAQQ7kNvwHGz21Z&_nc_oc=Adp0Q7h1v4V-2W0z1u0K&_nc_zt=23&_nc_ht=scontent-del3-2.cdninstagram.com&_nc_gid=m9zOWesEkhc2ClyJ-jQ0EA&_nc_ss=7b6a8&oh=00_AQMu0F3PzV2T-y1z5t&oe=6AC2FC9F" },
              { name: "Weather", img: "https://scontent-del3-2.cdninstagram.com/v/t51.82787-15/533969364_18285337477282319_9194733288393582484_n.jpg?stp=c0.560.1440.1440a_dst-jpg_e15_s150x150_tt6&_nc_cat=110&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IlNUT1JZLnhwaWRzLjE0NDAuc2RyLnZpZGVvX2RlZmF1bHRfY292ZXJfZnJhbWUuQzMifQ%3D%3D&_nc_ohc=m8Rnej8zzFIQ7kNvwFJrvWA&_nc_oc=AdrRUtywyUi4j4S6mFgXKN4lCNUghaXVmZQ69U3S7IhhtMNcGBipdffiC77Ga5JuLU8&_nc_zt=23&_nc_ht=scontent-del3-2.cdninstagram.com&_nc_gid=m9zOWesEkhc2ClyJ-jQ0EA&_nc_ss=7b6a8&oh=00_AQOJNgnLfJKw8-FGb4g3aQg3E2sasfthqel8DWHISziXRw&oe=6AC2F456" },
              { name: "Travel", img: "https://scontent-del3-2.cdninstagram.com/v/t51.75761-15/498285297_18274867570282319_5794453631729103284_n.jpg?stp=c0.560.1440.1440a_dst-jpg_e15_s150x150_tt6&_nc_cat=110&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IlNUT1JZLnhwaWRzLjE0NDAuc2RyLnZpZGVvX2RlZmF1bHRfY292ZXJfZnJhbWUuQzMifQ%3D%3D&_nc_ohc=Apc8Lpid1YYQ7kNvwF38Jz_&_nc_oc=Adr4V79GwiLZN7J9XRD8KzK6wuD7NxYnRLqcsLnQnF9Zm8ctNlGK3uQkkRX5cKONWo0&_nc_zt=23&_nc_ht=scontent-del3-2.cdninstagram.com&_nc_gid=m9zOWesEkhc2ClyJ-jQ0EA&_nc_ss=7b6a8&oh=00_AQMqz1F2yosQp4op1W7NYM3_Xr1yMxmAn8K0yE6rylv2pQ&oe=6AC30DC5" },
              { name: "Mov", img: "https://scontent-del2-3.cdninstagram.com/v/t51.71878-15/491432322_982353213717040_1100576926860533565_n.jpg?stp=c0.247.640.640a_dst-jpg_e15_s150x150_tt6&_nc_cat=103&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IlNUT1JZLnhwaWRzLjY0MC5zZHIudmlkZW9fZGVmYXVsdF9jb3Zlcl9mcmFtZS5DMyJ9&_nc_ohc=OrHI5_MGJWUQ7kNvwGBx44n&_nc_oc=AdrQwNhI2Gt4SgGxkC29eQYPSmjOuGeN_DwPf8nU7gX4Z5kKLABfhCyJg06Taik365g&_nc_zt=23&_nc_ht=scontent-del2-3.cdninstagram.com&_nc_gid=m9zOWesEkhc2ClyJ-jQ0EA&_nc_ss=7b6a8&oh=00_AQPmNtdhLm1OctX1z--rzokK-7RHON2HvtkGuwTzghZlTA&oe=6AC2E3FC" },
              { name: "R1de", img: "https://scontent-del3-2.cdninstagram.com/v/t51.71878-15/517022666_1295313748778641_1222646203231724196_n.jpg?stp=c0.247.640.640a_dst-jpg_e15_s150x150_tt6&_nc_cat=109&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IlNUT1JZLnhwaWRzLjY0MC5zZHIudmlkZW9fZGVmYXVsdF9jb3Zlcl9mcmFtZS5DMyJ9&_nc_ohc=FAh0RT7dsdEQ7kNvwGZHD94&_nc_oc=AdqYJYG-eykMnqyuIsO-8fmkeNe-tH6Cpte0vMtr9V91GSwn-hivsoDp6n83hw7cipY&_nc_zt=23&_nc_ht=scontent-del3-2.cdninstagram.com&_nc_gid=m9zOWesEkhc2ClyJ-jQ0EA&_nc_ss=7b6a8&oh=00_AQOdDf3sWSwcFwn8oZHbg4iJrYC-IpQHMqNVv9EjbRxGvw&oe=6AC3106C" }
            ].map((h, i) => (
              <div key={i} className="flex flex-col items-center gap-1.5 shrink-0">
                <div className="w-16 h-16 rounded-full border border-slate-300 p-[3px]">
                  <img src={h.img} alt={h.name} className="w-full h-full rounded-full object-cover" />
                </div>
                <span className="text-[11px] font-medium text-slate-800">{h.name}</span>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="flex justify-around border-b border-slate-200 mb-0.5 sticky top-0 bg-white z-10 pt-1 shrink-0">
            <button className="py-2.5 w-1/3 flex justify-center border-b-[1.5px] border-slate-900 text-slate-900">
              <Grid size={22} />
            </button>
            <button className="py-2.5 w-1/3 flex justify-center text-slate-400 border-b-[1.5px] border-transparent">
              <Film size={22} />
            </button>
            <button className="py-2.5 w-1/3 flex justify-center text-slate-400 border-b-[1.5px] border-transparent">
              <UserSquare2 size={22} />
            </button>
          </div>

          {/* Post Grid */}
          <div className="grid grid-cols-3 gap-[1px]">
            {[
              "https://scontent-del2-3.cdninstagram.com/v/t51.71878-15/704933118_4297758323821744_3697270202334530851_n.jpg?stp=dst-jpg_e15_tt6&_nc_cat=103&ig_cache_key=MzkwMzg3MjM1Njk5NzAxMjY1Mg%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkNMSVBTLnhwaWRzLjY0MC5zZHIudmlkZW9fZGVmYXVsdF9jb3Zlcl9mcmFtZS5DMyJ9&_nc_ohc=9NNnHwrrSFwQ7kNvwEO8UsQ&_nc_oc=AdqFqc_5h2rAc6HW_0r4D-QKsCgNkW6JHN0HdpiNZysR1IIulUqP0RafWyzqtgnZXlQ&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent-del2-3.cdninstagram.com&_nc_gid=VIwc4WxBUC90Z5eQKfl45g&_nc_ss=7a22e&oh=00_AQNR1iYW5PiQOqLigRunjGS3T_5APX0MKkx8E5QExzJDow&oe=6AC2F0EE",
              "https://scontent-del3-1.cdninstagram.com/v/t51.82787-15/720736964_18326482477282319_1943605171711415833_n.webp?_nc_cat=106&ig_cache_key=MzkxNjE3MzY0NDQwOTQ1NDc0MQ%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0ueHBpZHMuMTQ0MC5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=bUXB1rfbBxMQ7kNvwEWfHSc&_nc_oc=Adp1BjsNtODdxykSEzMIso6qcxFdhz8UaRbRhE-Ky93XRxEA-R3KsBEHUHCtQJGuJ08&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent-del3-1.cdninstagram.com&_nc_gid=VIwc4WxBUC90Z5eQKfl45g&_nc_ss=7a22e&oh=00_AQOZOsbfw-99MLDTg1ycDFzk6jAT8eJA18kG4zaLrbliYg&oe=6AC30383",
              "https://scontent-del3-2.cdninstagram.com/v/t51.82787-15/711309777_18325301401282319_7511058254206549117_n.webp?_nc_cat=110&ig_cache_key=MzkxMDM5NjE2NDUyODQxNDY5Nw%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0ueHBpZHMuMTQ0MC5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=fQOui12KxJsQ7kNvwHj-NL8&_nc_oc=Adordlw54BFmjFrhM_fXkcmAWrO2ThJPnuoFK10SRQ1YJzg3gLc2puJJ6bqYtj-wK0c&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent-del3-2.cdninstagram.com&_nc_gid=VIwc4WxBUC90Z5eQKfl45g&_nc_ss=7a22e&oh=00_AQNZqlVJi_liQ9YZbOACrILRTFRGtKduAoCOaYH98-TJ0w&oe=6AC300FC",
              "https://scontent-del3-1.cdninstagram.com/v/t51.82787-15/696266581_18023106560818273_7176688851334782619_n.jpg?stp=dst-jpg_e15_tt6&_nc_cat=102&ig_cache_key=Mzg9NDc2NzI4MzU4MzQ2Nzc0MTE4MDIzMTA2NTU3ODE4Mjcz.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkNMSVBTLnhwaWRzLjcyMC5zZHIudmlkZW9fZGVmYXVsdF9jb3Zlcl9mcmFtZS5DMyJ9&_nc_ohc=pd0JwMGgE1AQ7kNvwEGPQJE&_nc_oc=Adq2tdZSG47nH7vmqIVLmDTvslxkAaSjM9R_oZ2KOXKGcyAjKR_06bKCOoP5JU2Ages&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent-del3-1.cdninstagram.com&_nc_gid=VIwc4WxBUC90Z5eQKfl45g&_nc_ss=7a22e&oh=00_AQPneM_oLUi1qhBAtunNThR6aZUvCk7fAngMAVjf8_uGDQ&oe=6AC3030F",
              "https://scontent-del2-3.cdninstagram.com/v/t51.82787-15/671687435_18318939355282319_5533692986032833403_n.webp?_nc_cat=103&ig_cache_key=Mzg3OTY3ODc3MTg4MDc3MDIwMA%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0ueHBpZHMuMTQ0MC5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=Epx1KDHW8r8Q7kNvwGwHknx&_nc_oc=AdplHooDAqb-P3Npu7ql9KAZ_GVnsTC1KxGR9DdFbnO9kVsNuTXu76Bh6y2N6RJ5WKw&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent-del2-3.cdninstagram.com&_nc_gid=VIwc4WxBUC90Z5eQKfl45g&_nc_ss=7a22e&oh=00_AQMqSM5HbhspBHe5_5DvI7UikqnTIF4aoy4JBamgsUnQtQ&oe=6AC2EC56",
              "https://scontent-del3-1.cdninstagram.com/v/t51.82787-15/610312180_18304085809282319_2414699011804809471_n.webp?_nc_cat=106&ig_cache_key=MzgwMTM2NjM0NTI5NzQxNzMwMQ%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0ueHBpZHMuMTQ0MC5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=jIG-QZdTAcEQ7kNvwH5DVet&_nc_oc=AdpET1eoezX3x4QleRRsA6mJ5gZiObFeHt3-0JcneWiqHkl144_UqO4IvWEAtLw7ujM&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent-del3-1.cdninstagram.com&_nc_gid=VIwc4WxBUC90Z5eQKfl45g&_nc_ss=7a22e&oh=00_AQN1h_up-76-MqE6aWsesK7Zi0VPYQx_t7kmRoPj8szAyQ&oe=6AC2E59D",
              "https://scontent-del3-2.cdninstagram.com/v/t51.82787-15/602184613_18302506369282319_3681669192454024906_n.webp?_nc_cat=108&ig_cache_key=Mzc9MTI4OTMyODY2OTUzMTE4MQ%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0ueHBpZHMuMTQ0MC5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=l0aorrjpAVsQ7kNvwE-Ys3a&_nc_oc=AdqJPCis6MZDUdyUabbfpYQf22TVRMZe1M30wwKv67bYgRTQbytWUcCPzG48Z13ShrU&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent-del3-2.cdninstagram.com&_nc_gid=VIwc4WxBUC90Z5eQKfl45g&_nc_ss=7a22e&oh=00_AQMAiFbigpPq_VPoc5Kvj1CIZmbxzNUZtZJ3a2fAxespZw&oe=6AC2E86D",
              "https://scontent-del2-2.cdninstagram.com/v/t51.82787-15/586685100_18299715556282319_16184972854006227_n.webp?_nc_cat=105&ig_cache_key=Mzc3MjM4NzgzOTg2MzYzNzU1Mw%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0ueHBpZHMuMTQ0MC5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=HwpLaLHURAIQ7kNvwGLaIut&_nc_oc=Adp9VDW1bJiaVqfhJGc3rVhtPqsbZSRe7TNPfKLGCZXNKVr3kfoTouWcjBJX8UsWhP8&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent-del2-2.cdninstagram.com&_nc_gid=VIwc4WxBUC90Z5eQKfl45g&_nc_ss=7a22e&oh=00_AQM-l1sXk-RRndZ1qQrAODlgfY7ZoMAVhFfDNOB1A9JjSA&oe=6AC2F5FE",
              "https://scontent-del3-2.cdninstagram.com/v/t51.82787-15/568128346_18294458941282319_5363383860517278003_n.webp?_nc_cat=108&ig_cache_key=Mzc4ODk0NTA4NTA4NjE3MjM1%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkZFRUQueHBpZHMuMTQ0MC5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=NvsBU0HKi28Q7kNvwHu1G9O&_nc_oc=AdozFwfbSmbtA9WgOcVDKYPUx6QurTaR7vhxO1iqcYBs412qrICWpI6QJVWYoMXkth8&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent-del3-2.cdninstagram.com&_nc_gid=VIwc4WxBUC90Z5eQKfl45g&_nc_ss=7a22e&oh=00_AQOC13z7CgGyE1-pdYfLkCOjzLonPU1D4Jbwto7Jnl3rLA&oe=6AC2F414",
              "https://scontent-del3-1.cdninstagram.com/v/t51.82787-15/561445847_18329974885238813_2098538009298061877_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=100&ig_cache_key=Mzc4MDE1MTA1NDk0MDYyNzgxOA%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkZFRUQueHBpZHMuMTM1MC5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=PFLFNQtjLnwQ7kNvwHZatgu&_nc_oc=Adq3d4b5XO_Z6B7COAFUR6SvCOH3wuqLC-g8jNyg7YVFMDNFbTQJd57vPcfNFSGVyfU&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent-del3-1.cdninstagram.com&_nc_gid=VIwc4WxBUC90Z5eQKfl45g&_nc_ss=7a22e&oh=00_AQPlyZ2w5kFA7QM24HgCrOKZUfCXR872H59dIPBZeVlrag&oe=6AC2F625",
              "https://scontent-del3-1.cdninstagram.com/v/t51.82787-15/523917221_18282974413282319_6317800287156786689_n.webp?_nc_cat=106&ig_cache_key=MzY4NDMxODQ0MDY1NjkyODU2NQ%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkZFRUQueHBpZHMuMTQ0MC5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=LPcgDQxWSyUQ7kNvwEehBKL&_nc_oc=Ado2ljleWYG-p61KYM0xutCTREt73hrRnChGHXJHvXUmrIbMct9G1Zm5kQDGnBVsmA4&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent-del3-1.cdninstagram.com&_nc_gid=VIwc4WxBUC90Z5eQKfl45g&_nc_ss=7a22e&oh=00_AQMcnSBZLftMF8piosnDTeQjSgrfNCQ384ctAiYipPXh8Q&oe=6AC2E7D6",
              "https://scontent-del3-1.cdninstagram.com/v/t51.71878-15/504139050_655598907474029_5918100209675994625_n.jpg?stp=dst-jpg_e15_tt6&_nc_cat=102&ig_cache_key=MzQ5MTg3MDkzMTkxNDYwMTE1MQ%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkNMSVBTLnhwaWRzLjU0MC5zZHIudmlkZW9fZGVmYXVsdF9jb3Zlcl9mcmFtZS5DMyJ9&_nc_ohc=bJTXYcGn98IQ7kNvwFuEt4S&_nc_oc=AdoAhEMbkoo1bJeCGC_TUp-w9Qc-0NwxxsiKSrIea8Yb-9Z6e0zev6Sc4lF61SdKdSw&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent-del3-1.cdninstagram.com&_nc_gid=VIwc4WxBUC90Z5eQKfl45g&_nc_ss=7a22e&oh=00_AQPJK0jR2HYyTDWBVJbsHUpi9WDxjY3gM6NgIuf5bYHNNA&oe=6AC2E404",
              "https://scontent-del2-2.cdninstagram.com/v/t51.82787-15/656195344_18070302674266063_24526477066772694_n.webp?_nc_cat=105&ig_cache_key=MzQ5MTY1MTE2NDA4MzkyNTU1NQ%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0ueHBpZHMuMTA4MC5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=jdHkoho1So8Q7kNvwHHfFpe&_nc_oc=AdqmrTVIEtzxA02hqh9r5CmvXLOSiZr-N9u8o78MOx2Ll9e9kCAWGEaZ9I5_cKhRtj4&_nc_zt=23&_nc_ht=scontent-del2-2.cdninstagram.com&_nc_gid=H4qwaHq3On8cAkCEDkxKnA&_nc_ss=7b6a8&oh=00_AQPRcDlsCmP5T99dxUDTGPX_pxkh0KmSWnwdiG7fywiQzA&oe=6AC31303",
              "https://scontent-del2-3.cdninstagram.com/v/t51.71878-15/503033299_2077105082779979_1030999334060503185_n.jpg?stp=dst-jpg_e15_tt6&_nc_cat=101&ig_cache_key=MzQ5MTYxNzAzNDQyNjQ5MjkzNg%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkNMSVBTLnhwaWRzLjQ4MC5zZHIudmlkZW9fZGVmYXVsdF9jb3Zlcl9mcmFtZS5DMyJ9&_nc_ohc=1z_hItH8VGwQ7kNvwFvbaZw&_nc_oc=AdrXEhroT4XimVN5zVZGPKR9E2bHPUAgnPeeZj7v9ezDs-PMsie41r8SNg_Gc5qC-6o&_nc_zt=23&_nc_ht=scontent-del2-3.cdninstagram.com&_nc_gid=H4qwaHq3On8cAkCEDkxKnA&_nc_ss=7b6a8&oh=00_AQMkPusCX7BX76X1dHhqsqi3tttmtHDfJtao8VJb-CsFZg&oe=6AC2FA13",
              "https://scontent-del2-1.cdninstagram.com/v/t51.82787-15/621723062_17984246510942438_1288813263521245235_n.webp?_nc_cat=111&ig_cache_key=MzQ3NzM1MDQxODg3ODU0ODU1NQ%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkZFRUQueHBpZHMuMTQ0MC5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=bhSfGnYrrD4Q7kNvwF9b4pD&_nc_oc=AdpMM4XPywiOsOTU6ZhGrQpAUzaEsti7KDTjmQMtJ_9BzbXb6k6whemtbUV7WCcG-gc&_nc_zt=23&_nc_ht=scontent-del2-1.cdninstagram.com&_nc_gid=H4qwaHq3On8cAkCEDkxKnA&_nc_ss=7b6a8&oh=00_AQNAfcq70aFuNKybjDkcrfptpFeNjAPlM4Z9fJYSQg76Sg&oe=6AC2FF3F"
            ].map((imgSrc, i) => (
              <div key={i} className="aspect-square bg-slate-200 relative">
                <img
                  src={imgSrc}
                  alt="Post"
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* EDIT PROFILE MODAL (Glassmorphic Bottom Sheet) */}
      <AnimatePresence>
        {isEditModalOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsEditModalOpen(false)}
              className="fixed inset-0 z-50 bg-black/25 pointer-events-auto"
            />

            {/* Bottom Sheet Modal */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 z-50 max-h-[92vh] rounded-t-[38px] px-6 pb-8 pt-4 text-white overflow-y-auto pointer-events-auto scrollbar-none"
              style={{
                background: "rgba(255, 255, 255, 0.22)",
                backdropFilter: "blur(40px) saturate(150%)",
                WebkitBackdropFilter: "blur(40px) saturate(150%)",
                borderTop: "0.5px solid rgba(255, 255, 255, 0.5)",
                borderLeft: "0.5px solid rgba(255, 255, 255, 0.3)",
                borderRight: "0.5px solid rgba(255, 255, 255, 0.3)",
                boxShadow: "0 -20px 50px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.5)",
              }}
            >
              {/* iOS Drag Handle */}
              <div className="w-12 h-1.5 bg-white/40 rounded-full mx-auto mb-5" />

              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6 relative">
                <h2 className="text-xl font-bold flex items-center gap-2 drop-shadow-md text-white tracking-tight absolute left-1/2 -translate-x-1/2">
                  Edit Profile
                </h2>
                <div className="flex-1" />
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center transition-all active:scale-90 relative z-10"
                >
                  <X size={18} className="text-white/90" />
                </button>
              </div>

              {/* Photos Section */}
              <div className="flex gap-3 mb-5">
                {/* Avatar Edit */}
                <div className="flex-1 flex flex-col items-center p-4 rounded-[16px] bg-white/10 border-none backdrop-blur-md shadow-sm">
                  <span className="text-[12px] font-semibold text-white/90 mb-3 drop-shadow-sm tracking-tight">Profile Picture</span>
                  <div className="relative w-[72px] h-[72px] rounded-full overflow-hidden border-2 border-white/30 mb-3 group shadow-sm">
                    <img src={editForm.avatar} alt="Avatar Preview" className="w-full h-full object-cover" />
                    <button
                      onClick={() => avatarInputRef.current?.click()}
                      className="absolute inset-0 bg-black/40 backdrop-blur-xs flex flex-col items-center justify-center opacity-90 group-hover:opacity-100 transition-opacity"
                    >
                      <Camera size={20} className="text-white" />
                    </button>
                  </div>
                  <button
                    onClick={() => avatarInputRef.current?.click()}
                    className="text-[12px] text-white font-semibold flex items-center gap-1 hover:text-white/80 transition-colors bg-white/20 px-3 py-1.5 rounded-full"
                  >
                    Change
                  </button>
                </div>

                {/* Cover Edit */}
                <div className="flex-1 flex flex-col items-center p-4 rounded-[16px] bg-white/10 border-none backdrop-blur-md shadow-sm">
                  <span className="text-[12px] font-semibold text-white/90 mb-3 drop-shadow-sm tracking-tight">Background Cover</span>
                  <div className="relative w-full h-[72px] rounded-[12px] overflow-hidden border-2 border-white/30 mb-3 group shadow-sm">
                    <img 
                      src={editForm.background} 
                      alt="Cover Preview" 
                      className="w-full h-full object-cover" 
                      style={{ objectPosition: `center ${editForm.bgPositionY}%` }}
                    />
                    <button
                      onClick={() => bgInputRef.current?.click()}
                      className="absolute inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center opacity-90 group-hover:opacity-100 transition-opacity"
                    >
                      <ImageIcon size={20} className="text-white" />
                    </button>
                  </div>
                  <button
                    onClick={() => bgInputRef.current?.click()}
                    className="text-[12px] text-white font-semibold flex items-center gap-1 hover:text-white/80 transition-colors bg-white/20 px-3 py-1.5 rounded-full"
                  >
                    Change
                  </button>
                </div>
              </div>

              {/* Background Position Adjustment Slider */}
              <div className="mb-6 p-4 rounded-[16px] bg-white/10 border-none backdrop-blur-md shadow-sm">
                <div className="flex items-center justify-between text-[13px] font-semibold text-white/90 mb-3 drop-shadow-sm tracking-tight">
                  <span className="flex items-center gap-1.5">
                    <MoveVertical size={16} className="text-white/90" />
                    Background Frame Position
                  </span>
                  <span className="text-[12px] text-white font-mono bg-white/20 px-2 py-0.5 rounded-md">{editForm.bgPositionY}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={editForm.bgPositionY ?? 65}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setEditForm(prev => ({ ...prev, bgPositionY: val }));
                    setProfile(prev => ({ ...prev, bgPositionY: val }));
                  }}
                  className="w-full accent-white bg-white/20 h-2 rounded-lg cursor-pointer transition-all"
                />
                <div className="flex justify-between text-[10px] text-white/60 font-medium mt-2 px-0.5 uppercase tracking-wide">
                  <span>Top</span>
                  <span>Center</span>
                  <span>Bottom</span>
                </div>
              </div>

              {/* Form Inputs */}
              <div className="space-y-4 mb-8">
                <div>
                  <label className="block text-[13px] font-semibold text-white/90 mb-1.5 ml-1 drop-shadow-sm">Full Name</label>
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className="w-full bg-white/20 border-none rounded-[14px] px-4 py-3.5 text-[15px] text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/40 focus:bg-white/25 backdrop-blur-md transition-all shadow-sm font-medium tracking-tight"
                  />
                </div>

                <div>
                  <label className="block text-[13px] font-semibold text-white/90 mb-1.5 ml-1 drop-shadow-sm">Username</label>
                  <input
                    type="text"
                    value={editForm.username}
                    onChange={(e) => setEditForm({ ...editForm, username: e.target.value })}
                    className="w-full bg-white/20 border-none rounded-[14px] px-4 py-3.5 text-[15px] text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/40 focus:bg-white/25 backdrop-blur-md transition-all shadow-sm font-medium tracking-tight"
                  />
                </div>

                <div>
                  <label className="block text-[13px] font-semibold text-white/90 mb-1.5 ml-1 drop-shadow-sm">Bio (Supports Emojis & Links)</label>
                  <textarea
                    rows={Math.min(7, Math.max(3, (editForm.bio || "").split("\n").length))}
                    value={editForm.bio}
                    onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                    className="w-full max-h-[160px] bg-white/20 border-none rounded-[14px] px-4 py-3 text-[14px] text-white leading-relaxed focus:outline-none focus:ring-2 focus:ring-white/40 focus:bg-white/25 backdrop-blur-md transition-all resize-none shadow-sm font-medium tracking-tight overflow-y-auto scrollbar-thin"
                  />
                </div>

              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className="flex-1 py-3.5 rounded-[14px] bg-white/10 hover:bg-white/20 text-white font-semibold text-[15px] transition-all active:scale-[0.98] tracking-tight"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveProfile}
                  className="flex-1 py-3.5 rounded-[14px] bg-white hover:bg-gray-100 text-black font-bold text-[15px] transition-all shadow-lg active:scale-[0.98] flex items-center justify-center gap-1.5 tracking-tight"
                >
                  Save Changes
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
