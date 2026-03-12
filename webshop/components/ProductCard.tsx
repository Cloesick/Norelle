'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Product } from '@/types'
import { useCart } from '@/context/CartContext'
import { useT } from '@/context/LocaleContext'

interface ProductCardProps {
  product: Product
  className?: string
}

export function ProductCard({ product, className = '' }: ProductCardProps) {
  const { addToCart } = useCart()
  const t = useT()
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
        <div className="relative aspect-square md:aspect-[3/4] overflow-hidden bg-norelle-burgundy-light mb-3 md:mb-5" style={{ position: 'relative' }}>
          <Image
            src={primaryImage.url}
            alt={primaryImage.alt}
            fill
            className="object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 33vw"
          />
          
        </div>

        {/* Product Info */}
        <div className="space-y-1 md:space-y-2">
          {/* Category */}
          <p className="text-[10px] text-norelle-cream/35 uppercase tracking-brand font-light hidden md:block">
            {product.categories[0].name}
          </p>

          {/* Product Name */}
          <h3 className="font-display font-light text-norelle-cream text-sm md:text-lg normal-case tracking-wide leading-snug">
            {product.name}
          </h3>

          {/* Description */}
          <p className="text-xs text-norelle-cream/45 font-light leading-relaxed line-clamp-2 hidden md:block">
            {product.shortDescription}
          </p>

          {/* Price */}
          <div className="flex items-center gap-2 md:gap-3">
            <span className="text-xs md:text-sm font-body font-light text-norelle-cream/70">
              &euro;{displayPrice.toFixed(0)}
            </span>
            {hasSale && (
              <span className="text-[10px] md:text-xs text-norelle-cream/30 line-through font-light">
                &euro;{product.price.toFixed(0)}
              </span>
            )}
          </div>
        </div>
      </Link>

      {/* Add to bag — always visible */}
      <button
        onClick={handleAddToCart}
        disabled={isAddingToCart || product.stock === 0}
        className="w-full mt-3 md:mt-4 border border-norelle-cream/20 text-norelle-cream py-2 md:py-2.5 text-[10px] md:text-xs font-body font-light uppercase tracking-brand hover:bg-norelle-cream hover:text-norelle-burgundy transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
      >
        {isAddingToCart ? t.common.adding : product.stock === 0 ? t.common.soldOut : t.common.addToBag}
      </button>
    </div>
  )
}
