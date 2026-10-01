import React, { useState } from 'react';
import { User, Course, PageView, Coupon } from '../types';
import { coursesData } from '../data/courses';
import { 
  BookOpen, 
  Users, 
  Phone, 
  Video, 
  PlusCircle, 
  Award, 
  Clock, 
  DollarSign, 
  CheckCircle2, 
  XCircle, 
  ShieldAlert, 
  FileText, 
  UserX, 
  Sparkles,
  Search,
  Check,
  Tag,
  Percent,
  Calendar,
  Wallet,
  ArrowUpRight,
  TrendingUp,
  BarChart2,
  Lock,
  UserCheck,
  Edit3,
  Save,
  HelpCircle,
  Copy,
  LogOut
} from 'lucide-react';

interface TeacherDashboardPageProps {
  currentUser: User;
  coupons?: Coupon[];
  onAddCoupon?: (newCoupon: Coupon) => void;
  onNavigate: (view: PageView, params?: any) => void;
  showToast: (type: 'success' | 'error' | 'info', msg: string) => void;
  onLaunchCall?: (type: 'voice' | 'video', scholarName: string) => void;
  onLogout?: () => void;
}

export function TeacherDashboardPage({
  currentUser,
  coupons = [],
  onAddCoupon,
  onNavigate,
  showToast,
  onLaunchCall,
  onLogout
}: TeacherDashboardPageProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'courses' | 'create-mcq' | 'students' | 'coupons' | 'calls' | 'wallet' | 'profile'>('overview');
  const [isOnline, setIsOnline] = useState(true);

  // Teacher courses state
  const [teacherCourses, setTeacherCourses] = useState<Course[]>(coursesData.slice(0, 3));
  
  // MCQ Form State
  const [mcqCourseId, setMcqCourseId] = useState('course-1');
  const [mcqQuestion, setMcqQuestion] = useState('');
  const [mcqOptionA, setMcqOptionA] = useState('');
  const [mcqOptionB, setMcqOptionB] = useState('');
  const [mcqOptionC, setMcqOptionC] = useState('');
  const [mcqOptionD, setMcqOptionD] = useState('');
  const [mcqCorrectOption, setMcqCorrectOption] = useState<'A' | 'B' | 'C' | 'D'>('A');

  // Coupon Form State
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState('20');
  const [validUntil, setValidUntil] = useState('2026-10-31');
  const [maxUses, setMaxUses] = useState('50');
  const [targetService, setTargetService] = useState('Islamic Finance Consultations');

  // Local Coupons list fallback
  const [localCoupons, setLocalCoupons] = useState<Coupon[]>(coupons.length > 0 ? coupons : [
    {
      id: 'cp-101',
      code: 'DEEN20',
      teacherName: currentUser.name || 'Mufti Ahmed Khan',
      teacherId: currentUser.id || 'exp-1',
      discountPercent: 20,
      validUntil: '2026-10-31',
      maxUses: 100,
      usedCount: 34,
      targetCourseOrService: 'Islamic Finance Consultations',
      isActive: true,
      createdAt: '2026-09-01'
    }
  ]);

  // Registered students list with Teacher Permissions
  const [studentsList, setStudentsList] = useState<Array<{ id: string; name: string; email: string; course: string; status: 'Active' | 'Restricted' | 'Blocked'; joinedDate: string }>>([
    { id: 'usr-1', name: 'Zaid Al-Harbi', email: 'zaid@example.com', course: 'Learn Quran with Tajweed', status: 'Active', joinedDate: 'Aug 12, 2026' },
    { id: 'usr-2', name: 'Fatima Zahra', email: 'fatima@example.com', course: 'Foundations of Fiqh', status: 'Active', joinedDate: 'Sep 02, 2026' },
    { id: 'usr-3', name: 'Bilal Ahmed', email: 'bilal@example.com', course: 'Islamic Finance Masterclass', status: 'Restricted', joinedDate: 'Sep 18, 2026' },
    { id: 'usr-4', name: 'Amina Begum', email: 'amina@example.com', course: 'Learn Quran with Tajweed', status: 'Active', joinedDate: 'Sep 22, 2026' },
  ]);

  // Wallet & Payout State
  const [walletBalance, setWalletBalance] = useState(125000);
  const [payoutAmount, setPayoutAmount] = useState('');
  const [payoutAccount, setPayoutAccount] = useState('Meezan Bank - IBAN PK92MEZN0012389410');
  const [payoutHistory, setPayoutHistory] = useState([
    { id: 'PO-901', date: 'Sep 15, 2026', amount: 45000, status: 'Completed', method: 'Bank Transfer' },
    { id: 'PO-844', date: 'Aug 30, 2026', amount: 50000, status: 'Completed', method: 'Bank Transfer' }
  ]);

  // Teacher Profile state
  const [teacherProfile, setTeacherProfile] = useState({
    name: currentUser.name || 'Mufti Ahmed Khan',
    title: 'Mufti | Senior Islamic Finance Scholar',
    specialization: 'Islamic Finance & Family Fiqh',
    callTiming: '07:00 PM – 09:00 PM (PKT)',
    ratePerSession: 45,
    bio: 'Certified Mufti with over 10 years experience in Islamic jurisprudence, finance auditing, and family consultations.',
    availableDays: ['Monday', 'Wednesday', 'Friday', 'Saturday']
  });

  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) {
      showToast('error', 'Please enter a valid coupon code (e.g. DEEN20)');
      return;
    }

    const newCouponItem: Coupon = {
      id: `cp-${Date.now()}`,
      code: couponCode.toUpperCase().trim(),
      teacherName: currentUser.name || 'Scholar Instructor',
      teacherId: currentUser.id || 'exp-1',
      discountPercent: parseInt(discountPercent) || 15,
      validUntil: validUntil || '2026-10-31',
      maxUses: parseInt(maxUses) || 50,
      usedCount: 0,
      targetCourseOrService: targetService,
      isActive: true,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setLocalCoupons([newCouponItem, ...localCoupons]);
    if (onAddCoupon) onAddCoupon(newCouponItem);

    showToast('success', `Coupon "${newCouponItem.code}" created successfully with ${newCouponItem.discountPercent}% discount!`);
    setCouponCode('');
  };

  const toggleCouponStatus = (id: string) => {
    setLocalCoupons(prev => prev.map(c => c.id === id ? { ...c, isActive: !c.isActive } : c));
    showToast('info', 'Coupon status updated.');
  };

  const handleCreateMcq = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mcqQuestion || !mcqOptionA || !mcqOptionB) {
      showToast('error', 'Please fill in question and at least two options.');
      return;
    }
    showToast('success', 'New Scholar MCQ Test question published for students!');
    setMcqQuestion('');
    setMcqOptionA('');
    setMcqOptionB('');
    setMcqOptionC('');
    setMcqOptionD('');
  };

  const toggleStudentBlock = (id: string) => {
    setStudentsList(prev => prev.map(s => {
      if (s.id === id) {
        const newStatus = s.status === 'Blocked' ? 'Active' : 'Blocked';
        showToast('info', `Student ${s.name} is now ${newStatus}`);
        return { ...s, status: newStatus };
      }
      return s;
    }));
  };

  const toggleStudentRestrict = (id: string) => {
    setStudentsList(prev => prev.map(s => {
      if (s.id === id) {
        const newStatus = s.status === 'Restricted' ? 'Active' : 'Restricted';
        showToast('info', `Student ${s.name} is now ${newStatus}`);
        return { ...s, status: newStatus };
      }
      return s;
    }));
  };

  const handlePayoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amountNum = parseFloat(payoutAmount);
    if (!amountNum || amountNum <= 0 || amountNum > walletBalance) {
      showToast('error', 'Please enter a valid payout amount within your wallet balance.');
      return;
    }

    setWalletBalance(prev => prev - amountNum);
    setPayoutHistory([
      { id: `PO-${Math.floor(100 + Math.random() * 900)}`, date: 'Today', amount: amountNum, status: 'Pending Review', method: payoutAccount },
      ...payoutHistory
    ]);
    showToast('success', `Payout request for ₹${amountNum.toLocaleString()} submitted to Admin!`);
    setPayoutAmount('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-24">
      
      {/* Teacher Top Header Card */}
      <div className="bg-gradient-to-r from-amber-950 via-slate-900 to-slate-950 rounded-3xl p-6 sm:p-8 text-white shadow-2xl border border-amber-500/30 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img 
              src={currentUser.avatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400"} 
              alt={currentUser.name} 
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-amber-400 shadow-lg"
            />
            <span className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-slate-900 ${isOnline ? 'bg-emerald-500' : 'bg-slate-500'}`} />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/40 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-400" />
                Certified Teacher / Scholar Panel
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold font-heading">{teacherProfile.name}</h1>
            <p className="text-xs text-slate-300">{teacherProfile.title} • Active Students: 5,440</p>
          </div>
        </div>

        {/* Status Toggle & Direct Call Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => {
              setIsOnline(!isOnline);
              showToast('info', `Status set to ${!isOnline ? 'Available Online' : 'Away'}`);
            }}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all border flex items-center gap-2 ${
              isOnline 
                ? 'bg-emerald-600/90 text-white border-emerald-500 shadow-md hover:bg-emerald-600' 
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
            }`}
          >
            <span className={`w-2.5 h-2.5 rounded-full ${isOnline ? 'bg-white animate-pulse' : 'bg-slate-400'}`} />
            <span>{isOnline ? 'Available for Live Calls' : 'Offline / Away'}</span>
          </button>

          <div className="p-3 bg-slate-900/80 rounded-2xl border border-slate-800 text-right">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Wallet Balance</span>
            <span className="text-lg font-extrabold text-amber-400 font-heading">₹{walletBalance.toLocaleString()}</span>
          </div>

          {onLogout && (
            <button
              onClick={onLogout}
              className="px-4 py-3 bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 font-bold text-xs rounded-2xl border border-rose-500/30 transition-colors flex items-center gap-1.5"
              title="Log Out of Teacher Account"
            >
              <LogOut className="w-4 h-4 text-rose-400" />
              <span>Log Out</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Navigation Tabs Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200">
        {[
          { id: 'overview', label: 'Teacher Dashboard Overview', icon: BarChart2 },
          { id: 'courses', label: 'My Courses & Call Timing', icon: BookOpen },
          { id: 'coupons', label: 'Coupons & Promotional Offers', icon: Tag },
          { id: 'create-mcq', label: 'Create MCQ Quizzes', icon: PlusCircle },
          { id: 'students', label: 'Enrolled Students & Access', icon: Users },
          { id: 'calls', label: 'Live Call Terminal', icon: Phone },
          { id: 'wallet', label: 'Earnings & Payout Wallet', icon: Wallet },
          { id: 'profile', label: 'Scholar Profile & Slots', icon: UserCheck }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                isActive
                  ? 'bg-slate-900 text-amber-400 shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: TEACHER OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          
          {/* Key Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-soft-sm space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
                <span>Total Monthly Earnings</span>
                <DollarSign className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="text-2xl font-black font-heading text-slate-900">₹125,000</div>
              <div className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>+18.4% from last month</span>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-soft-sm space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
                <span>Consultation Calls Completed</span>
                <Phone className="w-4 h-4 text-purple-600" />
              </div>
              <div className="text-2xl font-black font-heading text-slate-900">142 Sessions</div>
              <div className="text-[11px] text-slate-500">98% Positive Feedback</div>
            </div>

            <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-soft-sm space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
                <span>Enrolled Students</span>
                <Users className="w-4 h-4 text-blue-600" />
              </div>
              <div className="text-2xl font-black font-heading text-slate-900">5,440</div>
              <div className="text-[11px] text-slate-500">Across 3 courses</div>
            </div>

            <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-soft-sm space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
                <span>Active Coupon Offers</span>
                <Tag className="w-4 h-4 text-amber-600" />
              </div>
              <div className="text-2xl font-black font-heading text-slate-900">{localCoupons.filter(c => c.isActive).length} Active</div>
              <div className="text-[11px] text-amber-700 font-semibold">{localCoupons.reduce((acc, c) => acc + c.usedCount, 0)} total redemptions</div>
            </div>
          </div>

          {/* Dedicated Teacher Category Analytics Banner */}
          <div className="bg-gradient-to-br from-slate-900 to-amber-950 rounded-3xl p-6 sm:p-8 text-white border border-amber-500/30 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <h3 className="text-base sm:text-lg font-bold font-heading text-amber-300">Scholar Category Analytics & High-Demand Alert</h3>
              </div>
              <span className="px-3 py-1 bg-amber-400/20 text-amber-300 border border-amber-400/40 rounded-full text-xs font-bold">
                High Category Demand
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300">
              System analytics show that user queries in <strong>Islamic Finance & Crypto Halal Guidance</strong> have increased by <strong>+38%</strong> this month. 
              Students are actively using your promotional coupon code <code className="bg-slate-800 text-amber-300 px-1.5 py-0.5 rounded font-mono font-bold">DEEN20</code>.
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={() => setActiveTab('coupons')}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold rounded-xl text-xs transition-colors flex items-center gap-1.5 shadow-md"
              >
                <Tag className="w-4 h-4" />
                <span>Create New Student Coupon</span>
              </button>
              <button
                onClick={() => setActiveTab('calls')}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/40 font-bold rounded-xl text-xs transition-colors flex items-center gap-1.5"
              >
                <Phone className="w-4 h-4" />
                <span>Open Live Call Terminal</span>
              </button>
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: MY COURSES & CALL TIMINGS */}
      {activeTab === 'courses' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold font-heading text-slate-900">Assigned Courses & Call Schedules</h2>
            <span className="text-xs text-slate-500">{teacherCourses.length} Active Courses</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {teacherCourses.map(course => (
              <div key={course.id} className="bg-white rounded-3xl p-5 border border-slate-200 shadow-soft-sm space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <img src={course.thumbnail} alt={course.title} className="w-full h-36 rounded-2xl object-cover" />
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-md bg-amber-100 text-amber-900 uppercase">
                    {course.category}
                  </span>
                  <h3 className="text-base font-bold font-heading text-slate-900">{course.title}</h3>
                  
                  {/* Instructor Name & Call Timing */}
                  <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 space-y-1.5 text-xs text-slate-700">
                    <div className="flex items-center gap-1.5 font-bold text-slate-900">
                      <span>Scholar:</span>
                      <span className="text-amber-800">{teacherProfile.name}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-600">
                      <Clock className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Live Call Timing: {teacherProfile.callTiming}</span>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => onNavigate('course-detail', { courseId: course.id })}
                  className="w-full py-2 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition-colors"
                >
                  Manage Course & Lessons
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: COUPONS & OFFERS MANAGEMENT */}
      {activeTab === 'coupons' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          
          {/* Create Coupon Form */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft-lg max-w-3xl space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <Tag className="w-5 h-5 text-amber-600" />
                <h2 className="text-lg font-bold font-heading text-slate-900">Create Student Coupon & Promo Offer</h2>
              </div>
              <p className="text-xs text-slate-500 mt-1">Teachers can generate discount promo codes for their students to use at checkout.</p>
            </div>

            <form onSubmit={handleCreateCoupon} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Coupon Code (e.g. DEEN20)</label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      placeholder="e.g. DEEN20"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 font-mono uppercase font-bold focus:ring-2 focus:ring-amber-500"
                    />
                    <Tag className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Discount Percentage (%)</label>
                  <div className="relative">
                    <input
                      type="number"
                      required
                      min="5"
                      max="90"
                      value={discountPercent}
                      onChange={(e) => setDiscountPercent(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 font-bold focus:ring-2 focus:ring-amber-500"
                    />
                    <Percent className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Valid Until Date</label>
                  <input
                    type="date"
                    required
                    value={validUntil}
                    onChange={(e) => setValidUntil(e.target.value)}
                    className="w-full px-3 py-2.5 text-xs rounded-xl border border-slate-300"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Max Redemption Uses</label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={maxUses}
                    onChange={(e) => setMaxUses(e.target.value)}
                    className="w-full px-3 py-2.5 text-xs rounded-xl border border-slate-300 font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Target Service / Course</label>
                  <input
                    type="text"
                    required
                    value={targetService}
                    onChange={(e) => setTargetService(e.target.value)}
                    className="w-full px-3 py-2.5 text-xs rounded-xl border border-slate-300"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="px-6 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold rounded-xl text-xs transition-all shadow-md flex items-center gap-2"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Publish Coupon Code</span>
              </button>
            </form>
          </div>

          {/* Active Coupons List Table */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft-lg space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold font-heading text-slate-900">Your Active Coupon Offers</h2>
              <span className="text-xs text-slate-500">{localCoupons.length} total coupons</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-100 text-slate-900 uppercase text-[10px] font-bold">
                  <tr>
                    <th className="p-3">Coupon Code</th>
                    <th className="p-3">Discount</th>
                    <th className="p-3">Valid Until</th>
                    <th className="p-3">Redemptions</th>
                    <th className="p-3">Target Scope</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {localCoupons.map((cp) => (
                    <tr key={cp.id} className="hover:bg-slate-50">
                      <td className="p-3">
                        <span className="font-mono font-extrabold text-slate-900 bg-amber-100 border border-amber-300 px-2 py-0.5 rounded text-xs">
                          {cp.code}
                        </span>
                      </td>
                      <td className="p-3 font-bold text-emerald-700">{cp.discountPercent}% OFF</td>
                      <td className="p-3">{cp.validUntil}</td>
                      <td className="p-3 font-semibold">{cp.usedCount} / {cp.maxUses}</td>
                      <td className="p-3 truncate max-w-[180px]">{cp.targetCourseOrService}</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          cp.isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {cp.isActive ? 'Active' : 'Disabled'}
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => toggleCouponStatus(cp.id)}
                          className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-[10px] font-bold border border-slate-300"
                        >
                          {cp.isActive ? 'Disable' : 'Enable'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* TAB 4: CREATE TEACHER MCQS */}
      {activeTab === 'create-mcq' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft-lg max-w-3xl space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-lg font-bold font-heading text-slate-900">Create Scholar MCQ Question</h2>
            <p className="text-xs text-slate-500">Teachers/scholars can create course-specific evaluation quizzes for students.</p>
          </div>

          <form onSubmit={handleCreateMcq} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Target Course</label>
              <select
                value={mcqCourseId}
                onChange={(e) => setMcqCourseId(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-slate-50 text-slate-800"
              >
                {teacherCourses.map(c => (
                  <option key={c.id} value={c.id}>{c.title}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Question Statement</label>
              <textarea
                rows={3}
                placeholder="e.g. What are the letters of Izhar in Tajweed rules?"
                value={mcqQuestion}
                onChange={(e) => setMcqQuestion(e.target.value)}
                className="w-full p-3 text-xs rounded-xl border border-slate-300 text-slate-800"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Option A</label>
                <input
                  type="text"
                  placeholder="Option A"
                  value={mcqOptionA}
                  onChange={(e) => setMcqOptionA(e.target.value)}
                  className="w-full p-2.5 text-xs rounded-xl border border-slate-300"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Option B</label>
                <input
                  type="text"
                  placeholder="Option B"
                  value={mcqOptionB}
                  onChange={(e) => setMcqOptionB(e.target.value)}
                  className="w-full p-2.5 text-xs rounded-xl border border-slate-300"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Option C</label>
                <input
                  type="text"
                  placeholder="Option C"
                  value={mcqOptionC}
                  onChange={(e) => setMcqOptionC(e.target.value)}
                  className="w-full p-2.5 text-xs rounded-xl border border-slate-300"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Option D</label>
                <input
                  type="text"
                  placeholder="Option D"
                  value={mcqOptionD}
                  onChange={(e) => setMcqOptionD(e.target.value)}
                  className="w-full p-2.5 text-xs rounded-xl border border-slate-300"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Correct Answer Option</label>
              <select
                value={mcqCorrectOption}
                onChange={(e) => setMcqCorrectOption(e.target.value as any)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-slate-50 font-bold"
              >
                <option value="A">Option A</option>
                <option value="B">Option B</option>
                <option value="C">Option C</option>
                <option value="D">Option D</option>
              </select>
            </div>

            <button
              type="submit"
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-2"
            >
              <Check className="w-4 h-4" />
              <span>Publish Scholar MCQ Question</span>
            </button>
          </form>
        </div>
      )}

      {/* TAB 5: ENROLLED STUDENTS & TEACHER PERMISSIONS */}
      {activeTab === 'students' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft-lg space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-lg font-bold font-heading text-slate-900">Enrolled Students & Access Roster</h2>
              <p className="text-xs text-slate-500">Teacher permissions allow managing student access, restrictions, or blocks.</p>
            </div>
            <span className="text-xs text-slate-500 font-semibold">{studentsList.length} Students</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-100 text-slate-900 uppercase text-[10px] font-bold">
                <tr>
                  <th className="p-3">Student Name</th>
                  <th className="p-3">Assigned Course</th>
                  <th className="p-3">Joined Date</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Teacher Controls</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {studentsList.map(st => (
                  <tr key={st.id} className="hover:bg-slate-50">
                    <td className="p-3 font-semibold text-slate-900">
                      {st.name}
                      <br/>
                      <span className="text-[10px] text-slate-400 font-mono">{st.email}</span>
                    </td>
                    <td className="p-3">{st.course}</td>
                    <td className="p-3">{st.joinedDate}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        st.status === 'Active' ? 'bg-emerald-100 text-emerald-800' :
                        st.status === 'Blocked' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {st.status}
                      </span>
                    </td>
                    <td className="p-3 text-right space-x-2">
                      <button
                        onClick={() => toggleStudentRestrict(st.id)}
                        className="px-2.5 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 text-[10px] font-bold"
                      >
                        {st.status === 'Restricted' ? 'Unrestrict' : 'Restrict'}
                      </button>
                      <button
                        onClick={() => toggleStudentBlock(st.id)}
                        className="px-2.5 py-1 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200 text-[10px] font-bold"
                      >
                        {st.status === 'Blocked' ? 'Unblock' : 'Block'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 6: LIVE CALL RECEIVER TERMINAL */}
      {activeTab === 'calls' && (
        <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 text-white border border-slate-800 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-lg font-bold font-heading text-amber-400">Direct Live Call Terminal</h2>
              <p className="text-xs text-slate-400">Receive and accept direct instant Voice or Video consultation calls from students.</p>
            </div>
            <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 rounded-full text-xs font-bold">
              Direct Connection Active
            </span>
          </div>

          {/* Simulated Incoming Call Banner */}
          <div className="p-6 rounded-2xl bg-slate-950 border border-amber-500/40 space-y-4 text-center max-w-md mx-auto shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-amber-500/20 text-amber-400 mx-auto flex items-center justify-center animate-bounce">
              <Phone className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-base font-bold">Incoming Direct Call: Student Tariq</h3>
              <p className="text-xs text-slate-400">Requested Consultation: Voice / Video Live Session</p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => {
                  showToast('success', 'Call accepted! Connecting live audio stream...');
                  if (onLaunchCall) onLaunchCall('voice', teacherProfile.name);
                }}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-lg"
              >
                <Phone className="w-4 h-4" />
                <span>Accept Voice Call</span>
              </button>

              <button
                onClick={() => {
                  showToast('success', 'Video call accepted! Opening encrypted video room...');
                  if (onLaunchCall) onLaunchCall('video', teacherProfile.name);
                }}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-lg"
              >
                <Video className="w-4 h-4" />
                <span>Accept Video Call</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 7: WALLET & PAYOUT REQUESTS */}
      {activeTab === 'wallet' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Wallet Balance Card */}
            <div className="bg-gradient-to-br from-amber-900 to-slate-950 text-white p-6 rounded-3xl border border-amber-500/30 space-y-3 shadow-xl">
              <span className="text-xs text-amber-300 font-bold uppercase tracking-wider">Available Wallet Balance</span>
              <div className="text-3xl font-black font-heading text-amber-400">₹{walletBalance.toLocaleString()}</div>
              <p className="text-xs text-slate-300">Ready for instant payout withdrawal to bank account.</p>
            </div>

            {/* Request Payout Form */}
            <div className="md:col-span-2 bg-white rounded-3xl p-6 border border-slate-200 shadow-soft-md space-y-4">
              <h3 className="text-base font-bold font-heading text-slate-900">Request Payout Withdrawal</h3>
              <form onSubmit={handlePayoutSubmit} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Payout Amount (₹)</label>
                    <input
                      type="number"
                      required
                      placeholder="e.g. 50000"
                      value={payoutAmount}
                      onChange={(e) => setPayoutAmount(e.target.value)}
                      className="w-full p-2.5 text-xs rounded-xl border border-slate-300 font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Bank Account / IBAN</label>
                    <input
                      type="text"
                      required
                      value={payoutAccount}
                      onChange={(e) => setPayoutAccount(e.target.value)}
                      className="w-full p-2.5 text-xs rounded-xl border border-slate-300 font-mono"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5"
                >
                  <ArrowUpRight className="w-4 h-4" />
                  <span>Submit Payout Withdrawal Request</span>
                </button>
              </form>
            </div>
          </div>

          {/* Payout History Table */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft-md space-y-3">
            <h3 className="text-base font-bold font-heading text-slate-900">Payout History</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-100 text-slate-900 uppercase text-[10px] font-bold">
                  <tr>
                    <th className="p-3">Payout ID</th>
                    <th className="p-3">Date</th>
                    <th className="p-3">Amount</th>
                    <th className="p-3">Destination</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {payoutHistory.map(po => (
                    <tr key={po.id}>
                      <td className="p-3 font-mono font-bold text-slate-900">{po.id}</td>
                      <td className="p-3">{po.date}</td>
                      <td className="p-3 font-bold text-emerald-700">₹{po.amount.toLocaleString()}</td>
                      <td className="p-3 font-mono text-[11px] truncate max-w-[200px]">{po.method}</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          po.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {po.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 8: SCHOLAR PROFILE & SLOTS */}
      {activeTab === 'profile' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft-lg max-w-3xl space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-lg font-bold font-heading text-slate-900">Scholar Profile & Consultation Slot Settings</h2>
            <p className="text-xs text-slate-500">Update your scholar title, bio, call timing, and available session slots.</p>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); showToast('success', 'Teacher profile updated successfully!'); }} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Scholar Full Name</label>
                <input
                  type="text"
                  value={teacherProfile.name}
                  onChange={(e) => setTeacherProfile({ ...teacherProfile, name: e.target.value })}
                  className="w-full p-2.5 text-xs rounded-xl border border-slate-300 font-bold"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Scholar Title</label>
                <input
                  type="text"
                  value={teacherProfile.title}
                  onChange={(e) => setTeacherProfile({ ...teacherProfile, title: e.target.value })}
                  className="w-full p-2.5 text-xs rounded-xl border border-slate-300 font-bold"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Live Call Timing Slot</label>
                <input
                  type="text"
                  value={teacherProfile.callTiming}
                  onChange={(e) => setTeacherProfile({ ...teacherProfile, callTiming: e.target.value })}
                  className="w-full p-2.5 text-xs rounded-xl border border-slate-300"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Flat Rate per Consultation (₹)</label>
                <input
                  type="number"
                  value={teacherProfile.ratePerSession}
                  onChange={(e) => setTeacherProfile({ ...teacherProfile, ratePerSession: parseFloat(e.target.value) || 0 })}
                  className="w-full p-2.5 text-xs rounded-xl border border-slate-300 font-bold"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Scholar Bio</label>
              <textarea
                rows={3}
                value={teacherProfile.bio}
                onChange={(e) => setTeacherProfile({ ...teacherProfile, bio: e.target.value })}
                className="w-full p-3 text-xs rounded-xl border border-slate-300"
              />
            </div>

            <button
              type="submit"
              className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-colors flex items-center gap-2"
            >
              <Save className="w-4 h-4 text-amber-400" />
              <span>Save Scholar Profile Updates</span>
            </button>
          </form>
        </div>
      )}

    </div>
  );
}
