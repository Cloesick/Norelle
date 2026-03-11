'use client'

import React, { useState, useEffect } from 'react'
import { XMarkIcon, ShieldCheckIcon, EyeIcon } from '@heroicons/react/24/outline'
import { motion, AnimatePresence } from 'framer-motion'

// Custom cookie icon since it's not available
const CookieIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

interface CookiePreferences {
  necessary: boolean
  analytics: boolean
  marketing: boolean
  personalization: boolean
}

interface CookieBannerProps {
  className?: string
}

export default function CookieBanner({ className = '' }: CookieBannerProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true, // Always required
    analytics: false,
    marketing: false,
    personalization: false,
  })

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) {
      setIsVisible(true)
    } else {
      // Apply saved preferences
      const savedPreferences = JSON.parse(consent)
      setPreferences(savedPreferences)
      applyCookieConsent(savedPreferences)
    }
  }, [])

  const updateGtagConsent = (consentUpdate: Record<string, 'granted' | 'denied'>) => {
    const gtag = (window as any)?.gtag as undefined | ((...args: any[]) => void)
    if (!gtag) return
    gtag('consent', 'update', consentUpdate)
  }

  const applyCookieConsent = (prefs: CookiePreferences) => {
    // Enable/disable analytics cookies
    if (prefs.analytics) {
      // Enable Google Analytics
      updateGtagConsent({
        analytics_storage: 'granted'
      })
    } else {
      // Disable analytics
      updateGtagConsent({
        analytics_storage: 'denied'
      })
    }

    // Enable/disable marketing cookies
    if (prefs.marketing) {
      // Enable marketing cookies
      updateGtagConsent({
        ad_storage: 'granted',
        ad_user_data: 'granted',
        ad_personalization: 'granted'
      })
    } else {
      // Disable marketing cookies
      updateGtagConsent({
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied'
      })
    }

    // Save preferences
    localStorage.setItem('cookie-consent', JSON.stringify(prefs))
  }

  const handleAcceptAll = () => {
    const allPreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
      personalization: true,
    }
    setPreferences(allPreferences)
    applyCookieConsent(allPreferences)
    setIsVisible(false)
  }

  const handleAcceptNecessary = () => {
    const necessaryOnly = {
      necessary: true,
      analytics: false,
      marketing: false,
      personalization: false,
    }
    setPreferences(necessaryOnly)
    applyCookieConsent(necessaryOnly)
    setIsVisible(false)
  }

  const handleSavePreferences = () => {
    applyCookieConsent(preferences)
    setIsVisible(false)
  }

  const handlePreferenceChange = (category: keyof CookiePreferences, value: boolean) => {
    if (category === 'necessary') return // Cannot disable necessary cookies
    
    setPreferences(prev => ({
      ...prev,
      [category]: value
    }))
  }

  if (!isVisible) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        className={`fixed bottom-0 left-0 right-0 bg-norelle-burgundy border-t border-norelle-border z-50 ${className}`}
      >
        <div className="container-max p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start gap-3 flex-1">
              <CookieIcon className="w-6 h-6 text-norelle-gold flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="text-norelle-cream font-serif text-lg mb-2">
                  Cookie Preferences
                </h3>
                <p className="text-norelle-text-muted text-sm leading-relaxed">
                  We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. 
                  By clicking "Accept All", you consent to our use of cookies.
                </p>
                
                {!showDetails && (
                  <div className="mt-3 flex flex-wrap gap-3">
                    <button
                      onClick={() => setShowDetails(true)}
                      className="text-norelle-gold hover:text-norelle-gold-light text-sm font-medium transition-colors duration-200 flex items-center gap-1"
                    >
                      <EyeIcon className="w-4 h-4" />
                      Customize Preferences
                    </button>
                    <a
                      href="/privacy"
                      className="text-norelle-text-muted hover:text-norelle-cream text-sm transition-colors duration-200"
                    >
                      Privacy Policy
                    </a>
                    <a
                      href="/cookies"
                      className="text-norelle-text-muted hover:text-norelle-cream text-sm transition-colors duration-200"
                    >
                      Cookie Policy
                    </a>
                  </div>
                )}
              </div>
            </div>
            
            {!showDetails ? (
              <div className="flex gap-3">
                <button
                  onClick={handleAcceptNecessary}
                  className="px-4 py-2 border border-norelle-border text-norelle-cream hover:bg-norelle-burgundy-light transition-colors duration-200 rounded-lg text-sm font-medium"
                >
                  Necessary Only
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="px-4 py-2 bg-norelle-gold text-norelle-burgundy hover:bg-norelle-gold-light transition-colors duration-200 rounded-lg text-sm font-medium"
                >
                  Accept All
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowDetails(false)}
                className="p-2 text-norelle-text-muted hover:text-norelle-cream transition-colors duration-200"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            )}
          </div>
          
          {showDetails && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-6 pt-6 border-t border-norelle-border"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Necessary Cookies */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ShieldCheckIcon className="w-4 h-4 text-norelle-gold" />
                      <h4 className="text-norelle-cream font-medium">Essential Cookies</h4>
                    </div>
                    <input
                      type="checkbox"
                      checked={preferences.necessary}
                      disabled
                      className="w-4 h-4 text-norelle-gold border-norelle-border rounded focus:ring-norelle-gold disabled:opacity-50"
                    />
                  </div>
                  <p className="text-norelle-text-muted text-sm">
                    Required for the website to function properly, including security, network management, and accessibility.
                  </p>
                </div>

                {/* Analytics Cookies */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <EyeIcon className="w-4 h-4 text-norelle-gold" />
                      <h4 className="text-norelle-cream font-medium">Analytics Cookies</h4>
                    </div>
                    <input
                      type="checkbox"
                      checked={preferences.analytics}
                      onChange={(e) => handlePreferenceChange('analytics', e.target.checked)}
                      className="w-4 h-4 text-norelle-gold border-norelle-border rounded focus:ring-norelle-gold"
                    />
                  </div>
                  <p className="text-norelle-text-muted text-sm">
                    Help us understand how visitors interact with our website by collecting and reporting information anonymously.
                  </p>
                </div>

                {/* Marketing Cookies */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CookieIcon className="w-4 h-4 text-norelle-gold" />
                      <h4 className="text-norelle-cream font-medium">Marketing Cookies</h4>
                    </div>
                    <input
                      type="checkbox"
                      checked={preferences.marketing}
                      onChange={(e) => handlePreferenceChange('marketing', e.target.checked)}
                      className="w-4 h-4 text-norelle-gold border-norelle-border rounded focus:ring-norelle-gold"
                    />
                  </div>
                  <p className="text-norelle-text-muted text-sm">
                    Used to deliver advertisements that are relevant to you and your interests, including on third-party websites.
                  </p>
                </div>

                {/* Personalization Cookies */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CookieIcon className="w-4 h-4 text-norelle-gold" />
                      <h4 className="text-norelle-cream font-medium">Personalization Cookies</h4>
                    </div>
                    <input
                      type="checkbox"
                      checked={preferences.personalization}
                      onChange={(e) => handlePreferenceChange('personalization', e.target.checked)}
                      className="w-4 h-4 text-norelle-gold border-norelle-border rounded focus:ring-norelle-gold"
                    />
                  </div>
                  <p className="text-norelle-text-muted text-sm">
                    Allow us to remember your preferences and personalize your experience on our website.
                  </p>
                </div>
              </div>
              
              <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-between items-start sm:items-center">
                <div className="text-sm text-norelle-text-muted">
                  You can change your preferences anytime in your{' '}
                  <a href="/account/settings" className="text-norelle-gold hover:text-norelle-gold-light">
                    account settings
                  </a>
                  .
                </div>
                
                <div className="flex gap-3">
                  <button
                    onClick={handleAcceptNecessary}
                    className="px-4 py-2 border border-norelle-border text-norelle-cream hover:bg-norelle-burgundy-light transition-colors duration-200 rounded-lg text-sm font-medium"
                  >
                    Accept Necessary
                  </button>
                  <button
                    onClick={handleSavePreferences}
                    className="px-4 py-2 bg-norelle-gold text-norelle-burgundy hover:bg-norelle-gold-light transition-colors duration-200 rounded-lg text-sm font-medium"
                  >
                    Save Preferences
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

// Cookie management utilities
export const CookieManager = {
  getConsent: (): CookiePreferences | null => {
    const consent = localStorage.getItem('cookie-consent')
    return consent ? JSON.parse(consent) : null
  },

  updateConsent: (preferences: Partial<CookiePreferences>) => {
    const current = CookieManager.getConsent() || {
      necessary: true,
      analytics: false,
      marketing: false,
      personalization: false,
    }
    
    const updated = { ...current, ...preferences }
    localStorage.setItem('cookie-consent', JSON.stringify(updated))
    return updated
  },

  resetConsent: () => {
    localStorage.removeItem('cookie-consent')
    // Reset Google Analytics consent
    const gtag = (window as any)?.gtag as undefined | ((...args: any[]) => void)
    if (!gtag) return
    gtag('consent', 'update', {
      analytics_storage: 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied'
    })
  },

  hasConsent: (category: keyof CookiePreferences): boolean => {
    const consent = CookieManager.getConsent()
    return consent ? consent[category] : false
  }
}
