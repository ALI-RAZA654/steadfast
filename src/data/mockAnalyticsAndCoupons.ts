import { Coupon, TopicInsight, RevenueForecast, ServiceSuggestion, RegisteredTeacher, McqQuestion, QuizAttemptResult } from '../types';

export const initialCoupons: Coupon[] = [
  {
    id: 'cp-101',
    code: 'DEEN20',
    teacherName: 'Mufti Ahmed Khan',
    teacherId: 'exp-1',
    discountPercent: 20,
    validUntil: '2026-10-31',
    maxUses: 100,
    usedCount: 47,
    targetCourseOrService: 'Islamic Finance Consultation & Courses',
    isActive: true,
    createdAt: '2026-09-01',
    totalRevenueGenerated: 145000,
    redemptions: [
      { id: 'rd-1', studentName: 'Zaid Al-Harbi', studentEmail: 'zaid@example.com', redeemedAt: '2026-09-28 14:30', serviceOrCourse: 'Islamic Finance Consultation', originalPrice: 45, discountSaved: 9, finalAmountPaid: 36 },
      { id: 'rd-2', studentName: 'Fatima Zahra', studentEmail: 'fatima@example.com', redeemedAt: '2026-09-27 11:15', serviceOrCourse: 'Crypto Halal Verification', originalPrice: 50, discountSaved: 10, finalAmountPaid: 40 },
      { id: 'rd-3', studentName: 'Tariq Al-Mansoor', studentEmail: 'tariq.student@example.com', redeemedAt: '2026-09-25 09:00', serviceOrCourse: 'Halal Stock Portfolio Audit', originalPrice: 60, discountSaved: 12, finalAmountPaid: 48 },
      { id: 'rd-4', studentName: 'Bilal Ahmed', studentEmail: 'bilal@example.com', redeemedAt: '2026-09-22 16:45', serviceOrCourse: 'Islamic Finance Masterclass', originalPrice: 120, discountSaved: 24, finalAmountPaid: 96 }
    ]
  },
  {
    id: 'cp-102',
    code: 'FAMILY15',
    teacherName: 'Dr. Saba Fatima',
    teacherId: 'exp-2',
    discountPercent: 15,
    validUntil: '2026-10-15',
    maxUses: 50,
    usedCount: 32,
    targetCourseOrService: 'Marriage & Family Counseling Sessions',
    isActive: true,
    createdAt: '2026-09-10',
    totalRevenueGenerated: 98000,
    redemptions: [
      { id: 'rd-10', studentName: 'Amina Begum', studentEmail: 'amina@example.com', redeemedAt: '2026-09-29 18:20', serviceOrCourse: 'Pre-Marital Consultation', originalPrice: 50, discountSaved: 8, finalAmountPaid: 42 },
      { id: 'rd-11', studentName: 'Omar Farooq', studentEmail: 'omar@example.com', redeemedAt: '2026-09-26 12:00', serviceOrCourse: 'Family Conflict Resolution', originalPrice: 50, discountSaved: 8, finalAmountPaid: 42 }
    ]
  },
  {
    id: 'cp-103',
    code: 'TAJWEED30',
    teacherName: 'Ustadh Tariq Aziz',
    teacherId: 'exp-5',
    discountPercent: 30,
    validUntil: '2026-11-30',
    maxUses: 200,
    usedCount: 89,
    targetCourseOrService: 'Learn Quran with Tajweed Masterclass',
    isActive: true,
    createdAt: '2026-09-15',
    totalRevenueGenerated: 185000,
    redemptions: [
      { id: 'rd-20', studentName: 'Hassan Raza', studentEmail: 'hassan@example.com', redeemedAt: '2026-09-28 10:00', serviceOrCourse: 'Tajweed Course Enrollment', originalPrice: 80, discountSaved: 24, finalAmountPaid: 56 }
    ]
  },
  {
    id: 'cp-104',
    code: 'SPECIAL50',
    teacherName: 'System Admin',
    teacherId: 'admin',
    discountPercent: 50,
    validUntil: '2026-12-31',
    maxUses: 20,
    usedCount: 18,
    targetCourseOrService: 'All Courses & Consultations',
    isActive: true,
    createdAt: '2026-08-20',
    totalRevenueGenerated: 72000,
    redemptions: [
      { id: 'rd-30', studentName: 'Maryam K.', studentEmail: 'maryam@example.com', redeemedAt: '2026-09-29 20:00', serviceOrCourse: 'Fiqh Specialization', originalPrice: 100, discountSaved: 50, finalAmountPaid: 50 }
    ]
  }
];

export const initialRegisteredTeachers: RegisteredTeacher[] = [
  {
    id: 'tch-101',
    name: 'Mufti Ahmed Khan',
    username: 'mufti_ahmed',
    email: 'teacher@steadfastdeen.com',
    passwordSuggestion: 'teacher123',
    title: 'Senior Mufti & Fiqh Consultant',
    specialization: 'Islamic Finance & Muamalat',
    status: 'Active',
    totalStudents: 5440,
    totalRevenue: 175000,
    joinedDate: '2026-01-15'
  },
  {
    id: 'tch-102',
    name: 'Dr. Saba Fatima',
    username: 'dr_saba',
    email: 'saba.fatima@steadfastdeen.com',
    passwordSuggestion: 'SabaPass9021#',
    title: 'PhD Islamic Studies & Family Counselor',
    specialization: 'Pre-Marital & Family Counseling',
    status: 'Active',
    totalStudents: 3890,
    totalRevenue: 145000,
    joinedDate: '2026-03-10'
  },
  {
    id: 'tch-103',
    name: 'Ustadh Tariq Aziz',
    username: 'tariq_aziz',
    email: 'tariq.aziz@steadfastdeen.com',
    passwordSuggestion: 'Tajweed2026!',
    title: 'Senior Qari & Quran Instructor',
    specialization: 'Quran Recitation & Tajweed',
    status: 'Active',
    totalStudents: 2150,
    totalRevenue: 110000,
    joinedDate: '2026-05-20'
  }
];

export const mockMcqQuestions: McqQuestion[] = [
  {
    id: 'mcq-1',
    topic: 'Aqeedah',
    question: 'What is the primary definition of "Tawheed al-Uloohiyyah"?',
    options: [
      { key: 'A', text: 'Singling out Allah alone in His Lordship and creation of the universe' },
      { key: 'B', text: 'Singling out Allah alone in all acts of worship (Salah, Dua, Sacrifice)' },
      { key: 'C', text: 'Believing in the Names and Attributes of Allah without distortion' },
      { key: 'D', text: 'Believing in the angels and holy scriptures' }
    ],
    correctKey: 'B',
    explanation: 'Tawheed al-Uloohiyyah means directing all acts of worship exclusively to Allah Almighty alone.'
  },
  {
    id: 'mcq-2',
    topic: 'Aqeedah',
    question: 'How many fundamental Pillars of Iman (Faith) are specified in the Hadith of Jibreel (AS)?',
    options: [
      { key: 'A', text: '5 Pillars' },
      { key: 'B', text: '6 Pillars' },
      { key: 'C', text: '7 Pillars' },
      { key: 'D', text: '4 Pillars' }
    ],
    correctKey: 'B',
    explanation: 'The 6 Pillars of Iman are belief in Allah, His Angels, His Books, His Messengers, the Last Day, and Al-Qadr (Divine Decree).'
  },
  {
    id: 'mcq-3',
    topic: 'Fiqh & Masail',
    question: 'What is the minimum Nisaab threshold for Zakat payable on Gold in Islam?',
    options: [
      { key: 'A', text: '52.5 Tolas (612 grams)' },
      { key: 'B', text: '7.5 Tolas (87.48 grams)' },
      { key: 'C', text: '10 Tolas (116.6 grams)' },
      { key: 'D', text: '15 Tolas (175 grams)' }
    ],
    correctKey: 'B',
    explanation: 'Nisaab for Gold is 7.5 Tolas (87.48 grams) of 24k gold (or equivalent value), held for 1 lunar year.'
  },
  {
    id: 'mcq-4',
    topic: 'Fiqh & Masail',
    question: 'Which of the following breaks (nullifies) Wudu according to standard Fiqh rulings?',
    options: [
      { key: 'A', text: 'Eating cooked meat or drinking water' },
      { key: 'B', text: 'Deep sleep where one loses full awareness' },
      { key: 'C', text: 'Laughing gently outside of prayer' },
      { key: 'D', text: 'Reciting Quran aloud' }
    ],
    correctKey: 'B',
    explanation: 'Deep sleep where awareness is completely lost nullifies Wudu.'
  },
  {
    id: 'mcq-5',
    topic: 'Hadith & Sunnah',
    question: 'Who compiled the authentic Hadith collection known as "Sahih al-Bukhari"?',
    options: [
      { key: 'A', text: 'Imam Muslim ibn al-Hajjaj' },
      { key: 'B', text: 'Imam Abu Abdillah Muhammad ibn Ismail al-Bukhari' },
      { key: 'C', text: 'Imam Abu Dawud al-Sijistani' },
      { key: 'D', text: 'Imam al-Tirmidhi' }
    ],
    correctKey: 'B',
    explanation: 'Imam al-Bukhari spent 16 years verifying and compiling his Sahih collection containing authentic Hadiths.'
  },
  {
    id: 'mcq-6',
    topic: 'Hadith & Sunnah',
    question: 'What does the term "Hadith Mutawatir" mean in Hadith sciences (Mustalah al-Hadith)?',
    options: [
      { key: 'A', text: 'A Hadith narrated by only one single companion' },
      { key: 'B', text: 'A Hadith narrated by such a large number of narrators in every generation that collusion upon a lie is impossible' },
      { key: 'C', text: 'A Hadith with a weak chain of transmission' },
      { key: 'D', text: 'A statement attributed to a companion only' }
    ],
    correctKey: 'B',
    explanation: 'Hadith Mutawatir is a report conveyed by numerous reliable narrators at every link of the chain, establishing absolute certainty.'
  },
  {
    id: 'mcq-7',
    topic: 'Quran & Seerah',
    question: 'In which year of Hijrah did the Treaty of Hudaybiyyah (صُلح الحُدَيْبِيَّة) take place?',
    options: [
      { key: 'A', text: '2nd Year of Hijrah' },
      { key: 'B', text: '6th Year of Hijrah' },
      { key: 'C', text: '8th Year of Hijrah' },
      { key: 'D', text: '10th Year of Hijrah' }
    ],
    correctKey: 'B',
    explanation: 'The Treaty of Hudaybiyyah took place in the 6th year after Hijrah.'
  },
  {
    id: 'mcq-8',
    topic: 'Quran & Seerah',
    question: 'What is the literal meaning of the word "Tajweed" (تجويد) in Arabic linguistic rules?',
    options: [
      { key: 'A', text: 'To memorize completely' },
      { key: 'B', text: 'To make beautiful, improve, and give every letter its rightful due' },
      { key: 'C', text: 'To translate into another language' },
      { key: 'D', text: 'To recite with maximum speed' }
    ],
    correctKey: 'B',
    explanation: 'Tajweed literally means beautification and precision—giving every Arabic letter its correct pronunciation and attributes.'
  },
  {
    id: 'mcq-9',
    topic: 'Islamic Finance',
    question: 'What is "Riba al-Fadl" in Islamic commercial jurisprudence (Muamalat)?',
    options: [
      { key: 'A', text: 'Interest charged on borrowed money over time' },
      { key: 'B', text: 'Unequal exchange or surplus in hand-to-hand trade of Ribawi commodities of the same type' },
      { key: 'C', text: 'Investment profit sharing in Mudharabah' },
      { key: 'D', text: 'Sales discount given by seller' }
    ],
    correctKey: 'B',
    explanation: 'Riba al-Fadl refers to excess or inequality in exchange of commodities of the same kind (e.g. gold for gold of unequal weight).'
  },
  {
    id: 'mcq-10',
    topic: 'Islamic Finance',
    question: 'In a "Murabaha" contract, what is mandatory for the financial institution to disclose to the buyer?',
    options: [
      { key: 'A', text: 'Only the final selling price without revealing cost' },
      { key: 'B', text: 'The original cost price AND the exact profit margin charged' },
      { key: 'C', text: 'Future stock market predictions' },
      { key: 'D', text: 'No disclosure is necessary' }
    ],
    correctKey: 'B',
    explanation: 'Murabaha is a cost-plus-profit sale where the seller MUST explicitly declare both original purchase cost and profit margin.'
  }
];

export const mockQuizHistory: QuizAttemptResult[] = [
  {
    id: 'attempt-101',
    date: 'Sep 28, 2026',
    testName: 'Comprehensive Scholar Evaluation MCQ Test #3',
    totalQuestions: 10,
    correctCount: 8,
    incorrectCount: 2,
    marksObtained: 8,
    totalMarks: 10,
    percentage: 80,
    overallScoreBadge: 'Excellent / Distinction',
    topicBreakdown: [
      { topic: 'Aqeedah', totalQuestions: 2, correctCount: 2, percentage: 100, status: 'Strong 💪' },
      { topic: 'Quran & Seerah', totalQuestions: 2, correctCount: 2, percentage: 100, status: 'Strong 💪' },
      { topic: 'Islamic Finance', totalQuestions: 2, correctCount: 2, percentage: 100, status: 'Strong 💪' },
      { topic: 'Fiqh & Masail', totalQuestions: 2, correctCount: 1, percentage: 50, status: 'Moderate ⚖️' },
      { topic: 'Hadith & Sunnah', totalQuestions: 2, correctCount: 1, percentage: 50, status: 'Weak / Needs Improvement ⚠️' }
    ],
    wrongQuestions: [
      {
        questionId: 'mcq-4',
        questionText: 'Which of the following breaks (nullifies) Wudu according to standard Fiqh rulings?',
        topic: 'Fiqh & Masail',
        userAnswerKey: 'A',
        userAnswerText: 'Eating cooked meat or drinking water',
        correctAnswerKey: 'B',
        correctAnswerText: 'Deep sleep where one loses full awareness',
        explanation: 'Deep sleep where awareness is completely lost nullifies Wudu.'
      },
      {
        questionId: 'mcq-6',
        questionText: 'What does the term "Hadith Mutawatir" mean in Hadith sciences (Mustalah al-Hadith)?',
        topic: 'Hadith & Sunnah',
        userAnswerKey: 'A',
        userAnswerText: 'A Hadith narrated by only one single companion',
        correctAnswerKey: 'B',
        correctAnswerText: 'A Hadith narrated by such a large number of narrators in every generation that collusion upon a lie is impossible',
        explanation: 'Hadith Mutawatir is a report conveyed by numerous reliable narrators at every link of the chain.'
      }
    ],
    strongTopics: ['Aqeedah', 'Quran & Seerah', 'Islamic Finance'],
    weakTopics: ['Hadith & Sunnah', 'Fiqh & Masail']
  },
  {
    id: 'attempt-100',
    date: 'Sep 15, 2026',
    testName: 'Comprehensive Scholar Evaluation MCQ Test #2',
    totalQuestions: 10,
    correctCount: 6,
    incorrectCount: 4,
    marksObtained: 6,
    totalMarks: 10,
    percentage: 60,
    overallScoreBadge: 'Intermediate Pass',
    topicBreakdown: [
      { topic: 'Aqeedah', totalQuestions: 2, correctCount: 2, percentage: 100, status: 'Strong 💪' },
      { topic: 'Quran & Seerah', totalQuestions: 2, correctCount: 2, percentage: 100, status: 'Strong 💪' },
      { topic: 'Fiqh & Masail', totalQuestions: 2, correctCount: 1, percentage: 50, status: 'Moderate ⚖️' },
      { topic: 'Hadith & Sunnah', totalQuestions: 2, correctCount: 1, percentage: 50, status: 'Weak / Needs Improvement ⚠️' },
      { topic: 'Islamic Finance', totalQuestions: 2, correctCount: 0, percentage: 0, status: 'Weak / Needs Improvement ⚠️' }
    ],
    wrongQuestions: [],
    strongTopics: ['Aqeedah', 'Quran & Seerah'],
    weakTopics: ['Islamic Finance', 'Hadith & Sunnah']
  }
];

export const topicInsightsData: TopicInsight[] = [
  {
    id: 'tp-1',
    topicName: 'Islamic Finance & Crypto Halal Verification',
    category: 'Islamic Finance',
    demandLevel: 'Surging',
    searchSharePercent: 42,
    monthlyGrowthPercent: 38,
    totalConsultationsRequested: 1420,
    aiRecommendation: 'High demand surge detected! Recommend onboarding 2 additional certified Islamic Finance Muftis immediately.',
    status: 'Critical'
  },
  {
    id: 'tp-2',
    topicName: 'Pre-Marital & Family Conflict Counseling',
    category: 'Family & Marriage',
    demandLevel: 'Very High',
    searchSharePercent: 28,
    monthlyGrowthPercent: 24,
    totalConsultationsRequested: 980,
    aiRecommendation: 'Users are booking maximum evening 1-on-1 slots. Suggest expanding Ustaza/Dr. Saba consultation hours.',
    status: 'Growth Opportunity'
  },
  {
    id: 'tp-3',
    topicName: 'Quranic Tajweed & Makharij Practice',
    category: 'Quran Learning',
    demandLevel: 'High',
    searchSharePercent: 18,
    monthlyGrowthPercent: 15,
    totalConsultationsRequested: 750,
    aiRecommendation: 'Consistent high retention rate. Introduce automated weekly MCQ assessment quizzes.',
    status: 'Stable'
  },
  {
    id: 'tp-4',
    topicName: 'Inheritance (Mawaareeth) & Estate Calculation',
    category: 'Fiqh & Masail',
    demandLevel: 'High',
    searchSharePercent: 12,
    monthlyGrowthPercent: 19,
    totalConsultationsRequested: 430,
    aiRecommendation: 'Rapidly growing search query. Propose launching an automated Inheritance Calculator tool.',
    status: 'Growth Opportunity'
  }
];

export const revenueForecastsData: RevenueForecast[] = [
  { period: 'May 2026', actualRevenue: 280000, projectedRevenue: 275000, growthPercentage: 12, type: 'historical', keyDriver: 'Launch of Ramazan consultations' },
  { period: 'Jun 2026', actualRevenue: 340000, projectedRevenue: 330000, growthPercentage: 21, type: 'historical', keyDriver: 'Islamic Finance bootcamp launch' },
  { period: 'Jul 2026', actualRevenue: 390000, projectedRevenue: 380000, growthPercentage: 14, type: 'historical', keyDriver: 'Expanded scholar slots & live calls' },
  { period: 'Aug 2026', actualRevenue: 440000, projectedRevenue: 435000, growthPercentage: 13, type: 'historical', keyDriver: 'Tajweed course enrollment uptick' },
  { period: 'Sep 2026 (Current)', actualRevenue: 500000, projectedRevenue: 490000, growthPercentage: 13.6, type: 'historical', keyDriver: 'High demand in Crypto & Halal Finance' },
  { period: 'Oct 2026 (Projected)', projectedRevenue: 575000, growthPercentage: 15, type: 'projected', keyDriver: 'AI recommended new finance services' },
  { period: 'Nov 2026 (Projected)', projectedRevenue: 660000, growthPercentage: 14.7, type: 'projected', keyDriver: 'Onboarding 3 new certified scholars' },
  { period: 'Dec 2026 (Projected)', projectedRevenue: 750000, growthPercentage: 13.6, type: 'projected', keyDriver: 'Year-end coupon campaigns & bundle courses' }
];

export const serviceSuggestionsData: ServiceSuggestion[] = [
  {
    id: 'sug-1',
    title: 'Contemporary Crypto & Stocks Shariah Advisory',
    category: 'Islamic Finance',
    userInterestScore: 94,
    searchQueries: ['is crypto halal', 'bitcoin zakat calculation', 'stock options shariah'],
    suggestedType: 'Consultation Service',
    expectedRevenueImpact: '+₹120,000 / month',
    recommendedScholar: 'Mufti Ahmed Khan'
  },
  {
    id: 'sug-2',
    title: '4-Week Intensive Marriage Preparation Masterclass',
    category: 'Family & Marriage',
    userInterestScore: 88,
    searchQueries: ['pre marital counseling', 'rights of wife and husband', 'family fiqh'],
    suggestedType: 'Masterclass Bootcamp',
    expectedRevenueImpact: '+₹95,000 / cohort',
    recommendedScholar: 'Dr. Saba Fatima'
  },
  {
    id: 'sug-3',
    title: 'Automated Islamic Inheritance (Mirath) Audit Service',
    category: 'Fiqh & Masail',
    userInterestScore: 82,
    searchQueries: ['inheritance division calculator', 'will laws islam', 'property distribution'],
    suggestedType: 'Consultation Service',
    expectedRevenueImpact: '+₹60,000 / month',
    recommendedScholar: 'Maulana Rashid'
  }
];
