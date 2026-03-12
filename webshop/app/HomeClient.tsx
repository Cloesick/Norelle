'use client'

import Link from 'next/link'
import { Product, Category } from '@/types'
import { ProductCard } from '@/components/ProductCard'
import { useT } from '@/context/LocaleContext'

interface HomeClientProps {
  featuredProducts: Product[]
  categories: Category[]
}

export default function HomeClient({ featuredProducts, categories }: HomeClientProps) {
  const t = useT()

  const fragrances = [
    {
      name: 'Élevé',
      subtitle: t.home.eleveSubtitle,
      description: t.home.eleveDescription,
      notes: t.home.eleveNotes,
    },
    {
      name: 'Solène',
      subtitle: t.home.soleneSubtitle,
      description: t.home.soleneDescription,
      notes: t.home.soleneNotes,
    },
    {
      name: 'Fovère',
      subtitle: t.home.fovereSubtitle,
      description: t.home.fovereDescription,
      notes: t.home.fovereNotes,
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero — Full-screen on desktop, compact on mobile */}
      <section className="-mt-24 relative min-h-[85vh] md:min-h-screen flex items-center justify-center bg-norelle-burgundy">
        <div className="absolute inset-0 bg-gradient-to-b from-norelle-burgundy-dark/40 via-transparent to-norelle-burgundy" />
        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <h1 className="font-display font-light text-norelle-cream normal-case tracking-wide text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.1] mb-4 md:mb-8">
            Nor&#x0113;lle<sup className="text-lg md:text-xl align-super">&#174;</sup>
          </h1>
          <p className="font-body font-light text-norelle-cream/60 text-sm sm:text-base tracking-[0.2em] uppercase mb-6 md:mb-12">
            {t.home.tagline}
          </p>
          <div className="w-px h-10 md:h-16 bg-norelle-cream/20 mx-auto mb-6 md:mb-12" />
          <p className="font-body font-light text-norelle-cream/50 text-sm leading-relaxed max-w-md mx-auto mb-8 md:mb-12">
            {t.home.heroDescription}
          </p>
          <Link 
            href="/shop" 
            className="btn-secondary text-xs"
          >
            {t.home.discoverCollection}
          </Link>
        </div>
      </section>

      {/* The Three Fragrances — Product philosophy */}
      <section className="py-12 md:py-36 bg-norelle-burgundy">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-10 md:mb-20">
            <h2 className="mb-3 md:mb-6">{t.home.threeMomentsTitle}</h2>
            <p className="text-norelle-cream/50 font-light max-w-lg mx-auto leading-relaxed text-sm">
              {t.home.threeMomentsDescription}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 md:gap-10">
            {fragrances.map((fragrance) => (
              <div key={fragrance.name} className="text-center">
                {/* Placeholder circle for product image */}
                <div className="w-16 h-16 md:w-40 md:h-40 mx-auto mb-3 md:mb-8 rounded-full border border-norelle-cream/10 flex items-center justify-center">
                  <span className="font-display font-light text-norelle-cream/20 text-xl md:text-4xl normal-case">
                    {fragrance.name[0]}
                  </span>
                </div>
                <h3 className="font-display font-light text-norelle-cream text-base md:text-2xl normal-case tracking-wide mb-1 md:mb-2">
                  {fragrance.name}
                </h3>
                <p className="text-norelle-cream/40 text-[10px] md:text-xs uppercase tracking-brand mb-2 md:mb-4">
                  {fragrance.subtitle}
                </p>
                <p className="text-norelle-cream/50 text-xs md:text-sm font-light leading-relaxed mb-2 md:mb-4 max-w-xs mx-auto hidden sm:block">
                  {fragrance.description}
                </p>
                <p className="text-norelle-cream/30 text-[10px] md:text-xs tracking-wide hidden sm:block">
                  {fragrance.notes}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="flex justify-center py-1 md:py-2 bg-norelle-burgundy">
        <div className="w-px h-10 md:h-20 bg-norelle-cream/10" />
      </div>

      {/* Featured Products */}
      <section className="py-12 md:py-36 bg-norelle-burgundy">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="mb-3 md:mb-6">{t.home.collectionTitle}</h2>
            <p className="text-norelle-cream/50 font-light max-w-md mx-auto text-sm leading-relaxed">
              {t.home.collectionDescription}
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8 md:gap-x-8 md:gap-y-14 mb-10 md:mb-16">
            {featuredProducts.slice(0, 6).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center">
            <Link href="/shop" className="btn-secondary text-xs">
              {t.home.viewAllFragrances}
            </Link>
          </div>
        </div>
      </section>

      {/* Brand Philosophy */}
      <section className="py-12 md:py-36 bg-norelle-mocha">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="font-display font-light text-norelle-cream/70 text-xl md:text-3xl leading-relaxed normal-case mb-6 md:mb-10">
            {t.home.philosophyQuote}
          </p>
          <div className="w-12 h-px bg-norelle-cream/20 mx-auto mb-6 md:mb-10" />
          <p className="text-norelle-cream/40 text-xs uppercase tracking-brand">
            {t.home.philosophyAttribution}
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 md:py-36 bg-norelle-burgundy">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="mb-3 md:mb-6">{t.home.shopByFormat}</h2>
          </div>

          <div className="grid grid-cols-3 gap-3 md:gap-8">
            {categories.map((category) => {
              const catKey = category.slug === 'eau-de-parfum' ? 'eauDeParfum'
                : category.slug === 'travel' ? 'travelSprays'
                : 'giftSets'
              return (
                <Link
                  key={category.slug}
                  href={`/category/${category.slug}`}
                  className="group block border border-norelle-cream/10 p-4 md:p-10 text-center hover:border-norelle-cream/30 transition-all duration-500"
                >
                  <h3 className="text-norelle-cream font-body font-light text-sm uppercase tracking-brand mb-3 group-hover:text-norelle-cream transition-colors duration-300">
                    {t.categories[catKey as keyof typeof t.categories]}
                  </h3>
                  <p className="text-xs text-norelle-cream/40 font-light leading-relaxed">
                    {t.categories[`${catKey}Desc` as keyof typeof t.categories]}
                  </p>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-12 md:py-36 bg-norelle-burgundy border-t border-norelle-cream/5">
        <div className="max-w-md mx-auto px-6 text-center">
          <h2 className="mb-3 md:mb-6">{t.home.stayCloseTitle}</h2>
          <p className="text-norelle-cream/50 text-sm font-light mb-6 md:mb-10 leading-relaxed">
            {t.home.stayCloseDescription}
          </p>
          <form className="space-y-4">
            <input
              type="email"
              placeholder={t.common.emailPlaceholder}
              className="w-full input-field text-center"
              required
            />
            <button type="submit" className="btn-primary w-full text-xs">
              {t.common.subscribe}
            </button>
          </form>
          <p className="text-xs text-norelle-cream/30 mt-6 font-light">
            {t.common.noSpam}
          </p>
        </div>
      </section>
    </div>
  )
}
