import { Cormorant, Jost } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { CartProvider } from '@/context/CartContext'
import { Toaster } from 'react-hot-toast'
import CookieBanner from '@/components/security/CookieBanner'
import BottomNav from '@/components/BottomNav'
import { LocaleProvider } from '@/context/LocaleContext'

const cormorant = Cormorant({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-cormorant',
  display: 'swap',
})

const jost = Jost({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-jost',
  display: 'swap',
})

export const metadata = {
  title: 'Norēlle® — for those we live with',
  description: 'Luxury Belgian pet fragrance. Refined scents composed to honour presence, softness and the quiet elegance of care.',
  metadataBase: new URL('https://norelle.com'),
  manifest: '/manifest.json',
  appleWebApp: {
    statusBarStyle: 'black-translucent' as const,
    title: 'Norēlle',
  },
  other: {
    'mobile-web-app-capable': 'yes',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover' as const,
  themeColor: '#3B0505',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable}`} suppressHydrationWarning>
      <body className="min-h-screen bg-norelle-burgundy text-norelle-cream font-body">
        <LocaleProvider>
        <CartProvider>
          <div className="relative min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 pb-20 lg:pb-0">
              {children}
            </main>
            <Footer />
          </div>
          <BottomNav />
          <CookieBanner />
          <Toaster
            position="top-center"
            toastOptions={{
              style: {
                background: '#2F1B1A',
                color: '#FFFAEB',
                border: '1px solid rgba(255, 250, 235, 0.12)',
                fontFamily: 'var(--font-jost)',
                fontWeight: 300,
              },
            }}
          />
        </CartProvider>
        </LocaleProvider>
      </body>
    </html>
  )
}
