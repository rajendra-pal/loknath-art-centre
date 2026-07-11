// =====================================================
// Centralized content data for LOKNATH ART CENTRE
// All content is in natural, professional Bengali
// (except brand name, nav items, and standard CTAs as per spec)
// =====================================================

export type Course = {
  id: string;
  title: string;          // English (kept for reference / admin)
  titleBn: string;        // Bengali display title
  titleEn: string;        // English short title
  duration: string;       // Bengali
  ageGroup: string;       // Bengali
  level: 'শুরু' | 'মধ্যম' | 'উচ্চ' | 'সকল স্তর';
  description: string;    // Bengali
  image: string;
  color: string;
  category: string;       // Bengali category
};

export type Product = {
  id: string;
  name: string;           // Bengali
  category: string;       // Bengali
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  badge?: 'সর্বাধিক বিক্রিত' | 'নতুন আগমন' | 'সীমিত অফার';
};

export type GalleryItem = {
  id: string;
  title: string;          // Bengali
  category: string;       // Bengali
  image: string;
  student: string;        // Bengali
  age?: number;
};

export type Testimonial = {
  id: string;
  name: string;           // Bengali
  role: 'অভিভাবক' | 'ছাত্র' | 'ছাত্রী';
  message: string;        // Bengali
  avatar: string;
  rating: number;
};

export type EventItem = {
  id: string;
  title: string;          // Bengali
  date: string;
  type: 'প্রতিযোগিতা' | 'কর্মশালা' | 'প্রদর্শনী' | 'ক্যাম্প';
  description: string;    // Bengali
  image: string;
};

export type BlogPost = {
  id: string;
  title: string;          // Bengali
  category: string;       // Bengali
  excerpt: string;        // Bengali
  image: string;
  date: string;
  readTime: string;       // Bengali
};

export type FAQItem = {
  id: string;
  question: string;       // Bengali
  answer: string;         // Bengali
};

export type Stat = {
  value: number;
  suffix: string;
  label: string;          // Bengali
  color: string;
};

export type Feature = {
  icon: string;
  title: string;          // Bengali
  description: string;    // Bengali
  color: string;
};

// =====================================================
// HERO
// =====================================================
export const heroContent = {
  eyebrow: 'কল্পনা যেখানে শিল্প হয়ে ওঠে',
  // headline: ['স্বপ্ন দেখো,', 'আঁকো,', 'নিজেকে গড়ে তোলো'],
  description:
    'প্রতিটি শিশু আবিষ্কার করে নিজের ভেতরের শিল্পীকে। আঁকা, রং, ক্যানভাস আর স্বপ্নের এক অনন্য যাত্রা — ১৫ বছরের অভিজ্ঞতায় গড়া প্রিমিয়াম আর্ট শিক্ষা।',
  primaryCta: 'কোর্স দেখুন',
  secondaryCta: 'স্টোরে যান',
  socialProof: '৫০০+ ছাত্র-ছাত্রী ও অভিভাবকের ভালোবাসা',
};

// =====================================================
// STATS
// =====================================================
export const stats: Stat[] = [
  { value: 500, suffix: '+', label: 'খুশি ছাত্র-ছাত্রী', color: '#FF6B35' },
  { value: 15, suffix: '+', label: 'বছরের অভিজ্ঞতা', color: '#8B5CF6' },
  { value: 100, suffix: '+', label: 'আর্ট প্রদর্শনী', color: '#FF5C8A' },
  { value: 50, suffix: '+', label: 'পুরস্কার অর্জন', color: '#3B82F6' },
];

// =====================================================
// WHY CHOOSE US
// =====================================================
export const features: Feature[] = [
  {
    icon: 'Sparkles',
    title: 'অভিজ্ঞ শিক্ষক',
    description: '১৫ বছরেরও বেশি শিক্ষাদানের অভিজ্ঞতার সঙ্গে একজন মাস্টার আর্টিস্টের কাছ থেকে শিখুন।',
    color: '#FF6B35',
  },
  {
    icon: 'Heart',
    title: 'ব্যক্তিগত মনোযোগ',
    description: 'ছোট ব্যাচের আয়োজন — প্রতিটি শিশু পায় তার প্রাপ্য নির্দেশনা ও যত্ন।',
    color: '#FF5C8A',
  },
  {
    icon: 'Palette',
    title: 'সৃজনশীল পরিবেশ',
    description: 'একটি স্টুডিও পরিবেশ যা কল্পনাকে উদ্দীপিত করে এবং শিল্পের বিকাশ ঘটায়।',
    color: '#8B5CF6',
  },
  {
    icon: 'Trophy',
    title: 'আঁকা প্রতিযোগিতা',
    description: 'নিয়মিত প্রতিযোগিতার খোঁজ খবর দেওয়া হয়। প্রতিযোগিতার মাধ্যমে প্রতিভা প্রদর্শনের সুযোগ এবং আত্মবিশ্বাস গড়ে তোলা হয়।',
    color: '#FBBF24',
  },
  {
    icon: 'Image',
    title: 'আর্ট প্রদর্শনী',
    description: 'ছাত্রদের শিল্পকর্ম গ্যালারি ও সর্বজনীন প্রদর্শনীতে স্থান পায়।',
    color: '#3B82F6',
  },
  {
    icon: 'Award',
    title: 'সার্টিফিকেট কোর্স',
    description: 'কোর্স সফলভাবে সম্পন্ন করলে স্বীকৃত সার্টিফিকেট প্রদান করা হয়।',
    color: '#10B981',
  },
  {
    icon: 'Wallet',
    title: 'সাশ্রয়ী মূল্য',
    description: 'প্রিমিয়াম আর্ট শিক্ষা এমন একটি মূল্যে যা প্রতিটি পরিবারের সাধ্যের মধ্যে।',
    color: '#FF8E72',
  },
  {
    icon: 'Users',
    title: 'ছোট ব্যাচের আকার',
    description: 'প্রতি ব্যাচে সর্বোচ্চ ৮ - ১০ জন ছাত্র-ছাত্রী — মানসম্মত একের পর এক নির্দেশনা।',
    color: '#A78BFA',
  },
];

// =====================================================
// COURSES
// =====================================================
export const courses: Course[] = [
  {
    id: 'c1',
    title: 'Basic Drawing',
    titleBn: 'বেসিক ড্রয়িং',
    titleEn: 'Basic Drawing',
    duration: '৩ মাস',
    ageGroup: '6-10 বছর',
    level: 'শুরু',
    description: 'আঁকার ভিত্তি — রেখা, আকার এবং পর্যবেক্ষণ দক্ষতার প্রথম পাঠ।',
    image: '/images/drawing/Basic drawing.jpg',
    color: '#FF6B35',
    category: 'ড্রয়িং',
  },
  {
    id: 'c2',
    title: 'Pencil Sketch',
    titleBn: 'পেন্সিল স্কেচ',
    titleEn: 'Pencil Sketch',
    duration: '৪ মাস',
    ageGroup: '10+ বছর',
    level: 'শুরু',
    description: 'ছায়া, টেক্সচার ও গ্রাফাইট কৌশলে দক্ষতা অর্জন।',
    image: '/images/drawing/pencil sketch.jpg',
    color: '#8B5CF6',
    category: 'স্কেচিং',
  },
  {
    id: 'c3',
    title: 'Still Life',
    titleBn: 'স্টিল লাইফ',
    titleEn: 'Still Life',
    duration: '৩ মাস',
    ageGroup: '12+ বছর',
    level: 'মধ্যম',
    description: 'আলো-ছায়া ও কম্পোজিশনের মাধ্যমে বস্তুর চিত্রায়ণ।',
    image: '/images/drawing/still life.jpg',
    color: '#FF5C8A',
    category: 'ড্রয়িং',
  },
  {
    id: 'c4',
    title: 'Portrait Drawing',
    titleBn: 'পোর্ট্রেট ড্রয়িং',
    titleEn: 'Portrait Drawing',
    duration: '৬ মাস',
    ageGroup: '14+ বছর',
    level: 'উচ্চ',
    description: 'মানুষের মুখের সাদৃশ্য ও অনুভূতি ধরার শিল্প।',
    image: '/images/drawing/potrait drawing.jpg',
    color: '#3B82F6',
    category: 'পোর্ট্রেট',
  },
  {
    id: 'c5',
    title: 'Watercolor Painting',
    titleBn: 'ওয়াটারকালার পেইন্টিং',
    titleEn: 'Watercolor Painting',
    duration: '৪ মাস',
    ageGroup: '10+ বছর',
    level: 'মধ্যম',
    description: 'জল রঙের খেলা — ওয়াশ, ব্লেন্ডিং ও রঙের পরীক্ষা-নিরীক্ষা।',
    image: '/images/drawing/market watercolor.jpg',
    color: '#60A5FA',
    category: 'পেইন্টিং',
  },
  {
    id: 'c6',
    title: 'Oil Painting',
    titleBn: 'অয়েল পেইন্টিং',
    titleEn: 'Oil Painting',
    duration: '৬ মাস',
    ageGroup: '14+ বছর',
    level: 'উচ্চ',
    description: 'গভীর রঙ ও সমৃদ্ধ গভীরতায় চিরায়ত অয়েল কৌশল।',
    image: '/images/drawing/oil painting.jpg',
    color: '#FBBF24',
    category: 'পেইন্টিং',
  },
  {
    id: 'c7',
    title: 'Poster Color',
    titleBn: 'পোস্টার কালার',
    titleEn: 'Poster Color',
    duration: '২ মাস',
    ageGroup: '6-12 বছর',
    level: 'শুরু',
    description: 'স্কুল প্রজেক্টের জন্য উজ্জ্বল ও জোরালো পোস্টার পেইন্টিং।',
    image: '/images/drawing/poster color painting.jpg',
    color: '#FF8E72',
    category: 'রং',
  },
  {
    id: 'c8',
    title: 'Acrylic Painting',
    titleBn: 'অ্যাক্রিলিক পেইন্টিং',
    titleEn: 'Acrylic Painting',
    duration: '৪ মাস',
    ageGroup: '15+ বছর',
    level: 'মধ্যম',
    description: 'দ্রুত শুকনো অ্যাক্রিলিক দিয়ে প্রাণবন্ত আধুনিক শিল্পকর্ম।',
    image: '/images/drawing/acrylic painting.jpg',
    color: '#10B981',
    category: 'পেইন্টিং',
  },
  {
    id: 'c9',
    title: 'Pastel Art',
    titleBn: 'পাস্তেল আর্ট',
    titleEn: 'Pastel Art',
    duration: '৩ মাস',
    ageGroup: '10+ বছর',
    level: 'সকল স্তর',
    description: 'সফট ও অয়েল পাস্তেল দিয়ে অভিব্যক্তিপূর্ণ শিল্পকর্ম।',
    image: '/images/drawing/pastel art.jpg',
    color: '#A78BFA',
    category: 'রং',
  },
  {
    id: 'c13',
    title: 'Canvas Painting',
    titleBn: 'ক্যানভাস পেইন্টিং',
    titleEn: 'Canvas Painting',
    duration: '৪ মাস',
    ageGroup: '12+ বছর',
    level: 'মধ্যম',
    description: 'পেশাদার শিল্পীর মতো টানা ক্যানভাসে কাজ করার অভিজ্ঞতা।',
    image: '/images/drawing/canvas painting.png',
    color: '#FF6B35',
    category: 'পেইন্টিং',
  },
  {
    id: 'c14',
    title: 'Landscape',
    titleBn: 'ল্যান্ডস্কেপ',
    titleEn: 'Landscape',
    duration: '৪ মাস',
    ageGroup: '12+ বছর',
    level: 'মধ্যম',
    description: 'প্রকৃতির রূপ — আকাশ, পাহাড়, জল ও গাছের চিত্রায়ণ।',
    image: '/images/drawing/landscape.jpg',
    color: '#8B5CF6',
    category: 'পেইন্টিং',
  },
  {
    id: 'c15',
    title: 'Modern Art',
    titleBn: 'মডার্ন আর্ট',
    titleEn: 'Modern Art',
    duration: '৬ মাস',
    ageGroup: '14+ বছর',
    level: 'উচ্চ',
    description: 'অ্যাবস্ট্র্যাক্ট ও সমকালীন শিল্পধারা ও কৌশল।',
    image: '/images/drawing/modern art.jpg',
    color: '#FF5C8A',
    category: 'আধুনিক',
  },
  {
    id: 'c16',
    title: 'Kids Art',
    titleBn: 'কিডস আর্ট',
    titleEn: 'Kids Art',
    duration: '৩ মাস',
    ageGroup: '4-8 বছর',
    level: 'শুরু',
    description: 'খেলাচ্ছলে আঁকা — যা গড়ে তোলে হাতের দক্ষতা ও সৃজনশীলতা।',
    image: '/images/drawing/kids art.jpg',
    color: '#FBBF24',
    category: 'শিশু',
  },
  {
    id: 'c17',
    title: 'Exam Preparation',
    titleBn: 'পরীক্ষার প্রস্তুতি',
    titleEn: 'Exam Preparation',
    duration: '৩ মাস',
    ageGroup: '10-18 বছর',
    level: 'সকল স্তর',
    description: 'মাধ্যমিক, উচ্চমাধ্যমিক ও প্রতিযোগিতামূলক পরীক্ষার আর্ট প্রস্তুতি।',
    image: '/images/drawing/drawing exam preparation.jpg',
    color: '#3B82F6',
    category: 'পরীক্ষা',
  },
  {
    id: 'c18',
    title: 'Professional Fine Arts',
    titleBn: 'প্রফেশনাল ফাইন আর্টস',
    titleEn: 'Professional Fine Arts',
    duration: '১২ মাস',
    ageGroup: '16+ বছর',
    level: 'উচ্চ',
    description: 'পেশাদার শিল্পী হওয়ার স্বপ্ন দেখাদের জন্য ক্যারিয়ার-কেন্দ্রিক প্রোগ্রাম।',
    image: '/images/drawing/professional fine art1.jpg',
    color: '#10B981',
    category: 'পেশাদার',
  },
];

// =====================================================
// GALLERY
// =====================================================
export const galleryCategories = [
  'সব দেখুন',
  'ওয়াটারকালার',
  'অয়েল পেইন্টিং',
  'পেন্সিল স্কেচ',
  'পোর্ট্রেট',
  'ল্যান্ডস্কেপ',
  'কোলাজ',
  'হাতের কাজ',
  'ক্যানভাস',
  'স্টিল লাইফ',
  'প্রকৃতি',
  'শিশুদের শিল্প',
  'উৎসবের শিল্প',
];

export const galleryItems: GalleryItem[] = [
  {
    id: 'g1',
    title: 'সূর্যাস্তের পাহাড়',
    category: 'ল্যান্ডস্কেপ',
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&q=80',
    student: 'অর্ণব দাস',
    age: 14,
  },
  {
    id: 'g2',
    title: 'মায়ের প্রতিকৃতি',
    category: 'পোর্ট্রেট',
    image: 'https://images.unsplash.com/photo-1578926375605-eaf7559b1458?w=800&q=80',
    student: 'শ্রাবন্তী রায়',
    age: 16,
  },
  {
    id: 'g3',
    title: 'গ্রামের পুকুর',
    category: 'ওয়াটারকালার',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80',
    student: 'রোহিত সেন',
    age: 13,
  },
  {
    id: 'g4',
    title: 'বৃদ্ধ মানুষের স্কেচ',
    category: 'পেন্সিল স্কেচ',
    image: 'https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?w=800&q=80',
    student: 'প্রীতম ঘোষ',
    age: 15,
  },
  {
    id: 'g5',
    title: 'ফল ও ফুলদানি',
    category: 'স্টিল লাইফ',
    image: 'https://images.unsplash.com/photo-1579783901586-d88db74b4da4?w=800&q=80',
    student: 'মৌ বন্দ্যোপাধ্যায়',
    age: 14,
  },
  {
    id: 'g6',
    title: 'বাংলার বাঘ',
    category: 'অয়েল পেইন্টিং',
    image: 'https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=800&q=80',
    student: 'সুভাজিৎ কর',
    age: 17,
  },
  {
    id: 'g7',
    title: 'কাগজের ফুল',
    category: 'হাতের কাজ',
    image: 'https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?w=800&q=80',
    student: 'অনন্যা পাল',
    age: 9,
  },
  {
    id: 'g8',
    title: 'বনের পথ',
    category: 'ল্যান্ডস্কেপ',
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&q=80',
    student: 'দেবাঞ্জন দে',
    age: 15,
  },
  {
    id: 'g9',
    title: 'স্বপ্নময়ী মেয়ে',
    category: 'পোর্ট্রেট',
    image: 'https://images.unsplash.com/photo-1578926375605-eaf7559b1458?w=800&q=80',
    student: 'ইশিতা দত্ত',
    age: 16,
  },
  {
    id: 'g10',
    title: 'জাদুর গাছ',
    category: 'শিশুদের শিল্প',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80',
    student: 'আর্য বেরা',
    age: 7,
  },
  {
    id: 'g11',
    title: 'দুর্গা পূজা',
    category: 'উৎসবের শিল্প',
    image: 'https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=800&q=80',
    student: 'সুমন মাইতি',
    age: 18,
  },
  {
    id: 'g12',
    title: 'প্রকৃতির সমন্বয়',
    category: 'কোলাজ',
    image: 'https://images.unsplash.com/photo-1579783901586-d88db74b4da4?w=800&q=80',
    student: 'তানিয়া সাহা',
    age: 12,
  },
];

// =====================================================
// FEATURED ARTWORK
// =====================================================
export const featuredArtwork = [
  {
    id: 'f1',
    title: 'বাংলার ঐতিহ্য',
    medium: 'ওয়াটারকালার',
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=1200&q=80',
  },
  {
    id: 'f2',
    title: 'বর্ষার মেজাজ',
    medium: 'অয়েল পেইন্টিং',
    image: 'https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=1200&q=80',
  },
  {
    id: 'f3',
    title: 'পুরনো কলকাতা',
    medium: 'পেন্সিল স্কেচ',
    image: 'https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?w=1200&q=80',
  },
  {
    id: 'f4',
    title: 'জেলে',
    medium: 'পোর্ট্রেট',
    image: 'https://images.unsplash.com/photo-1578926375605-eaf7559b1458?w=1200&q=80',
  },
  {
    id: 'f5',
    title: 'সুন্দরবন',
    medium: 'ল্যান্ডস্কেপ',
    image: 'https://images.unsplash.com/photo-1579783901586-d88db74b4da4?w=1200&q=80',
  },
];

// =====================================================
// STORE
// =====================================================
export const storeCategories = [
  'আঁকার বই',
  'স্কেচ বুক',
  'আর্ট পেপার',
  'ক্যানভাস বোর্ড',
  'পেন্সিল',
  'চারকোল',
  'কালার পেন্সিল',
  'অয়েল পাস্তেল',
  'সফট পাস্তেল',
  'ওয়াটারকালার',
  'পোস্টার কালার',
  'অ্যাক্রিলিক কালার',
  'অয়েল কালার',
  'ব্রাশ',
  'প্যালেট',
  'ইরেজার',
  'শার্পনার',
  'স্কেল',
  'ড্রয়িং ক্লিপস',
  'মাস্কিং টেপ',
  'প্যালেট নাইফ',
  'ক্যানভাস',
  'মার্কার',
  'ফাইনলাইনার',
  'ক্যালিগ্রাফি পেন',
  'জ্যামিতির সরঞ্জাম',
  'কিডস আর্ট কিট',
  'প্রফেশনাল আর্টিস্ট কিট',
];

export const products: Product[] = [
  {
    id: 'p1',
    name: 'প্রিমিয়াম ওয়াটারকালার সেট (২৪ রঙ)',
    category: 'ওয়াটারকালার',
    price: 899,
    originalPrice: 1299,
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&q=80',
    rating: 4.8,
    reviews: 142,
    badge: 'সর্বাধিক বিক্রিত',
  },
  {
    id: 'p2',
    name: 'প্রফেশনাল ব্রাশ সেট (১২টি)',
    category: 'ব্রাশ',
    price: 649,
    originalPrice: 999,
    image: 'https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?w=600&q=80',
    rating: 4.9,
    reviews: 98,
    badge: 'নতুন আগমন',
  },
  {
    id: 'p3',
    name: 'ক্যানভাস বোর্ড প্যাক (৫টি)',
    category: 'ক্যানভাস বোর্ড',
    price: 549,
    image: 'https://images.unsplash.com/photo-1579783901586-d88db74b4da4?w=600&q=80',
    rating: 4.7,
    reviews: 67,
  },
  {
    id: 'p4',
    name: 'আর্টিস্ট অয়েল কালার (১২টি টিউব)',
    category: 'অয়েল কালার',
    price: 1499,
    originalPrice: 1999,
    image: 'https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=600&q=80',
    rating: 4.9,
    reviews: 56,
    badge: 'সীমিত অফার',
  },
  {
    id: 'p5',
    name: 'প্রফেশনাল স্কেচ বুক এ৪',
    category: 'স্কেচ বুক',
    price: 299,
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&q=80',
    rating: 4.6,
    reviews: 211,
  },
  {
    id: 'p6',
    name: 'অ্যাক্রিলিক কালার সেট (১৮ শেড)',
    category: 'অ্যাক্রিলিক কালার',
    price: 1199,
    originalPrice: 1599,
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&q=80',
    rating: 4.8,
    reviews: 89,
    badge: 'সর্বাধিক বিক্রিত',
  },
  {
    id: 'p7',
    name: 'সফট পাস্তেল (৩৬ রঙ)',
    category: 'সফট পাস্তেল',
    price: 449,
    image: 'https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?w=600&q=80',
    rating: 4.7,
    reviews: 73,
  },
  {
    id: 'p8',
    name: 'কিডস আর্ট কিট (৫০+ আইটেম)',
    category: 'কিডস আর্ট কিট',
    price: 799,
    originalPrice: 1199,
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&q=80',
    rating: 4.9,
    reviews: 178,
    badge: 'নতুন আগমন',
  },
];

export const shopFeatures = [
  { icon: 'Truck', title: 'দ্রুত ডেলিভারি', desc: 'সারা ভারতে ৩-৫ দিনে শিপিং', color: '#FF6B35' },
  { icon: 'CreditCard', title: 'ক্যাশ অন ডেলিভারি', desc: 'পণ্য পেয়ে পেমেন্ট করুন', color: '#8B5CF6' },
  { icon: 'Smartphone', title: 'ইউপিআই পেমেন্ট', desc: 'জিপে, ফোনপে, পেটিএম', color: '#10B981' },
  { icon: 'Shield', title: 'মানসম্মত পণ্য', desc: 'শুধু ব্র্যান্ডেড উপকরণ', color: '#3B82F6' },
  { icon: 'Tag', title: 'সাশ্রয়ী মূল্য', desc: 'সেরা দামের নিশ্চয়তা', color: '#FF5C8A' },
  { icon: 'RefreshCw', title: 'সহজ রিটার্ন', desc: '৭ দিনের রিটার্ন নীতি', color: '#FBBF24' },
];

// =====================================================
// EVENTS
// =====================================================
export const events: EventItem[] = [
  {
    id: 'e1',
    title: 'বার্ষিক আঁকা প্রতিযোগিতা ২০২৬',
    date: '১৫ আগস্ট ২০২৬',
    type: 'প্রতিযোগিতা',
    description: 'আপনার দক্ষতা দেখান এবং আকর্ষণীয় পুরস্কার জিতুন।',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80',
  },
  {
    id: 'e2',
    title: 'ওয়াটারকালার কর্মশালা',
    date: '২২ আগস্ট ২০২৬',
    type: 'কর্মশালা',
    description: 'মাস্টার শিল্পীদের সঙ্গে তিন দিনের গভীর কর্মশালা।',
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&q=80',
  },
  {
    id: 'e3',
    title: 'ছাত্র আর্ট প্রদর্শনী',
    date: '১০ সেপ্টেম্বর ২০২৬',
    type: 'প্রদর্শনী',
    description: 'নির্বাচিত শিল্পকর্ম শহরের আর্ট গ্যালারিতে প্রদর্শিত হবে।',
    image: 'https://images.unsplash.com/photo-1578926375605-eaf7559b1458?w=800&q=80',
  },
  {
    id: 'e4',
    title: 'গ্রীষ্মকালীন আর্ট ক্যাম্প',
    date: 'মে ২০২৬',
    type: 'ক্যাম্প',
    description: 'ছোট শিল্পীদের জন্য ৩০ দিনের সৃজনশীল যাত্রা।',
    image: 'https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?w=800&q=80',
  },
  {
    id: 'e5',
    title: 'শীতকালীন ক্যাম্প — উৎসবের শিল্প',
    date: 'ডিসেম্বর ২০২৬',
    type: 'ক্যাম্প',
    description: 'ছুটির দিনগুলোতে জাদুকরী শিল্পকর্ম তৈরি করুন।',
    image: 'https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=800&q=80',
  },
  {
    id: 'e6',
    title: 'উৎসবের আঁকা প্রতিযোগিতা',
    date: 'অক্টোবর ২০২৬',
    type: 'প্রতিযোগিতা',
    description: 'দুর্গা পূজার থিমে ঐতিহ্যবাহী শিল্পকর্ম তৈরি করুন।',
    image: 'https://images.unsplash.com/photo-1579783901586-d88db74b4da4?w=800&q=80',
  },
];

// =====================================================
// TESTIMONIALS
// =====================================================
export const testimonials: Testimonial[] = [
  {
    id: 't1',
    name: 'রিনা দাস',
    role: 'অভিভাবক',
    message:
      'আমার মেয়ে একজন আত্মবিশ্বাসী শিল্পী হিসেবে নিজেকে আবিষ্কার করেছে। ব্যক্তিগত মনোযোগ আর সৃজনশীল পরিবেশ — সত্যিই অতুলনীয়। শহরের সেরা আর্ট স্কুল!',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
    rating: 5,
  },
  {
    id: 't2',
    name: 'সৌরভ মিত্র',
    role: 'ছাত্র',
    message:
      'নিজে নিজে বছরের পর বছর চেষ্টা করেও যা শিখতে পারিনি, এখানে ৬ মাসে তার চেয়ে বেশি শিখেছি। শিক্ষক অসম্ভব ধৈর্যশীল এবং দক্ষ।',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=200&q=80',
    rating: 5,
  },
  {
    id: 't3',
    name: 'অনিতা রায়',
    role: 'অভিভাবক',
    message:
      'আমার ছেলের কাজ যেদিন প্রদর্শনীতে ঝুলল, চোখে জল এসে গিয়েছিল। তার প্রতিভাকে লালন করার জন্য ধন্যবাদ।',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80',
    rating: 5,
  },
  {
    id: 't4',
    name: 'মৌমিতা সেন',
    role: 'ছাত্রী',
    message:
      'একজন লাজুক মেয়ে থেকে আত্মবিশ্বাসী চিত্রশিল্পী — এই স্কুল আমাকে বদলে দিয়েছে। আর্ট স্টোরেও আমার যা কিছু দরকার সব পাই!',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&q=80',
    rating: 5,
  },
];

// =====================================================
// BLOG
// =====================================================
export const blogPosts: BlogPost[] = [
  {
    id: 'b1',
    title: 'প্রতিটি শিক্ষানবিসের জানা উচিত ১০টি ওয়াটারকালার কৌশল',
    category: 'ওয়াটারকালার গাইড',
    excerpt: 'ওয়েট-অন-ওয়েট, ড্রাই ব্রাশ আর রঙের ব্লেন্ডিং — এই পেশাদার টিপসগুলোর সাহায্যে মূল বিষয়গুলো আয়ত্ত করুন।',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80',
    date: '১২ জুলাই ২০২৬',
    readTime: '৫ মিনিট',
  },
  {
    id: 'b2',
    title: 'ফাইন আর্টসে ক্যারিয়ার গড়বেন কীভাবে',
    category: 'আর্ট ক্যারিয়ার',
    excerpt: 'যুব শিল্পীদের জন্য একটি বাস্তবসম্মত গাইড — যারা শখকে পেশায় রূপ দিতে চায় তাদের জন্য।',
    image: 'https://images.unsplash.com/photo-1578926375605-eaf7559b1458?w=800&q=80',
    date: '০৫ জুলাই ২০২৬',
    readTime: '৮ মিনিট',
  },
  {
    id: 'b3',
    title: 'আপনার হাতের লাইন উন্নত করার ৭টি স্কেচিং কৌশল',
    category: 'স্কেচিং কৌশল',
    excerpt: 'এই সহজ দৈনিক অনুশীলনগুলো আপনার রেখার মানকে নাটকীয়ভাবে উন্নত করবে।',
    image: 'https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?w=800&q=80',
    date: '২৮ জুন ২০২৬',
    readTime: '৪ মিনিট',
  },
  {
    id: 'b4',
    title: 'শিক্ষানবিসদের জন্য অয়েল পেইন্টিং টিপস',
    category: 'অয়েল পেইন্টিং টিপস',
    excerpt: 'সাধারণ ভুলগুলো এড়িয়ে ঠিক পদ্ধতিতে অয়েল পেইন্টিং শুরু করুন।',
    image: 'https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=800&q=80',
    date: '২০ জুন ২০২৬',
    readTime: '৬ মিনিট',
  },
  {
    id: 'b5',
    title: 'আঁকার টিপস',
    category: 'আঁকার টিপস',
    excerpt: 'প্রতিটি তরুণ শিল্পীর প্রথমে আয়ত্ত করা উচিত এমন মূলনীতিগুলো।',
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&q=80',
    date: '১৫ জুন ২০২৬',
    readTime: '৫ মিনিট',
  },
  {
    id: 'b6',
    title: 'শিশুদের সৃজনশীলতা খুলে দিন শিল্পের মাধ্যমে',
    category: 'শিশুদের সৃজনশীলতা',
    excerpt: 'সৃজনশীল কার্যক্রম কীভাবে তরুণ মনকে গড়ে তোলে এবং আত্মবিশ্বাস বাড়ায়।',
    image: 'https://images.unsplash.com/photo-1579783901586-d88db74b4da4?w=800&q=80',
    date: '০৮ জুন ২০২৬',
    readTime: '৪ মিনিট',
  },
];

// =====================================================
// FAQ
// =====================================================
export const faqs: FAQItem[] = [
  {
    id: 'f1',
    question: 'আঁকা শেখার সঠিক বয়স কোনটি?',
    answer:
      'মাত্র ৪ বছর বয়সী শিশুরাও আমাদের কিডস আর্ট প্রোগ্রামের মাধ্যমে শুরু করতে পারে। ৪ থেকে ৮০ বছর পর্যন্ত প্রত্যেক বয়সের জন্য আমাদের কোর্স রয়েছে।',
  },
  {
    id: 'f2',
    question: 'আপনারা কি আর্ট সরঞ্জাম সরবরাহ করেন?',
    answer:
      'নিয়মিত ক্লাসে মৌলিক সরঞ্জাম অন্তর্ভুক্ত থাকে। এছাড়া আমাদের নিজস্ব আর্ট স্টোরে ছাত্র-ছাত্রীদের জন্য বিশেষ ছাড়ে প্রিমিয়াম সরঞ্জাম কেনার সুযোগ রয়েছে।',
  },
  {
    id: 'f3',
    question: 'প্রতি ব্যাচে কতজন ছাত্র-ছাত্রী থাকেন?',
    answer:
      'প্রতিটি ছাত্র-ছাত্রী শিক্ষকের ব্যক্তিগত মনোযোগ পান — তাই ব্যাচে সর্বোচ্চ ৮ জন রাখা হয়।',
  },
  {
    id: 'f4',
    question: 'পরীক্ষা বা সার্টিফিকেট কি আছে?',
    answer:
      'হ্যাঁ। প্রতিটি কোর্স সফলভাবে সম্পন্ন করলে ছাত্র-ছাত্রীরা লোকনাথ আর্ট স্কুলের স্বীকৃত সার্টিফিকেট লাভ করে।',
  },
  {
    id: 'f5',
    question: 'আপনারা কি অনলাইন ক্লাস দেন?',
    answer:
      'বর্তমানে আমরা আমাদের স্টুডিওতে সরাসরি ক্লাস নিই। মৌসুম অনুযায়ী অনলাইন কর্মশালার আয়োজন করা হয় — আমাদের ইভেন্ট সেকশনে চোখ রাখুন।',
  },
  {
    id: 'f6',
    question: 'ফি কাঠামো কেমন?',
    answer:
      'কোর্স অনুযায়ী ফি ভিন্ন হয়। বিস্তারিত ফি তথ্যের জন্য আমাদের কোর্স সেকশন দেখুন বা যোগাযোগ করুন। আমরা প্রতিটি পরিবারের সাধ্যের মধ্যে রাখার চেষ্টা করি।',
  },
];

// =====================================================
// NAV LINKS (English per spec — nav must remain in English)
// =====================================================
export const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Courses', href: '#courses' },
  { label: 'Gallery', href: '#gallery' },
  { label: "Students' Works", href: '#students' },
  { label: 'Art Store', href: '/store' },
  { label: 'Events', href: '#events' },
  { label: 'Blog', href: '#blog' },
  { label: 'Contact', href: '#contact' },
];

// =====================================================
// ABOUT
// =====================================================
export const aboutContent = {
  badge: 'শিল্পীর সাথে পরিচয়',
  titleBefore: 'একজন শিক্ষক যিনি আঁকেন',
  titleHighlight: 'ভবিষ্যৎ',
  titleAfter: ', শুধু ছবি নয়।',
  description:
    '15 বছরেরও বেশি সময় ধরে আমাদের প্রতিষ্ঠাতা শত শত শিশু ও প্রাপ্তবয়স্কদের শিল্পের আনন্দ আবিষ্কারে সাহায্য করে চলেছেন। কলকাতার গভর্নমেন্ট কলেজ অব আর্ট অ্যান্ড ক্রাফটে প্রশিক্ষিত এই শিক্ষক চিরায়ত কৌশলকে আধুনিক সৃজনশীলতার সঙ্গে মিশিয়ে শেখান।',
  quote: '"প্রতিটি শিশুই একজন শিল্পী। সমস্যা হল, বড় হওয়ার পরও কীভাবে শিল্পী থাকা যায়।"',
  quoteAuthor: '— পাবলো পিকাসো',
  missionTitle: 'আমাদের লক্ষ্য',
  missionDesc: 'প্রতিটি শিশুর জন্য শিল্প শিক্ষাকে সুলভ, আনন্দদায়ক ও জীবন বদলে দেওয়ার মতো করে তোলা।',
  visionTitle: 'আমাদের স্বপ্ন',
  visionDesc: 'এমন একটি বাংলা যেখানে প্রতিটি ঘরে একজন শিশু আছে যে আত্মবিশ্বাসের সঙ্গে আঁকে।',
  experienceBadge: 'বছরের অভিজ্ঞতা',
  studentsBadge: 'প্রশিক্ষিত ছাত্র-ছাত্রী',
};

// =====================================================
// CTA BANNER
// =====================================================
export const ctaContent = {
  badge: 'সীমিত আসন · নতুন ব্যাচ',
  title1: 'আপনার গল্প',
  title2: 'আঁকার জন্য প্রস্তুত?',
  description: 'এই মাসে ভর্তি হলে বিনামূল্যে স্টার্টার আর্ট কিট পান। প্রতি ব্যাচে মাত্র ৮টি আসন।',
  primary: 'এখনই ভর্তি হোন',
  secondary: 'ফোন করুন +৯১ ৯৮৭৬৫ ৪৩২১০',
};

// =====================================================
// CONTACT INFO
// =====================================================
export const contactInfo = {
  badge: 'যোগাযোগ করুন',
  titleBefore: 'একটি',
  titleHighlight: 'সৃজনশীল',
  titleAfter: 'যাত্রা শুরু করুন',
  description: 'আমাদের স্টুডিওতে আসুন, ফোন করুন অথবা মেসেজ পাঠান — আপনার কথা শুনতে চাই।',
  form: {
    name: 'পুরো নাম',
    phone: 'ফোন নম্বর',
    email: 'ইমেইল',
    course: 'কোর্স নির্বাচন করুন',
    message: 'আপনার বার্তা',
    placeholders: {
      name: 'আপনার নাম',
      phone: '+৯১ ...',
      email: 'you@example.com',
      message: 'আপনার লক্ষ্য সম্পর্কে একটু লিখুন...',
    },
    submit: 'বার্তা পাঠান',
  },
  details: [
    { icon: 'MapPin', title: 'স্টুডিওতে আসুন', lines: ['ময়নাগুড়ি', 'সুলতানপুর - 713146, পশ্চিমবঙ্গ'], color: '#FF6B35' },
    { icon: 'Phone', title: 'ফোন করুন', lines: ['+91 62963 77408', '+91 62963 77408'], color: '#8B5CF6' },
    { icon: 'Mail', title: 'ইমেইল', lines: ['hello@loknathart.in', 'admissions@loknathart.in'], color: '#FF5C8A' },
    { icon: 'MessageCircle', title: 'হোয়াটসঅ্যাপ', lines: ['+91 62963 77408', '24 x 7'], color: '#10B981' },
  ],
};

// =====================================================
// FOOTER
// =====================================================
export const footerContent = {
  brand: 'Loknath',
  brandSub: 'Art School',
  description: '২০১০ সাল থেকে বাংলায় সৃজনশীলতার লালন। যেখানে কল্পনা শিল্প হয়ে ওঠে এবং প্রতিটি রেখা একটি গল্প বলে।',
  newsletter: {
    placeholder: 'আপনার ইমেইল',
    button: 'সাবস্ক্রাইব',
    note: 'আর্ট টিপস, ইভেন্ট আপডেট ও বিশেষ অফার পান। স্প্যাম নয়।',
    success: 'স্টুডিওতে স্বাগতম!',
    successDesc: 'আমরা আপনাকে আর্ট টিপস ও ইভেন্ট আপডেট পাঠাব।',
  },
  explore: 'ঘুরে দেখুন',
  store: 'স্টোর',
  reach: 'যোগাযোগ',
  address: '৪২ পার্ক স্ট্রিট, অ্যাকাডেমি অব ফাইন আর্টসের কাছে, কলকাতা ৭০০০১৬',
  copyright: '© ২০২৬ লোকনাথ আর্ট সেন্টার। কলকাতায় ভালোবাসায় তৈরি।',
  privacy: 'গোপনীয়তা',
  terms: 'শর্তাবলী',
  backToTop: 'উপরে ফিরে যান',
};
