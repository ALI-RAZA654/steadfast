import React from 'react';
import { PageView } from '../types';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  view?: PageView;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  onNavigate: (view: PageView) => void;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, onNavigate }) => {
  return (
    <nav className="flex items-center gap-1.5 text-xs text-slate-500 py-3 overflow-x-auto">
      <button
        onClick={() => onNavigate('home')}
        className="flex items-center gap-1 hover:text-blue-700 transition-colors shrink-0"
      >
        <Home className="w-3.5 h-3.5" />
        <span>Home</span>
      </button>

      {items.map((item, idx) => (
        <React.Fragment key={idx}>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          {item.view ? (
            <button
              onClick={() => onNavigate(item.view!)}
              className="hover:text-blue-700 transition-colors font-medium shrink-0"
            >
              {item.label}
            </button>
          ) : (
            <span className="text-slate-900 font-semibold truncate shrink-0">
              {item.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};
