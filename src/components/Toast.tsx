import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

interface ToastProps {
  toast: ToastMessage | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ toast, onClose }) => {
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toast, onClose]);

  if (!toast) return null;

  const bgMap = {
    success: 'bg-emerald-900 border-emerald-700 text-emerald-100',
    error: 'bg-rose-900 border-rose-700 text-rose-100',
    info: 'bg-blue-900 border-blue-700 text-blue-100'
  };

  const Icon = toast.type === 'success' ? CheckCircle2 : toast.type === 'error' ? AlertCircle : Info;

  return (
    <div className="fixed top-20 right-4 z-50 animate-in slide-in-from-right duration-300">
      <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border shadow-xl max-w-sm ${bgMap[toast.type]}`}>
        <Icon className="w-5 h-5 shrink-0" />
        <span className="text-xs sm:text-sm font-medium">{toast.message}</span>
        <button onClick={onClose} className="p-1 rounded-md opacity-80 hover:opacity-100">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
