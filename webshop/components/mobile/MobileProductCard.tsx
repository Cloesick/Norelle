'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { 
  HeartIcon,
  ShoppingCartIcon,
  EyeIcon,
  ShareIcon,
  StarIcon
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid'
import { Product } from '@/types'

interface MobileProductCardProps {
  product: Product
  onQuickAdd?: (product: Product) => void
  onQuickView?: (product: Product) => void
  className?: string
}

export default function MobileProductCard({ 
  product, 
  onQuickAdd, 
  onQuickView,
  className = ''
}: MobileProductCardProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [isSharing, setIsSharing] = useState(false)

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsLiked(!isLiked)
    // In a real app, this would update the wishlist
  }

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onQuickAdd?.(product)
  }

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onQuickView?.(product)
  }

  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (navigator.share) {
      setIsSharing(true)
      try {
        await navigator.share({
          title: product.name,
          text: `Check out this beautiful ${product.name} from Norelle`,
          url: window.location.origin + `/product/${product.slug}`
        })
      } catch (error) {
        console.log('Share cancelled')
      }
      setIsSharing(false)
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(
        window.location.origin + `/product/${product.slug}`
      )
    }
  }

  const handleImageError = () => {
    setImageError(true)
  }

  return (
    <div className={`group relative bg-norelle-burgundy-light border border-norelle-border rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg ${className}`}>
      
      {/* Product Link */}
      <Link href={`/product/${product.slug}`} className="block">
        
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden">
          {/* Product Image */}
          {!imageError && product.images?.[0] ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              onError={handleImageError}
            />
          ) : (
            <div className="w-full h-full bg-norelle-burgundy flex items-center justify-center">
              <span className="text-norelle-text-muted text-sm">Image</span>
            </div>
          )}

          {/* Overlay Actions */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            
            {/* Quick Actions */}
            <div className="absolute top-3 right-3 flex flex-col space-y-2">
              {/* Like Button */}
              <button
                onClick={handleLike}
                className={`p-2 rounded-full transition-all duration-200 ${
                  isLiked 
                    ? 'bg-norelle-cream text-norelle-burgundy' 
                    : 'bg-white/90 text-norelle-burgundy hover:bg-white'
                }`}
                aria-label="Add to wishlist"
              >
                {isLiked ? (
                  <HeartSolidIcon className="w-4 h-4" />
                ) : (
                  <HeartIcon className="w-4 h-4" />
                )}
              </button>

              {/* Quick View */}
              <button
                onClick={handleQuickView}
                className="p-2 bg-white/90 text-norelle-burgundy rounded-full hover:bg-white transition-all duration-200"
                aria-label="Quick view"
              >
                <EyeIcon className="w-4 h-4" />
              </button>

              {/* Share */}
              <button
                onClick={handleShare}
                disabled={isSharing}
                className="p-2 bg-white/90 text-norelle-burgundy rounded-full hover:bg-white transition-all duration-200 disabled:opacity-50"
                aria-label="Share"
              >
                <ShareIcon className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Add Button */}
            <div className="absolute bottom-3 left-3 right-3">
              <button
                onClick={handleQuickAdd}
                className="w-full py-2 bg-norelle-cream text-norelle-burgundy font-medium rounded-lg hover:bg-norelle-cream/90 transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <ShoppingCartIcon className="w-4 h-4" />
                <span>Add to Cart</span>
              </button>
            </div>
          </div>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col space-y-2">
            {product.featured && (
              <span className="px-2 py-1 bg-norelle-cream text-norelle-burgundy text-xs font-bold rounded-full">
                Featured
              </span>
            )}
            {product.salePrice && (
              <span className="px-2 py-1 bg-red-600 text-white text-xs font-bold rounded-full">
                Sale
              </span>
            )}
            {product.stock < 10 && product.stock > 0 && (
              <span className="px-2 py-1 bg-yellow-600 text-white text-xs font-bold rounded-full">
                Low Stock
              </span>
            )}
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4">
          {/* Rating */}
          <div className="flex items-center space-x-1 mb-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <StarIcon
                  key={i}
                  className={`w-4 h-4 ${
                    i < (product.rating || 4)
                      ? 'text-yellow-400 fill-current'
                      : 'text-norelle-text-muted'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-norelle-text-muted">
              ({product.reviews || 12})
            </span>
          </div>

          {/* Product Name */}
          <h3 className="text-norelle-cream font-serif font-semibold text-lg mb-2 line-clamp-2 group-hover:text-norelle-cream/90 transition-colors duration-200">
            {product.name}
          </h3>

          {/* Category */}
          <p className="text-norelle-text-muted text-sm mb-3">
            {product.categories?.[0]?.name || 'Jewelry'}
          </p>

          {/* Price */}
          <div className="flex items-center space-x-2">
            <span className="text-norelle-cream font-bold text-lg">
              €{(product.salePrice || product.price).toFixed(2)}
            </span>
            {product.salePrice && (
              <span className="text-norelle-text-muted line-through text-sm">
                €{product.price.toFixed(2)}
              </span>
            )}
          </div>

          {/* Stock Status */}
          {product.stock === 0 ? (
            <p className="text-red-400 text-sm mt-2">Out of Stock</p>
          ) : product.stock < 10 ? (
            <p className="text-yellow-400 text-sm mt-2">Only {product.stock} left</p>
          ) : (
            <p className="text-green-400 text-sm mt-2">In Stock</p>
          )}
        </div>
      </Link>
    </div>
  )
}

// Mobile Product Grid Component
interface MobileProductGridProps {
  products: Product[]
  onQuickAdd?: (product: Product) => void
  onQuickView?: (product: Product) => void
  columns?: 1 | 2
}

export function MobileProductGrid({ 
  products, 
  onQuickAdd, 
  onQuickView,
  columns = 2 
}: MobileProductGridProps) {
  const gridCols = columns === 1 ? 'grid-cols-1' : 'grid-cols-2'

  return (
    <div className={`grid ${gridCols} gap-4 md:gap-6`}>
      {products.map((product) => (
        <MobileProductCard
          key={product.id}
          product={product}
          onQuickAdd={onQuickAdd}
          onQuickView={onQuickView}
        />
      ))}
    </div>
  )
}

// Mobile Filter Component
interface MobileFilterProps {
  isOpen: boolean
  onClose: () => void
  onApply: (filters: any) => void
  categories: string[]
  priceRange: { min: number; max: number }
}

export function MobileFilter({ 
  isOpen, 
  onClose, 
  onApply, 
  categories,
  priceRange 
}: MobileFilterProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [priceFilter, setPriceFilter] = useState({ min: priceRange.min, max: priceRange.max })

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
  }

  const handleApply = () => {
    onApply({
      categories: selectedCategories,
      price: priceFilter
    })
    onClose()
  }

  const handleClear = () => {
    setSelectedCategories([])
    setPriceFilter({ min: priceRange.min, max: priceRange.max })
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex flex-col">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
      />

      {/* Filter Panel */}
      <div className="relative bg-norelle-burgundy-light border-t border-norelle-border mt-auto max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-norelle-border">
          <h2 className="text-lg font-serif font-bold text-norelle-cream">Filters</h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleClear}
              className="text-norelle-text-muted hover:text-norelle-cream transition-colors duration-200"
            >
              Clear
            </button>
            <button
              onClick={onClose}
              className="p-2 text-norelle-cream hover:bg-norelle-burgundy rounded-lg transition-colors duration-200"
            >
              ×
            </button>
          </div>
        </div>

        {/* Filter Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* Categories */}
          <div>
            <h3 className="text-sm font-medium text-norelle-text-muted uppercase tracking-wider mb-3">
              Categories
            </h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <label
                  key={category}
                  className="flex items-center space-x-3 p-3 bg-norelle-burgundy/50 rounded-lg cursor-pointer hover:bg-norelle-burgundy transition-colors duration-200"
                >
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category)}
                    onChange={() => handleCategoryToggle(category)}
                    className="w-5 h-5 text-norelle-cream bg-norelle-burgundy border-norelle-border rounded focus:ring-norelle-cream"
                  />
                  <span className="text-norelle-cream">{category}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <h3 className="text-sm font-medium text-norelle-text-muted uppercase tracking-wider mb-3">
              Price Range
            </h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <label className="text-xs text-norelle-text-muted mb-1 block">Min</label>
                  <input
                    type="number"
                    value={priceFilter.min}
                    onChange={(e) => setPriceFilter(prev => ({ ...prev, min: Number(e.target.value) }))}
                    className="w-full px-3 py-2 bg-norelle-burgundy border border-norelle-border rounded-lg text-norelle-cream focus:outline-none focus:ring-2 focus:ring-norelle-cream focus:border-transparent"
                  />
                </div>
                <div className="flex-1">
                  <label className="text-xs text-norelle-text-muted mb-1 block">Max</label>
                  <input
                    type="number"
                    value={priceFilter.max}
                    onChange={(e) => setPriceFilter(prev => ({ ...prev, max: Number(e.target.value) }))}
                    className="w-full px-3 py-2 bg-norelle-burgundy border border-norelle-border rounded-lg text-norelle-cream focus:outline-none focus:ring-2 focus:ring-norelle-cream focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-norelle-border">
          <button
            onClick={handleApply}
            className="w-full py-3 bg-norelle-cream text-norelle-burgundy font-bold rounded-lg hover:bg-norelle-cream/90 transition-colors duration-200"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  )
}
