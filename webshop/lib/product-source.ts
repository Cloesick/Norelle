/**
 * Product data source with WooCommerce → static fallback.
 *
 * Fetches from WooCommerce Store API when available.
 * Falls back to static data/products.ts when WooCommerce is down.
 */

import { Product, Category } from '@/types'
import { getProducts as wcGetProducts, getProductBySlug as wcGetProductBySlug, type StoreProduct } from '@/lib/woocommerce'
import { products as staticProducts, categories as staticCategories, getFeaturedProducts as staticGetFeatured } from '@/data/products'

// ─── Slug → local image filename (WooCommerce slugs differ from SVG names) ──

const slugToImage: Record<string, string> = {
  'eleve-eau-de-parfum':  'eleve-edp.svg',
  'solene-eau-de-parfum': 'solene-edp.svg',
  'fovere-eau-de-parfum': 'fovere-edp.svg',
  'eleve-travel-spray':   'eleve-travel.svg',
  'solene-travel-spray':  'solene-travel.svg',
  'fovere-travel-spray':  'fovere-travel.svg',
  'the-ritual-collection':'ritual-collection.svg',
  'the-discovery-set':    'discovery-set.svg',
}

// ─── Mapper: StoreProduct → Product ─────────────────────────

function mapStoreProduct(sp: StoreProduct): Product {
  const minorUnit = sp.prices.currency_minor_unit || 2
  const divisor = Math.pow(10, minorUnit)

  const price = parseInt(sp.prices.regular_price, 10) / divisor
  const salePrice = sp.on_sale && sp.prices.sale_price
    ? parseInt(sp.prices.sale_price, 10) / divisor
    : undefined

  const categories: Category[] = sp.categories.map(c => ({
    id: String(c.id),
    name: c.name,
    slug: c.slug,
    description: '',
    order: 0,
  }))

  return {
    id: String(sp.id),
    sku: sp.sku,
    name: sp.name,
    slug: sp.slug,
    description: sp.description,
    shortDescription: sp.short_description,
    price,
    salePrice,
    categories,
    tags: sp.tags.map(t => t.slug),
    images: sp.images.length > 0
      ? sp.images.map((img, i) => ({
          id: String(img.id),
          url: img.src,
          alt: img.alt || sp.name,
          isPrimary: i === 0,
        }))
      : [{
          id: '0',
          url: `/images/products/${slugToImage[sp.slug] || sp.slug + '.svg'}`,
          alt: sp.name,
          isPrimary: true,
        }],
    stock: sp.stock_status === 'instock' ? 10 : 0,
    featured: false,
    rating: parseFloat(sp.average_rating) || 0,
    reviewCount: sp.review_count || 0,
    weight: 0,
    materials: [],
    careInstructions: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
}

// ─── Public API ─────────────────────────────────────────────

export async function getAllProducts(): Promise<Product[]> {
  try {
    const wcProducts = await wcGetProducts()
    if (wcProducts.length > 0) {
      return wcProducts.map(mapStoreProduct)
    }
  } catch (error) {
    console.warn('[product-source] WooCommerce unavailable, using static data')
  }
  return staticProducts
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const wcProduct = await wcGetProductBySlug(slug)
    if (wcProduct) {
      return mapStoreProduct(wcProduct)
    }
  } catch (error) {
    console.warn(`[product-source] WooCommerce unavailable for slug "${slug}", using static data`)
  }
  return staticProducts.find(p => p.slug === slug) || null
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const all = await getAllProducts()
  const featured = all.filter(p => p.featured)
  return featured.length > 0 ? featured : all.slice(0, 6)
}

export function getStaticCategories(): Category[] {
  return staticCategories
}
