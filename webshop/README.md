# Norelle Webshop

A modern, fully-functional e-commerce webshop for Norelle jewellery, built with Next.js 14, TypeScript, and Tailwind CSS.

## 🌟 Features

- **Modern Tech Stack**: Next.js 14, TypeScript, Tailwind CSS, React 18
- **Mobile-First Design**: Responsive layout optimized for all devices
- **Premium Brand Experience**: Elegant dark theme with Norelle's signature colors
- **Shopping Cart**: Full cart functionality with localStorage persistence
- **Product Catalog**: Dynamic product grid with filtering and sorting
- **Sales Pipeline**: Visual progress indicator for checkout flow
- **Performance Optimized**: Fast loading with Next.js optimizations
- **Type Safety**: Full TypeScript implementation

## 🛠 Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 14.0.4 | React framework with App Router |
| **TypeScript** | 5.3.3 | Type safety and better DX |
| **Tailwind CSS** | 3.3.6 | Utility-first CSS framework |
| **React** | 18.2.0 | UI library |
| **Heroicons** | 2.0.18 | Icon library |
| **Framer Motion** | 10.16.16 | Animations |
| **Zustand** | 4.4.7 | State management |
| **React Hot Toast** | 2.4.1 | Toast notifications |

## 🎨 Design System

### Brand Colors
- **Burgundy**: `#3b0505` (Primary background)
- **Cream**: `#eeefc9` (Primary text)
- **Light Cream**: `#fffaea` (Accent backgrounds)
- **Burgundy Light**: `#5a1a1a` (Hover states)
- **Burgundy Dark**: `#2a0303` (Active states)

### Typography
- **Serif**: Cormorant Garamond (headings, elegant elements)
- **Sans**: Inter (body text, UI elements)

### Responsive Breakpoints
- **Mobile**: Base styles (0px+)
- **Tablet**: ≥481px
- **Desktop**: ≥769px

## 📁 Project Structure

```
webshop/
├── app/                    # Next.js App Router pages
│   ├── cart/              # Shopping cart page
│   ├── category/[slug]/   # Dynamic category pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx          # Homepage
│   └── shop/             # Shop listing page
├── components/            # Reusable React components
│   ├── Footer.tsx        # Site footer
│   ├── Header.tsx        # Site header with navigation
│   ├── ProductCard.tsx   # Product display card
│   └── SalesPipeline.tsx # Checkout progress indicator
├── context/              # React contexts
│   └── CartContext.tsx   # Shopping cart state management
├── data/                 # Static data
│   └── products.ts       # Product catalog and categories
├── types/                # TypeScript type definitions
│   └── index.ts          # Core types
├── public/               # Static assets
│   └── images/          # Product and brand images
└── tailwind.config.js   # Tailwind configuration
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd norelle/webshop
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## 🛍 E-commerce Features

### Product Management
- 12 sample products across 5 categories
- Detailed product information (materials, care instructions, dimensions)
- Product variants (sizes, colors)
- Stock management
- Sale pricing with percentage badges

### Shopping Experience
- Product grid with hover effects
- Advanced filtering (categories, price range)
- Multiple sorting options
- Wishlist functionality
- Quick add to cart
- Product ratings and reviews

### Cart & Checkout
- Persistent cart (localStorage)
- Quantity management
- Dynamic shipping calculation
- Tax calculation (21% Belgium rate)
- Free shipping thresholds
- Multi-step checkout flow
- Sales pipeline visualization

## 📱 Mobile Experience

The webshop is built mobile-first with:

- **Responsive Navigation**: Hamburger menu on mobile, full navigation on desktop
- **Touch-Friendly**: 48px minimum touch targets
- **Optimized Layouts**: 1-column grids on mobile, expanding to 3-columns on desktop
- **Performance**: Optimized images and lazy loading
- **Progressive Enhancement**: Core functionality works without JavaScript

## 🎯 Key Components

### Header Component
- Sticky navigation with scroll effects
- Mobile hamburger menu with smooth animations
- Cart item counter
- Search and account links
- Brand logo with responsive sizing

### ProductCard Component
- Product image gallery with hover effects
- Quick add to cart functionality
- Wishlist toggle
- Sale badges and stock indicators
- Star ratings with review counts
- Responsive pricing display

### CartContext
- Zustand-based state management
- localStorage persistence
- Shipping and tax calculation
- Stock validation
- Toast notifications

### SalesPipeline
- Visual checkout progress
- 5-stage pipeline (Discover → Choose → Overview → Payment → Confirmed)
- Automatic stage detection
- Responsive design

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file for environment-specific settings:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
```

### Tailwind Configuration
The project uses a custom Tailwind configuration with:
- Norelle brand colors
- Custom component classes
- Responsive breakpoints
- Animation utilities

## 📦 Data Management

### Products
Products are stored in `data/products.ts` with:
- TypeScript interfaces for type safety
- Sample product data
- Category associations
- Helper functions for filtering

### Categories
Dynamic category system with:
- URL-friendly slugs
- Product counting
- Hierarchical organization

## 🚀 Performance Features

- **Next.js Optimizations**: Automatic code splitting, image optimization
- **Lazy Loading**: Images and components loaded as needed
- **Caching**: Static asset optimization
- **Bundle Analysis**: Optimized dependencies
- **SEO**: Meta tags, structured data, sitemap generation

## 🛠 Development Commands

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript checks
```

## 📈 Future Enhancements

### Planned Features
- [ ] Single product pages with image galleries
- [ ] Multi-step checkout flow
- [ ] Payment integration (Stripe, PayPal)
- [ ] User accounts and order history
- [ ] Product search functionality
- [ ] Blog and content management
- [ ] Email marketing integration
- [ ] Analytics and tracking

### Technical Improvements
- [ ] Server-side rendering optimizations
- [ ] Progressive Web App (PWA)
- [ ] Advanced filtering options
- [ ] Product recommendation engine
- [ ] A/B testing framework
- [ ] Internationalization (i18n)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support and questions:
- Email: hello@norelle.com
- Phone: +32 2 123 45 67
- Address: Rue des Bouchers 12, 1000 Brussels, Belgium

---

*Built with ❤️ for Norelle - Timeless Elegance*
