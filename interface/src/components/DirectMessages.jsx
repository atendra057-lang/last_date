import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  SquarePen,
  ChevronDown,
  Camera,
  Phone,
  Video,
  Info,
  ArrowLeft,
  Image,
  Mic,
  Heart,
  Send,
  Plus,
  CheckCircle2,
  MoreVertical
} from "lucide-react";

// Mock Notes data (Instagram Notes feature)
const INITIAL_NOTES = [
  { id: "note_self", name: "Your note", avatar: "Y", note: "Need coffee ☕", isSelf: true },
  { id: "note_1", name: "riya_", avatar: "R", note: "Late night coding 💻" },
  { id: "note_2", name: "arjun.k", avatar: "A", note: "New reel live! 🔥" },
  { id: "note_3", name: "meher_", avatar: "M", note: "Vibing to new beats 🎧" },
  { id: "note_4", name: "dev_ops", avatar: "D", note: "Deploying production 🚀" },
  { id: "note_5", name: "kavya", avatar: "K", note: "Weekend getaway 🌿" },
];

// Mock Conversations data
const INITIAL_CONVERSATIONS = [
  {
    id: "c1",
    username: "riya_",
    name: "Riya Sharma",
    avatar: "R",
    avatarBg: "from-pink-500 to-rose-400",
    isOnline: true,
    activeTime: "Active now",
    unread: true,
    lastMessage: "Hey! Loved that reel you posted earlier 👏",
    time: "2m",
    messages: [
      { id: "m1", sender: "them", text: "Hey! Loved that reel you posted earlier 👏", time: "10:42 AM" },
      { id: "m2", sender: "me", text: "Thanks Riya! Appreciate it 😊", time: "10:43 AM" },
      { id: "m3", sender: "them", text: "Are you working on the new UI features today?", time: "10:44 AM" },
      { id: "m4", sender: "them", text: "Hey! Loved that reel you posted earlier 👏", time: "10:45 AM" },
    ]
  },
  {
    id: "c2",
    username: "arjun.k",
    name: "Arjun Kumar",
    avatar: "A",
    avatarBg: "from-indigo-500 to-purple-500",
    isOnline: true,
    activeTime: "Active 15m ago",
    unread: false,
    lastMessage: "Sent a reel by @tech_insider",
    time: "1h",
    messages: [
      { id: "m1", sender: "them", text: "Check this out man!", time: "9:15 AM" },
      { id: "m2", sender: "me", text: "That looks super cool, saving for later!", time: "9:20 AM" }
    ]
  },
  {
    id: "c3",
    username: "meher_",
    name: "Meher Patel",
    avatar: "M",
    avatarBg: "from-amber-400 to-orange-500",
    isOnline: false,
    activeTime: "Active 2h ago",
    unread: false,
    lastMessage: "Sounds like a plan! Let's catch up tomorrow.",
    time: "2h",
    messages: [
      { id: "m1", sender: "me", text: "Are we still meeting up for tea?", time: "8:00 AM" },
      { id: "m2", sender: "them", text: "Sounds like a plan! Let's catch up tomorrow.", time: "8:05 AM" }
    ]
  },
  {
    id: "c4",
    username: "dev_ops",
    name: "DevOps Official",
    avatar: "D",
    avatarBg: "from-emerald-400 to-teal-600",
    isOnline: true,
    activeTime: "Active now",
    unread: false,
    lastMessage: "Build #402 passed all unit tests 🎉",
    time: "5h",
    messages: [
      { id: "m1", sender: "them", text: "Build #402 passed all unit tests 🎉", time: "5:12 AM" }
    ]
  },
  {
    id: "c5",
    username: "kavya",
    name: "Kavya Malhotra",
    avatar: "K",
    avatarBg: "from-fuchsia-500 to-pink-600",
    isOnline: false,
    activeTime: "Active yesterday",
    unread: false,
    lastMessage: "Reacted ❤️ to your story",
    time: "1d",
    messages: [
      { id: "m1", sender: "them", text: "Reacted ❤️ to your story", time: "Yesterday" }
    ]
  }
];

export default function DirectMessages({ onBack }) {
  const [conversations, setConversations] = useState(INITIAL_CONVERSATIONS);
  const [activeChatId, setActiveChatId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [inputText, setInputText] = useState("");
  const [tab, setTab] = useState("primary"); // "primary" | "general" | "requests"

  const activeChat = conversations.find((c) => c.id === activeChatId);

  const handleSendMessage = () => {
    if (!inputText.trim() || !activeChatId) return;

    const newMessage = {
      id: "msg_" + Date.now(),
      sender: "me",
      text: inputText.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setConversations((prev) =>
      prev.map((c) => {
        if (c.id === activeChatId) {
          return {
            ...c,
            lastMessage: `You: ${inputText.trim()}`,
            time: "Just now",
            messages: [...c.messages, newMessage]
          };
        }
        return c;
      })
    );

    setInputText("");
  };

  const filteredConversations = conversations.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1 bg-white flex flex-col h-full overflow-hidden relative font-sans text-slate-900">
      <AnimatePresence mode="wait">
        {!activeChat ? (
          /* ================= CHATS LIST VIEW ================= */
          <motion.div
            key="chats-list"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
            className="flex-1 flex flex-col h-full overflow-y-auto scrollbar-none"
          >
            {/* Top Bar Header */}
            <div className="sticky top-0 z-20 bg-white/90 backdrop-blur-md px-4 py-3 flex items-center justify-between border-b border-slate-100">
              <div className="flex items-center gap-1.5 cursor-pointer">
                <span className="font-bold text-lg text-slate-900 tracking-tight">dev_ops</span>
                <ChevronDown size={18} className="text-slate-600" />
              </div>
              <div className="flex items-center gap-3">
                <button
                  aria-label="New Message"
                  className="p-1.5 rounded-full hover:bg-slate-100 active:scale-95 transition-all text-slate-900"
                >
                  <SquarePen size={22} strokeWidth={2} />
                </button>
              </div>
            </div>

            {/* Instagram Notes Bar (Horizontal Scroll) */}
            <div className="px-4 pt-4 pb-3 border-b border-slate-200/60 bg-white/40 backdrop-blur-md">
              <div className="flex items-end gap-5 overflow-x-auto scrollbar-none pb-1">
                {INITIAL_NOTES.map((n) => (
                  <div key={n.id} className="flex flex-col items-center flex-shrink-0 cursor-pointer group">
                    {/* Note Bubble - Normal flow, naturally centered by flex */}
                    <div className="relative mb-1.5">
                      <div className="bg-white text-slate-800 text-[10px] font-semibold px-3 py-2 rounded-2xl border border-slate-200 shadow-sm max-w-[72px] text-center leading-tight break-words min-h-[32px] flex items-center justify-center">
                        {n.note}
                      </div>
                      {/* Downward tail pointer */}
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white border-r border-b border-slate-200 rotate-45" />
                    </div>

                    {/* Avatar Circle */}
                    <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-slate-200 via-slate-100 to-slate-200 border-2 border-white flex items-center justify-center font-bold text-slate-700 text-base shadow-xs relative">
                      {n.avatar}
                      {n.isSelf && (
                        <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-blue-500 border-2 border-white flex items-center justify-center text-white shadow-2xs">
                          <Plus size={10} strokeWidth={3} />
                        </div>
                      )}
                    </div>
                    <span className="text-[11px] text-slate-600 truncate max-w-[64px] font-medium mt-1">
                      {n.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Search Input Bar */}
            <div className="px-4 pt-3 pb-2">
              <div className="flex items-center gap-2 bg-slate-100 rounded-xl px-3 py-2 text-slate-600">
                <Search size={16} className="text-slate-400" />
                <input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent text-sm w-full focus:outline-none text-slate-800 placeholder-slate-400"
                />
              </div>
            </div>

            {/* Tabs (Primary / General / Requests) - Pill Buttons */}
            <div className="flex items-center justify-between gap-2 px-4 py-2 border-b border-slate-100 text-xs font-semibold text-slate-500 overflow-x-auto scrollbar-none w-full">
              <button
                onClick={() => setTab("primary")}
                className={`flex-1 py-2.5 px-2 rounded-full transition-all text-center whitespace-nowrap ${tab === "primary"
                    ? "bg-slate-900 text-white shadow-sm"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                  }`}
              >
                Primary
              </button>
              <button
                onClick={() => setTab("general")}
                className={`flex-1 py-2.5 px-2 rounded-full transition-all text-center whitespace-nowrap ${tab === "general"
                    ? "bg-slate-900 text-white shadow-sm"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                  }`}
              >
                General
              </button>
              <button
                onClick={() => setTab("requests")}
                className={`flex-1 py-2.5 px-2 rounded-full transition-all text-center whitespace-nowrap ${tab === "requests"
                    ? "bg-slate-900 text-white shadow-sm"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                  }`}
              >
                Requests (2)
              </button>
            </div>

            {/* Conversations List */}
            <div className="flex-1 divide-y divide-slate-50">
              {filteredConversations.map((chat) => (
                <div
                  key={chat.id}
                  onClick={() => setActiveChatId(chat.id)}
                  className="flex items-center justify-between px-4 py-3 hover:bg-slate-50 active:bg-slate-100 cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    {/* Avatar */}
                    <div className="relative shrink-0">
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-tr ${chat.avatarBg} text-white flex items-center justify-center font-bold text-lg shadow-2xs`}>
                        {chat.avatar}
                      </div>
                      {chat.isOnline && (
                        <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white" />
                      )}
                    </div>

                    {/* Content */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between mb-0.5">
                        <span className={`text-sm truncate ${chat.unread ? "font-bold text-slate-900" : "font-medium text-slate-900"}`}>
                          {chat.name}
                        </span>
                      </div>
                      <p className={`text-xs truncate ${chat.unread ? "font-bold text-slate-900" : "text-slate-500"}`}>
                        {chat.lastMessage} · <span className="text-slate-400">{chat.time}</span>
                      </p>
                    </div>
                  </div>

                  {/* Right Action */}
                  <div className="flex items-center gap-2 pl-2">
                    {chat.unread && (
                      <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shrink-0" />
                    )}
                    {/* Snap Video Button — oval pill, ephemeral burn-once video */}
                    <button
                      title="Send a snap video (disappears after viewing)"
                      onClick={(e) => e.stopPropagation()}
                      style={{
                        background: "linear-gradient(135deg, #a855f7 0%, #ec4899 50%, #f97316 100%)",
                        borderRadius: "999px",
                        padding: "8px 20px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 2px 12px rgba(168,85,247,0.45)",
                        border: "none",
                        cursor: "pointer",
                        position: "relative",
                        flexShrink: 0,
                        transition: "transform 0.15s, box-shadow 0.15s",
                      }}
                      onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.06)"; e.currentTarget.style.boxShadow = "0 4px 18px rgba(168,85,247,0.6)"; }}
                      onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 2px 12px rgba(168,85,247,0.45)"; }}
                      onMouseDown={e => { e.currentTarget.style.transform = "scale(0.93)"; }}
                      onMouseUp={e => { e.currentTarget.style.transform = "scale(1.06)"; }}
                    >
                      <Camera size={18} strokeWidth={2.2} style={{ color: "#fff" }} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ) : (
          /* ================= ACTIVE CHAT THREAD VIEW ================= */
          <motion.div
            key="chat-thread"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.2 }}
            className="flex-1 flex flex-col h-full bg-white z-30"
          >
            {/* Active Chat Header */}
            <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between bg-white/95 backdrop-blur-md sticky top-0 z-20">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setActiveChatId(null)}
                  className="p-1 rounded-full hover:bg-slate-100 active:scale-90 text-slate-800 transition-all"
                >
                  <ArrowLeft size={22} />
                </button>
                <div className="flex items-center gap-2.5">
                  <div className="relative">
                    <div className={`w-9 h-9 rounded-full bg-gradient-to-tr ${activeChat.avatarBg} text-white flex items-center justify-center font-bold text-sm`}>
                      {activeChat.avatar}
                    </div>
                    {activeChat.isOnline && (
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white" />
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-sm text-slate-900 leading-tight">
                      {activeChat.name}
                    </span>
                    <span className="text-[11px] text-slate-500">
                      {activeChat.activeTime}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Icons */}
              <div className="flex items-center gap-4 text-slate-800">
                <button className="hover:opacity-75 transition-opacity">
                  <Phone size={21} strokeWidth={1.8} />
                </button>
                <button className="hover:opacity-75 transition-opacity">
                  <Video size={22} strokeWidth={1.8} />
                </button>
                <button className="hover:opacity-75 transition-opacity">
                  <Info size={21} strokeWidth={1.8} />
                </button>
              </div>
            </div>

            {/* Chat Thread Message Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/50">
              <div className="text-center py-4">
                <div className={`w-16 h-16 rounded-full bg-gradient-to-tr ${activeChat.avatarBg} text-white flex items-center justify-center font-bold text-2xl mx-auto mb-2 shadow-md`}>
                  {activeChat.avatar}
                </div>
                <h3 className="font-bold text-slate-900 text-base">{activeChat.name}</h3>
                <p className="text-xs text-slate-500">@{activeChat.username} · Instagram</p>
                <button className="mt-2 text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-200/80 hover:bg-slate-300/80 text-slate-800 transition-all">
                  View profile
                </button>
              </div>

              {activeChat.messages.map((msg) => {
                const isMe = msg.sender === "me";
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}
                  >
                    <div
                      className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${isMe
                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-br-xs shadow-xs"
                        : "bg-white border border-slate-200/80 text-slate-800 rounded-bl-xs shadow-2xs"
                        }`}
                    >
                      {msg.text}
                    </div>
                    <span className="text-[10px] text-slate-400 mt-1 px-1">
                      {msg.time}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Message Input Bottom Bar */}
            <div className="p-3 border-t border-slate-100 bg-white flex items-center gap-2">
              <div className="flex-1 flex items-center gap-2 bg-slate-100 rounded-full px-3.5 py-2">
                {/* Snap Video oval button inside input bar */}
                <button
                  title="Send a snap video"
                  style={{
                    background: "linear-gradient(135deg, #a855f7 0%, #ec4899 55%, #f97316 100%)",
                    borderRadius: "999px",
                    padding: "6px 16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 1px 8px rgba(168,85,247,0.4)",
                    border: "none",
                    cursor: "pointer",
                    flexShrink: 0,
                    transition: "transform 0.15s, box-shadow 0.15s",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.08)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; }}
                  onMouseDown={e => { e.currentTarget.style.transform = "scale(0.92)"; }}
                  onMouseUp={e => { e.currentTarget.style.transform = "scale(1.08)"; }}
                >
                  <Camera size={16} strokeWidth={2.2} style={{ color: "#fff" }} />
                </button>
                <input
                  type="text"
                  placeholder="Message..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  className="bg-transparent text-sm w-full focus:outline-none text-slate-800 placeholder-slate-400"
                />
                {inputText.trim() ? (
                  <button
                    onClick={handleSendMessage}
                    className="text-blue-600 font-bold text-sm hover:text-blue-700 transition-colors"
                  >
                    Send
                  </button>
                ) : (
                  <div className="flex items-center gap-2.5 text-slate-500">
                    <button className="hover:text-slate-700">
                      <Mic size={19} strokeWidth={1.8} />
                    </button>
                    <button className="hover:text-slate-700">
                      <Image size={19} strokeWidth={1.8} />
                    </button>
                  </div>
                )}
              </div>
              {!inputText.trim() && (
                <button
                  onClick={() => {
                    setInputText("❤️");
                  }}
                  className="p-2 text-rose-500 hover:scale-110 active:scale-90 transition-transform"
                >
                  <Heart size={24} className="fill-rose-500 text-rose-500" />
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
