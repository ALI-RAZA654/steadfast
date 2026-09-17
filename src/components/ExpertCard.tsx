import React from 'react';
import { Expert } from '../types';
import { VerifiedBadge } from './VerifiedBadge';
import { Rating } from './Rating';
import { Phone, MessageSquare, Video, UserCheck, Clock, Languages, ChevronRight } from 'lucide-react';

interface ExpertCardProps {
  expert: Expert;
  onViewProfile: (expertId: string) => void;
  onBookConsultation: (expertId: string, method: 'chat' | 'voice' | 'video') => void;
  compact?: boolean;
}

export const ExpertCard: React.FC<ExpertCardProps> = ({
  expert,
  onViewProfile,
  onBookConsultation,
  compact = false
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-soft-sm hover:shadow-soft-lg transition-all duration-300 overflow-hidden flex flex-col justify-between group">
      
      {/* Top Banner / Online Status */}
      <div className="relative p-5 pb-0">
        <div className="flex items-start justify-between gap-4">
          
          {/* Avatar with Status indicator */}
          <div className="relative cursor-pointer" onClick={() => onViewProfile(expert.id)}>
            <img
              src={expert.avatar}
              alt={expert.name}
              className="w-20 h-20 sm:w-22 sm:h-22 rounded-2xl object-cover border-2 border-slate-100 shadow-md group-hover:scale-105 transition-transform"
            />
            <span
              className={`absolute bottom-1 right-1 w-4 h-4 rounded-full border-2 border-white ${
                expert.isOnline ? 'bg-emerald-500 shadow-sm' : 'bg-slate-300'
              }`}
              title={expert.isOnline ? 'Available Online Now' : 'Offline'}
            />
          </div>

          {/* Pricing & Rating */}
          <div className="flex flex-col items-end">
            <VerifiedBadge size="sm" showText={true} />
            <div className="mt-2 text-right">
              <span className="text-lg font-bold font-heading text-slate-900">
                ${expert.ratePerMin}
              </span>
              <span className="text-xs text-slate-500 font-normal"> / min</span>
            </div>
            <div className="mt-1">
              <Rating rating={expert.rating} reviewCount={expert.reviewCount} size="sm" />
            </div>
          </div>
        </div>

        {/* Name and Title */}
        <div className="mt-4">
          <h3
            onClick={() => onViewProfile(expert.id)}
            className="text-lg font-bold font-heading text-slate-900 group-hover:text-blue-700 transition-colors cursor-pointer flex items-center gap-1.5"
          >
            {expert.name}
          </h3>
          <p className="text-xs font-medium text-amber-700 mt-0.5">
            {expert.title}
          </p>
          <p className="text-xs text-slate-600 mt-1 line-clamp-1">
            <span className="font-semibold text-slate-700">Specialization:</span> {expert.specialization}
          </p>
        </div>

        {/* Experience & Languages Pill Row */}
        <div className="mt-3.5 flex flex-wrap items-center gap-2 text-xs text-slate-600">
          <span className="inline-flex items-center gap-1 bg-slate-100 px-2.5 py-1 rounded-md text-slate-700 font-medium">
            <Clock className="w-3.5 h-3.5 text-slate-500" />
            {expert.experienceYears}+ Yrs Exp
          </span>
          <span className="inline-flex items-center gap-1 bg-slate-100 px-2.5 py-1 rounded-md text-slate-700 font-medium">
            <Languages className="w-3.5 h-3.5 text-slate-500" />
            {expert.languages.slice(0, 2).join(', ')}
            {expert.languages.length > 2 && ` +${expert.languages.length - 2}`}
          </span>
        </div>

        {/* Short Bio */}
        {!compact && (
          <p className="mt-3 text-xs text-slate-600 line-clamp-2 leading-relaxed">
            {expert.bio}
          </p>
        )}
      </div>

      {/* Action Buttons */}
      <div className="p-4 pt-3 border-t border-slate-100 bg-slate-50/50 space-y-2">
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => onBookConsultation(expert.id, 'voice')}
            className="py-2 px-2 text-xs font-bold rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-all flex items-center justify-center gap-1 shadow-sm"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Call</span>
          </button>

          <button
            onClick={() => onBookConsultation(expert.id, 'chat')}
            className="py-2 px-2 text-xs font-bold rounded-xl border border-blue-600 text-blue-600 hover:bg-blue-50 transition-all flex items-center justify-center gap-1"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Chat</span>
          </button>
          
          <button
            onClick={() => onBookConsultation(expert.id, 'video')}
            className="py-2 px-2 text-xs font-bold rounded-xl border border-blue-600 text-blue-600 hover:bg-blue-50 transition-all flex items-center justify-center gap-1"
          >
            <Video className="w-3.5 h-3.5" />
            <span>Video</span>
          </button>
        </div>

        <button
          onClick={() => onViewProfile(expert.id)}
          className="w-full py-2 px-4 text-xs font-bold rounded-xl text-slate-800 bg-slate-200/80 hover:bg-slate-300 transition-all flex items-center justify-center gap-1"
        >
          <span>View Profile</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
