import React, { useState } from 'react';
import { PageView, Course } from '../types';
import { Breadcrumb } from '../components/Breadcrumb';
import { coursesData } from '../data/courses';
import { 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  RotateCcw, 
  BookOpen, 
  Award, 
  Clock, 
  HelpCircle,
  Compass,
  Star,
  Zap,
  TrendingUp,
  ShieldCheck
} from 'lucide-react';

interface QuizPageProps {
  onNavigate: (view: PageView, params?: any) => void;
}

interface QuizAnswers {
  interest: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | '';
  goal: string;
  preference: string;
}

export function QuizPage({ onNavigate }: QuizPageProps) {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [answers, setAnswers] = useState<QuizAnswers>({
    interest: '',
    level: '',
    goal: '',
    preference: ''
  });
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [recommendation, setRecommendation] = useState<{
    primary: Course;
    alternatives: Course[];
    matchPercentage: number;
    reasons: string[];
  } | null>(null);

  // Question 1 Options: Field of Interest
  const interestOptions = [
    {
      id: 'quran',
      title: 'Quran & Tajweed (قرآن و تجوید)',
      description: 'Master articulation points (Makharij), rules of Tajweed, and correct recitation.',
      icon: '📖'
    },
    {
      id: 'fiqh',
      title: 'Fiqh & Daily Masail (فقہ و مسائل)',
      description: 'Rules of Taharah, Salah, Zakat, Sawm, and practical day-to-day rulings.',
      icon: '⚖️'
    },
    {
      id: 'finance',
      title: 'Islamic Finance & Halal Commerce (اسلامی معیشت)',
      description: 'Halal income, investments, stock screening, crypto, and business ethics.',
      icon: '💼'
    },
    {
      id: 'hadith',
      title: 'Hadith Sciences & Sunnah (علوم الحدیث)',
      description: 'Authentic Prophetic traditions, chains of narration, and Sahih Bukhari.',
      icon: '📜'
    },
    {
      id: 'seerah',
      title: 'Seerah & Islamic History (سیرت النبی ﷺ)',
      description: 'Life of Prophet Muhammad ﷺ, lessons in leadership, patience, and character.',
      icon: '🕌'
    },
    {
      id: 'aqeedah',
      title: 'Aqeedah & Beliefs (عقائد و ایمانیات)',
      description: 'Pillars of Iman, certainty in faith, Divine decree, and resolving doubts.',
      icon: '⭐'
    }
  ];

  // Question 2 Options: Knowledge Level
  const levelOptions = [
    {
      id: 'Beginner',
      title: 'Beginner / Aaghaz (مبتدی)',
      description: 'Starting from scratch or seeking basic fundamental understanding.',
      badge: 'Level 1'
    },
    {
      id: 'Intermediate',
      title: 'Intermediate / Mutawassit (متوسط)',
      description: 'Have basic knowledge and want structured, in-depth learning.',
      badge: 'Level 2'
    },
    {
      id: 'Advanced',
      title: 'Advanced / Muntahi (منتہی)',
      description: 'Seeking advanced Shariah concepts, research, and mastery.',
      badge: 'Level 3'
    }
  ];

  // Question 3 Options: Learning Goal
  const goalOptions = [
    {
      id: 'worship',
      title: 'Perfect Daily Worship & Practical Application',
      subtitle: 'عبادات کو صحیح اور سنت کے مطابق ادا کرنا',
      desc: 'Ensure your prayers, purity, and daily routines comply with authentic Shariah rulings.'
    },
    {
      id: 'recitation',
      title: 'Flawless Quran Recitation with Tajweed',
      subtitle: 'تجوید اور تلفظ کی درستگی',
      desc: 'Recite Allah\'s Book with proper Makharij, beautiful melody, and Tajweed rules.'
    },
    {
      id: 'finance',
      title: 'Halal Income & Ethical Financial Guidance',
      subtitle: 'حلال رزق اور جائز تجارت کا علم',
      desc: 'Ensure your career, investments, and transactions are 100% Shariah-compliant.'
    },
    {
      id: 'character',
      title: 'Prophetic Character & Moral Guidance',
      subtitle: 'سیرت النبی ﷺ سے رہنمائی اور کردار سازی',
      desc: 'Transform your family life, business relations, and personal ethics through the Seerah.'
    }
  ];

  // Question 4 Options: Preferences
  const preferenceOptions = [
    {
      id: 'self-paced',
      title: 'Flexible Self-Paced Learning',
      desc: 'Short, high-quality video lessons with downloadable PDF notes you can study anytime.'
    },
    {
      id: 'certificate',
      title: 'Structured Course with Completion Certificate',
      desc: 'Step-by-step curriculum with module quizzes and an official verifiable certificate.'
    },
    {
      id: 'free',
      title: 'Free Introductory & Open-Access Learning',
      desc: 'Start immediately without any upfront tuition fees.'
    }
  ];

  const handleSelectInterest = (interestId: string) => {
    setAnswers((prev) => ({ ...prev, interest: interestId }));
  };

  const handleSelectLevel = (lvl: 'Beginner' | 'Intermediate' | 'Advanced') => {
    setAnswers((prev) => ({ ...prev, level: lvl }));
  };

  const handleSelectGoal = (goalId: string) => {
    setAnswers((prev) => ({ ...prev, goal: goalId }));
  };

  const handleSelectPreference = (prefId: string) => {
    setAnswers((prev) => ({ ...prev, preference: prefId }));
  };

  // Analyze Answers & Calculate Recommended Course
  const processRecommendation = (finalAnswers: QuizAnswers) => {
    setIsAnalyzing(true);

    setTimeout(() => {
      let primaryCourseId = 'course-1';
      const reasons: string[] = [];

      // Selection logic based on interest & goals
      if (finalAnswers.interest === 'quran' || finalAnswers.goal === 'recitation') {
        primaryCourseId = 'course-1';
        reasons.push('Matched with your interest in Quranic Studies & Tajweed rules.');
        reasons.push('Ideal for mastering letter articulation (Makharij) and flawless recitation.');
      } else if (finalAnswers.interest === 'finance' || finalAnswers.goal === 'finance') {
        primaryCourseId = 'course-3';
        reasons.push('Matched with your goal for Halal commerce & Shariah financial principles.');
        reasons.push('Covers modern investments, stock screening, and ethical commerce.');
      } else if (finalAnswers.interest === 'fiqh' || finalAnswers.goal === 'worship') {
        primaryCourseId = 'course-2';
        reasons.push('Matched with your goal of perfecting daily obligatory acts of worship.');
        reasons.push('Step-by-step practical guide to Taharah, Salah, and daily Shariah rulings.');
      } else if (finalAnswers.interest === 'hadith') {
        primaryCourseId = 'course-4';
        reasons.push('Matched with your interest in Prophetic Hadith traditions & sciences.');
        reasons.push('Explores authentic narrations, Sahih Bukhari, and Hadith classification.');
      } else if (finalAnswers.interest === 'seerah' || finalAnswers.goal === 'character') {
        primaryCourseId = 'course-5';
        reasons.push('Matched with your focus on Prophetic biography & moral character.');
        reasons.push('Extracts timeless leadership and spiritual lessons for modern life.');
      } else if (finalAnswers.interest === 'aqeedah') {
        primaryCourseId = 'course-6';
        reasons.push('Matched with your goal for solidifying core Islamic Aqeedah and certainty.');
        reasons.push('Anchors faith with rational proofs and classical Shariah fundamentals.');
      } else {
        primaryCourseId = 'course-2';
        reasons.push('Selected as the foundational Shariah course suitable for all learners.');
      }

      if (finalAnswers.level) {
        reasons.push(`Tailored specifically for your chosen level: ${finalAnswers.level}.`);
      }

      if (finalAnswers.preference === 'certificate') {
        reasons.push('Includes verifiable digital certificate upon completing curriculum.');
      } else if (finalAnswers.preference === 'free') {
        reasons.push('Features zero tuition cost with instant free access.');
      }

      const primary = coursesData.find((c) => c.id === primaryCourseId) || coursesData[0];
      const alternatives = coursesData.filter((c) => c.id !== primary.id).slice(0, 2);

      setRecommendation({
        primary,
        alternatives,
        matchPercentage: 98,
        reasons
      });

      setIsAnalyzing(false);
      setShowResult(true);
    }, 1200);
  };

  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep((prev) => prev + 1);
    } else {
      processRecommendation(answers);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const resetQuiz = () => {
    setCurrentStep(1);
    setAnswers({ interest: '', level: '', goal: '', preference: '' });
    setShowResult(false);
    setRecommendation(null);
  };

  const canProceed = () => {
    if (currentStep === 1) return !!answers.interest;
    if (currentStep === 2) return !!answers.level;
    if (currentStep === 3) return !!answers.goal;
    if (currentStep === 4) return !!answers.preference;
    return false;
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Breadcrumb Navigation */}
        <Breadcrumb
          items={[
            { label: 'Courses', view: 'courses' },
            { label: 'MCQ Course Test & Recommendation' }
          ]}
          onNavigate={onNavigate}
        />

        {/* Header Title Section */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 text-blue-900 border border-blue-200 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-blue-700" />
            Smart MCQ Assessment Tool
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold font-heading text-slate-900">
            Find Your Ideal Course in 1 Minute
          </h1>
          <p className="text-xs sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Answer 4 simple multiple-choice questions to receive a personalized course recommendation tailored to your interest, knowledge level, and learning goals.
          </p>
        </div>

        {/* LOADING / ANALYZING STATE */}
        {isAnalyzing && (
          <div className="bg-white rounded-3xl p-12 border border-slate-200 shadow-xl text-center space-y-6">
            <div className="relative w-20 h-20 mx-auto">
              <div className="w-20 h-20 rounded-full border-4 border-slate-100 border-t-green-600 animate-spin" />
              <Zap className="w-8 h-8 text-green-600 absolute inset-0 m-auto animate-pulse" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold font-heading text-slate-900">
                Analyzing your answers...
              </h3>
              <p className="text-xs sm:text-sm text-slate-500">
                Matching your preferences against our Shariah courses catalog.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-50 text-slate-600 text-xs font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Evaluating match percentage with expert instructors...
            </div>
          </div>
        )}

        {/* QUIZ RESULT SHOWCASE */}
        {!isAnalyzing && showResult && recommendation && (
          <div className="space-y-8">
            
            {/* Suitable Banner Callout */}
            <div className="bg-gradient-to-r from-emerald-900 via-blue-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-2xl space-y-4 border border-emerald-500/30 relative overflow-hidden">
              <div className="absolute top-0 right-0 -mr-10 -mt-10 w-48 h-48 bg-emerald-500/10 rounded-full blur-2xl" />
              
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-xs font-bold tracking-wide flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  {recommendation.matchPercentage}% Recommendation Match
                </span>
                <span className="text-xs text-slate-300 font-medium">
                  Based on your MCQ answers
                </span>
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-amber-300">
                  “Aapke liye ye course suitable hai!”
                </h2>
                <p className="text-sm sm:text-base text-slate-200">
                  Here is the exact course best matched to your interest, level, and learning style.
                </p>
              </div>
            </div>

            {/* Primary Recommended Course Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-green-700 shadow-xl space-y-6">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                
                {/* Course Thumbnail */}
                <div className="w-full md:w-64 h-44 rounded-2xl overflow-hidden shrink-0 relative bg-slate-900 border border-slate-200">
                  <img
                    src={recommendation.primary.thumbnail}
                    alt={recommendation.primary.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-slate-900/90 text-amber-400 text-xs font-bold flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    {recommendation.primary.rating}
                  </div>
                  {recommendation.primary.isFree && (
                    <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-emerald-700 text-white text-xs font-bold">
                      FREE
                    </div>
                  )}
                </div>

                {/* Course Main Details */}
                <div className="flex-1 space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-bold">
                      {recommendation.primary.category}
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-semibold">
                      Level: {recommendation.primary.level}
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 text-xs font-semibold flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {recommendation.primary.duration}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold font-heading text-slate-900 leading-snug">
                    {recommendation.primary.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {recommendation.primary.subtitle}
                  </p>

                  {/* Instructor detail */}
                  <div className="flex items-center gap-3 pt-2">
                    <img
                      src={recommendation.primary.instructor.avatar}
                      alt={recommendation.primary.instructor.name}
                      className="w-9 h-9 rounded-full object-cover border border-slate-200"
                    />
                    <div>
                      <div className="text-xs font-bold text-slate-900">
                        {recommendation.primary.instructor.name}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {recommendation.primary.instructor.title}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Reasons why it fits */}
              <div className="pt-6 border-t border-slate-100 space-y-3">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                  <Compass className="w-4 h-4 text-green-700" />
                  Why this course fits your profile:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {recommendation.reasons.map((reason, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                      <span>{reason}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Bar */}
              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-center sm:text-left">
                  <span className="text-xs text-slate-400 block font-medium">Course Tuition:</span>
                  <span className="text-2xl font-extrabold font-heading text-slate-900">
                    {recommendation.primary.isFree ? (
                      <span className="text-emerald-600">Free Access</span>
                    ) : (
                      `₹${recommendation.primary.price}`
                    )}
                  </span>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={resetQuiz}
                    className="flex-1 sm:flex-none px-4 py-3 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs font-bold transition-all flex items-center justify-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Retake MCQ Test</span>
                  </button>

                  <button
                    onClick={() => onNavigate('course-detail', { courseId: recommendation.primary.id })}
                    className="flex-1 sm:flex-none px-6 py-3 rounded-xl bg-gradient-to-r from-green-700 to-emerald-800 hover:from-green-600 hover:to-emerald-700 text-white text-xs font-bold shadow-lg transition-transform hover:scale-105 flex items-center justify-center gap-2"
                  >
                    <span>Enroll in Suitable Course</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Alternative Suitable Courses */}
            {recommendation.alternatives.length > 0 && (
              <div className="space-y-4 pt-4">
                <h3 className="text-lg font-bold font-heading text-slate-900 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  Other Alternate Courses You May Like:
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {recommendation.alternatives.map((altCourse) => (
                    <div
                      key={altCourse.id}
                      onClick={() => onNavigate('course-detail', { courseId: altCourse.id })}
                      className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-blue-400 shadow-sm hover:shadow-md transition-all cursor-pointer flex gap-4 items-center"
                    >
                      <img
                        src={altCourse.thumbnail}
                        alt={altCourse.title}
                        className="w-20 h-20 rounded-xl object-cover shrink-0 border border-slate-200"
                      />
                      <div className="space-y-1 min-w-0">
                        <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                          {altCourse.category}
                        </span>
                        <h4 className="text-sm font-bold text-slate-900 truncate">
                          {altCourse.title}
                        </h4>
                        <div className="text-xs text-slate-500">
                          {altCourse.instructor.name} • {altCourse.duration}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}

        {/* STEP-BY-STEP QUESTION WIZARD */}
        {!isAnalyzing && !showResult && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-8">
            
            {/* Progress Stepper Bar */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-slate-600">
                <span>Step {currentStep} of 4</span>
                <span className="text-blue-700">
                  {currentStep === 1 && 'Field of Interest'}
                  {currentStep === 2 && 'Knowledge Level'}
                  {currentStep === 3 && 'Learning Goal'}
                  {currentStep === 4 && 'Learning Style & Pace'}
                </span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-600 to-green-600 transition-all duration-300"
                  style={{ width: `${(currentStep / 4) * 100}%` }}
                />
              </div>
            </div>

            {/* STEP 1: FIELD OF INTEREST */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="space-y-1">
                  <h3 className="text-xl font-bold font-heading text-slate-900 flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-blue-600" />
                    1. What area of Islamic knowledge interests you the most?
                  </h3>
                  <p className="text-xs text-slate-500">
                    Aapka kis shoube mein sab se zyaada interest hai?
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {interestOptions.map((opt) => {
                    const isSelected = answers.interest === opt.id;
                    return (
                      <div
                        key={opt.id}
                        onClick={() => handleSelectInterest(opt.id)}
                        className={`p-5 rounded-2xl border-2 cursor-pointer transition-all space-y-3 relative overflow-hidden ${
                          isSelected
                            ? 'border-green-600 bg-emerald-50/80 shadow-md ring-2 ring-green-600/30'
                            : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-3xl">{opt.icon}</span>
                          {isSelected && (
                            <CheckCircle2 className="w-6 h-6 text-green-700" />
                          )}
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-slate-900">{opt.title}</h4>
                          <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                            {opt.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 2: KNOWLEDGE LEVEL */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="space-y-1">
                  <h3 className="text-xl font-bold font-heading text-slate-900 flex items-center gap-2">
                    <Award className="w-5 h-5 text-blue-600" />
                    2. What is your current knowledge level in Islamic Studies?
                  </h3>
                  <p className="text-xs text-slate-500">
                    Aapka current knowledge level kya hai?
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {levelOptions.map((opt) => {
                    const isSelected = answers.level === opt.id;
                    return (
                      <div
                        key={opt.id}
                        onClick={() => handleSelectLevel(opt.id as any)}
                        className={`p-6 rounded-2xl border-2 cursor-pointer transition-all space-y-3 ${
                          isSelected
                            ? 'border-green-600 bg-emerald-50/80 shadow-md ring-2 ring-green-600/30'
                            : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-extrabold">
                            {opt.badge}
                          </span>
                          {isSelected && <CheckCircle2 className="w-6 h-6 text-green-700" />}
                        </div>
                        <h4 className="text-base font-bold text-slate-900">{opt.title}</h4>
                        <p className="text-xs text-slate-500 leading-relaxed">
                          {opt.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 3: LEARNING GOAL */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="space-y-1">
                  <h3 className="text-xl font-bold font-heading text-slate-900 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-blue-600" />
                    3. What do you primarily want to achieve or learn?
                  </h3>
                  <p className="text-xs text-slate-500">
                    Aap is course se kya seekhna chahte hain?
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {goalOptions.map((opt) => {
                    const isSelected = answers.goal === opt.id;
                    return (
                      <div
                        key={opt.id}
                        onClick={() => handleSelectGoal(opt.id)}
                        className={`p-5 rounded-2xl border-2 cursor-pointer transition-all space-y-2 ${
                          isSelected
                            ? 'border-green-600 bg-emerald-50/80 shadow-md ring-2 ring-green-600/30'
                            : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-bold text-slate-900">{opt.title}</h4>
                          {isSelected && <CheckCircle2 className="w-5 h-5 text-green-700 shrink-0" />}
                        </div>
                        <span className="text-xs text-emerald-800 font-semibold block">{opt.subtitle}</span>
                        <p className="text-xs text-slate-500 leading-relaxed">{opt.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 4: PREFERENCES */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="space-y-1">
                  <h3 className="text-xl font-bold font-heading text-slate-900 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-blue-600" />
                    4. What are your learning style & pace preferences?
                  </h3>
                  <p className="text-xs text-slate-500">
                    Aapki learning preferences kya hain?
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {preferenceOptions.map((opt) => {
                    const isSelected = answers.preference === opt.id;
                    return (
                      <div
                        key={opt.id}
                        onClick={() => handleSelectPreference(opt.id)}
                        className={`p-5 rounded-2xl border-2 cursor-pointer transition-all space-y-3 ${
                          isSelected
                            ? 'border-green-600 bg-emerald-50/80 shadow-md ring-2 ring-green-600/30'
                            : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-bold text-slate-900">{opt.title}</h4>
                          {isSelected && <CheckCircle2 className="w-5 h-5 text-green-700 shrink-0" />}
                        </div>
                        <p className="text-xs text-slate-500 leading-relaxed">{opt.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* CONTROLS FOOTER */}
            <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={handlePrevStep}
                disabled={currentStep === 1}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold border border-slate-200 transition-all ${
                  currentStep === 1
                    ? 'opacity-40 cursor-not-allowed text-slate-400 bg-slate-50'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                ← Previous Step
              </button>

              <button
                onClick={handleNextStep}
                disabled={!canProceed()}
                className={`px-6 py-3 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shadow-md ${
                  canProceed()
                    ? 'bg-gradient-to-r from-green-700 to-emerald-800 text-white hover:opacity-95 hover:scale-105'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                <span>{currentStep === 4 ? 'Analyze & Get Recommendation' : 'Next Step'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
