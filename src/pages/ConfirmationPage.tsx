import React from 'react';
import { PageView } from '../types';
import { CheckCircle2, Calendar, MessageSquare, LayoutDashboard, Home, ArrowRight, ShieldCheck } from 'lucide-react';

interface ConfirmationPageProps {
  bookingRecord: any;
  onNavigate: (view: PageView, params?: any) => void;
}

export const ConfirmationPage: React.FC<ConfirmationPageProps> = ({
  bookingRecord,
  onNavigate
}) => {
  const b = bookingRecord || {
    id: 'SD-881920',
    expertName: 'Mufti Ahmed Khan',
    expertTitle: 'Mufti & Islamic Finance Consultant',
    consultationType: 'video',
    date: 'Sep 20, 2026',
    timeSlot: '02:00 PM',
    totalAmount: 45
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-24 text-center space-y-8">
      
      {/* Success Badge Icon */}
      <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-lg border-4 border-emerald-50 animate-in zoom-in duration-300">
        <CheckCircle2 className="w-10 h-10" />
      </div>

      <div className="space-y-2">
        <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider border border-emerald-200">
          Booking Confirmed
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900">
          Your Consultation is Reserved!
        </h1>
        <p className="text-slate-600 text-sm max-w-md mx-auto">
          A confirmation email and session link have been sent to your registered email address.
        </p>
      </div>

      {/* Confirmation Details Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft-lg text-left space-y-6 max-w-xl mx-auto">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <span className="text-xs text-slate-400 font-semibold block">Booking Reference ID</span>
            <span className="text-base font-bold font-mono text-slate-900">{b.id}</span>
          </div>
          <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold">
            Paid & Verified
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 text-xs sm:text-sm">
          <div>
            <span className="text-slate-400 block text-xs">Assigned Scholar:</span>
            <span className="font-bold text-slate-900">{b.expertName}</span>
          </div>

          <div>
            <span className="text-slate-400 block text-xs">Consultation Format:</span>
            <span className="font-semibold capitalize text-amber-700">{b.consultationType} Session</span>
          </div>

          <div>
            <span className="text-slate-400 block text-xs">Scheduled Date:</span>
            <span className="font-semibold text-slate-800">{b.date}</span>
          </div>

          <div>
            <span className="text-slate-400 block text-xs">Scheduled Time:</span>
            <span className="font-semibold text-slate-800">{b.timeSlot}</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs text-slate-600 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
          <span>You can launch your private session room directly from your Student Dashboard anytime.</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xl mx-auto pt-2">
        <button
          onClick={() => onNavigate('chat')}
          className="w-full sm:w-auto px-6 py-3.5 text-xs sm:text-sm font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
        >
          <MessageSquare className="w-4 h-4" />
          <span>Open Live Chat Session</span>
        </button>

        <button
          onClick={() => onNavigate('dashboard')}
          className="w-full sm:w-auto px-6 py-3.5 text-xs sm:text-sm font-semibold text-slate-200 bg-slate-900 hover:bg-slate-800 rounded-xl transition-colors flex items-center justify-center gap-2"
        >
          <LayoutDashboard className="w-4 h-4 text-amber-400" />
          <span>Go to Dashboard</span>
        </button>
      </div>
    </div>
  );
};
