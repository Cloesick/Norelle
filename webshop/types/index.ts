export interface Product {
  id: string
  sku: string
  name: string
  slug: string
  description: string
  shortDescription: string
  price: number
  salePrice?: number
  categories: Category[]
  tags: string[]
  images: ProductImage[]
  stock: number
  featured: boolean
  rating: number
  reviewCount: number
  weight?: number
  dimensions?: {
    length: number
    width: number
    height: number
  }
  materials: string[]
  careInstructions: string[]
  createdAt: string
  updatedAt: string
}

export interface ProductImage {
  id: string
  url: string
  alt: string
  isPrimary: boolean
}

export interface Category {
  id: string
  name: string
  slug: string
  description: string
  image?: string
  order: number
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface Cart {
  items: CartItem[]
  subtotal: number
  total: number
  shipping: number
  tax: number
}

export interface Customer {
  id: string
  email: string
  firstName: string
  lastName: string
  phone?: string
}

export interface ShippingAddress {
  firstName: string
  lastName: string
  company?: string
  address: string
  apartment?: string
  city: string
  postalCode: string
  country: string
}

export interface BillingAddress extends ShippingAddress {}

export interface Order {
  id: string
  orderNumber: string
  customer: Customer
  items: CartItem[]
  shippingAddress: ShippingAddress
  billingAddress: BillingAddress
  subtotal: number
  shipping: number
  tax: number
  total: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  paymentMethod: 'bank-transfer' | 'stripe' | 'paypal'
  paymentStatus: 'pending' | 'paid' | 'failed'
  createdAt: string
  updatedAt: string
}

export type SalesPipelineStage = 'discover' | 'choose' | 'overview' | 'payment' | 'confirmed'

export interface NavigationItem {
  name: string
  href: string
  children?: NavigationItem[]
}
