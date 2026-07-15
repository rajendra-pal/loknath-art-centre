import * as React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import StorePage from '@/app/store/page';

// 1. Mock the next/navigation module
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
  usePathname: () => '/store',
}));

// 2. Mock useAuth hook from auth-context
const mockUser = {
  name: 'Test Customer',
  email: 'demo@loknath.in',
  role: 'customer',
};

const mockOpenLogin = vi.fn();
vi.mock('@/components/auth/auth-context', () => ({
  useAuth: () => ({
    user: mockUser,
    openLogin: mockOpenLogin,
  }),
}));

// 3. Mock Framer Motion to bypass layout/animation issues in JSDOM
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

// 4. Mock Lucide Icons to prevent render warning outputs
vi.mock('lucide-react', () => ({
  Star: () => <span>★</span>,
  Heart: () => <span>♥</span>,
  ShoppingCart: () => <span>🛒</span>,
  Search: () => <span>🔍</span>,
  Filter: () => <span>▼</span>,
  X: () => <span>✗</span>,
  Trash2: () => <span>🗑</span>,
  Package: () => <span>📦</span>,
  Palette: () => <span>🎨</span>,
  Pencil: () => <span>✎</span>,
  Brush: () => <span>🖌</span>,
  Award: () => <span>🏆</span>,
  Truck: () => <span>🚚</span>,
}));

// 5. Mock Next.js Image component
vi.mock('next/image', () => ({
  default: ({ src, alt, ...props }: any) => <img src={src} alt={alt} {...props} />,
}));

describe('StorePage Component', () => {
  it('renders store heading and main sections', () => {
    render(<StorePage />);

    // Check main title (localized Bengali)
    expect(screen.getByText('রঙ তুলি')).toBeDefined();
    expect(screen.getByText(/শিল্পীর সরঞ্জামের সম্পূর্ণ সংগ্রহ/)).toBeDefined();
  });

  it('renders the search input bar', () => {
    render(<StorePage />);
    const searchInput = screen.getByPlaceholderText('পণ্য খুঁজুন...');
    expect(searchInput).toBeDefined();
  });

  it('renders products lists correctly', () => {
    render(<StorePage />);
    // Verify first product exists in listing
    const productTitle = screen.getByText('প্রিমিয়াম ওয়াটারকালার সেট (২৪ রঙ)');
    expect(productTitle).toBeDefined();
  });

  it('filters product lists based on search query', () => {
    render(<StorePage />);
    const searchInput = screen.getByPlaceholderText('পণ্য খুঁজুন...') as HTMLInputElement;

    // Initially multiple products should be listed
    expect(screen.queryByText('প্রিমিয়াম ওয়াটারকালার সেট (২৪ রঙ)')).not.toBeNull();
    expect(screen.queryByText('প্রফেশনাল ব্রাশ সেট (১২টি)')).not.toBeNull();

    // Type query into search bar
    fireEvent.change(searchInput, { target: { value: 'ব্রাশ' } });

    // Verify search filters product cards list
    expect(screen.queryByText('প্রফেশনাল ব্রাশ সেট (১২টি)')).not.toBeNull();
    expect(screen.queryByText('প্রিমিয়াম ওয়াটারকালার সেট (২৪ রঙ)')).toBeNull();
  });
});
