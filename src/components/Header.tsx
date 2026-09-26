import React, { useState } from 'react';
import { PageView } from '../types';
import { 
  Search, 
  Menu, 
  X, 
  User, 
  BookOpen, 
  Users, 
  MessageSquare, 
  FileText, 
  Info, 
  Sparkles,
  LayoutDashboard,
  Calendar
} from 'lucide-react';

interface HeaderProps {
  currentView: PageView;
  onNavigate: (view: PageView, params?: any) => void;
  onSearchOpen?: () => void;
  isLoggedIn?: boolean;
  currentUser?: any;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  onSearchOpen,
  isLoggedIn = false,
  currentUser
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navLinks: { name: string; view: PageView; icon: any }[] = [
    { name: 'Home', view: 'home', icon: Sparkles },
    { name: 'Learn', view: 'courses', icon: BookOpen },
    { name: 'MCQ Test', view: 'quiz', icon: Sparkles },
    { name: 'Experts', view: 'experts', icon: Users },
    { name: 'Consultations', view: 'categories', icon: Calendar },
    { name: 'Resources', view: 'resources', icon: FileText },
    { name: 'About', view: 'about', icon: Info },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onNavigate('experts', { search: searchQuery });
    }
  };

  const isAdmin = currentUser?.role === 'admin';

  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-white transition-all shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => onNavigate('home')}>
            <img 
              src="/logo.png" 
              alt="Steadfast Deen" 
              className="h-11 sm:h-13 w-auto object-contain bg-white/95 p-1 rounded-xl shadow-md border border-green-700/40 group-hover:scale-105 transition-transform"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/images/file_00000000ede8821195d4d82712923da5.png';
              }}
            />
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-extrabold font-heading tracking-tight text-white flex items-center gap-1">
                Steadfast <span className="text-green-400">Deen</span>
              </span>
              <span className="text-[10px] text-slate-300 tracking-wider uppercase font-medium">Islamic Knowledge & Guidance</span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = currentView === link.view;
              return (
                <button
                  key={link.name}
                  onClick={() => onNavigate(link.view)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-blue-900/60 text-green-300 border border-blue-700/50 font-semibold'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                  }`}
                >
                  {link.name}
                </button>
              );
            })}
          </nav>

          {/* Right Action Items */}
          <div className="hidden md:flex items-center gap-3">
            {/* Quick Search */}
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Search topic or scholar..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-40 xl:w-52 pl-9 pr-3 py-1.5 text-xs rounded-full bg-slate-800 border border-slate-700 text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </form>

            {/* Auth / Dashboard buttons */}
            {isLoggedIn ? (
              <button
                onClick={() => onNavigate('dashboard')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 border transition-all ${
                  isAdmin
                    ? 'bg-gradient-to-r from-green-600 to-green-700 text-white border-green-500 shadow-sm'
                    : 'bg-blue-900/80 text-blue-200 border-blue-700/60 hover:bg-blue-800'
                }`}
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>{isAdmin ? '👑 Admin Dashboard' : 'Dashboard'}</span>
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onNavigate('login')}
                  className="px-3 py-1.5 text-xs font-bold text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 transition-colors flex items-center gap-1"
                >
                  <span>🔑 Admin / Login</span>
                </button>
              </div>
            )}

            {/* MCQ Quiz CTA Button */}
            <button
              onClick={() => onNavigate('quiz')}
              className="px-4 py-2 text-xs xl:text-sm font-semibold text-white bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 rounded-xl shadow-md hover:shadow-lg transition-all border border-emerald-500/30 flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>MCQ Course Test</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => onNavigate('quiz')}
              className="px-3 py-1.5 text-xs font-semibold text-white bg-emerald-700 rounded-lg flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3 text-amber-300" />
              <span>MCQ Quiz</span>
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-slate-900 border-b border-slate-800 px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top duration-200">
          {/* Mobile Search */}
          <form onSubmit={handleSearchSubmit} className="relative mb-3">
            <input
              type="text"
              placeholder="Search topics, courses, or scholars..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </form>

          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = currentView === link.view;
              return (
                <button
                  key={link.name}
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onNavigate(link.view);
                  }}
                  className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium ${
                    isActive
                      ? 'bg-blue-900/80 text-green-300 font-semibold border border-blue-700/60'
                      : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-4 h-4 text-green-400" />
                  <span>{link.name}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-3">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onNavigate('dashboard');
              }}
              className="flex-1 py-2 text-xs font-semibold text-center text-slate-200 bg-slate-800 rounded-lg border border-slate-700"
            >
              My Dashboard
            </button>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onNavigate('login');
              }}
              className="flex-1 py-2 text-xs font-semibold text-center text-white bg-green-700 rounded-lg"
            >
              Account / Login
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
