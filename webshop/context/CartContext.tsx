'use client'

import React, { createContext, useContext, useReducer, useEffect } from 'react'
import { Cart, CartItem, Product } from '@/types'
import toast from 'react-hot-toast'

interface CartContextType {
  cart: Cart
  addToCart: (product: Product, quantity?: number) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  getItemCount: () => number
  getSubtotal: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

type CartAction =
  | { type: 'ADD_TO_CART'; payload: { product: Product; quantity: number } }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: Cart }

const cartReducer = (state: Cart, action: CartAction): Cart => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const { product, quantity } = action.payload
      const existingItem = state.items.find(item => item.product.id === product.id)

      let newItems: CartItem[]
      if (existingItem) {
        newItems = state.items.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      } else {
        newItems = [...state.items, { product, quantity }]
      }

      const subtotal = newItems.reduce((sum, item) => {
        const price = item.product.salePrice || item.product.price
        return sum + price * item.quantity
      }, 0)

      return {
        ...state,
        items: newItems,
        subtotal,
        total: subtotal + state.shipping + state.tax,
      }
    }

    case 'REMOVE_FROM_CART': {
      const newItems = state.items.filter(item => item.product.id !== action.payload)
      const subtotal = newItems.reduce((sum, item) => {
        const price = item.product.salePrice || item.product.price
        return sum + price * item.quantity
      }, 0)

      return {
        ...state,
        items: newItems,
        subtotal,
        total: subtotal + state.shipping + state.tax,
      }
    }

    case 'UPDATE_QUANTITY': {
      const { productId, quantity } = action.payload
      if (quantity <= 0) {
        return cartReducer(state, { type: 'REMOVE_FROM_CART', payload: productId })
      }

      const newItems = state.items.map(item =>
        item.product.id === productId
          ? { ...item, quantity }
          : item
      )

      const subtotal = newItems.reduce((sum, item) => {
        const price = item.product.salePrice || item.product.price
        return sum + price * item.quantity
      }, 0)

      return {
        ...state,
        items: newItems,
        subtotal,
        total: subtotal + state.shipping + state.tax,
      }
    }

    case 'CLEAR_CART':
      return {
        items: [],
        subtotal: 0,
        total: 0,
        shipping: 0,
        tax: 0,
      }

    case 'LOAD_CART':
      return action.payload

    default:
      return state
  }
}

const SHIPPING_RATES = {
  belgium: { rate: 5.95, freeThreshold: 75 },
  eu: { rate: 9.95, freeThreshold: 150 },
  world: { rate: 19.95, freeThreshold: Infinity },
}

const calculateShipping = (subtotal: number, country: string = 'belgium'): number => {
  const rate = SHIPPING_RATES[country as keyof typeof SHIPPING_RATES] || SHIPPING_RATES.world
  return subtotal >= rate.freeThreshold ? 0 : rate.rate
}

const calculateTax = (subtotal: number, rate: number = 0.21): number => {
  return subtotal * rate
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, dispatch] = useReducer(cartReducer, {
    items: [],
    subtotal: 0,
    total: 0,
    shipping: 0,
    tax: 0,
  })

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('norelle-cart')
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart)
        dispatch({ type: 'LOAD_CART', payload: parsedCart })
      } catch (error) {
        console.error('Failed to load cart from localStorage:', error)
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('norelle-cart', JSON.stringify(cart))
  }, [cart])

  const addToCart = (product: Product, quantity: number = 1) => {
    if (product.stock < quantity) {
      toast.error(`Only ${product.stock} items available in stock`)
      return
    }

    dispatch({ type: 'ADD_TO_CART', payload: { product, quantity } })
    
    // Update shipping and tax
    const shipping = calculateShipping(cart.subtotal + (product.salePrice || product.price) * quantity)
    const tax = calculateTax(cart.subtotal + (product.salePrice || product.price) * quantity)
    
    dispatch({
      type: 'LOAD_CART',
      payload: { ...cart, shipping, tax }
    })

    toast.success(`${product.name} added to bag`)
  }

  const removeFromCart = (productId: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId })
    
    // Update shipping and tax
    const newSubtotal = cart.items
      .filter(item => item.product.id !== productId)
      .reduce((sum, item) => sum + (item.product.salePrice || item.product.price) * item.quantity, 0)
    
    const shipping = calculateShipping(newSubtotal)
    const tax = calculateTax(newSubtotal)
    
    dispatch({
      type: 'LOAD_CART',
      payload: { ...cart, shipping, tax }
    })

    toast.success('Item removed from bag')
  }

  const updateQuantity = (productId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } })
    
    // Update shipping and tax
    const newSubtotal = cart.items
      .map(item => item.product.id === productId ? { ...item, quantity } : item)
      .reduce((sum, item) => sum + (item.product.salePrice || item.product.price) * item.quantity, 0)
    
    const shipping = calculateShipping(newSubtotal)
    const tax = calculateTax(newSubtotal)
    
    dispatch({
      type: 'LOAD_CART',
      payload: { ...cart, shipping, tax }
    })
  }

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
    toast.success('Bag cleared')
  }

  const getItemCount = () => {
    return cart.items.reduce((sum, item) => sum + item.quantity, 0)
  }

  const getSubtotal = () => {
    return cart.subtotal
  }

  const value: CartContextType = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getItemCount,
    getSubtotal,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
