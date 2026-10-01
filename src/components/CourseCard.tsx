import React from 'react';
import { Course } from '../types';
import { Rating } from './Rating';
import { BookOpen, Clock, Users, Award, ChevronRight } from 'lucide-react';

interface CourseCardProps {
  course: Course;
  onSelectCourse: (courseId: string) => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course, onSelectCourse }) => {
  return (
    <div
      onClick={() => onSelectCourse(course.id)}
      className="bg-white rounded-2xl border border-slate-200/90 shadow-soft-sm hover:shadow-soft-lg transition-all duration-300 overflow-hidden cursor-pointer flex flex-col justify-between group transform hover:-translate-y-1"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden bg-slate-900">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
        />
        
        {/* Category Tag */}
        <span className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-green-300 text-[11px] font-semibold px-2.5 py-1 rounded-full border border-slate-700/60 shadow-sm">
          {course.category}
        </span>

        {/* Free / Paid Price Tag */}
        <span className="absolute top-3 right-3 bg-green-700 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-md">
          {course.isFree ? 'FREE' : `₹${course.price}`}
        </span>
      </div>

      {/* Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Title & Subtitle */}
          <h3 className="text-base font-bold font-heading text-slate-900 group-hover:text-blue-700 transition-colors line-clamp-2">
            {course.title}
          </h3>
          <p className="mt-1.5 text-xs text-slate-600 line-clamp-2 leading-relaxed">
            {course.subtitle}
          </p>
        </div>

        <div>
          {/* Instructor & Call Timing line */}
          <div className="mt-4 pt-3 border-t border-slate-100 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img
                  src={course.instructor.avatar}
                  alt={course.instructor.name}
                  className="w-7 h-7 rounded-full object-cover border border-amber-300"
                />
                <div>
                  <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">Scholar / Instructor</span>
                  <span className="text-xs font-bold text-slate-900">
                    {course.instructor.name}
                  </span>
                </div>
              </div>
              
              <Rating rating={course.rating} reviewCount={course.reviewCount} size="sm" />
            </div>

            {/* Live Class / Call Timing info box */}
            <div className="flex items-center justify-between text-[11px] bg-amber-50/80 text-amber-900 px-3 py-1.5 rounded-xl border border-amber-200/80 font-medium">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-amber-600" />
                <span>Call Timing:</span>
              </span>
              <span className="font-bold text-amber-950">{course.callTiming || '7:00 PM – 8:00 PM (PKT)'}</span>
            </div>
          </div>

          {/* Course Meta Info */}
          <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500 bg-slate-50 px-3 py-2 rounded-xl border border-slate-100">
            <span className="flex items-center gap-1 font-medium text-slate-700">
              <BookOpen className="w-3.5 h-3.5 text-blue-600" />
              {course.lessonCount} Lessons
            </span>
            <span className="flex items-center gap-1 font-medium text-slate-700">
              <Clock className="w-3.5 h-3.5 text-green-600" />
              {course.duration}
            </span>
            <span className="flex items-center gap-1 font-medium text-slate-700">
              <Award className="w-3.5 h-3.5 text-emerald-600" />
              {course.level}
            </span>
          </div>
        </div>
      </div>

      {/* CTA Footer: Book Course Slot */}
      <div className="px-5 py-3 bg-slate-900 border-t border-slate-800 flex items-center justify-between text-xs font-bold text-amber-400 group-hover:bg-slate-950 transition-colors">
        <span>Book Course Slot & Enroll</span>
        <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  );
};
