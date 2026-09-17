import React, { useState } from 'react';
import { PageView } from '../types';
import { Mail, Lock, ArrowRight, ShieldCheck, UserCheck, Key } from 'lucide-react';

interface LoginPageProps {
  onNavigate: (view: PageView) => void;
  onLoginSuccess: (role?: 'student' | 'admin') => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onNavigate, onLoginSuccess }) => {
  const [email, setEmail] = useState('admin@steadfastdeen.com');
  const [password, setPassword] = useState('admin123');
  const [selectedRole, setSelectedRole] = useState<'admin' | 'student'>('admin');

  const fillAdminCredentials = () => {
    setEmail('admin@steadfastdeen.com');
    setPassword('admin123');
    setSelectedRole('admin');
  };

  const fillStudentCredentials = () => {
    setEmail('student@steadfastdeen.com');
    setPassword('student123');
    setSelectedRole('student');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isEmpAdmin = email.toLowerCase().includes('admin');
    const finalRole = isEmpAdmin ? 'admin' : 'student';
    onLoginSuccess(finalRole);
    onNavigate('dashboard');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-10 pb-24 space-y-6">
      
      {/* Brand Header */}
      <div className="text-center space-y-3">
        <img 
          src="/logo.png" 
          alt="Steadfast Deen" 
          className="h-16 w-auto mx-auto object-contain bg-white/95 p-1.5 rounded-2xl border border-amber-400/40 shadow-md"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/images/file_00000000ede8821195d4d82712923da5.png';
          }}
        />
        <div>
          <h1 className="text-2xl font-black font-heading text-slate-900">Welcome to Steadfast Deen</h1>
          <p className="text-xs text-slate-500 mt-1">Log in to access scholar consultations, learning portal, or admin management.</p>
        </div>
      </div>

      {/* QUICK CREDENTIALS PRESET BOX */}
      <div className="bg-amber-50 border border-amber-200/90 rounded-2xl p-4 space-y-2.5 shadow-2xs">
        <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
          <Key className="w-4 h-4 text-amber-600" />
          <span>Quick Login Credentials (Click to Fill)</span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={fillAdminCredentials}
            className={`p-2.5 rounded-xl border text-left transition-all ${
              selectedRole === 'admin'
                ? 'bg-slate-900 text-amber-300 border-slate-900 shadow-xs'
                : 'bg-white text-slate-800 border-amber-200 hover:bg-amber-100/50'
            }`}
          >
            <div className="flex items-center justify-between text-[11px] font-extrabold">
              <span>👑 Admin Account</span>
              {selectedRole === 'admin' && <span className="text-[9px] bg-amber-400 text-slate-950 px-1 rounded">Active</span>}
            </div>
            <div className="text-[10px] opacity-80 mt-0.5 truncate">admin@steadfastdeen.com</div>
            <div className="text-[10px] font-mono opacity-80">Pass: admin123</div>
          </button>

          <button
            type="button"
            onClick={fillStudentCredentials}
            className={`p-2.5 rounded-xl border text-left transition-all ${
              selectedRole === 'student'
                ? 'bg-blue-900 text-white border-blue-900 shadow-xs'
                : 'bg-white text-slate-800 border-amber-200 hover:bg-amber-100/50'
            }`}
          >
            <div className="flex items-center justify-between text-[11px] font-extrabold">
              <span>👤 Student Account</span>
              {selectedRole === 'student' && <span className="text-[9px] bg-blue-400 text-slate-950 px-1 rounded">Active</span>}
            </div>
            <div className="text-[10px] opacity-80 mt-0.5 truncate">student@steadfastdeen.com</div>
            <div className="text-[10px] font-mono opacity-80">Pass: student123</div>
          </button>
        </div>
      </div>

      {/* Main Login Form */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-soft-md space-y-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Email Address</label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-3 text-xs sm:text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-bold text-slate-700">Password</label>
              <button type="button" className="text-[11px] font-semibold text-blue-700 hover:underline">
                Forgot password?
              </button>
            </div>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-3 text-xs sm:text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 text-sm font-extrabold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
          >
            <span>Log In ({selectedRole === 'admin' ? 'Admin Mode' : 'Student Mode'})</span>
            <ArrowRight className="w-4 h-4" />
          </button>

        </form>

        <div className="pt-4 border-t border-slate-100 text-center text-xs text-slate-600">
          <span>Don't have an account yet? </span>
          <button onClick={() => onNavigate('register')} className="font-bold text-blue-700 hover:underline">
            Sign Up Free
          </button>
        </div>
      </div>

    </div>
  );
};

