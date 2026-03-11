'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Product } from '@/types'
import { useCart } from '@/context/CartContext'

interface ProductCardProps {
  product: Product
  className?: string
}

export function ProductCard({ product, className = '' }: ProductCardProps) {
  const { addToCart } = useCart()
  const [isAddingToCart, setIsAddingToCart] = React.useState(false)

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    setIsAddingToCart(true)
    await addToCart(product, 1)
    setIsAddingToCart(false)
  }

  const primaryImage = product.images.find(img => img.isPrimary) || product.images[0]
  const displayPrice = product.salePrice || product.price
  const hasSale = product.salePrice && product.salePrice < product.price

  return (
    <div className={`product-card group ${className}`}>
      <Link href={`/product/${product.slug}`} className="block">
        {/* Product Image */}
        <div className="relative aspect-[3/4] overflow-hidden bg-norelle-burgundy-light mb-5">
          <Image
            src={primaryImage.url}
            alt={primaryImage.alt}
            fill
            className="object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {/* Add to bag — appears on hover */}
          <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <button
              onClick={handleAddToCart}
              disabled={isAddingToCart || product.stock === 0}
              className="w-full bg-norelle-cream/90 backdrop-blur-sm text-norelle-burgundy py-2.5 text-xs font-body font-light uppercase tracking-brand hover:bg-norelle-cream transition-colors duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {isAddingToCart ? 'Adding...' : product.stock === 0 ? 'Sold out' : 'Add to bag'}
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-2">
          {/* Category */}
          <p className="text-[10px] text-norelle-cream/35 uppercase tracking-brand font-light">
            {product.categories[0].name}
          </p>

          {/* Product Name */}
          <h3 className="font-display font-light text-norelle-cream text-lg normal-case tracking-wide leading-snug">
            {product.name}
          </h3>

          {/* Description */}
          <p className="text-xs text-norelle-cream/45 font-light leading-relaxed line-clamp-2">
            {product.shortDescription}
          </p>

          {/* Price */}
          <div className="flex items-center gap-3 pt-1">
            <span className="text-sm font-body font-light text-norelle-cream/70">
              &euro;{displayPrice.toFixed(0)}
            </span>
            {hasSale && (
              <span className="text-xs text-norelle-cream/30 line-through font-light">
                &euro;{product.price.toFixed(0)}
              </span>
            )}
          </div>
        </div>
      </Link>
    </div>
  )
}
