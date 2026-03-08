'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { 
  Bars3Icon,
  XMarkIcon,
  ShoppingCartIcon,
  MagnifyingGlassIcon,
  UserIcon,
  HeartIcon,
  SparklesIcon,
  PhoneIcon,
  EnvelopeIcon,
  QuestionMarkCircleIcon
} from '@heroicons/react/24/outline'
import { useCart } from '@/context/CartContext'

export default function MobileHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const { cartItems } = useCart()

  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
    // Close search when menu opens
    if (isSearchOpen) setIsSearchOpen(false)
  }

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen)
    // Close menu when search opens
    if (isMenuOpen) setIsMenuOpen(false)
  }

  const closeAll = () => {
    setIsMenuOpen(false)
    setIsSearchOpen(false)
  }

  return (
    <>
      {/* Main Header */}
      <header className="sticky top-0 z-40 bg-norelle-burgundy border-b border-norelle-border">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <SparklesIcon className="w-8 h-8 text-norelle-cream" />
              <span className="text-xl font-serif font-bold text-norelle-cream">Norelle</span>
            </Link>

            {/* Right Actions */}
            <div className="flex items-center space-x-3">
              {/* Search Button */}
              <button
                onClick={toggleSearch}
                className="p-2 text-norelle-cream hover:bg-norelle-burgundy-light rounded-lg transition-colors duration-200"
                aria-label="Search"
              >
                <MagnifyingGlassIcon className="w-6 h-6" />
              </button>

              {/* Cart */}
              <Link href="/cart" className="relative p-2 text-norelle-cream hover:bg-norelle-burgundy-light rounded-lg transition-colors duration-200">
                <ShoppingCartIcon className="w-6 h-6" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-norelle-cream text-norelle-burgundy text-xs font-bold rounded-full flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </Link>

              {/* Menu */}
              <button
                onClick={toggleMenu}
                className="p-2 text-norelle-cream hover:bg-norelle-burgundy-light rounded-lg transition-colors duration-200"
                aria-label="Menu"
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

        {/* Search Bar (Slide Down) */}
        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isSearchOpen ? 'max-h-20' : 'max-h-0'
        }`}>
          <div className="px-4 py-3 border-t border-norelle-border">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for jewelry..."
                className="w-full pl-10 pr-4 py-3 bg-norelle-burgundy-light border border-norelle-border rounded-lg text-norelle-cream placeholder-norelle-text-muted focus:outline-none focus:ring-2 focus:ring-norelle-cream focus:border-transparent"
                autoFocus
              />
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-norelle-text-muted" />
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-50 transition-all duration-300 ease-in-out ${
        isMenuOpen ? 'visible' : 'invisible'
      }`}>
        {/* Backdrop */}
        <div 
          className={`absolute inset-0 bg-black/60 transition-opacity duration-300 ${
            isMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={closeAll}
        />

        {/* Menu Panel */}
        <div className={`absolute top-0 right-0 h-full w-80 max-w-full bg-norelle-burgundy-light border-l border-norelle-border transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          <div className="flex flex-col h-full">
            {/* Menu Header */}
            <div className="flex items-center justify-between p-4 border-b border-norelle-border">
              <h2 className="text-lg font-serif font-bold text-norelle-cream">Menu</h2>
              <button
                onClick={closeAll}
                className="p-2 text-norelle-cream hover:bg-norelle-burgundy rounded-lg transition-colors duration-200"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>

            {/* Menu Content */}
            <div className="flex-1 overflow-y-auto">
              {/* Shop Section */}
              <div className="p-4">
                <h3 className="text-sm font-medium text-norelle-text-muted uppercase tracking-wider mb-4">Shop</h3>
                <nav className="space-y-2">
                  <Link
                    href="/shop"
                    onClick={closeAll}
                    className="flex items-center space-x-3 p-3 text-norelle-cream hover:bg-norelle-burgundy rounded-lg transition-colors duration-200"
                  >
                    <SparklesIcon className="w-5 h-5" />
                    <span>All Products</span>
                  </Link>
                  <Link
                    href="/category/necklaces"
                    onClick={closeAll}
                    className="flex items-center space-x-3 p-3 text-norelle-cream hover:bg-norelle-burgundy rounded-lg transition-colors duration-200"
                  >
                    <span>Necklaces</span>
                  </Link>
                  <Link
                    href="/category/earrings"
                    onClick={closeAll}
                    className="flex items-center space-x-3 p-3 text-norelle-cream hover:bg-norelle-burgundy rounded-lg transition-colors duration-200"
                  >
                    <span>Earrings</span>
                  </Link>
                  <Link
                    href="/category/rings"
                    onClick={closeAll}
                    className="flex items-center space-x-3 p-3 text-norelle-cream hover:bg-norelle-burgundy rounded-lg transition-colors duration-200"
                  >
                    <span>Rings</span>
                  </Link>
                  <Link
                    href="/category/bracelets"
                    onClick={closeAll}
                    className="flex items-center space-x-3 p-3 text-norelle-cream hover:bg-norelle-burgundy rounded-lg transition-colors duration-200"
                  >
                    <span>Bracelets</span>
                  </Link>
                </nav>
              </div>

              {/* Account Section */}
              <div className="p-4 border-t border-norelle-border">
                <h3 className="text-sm font-medium text-norelle-text-muted uppercase tracking-wider mb-4">Account</h3>
                <nav className="space-y-2">
                  <Link
                    href="/account"
                    onClick={closeAll}
                    className="flex items-center space-x-3 p-3 text-norelle-cream hover:bg-norelle-burgundy rounded-lg transition-colors duration-200"
                  >
                    <UserIcon className="w-5 h-5" />
                    <span>My Account</span>
                  </Link>
                  <Link
                    href="/wishlist"
                    onClick={closeAll}
                    className="flex items-center space-x-3 p-3 text-norelle-cream hover:bg-norelle-burgundy rounded-lg transition-colors duration-200"
                  >
                    <HeartIcon className="w-5 h-5" />
                    <span>Wishlist</span>
                  </Link>
                  <Link
                    href="/orders"
                    onClick={closeAll}
                    className="flex items-center space-x-3 p-3 text-norelle-cream hover:bg-norelle-burgundy rounded-lg transition-colors duration-200"
                  >
                    <ShoppingCartIcon className="w-5 h-5" />
                    <span>Order History</span>
                  </Link>
                </nav>
              </div>

              {/* Support Section */}
              <div className="p-4 border-t border-norelle-border">
                <h3 className="text-sm font-medium text-norelle-text-muted uppercase tracking-wider mb-4">Support</h3>
                <nav className="space-y-2">
                  <Link
                    href="/knowledge"
                    onClick={closeAll}
                    className="flex items-center space-x-3 p-3 text-norelle-cream hover:bg-norelle-burgundy rounded-lg transition-colors duration-200"
                  >
                    <QuestionMarkCircleIcon className="w-5 h-5" />
                    <span>Knowledge Base</span>
                  </Link>
                  <Link
                    href="/contact"
                    onClick={closeAll}
                    className="flex items-center space-x-3 p-3 text-norelle-cream hover:bg-norelle-burgundy rounded-lg transition-colors duration-200"
                  >
                    <EnvelopeIcon className="w-5 h-5" />
                    <span>Contact Us</span>
                  </Link>
                  <a
                    href="tel:+3221234567"
                    onClick={closeAll}
                    className="flex items-center space-x-3 p-3 text-norelle-cream hover:bg-norelle-burgundy rounded-lg transition-colors duration-200"
                  >
                    <PhoneIcon className="w-5 h-5" />
                    <span>+32 2 123 4567</span>
                  </a>
                </nav>
              </div>

              {/* Admin Section */}
              <div className="p-4 border-t border-norelle-border">
                <h3 className="text-sm font-medium text-norelle-text-muted uppercase tracking-wider mb-4">Admin</h3>
                <nav className="space-y-2">
                  <Link
                    href="/admin/login"
                    onClick={closeAll}
                    className="flex items-center space-x-3 p-3 text-norelle-cream hover:bg-norelle-burgundy rounded-lg transition-colors duration-200"
                  >
                    <UserIcon className="w-5 h-5" />
                    <span>Admin Portal</span>
                  </Link>
                  <Link
                    href="/sales/login"
                    onClick={closeAll}
                    className="flex items-center space-x-3 p-3 text-norelle-cream hover:bg-norelle-burgundy rounded-lg transition-colors duration-200"
                  >
                    <UserIcon className="w-5 h-5" />
                    <span>Sales Portal</span>
                  </Link>
                </nav>
              </div>
            </div>

            {/* Menu Footer */}
            <div className="p-4 border-t border-norelle-border">
              <div className="text-center">
                <p className="text-sm text-norelle-text-muted mb-2">Follow Norelle</p>
                <div className="flex justify-center space-x-4">
                  <a href="#" className="text-norelle-cream hover:text-norelle-text-muted transition-colors duration-200">
                    Instagram
                  </a>
                  <a href="#" className="text-norelle-cream hover:text-norelle-text-muted transition-colors duration-200">
                    Facebook
                  </a>
                  <a href="#" className="text-norelle-cream hover:text-norelle-text-muted transition-colors duration-200">
                    Pinterest
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
