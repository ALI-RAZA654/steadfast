import React, { useState } from 'react';
import { PageView, McqQuestion, QuizAttemptResult, TopicPerformance, WrongQuestionAnalysis } from '../types';
import { Breadcrumb } from '../components/Breadcrumb';
import { mockMcqQuestions, mockQuizHistory } from '../data/mockAnalyticsAndCoupons';
import { 
  Sparkles, 
  CheckCircle2, 
  XCircle,
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
  ShieldCheck,
  BarChart2,
  FileText,
  AlertTriangle,
  Check,
  History,
  Target
} from 'lucide-react';

interface QuizPageProps {
  onNavigate: (view: PageView, params?: any) => void;
}

export function QuizPage({ onNavigate }: QuizPageProps) {
  const [activeTab, setActiveTab] = useState<'take-quiz' | 'history'>('take-quiz');
  
  // MCQ Quiz State
  const [questions, setQuestions] = useState<McqQuestion[]>(mockMcqQuestions);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [userSelectedAnswers, setUserSelectedAnswers] = useState<Record<string, 'A' | 'B' | 'C' | 'D'>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  
  // Test Results State
  const [currentResult, setCurrentResult] = useState<QuizAttemptResult | null>(null);
  const [historyList, setHistoryList] = useState<QuizAttemptResult[]>(mockQuizHistory);

  const currentQ = questions[currentQuestionIndex];

  const handleSelectOption = (questionId: string, optionKey: 'A' | 'B' | 'C' | 'D') => {
    if (isSubmitted) return;
    setUserSelectedAnswers(prev => ({
      ...prev,
      [questionId]: optionKey
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleSubmitQuiz = () => {
    // Calculate Score & Analytics
    let correctCount = 0;
    let incorrectCount = 0;
    const wrongQuestionsList: WrongQuestionAnalysis[] = [];

    // Topic wise metrics
    const topicStats: Record<string, { total: number; correct: number }> = {};

    questions.forEach(q => {
      const selected = userSelectedAnswers[q.id];
      if (!topicStats[q.topic]) {
        topicStats[q.topic] = { total: 0, correct: 0 };
      }
      topicStats[q.topic].total += 1;

      if (selected === q.correctKey) {
        correctCount += 1;
        topicStats[q.topic].correct += 1;
      } else {
        incorrectCount += 1;
        const selectedOpt = q.options.find(o => o.key === selected);
        const correctOpt = q.options.find(o => o.key === q.correctKey);
        wrongQuestionsList.push({
          questionId: q.id,
          questionText: q.question,
          topic: q.topic,
          userAnswerKey: selected || 'None',
          userAnswerText: selectedOpt ? `${selectedOpt.key}: ${selectedOpt.text}` : 'Not Answered',
          correctAnswerKey: q.correctKey,
          correctAnswerText: `${correctOpt?.key}: ${correctOpt?.text}`,
          explanation: q.explanation
        });
      }
    });

    const totalQuestions = questions.length;
    const percentage = Math.round((correctCount / totalQuestions) * 100);

    // Topic Performances
    const topicBreakdownList: TopicPerformance[] = Object.keys(topicStats).map(tName => {
      const t = topicStats[tName];
      const p = Math.round((t.correct / t.total) * 100);
      let status: 'Strong 💪' | 'Moderate ⚖️' | 'Weak / Needs Improvement ⚠️' = 'Strong 💪';
      if (p < 60) status = 'Weak / Needs Improvement ⚠️';
      else if (p < 80) status = 'Moderate ⚖️';

      return {
        topic: tName,
        totalQuestions: t.total,
        correctCount: t.correct,
        percentage: p,
        status
      };
    });

    const strongTopics = topicBreakdownList.filter(t => t.percentage >= 75).map(t => t.topic);
    const weakTopics = topicBreakdownList.filter(t => t.percentage < 75).map(t => t.topic);

    let badge = 'Intermediate Pass';
    if (percentage >= 85) badge = 'Distinction / Scholar Standard 🏆';
    else if (percentage >= 70) badge = 'Merit / Advanced Competency ⭐';
    else if (percentage < 50) badge = 'Requires Study & Revision 📖';

    const newResultRecord: QuizAttemptResult = {
      id: `attempt-${Date.now()}`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      testName: `Scholar Assessment MCQ Quiz #${historyList.length + 1}`,
      totalQuestions,
      correctCount,
      incorrectCount,
      marksObtained: correctCount,
      totalMarks: totalQuestions,
      percentage,
      overallScoreBadge: badge,
      topicBreakdown: topicBreakdownList,
      wrongQuestions: wrongQuestionsList,
      strongTopics: strongTopics.length > 0 ? strongTopics : ['General Knowledge'],
      weakTopics: weakTopics.length > 0 ? weakTopics : ['None']
    };

    setCurrentResult(newResultRecord);
    setHistoryList([newResultRecord, ...historyList]);
    setIsSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRetakeQuiz = () => {
    setUserSelectedAnswers({});
    setCurrentQuestionIndex(0);
    setIsSubmitted(false);
    setCurrentResult(null);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-24 text-slate-800 font-sans">
      <Breadcrumb items={[{ label: 'Automated MCQ Test & Analytics' }]} onNavigate={onNavigate} />

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-teal-950 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-2 z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider border border-emerald-400/30">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Automated Scholar MCQ Assessment System</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black font-heading text-white tracking-tight">
            Islamic Knowledge & Level Test
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
            Test your knowledge across Aqeedah, Fiqh, Quran, Seerah, Hadith, and Islamic Finance. Receive instant topic-wise strength & weakness analysis.
          </p>
        </div>

        {/* View History & Retake buttons */}
        <div className="flex items-center gap-2 z-10">
          <button
            onClick={() => setActiveTab(activeTab === 'take-quiz' ? 'history' : 'take-quiz')}
            className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold text-xs rounded-xl border border-slate-700 transition-colors flex items-center gap-1.5"
          >
            <History className="w-4 h-4" />
            <span>{activeTab === 'take-quiz' ? 'View Test History' : 'Back to Active Test'}</span>
          </button>
        </div>
      </div>

      {/* TAB NAVIGATION: Take Quiz vs Past Performance History */}
      {activeTab === 'history' ? (
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft-lg space-y-6 animate-in fade-in duration-200">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-lg font-bold font-heading text-slate-900 flex items-center gap-2">
                <History className="w-5 h-5 text-indigo-600" />
                <span>Student Test Performance History</span>
              </h2>
              <p className="text-xs text-slate-500 mt-1">Track your scores over time to monitor progress and topic improvements.</p>
            </div>
            <button
              onClick={() => setActiveTab('take-quiz')}
              className="px-4 py-2 bg-slate-900 text-amber-400 font-bold text-xs rounded-xl hover:bg-slate-800 transition-colors"
            >
              Take New Test
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-100 text-slate-900 uppercase text-[10px] font-bold">
                <tr>
                  <th className="p-3">Test Name & Date</th>
                  <th className="p-3">Score Marks</th>
                  <th className="p-3">Percentage</th>
                  <th className="p-3">Strong Topics</th>
                  <th className="p-3">Weak Topics</th>
                  <th className="p-3 text-right">Rating</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {historyList.map(h => (
                  <tr key={h.id} className="hover:bg-slate-50">
                    <td className="p-3 font-bold text-slate-900">
                      {h.testName}
                      <br/>
                      <span className="text-[10px] text-slate-400 font-normal">{h.date}</span>
                    </td>
                    <td className="p-3 font-semibold">{h.correctCount} / {h.totalQuestions} Marks</td>
                    <td className="p-3">
                      <span className="font-extrabold text-emerald-800 text-sm">{h.percentage}%</span>
                    </td>
                    <td className="p-3">
                      <div className="flex flex-wrap gap-1">
                        {h.strongTopics.map((st, i) => (
                          <span key={i} className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                            💪 {st}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex flex-wrap gap-1">
                        {h.weakTopics.map((wt, i) => (
                          <span key={i} className="px-2 py-0.5 rounded bg-rose-100 text-rose-800 font-bold text-[10px]">
                            ⚠️ {wt}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="p-3 text-right">
                      <span className="px-2.5 py-1 rounded-full bg-slate-900 text-amber-300 font-extrabold text-[10px]">
                        {h.overallScoreBadge}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <>
          {/* RESULTS DISPLAY AFTER SUBMITTING QUIZ */}
          {isSubmitted && currentResult && (
            <div className="space-y-8 animate-in fade-in duration-300">
              
              {/* Score & Marks Summary Report Card */}
              <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-emerald-950 rounded-3xl p-6 sm:p-8 text-white border border-amber-400/40 shadow-2xl space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
                  <div>
                    <span className="text-xs text-amber-400 font-bold uppercase tracking-wider">Comprehensive Test Score & Marks Report</span>
                    <h2 className="text-2xl sm:text-3xl font-black font-heading text-white mt-1">Your Assessment Result</h2>
                  </div>
                  <span className="px-4 py-2 bg-amber-400 text-slate-950 font-black rounded-2xl text-xs sm:text-sm shadow-md">
                    {currentResult.overallScoreBadge}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                  <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Questions</span>
                    <span className="text-2xl font-black font-heading text-white">{currentResult.totalQuestions}</span>
                  </div>
                  <div className="p-4 bg-emerald-950/60 rounded-2xl border border-emerald-500/30">
                    <span className="text-[10px] uppercase font-bold text-emerald-400 block">Correct Answers</span>
                    <span className="text-2xl font-black font-heading text-emerald-400">{currentResult.correctCount} ✔️</span>
                  </div>
                  <div className="p-4 bg-rose-950/60 rounded-2xl border border-rose-500/30">
                    <span className="text-[10px] uppercase font-bold text-rose-400 block">Incorrect Answers</span>
                    <span className="text-2xl font-black font-heading text-rose-400">{currentResult.incorrectCount} ❌</span>
                  </div>
                  <div className="p-4 bg-amber-950/60 rounded-2xl border border-amber-500/30">
                    <span className="text-[10px] uppercase font-bold text-amber-300 block">Marks & Percentage</span>
                    <span className="text-2xl font-black font-heading text-amber-400">{currentResult.percentage}%</span>
                  </div>
                </div>

                <div className="pt-2 flex justify-center gap-3">
                  <button
                    onClick={handleRetakeQuiz}
                    className="px-6 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs rounded-xl transition-all shadow-md flex items-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Retake MCQ Quiz</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('history')}
                    className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold text-xs rounded-xl border border-slate-700 transition-all flex items-center gap-2"
                  >
                    <History className="w-4 h-4" />
                    <span>View Performance History</span>
                  </button>
                </div>
              </div>

              {/* Topic-Wise Strength & Weakness Breakdown */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft-lg space-y-6">
                <h3 className="text-lg font-bold font-heading text-slate-900 flex items-center gap-2">
                  <Target className="w-5 h-5 text-emerald-600" />
                  <span>Topic-Wise Strength & Weakness Breakdown</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {currentResult.topicBreakdown.map((t, idx) => (
                    <div key={idx} className="p-5 rounded-2xl border border-slate-200 space-y-3 bg-slate-50/50">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm text-slate-900">{t.topic}</span>
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          t.percentage >= 75 ? 'bg-emerald-100 text-emerald-800' :
                          t.percentage >= 60 ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'
                        }`}>
                          {t.status}
                        </span>
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between text-xs text-slate-600 font-semibold">
                          <span>Accuracy: {t.correctCount} / {t.totalQuestions} Questions</span>
                          <span className="font-bold text-slate-900">{t.percentage}%</span>
                        </div>
                        <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full transition-all ${
                              t.percentage >= 75 ? 'bg-emerald-600' :
                              t.percentage >= 60 ? 'bg-amber-500' : 'bg-rose-500'
                            }`}
                            style={{ width: `${t.percentage}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Strong vs Weak Summary Badges */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2">
                    <span className="text-xs font-bold text-emerald-900 uppercase flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      Strong Topics (Solid Foundation):
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {currentResult.strongTopics.map((st, i) => (
                        <span key={i} className="px-3 py-1 bg-white border border-emerald-300 rounded-xl text-xs font-extrabold text-emerald-800">
                          💪 {st}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 space-y-2">
                    <span className="text-xs font-bold text-rose-900 uppercase flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4 text-rose-600" />
                      Weak Topics (Requires Revision):
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {currentResult.weakTopics.map((wt, i) => (
                        <span key={i} className="px-3 py-1 bg-white border border-rose-300 rounded-xl text-xs font-extrabold text-rose-800">
                          ⚠️ {wt}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Detailed Wrong Questions Analysis */}
              {currentResult.wrongQuestions.length > 0 && (
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft-lg space-y-6">
                  <div className="border-b border-slate-100 pb-3">
                    <h3 className="text-lg font-bold font-heading text-slate-900 flex items-center gap-2">
                      <XCircle className="w-5 h-5 text-rose-600" />
                      <span>Detailed Wrong Answers & Solution Proofs</span>
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">Review the questions you got wrong to correct your misconceptions.</p>
                  </div>

                  <div className="space-y-4">
                    {currentResult.wrongQuestions.map((wq, idx) => (
                      <div key={wq.questionId} className="p-5 rounded-2xl border border-rose-200 bg-rose-50/40 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] uppercase font-extrabold px-2.5 py-0.5 rounded-full bg-slate-900 text-amber-300">
                            Topic: {wq.topic}
                          </span>
                          <span className="text-xs text-rose-700 font-bold">Question #{idx + 1}</span>
                        </div>

                        <h4 className="text-sm font-bold text-slate-900">{wq.questionText}</h4>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                          <div className="p-3 bg-rose-100/80 rounded-xl border border-rose-200 text-rose-900 font-semibold">
                            <span className="block text-[10px] uppercase font-bold text-rose-700">Your Selected Option: ❌</span>
                            <span>{wq.userAnswerText}</span>
                          </div>
                          <div className="p-3 bg-emerald-100/80 rounded-xl border border-emerald-200 text-emerald-900 font-semibold">
                            <span className="block text-[10px] uppercase font-bold text-emerald-700">Correct Answer: ✔️</span>
                            <span>{wq.correctAnswerText}</span>
                          </div>
                        </div>

                        <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs text-slate-700 space-y-1">
                          <span className="font-bold text-slate-900 flex items-center gap-1">
                            <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
                            Scholar Explanation:
                          </span>
                          <p className="text-slate-600">{wq.explanation}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          )}

          {/* ACTIVE TEST TAKING RUNNER */}
          {!isSubmitted && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft-lg space-y-6">
              
              {/* Stepper Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <span className="text-[10px] uppercase font-extrabold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-800 border border-indigo-200">
                    Topic: {currentQ.topic}
                  </span>
                  <h2 className="text-lg font-bold font-heading text-slate-900 mt-2">
                    Question {currentQuestionIndex + 1} of {questions.length}
                  </h2>
                </div>

                <div className="text-right">
                  <span className="text-xs font-bold text-slate-500">Answered: </span>
                  <span className="text-xs font-black text-emerald-700">
                    {Object.keys(userSelectedAnswers).length} / {questions.length}
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-slate-900 h-full rounded-full transition-all"
                  style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                />
              </div>

              {/* Question Statement */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <h3 className="text-base sm:text-lg font-bold font-heading text-slate-900 leading-snug">
                  {currentQ.question}
                </h3>
              </div>

              {/* Options Selection List */}
              <div className="space-y-3">
                {currentQ.options.map(opt => {
                  const isSelected = userSelectedAnswers[currentQ.id] === opt.key;
                  return (
                    <button
                      key={opt.key}
                      onClick={() => handleSelectOption(currentQ.id, opt.key)}
                      className={`w-full p-4 rounded-2xl border-2 text-left transition-all flex items-center justify-between ${
                        isSelected
                          ? 'bg-slate-900 text-amber-300 border-slate-900 shadow-md'
                          : 'bg-white text-slate-800 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`w-8 h-8 rounded-xl font-bold flex items-center justify-center text-xs ${
                          isSelected ? 'bg-amber-400 text-slate-950 font-black' : 'bg-slate-100 text-slate-700'
                        }`}>
                          {opt.key}
                        </span>
                        <span className="text-xs sm:text-sm font-semibold">{opt.text}</span>
                      </div>

                      {isSelected && <Check className="w-5 h-5 text-amber-400" />}
                    </button>
                  );
                })}
              </div>

              {/* Stepper Navigation Controls */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <button
                  disabled={currentQuestionIndex === 0}
                  onClick={handlePrev}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-100 disabled:opacity-40 transition-colors"
                >
                  Previous
                </button>

                {currentQuestionIndex < questions.length - 1 ? (
                  <button
                    onClick={handleNext}
                    className="px-6 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors flex items-center gap-2"
                  >
                    <span>Next Question</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmitQuiz}
                    className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-700 text-white rounded-xl text-xs font-extrabold hover:from-emerald-500 hover:to-teal-600 transition-all shadow-md flex items-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                    <span>Submit Test & View Full Analytics</span>
                  </button>
                )}
              </div>

            </div>
          )}
        </>
      )}

    </div>
  );
}
