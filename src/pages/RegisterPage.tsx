import React, { useState } from 'react';
import { PageView } from '../types';
import { Mail, Lock, User, ArrowRight, ShieldCheck } from 'lucide-react';

interface RegisterPageProps {
  onNavigate: (view: PageView) => void;
  onRegisterSuccess: () => void;
}

export const RegisterPage: React.FC<RegisterPageProps> = ({ onNavigate, onRegisterSuccess }) => {
  const [accountType, setAccountType] = useState<'student' | 'expert'>('student');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onRegisterSuccess();
    onNavigate('dashboard');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12 pb-24 space-y-6">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-slate-900 text-amber-400 flex items-center justify-center font-bold text-xl mx-auto shadow-md">
          SD
        </div>
        <h1 className="text-2xl font-bold font-heading text-slate-900">Create Free Account</h1>
        <p className="text-xs text-slate-600">Join Steadfast Deen.com to learn Islam and speak with verified experts.</p>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft-lg space-y-6">
        
        {/* Student vs Expert Tab Toggle */}
        <div className="grid grid-cols-2 gap-2 bg-slate-100 p-1 rounded-2xl">
          <button
            type="button"
            onClick={() => setAccountType('student')}
            className={`py-2 text-xs font-bold rounded-xl transition-all ${
              accountType === 'student' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
            }`}
          >
            I am a Student / Learner
          </button>
          <button
            type="button"
            onClick={() => setAccountType('expert')}
            className={`py-2 text-xs font-bold rounded-xl transition-all ${
              accountType === 'expert' ? 'bg-amber-400 text-slate-950 shadow-xs' : 'text-slate-500'
            }`}
          >
            I am a Scholar / Expert
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">Full Name</label>
            <div className="relative">
              <input
                type="text"
                required
                placeholder="Enter your name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">Email Address</label>
            <div className="relative">
              <input
                type="email"
                required
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">Password</label>
            <div className="relative">
              <input
                type="password"
                required
                placeholder="Create a strong password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {accountType === 'expert' && (
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-[11px] text-amber-900">
              Note: Scholar registration requires academic credential submission after account creation.
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3.5 text-xs sm:text-sm font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
          >
            <span>Register Free Account</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-4 border-t border-slate-100 text-center text-xs text-slate-600">
          <span>Already have an account? </span>
          <button onClick={() => onNavigate('login')} className="font-bold text-blue-700 hover:underline">
            Log In Here
          </button>
        </div>
      </div>
    </div>
  );
};
