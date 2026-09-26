import React, { useState, useEffect } from 'react';
import { PageView, Expert, Category, Course, Article, Booking, User, ToastMessage } from './types';

// Mock Data
import { categoriesData } from './data/categories';
import { expertsData } from './data/experts';
import { coursesData } from './data/courses';
import { articlesData } from './data/articles';
import { mockCurrentUser, mockBookings, mockCertificates, mockChatMessages } from './data/mockUserData';

// Components & Showcase
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { MobileBottomNav } from './components/MobileBottomNav';
import { Toast } from './components/Toast';
import { Modal } from './components/Modal';
import { ScreensOverview } from './components/ScreensOverview';


// Pages
import { HomePage } from './pages/HomePage';
import { CategoriesPage } from './pages/CategoriesPage';
import { CategoryDetailPage } from './pages/CategoryDetailPage';
import { ExpertsPage } from './pages/ExpertsPage';
import { ExpertProfilePage } from './pages/ExpertProfilePage';
import { BookingPage } from './pages/BookingPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { ConfirmationPage } from './pages/ConfirmationPage';
import { ChatSessionPage } from './pages/ChatSessionPage';
import { CoursesPage } from './pages/CoursesPage';
import { CourseDetailPage } from './pages/CourseDetailPage';
import { StudentDashboardPage } from './pages/StudentDashboardPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { LessonPage } from './pages/LessonPage';
import { CertificatesPage } from './pages/CertificatesPage';
import { ResourcesPage } from './pages/ResourcesPage';
import { ArticleDetailPage } from './pages/ArticleDetailPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { ProfilePage } from './pages/ProfilePage';
import { QuizPage } from './pages/QuizPage';

// Call icons
import { Phone, Video, Mic, MicOff, VideoOff, PhoneOff, ShieldCheck } from 'lucide-react';

export function App() {
  // State Management
  const [currentView, setCurrentView] = useState<PageView>('home');
  const [viewParams, setViewParams] = useState<any>({});
  
  const [currentUser, setCurrentUser] = useState<User>({
    ...mockCurrentUser,
    role: 'student'
  });
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [bookings, setBookings] = useState<Booking[]>(mockBookings);
  const [toast, setToast] = useState<ToastMessage | null>(null);

  // Call Modal simulation state
  const [activeCallModal, setActiveCallModal] = useState<{ type: 'voice' | 'video'; expert: Expert } | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);

  // Navigation handler
  const handleNavigate = (view: PageView, params: any = {}) => {
    if (view === 'dashboard' && !isLoggedIn) {
      setCurrentView('login');
      setViewParams(params);
      showToastNotification('info', 'Please enter your Admin or Student credentials to access the Dashboard.');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    setCurrentView(view);
    setViewParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const showToastNotification = (type: 'success' | 'error' | 'info', message: string) => {
    setToast({ id: `toast-${Date.now()}`, type, message });
  };

  // Direct Book Consultation launcher
  const handleBookConsultation = (expertId: string, method: 'chat' | 'voice') => {
    handleNavigate('booking', { expertId, method });
  };

  // Active call trigger
  const handleLaunchCall = (type: 'voice' | 'video', expert: Expert) => {
    setActiveCallModal({ type, expert });
  };

  // Helper getters
  const selectedCategory = categoriesData.find(c => c.id === viewParams.categoryId) || categoriesData[0];
  const selectedExpert = expertsData.find(e => e.id === viewParams.expertId) || expertsData[0];
  const selectedCourse = coursesData.find(c => c.id === viewParams.courseId) || coursesData[0];
  const selectedArticle = articlesData.find(a => a.id === viewParams.articleId) || articlesData[0];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans selection:bg-green-700 selection:text-white">
      
      {/* Toast Notification Container */}
      <Toast toast={toast} onClose={() => setToast(null)} />

      {/* Global Header */}
      <Header
        currentView={currentView}
        onNavigate={handleNavigate}
        isLoggedIn={isLoggedIn}
        currentUser={currentUser}
      />

      {/* Page Content View Router */}
      <main className="flex-1">
        {currentView === 'screens-overview' && (
          <ScreensOverview
            categories={categoriesData}
            experts={expertsData}
            onNavigate={handleNavigate}
          />
        )}

        {currentView === 'home' && (
          <HomePage
            categories={categoriesData}
            experts={expertsData}
            courses={coursesData}
            onNavigate={handleNavigate}
            onBookConsultation={handleBookConsultation}
          />
        )}

        {currentView === 'categories' && (
          <CategoriesPage
            categories={categoriesData}
            onNavigate={handleNavigate}
          />
        )}

        {currentView === 'category-detail' && (
          <CategoryDetailPage
            category={selectedCategory}
            experts={expertsData}
            courses={coursesData}
            articles={articlesData}
            onNavigate={handleNavigate}
            onBookConsultation={handleBookConsultation}
          />
        )}

        {currentView === 'experts' && (
          <ExpertsPage
            experts={expertsData}
            categories={categoriesData}
            onNavigate={handleNavigate}
            onBookConsultation={handleBookConsultation}
            initialSearch={viewParams.search || ''}
            initialCategory={viewParams.category || ''}
          />
        )}

        {currentView === 'expert-profile' && (
          <ExpertProfilePage
            expert={selectedExpert}
            onNavigate={handleNavigate}
            onBookConsultation={handleBookConsultation}
          />
        )}

        {currentView === 'booking' && (
          <BookingPage
            experts={expertsData}
            initialExpertId={viewParams.expertId}
            initialMethod={viewParams.method}
            onNavigate={handleNavigate}
            onConfirmBookingDetails={(payload) => setViewParams({ ...viewParams, bookingDraft: payload })}
          />
        )}

        {currentView === 'checkout' && (
          <CheckoutPage
            bookingData={viewParams.bookingDraft}
            onNavigate={handleNavigate}
            onCompleteBooking={(newRecord) => {
              setBookings([newRecord, ...bookings]);
              showToastNotification('success', 'Consultation payment confirmed!');
            }}
          />
        )}

        {currentView === 'confirmation' && (
          <ConfirmationPage
            bookingRecord={viewParams.booking}
            onNavigate={handleNavigate}
          />
        )}

        {currentView === 'chat' && (
          <ChatSessionPage
            expert={selectedExpert}
            initialMessages={mockChatMessages}
            onNavigate={handleNavigate}
            onLaunchCallModal={(type) => handleLaunchCall(type, selectedExpert)}
          />
        )}

        {currentView === 'courses' && (
          <CoursesPage
            courses={coursesData}
            categories={categoriesData}
            onNavigate={handleNavigate}
            initialCategory={viewParams.category || ''}
          />
        )}

        {currentView === 'course-detail' && (
          <CourseDetailPage
            course={selectedCourse}
            onNavigate={handleNavigate}
            onEnroll={(courseId) => showToastNotification('success', 'Enrolled in course successfully!')}
          />
        )}

        {currentView === 'dashboard' && (
          currentUser.role === 'admin' ? (
            <AdminDashboardPage
              user={currentUser}
              experts={expertsData}
              bookings={bookings}
              categories={categoriesData}
              onNavigate={handleNavigate}
              onLogout={() => {
                setIsLoggedIn(false);
                handleNavigate('login');
                showToastNotification('info', 'Logged out successfully');
              }}
            />
          ) : (
            <StudentDashboardPage
              user={currentUser}
              bookings={bookings}
              courses={coursesData}
              certificates={mockCertificates}
              onNavigate={handleNavigate}
            />
          )
        )}

        {currentView === 'lesson' && (
          <LessonPage
            course={selectedCourse}
            initialLessonId={viewParams.lessonId}
            onNavigate={handleNavigate}
          />
        )}

        {currentView === 'certificates' && (
          <CertificatesPage
            certificates={mockCertificates}
            onNavigate={handleNavigate}
          />
        )}

        {currentView === 'resources' && (
          <ResourcesPage
            articles={articlesData}
            onNavigate={handleNavigate}
          />
        )}

        {currentView === 'article-detail' && (
          <ArticleDetailPage
            article={selectedArticle}
            onNavigate={handleNavigate}
          />
        )}

        {currentView === 'about' && (
          <AboutPage onNavigate={handleNavigate} />
        )}

        {currentView === 'contact' && (
          <ContactPage onNavigate={handleNavigate} />
        )}

        {currentView === 'login' && (
          <LoginPage
            onNavigate={handleNavigate}
            onLoginSuccess={(role) => {
              setIsLoggedIn(true);
              const newRole = role || 'admin';
              setCurrentUser({
                ...currentUser,
                name: newRole === 'admin' ? 'System Administrator' : 'Tariq Al-Mansoor',
                email: newRole === 'admin' ? 'admin@steadfastdeen.com' : 'student@steadfastdeen.com',
                role: newRole
              });
              showToastNotification('success', `Logged in as ${newRole === 'admin' ? 'Administrator' : 'Student'}!`);
            }}
          />
        )}

        {currentView === 'register' && (
          <RegisterPage
            onNavigate={handleNavigate}
            onRegisterSuccess={() => {
              setIsLoggedIn(true);
              showToastNotification('success', 'Account created successfully!');
            }}
          />
        )}

        {currentView === 'profile' && (
          <ProfilePage
            user={currentUser}
            onNavigate={handleNavigate}
            onSaveProfile={(updated) => {
              setCurrentUser({ ...currentUser, ...updated });
              showToastNotification('success', 'Profile updated successfully!');
            }}
          />
        )}
        {currentView === 'quiz' && (
          <QuizPage onNavigate={handleNavigate} />
        )}
      </main>

      {/* Global Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Mobile App-like Bottom Navigation Bar */}
      <MobileBottomNav currentView={currentView} onNavigate={handleNavigate} />

      {/* Interactive Call Room Simulation Modal */}
      {activeCallModal && (
        <Modal isOpen={!!activeCallModal} onClose={() => setActiveCallModal(null)} maxWidth="lg">
          <div className="bg-slate-950 text-white rounded-2xl p-6 text-center space-y-6">
            <div className="flex items-center justify-between text-xs text-amber-400 font-semibold border-b border-slate-800 pb-3">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                End-to-End Encrypted Consultation
              </span>
              <span>00:04:12</span>
            </div>

            {/* Video / Avatar Box */}
            <div className="relative aspect-video rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden flex items-center justify-center">
              {activeCallModal.type === 'video' && !isVideoOff ? (
                <img
                  src={activeCallModal.expert.coverImage || activeCallModal.expert.avatar}
                  alt={activeCallModal.expert.name}
                  className="w-full h-full object-cover opacity-80"
                />
              ) : (
                <div className="text-center space-y-3">
                  <img
                    src={activeCallModal.expert.avatar}
                    alt={activeCallModal.expert.name}
                    className="w-24 h-24 rounded-full object-cover border-4 border-amber-400 mx-auto shadow-xl animate-pulse"
                  />
                  <h3 className="text-lg font-bold font-heading">{activeCallModal.expert.name}</h3>
                  <span className="text-xs text-amber-300 font-medium">{activeCallModal.expert.title}</span>
                </div>
              )}

              {/* Small self video PIP */}
              {activeCallModal.type === 'video' && (
                <div className="absolute bottom-3 right-3 w-28 h-20 bg-slate-800 border border-slate-700 rounded-xl overflow-hidden shadow-lg">
                  <img
                    src={currentUser.avatar}
                    alt="Self"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>

            {/* Call Action Controls */}
            <div className="flex items-center justify-center gap-4 pt-2">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className={`p-3.5 rounded-full border transition-all ${
                  isMuted ? 'bg-rose-600 text-white border-rose-500' : 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700'
                }`}
                title={isMuted ? 'Unmute' : 'Mute Microphone'}
              >
                {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>

              {activeCallModal.type === 'video' && (
                <button
                  onClick={() => setIsVideoOff(!isVideoOff)}
                  className={`p-3.5 rounded-full border transition-all ${
                    isVideoOff ? 'bg-rose-600 text-white border-rose-500' : 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700'
                  }`}
                  title={isVideoOff ? 'Turn Camera On' : 'Turn Camera Off'}
                >
                  {isVideoOff ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5" />}
                </button>
              )}

              <button
                onClick={() => {
                  setActiveCallModal(null);
                  showToastNotification('info', 'Consultation call session ended.');
                }}
                className="p-4 rounded-full bg-rose-600 hover:bg-rose-700 text-white shadow-lg transition-transform hover:scale-105"
                title="End Call"
              >
                <PhoneOff className="w-6 h-6" />
              </button>
            </div>
          </div>
        </Modal>
      )}

    </div>
  );
}

export default App;
