import React, { useState } from 'react';
import { Expert, PageView } from '../types';
import { VerifiedBadge } from '../components/VerifiedBadge';
import { Rating } from '../components/Rating';
import { Breadcrumb } from '../components/Breadcrumb';
import { 
  Phone, 
  MessageSquare, 
  Video, 
  Clock, 
  Languages, 
  ShieldCheck, 
  Award, 
  CheckCircle2, 
  Calendar, 
  Star,
  PlayCircle,
  FileCheck
} from 'lucide-react';

interface ExpertProfilePageProps {
  expert: Expert;
  onNavigate: (view: PageView, params?: any) => void;
  onBookConsultation: (expertId: string, method: 'chat' | 'voice' | 'video') => void;
}

export const ExpertProfilePage: React.FC<ExpertProfilePageProps> = ({
  expert,
  onNavigate,
  onBookConsultation
}) => {
  const [activeTab, setActiveTab] = useState<'about' | 'subjects' | 'services' | 'reviews'>('about');
  const [selectedMethod, setSelectedMethod] = useState<'chat' | 'voice' | 'video'>('video');

  const reviewsList = [
    {
      name: 'Dr. Tariq M.',
      date: 'Aug 28, 2026',
      rating: 5,
      comment: 'Mufti Sahib gave clear, direct, and compassionate advice regarding my tech stock portfolio and zakat obligations. Highly recommended!'
    },
    {
      name: 'Amina K.',
      date: 'Aug 14, 2026',
      rating: 5,
      comment: 'Very patient, structured, and insightful session. Answered all my questions with authentic references.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8 pb-20">
      <Breadcrumb
        items={[
          { label: 'Experts', view: 'experts' },
          { label: expert.name }
        ]}
        onNavigate={onNavigate}
      />

      {/* Profile Header Hero */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-soft-md overflow-hidden">
        
        {/* Cover Image */}
        <div className="h-44 sm:h-60 w-full relative bg-slate-900">
          <img
            src={expert.coverImage || 'https://images.unsplash.com/photo-1542816417-0983cbe82752?auto=format&fit=crop&q=80&w=1200'}
            alt="Cover"
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent" />
        </div>

          {/* Header Main Content */}
          <div className="px-6 sm:px-10 pb-8 pt-6 relative">
            <div className="flex flex-col items-center text-center space-y-4">
              
              {/* Large Avatar with Online Status */}
              <div className="relative">
                <img
                  src={expert.avatar}
                  alt={expert.name}
                  className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-blue-500 shadow-xl bg-white"
                />
                <span className="absolute bottom-1 right-1 px-2 py-0.5 bg-emerald-500 text-white text-xs font-bold rounded-full border-2 border-white shadow-sm">
                  • Online
                </span>
              </div>

              {/* Verified Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-extrabold shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-blue-600 fill-blue-600" />
                <span>Verified Expert</span>
              </div>

              {/* Name & Subtitle */}
              <div>
                <h1 className="text-2xl sm:text-3xl font-black font-heading text-slate-900">
                  {expert.name}
                </h1>
                <p className="text-sm font-semibold text-slate-600 mt-0.5">
                  {expert.title} | Islamic Finance
                </p>
                <div className="mt-2 flex items-center justify-center gap-1.5 text-amber-500 font-bold text-sm">
                  <span>★★★★★</span>
                  <span className="text-slate-900 font-extrabold">4.8</span>
                  <span className="text-slate-500 text-xs font-normal">(320 Reviews)</span>
                </div>
              </div>

              {/* Stat Highlights Card */}
              <div className="w-full max-w-md bg-slate-50 p-4 rounded-2xl border border-slate-200 text-left space-y-2 text-xs sm:text-sm text-slate-700 font-semibold shadow-2xs">
                <div className="flex items-center gap-2">🎓 <span>{expert.experienceYears}+ Years Experience</span></div>
                <div className="flex items-center gap-2">💬 <span>{expert.completedSessions}+ Sessions Completed</span></div>
                <div className="flex items-center gap-2">🌐 <span>Speaks: {expert.languages.join(', ')}</span></div>
              </div>

              {/* Price Banner */}
              <div className="w-full max-w-md bg-rose-50 border border-rose-200 p-3.5 rounded-2xl flex items-center justify-between shadow-2xs">
                <div className="text-rose-600 font-black text-xl sm:text-2xl font-heading">
                  ₹{expert.ratePerMin} / Min
                </div>
                <span className="px-3 py-1 bg-emerald-500 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-xs">
                  First 5 Min FREE
                </span>
              </div>

              {/* Action Buttons Row */}
              <div className="w-full max-w-md grid grid-cols-3 gap-2 pt-1">
                <button
                  onClick={() => onBookConsultation(expert.id, 'voice')}
                  className="py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-md transition-all"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call</span>
                </button>
                <button
                  onClick={() => onNavigate('chat', { expertId: expert.id })}
                  className="py-3 px-4 rounded-xl border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-extrabold text-sm flex items-center justify-center gap-2 transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Chat</span>
                </button>
                <button
                  onClick={() => onBookConsultation(expert.id, 'video')}
                  className="py-3 px-4 rounded-xl border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-extrabold text-sm flex items-center justify-center gap-2 transition-all"
                >
                  <Video className="w-4 h-4" />
                  <span>Video</span>
                </button>
              </div>

              {/* Badges / Qualifications Section */}
              <div className="w-full max-w-md text-left pt-3 space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">Badges / Qualifications</h3>
                <div className="flex flex-wrap gap-1.5">
                  {expert.badges.map((badge, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-800 text-xs font-semibold border border-slate-200 shadow-2xs"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>

      {/* Main Grid Layout (Left Content + Right Booking Sidebar) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column (Tabs Content) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Tabs Navigation */}
          <div className="flex items-center gap-2 border-b border-slate-200">
            {[
              { id: 'about', label: 'About Me' },
              { id: 'subjects', label: 'Subjects & Qualifications' },
              { id: 'services', label: 'Consultation Services' },
              { id: 'reviews', label: `Reviews (${expert.reviewCount})` }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-3 px-4 text-xs sm:text-sm font-semibold transition-all border-b-2 ${
                  activeTab === tab.id
                    ? 'border-amber-500 text-amber-800'
                    : 'border-transparent text-slate-500 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab 1: About Me */}
          {activeTab === 'about' && (
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 space-y-6">
              <div>
                <h3 className="text-lg font-bold font-heading text-slate-900 mb-3">Biography</h3>
                <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                  {expert.bio}
                </p>
              </div>

              {expert.videoIntroUrl && (
                <div className="pt-4 border-t border-slate-100">
                  <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <PlayCircle className="w-4 h-4 text-blue-600" />
                    Scholar Video Introduction
                  </h3>
                  <div className="aspect-video bg-slate-900 rounded-2xl overflow-hidden relative">
                    <video
                      controls
                      poster={expert.coverImage}
                      src={expert.videoIntroUrl}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}

              {/* Key Languages */}
              <div className="pt-4 border-t border-slate-100">
                <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Languages className="w-4 h-4 text-slate-500" />
                  Languages Spoken
                </h3>
                <div className="flex flex-wrap gap-2">
                  {expert.languages.map((lang) => (
                    <span key={lang} className="px-3 py-1 bg-slate-100 rounded-lg text-xs font-semibold text-slate-700">
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Subjects & Qualifications */}
          {activeTab === 'subjects' && (
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 space-y-6">
              <div>
                <h3 className="text-lg font-bold font-heading text-slate-900 mb-4">Academic & Shariah Credentials</h3>
                <div className="space-y-3">
                  {expert.qualifications.map((qual, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                      <FileCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm font-medium text-slate-800">{qual}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Consultation Services */}
          {activeTab === 'services' && (
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 space-y-6">
              <h3 className="text-lg font-bold font-heading text-slate-900">Available Consultation Formats</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200 space-y-2">
                  <MessageSquare className="w-6 h-6 text-blue-600" />
                  <h4 className="text-sm font-bold text-slate-900">Private Chat</h4>
                  <p className="text-xs text-slate-600">Text-based confidential Q&A session with attachment sharing.</p>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-2">
                  <Phone className="w-6 h-6 text-emerald-600" />
                  <h4 className="text-sm font-bold text-slate-900">Voice Call</h4>
                  <p className="text-xs text-slate-600">Direct encrypted browser phone call with live discussion.</p>
                </div>

                <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-2">
                  <Video className="w-6 h-6 text-amber-600" />
                  <h4 className="text-sm font-bold text-slate-900">HD Video Session</h4>
                  <p className="text-xs text-slate-600">Full 1-on-1 video conference for detailed consultation.</p>
                </div>
              </div>
            </div>
          )}

          {/* Tab 4: Reviews */}
          {activeTab === 'reviews' && (
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <h3 className="text-lg font-bold font-heading text-slate-900">Student & Client Feedback</h3>
                <Rating rating={expert.rating} reviewCount={expert.reviewCount} size="md" />
              </div>

              <div className="space-y-4">
                {reviewsList.map((rev, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900">{rev.name}</span>
                      <span className="text-[11px] text-slate-500">{rev.date}</span>
                    </div>
                    <Rating rating={rev.rating} showCount={false} size="sm" />
                    <p className="text-xs text-slate-600 leading-relaxed">{rev.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Right Column (Sticky Booking Sidebar) */}
        <div className="lg:col-span-4 sticky top-24 space-y-4">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft-lg space-y-6">
            
            <div>
              <span className="text-xs font-bold tracking-wider text-slate-400 uppercase">Consultation Booking</span>
              <h3 className="text-xl font-bold font-heading text-slate-900 mt-1">Book 1-on-1 Session</h3>
            </div>

            {/* Select Consultation Method */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-700">1. Select Consultation Method:</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedMethod('chat')}
                  className={`py-2.5 text-xs font-bold rounded-xl border flex flex-col items-center gap-1 transition-all ${
                    selectedMethod === 'chat'
                      ? 'bg-blue-900 text-amber-300 border-blue-900 shadow-sm'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Chat</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedMethod('voice')}
                  className={`py-2.5 text-xs font-bold rounded-xl border flex flex-col items-center gap-1 transition-all ${
                    selectedMethod === 'voice'
                      ? 'bg-blue-900 text-amber-300 border-blue-900 shadow-sm'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <Phone className="w-4 h-4" />
                  <span>Voice</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedMethod('video')}
                  className={`py-2.5 text-xs font-bold rounded-xl border flex flex-col items-center gap-1 transition-all ${
                    selectedMethod === 'video'
                      ? 'bg-blue-900 text-amber-300 border-blue-900 shadow-sm'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <Video className="w-4 h-4" />
                  <span>Video</span>
                </button>
              </div>
            </div>

            {/* Price Calculator summary */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <div className="flex justify-between text-xs text-slate-600">
                <span>Rate:</span>
                <span className="font-semibold text-slate-900">${expert.ratePerMin} / min</span>
              </div>
              <div className="flex justify-between text-xs text-slate-600">
                <span>Standard Session (30 mins):</span>
                <span className="font-bold text-slate-900">${expert.flatSessionPrice}</span>
              </div>
              <div className="pt-2 border-t border-slate-200 flex justify-between text-sm font-bold text-slate-900">
                <span>Total Due:</span>
                <span className="text-amber-700 font-heading text-base">${expert.flatSessionPrice}</span>
              </div>
            </div>

            {/* Available Days */}
            <div className="text-xs space-y-1">
              <span className="font-semibold text-slate-700">Next Available Slots:</span>
              <p className="text-slate-500">{expert.availableSlots?.days.join(', ')}</p>
            </div>

            {/* CTA Button */}
            <button
              onClick={() => onBookConsultation(expert.id, selectedMethod)}
              className="w-full py-3.5 text-sm font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Proceed to Book Slot</span>
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>100% Satisfaction & Money-Back Policy</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
