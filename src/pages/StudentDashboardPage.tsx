import React, { useState } from 'react';
import { User, Booking, Course, Certificate, PageView } from '../types';
import { Breadcrumb } from '../components/Breadcrumb';
import { 
  BookOpen, 
  Calendar, 
  Award, 
  MessageSquare, 
  User as UserIcon, 
  Clock, 
  PlayCircle, 
  ArrowRight, 
  CheckCircle2, 
  FileText,
  Settings,
  Heart,
  LayoutDashboard
} from 'lucide-react';

interface StudentDashboardPageProps {
  user: User;
  bookings: Booking[];
  courses: Course[];
  certificates: Certificate[];
  onNavigate: (view: PageView, params?: any) => void;
}

export const StudentDashboardPage: React.FC<StudentDashboardPageProps> = ({
  user,
  bookings,
  courses,
  certificates,
  onNavigate
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'courses' | 'consultations' | 'certificates' | 'settings'>('overview');

  const upcomingBooking = bookings.find(b => b.status === 'confirmed') || bookings[0];
  const activeCourse = courses[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8 pb-20">
      <Breadcrumb items={[{ label: 'Student Dashboard' }]} onNavigate={onNavigate} />

      {/* Top Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-amber-400"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold font-heading text-white">Assalamu Alaikum, {user.name}!</h1>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-400 text-slate-950">Student</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">May Allah grant you beneficial knowledge and steadfastness.</p>
          </div>
        </div>

        <button
          onClick={() => onNavigate('courses')}
          className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-colors flex items-center gap-1.5 shrink-0"
        >
          <BookOpen className="w-4 h-4" />
          <span>Explore Catalog</span>
        </button>
      </div>

      {/* Main Grid: Sidebar + Active Tab Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Sidebar Navigation */}
        <div className="lg:col-span-3 bg-white rounded-3xl p-4 border border-slate-200 shadow-soft-sm space-y-1">
          {[
            { id: 'overview', label: 'Overview', icon: LayoutDashboard },
            { id: 'courses', label: 'My Enrolled Courses', icon: BookOpen },
            { id: 'consultations', label: 'My Consultations', icon: Calendar },
            { id: 'certificates', label: 'Certificates', icon: Award },
            { id: 'settings', label: 'Account Settings', icon: Settings }
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  if (item.id === 'certificates') {
                    onNavigate('certificates');
                  } else if (item.id === 'settings') {
                    onNavigate('profile');
                  } else {
                    setActiveTab(item.id as any);
                  }
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-slate-900 text-amber-400 shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right Main Content */}
        <div className="lg:col-span-9 space-y-6">
          
          {/* Stat Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-1">
              <span className="text-xs text-slate-400 font-medium">Courses in Progress</span>
              <div className="text-2xl font-bold font-heading text-slate-900">3</div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-1">
              <span className="text-xs text-slate-400 font-medium">Consultations</span>
              <div className="text-2xl font-bold font-heading text-amber-700">5 Sessions</div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-1">
              <span className="text-xs text-slate-400 font-medium">Earned Certificates</span>
              <div className="text-2xl font-bold font-heading text-emerald-700">1</div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-1">
              <span className="text-xs text-slate-400 font-medium">Learning Hours</span>
              <div className="text-2xl font-bold font-heading text-blue-700">24.5 Hrs</div>
            </div>
          </div>

          {/* Active Consultation Notification Banner */}
          {upcomingBooking && (
            <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-blue-900 text-white rounded-3xl p-6 border border-blue-800 shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-bold uppercase tracking-wider">
                  Upcoming Scheduled Consultation
                </span>
                <h3 className="text-base font-bold text-white mt-1">
                  1-on-1 Session with {upcomingBooking.expertName}
                </h3>
                <p className="text-xs text-slate-300">
                  {upcomingBooking.date} at {upcomingBooking.timeSlot} • Format: {upcomingBooking.consultationType}
                </p>
              </div>

              <button
                onClick={() => onNavigate('chat')}
                className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-colors flex items-center gap-1.5 shrink-0"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Launch Private Chat Room</span>
              </button>
            </div>
          )}

          {/* Continue Learning Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft-sm space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold font-heading text-slate-900">Continue Learning</h2>
              <button onClick={() => onNavigate('courses')} className="text-xs font-semibold text-blue-700 hover:underline">
                View All Courses
              </button>
            </div>

            {activeCourse && (
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <img
                    src={activeCourse.thumbnail}
                    alt={activeCourse.title}
                    className="w-16 h-16 rounded-xl object-cover border"
                  />
                  <div>
                    <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider">{activeCourse.category}</span>
                    <h4 className="text-sm font-bold text-slate-900">{activeCourse.title}</h4>
                    <p className="text-xs text-slate-500 mt-1">Lesson 2: Throat Articulation Points (Halq)</p>
                  </div>
                </div>

                <button
                  onClick={() => onNavigate('lesson', { courseId: activeCourse.id, lessonId: 'les-101' })}
                  className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5 shrink-0"
                >
                  <PlayCircle className="w-4 h-4" />
                  <span>Resume Lesson</span>
                </button>
              </div>
            )}
          </div>

          {/* Recent Consultations Log */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft-sm space-y-4">
            <h2 className="text-lg font-bold font-heading text-slate-900">Consultation Records</h2>
            
            <div className="space-y-3">
              {bookings.map((bk) => (
                <div key={bk.id} className="p-4 rounded-2xl border border-slate-100 bg-slate-50 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-900 text-amber-400 flex items-center justify-center font-bold">
                      {bk.consultationType === 'voice' ? 'VOICE' : 'CHAT'}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">{bk.expertName}</h4>
                      <p className="text-slate-500">{bk.date} • {bk.timeSlot}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      bk.status === 'confirmed' ? 'bg-amber-100 text-amber-900' : 'bg-emerald-100 text-emerald-900'
                    }`}>
                      {bk.status}
                    </span>
                    <button
                      onClick={() => onNavigate('chat')}
                      className="px-3 py-1.5 bg-white border border-slate-200 text-slate-700 font-semibold rounded-lg hover:bg-slate-100"
                    >
                      Chat Room
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
