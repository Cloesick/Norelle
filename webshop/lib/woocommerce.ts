import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api'

const api = new WooCommerceRestApi({
  url: process.env.NEXT_PUBLIC_WOOCOMMERCE_URL || 'http://localhost:8080',
  consumerKey: process.env.WOOCOMMERCE_CONSUMER_KEY || '',
  consumerSecret: process.env.WOOCOMMERCE_CONSUMER_SECRET || '',
  version: 'wc/v3',
})

export interface WooProduct {
  id: number
  name: string
  slug: string
  description: string
  short_description: string
  price: string
  regular_price: string
  sale_price: string
  on_sale: boolean
  status: string
  catalog_visibility: string
  sku: string
  stock_quantity: number | null
  stock_status: string
  categories: { id: number; name: string; slug: string }[]
  tags: { id: number; name: string; slug: string }[]
  images: { id: number; src: string; alt: string }[]
  attributes: { id: number; name: string; options: string[] }[]
  featured: boolean
  weight: string
  dimensions: { length: string; width: string; height: string }
}

export interface WooCategory {
  id: number
  name: string
  slug: string
  description: string
  count: number
  image: { id: number; src: string; alt: string } | null
}

export interface WooOrder {
  id: number
  status: string
  total: string
  currency: string
  line_items: {
    id: number
    name: string
    product_id: number
    quantity: number
    total: string
  }[]
}

// ─── Products ───────────────────────────────────────────────

export async function getProducts(params?: {
  per_page?: number
  page?: number
  category?: number
  featured?: boolean
  orderby?: string
  order?: 'asc' | 'desc'
  search?: string
  status?: string
}): Promise<WooProduct[]> {
  try {
    const { data } = await api.get('products', {
      per_page: 100,
      status: 'publish',
      ...params,
    })
    return data
  } catch (error) {
    console.error('[WooCommerce] Failed to fetch products:', error)
    return []
  }
}

export async function getProductBySlug(slug: string): Promise<WooProduct | null> {
  try {
    const { data } = await api.get('products', { slug })
    return data.length > 0 ? data[0] : null
  } catch (error) {
    console.error(`[WooCommerce] Failed to fetch product "${slug}":`, error)
    return null
  }
}

export async function getProductById(id: number): Promise<WooProduct | null> {
  try {
    const { data } = await api.get(`products/${id}`)
    return data
  } catch (error) {
    console.error(`[WooCommerce] Failed to fetch product #${id}:`, error)
    return null
  }
}

export async function getFeaturedProducts(): Promise<WooProduct[]> {
  return getProducts({ featured: true })
}

// ─── Categories ─────────────────────────────────────────────

export async function getCategories(): Promise<WooCategory[]> {
  try {
    const { data } = await api.get('products/categories', {
      per_page: 100,
      hide_empty: true,
    })
    return data
  } catch (error) {
    console.error('[WooCommerce] Failed to fetch categories:', error)
    return []
  }
}

// ─── Orders ─────────────────────────────────────────────────

export async function createOrder(orderData: {
  payment_method: string
  payment_method_title: string
  billing: Record<string, string>
  shipping: Record<string, string>
  line_items: { product_id: number; quantity: number }[]
}): Promise<WooOrder | null> {
  try {
    const { data } = await api.post('orders', orderData)
    return data
  } catch (error) {
    console.error('[WooCommerce] Failed to create order:', error)
    return null
  }
}

// ─── Health Check ───────────────────────────────────────────

export async function checkConnection(): Promise<boolean> {
  try {
    await api.get('system_status')
    return true
  } catch {
    return false
  }
}

export default api
