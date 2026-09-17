import React, { useState } from 'react';
import { Category, PageView } from '../types';
import { 
  BookOpen, Scale, Heart, Coins, ScrollText, Compass, History, Sparkles, 
  GraduationCap, ChevronRight, Search, ArrowLeft 
} from 'lucide-react';

interface CategoriesPageProps {
  categories: Category[];
  onNavigate: (view: PageView, params?: any) => void;
}

export const CategoriesPage: React.FC<CategoriesPageProps> = ({ categories, onNavigate }) => {
  const [filterQuery, setFilterQuery] = useState('');

  const filteredCategories = categories.filter(c =>
    c.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
    c.description.toLowerCase().includes(filterQuery.toLowerCase())
  );

  const getCategoryTheme = (id: string) => {
    switch (id) {
      case 'quran-learning': return { icon: BookOpen, bg: 'bg-emerald-100 text-emerald-600 border-emerald-200' };
      case 'fiqh-masail': return { icon: Scale, bg: 'bg-blue-100 text-blue-600 border-blue-200' };
      case 'family-marriage': return { icon: Heart, bg: 'bg-pink-100 text-pink-600 border-pink-200' };
      case 'islamic-finance': return { icon: Coins, bg: 'bg-amber-100 text-amber-600 border-amber-200' };
      case 'hadith-studies': return { icon: ScrollText, bg: 'bg-purple-100 text-purple-600 border-purple-200' };
      case 'aqeedah-beliefs': return { icon: Compass, bg: 'bg-teal-100 text-teal-600 border-teal-200' };
      case 'seerah-history': return { icon: History, bg: 'bg-amber-100 text-amber-800 border-amber-200' };
      case 'spiritual-guidance': return { icon: Sparkles, bg: 'bg-emerald-100 text-emerald-600 border-emerald-200' };
      case 'children-youth': return { icon: GraduationCap, bg: 'bg-sky-100 text-sky-600 border-sky-200' };
      default: return { icon: BookOpen, bg: 'bg-blue-100 text-blue-600 border-blue-200' };
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-20">
      
      {/* Header Bar */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 space-y-4 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold uppercase tracking-wider border border-amber-400/30">
              Knowledge Ecosystem
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold font-heading text-white">Categories & Topics</h1>
            <p className="text-slate-300 text-xs sm:text-sm max-w-xl">Choose a specialized topic to consult verified experts, scholars, and daily masail specialists.</p>
          </div>
        </div>

        {/* Filter / Search bar */}
        <div className="relative max-w-md pt-2">
          <input
            type="text"
            placeholder="Filter categories (e.g. Fiqh, Finance, Tajweed)..."
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 text-xs sm:text-sm rounded-2xl bg-slate-800/90 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* Category Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map((cat) => {
          const { icon: IconComp, bg } = getCategoryTheme(cat.id);
          return (
            <div
              key={cat.id}
              onClick={() => onNavigate('experts', { category: cat.id })}
              className="p-5 rounded-3xl bg-white border border-slate-200 hover:border-blue-400 shadow-soft-xs hover:shadow-soft-md cursor-pointer transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-4">
                <div className={`p-3.5 rounded-2xl ${bg} border shrink-0 group-hover:scale-105 transition-transform`}>
                  <IconComp className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 group-hover:text-blue-700 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    {cat.description}
                  </p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-blue-600 shrink-0 transition-colors" />
            </div>
          );
        })}
      </div>

      {filteredCategories.length === 0 && (
        <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
          <p className="text-slate-600 font-medium text-sm">No categories matched "{filterQuery}".</p>
          <button
            onClick={() => setFilterQuery('')}
            className="mt-2 text-xs font-bold text-blue-600 underline"
          >
            Clear Search
          </button>
        </div>
      )}
    </div>
  );
};

