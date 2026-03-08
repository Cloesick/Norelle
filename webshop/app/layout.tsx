import { Inter, Cormorant_Garamond } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { CartProvider } from '@/context/CartContext'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
})

export const metadata = {
  title: 'Norelle — Timeless Elegance',
  description: 'Discover exquisite jewellery collections crafted with precision and passion. Premium necklaces, earrings, bracelets, and rings.',
  metadataBase: new URL('https://norelle.com'),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable}`}>
      <body className="min-h-screen bg-norelle-burgundy text-norelle-text font-sans">
        <CartProvider>
          <div className="relative min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
          <Toaster
            position="top-center"
            toastOptions={{
              style: {
                background: '#5a1a1a',
                color: '#eeefc9',
                border: '1px solid rgba(238, 239, 201, 0.2)',
              },
            }}
          />
        </CartProvider>
      </body>
    </html>
  )
}
