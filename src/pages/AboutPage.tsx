import React from 'react';
import { PageView } from '../types';
import { Breadcrumb } from '../components/Breadcrumb';
import { ShieldCheck, BookOpen, HeartHandshake, Award, CheckCircle2, Lock } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (view: PageView) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-12 pb-20">
      <Breadcrumb items={[{ label: 'About Us' }]} onNavigate={onNavigate} />

      {/* Header */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 relative overflow-hidden text-center space-y-4">
        <span className="inline-block px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold uppercase tracking-wider border border-amber-400/30">
          About Steadfast Deen.com
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-white">
          Authentic Knowledge. Trusted Guidance.
        </h1>
        <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Steadfast Deen.com is a dedicated Islamic e-learning and consultancy platform connecting Muslims worldwide with verified scholars and certified specialists.
        </p>
      </div>

      {/* Mission & Vision Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-soft-sm space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
            <BookOpen className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold font-heading text-slate-900">Our Mission</h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            To make authentic Islamic education and trusted professional guidance easily accessible through a modern, confidential, and high-quality digital platform for learners of all backgrounds.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-soft-sm space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold font-heading text-slate-900">Our Vision</h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            To serve as the global digital ecosystem where every Muslim can gain verified Quranic Tajweed, Fiqh clarity, family peace, and ethical financial wisdom with total privacy and trust.
          </p>
        </div>
      </div>

      {/* Core Platform Pillars */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 space-y-6">
        <h2 className="text-2xl font-bold font-heading text-amber-400 text-center">
          Why Steadfast Deen.com Standing Principles
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
          <div className="space-y-2">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Verified Credentials
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Every scholar on our platform undergoes strict credential audits including Dars-e-Nizami Alimiyyah, Ifta certifications, and academic degrees.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Lock className="w-4 h-4 text-emerald-400" />
              Confidentiality
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Personal, marital, legal, or financial consultations are handled with maximum confidentiality and respectful Islamic empathy.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Award className="w-4 h-4 text-emerald-400" />
              Structured E-Learning
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Our LMS courses follow clear curricula with lesson videos, quizzes, downloadable PDF summaries, and verifiable certificates.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
