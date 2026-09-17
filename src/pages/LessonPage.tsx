import React, { useState } from 'react';
import { Course, Lesson, PageView } from '../types';
import { Breadcrumb } from '../components/Breadcrumb';
import { 
  PlayCircle, 
  CheckCircle2, 
  ArrowLeft, 
  ArrowRight, 
  FileText, 
  Download, 
  BookOpen, 
  Lock, 
  Award,
  ChevronDown
} from 'lucide-react';

interface LessonPageProps {
  course: Course;
  initialLessonId?: string;
  onNavigate: (view: PageView, params?: any) => void;
}

export const LessonPage: React.FC<LessonPageProps> = ({
  course,
  initialLessonId,
  onNavigate
}) => {
  const allLessons: Lesson[] = course.curriculum.flatMap(s => s.lessons);
  const defaultLesson = allLessons.find(l => l.id === initialLessonId) || allLessons[0] || {
    id: 'les-101',
    title: '1. Virtues of Correct Tajweed & Course Orientation',
    duration: '18 mins',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4'
  };

  const [activeLesson, setActiveLesson] = useState<Lesson>(defaultLesson);
  const [completedIds, setCompletedIds] = useState<string[]>(['les-101']);

  const toggleComplete = (id: string) => {
    if (completedIds.includes(id)) {
      setCompletedIds(completedIds.filter(i => i !== id));
    } else {
      setCompletedIds([...completedIds, id]);
    }
  };

  const currentIndex = allLessons.findIndex(l => l.id === activeLesson.id);
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < allLessons.length - 1;

  const goToPrev = () => {
    if (hasPrev) setActiveLesson(allLessons[currentIndex - 1]);
  };

  const goToNext = () => {
    if (hasNext) setActiveLesson(allLessons[currentIndex + 1]);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-6 pb-20">
      <Breadcrumb
        items={[
          { label: 'My Dashboard', view: 'dashboard' },
          { label: course.title, view: 'course-detail' },
          { label: activeLesson.title }
        ]}
        onNavigate={onNavigate}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Main Lesson Screen (Video + Resources) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Video Player Box */}
          <div className="bg-slate-950 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl relative aspect-video">
            <video
              controls
              poster={course.thumbnail}
              src={activeLesson.videoUrl || 'https://www.w3schools.com/html/mov_bbb.mp4'}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Lesson Header & Mark Complete */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider">{course.category}</span>
                <h1 className="text-xl sm:text-2xl font-bold font-heading text-slate-900 mt-0.5">
                  {activeLesson.title}
                </h1>
                <p className="text-xs text-slate-500 mt-1">Instructor: {course.instructor.name} • Duration: {activeLesson.duration}</p>
              </div>

              <button
                onClick={() => toggleComplete(activeLesson.id)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 ${
                  completedIds.includes(activeLesson.id)
                    ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                    : 'bg-slate-900 text-amber-400 hover:bg-slate-800'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{completedIds.includes(activeLesson.id) ? 'Completed' : 'Mark as Complete'}</span>
              </button>
            </div>

            {/* Lesson Resources Download Bar */}
            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Lesson Study Resources</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-amber-600" />
                    <span className="font-semibold text-slate-800">Tajweed_Makharij_Summary.pdf</span>
                  </div>
                  <button className="p-1.5 rounded-lg bg-white text-slate-700 hover:bg-slate-200 border">
                    <Download className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-blue-600" />
                    <span className="font-semibold text-slate-800">Audio_Recitation_Practice.mp3</span>
                  </div>
                  <button className="p-1.5 rounded-lg bg-white text-slate-700 hover:bg-slate-200 border">
                    <Download className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Lesson Prev / Next Bar */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={goToPrev}
                disabled={!hasPrev}
                className="px-4 py-2 text-xs font-semibold rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 disabled:opacity-40 flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Previous Lesson</span>
              </button>

              <button
                onClick={goToNext}
                disabled={!hasNext}
                className="px-4 py-2 text-xs font-semibold rounded-xl bg-slate-900 text-amber-400 hover:bg-slate-800 disabled:opacity-40 flex items-center gap-1.5"
              >
                <span>Next Lesson</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

        {/* Right Curriculum Navigator Sidebar */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-5 border border-slate-200 shadow-soft-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold font-heading text-slate-900">Course Navigation</h3>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-900">
              {completedIds.length} / {allLessons.length} Done
            </span>
          </div>

          <div className="space-y-4 overflow-y-auto max-h-[500px]">
            {course.curriculum.map((sec) => (
              <div key={sec.id} className="space-y-2">
                <h4 className="text-xs font-bold text-slate-800 bg-slate-50 p-2 rounded-lg border border-slate-100">
                  {sec.title}
                </h4>
                <div className="space-y-1">
                  {sec.lessons.map((les) => {
                    const isCurrent = les.id === activeLesson.id;
                    const isDone = completedIds.includes(les.id);
                    return (
                      <div
                        key={les.id}
                        onClick={() => setActiveLesson(les)}
                        className={`p-2.5 rounded-xl text-xs cursor-pointer flex items-center justify-between transition-all ${
                          isCurrent
                            ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                            : 'hover:bg-slate-100 text-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <PlayCircle className={`w-3.5 h-3.5 shrink-0 ${isCurrent ? 'text-slate-950' : 'text-amber-600'}`} />
                          <span className="truncate">{les.title}</span>
                        </div>
                        {isDone && <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
