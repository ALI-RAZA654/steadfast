import React, { useState } from 'react';
import { Course, PageView } from '../types';
import { Rating } from '../components/Rating';
import { Breadcrumb } from '../components/Breadcrumb';
import { 
  BookOpen, 
  Clock, 
  Award, 
  Users, 
  CheckCircle2, 
  PlayCircle, 
  Lock, 
  ChevronDown, 
  ChevronUp, 
  ShieldCheck, 
  ArrowRight 
} from 'lucide-react';

interface CourseDetailPageProps {
  course: Course;
  onNavigate: (view: PageView, params?: any) => void;
  onEnroll: (courseId: string) => void;
}

export const CourseDetailPage: React.FC<CourseDetailPageProps> = ({
  course,
  onNavigate,
  onEnroll
}) => {
  const [expandedModule, setExpandedModule] = useState<string | null>('sec-1');

  const toggleModule = (id: string) => {
    setExpandedModule(expandedModule === id ? null : id);
  };

  const handleEnrollClick = () => {
    onEnroll(course.id);
    onNavigate('lesson', { courseId: course.id, lessonId: 'les-101' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8 pb-20">
      <Breadcrumb
        items={[
          { label: 'Courses', view: 'courses' },
          { label: course.title }
        ]}
        onNavigate={onNavigate}
      />

      {/* Course Hero Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 relative overflow-hidden">
        <div className="max-w-3xl space-y-4">
          <span className="inline-block px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold uppercase tracking-wider border border-amber-400/30">
            {course.category}
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold font-heading text-white tracking-tight">
            {course.title}
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {course.subtitle}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs">
            <div className="flex items-center gap-2">
              <img
                src={course.instructor.avatar}
                alt={course.instructor.name}
                className="w-7 h-7 rounded-full border border-amber-400 object-cover"
              />
              <span className="font-semibold text-slate-200">{course.instructor.name}</span>
            </div>
            <Rating rating={course.rating} reviewCount={course.reviewCount} size="sm" />
            <span className="text-slate-400">• {course.studentCount}+ Enrolled Students</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Main Content Column */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* What You'll Learn */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft-sm space-y-4">
            <h2 className="text-xl font-bold font-heading text-slate-900">What You Will Learn</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {course.whatYouWillLearn.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-slate-700 font-medium leading-normal">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Curriculum Sections Accordion */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h2 className="text-xl font-bold font-heading text-slate-900">Course Curriculum</h2>
              <span className="text-xs text-slate-500 font-medium">
                {course.curriculum.length} Modules • {course.lessonCount} Video Lessons
              </span>
            </div>

            <div className="space-y-3">
              {course.curriculum.length > 0 ? (
                course.curriculum.map((sec) => {
                  const isOpen = expandedModule === sec.id;
                  return (
                    <div key={sec.id} className="border border-slate-200 rounded-2xl overflow-hidden">
                      <button
                        onClick={() => toggleModule(sec.id)}
                        className="w-full p-4 bg-slate-50 hover:bg-slate-100 flex items-center justify-between text-left transition-colors"
                      >
                        <span className="text-xs sm:text-sm font-bold text-slate-900">{sec.title}</span>
                        {isOpen ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
                      </button>

                      {isOpen && (
                        <div className="p-4 bg-white divide-y divide-slate-100 space-y-2">
                          {sec.lessons.map((les) => (
                            <div key={les.id} className="pt-2 flex items-center justify-between text-xs text-slate-700">
                              <div className="flex items-center gap-2">
                                <PlayCircle className="w-4 h-4 text-amber-600 shrink-0" />
                                <span className="font-medium">{les.title}</span>
                              </div>
                              <span className="text-slate-400 text-[11px] font-mono">{les.duration}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })
              ) : (
                <div className="p-4 rounded-xl bg-slate-50 text-xs text-slate-600">
                  Full module outline available upon instant enrollment.
                </div>
              )}
            </div>
          </div>

          {/* Instructor Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft-sm space-y-4">
            <h2 className="text-xl font-bold font-heading text-slate-900">Your Instructor</h2>
            <div className="flex items-start gap-4">
              <img
                src={course.instructor.avatar}
                alt={course.instructor.name}
                className="w-16 h-16 rounded-2xl object-cover border"
              />
              <div>
                <h3 className="text-base font-bold text-slate-900">{course.instructor.name}</h3>
                <p className="text-xs text-amber-800 font-medium">{course.instructor.title}</p>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Certified Islamic scholar dedicated to providing clear, accessible, and structured authentic knowledge for students worldwide.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Right Sticky Purchase Sidebar */}
        <div className="lg:col-span-4 sticky top-24 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-soft-lg overflow-hidden p-6 space-y-6">
            
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-900">
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-full object-cover opacity-90"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-slate-950/40">
                <PlayCircle className="w-12 h-12 text-amber-400" />
              </div>
            </div>

            <div className="flex items-baseline justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Tuition Fee</span>
              <span className="text-3xl font-extrabold font-heading text-slate-900">
                {course.isFree ? 'FREE' : `$${course.price}`}
              </span>
            </div>

            <div className="space-y-3 text-xs text-slate-600 border-t border-slate-100 pt-4">
              <div className="flex justify-between">
                <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-slate-400" /> Duration:</span>
                <span className="font-semibold text-slate-900">{course.duration}</span>
              </div>
              <div className="flex justify-between">
                <span className="flex items-center gap-1.5"><BookOpen className="w-4 h-4 text-slate-400" /> Lessons:</span>
                <span className="font-semibold text-slate-900">{course.lessonCount} Modules</span>
              </div>
              <div className="flex justify-between">
                <span className="flex items-center gap-1.5"><Award className="w-4 h-4 text-slate-400" /> Skill Level:</span>
                <span className="font-semibold text-slate-900">{course.level}</span>
              </div>
            </div>

            <button
              onClick={handleEnrollClick}
              className="w-full py-3.5 text-sm font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
            >
              <span>Enroll & Start Learning</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="text-[11px] text-slate-500 text-center flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Includes Verified Completion Certificate</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
