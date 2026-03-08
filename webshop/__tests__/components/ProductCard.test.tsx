import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ProductCard } from '@/components/ProductCard'
import { Product } from '@/types'

// Mock product data
const mockProduct: Product = {
  id: '1',
  name: 'Aurelia Gold Necklace',
  slug: 'aurelia-gold-necklace',
  price: 299.99,
  salePrice: 249.99,
  description: 'Elegant gold necklace inspired by the dawn goddess Aurora',
  categories: [{ id: '1', name: 'Necklaces', slug: 'necklaces' }],
  images: ['/images/products/aurelia-gold-necklace-1.jpg'],
  stock: 10,
  featured: true,
  rating: 4.5,
  reviews: 12,
  sku: 'NOR-001',
  materials: ['18k gold-plated sterling silver'],
  dimensions: {
    length: '45cm',
    width: '20mm',
    height: '3mm'
  },
  weight: 12.5,
  care: 'Store in original pouch when not wearing',
  warranty: '2 years warranty',
  createdAt: new Date('2024-01-15'),
  updatedAt: new Date('2024-01-20')
}

describe('ProductCard Component', () => {
  const user = userEvent.setup()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders product information correctly', () => {
    render(<ProductCard product={mockProduct} />)
    
    expect(screen.getByText('Aurelia Gold Necklace')).toBeInTheDocument()
    expect(screen.getByText('€249.99')).toBeInTheDocument()
    expect(screen.getByText('€299.99')).toBeInTheDocument()
    expect(screen.getByText('Necklaces')).toBeInTheDocument()
  })

  it('displays sale badge when product is on sale', () => {
    render(<ProductCard product={mockProduct} />)
    
    expect(screen.getByText('Sale')).toBeInTheDocument()
  })

  it('displays featured badge when product is featured', () => {
    render(<ProductCard product={mockProduct} />)
    
    expect(screen.getByText('Featured')).toBeInTheDocument()
  })

  it('shows correct stock status', () => {
    render(<ProductCard product={mockProduct} />)
    
    expect(screen.getByText('In Stock')).toBeInTheDocument()
  })

  it('shows low stock warning when stock is low', () => {
    const lowStockProduct = { ...mockProduct, stock: 5 }
    render(<ProductCard product={lowStockProduct} />)
    
    expect(screen.getByText('Only 5 left')).toBeInTheDocument()
  })

  it('shows out of stock when no stock', () => {
    const outOfStockProduct = { ...mockProduct, stock: 0 }
    render(<ProductCard product={outOfStockProduct} />)
    
    expect(screen.getByText('Out of Stock')).toBeInTheDocument()
  })

  it('navigates to product page when clicked', async () => {
    render(<ProductCard product={mockProduct} />)
    
    const productLink = screen.getByRole('link', { name: /Aurelia Gold Necklace/i })
    expect(productLink).toHaveAttribute('href', '/product/aurelia-gold-necklace')
  })

  it('displays rating correctly', () => {
    render(<ProductCard product={mockProduct} />)
    
    expect(screen.getByText('(12)')).toBeInTheDocument()
  })

  it('handles missing images gracefully', () => {
    const productWithoutImages = { ...mockProduct, images: [] }
    render(<ProductCard product={productWithoutImages} />)
    
    // Should show placeholder instead of broken image
    expect(screen.getByText('Image')).toBeInTheDocument()
  })

  it('handles missing categories gracefully', () => {
    const productWithoutCategories = { ...mockProduct, categories: [] }
    render(<ProductCard product={productWithoutCategories} />)
    
    expect(screen.getByText('Jewelry')).toBeInTheDocument() // Default category
  })

  it('applies hover effects on interaction', async () => {
    render(<ProductCard product={mockProduct} />)
    
    const card = screen.getByTestId('product-card')
    
    // Hover effect should be applied
    fireEvent.mouseEnter(card)
    expect(card).toHaveClass('group-hover:border-norelle-cream')
  })

  it('calls onQuickAdd when add to cart is clicked', async () => {
    const mockOnQuickAdd = jest.fn()
    render(<ProductCard product={mockProduct} onQuickAdd={mockOnQuickAdd} />)
    
    const addToCartButton = screen.getByText('Add to Cart')
    await user.click(addToCartButton)
    
    expect(mockOnQuickAdd).toHaveBeenCalledWith(mockProduct)
  })

  it('calls onQuickView when quick view is clicked', async () => {
    const mockOnQuickView = jest.fn()
    render(<ProductCard product={mockProduct} onQuickView={mockOnQuickView} />)
    
    const quickViewButton = screen.getByLabelText('Quick view')
    await user.click(quickViewButton)
    
    expect(mockOnQuickView).toHaveBeenCalledWith(mockProduct)
  })

  it('toggles wishlist when heart button is clicked', async () => {
    const mockOnWishlistToggle = jest.fn()
    render(<ProductCard product={mockProduct} onWishlistToggle={mockOnWishlistToggle} />)
    
    const wishlistButton = screen.getByLabelText('Add to wishlist')
    await user.click(wishlistButton)
    
    expect(mockOnWishlistToggle).toHaveBeenCalledWith(mockProduct)
  })

  it('displays correct price formatting', () => {
    const productWithNoSale = { ...mockProduct, salePrice: undefined }
    render(<ProductCard product={productWithNoSale} />)
    
    expect(screen.getByText('€299.99')).toBeInTheDocument()
    expect(screen.queryByText('€249.99')).not.toBeInTheDocument()
  })

  it('handles different product variations', () => {
    const ringProduct = {
      ...mockProduct,
      name: 'Ethereal Rose Ring',
      slug: 'ethereal-rose-ring',
      categories: [{ id: '2', name: 'Rings', slug: 'rings' }]
    }
    
    render(<ProductCard product={ringProduct} />)
    
    expect(screen.getByText('Ethereal Rose Ring')).toBeInTheDocument()
    expect(screen.getByText('Rings')).toBeInTheDocument()
    expect(screen.getByRole('link')).toHaveAttribute('href', '/product/ethereal-rose-ring')
  })

  it('is accessible', async () => {
    render(<ProductCard product={mockProduct} />)
    
    // Check for proper ARIA labels
    expect(screen.getByRole('link', { name: /Aurelia Gold Necklace/i })).toBeInTheDocument()
    expect(screen.getByLabelText('Add to wishlist')).toBeInTheDocument()
    expect(screen.getByLabelText('Quick view')).toBeInTheDocument()
    
    // Check keyboard navigation
    const productLink = screen.getByRole('link', { name: /Aurelia Gold Necklace/i })
    productLink.focus()
    expect(productLink).toHaveFocus()
  })

  it('has proper data attributes for testing', () => {
    render(<ProductCard product={mockProduct} />)
    
    expect(screen.getByTestId('product-card')).toBeInTheDocument()
    expect(screen.getByTestId('product-image')).toBeInTheDocument()
    expect(screen.getByTestId('product-title')).toBeInTheDocument()
    expect(screen.getByTestId('product-price')).toBeInTheDocument()
  })

  it('handles loading state', () => {
    render(<ProductCard product={mockProduct} loading={true} />)
    
    expect(screen.getByTestId('loading-skeleton')).toBeInTheDocument()
  })

  it('displays custom className', () => {
    render(<ProductCard product={mockProduct} className="custom-class" />)
    
    const card = screen.getByTestId('product-card')
    expect(card).toHaveClass('custom-class')
  })
})
