'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Product } from '@/types'
import { useCart } from '@/context/CartContext'
import { StarIcon, HeartIcon } from '@heroicons/react/24/outline'
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid'

interface ProductCardProps {
  product: Product
  className?: string
}

export function ProductCard({ product, className = '' }: ProductCardProps) {
  const { addToCart } = useCart()
  const [isWishlist, setIsWishlist] = React.useState(false)
  const [isAddingToCart, setIsAddingToCart] = React.useState(false)

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    setIsAddingToCart(true)
    await addToCart(product, 1)
    setIsAddingToCart(false)
  }

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsWishlist(!isWishlist)
  }

  const renderRating = () => {
    const fullStars = Math.floor(product.rating)
    const hasHalfStar = product.rating % 1 !== 0
    const emptyStars = 5 - Math.ceil(product.rating)

    return (
      <div className="flex items-center space-x-1">
        {[...Array(fullStars)].map((_, i) => (
          <StarIconSolid key={`full-${i}`} className="w-4 h-4 text-yellow-400" />
        ))}
        {hasHalfStar && (
          <div className="relative">
            <StarIcon className="w-4 h-4 text-yellow-400" />
            <div className="absolute inset-0 overflow-hidden w-2">
              <StarIconSolid className="w-4 h-4 text-yellow-400" />
            </div>
          </div>
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <StarIcon key={`empty-${i}`} className="w-4 h-4 text-yellow-400" />
        ))}
        <span className="text-sm text-norelle-text-muted ml-1">
          ({product.reviewCount})
        </span>
      </div>
    )
  }

  const primaryImage = product.images.find(img => img.isPrimary) || product.images[0]
  const displayPrice = product.salePrice || product.price
  const hasSale = product.salePrice && product.salePrice < product.price

  return (
    <div className={`product-card group ${className}`}>
      <Link href={`/product/${product.slug}`} className="block">
        <div className="relative">
          {/* Product Image */}
          <div className="relative h-64 md:h-72 lg:h-80 overflow-hidden">
            <Image
              src={primaryImage.url}
              alt={primaryImage.alt}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            
            {/* Overlay Actions */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
              <div className="flex space-x-2 w-full">
                <button
                  onClick={handleAddToCart}
                  disabled={isAddingToCart || product.stock === 0}
                  className="flex-1 bg-norelle-cream text-norelle-burgundy py-2 px-4 text-sm font-medium hover:bg-white transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isAddingToCart ? 'Adding...' : 'Add to Bag'}
                </button>
                <button
                  onClick={handleToggleWishlist}
                  className="bg-norelle-burgundy/80 backdrop-blur-sm text-norelle-cream p-2 hover:bg-norelle-burgundy transition-colors duration-200"
                >
                  <HeartIcon 
                    className={`w-5 h-5 ${isWishlist ? 'fill-current' : ''}`} 
                  />
                </button>
              </div>
            </div>

            {/* Badges */}
            <div className="absolute top-4 left-4 space-y-2">
              {hasSale && (
                <div className="bg-red-600 text-white px-2 py-1 text-xs font-medium rounded-sm">
                  -{Math.round(((product.price - product.salePrice!) / product.price) * 100)}%
                </div>
              )}
              {product.stock <= 5 && product.stock > 0 && (
                <div className="bg-orange-600 text-white px-2 py-1 text-xs font-medium rounded-sm">
                  Only {product.stock} left
                </div>
              )}
              {product.featured && (
                <div className="bg-norelle-cream text-norelle-burgundy px-2 py-1 text-xs font-medium rounded-sm">
                  Featured
                </div>
              )}
            </div>

            {/* Wishlist Button (Mobile) */}
            <button
              onClick={handleToggleWishlist}
              className="absolute top-4 right-4 bg-norelle-burgundy/80 backdrop-blur-sm text-norelle-cream p-2 hover:bg-norelle-burgundy transition-colors duration-200 lg:hidden"
            >
              <HeartIcon className={`w-5 h-5 ${isWishlist ? 'fill-current' : ''}`} />
            </button>
          </div>

          {/* Product Info */}
          <div className="p-4 md:p-6">
            {/* Category */}
            <div className="text-xs text-norelle-text-muted uppercase tracking-wide mb-2">
              {product.categories[0].name}
            </div>

            {/* Product Name */}
            <h3 className="text-norelle-cream font-serif text-lg md:text-xl font-medium mb-2 line-clamp-2 group-hover:text-norelle-light-cream transition-colors duration-200">
              {product.name}
            </h3>

            {/* Description */}
            <p className="text-sm text-norelle-text-muted mb-3 line-clamp-2">
              {product.shortDescription}
            </p>

            {/* Rating */}
            <div className="mb-3">
              {renderRating()}
            </div>

            {/* Price */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-lg font-bold text-norelle-cream">
                  €{displayPrice.toFixed(2)}
                </span>
                {hasSale && (
                  <span className="text-sm text-norelle-text-muted line-through">
                    €{product.price.toFixed(2)}
                  </span>
                )}
              </div>
              
              {/* Stock Status */}
              {product.stock === 0 && (
                <span className="text-xs text-red-400 font-medium">
                  Out of Stock
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}
