'use client'

import React from 'react'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { SalesPipeline } from '@/components/SalesPipeline'
import { 
  CheckCircleIcon, 
  TruckIcon, 
  EnvelopeIcon,
  ArrowRightIcon,
  ShoppingBagIcon
} from '@heroicons/react/24/outline'

export default function OrderSuccessPage() {
  const { getItemCount } = useCart()

  // Generate mock order data
  const orderNumber = `NOR-${Date.now().toString().slice(-6)}`
  const orderDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <div className="min-h-screen bg-norelle-burgundy">
      <SalesPipeline />
      
      <div className="container-max section-padding">
        <div className="max-w-3xl mx-auto text-center">
          {/* Success Icon */}
          <div className="mb-8">
            <div className="w-20 h-20 bg-green-900/20 border-2 border-green-400 rounded-full flex items-center justify-center mx-auto">
              <CheckCircleIcon className="w-10 h-10 text-green-400" />
            </div>
          </div>

          {/* Success Message */}
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-norelle-cream mb-4">
            Order Confirmed!
          </h1>
          <p className="text-lg text-norelle-text-muted mb-8">
            Thank you for your purchase. Your order has been received and is being processed.
          </p>

          {/* Order Details */}
          <div className="bg-norelle-burgundy-light border border-norelle-border rounded-lg p-8 mb-8">
            <div className="grid md:grid-cols-2 gap-8 text-left">
              <div>
                <h2 className="text-lg font-serif font-bold text-norelle-cream mb-4">
                  Order Information
                </h2>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-norelle-text-muted">Order Number:</span>
                    <span className="text-norelle-cream font-medium">{orderNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-norelle-text-muted">Order Date:</span>
                    <span className="text-norelle-cream">{orderDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-norelle-text-muted">Status:</span>
                    <span className="text-green-400 font-medium">Processing</span>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-lg font-serif font-bold text-norelle-cream mb-4">
                  Shipping Information
                </h2>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start">
                    <TruckIcon className="w-4 h-4 text-norelle-text-muted mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-norelle-text-muted">
                      Estimated delivery: 3-5 business days
                    </span>
                  </div>
                  <div className="flex items-start">
                    <EnvelopeIcon className="w-4 h-4 text-norelle-text-muted mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-norelle-text-muted">
                      Confirmation email sent to your address
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* What's Next */}
          <div className="bg-norelle-burgundy-light border border-norelle-border rounded-lg p-8 mb-8">
            <h2 className="text-lg font-serif font-bold text-norelle-cream mb-6">
              What's Next?
            </h2>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div className="text-center">
                <div className="w-12 h-12 bg-norelle-burgundy border border-norelle-border rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-norelle-cream font-bold">1</span>
                </div>
                <h3 className="text-norelle-cream font-medium mb-2">Order Processing</h3>
                <p className="text-sm text-norelle-text-muted">
                  We'll prepare your items with care and quality check everything
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-norelle-burgundy border border-norelle-border rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-norelle-cream font-bold">2</span>
                </div>
                <h3 className="text-norelle-cream font-medium mb-2">Shipping</h3>
                <p className="text-sm text-norelle-text-muted">
                  Your order will be shipped via secure delivery with tracking
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-norelle-burgundy border border-norelle-border rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-norelle-cream font-bold">3</span>
                </div>
                <h3 className="text-norelle-cream font-medium mb-2">Delivery</h3>
                <p className="text-sm text-norelle-text-muted">
                  Receive your beautiful Norelle pieces at your doorstep
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/shop" className="btn-primary inline-flex items-center justify-center group">
              <ShoppingBagIcon className="w-5 h-5 mr-2" />
              Continue Shopping
              <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
            
            <Link href="/account/orders" className="btn-secondary inline-flex items-center justify-center">
              View Order Details
            </Link>
          </div>

          {/* Customer Support */}
          <div className="mt-12 text-center">
            <h3 className="text-lg font-serif font-bold text-norelle-cream mb-4">
              Need Help?
            </h3>
            <p className="text-norelle-text-muted mb-6">
              Our customer service team is here to help with any questions about your order.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm">
              <a href="mailto:hello@norelle.com" className="text-norelle-cream hover:text-white transition-colors duration-200">
                hello@norelle.com
              </a>
              <a href="tel:+3221234567" className="text-norelle-cream hover:text-white transition-colors duration-200">
                +32 2 123 45 67
              </a>
            </div>
          </div>

          {/* Social Proof */}
          <div className="mt-12 border-t border-norelle-border pt-8">
            <div className="flex items-center justify-center space-x-8 text-sm text-norelle-text-muted">
              <div className="flex items-center">
                <CheckCircleIcon className="w-4 h-4 text-green-400 mr-2" />
                <span>Secure Payment</span>
              </div>
              <div className="flex items-center">
                <TruckIcon className="w-4 h-4 text-green-400 mr-2" />
                <span>Free Shipping</span>
              </div>
              <div className="flex items-center">
                <ArrowRightIcon className="w-4 h-4 text-green-400 mr-2" />
                <span>Easy Returns</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
