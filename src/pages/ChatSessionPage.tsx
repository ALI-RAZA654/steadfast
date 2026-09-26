import React, { useState } from 'react';
import { Expert, ChatMessage, PageView } from '../types';
import { VerifiedBadge } from '../components/VerifiedBadge';
import { Breadcrumb } from '../components/Breadcrumb';
import { 
  Phone, 
  Video, 
  Send, 
  Paperclip, 
  Smile, 
  ShieldCheck, 
  FileText, 
  MoreVertical, 
  CheckCheck, 
  Search,
  ArrowLeft,
  Info
} from 'lucide-react';

interface ChatSessionPageProps {
  expert: Expert;
  initialMessages: ChatMessage[];
  onNavigate: (view: PageView, params?: any) => void;
  onLaunchCallModal?: (type: 'voice' | 'video') => void;
}

export const ChatSessionPage: React.FC<ChatSessionPageProps> = ({
  expert,
  initialMessages,
  onNavigate,
  onLaunchCallModal
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [inputText, setInputText] = useState('');
  const [showCallNotice, setShowCallNotice] = useState<string | null>(null);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      senderId: 'usr-101',
      senderName: 'Tariq Al-Mansoor',
      senderAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200',
      text: inputText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true
    };

    setMessages((prev) => [...prev, userMsg]);
    const currentInput = inputText;
    setInputText('');

    // Simulate realistic scholar response after 1.5s
    setTimeout(() => {
      const scholarReply: ChatMessage = {
        id: `msg-reply-${Date.now()}`,
        senderId: expert.id,
        senderName: expert.name,
        senderAvatar: expert.avatar,
        text: `JazakAllah Khair for your question brother Tariq. Regarding "${currentInput.substring(0, 30)}...", classical scholars hold that intention and legal ownership are key. Let me elaborate...`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isMe: false
      };
      setMessages((prev) => [...prev, scholarReply]);
    }, 1500);
  };

  const triggerCall = (type: 'voice' | 'video') => {
    if (onLaunchCallModal) {
      onLaunchCallModal(type);
    } else {
      setShowCallNotice(`Simulating direct encrypted ${type.toUpperCase()} call room with ${expert.name}...`);
      setTimeout(() => setShowCallNotice(null), 4000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-4 space-y-4 pb-16">
      <Breadcrumb
        items={[
          { label: 'Consultations', view: 'dashboard' },
          { label: `Chat with ${expert.name}` }
        ]}
        onNavigate={onNavigate}
      />

      {/* Call simulation toast notice */}
      {showCallNotice && (
        <div className="p-3 bg-slate-900 text-amber-300 border border-amber-400/40 rounded-2xl text-xs font-semibold flex items-center justify-between shadow-lg animate-in slide-in-from-top">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>{showCallNotice}</span>
          </div>
          <button onClick={() => setShowCallNotice(null)} className="text-slate-400">✕</button>
        </div>
      )}

      {/* Main Chat Interface Container */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-soft-lg overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[620px]">
        
        {/* Left Sidebar: Active Consultations */}
        <div className="lg:col-span-4 border-r border-slate-200 bg-slate-50 flex flex-col justify-between hidden md:flex">
          
          {/* Header */}
          <div className="p-4 border-b border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold font-heading text-slate-900">Active Consultations</h2>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">Live Session</span>
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Search conversations..."
                className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl bg-white border border-slate-200 text-slate-800"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {/* Chat List */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            <div className="p-3 rounded-2xl bg-white border border-amber-300 shadow-xs flex items-center gap-3 cursor-pointer">
              <div className="relative">
                <img
                  src={expert.avatar}
                  alt={expert.name}
                  className="w-11 h-11 rounded-xl object-cover border"
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-900 truncate">{expert.name}</h4>
                  <span className="text-[10px] text-slate-400">10:11 AM</span>
                </div>
                <p className="text-[11px] text-amber-800 font-medium truncate">{expert.title}</p>
                <p className="text-[11px] text-slate-500 truncate mt-0.5">Unvested RSUs are not in full ownership...</p>
              </div>
            </div>
          </div>

          {/* Privacy Footnote */}
          <div className="p-3 bg-slate-100 border-t border-slate-200 text-[11px] text-slate-600 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>256-bit encrypted Shariah consultation room</span>
          </div>

        </div>

        {/* Right Main Chat Panel */}
        <div className="lg:col-span-8 flex flex-col justify-between bg-slate-50/30">
          
          {/* Top Chat Header */}
          <div className="p-4 bg-white border-b border-slate-200 flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-3">
              <button onClick={() => onNavigate('dashboard')} className="md:hidden p-1 text-slate-500">
                <ArrowLeft className="w-5 h-5" />
              </button>

              <div className="relative">
                <img
                  src={expert.avatar}
                  alt={expert.name}
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl object-cover border"
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white" />
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-bold text-slate-900">{expert.name}</h3>
                  <VerifiedBadge size="sm" showText={false} />
                </div>
                <div className="flex items-center gap-2 text-[11px] text-slate-500">
                  <span className="text-emerald-700 font-semibold">● Online</span>
                  <span>• {expert.specialization}</span>
                </div>
              </div>
            </div>

            {/* Header Call Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => triggerCall('voice')}
                className="p-2.5 rounded-xl bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 transition-colors border border-slate-200"
                title="Start Encrypted Voice Call"
              >
                <Phone className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Privacy Banner matching Screen 5 */}
          <div className="bg-amber-50 border-b border-amber-200 text-amber-900 px-4 py-2.5 text-center text-xs flex items-center justify-center gap-2 font-medium">
            <span className="text-amber-600 font-bold">🔒</span>
            <span>This conversation is private and secure. Your data is protected.</span>
          </div>

          {/* Chat Messages Body */}
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 max-h-[480px]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-lg ${msg.isMe ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
              >
                {!msg.isMe && (
                  <img
                    src={msg.senderAvatar}
                    alt={msg.senderName}
                    className="w-8 h-8 rounded-full object-cover shrink-0 border"
                  />
                )}

                <div className="space-y-1">
                  <div
                    className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-xs ${
                      msg.isMe
                        ? 'bg-slate-900 text-white rounded-tr-none'
                        : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none'
                    }`}
                  >
                    <p>{msg.text}</p>

                    {/* Attachments rendering */}
                    {msg.attachments && (
                      <div className="mt-2.5 pt-2 border-t border-slate-200/40 space-y-1.5">
                        {msg.attachments.map((att, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-2 p-2 rounded-lg bg-slate-800 text-amber-300 text-xs border border-slate-700"
                          >
                            <FileText className="w-4 h-4 text-amber-400 shrink-0" />
                            <span className="truncate flex-1 font-medium">{att.name}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className={`flex items-center gap-1 text-[10px] text-slate-400 ${msg.isMe ? 'justify-end' : 'justify-start'}`}>
                    <span>{msg.timestamp}</span>
                    {msg.isMe && <CheckCheck className="w-3 h-3 text-blue-500" />}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Message Input Form */}
          <form onSubmit={handleSendMessage} className="p-3 sm:p-4 bg-white border-t border-slate-200 flex items-center gap-2">
            <button
              type="button"
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              title="Attach Document or PDF"
            >
              <Paperclip className="w-5 h-5" />
            </button>

            <input
              type="text"
              placeholder="Type your question or message..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 px-4 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all"
            />

            <button
              type="button"
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors hidden sm:block"
            >
              <Smile className="w-5 h-5" />
            </button>

            <button
              type="submit"
              disabled={!inputText.trim()}
              className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 disabled:opacity-50 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-colors flex items-center gap-1.5 shrink-0"
            >
              <span>Send</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

        </div>

      </div>
    </div>
  );
};
