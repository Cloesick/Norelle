import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CartProvider, useCart } from '@/context/CartContext'
import { Product } from '@/types'

// Test component to use cart context
const TestComponent = () => {
  const { cartItems, addToCart, removeFromCart, updateQuantity, clearCart, getCartTotal, getItemCount } = useCart()
  
  const mockProduct: Product = {
    id: '1',
    name: 'Test Product',
    slug: 'test-product',
    price: 99.99,
    salePrice: 79.99,
    description: 'Test description',
    categories: [{ id: '1', name: 'Test Category', slug: 'test-category', description: '', order: 1 }],
    images: ['/test-image.jpg'],
    stock: 10,
    featured: false,
    rating: 4.5,
    reviews: 5,
    sku: 'TEST-001',
    tags: ['test'],
    shortDescription: 'Test short description',
    materials: ['gold'],
    dimensions: { length: '10cm', width: '5cm', height: '2cm' },
    weight: 5.0,
    care: 'Handle with care',
    warranty: '1 year',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  }
  
  return (
    <div data-testid="cart-test">
      <div data-testid="cart-count">{getItemCount()}</div>
      <div data-testid="cart-total">{getCartTotal().toFixed(2)}</div>
      <div data-testid="cart-items">{cartItems.length}</div>
      
      <button
        data-testid="add-to-cart"
        onClick={() => addToCart(mockProduct)}
      >
        Add to Cart
      </button>
      
      <button
        data-testid="remove-from-cart"
        onClick={() => removeFromCart(mockProduct.id)}
      >
        Remove from Cart
      </button>
      
      <button
        data-testid="update-quantity"
        onClick={() => updateQuantity(mockProduct.id, 3)}
      >
        Update Quantity
      </button>
      
      <button
        data-testid="clear-cart"
        onClick={clearCart}
      >
        Clear Cart
      </button>
      
      <div data-testid="cart-contents">
        {cartItems.map(item => (
          <div key={item.id} data-testid={`cart-item-${item.id}`}>
            <span data-testid={`item-name-${item.id}`}>{item.name}</span>
            <span data-testid={`item-quantity-${item.id}`}>{item.quantity}</span>
            <span data-testid={`item-price-${item.id}`}>{item.price}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

describe('CartContext Integration', () => {
  const user = userEvent.setup()
  
  const renderWithProvider = () => {
    return render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    )
  }
  
  beforeEach(() => {
    localStorage.clear()
  })
  
  it('starts with empty cart', () => {
    renderWithProvider()
    
    expect(screen.getByTestId('cart-count')).toHaveTextContent('0')
    expect(screen.getByTestId('cart-total')).toHaveTextContent('0.00')
    expect(screen.getByTestId('cart-items')).toHaveTextContent('0')
  })
  
  it('adds product to cart', async () => {
    renderWithProvider()
    
    const addToCartButton = screen.getByTestId('add-to-cart')
    await user.click(addToCartButton)
    
    await waitFor(() => {
      expect(screen.getByTestId('cart-count')).toHaveTextContent('1')
      expect(screen.getByTestId('cart-total')).toHaveTextContent('79.99')
      expect(screen.getByTestId('cart-items')).toHaveTextContent('1')
    })
    
    expect(screen.getByTestId('cart-item-1')).toBeInTheDocument()
    expect(screen.getByTestId('item-name-1')).toHaveTextContent('Test Product')
    expect(screen.getByTestId('item-quantity-1')).toHaveTextContent('1')
    expect(screen.getByTestId('item-price-1')).toHaveTextContent('99.99')
  })
  
  it('removes product from cart', async () => {
    renderWithProvider()
    
    // Add product first
    const addToCartButton = screen.getByTestId('add-to-cart')
    await user.click(addToCartButton)
    
    await waitFor(() => {
      expect(screen.getByTestId('cart-count')).toHaveTextContent('1')
    })
    
    // Remove product
    const removeFromCartButton = screen.getByTestId('remove-from-cart')
    await user.click(removeFromCartButton)
    
    await waitFor(() => {
      expect(screen.getByTestId('cart-count')).toHaveTextContent('0')
      expect(screen.getByTestId('cart-total')).toHaveTextContent('0.00')
      expect(screen.getByTestId('cart-items')).toHaveTextContent('0')
    })
    
    expect(screen.queryByTestId('cart-item-1')).not.toBeInTheDocument()
  })
  
  it('updates product quantity', async () => {
    renderWithProvider()
    
    // Add product first
    const addToCartButton = screen.getByTestId('add-to-cart')
    await user.click(addToCartButton)
    
    await waitFor(() => {
      expect(screen.getByTestId('cart-count')).toHaveTextContent('1')
    })
    
    // Update quantity
    const updateQuantityButton = screen.getByTestId('update-quantity')
    await user.click(updateQuantityButton)
    
    await waitFor(() => {
      expect(screen.getByTestId('cart-count')).toHaveTextContent('3')
      expect(screen.getByTestId('cart-total')).toHaveTextContent('239.97') // 79.99 * 3
      expect(screen.getByTestId('item-quantity-1')).toHaveTextContent('3')
    })
  })
  
  it('clears entire cart', async () => {
    renderWithProvider()
    
    // Add multiple products
    const addToCartButton = screen.getByTestId('add-to-cart')
    await user.click(addToCartButton)
    await user.click(addToCartButton)
    
    await waitFor(() => {
      expect(screen.getByTestId('cart-count')).toHaveTextContent('2')
    })
    
    // Clear cart
    const clearCartButton = screen.getByTestId('clear-cart')
    await user.click(clearCartButton)
    
    await waitFor(() => {
      expect(screen.getByTestId('cart-count')).toHaveTextContent('0')
      expect(screen.getByTestId('cart-total')).toHaveTextContent('0.00')
      expect(screen.getByTestId('cart-items')).toHaveTextContent('0')
    })
  })
  
  it('handles duplicate product additions', async () => {
    renderWithProvider()
    
    const addToCartButton = screen.getByTestId('add-to-cart')
    
    // Add same product twice
    await user.click(addToCartButton)
    await user.click(addToCartButton)
    
    await waitFor(() => {
      expect(screen.getByTestId('cart-count')).toHaveTextContent('2')
      expect(screen.getByTestId('cart-items')).toHaveTextContent('1') // Still 1 unique item
      expect(screen.getByTestId('item-quantity-1')).toHaveTextContent('2')
    })
  })
  
  it('calculates total correctly with sale prices', async () => {
    renderWithProvider()
    
    const addToCartButton = screen.getByTestId('add-to-cart')
    await user.click(addToCartButton)
    
    await waitFor(() => {
      // Should use sale price (79.99) not regular price (99.99)
      expect(screen.getByTestId('cart-total')).toHaveTextContent('79.99')
    })
  })
  
  it('persists cart to localStorage', async () => {
    renderWithProvider()
    
    const addToCartButton = screen.getByTestId('add-to-cart')
    await user.click(addToCartButton)
    
    await waitFor(() => {
      expect(screen.getByTestId('cart-count')).toHaveTextContent('1')
    })
    
    // Check localStorage
    const cartData = localStorage.getItem('norelle-cart')
    expect(cartData).toBeTruthy()
    
    const parsedCart = JSON.parse(cartData!)
    expect(parsedCart).toHaveLength(1)
    expect(parsedCart[0].id).toBe('1')
    expect(parsedCart[0].quantity).toBe(1)
  })
  
  it('loads cart from localStorage on mount', () => {
    // Set up localStorage with existing cart
    const existingCart = [
      {
        id: '1',
        name: 'Test Product',
        price: 99.99,
        salePrice: 79.99,
        quantity: 2
      }
    ]
    localStorage.setItem('norelle-cart', JSON.stringify(existingCart))
    
    renderWithProvider()
    
    // Should load existing cart
    expect(screen.getByTestId('cart-count')).toHaveTextContent('2')
    expect(screen.getByTestId('cart-total')).toHaveTextContent('159.98') // 79.99 * 2
    expect(screen.getByTestId('cart-items')).toHaveTextContent('1')
  })
  
  it('handles invalid localStorage data gracefully', () => {
    // Set up invalid localStorage data
    localStorage.setItem('norelle-cart', 'invalid-json')
    
    renderWithProvider()
    
    // Should start with empty cart
    expect(screen.getByTestId('cart-count')).toHaveTextContent('0')
    expect(screen.getByTestId('cart-total')).toHaveTextContent('0.00')
    expect(screen.getByTestId('cart-items')).toHaveTextContent('0')
  })
  
  it('updates quantity to zero removes item', async () => {
    renderWithProvider()
    
    // Add product first
    const addToCartButton = screen.getByTestId('add-to-cart')
    await user.click(addToCartButton)
    
    await waitFor(() => {
      expect(screen.getByTestId('cart-count')).toHaveTextContent('1')
    })
    
    // Update quantity to 0
    const updateQuantityButton = screen.getByTestId('update-quantity')
    await user.click(updateQuantityButton) // This sets quantity to 3, so we need to test setting to 0
    
    // Let's test by calling updateQuantity directly with 0
    const { rerender } = renderWithProvider()
    
    // Create a test component that can update to 0
    const TestComponentWithZero = () => {
      const { updateQuantity } = useCart()
      
      return (
        <button
          data-testid="update-to-zero"
          onClick={() => updateQuantity('1', 0)}
        >
          Update to Zero
        </button>
      )
    }
    
    rerender(
      <CartProvider>
        <TestComponent />
        <TestComponentWithZero />
      </CartProvider>
    )
    
    const updateToZeroButton = screen.getByTestId('update-to-zero')
    await user.click(updateToZeroButton)
    
    await waitFor(() => {
      expect(screen.getByTestId('cart-count')).toHaveTextContent('0')
      expect(screen.getByTestId('cart-items')).toHaveTextContent('0')
    })
  })
  
  it('handles multiple different products', async () => {
    const TestComponentWithMultiple = () => {
      const { cartItems, addToCart, getCartTotal, getItemCount } = useCart()
      
      const product1: Product = {
        id: '1',
        name: 'Product 1',
        slug: 'product-1',
        price: 50.00,
        description: 'Test product 1',
        categories: [{ id: '1', name: 'Test', slug: 'test', description: '', order: 1 }],
        images: [],
        stock: 10,
        featured: false,
        rating: 4.5,
        reviews: 5,
        sku: 'TEST-001',
        tags: ['test'],
        shortDescription: 'Test',
        materials: ['gold'],
        dimensions: { length: '10cm', width: '5cm', height: '2cm' },
        weight: 5.0,
        care: 'Handle with care',
        warranty: '1 year',
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01'
      }
      
      const product2: Product = {
        id: '2',
        name: 'Product 2',
        slug: 'product-2',
        price: 75.00,
        description: 'Test product 2',
        categories: [{ id: '1', name: 'Test', slug: 'test', description: '', order: 1 }],
        images: [],
        stock: 10,
        featured: false,
        rating: 4.5,
        reviews: 5,
        sku: 'TEST-002',
        tags: ['test'],
        shortDescription: 'Test',
        materials: ['gold'],
        dimensions: { length: '10cm', width: '5cm', height: '2cm' },
        weight: 5.0,
        care: 'Handle with care',
        warranty: '1 year',
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01'
      }
      
      return (
        <div>
          <div data-testid="cart-count">{getItemCount()}</div>
          <div data-testid="cart-total">{getCartTotal().toFixed(2)}</div>
          <div data-testid="cart-items">{cartItems.length}</div>
          
          <button
            data-testid="add-product-1"
            onClick={() => addToCart(product1)}
          >
            Add Product 1
          </button>
          
          <button
            data-testid="add-product-2"
            onClick={() => addToCart(product2)}
          >
            Add Product 2
          </button>
        </div>
      )
    }
    
    render(
      <CartProvider>
        <TestComponentWithMultiple />
      </CartProvider>
    )
    
    // Add first product
    await user.click(screen.getByTestId('add-product-1'))
    await waitFor(() => {
      expect(screen.getByTestId('cart-count')).toHaveTextContent('1')
      expect(screen.getByTestId('cart-total')).toHaveTextContent('50.00')
    })
    
    // Add second product
    await user.click(screen.getByTestId('add-product-2'))
    await waitFor(() => {
      expect(screen.getByTestId('cart-count')).toHaveTextContent('2')
      expect(screen.getByTestId('cart-total')).toHaveTextContent('125.00') // 50 + 75
      expect(screen.getByTestId('cart-items')).toHaveTextContent('2')
    })
  })
  
  it('provides cart context to all children', () => {
    const NestedComponent = () => {
      const { getItemCount } = useCart()
      return <div data-testid="nested-count">{getItemCount()}</div>
    }
    
    render(
      <CartProvider>
        <TestComponent />
        <NestedComponent />
      </CartProvider>
    )
    
    expect(screen.getByTestId('nested-count')).toHaveTextContent('0')
  })
  
  it('throws error when useCart is used outside provider', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation()
    
    expect(() => {
      render(<TestComponent />)
    }).toThrow('useCart must be used within a CartProvider')
    
    consoleError.mockRestore()
  })
})
