import { Expert } from '../types';

export const expertsData: Expert[] = [
  {
    id: 'exp-1',
    name: 'Mufti Ahmed Khan',
    title: 'Mufti | Fiqh Specialist',
    verified: true,
    avatar: '/avatars/mufti_ahmed.png',
    coverImage: 'https://images.unsplash.com/photo-1542816417-0983cbe82752?auto=format&fit=crop&q=80&w=1200',
    specialization: 'Islamic Finance',
    categories: ['islamic-finance', 'fiqh-masail'],
    rating: 4.8,
    reviewCount: 320,
    experienceYears: 10,
    languages: ['Urdu', 'English', 'Arabic', 'Hindi'],
    isOnline: true,
    ratePerMin: 12,
    flatSessionPrice: 35,
    completedSessions: 2000,
    responseRate: 'Instant (Online)',
    videoIntroUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    bio: 'I am a Mufti and Islamic finance consultant with 10+ years of experience. I help Muslims with fiqh, business, inheritance and daily masail based on Quran and Sunnah.',
    qualifications: [
      'Shahadat-ul-Alimiyyah (Dars-e-Nizami)',
      'Takhassus-fil-Ifta (Master in Islamic Law) - Al-Azhar University',
      'Certified Shariah Advisor & Auditor (AAOIFI)'
    ],
    badges: ['✓ Verified', '👳‍♂️ Mufti', '📖 Aalim', '💰 Islamic Finance', '⚖️ Fiqh Specialist'],
    availableSlots: {
      days: ['Monday', 'Tuesday', 'Thursday', 'Saturday'],
      times: ['10:00 AM', '02:00 PM', '05:30 PM', '08:00 PM']
    }
  },
  {
    id: 'exp-2',
    name: 'Dr. Saba Fatima',
    title: 'Islamic Finance Scholar',
    verified: true,
    avatar: '/avatars/dr_saba.png',
    coverImage: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&q=80&w=1200',
    specialization: 'Finance | Muamalat | Zakat',
    categories: ['islamic-finance', 'family-marriage'],
    rating: 4.9,
    reviewCount: 210,
    experienceYears: 8,
    languages: ['Urdu', 'English', 'Arabic'],
    isOnline: true,
    ratePerMin: 15,
    flatSessionPrice: 40,
    completedSessions: 1890,
    responseRate: 'Instant (Online)',
    bio: 'Dr. Saba Fatima combines authentic Islamic jurisprudence with financial knowledge. Specialized in commercial transactions (Muamalat), modern Zakat calculation, and Shariah investment guidelines.',
    qualifications: [
      'PhD in Islamic Banking & Finance',
      'Alimah Degree - Jamia Arabia',
      'Certified Shariah Counselor'
    ],
    badges: ['✓ Verified', '💰 Islamic Finance', '📖 Scholar', '⚖️ Muamalat Expert'],
    availableSlots: {
      days: ['Monday', 'Wednesday', 'Friday', 'Sunday'],
      times: ['11:00 AM', '03:00 PM', '06:00 PM', '09:00 PM']
    }
  },
  {
    id: 'exp-3',
    name: 'Maulana Rashid',
    title: 'Aalim | Muamalat Expert',
    verified: true,
    avatar: '/avatars/maulana_rashid.png',
    coverImage: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&q=80&w=1200',
    specialization: 'Business | Inheritance | Halal Earnings',
    categories: ['islamic-finance', 'fiqh-masail', 'aqeedah-beliefs'],
    rating: 4.7,
    reviewCount: 180,
    experienceYears: 15,
    languages: ['Urdu', 'English', 'Arabic'],
    isOnline: true,
    ratePerMin: 10,
    flatSessionPrice: 30,
    completedSessions: 2300,
    responseRate: 'Instant (Online)',
    bio: 'Maulana Rashid has been answering contemporary fiqh and commercial contract queries for over 15 years. Specialized in business partnerships, inheritance distribution (Miras), and halal earnings.',
    qualifications: [
      'Fazil (Dars-e-Nizami) - Nadwatul Ulama',
      'Senior Lecturer in Fiqh & Muamalat',
      'Author of 3 books on contemporary Fiqh'
    ],
    badges: ['✓ Verified', '📖 Aalim', '⚖️ Fiqh Specialist', '💰 Muamalat Expert'],
    availableSlots: {
      days: ['Tuesday', 'Thursday', 'Saturday'],
      times: ['09:00 AM', '01:00 PM', '04:00 PM', '07:00 PM']
    }
  },
  {
    id: 'exp-4',
    name: 'Ustaza Mariyam',
    title: 'Islamic Finance Teacher',
    verified: true,
    avatar: '/avatars/ustaza_mariyam.png',
    coverImage: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&q=80&w=1200',
    specialization: 'Women Friendly | Finance Basics',
    categories: ['islamic-finance', 'quran-learning'],
    rating: 4.6,
    reviewCount: 160,
    experienceYears: 6,
    languages: ['Urdu', 'English', 'Arabic'],
    isOnline: true,
    ratePerMin: 12,
    flatSessionPrice: 35,
    completedSessions: 1120,
    responseRate: 'Instant (Online)',
    bio: 'Ustaza Mariyam is a dedicated teacher providing accessible financial education and personal Zakat/Muamalat guidance for women, students, and young professionals.',
    qualifications: [
      'Alimah Degree (Dars-e-Nizami)',
      'B.A. in Islamic Studies',
      'Senior Quran & Fiqh Instructor'
    ],
    badges: ['✓ Verified', '👩 Sister Friendly', '💰 Finance Basics', '📖 Teacher'],
    availableSlots: {
      days: ['Monday', 'Tuesday', 'Wednesday', 'Friday'],
      times: ['08:00 AM', '10:30 AM', '03:00 PM', '06:30 PM']
    }
  }
];

