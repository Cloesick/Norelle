'use client'

import React, { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import MobileHeader from './MobileHeader'
import MobileCartButton from './MobileCart'
import { useCart } from '@/context/CartContext'

interface MobileLayoutProps {
  children: React.ReactNode
  showCartButton?: boolean
}

export default function MobileLayout({ children, showCartButton = true }: MobileLayoutProps) {
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const pathname = usePathname()
  const { cartItems } = useCart()

  // Detect device type
  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth
      setIsMobile(width <= 768)
      setIsTablet(width > 768 && width <= 1024)
    }

    checkDevice()
    window.addEventListener('resize', checkDevice)
    return () => window.removeEventListener('resize', checkDevice)
  }, [])

  // Pages that don't need cart button
  const noCartPages = ['/checkout', '/order-success', '/admin', '/sales']
  const shouldShowCartButton = showCartButton && !noCartPages.some(page => pathname.startsWith(page))

  const itemCount = cartItems?.reduce((total: number, item: any) => total + item.quantity, 0) || 0

  // Only use mobile layout on mobile devices
  if (!isMobile && !isTablet) {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen bg-norelle-burgundy">
      {/* Mobile Header */}
      <MobileHeader />

      {/* Main Content */}
      <main className="pb-20">
        {children}
      </main>

      {/* Floating Cart Button */}
      {shouldShowCartButton && itemCount > 0 && (
        <MobileCartButton 
          itemCount={itemCount} 
          onClick={() => {
            // Open cart modal or navigate to cart page
            window.location.href = '/cart'
          }} 
        />
      )}

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav currentPath={pathname} />
    </div>
  )
}

// Mobile Bottom Navigation
interface MobileBottomNavProps {
  currentPath: string
}

function MobileBottomNav({ currentPath }: MobileBottomNavProps) {
  const navItems = [
    {
      id: 'home',
      label: 'Home',
      href: '/',
      icon: '🏠'
    },
    {
      id: 'shop',
      label: 'Shop',
      href: '/shop',
      icon: '🛍️'
    },
    {
      id: 'cart',
      label: 'Cart',
      href: '/cart',
      icon: '🛒'
    },
    {
      id: 'account',
      label: 'Account',
      href: '/account',
      icon: '👤'
    },
    {
      id: 'more',
      label: 'More',
      href: '/more',
      icon: '⋯'
    }
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-norelle-burgundy-light border-t border-norelle-border z-40">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const isActive = currentPath === item.href || 
            (item.id !== 'home' && currentPath.startsWith(item.href))
          
          return (
            <Link
              key={item.id}
              href={item.href}
              className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-colors duration-200 ${
                isActive
                  ? 'text-norelle-cream'
                  : 'text-norelle-text-muted hover:text-norelle-cream'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

// Mobile Touch Optimizations
export function useTouchOptimizations() {
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null)
  const [touchEnd, setTouchEnd] = useState<{ x: number; y: number } | null>(null)

  const minSwipeDistance = 50

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY
    })
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY
    })
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    
    const distance = Math.sqrt(
      Math.pow(touchEnd.x - touchStart.x, 2) + 
      Math.pow(touchEnd.y - touchStart.y, 2)
    )
    
    const isLeftSwipe = touchEnd.x < touchStart.x - minSwipeDistance
    const isRightSwipe = touchEnd.x > touchStart.x + minSwipeDistance
    const isUpSwipe = touchEnd.y < touchStart.y - minSwipeDistance
    const isDownSwipe = touchEnd.y > touchStart.y + minSwipeDistance
    
    return {
      isLeftSwipe,
      isRightSwipe,
      isUpSwipe,
      isDownSwipe,
      distance
    }
  }

  return {
    onTouchStart,
    onTouchMove,
    onTouchEnd
  }
}

// Mobile Image Gallery with Touch Support
interface MobileImageGalleryProps {
  images: string[]
  alt: string
  className?: string
}

export function MobileImageGallery({ images, alt, className = '' }: MobileImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const { onTouchStart, onTouchMove, onTouchEnd } = useTouchOptimizations()

  const handleTouchEnd = () => {
    const swipe = onTouchEnd()
    if (!swipe) return

    if (swipe.isLeftSwipe && currentIndex < images.length - 1) {
      setCurrentIndex(currentIndex + 1)
    } else if (swipe.isRightSwipe && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const goToPrevious = () => {
    setCurrentIndex(Math.max(0, currentIndex - 1))
  }

  const goToNext = () => {
    setCurrentIndex(Math.min(images.length - 1, currentIndex + 1))
  }

  if (images.length === 0) return null

  return (
    <div className={`relative aspect-square bg-norelle-burgundy-light rounded-lg overflow-hidden ${className}`}>
      
      {/* Main Image */}
      <div
        className="relative w-full h-full"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <img
          src={images[currentIndex]}
          alt={`${alt} - Image ${currentIndex + 1}`}
          className="w-full h-full object-cover"
          draggable={false}
        />
        
        {/* Swipe Indicators */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  index === currentIndex
                    ? 'bg-norelle-cream w-6'
                    : 'bg-norelle-cream/50'
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              disabled={currentIndex === 0}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 p-2 bg-black/50 text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Previous image"
            >
              ‹
            </button>
            <button
              onClick={goToNext}
              disabled={currentIndex === images.length - 1}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-black/50 text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Next image"
            >
              ›
            </button>
          </>
        )}
      </div>

      {/* Image Counter */}
      {images.length > 1 && (
        <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
          {currentIndex + 1} / {images.length}
        </div>
      )}
    </div>
  )
}

// Mobile Pull to Refresh
interface MobilePullToRefreshProps {
  onRefresh: () => Promise<void>
  children: React.ReactNode
  isRefreshing: boolean
}

export function MobilePullToRefresh({ onRefresh, children, isRefreshing }: MobilePullToRefreshProps) {
  const [pullDistance, setPullDistance] = useState(0)
  const [isPulling, setIsPulling] = useState(false)
  const { onTouchStart, onTouchMove, onTouchEnd } = useTouchOptimizations()

  const handleTouchStart = (e: React.TouchEvent) => {
    // Only enable pull to refresh at the top of the page
    if (window.scrollY === 0) {
      setIsPulling(true)
      onTouchStart(e)
    }
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isPulling) {
      onTouchMove(e)
      // Calculate pull distance (simplified)
      const touch = e.targetTouches[0]
      const distance = Math.max(0, touch.clientY - (touchStart?.y || 0))
      setPullDistance(Math.min(distance, 100))
    }
  }

  const handleTouchEnd = () => {
    if (isPulling && pullDistance > 60) {
      onRefresh()
    }
    setIsPulling(false)
    setPullDistance(0)
  }

  return (
    <div
      className="relative"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Pull to Refresh Indicator */}
      <div
        className="absolute top-0 left-0 right-0 flex justify-center items-center transition-transform duration-200 pointer-events-none"
        style={{
          transform: `translateY(${Math.max(0, pullDistance - 40)}px)`,
          opacity: pullDistance > 0 ? 1 : 0
        }}
      >
        <div className="bg-norelle-burgundy-light border border-norelle-border rounded-full p-3">
          {isRefreshing ? (
            <div className="w-6 h-6 border-2 border-norelle-cream border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <span className="text-norelle-cream text-sm">Pull to refresh</span>
          )}
        </div>
      </div>

      {/* Content */}
      <div
        className="transition-transform duration-200"
        style={{
          transform: pullDistance > 0 ? `translateY(${pullDistance * 0.5}px)` : 'translateY(0)'
        }}
      >
        {children}
      </div>
    </div>
  )
}

// Mobile Skeleton Loading
export function MobileSkeleton({ className = '', lines = 3 }: { className?: string; lines?: number }) {
  return (
    <div className={`space-y-3 ${className}`}>
      {[...Array(lines)].map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="h-4 bg-norelle-burgundy rounded"></div>
        </div>
      ))}
    </div>
  )
}

// Mobile Loading Spinner
export function MobileLoadingSpinner({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  }

  return (
    <div className={`border-2 border-norelle-cream border-t-transparent rounded-full animate-spin ${sizeClasses[size]}`}></div>
  )
}

// Mobile Empty State
interface MobileEmptyStateProps {
  icon: React.ReactNode
  title: string
  description: string
  action?: {
    label: string
    onClick: () => void
  }
}

export function MobileEmptyState({ icon, title, description, action }: MobileEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8">
      <div className="w-16 h-16 text-norelle-text-muted mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-serif font-bold text-norelle-cream mb-2">{title}</h3>
      <p className="text-norelle-text-muted mb-6">{description}</p>
      {action && (
        <button
          onClick={action.onClick}
          className="btn-primary"
        >
          {action.label}
        </button>
      )}
    </div>
  )
}
