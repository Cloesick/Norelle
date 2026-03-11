'use client'

import React from 'react'
import Link from 'next/link'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    fragrances: [
      { name: 'Élevé', href: '/product/eleve-eau-de-parfum' },
      { name: 'Solène', href: '/product/solene-eau-de-parfum' },
      { name: 'Fovère', href: '/product/fovere-eau-de-parfum' },
      { name: 'Travel Sprays', href: '/category/travel' },
      { name: 'Gift Sets', href: '/category/gift-sets' },
    ],
    help: [
      { name: 'Shipping', href: '/shipping' },
      { name: 'Returns', href: '/returns' },
      { name: 'Care Guide', href: '/care' },
      { name: 'Contact', href: '/contact' },
    ],
    company: [
      { name: 'Our Story', href: '/about' },
      { name: 'Sustainability', href: '/sustainability' },
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookies' },
    ],
  }

  return (
    <footer className="bg-norelle-burgundy-dark border-t border-norelle-cream/5">
      <div className="max-w-6xl mx-auto px-6">
        {/* Main Footer */}
        <div className="py-16 md:py-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-10">
          {/* Brand */}
          <div>
            <Link href="/" className="block mb-6">
              <span className="font-display font-light text-norelle-cream text-xl tracking-wide">
                Nor&#x0113;lle
              </span>
            </Link>
            <p className="text-norelle-cream/40 text-xs font-light leading-relaxed mb-6">
              Luxury Belgian pet fragrance. Refined scents composed to honour 
              presence, softness and the quiet elegance of care.
            </p>
            <p className="text-norelle-cream/30 text-xs font-light">
              hello@norelle.com
            </p>
          </div>

          {/* Fragrances */}
          <div>
            <h4 className="text-norelle-cream/50 text-xs font-body font-light uppercase tracking-brand mb-6">
              Fragrances
            </h4>
            <ul className="space-y-3">
              {footerLinks.fragrances.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-norelle-cream/40 text-xs font-light hover:text-norelle-cream transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="text-norelle-cream/50 text-xs font-body font-light uppercase tracking-brand mb-6">
              Help
            </h4>
            <ul className="space-y-3">
              {footerLinks.help.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-norelle-cream/40 text-xs font-light hover:text-norelle-cream transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-norelle-cream/50 text-xs font-body font-light uppercase tracking-brand mb-6">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-norelle-cream/40 text-xs font-light hover:text-norelle-cream transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-norelle-cream/5 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-norelle-cream/25 text-[11px] font-light tracking-wide">
            &copy; {currentYear} Nor&#x0113;lle. All rights reserved.
          </p>
          <div className="flex items-center gap-8">
            {['Instagram', 'Facebook'].map((social) => (
              <a
                key={social}
                href={`https://${social.toLowerCase()}.com/norelle`}
                className="text-norelle-cream/25 text-[11px] font-light tracking-wide hover:text-norelle-cream/50 transition-colors duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
