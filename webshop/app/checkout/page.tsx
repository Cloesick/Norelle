'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCart } from '@/context/CartContext'
import { SalesPipeline } from '@/components/SalesPipeline'
import { 
  UserIcon, 
  MapPinIcon, 
  CreditCardIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline'

interface FormData {
  // Customer Info
  email: string
  firstName: string
  lastName: string
  phone: string
  
  // Shipping Address
  shippingAddress: {
    firstName: string
    lastName: string
    company: string
    address: string
    apartment: string
    city: string
    postalCode: string
    country: string
  }
  
  // Billing Address
  billingAddress: {
    sameAsShipping: boolean
    firstName: string
    lastName: string
    company: string
    address: string
    apartment: string
    city: string
    postalCode: string
    country: string
  }
  
  // Payment
  paymentMethod: 'stripe' | 'paypal' | 'bank-transfer'
  cardNumber: string
  cardExpiry: string
  cardCvc: string
  cardName: string
  
  // Terms
  acceptTerms: boolean
  acceptNewsletter: boolean
}

type CheckoutStep = 'customer' | 'shipping' | 'payment' | 'review'

export default function CheckoutPage() {
  const router = useRouter()
  const { cart, clearCart } = useCart()
  const [currentStep, setCurrentStep] = useState<CheckoutStep>('customer')
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)
  
  const [formData, setFormData] = useState<FormData>({
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    
    shippingAddress: {
      firstName: '',
      lastName: '',
      company: '',
      address: '',
      apartment: '',
      city: '',
      postalCode: '',
      country: 'Belgium'
    },
    
    billingAddress: {
      sameAsShipping: true,
      firstName: '',
      lastName: '',
      company: '',
      address: '',
      apartment: '',
      city: '',
      postalCode: '',
      country: 'Belgium'
    },
    
    paymentMethod: 'stripe',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
    cardName: '',
    
    acceptTerms: false,
    acceptNewsletter: false
  })

  // Redirect to cart if empty
  React.useEffect(() => {
    if (cart.items.length === 0 && !orderComplete) {
      router.push('/cart')
    }
  }, [cart.items.length, router, orderComplete])

  const updateFormData = (section: keyof FormData, field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [section]: typeof prev[section] === 'object' 
        ? { ...prev[section], [field]: value }
        : value
    }))
  }

  const validateStep = (step: CheckoutStep): boolean => {
    switch (step) {
      case 'customer':
        return formData.email && formData.firstName && formData.lastName
      case 'shipping':
        return formData.shippingAddress.address && 
               formData.shippingAddress.city && 
               formData.shippingAddress.postalCode
      case 'payment':
        return formData.paymentMethod && formData.acceptTerms
      case 'review':
        return true // All validations done in previous steps
      default:
        return false
    }
  }

  const nextStep = () => {
    if (validateStep(currentStep)) {
      const steps: CheckoutStep[] = ['customer', 'shipping', 'payment', 'review']
      const currentIndex = steps.indexOf(currentStep)
      if (currentIndex < steps.length - 1) {
        setCurrentStep(steps[currentIndex + 1])
      }
    }
  }

  const prevStep = () => {
    const steps: CheckoutStep[] = ['customer', 'shipping', 'payment', 'review']
    const currentIndex = steps.indexOf(currentStep)
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1])
    }
  }

  const handlePlaceOrder = async () => {
    setIsProcessing(true)
    
    try {
      // Simulate order processing
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Clear cart and show success
      clearCart()
      setOrderComplete(true)
      
      // Redirect to success page
      setTimeout(() => {
        router.push('/order-success')
      }, 3000)
    } catch (error) {
      console.error('Order failed:', error)
      setIsProcessing(false)
    }
  }

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-norelle-burgundy flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <CheckCircleIcon className="w-16 h-16 text-green-400 mx-auto mb-6" />
          <h1 className="text-2xl font-serif font-bold text-norelle-cream mb-4">
            Order Placed Successfully!
          </h1>
          <p className="text-norelle-text-muted mb-8">
            Thank you for your order. You will receive a confirmation email shortly.
          </p>
          <div className="animate-pulse text-sm text-norelle-text-muted">
            Redirecting to order confirmation...
          </div>
        </div>
      </div>
    )
  }

  const steps = [
    { key: 'customer', label: 'Customer Info' },
    { key: 'shipping', label: 'Shipping' },
    { key: 'payment', label: 'Payment' },
    { key: 'review', label: 'Review' }
  ]

  const currentStepIndex = steps.findIndex(step => step.key === currentStep)

  return (
    <div className="min-h-screen bg-norelle-burgundy">
      <SalesPipeline />
      
      <div className="container-max section-padding">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-norelle-cream mb-4">
              Checkout
            </h1>
            <p className="text-norelle-text-muted">
              Complete your order in just a few steps
            </p>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-between mb-8 overflow-x-auto">
            {steps.map((step, index) => (
              <div key={step.key} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  index <= currentStepIndex
                    ? 'bg-norelle-cream text-norelle-burgundy border-norelle-cream'
                    : 'border-norelle-border text-norelle-text-muted'
                }`}>
                  {index < currentStepIndex ? (
                    <CheckCircleIcon className="w-5 h-5" />
                  ) : (
                    <span className="font-medium">{index + 1}</span>
                  )}
                </div>
                <div className={`ml-3 text-sm font-medium ${
                  index <= currentStepIndex ? 'text-norelle-cream' : 'text-norelle-text-muted'
                }`}>
                  {step.label}
                </div>
                {index < steps.length - 1 && (
                  <div className={`hidden md:block w-16 h-0.5 mx-4 ${
                    index < currentStepIndex ? 'bg-norelle-cream' : 'bg-norelle-border'
                  }`} />
                )}
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Customer Information Step */}
              {currentStep === 'customer' && (
                <div className="bg-norelle-burgundy-light border border-norelle-border rounded-lg p-6">
                  <h2 className="text-xl font-serif font-bold text-norelle-cream mb-6">
                    Customer Information
                  </h2>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-norelle-cream mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => updateFormData('email', 'value', e.target.value)}
                        className="input-field w-full"
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-norelle-cream mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => updateFormData('phone', 'value', e.target.value)}
                        className="input-field w-full"
                        placeholder="+32 123 456 789"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-norelle-cream mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => updateFormData('firstName', 'value', e.target.value)}
                        className="input-field w-full"
                        placeholder="John"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-norelle-cream mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => updateFormData('lastName', 'value', e.target.value)}
                        className="input-field w-full"
                        placeholder="Doe"
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Shipping Address Step */}
              {currentStep === 'shipping' && (
                <div className="bg-norelle-burgundy-light border border-norelle-border rounded-lg p-6">
                  <h2 className="text-xl font-serif font-bold text-norelle-cream mb-6">
                    Shipping Address
                  </h2>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-norelle-cream mb-2">
                        Country *
                      </label>
                      <select
                        value={formData.shippingAddress.country}
                        onChange={(e) => updateFormData('shippingAddress', 'country', e.target.value)}
                        className="input-field w-full"
                      >
                        <option value="Belgium">Belgium</option>
                        <option value="Netherlands">Netherlands</option>
                        <option value="France">France</option>
                        <option value="Germany">Germany</option>
                        <option value="Luxembourg">Luxembourg</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-norelle-cream mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        value={formData.shippingAddress.firstName}
                        onChange={(e) => updateFormData('shippingAddress', 'firstName', e.target.value)}
                        className="input-field w-full"
                        placeholder="John"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-norelle-cream mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        value={formData.shippingAddress.lastName}
                        onChange={(e) => updateFormData('shippingAddress', 'lastName', e.target.value)}
                        className="input-field w-full"
                        placeholder="Doe"
                        required
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-norelle-cream mb-2">
                        Company (Optional)
                      </label>
                      <input
                        type="text"
                        value={formData.shippingAddress.company}
                        onChange={(e) => updateFormData('shippingAddress', 'company', e.target.value)}
                        className="input-field w-full"
                        placeholder="Company Name"
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-norelle-cream mb-2">
                        Street Address *
                      </label>
                      <input
                        type="text"
                        value={formData.shippingAddress.address}
                        onChange={(e) => updateFormData('shippingAddress', 'address', e.target.value)}
                        className="input-field w-full"
                        placeholder="123 Main Street"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-norelle-cream mb-2">
                        Apartment, suite, etc. (Optional)
                      </label>
                      <input
                        type="text"
                        value={formData.shippingAddress.apartment}
                        onChange={(e) => updateFormData('shippingAddress', 'apartment', e.target.value)}
                        className="input-field w-full"
                        placeholder="Apt 4B"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-norelle-cream mb-2">
                        City *
                      </label>
                      <input
                        type="text"
                        value={formData.shippingAddress.city}
                        onChange={(e) => updateFormData('shippingAddress', 'city', e.target.value)}
                        className="input-field w-full"
                        placeholder="Brussels"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-norelle-cream mb-2">
                        Postal Code *
                      </label>
                      <input
                        type="text"
                        value={formData.shippingAddress.postalCode}
                        onChange={(e) => updateFormData('shippingAddress', 'postalCode', e.target.value)}
                        className="input-field w-full"
                        placeholder="1000"
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Payment Step */}
              {currentStep === 'payment' && (
                <div className="bg-norelle-burgundy-light border border-norelle-border rounded-lg p-6">
                  <h2 className="text-xl font-serif font-bold text-norelle-cream mb-6">
                    Payment Method
                  </h2>
                  
                  <div className="space-y-4 mb-6">
                    <label className="flex items-center p-4 border border-norelle-border rounded-lg cursor-pointer hover:border-norelle-cream transition-colors">
                      <input
                        type="radio"
                        name="payment"
                        value="stripe"
                        checked={formData.paymentMethod === 'stripe'}
                        onChange={(e) => updateFormData('paymentMethod', 'value', e.target.value)}
                        className="mr-3"
                      />
                      <div className="flex-1">
                        <div className="font-medium text-norelle-cream">Credit Card</div>
                        <div className="text-sm text-norelle-text-muted">Visa, Mastercard, American Express</div>
                      </div>
                      <CreditCardIcon className="w-6 h-6 text-norelle-text-muted" />
                    </label>
                    
                    <label className="flex items-center p-4 border border-norelle-border rounded-lg cursor-pointer hover:border-norelle-cream transition-colors">
                      <input
                        type="radio"
                        name="payment"
                        value="paypal"
                        checked={formData.paymentMethod === 'paypal'}
                        onChange={(e) => updateFormData('paymentMethod', 'value', e.target.value)}
                        className="mr-3"
                      />
                      <div className="flex-1">
                        <div className="font-medium text-norelle-cream">PayPal</div>
                        <div className="text-sm text-norelle-text-muted">Fast and secure payment</div>
                      </div>
                    </label>
                    
                    <label className="flex items-center p-4 border border-norelle-border rounded-lg cursor-pointer hover:border-norelle-cream transition-colors">
                      <input
                        type="radio"
                        name="payment"
                        value="bank-transfer"
                        checked={formData.paymentMethod === 'bank-transfer'}
                        onChange={(e) => updateFormData('paymentMethod', 'value', e.target.value)}
                        className="mr-3"
                      />
                      <div className="flex-1">
                        <div className="font-medium text-norelle-cream">Bank Transfer</div>
                        <div className="text-sm text-norelle-text-muted">Direct bank transfer</div>
                      </div>
                    </label>
                  </div>

                  {formData.paymentMethod === 'stripe' && (
                    <div className="space-y-4 border-t border-norelle-border pt-6">
                      <div>
                        <label className="block text-sm font-medium text-norelle-cream mb-2">
                          Card Number
                        </label>
                        <input
                          type="text"
                          value={formData.cardNumber}
                          onChange={(e) => updateFormData('cardNumber', 'value', e.target.value)}
                          className="input-field w-full"
                          placeholder="1234 5678 9012 3456"
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-norelle-cream mb-2">
                            Expiry Date
                          </label>
                          <input
                            type="text"
                            value={formData.cardExpiry}
                            onChange={(e) => updateFormData('cardExpiry', 'value', e.target.value)}
                            className="input-field w-full"
                            placeholder="MM/YY"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-norelle-cream mb-2">
                            CVC
                          </label>
                          <input
                            type="text"
                            value={formData.cardCvc}
                            onChange={(e) => updateFormData('cardCvc', 'value', e.target.value)}
                            className="input-field w-full"
                            placeholder="123"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-norelle-cream mb-2">
                          Name on Card
                        </label>
                        <input
                          type="text"
                          value={formData.cardName}
                          onChange={(e) => updateFormData('cardName', 'value', e.target.value)}
                          className="input-field w-full"
                          placeholder="John Doe"
                        />
                      </div>
                    </div>
                  )}

                  <div className="border-t border-norelle-border pt-6">
                    <label className="flex items-start">
                      <input
                        type="checkbox"
                        checked={formData.acceptTerms}
                        onChange={(e) => updateFormData('acceptTerms', 'value', e.target.checked)}
                        className="mt-1 mr-3"
                        required
                      />
                      <span className="text-sm text-norelle-text-muted">
                        I agree to the{' '}
                        <Link href="/terms" className="text-norelle-cream hover:underline">
                          Terms and Conditions
                        </Link>
                        {' '}and{' '}
                        <Link href="/privacy" className="text-norelle-cream hover:underline">
                          Privacy Policy
                        </Link>
                      </span>
                    </label>
                    
                    <label className="flex items-start mt-4">
                      <input
                        type="checkbox"
                        checked={formData.acceptNewsletter}
                        onChange={(e) => updateFormData('acceptNewsletter', 'value', e.target.checked)}
                        className="mt-1 mr-3"
                      />
                      <span className="text-sm text-norelle-text-muted">
                        Subscribe to our newsletter for exclusive offers and new arrivals
                      </span>
                    </label>
                  </div>
                </div>
              )}

              {/* Review Step */}
              {currentStep === 'review' && (
                <div className="bg-norelle-burgundy-light border border-norelle-border rounded-lg p-6">
                  <h2 className="text-xl font-serif font-bold text-norelle-cream mb-6">
                    Order Review
                  </h2>
                  
                  <div className="space-y-6">
                    {/* Customer Info */}
                    <div>
                      <h3 className="font-medium text-norelle-cream mb-2">Customer Information</h3>
                      <div className="text-sm text-norelle-text-muted space-y-1">
                        <p>{formData.firstName} {formData.lastName}</p>
                        <p>{formData.email}</p>
                        {formData.phone && <p>{formData.phone}</p>}
                      </div>
                    </div>
                    
                    {/* Shipping Address */}
                    <div>
                      <h3 className="font-medium text-norelle-cream mb-2">Shipping Address</h3>
                      <div className="text-sm text-norelle-text-muted">
                        <p>{formData.shippingAddress.firstName} {formData.shippingAddress.lastName}</p>
                        {formData.shippingAddress.company && <p>{formData.shippingAddress.company}</p>}
                        <p>{formData.shippingAddress.address}</p>
                        {formData.shippingAddress.apartment && <p>{formData.shippingAddress.apartment}</p>}
                        <p>{formData.shippingAddress.postalCode} {formData.shippingAddress.city}</p>
                        <p>{formData.shippingAddress.country}</p>
                      </div>
                    </div>
                    
                    {/* Payment Method */}
                    <div>
                      <h3 className="font-medium text-norelle-cream mb-2">Payment Method</h3>
                      <div className="text-sm text-norelle-text-muted capitalize">
                        {formData.paymentMethod.replace('-', ' ')}
                      </div>
                    </div>
                    
                    {/* Order Items */}
                    <div>
                      <h3 className="font-medium text-norelle-cream mb-4">Order Items</h3>
                      <div className="space-y-3">
                        {cart.items.map((item) => (
                          <div key={item.product.id} className="flex justify-between text-sm">
                            <div className="flex-1">
                              <div className="text-norelle-cream">{item.product.name}</div>
                              <div className="text-norelle-text-muted">Qty: {item.quantity}</div>
                            </div>
                            <div className="text-norelle-cream font-medium">
                              €{((item.product.salePrice || item.product.price) * item.quantity).toFixed(2)}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                <button
                  onClick={prevStep}
                  disabled={currentStep === 'customer'}
                  className="btn-secondary inline-flex items-center disabled:opacity-50"
                >
                  <ArrowLeftIcon className="w-5 h-5 mr-2" />
                  Previous
                </button>
                
                {currentStep === 'review' ? (
                  <button
                    onClick={handlePlaceOrder}
                    disabled={isProcessing || !formData.acceptTerms}
                    className="btn-primary inline-flex items-center disabled:opacity-50"
                  >
                    {isProcessing ? 'Processing...' : 'Place Order'}
                    <ArrowRightIcon className="w-5 h-5 ml-2" />
                  </button>
                ) : (
                  <button
                    onClick={nextStep}
                    disabled={!validateStep(currentStep)}
                    className="btn-primary inline-flex items-center disabled:opacity-50"
                  >
                    Next
                    <ArrowRightIcon className="w-5 h-5 ml-2" />
                  </button>
                )}
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
                    <span>€{cart.subtotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between text-norelle-text-muted">
                    <span>Shipping</span>
                    <span>
                      {cart.shipping === 0 ? 'FREE' : `€${cart.shipping.toFixed(2)}`}
                    </span>
                  </div>
                  
                  <div className="flex justify-between text-norelle-text-muted">
                    <span>Tax (21%)</span>
                    <span>€{cart.tax.toFixed(2)}</span>
                  </div>
                </div>

                <div className="border-t border-norelle-border pt-4 mb-6">
                  <div className="flex justify-between text-lg font-bold text-norelle-cream">
                    <span>Total</span>
                    <span>€{cart.total.toFixed(2)}</span>
                  </div>
                  <p className="text-xs text-norelle-text-muted mt-1">
                    Including tax and shipping
                  </p>
                </div>

                <div className="text-xs text-norelle-text-muted space-y-1">
                  <p>• Secure checkout powered by Stripe</p>
                  <p>• 30-day return policy</p>
                  <p>• 2-year warranty on all items</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
