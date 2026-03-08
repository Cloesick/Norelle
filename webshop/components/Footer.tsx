'use client'

import React from 'react'
import Link from 'next/link'
import { 
  MapPinIcon, 
  PhoneIcon, 
  EnvelopeIcon,
  CreditCardIcon,
  TruckIcon,
  ShieldCheckIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    shop: [
      { name: 'All Products', href: '/shop' },
      { name: 'Necklaces', href: '/category/necklaces' },
      { name: 'Earrings', href: '/category/earrings' },
      { name: 'Bracelets', href: '/category/bracelets' },
      { name: 'Rings', href: '/category/rings' },
      { name: 'Collections', href: '/category/collections' },
    ],
    help: [
      { name: 'Shipping Information', href: '/shipping' },
      { name: 'Returns & Refunds', href: '/returns' },
      { name: 'Size Guide', href: '/size-guide' },
      { name: 'Care Instructions', href: '/care' },
      { name: 'Track Order', href: '/track' },
      { name: 'Contact Us', href: '/contact' },
    ],
    company: [
      { name: 'About Norelle', href: '/about' },
      { name: 'Our Story', href: '/story' },
      { name: 'Sustainability', href: '/sustainability' },
      { name: 'Press', href: '/press' },
      { name: 'Careers', href: '/careers' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms & Conditions', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookies' },
      { name: 'Accessibility', href: '/accessibility' },
    ],
  }

  const trustBadges = [
    { icon: CreditCardIcon, label: 'Secure Payment' },
    { icon: TruckIcon, label: 'Free Shipping' },
    { icon: ShieldCheckIcon, label: '2-Year Warranty' },
    { icon: ArrowPathIcon, label: '30-Day Returns' },
  ]

  const socialLinks = [
    { name: 'Instagram', href: 'https://instagram.com/norelle' },
    { name: 'Facebook', href: 'https://facebook.com/norelle' },
    { name: 'Pinterest', href: 'https://pinterest.com/norelle' },
  ]

  return (
    <footer className="bg-norelle-burgundy-dark border-t border-norelle-border">
      {/* Trust Badges */}
      <div className="border-b border-norelle-border">
        <div className="container-max py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {trustBadges.map((badge, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <badge.icon className="w-8 h-8 text-norelle-cream mb-2" />
                <span className="text-sm text-norelle-text-muted">{badge.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="section-padding">
        <div className="container-max">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Brand Column */}
            <div className="lg:col-span-2">
              <h3 className="text-2xl font-serif font-bold text-norelle-cream mb-4">
                Norelle
              </h3>
              <p className="text-norelle-text-muted mb-6 leading-relaxed">
                Timeless elegance crafted with precision and passion. 
                Discover exquisite jewellery that celebrates life's most precious moments.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-3">
                  <MapPinIcon className="w-4 h-4 text-norelle-text-muted flex-shrink-0" />
                  <span className="text-sm text-norelle-text-muted">
                    Rue des Bouchers 12, 1000 Brussels, Belgium
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <PhoneIcon className="w-4 h-4 text-norelle-text-muted flex-shrink-0" />
                  <span className="text-sm text-norelle-text-muted">+32 2 123 45 67</span>
                </div>
                <div className="flex items-center space-x-3">
                  <EnvelopeIcon className="w-4 h-4 text-norelle-text-muted flex-shrink-0" />
                  <span className="text-sm text-norelle-text-muted">hello@norelle.com</span>
                </div>
              </div>

              {/* Newsletter */}
              <div className="bg-norelle-burgundy border border-norelle-border rounded-sm p-4">
                <h4 className="text-norelle-cream font-medium mb-2">Stay in Touch</h4>
                <p className="text-sm text-norelle-text-muted mb-3">
                  Subscribe for exclusive offers and new arrivals
                </p>
                <form className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="flex-1 bg-norelle-burgundy-light border border-norelle-border text-norelle-cream placeholder-norelle-text-muted px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-norelle-cream"
                  />
                  <button
                    type="submit"
                    className="bg-norelle-cream text-norelle-burgundy px-4 py-2 text-sm font-medium hover:bg-white transition-colors duration-200"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>

            {/* Shop Links */}
            <div>
              <h4 className="text-norelle-cream font-medium mb-4">Shop</h4>
              <ul className="space-y-2">
                {footerLinks.shop.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-norelle-text-muted hover:text-norelle-cream transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Help Links */}
            <div>
              <h4 className="text-norelle-cream font-medium mb-4">Help</h4>
              <ul className="space-y-2">
                {footerLinks.help.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-norelle-text-muted hover:text-norelle-cream transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company & Legal */}
            <div>
              <h4 className="text-norelle-cream font-medium mb-4">Company</h4>
              <ul className="space-y-2 mb-6">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-norelle-text-muted hover:text-norelle-cream transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
              
              <h4 className="text-norelle-cream font-medium mb-4">Legal</h4>
              <ul className="space-y-2">
                {footerLinks.legal.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-norelle-text-muted hover:text-norelle-cream transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-norelle-border bg-norelle-burgundy">
        <div className="container-max py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-sm text-norelle-text-muted">
              © {currentYear} Norelle. All rights reserved.
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-6">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  className="text-sm text-norelle-text-muted hover:text-norelle-cream transition-colors duration-200"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.name}
                </Link>
              ))}
            </div>

            {/* Payment Methods */}
            <div className="text-sm text-norelle-text-muted">
              Payment methods: Visa, Mastercard, PayPal, Bank Transfer
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
