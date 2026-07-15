import { describe, expect, it } from 'vitest';
import { heroContent, stats, features, courses } from '@/lib/data';

describe('Data Verification (lib/data.ts)', () => {
  it('heroContent contains necessary Bengali descriptions', () => {
    expect(heroContent).toBeDefined();
    expect(heroContent.eyebrow).toBe('কল্পনা যেখানে শিল্প হয়ে ওঠে');
    expect(heroContent.primaryCta).toBe('কোর্স দেখুন');
    expect(heroContent.secondaryCta).toBe('স্টোরে যান');
  });

  it('stats array is correctly populated', () => {
    expect(stats.length).toBeGreaterThan(0);
    const firstStat = stats[0];
    expect(firstStat.value).toBe(500);
    expect(firstStat.suffix).toBe('+');
    expect(firstStat.label).toBe('খুশি ছাত্র-ছাত্রী');
  });

  it('features array contains localized key markers', () => {
    expect(features.length).toBeGreaterThan(0);
    const experiencedTeacher = features.find(f => f.title === 'অভিজ্ঞ শিক্ষক');
    expect(experiencedTeacher).toBeDefined();
    expect(experiencedTeacher?.color).toBe('#FF6B35');
    expect(experiencedTeacher?.icon).toBe('Sparkles');
  });

  it('courses array contains localized data structure', () => {
    expect(courses.length).toBeGreaterThan(0);
    const basicDrawing = courses.find(c => c.id === 'c1');
    expect(basicDrawing).toBeDefined();
    expect(basicDrawing?.titleBn).toBe('বেসিক ড্রয়িং');
    expect(basicDrawing?.level).toBe('শুরু');
    expect(basicDrawing?.duration).toBe('৩ মাস');
  });
});
