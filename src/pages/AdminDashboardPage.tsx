import React, { useState } from 'react';
import { User, Expert, Booking, Category, PageView } from '../types';
import { 
  Users, Calendar, DollarSign, ShieldCheck, CheckCircle2, XCircle, 
  Plus, Edit, Search, Filter, Lock, Award, Clock, ArrowRight, Activity, 
  Settings, Check, UserCheck, BookOpen, AlertCircle
} from 'lucide-react';

interface AdminDashboardPageProps {
  user: User;
  experts: Expert[];
  bookings: Booking[];
  categories: Category[];
  onNavigate: (view: PageView, params?: any) => void;
  onLogout: () => void;
}

export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({
  user,
  experts,
  bookings,
  categories,
  onNavigate,
  onLogout
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'scholars' | 'bookings' | 'approvals' | 'settings'>('overview');
  const [scholarList, setScholarList] = useState<Expert[]>(experts);
  const [bookingList, setBookingList] = useState<Booking[]>(bookings);
  const [searchTerm, setSearchTerm] = useState('');

  // Pending Applications Mock Data
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

  const toggleScholarStatus = (expertId: string) => {
    setScholarList(prev => prev.map(exp => 
      exp.id === expertId ? { ...exp, isOnline: !exp.isOnline } : exp
    ));
  };

  const handleApprove = (appId: string) => {
    setPendingApprovals(prev => prev.filter(a => a.id !== appId));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-20 text-slate-800">
      
      {/* Admin Header Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold uppercase tracking-wider border border-amber-400/30">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>Admin Control Panel</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold font-heading text-white">
            Welcome Back, Admin ({user.name})
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm">
            Manage verified scholars, track 1-on-1 consultations, review credentials, and platform revenue.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onLogout}
            className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs sm:text-sm rounded-xl border border-slate-700 transition-colors"
          >
            Switch Account / Logout
          </button>
        </div>
      </div>

      {/* Admin Metrics Bar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-soft-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Total Consultations</span>
            <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
              <Calendar className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-black font-heading text-slate-900">1,482</div>
          <span className="text-[11px] text-emerald-600 font-bold">+12% this month</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-soft-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Verified Scholars</span>
            <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-black font-heading text-slate-900">{scholarList.length} Active</div>
          <span className="text-[11px] text-blue-600 font-bold">4 Pending Approval</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-soft-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Platform Revenue</span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-black font-heading text-slate-900">₹2,45,000</div>
          <span className="text-[11px] text-emerald-600 font-bold">Shariah Compliant split</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-soft-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">System Status</span>
            <div className="p-2 rounded-xl bg-purple-50 text-purple-600">
              <Activity className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-black font-heading text-emerald-600">100% Operational</div>
          <span className="text-[11px] text-slate-500 font-medium">256-bit SSL Encrypted</span>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-200 overflow-x-auto pb-1">
        {[
          { id: 'overview', label: 'Dashboard Overview', icon: Activity },
          { id: 'scholars', label: 'Manage Scholars', icon: Users },
          { id: 'bookings', label: 'Consultation Sessions', icon: Calendar },
          { id: 'approvals', label: `Pending Approvals (${pendingApprovals.length})`, icon: ShieldCheck },
          { id: 'settings', label: 'Admin Settings', icon: Settings }
        ].map((tab) => {
          const IconComp = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-3 text-xs sm:text-sm font-bold transition-all flex items-center gap-2 border-b-2 whitespace-nowrap ${
                isActive
                  ? 'border-blue-700 text-blue-800 bg-blue-50/50 rounded-t-xl'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              <IconComp className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Overview & Scholar Management */}
      {(activeTab === 'overview' || activeTab === 'scholars') && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200">
            <div className="relative w-full sm:w-72">
              <input
                type="text"
                placeholder="Search scholars by name or title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>

            <button className="w-full sm:w-auto px-4 py-2 bg-blue-700 text-white font-bold text-xs rounded-xl hover:bg-blue-800 flex items-center justify-center gap-1.5 shadow-sm">
              <Plus className="w-4 h-4" />
              <span>Add New Scholar</span>
            </button>
          </div>

          {/* Scholars Table */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-soft-sm overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-base font-extrabold font-heading text-slate-900">Active Verified Scholars ({scholarList.length})</h3>
              <span className="text-xs text-slate-500">Live Status Sync</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200 uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="p-4">Scholar</th>
                    <th className="p-4">Title / Role</th>
                    <th className="p-4">Consultation Rate</th>
                    <th className="p-4">Rating & Exp</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {scholarList
                    .filter(exp => exp.name.toLowerCase().includes(searchTerm.toLowerCase()))
                    .map((exp) => (
                      <tr key={exp.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="p-4 flex items-center gap-3">
                          <img src={exp.avatar} alt={exp.name} className="w-10 h-10 rounded-full object-cover border" />
                          <div>
                            <div className="font-extrabold text-slate-900 text-sm flex items-center gap-1">
                              {exp.name}
                              <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 fill-blue-600" />
                            </div>
                            <span className="text-[11px] text-slate-400">{exp.specialization}</span>
                          </div>
                        </td>

                        <td className="p-4 font-semibold text-slate-800">
                          {exp.title}
                        </td>

                        <td className="p-4 font-bold text-rose-600">
                          ₹{exp.ratePerMin} / Min
                          <span className="block text-[10px] text-emerald-600 font-normal">First 5 Min Free</span>
                        </td>

                        <td className="p-4">
                          <span className="font-bold text-amber-500">★ {exp.rating} ({exp.reviewCount})</span>
                          <span className="block text-[10px] text-slate-400">{exp.experienceYears}+ Years</span>
                        </td>

                        <td className="p-4">
                          <button
                            onClick={() => toggleScholarStatus(exp.id)}
                            className={`px-3 py-1 rounded-full text-[11px] font-extrabold flex items-center gap-1 ${
                              exp.isOnline
                                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                                : 'bg-slate-100 text-slate-600 border border-slate-300'
                            }`}
                          >
                            <span className={`w-2 h-2 rounded-full ${exp.isOnline ? 'bg-emerald-500 animate-ping' : 'bg-slate-400'}`} />
                            {exp.isOnline ? 'Online' : 'Offline'}
                          </button>
                        </td>

                        <td className="p-4 text-right space-x-2">
                          <button 
                            onClick={() => onNavigate('expert-profile', { expertId: exp.id })}
                            className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold"
                            title="View Profile"
                          >
                            <Edit className="w-3.5 h-3.5" />
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

      {/* Tab 3: Consultation Bookings */}
      {activeTab === 'bookings' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4 shadow-soft-sm">
          <h3 className="text-base font-extrabold font-heading text-slate-900">Live Consultation Sessions ({bookingList.length})</h3>
          <div className="space-y-3">
            {bookingList.map((b) => (
              <div key={b.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img src={b.expertAvatar} alt={b.expertName} className="w-12 h-12 rounded-xl object-cover border" />
                  <div>
                    <h4 className="text-sm font-extrabold text-slate-900">{b.expertName} &amp; {b.userName}</h4>
                    <p className="text-xs text-slate-500">{b.date} • {b.timeSlot} • Method: <span className="font-bold uppercase text-blue-700">{b.consultationType}</span></p>
                    <p className="text-xs text-slate-700 italic mt-1">"{b.question}"</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200">
                    {b.status.toUpperCase()}
                  </span>
                  <button 
                    onClick={() => onNavigate('chat', { expertId: b.expertId })}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs"
                  >
                    Open Session
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Pending Approvals */}
      {activeTab === 'approvals' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4 shadow-soft-sm">
          <h3 className="text-base font-extrabold font-heading text-slate-900">Scholar Credential Approval Queue ({pendingApprovals.length})</h3>
          
          {pendingApprovals.length > 0 ? (
            <div className="space-y-3">
              {pendingApprovals.map((app) => (
                <div key={app.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <h4 className="text-sm font-extrabold text-slate-900">{app.name}</h4>
                    <p className="text-xs text-blue-700 font-semibold">{app.qualification}</p>
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

      {/* Tab 5: Settings */}
      {activeTab === 'settings' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4 shadow-soft-sm max-w-2xl">
          <h3 className="text-base font-extrabold font-heading text-slate-900">Platform System Settings</h3>
          <div className="space-y-4 text-xs">
            <div className="space-y-1">
              <label className="font-bold text-slate-700">Platform Commission Rate (%)</label>
              <input type="number" defaultValue={10} className="w-full p-2.5 rounded-xl border border-slate-300" />
            </div>
            <div className="space-y-1">
              <label className="font-bold text-slate-700">Default Free Consultation Duration</label>
              <input type="text" defaultValue="First 5 Minutes Free" className="w-full p-2.5 rounded-xl border border-slate-300" />
            </div>
            <button className="px-6 py-3 bg-blue-700 text-white font-extrabold rounded-xl shadow-sm">
              Save Admin Configuration
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
