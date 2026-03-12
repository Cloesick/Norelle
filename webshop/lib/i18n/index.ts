import type { Dictionary } from './dictionaries/en'
import type { Locale } from './config'
import en from './dictionaries/en'
import nl from './dictionaries/nl'
import fr from './dictionaries/fr'

export type { Dictionary }
export { type Locale, defaultLocale, locales, localeNames, LOCALE_COOKIE } from './config'

const dictionaries: Record<Locale, Dictionary> = { en, nl, fr }

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries.en
}
