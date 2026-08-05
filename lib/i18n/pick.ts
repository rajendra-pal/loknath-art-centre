// =====================================================
// i18n picker — single helper for all localized lookups.
// Two supported shapes:
//
//   1. Localized: { en: T, bn: T }
//   2. Plain:     T  (returned as-is, no extra allocation)
//
// Usage:
//   t({ en: 'Home', bn: 'হোম' }, language)
//   t('Home', language)   // passthrough
// =====================================================

export type Localized<T> = { en: T; bn: T };
export type Language = 'en' | 'bn';

export function isLocalized<T>(value: unknown): value is Localized<T> {
  return (
    typeof value === 'object' &&
    value !== null &&
    'en' in (value as Record<string, unknown>) &&
    'bn' in (value as Record<string, unknown>)
  );
}

export function t<T>(value: Localized<T> | T, language: Language): T {
  if (isLocalized<T>(value)) {
    return value[language];
  }
  return value;
}

// Helper for localized arrays. Falls back to the value unchanged if it's
// not an array of Localized entries (e.g. plain string array).
export function tArray<T>(
  value: ReadonlyArray<Localized<T>> | ReadonlyArray<T>,
  language: Language
): ReadonlyArray<T> {
  if (value.length === 0) return value as ReadonlyArray<T>;
  const first = value[0];
  if (isLocalized<T>(first)) {
    return (value as ReadonlyArray<Localized<T>>).map((entry) => entry[language]);
  }
  return value as ReadonlyArray<T>;
}
