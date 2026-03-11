'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCart } from '@/context/CartContext'
import { 
  ShoppingBagIcon,
} from '@heroicons/react/24/outline'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const { getItemCount } = useCart()
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navigation = [
    { name: 'Fragrances', href: '/shop' },
    { name: 'Our Story', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ]

  const itemCount = getItemCount()

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-norelle-burgundy/95 backdrop-blur-md' 
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between h-20 md:h-24">
            {/* Desktop Nav — Left */}
            <nav className="hidden lg:flex items-center space-x-10">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-norelle-cream/80 hover:text-norelle-cream transition-all duration-300 text-xs font-body font-light uppercase tracking-nav"
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Logo — Center */}
            <div className="absolute left-1/2 -translate-x-1/2">
              <Link href="/" className="block">
                <span className="text-2xl md:text-3xl font-display font-light text-norelle-cream tracking-wide">
                  Nor&#x0113;lle
                </span>
              </Link>
            </div>

            {/* Actions — Right */}
            <div className="hidden lg:flex items-center space-x-6 ml-auto">
              <Link 
                href="/cart"
                className="relative p-2 text-norelle-cream/80 hover:text-norelle-cream transition-all duration-300"
              >
                <ShoppingBagIcon className="w-5 h-5" strokeWidth={1.5} />
                {itemCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-norelle-cream text-norelle-burgundy text-[10px] font-body font-normal rounded-full w-4 h-4 flex items-center justify-center">
                    {itemCount > 99 ? '99+' : itemCount}
                  </span>
                )}
              </Link>
            </div>

            {/* Mobile — just the cart icon (navigation handled by BottomNav) */}
            <div className="lg:hidden ml-auto" />
          </div>
        </div>

      </header>

      {/* Header spacer */}
      <div className="h-16 lg:h-24" />
    </>
  )
}

export default Header
