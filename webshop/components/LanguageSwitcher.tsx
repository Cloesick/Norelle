'use client'

import React, { useState, useRef, useEffect } from 'react'
import { useLocale } from '@/context/LocaleContext'
import { locales, localeNames, type Locale } from '@/lib/i18n'

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLocale()
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-norelle-cream/60 hover:text-norelle-cream text-xs font-body font-light uppercase tracking-brand transition-colors duration-300 px-1 py-1"
        aria-label="Change language"
      >
        {localeNames[locale]}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 bg-norelle-burgundy border border-norelle-cream/10 min-w-[80px] z-50">
          {locales.map((l) => (
            <button
              key={l}
              onClick={() => {
                setLocale(l as Locale)
                setIsOpen(false)
              }}
              className={`block w-full text-left px-4 py-2 text-xs font-body font-light uppercase tracking-brand transition-colors duration-200 ${
                l === locale
                  ? 'text-norelle-cream bg-norelle-cream/5'
                  : 'text-norelle-cream/50 hover:text-norelle-cream hover:bg-norelle-cream/5'
              }`}
            >
              {localeNames[l]}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
