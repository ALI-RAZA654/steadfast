import { Course } from '../types';

export const coursesData: Course[] = [
  {
    id: 'course-1',
    slug: 'learn-quran-with-tajweed',
    title: 'Learn Quran with Tajweed: Master Recitation',
    subtitle: 'Step-by-step masterclass on articulation points (Makharij), rules of Tajweed, and beautiful recitation.',
    thumbnail: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&q=80&w=800',
    category: 'Quran Learning',
    categoryId: 'quran-learning',
    instructor: {
      id: 'exp-4',
      name: 'Ustaza Mariyam Al-Attas',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
      title: 'Qaria & Tajweed Master'
    },
    rating: 4.95,
    reviewCount: 380,
    studentCount: 2450,
    duration: '14 Hours',
    lessonCount: 24,
    level: 'Beginner',
    price: 49,
    featured: true,
    description: 'Master the divine science of Quranic recitation with exact articulation points, rules of Noon Sakinah, Meem Sakinah, Maddah letters, and stopping signs. This course is structured for beginners and intermediate reciters seeking precision and spiritual connection.',
    whatYouWillLearn: [
      'Correct pronunciation of all Arabic letters from their Makharij (points of articulation)',
      'Rules of Noon Sakinah and Tanween (Izhar, Idgham, Iqlab, Ikhfa)',
      'Rules of Meem Sakinah and Ghunnah accentuation',
      'Types of Madd (Prolongation) and how to apply them seamlessly in recitation',
      'Rules of Stopping (Waqf) and Starting (Ibtida) in Quranic passages'
    ],
    requirements: [
      'Basic ability to recognize Arabic letters',
      'A quiet space for practice recitation',
      'Desire to improve your Quranic connection'
    ],
    curriculum: [
      {
        id: 'sec-1',
        title: 'Module 1: Introduction & Articulation Points (Makharij)',
        lessons: [
          { id: 'les-101', title: '1. Virtues of Correct Tajweed & Course Orientation', duration: '18 mins', isCompleted: true, videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
          { id: 'les-102', title: '2. Throat Letters (Halq) & Deep Pronunciation', duration: '25 mins', isCompleted: true },
          { id: 'les-103', title: '3. Tongue Letters (Lisan) - Part 1', duration: '30 mins', isCompleted: false },
          { id: 'les-104', title: '4. Tongue Letters (Lisan) - Part 2 & Heavy Letters', duration: '32 mins', isCompleted: false }
        ]
      },
      {
        id: 'sec-2',
        title: 'Module 2: Rules of Noon Sakinah and Tanween',
        lessons: [
          { id: 'les-201', title: '5. Rule of Izhar (Clear Pronunciation)', duration: '22 mins', isCompleted: false },
          { id: 'les-202', title: '6. Rule of Idgham (Merging with & without Ghunnah)', duration: '28 mins', isCompleted: false },
          { id: 'les-203', title: '7. Rule of Iqlab (Conversion to Meem)', duration: '20 mins', isCompleted: false },
          { id: 'les-204', title: '8. Rule of Ikhfa (Concealment practice)', duration: '35 mins', isCompleted: false }
        ]
      },
      {
        id: 'sec-3',
        title: 'Module 3: Madd (Prolongation) Rules',
        lessons: [
          { id: 'les-301', title: '9. Natural Madd (Madd Asli) & 2 Harakat', duration: '24 mins', isCompleted: false },
          { id: 'les-302', title: '10. Connected Madd (Madd Muttasil)', duration: '26 mins', isCompleted: false },
          { id: 'les-303', title: '11. Separate Madd (Madd Munfasil)', duration: '25 mins', isCompleted: false }
        ]
      }
    ]
  },
  {
    id: 'course-2',
    slug: 'foundations-of-fiqh',
    title: 'Foundations of Fiqh: Essential Daily Worship',
    subtitle: 'Comprehensive guide to Taharah, Salah, Zakat, Sawm, and everyday legal rulings.',
    thumbnail: 'https://images.unsplash.com/photo-1542816417-0983cbe82752?auto=format&fit=crop&q=80&w=800',
    category: 'Fiqh & Daily Masail',
    categoryId: 'fiqh-masail',
    instructor: {
      id: 'exp-3',
      name: 'Maulana Rashid Siddiqui',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
      title: 'Senior Islamic Scholar (Alim)'
    },
    rating: 4.91,
    reviewCount: 290,
    studentCount: 1890,
    duration: '18 Hours',
    lessonCount: 30,
    level: 'Beginner',
    price: 39,
    featured: true,
    description: 'Gain absolute clarity and confidence in fulfilling your daily obligatory acts of worship (Fard \'Ayn). This course breaks down classical jurisprudence into clear practical principles for modern life.',
    whatYouWillLearn: [
      'Complete rules of ritual purity (Wudu, Ghusl, Tayammum, Najasat)',
      'Step-by-step mechanics and conditions of valid Salah',
      'Handling prayer invalidations, late arrival (Masbuq), and travel prayers',
      'Comprehensive rules of Ramadan fasting and Kaffarah',
      'Exact rules of Zakat calculation for savings, gold, and business assets'
    ],
    requirements: ['Open mind and dedication to perfecting worship'],
    curriculum: [
      {
        id: 'sec-201',
        title: 'Module 1: Purity & Purification (Taharah)',
        lessons: [
          { id: 'les-fiq-1', title: '1. Introduction to Fiqh & Objectives of Shariah', duration: '20 mins', isCompleted: true },
          { id: 'les-fiq-2', title: '2. Water Types & Ritual Purification (Wudu)', duration: '28 mins', isCompleted: true },
          { id: 'les-fiq-3', title: '3. Obligatory Bath (Ghusl) & Common Mistakes', duration: '25 mins', isCompleted: false }
        ]
      },
      {
        id: 'sec-202',
        title: 'Module 2: The Prayer (Salah)',
        lessons: [
          { id: 'les-fiq-4', title: '4. Times of Prayer & Conditions of Validity', duration: '30 mins', isCompleted: false },
          { id: 'les-fiq-5', title: '5. Sunnah and Fard components of Prayer', duration: '35 mins', isCompleted: false }
        ]
      }
    ]
  },
  {
    id: 'course-3',
    slug: 'islamic-finance-fundamentals',
    title: 'Islamic Finance & Shariah Business Ethics',
    subtitle: 'Understand halal income, investments, crypto, mortgages, and ethical commerce.',
    thumbnail: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&q=80&w=800',
    category: 'Islamic Finance',
    categoryId: 'islamic-finance',
    instructor: {
      id: 'exp-1',
      name: 'Mufti Ahmed Khan',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
      title: 'Mufti & Islamic Finance Consultant'
    },
    rating: 4.96,
    reviewCount: 420,
    studentCount: 3100,
    duration: '16 Hours',
    lessonCount: 20,
    level: 'Intermediate',
    price: 59,
    featured: true,
    description: 'Equip yourself with essential knowledge of Shariah-compliant wealth creation, business structuring, stock screening, mortgage alternatives, and contemporary financial transactions.',
    whatYouWillLearn: [
      'Prohibition of Riba (Interest), Gharar (Uncertainty), and Maysir (Gambling)',
      'How to screen stocks and ETFs for Halal compliance',
      'Islamic business partnerships: Murabaha, Mudaraba, and Musharaka',
      'Evaluating modern investments, crypto assets, and real estate financing'
    ],
    requirements: ['Basic understanding of personal finance'],
    curriculum: [
      {
        id: 'sec-fin-1',
        title: 'Module 1: Principles of Islamic Economy',
        lessons: [
          { id: 'les-fin-101', title: '1. What makes money Halal or Haram?', duration: '25 mins', isCompleted: true },
          { id: 'les-fin-102', title: '2. Deconstructing Riba in modern banking', duration: '35 mins', isCompleted: false }
        ]
      }
    ]
  },
  {
    id: 'course-4',
    slug: 'understanding-hadith-sciences',
    title: 'Understanding Hadith: Authentic Prophetic Traditions',
    subtitle: 'Explore Sahih Bukhari, Hadith methodology, chains of transmission, and practical application.',
    thumbnail: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=800',
    category: 'Hadith Studies',
    categoryId: 'hadith-studies',
    instructor: {
      id: 'exp-3',
      name: 'Maulana Rashid Siddiqui',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
      title: 'Senior Islamic Scholar (Alim)'
    },
    rating: 4.89,
    reviewCount: 160,
    studentCount: 1200,
    duration: '12 Hours',
    lessonCount: 18,
    level: 'Intermediate',
    price: 35,
    featured: false,
    description: 'Learn how Hadiths were preserved, verified, and classified by classical scholars like Imam Al-Bukhari and Muslim, protecting yourself against misconceptions.',
    whatYouWillLearn: [
      'Mustalah al-Hadith (Terminology of Hadith sciences)',
      'Difference between Sahih, Hasan, and Da\'if narrations',
      'Biographies of the major Muhaddithun',
      'Extracting spiritual wisdom from 40 Hadith Nawawi'
    ],
    requirements: ['Basic Islamic knowledge'],
    curriculum: []
  },
  {
    id: 'course-5',
    slug: 'seerah-of-the-prophet',
    title: 'Seerah of the Prophet ﷺ: Lessons for Modern Life',
    subtitle: 'An inspiring journey through the life of the Messenger of Allah ﷺ from Mecca to Madinah.',
    thumbnail: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&q=80&w=800',
    category: 'Seerah & Islamic History',
    categoryId: 'seerah-history',
    instructor: {
      id: 'exp-5',
      name: 'Sheikh Zaid Al-Mansoor',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400',
      title: 'Scholar of Aqeedah & History'
    },
    rating: 4.98,
    reviewCount: 510,
    studentCount: 4200,
    duration: '22 Hours',
    lessonCount: 36,
    level: 'All Levels',
    price: 0,
    isFree: true,
    featured: true,
    description: 'Immerse yourself in the noble biography of Prophet Muhammad ﷺ. Extract timeless leadership lessons, family values, perseverance through hardship, and diplomatic excellence.',
    whatYouWillLearn: [
      'Meccan period: Character development, persecution, and resilience',
      'The Migration (Hijrah) and establishing the Medina constitution',
      'Prophetic leadership style, mercy to enemies, and social justice',
      'Applying the Sunnah in 21st-century personal and professional life'
    ],
    requirements: ['None. Open to all students.'],
    curriculum: []
  },
  {
    id: 'course-6',
    slug: 'aqeedah-essentials',
    title: 'Aqeedah Essentials: Certainty & Faith',
    subtitle: 'Anchor your heart with clear understanding of Allah, His Names, Angels, Revelations & Destiny.',
    thumbnail: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&q=80&w=800',
    category: 'Aqeedah & Beliefs',
    categoryId: 'aqeedah-beliefs',
    instructor: {
      id: 'exp-5',
      name: 'Sheikh Zaid Al-Mansoor',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400',
      title: 'Scholar of Aqeedah & History'
    },
    rating: 4.94,
    reviewCount: 220,
    studentCount: 1650,
    duration: '10 Hours',
    lessonCount: 15,
    level: 'Beginner',
    price: 29,
    featured: false,
    description: 'Build an unshakeable foundation in Islamic creed (Tahawi & Wasitiyya basics) and resolve intellectual doubts with rational and textual evidence.',
    whatYouWillLearn: [
      'Six pillars of Iman and their practical impact on daily peace',
      'Understanding Qada & Qadar (Divine Decree and Free Will)',
      'Beautiful Names and Attributes of Allah (Asma wa Sifat)',
      'Constructive responses to contemporary atheist arguments'
    ],
    requirements: ['Desire for spiritual certainty'],
    curriculum: []
  }
];
