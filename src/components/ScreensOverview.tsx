import React from 'react';
import { PageView, Expert, Category } from '../types';
import { expertsData } from '../data/experts';
import { 
  Menu, Bell, Search, BookOpen, Scale, Heart, Coins, ScrollText, 
  Compass, History, Sparkles, GraduationCap, Home, Users, Calendar, 
  User, ChevronRight, Sliders, Phone, MessageSquare, Video, ArrowLeft,
  Share2, Shield, Lock, Paperclip, Mic, Send, Smile, Star, CheckCircle, Check
} from 'lucide-react';

interface ScreensOverviewProps {
  categories: Category[];
  experts: Expert[];
  onNavigate: (view: PageView, params?: any) => void;
}

export const ScreensOverview: React.FC<ScreensOverviewProps> = ({
  categories,
  experts,
  onNavigate
}) => {
  const expertMufti = experts[0] || expertsData[0];

  return (
    <div className="w-full min-h-screen bg-slate-900 py-8 px-4 overflow-x-auto text-slate-800">
      
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto mb-8 text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-900/80 border border-blue-600/50 text-amber-400 text-xs sm:text-sm font-semibold shadow-lg">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Steadfast Deen — Mobile Workflow Blueprint (5 Screens)</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white font-heading tracking-tight">
          Complete 5-Screen UI Showcase
        </h1>
        <p className="text-slate-300 text-xs sm:text-sm max-w-2xl mx-auto">
          Click any screen below to open it live, or test the full interactive mobile app!
        </p>
      </div>

      {/* 5-Screen Horizontal / Grid Layout */}
      <div className="flex flex-wrap lg:flex-nowrap justify-center items-start gap-6 max-w-[1650px] mx-auto">

        {/* ==================== SCREEN 1: HOME SCREEN ==================== */}
        <div className="w-[310px] sm:w-[320px] flex-shrink-0 bg-slate-950 p-2.5 rounded-[36px] shadow-2xl border-4 border-slate-700">
          
          {/* Header Tag */}
          <div 
            onClick={() => onNavigate('home')}
            className="bg-blue-600 hover:bg-blue-500 cursor-pointer text-white px-3 py-1.5 rounded-t-2xl flex items-center justify-between mb-2 transition-all shadow"
          >
            <span className="flex items-center gap-1.5 font-bold text-xs">
              <span className="w-5 h-5 rounded-full bg-white text-blue-700 flex items-center justify-center text-[11px] font-black">1</span>
              <span>Home Screen</span>
            </span>
            <span className="text-[10px] text-blue-100 font-normal">Simple • Clear • Welcoming</span>
          </div>

          {/* Phone View Container */}
          <div className="bg-white rounded-[26px] overflow-hidden border border-slate-200 text-slate-800 font-sans shadow-inner min-h-[580px] flex flex-col justify-between">
            
            <div>
              {/* Phone Status Bar */}
              <div className="bg-[#0c2340] text-white px-4 py-1 text-[10px] flex justify-between items-center font-mono">
                <span>9:41</span>
                <span className="flex items-center gap-1">📶 🔋</span>
              </div>

              {/* App Bar */}
              <div className="bg-white px-3 py-2 flex items-center justify-between border-b border-slate-100">
                <Menu className="w-5 h-5 text-slate-700" />
                <div className="flex items-center gap-1">
                  <div className="w-5 h-5 rounded-full bg-amber-500 flex items-center justify-center text-white text-[10px] font-bold">
                    🌙
                  </div>
                  <span className="font-extrabold text-sm text-blue-900 font-heading">
                    Steadfast<span className="text-amber-500">Deen</span><span className="text-[10px] text-blue-600 font-normal">.com</span>
                  </span>
                </div>
                <Bell className="w-5 h-5 text-slate-700" />
              </div>

              {/* Hero Banner */}
              <div 
                onClick={() => onNavigate('home')}
                className="mx-3 mt-2.5 p-3.5 rounded-2xl bg-gradient-to-r from-[#0c2340] via-[#1e3a8a] to-[#0f172a] text-white relative overflow-hidden shadow-md cursor-pointer hover:opacity-95"
              >
                <div className="relative z-10 space-y-1">
                  <h3 className="text-xs font-bold leading-tight">Find Answers</h3>
                  <h3 className="text-xs font-bold leading-tight text-amber-300">Learn Islam</h3>
                  <h3 className="text-xs font-bold leading-tight">Consult Experts</h3>
                  <h3 className="text-xs font-bold leading-tight">Grow in Deen</h3>
                  <button className="mt-2 px-3 py-1 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-[10px] rounded-lg shadow-sm flex items-center gap-1">
                    <span>Your First 5 Minutes FREE</span>
                    <span>→</span>
                  </button>
                </div>
                <div className="absolute right-2 bottom-1 text-3xl opacity-20 select-none">
                  🕌
                </div>
              </div>

              {/* Search Bar */}
              <div className="mx-3 mt-2.5">
                <div className="flex items-center gap-2 px-3 py-2 bg-slate-100 rounded-xl text-slate-400 text-xs border border-slate-200">
                  <Search className="w-3.5 h-3.5" />
                  <span className="text-[11px] truncate">Search your question or category...</span>
                </div>
              </div>

              {/* 3x3 Category Grid */}
              <div className="mx-3 mt-3 grid grid-cols-3 gap-2">
                {[
                  { name: 'Quran Learning', icon: BookOpen, bg: 'bg-emerald-50 text-emerald-600', catId: 'quran-learning' },
                  { name: 'Fiqh & Daily Masail', icon: Scale, bg: 'bg-blue-50 text-blue-600', catId: 'fiqh-masail' },
                  { name: 'Family & Marriage', icon: Heart, bg: 'bg-pink-50 text-pink-600', catId: 'family-marriage' },
                  { name: 'Islamic Finance', icon: Coins, bg: 'bg-amber-50 text-amber-600', catId: 'islamic-finance' },
                  { name: 'Hadith Studies', icon: ScrollText, bg: 'bg-purple-50 text-purple-600', catId: 'hadith-studies' },
                  { name: 'Aqeedah & Beliefs', icon: Compass, bg: 'bg-teal-50 text-teal-600', catId: 'aqeedah-beliefs' },
                  { name: 'Seerah & History', icon: History, bg: 'bg-orange-50 text-amber-700', catId: 'seerah-history' },
                  { name: 'Spiritual Guidance', icon: Sparkles, bg: 'bg-green-50 text-green-600', catId: 'spiritual-guidance' },
                  { name: 'Children & Youth', icon: GraduationCap, bg: 'bg-sky-50 text-sky-600', catId: 'children-youth' },
                ].map((item, idx) => {
                  const IconComp = item.icon;
                  return (
                    <div 
                      key={idx}
                      onClick={() => onNavigate('category-detail', { categoryId: item.catId })}
                      className="flex flex-col items-center justify-center p-2 rounded-xl bg-slate-50 border border-slate-100 hover:bg-slate-100 cursor-pointer transition-colors text-center shadow-2xs min-h-[64px]"
                    >
                      <div className={`p-1.5 rounded-lg ${item.bg} mb-1`}>
                        <IconComp className="w-4 h-4" />
                      </div>
                      <span className="text-[9px] font-semibold text-slate-700 leading-tight line-clamp-2">
                        {item.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Nav Bar */}
            <div className="bg-white border-t border-slate-200 px-3 py-2 flex items-center justify-around text-slate-400">
              <button onClick={() => onNavigate('home')} className="flex flex-col items-center text-blue-600">
                <Home className="w-4 h-4" />
                <span className="text-[9px] font-bold">Home</span>
              </button>
              <button onClick={() => onNavigate('experts')} className="flex flex-col items-center hover:text-slate-700">
                <Users className="w-4 h-4" />
                <span className="text-[9px]">Experts</span>
              </button>
              <button onClick={() => onNavigate('chat')} className="flex flex-col items-center hover:text-slate-700">
                <MessageSquare className="w-4 h-4" />
                <span className="text-[9px]">Sessions</span>
              </button>
              <button onClick={() => onNavigate('courses')} className="flex flex-col items-center hover:text-slate-700">
                <BookOpen className="w-4 h-4" />
                <span className="text-[9px]">Learning</span>
              </button>
              <button onClick={() => onNavigate('profile')} className="flex flex-col items-center hover:text-slate-700">
                <User className="w-4 h-4" />
                <span className="text-[9px]">Profile</span>
              </button>
            </div>

          </div>
        </div>

        {/* ==================== SCREEN 2: CATEGORY SCREEN ==================== */}
        <div className="w-[310px] sm:w-[320px] flex-shrink-0 bg-slate-950 p-2.5 rounded-[36px] shadow-2xl border-4 border-slate-700">
          
          {/* Header Tag */}
          <div 
            onClick={() => onNavigate('categories')}
            className="bg-blue-600 hover:bg-blue-500 cursor-pointer text-white px-3 py-1.5 rounded-t-2xl flex items-center justify-between mb-2 transition-all shadow"
          >
            <span className="flex items-center gap-1.5 font-bold text-xs">
              <span className="w-5 h-5 rounded-full bg-white text-blue-700 flex items-center justify-center text-[11px] font-black">2</span>
              <span>Category Screen</span>
            </span>
            <span className="text-[10px] text-blue-100 font-normal">Organized • Easy</span>
          </div>

          {/* Phone View Container */}
          <div className="bg-white rounded-[26px] overflow-hidden border border-slate-200 text-slate-800 font-sans shadow-inner min-h-[580px] flex flex-col justify-between">
            
            <div>
              {/* Phone Status Bar */}
              <div className="bg-slate-900 text-white px-4 py-1 text-[10px] flex justify-between items-center font-mono">
                <span>9:41</span>
                <span className="flex items-center gap-1">📶 🔋</span>
              </div>

              {/* Header Bar */}
              <div className="bg-white px-3 py-2 flex items-center justify-between border-b border-slate-100">
                <ArrowLeft onClick={() => onNavigate('home')} className="w-4 h-4 text-slate-700 cursor-pointer" />
                <div className="text-center">
                  <h4 className="text-xs font-bold text-slate-900 leading-tight">Categories</h4>
                  <p className="text-[9px] text-slate-400">Choose your topic</p>
                </div>
                <Search className="w-4 h-4 text-slate-700" />
              </div>

              {/* Vertical Category List */}
              <div className="p-3 space-y-2 max-h-[500px] overflow-y-auto">
                {categories.map((cat) => {
                  let bg = 'bg-blue-50 text-blue-600';
                  if (cat.id === 'quran-learning') bg = 'bg-emerald-50 text-emerald-600';
                  if (cat.id === 'family-marriage') bg = 'bg-pink-50 text-pink-600';
                  if (cat.id === 'islamic-finance') bg = 'bg-amber-50 text-amber-600';
                  if (cat.id === 'hadith-studies') bg = 'bg-purple-50 text-purple-600';
                  if (cat.id === 'aqeedah-beliefs') bg = 'bg-teal-50 text-teal-600';
                  if (cat.id === 'seerah-history') bg = 'bg-orange-50 text-amber-700';

                  return (
                    <div 
                      key={cat.id}
                      onClick={() => onNavigate('experts', { category: cat.id })}
                      className="p-2.5 rounded-xl border border-slate-100 bg-white hover:bg-slate-50 flex items-center justify-between cursor-pointer transition-colors shadow-2xs"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className={`p-2 rounded-lg ${bg} shrink-0`}>
                          <BookOpen className="w-4 h-4" />
                        </div>
                        <div>
                          <h5 className="text-xs font-bold text-slate-800 leading-tight">{cat.name}</h5>
                          <p className="text-[9px] text-slate-400 mt-0.5 line-clamp-1">{cat.description}</p>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Accent */}
            <div className="p-2.5 bg-slate-50 border-t border-slate-100 text-center">
              <span className="text-[10px] text-slate-500 font-medium">Select a category to view online experts</span>
            </div>

          </div>
        </div>

        {/* ==================== SCREEN 3: EXPERT LIST ==================== */}
        <div className="w-[310px] sm:w-[320px] flex-shrink-0 bg-slate-950 p-2.5 rounded-[36px] shadow-2xl border-4 border-slate-700">
          
          {/* Header Tag */}
          <div 
            onClick={() => onNavigate('experts')}
            className="bg-blue-600 hover:bg-blue-500 cursor-pointer text-white px-3 py-1.5 rounded-t-2xl flex items-center justify-between mb-2 transition-all shadow"
          >
            <span className="flex items-center gap-1.5 font-bold text-xs">
              <span className="w-5 h-5 rounded-full bg-white text-blue-700 flex items-center justify-center text-[11px] font-black">3</span>
              <span>Expert List</span>
            </span>
            <span className="text-[10px] text-blue-100 font-normal">Verified Scholars</span>
          </div>

          {/* Phone View Container */}
          <div className="bg-white rounded-[26px] overflow-hidden border border-slate-200 text-slate-800 font-sans shadow-inner min-h-[580px] flex flex-col justify-between">
            
            <div>
              {/* Phone Status Bar */}
              <div className="bg-slate-900 text-white px-4 py-1 text-[10px] flex justify-between items-center font-mono">
                <span>9:41</span>
                <span className="flex items-center gap-1">📶 🔋</span>
              </div>

              {/* Header Bar */}
              <div className="bg-white px-3 py-2 flex items-center justify-between border-b border-slate-100">
                <ArrowLeft onClick={() => onNavigate('categories')} className="w-4 h-4 text-slate-700 cursor-pointer" />
                <div className="text-center">
                  <h4 className="text-xs font-bold text-slate-900 leading-tight">Islamic Finance</h4>
                  <p className="text-[9px] text-blue-600 font-semibold">32 Verified Experts</p>
                </div>
                <Sliders className="w-4 h-4 text-slate-700" />
              </div>

              {/* Filter Tabs */}
              <div className="p-2 flex items-center gap-1.5 overflow-x-auto border-b border-slate-100">
                <span className="px-2.5 py-1 rounded-full bg-blue-600 text-white font-bold text-[10px]">All</span>
                <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 text-[10px]">Mufti</span>
                <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 text-[10px]">Finance Scholar</span>
                <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 text-[10px]">Aalim</span>
              </div>

              {/* Expert Cards */}
              <div className="p-3 space-y-3">
                {experts.map((exp) => (
                  <div 
                    key={exp.id}
                    onClick={() => onNavigate('expert-profile', { expertId: exp.id })}
                    className="p-3 rounded-2xl border border-slate-200 bg-white hover:border-blue-300 cursor-pointer transition-all shadow-sm space-y-2"
                  >
                    <div className="flex gap-2.5 items-start">
                      <div className="relative shrink-0">
                        <img 
                          src={exp.avatar} 
                          alt={exp.name} 
                          className="w-11 h-11 rounded-full object-cover border border-slate-200" 
                        />
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1">
                          <h5 className="text-xs font-extrabold text-slate-900 truncate">{exp.name}</h5>
                          <CheckCircle className="w-3 h-3 text-blue-600 fill-blue-600 shrink-0" />
                        </div>
                        <p className="text-[10px] text-slate-500 font-medium truncate">{exp.title}</p>
                        <div className="mt-0.5 flex items-center gap-1 text-[10px] text-slate-600 font-semibold">
                          <span className="text-amber-500">★ {exp.rating}</span>
                          <span className="text-slate-400">({exp.reviewCount})</span>
                          <span className="text-slate-300">•</span>
                          <span>{exp.experienceYears}+ Years</span>
                        </div>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1">
                      {exp.specialization.split('|').map((t, idx) => (
                        <span key={idx} className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 text-[9px]">
                          {t.trim()}
                        </span>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-3 gap-1.5 pt-1">
                      <button 
                        onClick={(e) => { e.stopPropagation(); onNavigate('booking', { expertId: exp.id, method: 'voice' }); }}
                        className="py-1 px-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-[10px] flex items-center justify-center gap-1"
                      >
                        <Phone className="w-3 h-3" />
                        <span>Call</span>
                      </button>
                      <button 
                        onClick={(e) => { e.stopPropagation(); onNavigate('chat', { expertId: exp.id }); }}
                        className="py-1 px-2 rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-50 font-bold text-[10px] flex items-center justify-center gap-1"
                      >
                        <MessageSquare className="w-3 h-3" />
                        <span>Chat</span>
                      </button>
                      <button 
                        onClick={(e) => { e.stopPropagation(); onNavigate('booking', { expertId: exp.id, method: 'video' }); }}
                        className="py-1 px-2 rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-50 font-bold text-[10px] flex items-center justify-center gap-1"
                      >
                        <Video className="w-3 h-3" />
                        <span>Video</span>
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* ==================== SCREEN 4: EXPERT PROFILE ==================== */}
        <div className="w-[310px] sm:w-[320px] flex-shrink-0 bg-slate-950 p-2.5 rounded-[36px] shadow-2xl border-4 border-slate-700">
          
          {/* Header Tag */}
          <div 
            onClick={() => onNavigate('expert-profile', { expertId: expertMufti.id })}
            className="bg-blue-600 hover:bg-blue-500 cursor-pointer text-white px-3 py-1.5 rounded-t-2xl flex items-center justify-between mb-2 transition-all shadow"
          >
            <span className="flex items-center gap-1.5 font-bold text-xs">
              <span className="w-5 h-5 rounded-full bg-white text-blue-700 flex items-center justify-center text-[11px] font-black">4</span>
              <span>Expert Profile</span>
            </span>
            <span className="text-[10px] text-blue-100 font-normal">Transparent</span>
          </div>

          {/* Phone View Container */}
          <div className="bg-white rounded-[26px] overflow-hidden border border-slate-200 text-slate-800 font-sans shadow-inner min-h-[580px] flex flex-col justify-between">
            
            <div>
              {/* Phone Status Bar */}
              <div className="bg-slate-900 text-white px-4 py-1 text-[10px] flex justify-between items-center font-mono">
                <span>9:41</span>
                <span className="flex items-center gap-1">📶 🔋</span>
              </div>

              {/* Header Bar */}
              <div className="bg-white px-3 py-2 flex items-center justify-between border-b border-slate-100">
                <ArrowLeft onClick={() => onNavigate('experts')} className="w-4 h-4 text-slate-700 cursor-pointer" />
                <span className="text-xs font-bold text-slate-800">Profile</span>
                <div className="flex items-center gap-2">
                  <span className="text-slate-400">♡</span>
                  <Share2 className="w-3.5 h-3.5 text-slate-600" />
                </div>
              </div>

              {/* Profile Main Body */}
              <div className="p-3 text-center space-y-2">
                
                {/* Avatar with Online badge */}
                <div className="relative inline-block mx-auto">
                  <img 
                    src={expertMufti.avatar} 
                    alt={expertMufti.name} 
                    className="w-16 h-16 rounded-full object-cover border-2 border-blue-500 shadow-md" 
                  />
                  <span className="absolute bottom-0 right-0 px-1.5 py-0.2 bg-emerald-500 text-white text-[8px] font-bold rounded-full border border-white">
                    • Online
                  </span>
                </div>

                {/* Verified Badge */}
                <div>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[10px] font-extrabold border border-blue-200">
                    <CheckCircle className="w-3 h-3 text-blue-600 fill-blue-600" />
                    <span>Verified Expert</span>
                  </span>
                </div>

                {/* Name & Title */}
                <div>
                  <h4 className="text-sm font-black text-slate-900">{expertMufti.name}</h4>
                  <p className="text-[10px] text-slate-500 font-medium">{expertMufti.title} | Islamic Finance</p>
                  <div className="mt-1 text-amber-500 font-bold text-xs flex justify-center items-center gap-1">
                    <span>★★★★★</span>
                    <span className="text-slate-800">4.8</span>
                    <span className="text-slate-400 text-[10px] font-normal">(320 Reviews)</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="bg-slate-50 p-2 rounded-xl text-left space-y-1 text-[10px] text-slate-700 font-semibold border border-slate-100">
                  <div className="flex items-center gap-1.5">🎓 <span>10+ Years Experience</span></div>
                  <div className="flex items-center gap-1.5">💬 <span>2000+ Sessions Completed</span></div>
                  <div className="flex items-center gap-1.5">🌐 <span>Speaks: Urdu, English, Arabic, Hindi</span></div>
                </div>

                {/* Price Bar */}
                <div className="flex items-center justify-between bg-rose-50 p-2 rounded-xl border border-rose-100">
                  <div className="text-rose-600 font-black text-xs sm:text-sm">
                    ₹12 / Min
                  </div>
                  <span className="px-2 py-0.5 rounded-md bg-emerald-500 text-white text-[9px] font-bold">
                    First 5 Min FREE
                  </span>
                </div>

                {/* Main Action buttons */}
                <div className="grid grid-cols-3 gap-1.5 pt-1">
                  <button 
                    onClick={() => onNavigate('booking', { expertId: expertMufti.id, method: 'voice' })}
                    className="py-1.5 rounded-lg bg-blue-600 text-white font-bold text-[10px] flex items-center justify-center gap-1 shadow"
                  >
                    <Phone className="w-3 h-3" />
                    <span>Call</span>
                  </button>
                  <button 
                    onClick={() => onNavigate('chat', { expertId: expertMufti.id })}
                    className="py-1.5 rounded-lg border border-blue-600 text-blue-600 font-bold text-[10px] flex items-center justify-center gap-1"
                  >
                    <MessageSquare className="w-3 h-3" />
                    <span>Chat</span>
                  </button>
                  <button 
                    onClick={() => onNavigate('booking', { expertId: expertMufti.id, method: 'video' })}
                    className="py-1.5 rounded-lg border border-blue-600 text-blue-600 font-bold text-[10px] flex items-center justify-center gap-1"
                  >
                    <Video className="w-3 h-3" />
                    <span>Video</span>
                  </button>
                </div>

                {/* Badges / Qualifications */}
                <div className="text-left space-y-1 pt-1">
                  <span className="text-[10px] font-bold text-slate-800">Badges / Qualifications</span>
                  <div className="flex flex-wrap gap-1">
                    {expertMufti.badges.map((b, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[9px] font-medium border border-slate-200">
                        {b}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>

        {/* ==================== SCREEN 5: CHAT / SESSION SCREEN ==================== */}
        <div className="w-[310px] sm:w-[320px] flex-shrink-0 bg-slate-950 p-2.5 rounded-[36px] shadow-2xl border-4 border-slate-700">
          
          {/* Header Tag */}
          <div 
            onClick={() => onNavigate('chat', { expertId: expertMufti.id })}
            className="bg-blue-600 hover:bg-blue-500 cursor-pointer text-white px-3 py-1.5 rounded-t-2xl flex items-center justify-between mb-2 transition-all shadow"
          >
            <span className="flex items-center gap-1.5 font-bold text-xs">
              <span className="w-5 h-5 rounded-full bg-white text-blue-700 flex items-center justify-center text-[11px] font-black">5</span>
              <span>Chat / Session Screen</span>
            </span>
            <span className="text-[10px] text-blue-100 font-normal">Safe • Private</span>
          </div>

          {/* Phone View Container */}
          <div className="bg-slate-50 rounded-[26px] overflow-hidden border border-slate-200 text-slate-800 font-sans shadow-inner min-h-[580px] flex flex-col justify-between">
            
            <div>
              {/* Phone Status Bar */}
              <div className="bg-slate-900 text-white px-4 py-1 text-[10px] flex justify-between items-center font-mono">
                <span>9:41</span>
                <span className="flex items-center gap-1">📶 🔋</span>
              </div>

              {/* Chat Header */}
              <div className="bg-white px-3 py-2 flex items-center justify-between border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <ArrowLeft onClick={() => onNavigate('experts')} className="w-4 h-4 text-slate-700 cursor-pointer" />
                  <img src={expertMufti.avatar} alt={expertMufti.name} className="w-7 h-7 rounded-full object-cover" />
                  <div>
                    <h5 className="text-[11px] font-bold text-slate-900 leading-tight">{expertMufti.name}</h5>
                    <span className="text-[9px] text-emerald-600 font-bold">● Online</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <Phone className="w-3.5 h-3.5" />
                  <Video className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Encryption Banner */}
              <div className="m-2.5 p-2 bg-amber-50 border border-amber-200 rounded-xl text-[9px] text-amber-900 flex items-center gap-1.5 leading-tight">
                <Lock className="w-3 h-3 text-amber-600 shrink-0" />
                <span>This conversation is private and secure. Your data is protected.</span>
              </div>

              {/* Message Timeline */}
              <div className="p-3 space-y-2.5 text-[11px]">
                
                {/* Expert Msg */}
                <div className="flex flex-col items-start max-w-[85%]">
                  <div className="p-2.5 rounded-2xl bg-white border border-slate-200 text-slate-800 shadow-2xs space-y-1">
                    <p>Assalamu Alaikum</p>
                    <p>How can I help you today?</p>
                  </div>
                  <span className="text-[8px] text-slate-400 mt-0.5">10:00 AM</span>
                </div>

                {/* User Msg */}
                <div className="flex flex-col items-end self-end ml-auto max-w-[85%]">
                  <div className="p-2.5 rounded-2xl bg-blue-600 text-white font-medium shadow-2xs space-y-1">
                    <p>Wa Alaikum Assalam</p>
                    <p>Mera business halal hai kya Islamic perspective se?</p>
                  </div>
                  <span className="text-[8px] text-slate-400 mt-0.5">10:01 AM ✓✓</span>
                </div>

                {/* Expert Msg */}
                <div className="flex flex-col items-start max-w-[85%]">
                  <div className="p-2.5 rounded-2xl bg-white border border-slate-200 text-slate-800 shadow-2xs space-y-1">
                    <p>Bilkul, InshaAllah.</p>
                    <p>Main aapko step by step guide karunga. Aap apna business type aur details bataiye.</p>
                  </div>
                  <span className="text-[8px] text-slate-400 mt-0.5">10:02 AM</span>
                </div>

              </div>
            </div>

            {/* Quick Actions & Input Area */}
            <div>
              <div className="px-2 py-1.5 bg-slate-100 flex items-center justify-around border-t border-slate-200 text-[9px] text-blue-700 font-semibold">
                <button className="flex items-center gap-1"><Paperclip className="w-3 h-3" /> Send File</button>
                <button className="flex items-center gap-1"><Mic className="w-3 h-3" /> Voice Call</button>
                <button className="flex items-center gap-1"><Video className="w-3 h-3" /> Video Call</button>
              </div>

              <div className="bg-white p-2 flex items-center gap-2 border-t border-slate-200">
                <input 
                  type="text" 
                  placeholder="Type your message..." 
                  className="flex-1 bg-slate-100 border border-slate-200 rounded-full px-3 py-1.5 text-[11px] focus:outline-none"
                />
                <Smile className="w-4 h-4 text-slate-400" />
                <button className="w-7 h-7 bg-blue-600 rounded-full text-white flex items-center justify-center shadow">
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
