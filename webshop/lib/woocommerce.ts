/**
 * WooCommerce Store API client for headless Next.js frontend.
 *
 * Uses the Store API (wc/store/v1) which requires NO authentication
 * for read operations (products, categories). This is the recommended
 * API for customer-facing headless storefronts.
 *
 * For admin operations (creating products, managing orders), use
 * WP-CLI or the WordPress admin panel directly.
 */

const WC_URL = process.env.NEXT_PUBLIC_WOOCOMMERCE_URL || 'http://localhost:8080'

async function storeApiFetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${WC_URL}/wp-json/wc/store/v1/${endpoint}`
  const res = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    cache: 'no-store',
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Store API ${res.status}: ${text}`)
  }
  return res.json()
}

// ─── Types ──────────────────────────────────────────────────

export interface StoreProduct {
  id: number
  name: string
  slug: string
  description: string
  short_description: string
  sku: string
  on_sale: boolean
  prices: {
    price: string
    regular_price: string
    sale_price: string
    currency_code: string
    currency_symbol: string
    currency_minor_unit: number
  }
  images: { id: number; src: string; alt: string; thumbnail: string }[]
  categories: { id: number; name: string; slug: string }[]
  tags: { id: number; name: string; slug: string }[]
  attributes: { id: number; name: string; taxonomy: string; has_variations: boolean; terms: { id: number; name: string; slug: string }[] }[]
  stock_status: string
  is_purchasable: boolean
  average_rating: string
  review_count: number
}

export interface StoreCategory {
  id: number
  name: string
  slug: string
  description: string
  parent: number
  count: number
  image: { id: number; src: string; alt: string; thumbnail: string } | null
}

// ─── Products ───────────────────────────────────────────────

export async function getProducts(params?: {
  per_page?: number
  page?: number
  category?: string
  search?: string
  orderby?: string
  order?: 'asc' | 'desc'
}): Promise<StoreProduct[]> {
  try {
    const query = new URLSearchParams({
      per_page: '100',
      ...Object.fromEntries(
        Object.entries(params || {})
          .filter(([, v]) => v !== undefined)
          .map(([k, v]) => [k, String(v)])
      ),
    })
    return await storeApiFetch<StoreProduct[]>(`products?${query}`)
  } catch (error) {
    console.error('[WooCommerce] Failed to fetch products:', error)
    return []
  }
}

export async function getProductBySlug(slug: string): Promise<StoreProduct | null> {
  try {
    const products = await storeApiFetch<StoreProduct[]>(
      `products?slug=${encodeURIComponent(slug)}`
    )
    return products.length > 0 ? products[0] : null
  } catch (error) {
    console.error(`[WooCommerce] Failed to fetch product "${slug}":`, error)
    return null
  }
}

export async function getProductById(id: number): Promise<StoreProduct | null> {
  try {
    return await storeApiFetch<StoreProduct>(`products/${id}`)
  } catch (error) {
    console.error(`[WooCommerce] Failed to fetch product #${id}:`, error)
    return null
  }
}

// ─── Categories ─────────────────────────────────────────────

export async function getCategories(): Promise<StoreCategory[]> {
  try {
    return await storeApiFetch<StoreCategory[]>('products/categories')
  } catch (error) {
    console.error('[WooCommerce] Failed to fetch categories:', error)
    return []
  }
}

// ─── Health Check ───────────────────────────────────────────

export async function checkConnection(): Promise<boolean> {
  try {
    await storeApiFetch('products?per_page=1')
    return true
  } catch {
    return false
  }
}
