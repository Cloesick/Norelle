'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCart } from '@/context/CartContext'
import { useT } from '@/context/LocaleContext'
import {
  HomeIcon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  UserIcon,
} from '@heroicons/react/24/outline'
import {
  HomeIcon as HomeIconSolid,
  MagnifyingGlassIcon as MagnifyingGlassIconSolid,
  ShoppingBagIcon as ShoppingBagIconSolid,
  UserIcon as UserIconSolid,
} from '@heroicons/react/24/solid'

export default function BottomNav() {
  const pathname = usePathname()
  const { getItemCount } = useCart()
  const t = useT()
  const itemCount = getItemCount()

  const tabs = [
    { name: t.bottomNav.home, key: 'home', href: '/', icon: HomeIcon, activeIcon: HomeIconSolid },
    { name: t.bottomNav.shop, key: 'shop', href: '/shop', icon: MagnifyingGlassIcon, activeIcon: MagnifyingGlassIconSolid },
    { name: t.bottomNav.bag, key: 'bag', href: '/cart', icon: ShoppingBagIcon, activeIcon: ShoppingBagIconSolid },
    { name: t.bottomNav.account, key: 'account', href: '/account', icon: UserIcon, activeIcon: UserIconSolid },
  ]

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden">
      {/* Gradient fade above the bar */}
      <div className="h-6 bg-gradient-to-t from-norelle-burgundy to-transparent pointer-events-none" />

      <div className="bg-norelle-burgundy/95 backdrop-blur-xl border-t border-norelle-cream/8">
        <div className="flex items-center justify-around h-16 pb-safe">
          {tabs.map((tab) => {
            const active = isActive(tab.href)
            const Icon = active ? tab.activeIcon : tab.icon

            return (
              <Link
                key={tab.key}
                href={tab.href}
                className={`relative flex flex-col items-center justify-center w-full h-full transition-all duration-200 ${
                  active ? 'text-norelle-cream' : 'text-norelle-cream/40'
                }`}
              >
                <div className="relative">
                  <Icon className="w-5 h-5" strokeWidth={active ? 2 : 1.5} />
                  {tab.key === 'bag' && itemCount > 0 && (
                    <span className="absolute -top-1.5 -right-2 bg-norelle-cream text-norelle-burgundy text-[9px] font-body font-normal rounded-full min-w-[16px] h-4 flex items-center justify-center px-1">
                      {itemCount > 99 ? '99+' : itemCount}
                    </span>
                  )}
                </div>
                <span className={`text-[10px] mt-1 font-body transition-all duration-200 ${
                  active ? 'font-normal' : 'font-light'
                }`}>
                  {tab.name}
                </span>

                {/* Active indicator dot */}
                {active && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-norelle-cream" />
                )}
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
