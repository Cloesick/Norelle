export type Locale = 'en' | 'nl' | 'fr'

export const defaultLocale: Locale = 'en'

export const locales: Locale[] = ['en', 'nl', 'fr']

export const localeNames: Record<Locale, string> = {
  en: 'EN',
  nl: 'NL',
  fr: 'FR',
}

export const LOCALE_COOKIE = 'norelle-locale'
