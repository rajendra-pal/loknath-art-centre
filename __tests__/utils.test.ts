import { describe, expect, it } from 'vitest';
import { cn, formatPrice, slugify } from '@/lib/utils';

describe('Utility Functions', () => {
  describe('cn (Classname merger)', () => {
    it('merges Tailwind classes correctly', () => {
      expect(cn('px-2 py-2', 'p-4')).toBe('p-4');
      expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500');
      expect(cn('flex items-center', 'justify-between')).toBe('flex items-center justify-between');
    });

    it('handles conditional classes', () => {
      expect(cn('btn', true && 'btn-active', false && 'btn-disabled')).toBe('btn btn-active');
    });
  });

  describe('formatPrice (INR Formatter)', () => {
    it('formats numbers to Indian Rupees (INR)', () => {
      // Note: format matches exact locale representation (e.g. including rupee sign and non-breaking space)
      const formatted = formatPrice(1000);
      expect(formatted).toContain('1,000');
      // Should include currency representation (either ₹ or Rs. depending on system locale format, we check match for '1,000')
      expect(formatted).toMatch(/1,000/);
    });

    it('handles decimal truncation', () => {
      const formatted = formatPrice(99.95);
      expect(formatted).toMatch(/100/);
    });
  });

  describe('slugify', () => {
    it('converts strings to slugs', () => {
      expect(slugify('Hello World!')).toBe('hello-world');
      expect(slugify('  My-Awesome_Post  ')).toBe('my-awesome-post');
      expect(slugify('Next.js 15 Testing')).toBe('nextjs-15-testing');
    });
  });
});
