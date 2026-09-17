import React from 'react';

interface SectionHeaderProps {
  badge?: string;
  title: string;
  subtitle?: string;
  actionText?: string;
  onActionClick?: () => void;
  align?: 'left' | 'center';
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  badge,
  title,
  subtitle,
  actionText,
  onActionClick,
  align = 'left'
}) => {
  return (
    <div className={`flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4 ${align === 'center' ? 'text-center items-center sm:items-center' : ''}`}>
      <div className={`${align === 'center' ? 'max-w-2xl mx-auto' : 'max-w-xl'}`}>
        {badge && (
          <span className="inline-block px-3 py-1 mb-2.5 text-xs font-semibold tracking-wider text-blue-900 uppercase bg-blue-50 border border-blue-200/60 rounded-full">
            {badge}
          </span>
        )}
        <h2 className="text-2xl sm:text-3xl font-bold font-heading text-slate-900 tracking-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>

      {actionText && onActionClick && (
        <button
          onClick={onActionClick}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-700 hover:text-blue-800 transition-colors group self-start sm:self-auto shrink-0"
        >
          <span>{actionText}</span>
          <span className="transform transition-transform group-hover:translate-x-1">→</span>
        </button>
      )}
    </div>
  );
};
