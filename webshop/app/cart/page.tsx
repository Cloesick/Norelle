'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useCart } from '@/context/CartContext'
import { SalesPipeline } from '@/components/SalesPipeline'
import { 
  MinusIcon, 
  PlusIcon, 
  XMarkIcon,
  ArrowRightIcon,
  TruckIcon
} from '@heroicons/react/24/outline'

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart, getSubtotal } = useCart()

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity >= 0) {
      updateQuantity(productId, newQuantity)
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('nl-BE', {
      style: 'currency',
      currency: 'EUR',
    }).format(price)
  }

  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-norelle-burgundy">
        <div className="container-max section-padding">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8">
              <div className="w-24 h-24 bg-norelle-burgundy-light border-2 border-norelle-border rounded-full flex items-center justify-center mx-auto mb-6">
                <XMarkIcon className="w-12 h-12 text-norelle-text-muted" />
              </div>
              <h1 className="text-3xl font-serif font-bold text-norelle-cream mb-4">
                Your bag is empty
              </h1>
              <p className="text-norelle-text-muted mb-8">
                Looks like you haven't added any pieces to your collection yet.
              </p>
            </div>
            
            <div className="space-y-4">
              <Link href="/shop" className="btn-primary inline-flex items-center group">
                Continue Shopping
                <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
              
              <div className="text-sm text-norelle-text-muted">
                <p>Free shipping on orders over €75</p>
                <p>30-day returns on all items</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-norelle-burgundy">
      <SalesPipeline />
      <div className="container-max section-padding">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-norelle-cream mb-4">
            Shopping Bag
          </h1>
          <p className="text-norelle-text-muted">
            {cart.items.length} {cart.items.length === 1 ? 'item' : 'items'} in your bag
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {cart.items.map((item) => {
                const product = item.product
                const primaryImage = product.images.find(img => img.isPrimary) || product.images[0]
                const price = product.salePrice || product.price

                return (
                  <div key={product.id} className="bg-norelle-burgundy-light border border-norelle-border rounded-lg p-6">
                    <div className="flex flex-col sm:flex-row gap-6">
                      {/* Product Image */}
                      <div className="relative w-full sm:w-32 h-32 flex-shrink-0">
                        <Image
                          src={primaryImage.url}
                          alt={primaryImage.alt}
                          fill
                          className="object-cover rounded"
                          sizes="(max-width: 640px) 100vw, 128px"
                        />
                        {product.salePrice && (
                          <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 text-xs font-medium rounded">
                            -{Math.round(((product.price - product.salePrice) / product.price) * 100)}%
                          </div>
                        )}
                      </div>

                      {/* Product Details */}
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-lg font-serif font-medium text-norelle-cream mb-1">
                              {product.name}
                            </h3>
                            <p className="text-sm text-norelle-text-muted mb-2">
                              {product.categories[0].name}
                            </p>
                            <p className="text-sm text-norelle-text-muted">
                              SKU: {product.sku}
                            </p>
                          </div>
                          
                          <button
                            onClick={() => removeFromCart(product.id)}
                            className="p-2 text-norelle-text-muted hover:text-red-400 transition-colors duration-200"
                          >
                            <XMarkIcon className="w-5 h-5" />
                          </button>
                        </div>

                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                          {/* Quantity Selector */}
                          <div className="flex items-center space-x-3">
                            <label className="text-sm text-norelle-text-muted">Quantity:</label>
                            <div className="flex items-center border border-norelle-border rounded-sm">
                              <button
                                onClick={() => handleQuantityChange(product.id, item.quantity - 1)}
                                className="p-2 text-norelle-cream hover:bg-norelle-burgundy transition-colors duration-200"
                                disabled={item.quantity <= 1}
                              >
                                <MinusIcon className="w-4 h-4" />
                              </button>
                              <span className="px-4 py-2 text-norelle-cream min-w-[3rem] text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => handleQuantityChange(product.id, item.quantity + 1)}
                                className="p-2 text-norelle-cream hover:bg-norelle-burgundy transition-colors duration-200"
                                disabled={item.quantity >= product.stock}
                              >
                                <PlusIcon className="w-4 h-4" />
                              </button>
                            </div>
                            {item.quantity >= product.stock && (
                              <span className="text-xs text-orange-400">
                                Max stock reached
                              </span>
                            )}
                          </div>

                          {/* Price */}
                          <div className="text-right">
                            <div className="text-lg font-bold text-norelle-cream">
                              {formatPrice(price * item.quantity)}
                            </div>
                            {product.salePrice && (
                              <div className="text-sm text-norelle-text-muted line-through">
                                {formatPrice(product.price * item.quantity)}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Cart Actions */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link href="/shop" className="btn-secondary inline-flex items-center justify-center group">
                <ArrowRightIcon className="w-5 h-5 mr-2 rotate-180 group-hover:-translate-x-1 transition-transform duration-200" />
                Continue Shopping
              </Link>
              
              <button
                onClick={clearCart}
                className="btn-secondary text-red-400 hover:text-red-300 hover:border-red-400 inline-flex items-center justify-center"
              >
                Clear Cart
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-norelle-burgundy-light border border-norelle-border rounded-lg p-6 sticky top-24">
              <h2 className="text-xl font-serif font-bold text-norelle-cream mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-norelle-text-muted">
                  <span>Subtotal</span>
                  <span>{formatPrice(cart.subtotal)}</span>
                </div>
                
                <div className="flex justify-between text-norelle-text-muted">
                  <span>Shipping</span>
                  <span>
                    {cart.shipping === 0 ? 'FREE' : formatPrice(cart.shipping)}
                  </span>
                </div>
                
                <div className="flex justify-between text-norelle-text-muted">
                  <span>Tax (21%)</span>
                  <span>{formatPrice(cart.tax)}</span>
                </div>

                {cart.shipping === 0 && cart.subtotal < 75 && (
                  <div className="text-sm text-green-400 bg-green-900/20 border border-green-800/30 rounded p-3">
                    <TruckIcon className="w-4 h-4 inline mr-2" />
                    You qualify for free shipping!
                  </div>
                )}
              </div>

              <div className="border-t border-norelle-border pt-4 mb-6">
                <div className="flex justify-between text-lg font-bold text-norelle-cream">
                  <span>Total</span>
                  <span>{formatPrice(cart.total)}</span>
                </div>
                <p className="text-xs text-norelle-text-muted mt-1">
                  Including tax and shipping
                </p>
              </div>

              <Link href="/checkout" className="btn-primary w-full inline-flex items-center justify-center group">
                Proceed to Checkout
                <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>

              <div className="mt-6 text-xs text-norelle-text-muted space-y-1">
                <p>• Secure checkout powered by Stripe</p>
                <p>• 30-day return policy</p>
                <p>• 2-year warranty on all items</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
