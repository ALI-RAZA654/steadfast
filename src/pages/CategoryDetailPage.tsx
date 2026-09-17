import React from 'react';
import { Category, Expert, Course, Article, PageView } from '../types';
import { Breadcrumb } from '../components/Breadcrumb';
import { ExpertCard } from '../components/ExpertCard';
import { CourseCard } from '../components/CourseCard';
import { SectionHeader } from '../components/SectionHeader';
import { Users, BookOpen, FileText, ArrowRight, ShieldCheck } from 'lucide-react';

interface CategoryDetailPageProps {
  category: Category;
  experts: Expert[];
  courses: Course[];
  articles: Article[];
  onNavigate: (view: PageView, params?: any) => void;
  onBookConsultation: (expertId: string, method: 'chat' | 'voice' | 'video') => void;
}

export const CategoryDetailPage: React.FC<CategoryDetailPageProps> = ({
  category,
  experts,
  courses,
  articles,
  onNavigate,
  onBookConsultation
}) => {
  // Filter items matching this category
  const categoryExperts = experts.filter(e => e.categories.includes(category.id));
  const categoryCourses = courses.filter(c => c.categoryId === category.id);
  const categoryArticles = articles.filter(a => a.category.toLowerCase().includes(category.name.toLowerCase().split(' ')[0]));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-12 pb-16">
      <Breadcrumb
        items={[
          { label: 'Categories', view: 'categories' },
          { label: category.name }
        ]}
        onNavigate={onNavigate}
      />

      {/* Category Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden border border-slate-800 shadow-xl">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold uppercase tracking-wider border border-amber-400/30">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>Category Hub</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold font-heading tracking-tight">
            {category.name}
          </h1>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            {category.description}
          </p>

          <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold">
            <span className="bg-slate-800/90 text-amber-300 px-3.5 py-2 rounded-xl border border-slate-700 flex items-center gap-1.5">
              <Users className="w-4 h-4 text-amber-400" />
              {categoryExperts.length > 0 ? categoryExperts.length : category.expertCount} Verified Experts
            </span>
            <span className="bg-slate-800/90 text-blue-300 px-3.5 py-2 rounded-xl border border-slate-700 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-blue-400" />
              {categoryCourses.length > 0 ? categoryCourses.length : category.courseCount} Courses
            </span>
          </div>
        </div>
      </div>

      {/* 1. Featured Experts in this Category */}
      <section className="space-y-6">
        <SectionHeader
          badge="Specialist Scholars"
          title={`Verified Experts in ${category.name}`}
          subtitle="Connect with qualified specialists for private 1-on-1 consultations."
          actionText="View All Experts"
          onActionClick={() => onNavigate('experts', { category: category.id })}
        />

        {categoryExperts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryExperts.map((exp) => (
              <ExpertCard
                key={exp.id}
                expert={exp}
                onViewProfile={(expId) => onNavigate('expert-profile', { expertId: expId })}
                onBookConsultation={onBookConsultation}
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {experts.slice(0, 2).map((exp) => (
              <ExpertCard
                key={exp.id}
                expert={exp}
                onViewProfile={(expId) => onNavigate('expert-profile', { expertId: expId })}
                onBookConsultation={onBookConsultation}
              />
            ))}
          </div>
        )}
      </section>

      {/* 2. Related Courses */}
      <section className="space-y-6 pt-4 border-t border-slate-200">
        <SectionHeader
          badge="Structured Learning"
          title={`Courses in ${category.name}`}
          subtitle="Step-by-step video courses with verifiable completion certificates."
          actionText="Explore All Courses"
          onActionClick={() => onNavigate('courses', { category: category.id })}
        />

        {categoryCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categoryCourses.map((c) => (
              <CourseCard
                key={c.id}
                course={c}
                onSelectCourse={(courseId) => onNavigate('course-detail', { courseId })}
              />
            ))}
          </div>
        ) : (
          <div className="p-8 text-center bg-white rounded-2xl border border-slate-200">
            <BookOpen className="w-10 h-10 text-slate-400 mx-auto mb-2" />
            <p className="text-slate-600 font-medium">New courses for {category.name} are releasing next week!</p>
            <button
              onClick={() => onNavigate('courses')}
              className="mt-3 px-4 py-2 bg-blue-700 text-white font-semibold text-xs rounded-xl"
            >
              Browse Available Catalog
            </button>
          </div>
        )}
      </section>

      {/* 3. Resources & Articles */}
      <section className="space-y-6 pt-4 border-t border-slate-200">
        <SectionHeader
          badge="Articles & Fiqh QA"
          title="Related Guidance Articles"
          subtitle="Read verified articles and practical answers written by our scholars."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {articles.map((art) => (
            <div
              key={art.id}
              onClick={() => onNavigate('article-detail', { articleId: art.id })}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-soft-sm hover:shadow-soft-md transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200/60">
                  {art.category}
                </span>
                <h3 className="text-lg font-bold font-heading text-slate-900 group-hover:text-blue-700 transition-colors">
                  {art.title}
                </h3>
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {art.excerpt}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="font-medium text-slate-700">By {art.author.name}</span>
                <span className="flex items-center gap-1 text-blue-700 font-semibold group-hover:translate-x-1 transition-transform">
                  Read Article →
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
