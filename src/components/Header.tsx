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
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-lg border-b border-slate-800/80 text-white transition-all shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer group shrink-0" onClick={() => onNavigate('home')}>
            <img 
              src="/logo.png" 
              alt="Steadfast Deen" 
              className="h-10 sm:h-12 w-auto object-contain bg-white/95 p-1 rounded-xl shadow-md border border-green-700/40 group-hover:scale-105 transition-transform"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/images/file_00000000ede8821195d4d82712923da5.png';
              }}
            />
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-extrabold font-heading tracking-tight text-white flex items-center gap-1">
                Steadfast <span className="text-green-400">Deen</span>
              </span>
              <span className="text-[10px] text-slate-400 tracking-wider uppercase font-medium">Islamic Knowledge & Guidance</span>
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
                  className={`px-3.5 py-1.5 rounded-full text-xs xl:text-sm transition-all font-semibold flex items-center gap-1.5 ${
                    isActive
                      ? 'text-emerald-400 bg-emerald-500/15 font-extrabold border border-emerald-500/30'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  {link.name}
                </button>
              );
            })}
          </nav>

          {/* Right Action Items */}
          <div className="hidden md:flex items-center gap-2.5">
            {/* Quick Search */}
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Search topic or scholar..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-36 lg:w-40 xl:w-52 h-9 pl-8 pr-3 text-xs rounded-full bg-slate-900 border border-slate-700/80 text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 transition-all"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </form>

            {/* Auth / Dashboard buttons */}
            {isLoggedIn ? (
              <button
                onClick={() => onNavigate('dashboard')}
                className={`h-9 px-3.5 rounded-full text-xs font-extrabold flex items-center gap-1.5 border transition-all whitespace-nowrap ${
                  isAdmin
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white border-emerald-500/40 shadow-sm'
                    : 'bg-slate-800/90 hover:bg-slate-700 text-slate-200 border-slate-700'
                }`}
              >
                <LayoutDashboard className="w-3.5 h-3.5 text-emerald-400" />
                <span>{isAdmin ? '👑 Admin Panel' : 'Dashboard'}</span>
              </button>
            ) : (
              <button
                onClick={() => onNavigate('login')}
                className="h-9 px-3.5 text-xs font-bold text-slate-200 hover:text-white bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700/80 rounded-full transition-all flex items-center gap-1.5 whitespace-nowrap"
              >
                <span>🔑 Admin / Login</span>
              </button>
            )}

            {/* MCQ Quiz CTA Button */}
            <button
              onClick={() => onNavigate('quiz')}
              className="h-9 px-4 text-xs font-extrabold text-white bg-gradient-to-r from-emerald-600 via-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 rounded-full shadow-md hover:shadow-emerald-500/20 transition-all border border-emerald-400/30 flex items-center gap-1.5 whitespace-nowrap shrink-0"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>MCQ Course Test</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
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
