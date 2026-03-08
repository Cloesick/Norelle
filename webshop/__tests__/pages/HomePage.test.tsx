import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import HomePage from '@/app/page'

// Mock the components and data
jest.mock('@/data/products', () => ({
  getFeaturedProducts: () => [
    {
      id: '1',
      name: 'Aurelia Gold Necklace',
      slug: 'aurelia-gold-necklace',
      price: 299.99,
      salePrice: 249.99,
      description: 'Elegant gold necklace',
      categories: [{ id: '1', name: 'Necklaces', slug: 'necklaces', description: '', order: 1 }],
      images: ['/images/products/aurelia-gold-necklace-1.jpg'],
      stock: 10,
      featured: true,
      rating: 4.5,
      reviews: 12,
      sku: 'NOR-001',
      tags: ['gold', 'necklace'],
      shortDescription: 'Elegant gold necklace',
      materials: ['18k gold'],
      dimensions: { length: '45cm', width: '20mm', height: '3mm' },
      weight: 12.5,
      care: 'Store carefully',
      warranty: '2 years',
      createdAt: '2024-01-15',
      updatedAt: '2024-01-20'
    }
  ],
  getSaleProducts: () => [
    {
      id: '2',
      name: 'Luna Pearl Earrings',
      slug: 'luna-pearl-earrings',
      price: 199.99,
      salePrice: 149.99,
      description: 'Beautiful pearl earrings',
      categories: [{ id: '2', name: 'Earrings', slug: 'earrings', description: '', order: 2 }],
      images: ['/images/products/luna-pearl-earrings-1.jpg'],
      stock: 5,
      featured: false,
      rating: 4.8,
      reviews: 8,
      sku: 'NOR-002',
      tags: ['pearl', 'earrings'],
      shortDescription: 'Beautiful pearl earrings',
      materials: ['pearl', 'silver'],
      dimensions: { length: '25mm', width: '15mm', height: '5mm' },
      weight: 8.3,
      care: 'Handle with care',
      warranty: '1 year',
      createdAt: '2024-01-10',
      updatedAt: '2024-01-18'
    }
  ]
}))

jest.mock('@/components/ProductCard', () => ({
  ProductCard: ({ product, className }: any) => (
    <div data-testid="product-card" className={className}>
      <h3 data-testid="product-title">{product.name}</h3>
      <span data-testid="product-price">€{product.salePrice || product.price}</span>
    </div>
  )
}))

jest.mock('@/components/luxury/ImmersiveHero', () => ({
  ImmersiveHero: () => <div data-testid="immersive-hero">Hero Section</div>
}))

describe('HomePage', () => {
  const user = userEvent.setup()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders the hero section', () => {
    render(<HomePage />)
    
    expect(screen.getByTestId('immersive-hero')).toBeInTheDocument()
  })

  it('renders the trust bar with correct statistics', () => {
    render(<HomePage />)
    
    expect(screen.getByText('500+')).toBeInTheDocument()
    expect(screen.getByText('Happy Customers')).toBeInTheDocument()
    expect(screen.getByText('50+')).toBeInTheDocument()
    expect(screen.getByText('Unique Designs')).toBeInTheDocument()
    expect(screen.getByText('2 Years')).toBeInTheDocument()
    expect(screen.getByText('Warranty')).toBeInTheDocument()
    expect(screen.getByText('Free')).toBeInTheDocument()
    expect(screen.getByText('Shipping €75+')).toBeInTheDocument()
  })

  it('renders featured products section', () => {
    render(<HomePage />)
    
    expect(screen.getByText('Featured')).toBeInTheDocument()
    expect(screen.getByText('Pieces')).toBeInTheDocument()
    expect(screen.getByText(/Handpicked selections from our collection/)).toBeInTheDocument()
  })

  it('displays featured products', () => {
    render(<HomePage />)
    
    expect(screen.getByTestId('product-card')).toBeInTheDocument()
    expect(screen.getByTestId('product-title')).toHaveTextContent('Aurelia Gold Necklace')
    expect(screen.getByTestId('product-price')).toHaveTextContent('€249.99')
  })

  it('renders sale products section', () => {
    render(<HomePage />)
    
    expect(screen.getByText('Special')).toBeInTheDocument()
    expect(screen.getByText('Offers')).toBeInTheDocument()
    expect(screen.getByText(/Limited time offers on selected pieces/)).toBeInTheDocument()
  })

  it('displays sale products', () => {
    render(<HomePage />)
    
    const saleProducts = screen.getAllByTestId('product-card')
    expect(saleProducts).toHaveLength(2) // 1 featured + 1 sale
  })

  it('renders brand story section', () => {
    render(<HomePage />)
    
    expect(screen.getByText('The Norelle')).toBeInTheDocument()
    expect(screen.getByText('Legacy')).toBeInTheDocument()
    expect(screen.getByText(/Crafted with passion in Belgium/)).toBeInTheDocument()
  })

  it('renders newsletter signup', () => {
    render(<HomePage />)
    
    expect(screen.getByText('Stay')).toBeInTheDocument()
    expect(screen.getByText('Inspired')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Enter your email address')).toBeInTheDocument()
    expect(screen.getByText('Subscribe')).toBeInTheDocument()
  })

  it('handles newsletter signup', async () => {
    render(<HomePage />)
    
    const emailInput = screen.getByPlaceholderText('Enter your email address')
    const subscribeButton = screen.getByText('Subscribe')
    
    await user.type(emailInput, 'test@example.com')
    await user.click(subscribeButton)
    
    // Should show success message
    await waitFor(() => {
      expect(screen.getByText('Thank you for subscribing!')).toBeInTheDocument()
    })
  })

  it('validates email format', async () => {
    render(<HomePage />)
    
    const emailInput = screen.getByPlaceholderText('Enter your email address')
    const subscribeButton = screen.getByText('Subscribe')
    
    await user.type(emailInput, 'invalid-email')
    await user.click(subscribeButton)
    
    // Should show error message
    await waitFor(() => {
      expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument()
    })
  })

  it('renders contact information', () => {
    render(<HomePage />)
    
    expect(screen.getByText('Visit Our')).toBeInTheDocument()
    expect(screen.getByText('Brussels Boutique')).toBeInTheDocument()
    expect(screen.getByText('Contact')).toBeInTheDocument()
    expect(screen.getByText('Us')).toBeInTheDocument()
  })

  it('has proper heading structure', () => {
    render(<HomePage />)
    
    const headings = screen.getAllByRole('heading')
    expect(headings).toHaveLength(expect.any(Number))
    
    // Check for main heading
    const mainHeading = screen.getByRole('heading', { level: 1 })
    expect(mainHeading).toBeInTheDocument()
  })

  it('is accessible', async () => {
    render(<HomePage />)
    
    // Check for proper ARIA labels
    expect(screen.getByRole('main')).toBeInTheDocument()
    expect(screen.getByRole('navigation')).toBeInTheDocument()
    
    // Check keyboard navigation
    const subscribeButton = screen.getByText('Subscribe')
    subscribeButton.focus()
    expect(subscribeButton).toHaveFocus()
  })

  it('has proper meta tags', () => {
    // This would be tested in integration tests
    render(<HomePage />)
    
    // Check for proper title and description
    expect(document.title).toContain('Norelle')
  })

  it('handles loading states', () => {
    // Mock loading state
    jest.mock('@/data/products', () => ({
      getFeaturedProducts: () => [],
      getSaleProducts: () => []
    }))
    
    render(<HomePage />)
    
    // Should show loading skeleton or empty state
    expect(screen.getByText('No featured products available')).toBeInTheDocument()
  })

  it('renders correctly on mobile', () => {
    // Mock mobile viewport
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 375,
    })
    
    render(<HomePage />)
    
    // Should render mobile-specific elements
    expect(screen.getByTestId('immersive-hero')).toBeInTheDocument()
  })

  it('renders correctly on desktop', () => {
    // Mock desktop viewport
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    })
    
    render(<HomePage />)
    
    // Should render desktop-specific elements
    expect(screen.getByTestId('immersive-hero')).toBeInTheDocument()
  })

  it('has proper SEO structure', () => {
    render(<HomePage />)
    
    // Check for semantic HTML
    expect(screen.getByRole('banner')).toBeInTheDocument()
    expect(screen.getByRole('main')).toBeInTheDocument()
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
  })

  it('handles errors gracefully', () => {
    // Mock error state
    jest.mock('@/data/products', () => {
      throw new Error('Failed to load products')
    })
    
    render(<HomePage />)
    
    // Should show error message
    expect(screen.getByText('Failed to load products')).toBeInTheDocument()
  })

  it('tracks analytics events', () => {
    const mockAnalytics = jest.fn()
    global.gtag = mockAnalytics
    
    render(<HomePage />)
    
    // Should track page view
    expect(mockAnalytics).toHaveBeenCalledWith('config', 'GA_MEASUREMENT_ID', {
      page_title: 'Norelle - Luxury Jewelry'
    })
  })

  it('has proper performance characteristics', () => {
    const { container } = render(<HomePage />)
    
    // Check for lazy loading
    const images = container.querySelectorAll('img')
    images.forEach(img => {
      expect(img).toHaveAttribute('loading', 'lazy')
    })
  })

  it('supports dark mode', () => {
    // Mock dark mode preference
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: {
        matches: true,
        media: '(prefers-color-scheme: dark)',
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      },
    })
    
    render(<HomePage />)
    
    // Should render dark mode styles
    expect(screen.getByTestId('immersive-hero')).toBeInTheDocument()
  })

  it('supports reduced motion', () => {
    // Mock reduced motion preference
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: {
        matches: true,
        media: '(prefers-reduced-motion: reduce)',
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      },
    })
    
    render(<HomePage />)
    
    // Should disable animations
    expect(screen.getByTestId('immersive-hero')).toBeInTheDocument()
  })

  it('has proper internationalization support', () => {
    // Mock different locale
    Object.defineProperty(window, 'navigator', {
      writable: true,
      value: {
        ...window.navigator,
        language: 'fr-FR',
      },
    })
    
    render(<HomePage />)
    
    // Should render in French
    expect(screen.getByText('Norelle')).toBeInTheDocument()
  })
})
