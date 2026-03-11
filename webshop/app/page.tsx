import Link from 'next/link'
import { getFeaturedProducts, categories } from '@/data/products'
import { ProductCard } from '@/components/ProductCard'

export default function HomePage() {
  const featuredProducts = getFeaturedProducts()

  return (
    <div className="min-h-screen">
      {/* Hero — Full-screen, minimal, brand-first */}
      <section className="-mt-24 relative min-h-screen flex items-center justify-center bg-norelle-burgundy">
        <div className="absolute inset-0 bg-gradient-to-b from-norelle-burgundy-dark/40 via-transparent to-norelle-burgundy" />
        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <h1 className="font-display font-light text-norelle-cream normal-case tracking-wide text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.1] mb-8">
            Nor&#x0113;lle<sup className="text-lg md:text-xl align-super">&#174;</sup>
          </h1>
          <p className="font-body font-light text-norelle-cream/60 text-sm sm:text-base tracking-[0.2em] uppercase mb-12">
            for those we live with
          </p>
          <div className="w-px h-16 bg-norelle-cream/20 mx-auto mb-12" />
          <p className="font-body font-light text-norelle-cream/50 text-sm leading-relaxed max-w-md mx-auto mb-12">
            Luxury fragrance composed to honour presence, softness 
            and the quiet elegance of care.
          </p>
          <Link 
            href="/shop" 
            className="btn-secondary text-xs"
          >
            Discover the collection
          </Link>
        </div>
      </section>

      {/* The Three Fragrances — Product philosophy */}
      <section className="py-24 md:py-36 bg-norelle-burgundy">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="mb-6">Three moments of care</h2>
            <p className="text-norelle-cream/50 font-light max-w-lg mx-auto leading-relaxed text-sm">
              Each fragrance addresses a different ritual — a different way 
              to honour the bond you share.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-16 md:gap-10">
            {[
              {
                name: 'Élevé',
                subtitle: 'Special occasions',
                description: 'A subtle form of ceremony. For when their presence deserves that extra touch of radiance.',
                notes: 'Warm amber · Soft musk · Bergamot',
              },
              {
                name: 'Solène',
                subtitle: 'Restoring freshness',
                description: 'Not about hiding, but about restoring. A reset towards frisheid and elegance.',
                notes: 'White tea · Fresh linen · Subtle cedar',
              },
              {
                name: 'Fovère',
                subtitle: 'Blending with home',
                description: 'As if the scent naturally becomes part of your interior. Warm, enveloping, harmonious.',
                notes: 'Cashmere woods · Vanilla · Sandalwood',
              },
            ].map((fragrance) => (
              <div key={fragrance.name} className="text-center">
                {/* Placeholder circle for product image */}
                <div className="w-40 h-40 mx-auto mb-8 rounded-full border border-norelle-cream/10 flex items-center justify-center">
                  <span className="font-display font-light text-norelle-cream/20 text-4xl normal-case">
                    {fragrance.name[0]}
                  </span>
                </div>
                <h3 className="font-display font-light text-norelle-cream text-2xl normal-case tracking-wide mb-2">
                  {fragrance.name}
                </h3>
                <p className="text-norelle-cream/40 text-xs uppercase tracking-brand mb-4">
                  {fragrance.subtitle}
                </p>
                <p className="text-norelle-cream/50 text-sm font-light leading-relaxed mb-4 max-w-xs mx-auto">
                  {fragrance.description}
                </p>
                <p className="text-norelle-cream/30 text-xs tracking-wide">
                  {fragrance.notes}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="flex justify-center py-2 bg-norelle-burgundy">
        <div className="w-px h-20 bg-norelle-cream/10" />
      </div>

      {/* Featured Products */}
      <section className="py-24 md:py-36 bg-norelle-burgundy">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="mb-6">The Collection</h2>
            <p className="text-norelle-cream/50 font-light max-w-md mx-auto text-sm leading-relaxed">
              Refined scents for those who give us everything, without condition.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14 mb-16">
            {featuredProducts.slice(0, 6).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center">
            <Link href="/shop" className="btn-secondary text-xs">
              View all fragrances
            </Link>
          </div>
        </div>
      </section>

      {/* Brand Philosophy */}
      <section className="py-24 md:py-36 bg-norelle-mocha">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="font-display font-light text-norelle-cream/70 text-2xl md:text-3xl leading-relaxed normal-case mb-10">
            &ldquo;Because they give us everything, without condition. 
            So please care for them.&rdquo;
          </p>
          <div className="w-12 h-px bg-norelle-cream/20 mx-auto mb-10" />
          <p className="text-norelle-cream/40 text-xs uppercase tracking-brand">
            The Nor&#x0113;lle philosophy
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="py-24 md:py-36 bg-norelle-burgundy">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="mb-6">Shop by format</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/category/${category.slug}`}
                className="group block border border-norelle-cream/10 p-10 text-center hover:border-norelle-cream/30 transition-all duration-500"
              >
                <h3 className="text-norelle-cream font-body font-light text-sm uppercase tracking-brand mb-3 group-hover:text-norelle-cream transition-colors duration-300">
                  {category.name}
                </h3>
                <p className="text-xs text-norelle-cream/40 font-light leading-relaxed">
                  {category.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 md:py-36 bg-norelle-burgundy border-t border-norelle-cream/5">
        <div className="max-w-md mx-auto px-6 text-center">
          <h2 className="mb-6">Stay close</h2>
          <p className="text-norelle-cream/50 text-sm font-light mb-10 leading-relaxed">
            Receive updates on new compositions, limited editions, 
            and the stories behind each fragrance.
          </p>
          <form className="space-y-4">
            <input
              type="email"
              placeholder="Your email address"
              className="w-full input-field text-center"
              required
            />
            <button type="submit" className="btn-primary w-full text-xs">
              Subscribe
            </button>
          </form>
          <p className="text-xs text-norelle-cream/30 mt-6 font-light">
            No spam. Unsubscribe at any time.
          </p>
        </div>
      </section>
    </div>
  )
}
