import type { Metadata } from 'next';
import { Poppins, Hind_Siliguri } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/components/auth/auth-context';
import { AuthModal } from '@/components/auth/auth-modal';
import { LoadingScreen } from '@/components/loading-screen';
import { ClientEffects } from '@/components/client-effects';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
  display: 'swap',
});

const hindSiliguri = Hind_Siliguri({
  subsets: ['bengali'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-hind-siliguri',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'লোকনাথ আর্ট সেন্টার | Loknath Art Centre — কল্পনা যেখানে শিল্প হয়ে ওঠে',
  description:
    '২০১০ সাল থেকে বাংলায় আর্ট শিক্ষার এক অনন্য ঠিকানা। ১৮টি কোর্স, ৫০০+ ছাত্র-ছাত্রী, এবং নিজস্ব আর্ট স্টোর।',
  keywords: [
    'আর্ট সেন্টার',
    'ড্রয়িং ক্লাস',
    'পেইন্টিং স্কুল',
    'বাংলা আর্ট',
    'ওয়াটারকালার',
    'অয়েল পেইন্টিং',
    'কিডস আর্ট',
    'ফাইন আর্টস',
    'Loknath Art Centre',
  ],
  authors: [{ name: 'Loknath Art Centre' }],
  openGraph: {
    title: 'লোকনাথ আর্ট সেন্টার | Loknath Art Centre',
    description: 'কল্পনা যেখানে শিল্প হয়ে ওঠে।',
    type: 'website',
    locale: 'bn_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'লোকনাথ আর্ট সেন্টার',
    description: 'কল্পনা যেখানে শিল্প হয়ে ওঠে।',
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="bn" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${poppins.variable} ${hindSiliguri.variable} font-bengali`}
      >
        <LoadingScreen />
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
        >
          <AuthProvider>
            <ClientEffects />
            <Navbar />
            <main className="relative overflow-x-hidden">{children}</main>
            <Footer />
            <Toaster />
            <AuthModal />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
