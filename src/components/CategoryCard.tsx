import React from 'react';
import { Category, PageView } from '../types';
import { 
  BookOpen, 
  Scale, 
  HeartHandshake, 
  Coins, 
  ScrollText, 
  Compass, 
  History, 
  Sparkles, 
  GraduationCap, 
  ArrowRight 
} from 'lucide-react';

interface CategoryCardProps {
  category: Category;
  onSelect: (categoryId: string) => void;
}

const iconMap: Record<string, any> = {
  BookOpen,
  Scale,
  HeartHandshake,
  Coins,
  ScrollText,
  Compass,
  History,
  Sparkles,
  GraduationCap
};

export const CategoryCard: React.FC<CategoryCardProps> = ({ category, onSelect }) => {
  const IconComponent = iconMap[category.iconName] || BookOpen;

  return (
    <div
      onClick={() => onSelect(category.id)}
      className="group bg-white rounded-2xl p-6 border border-slate-200/80 shadow-soft-sm hover:shadow-soft-lg hover:border-blue-300 transition-all cursor-pointer flex flex-col justify-between relative overflow-hidden transform hover:-translate-y-1"
    >
      {/* Subtle background color glow on hover */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-50 to-amber-50 rounded-full blur-2xl -mr-10 -mt-10 group-hover:scale-150 transition-transform pointer-events-none" />

      <div>
        {/* Icon & Count Badge */}
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 rounded-xl bg-slate-900 text-amber-400 flex items-center justify-center shadow-md group-hover:bg-blue-900 group-hover:text-amber-300 transition-colors">
            <IconComponent className="w-6 h-6" />
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 group-hover:bg-blue-50 group-hover:text-blue-700 transition-colors border border-slate-200/50">
            {category.expertCount} Experts
          </span>
        </div>

        {/* Name */}
        <h3 className="text-lg font-bold font-heading text-slate-900 group-hover:text-blue-800 transition-colors">
          {category.name}
        </h3>

        {/* Description */}
        <p className="mt-2 text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
          {category.description}
        </p>
      </div>

      {/* Footer link */}
      <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-blue-800">
        <span>{category.courseCount} Courses available</span>
        <div className="w-7 h-7 rounded-full bg-slate-100 group-hover:bg-amber-400 group-hover:text-slate-950 flex items-center justify-center transition-all">
          <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>
    </div>
  );
};
