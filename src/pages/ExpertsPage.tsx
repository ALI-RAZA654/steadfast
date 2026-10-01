import React, { useState } from 'react';
import { Expert, Category, PageView } from '../types';
import { ExpertCard } from '../components/ExpertCard';
import { Breadcrumb } from '../components/Breadcrumb';
import { Search, Filter, SlidersHorizontal, CheckCircle2, RefreshCw } from 'lucide-react';

interface ExpertsPageProps {
  experts: Expert[];
  categories: Category[];
  onNavigate: (view: PageView, params?: any) => void;
  onBookConsultation: (expertId: string, method: 'chat' | 'voice' | 'video') => void;
  initialSearch?: string;
  initialCategory?: string;
}

export const ExpertsPage: React.FC<ExpertsPageProps> = ({
  experts,
  categories,
  onNavigate,
  onBookConsultation,
  initialSearch = '',
  initialCategory = ''
}) => {
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedRoleTab, setSelectedRoleTab] = useState('All');
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  const [onlineOnly, setOnlineOnly] = useState(false);

  const roleTabs = [
    'All',
    'Mufti',
    'Islamic Scholar',
    'Quran Teacher',
    'Finance Specialist',
    'Family Specialist',
    'Alim/Alimah'
  ];

  const languagesList = ['All', 'English', 'Urdu', 'Arabic', 'Hindi', 'Gujarati'];

  // Filtering Logic
  const filteredExperts = experts.filter((exp) => {
    // Search query match
    const matchesSearch =
      searchQuery === '' ||
      exp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exp.specialization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exp.bio.toLowerCase().includes(searchQuery.toLowerCase());

    // Category match
    const matchesCategory =
      selectedCategory === '' || exp.categories.includes(selectedCategory);

    // Role Tab match
    const matchesRole =
      selectedRoleTab === 'All' ||
      exp.title.toLowerCase().includes(selectedRoleTab.toLowerCase()) ||
      exp.specialization.toLowerCase().includes(selectedRoleTab.toLowerCase());

    // Language match
    const matchesLanguage =
      selectedLanguage === 'All' || exp.languages.includes(selectedLanguage);

    // Online status
    const matchesOnline = !onlineOnly || exp.isOnline;

    return matchesSearch && matchesCategory && matchesRole && matchesLanguage && matchesOnline;
  });

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSelectedRoleTab('All');
    setSelectedLanguage('All');
    setOnlineOnly(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8 pb-20">
      <Breadcrumb items={[{ label: 'Find Experts' }]} onNavigate={onNavigate} />

      {/* Page Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 border border-slate-800 relative overflow-hidden">
        <div className="max-w-2xl relative z-10 space-y-3">
          <span className="inline-block px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold uppercase tracking-wider border border-amber-400/30">
            Verified Scholar Discovery
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold font-heading">
            Find the Right Islamic Expert
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Connect with verified Muftis, Quran teachers, family counselors, and Islamic finance specialists for private 1-on-1 guidance.
          </p>
        </div>
      </div>

      {/* Role Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200 scrollbar-none">
        {roleTabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setSelectedRoleTab(tab)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
              selectedRoleTab === tab
                ? 'bg-slate-900 text-amber-400 shadow-md'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Search & Filter Control Bar */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200 shadow-soft-sm space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          
          {/* Main Search Input */}
          <div className="md:col-span-5 relative">
            <input
              type="text"
              placeholder="Search experts, topics or specializations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>

          {/* Category Dropdown */}
          <div className="md:col-span-3">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="">All Categories</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Language Dropdown */}
          <div className="md:col-span-2">
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="w-full px-3 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              {languagesList.map((lang) => (
                <option key={lang} value={lang}>
                  {lang === 'All' ? 'All Languages' : lang}
                </option>
              ))}
            </select>
          </div>

          {/* Online Toggle & Reset */}
          <div className="md:col-span-2 flex items-center justify-between gap-2">
            <label className="inline-flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={onlineOnly}
                onChange={(e) => setOnlineOnly(e.target.checked)}
                className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300"
              />
              <span>Online Now</span>
            </label>

            {(searchQuery || selectedCategory || selectedRoleTab !== 'All' || selectedLanguage !== 'All' || onlineOnly) && (
              <button
                onClick={resetFilters}
                className="p-2 text-slate-400 hover:text-rose-600 transition-colors"
                title="Reset Filters"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            )}
          </div>

        </div>
      </div>

      {/* Results Meta */}
      <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
        <span>Showing {filteredExperts.length} verified scholars & specialists</span>
        <span>All consultations are private & confidential</span>
      </div>

      {/* Expert Cards Grid */}
      {filteredExperts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExperts.map((exp) => (
            <ExpertCard
              key={exp.id}
              expert={exp}
              onViewProfile={(expId) => onNavigate('expert-profile', { expertId: expId })}
              onBookConsultation={onBookConsultation}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 space-y-4">
          <SlidersHorizontal className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-lg font-bold font-heading text-slate-800">No experts found matching your criteria</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try adjusting your search terms, clearing category filters, or checking back shortly.
          </p>
          <button
            onClick={resetFilters}
            className="px-5 py-2.5 bg-slate-900 text-amber-400 font-bold text-xs rounded-xl hover:bg-slate-800 transition-colors"
          >
            Reset All Filters
          </button>
        </div>
      )}
    </div>
  );
};
