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

// English-only content — paired with Bengali via `loc(en, bn)`. Every value the
// user can see in English mode goes through this helper. NEVER mirror Bengali
// into the `en` slot: when language is 'en' the user must see English text.
const en = <T>(value: T): Localized<T> => ({ en: value, bn: value });

/** Build a localized value with explicit en + bn strings. */
const loc = <T>(en: T, bnValue: T): Localized<T> => ({ en, bn: bnValue });

export type Course = {
  id: string;
  title: string;          // Legacy English reference — kept for admin forms.
  titleBn: string;        // Admin DB column mirror (Bengali short title).
  titleEn: string;        // Admin DB column mirror (English short title).
  /** Display title in the user's chosen language. */
  displayTitle: Localized<string>;
  duration: Localized<string>;
  ageGroup: Localized<string>;
  /** Course-level union with localized values. */
  level: Localized<string>;
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
  badge?: Localized<string>;
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
  role: Localized<string>;
  message: Localized<string>;
  avatar: string;
  rating: number;
};

export type EventItem = {
  id: string;
  title: Localized<string>;
  date: string;
  type: Localized<string>;
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
  eyebrow: loc('Where imagination becomes art', 'কল্পনা যেখানে শিল্প হয়ে ওঠে'),
  brandLead: loc('At Loknath Art Centre,', 'লোকনাথ আর্ট সেন্টারে'),
  description: loc('Every child discovers the artist within. Drawing, colour, canvas and dreams — premium art education built on 15 years of experience.', 'প্রতিটি শিশু আবিষ্কার করে নিজের ভেতরের শিল্পীকে। আঁকা, রং, ক্যানভাস আর স্বপ্নের এক অনন্য যাত্রা — ১৫ বছরের অভিজ্ঞতায় গড়া প্রিমিয়াম আর্ট শিক্ষা।'),
  primaryCta: loc('See courses', 'কোর্স দেখুন'),
  secondaryCta: loc('Visit the store', 'স্টোরে যান'),
  socialProof: loc('Loved by 500+ students and parents', '৫০০+ ছাত্র-ছাত্রী ও অভিভাবকের ভালোবাসা'),
};

// =====================================================
// STATS
// =====================================================
export const stats: Stat[] = [
  { value: 500, suffix: '+', label: loc('Happy students', 'খুশি ছাত্র-ছাত্রী'), color: '#FF6B35' },
  { value: 15, suffix: '+', label: loc('Years of experience', 'বছরের অভিজ্ঞতা'), color: '#8B5CF6' },
  { value: 100, suffix: '+', label: loc('Art exhibitions', 'আর্ট প্রদর্শনী'), color: '#FF5C8A' },
  { value: 50, suffix: '+', label: loc('Awards won', 'পুরস্কার অর্জন'), color: '#3B82F6' },
];

// =====================================================
// WHY CHOOSE US
// =====================================================
export const features: Feature[] = [
  {
    icon: 'Sparkles',
    title: loc('Experienced teacher', 'অভিজ্ঞ শিক্ষক'),
    description: loc('Learn from a master artist with over 15 years of teaching experience.', '১৫ বছরেরও বেশি শিক্ষাদানের অভিজ্ঞতার সঙ্গে একজন মাস্টার আর্টিস্টের কাছ থেকে শিখুন।'),
    color: '#FF6B35',
  },
  {
    icon: 'Heart',
    title: loc('Personal attention', 'ব্যক্তিগত মনোযোগ'),
    description: loc('Small batches — every child gets the guidance and care they deserve.', 'ছোট ব্যাচের আয়োজন — প্রতিটি শিশু পায় তার প্রাপ্য নির্দেশনা ও যত্ন।'),
    color: '#FF5C8A',
  },
  {
    icon: 'Palette',
    title: loc('Creative environment', 'সৃজনশীল পরিবেশ'),
    description: loc('A studio setting that inspires imagination and nurtures artistic growth.', 'একটি স্টুডিও পরিবেশ যা কল্পনাকে উদ্দীপিত করে এবং শিল্পের বিকাশ ঘটায়।'),
    color: '#8B5CF6',
  },
  {
    icon: 'Trophy',
    title: loc('Drawing competitions', 'আঁকা প্রতিযোগিতা'),
    description: loc('Regular competitions give students a stage to show their talent and build confidence.', 'নিয়মিত প্রতিযোগিতার খোঁজ খবর দেওয়া হয়। প্রতিযোগিতার মাধ্যমে প্রতিভা প্রদর্শনের সুযোগ এবং আত্মবিশ্বাস গড়ে তোলা হয়।'),
    color: '#FBBF24',
  },
  {
    icon: 'Image',
    title: loc('Art exhibitions', 'আর্ট প্রদর্শনী'),
    description: loc('Student artworks are featured in galleries and public exhibitions.', 'ছাত্রদের শিল্পকর্ম গ্যালারি ও সর্বজনীন প্রদর্শনীতে স্থান পায়।'),
    color: '#3B82F6',
  },
  {
    icon: 'Award',
    title: loc('Certificate courses', 'সার্টিফিকেট কোর্স'),
    description: loc('Earn a recognised certificate on successful course completion.', 'কোর্স সফলভাবে সম্পন্ন করলে স্বীকৃত সার্টিফিকেট প্রদান করা হয়।'),
    color: '#10B981',
  },
  {
    icon: 'Wallet',
    title: loc('Affordable pricing', 'সাশ্রয়ী মূল্য'),
    description: loc('Premium art education at a price that fits every family.', 'প্রিমিয়াম আর্ট শিক্ষা এমন একটি মূল্যে যা প্রতিটি পরিবারের সাধ্যের মধ্যে।'),
    color: '#FF8E72',
  },
  {
    icon: 'Users',
    title: loc('Small batch size', 'ছোট ব্যাচের আকার'),
    description: loc('Maximum 8-10 students per batch — consistent, one-on-one guidance.', 'প্রতি ব্যাচে সর্বোচ্চ ৮ - ১০ জন ছাত্র-ছাত্রী — মানসম্মত একের পর এক নির্দেশনা।'),
    color: '#A78BFA',
  },
];

// =====================================================
// COURSES
// =====================================================
type SeedCourse = Omit<Course, 'displayTitle' | 'duration' | 'ageGroup' | 'level' | 'description' | 'category'> & {
  duration: string;
  ageGroup: string;
  level: string;
  description: string;
  category: string;
};

const durationBnMap: Record<string, string> = {
  '2 months': '২ মাস',
  '3 months': '৩ মাস',
  '4 months': '৪ মাস',
  '6 months': '৬ মাস',
  '12 months': '১২ মাস',
};

const levelBnMap: Record<string, string> = {
  'Beginner': 'শুরু',
  'Intermediate': 'মধ্যম',
  'Advanced': 'উচ্চ',
  'All Levels': 'সকল স্তর',
};

const wrapCourse = (c: SeedCourse): Course => ({
  ...c,
  displayTitle: loc(c.titleEn, c.titleBn),
  duration: loc(c.duration, durationBnMap[c.duration] || c.duration),
  ageGroup: en(c.ageGroup),
  level: loc(c.level, levelBnMap[c.level] || c.level),
  description: en(c.description),
  category: en(c.category),
});

export const courses: Course[] = [
  wrapCourse({
    id: 'c1',
    title: 'Basic Drawing',
    titleBn: 'বেসিক ড্রয়িং',
    titleEn: 'Basic Drawing',
    duration: '3 months',
    ageGroup: '6-10 years',
    level: 'Beginner',
    description: 'The foundation of art — your first lessons in line, shape, and observation.',
    image: '/images/drawing/Basic drawing.jpg',
    color: '#FF6B35',
    category: 'Drawing',
  }),
  wrapCourse({
    id: 'c2',
    title: 'Pencil Sketch',
    titleBn: 'পেন্সিল স্কেচ',
    titleEn: 'Pencil Sketch',
    duration: '4 months',
    ageGroup: '10+ years',
    level: 'Beginner',
    description: 'Master shading, texture, and graphite techniques.',
    image: '/images/drawing/pencil sketch.jpg',
    color: '#8B5CF6',
    category: 'Sketching',
  }),
  wrapCourse({
    id: 'c3',
    title: 'Still Life',
    titleBn: 'স্টিল লাইফ',
    titleEn: 'Still Life',
    duration: '3 months',
    ageGroup: '12+ years',
    level: 'Intermediate',
    description: 'Render objects with light, shadow, and careful composition.',
    image: '/images/drawing/still life.jpg',
    color: '#FF5C8A',
    category: 'Drawing',
  }),
  wrapCourse({
    id: 'c4',
    title: 'Portrait Drawing',
    titleBn: 'পোর্ট্রেট ড্রয়িং',
    titleEn: 'Portrait Drawing',
    duration: '6 months',
    ageGroup: '14+ years',
    level: 'Advanced',
    description: 'The art of capturing the likeness and feeling of a human face.',
    image: '/images/drawing/potrait drawing.jpg',
    color: '#3B82F6',
    category: 'Portrait',
  }),
  wrapCourse({
    id: 'c5',
    title: 'Watercolor Painting',
    titleBn: 'ওয়াটারকালার পেইন্টিং',
    titleEn: 'Watercolor Painting',
    duration: '4 months',
    ageGroup: '10+ years',
    level: 'Intermediate',
    description: 'Play with watercolour washes, blending, and colour experiments.',
    image: '/images/drawing/market watercolor.jpg',
    color: '#60A5FA',
    category: 'Painting',
  }),
  wrapCourse({
    id: 'c6',
    title: 'Oil Painting',
    titleBn: 'অয়েল পেইন্টিং',
    titleEn: 'Oil Painting',
    duration: '6 months',
    ageGroup: '14+ years',
    level: 'Advanced',
    description: 'Rich, deep colour and classic oil-painting techniques.',
    image: '/images/drawing/oil painting.jpg',
    color: '#FBBF24',
    category: 'Painting',
  }),
  wrapCourse({
    id: 'c7',
    title: 'Poster Color',
    titleBn: 'পোস্টার কালার',
    titleEn: 'Poster Color',
    duration: '2 months',
    ageGroup: '6-12 years',
    level: 'Beginner',
    description: 'Bright, bold poster paintings perfect for school projects.',
    image: '/images/drawing/poster color painting.jpg',
    color: '#FF8E72',
    category: 'Colour',
  }),
  wrapCourse({
    id: 'c8',
    title: 'Acrylic Painting',
    titleBn: 'অ্যাক্রিলিক পেইন্টিং',
    titleEn: 'Acrylic Painting',
    duration: '4 months',
    ageGroup: '15+ years',
    level: 'Intermediate',
    description: 'Vibrant, modern artwork with fast-drying acrylics.',
    image: '/images/drawing/acrylic painting.jpg',
    color: '#10B981',
    category: 'Painting',
  }),
  wrapCourse({
    id: 'c9',
    title: 'Pastel Art',
    titleBn: 'পাস্তেল আর্ট',
    titleEn: 'Pastel Art',
    duration: '3 months',
    ageGroup: '10+ years',
    level: 'All Levels',
    description: 'Expressive artwork with soft and oil pastels.',
    image: '/images/drawing/pastel art.jpg',
    color: '#A78BFA',
    category: 'Colour',
  }),
  wrapCourse({
    id: 'c13',
    title: 'Canvas Painting',
    titleBn: 'ক্যানভাস পেইন্টিং',
    titleEn: 'Canvas Painting',
    duration: '4 months',
    ageGroup: '12+ years',
    level: 'Intermediate',
    description: 'The professional artist experience — paint on stretched canvas.',
    image: '/images/drawing/canvas painting.png',
    color: '#FF6B35',
    category: 'Painting',
  }),
  wrapCourse({
    id: 'c14',
    title: 'Landscape',
    titleBn: 'ল্যান্ডস্কেপ',
    titleEn: 'Landscape',
    duration: '4 months',
    ageGroup: '12+ years',
    level: 'Intermediate',
    description: 'Capture the beauty of nature — sky, mountains, water, and trees.',
    image: '/images/drawing/landscape.jpg',
    color: '#8B5CF6',
    category: 'Painting',
  }),
  wrapCourse({
    id: 'c15',
    title: 'Modern Art',
    titleBn: 'মডার্ন আর্ট',
    titleEn: 'Modern Art',
    duration: '6 months',
    ageGroup: '14+ years',
    level: 'Advanced',
    description: 'Explore abstract and contemporary art movements and techniques.',
    image: '/images/drawing/modern art.jpg',
    color: '#FF5C8A',
    category: 'Modern',
  }),
  wrapCourse({
    id: 'c16',
    title: 'Kids Art',
    titleBn: 'কিডস আর্ট',
    titleEn: 'Kids Art',
    duration: '3 months',
    ageGroup: '4-8 years',
    level: 'Beginner',
    description: 'Playful art that builds fine-motor skills and creativity.',
    image: '/images/drawing/kids art.jpg',
    color: '#FBBF24',
    category: 'Kids',
  }),
  wrapCourse({
    id: 'c17',
    title: 'Exam Preparation',
    titleBn: 'পরীক্ষার প্রস্তুতি',
    titleEn: 'Exam Preparation',
    duration: '3 months',
    ageGroup: '10-18 years',
    level: 'All Levels',
    description: 'Art exam prep for secondary, higher secondary, and competitive exams.',
    image: '/images/drawing/drawing exam preparation.jpg',
    color: '#3B82F6',
    category: 'Exam',
  }),
  wrapCourse({
    id: 'c18',
    title: 'Professional Fine Arts',
    titleBn: 'প্রফেশনাল ফাইন আর্টস',
    titleEn: 'Professional Fine Arts',
    duration: '12 months',
    ageGroup: '16+ years',
    level: 'Advanced',
    description: 'A career-focused programme for aspiring professional artists.',
    image: '/images/drawing/professional fine art1.jpg',
    color: '#10B981',
    category: 'Professional',
  }),
];

// =====================================================
// GALLERY
// =====================================================
export const galleryCategories: Localized<string>[] = [
  loc('View all', 'সব দেখুন'),
  loc('Watercolor', 'ওয়াটারকালার'),
  loc('Oil Painting', 'অয়েল পেইন্টিং'),
  loc('Pencil Sketch', 'পেন্সিল স্কেচ'),
  loc('Portrait', 'পোর্ট্রেট'),
  loc('Landscape', 'ল্যান্ডস্কেপ'),
  loc('Collage', 'কোলাজ'),
  loc('Handmade', 'হাতের কাজ'),
  loc('Canvas', 'ক্যানভাস'),
  loc('Still Life', 'স্টিল লাইফ'),
  loc('Nature', 'প্রকৃতি'),
  loc("Kids' Art", 'শিশুদের শিল্প'),
  loc('Festival Art', 'উৎসবের শিল্প'),
];

export const galleryItems: GalleryItem[] = [
  {
    id: 'g1',
    title: loc('Sunset Mountain', 'সূর্যাস্তের পাহাড়'),
    category: loc('Landscape', 'ল্যান্ডস্কেপ'),
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&q=80',
    student: loc('Arnab Das', 'অর্ণব দাস'),
    age: 14,
  },
  {
    id: 'g2',
    title: loc("Mother's Portrait", 'মায়ের প্রতিকৃতি'),
    category: loc('Portrait', 'পোর্ট্রেট'),
    image: 'https://images.unsplash.com/photo-1578926375605-eaf7559b1458?w=800&q=80',
    student: loc('Shrabanti Roy', 'শ্রাবন্তী রায়'),
    age: 16,
  },
  {
    id: 'g3',
    title: loc('Village Pond', 'গ্রামের পুকুর'),
    category: loc('Watercolor', 'ওয়াটারকালার'),
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80',
    student: loc('Rohit Sen', 'রোহিত সেন'),
    age: 13,
  },
  {
    id: 'g4',
    title: loc('Old Man Sketch', 'বৃদ্ধ মানুষের স্কেচ'),
    category: loc('Pencil Sketch', 'পেন্সিল স্কেচ'),
    image: 'https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?w=800&q=80',
    student: loc('Pritam Ghosh', 'প্রীতম ঘোষ'),
    age: 15,
  },
  {
    id: 'g5',
    title: loc('Fruit & Vase', 'ফল ও ফুলদানি'),
    category: loc('Still Life', 'স্টিল লাইফ'),
    image: 'https://images.unsplash.com/photo-1579783901586-d88db74b4da4?w=800&q=80',
    student: loc('Mou Bandyopadhyay', 'মৌ বন্দ্যোপাধ্যায়'),
    age: 14,
  },
  {
    id: 'g6',
    title: loc('Bengal Tiger', 'বাংলার বাঘ'),
    category: loc('Oil Painting', 'অয়েল পেইন্টিং'),
    image: 'https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=800&q=80',
    student: loc('Subhajit Kar', 'সুভাজিৎ কর'),
    age: 17,
  },
  {
    id: 'g7',
    title: loc('Paper Flowers', 'কাগজের ফুল'),
    category: loc('Handmade', 'হাতের কাজ'),
    image: 'https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?w=800&q=80',
    student: loc('Ananya Pal', 'অনন্যা পাল'),
    age: 9,
  },
  {
    id: 'g8',
    title: loc('Forest Path', 'বনের পথ'),
    category: loc('Landscape', 'ল্যান্ডস্কেপ'),
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&q=80',
    student: loc('Debanjan De', 'দেবাঞ্জন দে'),
    age: 15,
  },
  {
    id: 'g9',
    title: loc('Dreamy Girl', 'স্বপ্নময়ী মেয়ে'),
    category: loc('Portrait', 'পোর্ট্রেট'),
    image: 'https://images.unsplash.com/photo-1578926375605-eaf7559b1458?w=800&q=80',
    student: loc('Ishita Dutta', 'ইশিতা দত্ত'),
    age: 16,
  },
  {
    id: 'g10',
    title: loc('Magic Tree', 'জাদুর গাছ'),
    category: loc("Kids' Art", 'শিশুদের শিল্প'),
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80',
    student: loc('Arya Bera', 'আর্য বেরা'),
    age: 7,
  },
  {
    id: 'g11',
    title: loc('Durga Puja', 'দুর্গা পূজা'),
    category: loc('Festival Art', 'উৎসবের শিল্প'),
    image: 'https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=800&q=80',
    student: loc('Suman Maity', 'সুমন মাইতি'),
    age: 18,
  },
  {
    id: 'g12',
    title: loc('Harmony of Nature', 'প্রকৃতির সমন্বয়'),
    category: loc('Collage', 'কোলাজ'),
    image: 'https://images.unsplash.com/photo-1579783901586-d88db74b4da4?w=800&q=80',
    student: loc('Tania Saha', 'তানিয়া সাহা'),
    age: 12,
  },
];

// =====================================================
// FEATURED ARTWORK
// =====================================================
export const featuredArtwork = [
  {
    id: 'f1',
    title: loc('Bengal Heritage', 'বাংলার ঐতিহ্য'),
    medium: loc('Watercolor', 'ওয়াটারকালার'),
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=1200&q=80',
  },
  {
    id: 'f2',
    title: loc('Monsoon Mood', 'বর্ষার মেজাজ'),
    medium: loc('Oil Painting', 'অয়েল পেইন্টিং'),
    image: 'https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=1200&q=80',
  },
  {
    id: 'f3',
    title: loc('Old Kolkata', 'পুরনো কলকাতা'),
    medium: loc('Pencil Sketch', 'পেন্সিল স্কেচ'),
    image: 'https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?w=1200&q=80',
  },
  {
    id: 'f4',
    title: loc('The Fisherman', 'জেলে'),
    medium: loc('Portrait', 'পোর্ট্রেট'),
    image: 'https://images.unsplash.com/photo-1578926375605-eaf7559b1458?w=1200&q=80',
  },
  {
    id: 'f5',
    title: loc('Sundarbans', 'সুন্দরবন'),
    medium: loc('Landscape', 'ল্যান্ডস্কেপ'),
    image: 'https://images.unsplash.com/photo-1579783901586-d88db74b4da4?w=1200&q=80',
  },
];

// =====================================================
// STORE
// =====================================================
export const storeCategories: Localized<string>[] = [
  loc('Drawing Books', 'আঁকার বই'), loc('Sketch Books', 'স্কেচ বুক'), loc('Art Paper', 'আর্ট পেপার'), loc('Canvas Boards', 'ক্যানভাস বোর্ড'),
  loc('Pencils', 'পেন্সিল'), loc('Charcoal', 'চারকোল'), loc('Colour Pencils', 'কালার পেন্সিল'), loc('Oil Pastels', 'অয়েল পাস্তেল'),
  loc('Soft Pastels', 'সফট পাস্তেল'), loc('Watercolour', 'ওয়াটারকালার'), loc('Poster Colour', 'পোস্টার কালার'), loc('Acrylic Colour', 'অ্যাক্রিলিক কালার'),
  loc('Oil Colour', 'অয়েল কালার'), loc('Brushes', 'ব্রাশ'), loc('Palette', 'প্যালেট'), loc('Erasers', 'ইরেজার'),
  loc('Sharpeners', 'শার্পনার'), loc('Scale', 'স্কেল'), loc('Drawing Clips', 'ড্রয়িং ক্লিপস'), loc('Masking Tape', 'মাস্কিং টেপ'),
  loc('Palette Knife', 'প্যালেট নাইফ'), loc('Canvas', 'ক্যানভাস'), loc('Markers', 'মার্কার'), loc('Fineliners', 'ফাইনলাইনার'),
  loc('Calligraphy Pen', 'ক্যালিগ্রাফি পেন'), loc('Geometry Tools', 'জ্যামিতির সরঞ্জাম'), loc('Kids Art Kit', 'কিডস আর্ট কিট'),
  loc('Professional Artist Kit', 'প্রফেশনাল আর্টিস্ট কিট'),
];

export const products: Product[] = [
  {
    id: 'p1',
    name: loc('Premium Watercolour Set (24 Colours)', 'প্রিমিয়াম ওয়াটারকালার সেট (২৪ রঙ)'),
    category: loc('Watercolour', 'ওয়াটারকালার'),
    price: 899,
    originalPrice: 1299,
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&q=80',
    rating: 4.8,
    reviews: 142,
    badge: loc('Best Seller', 'সর্বাধিক বিক্রিত'),
  },
  {
    id: 'p2',
    name: loc('Professional Artist Brush Set (12 Pieces)', 'প্রফেশনাল ব্রাশ সেট (১২টি)'),
    category: loc('Brushes', 'ব্রাশ'),
    price: 649,
    originalPrice: 999,
    image: 'https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?w=600&q=80',
    rating: 4.9,
    reviews: 98,
    badge: loc('New Arrival', 'নতুন আগমন'),
  },
  {
    id: 'p3',
    name: loc('Stretched Canvas Board Pack (5 Pieces)', 'ক্যানভাস বোর্ড প্যাক (৫টি)'),
    category: loc('Canvas Boards', 'ক্যানভাস বোর্ড'),
    price: 549,
    image: 'https://images.unsplash.com/photo-1579783901586-d88db74b4da4?w=600&q=80',
    rating: 4.7,
    reviews: 67,
  },
  {
    id: 'p4',
    name: loc('Artist Oil Colour Studio Box (12 Tubes)', 'আর্টিস্ট অয়েল কালার (১২টি টিউব)'),
    category: loc('Oil Colour', 'অয়েল কালার'),
    price: 1499,
    originalPrice: 1999,
    image: 'https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=600&q=80',
    rating: 4.9,
    reviews: 56,
    badge: loc('Limited Offer', 'সীমিত অফার'),
  },
  {
    id: 'p5',
    name: loc('Heavyweight Hardbound Sketchbook A4 180GSM', 'প্রফেশনাল স্কেচ বুক এ৪ ১৮০ জিএসএম'),
    category: loc('Sketch Books', 'স্কেচ বুক'),
    price: 299,
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&q=80',
    rating: 4.6,
    reviews: 211,
  },
  {
    id: 'p6',
    name: loc('Artist Acrylic Colour Set (18 Shades)', 'অ্যাক্রিলিক কালার সেট (১৮ শেড)'),
    category: loc('Acrylic Colour', 'অ্যাক্রিলিক কালার'),
    price: 1199,
    originalPrice: 1599,
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&q=80',
    rating: 4.8,
    reviews: 89,
    badge: loc('Best Seller', 'সর্বাধিক বিক্রিত'),
  },
  {
    id: 'p7',
    name: loc('Professional Soft Pastels (36 Colours)', 'সফট পাস্তেল (৩৬ রঙ)'),
    category: loc('Soft Pastels', 'সফট পাস্তেল'),
    price: 449,
    image: 'https://images.unsplash.com/photo-1580136579312-94651dfd596d?w=600&q=80',
    rating: 4.7,
    reviews: 73,
  },
  {
    id: 'p8',
    name: loc('Ultimate Kids Art & Craft Kit (50+ Items)', 'কিডস আর্ট কিট (৫০+ আইটেম)'),
    category: loc('Kids Art Kit', 'কিডস আর্ট কিট'),
    price: 799,
    originalPrice: 1199,
    image: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=600&q=80',
    rating: 4.9,
    reviews: 178,
    badge: loc('New Arrival', 'নতুন আগমন'),
  },
  {
    id: 'p9',
    name: loc('Graphite Sketching Pencil Set (12 Grades 9B-2H)', 'গ্রাফাইট স্কেচিং পেন্সিল সেট (১২টি গ্রেড)'),
    category: loc('Pencils', 'পেন্সিল'),
    price: 399,
    originalPrice: 499,
    image: 'https://images.unsplash.com/photo-1585336261026-7f5a4d3b40f8?w=600&q=80',
    rating: 4.8,
    reviews: 156,
    badge: loc('Best Seller', 'সর্বাধিক বিক্রিত'),
  },
  {
    id: 'p10',
    name: loc('Cotton Canvas Roll 10 Meters High Texture', 'ক্যানভাস রোল (১০ মিটার প্রিমিয়াম টেক্সচার)'),
    category: loc('Canvas', 'ক্যানভাস'),
    price: 1899,
    originalPrice: 2499,
    image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=600&q=80',
    rating: 4.7,
    reviews: 45,
  },
  {
    id: 'p11',
    name: loc('Designer Poster Colour Set (24 Colours)', 'পোস্টার কালার সেট (২৪ রঙ)'),
    category: loc('Poster Colour', 'পোস্টার কালার'),
    price: 349,
    originalPrice: 499,
    image: 'https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=600&q=80',
    rating: 4.5,
    reviews: 89,
  },
  {
    id: 'p12',
    name: loc('Clear Oval Acrylic Artist Mixing Palette', 'প্রফেশনাল অ্যাক্রিলিক মিক্সিং প্যালেট'),
    category: loc('Palette', 'প্যালেট'),
    price: 199,
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&q=80',
    rating: 4.6,
    reviews: 34,
  },
  {
    id: 'p13',
    name: loc('Oil Painting Stainless Palette Knives (5 Set)', 'প্যালেট নাইফ সেট (৫টি বিভিন্ন শেপ)'),
    category: loc('Palette Knife', 'প্যালেট নাইফ'),
    price: 279,
    originalPrice: 399,
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&q=80',
    rating: 4.8,
    reviews: 62,
    badge: loc('Best Seller', 'সর্বাধিক বিক্রিত'),
  },
  {
    id: 'p14',
    name: loc('Dual-Tip Graphic Art Markers (24 Shades)', 'ডুয়াল-টিপ গ্রাফিক্স আর্ট মার্কার (২৪ রঙ)'),
    category: loc('Markers', 'মার্কার'),
    price: 849,
    originalPrice: 1299,
    image: 'https://images.unsplash.com/photo-1585336261026-7f5a4d3b40f8?w=600&q=80',
    rating: 4.9,
    reviews: 115,
    badge: loc('New Arrival', 'নতুন আগমন'),
  },
  {
    id: 'p15',
    name: loc('Waterproof Archival Fineliner Pens (Set of 8)', 'ওয়াটারপ্রুফ ফাইনলাইনার পেন সেট (৮টি)'),
    category: loc('Fineliners', 'ফাইনলাইনার'),
    price: 499,
    originalPrice: 699,
    image: 'https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?w=600&q=80',
    rating: 4.9,
    reviews: 184,
    badge: loc('Best Seller', 'সর্বাধিক বিক্রিত'),
  },
  {
    id: 'p16',
    name: loc('Extra Soft Creamy Oil Pastels (50 Shades)', 'প্রিমিয়াম অয়েল পাস্তেল (৫০ শেড)'),
    category: loc('Oil Pastels', 'অয়েল পাস্তেল'),
    price: 599,
    originalPrice: 799,
    image: 'https://images.unsplash.com/photo-1580136579312-94651dfd596d?w=600&q=80',
    rating: 4.7,
    reviews: 92,
  },
  {
    id: 'p17',
    name: loc('Cold-Pressed Watercolour Paper Pad 300GSM', 'ওয়াটারকালার পেপার প্যাড ৩০০ জিএসএম ২০ শিট'),
    category: loc('Art Paper', 'আর্ট পেপার'),
    price: 499,
    originalPrice: 649,
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&q=80',
    rating: 4.9,
    reviews: 88,
    badge: loc('New Arrival', 'নতুন আগমন'),
  },
  {
    id: 'p18',
    name: loc('Calligraphy Pen & Bottle Ink Set', 'ক্যালিগ্রাফি পেন ও বোটল কালি সেট'),
    category: loc('Calligraphy Pen', 'ক্যালিগ্রাফি পেন'),
    price: 599,
    originalPrice: 899,
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&q=80',
    rating: 4.8,
    reviews: 41,
  },
  {
    id: 'p19',
    name: loc('Natural Willow Charcoal Sticks & Pencil Set', 'প্রাকৃতিক উইলো চারকোল স্টিক ও পেন্সিল সেট'),
    category: loc('Charcoal', 'চারকোল'),
    price: 349,
    image: 'https://images.unsplash.com/photo-1578926375605-eaf7559b1458?w=600&q=80',
    rating: 4.6,
    reviews: 53,
  },
  {
    id: 'p20',
    name: loc('Artist Blendable Watercolour Pencils (36 Shades)', 'প্রিমিয়াম কালার পেন্সিল সেট (৩৬ শেড)'),
    category: loc('Colour Pencils', 'কালার পেন্সিল'),
    price: 699,
    originalPrice: 999,
    image: 'https://images.unsplash.com/photo-1585336261026-7f5a4d3b40f8?w=600&q=80',
    rating: 4.8,
    reviews: 129,
    badge: loc('Best Seller', 'সর্বাধিক বিক্রিত'),
  },
  {
    id: 'p21',
    name: loc('Precision Metal Geometry & Compass Kit', 'প্রিসিশন মেটাল জ্যামিতি ও কম্পাস সেট'),
    category: loc('Geometry Tools', 'জ্যামিতির সরঞ্জাম'),
    price: 399,
    image: 'https://images.unsplash.com/photo-1579783901586-d88db74b4da4?w=600&q=80',
    rating: 4.6,
    reviews: 47,
  },
  {
    id: 'p22',
    name: loc('Adjustable Beechwood Tabletop Art Easel', 'অ্যাডজাস্টেবল কাঠের টেবিলটপ আর্ট ইজেল'),
    category: loc('Canvas', 'ক্যানভাস'),
    price: 999,
    originalPrice: 1499,
    image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=600&q=80',
    rating: 4.9,
    reviews: 64,
    badge: loc('Limited Offer', 'সীমিত অফার'),
  },
  {
    id: 'p23',
    name: loc('Artist Precision Masking Tape (Pack of 3)', 'আর্ট প্রিসিশন মাস্কিং টেপ (৩টি প্যাক)'),
    category: loc('Masking Tape', 'মাস্কিং টেপ'),
    price: 249,
    image: 'https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?w=600&q=80',
    rating: 4.7,
    reviews: 38,
  },
  {
    id: 'p24',
    name: loc('Master Fine Artist Complete Studio Kit (80+ Items)', 'প্রফেশনাল মাস্টার আর্টিস্ট স্টুডিও কিট (৮০+ আইটেম)'),
    category: loc('Professional Artist Kit', 'প্রফেশনাল আর্টিস্ট কিট'),
    price: 2499,
    originalPrice: 3499,
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&q=80',
    rating: 5.0,
    reviews: 205,
    badge: loc('Best Seller', 'সর্বাধিক বিক্রিত'),
  },
];

export const shopFeatures = [
  { icon: 'Truck', title: loc('Fast Delivery', 'দ্রুত ডেলিভারি'), desc: loc('Shipping in 3-5 days across India', 'সারা ভারতে ৩-৫ দিনে শিপিং'), color: '#FF6B35' },
  { icon: 'CreditCard', title: loc('Cash on Delivery', 'ক্যাশ অন ডেলিভারি'), desc: loc('Pay when you receive the product', 'পণ্য পেয়ে পেমেন্ট করুন'), color: '#8B5CF6' },
  { icon: 'Smartphone', title: loc('UPI Payment', 'ইউপিআই পেমেন্ট'), desc: loc('GPay, PhonePe, Paytm', 'জিপে, ফোনপে, পেটিএম'), color: '#10B981' },
  { icon: 'Shield', title: loc('Quality Products', 'মানসম্মত পণ্য'), desc: loc('Only branded materials', 'শুধু ব্র্যান্ডেড উপকরণ'), color: '#3B82F6' },
  { icon: 'Tag', title: loc('Affordable Prices', 'সাশ্রয়ী মূল্য'), desc: loc('Best price guaranteed', 'সেরা দামের নিশ্চয়তা'), color: '#FF5C8A' },
  { icon: 'RefreshCw', title: loc('Easy Returns', 'সহজ রিটার্ন'), desc: loc('7-day return policy', '৭ দিনের রিটার্ন নীতি'), color: '#FBBF24' },
];

// =====================================================
// EVENTS
// =====================================================
export const events: EventItem[] = [
  {
    id: 'e1',
    title: loc('Annual Drawing Competition 2026', 'বার্ষিক আঁকা প্রতিযোগিতা ২০২৬'),
    date: '15 August 2026',
    type: loc('Competition', 'প্রতিযোগিতা'),
    description: loc('Show your skills and win exciting prizes.', 'আপনার দক্ষতা দেখান এবং আকর্ষণীয় পুরস্কার জিতুন।'),
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80',
  },
  {
    id: 'e2',
    title: loc('Watercolour Workshop', 'ওয়াটারকালার কর্মশালা'),
    date: '22 August 2026',
    type: loc('Workshop', 'কর্মশালা'),
    description: loc('A three-day in-depth workshop with master artists.', 'মাস্টার শিল্পীদের সঙ্গে তিন দিনের গভীর কর্মশালা।'),
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&q=80',
  },
  {
    id: 'e3',
    title: loc('Student Art Exhibition', 'ছাত্র আর্ট প্রদর্শনী'),
    date: '10 September 2026',
    type: loc('Exhibition', 'প্রদর্শনী'),
    description: loc('Selected artworks will be displayed in the city art gallery.', 'নির্বাচিত শিল্পকর্ম শহরের আর্ট গ্যালারিতে প্রদর্শিত হবে।'),
    image: 'https://images.unsplash.com/photo-1578926375605-eaf7559b1458?w=800&q=80',
  },
  {
    id: 'e4',
    title: loc('Summer Art Camp', 'গ্রীষ্মকালীন আর্ট ক্যাম্প'),
    date: 'May 2026',
    type: loc('Camp', 'ক্যাম্প'),
    description: loc('A 30-day creative journey for young artists.', 'ছোট শিল্পীদের জন্য ৩০ দিনের সৃজনশীল যাত্রা।'),
    image: 'https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?w=800&q=80',
  },
  {
    id: 'e5',
    title: loc('Winter Camp — Festival Art', 'শীতকালীন ক্যাম্প — উৎসবের শিল্প'),
    date: 'December 2026',
    type: loc('Camp', 'ক্যাম্প'),
    description: loc('Create magical artworks during the holidays.', 'ছুটির দিনগুলোতে জাদুকরী শিল্পকর্ম তৈরি করুন।'),
    image: 'https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=800&q=80',
  },
  {
    id: 'e6',
    title: loc('Festival Drawing Competition', 'উৎসবের আঁকা প্রতিযোগিতা'),
    date: 'October 2026',
    type: loc('Competition', 'প্রতিযোগিতা'),
    description: loc('Create traditional artwork on a Durga Puja theme.', 'দুর্গা পূজার থিমে ঐতিহ্যবাহী শিল্পকর্ম তৈরি করুন।'),
    image: 'https://images.unsplash.com/photo-1579783901586-d88db74b4da4?w=800&q=80',
  },
];

// =====================================================
// TESTIMONIALS
// =====================================================
// `role` is a fixed union; mirror the same English label to both sides so
// Bengali mode also shows the same role text (the type system doesn't allow
// different bn literals here).
export const testimonials: Testimonial[] = [
  {
    id: 't1',
    name: loc('Rina Das', 'রিনা দাস'),
    role: en('Parent'),
    message: loc('My daughter has discovered herself as a confident artist. The personal attention and creative environment are truly unmatched. The best art school in the city!', 'আমার মেয়ে একজন আত্মবিশ্বাসী শিল্পী হিসেবে নিজেকে আবিষ্কার করেছে। ব্যক্তিগত মনোযোগ আর সৃজনশীল পরিবেশ — সত্যিই অতুলনীয়। শহরের সেরা আর্ট স্কুল!'),
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
    rating: 5,
  },
  {
    id: 't2',
    name: loc('Sourav Mitra', 'সৌরভ মিত্র'),
    role: en('Student'),
    message: loc('What I could not learn on my own after years of trying, I learned here in 6 months. The teacher is incredibly patient and skilled.', 'নিজে নিজে বছরের পর বছর চেষ্টা করেও যা শিখতে পারিনি, এখানে ৬ মাসে তার চেয়ে বেশি শিখেছি। শিক্ষক অসম্ভব ধৈর্যশীল এবং দক্ষ।'),
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=200&q=80',
    rating: 5,
  },
  {
    id: 't3',
    name: loc('Anita Roy', 'অনিতা রায়'),
    role: en('Parent'),
    message: loc('The day my son\'s work was hung at the exhibition, I had tears in my eyes. Thank you for nurturing his talent.', 'আমার ছেলের কাজ যেদিন প্রদর্শনীতে ঝুলল, চোখে জল এসে গিয়েছিল। তার প্রতিভাকে লালন করার জন্য ধন্যবাদ।'),
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80',
    rating: 5,
  },
  {
    id: 't4',
    name: loc('Moumita Sen', 'মৌমিতা সেন'),
    role: en('Student'),
    message: loc('From a shy girl to a confident painter — this school has transformed me. I find everything I need at the art store too!', 'একজন লাজুক মেয়ে থেকে আত্মবিশ্বাসী চিত্রশিল্পী — এই স্কুল আমাকে বদলে দিয়েছে। আর্ট স্টোরেও আমার যা কিছু দরকার সব পাই!'),
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
    title: loc('10 Watercolour Techniques Every Beginner Should Know', 'প্রতিটি শিক্ষানবিসের জানা উচিত ১০টি ওয়াটারকালার কৌশল'),
    category: loc('Watercolour Guide', 'ওয়াটারকালার গাইড'),
    excerpt: loc('Master the essentials with these professional tips — wet-on-wet, dry brush, and colour blending.', 'ওয়েট-অন-ওয়েট, ড্রাই ব্রাশ আর রঙের ব্লেন্ডিং — এই পেশাদার টিপসগুলোর সাহায্যে মূল বিষয়গুলো আয়ত্ত করুন।'),
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80',
    date: '12 July 2026',
    readTime: loc('5 min read', '৫ মিনিট'),
  },
  {
    id: 'b2',
    title: loc('How to Build a Career in Fine Arts', 'ফাইন আর্টসে ক্যারিয়ার গড়বেন কীভাবে'),
    category: loc('Art Career', 'আর্ট ক্যারিয়ার'),
    excerpt: loc('A realistic guide for young artists who want to turn their passion into a profession.', 'যুব শিল্পীদের জন্য একটি বাস্তবসম্মত গাইড — যারা শখকে পেশায় রূপ দিতে চায় তাদের জন্য।'),
    image: 'https://images.unsplash.com/photo-1578926375605-eaf7559b1458?w=800&q=80',
    date: '5 July 2026',
    readTime: loc('8 min read', '৮ মিনিট'),
  },
  {
    id: 'b3',
    title: loc('7 Sketching Techniques to Improve Your Hand', 'আপনার হাতের লাইন উন্নত করার ৭টি স্কেচিং কৌশল'),
    category: loc('Sketching Techniques', 'স্কেচিং কৌশল'),
    excerpt: loc('These simple daily practices will dramatically improve the quality of your lines.', 'এই সহজ দৈনিক অনুশীলনগুলো আপনার রেখার মানকে নাটকীয়ভাবে উন্নত করবে।'),
    image: 'https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?w=800&q=80',
    date: '28 June 2026',
    readTime: loc('4 min read', '৪ মিনিট'),
  },
  {
    id: 'b4',
    title: loc('Oil Painting Tips for Beginners', 'শিক্ষানবিসদের জন্য অয়েল পেইন্টিং টিপস'),
    category: loc('Oil Painting Tips', 'অয়েল পেইন্টিং টিপস'),
    excerpt: loc('Avoid common mistakes and start oil painting the right way.', 'সাধারণ ভুলগুলো এড়িয়ে ঠিক পদ্ধতিতে অয়েল পেইন্টিং শুরু করুন।'),
    image: 'https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=800&q=80',
    date: '20 June 2026',
    readTime: loc('6 min read', '৬ মিনিট'),
  },
  {
    id: 'b5',
    title: loc('Tips for Drawing', 'আঁকার টিপস'),
    category: loc('Drawing Tips', 'আঁকার টিপস'),
    excerpt: loc('Core principles every young artist should master first.', 'প্রতিটি তরুণ শিল্পীর প্রথমে আয়ত্ত করা উচিত এমন মূলনীতিগুলো।'),
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&q=80',
    date: '15 June 2026',
    readTime: loc('5 min read', '৫ মিনিট'),
  },
  {
    id: 'b6',
    title: loc('Unlocking Children\'s Creativity Through Art', 'শিশুদের সৃজনশীলতা খুলে দিন শিল্পের মাধ্যমে'),
    category: loc("Children's Creativity", 'শিশুদের সৃজনশীলতা'),
    excerpt: loc('How creative activities shape young minds and build confidence.', 'সৃজনশীল কার্যক্রম কীভাবে তরুণ মনকে গড়ে তোলে এবং আত্মবিশ্বাস বাড়ায়।'),
    image: 'https://images.unsplash.com/photo-1579783901586-d88db74b4da4?w=800&q=80',
    date: '8 June 2026',
    readTime: loc('4 min read', '৪ মিনিট'),
  },
];

// =====================================================
// FAQ
// =====================================================
export const faqs: FAQItem[] = [
  {
    id: 'f1',
    question: loc('What is the right age to start learning art?', 'আঁকা শেখার সঠিক বয়স কোনটি?'),
    answer: loc('Children as young as 4 can begin through our Kids Art programme. We have courses for every age from 4 to 80.', 'মাত্র ৪ বছর বয়সী শিশুরাও আমাদের কিডস আর্ট প্রোগ্রামের মাধ্যমে শুরু করতে পারে। ৪ থেকে ৮০ বছর পর্যন্ত প্রত্যেক বয়সের জন্য আমাদের কোর্স রয়েছে।'),
  },
  {
    id: 'f2',
    question: loc('Do you provide art supplies?', 'আপনারা কি আর্ট সরঞ্জাম সরবরাহ করেন?'),
    answer: loc('Basic supplies are included in regular classes. Beyond that, our in-house art store offers premium supplies to students at a special discount.', 'নিয়মিত ক্লাসে মৌলিক সরঞ্জাম অন্তর্ভুক্ত থাকে। এছাড়া আমাদের নিজস্ব আর্ট স্টোরে ছাত্র-ছাত্রীদের জন্য বিশেষ ছাড়ে প্রিমিয়াম সরঞ্জাম কেনার সুযোগ রয়েছে।'),
  },
  {
    id: 'f3',
    question: loc('How many students are there in each batch?', 'প্রতি ব্যাচে কতজন ছাত্র-ছাত্রী থাকেন?'),
    answer: loc('Each student receives personal attention from the teacher — so we cap batches at 8 students.', 'প্রতিটি ছাত্র-ছাত্রী শিক্ষকের ব্যক্তিগত মনোযোগ পান — তাই ব্যাচে সর্বোচ্চ ৮ জন রাখা হয়।'),
  },
  {
    id: 'f4',
    question: loc('Do you offer exams or certificates?', 'পরীক্ষা বা সার্টিফিকেট কি আছে?'),
    answer: loc('Yes. On successful completion of any course, students receive a recognised certificate from Loknath Art School.', 'হ্যাঁ। প্রতিটি কোর্স সফলভাবে সম্পন্ন করলে ছাত্র-ছাত্রীরা লোকনাথ আর্ট স্কুলের স্বীকৃত সার্টিফিকেট লাভ করে।'),
  },
  {
    id: 'f5',
    question: loc('Do you offer online classes?', 'আপনারা কি অনলাইন ক্লাস দেন?'),
    answer: loc('We currently teach in person at our studio. Online workshops are held seasonally — watch our Events section for updates.', 'বর্তমানে আমরা আমাদের স্টুডিওতে সরাসরি ক্লাস নিই। মৌসুম অনুযায়ী অনলাইন কর্মশালার আয়োজন করা হয় — আমাদের ইভেন্ট সেকশনে চোখ রাখুন।'),
  },
  {
    id: 'f6',
    question: loc('How is the fee structured?', 'ফি কাঠামো কেমন?'),
    answer: loc('Fees vary by course. See our Courses section or get in touch for full fee details. We try to keep it affordable for every family.', 'কোর্স অনুযায়ী ফি ভিন্ন হয়। বিস্তারিত ফি তথ্যের জন্য আমাদের কোর্স সেকশন দেখুন বা যোগাযোগ করুন। আমরা প্রতিটি পরিবারের সাধ্যের মধ্যে রাখার চেষ্টা করি।'),
  },
];

// =====================================================
// NAV LINKS — kept bilingual for parity with the rest
// of the site. navLinks stay in English per spec, but we
// expose a Localized wrapper so the helper can target them.
// =====================================================
export const navLinks: { label: Localized<string>; href: string }[] = [
  { label: loc('Home', 'হোম'), href: '#home' },
  { label: loc('About', 'আমাদের সম্পর্কে'), href: '#about' },
  { label: loc('Courses', 'কোর্স'), href: '#courses' },
  { label: loc('Gallery', 'গ্যালারি'), href: '#gallery' },
  { label: loc('Art Store', 'আর্ট স্টোর'), href: '/store' },
  { label: loc('Events', 'ইভেন্ট'), href: '#events' },
  { label: loc('Blog', 'ব্লগ'), href: '#blog' },
  { label: loc('Contact', 'যোগাযোগ'), href: '#contact' },
];

// =====================================================
// ABOUT
// =====================================================
export const aboutContent = {
  badge: loc('Meet the artist', 'শিল্পীর সাথে পরিচয়'),
  titleBefore: loc('A teacher who paints', 'একজন শিক্ষক যিনি আঁকেন'),
  titleHighlight: loc('futures', 'ভবিষ্যৎ'),
  titleAfter: loc(', not just pictures.', ', শুধু ছবি নয়।'),
  description: loc('For over 15 years, our founder has helped hundreds of children and adults discover the joy of art. Trained at the Government College of Art & Craft in Kolkata, this artist teaches by blending timeless techniques with modern creativity.', '15 বছরেরও বেশি সময় ধরে আমাদের প্রতিষ্ঠাতা শত শত শিশু ও প্রাপ্তবয়স্কদের শিল্পের আনন্দ আবিষ্কারে সাহায্য করে চলেছেন। কলকাতার গভর্নমেন্ট কলেজ অব আর্ট অ্যান্ড ক্রাফটে প্রশিক্ষিত এই শিল্পক অন্যদের চিরায়ত কৌশলকে আধুনিক সৃজনশীলতার সঙ্গে মিশিয়ে শেখান।'),
  imageAlt: loc('Rakhal Mukherjee — Artist', 'রাখাল মুখোপাধ্যায় - শিল্পী'),
  imageCaption: loc('Artist — Rakhal Mukherjee', 'শিল্পী - রাখাল মুখোপাধ্যায়'),
  quote: loc('"Every child is an artist. The problem is how to remain an artist once he grows up."', '"প্রতিটি শিশুই একজন শিল্পী। সমস্যা হল, বড় হওয়ার পরও কীভাবে শিল্পী থাকা যায়।"'),
  quoteAuthor: loc('— Pablo Picasso', '— পাবলো পিকাসো'),
  missionTitle: loc('Our mission', 'আমাদের লক্ষ্য'),
  missionDesc: loc('Make art education accessible, joyful, and life-changing for every child.', 'প্রতিটি শিশুর জন্য শিল্প শিক্ষাকে সুলভ, আনন্দদায়ক ও জীবন বদলে দেওয়ার মতো করে তোলা।'),
  visionTitle: loc('Our vision', 'আমাদের স্বপ্ন'),
  visionDesc: loc('A Bengal where every home has a child who draws with confidence.', 'এমন একটি বাংলা যেখানে প্রতিটি ঘরে একজন শিশু আছে যে আত্মবিশ্বাসের সঙ্গে আঁকে।'),
  experienceBadge: loc('Years of experience', 'বছরের অভিজ্ঞতা'),
  studentsBadge: loc('Students trained', 'প্রশিক্ষিত ছাত্র-ছাত্রী'),
};

// =====================================================
// CTA BANNER
// =====================================================
export const ctaContent = {
  badge: loc('Limited seats · New batch', 'সীমিত আসন · নতুন ব্যাচ'),
  title1: loc('Ready to paint', 'আপনার গল্প'),
  title2: loc('your story?', 'আঁকার জন্য প্রস্তুত?'),
  description: loc('Enrol this month and receive a free starter art kit. Only 8 seats per batch.', 'এই মাসে ভর্তি হলে বিনামূল্যে স্টার্টার আর্ট কিট পান। প্রতি ব্যাচে মাত্র ৮টি আসন।'),
  primary: loc('Enrol now', 'এখনই ভর্তি হোন'),
  secondary: loc('Call +91 98765 43210', 'ফোন করুন +৯১ ৯৮৭৬৫ ৪৩২১০'),
};

// =====================================================
// CONTACT INFO
// =====================================================
export const contactInfo = {
  badge: loc('Get in touch', 'যোগাযোগ করুন'),
  titleBefore: loc('Start a', 'একটি'),
  titleHighlight: loc('creative', 'সৃজনশীল'),
  titleAfter: loc('journey', 'যাত্রা শুরু করুন'),
  description: loc('Visit our studio, give us a call, or send a message — we would love to hear from you.', 'আমাদের স্টুডিওতে আসুন, ফোন করুন অথবা মেসেজ পাঠান — আপনার কথা শুনতে চাই।'),
  form: {
    name: loc('Full name', 'পুরো নাম'),
    phone: loc('Phone number', 'ফোন নম্বর'),
    email: loc('Email', 'ইমেইল'),
    course: loc('Select a course', 'কোর্স নির্বাচন করুন'),
    message: loc('Your message', 'আপনার বার্তা'),
    placeholders: {
      name: loc('Your name', 'আপনার নাম'),
      phone: loc('+91 ...', '+৯১ ...'),
      email: loc('you@example.com', 'you@example.com'),
      message: loc('Tell us a little about your goals...', 'আপনার লক্ষ্য সম্পর্কে একটু লিখুন...'),
    },
    submit: loc('Send message', 'বার্তা পাঠান'),
  },
  details: [
    { icon: 'MapPin', title: loc('Visit the studio', 'স্টুডিওতে আসুন'), lines: [loc('Moynaguri', 'ময়নাগুড়ি'), loc('Sultanpur - 713146, West Bengal', 'সুলতানপুর - 713146, পশ্চিমবঙ্গ')], color: '#FF6B35' },
    { icon: 'Phone', title: loc('Call us', 'ফোন করুন'), lines: [loc('+91 62963 77408', '+91 62963 77408'), loc('+91 62963 77408', '+91 62963 77408')], color: '#8B5CF6' },
    { icon: 'Mail', title: loc('Email', 'ইমেইল'), lines: [loc('hello@loknathart.in', 'hello@loknathart.in'), loc('admissions@loknathart.in', 'admissions@loknathart.in')], color: '#FF5C8A' },
    { icon: 'MessageCircle', title: loc('WhatsApp', 'হোয়াটসঅ্যাপ'), lines: [loc('+91 62963 77408', '+91 62963 77408'), loc('24 x 7', '24 x 7')], color: '#10B981' },
  ],
};

// =====================================================
// FOOTER
// =====================================================
export const footerContent = {
  brand: 'Loknath',         // proper noun — kept untranslated
  brandSub: loc('Art School', 'আর্ট স্কুল'),
  description: loc('Nurturing creativity in Bengal since 2010. Where imagination becomes art and every line tells a story.', '২০১০ সাল থেকে বাংলায় সৃজনশীলতার লালন। যেখানে কল্পনা শিল্প হয়ে ওঠে এবং প্রতিটি রেখা একটি গল্প বলে।'),
  newsletter: {
    placeholder: loc('Your email', 'আপনার ইমেইল'),
    button: loc('Subscribe', 'সাবস্ক্রাইব'),
    note: loc('Get art tips, event updates and special offers. No spam.', 'আর্ট টিপস, ইভেন্ট আপডেট ও বিশেষ অফার পান। স্প্যাম নয়।'),
    success: loc('Welcome to the studio!', 'স্টুডিওতে স্বাগতম!'),
    successDesc: loc('We will send you art tips and event updates.', 'আমরা আপনাকে আর্ট টিপস ও ইভেন্ট আপডেট পাঠাব।'),
  },
  explore: loc('Explore', 'ঘুরে দেখুন'),
  store: loc('Store', 'স্টোর'),
  reach: loc('Reach us', 'যোগাযোগ'),
  address: loc('42 Park Street, near Academy of Fine Arts, Kolkata 700016', '৪২ পার্ক স্ট্রিট, অ্যাকাডেমি অব ফাইন আর্টসের কাছে, কলকাতা ৭০০০১৬'),
  copyright: loc('© 2026 Loknath Art Center. Made with love in Kolkata.', '© ২০২৬ লোকনাথ আর্ট সেন্টার। কল্কাতায় ভালোবাসায় তৈরি।'),
  privacy: loc('Privacy', 'গোপনীয়তা'),
  terms: loc('Terms', 'শর্তাবলী'),
  backToTop: loc('Back to top', 'উপরে ফিরে যান'),
  customerLogin: loc('Customer Login', 'Customer Login'),
  adminLogin: loc('Admin Login', 'Admin Login'),
};
