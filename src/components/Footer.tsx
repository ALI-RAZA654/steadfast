import React, { useState } from 'react';
import { PageView } from '../types';
import { ShieldCheck, Mail, ArrowRight, Heart, Sparkles } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: PageView) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 pt-16 pb-24 lg:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3 cursor-pointer group" onClick={() => onNavigate('home')}>
              <img 
                src="/logo.png" 
                alt="Steadfast Deen" 
                className="h-10 w-auto object-contain bg-white/95 p-1 rounded-xl border border-green-700/40 shadow-sm"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/images/file_00000000ede8821195d4d82712923da5.png';
                }}
              />
              <span className="text-xl font-extrabold font-heading text-white tracking-tight">
                Steadfast <span className="text-green-400">Deen</span>
              </span>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Connecting Muslims worldwide with authentic Islamic education and verified scholars for trusted online guidance, consultations, and structured e-learning.
            </p>

            <div className="flex items-center gap-2 text-xs text-green-300/90 bg-slate-900 px-3 py-2 rounded-lg border border-slate-800 max-w-sm">
              <ShieldCheck className="w-4 h-4 text-green-400 shrink-0" />
              <span>Independent & authentic Islamic advisory platform.</span>
            </div>

            {/* Social Media Icons */}
            <div className="flex items-center gap-3 pt-2">
              {/* Instagram */}
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 hover:border-green-500 hover:bg-green-900/30 flex items-center justify-center text-slate-400 hover:text-green-400 transition-all group"
                title="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </a>

              {/* YouTube */}
              <a
                href="https://www.youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 hover:border-green-500 hover:bg-green-900/30 flex items-center justify-center text-slate-400 hover:text-green-400 transition-all group"
                title="YouTube"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>

              {/* Facebook */}
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 hover:border-green-500 hover:bg-green-900/30 flex items-center justify-center text-slate-400 hover:text-green-400 transition-all group"
                title="Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>

              {/* Twitter / X */}
              <a
                href="https://www.twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 hover:border-green-500 hover:bg-green-900/30 flex items-center justify-center text-slate-400 hover:text-green-400 transition-all group"
                title="Twitter / X"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Learn & Explore */}
          <div>
            <h3 className="text-sm font-semibold text-green-400 uppercase tracking-wider font-heading mb-4">
              E-Learning
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => onNavigate('courses')} className="hover:text-white transition-colors">
                  Quran with Tajweed
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('courses')} className="hover:text-white transition-colors">
                  Foundations of Fiqh
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('courses')} className="hover:text-white transition-colors">
                  Islamic Finance
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('courses')} className="hover:text-white transition-colors">
                  Hadith & Seerah
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('certificates')} className="hover:text-white transition-colors">
                  Verified Certificates
                </button>
              </li>
            </ul>
          </div>

          {/* Consultancy */}
          <div>
            <h3 className="text-sm font-semibold text-green-400 uppercase tracking-wider font-heading mb-4">
              Consultancy
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => onNavigate('experts')} className="hover:text-white transition-colors">
                  Find a Mufti
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('experts')} className="hover:text-white transition-colors">
                  Family Counseling
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('experts')} className="hover:text-white transition-colors">
                  Financial Guidance
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('categories')} className="hover:text-white transition-colors">
                  Browse Categories
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('chat')} className="hover:text-white transition-colors">
                  Private Session Portal
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h3 className="text-sm font-semibold text-green-400 uppercase tracking-wider font-heading mb-4">
              Weekly Knowledge
            </h3>
            <p className="text-xs text-slate-400 mb-3">
              Subscribe for verified Hadith reflections, contemporary Fiqh answers, and platform updates.
            </p>

            {subscribed ? (
              <div className="p-3 bg-emerald-950/80 border border-emerald-700/50 rounded-lg text-xs text-emerald-300 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>JazakAllah Khair for subscribing!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-lg bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                  />
                  <Mail className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
                <button
                  type="submit"
                  className="w-full py-2 text-xs font-semibold bg-green-700 hover:bg-green-600 text-white rounded-lg transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div className="flex items-center gap-1 text-slate-400">
            <span>© {new Date().getFullYear()} Steadfast Deen.com. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6">
            <button onClick={() => onNavigate('about')} className="hover:text-slate-300 transition-colors">
              About Us
            </button>
            <button onClick={() => onNavigate('contact')} className="hover:text-slate-300 transition-colors">
              Contact & Support
            </button>
            <button onClick={() => onNavigate('about')} className="hover:text-slate-300 transition-colors">
              Ethics & Privacy Policy
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
