'use client'

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { getDictionary, type Dictionary, type Locale, defaultLocale, LOCALE_COOKIE } from '@/lib/i18n'

interface LocaleContextValue {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: Dictionary
}

const LocaleContext = createContext<LocaleContextValue | null>(null)

function getInitialLocale(): Locale {
  if (typeof document === 'undefined') return defaultLocale
  const cookie = document.cookie
    .split('; ')
    .find(row => row.startsWith(`${LOCALE_COOKIE}=`))
  const value = cookie?.split('=')[1]
  if (value === 'en' || value === 'nl' || value === 'fr') return value
  return defaultLocale
}

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale)
  const [t, setT] = useState<Dictionary>(getDictionary(defaultLocale))

  useEffect(() => {
    const initial = getInitialLocale()
    setLocaleState(initial)
    setT(getDictionary(initial))
  }, [])

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale)
    setT(getDictionary(newLocale))
    document.cookie = `${LOCALE_COOKIE}=${newLocale};path=/;max-age=${60 * 60 * 24 * 365};SameSite=Lax`
    document.documentElement.lang = newLocale
  }, [])

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LocaleContext.Provider>
  )
}

export function useLocale() {
  const context = useContext(LocaleContext)
  if (!context) throw new Error('useLocale must be used within a LocaleProvider')
  return context
}

export function useT() {
  const { t } = useLocale()
  return t
}
