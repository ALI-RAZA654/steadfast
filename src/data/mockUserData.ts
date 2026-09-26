import { User, Booking, Certificate, ChatMessage } from '../types';

export const mockCurrentUser: User = {
  id: 'usr-101',
  name: 'Tariq Al-Mansoor',
  email: 'tariq.student@example.com',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200',
  role: 'student',
  phone: '+1 (555) 382-9102',
  location: 'Chicago, IL, USA',
  bio: 'Seeker of Islamic knowledge, focused on Quranic tajweed and ethical Islamic finance.',
  enrolledCoursesCount: 3,
  completedConsultationsCount: 5
};

export const mockBookings: Booking[] = [
  {
    id: 'BK-2026-8921',
    expertId: 'exp-1',
    expertName: 'Mufti Ahmed Khan',
    expertTitle: 'Mufti & Islamic Finance Consultant',
    expertAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    consultationType: 'voice',
    date: 'Sep 18, 2026',
    timeSlot: '02:00 PM',
    durationMins: 30,
    totalAmount: 45,
    status: 'confirmed',
    userName: 'Tariq Al-Mansoor',
    userEmail: 'tariq.student@example.com',
    userPhone: '+1 (555) 382-9102',
    question: 'Assalamu Alaikum Mufti Sahib. I need advice regarding Shariah compliance of stock options granted by my US employer and zakat calculation on my equity portfolio.',
    createdAt: '2026-09-15T10:00:00Z'
  },
  {
    id: 'BK-2026-7742',
    expertId: 'exp-2',
    expertName: 'Dr. Saba Fatima',
    expertTitle: 'Dr. / Islamic Family Counselor',
    expertAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
    consultationType: 'chat',
    date: 'Sep 12, 2026',
    timeSlot: '06:00 PM',
    durationMins: 30,
    totalAmount: 50,
    status: 'completed',
    userName: 'Tariq Al-Mansoor',
    userEmail: 'tariq.student@example.com',
    userPhone: '+1 (555) 382-9102',
    question: 'Pre-marital advice regarding communication with in-laws and financial transparency.',
    createdAt: '2026-09-10T14:20:00Z'
  }
];

export const mockCertificates: Certificate[] = [
  {
    id: 'cert-1',
    courseId: 'course-5',
    courseTitle: 'Seerah of the Prophet ﷺ: Lessons for Modern Life',
    studentName: 'Tariq Al-Mansoor',
    instructorName: 'Sheikh Zaid Al-Mansoor',
    issueDate: 'August 14, 2026',
    certificateId: 'SD-CERT-2026-88192',
    verificationUrl: 'https://steadfastdeen.com/verify/SD-CERT-2026-88192'
  }
];

export const mockChatMessages: ChatMessage[] = [
  {
    id: 'msg-1',
    senderId: 'exp-1',
    senderName: 'Mufti Ahmed Khan',
    senderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    text: 'Assalamu Alaikum\nHow can I help you today?',
    timestamp: '10:00 AM',
    isMe: false
  },
  {
    id: 'msg-2',
    senderId: 'usr-101',
    senderName: 'User',
    senderAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200',
    text: 'Wa Alaikum Assalam\nMera business halal hai kya Islamic perspective se?',
    timestamp: '10:01 AM',
    isMe: true
  },
  {
    id: 'msg-3',
    senderId: 'exp-1',
    senderName: 'Mufti Ahmed Khan',
    senderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    text: 'Bilkul, InshaAllah.\nMain aapko step by step guide karunga. Aap apna business type aur details bataiye.',
    timestamp: '10:02 AM',
    isMe: false
  }
];

