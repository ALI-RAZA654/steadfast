export type ConsultationType = 'chat' | 'voice' | 'video';

export type UserRole = 'student' | 'teacher' | 'admin';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: UserRole;
  phone?: string;
  location?: string;
  bio?: string;
  status?: 'Active' | 'Blocked' | 'Restricted';
  enrolledCoursesCount?: number;
  completedConsultationsCount?: number;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  iconName: string;
  expertCount: number;
  courseCount: number;
  color: string;
}

export interface Expert {
  id: string;
  name: string;
  title: string; // e.g. Mufti, Dr., Ustaz, Alimah
  verified: boolean;
  avatar: string;
  coverImage?: string;
  specialization: string;
  categories: string[]; // Category IDs or Slugs
  rating: number;
  reviewCount: number;
  experienceYears: number;
  languages: string[];
  isOnline: boolean;
  isBlocked?: boolean;
  totalRevenue?: number;
  ratePerMin: number;
  flatSessionPrice: number;
  bio: string;
  qualifications: string[];
  badges: string[];
  completedSessions: number;
  responseRate: string;
  availableSlots?: {
    days: string[]; // e.g. ['Mon', 'Tue', 'Wed']
    times: string[]; // e.g. ['10:00 AM', '02:00 PM', '06:00 PM']
  };
}

export interface TopUser {
  id: string;
  name: string;
  email: string;
  avatar: string;
  totalSpent: number;
  totalSessions: number;
  totalHours: number;
  coursesPurchased: number;
  lastActive: string;
  status: 'VIP' | 'Active' | 'Regular' | 'Restricted' | 'Blocked';
}

export interface UserExpertTime {
  id: string;
  userName: string;
  userAvatar: string;
  expertName: string;
  expertAvatar: string;
  expertTitle: string;
  totalMinutes: number;
  sessionCount: number;
  totalSpent: number;
  lastConsultationDate: string;
}

export interface AdminComment {
  id: string;
  userName: string;
  userAvatar: string;
  targetName: string;
  targetType: 'expert' | 'course';
  rating: number;
  commentText: string;
  date: string;
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  isCompleted?: boolean;
  pdfUrl?: string;
  summary?: string;
}

export interface CourseSection {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  thumbnail: string;
  category: string;
  categoryId: string;
  instructor: {
    id: string;
    name: string;
    avatar: string;
    title: string;
  };
  rating: number;
  reviewCount: number;
  studentCount: number;
  duration: string;
  lessonCount: number;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  price: number;
  isFree?: boolean;
  featured?: boolean;
  callTiming?: string; // e.g. "7:00 PM – 8:00 PM (PKT)"
  description: string;
  whatYouWillLearn: string[];
  requirements: string[];
  curriculum: CourseSection[];
}

export interface Review {
  id: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  date: string;
  comment: string;
  serviceType?: string;
}

export interface Booking {
  id: string;
  expertId: string;
  expertName: string;
  expertTitle: string;
  expertAvatar: string;
  consultationType: ConsultationType;
  date: string;
  timeSlot: string;
  durationMins: number;
  totalAmount: number;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
  userName: string;
  userEmail: string;
  userPhone: string;
  question: string;
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  text: string;
  timestamp: string;
  isMe: boolean;
  attachments?: {
    type: 'pdf' | 'image' | 'audio';
    url: string;
    name: string;
  }[];
}

export interface Certificate {
  id: string;
  courseId: string;
  courseTitle: string;
  studentName: string;
  instructorName: string;
  issueDate: string;
  certificateId: string;
  verificationUrl: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  publishedAt: string;
  readTime: string;
  image: string;
  tags: string[];
  featured?: boolean;
}

export interface CouponRedemption {
  id: string;
  studentName: string;
  studentEmail: string;
  redeemedAt: string;
  serviceOrCourse: string;
  originalPrice: number;
  discountSaved: number;
  finalAmountPaid: number;
}

export interface Coupon {
  id: string;
  code: string;
  teacherName: string;
  teacherId?: string;
  discountPercent: number;
  validUntil: string;
  maxUses: number;
  usedCount: number;
  targetCourseOrService: string;
  isActive: boolean;
  createdAt: string;
  totalRevenueGenerated?: number;
  redemptions?: CouponRedemption[];
}

export interface RegisteredTeacher {
  id: string;
  name: string;
  username: string;
  email: string;
  passwordSuggestion: string;
  title: string;
  specialization: string;
  status: 'Active' | 'Suspended';
  totalStudents: number;
  totalRevenue: number;
  joinedDate: string;
}

export interface McqQuestion {
  id: string;
  question: string;
  options: { key: 'A' | 'B' | 'C' | 'D'; text: string }[];
  correctKey: 'A' | 'B' | 'C' | 'D';
  topic: 'Aqeedah' | 'Quran & Seerah' | 'Fiqh & Masail' | 'Hadith & Sunnah' | 'Islamic Finance';
  explanation: string;
}

export interface TopicPerformance {
  topic: string;
  totalQuestions: number;
  correctCount: number;
  percentage: number;
  status: 'Strong 💪' | 'Moderate ⚖️' | 'Weak / Needs Improvement ⚠️';
}

export interface WrongQuestionAnalysis {
  questionId: string;
  questionText: string;
  topic: string;
  userAnswerKey: string;
  userAnswerText: string;
  correctAnswerKey: string;
  correctAnswerText: string;
  explanation: string;
}

export interface QuizAttemptResult {
  id: string;
  date: string;
  testName: string;
  totalQuestions: number;
  correctCount: number;
  incorrectCount: number;
  marksObtained: number;
  totalMarks: number;
  percentage: number;
  overallScoreBadge: string;
  topicBreakdown: TopicPerformance[];
  wrongQuestions: WrongQuestionAnalysis[];
  strongTopics: string[];
  weakTopics: string[];
}

export interface TopicInsight {
  id: string;
  topicName: string;
  category: string;
  demandLevel: 'High' | 'Very High' | 'Surging' | 'Moderate';
  searchSharePercent: number;
  monthlyGrowthPercent: number;
  totalConsultationsRequested: number;
  aiRecommendation: string;
  status: 'Critical' | 'Growth Opportunity' | 'Stable';
}

export interface RevenueForecast {
  period: string; // e.g., 'May 2026', 'Jun 2026', 'Oct 2026 (Projected)'
  actualRevenue?: number;
  projectedRevenue: number;
  growthPercentage: number;
  type: 'historical' | 'projected';
  keyDriver: string;
}

export interface ServiceSuggestion {
  id: string;
  title: string;
  category: string;
  userInterestScore: number; // 0 to 100
  searchQueries: string[];
  suggestedType: 'Consultation Service' | 'Specialized Course' | 'Masterclass Bootcamp';
  expectedRevenueImpact: string;
  recommendedScholar: string;
}

export type PageView =
  | 'home'
  | 'categories'
  | 'category-detail'
  | 'experts'
  | 'expert-profile'
  | 'booking'
  | 'checkout'
  | 'confirmation'
  | 'chat'
  | 'courses'
  | 'course-detail'
  | 'dashboard'
  | 'teacher-dashboard'
  | 'lesson'
  | 'certificates'
  | 'resources'
  | 'article-detail'
  | 'about'
  | 'contact'
  | 'login'
  | 'register'
  | 'profile'
  | 'quiz'
  | 'screens-overview';


