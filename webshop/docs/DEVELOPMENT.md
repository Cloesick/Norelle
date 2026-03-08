# Development Guide

This guide covers the development workflow, coding standards, and best practices for the Norelle webshop project.

## 🛠 Development Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git
- VS Code (recommended)

### Initial Setup
```bash
# Clone repository
git clone <repository-url>
cd norelle/webshop

# Install dependencies
npm install

# Start development server
npm run dev
```

### Environment Setup
```bash
# Create environment file
cp .env.example .env.local

# Add environment variables
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

## 📁 Project Structure Deep Dive

### Core Directories
```
webshop/
├── app/                    # Next.js App Router pages
│   ├── (routes)/          # Route groups (don't affect URL)
│   ├── api/               # API routes
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx          # Homepage
├── components/            # Reusable UI components
│   ├── ui/               # Basic UI components
│   ├── layout/           # Layout components
│   └── features/         # Feature-specific components
├── context/              # React contexts
├── data/                 # Static data and API functions
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
├── types/                # TypeScript definitions
├── public/               # Static assets
└── styles/               # Global styles and themes
```

### File Naming Conventions
- **Components**: PascalCase (`ProductCard.tsx`)
- **Pages**: `page.tsx` (App Router convention)
- **Layouts**: `layout.tsx` (App Router convention)
- **Hooks**: camelCase with `use` prefix (`useCart.ts`)
- **Types**: `index.ts` or descriptive name (`product-types.ts`)
- **Utilities**: camelCase (`formatPrice.ts`)

## 🧩 Component Development

### Component Template
```typescript
// components/ProductCard.tsx
'use client'

import React from 'react'
import { Product } from '@/types'

interface ProductCardProps {
  product: Product
  onAddToCart?: (product: Product) => void
  className?: string
}

export function ProductCard({ product, onAddToCart, className }: ProductCardProps) {
  const handleAddToCart = () => {
    onAddToCart?.(product)
  }

  return (
    <div className={className}>
      {/* Component implementation */}
    </div>
  )
}

export default ProductCard
```

### Component Best Practices

#### 1. Props Interface
```typescript
// Always define props interface
interface ComponentProps {
  requiredProp: string
  optionalProp?: number
  callbackProp?: (data: string) => void
  children?: React.ReactNode
}
```

#### 2. Default Props
```typescript
// Use default parameters or defaultProps
export function Button({ 
  variant = 'primary', 
  size = 'medium', 
  disabled = false 
}: ButtonProps) {
  // Component logic
}
```

#### 3. Event Handling
```typescript
// Proper event handling with type safety
const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  event.preventDefault()
  event.stopPropagation()
  // Handle click
}

const handleKeyDown = (event: React.KeyboardEvent) => {
  if (event.key === 'Enter' || event.key === ' ') {
    // Handle keyboard interaction
  }
}
```

#### 4. Conditional Rendering
```typescript
// Use conditional rendering patterns
{isLoading && <LoadingSpinner />}
{error && <ErrorMessage message={error} />}
{data && <DataDisplay data={data} />}
{!isLoading && !error && !data && <EmptyState />}
```

## 🎨 Styling Guidelines

### Tailwind CSS Patterns

#### 1. Component Classes
```typescript
// Use consistent class patterns
<div className="product-card">
  <div className="product-card__header">
    <h3 className="product-card__title">Product Name</h3>
  </div>
  <div className="product-card__content">
    {/* Content */}
  </div>
</div>
```

#### 2. Responsive Design
```typescript
// Mobile-first responsive classes
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Grid items */}
</div>

// Responsive utilities
<div className="text-sm md:text-base lg:text-lg">
  Responsive text
</div>
```

#### 3. State Classes
```typescript
// State-dependent styling
<button 
  className={`btn ${isDisabled ? 'btn--disabled' : 'btn--primary'} ${isLoading ? 'btn--loading' : ''}`}
  disabled={isDisabled}
>
  {isLoading ? 'Loading...' : 'Submit'}
</button>
```

### Custom CSS Patterns
```css
/* Use CSS custom properties for theming */
:root {
  --color-primary: #3b0505;
  --color-secondary: #eeefc9;
  --spacing-unit: 0.25rem;
}

/* Component-specific styles */
.product-card {
  background-color: var(--color-primary);
  padding: calc(var(--spacing-unit) * 4);
}

/* Utility classes */
.text-gradient {
  background: linear-gradient(45deg, var(--color-primary), var(--color-secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

## 🔄 State Management Patterns

### Context Pattern
```typescript
// context/CartContext.tsx
interface CartContextType {
  items: CartItem[]
  addToCart: (product: Product) => void
  removeFromCart: (productId: string) => void
  total: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState<CartState>(initialState)

  const addToCart = useCallback((product: Product) => {
    setState(prev => ({
      ...prev,
      items: [...prev.items, { product, quantity: 1 }]
    }))
  }, [])

  const value = { ...state, addToCart }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within CartProvider')
  }
  return context
}
```

### Reducer Pattern
```typescript
// For complex state logic
type CartAction = 
  | { type: 'ADD_ITEM'; payload: Product }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM':
      return { ...state, items: [...state.items, action.payload] }
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter(item => item.id !== action.payload) }
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      }
    default:
      return state
  }
}
```

### Local State Pattern
```typescript
// For component-specific state
const ProductCard = ({ product }: ProductCardProps) => {
  const [isWishlist, setIsWishlist] = useState(false)
  const [isAddingToCart, setIsAddingToCart] = useState(false)

  const handleToggleWishlist = () => {
    setIsWishlist(prev => !prev)
  }

  const handleAddToCart = async () => {
    setIsAddingToCart(true)
    try {
      await addToCart(product)
    } finally {
      setIsAddingToCart(false)
    }
  }

  return (
    <div>
      {/* Component JSX */}
    </div>
  )
}
```

## 📝 TypeScript Guidelines

### Type Definitions
```typescript
// types/index.ts
export interface Product {
  id: string
  name: string
  slug: string
  price: number
  salePrice?: number
  images: ProductImage[]
  categories: Category[]
  stock: number
  rating: number
  reviewCount: number
}

export interface ProductImage {
  id: string
  url: string
  alt: string
  isPrimary: boolean
}

// Union types for state
type LoadingState = 'idle' | 'loading' | 'success' | 'error'

// Generic types
interface ApiResponse<T> {
  data: T
  status: number
  message: string
}
```

### Component Typing
```typescript
// Strongly typed props
interface ProductCardProps {
  product: Product
  variant?: 'default' | 'compact' | 'detailed'
  onAddToCart?: (product: Product, quantity?: number) => void
  className?: string
  children?: React.ReactNode
}

// Generic component
interface ListProps<T> {
  items: T[]
  renderItem: (item: T) => React.ReactNode
  emptyState?: React.ReactNode
}

export function List<T>({ items, renderItem, emptyState }: ListProps<T>) {
  if (items.length === 0) {
    return <>{emptyState}</>
  }

  return (
    <div>
      {items.map(renderItem)}
    </div>
  )
}
```

### Event Handler Typing
```typescript
// Proper event typing
const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  // Type-safe event handling
}

const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  // Type-safe form handling
}

const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault()
  // Type-safe form submission
}
```

## 🧪 Testing Guidelines

### Unit Testing
```typescript
// __tests__/components/ProductCard.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { ProductCard } from '@/components/ProductCard'
import { mockProduct } from '@/test/mocks'

describe('ProductCard', () => {
  it('renders product information correctly', () => {
    render(<ProductCard product={mockProduct} />)
    
    expect(screen.getByText(mockProduct.name)).toBeInTheDocument()
    expect(screen.getByText(`€${mockProduct.price}`)).toBeInTheDocument()
  })

  it('calls onAddToCart when add to cart button is clicked', () => {
    const mockAddToCart = jest.fn()
    render(<ProductCard product={mockProduct} onAddToCart={mockAddToCart} />)
    
    fireEvent.click(screen.getByText('Add to Bag'))
    
    expect(mockAddToCart).toHaveBeenCalledWith(mockProduct)
  })

  it('shows sale badge when product is on sale', () => {
    const saleProduct = { ...mockProduct, salePrice: 99 }
    render(<ProductCard product={saleProduct} />)
    
    expect(screen.getByText(/-\d+%/)).toBeInTheDocument()
  })
})
```

### Integration Testing
```typescript
// __tests__/context/CartContext.test.tsx
import { renderHook, act } from '@testing-library/react'
import { CartProvider, useCart } from '@/context/CartContext'
import { mockProduct } from '@/test/mocks'

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <CartProvider>{children}</CartProvider>
)

describe('useCart', () => {
  it('adds items to cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    
    act(() => {
      result.current.addToCart(mockProduct)
    })
    
    expect(result.current.items).toHaveLength(1)
    expect(result.current.items[0].product).toEqual(mockProduct)
  })

  it('calculates total correctly', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    
    act(() => {
      result.current.addToCart(mockProduct)
    })
    
    expect(result.current.total).toBe(mockProduct.price)
  })
})
```

### E2E Testing
```typescript
// e2e/purchase-flow.spec.ts
import { test, expect } from '@playwright/test'

test('complete purchase flow', async ({ page }) => {
  // Navigate to shop
  await page.goto('/shop')
  
  // Add product to cart
  await page.click('[data-testid="product-card"]:first-child')
  await page.click('[data-testid="add-to-cart"]')
  
  // Go to cart
  await page.click('[data-testid="cart-icon"]')
  await expect(page.locator('[data-testid="cart-item"]')).toHaveCount(1)
  
  // Proceed to checkout
  await page.click('[data-testid="checkout-button"]')
  
  // Fill checkout form
  await page.fill('[data-testid="email"]', 'test@example.com')
  await page.fill('[data-testid="first-name"]', 'John')
  await page.fill('[data-testid="last-name"]', 'Doe')
  
  // Complete purchase
  await page.click('[data-testid="place-order"]')
  
  // Verify success
  await expect(page.locator('[data-testid="order-success"]')).toBeVisible()
})
```

## 🔄 Git Workflow

### Branch Strategy
```bash
# Main branches
main          # Production-ready code
develop       # Integration branch

# Feature branches
feature/user-authentication
feature/payment-integration
bugfix/cart-total-calculation
hotfix/security-patch
```

### Commit Message Convention
```bash
# Format: type(scope): description

feat(cart): add wishlist functionality
fix(checkout): resolve total calculation error
docs(readme): update installation instructions
style(header): fix mobile navigation styles
refactor(products): extract product service
test(cart): add unit tests for cart context
```

### Pull Request Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Manual testing completed

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
```

## 🚀 Deployment

### Build Process
```bash
# Development build
npm run build

# Production build with optimizations
npm run build:production

# Type checking
npm run type-check

# Linting
npm run lint
```

### Environment Configuration
```bash
# Development
NODE_ENV=development
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Production
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://norelle.com
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
```

### Performance Optimization
```typescript
// next.config.js
const nextConfig = {
  // Image optimization
  images: {
    domains: ['cdn.norelle.com'],
    formats: ['image/webp', 'image/avif'],
  },
  
  // Compression
  compress: true,
  
  // Bundle analyzer
  webpack: (config, { isDev }) => {
    if (!isDev) {
      // Production optimizations
    }
    return config
  },
}
```

## 🔧 Debugging

### Common Issues

#### 1. Hydration Mismatch
```typescript
// Problem: Server and client render different content
// Solution: Use useEffect for client-only data
const [isClient, setIsClient] = useState(false)

useEffect(() => {
  setIsClient(true)
}, [])

return (
  <div>
    {isClient && <ClientOnlyComponent />}
  </div>
)
```

#### 2. State Persistence Issues
```typescript
// Problem: localStorage not available on server
// Solution: Check for window existence
const loadCart = () => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('cart')
    return saved ? JSON.parse(saved) : initialState
  }
  return initialState
}
```

#### 3. Performance Issues
```typescript
// Problem: Re-renders on every change
// Solution: Use memoization
const ProductList = React.memo(({ products }: ProductListProps) => {
  return (
    <div>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
})
```

### Debug Tools
```typescript
// Development debugging
if (process.env.NODE_ENV === 'development') {
  console.log('Cart state:', cart)
  console.log('Product data:', products)
}

// Error boundaries
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>
    }

    return this.props.children
  }
}
```

## 📚 Learning Resources

### Internal Documentation
- [Architecture Guide](./ARCHITECTURE.md)
- [Learning Guide](./LEARNING.md)
- [Component Library](./COMPONENTS.md)

### External Resources
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

### Code Quality Tools
- ESLint for code linting
- Prettier for code formatting
- TypeScript for type checking
- Husky for git hooks

---

This development guide provides comprehensive standards and patterns for maintaining high-quality code in the Norelle webshop project. Follow these guidelines to ensure consistency, maintainability, and scalability.
