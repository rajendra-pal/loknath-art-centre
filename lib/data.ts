// =====================================================
// Centralized content data for LOKNATH ART CENTRE.
//
// Every translatable field is now a `Localized<T>` — that is,
// { en: T; bn: T }. Components pull the right side through
// the `useLanguage().t(value)` helper from `@/lib/i18n/context`.
//
// Per current product decision (English placeholder pass):
//   • If only Bengali copy exists, `en` and `bn` carry the same
//     string. Swapping in real English later means touching only
//     the `en:` key on each entry. No call site changes.
//   • If the value never had English copy (e.g. level unions,
//     gallery categories), it is a `Localized<T>` of identical
//     strings so downstream code is type-consistent.
//
// `language` field on User + `accounts.language` column carry
// the user's preference; the LanguageProvider mirrors it to
// `localStorage['lac.lang']` so it survives sign-out.
// =====================================================

import type { Localized } from '@/lib/i18n/pick';

// Re-export so consumers don't need to import from pick directly.
export type { Localized } from '@/lib/i18n/pick';

// Helpers for building placeholders — `bn` is duplicated as `en`.
const bn = <T>(value: T): Localized<T> => ({ en: value, bn: value });

export type Course = {
  id: string;
  title: string;          // Legacy English reference — kept for admin forms.
  titleBn: string;        // Admin DB column mirror (Bengali short title).
  titleEn: string;        // Admin DB column mirror (English short title).
  /** Display title in the user's chosen language. */
  displayTitle: Localized<string>;
  duration: Localized<string>;
  ageGroup: Localized<string>;
  /** Bengali-only union — same values for both languages (used as CSS key too). */
  level: Localized<'শুরু' | 'মধ্যম' | 'উচ্চ' | 'সকল স্তর'>;
  description: Localized<string>;
  image: string;
  color: string;
  category: Localized<string>;
};

export type Product = {
  id: string;
  name: Localized<string>;
  category: Localized<string>;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  badge?: Localized<'সর্বাধিক বিক্রিত' | 'নতুন আগমন' | 'সীমিত অফার'>;
};

export type GalleryItem = {
  id: string;
  title: Localized<string>;
  category: Localized<string>;
  image: string;
  student: Localized<string>;
  age?: number;
};

export type Testimonial = {
  id: string;
  name: Localized<string>;
  /** Bengali-only union. Same string for both languages (legacy role label). */
  role: Localized<'অভিভাবক' | 'ছাত্র' | 'ছাত্রী'>;
  message: Localized<string>;
  avatar: string;
  rating: number;
};

export type EventItem = {
  id: string;
  title: Localized<string>;
  date: string;
  type: Localized<'প্রতিযোগিতা' | 'কর্মশালা' | 'প্রদর্শনী' | 'ক্যাম্প'>;
  description: Localized<string>;
  image: string;
};

export type BlogPost = {
  id: string;
  title: Localized<string>;
  category: Localized<string>;
  excerpt: Localized<string>;
  image: string;
  date: string;
  readTime: Localized<string>;
};

export type FAQItem = {
  id: string;
  question: Localized<string>;
  answer: Localized<string>;
};

export type Stat = {
  value: number;
  suffix: string;
  label: Localized<string>;
  color: string;
};

export type Feature = {
  icon: string;
  title: Localized<string>;
  description: Localized<string>;
  color: string;
};

// =====================================================
// HERO
// =====================================================
export const heroContent = {
  eyebrow: bn('কল্পনা যেখানে শিল্প হয়ে ওঠে'),
  brandLead: bn('লোকনাথ আর্ট সেন্টারে'),
  description: bn('প্রতিটি শিশু আবিষ্কার করে নিজের ভেতরের শিল্পীকে। আঁকা, রং, ক্যানভাস আর স্বপ্নের এক অনন্য যাত্রা — ১৫ বছরের অভিজ্ঞতায় গড়া প্রিমিয়াম আর্ট শিক্ষা।'),
  primaryCta: bn('কোর্স দেখুন'),
  secondaryCta: bn('স্টোরে যান'),
  socialProof: bn('৫০০+ ছাত্র-ছাত্রী ও অভিভাবকের ভালোবাসা'),
};

// =====================================================
// STATS
// =====================================================
export const stats: Stat[] = [
  { value: 500, suffix: '+', label: bn('খুশি ছাত্র-ছাত্রী'), color: '#FF6B35' },
  { value: 15, suffix: '+', label: bn('বছরের অভিজ্ঞতা'), color: '#8B5CF6' },
  { value: 100, suffix: '+', label: bn('আর্ট প্রদর্শনী'), color: '#FF5C8A' },
  { value: 50, suffix: '+', label: bn('পুরস্কার অর্জন'), color: '#3B82F6' },
];

// =====================================================
// WHY CHOOSE US
// =====================================================
export const features: Feature[] = [
  {
    icon: 'Sparkles',
    title: bn('অভিজ্ঞ শিক্ষক'),
    description: bn('১৫ বছরেরও বেশি শিক্ষাদানের অভিজ্ঞতার সঙ্গে একজন মাস্টার আর্টিস্টের কাছ থেকে শিখুন।'),
    color: '#FF6B35',
  },
  {
    icon: 'Heart',
    title: bn('ব্যক্তিগত মনোযোগ'),
    description: bn('ছোট ব্যাচের আয়োজন — প্রতিটি শিশু পায় তার প্রাপ্য নির্দেশনা ও যত্ন।'),
    color: '#FF5C8A',
  },
  {
    icon: 'Palette',
    title: bn('সৃজনশীল পরিবেশ'),
    description: bn('একটি স্টুডিও পরিবেশ যা কল্পনাকে উদ্দীপিত করে এবং শিল্পের বিকাশ ঘটায়।'),
    color: '#8B5CF6',
  },
  {
    icon: 'Trophy',
    title: bn('আঁকা প্রতিযোগিতা'),
    description: bn('নিয়মিত প্রতিযোগিতার খোঁজ খবর দেওয়া হয়। প্রতিযোগিতার মাধ্যমে প্রতিভা প্রদর্শনের সুযোগ এবং আত্মবিশ্বাস গড়ে তোলা হয়।'),
    color: '#FBBF24',
  },
  {
    icon: 'Image',
    title: bn('আর্ট প্রদর্শনী'),
    description: bn('ছাত্রদের শিল্পকর্ম গ্যালারি ও সর্বজনীন প্রদর্শনীতে স্থান পায়।'),
    color: '#3B82F6',
  },
  {
    icon: 'Award',
    title: bn('সার্টিফিকেট কোর্স'),
    description: bn('কোর্স সফলভাবে সম্পন্ন করলে স্বীকৃত সার্টিফিকেট প্রদান করা হয়।'),
    color: '#10B981',
  },
  {
    icon: 'Wallet',
    title: bn('সাশ্রয়ী মূল্য'),
    description: bn('প্রিমিয়াম আর্ট শিক্ষা এমন একটি মূল্যে যা প্রতিটি পরিবারের সাধ্যের মধ্যে।'),
    color: '#FF8E72',
  },
  {
    icon: 'Users',
    title: bn('ছোট ব্যাচের আকার'),
    description: bn('প্রতি ব্যাচে সর্বোচ্চ ৮ - ১০ জন ছাত্র-ছাত্রী — মানসম্মত একের পর এক নির্দেশনা।'),
    color: '#A78BFA',
  },
];

// =====================================================
// COURSES
// =====================================================
type SeedCourse = Omit<Course, 'displayTitle' | 'duration' | 'ageGroup' | 'level' | 'description' | 'category'> & {
  duration: string;
  ageGroup: string;
  level: Course['level']['en'];
  description: string;
  category: string;
};

const wrapCourse = (c: SeedCourse): Course => ({
  ...c,
  displayTitle: bn(c.titleBn),
  duration: bn(c.duration),
  ageGroup: bn(c.ageGroup),
  level: bn(c.level),
  description: bn(c.description),
  category: bn(c.category),
});

export const courses: Course[] = [
  wrapCourse({
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
  }),
  wrapCourse({
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
  }),
  wrapCourse({
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
  }),
  wrapCourse({
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
  }),
  wrapCourse({
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
  }),
  wrapCourse({
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
  }),
  wrapCourse({
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
  }),
  wrapCourse({
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
  }),
  wrapCourse({
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
  }),
  wrapCourse({
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
  }),
  wrapCourse({
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
  }),
  wrapCourse({
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
  }),
  wrapCourse({
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
  }),
  wrapCourse({
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
  }),
  wrapCourse({
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
  }),
];

// =====================================================
// GALLERY
// =====================================================
export const galleryCategories: Localized<string>[] = [
  bn('সব দেখুন'),
  bn('ওয়াটারকালার'),
  bn('অয়েল পেইন্টিং'),
  bn('পেন্সিল স্কেচ'),
  bn('পোর্ট্রেট'),
  bn('ল্যান্ডস্কেপ'),
  bn('কোলাজ'),
  bn('হাতের কাজ'),
  bn('ক্যানভাস'),
  bn('স্টিল লাইফ'),
  bn('প্রকৃতি'),
  bn('শিশুদের শিল্প'),
  bn('উৎসবের শিল্প'),
];

export const galleryItems: GalleryItem[] = [
  {
    id: 'g1',
    title: bn('সূর্যাস্তের পাহাড়'),
    category: bn('ল্যান্ডস্কেপ'),
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&q=80',
    student: bn('অর্ণব দাস'),
    age: 14,
  },
  {
    id: 'g2',
    title: bn('মায়ের প্রতিকৃতি'),
    category: bn('পোর্ট্রেট'),
    image: 'https://images.unsplash.com/photo-1578926375605-eaf7559b1458?w=800&q=80',
    student: bn('শ্রাবন্তী রায়'),
    age: 16,
  },
  {
    id: 'g3',
    title: bn('গ্রামের পুকুর'),
    category: bn('ওয়াটারকালার'),
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80',
    student: bn('রোহিত সেন'),
    age: 13,
  },
  {
    id: 'g4',
    title: bn('বৃদ্ধ মানুষের স্কেচ'),
    category: bn('পেন্সিল স্কেচ'),
    image: 'https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?w=800&q=80',
    student: bn('প্রীতম ঘোষ'),
    age: 15,
  },
  {
    id: 'g5',
    title: bn('ফল ও ফুলদানি'),
    category: bn('স্টিল লাইফ'),
    image: 'https://images.unsplash.com/photo-1579783901586-d88db74b4da4?w=800&q=80',
    student: bn('মৌ বন্দ্যোপাধ্যায়'),
    age: 14,
  },
  {
    id: 'g6',
    title: bn('বাংলার বাঘ'),
    category: bn('অয়েল পেইন্টিং'),
    image: 'https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=800&q=80',
    student: bn('সুভাজিৎ কর'),
    age: 17,
  },
  {
    id: 'g7',
    title: bn('কাগজের ফুল'),
    category: bn('হাতের কাজ'),
    image: 'https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?w=800&q=80',
    student: bn('অনন্যা পাল'),
    age: 9,
  },
  {
    id: 'g8',
    title: bn('বনের পথ'),
    category: bn('ল্যান্ডস্কেপ'),
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&q=80',
    student: bn('দেবাঞ্জন দে'),
    age: 15,
  },
  {
    id: 'g9',
    title: bn('স্বপ্নময়ী মেয়ে'),
    category: bn('পোর্ট্রেট'),
    image: 'https://images.unsplash.com/photo-1578926375605-eaf7559b1458?w=800&q=80',
    student: bn('ইশিতা দত্ত'),
    age: 16,
  },
  {
    id: 'g10',
    title: bn('জাদুর গাছ'),
    category: bn('শিশুদের শিল্প'),
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80',
    student: bn('আর্য বেরা'),
    age: 7,
  },
  {
    id: 'g11',
    title: bn('দুর্গা পূজা'),
    category: bn('উৎসবের শিল্প'),
    image: 'https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=800&q=80',
    student: bn('সুমন মাইতি'),
    age: 18,
  },
  {
    id: 'g12',
    title: bn('প্রকৃতির সমন্বয়'),
    category: bn('কোলাজ'),
    image: 'https://images.unsplash.com/photo-1579783901586-d88db74b4da4?w=800&q=80',
    student: bn('তানিয়া সাহা'),
    age: 12,
  },
];

// =====================================================
// FEATURED ARTWORK
// =====================================================
export const featuredArtwork = [
  {
    id: 'f1',
    title: bn('বাংলার ঐতিহ্য'),
    medium: bn('ওয়াটারকালার'),
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=1200&q=80',
  },
  {
    id: 'f2',
    title: bn('বর্ষার মেজাজ'),
    medium: bn('অয়েল পেইন্টিং'),
    image: 'https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=1200&q=80',
  },
  {
    id: 'f3',
    title: bn('পুরনো কলকাতা'),
    medium: bn('পেন্সিল স্কেচ'),
    image: 'https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?w=1200&q=80',
  },
  {
    id: 'f4',
    title: bn('জেলে'),
    medium: bn('পোর্ট্রেট'),
    image: 'https://images.unsplash.com/photo-1578926375605-eaf7559b1458?w=1200&q=80',
  },
  {
    id: 'f5',
    title: bn('সুন্দরবন'),
    medium: bn('ল্যান্ডস্কেপ'),
    image: 'https://images.unsplash.com/photo-1579783901586-d88db74b4da4?w=1200&q=80',
  },
];

// =====================================================
// STORE
// =====================================================
export const storeCategories: Localized<string>[] = [
  bn('আঁকার বই'), bn('স্কেচ বুক'), bn('আর্ট পেপার'), bn('ক্যানভাস বোর্ড'),
  bn('পেন্সিল'), bn('চারকোল'), bn('কালার পেন্সিল'), bn('অয়েল পাস্তেল'),
  bn('সফট পাস্তেল'), bn('ওয়াটারকালার'), bn('পোস্টার কালার'), bn('অ্যাক্রিলিক কালার'),
  bn('অয়েল কালার'), bn('ব্রাশ'), bn('প্যালেট'), bn('ইরেজার'),
  bn('শার্পনার'), bn('স্কেল'), bn('ড্রয়িং ক্লিপস'), bn('মাস্কিং টেপ'),
  bn('প্যালেট নাইফ'), bn('ক্যানভাস'), bn('মার্কার'), bn('ফাইনলাইনার'),
  bn('ক্যালিগ্রাফি পেন'), bn('জ্যামিতির সরঞ্জাম'), bn('কিডস আর্ট কিট'),
  bn('প্রফেশনাল আর্টিস্ট কিট'),
];

export const products: Product[] = [
  {
    id: 'p1',
    name: bn('প্রিমিয়াম ওয়াটারকালার সেট (২৪ রঙ)'),
    category: bn('ওয়াটারকালার'),
    price: 899,
    originalPrice: 1299,
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&q=80',
    rating: 4.8,
    reviews: 142,
    badge: bn('সর্বাধিক বিক্রিত'),
  },
  {
    id: 'p2',
    name: bn('প্রফেশনাল ব্রাশ সেট (১২টি)'),
    category: bn('ব্রাশ'),
    price: 649,
    originalPrice: 999,
    image: 'https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?w=600&q=80',
    rating: 4.9,
    reviews: 98,
    badge: bn('নতুন আগমন'),
  },
  {
    id: 'p3',
    name: bn('ক্যানভাস বোর্ড প্যাক (৫টি)'),
    category: bn('ক্যানভাস বোর্ড'),
    price: 549,
    image: 'https://images.unsplash.com/photo-1579783901586-d88db74b4da4?w=600&q=80',
    rating: 4.7,
    reviews: 67,
  },
  {
    id: 'p4',
    name: bn('আর্টিস্ট অয়েল কালার (১২টি টিউব)'),
    category: bn('অয়েল কালার'),
    price: 1499,
    originalPrice: 1999,
    image: 'https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=600&q=80',
    rating: 4.9,
    reviews: 56,
    badge: bn('সীমিত অফার'),
  },
  {
    id: 'p5',
    name: bn('প্রফেশনাল স্কেচ বুক এ৪'),
    category: bn('স্কেচ বুক'),
    price: 299,
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&q=80',
    rating: 4.6,
    reviews: 211,
  },
  {
    id: 'p6',
    name: bn('অ্যাক্রিলিক কালার সেট (১৮ শেড)'),
    category: bn('অ্যাক্রিলিক কালার'),
    price: 1199,
    originalPrice: 1599,
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&q=80',
    rating: 4.8,
    reviews: 89,
    badge: bn('সর্বাধিক বিক্রিত'),
  },
  {
    id: 'p7',
    name: bn('সফট পাস্তেল (৩৬ রঙ)'),
    category: bn('সফট পাস্তেল'),
    price: 449,
    image: 'https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?w=600&q=80',
    rating: 4.7,
    reviews: 73,
  },
  {
    id: 'p8',
    name: bn('কিডস আর্ট কিট (৫০+ আইটেম)'),
    category: bn('কিডস আর্ট কিট'),
    price: 799,
    originalPrice: 1199,
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&q=80',
    rating: 4.9,
    reviews: 178,
    badge: bn('নতুন আগমন'),
  },
];

export const shopFeatures = [
  { icon: 'Truck', title: bn('দ্রুত ডেলিভারি'), desc: bn('সারা ভারতে ৩-৫ দিনে শিপিং'), color: '#FF6B35' },
  { icon: 'CreditCard', title: bn('ক্যাশ অন ডেলিভারি'), desc: bn('পণ্য পেয়ে পেমেন্ট করুন'), color: '#8B5CF6' },
  { icon: 'Smartphone', title: bn('ইউপিআই পেমেন্ট'), desc: bn('জিপে, ফোনপে, পেটিএম'), color: '#10B981' },
  { icon: 'Shield', title: bn('মানসম্মত পণ্য'), desc: bn('শুধু ব্র্যান্ডেড উপকরণ'), color: '#3B82F6' },
  { icon: 'Tag', title: bn('সাশ্রয়ী মূল্য'), desc: bn('সেরা দামের নিশ্চয়তা'), color: '#FF5C8A' },
  { icon: 'RefreshCw', title: bn('সহজ রিটার্ন'), desc: bn('৭ দিনের রিটার্ন নীতি'), color: '#FBBF24' },
];

// =====================================================
// EVENTS
// =====================================================
export const events: EventItem[] = [
  {
    id: 'e1',
    title: bn('বার্ষিক আঁকা প্রতিযোগিতা ২০২৬'),
    date: '১৫ আগস্ট ২০২৬',
    type: bn('প্রতিযোগিতা'),
    description: bn('আপনার দক্ষতা দেখান এবং আকর্ষণীয় পুরস্কার জিতুন।'),
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80',
  },
  {
    id: 'e2',
    title: bn('ওয়াটারকালার কর্মশালা'),
    date: '২২ আগস্ট ২০২৬',
    type: bn('কর্মশালা'),
    description: bn('মাস্টার শিল্পীদের সঙ্গে তিন দিনের গভীর কর্মশালা।'),
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&q=80',
  },
  {
    id: 'e3',
    title: bn('ছাত্র আর্ট প্রদর্শনী'),
    date: '১০ সেপ্টেম্বর ২০২৬',
    type: bn('প্রদর্শনী'),
    description: bn('নির্বাচিত শিল্পকর্ম শহরের আর্ট গ্যালারিতে প্রদর্শিত হবে।'),
    image: 'https://images.unsplash.com/photo-1578926375605-eaf7559b1458?w=800&q=80',
  },
  {
    id: 'e4',
    title: bn('গ্রীষ্মকালীন আর্ট ক্যাম্প'),
    date: 'মে ২০২৬',
    type: bn('ক্যাম্প'),
    description: bn('ছোট শিল্পীদের জন্য ৩০ দিনের সৃজনশীল যাত্রা।'),
    image: 'https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?w=800&q=80',
  },
  {
    id: 'e5',
    title: bn('শীতকালীন ক্যাম্প — উৎসবের শিল্প'),
    date: 'ডিসেম্বর ২০২৬',
    type: bn('ক্যাম্প'),
    description: bn('ছুটির দিনগুলোতে জাদুকরী শিল্পকর্ম তৈরি করুন।'),
    image: 'https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=800&q=80',
  },
  {
    id: 'e6',
    title: bn('উৎসবের আঁকা প্রতিযোগিতা'),
    date: 'অক্টোবর ২০২৬',
    type: bn('প্রতিযোগিতা'),
    description: bn('দুর্গা পূজার থিমে ঐতিহ্যবাহী শিল্পকর্ম তৈরি করুন।'),
    image: 'https://images.unsplash.com/photo-1579783901586-d88db74b4da4?w=800&q=80',
  },
];

// =====================================================
// TESTIMONIALS
// =====================================================
export const testimonials: Testimonial[] = [
  {
    id: 't1',
    name: bn('রিনা দাস'),
    role: bn('অভিভাবক'),
    message: bn('আমার মেয়ে একজন আত্মবিশ্বাসী শিল্পী হিসেবে নিজেকে আবিষ্কার করেছে। ব্যক্তিগত মনোযোগ আর সৃজনশীল পরিবেশ — সত্যিই অতুলনীয়। শহরের সেরা আর্ট স্কুল!'),
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
    rating: 5,
  },
  {
    id: 't2',
    name: bn('সৌরভ মিত্র'),
    role: bn('ছাত্র'),
    message: bn('নিজে নিজে বছরের পর বছর চেষ্টা করেও যা শিখতে পারিনি, এখানে ৬ মাসে তার চেয়ে বেশি শিখেছি। শিক্ষক অসম্ভব ধৈর্যশীল এবং দক্ষ।'),
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=200&q=80',
    rating: 5,
  },
  {
    id: 't3',
    name: bn('অনিতা রায়'),
    role: bn('অভিভাবক'),
    message: bn('আমার ছেলের কাজ যেদিন প্রদর্শনীতে ঝুলল, চোখে জল এসে গিয়েছিল। তার প্রতিভাকে লালন করার জন্য ধন্যবাদ।'),
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80',
    rating: 5,
  },
  {
    id: 't4',
    name: bn('মৌমিতা সেন'),
    role: bn('ছাত্রী'),
    message: bn('একজন লাজুক মেয়ে থেকে আত্মবিশ্বাসী চিত্রশিল্পী — এই স্কুল আমাকে বদলে দিয়েছে। আর্ট স্টোরেও আমার যা কিছু দরকার সব পাই!'),
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
    title: bn('প্রতিটি শিক্ষানবিসের জানা উচিত ১০টি ওয়াটারকালার কৌশল'),
    category: bn('ওয়াটারকালার গাইড'),
    excerpt: bn('ওয়েট-অন-ওয়েট, ড্রাই ব্রাশ আর রঙের ব্লেন্ডিং — এই পেশাদার টিপসগুলোর সাহায্যে মূল বিষয়গুলো আয়ত্ত করুন।'),
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80',
    date: '১২ জুলাই ২০২৬',
    readTime: bn('৫ মিনিট'),
  },
  {
    id: 'b2',
    title: bn('ফাইন আর্টসে ক্যারিয়ার গড়বেন কীভাবে'),
    category: bn('আর্ট ক্যারিয়ার'),
    excerpt: bn('যুব শিল্পীদের জন্য একটি বাস্তবসম্মত গাইড — যারা শখকে পেশায় রূপ দিতে চায় তাদের জন্য।'),
    image: 'https://images.unsplash.com/photo-1578926375605-eaf7559b1458?w=800&q=80',
    date: '০৫ জুলাই ২০২৬',
    readTime: bn('৮ মিনিট'),
  },
  {
    id: 'b3',
    title: bn('আপনার হাতের লাইন উন্নত করার ৭টি স্কেচিং কৌশল'),
    category: bn('স্কেচিং কৌশল'),
    excerpt: bn('এই সহজ দৈনিক অনুশীলনগুলো আপনার রেখার মানকে নাটকীয়ভাবে উন্নত করবে।'),
    image: 'https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?w=800&q=80',
    date: '২৮ জুন ২০২৬',
    readTime: bn('৪ মিনিট'),
  },
  {
    id: 'b4',
    title: bn('শিক্ষানবিসদের জন্য অয়েল পেইন্টিং টিপস'),
    category: bn('অয়েল পেইন্টিং টিপস'),
    excerpt: bn('সাধারণ ভুলগুলো এড়িয়ে ঠিক পদ্ধতিতে অয়েল পেইন্টিং শুরু করুন।'),
    image: 'https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=800&q=80',
    date: '২০ জুন ২০২৬',
    readTime: bn('৬ মিনিট'),
  },
  {
    id: 'b5',
    title: bn('আঁকার টিপস'),
    category: bn('আঁকার টিপস'),
    excerpt: bn('প্রতিটি তরুণ শিল্পীর প্রথমে আয়ত্ত করা উচিত এমন মূলনীতিগুলো।'),
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&q=80',
    date: '১৫ জুন ২০২৬',
    readTime: bn('৫ মিনিট'),
  },
  {
    id: 'b6',
    title: bn('শিশুদের সৃজনশীলতা খুলে দিন শিল্পের মাধ্যমে'),
    category: bn('শিশুদের সৃজনশীলতা'),
    excerpt: bn('সৃজনশীল কার্যক্রম কীভাবে তরুণ মনকে গড়ে তোলে এবং আত্মবিশ্বাস বাড়ায়।'),
    image: 'https://images.unsplash.com/photo-1579783901586-d88db74b4da4?w=800&q=80',
    date: '০৮ জুন ২০২৬',
    readTime: bn('৪ মিনিট'),
  },
];

// =====================================================
// FAQ
// =====================================================
export const faqs: FAQItem[] = [
  {
    id: 'f1',
    question: bn('আঁকা শেখার সঠিক বয়স কোনটি?'),
    answer: bn('মাত্র ৪ বছর বয়সী শিশুরাও আমাদের কিডস আর্ট প্রোগ্রামের মাধ্যমে শুরু করতে পারে। ৪ থেকে ৮০ বছর পর্যন্ত প্রত্যেক বয়সের জন্য আমাদের কোর্স রয়েছে।'),
  },
  {
    id: 'f2',
    question: bn('আপনারা কি আর্ট সরঞ্জাম সরবরাহ করেন?'),
    answer: bn('নিয়মিত ক্লাসে মৌলিক সরঞ্জাম অন্তর্ভুক্ত থাকে। এছাড়া আমাদের নিজস্ব আর্ট স্টোরে ছাত্র-ছাত্রীদের জন্য বিশেষ ছাড়ে প্রিমিয়াম সরঞ্জাম কেনার সুযোগ রয়েছে।'),
  },
  {
    id: 'f3',
    question: bn('প্রতি ব্যাচে কতজন ছাত্র-ছাত্রী থাকেন?'),
    answer: bn('প্রতিটি ছাত্র-ছাত্রী শিক্ষকের ব্যক্তিগত মনোযোগ পান — তাই ব্যাচে সর্বোচ্চ ৮ জন রাখা হয়।'),
  },
  {
    id: 'f4',
    question: bn('পরীক্ষা বা সার্টিফিকেট কি আছে?'),
    answer: bn('হ্যাঁ। প্রতিটি কোর্স সফলভাবে সম্পন্ন করলে ছাত্র-ছাত্রীরা লোকনাথ আর্ট স্কুলের স্বীকৃত সার্টিফিকেট লাভ করে।'),
  },
  {
    id: 'f5',
    question: bn('আপনারা কি অনলাইন ক্লাস দেন?'),
    answer: bn('বর্তমানে আমরা আমাদের স্টুডিওতে সরাসরি ক্লাস নিই। মৌসুম অনুযায়ী অনলাইন কর্মশালার আয়োজন করা হয় — আমাদের ইভেন্ট সেকশনে চোখ রাখুন।'),
  },
  {
    id: 'f6',
    question: bn('ফি কাঠামো কেমন?'),
    answer: bn('কোর্স অনুযায়ী ফি ভিন্ন হয়। বিস্তারিত ফি তথ্যের জন্য আমাদের কোর্স সেকশন দেখুন বা যোগাযোগ করুন। আমরা প্রতিটি পরিবারের সাধ্যের মধ্যে রাখার চেষ্টা করি।'),
  },
];

// =====================================================
// NAV LINKS — kept bilingual for parity with the rest
// of the site. navLinks stay in English per spec, but we
// expose a Localized wrapper so the helper can target them.
// =====================================================
export const navLinks: { label: Localized<string>; href: string }[] = [
  { label: bn('Home'), href: '#home' },
  { label: bn('About'), href: '#about' },
  { label: bn('Courses'), href: '#courses' },
  { label: bn('Gallery'), href: '#gallery' },
  { label: bn("Students' Works"), href: '#students' },
  { label: bn('Art Store'), href: '/store' },
  { label: bn('Events'), href: '#events' },
  { label: bn('Blog'), href: '#blog' },
  { label: bn('Contact'), href: '#contact' },
];

// =====================================================
// ABOUT
// =====================================================
export const aboutContent = {
  badge: bn('শিল্পীর সাথে পরিচয়'),
  titleBefore: bn('একজন শিক্ষক যিনি আঁকেন'),
  titleHighlight: bn('ভবিষ্যৎ'),
  titleAfter: bn(', শুধু ছবি নয়।'),
  description: bn('15 বছরেরও বেশি সময় ধরে আমাদের প্রতিষ্ঠাতা শত শত শিশু ও প্রাপ্তবয়স্কদের শিল্পের আনন্দ আবিষ্কারে সাহায্য করে চলেছেন। কলকাতার গভর্নমেন্ট কলেজ অব আর্ট অ্যান্ড ক্রাফটে প্রশিক্ষিত এই শিল্পক অন্যদের চিরায়ত কৌশলকে আধুনিক সৃজনশীলতার সঙ্গে মিশিয়ে শেখান।'),
  imageAlt: bn('রাখাল মুখোপাধ্যায় - শিল্পী'),
  imageCaption: bn('শিল্পী - রাখাল মুখোপাধ্যায়'),
  quote: bn('"প্রতিটি শিশুই একজন শিল্পী। সমস্যা হল, বড় হওয়ার পরও কীভাবে শিল্পী থাকা যায়।"'),
  quoteAuthor: bn('— পাবলো পিকাসো'),
  missionTitle: bn('আমাদের লক্ষ্য'),
  missionDesc: bn('প্রতিটি শিশুর জন্য শিল্প শিক্ষাকে সুলভ, আনন্দদায়ক ও জীবন বদলে দেওয়ার মতো করে তোলা।'),
  visionTitle: bn('আমাদের স্বপ্ন'),
  visionDesc: bn('এমন একটি বাংলা যেখানে প্রতিটি ঘরে একজন শিশু আছে যে আত্মবিশ্বাসের সঙ্গে আঁকে।'),
  experienceBadge: bn('বছরের অভিজ্ঞতা'),
  studentsBadge: bn('প্রশিক্ষিত ছাত্র-ছাত্রী'),
};

// =====================================================
// CTA BANNER
// =====================================================
export const ctaContent = {
  badge: bn('সীমিত আসন · নতুন ব্যাচ'),
  title1: bn('আপনার গল্প'),
  title2: bn('আঁকার জন্য প্রস্তুত?'),
  description: bn('এই মাসে ভর্তি হলে বিনামূল্যে স্টার্টার আর্ট কিট পান। প্রতি ব্যাচে মাত্র ৮টি আসন।'),
  primary: bn('এখনই ভর্তি হোন'),
  secondary: bn('ফোন করুন +৯১ ৯৮৭৬৫ ৪৩২১০'),
};

// =====================================================
// CONTACT INFO
// =====================================================
export const contactInfo = {
  badge: bn('যোগাযোগ করুন'),
  titleBefore: bn('একটি'),
  titleHighlight: bn('সৃজনশীল'),
  titleAfter: bn('যাত্রা শুরু করুন'),
  description: bn('আমাদের স্টুডিওতে আসুন, ফোন করুন অথবা মেসেজ পাঠান — আপনার কথা শুনতে চাই।'),
  form: {
    name: bn('পুরো নাম'),
    phone: bn('ফোন নম্বর'),
    email: bn('ইমেইল'),
    course: bn('কোর্স নির্বাচন করুন'),
    message: bn('আপনার বার্তা'),
    placeholders: {
      name: bn('আপনার নাম'),
      phone: bn('+৯১ ...'),
      email: bn('you@example.com'),
      message: bn('আপনার লক্ষ্য সম্পর্কে একটু লিখুন...'),
    },
    submit: bn('বার্তা পাঠান'),
  },
  details: [
    { icon: 'MapPin', title: bn('স্টুডিওতে আসুন'), lines: [bn('ময়নাগুড়ি'), bn('সুলতানপুর - 713146, পশ্চিমবঙ্গ')], color: '#FF6B35' },
    { icon: 'Phone', title: bn('ফোন করুন'), lines: [bn('+91 62963 77408'), bn('+91 62963 77408')], color: '#8B5CF6' },
    { icon: 'Mail', title: bn('ইমেইল'), lines: [bn('hello@loknathart.in'), bn('admissions@loknathart.in')], color: '#FF5C8A' },
    { icon: 'MessageCircle', title: bn('হোয়াটসঅ্যাপ'), lines: [bn('+91 62963 77408'), bn('24 x 7')], color: '#10B981' },
  ],
};

// =====================================================
// FOOTER
// =====================================================
export const footerContent = {
  brand: 'Loknath',         // proper noun — kept untranslated
  brandSub: bn('Art School'),
  description: bn('২০১০ সাল থেকে বাংলায় সৃজনশীলতার লালন। যেখানে কল্পনা শিল্প হয়ে ওঠে এবং প্রতিটি রেখা একটি গল্প বলে।'),
  newsletter: {
    placeholder: bn('আপনার ইমেইল'),
    button: bn('সাবস্ক্রাইব'),
    note: bn('আর্ট টিপস, ইভেন্ট আপডেট ও বিশেষ অফার পান। স্প্যাম নয়।'),
    success: bn('স্টুডিওতে স্বাগতম!'),
    successDesc: bn('আমরা আপনাকে আর্ট টিপস ও ইভেন্ট আপডেট পাঠাব।'),
  },
  explore: bn('ঘুরে দেখুন'),
  store: bn('স্টোর'),
  reach: bn('যোগাযোগ'),
  address: bn('৪২ পার্ক স্ট্রিট, অ্যাকাডেমি অব ফাইন আর্টসের কাছে, কলকাতা ৭০০০১৬'),
  copyright: bn('© ২০২৬ লোকনাথ আর্ট সেন্টার। কল্কাতায় ভালোবাসায় তৈরি।'),
  privacy: bn('গোপনীয়তা'),
  terms: bn('শর্তাবলী'),
  backToTop: bn('উপরে ফিরে যান'),
  customerLogin: bn('Customer Login'),
  adminLogin: bn('Admin Login'),
};
