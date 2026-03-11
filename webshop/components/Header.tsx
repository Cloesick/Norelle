'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCart } from '@/context/CartContext'
import { 
  Bars3Icon, 
  XMarkIcon, 
  ShoppingBagIcon,
  UserIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
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

  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  const navigation = [
    { name: 'Shop', href: '/shop' },
    { name: 'Necklaces', href: '/category/necklaces' },
    { name: 'Earrings', href: '/category/earrings' },
    { name: 'Bracelets', href: '/category/bracelets' },
    { name: 'Rings', href: '/category/rings' },
    { name: 'Collections', href: '/category/collections' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ]

  const itemCount = getItemCount()

  return (
    <>
      {/* Header */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-norelle-burgundy/95 backdrop-blur-md border-b border-norelle-border' 
            : 'bg-norelle-burgundy'
        }`}
      >
        <div className="container-max">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="block">
                <span className="text-2xl md:text-3xl font-serif font-bold text-norelle-cream">
                  Norelle
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-norelle-cream hover:text-white transition-colors duration-200 text-sm font-medium"
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center space-x-4">
              <button className="p-2 text-norelle-cream hover:text-white transition-colors duration-200">
                <MagnifyingGlassIcon className="w-5 h-5" />
              </button>
              <Link 
                href="/account"
                className="p-2 text-norelle-cream hover:text-white transition-colors duration-200"
              >
                <UserIcon className="w-5 h-5" />
              </Link>
              <Link 
                href="/cart"
                className="relative p-2 text-norelle-cream hover:text-white transition-colors duration-200"
              >
                <ShoppingBagIcon className="w-5 h-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-norelle-cream text-norelle-burgundy text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {itemCount > 99 ? '99+' : itemCount}
                  </span>
                )}
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden flex items-center space-x-2">
              <Link 
                href="/cart"
                className="relative p-2 text-norelle-cream hover:text-white transition-colors duration-200"
              >
                <ShoppingBagIcon className="w-5 h-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-norelle-cream text-norelle-burgundy text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {itemCount > 99 ? '99+' : itemCount}
                  </span>
                )}
              </Link>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-norelle-cream hover:text-white transition-colors duration-200"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <XMarkIcon className="w-6 h-6" />
                ) : (
                  <Bars3Icon className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div 
          className={`lg:hidden transition-all duration-300 overflow-hidden ${
            isMenuOpen ? 'max-h-screen' : 'max-h-0'
          }`}
        >
          <div className="border-t border-norelle-border">
            <div className="px-4 py-6 space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block text-norelle-cream hover:text-white transition-colors duration-200 text-lg font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 mt-4 border-t border-norelle-border space-y-4">
                <Link
                  href="/account"
                  className="flex items-center space-x-3 text-norelle-cream hover:text-white transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <UserIcon className="w-5 h-5" />
                  <span className="text-lg font-medium">My Account</span>
                </Link>
                <button className="flex items-center space-x-3 text-norelle-cream hover:text-white transition-colors duration-200">
                  <MagnifyingGlassIcon className="w-5 h-5" />
                  <span className="text-lg font-medium">Search</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Header spacer */}
      <div className="h-16 lg:h-20" />
    </>
  )
}

export default Header
