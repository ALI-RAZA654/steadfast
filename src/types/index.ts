export type ConsultationType = 'chat' | 'voice' | 'video';

export type UserRole = 'student' | 'expert' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: UserRole;
  phone?: string;
  location?: string;
  bio?: string;
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
  ratePerMin: number;
  flatSessionPrice: number;
  bio: string;
  qualifications: string[];
  badges: string[];
  completedSessions: number;
  responseRate: string;
  videoIntroUrl?: string;
  availableSlots?: {
    days: string[]; // e.g. ['Mon', 'Tue', 'Wed']
    times: string[]; // e.g. ['10:00 AM', '02:00 PM', '06:00 PM']
  };
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  isCompleted?: boolean;
  videoUrl?: string;
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
  | 'lesson'
  | 'certificates'
  | 'resources'
  | 'article-detail'
  | 'about'
  | 'contact'
  | 'login'
  | 'register'
  | 'profile'
  | 'screens-overview';

