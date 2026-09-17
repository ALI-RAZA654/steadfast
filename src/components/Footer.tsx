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
                className="h-10 w-auto object-contain bg-white/95 p-1 rounded-xl border border-amber-400/40 shadow-sm"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/images/file_00000000ede8821195d4d82712923da5.png';
                }}
              />
              <span className="text-xl font-extrabold font-heading text-white tracking-tight">
                Steadfast <span className="text-amber-400">Deen</span>
              </span>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Connecting Muslims worldwide with authentic Islamic education and verified scholars for trusted online guidance, consultations, and structured e-learning.
            </p>

            <div className="flex items-center gap-2 text-xs text-amber-300/90 bg-slate-900 px-3 py-2 rounded-lg border border-slate-800 max-w-sm">
              <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Independent & authentic Islamic advisory platform.</span>
            </div>
          </div>

          {/* Learn & Explore */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider font-heading mb-4 text-amber-400">
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
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider font-heading mb-4 text-amber-400">
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
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider font-heading mb-4 text-amber-400">
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
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-lg bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                  <Mail className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
                <button
                  type="submit"
                  className="w-full py-2 text-xs font-semibold bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-lg transition-colors flex items-center justify-center gap-1.5"
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
