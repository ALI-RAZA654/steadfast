import React, { useState } from 'react';
import { Expert, ConsultationType, PageView } from '../types';
import { Breadcrumb } from '../components/Breadcrumb';
import { VerifiedBadge } from '../components/VerifiedBadge';
import { 
  Calendar, 
  Clock, 
  MessageSquare, 
  Phone, 
  Video, 
  User, 
  Mail, 
  FileText, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft,
  ShieldCheck
} from 'lucide-react';

interface BookingPageProps {
  experts: Expert[];
  initialExpertId?: string;
  initialMethod?: ConsultationType;
  onNavigate: (view: PageView, params?: any) => void;
  onConfirmBookingDetails: (bookingData: any) => void;
}

export const BookingPage: React.FC<BookingPageProps> = ({
  experts,
  initialExpertId,
  initialMethod = 'voice',
  onNavigate,
  onConfirmBookingDetails
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedExpertId, setSelectedExpertId] = useState(initialExpertId || experts[0].id);
  const [consultationType, setConsultationType] = useState<ConsultationType>(initialMethod);
  const [selectedDate, setSelectedDate] = useState('Sep 20, 2026');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('02:00 PM');
  
  const [userFullName, setUserFullName] = useState('Tariq Al-Mansoor');
  const [userEmail, setUserEmail] = useState('tariq.student@example.com');
  const [userPhone, setUserPhone] = useState('+1 (555) 382-9102');
  const [userQuestion, setUserQuestion] = useState(
    'Assalamu Alaikum. I need Shariah guidance regarding my business partnership agreement and zakat on asset valuation.'
  );

  const selectedExpert = experts.find(e => e.id === selectedExpertId) || experts[0];

  const availableDates = [
    { label: 'Today', date: 'Sep 16, 2026' },
    { label: 'Tomorrow', date: 'Sep 17, 2026' },
    { label: 'Fri, Sep 18', date: 'Sep 18, 2026' },
    { label: 'Sat, Sep 19', date: 'Sep 19, 2026' },
    { label: 'Sun, Sep 20', date: 'Sep 20, 2026' }
  ];

  const timeSlots = [
    '09:00 AM',
    '11:30 AM',
    '02:00 PM',
    '04:30 PM',
    '07:00 PM',
    '08:30 PM'
  ];

  const handleNextStep = () => {
    if (currentStep < 6) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Package booking data and go to Checkout
      const bookingPayload = {
        expert: selectedExpert,
        consultationType,
        date: selectedDate,
        timeSlot: selectedTimeSlot,
        durationMins: 30,
        totalAmount: selectedExpert.flatSessionPrice,
        userName: userFullName,
        userEmail,
        userPhone,
        question: userQuestion
      };
      onConfirmBookingDetails(bookingPayload);
      onNavigate('checkout');
    }
  };

  const stepsList = [
    '1. Expert',
    '2. Type',
    '3. Date',
    '4. Time',
    '5. Details',
    '6. Review'
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8 pb-20">
      <Breadcrumb
        items={[
          { label: 'Experts', view: 'experts' },
          { label: 'Book Consultation' }
        ]}
        onNavigate={onNavigate}
      />

      {/* Booking Header */}
      <div className="text-center space-y-2">
        <span className="px-3 py-1 rounded-full bg-green-100 text-green-900 text-xs font-semibold tracking-wider uppercase border border-green-200">
          Step-by-Step Scheduling
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold font-heading text-slate-900">
          Book 1-on-1 Scholar Consultation
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          All consultations are encrypted, 100% private, and Shariah-audited.
        </p>
      </div>

      {/* Step Indicator Bar */}
      <div className="bg-white rounded-2xl p-3 border border-slate-200 shadow-xs flex items-center justify-between overflow-x-auto gap-2">
        {stepsList.map((st, idx) => {
          const stepNum = idx + 1;
          const isActive = currentStep === stepNum;
          const isDone = currentStep > stepNum;

          return (
            <button
              key={st}
              onClick={() => stepNum <= currentStep && setCurrentStep(stepNum)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-all ${
                isActive
                  ? 'bg-slate-900 text-green-400 font-bold shadow-xs'
                  : isDone
                  ? 'bg-emerald-100 text-emerald-900 font-medium'
                  : 'bg-slate-50 text-slate-400'
              }`}
            >
              {isDone ? `✓ ${st.split('.')[1]}` : st}
            </button>
          );
        })}
      </div>

      {/* Main Step Container */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft-lg space-y-6">
        
        {/* Step 1: Select Expert */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold font-heading text-slate-900">Select Scholar / Expert</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {experts.map((exp) => {
                const isSelected = exp.id === selectedExpertId;
                return (
                  <div
                    key={exp.id}
                    onClick={() => setSelectedExpertId(exp.id)}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center gap-4 ${
                      isSelected
                        ? 'border-green-600 bg-green-50/50 shadow-md'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <img
                      src={exp.avatar}
                      alt={exp.name}
                      className="w-14 h-14 rounded-xl object-cover border border-slate-200 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1">
                        <h4 className="text-sm font-bold text-slate-900 truncate">{exp.name}</h4>
                        <VerifiedBadge size="sm" showText={false} />
                      </div>
                      <p className="text-xs text-green-800 font-medium truncate">{exp.specialization}</p>
                      <p className="text-xs font-bold text-slate-800 mt-1">₹{exp.flatSessionPrice} / 30 mins</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 2: Select Consultation Type */}
        {currentStep === 2 && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold font-heading text-slate-900">Select Consultation Format</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { type: 'chat', label: 'Private Chat', icon: MessageSquare, desc: 'Real-time text & document sharing' },
                { type: 'voice', label: 'Voice Call', icon: Phone, desc: 'Browser phone audio discussion' }
              ].map((item) => {
                const Icon = item.icon;
                const isSelected = consultationType === item.type;

                return (
                  <div
                    key={item.type}
                    onClick={() => setConsultationType(item.type as ConsultationType)}
                    className={`p-5 rounded-2xl border-2 cursor-pointer transition-all space-y-3 ${
                      isSelected
                        ? 'border-blue-900 bg-blue-950 text-white shadow-md'
                        : 'border-slate-200 bg-white text-slate-800 hover:border-slate-300'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isSelected ? 'bg-green-700 text-white' : 'bg-slate-100 text-blue-700'}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="text-sm font-bold">{item.label}</h4>
                    <p className={`text-xs ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 3: Select Date */}
        {currentStep === 3 && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold font-heading text-slate-900">Select Available Date</h3>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {availableDates.map((d) => {
                const isSelected = selectedDate === d.date;
                return (
                  <button
                    key={d.date}
                    onClick={() => setSelectedDate(d.date)}
                    className={`p-3.5 rounded-2xl border text-center transition-all ${
                      isSelected
                        ? 'bg-slate-900 text-green-400 border-slate-900 font-bold shadow-md'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <div className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">{d.label}</div>
                    <div className="text-xs sm:text-sm font-bold mt-1">{d.date}</div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 4: Select Time Slot */}
        {currentStep === 4 && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold font-heading text-slate-900">Select Time Slot ({selectedDate})</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {timeSlots.map((slot) => {
                const isSelected = selectedTimeSlot === slot;
                return (
                  <button
                    key={slot}
                    onClick={() => setSelectedTimeSlot(slot)}
                    className={`p-3.5 rounded-2xl border text-center font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 ${
                      isSelected
                        ? 'bg-green-700 text-white border-green-700 font-bold shadow-md'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <Clock className="w-4 h-4" />
                    <span>{slot}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 5: User Details */}
        {currentStep === 5 && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold font-heading text-slate-900">Your Details & Consultation Topic</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 mb-1 block">Full Name</label>
                <div className="relative">
                  <input
                    type="text"
                    value={userFullName}
                    onChange={(e) => setUserFullName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-green-500 focus:outline-none"
                  />
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 mb-1 block">Email Address</label>
                <div className="relative">
                  <input
                    type="email"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-green-500 focus:outline-none"
                  />
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 mb-1 block">Phone Number (Optional)</label>
              <input
                type="text"
                value={userPhone}
                onChange={(e) => setUserPhone(e.target.value)}
                className="w-full px-3 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-green-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 mb-1 block">Your Question or Consultation Topic</label>
              <textarea
                rows={3}
                value={userQuestion}
                onChange={(e) => setUserQuestion(e.target.value)}
                placeholder="Briefly describe your topic or legal question so the scholar can prepare..."
                className="w-full p-3 text-xs sm:text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-green-500 focus:outline-none"
              />
            </div>
          </div>
        )}

        {/* Step 6: Review Booking */}
        {currentStep === 6 && (
          <div className="space-y-6">
            <h3 className="text-lg font-bold font-heading text-slate-900">Review Booking Details</h3>
            
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4 text-xs sm:text-sm">
              <div className="flex items-center gap-4 pb-4 border-b border-slate-200">
                <img
                  src={selectedExpert.avatar}
                  alt={selectedExpert.name}
                  className="w-12 h-12 rounded-xl object-cover border"
                />
                <div>
                  <h4 className="font-bold text-slate-900 text-base">{selectedExpert.name}</h4>
                  <p className="text-green-800 text-xs font-medium">{selectedExpert.title}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-slate-400 text-xs block">Format:</span>
                  <span className="font-semibold capitalize text-slate-800">{consultationType} Call</span>
                </div>
                <div>
                  <span className="text-slate-400 text-xs block">Date & Time:</span>
                  <span className="font-semibold text-slate-800">{selectedDate} at {selectedTimeSlot}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-xs block">Duration:</span>
                  <span className="font-semibold text-slate-800">30 Minutes</span>
                </div>
                <div>
                  <span className="text-slate-400 text-xs block">Total Price:</span>
                  <span className="font-bold text-green-700 text-base font-heading">₹{selectedExpert.flatSessionPrice}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200">
                <span className="text-slate-400 text-xs block">Topic / Note:</span>
                <p className="text-slate-700 italic mt-0.5">{userQuestion}</p>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Step Navigation Controls */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          {currentStep > 1 ? (
            <button
              onClick={() => setCurrentStep(prev => prev - 1)}
              className="px-5 py-2.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>
          ) : <div />}

          <button
            onClick={handleNextStep}
            className="px-7 py-3 text-xs sm:text-sm font-bold text-white bg-green-700 hover:bg-green-600 rounded-xl shadow-md transition-colors flex items-center gap-2"
          >
            <span>{currentStep === 6 ? 'Continue to Payment' : 'Next Step'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
