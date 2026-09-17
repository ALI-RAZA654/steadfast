import React, { useState } from 'react';
import { Course, Category, PageView } from '../types';
import { CourseCard } from '../components/CourseCard';
import { Breadcrumb } from '../components/Breadcrumb';
import { Search, BookOpen, SlidersHorizontal, Award } from 'lucide-react';

interface CoursesPageProps {
  courses: Course[];
  categories: Category[];
  onNavigate: (view: PageView, params?: any) => void;
  initialCategory?: string;
}

export const CoursesPage: React.FC<CoursesPageProps> = ({
  courses,
  categories,
  onNavigate,
  initialCategory = ''
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [showFreeOnly, setShowFreeOnly] = useState(false);

  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  const filteredCourses = courses.filter((c) => {
    const matchesSearch =
      searchQuery === '' ||
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === '' || c.categoryId === selectedCategory;

    const matchesLevel =
      selectedLevel === 'All' || c.level === selectedLevel;

    const matchesFree = !showFreeOnly || c.isFree;

    return matchesSearch && matchesCategory && matchesLevel && matchesFree;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8 pb-20">
      <Breadcrumb items={[{ label: 'Courses' }]} onNavigate={onNavigate} />

      {/* Hero Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 relative overflow-hidden">
        <div className="max-w-2xl relative z-10 space-y-3">
          <span className="inline-block px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold uppercase tracking-wider border border-amber-400/30">
            LMS E-Learning Catalog
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-heading">
            Learn Islam with Structure and Purpose
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Step-by-step video courses taught by verified scholars with downloadable PDF guides, chapter quizzes, and verified certificates.
          </p>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200 shadow-soft-sm space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          
          <div className="md:col-span-5 relative">
            <input
              type="text"
              placeholder="Search course title or instructor..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>

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

          <div className="md:col-span-2">
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="w-full px-3 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              {levels.map((lvl) => (
                <option key={lvl} value={lvl}>
                  {lvl === 'All' ? 'All Levels' : lvl}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2 flex items-center">
            <label className="inline-flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={showFreeOnly}
                onChange={(e) => setShowFreeOnly(e.target.checked)}
                className="w-4 h-4 rounded text-amber-500 focus:ring-amber-400 border-slate-300"
              />
              <span>FREE Courses Only</span>
            </label>
          </div>

        </div>
      </div>

      {/* Courses Grid */}
      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((c) => (
            <CourseCard
              key={c.id}
              course={c}
              onSelectCourse={(courseId) => onNavigate('course-detail', { courseId })}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 space-y-3">
          <BookOpen className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-lg font-bold font-heading text-slate-800">No courses match your filter</h3>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('');
              setSelectedLevel('All');
              setShowFreeOnly(false);
            }}
            className="px-4 py-2 bg-slate-900 text-amber-400 font-bold text-xs rounded-xl"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};
