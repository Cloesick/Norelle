'use client'

import React, { useState, useMemo } from 'react'
import { products } from '@/data/products'
import { ProductCard } from '@/components/ProductCard'
import { 
  AdjustmentsHorizontalIcon,
  FunnelIcon,
  ArrowDownIcon,
  ArrowUpIcon
} from '@heroicons/react/24/outline'

type SortOption = 'default' | 'price-low' | 'price-high' | 'name-asc' | 'name-desc' | 'rating'
type FilterCategory = string

export default function ShopPage() {
  const [sortBy, setSortBy] = useState<SortOption>('default')
  const [selectedCategories, setSelectedCategories] = useState<FilterCategory[]>([])
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500])
  const [showFilters, setShowFilters] = useState(false)

  // Get unique categories from products
  const categories = useMemo(() => {
    const cats = new Set<string>()
    products.forEach(product => {
      product.categories.forEach(cat => cats.add(cat.name))
    })
    return Array.from(cats).sort()
  }, [])

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products

    // Filter by categories
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(product =>
        product.categories.some(cat => selectedCategories.includes(cat.name))
      )
    }

    // Filter by price range
    filtered = filtered.filter(product => {
      const price = product.salePrice || product.price
      return price >= priceRange[0] && price <= priceRange[1]
    })

    // Sort products
    const sorted = [...filtered]
    switch (sortBy) {
      case 'price-low':
        return sorted.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price))
      case 'price-high':
        return sorted.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price))
      case 'name-asc':
        return sorted.sort((a, b) => a.name.localeCompare(b.name))
      case 'name-desc':
        return sorted.sort((a, b) => b.name.localeCompare(a.name))
      case 'rating':
        return sorted.sort((a, b) => b.rating - a.rating)
      default:
        return sorted
    }
  }, [selectedCategories, priceRange, sortBy])

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
  }

  const clearFilters = () => {
    setSelectedCategories([])
    setPriceRange([0, 500])
    setSortBy('default')
  }

  const maxPrice = Math.max(...products.map(p => p.price))

  return (
    <div className="min-h-screen bg-norelle-burgundy">
      <div className="max-w-6xl mx-auto px-6 py-16 md:py-24">
        {/* Header */}
        <div className="mb-12">
          <h1 className="mb-4">All Fragrances</h1>
          <p className="text-norelle-cream/50 text-sm font-light">
            The complete Nor&#x0113;lle collection
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            {/* Mobile Filter Toggle */}
            <div className="lg:hidden mb-6">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="btn-secondary w-full inline-flex items-center justify-center"
              >
                <FunnelIcon className="w-5 h-5 mr-2" />
                Filters
                {selectedCategories.length > 0 && (
                  <span className="ml-2 bg-norelle-cream text-norelle-burgundy text-xs px-2 py-1 rounded-full">
                    {selectedCategories.length}
                  </span>
                )}
              </button>
            </div>

            {/* Filters */}
            <div className={`${showFilters ? 'block' : 'hidden'} lg:block border border-norelle-cream/10 p-6`}>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-sm font-body font-light text-norelle-cream uppercase tracking-brand">Filters</h3>
                <button
                  onClick={clearFilters}
                  className="text-xs text-norelle-cream/40 hover:text-norelle-cream transition-colors duration-300 font-light"
                >
                  Clear all
                </button>
              </div>

              {/* Categories */}
              <div className="mb-8">
                <h4 className="text-sm font-medium text-norelle-cream mb-4 uppercase tracking-wide">
                  Categories
                </h4>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <label key={category} className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category)}
                        onChange={() => handleCategoryToggle(category)}
                        className="w-4 h-4 text-norelle-cream bg-norelle-burgundy border-norelle-border rounded focus:ring-norelle-cream focus:ring-2"
                      />
                      <span className="ml-3 text-xs text-norelle-cream/50 font-light">
                        {category}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-8">
                <h4 className="text-sm font-medium text-norelle-cream mb-4 uppercase tracking-wide">
                  Price Range
                </h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm text-norelle-text-muted">
                    <span>€{priceRange[0]}</span>
                    <span>€{priceRange[1]}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max={maxPrice}
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full h-2 bg-norelle-burgundy border border-norelle-border rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <main className="flex-1">
            {/* Sort Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div className="text-norelle-cream/50 text-xs font-light">
                {filteredAndSortedProducts.length} products found
              </div>
              
              <div className="flex items-center space-x-2">
                <label htmlFor="sort" className="text-sm text-norelle-text-muted">
                  Sort by:
                </label>
                <select
                  id="sort"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="bg-norelle-burgundy-light border border-norelle-border text-norelle-cream px-3 py-2 text-sm rounded-sm focus:outline-none focus:ring-2 focus:ring-norelle-cream"
                >
                  <option value="default">Default</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name-asc">Name: A to Z</option>
                  <option value="name-desc">Name: Z to A</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>

            {/* Products Grid */}
            {filteredAndSortedProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredAndSortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-norelle-text-muted mb-4">
                  No products found matching your criteria.
                </div>
                <button
                  onClick={clearFilters}
                  className="btn-secondary"
                >
                  Clear filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
