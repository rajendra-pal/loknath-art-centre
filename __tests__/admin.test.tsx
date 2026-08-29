import * as React from 'react';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AdminPage from '@/app/admin/page';

// 1. Mock next/navigation
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn() }),
  usePathname: () => '/admin',
}));

// 2. Mock useAuth
const mockAdminUser = {
  id: 'admin-user-1',
  name: 'Admin User',
  email: 'admin@loknath.in',
  role: 'admin',
};

vi.mock('@/components/auth/auth-context', () => ({
  useAuth: () => ({
    user: mockAdminUser,
    loading: false,
    openLogin: vi.fn(),
  }),
}));

// 3. Mock useLanguage
vi.mock('@/lib/i18n/context', () => ({
  useLanguage: () => ({
    language: 'bn',
    setLanguage: vi.fn(),
    t: (val: any) => (typeof val === 'object' && val ? val.bn || val.en : val),
  }),
}));

// 4. Mock Framer Motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

// 5. Mock Supabase client
const mockStudentsData = [
  {
    id: 's1',
    name: 'Ananya Das',
    phone: '9876543210',
    village: 'Maynaguri',
    course: 'Drawing',
    monthly_fee: 800,
    paid_months: ['Jan', 'Feb'],
    status: 'Active',
    created_at: new Date().toISOString(),
  },
];

const mockCoursesData = [
  {
    id: 'c1',
    title: 'Basic Drawing',
    duration: '3 months',
    fee: 800,
    description: 'Learn basic drawing',
    image: '/logo.png',
    is_active: true,
    display_order: 1,
  },
];

vi.mock('@/lib/supabase/client', () => ({
  supabase: {
    from: vi.fn((table: string) => {
      if (table === 'students') {
        return {
          select: vi.fn(() => ({
            order: vi.fn().mockResolvedValue({ data: mockStudentsData, error: null }),
          })),
          insert: vi.fn().mockResolvedValue({ error: null }),
          update: vi.fn(() => ({ eq: vi.fn().mockResolvedValue({ error: null }) })),
          delete: vi.fn(() => ({ eq: vi.fn().mockResolvedValue({ error: null }) })),
        };
      }
      if (table === 'courses') {
        return {
          select: vi.fn(() => ({
            order: vi.fn().mockResolvedValue({ data: mockCoursesData, error: null }),
          })),
        };
      }
      if (table === 'store_orders') {
        return {
          select: vi.fn(() => ({
            order: vi.fn().mockResolvedValue({ data: [], error: null }),
          })),
        };
      }
      return {
        select: vi.fn(() => ({
          order: vi.fn().mockResolvedValue({ data: [], error: null }),
        })),
      };
    }),
    rpc: vi.fn().mockResolvedValue({ data: true, error: null }),
  },
}));

describe('AdminPage Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders admin dashboard heading and stats', async () => {
    render(<AdminPage />);

    expect(screen.getByText(/Admin User/)).toBeDefined();
    expect(screen.getByText(/admin@loknath.in/)).toBeDefined();

    await waitFor(() => {
      expect(screen.getByText(/Quick actions|দ্রুত অ্যাকশন/)).toBeDefined();
    });
  });
});
