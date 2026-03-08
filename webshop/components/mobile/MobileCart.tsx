'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { 
  XMarkIcon,
  MinusIcon,
  PlusIcon,
  ShoppingCartIcon,
  TrashIcon,
  CreditCardIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline'
import { useCart } from '@/context/CartContext'

export default function MobileCart() {
  const { cartItems, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart()
  const [isOpen, setIsOpen] = useState(false)
  const [isCheckout, setIsCheckout] = useState(false)

  const cartTotal = getCartTotal()
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0)

  const openCart = () => setIsOpen(true)
  const closeCart = () => setIsOpen(false)

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity === 0) {
      removeFromCart(itemId)
    } else {
      updateQuantity(itemId, newQuantity)
    }
  }

  const handleRemoveItem = (itemId: string) => {
    removeFromCart(itemId)
  }

  const handleCheckout = () => {
    setIsCheckout(true)
    // Navigate to checkout page
    window.location.href = '/checkout'
  }

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-8">
        <ShoppingCartIcon className="w-16 h-16 text-norelle-text-muted mb-4" />
        <h3 className="text-xl font-serif font-bold text-norelle-cream mb-2">Your cart is empty</h3>
        <p className="text-norelle-text-muted mb-6">Add some beautiful jewelry to get started</p>
        <Link href="/shop" className="btn-primary">
          Continue Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full bg-norelle-burgundy-light">
      
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-norelle-border">
        <div className="flex items-center space-x-3">
          {isCheckout && (
            <button
              onClick={() => setIsCheckout(false)}
              className="p-2 text-norelle-cream hover:bg-norelle-burgundy rounded-lg transition-colors duration-200"
            >
              <ArrowLeftIcon className="w-5 h-5" />
            </button>
          )}
          <h2 className="text-lg font-serif font-bold text-norelle-cream">
            {isCheckout ? 'Checkout' : 'Cart'} ({itemCount})
          </h2>
        </div>
        {!isCheckout && (
          <button
            onClick={closeCart}
            className="p-2 text-norelle-cream hover:bg-norelle-burgundy rounded-lg transition-colors duration-200"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Cart Items */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="bg-norelle-burgundy border border-norelle-border rounded-lg p-4">
              
              {/* Product Info */}
              <div className="flex space-x-4">
                {/* Product Image */}
                <div className="w-20 h-20 bg-norelle-burgundy-light border border-norelle-border rounded-lg overflow-hidden flex-shrink-0">
                  {item.images?.[0] ? (
                    <Image
                      src={item.images[0]}
                      alt={item.name}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-norelle-text-muted text-xs">IMG</span>
                    </div>
                  )}
                </div>

                {/* Product Details */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-norelle-cream font-medium text-sm mb-1 truncate">
                    {item.name}
                  </h3>
                  <p className="text-norelle-text-muted text-xs mb-2">
                    {item.categories?.[0]?.name || 'Jewelry'}
                  </p>
                  
                  {/* Price */}
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="text-norelle-cream font-bold">
                      €{(item.salePrice || item.price).toFixed(2)}
                    </span>
                    {item.salePrice && (
                      <span className="text-norelle-text-muted line-through text-xs">
                        €{item.price.toFixed(2)}
                      </span>
                    )}
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        className="p-1 text-norelle-cream hover:bg-norelle-burgundy rounded transition-colors duration-200"
                        disabled={item.quantity <= 1}
                      >
                        <MinusIcon className="w-4 h-4" />
                      </button>
                      <span className="text-norelle-cream font-medium w-8 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        className="p-1 text-norelle-cream hover:bg-norelle-burgundy rounded transition-colors duration-200"
                      >
                        <PlusIcon className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="p-1 text-red-400 hover:bg-red-900/20 rounded transition-colors duration-200"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Item Total */}
              <div className="mt-3 pt-3 border-t border-norelle-border/50">
                <div className="flex justify-between items-center">
                  <span className="text-norelle-text-muted text-sm">Item Total</span>
                  <span className="text-norelle-cream font-bold">
                    €{((item.salePrice || item.price) * item.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cart Summary */}
      <div className="border-t border-norelle-border bg-norelle-burgundy/50 p-4">
        
        {/* Summary */}
        <div className="space-y-2 mb-4">
          <div className="flex justify-between items-center">
            <span className="text-norelle-text-muted">Subtotal</span>
            <span className="text-norelle-cream">€{cartTotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-norelle-text-muted">Shipping</span>
            <span className="text-norelle-cream">Free</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-norelle-text-muted">Tax</span>
            <span className="text-norelle-cream">€{(cartTotal * 0.21).toFixed(2)}</span>
          </div>
          <div className="border-t border-norelle-border/50 pt-2">
            <div className="flex justify-between items-center">
              <span className="text-norelle-cream font-bold text-lg">Total</span>
              <span className="text-norelle-cream font-bold text-lg">
                €{(cartTotal * 1.21).toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <button
            onClick={handleCheckout}
            className="w-full py-3 bg-norelle-cream text-norelle-burgundy font-bold rounded-lg hover:bg-norelle-cream/90 transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <CreditCardIcon className="w-5 h-5" />
            <span>Proceed to Checkout</span>
          </button>
          
          <Link
            href="/shop"
            className="block w-full py-3 border border-norelle-border text-norelle-cream font-medium rounded-lg hover:bg-norelle-burgundy transition-colors duration-200 text-center"
          >
            Continue Shopping
          </Link>

          {cartItems.length > 1 && (
            <button
              onClick={clearCart}
              className="w-full py-2 text-red-400 hover:text-red-300 transition-colors duration-200 text-sm"
            >
              Clear Cart
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

// Mobile Cart Button (Floating Action Button)
interface MobileCartButtonProps {
  itemCount: number
  onClick: () => void
}

export function MobileCartButton({ itemCount, onClick }: MobileCartButtonProps) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 w-14 h-14 bg-norelle-cream text-norelle-burgundy rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center z-30 group"
      aria-label="View cart"
    >
      <ShoppingCartIcon className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" />
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-600 text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse">
          {itemCount}
        </span>
      )}
    </button>
  )
}

// Mobile Checkout Progress
interface MobileCheckoutProgressProps {
  currentStep: number
  steps: string[]
}

export function MobileCheckoutProgress({ currentStep, steps }: MobileCheckoutProgressProps) {
  return (
    <div className="bg-norelle-burgundy-light border-b border-norelle-border p-4">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center">
            {/* Step Circle */}
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors duration-200 ${
                index <= currentStep
                  ? 'bg-norelle-cream text-norelle-burgundy'
                  : 'bg-norelle-burgundy text-norelle-text-muted'
              }`}
            >
              {index < currentStep ? '✓' : index + 1}
            </div>
            
            {/* Step Label */}
            <span
              className={`ml-2 text-sm transition-colors duration-200 ${
                index <= currentStep
                  ? 'text-norelle-cream'
                  : 'text-norelle-text-muted'
              }`}
            >
              {step}
            </span>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div
                className={`w-8 h-0.5 mx-4 transition-colors duration-200 ${
                  index < currentStep
                    ? 'bg-norelle-cream'
                    : 'bg-norelle-border'
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

// Mobile Payment Methods
interface MobilePaymentMethodsProps {
  selectedMethod: string
  onMethodChange: (method: string) => void
}

export function MobilePaymentMethods({ selectedMethod, onMethodChange }: MobilePaymentMethodsProps) {
  const paymentMethods = [
    {
      id: 'card',
      name: 'Credit/Debit Card',
      icon: CreditCardIcon,
      description: 'Visa, Mastercard, American Express'
    },
    {
      id: 'apple-pay',
      name: 'Apple Pay',
      icon: CreditCardIcon,
      description: 'Pay with Touch ID or Face ID'
    },
    {
      id: 'google-pay',
      name: 'Google Pay',
      icon: CreditCardIcon,
      description: 'Fast, simple checkout'
    },
    {
      id: 'paypal',
      name: 'PayPal',
      icon: CreditCardIcon,
      description: 'Pay with PayPal or Venmo'
    }
  ]

  return (
    <div className="space-y-3">
      {paymentMethods.map((method) => {
        const Icon = method.icon
        return (
          <label
            key={method.id}
            className={`flex items-center space-x-3 p-4 border rounded-lg cursor-pointer transition-colors duration-200 ${
              selectedMethod === method.id
                ? 'border-norelle-cream bg-norelle-burgundy/50'
                : 'border-norelle-border hover:border-norelle-cream/50'
            }`}
          >
            <input
              type="radio"
              name="payment-method"
              value={method.id}
              checked={selectedMethod === method.id}
              onChange={() => onMethodChange(method.id)}
              className="w-4 h-4 text-norelle-cream bg-norelle-burgundy border-norelle-border focus:ring-norelle-cream"
            />
            <Icon className="w-6 h-6 text-norelle-cream" />
            <div className="flex-1">
              <div className="text-norelle-cream font-medium">{method.name}</div>
              <div className="text-norelle-text-muted text-sm">{method.description}</div>
            </div>
          </label>
        )
      })}
    </div>
  )
}
