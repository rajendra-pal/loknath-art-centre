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

  // Auth
  signIn: { en: 'Sign in', bn: 'লগইন' },
  signUp: { en: 'Sign up', bn: 'অ্যাকাউন্ট তৈরি করুন' },
  signOut: { en: 'Sign out', bn: 'লগআউট' },
  loginRequired: { en: 'Login required', bn: 'লগইন প্রয়োজন' },
  loginPrompt:
    {
      en: 'Sign in to view your account or create a new one.',
      bn: 'আপনার অ্যাকাউন্ট দেখতে লগইন করুন অথবা নতুন অ্যাকাউন্ট তৈরি করুন।',
    },

  // Account nav
  myOrders: { en: 'My orders', bn: 'আমার অর্ডার' },
  ordersHint: { en: 'View your recent order history', bn: 'অর্ডারের সাম্প্রতিক ইতিহাস দেখুন' },
  wishlist: { en: 'Wishlist', bn: 'ইচ্ছেতালিকা' },
  wishlistHint: { en: 'Save your favorite products', bn: 'পছন্দের পণ্য সংরক্ষণ করুন' },
  adminDashboard: { en: 'Admin dashboard', bn: 'অ্যাডমিন ড্যাশবোর্ড' },

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

  // Navbar
  enrollNow: { en: 'Enroll now', bn: 'এখনই ভর্তি হোন' },

  // Empty / error states
  emptyList: { en: 'Nothing to show yet.', bn: 'এখনও দেখানোর মতো কিছু নেই।' },
  somethingWentWrong: {
    en: 'Something went wrong. Please try again.',
    bn: 'কিছু সমস্যা হয়েছে। আবার চেষ্টা করুন।',
  },
};

export function tr(key: keyof typeof ui, language: 'en' | 'bn'): string {
  return ui[key][language];
}
