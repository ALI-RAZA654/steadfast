import React, { useState } from 'react';
import { PageView, Coupon } from '../types';
import { Breadcrumb } from '../components/Breadcrumb';
import { initialCoupons } from '../data/mockAnalyticsAndCoupons';
import { 
  CreditCard, 
  ShieldCheck, 
  Lock, 
  CheckCircle2, 
  ArrowRight, 
  Smartphone, 
  DollarSign,
  Tag,
  Check,
  Sparkles
} from 'lucide-react';

interface CheckoutPageProps {
  bookingData: any;
  coupons?: Coupon[];
  onNavigate: (view: PageView, params?: any) => void;
  onCompleteBooking: (finalBooking: any) => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({
  bookingData,
  coupons = [],
  onNavigate,
  onCompleteBooking
}) => {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal' | 'upi'>('card');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('888');

  // Coupon state
  const availableCoupons = coupons.length > 0 ? coupons : initialCoupons;
  const [inputCouponCode, setInputCouponCode] = useState('DEEN20');
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(availableCoupons[0] || null);
  const [couponError, setCouponError] = useState<string | null>(null);

  // Fallback if no booking state
  const expert = bookingData?.expert || {
    name: 'Mufti Ahmed Khan',
    title: 'Mufti & Islamic Finance Consultant',
    flatSessionPrice: 45
  };
  const date = bookingData?.date || 'Sep 20, 2026';
  const timeSlot = bookingData?.timeSlot || '02:00 PM';
  const consultationType = bookingData?.consultationType || 'voice';

  const originalPrice = expert.flatSessionPrice || 45;
  const discountAmount = appliedCoupon ? Math.round((originalPrice * appliedCoupon.discountPercent) / 100) : 0;
  const totalAmount = Math.max(0, originalPrice - discountAmount);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError(null);
    const codeClean = inputCouponCode.trim().toUpperCase();
    const found = availableCoupons.find(c => c.code.toUpperCase() === codeClean && c.isActive);
    if (found) {
      setAppliedCoupon(found);
    } else {
      setAppliedCoupon(null);
      setCouponError('Invalid or expired coupon code. Try "DEEN20" or "SPECIAL50"');
    }
  };

  const handlePayAndConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    const completedRecord = {
      id: `SD-${Math.floor(100000 + Math.random() * 900000)}`,
      expertName: expert.name,
      expertTitle: expert.title,
      expertAvatar: expert.avatar,
      consultationType,
      date,
      timeSlot,
      totalAmount,
      appliedCouponCode: appliedCoupon?.code,
      discountSaved: discountAmount,
      status: 'confirmed',
      userName: bookingData?.userName || 'Tariq Al-Mansoor',
      userEmail: bookingData?.userEmail || 'tariq.student@example.com'
    };
    onCompleteBooking(completedRecord);
    onNavigate('confirmation', { booking: completedRecord });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8 pb-20">
      <Breadcrumb
        items={[
          { label: 'Booking', view: 'booking' },
          { label: 'Payment Checkout' }
        ]}
        onNavigate={onNavigate}
      />

      {/* Demo Warning Banner */}
      <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-2xl text-xs sm:text-sm text-green-900 flex items-center gap-3">
        <Lock className="w-5 h-5 text-green-600 shrink-0" />
        <span>
          <strong>Frontend Demo Mode:</strong> This checkout UI is prepared for future WooCommerce / Stripe payment integration. Clicking confirm will simulate a successful booking without charging money.
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Payment Options Form */}
        <div className="md:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft-lg space-y-6">
          
          <h2 className="text-xl font-bold font-heading text-slate-900">Payment Options</h2>

          {/* Payment Method Selector Tabs */}
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'card', label: 'Credit Card', icon: CreditCard },
              { id: 'paypal', label: 'PayPal', icon: DollarSign },
              { id: 'upi', label: 'UPI / Apple', icon: Smartphone }
            ].map((pm) => {
              const Icon = pm.icon;
              const isSelected = paymentMethod === pm.id;
              return (
                <button
                  key={pm.id}
                  type="button"
                  onClick={() => setPaymentMethod(pm.id as any)}
                  className={`py-3 px-2 rounded-2xl border text-xs font-bold flex flex-col items-center gap-1 transition-all ${
                    isSelected
                      ? 'bg-slate-900 text-green-400 border-slate-900 shadow-md'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{pm.label}</span>
                </button>
              );
            })}
          </div>

          <form onSubmit={handlePayAndConfirm} className="space-y-4">
            {paymentMethod === 'card' && (
              <div className="space-y-3 pt-2">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Cardholder Name</label>
                  <input
                    type="text"
                    defaultValue="Tariq Al-Mansoor"
                    className="w-full px-3 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-green-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Card Number</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-green-500 focus:outline-none font-mono"
                    />
                    <CreditCard className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">Expiration</label>
                    <input
                      type="text"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="w-full px-3 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-green-500 focus:outline-none font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">CVC / CVV</label>
                    <input
                      type="text"
                      value={cardCvc}
                      onChange={(e) => setCardCvc(e.target.value)}
                      className="w-full px-3 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-green-500 focus:outline-none font-mono"
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === 'paypal' && (
              <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-xs text-blue-900">
                You will be redirected to PayPal to complete your payment securely.
              </div>
            )}

            {paymentMethod === 'upi' && (
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-2">
                <label className="font-semibold block">Enter UPI ID / Apple Pay handle:</label>
                <input
                  type="text"
                  placeholder="name@okaxis or user@apple"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300"
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full py-4 text-sm font-bold text-white bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 rounded-xl shadow-lg transition-colors flex items-center justify-center gap-2"
            >
              <span>Pay & Confirm Booking (₹{totalAmount})</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

        </div>

        {/* Right Column: Order Summary & Coupon Promo Box */}
        <div className="md:col-span-5 bg-slate-900 text-white rounded-3xl p-6 border border-slate-800 space-y-5">
          <h3 className="text-lg font-bold font-heading text-white border-b border-slate-800 pb-3">Order Summary</h3>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between py-1 border-b border-slate-800/80">
              <span className="text-slate-400">Scholar:</span>
              <span className="font-semibold text-white">{expert.name}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-800/80">
              <span className="text-slate-400">Format:</span>
              <span className="font-semibold capitalize text-green-300">{consultationType} Consultation</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-800/80">
              <span className="text-slate-400">Date & Time:</span>
              <span className="font-semibold text-white">{date} ({timeSlot})</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-800/80">
              <span className="text-slate-400">Session Price:</span>
              <span className="font-semibold text-slate-300">₹{originalPrice}</span>
            </div>

            {/* Applied Coupon Savings Banner */}
            {appliedCoupon && (
              <div className="p-3 bg-amber-500/15 border border-amber-400/40 rounded-2xl space-y-1 text-amber-300 text-[11px]">
                <div className="flex items-center justify-between font-bold">
                  <span className="flex items-center gap-1">
                    <Tag className="w-3.5 h-3.5 text-amber-400" />
                    Coupon {appliedCoupon.code} Applied
                  </span>
                  <span>-{appliedCoupon.discountPercent}%</span>
                </div>
                <div className="text-[10px] text-amber-200/80">
                  {appliedCoupon.teacherName ? `By ${appliedCoupon.teacherName}` : 'Promotional Discount'}
                </div>
              </div>
            )}

            {/* Discount line item */}
            {appliedCoupon && (
              <div className="flex justify-between py-1 border-b border-slate-800/80 text-amber-300 font-bold">
                <span>Discount Savings:</span>
                <span>-₹{discountAmount}</span>
              </div>
            )}

            <div className="flex justify-between py-2 text-sm font-bold border-t border-slate-700">
              <span>Final Total Amount:</span>
              <span className="text-green-400 text-xl font-heading">₹{totalAmount}</span>
            </div>
          </div>

          {/* Coupon Code Input Box */}
          <div className="pt-2 border-t border-slate-800 space-y-2">
            <label className="text-[11px] font-bold text-slate-300 flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-amber-400" />
              <span>Have a Scholar / Teacher Coupon Code?</span>
            </label>
            <form onSubmit={handleApplyCoupon} className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Enter promo (e.g. DEEN20)"
                value={inputCouponCode}
                onChange={(e) => setInputCouponCode(e.target.value)}
                className="flex-1 px-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-700 text-white font-mono uppercase focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
              <button
                type="submit"
                className="px-3 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-xl transition-colors shrink-0"
              >
                Apply
              </button>
            </form>
            {couponError && (
              <p className="text-[10px] text-rose-400 font-semibold">{couponError}</p>
            )}
          </div>

          <div className="pt-2 text-[11px] text-slate-400 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Encrypted SSL payment pipeline standard.</span>
          </div>
        </div>

      </div>
    </div>
  );
};
