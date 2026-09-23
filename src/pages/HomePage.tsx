import React, { useState } from 'react';
import { PageView, Expert, Category, Course } from '../types';
import { SectionHeader } from '../components/SectionHeader';
import { CategoryCard } from '../components/CategoryCard';
import { ExpertCard } from '../components/ExpertCard';
import { CourseCard } from '../components/CourseCard';
import { VerifiedBadge } from '../components/VerifiedBadge';
import { 
  Search, 
  ShieldCheck, 
  BookOpen, 
  MessageSquare, 
  CheckCircle2, 
  Sparkles, 
  Star, 
  Users, 
  GraduationCap, 
  HeartHandshake,
  ArrowRight,
  Lock,
  Award,
  Scale,
  Heart,
  Coins,
  ScrollText,
  Compass,
  History,
  Phone,
  Video,
  ChevronRight,
  Check
} from 'lucide-react';

interface HomePageProps {
  categories: Category[];
  experts: Expert[];
  courses: Course[];
  onNavigate: (view: PageView, params?: any) => void;
  onBookConsultation: (expertId: string, method: 'chat' | 'voice' | 'video') => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  categories,
  experts,
  courses,
  onNavigate,
  onBookConsultation
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onNavigate('experts', { search: searchQuery });
    }
  };

  const featuredExperts = experts.slice(0, 4);
  const featuredCourses = courses.filter(c => c.featured).slice(0, 3);
  const topCategories = categories;

  // Icon mapper helper
  const getCategoryTheme = (id: string) => {
    switch (id) {
      case 'quran-learning': return { icon: BookOpen, bg: 'bg-emerald-500/10 text-emerald-600 border-emerald-200' };
      case 'fiqh-masail': return { icon: Scale, bg: 'bg-blue-500/10 text-blue-600 border-blue-200' };
      case 'family-marriage': return { icon: Heart, bg: 'bg-pink-500/10 text-pink-600 border-pink-200' };
      case 'islamic-finance': return { icon: Coins, bg: 'bg-green-500/10 text-green-600 border-green-200' };
      case 'hadith-studies': return { icon: ScrollText, bg: 'bg-purple-500/10 text-purple-600 border-purple-200' };
      case 'aqeedah-beliefs': return { icon: Compass, bg: 'bg-teal-500/10 text-teal-600 border-teal-200' };
      case 'seerah-history': return { icon: History, bg: 'bg-green-700/10 text-green-800 border-green-200' };
      case 'spiritual-guidance': return { icon: Sparkles, bg: 'bg-emerald-500/10 text-emerald-600 border-emerald-200' };
      case 'children-youth': return { icon: GraduationCap, bg: 'bg-sky-500/10 text-sky-600 border-sky-200' };
      default: return { icon: BookOpen, bg: 'bg-blue-500/10 text-blue-600 border-blue-200' };
    }
  };

  return (
    <div className="space-y-12 sm:space-y-16 lg:space-y-20 pb-20 text-slate-800">
      
      {/* 1. HERO SECTION (FULL WIDESCREEN HERO) */}
      <section className="relative bg-gradient-to-r from-slate-950 via-[#0c2340] to-blue-950 text-white pt-10 pb-16 lg:pt-16 lg:pb-24 border-b border-slate-800 overflow-hidden">
        
        {/* Subtle Geometric Background Overlay & Glow */}
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-10 w-96 h-96 bg-green-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-800/90 border border-green-500/40 text-green-300 text-xs sm:text-sm font-semibold shadow-md">
                <Sparkles className="w-4 h-4 text-green-400" />
                <span>Verified Islamic Scholars & E-Learning Platform</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-heading tracking-tight leading-tight text-white">
                Find Answers. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-300 via-green-400 to-green-500">
                  Learn Islam.
                </span>{' '}
                <br className="hidden sm:inline" />
                Consult Experts. Grow in Deen.
              </h1>

              {/* Supporting Text */}
              <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed mx-auto lg:mx-0 font-normal">
                Learn authentic Islamic knowledge and connect with verified Muftis, scholars, and specialists for live 1-on-1 consultations, daily masail, and structured courses.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <button
                  onClick={() => onNavigate('experts')}
                  className="w-full sm:w-auto px-8 py-4 text-base font-extrabold text-white bg-gradient-to-r from-green-600 via-green-600 to-green-700 hover:from-green-500 hover:to-green-600 rounded-2xl shadow-lg hover:shadow-green-500/25 transition-all flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
                >
                  <span>Your First 5 Minutes FREE</span>
                  <ArrowRight className="w-5 h-5" />
                </button>

                <button
                  onClick={() => onNavigate('courses')}
                  className="w-full sm:w-auto px-7 py-4 text-base font-bold text-slate-200 bg-slate-800/90 hover:bg-slate-700 border border-slate-700 rounded-2xl transition-all flex items-center justify-center gap-2"
                >
                  <BookOpen className="w-5 h-5 text-green-400" />
                  <span>Explore Courses</span>
                </button>
              </div>

              {/* Trust Metrics */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-slate-800/80 max-w-lg mx-auto lg:mx-0">
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold font-heading text-white">100+</div>
                  <div className="text-xs text-slate-400 font-medium">Verified Scholars</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold font-heading text-green-400">4.9/5</div>
                  <div className="text-xs text-slate-400 font-medium">User Rating</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold font-heading text-white">100%</div>
                  <div className="text-xs text-slate-400 font-medium">Private & Secure</div>
                </div>
              </div>

            </div>

            {/* Right Hero Feature Showcase */}
            <div className="lg:col-span-5 hidden lg:block">
              <div className="relative mx-auto max-w-md bg-slate-900/90 border border-slate-700/80 rounded-3xl p-6 shadow-2xl space-y-4">
                <div className="text-green-400 font-extrabold text-sm uppercase tracking-wider flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-green-400" />
                  <span>Platform Highlights</span>
                </div>
                
                <div className="space-y-3 text-xs text-slate-200">
                  <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-800/80 border border-slate-700/60">
                    <div className="w-8 h-8 rounded-xl bg-green-500/20 text-green-400 flex items-center justify-center font-bold">
                      ✓
                    </div>
                    <div>
                      <div className="font-extrabold text-white text-sm">Verified Muftis &amp; Scholars</div>
                      <div className="text-slate-400 text-[11px]">Strict Ifta &amp; Alimiyyah degree verification</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-800/80 border border-slate-700/60">
                    <div className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
                      🔒
                    </div>
                    <div>
                      <div className="font-extrabold text-white text-sm">256-bit Private Sessions</div>
                      <div className="text-slate-400 text-[11px]">100% confidential 1-on-1 consultations</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-800/80 border border-slate-700/60">
                    <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                      🎁
                    </div>
                    <div>
                      <div className="font-extrabold text-white text-sm">First 5 Minutes Free</div>
                      <div className="text-slate-400 text-[11px]">Test live voice, video, or chat guidance</div>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400 font-medium">
                  <span>Authorized Shariah Advisory</span>
                  <span className="text-emerald-400 font-bold">Instant Online</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. SEARCH & QUICK FILTER BAR */}
      <section className="-mt-8 sm:-mt-12 relative z-20 max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-soft-lg border border-slate-200/90 space-y-4">
          <form onSubmit={handleSearchSubmit} className="relative">
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="relative flex-1 w-full">
                <input
                  type="text"
                  placeholder="Search your question, category, course, or scholar..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 text-sm sm:text-base rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
                />
                <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto px-7 py-4 bg-blue-700 hover:bg-blue-800 text-white font-extrabold text-sm rounded-2xl transition-colors shadow-sm flex items-center justify-center gap-2 shrink-0"
              >
                <span>Search</span>
              </button>
            </div>
          </form>

          {/* Popular Search Chips */}
          <div className="pt-2 border-t border-slate-100 flex items-center gap-2 overflow-x-auto pb-1 text-xs">
            <span className="text-slate-400 font-bold shrink-0">Popular:</span>
            {['Islamic Finance', 'Tajweed Rules', 'Family & Marriage', 'Zakat Calculator', 'Salah Fiqh'].map((chip) => (
              <button
                key={chip}
                onClick={() => onNavigate('experts', { search: chip })}
                className="px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 transition-colors shrink-0 font-semibold"
              >
                {chip}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3. CATEGORIES SECTION (FULL WIDTH GRID) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <SectionHeader
          badge="Knowledge Ecosystem"
          title="Browse Knowledge & Guidance Categories"
          subtitle="Choose a specialized topic to consult verified Muftis and scholars for trusted answers."
          actionText="View All Categories"
          onActionClick={() => onNavigate('categories')}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topCategories.map((cat) => {
            const { icon: IconComp, bg } = getCategoryTheme(cat.id);
            return (
              <div
                key={cat.id}
                onClick={() => onNavigate('experts', { category: cat.id })}
                className="p-5 rounded-3xl bg-white border border-slate-200/90 hover:border-blue-400 shadow-soft-xs hover:shadow-soft-md cursor-pointer transition-all duration-300 flex items-center justify-between group"
              >
                <div className="flex items-center gap-4">
                  <div className={`p-3.5 rounded-2xl ${bg} border shrink-0 group-hover:scale-110 transition-transform`}>
                    <IconComp className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-slate-900 group-hover:text-blue-700 transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium mt-1 line-clamp-1">
                      {cat.description}
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-blue-600 shrink-0 transition-colors" />
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. VERIFIED SCHOLARS GRID (FULL WIDTH) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <SectionHeader
          badge="Verified Scholars"
          title="Featured Islamic Experts & Scholars"
          subtitle="Connect with qualified Muftis and specialists available now for instant voice, video, or chat consultations."
          actionText="Find More Scholars"
          onActionClick={() => onNavigate('experts')}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredExperts.map((exp) => (
            <ExpertCard
              key={exp.id}
              expert={exp}
              onViewProfile={(expId) => onNavigate('expert-profile', { expertId: expId })}
              onBookConsultation={onBookConsultation}
              compact={true}
            />
          ))}
        </div>
      </section>

      {/* 5. STRUCTURED LMS COURSES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <SectionHeader
          badge="Structured Learning"
          title="Learn Authentic Islamic Knowledge"
          subtitle="Structured LMS courses curated by renowned scholars with video lectures and verified completion certificates."
          actionText="Browse Courses"
          onActionClick={() => onNavigate('courses')}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredCourses.map((c) => (
            <CourseCard
              key={c.id}
              course={c}
              onSelectCourse={(courseId) => onNavigate('course-detail', { courseId })}
            />
          ))}
        </div>
      </section>

      {/* 6. PLATFORM TRUST & INTEGRITY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-950 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 relative overflow-hidden space-y-8">
          
          <div className="max-w-3xl space-y-3">
            <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-300 text-xs font-semibold tracking-wider uppercase border border-green-400/30">
              Why Choose Us
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white">
              Why Muslims Trust Steadfast Deen
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              We connect authentic traditional Islamic scholarship with modern digital accessibility for Muslims worldwide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-green-500/20 text-green-400 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold font-heading text-white">Vetted Scholar Credentials</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Every Mufti and scholar undergoes thorough background verification (Alimiyyah/Ifta degrees & Ijazah).
              </p>
            </div>

            <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold font-heading text-white">Confidential & Private</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Your personal queries, family masail, and financial consultations remain strictly confidential.
              </p>
            </div>

            <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold font-heading text-white">Authentic References</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                All rulings and answers are grounded strictly in the Holy Quran, authentic Sunnah, and classical jurisprudence.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 7. BOTTOM CALL TO ACTION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-blue-900 via-slate-900 to-blue-950 p-8 sm:p-12 rounded-3xl border border-blue-800/60 shadow-xl text-center space-y-6 text-white">
          <h2 className="text-2xl sm:text-4xl font-black font-heading">
            Ready to Speak with a Verified Scholar?
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto">
            Get instant clarity on your daily questions, family affairs, or financial transactions. Book your session now with 5 minutes free.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => onNavigate('experts')}
              className="px-8 py-4 text-sm font-extrabold text-white bg-green-700 hover:bg-green-600 rounded-2xl shadow-lg transition-colors"
            >
              Find an Expert Now
            </button>
            <button
              onClick={() => onNavigate('courses')}
              className="px-8 py-4 text-sm font-bold text-white bg-slate-800 hover:bg-slate-700 rounded-2xl border border-slate-700 transition-colors"
            >
              Explore Courses
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
