import Link from 'next/link'
import { getFeaturedProducts, getSaleProducts } from '@/data/products'
import { ProductCard } from '@/components/ProductCard'
import { ImmersiveHero } from '@/components/luxury/ImmersiveHero'
import { ArrowRightIcon, SparklesIcon } from '@heroicons/react/24/outline'

export default function HomePage() {
  const featuredProducts = getFeaturedProducts()
  const saleProducts = getSaleProducts()

  return (
    <div className="min-h-screen">
      {/* Immersive Hero Section */}
      <ImmersiveHero />

      {/* Trust Bar */}
      <section className="bg-norelle-burgundy-light border-y border-norelle-border">
        <div className="container-max py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl font-serif font-bold text-norelle-cream mb-1">500+</div>
              <div className="text-sm text-norelle-text-muted">Happy Customers</div>
            </div>
            <div>
              <div className="text-2xl font-serif font-bold text-norelle-cream mb-1">50+</div>
              <div className="text-sm text-norelle-text-muted">Unique Designs</div>
            </div>
            <div>
              <div className="text-2xl font-serif font-bold text-norelle-cream mb-1">2 Years</div>
              <div className="text-sm text-norelle-text-muted">Warranty</div>
            </div>
            <div>
              <div className="text-2xl font-serif font-bold text-norelle-cream mb-1">Free</div>
              <div className="text-sm text-norelle-text-muted">Shipping €75+</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section-padding bg-norelle-burgundy">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-norelle-cream mb-4">
              Featured Pieces
            </h2>
            <p className="text-norelle-text-muted max-w-2xl mx-auto">
              Handpicked selections from our collection, representing the finest in craftsmanship and design.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredProducts.slice(0, 6).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center">
            <Link 
              href="/shop" 
              className="btn-secondary inline-flex items-center group"
            >
              View All Products
              <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="section-padding bg-norelle-burgundy-light">
        <div className="container-max">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-norelle-cream mb-6">
                The Norelle Story
              </h2>
              <div className="space-y-4 text-norelle-text-muted leading-relaxed">
                <p>
                  Founded in Brussels, Norelle represents the perfect fusion of traditional craftsmanship 
                  and contemporary design. Our journey began with a simple vision: to create jewellery that 
                  celebrates life's most precious moments with timeless elegance.
                </p>
                <p>
                  Each piece in our collection is meticulously crafted by skilled artisans who share our 
                  passion for excellence. We source only the finest materials, from precious metals to 
                  ethically sourced gemstones, ensuring that every creation meets our exacting standards.
                </p>
                <p>
                  At Norelle, we believe that jewellery is more than just adornment—it's a expression of 
                  individuality, a celebration of milestones, and a legacy to be cherished for generations.
                </p>
              </div>
              <Link 
                href="/about" 
                className="btn-primary mt-8 inline-flex items-center group"
              >
                Learn More
                <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </div>
            <div className="relative h-96 lg:h-full min-h-96 rounded-lg overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-norelle-cream/20 to-norelle-burgundy/20" />
              <Image
                src="/images/brand-story.jpg"
                alt="Norelle craftsmanship"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Sale Section */}
      {saleProducts.length > 0 && (
        <section className="section-padding bg-norelle-burgundy">
          <div className="container-max">
            <div className="text-center mb-12">
              <div className="inline-flex items-center bg-norelle-cream text-norelle-burgundy px-4 py-2 rounded-sm font-medium mb-4">
                Limited Time Offer
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-norelle-cream mb-4">
                Special Sale
              </h2>
              <p className="text-norelle-text-muted max-w-2xl mx-auto">
                Discover selected pieces at exceptional prices. These limited-time offers won't last long.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {saleProducts.slice(0, 3).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            <div className="text-center">
              <Link 
                href="/shop?filter=sale" 
                className="btn-secondary inline-flex items-center group"
              >
                View All Sale Items
                <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Categories Preview */}
      <section className="section-padding bg-norelle-burgundy-light">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-norelle-cream mb-4">
              Shop by Category
            </h2>
            <p className="text-norelle-text-muted max-w-2xl mx-auto">
              Explore our carefully curated collections, each designed to complement your unique style.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Necklaces', slug: 'necklaces', count: 3 },
              { name: 'Earrings', slug: 'earrings', count: 3 },
              { name: 'Bracelets', slug: 'bracelets', count: 3 },
              { name: 'Rings', slug: 'rings', count: 2 },
            ].map((category) => (
              <Link
                key={category.slug}
                href={`/category/${category.slug}`}
                className="group block bg-norelle-burgundy border border-norelle-border rounded-lg p-6 text-center hover:border-norelle-cream transition-all duration-300"
              >
                <div className="w-16 h-16 bg-norelle-burgundy-light border border-norelle-border rounded-full flex items-center justify-center mx-auto mb-4 group-hover:border-norelle-cream transition-colors duration-300">
                  <div className="w-8 h-8 bg-norelle-cream rounded-sm" />
                </div>
                <h3 className="text-norelle-cream font-medium mb-2">{category.name}</h3>
                <p className="text-sm text-norelle-text-muted">{category.count} pieces</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="section-padding bg-norelle-burgundy">
        <div className="container-max">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-norelle-cream mb-4">
              Stay in Touch
            </h2>
            <p className="text-norelle-text-muted mb-8">
              Subscribe to receive exclusive offers, new arrivals, and the latest news from Norelle.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 input-field"
                required
              />
              <button type="submit" className="btn-primary">
                Subscribe
              </button>
            </form>
            <p className="text-sm text-norelle-text-muted mt-4">
              Join 500+ subscribers. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
