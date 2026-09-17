import React from 'react';
import { CheckCircle2, ShieldCheck } from 'lucide-react';

interface VerifiedBadgeProps {
  text?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export const VerifiedBadge: React.FC<VerifiedBadgeProps> = ({
  text = 'Verified Expert',
  size = 'md',
  showText = true
}) => {
  const iconSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  const textSizes = {
    sm: 'text-xs',
    md: 'text-xs font-medium',
    lg: 'text-sm font-semibold'
  };

  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200/80 shadow-xs">
      <ShieldCheck className={`${iconSizes[size]} text-amber-600 fill-amber-100`} />
      {showText && <span className={`${textSizes[size]} text-amber-900`}>{text}</span>}
    </span>
  );
};
