// =====================================================
// Inline UI strings (buttons, labels, toasts, headings) that don't
// belong to a section's data module. Keep this file flat — every key
// is a short phrase used in 1-3 places. Section/page copy lives
// alongside its section/page module instead.
// =====================================================

import type { Localized } from './pick';

export const ui: Record<string, Localized<string>> = {
  // Generic actions
  save: { en: 'Save', bn: 'সংরক্ষণ করুন' },
  cancel: { en: 'Cancel', bn: 'বাতিল করুন' },
  edit: { en: 'Edit', bn: 'সম্পাদনা' },
  delete: { en: 'Delete', bn: 'মুছুন' },
  submit: { en: 'Submit', bn: 'জমা দিন' },
  close: { en: 'Close', bn: 'বন্ধ করুন' },
  back: { en: 'Back', bn: 'ফিরে যান' },
  loading: { en: 'Loading…', bn: 'লোড হচ্ছে…' },
  search: { en: 'Search', bn: 'অনুসন্ধান' },
  viewAll: { en: 'View all', bn: 'সব দেখুন' },
  learnMore: { en: 'Learn more', bn: 'আরও জানুন' },
  readMore: { en: 'Read more', bn: 'আরও পড়ুন' },
  notAdded: { en: 'Not added', bn: 'যোগ করা হয়নি' },
  pleaseWait: { en: 'Please wait…', bn: 'অনুগ্রহ করে অপেক্ষা করুন…' },
  update: { en: 'Update', bn: 'আপডেট করুন' },

  // Auth
  signIn: { en: 'Sign in', bn: 'লগইন' },
  signUp: { en: 'Sign up', bn: 'অ্যাকাউন্ট তৈরি করুন' },
  signOut: { en: 'Sign out', bn: 'লগআউট' },
  logout: { en: 'Logout', bn: 'লগআউট' },
  adminBadge: { en: 'Admin', bn: 'অ্যাডমিন' },
  customerBadge: { en: 'Customer', bn: 'গ্রাহক' },
  loginRequired: { en: 'Login required', bn: 'লগইন প্রয়োজন' },
  loginPrompt:
    {
      en: 'Sign in to view your account or create a new one.',
      bn: 'আপনার অ্যাকাউন্ট দেখতে লগইন করুন অথবা নতুন অ্যাকাউন্ট তৈরি করুন।',
    },
  welcome: { en: 'Welcome', bn: 'স্বাগতম' },
  login: { en: 'Login', bn: 'লগইন' },
  createAccount: { en: 'Create Account', bn: 'অ্যাকাউন্ট তৈরি করুন' },
  fullName: { en: 'Full Name', bn: 'পুরো নাম' },
  emailAddress: { en: 'Email Address', bn: 'ইমেইল ঠিকানা' },
  phoneNumber: { en: 'Phone Number', bn: 'ফোন নম্বর' },
  password: { en: 'Password', bn: 'পাসওয়ার্ড' },
  continueWithGoogle: { en: 'Continue with Google', bn: 'Google দিয়ে চালিয়ে যান' },
  dontHaveAccount: { en: "Don't have an account?", bn: 'অ্যাকাউন্ট নেই?' },
  alreadyHaveAccount: { en: 'Already have an account?', bn: 'ইতিমধ্যে অ্যাকাউন্ট আছে?' },
  fillAllFields: { en: 'Fill all required fields', bn: 'সব প্রয়োজনীয় ক্ষেত্র পূরণ করুন' },
  togglePassword: { en: 'Toggle password', bn: 'পাসওয়ার্ড দেখান' },
  welcomeBack: { en: 'Welcome back', bn: 'আবার স্বাগতম' },
  updateProfileAndEnroll: { en: 'Update Info & Enroll', bn: 'তথ্য হালনাগাদ ও এনরোল করুন' },
  confirmEnrollment: { en: 'Confirm Enrollment', bn: 'এনরোলমেন্ট নিশ্চিত করুন' },
  loggedInAs: { en: 'Logged in as', bn: 'লগইন আছেন' },
  forgotPassword: { en: 'Forgot password?', bn: 'পাসওয়ার্ড ভুলে গেছেন?' },
  resetPassword: { en: 'Reset Password', bn: 'পাসওয়ার্ড রিসেট করুন' },
  sendResetLink: { en: 'Send Reset Link', bn: 'রিসেট লিংক পাঠান' },
  resetLinkFailed: { en: 'Failed to send reset link', bn: 'রিসেট লিংক পাঠাতে ব্যর্থ' },
  updatePasswordFailed: { en: 'Failed to update password', bn: 'পাসওয়ার্ড আপডেট ব্যর্থ' },
  createNewPassword: { en: 'Create New Password', bn: 'নতুন পাসওয়ার্ড তৈরি করুন' },
  updatePassword: { en: 'Update Password', bn: 'পাসওয়ার্ড হালনাগাদ করুন' },
  passwordUpdated: { en: 'Password updated successfully!', bn: 'পাসওয়ার্ড সফলভাবে হালনাগাদ হয়েছে!' },
  newPassword: { en: 'New Password', bn: 'নতুন পাসওয়ার্ড' },
  backToLogin: { en: 'Back to login', bn: 'লগইনে ফিরে যান' },

  // Account nav
  myOrders: { en: 'My orders', bn: 'আমার অর্ডার' },
  ordersHint: { en: 'View your recent order history', bn: 'অর্ডারের সাম্প্রতিক ইতিহাস দেখুন' },
  myWishlist: { en: 'My Wishlist', bn: 'আমার ইচ্ছেতালিকা' },
  myAccount: { en: 'My Account', bn: 'আমার অ্যাকাউন্ট' },
  wishlist: { en: 'Wishlist', bn: 'ইচ্ছেতালিকা' },
  wishlistHint: { en: 'Save your favorite products', bn: 'পছন্দের পণ্য সংরক্ষণ করুন' },
  wishlistTitle: { en: 'My Wishlist', bn: 'আমার ইচ্ছেতালিকা' },
  wishlistSubtitle: { en: 'Your favorite products', bn: 'আপনার পছন্দের পণ্য' },
  wishlistLoginRequired: { en: 'Login to view your wishlist', bn: 'ইচ্ছেতালিকা দেখতে লগইন করুন' },
  adminDashboard: { en: 'Admin dashboard', bn: 'অ্যাডমিন ড্যাশবোর্ড' },
  adminPanel: { en: 'Admin Panel', bn: 'অ্যাডমিন প্যানেল' },

  // Account/profile fields
  name: { en: 'Name', bn: 'নাম' },
  email: { en: 'Email', bn: 'ইমেইল' },
  phone: { en: 'Phone', bn: 'ফোন' },
  address: { en: 'Address', bn: 'ঠিকানা' },
  joinedAt: { en: 'Joined on', bn: 'যোগদানের তারিখ' },
  profileInfo: { en: 'Profile information', bn: 'প্রোফাইলের তথ্য' },
  editPhoneAddress: { en: 'Edit phone & address', bn: 'ফোন ও ঠিকানা সম্পাদনা' },
  phonePlaceholder: { en: 'Phone number', bn: 'ফোন নম্বর' },
  addressPlaceholder: { en: 'Full address', bn: 'সম্পূর্ণ ঠিকানা' },
  recentOrdersTitle: { en: 'My orders', bn: 'আমার অর্ডার' },
  recentOrdersHint: { en: 'View your recent order history', bn: 'অর্ডারের সাম্প্রতিক ইতিহাস দেখুন' },
  ordersTitle: { en: 'My orders', bn: 'আমার অর্ডার' },
  ordersSubtitle: { en: 'Your recent purchases', bn: 'আপনার সাম্প্রতিক কেনাকাটার তালিকা' },
  backToProfile: { en: '← Back to profile', bn: '← প্রোফাইলে ফিরে যান' },
  loginToViewOrders: { en: 'Login to view your orders', bn: 'অর্ডার দেখতে লগইন করুন' },
  noOrdersYet: { en: 'No orders yet', bn: 'এখনও কোনো অর্ডার নেই' },
  noOrdersHint:
    {
      en: 'You have not ordered any products yet. Browse the art store and choose your favorite items.',
      bn: 'আপনি এখনও কোনো পণ্য অর্ডার করেননি। আর্ট স্টোর ঘুরে দেখুন এবং পছন্দের পণ্য বেছে নিন।',
    },
  seeAllProducts: { en: 'See all products', bn: 'সব পণ্য দেখুন' },
  cancelOrder: { en: 'Cancel order', bn: 'অর্ডার বাতিল করুন' },
  details: { en: 'Details', bn: 'বিস্তারিত' },
  moreItems: { en: '+ more', bn: '+ আরও' },

  // Settings card on account
  languageLabel: { en: 'Language', bn: 'ভাষা' },
  languageHint:
    {
      en: 'Choose how the site should read for you.',
      bn: 'সাইটের ভাষা নির্বাচন করুন।',
    },
  languageEnglish: { en: 'English', bn: 'ইংরেজি' },
  languageBengali: { en: 'Bengali', bn: 'বাংলা' },
  languageSaved:
    {
      en: 'Language preference saved',
      bn: 'ভাষার পছন্দ সংরক্ষণ করা হয়েছে',
    },

  // Toasts (generic) — success/info shown in many places
  loginSuccess: { en: 'Login successful', bn: 'লগইন সফল' },
  accountCreated: { en: 'Account created', bn: 'অ্যাকাউন্ট তৈরি হয়েছে' },
  loggedOut: { en: 'Logged out', bn: 'লগআউট হয়েছে' },
  profileUpdated: { en: 'Profile updated', bn: 'প্রোফাইল আপডেট হয়েছে' },
  profileUpdateFailed: { en: 'Profile update failed', bn: 'প্রোফাইল আপডেট ব্যর্থ' },
  accountLoadFailed: { en: 'Unable to load account', bn: 'অ্যাকাউন্ট লোড করা যায়নি' },
  accountSetupFailed: { en: 'Account setup failed', bn: 'অ্যাকাউন্ট তৈরি ব্যর্থ' },
  orderCancelled: { en: 'Order cancelled', bn: 'অর্ডার বাতিল হয়েছে' },
  orderCancelFailed: { en: 'Unable to cancel order', bn: 'অর্ডার বাতিল করা যায়নি' },
  ordersLoadFailed: { en: 'Unable to load orders', bn: 'অর্ডার লোড করা যায়নি' },
  orderDelivered: { en: 'Order delivered', bn: 'অর্ডার ডেলিভারি হয়েছে' },
  orderConfirmed: { en: 'Order confirmed', bn: 'অর্ডার নিশ্চিত হয়েছে' },
  orderCheckFailed: { en: 'Unable to check order updates', bn: 'অর্ডার আপডেট দেখা যাচ্ছে না' },
  removedFromWishlist: { en: 'Removed from wishlist', bn: 'ইচ্ছেতালিকা থেকে সরানো হয়েছে' },
  addToWishlistLogin: { en: 'Login to add to wishlist', bn: 'ইচ্ছেতালিকায় যোগ করতে লগইন করুন' },
  savedToWishlist: { en: 'Saved to wishlist', bn: 'ইচ্ছেতালিকায় সংরক্ষিত হয়েছে' },
  addedToCart: { en: 'Added to cart', bn: 'কার্টে যোগ হয়েছে' },

  // Section eyebrows / titles
  whyChooseEyebrow: { en: 'Why parents choose us', bn: 'কেন অভিভাবকরা আমাদের বেছে নেন' },
  whyChooseTitle: {
    en: 'Where little hands learn big things',
    bn: 'যেখানে ছোট হাত শেখে বড় কিছু',
  },
  whyChooseDescription:
    {
      en: 'Eight reasons why Loknath Art Centre is Bengal\'s most loved art school — for kids, teens, and aspiring artists.',
      bn: 'আটটি কারণে লোকনাথ আর্ট সেন্টার বাংলার সবচেয়ে প্রিয় আর্ট স্কুল — শিশু, কিশোর এবং উচ্চাকাঙ্ক্ষী শিল্পীদের জন্য।',
    },

  coursesEyebrow: { en: 'Our courses', bn: 'আমাদের কোর্সসমূহ' },
  coursesTitle: { en: '15 courses, one creative journey', bn: '১৫টি কোর্স। একটি সৃজনশীল যাত্রা।' },
  coursesDescription:
    {
      en: 'From basic drawing to professional fine arts — the right class for every age, level, and dream.',
      bn: 'বেসিক ড্রয়িং থেকে শুরু করে প্রোফেশনাল ফাইন আর্টস পর্যন্ত — প্রতিটি বয়স, স্তর ও স্বপ্নের জন্য উপযুক্ত ক্লাস।',
    },
  seeAllCourses: { en: 'See all courses', bn: 'সকল কোর্স দেখুন' },
  enrollNowCta: { en: 'Enroll now', bn: 'এখনই ভর্তি হোন' },
  learnMoreCta: { en: 'Learn more', bn: 'বিস্তারিত জানুন' },

  galleryEyebrow: { en: 'Student gallery', bn: 'ছাত্র-ছাত্রীদের গ্যালারি' },
  galleryTitle: { en: 'A canvas of young imaginations', bn: 'তরুণ কল্পনার একটি ক্যানভাস' },
  galleryDescription:
    {
      en: 'Every artwork here was made by a student — from tiny tots to talented teens.',
      bn: 'এখানে প্রতিটি শিল্পকর্ম একজন ছাত্র বা ছাত্রীর তৈরি — ছোট্ট শিশু থেকে প্রতিভাবান কিশোর-কিশোরী।',
    },
  artistPrefix: { en: 'Artist:', bn: 'শিল্পী:' },
  agePrefix: { en: 'age', bn: 'বয়স' },
  galleryDialogBody:
    {
      en: 'Each artwork is a testament to a creative journey at Loknath Art Centre. Every line tells a story of hours of practice and emotion.',
      bn: 'এই শিল্পকর্ম লোকনাথ আর্ট সেন্টারের সৃজনশীল যাত্রার একটি প্রমাণ। প্রতিটি শিল্পকর্ম একটি গল্প বলে এবং প্রতিটি রেখা ঘণ্টার অনুশীলন ও আবেগের প্রতিফলন।',
    },
  lightboxClose: { en: 'Close', bn: 'বন্ধ করুন' },

  featuredEyebrow: { en: 'Featured student work', bn: 'নির্বাচিত ছাত্র-ছাত্রীর কাজ' },
  featuredTitle: { en: 'Masterpieces made here', bn: 'তৈরি হওয়া মাস্টারপিস' },
  featuredDescription:
    {
      en: 'A curated collection of artwork by our most talented students.',
      bn: 'আমাদের সবচেয়ে প্রতিভাবান ছাত্র-ছাত্রীদের হাতে তৈরি নির্বাচিত শিল্পকর্ম।',
    },
  prevSlide: { en: 'Previous', bn: 'আগের' },
  nextSlide: { en: 'Next', bn: 'পরের' },
  slideAria: { en: 'Slide', bn: 'স্লাইড' },

  storeEyebrow: { en: 'New! Art store', bn: 'নতুন! আর্ট স্টোর' },
  storeTitleHome: { en: 'Premium supplies, affordable prices', bn: 'প্রিমিয়াম সরঞ্জাম, সাশ্রয়ী মূল্যে' },
  storeDescription:
    {
      en: 'From the same artist who teaches your kids. Curated supplies for students, hobbyists, and professionals.',
      bn: 'একই শিল্পীর কাছ থেকে যিনি আপনার সন্তানদের শেখান। ছাত্র-ছাত্রী, শখের শিল্পী ও পেশাদারদের জন্য বাছাই করা সরঞ্জাম।',
    },
  viewFullStore: { en: 'See full store', bn: 'সম্পূর্ণ স্টোর দেখুন' },
  addToCartCta: { en: 'Add to cart', bn: 'কার্টে যোগ করুন' },
  percentOff: { en: '% off', bn: '% ছাড়' },

  eventsEyebrow: { en: 'Upcoming events', bn: 'আসন্ন ইভেন্ট' },
  eventsTitle: { en: 'A celebration of creativity', bn: 'সৃজনশীলতার উদযাপন' },
  eventsDescription:
    {
      en: 'Competitions, workshops, camps and exhibitions — bringing our community together.',
      bn: 'প্রতিযোগিতা, কর্মশালা, ক্যাম্প ও প্রদর্শনী — যা আমাদের কমিউনিটিকে একত্রিত করে।',
    },

  testimonialsEyebrow: { en: 'From the families', bn: 'পরিবারের কথা' },
  testimonialsTitle: { en: 'Stories from the studio', bn: 'স্টুডিও থেকে গল্প' },
  testimonialsDescription:
    {
      en: 'The biggest reward is hearing how art has transformed a child\'s confidence and joy.',
      bn: 'সবচেয়ে বড় পুরস্কার হলো শুনতে পারা কীভাবে শিল্প একটি শিশুর আত্মবিশ্বাস ও আনন্দ বদলে দিয়েছে।',
    },

  blogEyebrow: { en: 'From the studio journal', bn: 'স্টুডিও জার্নাল থেকে' },
  blogTitle: { en: 'Tips, techniques & inspiration', bn: 'টিপস, কৌশল ও অনুপ্রেরণা' },
  blogDescription:
    {
      en: 'Written by our teachers — practical, inspiring, and beginner-friendly.',
      bn: 'আমাদের শিক্ষকের লেখা — বাস্তবসম্মত, অনুপ্রেরণামূলক এবং শিক্ষানবিস-বান্ধব।',
    },
  readArticle: { en: 'Read article', bn: 'নিবন্ধ পড়ুন' },

  faqEyebrow: { en: 'Frequently asked', bn: 'প্রায়শই জিজ্ঞাসিত' },
  faqTitle: { en: 'Got a question?', bn: 'কোনো প্রশ্ন?' },
  faqDescription:
    {
      en: 'Everything you want to know before joining the studio.',
      bn: 'স্টুডিওতে যোগ দেওয়ার আগে আপনার জানতে চাওয়া সবকিছু।',
    },

  // Contact form (flat keys — nested objects break the `ui` type)
  contactFormName: { en: 'Full name', bn: 'পুরো নাম' },
  contactFormPhone: { en: 'Phone number', bn: 'ফোন নম্বর' },
  contactFormEmail: { en: 'Email', bn: 'ইমেইল' },
  contactFormCourse: { en: 'Select a course', bn: 'কোর্স নির্বাচন করুন' },
  contactFormMessage: { en: 'Your message', bn: 'আপনার বার্তা' },
  contactFormPlaceholderName: { en: 'Your name', bn: 'আপনার নাম' },
  contactFormPlaceholderPhone: { en: '+91 ...', bn: '+৯১ ...' },
  contactFormPlaceholderEmail: { en: 'you@example.com', bn: 'you@example.com' },
  contactFormPlaceholderMessage: { en: 'Tell us a bit about your goals…', bn: 'আপনার লক্ষ্য সম্পর্কে একটু লিখুন...' },
  contactFormSubmit: { en: 'Send message', bn: 'বার্তা পাঠান' },
  contactFormSentToast: { en: 'Message sent!', bn: 'বার্তা পাঠানো হয়েছে!' },
  contactFormSentDescription: { en: 'We will reach out to you within 24 hours.', bn: 'আমরা ২৪ ঘণ্টার মধ্যে আপনার সাথে যোগাযোগ করব।' },
  contactFormCourseDefault: { en: 'Select a course', bn: 'একটি কোর্স নির্বাচন করুন' },
  contactFormMapTitle: { en: 'Loknath Art Centre location', bn: 'লোকনাথ আর্ট সেন্টারের অবস্থান' },

  // Navbar
  enrollNow: { en: 'Enroll now', bn: 'এখনই ভর্তি হোন' },
  phoneLabel: { en: 'Phone', bn: 'ফোন' },

  // Footer
  customerLogin: { en: 'Customer Login', bn: 'গ্রাহক লগইন' },
  adminLogin: { en: 'Admin Login', bn: 'অ্যাডমিন লগইন' },

  // Empty / error states
  emptyList: { en: 'Nothing to show yet.', bn: 'এখনও দেখানোর মতো কিছু নেই।' },
  somethingWentWrong: {
    en: 'Something went wrong. Please try again.',
    bn: 'কিছু সমস্যা হয়েছে। আবার চেষ্টা করুন।',
    },

  // Admin dashboard
  admin: { en: 'Admin', bn: 'অ্যাডমিন' },
  customer: { en: 'Customer', bn: 'গ্রাহক' },
  adminLoginRequired: { en: 'Admin account required', bn: 'অ্যাডমিন অ্যাকাউন্ট প্রয়োজন' },
  adminLoginButton: { en: 'Admin login', bn: 'অ্যাডমিন লগইন' },
  welcomeAdmin: { en: 'Welcome', bn: 'স্বাগতম' },
  totalStudents: { en: 'Total students', bn: 'মোট ছাত্র-ছাত্রী' },
  activeCourses: { en: 'Active courses', bn: 'সক্রিয় কোর্স' },
  totalOrders: { en: 'Total orders', bn: 'মোট অর্ডার' },
  totalIncome: { en: 'Total income', bn: 'মোট আয়' },
  recentOrdersBtn: { en: 'See recent orders', bn: 'সাম্প্রতিক অর্ডার দেখুন' },
  quickActions: { en: 'Quick actions', bn: 'দ্রুত অ্যাকশন' },
  recentOrders: { en: 'Recent orders', bn: 'সাম্প্রতিক অর্ডার' },
  noRecentOrders: { en: 'No new orders yet.', bn: 'এখনও কোনো নতুন অর্ডার নেই।' },
  backToHome: { en: '← Back to home', bn: '← হোমে ফিরে যান' },
  totalIncomeCard: { en: 'Total income', bn: 'মোট আয়' },
  totalIncomeDesc: {
    en: 'Student fees, confirmed online payments, and delivered COD.',
    bn: 'ছাত্রদের ফি, নিশ্চিত অনলাইন পেমেন্ট এবং ডেলিভারি হওয়া ক্যাশ অন ডেলিভারি।',
  },
  pendingIncome: { en: 'Pending income', bn: 'বকেয়া আয়' },
  pendingIncomeDesc: {
    en: 'Cash on Delivery orders not yet delivered.',
    bn: 'ক্যাশ অন ডেলিভারি অর্ডার যা এখনও ডেলিভারি হয়নি।',
  },
  addNewCourse: { en: 'Add new course', bn: 'নতুন কোর্স যোগ করুন' },
  eventManagement: { en: 'Manage events', bn: 'ইভেন্ট পরিচালনা' },
  studentList: { en: 'Student list', bn: 'ছাত্র তালিকা' },
  blogPosts: { en: 'Blog posts', bn: 'ব্লগ পোস্ট' },
  productManagement: { en: 'Product management', bn: 'পণ্য ম্যানেজমেন্ট' },
  reports: { en: 'Reports', bn: 'রিপোর্ট' },
  studentInfo: { en: 'Student info', bn: 'ছাত্র তথ্য' },
  incomeReport: { en: 'Income report', bn: 'আয় রিপোর্ট' },
  upiSettings: { en: 'UPI settings', bn: 'UPI সেটিংস' },
  courseManagement: { en: 'Course management', bn: 'কোর্স পরিচালনা' },
  eventPanelTitle: { en: 'Events & ongoing courses', bn: 'ইভেন্ট ও চলমান কোর্স পরিচালনা' },
  courseNamePlaceholder: { en: 'Course name', bn: 'কোর্সের নাম' },
  durationPlaceholder: { en: 'Duration', bn: 'সময়কাল' },
  monthlyFeePlaceholder: { en: 'Monthly fee', bn: 'মাসিক ফি' },
  courseDetailsPlaceholder: { en: 'Course details', bn: 'কোর্সের বিস্তারিত' },
  updateCourse: { en: 'Update course', bn: 'কোর্স আপডেট করুন' },
  saveNewCourse: { en: 'Save new course', bn: 'নতুন কোর্স সংরক্ষণ করুন' },
  savingCourse: { en: 'Saving course…', bn: 'সংরক্ষণ হচ্ছে…' },
  noCoursesYet: { en: 'No courses added yet.', bn: 'কোনো কোর্স যোগ করা হয়নি।' },
  visibleOnWebsite: { en: 'Visible on site', bn: 'ওয়েবসাইটে দেখাচ্ছে' },
  hiddenLabel: { en: 'Hidden', bn: 'লুকানো' },
  hideFromWebsite: { en: 'Hide from site', bn: 'ওয়েবসাইট থেকে লুকান' },
  showOnWebsite: { en: 'Show on site', bn: 'ওয়েবসাইটে দেখান' },
  showLabel: { en: 'Show', bn: 'দেখান' },
  saving: { en: 'Saving…', bn: 'সংরক্ষণ হচ্ছে…' },
  visibleOnSite: { en: 'Visible on site', bn: 'ওয়েবসাইটে দেখাচ্ছে' },
  hidden: { en: 'Hidden', bn: 'লুকানো' },
  hideFromSite: { en: 'Hide from site', bn: 'ওয়েবসাইট থেকে লুকান' },
  showOnSite: { en: 'Show on site', bn: 'ওয়েবসাইটে দেখান' },
  showAction: { en: 'Show', bn: 'দেখান' },
  hideAction: { en: 'Hide', bn: 'লুকান' },
  noCourses: { en: 'No courses added yet.', bn: 'কোনো কোর্স যোগ করা হয়নি।' },
  courseSaved: { en: 'Course saved', bn: 'কোর্স সংরক্ষণ হয়েছে' },
  courseUpdated: { en: 'Course updated', bn: 'কোর্স আপডেট হয়েছে' },
  courseAdded: { en: 'New course added', bn: 'নতুন কোর্স যোগ হয়েছে' },
  courseVisibilityOn: { en: 'Course visible', bn: 'কোর্স দৃশ্যমান করা হয়েছে' },
  courseVisibilityOff: { en: 'Course hidden', bn: 'কোর্স লুকানো হয়েছে' },
  courseDeleted: { en: 'Course deleted', bn: 'কোর্স মুছে ফেলা হয়েছে' },
  confirmDeleteCourse: { en: 'Delete this course?', bn: 'এই কোর্সটি মুছে ফেলতে চান?' },
  deleteFailed: { en: 'Delete failed', bn: 'মুছে ফেলা ব্যর্থ' },
  saveFailed: { en: 'Save failed', bn: 'সংরক্ষণ ব্যর্থ' },
  toggleFailed: { en: 'Toggle failed', bn: 'টগল ব্যর্থ' },
  loadFailed: { en: 'Load failed', bn: 'লোড ব্যর্থ' },
  pleaseTryAgain: { en: 'Please try again', bn: 'অনুগ্রহ করে আবার চেষ্টা করুন' },
  courseLoadFailed: { en: 'Failed to load courses', bn: 'কোর্স লোড ব্যর্থ' },

  eventTitlePlaceholder: { en: 'Event / course name', bn: 'ইভেন্ট / কোর্সের নাম' },
  eventDetailsPlaceholder: { en: 'Time, place and details', bn: 'সময়, স্থান এবং বিস্তারিত' },
  addEvent: { en: 'Add event', bn: 'ইভেন্ট যোগ করুন' },
  updateEvent: { en: 'Update event', bn: 'ইভেন্ট আপডেট করুন' },
  noEvents: { en: 'No events yet.', bn: 'কোনো ইভেন্ট নেই।' },

  // Student panel (admin)
  studentNamePlaceholder: { en: 'Student name', bn: 'ছাত্রের নাম' },
  villagePlaceholder: { en: 'Village', bn: 'গ্রাম' },
  coursePlaceholder: { en: 'Course', bn: 'কোর্স' },
  addStudent: { en: 'Add student', bn: 'ছাত্র যোগ করুন' },
  updateStudent: { en: 'Update student', bn: 'ছাত্র আপডেট করুন' },
  allVillages: { en: 'All villages', bn: 'সব গ্রাম' },
  feeColumn: { en: 'Fee', bn: 'ফি' },
  confirmFeeColumn: { en: 'Confirm fee', bn: 'ফি নিশ্চিত করুন' },
  studentAdded: { en: 'Student added', bn: 'ছাত্র যোগ হয়েছে' },
  studentUpdated: { en: 'Student updated', bn: 'ছাত্র আপডেট হয়েছে' },
  studentDeleted: { en: 'Student deleted', bn: 'ছাত্র মুছে ফেলা হয়েছে' },
  confirmDeleteStudent: { en: 'Delete this student?', bn: 'এই ছাত্রকে মুছতে চান?' },

  // Blog panel (admin)
  blogTitlePlaceholder: { en: 'Post title', bn: 'পোস্টের শিরোনাম' },
  blogCategoryPlaceholder: { en: 'Category', bn: 'বিভাগ' },
  blogContentPlaceholder: { en: 'Write the blog', bn: 'ব্লগের লেখা' },
  publishPost: { en: 'Publish post', bn: 'পোস্ট প্রকাশ করুন' },
  updatePost: { en: 'Update post', bn: 'পোস্ট আপডেট করুন' },
  noBlogPosts: { en: 'No blog posts yet.', bn: 'এখনও কোনো ব্লগ পোস্ট নেই।' },

  // Product panel (admin)
  productNamePlaceholder: { en: 'Product name', bn: 'পণ্যের নাম' },
  productCategoryPlaceholder: { en: 'Category', bn: 'বিভাগ' },
  pricePlaceholder: { en: 'Price', bn: 'মূল্য' },
  stockPlaceholder: { en: 'Stock', bn: 'স্টক' },
  addProduct: { en: 'Add product', bn: 'পণ্য যোগ করুন' },
  updateProduct: { en: 'Update product', bn: 'পণ্য আপডেট করুন' },
  noProducts: { en: 'No products added yet.', bn: 'এখনও কোনো পণ্য যোগ করা হয়নি।' },

  // Reports
  customerReport: { en: 'Customer report', bn: 'কাস্টমার রিপোর্ট' },
  customerReportNote: { en: 'Total online customers and orders', bn: 'মোট অনলাইন ক্রেতা ও অর্ডার' },
  productReport: { en: 'Product report', bn: 'পণ্য রিপোর্ট' },
  productReportNote: { en: 'Top product by stock', bn: 'স্টক অনুযায়ী জনপ্রিয় পণ্য' },
  noData: { en: 'No data', bn: 'ডেটা নেই' },
  studentReport: { en: 'Student report', bn: 'ছাত্র রিপোর্ট' },
  studentReportNote: { en: 'Students paying every month', bn: 'সব মাসে ফি প্রদানকারী ছাত্র' },
  incomeComparison: { en: 'Income comparison', bn: 'আয়ের তুলনা' },
  studentFeeIncome: { en: 'Student fees', bn: 'ছাত্রদের মাসিক ফি' },
  productSalesIncome: { en: 'Product sales', bn: 'পণ্য বিক্রি' },
  higherIncome: { en: 'Higher income:', bn: 'বেশি আয়:' },
  higherIncomeStudent: { en: 'Student fees', bn: 'ছাত্রদের ফি' },
  higherIncomeProduct: { en: 'Product sales', bn: 'পণ্য বিক্রি' },

  // Settings (UPI)
  upiTitle: { en: 'UPI payment settings', bn: 'UPI পেমেন্ট সেটিংস' },
  upiIntro: {
    en: 'Set your UPI ID here. Customers will pay to this UPI and a QR code is generated automatically.',
    bn: 'এখানে আপনার UPI ID সেট করুন। গ্রাহকরা এই UPI-তে পেমেন্ট করবেন এবং QR কোড স্বয়ংক্রিয়ভাবে তৈরি হবে।',
  },
  upiIdLabel: { en: 'Your UPI ID', bn: 'আপনার UPI ID' },
  upiIdPlaceholder: { en: 'e.g. loknathartcenter@okhdfcbank', bn: 'উদাহরণ: loknathartcenter@okhdfcbank' },
  upiIdHint: { en: 'UPI ID from your UPI app (e.g. name@bankname)', bn: 'আপনার UPI অ্যাপ থেকে পাওয়া UPI ID (যেমন: name@bankname)' },
  businessNameLabel: { en: 'Business name (shown in QR code)', bn: 'ব্যবসার নাম (QR কোডে দেখাবে)' },
  businessNamePlaceholder: { en: 'Lokenath Art Center', bn: 'Lokenath Art Center' },
  upiPreview: { en: 'Preview', bn: 'পূর্বরূপ' },
  upiPreviewShows: { en: 'Will show in QR code:', bn: 'QR কোডে দেখাবে:' },
  upiSaved: { en: 'UPI settings saved successfully!', bn: 'UPI সেটিংস সফলভাবে সংরক্ষিত হয়েছে!' },
  saveSettings: { en: 'Save settings', bn: 'সেটিংস সংরক্ষণ করুন' },
  howItWorks: { en: 'How does it work?', bn: 'কিভাবে কাজ করে?' },
  howItWorksStep1: { en: '1. Enter your UPI ID above (e.g. yourname@oksbi)', bn: '1. উপরে আপনার UPI ID দিন (যেমন: yourname@oksbi)' },
  howItWorksStep2: { en: '2. Save the settings', bn: '2. সেটিংস সংরক্ষণ করুন' },
  howItWorksStep3: { en: '3. Customers scan the QR code to pay', bn: '3. গ্রাহকরা QR স্ক্যান করে পেমেন্ট করতে পারবেন' },
  howItWorksStep4: { en: '4. Money goes directly to your bank account', bn: '4. টাকা সরাসরি আপনার ব্যাংক অ্যাকাউন্টে যাবে' },
  dbConnectionIssue: { en: 'Database connection issue. Please create the Supabase table.', bn: 'ডেটাবেস সংযোগ সমস্যা। অনুগ্রহ করে Supabase টেবিল তৈরি করুন।' },
  settingsSaveFailed: { en: 'Could not save settings.', bn: 'সেটিংস সংরক্ষণে সমস্যা হয়েছে।' },

  // Order dialog
  orderDialogTitle: { en: 'Order details ·', bn: 'অর্ডার বিস্তারিত ·' },
  productDetailsTitle: { en: 'Product details', bn: 'পণ্যের বিবরণ' },
  totalLabel: { en: 'Total:', bn: 'মোট:' },
  customerDetailsTitle: { en: 'Customer details', bn: 'গ্রাহকের বিবরণ' },
  customerNameLabel: { en: 'Name:', bn: 'নাম:' },
  customerPhoneLabel: { en: 'Phone:', bn: 'ফোন:' },
  customerEmailLabel: { en: 'Email:', bn: 'ইমেল:' },
  customerAddressLabel: { en: 'Address:', bn: 'ঠিকানা:' },
  orderDateLabel: { en: 'Order date:', bn: 'অর্ডারের তারিখ:' },
  paymentLabel: { en: 'Payment:', bn: 'পেমেন্ট:' },
  notesLabel: { en: 'Notes:', bn: 'নোট:' },
  deliveryDateLabel: { en: 'Delivery date', bn: 'ডেলিভারির তারিখ' },
  confirmOrder: { en: 'Confirm order', bn: 'অর্ডার নিশ্চিত করুন' },
  cancelOrderAction: { en: 'Cancel order', bn: 'অর্ডার বাতিল করুন' },
  currentStatus: { en: 'Current status:', bn: 'বর্তমান অবস্থা:' },
  noOrdersAdmin: { en: 'No orders yet.', bn: 'কোনো অর্ডার নেই।' },
  cancelledByAdmin: { en: 'This order was cancelled by the admin.', bn: 'এই অর্ডার অ্যাডমিন কর্তৃক বাতিল হয়েছে।' },
  cancelledByCustomer: { en: 'This order was cancelled by the customer.', bn: 'এই অর্ডার গ্রাহক কর্তৃক বাতিল হয়েছে।' },

  // Order statuses
  statusNewOrder: { en: 'New Order', bn: 'নতুন অর্ডার' },
  statusProcessing: { en: 'Processing', bn: 'প্রক্রিয়াধীন' },
  statusDelivered: { en: 'Delivered', bn: 'ডেলিভারি হয়েছে' },
  statusConfirmed: { en: 'Confirmed', bn: 'নিশ্চিত' },
  statusCancelled: { en: 'Cancelled', bn: 'বাতিল' },

  // Image upload
  uploadImage: { en: 'Upload image', bn: 'ছবি আপলোড করুন' },

  // Student details panel
  studentPanelDbTitle: { en: 'Student info (database)', bn: 'ছাত্র তথ্য (ডেটাবেস)' },
  studentDbIntro: { en: 'This info is stored in the database and updates in real time.', bn: 'এই তথ্য ডেটাবেসে সংরক্ষিত হবে এবং রিয়েল-টাইম আপডেট হবে।' },
  studentEmailPlaceholder: { en: 'Email', bn: 'ইমেল' },
  admissionDate: { en: 'Admission date', bn: 'ভর্তির তারিখ' },
  notesPlaceholder: { en: 'Notes', bn: 'নোট' },
  statusAll: { en: 'All', bn: 'সব' },
  statusActive: { en: 'Active', bn: 'সক্রিয়' },
  statusInactive: { en: 'Inactive', bn: 'নিষ্ক্রিয়' },
  statusCompleted: { en: 'Completed', bn: 'সম্পন্ন' },
  statusPending: { en: 'Pending', bn: 'বাকি' },
  statusFailed: { en: 'Failed', bn: 'ব্যর্থ' },
  monthsColumn: { en: 'Months', bn: 'মাস' },
  statusColumn: { en: 'Status', bn: 'স্ট্যাটাস' },
  add: { en: 'Add', bn: 'যোগ করুন' },
  updated: { en: 'Updated', bn: 'আপডেট হয়েছে' },
  added: { en: 'Added', bn: 'যোগ হয়েছে' },
  deleted: { en: 'Deleted', bn: 'মুছে ফেলা হয়েছে' },
  problemOccurred: { en: 'A problem occurred', bn: 'সমস্যা হয়েছে' },
  noStudents: { en: 'No students yet.', bn: 'কোনো ছাত্র নেই।' },

  // Income report panel
  incomePanelTitle: { en: 'Income report (database)', bn: 'আয় রিপোর্ট (ডেটাবেস)' },
  incomeDbIntro: { en: 'This info is stored in the database and updates in real time.', bn: 'এই তথ্য ডেটাবেসে সংরক্ষিত হবে এবং রিয়েল-টাইম আপডেট হবে।' },
  incomeTypeStudentFee: { en: 'Student fee', bn: 'ছাত্র ফি' },
  incomeTypeProductSale: { en: 'Product sale', bn: 'পণ্য বিক্রি' },
  incomeTypeCourseFee: { en: 'Course fee', bn: 'কোর্স ফি' },
  incomeTypeOther: { en: 'Other', bn: 'অন্যান্য' },
  amountPlaceholder: { en: 'Amount', bn: 'টাকার পরিমাণ' },
  paymentMethodPlaceholder: { en: 'Payment method (UPI/Cash)', bn: 'পেমেন্ট মাধ্যম (UPI/Cash)' },
  descriptionPlaceholder: { en: 'Description', bn: 'বিবরণ' },
  referenceIdPlaceholder: { en: 'Reference ID (order ID)', bn: 'রেফারেন্স ID (অর্ডার ID)' },
  filterToday: { en: 'Today', bn: 'আজ' },
  filterThisMonth: { en: 'This month', bn: 'এই মাস' },
  dateColumn: { en: 'Date', bn: 'তারিখ' },
  typeColumn: { en: 'Type', bn: 'ধরন' },
  descriptionColumn: { en: 'Description', bn: 'বিবরণ' },
  referenceColumn: { en: 'Reference', bn: 'রেফারেন্স' },
  paymentColumn: { en: 'Payment', bn: 'পেমেন্ট' },
  amountColumn: { en: 'Amount', bn: 'টাকা' },
  confirmDeleteGeneric: { en: 'Delete?', bn: 'মুছতে চান?' },
  noIncome: { en: 'No income yet.', bn: 'কোনো আয় নেই।' },
  totalIncomeShort: { en: 'Total income', bn: 'মোট আয়' },

  // Payment methods (order)
  paymentCod: { en: 'Cash on Delivery', bn: 'ক্যাশ অন ডেলিভারি' },

  // Coming-soon delivery message template
  deliveryComingMsg: {
    en: 'Your order {products} is coming on {date}.',
    bn: 'আপনার অর্ডার {products} {date} তারিখে আসছে।',
  },

  // Order detail headers (admin panel sidebar)
  storeOps: { en: 'Store operations', bn: 'স্টোর পরিচালনা' },
  totalOrdersColumn: { en: 'total orders', bn: 'মোট অর্ডার' },
  noCustomerOrders: { en: 'No customer orders have been placed yet.', bn: 'কোনো গ্রাহক অর্ডার এখনও করা হয়নি।' },

  orderColumn: { en: 'Order', bn: 'অর্ডার' },
  customerColumn: { en: 'Customer', bn: 'গ্রাহক' },
  contactAddressColumn: { en: 'Contact & address', bn: 'যোগাযোগ ও ঠিকানা' },
  productsColumn: { en: 'Products', bn: 'পণ্য' },
  deliveryMessageColumn: { en: 'Delivery & message', bn: 'ডেলিভারি ও বার্তা' },
  manage: { en: 'Manage', bn: 'পরিচালনা' },

  // ===== Store: page-level UI =====
  storeTitle: { en: 'Colors & Brushes', bn: 'রঙ তুলি' },
  storeSubtitle:
    {
      en: "A complete collection of artist supplies. Premium quality art materials at fair prices.",
      bn: 'শিল্পীর সরঞ্জামের সম্পূর্ণ সংগ্রহ। প্রিমিয়াম মানের আর্ট উপকরণ, সাশ্রয়ী মূল্যে।',
    },
  storeFreeDelivery: { en: 'Free delivery', bn: 'বিনামূল্যে ডেলিভারি' },
  storeQualityGuarantee: { en: '100% quality guarantee', bn: '১০০% মান নিশ্চিত' },
  storeFilter: { en: 'Filter', bn: 'ফিল্টার' },
  storeCart: { en: 'Cart', bn: 'কার্ট' },
  storeWishlist: { en: 'Wishlist', bn: 'পছন্দ' },
  storeAllCategory: { en: 'View all', bn: 'সব দেখুন' },
  storeSearchPlaceholder: { en: 'Search products...', bn: 'পণ্য খুঁজুন...' },
  storeProductsCount: { en: 'products', bn: 'পণ্য' },
  storeNoProducts: { en: 'No products found', bn: 'কোনো পণ্য পাওয়া যায়নি' },
  storeSeeAll: { en: 'See all products', bn: 'সব পণ্য দেখুন' },
  storeAddToCart: { en: 'Add to cart', bn: 'কার্টে যোগ করুন' },
  storeRemoveFromCart: { en: 'Remove from cart', bn: 'কার্ট থেকে সরান' },
  storeAddedToCart: { en: 'Added to cart', bn: 'কার্টে যোগ হয়েছে' },
  storeLoginToWishlist: { en: 'Login to add to wishlist', bn: 'ইচ্ছেতালিকায় যোগ করতে লগইন করুন' },
  storeSavedToWishlist: { en: 'Added to wishlist', bn: 'ইচ্ছেতালিকায় যোগ হয়েছে' },
  storeAlreadyInWishlist: { en: 'Already in wishlist', bn: 'এই পণ্য ইচ্ছেতালিকায় আছে' },
  storePercentOff: { en: '% off', bn: '% ছাড়' },

  // ===== Store: cart & wishlist sidebars =====
  storeYourCart: { en: 'Your cart', bn: 'আপনার কার্ট' },
  storeYourWishlist: { en: 'Your wishlist', bn: 'আপনার পছন্দ' },
  storeCartEmpty: { en: 'Your cart is empty', bn: 'আপনার কার্ট খালি' },
  storeCartEmptyHint: { en: 'Add some products to get started', bn: 'কিছু পণ্য যোগ করুন' },
  storeWishlistEmpty: { en: 'Your wishlist is empty', bn: 'আপনার পছন্দ খালি' },
  storeWishlistEmptyHint: { en: 'Add your favorite products', bn: 'পছন্দের পণ্য যোগ করুন' },
  storeTotal: { en: 'Total', bn: 'মোট' },
  storeConfirmOrder: { en: 'Place order', bn: 'অর্ডার নিশ্চিত করুন' },
  storeLoading: { en: 'Art Store is loading...', bn: 'আর্ট স্টোর লোড হচ্ছে...' },

  // ===== Store: feature tiles =====
  storeFeatureFastDelivery: { en: 'Fast delivery', bn: 'দ্রুত ডেলিভারি' },
  storeFeatureFastDeliveryDesc: { en: 'In 3-5 days', bn: '৩-৫ দিনে' },
  storeFeatureCod: { en: 'Cash on delivery', bn: 'ক্যাশ অন ডেলিভারি' },
  storeFeatureCodDesc: { en: 'Safe payment', bn: 'নিরাপদ পেমেন্ট' },
  storeFeatureQuality: { en: 'Quality assured', bn: 'মান নিশ্চিত' },
  storeFeatureQualityDesc: { en: '100% guarantee', bn: '১০০% গ্যারান্টি' },
  storeFeatureRange: { en: '500+ products', bn: '৫০০+ পণ্য' },
  storeFeatureRangeDesc: { en: 'Wide selection', bn: 'বিস্তৃত পরিসর' },
  storeFeatureReturns: { en: 'Easy returns', bn: 'সহজ রিটার্ন' },
  storeFeatureReturnsDesc: { en: '7-day policy', bn: '৭ দিন নীতি' },
  storeFeatureSupport: { en: '24/7 support', bn: '২৪/৭ সাপোর্ট' },
  storeFeatureSupportDesc: { en: 'Anytime', bn: 'যেকোনো সময়' },

  // ===== Store: product badges =====
  badgeBestSeller: { en: 'Best Seller', bn: 'সর্বাধিক বিক্রিত' },
  badgeNewArrival: { en: 'New Arrival', bn: 'নতুন আগমন' },
  badgeLimitedOffer: { en: 'Limited Offer', bn: 'সীমিত অফার' },

  // ===== Store: product names (English for default) =====
  productP1Name: { en: 'Premium Watercolor Set (24 colors)', bn: 'প্রিমিয়াম ওয়াটারকালার সেট (২৪ রঙ)' },
  productP2Name: { en: 'Professional Brush Set (12 pieces)', bn: 'প্রফেশনাল ব্রাশ সেট (১২টি)' },
  productP3Name: { en: 'Canvas Board Pack (5 pieces)', bn: 'ক্যানভাস বোর্ড প্যাক (৫টি)' },
  productP4Name: { en: 'Artist Oil Color (12 tubes)', bn: 'আর্টিস্ট অয়েল কালার (১২টি টিউব)' },
  productP5Name: { en: 'Professional Sketch Book A4', bn: 'প্রফেশনাল স্কেচ বুক এ৪' },
  productP6Name: { en: 'Acrylic Color Set (18 shades)', bn: 'অ্যাক্রিলিক কালার সেট (১৮ শেড)' },
  productP7Name: { en: 'Soft Pastels (36 colors)', bn: 'সফট পাস্তেল (৩৬ রঙ)' },
  productP8Name: { en: 'Kids Art Kit (50+ items)', bn: 'কিডস আর্ট কিট (৫০+ আইটেম)' },
  productP9Name: { en: 'Pencil Set (24 pieces)', bn: 'পেন্সিল সেট (২৪টি)' },
  productP10Name: { en: 'Canvas Roll (10 meters)', bn: 'ক্যানভাস রোল (১০ মিটার)' },
  productP11Name: { en: 'Poster Color Set (24 colors)', bn: 'পোস্টার কালার সেট (২৪ রঙ)' },
  productP12Name: { en: 'Professional Palette', bn: 'প্রফেশনাল প্যালেট' },

  // ===== Store: product categories =====
  catWatercolor: { en: 'Watercolor', bn: 'ওয়াটারকালার' },
  catOilColor: { en: 'Oil Color', bn: 'অয়েল কালার' },
  catAcrylic: { en: 'Acrylic', bn: 'অ্যাক্রিলিক' },
  catPencil: { en: 'Pencils', bn: 'পেন্সিল' },
  catBrush: { en: 'Brushes', bn: 'ব্রাশ' },
  catCanvas: { en: 'Canvas', bn: 'ক্যানভাস' },
  catSketchBook: { en: 'Sketch Book', bn: 'স্কেচ বুক' },
  catPastel: { en: 'Pastels', bn: 'পাস্তেল' },
  catKidsArt: { en: 'Kids Art', bn: 'কিডস আর্ট' },
  catPosterColor: { en: 'Poster Color', bn: 'পোস্টার কালার' },
  catPalette: { en: 'Palette', bn: 'প্যালেট' },

  // ===== Hero & home =====
  ratingValue: { en: '4.9', bn: '৪.৯' },
  studentsCountShort: { en: '500+', bn: '৫০০+' },

  // ===== About =====
  artistNameLabel: { en: 'Artist - Rakhal Mukhopadhyay', bn: 'শিল্পী - রাখাল মুখোপাধ্যায়' },
  artistImageAlt: { en: 'Rakhal Mukhopadhyay - Artist', bn: 'রাখাল মুখোপাধ্যায় - শিল্পী' },

  // ===== Blog category colors (CSS key) =====
  blogCategoryWatercolor: { en: 'Watercolour Guide', bn: 'ওয়াটারকালার গাইড' },
  blogCategoryCareer: { en: 'Art Career', bn: 'আর্ট ক্যারিয়ার' },
  blogCategorySketch: { en: 'Sketching Tips', bn: 'স্কেচিং কৌশল' },
  blogCategoryOil: { en: 'Oil Painting Tips', bn: 'অয়েল পেইন্টিং টিপস' },
  blogCategoryDrawing: { en: 'Drawing Tips', bn: 'আঁকার টিপস' },
  blogCategoryKids: { en: "Kids' Creativity", bn: 'শিশুদের সৃজনশীলতা' },

  // ===== Course level (CSS-key union) =====
  levelBeginner: { en: 'Beginner', bn: 'শুরু' },
  levelIntermediate: { en: 'Intermediate', bn: 'মধ্যম' },
  levelAdvanced: { en: 'Advanced', bn: 'উচ্চ' },
  levelAll: { en: 'All Levels', bn: 'সকল স্তর' },

  // ===== Event type (CSS-key union) =====
  eventTypeCompetition: { en: 'Competition', bn: 'প্রতিযোগিতা' },
  eventTypeWorkshop: { en: 'Workshop', bn: 'কর্মশালা' },
  eventTypeExhibition: { en: 'Exhibition', bn: 'প্রদর্শনী' },
  eventTypeCamp: { en: 'Camp', bn: 'ক্যাম্প' },

  // ===== Gallery category (English mirrors) =====
  galleryCatAll: { en: 'View all', bn: 'সব দেখুন' },
  galleryCatWatercolor: { en: 'Watercolor', bn: 'ওয়াটারকালার' },
  galleryCatOil: { en: 'Oil Painting', bn: 'অয়েল পেইন্টিং' },
  galleryCatPencil: { en: 'Pencil Sketch', bn: 'পেন্সিল স্কেচ' },
  galleryCatPortrait: { en: 'Portrait', bn: 'পোর্ট্রেট' },
  galleryCatLandscape: { en: 'Landscape', bn: 'ল্যান্ডস্কেপ' },
  galleryCatCollage: { en: 'Collage', bn: 'কোলাজ' },
  galleryCatHandmade: { en: 'Handmade', bn: 'হাতের কাজ' },
  galleryCatCanvas: { en: 'Canvas', bn: 'ক্যানভাস' },
  galleryCatStillLife: { en: 'Still Life', bn: 'স্টিল লাইফ' },
  galleryCatNature: { en: 'Nature', bn: 'প্রকৃতি' },
  galleryCatKidsArt: { en: "Kids' Art", bn: 'শিশুদের শিল্প' },
  galleryCatFestival: { en: 'Festival Art', bn: 'উৎসবের শিল্প' },

  // ===== Testimonial role union =====
  roleParent: { en: 'Parent', bn: 'অভিভাবক' },
  roleStudent: { en: 'Student', bn: 'ছাত্র' },
  roleStudentFemale: { en: 'Student', bn: 'ছাত্রী' },

  // ===== Contact form (course dropdown) =====
  contactFormOptionDefault: { en: 'Select a course', bn: 'একটি কোর্স নির্বাচন করুন' },
  contactFormOptionBasic: { en: 'Basic Drawing', bn: 'বেসিক ড্রয়িং' },
  contactFormOptionWatercolor: { en: 'Watercolour Painting', bn: 'ওয়াটারকালার পেইন্টিং' },
  contactFormOptionOil: { en: 'Oil Painting', bn: 'অয়েল পেইন্টিং' },
  contactFormOptionPortrait: { en: 'Portrait Drawing', bn: 'পোর্ট্রেট ড্রয়িং' },
  contactFormOptionKids: { en: 'Kids Art', bn: 'কিডস আর্ট' },
  contactFormOptionProfessional: { en: 'Professional Fine Arts', bn: 'প্রফেশনাল ফাইন আর্টস' },

  // ===== Admin (table headers & buttons) =====
  adminTableName: { en: 'Name', bn: 'নাম' },
  adminTablePhone: { en: 'Phone', bn: 'ফোন' },
  adminTableVillage: { en: 'Village', bn: 'গ্রাম' },
  adminTableCourse: { en: 'Course', bn: 'কোর্স' },
  adminTableFee: { en: 'Fee', bn: 'ফি' },
  adminTableDate: { en: 'Date', bn: 'তারিখ' },
  adminTableType: { en: 'Type', bn: 'ধরন' },
  adminTableDescription: { en: 'Description', bn: 'বিবরণ' },
  adminTableReference: { en: 'Reference', bn: 'রেফারেন্স' },
  adminTablePayment: { en: 'Payment', bn: 'পেমেন্ট' },
  adminTableAmount: { en: 'Amount', bn: 'টাকা' },
  adminFilterAll: { en: 'All', bn: 'সব' },
  adminFilterToday: { en: 'Today', bn: 'আজ' },
  adminFilterThisMonth: { en: 'This month', bn: 'এই মাস' },
  adminStatusActive: { en: 'Active', bn: 'সক্রিয়' },
  adminStatusInactive: { en: 'Inactive', bn: 'নিষ্ক্রিয়' },
  adminStatusCompleted: { en: 'Completed', bn: 'সম্পন্ন' },
  adminStatusPending: { en: 'Pending', bn: 'বাকি' },
  adminStatusFailed: { en: 'Failed', bn: 'ব্যর্থ' },
  adminIncomeTypeStudentFee: { en: 'Student fee', bn: 'ছাত্র ফি' },
  adminIncomeTypeProductSale: { en: 'Product sale', bn: 'পণ্য বিক্রি' },
  adminIncomeTypeCourseFee: { en: 'Course fee', bn: 'কোর্স ফি' },
  adminIncomeTypeOther: { en: 'Other', bn: 'অন্যান্য' },
  adminToastCourseLoadFailed: { en: 'Failed to load courses', bn: 'কোর্স লোড ব্যর্থ' },
  adminToastTryAgain: { en: 'Please try again', bn: 'অনুগ্রহ করে আবার চেষ্টা করুন' },
  adminToastSaveFailed: { en: 'Save failed', bn: 'সংরক্ষণ ব্যর্থ' },
  adminToastDeleteFailed: { en: 'Delete failed', bn: 'মুছে ফেলা ব্যর্থ' },
  adminToastProblemOccurred: { en: 'A problem occurred', bn: 'সমস্যা হয়েছে' },
  adminOrderManagementTitle: { en: 'Order management', bn: 'অর্ডার পরিচালনা' },
  adminOrderManagementHint:
    {
      en: 'Click an order to see the full product and customer information.',
      bn: 'অর্ডারে ক্লিক করে পণ্য ও গ্রাহকের সম্পূর্ণ তথ্য দেখুন।',
    },
  adminConfirmDeleteCourse: { en: 'Delete this course?', bn: 'এই কোর্সটি মুছে ফেলতে চান?' },
  adminConfirmDeleteStudent: { en: 'Delete this student?', bn: 'এই ছাত্রকে মুছতে চান?' },
  adminConfirmDeleteGeneric: { en: 'Delete?', bn: 'মুছতে চান?' },
  adminCancel: { en: 'Cancel', bn: 'বাতিল' },
  adminCourseSaved: { en: 'Course saved', bn: 'কোর্স সংরক্ষণ হয়েছে' },
  adminCourseUpdated: { en: 'Course updated', bn: 'কোর্স আপডেট হয়েছে' },
  adminCourseAdded: { en: 'New course added', bn: 'নতুন কোর্স যোগ হয়েছে' },
  adminCourseVisibleOn: { en: 'Course visible', bn: 'কোর্স দৃশ্যমান করা হয়েছে' },
  adminCourseVisibleOff: { en: 'Course hidden', bn: 'কোর্স লুকানো হয়েছে' },
  adminCourseDeleted: { en: 'Course deleted', bn: 'কোর্স মুছে ফেলা হয়েছে' },
  adminStudentAdded: { en: 'Student added', bn: 'ছাত্র যোগ হয়েছে' },
  adminStudentUpdated: { en: 'Student updated', bn: 'ছাত্র আপডেট হয়েছে' },
  adminStudentDeleted: { en: 'Student deleted', bn: 'ছাত্র মুছে ফেলা হয়েছে' },
  adminIncomeAdded: { en: 'Added', bn: 'যোগ হয়েছে' },
  adminIncomeUpdated: { en: 'Updated', bn: 'আপডেট হয়েছে' },
  adminPlaceholderStudentName: { en: 'Student name', bn: 'ছাত্রের নাম' },
  adminPlaceholderStudentEmail: { en: 'Email', bn: 'ইমেল' },
  adminPlaceholderStudentPhone: { en: 'Phone number', bn: 'ফোন নম্বর' },
  adminPlaceholderStudentVillage: { en: 'Village', bn: 'গ্রাম' },
  adminPlaceholderStudentCourse: { en: 'Course', bn: 'কোর্স' },
  adminPlaceholderStudentFee: { en: 'Monthly fee', bn: 'মাসিক ফি' },
  adminPlaceholderStudentNotes: { en: 'Notes', bn: 'নোট' },
  adminPlaceholderIncomeAmount: { en: 'Amount', bn: 'টাকার পরিমাণ' },
  adminPlaceholderIncomePayment: { en: 'Payment method (UPI/Cash)', bn: 'পেমেন্ট মাধ্যম (UPI/Cash)' },
  adminPlaceholderIncomeDescription: { en: 'Description', bn: 'বিবরণ' },
  adminPlaceholderIncomeReference: { en: 'Reference ID (order ID)', bn: 'রেফারেন্স ID (অর্ডার ID)' },
  adminDeliveryDateComing:
    {
      en: 'Your order {products} is coming on {date}.',
      bn: 'আপনার অর্ডার {products} {date} তারিখে আসছে।',
    },
  adminOrderCancelledByCustomer:
    {
      en: 'This order was cancelled by the customer.',
      bn: 'এই অর্ডারটি গ্রাহক কর্তৃক বাতিল করা হয়েছে।',
    },
};

export function tr(key: keyof typeof ui | string, language: 'en' | 'bn'): string {
  const entry = (ui as Record<string, { en: string; bn: string }>)[key];
  if (!entry) {
    // Unknown key — surface the key itself rather than crashing the page.
    // This keeps auth flows and other call sites alive even if a translation
    // string is added without being registered here.
    return String(key);
  }
  return entry[language];
}