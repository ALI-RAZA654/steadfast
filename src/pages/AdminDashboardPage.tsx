import React, { useState } from 'react';
import { User, Expert, Booking, Category, PageView, TopUser, UserExpertTime, AdminComment, Coupon, RegisteredTeacher } from '../types';
import { 
  initialCoupons, 
  topicInsightsData, 
  revenueForecastsData, 
  serviceSuggestionsData,
  initialRegisteredTeachers
} from '../data/mockAnalyticsAndCoupons';
import { 
  Users, Calendar, DollarSign, ShieldCheck, CheckCircle2, XCircle, 
  Plus, Edit, Search, Filter, Lock, Award, Clock, ArrowRight, Activity, 
  Settings, Check, UserCheck, BookOpen, AlertCircle, TrendingUp, TrendingDown,
  PieChart, Ban, Unlock, Trash2, ShieldAlert, MessageSquare, AlertTriangle,
  UserX, RefreshCw, Zap, BarChart3, Star, ArrowUpRight, Tag, Percent,
  Sparkles, Lightbulb, LineChart, BrainCircuit, Compass, Key, LogOut, ChevronDown, ChevronUp
} from 'lucide-react';

interface AdminDashboardPageProps {
  user: User;
  experts: Expert[];
  bookings: Booking[];
  categories: Category[];
  coupons?: Coupon[];
  registeredTeachers?: RegisteredTeacher[];
  onAddTeacher?: (newTeacher: RegisteredTeacher) => void;
  onAddCoupon?: (newCoupon: Coupon) => void;
  onNavigate: (view: PageView, params?: any) => void;
  onLogout: () => void;
}

export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({
  user,
  experts,
  bookings,
  categories,
  coupons = [],
  registeredTeachers = [],
  onAddTeacher,
  onAddCoupon,
  onNavigate,
  onLogout
}) => {
  const [activeTab, setActiveTab] = useState<'analytics' | 'forecast' | 'suggestions' | 'coupons' | 'teacher-manage' | 'finance' | 'experts' | 'top-users' | 'time-tracking' | 'comments' | 'bookings' | 'approvals' | 'settings'>('analytics');
  
  // Registered Teachers State
  const [teachersList, setTeachersList] = useState<RegisteredTeacher[]>(registeredTeachers.length > 0 ? registeredTeachers : initialRegisteredTeachers);
  const [teacherName, setTeacherName] = useState('');
  const [teacherEmail, setTeacherEmail] = useState('');
  const [teacherTitle, setTeacherTitle] = useState('Mufti / Scholar Instructor');
  const [teacherSpec, setTeacherSpec] = useState('Islamic Finance & Fiqh');
  const [suggestedUsername, setSuggestedUsername] = useState('');
  const [suggestedPassword, setSuggestedPassword] = useState('');

  // Selected Coupon for Redemption History View
  const [selectedCouponRedemptions, setSelectedCouponRedemptions] = useState<Coupon | null>(null);

  // Auto Generate Teacher Credentials Helper
  const handleAutoSuggestCredentials = () => {
    const baseName = teacherName.trim() ? teacherName.toLowerCase().replace(/[^a-z0-9]/g, '_') : 'scholar_teacher';
    const genUsername = `teacher_${baseName.substring(0, 12)}_${Math.floor(10 + Math.random() * 90)}`;
    const genPassword = `DeenPass${Math.floor(1000 + Math.random() * 9000)}#`;
    setSuggestedUsername(genUsername);
    setSuggestedPassword(genPassword);
  };

  const handleRegisterTeacherSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!teacherName.trim() || !teacherEmail.trim()) {
      showToast('Please enter Teacher Name and Email.');
      return;
    }

    const username = suggestedUsername || `teacher_${teacherName.toLowerCase().replace(/[^a-z0-9]/g, '_')}`;
    const password = suggestedPassword || 'teacher123';

    const newTeacherRecord: RegisteredTeacher = {
      id: `tch-${Date.now()}`,
      name: teacherName.trim(),
      username,
      email: teacherEmail.trim(),
      passwordSuggestion: password,
      title: teacherTitle,
      specialization: teacherSpec,
      status: 'Active',
      totalStudents: 0,
      totalRevenue: 0,
      joinedDate: new Date().toISOString().split('T')[0]
    };

    setTeachersList([newTeacherRecord, ...teachersList]);
    if (onAddTeacher) onAddTeacher(newTeacherRecord);

    showToast(`Teacher "${newTeacherRecord.name}" onboarded! Credentials: ${newTeacherRecord.username} / ${newTeacherRecord.passwordSuggestion}`);
    setTeacherName('');
    setTeacherEmail('');
    setSuggestedUsername('');
    setSuggestedPassword('');
  };
  
  // Coupons state
  const [globalCoupons, setGlobalCoupons] = useState<Coupon[]>(coupons.length > 0 ? coupons : initialCoupons);
  const [adminCouponCode, setAdminCouponCode] = useState('');
  const [adminDiscountPercent, setAdminDiscountPercent] = useState('25');
  const [adminValidUntil, setAdminValidUntil] = useState('2026-11-30');
  const [adminMaxUses, setAdminMaxUses] = useState('100');
  const [adminTargetScope, setAdminTargetScope] = useState('All Platform Services & Courses');
  
  // Finance State (Auto Calculated & Configurable)
  const [financials, setFinancials] = useState({
    totalRevenue: 500000,
    totalProfit: 150000,
    totalLoss: 350000,
    expertPayouts: 310000,
    serverAndGatewayCosts: 40000
  });

  // Extended Scholar List state with Revenue, Status, and Block status
  const [scholarList, setScholarList] = useState<Array<Expert & { totalRevenue: number; isBlocked: boolean; totalSessions: number }>>([
    {
      id: 'exp-1',
      name: 'Mufti Ahmed Khan',
      title: 'Mufti | Fiqh Specialist',
      verified: true,
      avatar: '/avatars/mufti_ahmed.png',
      specialization: 'Islamic Finance',
      categories: ['islamic-finance', 'fiqh-masail'],
      rating: 4.8,
      reviewCount: 320,
      experienceYears: 10,
      languages: ['Urdu', 'English', 'Arabic'],
      isOnline: true,
      isBlocked: false,
      ratePerMin: 12,
      flatSessionPrice: 35,
      completedSessions: 2000,
      totalSessions: 142,
      totalRevenue: 175000,
      responseRate: 'Instant (Online)',
      bio: 'Mufti & Islamic finance consultant with 10+ years experience.',
      qualifications: ['Dars-e-Nizami', 'Master in Islamic Law - Al-Azhar'],
      badges: ['✓ Verified', '👳‍♂️ Mufti', '💰 Islamic Finance']
    },
    {
      id: 'exp-2',
      name: 'Dr. Saba Fatima',
      title: 'Islamic Finance Scholar',
      verified: true,
      avatar: '/avatars/dr_saba.png',
      specialization: 'Finance | Muamalat | Zakat',
      categories: ['islamic-finance', 'family-marriage'],
      rating: 4.9,
      reviewCount: 210,
      experienceYears: 8,
      languages: ['Urdu', 'English', 'Arabic'],
      isOnline: true,
      isBlocked: false,
      ratePerMin: 15,
      flatSessionPrice: 40,
      completedSessions: 1890,
      totalSessions: 118,
      totalRevenue: 145000,
      responseRate: 'Instant (Online)',
      bio: 'Dr. Saba Fatima combines authentic Islamic jurisprudence with financial knowledge.',
      qualifications: ['PhD in Islamic Banking & Finance', 'Alimah Degree'],
      badges: ['✓ Verified', '💰 Islamic Finance', '📖 Scholar']
    },
    {
      id: 'exp-3',
      name: 'Maulana Rashid',
      title: 'Aalim | Muamalat Expert',
      verified: true,
      avatar: '/avatars/maulana_rashid.png',
      specialization: 'Business | Inheritance | Halal Earnings',
      categories: ['islamic-finance', 'fiqh-masail'],
      rating: 4.7,
      reviewCount: 180,
      experienceYears: 15,
      languages: ['Urdu', 'English', 'Arabic'],
      isOnline: false,
      isBlocked: false,
      ratePerMin: 10,
      flatSessionPrice: 30,
      completedSessions: 2300,
      totalSessions: 94,
      totalRevenue: 110000,
      responseRate: 'Within 1 hour',
      bio: 'Maulana Rashid has been answering contemporary fiqh queries for 15+ years.',
      qualifications: ['Fazil - Nadwatul Ulama', 'Senior Fiqh Lecturer'],
      badges: ['✓ Verified', '📖 Aalim', '⚖️ Fiqh Specialist']
    },
    {
      id: 'exp-4',
      name: 'Ustaza Mariyam',
      title: 'Islamic Finance Teacher',
      verified: true,
      avatar: '/avatars/ustaza_mariyam.png',
      specialization: 'Women Friendly | Finance Basics',
      categories: ['islamic-finance', 'quran-learning'],
      rating: 4.6,
      reviewCount: 160,
      experienceYears: 6,
      languages: ['Urdu', 'English'],
      isOnline: true,
      isBlocked: false,
      ratePerMin: 12,
      flatSessionPrice: 35,
      completedSessions: 1120,
      totalSessions: 65,
      totalRevenue: 70000,
      responseRate: 'Instant (Online)',
      bio: 'Ustaza Mariyam provides accessible financial education for women & students.',
      qualifications: ['Alimah Degree', 'Senior Quran Instructor'],
      badges: ['✓ Verified', '👩 Sister Friendly', '📖 Teacher']
    },
    {
      id: 'exp-5',
      name: 'Ustadh Tariq Aziz',
      title: 'Tajweed & Quran Scholar',
      verified: true,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
      specialization: 'Quranic Recitation & Qiraat',
      categories: ['quran-learning'],
      rating: 4.2,
      reviewCount: 12,
      experienceYears: 4,
      languages: ['Urdu', 'Arabic'],
      isOnline: false,
      isBlocked: false,
      ratePerMin: 8,
      flatSessionPrice: 25,
      completedSessions: 0,
      totalSessions: 0,
      totalRevenue: 0, // ZERO REVENUE EXPERT
      responseRate: 'Inactive (No bookings)',
      bio: 'Specialist in 10 Qiraat and Tajweed certification for beginners.',
      qualifications: ['Ijazah in Hafs an Asim'],
      badges: ['📖 Quran Expert']
    },
    {
      id: 'exp-6',
      name: 'Mufti Bilal Siddiqui',
      title: 'Aqeedah & Kalam Specialist',
      verified: true,
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200',
      specialization: 'Islamic Beliefs & Comparative Religion',
      categories: ['aqeedah-beliefs'],
      rating: 4.0,
      reviewCount: 5,
      experienceYears: 7,
      languages: ['Urdu', 'English'],
      isOnline: false,
      isBlocked: true, // BLOCKED EXPERT
      ratePerMin: 10,
      flatSessionPrice: 30,
      completedSessions: 0,
      totalSessions: 0,
      totalRevenue: 0, // ZERO REVENUE EXPERT
      responseRate: 'Blocked by Admin',
      bio: 'Research scholar in Islamic theology and contemporary doubts.',
      qualifications: ['Takhassus in Aqeedah'],
      badges: ['⚖️ Aqeedah Specialist']
    }
  ]);

  // Top Spending Users State
  const [topUsers, setTopUsers] = useState<TopUser[]>([
    {
      id: 'usr-801',
      name: 'Sheikh Faisal Al-Farooq',
      email: 'faisal.farooq@example.com',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
      totalSpent: 48500,
      totalSessions: 28,
      totalHours: 18.5,
      coursesPurchased: 4,
      lastActive: 'Today, 02:15 PM',
      status: 'VIP'
    },
    {
      id: 'usr-802',
      name: 'Aisha Rahman',
      email: 'aisha.r@example.com',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
      totalSpent: 34200,
      totalSessions: 19,
      totalHours: 14.0,
      coursesPurchased: 3,
      lastActive: 'Yesterday',
      status: 'VIP'
    },
    {
      id: 'usr-803',
      name: 'Imran Qureshi',
      email: 'imran.q@example.com',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200',
      totalSpent: 28900,
      totalSessions: 15,
      totalHours: 10.5,
      coursesPurchased: 2,
      lastActive: '3 days ago',
      status: 'Active'
    },
    {
      id: 'usr-804',
      name: 'Zainab Bibi',
      email: 'zainab.b@example.com',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
      totalSpent: 22400,
      totalSessions: 12,
      totalHours: 8.0,
      coursesPurchased: 3,
      lastActive: 'Sep 21, 2026',
      status: 'Active'
    },
    {
      id: 'usr-805',
      name: 'Dr. Hamza Malik',
      email: 'hamza.m@example.com',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200',
      totalSpent: 18000,
      totalSessions: 10,
      totalHours: 6.5,
      coursesPurchased: 1,
      lastActive: 'Sep 19, 2026',
      status: 'Regular'
    }
  ]);

  // User-Expert Consultation Time Tracking State
  const [sessionTimes, setSessionTimes] = useState<UserExpertTime[]>([
    {
      id: 'ut-1',
      userName: 'Aisha Rahman',
      userAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
      expertName: 'Mufti Ahmed Khan',
      expertAvatar: '/avatars/mufti_ahmed.png',
      expertTitle: 'Mufti & Islamic Finance Consultant',
      totalMinutes: 240,
      sessionCount: 6,
      totalSpent: 18000,
      lastConsultationDate: 'Sep 24, 2026'
    },
    {
      id: 'ut-2',
      userName: 'Sheikh Faisal Al-Farooq',
      userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
      expertName: 'Dr. Saba Fatima',
      expertAvatar: '/avatars/dr_saba.png',
      expertTitle: 'Islamic Finance Scholar',
      totalMinutes: 380,
      sessionCount: 8,
      totalSpent: 28500,
      lastConsultationDate: 'Sep 25, 2026'
    },
    {
      id: 'ut-3',
      userName: 'Imran Qureshi',
      userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200',
      expertName: 'Maulana Rashid',
      expertAvatar: '/avatars/maulana_rashid.png',
      expertTitle: 'Aalim & Fiqh Expert',
      totalMinutes: 180,
      sessionCount: 5,
      totalSpent: 12500,
      lastConsultationDate: 'Sep 22, 2026'
    },
    {
      id: 'ut-4',
      userName: 'Zainab Bibi',
      userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
      expertName: 'Ustaza Mariyam',
      expertAvatar: '/avatars/ustaza_mariyam.png',
      expertTitle: 'Islamic Finance Teacher',
      totalMinutes: 210,
      sessionCount: 6,
      totalSpent: 14000,
      lastConsultationDate: 'Sep 21, 2026'
    },
    {
      id: 'ut-5',
      userName: 'Dr. Hamza Malik',
      userAvatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200',
      expertName: 'Mufti Ahmed Khan',
      expertAvatar: '/avatars/mufti_ahmed.png',
      expertTitle: 'Mufti & Islamic Finance Consultant',
      totalMinutes: 120,
      sessionCount: 3,
      totalSpent: 9000,
      lastConsultationDate: 'Sep 19, 2026'
    }
  ]);

  // Admin Comments & Reviews Management State
  const [adminComments, setAdminComments] = useState<AdminComment[]>([
    {
      id: 'cm-101',
      userName: 'Sheikh Faisal Al-Farooq',
      userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
      targetName: 'Mufti Ahmed Khan',
      targetType: 'expert',
      rating: 5,
      commentText: 'MashaAllah, Mufti Sahib\'s breakdown on modern Islamic finance and stock options saved me from illegal interest contracts. Very knowledgeable!',
      date: 'Sep 25, 2026'
    },
    {
      id: 'cm-102',
      userName: 'Aisha Rahman',
      userAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
      targetName: 'Dr. Saba Fatima',
      targetType: 'expert',
      rating: 5,
      commentText: 'Dr. Saba calculated my Zakat on Gold & Stocks accurately. Very clear and patient explanation. JazakAllah Khair!',
      date: 'Sep 24, 2026'
    },
    {
      id: 'cm-103',
      userName: 'Imran Qureshi',
      userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200',
      targetName: 'Islamic Fiqh Masterclass',
      targetType: 'course',
      rating: 4,
      commentText: 'Very detailed course on Dars-e-Nizami fundamentals. Audio quality could be slightly improved in module 3.',
      date: 'Sep 22, 2026'
    },
    {
      id: 'cm-104',
      userName: 'Spam User 99',
      userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200',
      targetName: 'Maulana Rashid',
      targetType: 'expert',
      rating: 1,
      commentText: 'Irrelevant advertisement spam link http://example-spam.com test comment.',
      date: 'Sep 20, 2026'
    }
  ]);

  const [bookingList, setBookingList] = useState<Booking[]>(bookings);
  const [searchTerm, setSearchTerm] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Pending Applications
  const [pendingApprovals, setPendingApprovals] = useState([
    {
      id: 'app-101',
      name: 'Dr. Tariq Al-Hashimi',
      qualification: 'Takhassus in Fiqh - Al-Azhar University',
      specialization: 'Zakat & Corporate Fiqh',
      appliedDate: 'Sep 15, 2026',
      status: 'pending'
    },
    {
      id: 'app-102',
      name: 'Ustaza Khadija Bint Omar',
      qualification: 'Ijazah in Quranic Tajweed & Hafs',
      specialization: 'Sister\'s Quran & Tajweed',
      appliedDate: 'Sep 14, 2026',
      status: 'pending'
    }
  ]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Toggle Online/Offline Status
  const toggleScholarOnlineStatus = (expertId: string) => {
    setScholarList(prev => prev.map(exp => {
      if (exp.id === expertId) {
        const nextOnline = !exp.isOnline;
        showToast(`${exp.name} is now ${nextOnline ? 'ONLINE 🟢' : 'OFFLINE ⚪'}`);
        return { ...exp, isOnline: nextOnline };
      }
      return exp;
    }));
  };

  // Toggle Block/Unblock Status
  const toggleScholarBlockStatus = (expertId: string) => {
    setScholarList(prev => prev.map(exp => {
      if (exp.id === expertId) {
        const nextBlocked = !exp.isBlocked;
        showToast(`${exp.name} has been ${nextBlocked ? 'BLOCKED 🚫' : 'UNBLOCKED ✅'}`);
        return { 
          ...exp, 
          isBlocked: nextBlocked,
          isOnline: nextBlocked ? false : exp.isOnline // If blocked, set offline automatically
        };
      }
      return exp;
    }));
  };

  // Delete Comment Action
  const handleDeleteComment = (commentId: string) => {
    setAdminComments(prev => prev.filter(c => c.id !== commentId));
    showToast('Comment deleted successfully by Admin.');
  };

  const handleApprove = (appId: string) => {
    setPendingApprovals(prev => prev.filter(a => a.id !== appId));
    showToast('Scholar application approved!');
  };

  // Auto Calculations
  const calculatedTotalRevenue = scholarList.reduce((acc, curr) => acc + curr.totalRevenue, 0);
  const zeroRevenueExpertsCount = scholarList.filter(exp => exp.totalRevenue === 0).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-20 text-slate-800 font-sans">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-3 text-xs font-bold animate-bounce">
          <Zap className="w-4 h-4 text-amber-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Admin Header Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-emerald-950 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="space-y-2 z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider border border-emerald-400/30">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Master Admin Command Center</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black font-heading text-white tracking-tight">
            Welcome Back, Super Admin ({user.name})
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
            Real-time Finance &amp; Revenue Analytics, Expert Payouts, Spending User Records, User Session Tracking &amp; Moderation Controls.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0 z-10">
          <button
            onClick={() => showToast('Financial Data Refreshed!')}
            className="p-2.5 bg-slate-800/80 hover:bg-slate-700 text-slate-200 rounded-xl border border-slate-700 transition-colors"
            title="Refresh Data"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button
            onClick={onLogout}
            className="px-4 py-2.5 bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 font-bold text-xs sm:text-sm rounded-xl border border-rose-500/30 transition-colors"
          >
            Switch Account / Logout
          </button>
        </div>
      </div>

      {/* Executive Key Financial Metrics Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Total Revenue */}
        <div className="bg-gradient-to-br from-emerald-900 via-slate-900 to-slate-950 p-6 rounded-3xl border border-emerald-800/50 shadow-xl text-white space-y-3 relative overflow-hidden group hover:border-emerald-500/60 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-300">Total Revenue</span>
            <div className="p-2.5 rounded-2xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              <DollarSign className="w-6 h-6" />
            </div>
          </div>
          <div className="text-3xl sm:text-4xl font-black font-heading text-white">
            ₹{financials.totalRevenue.toLocaleString('en-IN')}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-extrabold">
            <TrendingUp className="w-4 h-4" />
            <span>+24.5% Auto Calculated</span>
          </div>
        </div>

        {/* Total Profit */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-soft-sm space-y-3 hover:border-blue-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500">Total Profit (30%)</span>
            <div className="p-2.5 rounded-2xl bg-blue-50 text-blue-700">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>
          <div className="text-3xl sm:text-4xl font-black font-heading text-blue-900">
            ₹{financials.totalProfit.toLocaleString('en-IN')}
          </div>
          <span className="inline-block text-[11px] text-blue-700 font-bold bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
            Net Platform Commission
          </span>
        </div>

        {/* Total Loss / Expenses */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-soft-sm space-y-3 hover:border-amber-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500">Loss / Expenses</span>
            <div className="p-2.5 rounded-2xl bg-amber-50 text-amber-700">
              <PieChart className="w-6 h-6" />
            </div>
          </div>
          <div className="text-3xl sm:text-4xl font-black font-heading text-amber-900">
            ₹{financials.totalLoss.toLocaleString('en-IN')}
          </div>
          <span className="text-[11px] text-amber-700 font-bold block">
            ₹310k Scholar Payouts + ₹40k Tech Costs
          </span>
        </div>

        {/* Zero Revenue Alert Badge */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-soft-sm space-y-3 hover:border-rose-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500">Zero Revenue Experts</span>
            <div className="p-2.5 rounded-2xl bg-rose-50 text-rose-600">
              <AlertTriangle className="w-6 h-6" />
            </div>
          </div>
          <div className="text-3xl sm:text-4xl font-black font-heading text-rose-600">
            {zeroRevenueExpertsCount} Scholars
          </div>
          <span className="text-[11px] text-rose-600 font-bold block">
            Requires Nudge / Optimization
          </span>
        </div>

      </div>

      {/* Main Feature Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-200 overflow-x-auto pb-1 scrollbar-none">
        {[
          { id: 'analytics', label: '📊 Behavior Analytics & AI Monitoring', icon: BrainCircuit },
          { id: 'forecast', label: '📈 Revenue Forecasting (AI)', icon: LineChart },
          { id: 'suggestions', label: '💡 New Services & Offers Ideas', icon: Lightbulb },
          { id: 'coupons', label: '🎟️ Coupons & Performance Tracking', icon: Tag },
          { id: 'teacher-manage', label: `👳‍♂️ Teacher Accounts & Credentials (${teachersList.length})`, icon: Key },
          { id: 'finance', label: '💰 Revenue & Finance', icon: DollarSign },
          { id: 'experts', label: `👳‍♂️ Expert Earnings (${scholarList.length})`, icon: Users },
          { id: 'top-users', label: `👑 Top Spending Users (${topUsers.length})`, icon: Award },
          { id: 'time-tracking', label: '⏱️ Session Time Tracker', icon: Clock },
          { id: 'comments', label: `💬 Moderation & Comments (${adminComments.length})`, icon: MessageSquare },
          { id: 'bookings', label: `📅 Bookings (${bookingList.length})`, icon: Calendar },
          { id: 'approvals', label: `🛡️ Approvals (${pendingApprovals.length})`, icon: ShieldCheck },
          { id: 'settings', label: '⚙️ Config', icon: Settings }
        ].map((tab) => {
          const IconComp = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-3 text-xs sm:text-sm font-extrabold transition-all flex items-center gap-2 border-b-2 whitespace-nowrap rounded-t-2xl ${
                isActive
                  ? 'border-emerald-700 text-emerald-950 bg-emerald-50/80 shadow-xs'
                  : 'border-transparent text-slate-500 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <IconComp className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB: ADVANCED ANALYTICS & MONITORING */}
      {activeTab === 'analytics' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-950 rounded-3xl p-6 sm:p-8 text-white border border-indigo-500/30 space-y-3">
            <div className="flex items-center gap-2">
              <BrainCircuit className="w-6 h-6 text-indigo-400" />
              <h2 className="text-xl font-bold font-heading text-indigo-300">Advanced AI User Behavior & High-Demand Analytics</h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl">
              System continuously tracks search terms, expert engagement metrics, high-demand topics, and user activity patterns to generate automated strategic hiring & business recommendations.
            </p>
          </div>

          {/* High-Demand Topics Grid */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold font-heading text-slate-900 flex items-center gap-2">
                <Compass className="w-5 h-5 text-indigo-600" />
                <span>High-Demand Topics & User Search Patterns</span>
              </h3>
              <span className="text-xs text-slate-500">Real-time Search Aggregation</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {topicInsightsData.map(topic => (
                <div key={topic.id} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft-md space-y-4 hover:border-indigo-300 transition-all">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="text-[10px] uppercase font-extrabold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-800 border border-indigo-200">
                        {topic.category}
                      </span>
                      <h4 className="text-base font-bold font-heading text-slate-900 mt-2">{topic.topicName}</h4>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      topic.demandLevel === 'Surging' ? 'bg-rose-100 text-rose-800 border border-rose-300' :
                      topic.demandLevel === 'Very High' ? 'bg-amber-100 text-amber-800 border border-amber-300' :
                      'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    }`}>
                      🔥 {topic.demandLevel} Demand
                    </span>
                  </div>

                  {/* Progress Bar metric */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-slate-600">Search Share Volume</span>
                      <span className="text-indigo-900 font-extrabold">{topic.searchSharePercent}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-indigo-500 to-purple-600 h-full rounded-full transition-all" 
                        style={{ width: `${topic.searchSharePercent}%` }}
                      />
                    </div>
                  </div>

                  {/* Stats Row */}
                  <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100 text-xs">
                    <div>
                      <span className="text-[10px] text-slate-500 font-bold uppercase block">Monthly Growth</span>
                      <span className="font-extrabold text-emerald-700">+{topic.monthlyGrowthPercent}% MoM</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 font-bold uppercase block">Consultations</span>
                      <span className="font-extrabold text-slate-900">{topic.totalConsultationsRequested} Sessions</span>
                    </div>
                  </div>

                  {/* AI Recommendation Alert Card */}
                  <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900 space-y-1">
                    <div className="flex items-center gap-1.5 font-bold text-amber-950">
                      <Sparkles className="w-4 h-4 text-amber-600" />
                      <span>AI Strategic Recommendation:</span>
                    </div>
                    <p className="text-[11px] leading-relaxed text-amber-900 font-medium">
                      "{topic.aiRecommendation}"
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Scholar Engagement Leaderboard */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft-lg space-y-4">
            <h3 className="text-lg font-bold font-heading text-slate-900 flex items-center gap-2">
              <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
              <span>Scholar Engagement & User Demand Leaderboard</span>
            </h3>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-100 text-slate-900 uppercase text-[10px] font-bold">
                  <tr>
                    <th className="p-3">Scholar Name</th>
                    <th className="p-3">Specialization</th>
                    <th className="p-3">User Engagement Score</th>
                    <th className="p-3">Completed Sessions</th>
                    <th className="p-3">Revenue Share</th>
                    <th className="p-3">Demand Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {scholarList.map((scholar, idx) => (
                    <tr key={scholar.id} className="hover:bg-slate-50">
                      <td className="p-3 font-bold text-slate-900 flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-slate-900 text-amber-400 text-[10px] font-bold flex items-center justify-center">
                          #{idx + 1}
                        </span>
                        <span>{scholar.name}</span>
                      </td>
                      <td className="p-3">{scholar.specialization}</td>
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-indigo-700">{98 - idx * 4}%</span>
                          <div className="w-20 bg-slate-200 h-2 rounded-full overflow-hidden">
                            <div className="bg-indigo-600 h-full" style={{ width: `${98 - idx * 4}%` }} />
                          </div>
                        </div>
                      </td>
                      <td className="p-3 font-semibold">{scholar.completedSessions}</td>
                      <td className="p-3 font-extrabold text-emerald-700">₹{scholar.totalRevenue.toLocaleString()}</td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                          {idx === 0 ? '🏆 Highest Scholar Engagement' : 'High Demand'}
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

      {/* TAB: REVENUE FORECASTING */}
      {activeTab === 'forecast' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-950 rounded-3xl p-6 sm:p-8 text-white border border-emerald-500/30 space-y-3">
            <div className="flex items-center gap-2">
              <LineChart className="w-6 h-6 text-emerald-400" />
              <h2 className="text-xl font-bold font-heading text-emerald-300">Predictive AI Revenue Forecasting & Growth Trajectory</h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl">
              Analyzing historical revenue trends from the past 6 months to project future 6-month growth opportunities and revenue milestones.
            </p>
          </div>

          {/* Forecast Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft-sm space-y-2">
              <span className="text-xs text-slate-500 font-bold uppercase">Current Revenue (Sep 2026)</span>
              <div className="text-3xl font-black font-heading text-slate-900">₹500,000</div>
              <span className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                <TrendingUp className="w-4 h-4" /> +13.6% growth rate
              </span>
            </div>

            <div className="bg-gradient-to-br from-emerald-900 to-slate-950 text-white rounded-3xl p-6 border border-emerald-500/40 space-y-2 shadow-xl">
              <span className="text-xs text-emerald-300 font-bold uppercase">Target Q4 Projected Revenue</span>
              <div className="text-3xl font-black font-heading text-amber-400">₹750,000</div>
              <span className="text-xs text-emerald-300 font-bold flex items-center gap-1">
                <Sparkles className="w-4 h-4" /> Projected +50% total expansion
              </span>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft-sm space-y-2">
              <span className="text-xs text-slate-500 font-bold uppercase">Annualized Revenue Run-Rate</span>
              <div className="text-3xl font-black font-heading text-slate-900">₹6,800,000</div>
              <span className="text-xs text-indigo-600 font-bold">Based on AI trend extrapolation</span>
            </div>
          </div>

          {/* Revenue Forecast Table & Trend Visualization */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft-lg space-y-6">
            <h3 className="text-lg font-bold font-heading text-slate-900">Historical & Future Projected Revenue Breakdown</h3>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-100 text-slate-900 uppercase text-[10px] font-bold">
                  <tr>
                    <th className="p-3">Month / Period</th>
                    <th className="p-3">Type</th>
                    <th className="p-3">Projected Revenue</th>
                    <th className="p-3">Growth Rate</th>
                    <th className="p-3">Primary Growth Driver</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {revenueForecastsData.map((rf, idx) => (
                    <tr key={idx} className={rf.type === 'projected' ? 'bg-amber-50/40 hover:bg-amber-50' : 'hover:bg-slate-50'}>
                      <td className="p-3 font-bold text-slate-900">{rf.period}</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          rf.type === 'projected' ? 'bg-amber-200 text-amber-900' : 'bg-slate-200 text-slate-800'
                        }`}>
                          {rf.type === 'projected' ? '🔮 AI Projected' : '📜 Historical'}
                        </span>
                      </td>
                      <td className="p-3 font-extrabold text-emerald-800 text-sm">₹{rf.projectedRevenue.toLocaleString()}</td>
                      <td className="p-3 font-bold text-emerald-600">+{rf.growthPercentage}%</td>
                      <td className="p-3 font-medium text-slate-600">{rf.keyDriver}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB: NEW SERVICES & OFFER SUGGESTIONS */}
      {activeTab === 'suggestions' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          <div className="bg-gradient-to-r from-amber-950 via-slate-900 to-slate-950 rounded-3xl p-6 sm:p-8 text-white border border-amber-500/30 space-y-3">
            <div className="flex items-center gap-2">
              <Lightbulb className="w-6 h-6 text-amber-400" />
              <h2 className="text-xl font-bold font-heading text-amber-300">AI New Service & Course Offer Ideas</h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl">
              System analyzes user searches, unanswered queries, and high-demand topics to suggest concrete new consultation services and masterclasses to launch.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {serviceSuggestionsData.map(sug => (
              <div key={sug.id} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft-md space-y-4 flex flex-col justify-between hover:shadow-xl transition-all">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-md bg-amber-100 text-amber-900 uppercase">
                      {sug.category}
                    </span>
                    <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      Interest Score: {sug.userInterestScore}%
                    </span>
                  </div>

                  <h3 className="text-base font-bold font-heading text-slate-900">{sug.title}</h3>
                  <span className="inline-block px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 text-[11px] font-extrabold border border-slate-200">
                    Format: {sug.suggestedType}
                  </span>

                  <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 space-y-1 text-xs">
                    <span className="text-[10px] font-bold text-slate-500 uppercase block">Top User Search Triggers</span>
                    <div className="flex flex-wrap gap-1 pt-1">
                      {sug.searchQueries.map((q, i) => (
                        <span key={i} className="px-2 py-0.5 bg-white border border-slate-200 rounded text-[10px] text-slate-700 font-mono">
                          "{q}"
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-100 space-y-1 text-xs">
                    <span className="text-[10px] font-bold text-emerald-800 uppercase block">Estimated Revenue Impact</span>
                    <span className="text-sm font-black text-emerald-900 font-heading">{sug.expectedRevenueImpact}</span>
                  </div>
                </div>

                <button 
                  onClick={() => showToast(`Initiated creation of "${sug.title}" service draft!`)}
                  className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-amber-400 font-extrabold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-md"
                >
                  <Plus className="w-4 h-4" />
                  <span>Launch Recommended Service</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB: COUPONS & PROMO OFFERS HUB */}
      {activeTab === 'coupons' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          
          {/* Admin Coupon Creator Form */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft-lg max-w-3xl space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <Tag className="w-6 h-6 text-emerald-600" />
                <h2 className="text-lg font-bold font-heading text-slate-900">Admin Platform-Wide Coupon Creator</h2>
              </div>
              <p className="text-xs text-slate-500 mt-1">Create site-wide promotional discount codes applicable to all scholar sessions and courses.</p>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              if (!adminCouponCode.trim()) {
                showToast('Please enter a coupon code');
                return;
              }
              const newCoupon: Coupon = {
                id: `cp-${Date.now()}`,
                code: adminCouponCode.toUpperCase().trim(),
                teacherName: 'System Admin',
                teacherId: 'admin',
                discountPercent: parseInt(adminDiscountPercent) || 20,
                validUntil: adminValidUntil,
                maxUses: parseInt(adminMaxUses) || 100,
                usedCount: 0,
                targetCourseOrService: adminTargetScope,
                isActive: true,
                createdAt: new Date().toISOString().split('T')[0]
              };
              setGlobalCoupons([newCoupon, ...globalCoupons]);
              if (onAddCoupon) onAddCoupon(newCoupon);
              showToast(`Site-wide Coupon "${newCoupon.code}" created!`);
              setAdminCouponCode('');
            }} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Coupon Code</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. SPECIAL50"
                    value={adminCouponCode}
                    onChange={(e) => setAdminCouponCode(e.target.value)}
                    className="w-full p-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 font-mono uppercase font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Discount (%)</label>
                  <input
                    type="number"
                    required
                    min="5"
                    max="90"
                    value={adminDiscountPercent}
                    onChange={(e) => setAdminDiscountPercent(e.target.value)}
                    className="w-full p-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Valid Until</label>
                  <input
                    type="date"
                    required
                    value={adminValidUntil}
                    onChange={(e) => setAdminValidUntil(e.target.value)}
                    className="w-full p-2.5 text-xs rounded-xl border border-slate-300"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Max Uses Limit</label>
                  <input
                    type="number"
                    required
                    value={adminMaxUses}
                    onChange={(e) => setAdminMaxUses(e.target.value)}
                    className="w-full p-2.5 text-xs rounded-xl border border-slate-300 font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Target Scope</label>
                  <input
                    type="text"
                    required
                    value={adminTargetScope}
                    onChange={(e) => setAdminTargetScope(e.target.value)}
                    className="w-full p-2.5 text-xs rounded-xl border border-slate-300"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-xl text-xs transition-all flex items-center gap-2 shadow-md"
              >
                <Plus className="w-4 h-4" />
                <span>Publish Global Platform Coupon</span>
              </button>
            </form>
          </div>

          {/* Master Coupons Table with Student Redemption History Tracking */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft-lg space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold font-heading text-slate-900">All System & Teacher Coupons Performance</h3>
                <p className="text-xs text-slate-500">Monitor coupon redemptions, creator scholars, validity dates, and revenue generated.</p>
              </div>
              <span className="text-xs font-bold bg-amber-100 text-amber-900 px-3 py-1 rounded-full border border-amber-300">
                {globalCoupons.length} Coupons Total
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-100 text-slate-900 uppercase text-[10px] font-bold">
                  <tr>
                    <th className="p-3">Coupon Code</th>
                    <th className="p-3">Created By</th>
                    <th className="p-3">Discount</th>
                    <th className="p-3">Expiry Date</th>
                    <th className="p-3">Redemptions</th>
                    <th className="p-3">Revenue Impact</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Actions / History</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {globalCoupons.map((cp) => (
                    <tr key={cp.id} className="hover:bg-slate-50">
                      <td className="p-3">
                        <span className="font-mono font-extrabold text-slate-900 bg-amber-100 border border-amber-300 px-2.5 py-1 rounded text-xs">
                          {cp.code}
                        </span>
                      </td>
                      <td className="p-3 font-semibold text-slate-900">
                        {cp.teacherName || 'System Admin'}
                        <br/>
                        <span className="text-[10px] text-slate-400">Target: {cp.targetCourseOrService}</span>
                      </td>
                      <td className="p-3 font-bold text-emerald-700">{cp.discountPercent}% OFF</td>
                      <td className="p-3 font-medium text-slate-700">Expiry: {cp.validUntil}</td>
                      <td className="p-3">
                        <div className="space-y-1">
                          <span className="font-bold text-slate-900">Used: {cp.usedCount} / {cp.maxUses} times</span>
                          <div className="w-24 bg-slate-200 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-emerald-600 h-full" style={{ width: `${Math.min(100, (cp.usedCount / cp.maxUses) * 100)}%` }} />
                          </div>
                        </div>
                      </td>
                      <td className="p-3 font-black text-emerald-800 text-sm">
                        ₹{(cp.totalRevenueGenerated || (cp.usedCount * 2500)).toLocaleString()}
                      </td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          cp.isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {cp.isActive ? 'Active' : 'Disabled'}
                        </span>
                      </td>
                      <td className="p-3 text-right space-x-2">
                        <button
                          onClick={() => setSelectedCouponRedemptions(cp)}
                          className="px-2.5 py-1 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-800 text-[10px] font-bold border border-indigo-200"
                        >
                          View Student Redemptions ({cp.redemptions?.length || cp.usedCount})
                        </button>
                        <button
                          onClick={() => {
                            setGlobalCoupons(prev => prev.map(c => c.id === cp.id ? { ...c, isActive: !c.isActive } : c));
                            showToast(`Coupon ${cp.code} status updated.`);
                          }}
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

          {/* Student Redemption History Modal / Drawer */}
          {selectedCouponRedemptions && (
            <div className="bg-slate-900 text-white rounded-3xl p-6 border border-slate-800 space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <Tag className="w-5 h-5 text-amber-400" />
                  <h4 className="text-base font-bold font-heading text-amber-300">
                    Student Redemption History for Coupon "{selectedCouponRedemptions.code}"
                  </h4>
                </div>
                <button
                  onClick={() => setSelectedCouponRedemptions(null)}
                  className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-bold"
                >
                  Close History
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 bg-slate-950 rounded-2xl border border-slate-800 text-xs">
                <div>
                  <span className="text-slate-400 font-semibold block">Created By:</span>
                  <span className="font-extrabold text-amber-300">{selectedCouponRedemptions.teacherName}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold block">Usage Rate:</span>
                  <span className="font-extrabold text-white">{selectedCouponRedemptions.usedCount} of {selectedCouponRedemptions.maxUses} times</span>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold block">Valid Expiry:</span>
                  <span className="font-extrabold text-emerald-400">{selectedCouponRedemptions.validUntil}</span>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] font-bold">
                    <tr>
                      <th className="p-3">Student Name</th>
                      <th className="p-3">Email</th>
                      <th className="p-3">Redemption Date & Time</th>
                      <th className="p-3">Service Booked</th>
                      <th className="p-3">Discount Saved</th>
                      <th className="p-3 text-right">Final Paid</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {(selectedCouponRedemptions.redemptions || [
                      { id: 'rd-1', studentName: 'Zaid Al-Harbi', studentEmail: 'zaid@example.com', redeemedAt: '2026-09-28 14:30', serviceOrCourse: 'Islamic Finance Consultation', originalPrice: 45, discountSaved: 9, finalAmountPaid: 36 },
                      { id: 'rd-2', studentName: 'Fatima Zahra', studentEmail: 'fatima@example.com', redeemedAt: '2026-09-27 11:15', serviceOrCourse: 'Crypto Halal Verification', originalPrice: 50, discountSaved: 10, finalAmountPaid: 40 },
                      { id: 'rd-3', studentName: 'Tariq Al-Mansoor', studentEmail: 'tariq.student@example.com', redeemedAt: '2026-09-25 09:00', serviceOrCourse: 'Halal Stock Portfolio Audit', originalPrice: 60, discountSaved: 12, finalAmountPaid: 48 }
                    ]).map(rd => (
                      <tr key={rd.id}>
                        <td className="p-3 font-bold text-white">{rd.studentName}</td>
                        <td className="p-3 font-mono text-slate-400 text-[11px]">{rd.studentEmail}</td>
                        <td className="p-3 text-slate-400">{rd.redeemedAt}</td>
                        <td className="p-3 font-medium text-amber-300">{rd.serviceOrCourse}</td>
                        <td className="p-3 font-bold text-amber-400">-₹{rd.discountSaved}</td>
                        <td className="p-3 font-extrabold text-emerald-400 text-right">₹{rd.finalAmountPaid}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB: TEACHER ACCOUNTS & CREDENTIAL GENERATOR */}
      {activeTab === 'teacher-manage' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          
          {/* Header & Onboard Form */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft-lg space-y-6">
            <div className="border-b border-slate-100 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <Key className="w-6 h-6 text-amber-600" />
                  <h2 className="text-xl font-bold font-heading text-slate-900">Onboard & Register New Teacher / Scholar Account</h2>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Admin can register scholars and suggest secure Login Usernames & Passwords for direct portal access.
                </p>
              </div>
            </div>

            <form onSubmit={handleRegisterTeacherSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Teacher Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Mufti Muhammad Ahmed"
                    value={teacherName}
                    onChange={(e) => setTeacherName(e.target.value)}
                    className="w-full p-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="teacher@steadfastdeen.com"
                    value={teacherEmail}
                    onChange={(e) => setTeacherEmail(e.target.value)}
                    className="w-full p-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Scholar Title</label>
                  <input
                    type="text"
                    required
                    value={teacherTitle}
                    onChange={(e) => setTeacherTitle(e.target.value)}
                    className="w-full p-2.5 text-xs rounded-xl border border-slate-300"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Specialization</label>
                  <input
                    type="text"
                    required
                    value={teacherSpec}
                    onChange={(e) => setTeacherSpec(e.target.value)}
                    className="w-full p-2.5 text-xs rounded-xl border border-slate-300"
                  />
                </div>
              </div>

              {/* AUTO CREDENTIAL GENERATOR BOX */}
              <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200/90 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-extrabold text-amber-950">
                    <Key className="w-4 h-4 text-amber-600" />
                    <span>Login Credentials Suggestion Generator</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleAutoSuggestCredentials}
                    className="px-3 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-extrabold rounded-lg shadow-xs transition-colors flex items-center gap-1"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Suggest Username & Password</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Suggested Username</label>
                    <input
                      type="text"
                      placeholder="e.g. teacher_ahmed"
                      value={suggestedUsername}
                      onChange={(e) => setSuggestedUsername(e.target.value)}
                      className="w-full p-2.5 text-xs rounded-xl border border-amber-300 bg-white font-mono font-bold text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Suggested Password</label>
                    <input
                      type="text"
                      placeholder="e.g. DeenPass9021#"
                      value={suggestedPassword}
                      onChange={(e) => setSuggestedPassword(e.target.value)}
                      className="w-full p-2.5 text-xs rounded-xl border border-amber-300 bg-white font-mono font-bold text-slate-900"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="px-6 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold rounded-xl text-xs transition-all shadow-md flex items-center gap-2"
              >
                <UserCheck className="w-4 h-4" />
                <span>Register Teacher Account & Save Credentials</span>
              </button>
            </form>
          </div>

          {/* Registered Teachers List Table */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft-lg space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold font-heading text-slate-900">Active Onboarded Teachers & Login Details</h3>
              <span className="text-xs font-bold text-slate-500">{teachersList.length} Teachers Onboarded</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-100 text-slate-900 uppercase text-[10px] font-bold">
                  <tr>
                    <th className="p-3">Teacher / Scholar</th>
                    <th className="p-3">Login Username</th>
                    <th className="p-3">Password Credential</th>
                    <th className="p-3">Students</th>
                    <th className="p-3">Total Earnings</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Admin Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {teachersList.map((t) => (
                    <tr key={t.id} className="hover:bg-slate-50">
                      <td className="p-3 font-bold text-slate-900">
                        {t.name}
                        <br/>
                        <span className="text-[10px] text-slate-400 font-normal">{t.title}</span>
                      </td>
                      <td className="p-3 font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded text-[11px] inline-block mt-2">
                        {t.username}
                      </td>
                      <td className="p-3 font-mono text-slate-900 bg-amber-50 px-2 py-0.5 rounded text-[11px] font-bold">
                        {t.passwordSuggestion}
                      </td>
                      <td className="p-3 font-semibold">{t.totalStudents.toLocaleString()}</td>
                      <td className="p-3 font-extrabold text-emerald-700">₹{t.totalRevenue.toLocaleString()}</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          t.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                        }`}>
                          {t.status}
                        </span>
                      </td>
                      <td className="p-3 text-right space-x-2">
                        <button
                          onClick={() => {
                            setTeachersList(prev => prev.map(item => item.id === t.id ? { ...item, status: item.status === 'Active' ? 'Suspended' : 'Active' } : item));
                            showToast(`Teacher ${t.name} status changed.`);
                          }}
                          className="px-2.5 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 text-[10px] font-bold"
                        >
                          {t.status === 'Active' ? 'Suspend' : 'Activate'}
                        </button>
                        <button
                          onClick={() => {
                            setTeachersList(prev => prev.filter(item => item.id !== t.id));
                            showToast(`Teacher ${t.name} account deleted.`);
                          }}
                          className="px-2.5 py-1 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200 text-[10px] font-bold"
                        >
                          Delete
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
      {activeTab === 'finance' && (
        <div className="space-y-6">
          
          {/* Main Financial Summary Breakdown Card */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-soft-md space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
              <div>
                <h2 className="text-xl font-black font-heading text-slate-900 flex items-center gap-2">
                  <BarChart3 className="w-6 h-6 text-emerald-600" />
                  <span>Automatic System Finance Dashboard</span>
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Automated revenue aggregation calculated across 1-on-1 consultations and course enrollments.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black border border-emerald-300">
                  Status: Balanced &amp; Verified
                </span>
              </div>
            </div>

            {/* Financial Example Breakdown Card */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 space-y-2">
                <div className="text-xs uppercase font-bold text-slate-400">Total System Revenue</div>
                <div className="text-3xl font-black text-emerald-400 font-heading">
                  ₹{financials.totalRevenue.toLocaleString('en-IN')}
                </div>
                <p className="text-[11px] text-slate-400 leading-tight">
                  Gross payments processed via UPI, Bank Transfer &amp; Cards.
                </p>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-2xl space-y-2">
                <div className="text-xs uppercase font-bold text-emerald-800">Net Platform Profit</div>
                <div className="text-3xl font-black text-emerald-900 font-heading">
                  ₹{financials.totalProfit.toLocaleString('en-IN')}
                </div>
                <p className="text-[11px] text-emerald-700 leading-tight">
                  30% retained platform fee after scholar split &amp; ops.
                </p>
              </div>

              <div className="bg-amber-50 border border-amber-200 p-6 rounded-2xl space-y-2">
                <div className="text-xs uppercase font-bold text-amber-800">Total Loss / Expenses</div>
                <div className="text-3xl font-black text-amber-900 font-heading">
                  ₹{financials.totalLoss.toLocaleString('en-IN')}
                </div>
                <p className="text-[11px] text-amber-700 leading-tight">
                  ₹310,000 Teacher Payouts + ₹40,000 Servers &amp; Gateways.
                </p>
              </div>

            </div>

            {/* Financial Split Visual Bar */}
            <div className="space-y-2 pt-4">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                <span>Revenue Distribution Ratio</span>
                <span>₹500,000 Total</span>
              </div>
              <div className="w-full h-5 bg-slate-100 rounded-full overflow-hidden flex shadow-inner">
                <div 
                  className="bg-emerald-500 h-full flex items-center justify-center text-[10px] font-black text-white" 
                  style={{ width: '62%' }} 
                  title="Teacher Payouts (62%)"
                >
                  Expert Payouts (₹310k)
                </div>
                <div 
                  className="bg-blue-600 h-full flex items-center justify-center text-[10px] font-black text-white" 
                  style={{ width: '30%' }} 
                  title="Net Profit (30%)"
                >
                  Net Profit (₹150k)
                </div>
                <div 
                  className="bg-amber-500 h-full flex items-center justify-center text-[10px] font-black text-white" 
                  style={{ width: '8%' }} 
                  title="Server & Support (8%)"
                >
                  Tech (₹40k)
                </div>
              </div>
            </div>

            {/* Monthly Growth Breakdown Matrix */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-100">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                <span className="text-[11px] font-bold text-slate-500 block">Q1 Revenue (Jan-Mar)</span>
                <span className="text-lg font-black text-slate-900">₹3,50,000</span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                <span className="text-[11px] font-bold text-slate-500 block">Q2 Revenue (Apr-Jun)</span>
                <span className="text-lg font-black text-slate-900">₹1,50,000</span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                <span className="text-[11px] font-bold text-slate-500 block">Average Session Cost</span>
                <span className="text-lg font-black text-emerald-700">₹1,250</span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                <span className="text-[11px] font-bold text-slate-500 block">Platform Commission</span>
                <span className="text-lg font-black text-blue-700">20% - 30%</span>
              </div>
            </div>

          </div>

          {/* Quick Expert Revenue Breakdown Snapshot */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-soft-sm space-y-4">
            <h3 className="text-base font-black font-heading text-slate-900 flex items-center justify-between">
              <span>Teacher Revenue Leaderboard Snapshot</span>
              <button onClick={() => setActiveTab('experts')} className="text-xs text-emerald-700 font-extrabold hover:underline flex items-center gap-1">
                View Full Breakdown <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {scholarList.slice(0, 3).map((exp, idx) => (
                <div key={exp.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-700 text-white font-black text-xs flex items-center justify-center">
                      #{idx + 1}
                    </div>
                    <div>
                      <h4 className="font-extrabold text-xs text-slate-900">{exp.name}</h4>
                      <p className="text-[10px] text-slate-500">{exp.totalSessions} Sessions Booked</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-black text-emerald-700 block">₹{exp.totalRevenue.toLocaleString('en-IN')}</span>
                    <span className="text-[10px] text-slate-400">Generated</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: Expert Earnings & Status & Blocking */}
      {activeTab === 'experts' && (
        <div className="space-y-6">
          
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200">
            <div className="relative w-full sm:w-80">
              <input
                type="text"
                placeholder="Search expert by name or specialization..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>

            <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
              <span className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200">
                🟢 {scholarList.filter(e => e.isOnline).length} Online
              </span>
              <span className="px-3 py-1.5 rounded-xl bg-rose-50 text-rose-800 border border-rose-200">
                🚫 {scholarList.filter(e => e.isBlocked).length} Blocked
              </span>
              <span className="px-3 py-1.5 rounded-xl bg-amber-50 text-amber-800 border border-amber-200">
                ⚠️ {zeroRevenueExpertsCount} Zero Revenue
              </span>
            </div>
          </div>

          {/* Zero Revenue Experts Special Alert Banner */}
          {zeroRevenueExpertsCount > 0 && (
            <div className="bg-amber-50 border border-amber-200 rounded-3xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-2xl bg-amber-200/60 text-amber-900 shrink-0">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-amber-950">Zero Revenue Experts Detected ({zeroRevenueExpertsCount})</h4>
                  <p className="text-xs text-amber-800 mt-0.5">
                    The following experts haven't generated any income yet: <span className="font-bold">Ustadh Tariq Aziz</span> &amp; <span className="font-bold">Mufti Bilal Siddiqui</span>. Admin can send profile optimization alerts or update slots.
                  </p>
                </div>
              </div>

              <button 
                onClick={() => showToast('Nudge sent to zero-revenue experts!')}
                className="px-4 py-2 bg-amber-900 hover:bg-amber-950 text-amber-100 font-bold text-xs rounded-xl shadow-xs shrink-0"
              >
                Send Optimization Reminder
              </button>
            </div>
          )}

          {/* Experts Table */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-soft-sm overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-base font-extrabold font-heading text-slate-900">
                All Registered Experts Revenue &amp; Status ({scholarList.length})
              </h3>
              <span className="text-xs text-slate-500 font-bold">Auto Revenue Split 80/20</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200 uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="p-4">Teacher / Expert</th>
                    <th className="p-4">Generated Revenue</th>
                    <th className="p-4">Total Sessions</th>
                    <th className="p-4">Online Status</th>
                    <th className="p-4">Account Status</th>
                    <th className="p-4 text-right">Admin Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {scholarList
                    .filter(exp => exp.name.toLowerCase().includes(searchTerm.toLowerCase()) || exp.specialization.toLowerCase().includes(searchTerm.toLowerCase()))
                    .map((exp) => (
                      <tr key={exp.id} className={`hover:bg-slate-50/80 transition-colors ${exp.isBlocked ? 'bg-rose-50/30' : ''}`}>
                        
                        <td className="p-4 flex items-center gap-3">
                          <img src={exp.avatar} alt={exp.name} className="w-10 h-10 rounded-full object-cover border" />
                          <div>
                            <div className="font-extrabold text-slate-900 text-sm flex items-center gap-1">
                              {exp.name}
                              {exp.verified && <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 fill-blue-600" />}
                            </div>
                            <span className="text-[11px] text-slate-400">{exp.specialization}</span>
                          </div>
                        </td>

                        {/* Generated Revenue */}
                        <td className="p-4 font-black text-sm">
                          {exp.totalRevenue > 0 ? (
                            <span className="text-emerald-700">₹{exp.totalRevenue.toLocaleString('en-IN')}</span>
                          ) : (
                            <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-500 text-[10px] font-bold border border-slate-200">
                              ₹0 (No Revenue)
                            </span>
                          )}
                        </td>

                        {/* Total Sessions */}
                        <td className="p-4 font-bold text-slate-800">
                          {exp.totalSessions} Sessions
                        </td>

                        {/* Online / Offline Status */}
                        <td className="p-4">
                          <button
                            onClick={() => toggleScholarOnlineStatus(exp.id)}
                            disabled={exp.isBlocked}
                            className={`px-3 py-1 rounded-full text-[11px] font-extrabold flex items-center gap-1.5 transition-all ${
                              exp.isOnline
                                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 hover:bg-emerald-200'
                                : 'bg-slate-100 text-slate-600 border border-slate-300 hover:bg-slate-200'
                            } ${exp.isBlocked ? 'opacity-50 cursor-not-allowed' : ''}`}
                            title="Click to toggle Online/Offline status"
                          >
                            <span className={`w-2 h-2 rounded-full ${exp.isOnline ? 'bg-emerald-500 animate-ping' : 'bg-slate-400'}`} />
                            {exp.isOnline ? 'Online' : 'Offline'}
                          </button>
                        </td>

                        {/* Block Status */}
                        <td className="p-4">
                          {exp.isBlocked ? (
                            <span className="px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-[11px] font-black border border-rose-300 inline-flex items-center gap-1">
                              <Ban className="w-3 h-3 text-rose-600" /> BLOCKED
                            </span>
                          ) : (
                            <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-bold border border-emerald-200">
                              Active Scholar
                            </span>
                          )}
                        </td>

                        {/* Actions */}
                        <td className="p-4 text-right space-x-2">
                          <button
                            onClick={() => toggleScholarBlockStatus(exp.id)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors inline-flex items-center gap-1 ${
                              exp.isBlocked
                                ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                                : 'bg-rose-100 hover:bg-rose-200 text-rose-700'
                            }`}
                          >
                            {exp.isBlocked ? (
                              <>
                                <Unlock className="w-3 h-3" /> Unblock Expert
                              </>
                            ) : (
                              <>
                                <Ban className="w-3 h-3" /> Block Expert
                              </>
                            )}
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

      {/* TAB 3: Top Spending Users */}
      {activeTab === 'top-users' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-soft-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-base font-black font-heading text-slate-900 flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-500" />
                  <span>Highest Spending Users Leaderboard</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Tracks users spending maximum money on 1-on-1 expert consultations and premium Islamic courses.
                </p>
              </div>

              <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold border border-amber-300">
                Top Spenders System Sync
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200 uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="p-4">Rank &amp; User</th>
                    <th className="p-4">Total Money Spent</th>
                    <th className="p-4">Bookings &amp; Hours</th>
                    <th className="p-4">Courses Enrolled</th>
                    <th className="p-4">User Status</th>
                    <th className="p-4">Last Active</th>
                    <th className="p-4 text-right">Admin Control</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {topUsers.map((usr, index) => (
                    <tr key={usr.id} className="hover:bg-slate-50/80 transition-colors">
                      
                      <td className="p-4 flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full font-black text-xs flex items-center justify-center ${
                          index === 0 ? 'bg-amber-400 text-amber-950' : index === 1 ? 'bg-slate-300 text-slate-900' : 'bg-amber-800 text-white'
                        }`}>
                          #{index + 1}
                        </div>
                        <img src={usr.avatar} alt={usr.name} className="w-10 h-10 rounded-full object-cover border" />
                        <div>
                          <div className="font-extrabold text-slate-900 text-sm">{usr.name}</div>
                          <span className="text-[11px] text-slate-400">{usr.email}</span>
                        </div>
                      </td>

                      <td className="p-4 font-black text-base text-emerald-700">
                        ₹{usr.totalSpent.toLocaleString('en-IN')}
                      </td>

                      <td className="p-4 font-bold text-slate-800">
                        {usr.totalSessions} Sessions ({usr.totalHours} hrs)
                      </td>

                      <td className="p-4 font-semibold text-slate-700">
                        {usr.coursesPurchased} Courses
                      </td>

                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black border ${
                          usr.status === 'Blocked' ? 'bg-rose-100 text-rose-900 border-rose-300' :
                          usr.status === 'Restricted' ? 'bg-amber-100 text-amber-900 border-amber-300' :
                          usr.status === 'VIP' ? 'bg-amber-100 text-amber-900 border-amber-300' : 'bg-blue-100 text-blue-900 border-blue-300'
                        }`}>
                          {usr.status} MEMBER
                        </span>
                      </td>

                      <td className="p-4 font-medium text-slate-500">
                        {usr.lastActive}
                      </td>

                      <td className="p-4 text-right space-x-2">
                        <button
                          onClick={() => {
                            setTopUsers(prev => prev.map(u => u.id === usr.id ? { ...u, status: u.status === 'Restricted' ? 'VIP' : 'Restricted' } : u));
                            showToast(`User ${usr.name} status updated.`);
                          }}
                          className="px-2.5 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 text-[11px] font-bold"
                        >
                          {usr.status === 'Restricted' ? 'Unrestrict' : 'Restrict'}
                        </button>
                        <button
                          onClick={() => {
                            setTopUsers(prev => prev.map(u => u.id === usr.id ? { ...u, status: u.status === 'Blocked' ? 'VIP' : 'Blocked' } : u));
                            showToast(`User ${usr.name} status updated.`);
                          }}
                          className="px-2.5 py-1 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200 text-[11px] font-bold"
                        >
                          {usr.status === 'Blocked' ? 'Unblock' : 'Block'}
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

      {/* TAB 4: User-Expert Consultation Time Tracking */}
      {activeTab === 'time-tracking' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-soft-sm space-y-4">
            <div className="border-b border-slate-100 pb-4">
              <h3 className="text-base font-black font-heading text-slate-900 flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-600" />
                <span>User &amp; Expert Consultation Time Tracking System</span>
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Monitors exact session time and duration spent between registered users and scholars.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200 uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="p-4">User</th>
                    <th className="p-4">Expert / Scholar</th>
                    <th className="p-4">Total Time Spent</th>
                    <th className="p-4">Sessions Count</th>
                    <th className="p-4">Total Consultation Cost</th>
                    <th className="p-4 text-right">Last Session</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {sessionTimes.map((st) => (
                    <tr key={st.id} className="hover:bg-slate-50/80 transition-colors">
                      
                      <td className="p-4 flex items-center gap-3">
                        <img src={st.userAvatar} alt={st.userName} className="w-9 h-9 rounded-full object-cover border" />
                        <span className="font-extrabold text-slate-900 text-xs">{st.userName}</span>
                      </td>

                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <img src={st.expertAvatar} alt={st.expertName} className="w-8 h-8 rounded-full object-cover border" />
                          <div>
                            <span className="font-bold text-slate-900 text-xs block">{st.expertName}</span>
                            <span className="text-[10px] text-slate-400">{st.expertTitle}</span>
                          </div>
                        </div>
                      </td>

                      <td className="p-4 font-black text-blue-700">
                        {st.totalMinutes} Mins ({ (st.totalMinutes / 60).toFixed(1) } Hours)
                      </td>

                      <td className="p-4 font-bold text-slate-800">
                        {st.sessionCount} Sessions
                      </td>

                      <td className="p-4 font-black text-emerald-700">
                        ₹{st.totalSpent.toLocaleString('en-IN')}
                      </td>

                      <td className="p-4 text-right text-slate-500 font-medium">
                        {st.lastConsultationDate}
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        </div>
      )}

      {/* TAB 5: Moderation & Comment Deletion */}
      {activeTab === 'comments' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-soft-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-base font-black font-heading text-slate-900 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-purple-600" />
                  <span>User Comments &amp; Review Moderation Panel</span>
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Review and moderate public reviews left on expert profiles and courses. Admin can delete any comment.
                </p>
              </div>

              <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-bold border border-purple-200">
                {adminComments.length} Comments Total
              </span>
            </div>

            <div className="space-y-3">
              {adminComments.map((comment) => (
                <div key={comment.id} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-purple-200 transition-all">
                  
                  <div className="flex items-start gap-3">
                    <img src={comment.userAvatar} alt={comment.userName} className="w-10 h-10 rounded-full object-cover border shrink-0" />
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-xs text-slate-900">{comment.userName}</span>
                        <span className="text-[10px] text-slate-400">commented on</span>
                        <span className="text-xs font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md border border-purple-200">
                          {comment.targetName} ({comment.targetType})
                        </span>
                      </div>

                      <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                        {Array.from({ length: comment.rating }).map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        ))}
                        <span className="text-[10px] text-slate-400 ml-1 font-normal">• {comment.date}</span>
                      </div>

                      <p className="text-xs text-slate-700 italic bg-white p-2.5 rounded-xl border border-slate-200">
                        "{comment.commentText}"
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0 text-right">
                    <button
                      onClick={() => handleDeleteComment(comment.id)}
                      className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-1.5"
                    >
                      <Trash2 className="w-4 h-4" /> Delete Comment
                    </button>
                  </div>

                </div>
              ))}

              {adminComments.length === 0 && (
                <p className="text-center text-xs text-slate-400 py-8">No comments found in moderation queue.</p>
              )}
            </div>

          </div>
        </div>
      )}

      {/* TAB 6: Consultation Sessions */}
      {activeTab === 'bookings' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4 shadow-soft-sm">
          <h3 className="text-base font-black font-heading text-slate-900">Live Consultation Sessions ({bookingList.length})</h3>
          <div className="space-y-3">
            {bookingList.map((b) => (
              <div key={b.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img src={b.expertAvatar} alt={b.expertName} className="w-12 h-12 rounded-xl object-cover border" />
                  <div>
                    <h4 className="text-sm font-extrabold text-slate-900">{b.expertName} &amp; {b.userName}</h4>
                    <p className="text-xs text-slate-500">{b.date} • {b.timeSlot} • Method: <span className="font-bold uppercase text-emerald-700">{b.consultationType}</span></p>
                    <p className="text-xs text-slate-700 italic mt-1">"{b.question}"</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200">
                    {b.status.toUpperCase()}
                  </span>
                  <button 
                    onClick={() => onNavigate('chat', { expertId: b.expertId })}
                    className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-xs"
                  >
                    Open Session
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 7: Pending Approvals */}
      {activeTab === 'approvals' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4 shadow-soft-sm">
          <h3 className="text-base font-black font-heading text-slate-900">Scholar Credential Approval Queue ({pendingApprovals.length})</h3>
          
          {pendingApprovals.length > 0 ? (
            <div className="space-y-3">
              {pendingApprovals.map((app) => (
                <div key={app.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <h4 className="text-sm font-extrabold text-slate-900">{app.name}</h4>
                    <p className="text-xs text-emerald-700 font-semibold">{app.qualification}</p>
                    <p className="text-xs text-slate-500">Specialization: {app.specialization} • Applied: {app.appliedDate}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => handleApprove(app.id)}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-1"
                    >
                      <Check className="w-3.5 h-3.5" /> Approve Scholar
                    </button>
                    <button 
                      onClick={() => handleApprove(app.id)}
                      className="px-4 py-2 bg-rose-100 hover:bg-rose-200 text-rose-700 font-bold text-xs rounded-xl"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-500 py-6 text-center">No pending scholar approval applications.</p>
          )}
        </div>
      )}

      {/* TAB 8: Settings */}
      {activeTab === 'settings' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4 shadow-soft-sm max-w-2xl">
          <h3 className="text-base font-black font-heading text-slate-900">Platform System Settings</h3>
          <div className="space-y-4 text-xs">
            <div className="space-y-1">
              <label className="font-bold text-slate-700">Platform Commission Rate (%)</label>
              <input type="number" defaultValue={20} className="w-full p-2.5 rounded-xl border border-slate-300 font-bold" />
            </div>
            <div className="space-y-1">
              <label className="font-bold text-slate-700">Default Free Consultation Duration</label>
              <input type="text" defaultValue="First 5 Minutes Free" className="w-full p-2.5 rounded-xl border border-slate-300 font-bold" />
            </div>
            <button 
              onClick={() => showToast('Admin configuration saved!')}
              className="px-6 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold rounded-xl shadow-sm"
            >
              Save Admin Configuration
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
