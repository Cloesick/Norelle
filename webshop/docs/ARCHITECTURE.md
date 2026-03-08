# Norelle Webshop Architecture

This document provides a deep dive into the architectural decisions and patterns used in the Norelle webshop project.

## 🏗 Overall Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Next.js App Router                      │
├─────────────────────────────────────────────────────────────┤
│  app/                                                      │
│  ├── layout.tsx          # Root layout (HTML, providers)   │
│  ├── page.tsx            # Homepage                         │
│  ├── shop/page.tsx       # Product listing                 │
│  ├── cart/page.tsx       # Shopping cart                    │
│  └── category/[slug]/    # Dynamic category pages          │
├─────────────────────────────────────────────────────────────┤
│  components/              # Reusable UI components          │
│  ├── Header.tsx          # Site navigation                 │
│  ├── Footer.tsx          # Site footer                     │
│  ├── ProductCard.tsx     # Product display component       │
│  └── SalesPipeline.tsx   # Checkout progress indicator     │
├─────────────────────────────────────────────────────────────┤
│  context/                 # State management               │
│  └── CartContext.tsx      # Shopping cart state            │
├─────────────────────────────────────────────────────────────┤
│  data/                    # Static data layer              │
│  └── products.ts          # Product catalog                │
├─────────────────────────────────────────────────────────────┤
│  types/                   # TypeScript definitions         │
│  └── index.ts             # Core type interfaces           │
└─────────────────────────────────────────────────────────────┘
```

## 🔄 Data Flow Architecture

### 1. Component Data Flow
```
User Action → Component → Context/State → UI Update
     ↓              ↓           ↓           ↓
  Click Add → ProductCard → CartContext → Re-render
```

### 2. State Management Flow
```
localStorage ←→ CartContext ←→ Components
     ↓               ↓              ↓
  Persistence    State Logic    UI Updates
```

### 3. Routing Flow
```
URL → Next.js Router → Page Component → Data Fetch → Render
```

## 🧩 Component Architecture

### 1. Layout Components
**Purpose**: Provide structure and shared functionality
**Examples**: `layout.tsx`, `Header`, `Footer`

```typescript
// Root Layout Pattern
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  )
}
```

### 2. Page Components
**Purpose**: Route-specific content and logic
**Examples**: `page.tsx`, `shop/page.tsx`

```typescript
// Page Component Pattern
export default function ShopPage() {
  const [filters, setFilters] = useState()
  const products = useFilteredProducts(filters)
  
  return (
    <div>
      <FilterPanel filters={filters} onChange={setFilters} />
      <ProductGrid products={products} />
    </div>
  )
}
```

### 3. Reusable Components
**Purpose**: Self-contained, reusable UI elements
**Examples**: `ProductCard`, `Button`, `Modal`

```typescript
// Reusable Component Pattern
interface ProductCardProps {
  product: Product
  onAddToCart?: (product: Product) => void
  className?: string
}

export function ProductCard({ product, onAddToCart, className }: ProductCardProps) {
  return (
    <div className={className}>
      {/* Component implementation */}
    </div>
  )
}
```

## 🗄 Data Architecture

### 1. Static Data Layer
```typescript
// data/products.ts
export const products: Product[] = [
  {
    id: '1',
    name: 'Aurelia Gold Necklace',
    // ... product data
  }
]

// Helper functions
export const getProductBySlug = (slug: string): Product | undefined => {
  return products.find(product => product.slug === slug)
}
```

### 2. Type Definitions
```typescript
// types/index.ts
export interface Product {
  id: string
  name: string
  slug: string
  price: number
  categories: Category[]
  images: ProductImage[]
}

export interface CartItem {
  product: Product
  quantity: number
}
```

### 3. State Management
```typescript
// context/CartContext.tsx
interface CartContextType {
  cart: Cart
  addToCart: (product: Product, quantity?: number) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
}

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, dispatch] = useReducer(cartReducer, initialState)
  
  // Context implementation
}
```

## 🎨 Styling Architecture

### 1. Design System
```css
/* CSS Variables for Brand Colors */
:root {
  --norelle-burgundy: #3b0505;
  --norelle-cream: #eeefc9;
  --norelle-light-cream: #fffaea;
}

/* Tailwind Config Extension */
module.exports = {
  theme: {
    extend: {
      colors: {
        norelle: {
          burgundy: 'var(--norelle-burgundy)',
          cream: 'var(--norelle-cream)',
        }
      }
    }
  }
}
```

### 2. Component Styles
```css
/* Utility Classes */
.btn-primary {
  @apply bg-norelle-cream text-norelle-burgundy px-6 py-3;
}

.product-card {
  @apply bg-norelle-burgundy-light border border-norelle-border;
}
```

### 3. Responsive Architecture
```css
/* Mobile-First Approach */
.product-grid {
  @apply grid-cols-1; /* Mobile */
}

@media (min-width: 768px) {
  .product-grid {
    @apply grid-cols-2; /* Tablet */
  }
}

@media (min-width: 1024px) {
  .product-grid {
    @apply grid-cols-3; /* Desktop */
  }
}
```

## 🔀 Navigation Architecture

### 1. File-Based Routing
```
app/
├── page.tsx              → /
├── shop/page.tsx         → /shop
├── cart/page.tsx         → /cart
├── category/[slug]/page.tsx → /category/necklaces, /category/earrings
└── product/[slug]/page.tsx → /product/aurelia-gold-necklace
```

### 2. Navigation Components
```typescript
// Header Navigation
const navigation = [
  { name: 'Shop', href: '/shop' },
  { name: 'Necklaces', href: '/category/necklaces' },
  { name: 'Earrings', href: '/category/earrings' },
]

// Mobile Navigation Pattern
const [isMenuOpen, setIsMenuOpen] = useState(false)
```

### 3. Route Protection
```typescript
// Future: Protected routes
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth()
  
  if (!user) {
    return <Login />
  }
  
  return <>{children}</>
}
```

## 📦 State Management Patterns

### 1. Context API Pattern
```typescript
// Provider Pattern
export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  
  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  )
}

// Custom Hook Pattern
export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within CartProvider')
  }
  return context
}
```

### 2. Reducer Pattern
```typescript
type CartAction = 
  | { type: 'ADD_TO_CART'; payload: Product }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return { ...state, items: [...state.items, action.payload] }
    // ... other cases
  }
}
```

### 3. Local State Pattern
```typescript
// Component-level state
const ProductCard = ({ product }: ProductCardProps) => {
  const [isWishlist, setIsWishlist] = useState(false)
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  
  // Component logic
}
```

## 🚀 Performance Architecture

### 1. Code Splitting
```typescript
// Dynamic Imports
const AdminPanel = dynamic(() => import('./AdminPanel'), {
  loading: () => <div>Loading...</div>
})

// Route-based Splitting (Automatic with Next.js)
app/shop/page.tsx → Separate chunk
app/cart/page.tsx → Separate chunk
```

### 2. Memoization
```typescript
// React.memo for component memoization
export const ProductCard = React.memo(({ product }: ProductCardProps) => {
  return <div>{/* component */}</div>
})

// useMemo for expensive calculations
const filteredProducts = useMemo(() => {
  return products.filter(/* expensive filter */)
}, [products, filters])

// useCallback for function memoization
const handleAddToCart = useCallback((product: Product) => {
  addToCart(product)
}, [addToCart])
```

### 3. Image Optimization
```typescript
<Image
  src={product.image}
  alt={product.name}
  fill
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  priority // For above-the-fold images
/>
```

## 🔒 Security Architecture

### 1. Input Validation
```typescript
// Type validation
const addToCart = (product: Product, quantity: number = 1) => {
  if (quantity <= 0 || quantity > product.stock) {
    throw new Error('Invalid quantity')
  }
  // Add to cart logic
}
```

### 2. Data Sanitization
```typescript
// Safe rendering
const ProductDescription = ({ description }: { description: string }) => {
  return <p>{description}</p> // React auto-escapes
}
```

### 3. CSRF Protection (Future)
```typescript
// CSRF token implementation
const csrfToken = getCsrfToken()
```

## 🧪 Testing Architecture (Future)

### 1. Unit Testing
```typescript
// Component testing
describe('ProductCard', () => {
  it('should render product information', () => {
    render(<ProductCard product={mockProduct} />)
    expect(screen.getByText(mockProduct.name)).toBeInTheDocument()
  })
})
```

### 2. Integration Testing
```typescript
// Context testing
describe('CartContext', () => {
  it('should add items to cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper: CartProvider })
    act(() => {
      result.current.addToCart(mockProduct)
    })
    expect(result.current.cart.items).toContain(mockProduct)
  })
})
```

### 3. E2E Testing
```typescript
// Playwright testing
test('complete purchase flow', async ({ page }) => {
  await page.goto('/shop')
  await page.click('[data-testid="product-card"]')
  await page.click('[data-testid="add-to-cart"]')
  await page.goto('/cart')
  await page.click('[data-testid="checkout"]')
  // ... complete flow
})
```

## 📊 Monitoring Architecture (Future)

### 1. Error Tracking
```typescript
// Error boundary
class ErrorBoundary extends React.Component {
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
    // Send to error tracking service
  }
}
```

### 2. Performance Monitoring
```typescript
// Performance metrics
const measurePerformance = (name: string, fn: () => void) => {
  const start = performance.now()
  fn()
  const end = performance.now()
  console.log(`${name} took ${end - start} milliseconds`)
}
```

### 3. Analytics Integration
```typescript
// Event tracking
const trackEvent = (event: string, properties: object) => {
  // Send to analytics service
  window.gtag('event', event, properties)
}
```

## 🔮 Future Architecture Extensions

### 1. Microservices
```
Frontend → API Gateway → Product Service → Order Service → User Service
```

### 2. Server Components
```typescript
// Server component for data fetching
async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getProduct(params.slug)
  
  return (
    <div>
      <h1>{product.name}</h1>
      <ProductClient product={product} />
    </div>
  )
}
```

### 3. Real-time Features
```typescript
// WebSocket integration
const useRealtimeStock = (productId: string) => {
  const [stock, setStock] = useState()
  
  useEffect(() => {
    const ws = new WebSocket(`ws://localhost:3000/stock/${productId}`)
    ws.onmessage = (event) => setStock(JSON.parse(event.data))
    
    return () => ws.close()
  }, [productId])
  
  return stock
}
```

---

## 📋 Architecture Decisions & Rationale

### 1. Next.js App Router
**Decision**: Use Next.js 14 App Router
**Rationale**: 
- Built-in optimizations
- Server components support
- Excellent TypeScript integration
- File-based routing simplicity

### 2. TypeScript
**Decision**: Full TypeScript implementation
**Rationale**:
- Type safety catches errors early
- Better IDE support and autocomplete
- Self-documenting code
- Easier refactoring

### 3. Tailwind CSS
**Decision**: Utility-first CSS framework
**Rationale**:
- Rapid development without writing CSS
- Consistent design system
- Responsive utilities built-in
- Easy customization

### 4. Zustand for State Management
**Decision**: Zustand over Redux/Context
**Rationale**:
- Simpler API than Redux
- Better performance than Context
- TypeScript support
- No provider wrapper needed

### 5. Component-Based Architecture
**Decision**: Modular, reusable components
**Rationale**:
- Maintainability
- Reusability
- Testing isolation
- Clear separation of concerns

---

This architecture provides a solid foundation for a scalable, maintainable e-commerce application while demonstrating modern web development best practices.
