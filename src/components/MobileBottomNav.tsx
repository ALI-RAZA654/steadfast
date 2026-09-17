import React from 'react';
import { PageView } from '../types';
import { Home, Users, MessageSquare, BookOpen, LayoutDashboard } from 'lucide-react';

interface MobileBottomNavProps {
  currentView: PageView;
  onNavigate: (view: PageView) => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ currentView, onNavigate }) => {
  const tabs: { name: string; view: PageView; icon: any }[] = [
    { name: 'Home', view: 'home', icon: Home },
    { name: 'Experts', view: 'experts', icon: Users },
    { name: 'Sessions', view: 'chat', icon: MessageSquare },
    { name: 'Learning', view: 'courses', icon: BookOpen },
    { name: 'Dashboard', view: 'dashboard', icon: LayoutDashboard },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-lg border-t border-slate-800 text-slate-400 px-2 py-1.5 shadow-2xl">
      <div className="flex items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentView === tab.view || (tab.view === 'chat' && currentView === 'chat');
          
          return (
            <button
              key={tab.name}
              onClick={() => onNavigate(tab.view)}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all ${
                isActive
                  ? 'text-amber-400 font-semibold bg-blue-950/60 border border-blue-800/40'
                  : 'hover:text-slate-200'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-amber-400 animate-pulse' : 'text-slate-400'}`} />
              <span className="text-[10px] mt-0.5 tracking-tight">{tab.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
