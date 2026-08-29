import * as React from 'react';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import WishlistPage from '@/app/account/wishlist/page';

// 1. Mock next/navigation
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn() }),
  usePathname: () => '/account/wishlist',
}));

// 2. Mock useAuth
const mockUser = {
  id: 'test-user-123',
  name: 'Test Customer',
  email: 'demo@loknath.in',
  role: 'customer',
};
const mockOpenLogin = vi.fn();

let currentMockUser: any = mockUser;
vi.mock('@/components/auth/auth-context', () => ({
  useAuth: () => ({
    user: currentMockUser,
    loading: false,
    openLogin: mockOpenLogin,
  }),
}));

// Mock useLanguage
vi.mock('@/lib/i18n/context', () => ({
  useLanguage: () => ({
    language: 'bn',
    setLanguage: vi.fn(),
    t: (val: any) => (typeof val === 'object' && val ? val.bn || val.en : val),
  }),
}));

// 3. Mock Framer Motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

// 4. Mock Lucide Icons
vi.mock('lucide-react', () => ({
  Heart: () => <span>♥</span>,
  X: () => <span>✗</span>,
  ShoppingCart: () => <span>🛒</span>,
  ArrowLeft: () => <span>←</span>,
  Store: () => <span>🏪</span>,
}));

// 5. Mock Supabase
const mockWishlistData = [
  {
    id: 'w1',
    product_id: 'p1',
    products: {
      id: 'p1',
      name: 'Premium Watercolor Set (24 colors)',
      name_bn: 'প্রিমিয়াম ওয়াটারকালার সেট (২৪ রঙ)',
      price: 899,
      image: '/logo.png',
    },
  },
];

const mockDelete = vi.fn(() => ({
  eq: vi.fn(() => ({
    eq: vi.fn().mockResolvedValue({ error: null }),
  })),
}));

vi.mock('@/lib/supabase/client', () => ({
  supabase: {
    from: vi.fn((table: string) => {
      if (table === 'wishlists') {
        return {
          select: vi.fn(() => ({
            eq: vi.fn(() => ({
              order: vi.fn().mockResolvedValue({ data: mockWishlistData, error: null }),
            })),
          })),
          delete: mockDelete,
        };
      }
      if (table === 'cart_items') {
        return {
          select: vi.fn(() => ({
            eq: vi.fn(() => ({
              eq: vi.fn(() => ({
                maybeSingle: vi.fn().mockResolvedValue({ data: null }),
              })),
            })),
          })),
          insert: vi.fn().mockResolvedValue({ error: null }),
        };
      }
      return {
        select: vi.fn().mockResolvedValue({ data: [], error: null }),
      };
    }),
  },
}));

describe('WishlistPage Component', () => {
  beforeEach(() => {
    currentMockUser = mockUser;
    vi.clearAllMocks();
  });

  it('renders wishlist title and loads products from Supabase', async () => {
    render(<WishlistPage />);

    expect(screen.getByText(/আমার ইচ্ছেতালিকা|My Wishlist/)).toBeDefined();

    await waitFor(() => {
      expect(screen.getByText(/প্রিমিয়াম ওয়াটারকালার সেট|Premium Watercolor Set/)).toBeDefined();
    });
  });

  it('allows removing an item from the wishlist', async () => {
    render(<WishlistPage />);

    await waitFor(() => {
      expect(screen.getByText(/প্রিমিয়াম ওয়াটারকালার সেট|Premium Watercolor Set/)).toBeDefined();
    });

    const removeBtn = screen.getByRole('button', { name: /remove/i });
    fireEvent.click(removeBtn);

    expect(mockDelete).toHaveBeenCalled();
  });
});
