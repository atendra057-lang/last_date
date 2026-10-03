import React from "react";
import { 
  ChevronLeft, Search, User, Bell, Lock, Star, Ban, PlaySquare, 
  MessageCircle, AtSign, MessageSquare, Repeat, VolumeX, Sliders, 
  HeartOff, Award, Download, Accessibility, Globe, MonitorSmartphone, 
  Users, BarChart, BadgeCheck, HelpCircle, UserCheck, ChevronRight,
  EyeOff
} from "lucide-react";

export default function SettingsPage({ onBack }) {
  return (
    <div className="w-full h-full bg-[var(--color-ink)] flex flex-col touch-none overflow-hidden relative z-50">
      {/* Header */}
      <div className="flex items-center px-4 h-16 shrink-0 bg-[var(--color-ink)]/80 backdrop-blur-md sticky top-0 z-10">
        <button onClick={onBack} className="p-2 -ml-2 rounded-full bg-white/40 backdrop-blur-md shadow-[0_4px_16px_0_rgba(31,38,135,0.05)] border border-white/60 active:scale-95 transition-transform">
          <ChevronLeft size={24} strokeWidth={2.5} className="text-slate-800" />
        </button>
        <h1 className="flex-1 text-center font-display font-semibold text-xl text-slate-900 mr-8">Settings</h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto scrollbar-none pb-20 px-4 pt-2">
        
        {/* Search */}
        <div className="mb-6 sticky top-2 z-20">
          <div className="relative flex items-center w-full h-12 bg-white/40 backdrop-blur-xl rounded-2xl shadow-[0_8px_32px_0_rgba(31,38,135,0.05)] border border-white/60 px-4 transition-shadow focus-within:shadow-[0_8px_32px_0_rgba(99,102,241,0.15)]">
            <Search size={20} className="text-slate-400 mr-3 shrink-0" />
            <input 
              type="text" 
              placeholder="Search settings..." 
              className="w-full bg-transparent text-[15px] font-medium outline-none text-slate-800 placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Section: Your account */}
        <SettingsSection title="Your account">
          <div className="flex items-center justify-between mb-4 px-1">
            <div className="flex items-center text-blue-600 font-bold text-[14px] gap-1.5 bg-blue-50 px-3 py-1 rounded-full">
              <span className="text-xl leading-none -mt-0.5">∞</span> Meta
            </div>
          </div>
          <SettingItem 
            icon={User} 
            title="Accounts Center" 
            subtitle="Password, security, personal details, connected experiences, ad preferences" 
            iconBg="bg-blue-100" 
            iconColor="text-blue-600" 
          />
        </SettingsSection>

        {/* Section: How you use Instagram */}
        <SettingsSection title="How you use the app">
          <SettingItem icon={User} title="Edit profile" iconBg="bg-indigo-100" iconColor="text-indigo-600" />
          <SettingItem icon={Bell} title="Notifications" iconBg="bg-amber-100" iconColor="text-amber-600" />
        </SettingsSection>

        {/* Section: Who can see your content */}
        <SettingsSection title="Who can see your content">
          <SettingItem icon={Lock} title="Account privacy" iconBg="bg-emerald-100" iconColor="text-emerald-600" />
          <SettingItem icon={Star} title="Close Friends" iconBg="bg-green-100" iconColor="text-green-600" />
          <SettingItem icon={Ban} title="Blocked" iconBg="bg-red-100" iconColor="text-red-600" />
          <SettingItem icon={PlaySquare} title="Story, live and location" iconBg="bg-fuchsia-100" iconColor="text-fuchsia-600" />
        </SettingsSection>

        {/* Section: How others can interact with you */}
        <SettingsSection title="How others can interact with you">
          <SettingItem icon={MessageCircle} title="Messages and story replies" iconBg="bg-sky-100" iconColor="text-sky-600" />
          <SettingItem icon={AtSign} title="Tags and mentions" iconBg="bg-violet-100" iconColor="text-violet-600" />
          <SettingItem icon={MessageSquare} title="Comments" iconBg="bg-pink-100" iconColor="text-pink-600" />
          <SettingItem icon={Repeat} title="Sharing and reuse" iconBg="bg-orange-100" iconColor="text-orange-600" />
          <SettingItem icon={EyeOff} title="Hidden words" iconBg="bg-slate-200" iconColor="text-slate-600" />
          <SettingItem icon={VolumeX} title="Muted accounts" iconBg="bg-zinc-200" iconColor="text-zinc-600" />
          <SettingItem icon={Sliders} title="Content preferences" iconBg="bg-teal-100" iconColor="text-teal-600" />
          <SettingItem icon={HeartOff} title="Like and share counts" iconBg="bg-rose-100" iconColor="text-rose-600" />
          <SettingItem icon={Award} title="Creator subscriptions" iconBg="bg-yellow-100" iconColor="text-yellow-600" />
        </SettingsSection>

        {/* Section: Your app and media */}
        <SettingsSection title="Your app and media">
          <SettingItem icon={Download} title="Archiving and downloading" iconBg="bg-cyan-100" iconColor="text-cyan-600" />
          <SettingItem icon={Accessibility} title="Accessibility" iconBg="bg-blue-100" iconColor="text-blue-600" />
          <SettingItem icon={Globe} title="Language" iconBg="bg-indigo-100" iconColor="text-indigo-600" />
          <SettingItem icon={MonitorSmartphone} title="App website permissions" iconBg="bg-slate-200" iconColor="text-slate-700" />
        </SettingsSection>

        {/* Section: Family Center */}
        <SettingsSection title="Family Center">
          <SettingItem icon={Users} title="Supervision for Teen Accounts" iconBg="bg-purple-100" iconColor="text-purple-600" />
        </SettingsSection>

        {/* Section: For professionals */}
        <SettingsSection title="For professionals">
          <SettingItem icon={BarChart} title="Account type and tools" iconBg="bg-emerald-100" iconColor="text-emerald-600" />
          <SettingItem icon={BadgeCheck} title="Meta Verified" iconBg="bg-blue-100" iconColor="text-blue-600" />
        </SettingsSection>

        {/* Section: More info and support */}
        <SettingsSection title="More info and support">
          <SettingItem icon={HelpCircle} title="Help" iconBg="bg-sky-100" iconColor="text-sky-600" />
          <SettingItem icon={UserCheck} title="Account Status" iconBg="bg-green-100" iconColor="text-green-600" />
        </SettingsSection>
        
      </div>
    </div>
  );
}

function SettingsSection({ title, children }) {
  return (
    <div className="mb-6">
      <h2 className="text-[13px] font-bold text-slate-500 uppercase tracking-wider mb-3 ml-1">{title}</h2>
      <div className="bg-white/40 backdrop-blur-xl rounded-3xl p-2 shadow-[0_8px_32px_0_rgba(31,38,135,0.05)] border border-white/60 flex flex-col gap-1">
        {children}
      </div>
    </div>
  );
}

function SettingItem({ icon: Icon, title, subtitle, iconBg = "bg-slate-100", iconColor = "text-slate-700" }) {
  return (
    <button className="w-full flex items-center text-left p-3 hover:bg-white/50 active:bg-white/60 transition-all rounded-2xl group">
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center mr-4 shrink-0 transition-transform group-active:scale-95 ${iconBg}`}>
        <Icon size={22} strokeWidth={2} className={iconColor} />
      </div>
      <div className="flex-1 pr-2">
        <div className="text-[15px] font-semibold text-slate-800">{title}</div>
        {subtitle && <div className="text-[13px] text-slate-500 leading-snug mt-1 font-medium">{subtitle}</div>}
      </div>
      <ChevronRight size={18} strokeWidth={2.5} className="text-slate-300 group-hover:text-slate-400 transition-colors shrink-0" />
    </button>
  );
}
