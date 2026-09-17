import React, { useState } from 'react';
import { PageView } from '../types';
import { Breadcrumb } from '../components/Breadcrumb';
import { Mail, Phone, MapPin, Send, CheckCircle2, MessageSquare, HelpCircle } from 'lucide-react';

interface ContactPageProps {
  onNavigate: (view: PageView) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-12 pb-20">
      <Breadcrumb items={[{ label: 'Contact Us' }]} onNavigate={onNavigate} />

      {/* Header */}
      <div className="text-center space-y-3">
        <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold uppercase tracking-wider border border-amber-200">
          Support & Queries
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900">
          We Are Here to Assist You
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto">
          Have a question about scholar consultations, LMS course access, or platform verification? Send us a message below.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft-lg space-y-6">
          <h2 className="text-xl font-bold font-heading text-slate-900">Send Us a Message</h2>

          {submitted ? (
            <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-900 text-xs sm:text-sm space-y-2 text-center">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <h3 className="font-bold text-base">JazakAllah Khair! Message Received</h3>
              <p className="text-slate-600">Our support team will respond to your email within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Full Name"
                    className="w-full px-3 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Your Email</label>
                  <input
                    type="email"
                    required
                    placeholder="email@example.com"
                    className="w-full px-3 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Subject</label>
                <select className="w-full px-3 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 focus:outline-none">
                  <option>General Support Inquiry</option>
                  <option>Scholar Consultation Question</option>
                  <option>Course Enrollment Assistance</option>
                  <option>Scholar Application / Onboarding</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Message</label>
                <textarea
                  rows={4}
                  required
                  placeholder="How can we help you?"
                  className="w-full p-3 text-xs sm:text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 text-xs sm:text-sm font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
              >
                <span>Send Message</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>

        {/* Right Info Box */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-900 text-white rounded-3xl p-6 border border-slate-800 space-y-5">
            <h3 className="text-lg font-bold font-heading text-white">Platform Information</h3>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-400 block">Support Email:</span>
                  <span className="font-semibold text-white">support [at] steadfastdeen.com</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MessageSquare className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-400 block">Live Chat Support:</span>
                  <span className="font-semibold text-white">Available Mon - Sat (9 AM - 9 PM)</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <HelpCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-400 block">Scholar Onboarding:</span>
                  <span className="font-semibold text-white">scholars [at] steadfastdeen.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
