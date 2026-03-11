'use client'

import React, { useState } from 'react'
import { Product } from '@/types'
import { useCart } from '@/context/CartContext'
import { SalesPipeline } from '@/components/SalesPipeline'
import { ProductStorytelling } from '@/components/luxury/ProductStorytelling'
import { 
  MinusIcon, 
  PlusIcon, 
  HeartIcon,
  TruckIcon,
  ShieldCheckIcon,
  ArrowRightIcon,
  StarIcon
} from '@heroicons/react/24/outline'
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid'
import Image from 'next/image'

interface ProductClientProps {
  product: Product
}

export default function ProductClient({ product }: ProductClientProps) {
  const { addToCart } = useCart()
  
  const [quantity, setQuantity] = useState(1)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [isWishlist, setIsWishlist] = useState(false)
  const [isAddingToCart, setIsAddingToCart] = useState(false)

  const images = product.images
  const currentImage = images[selectedImageIndex]
  const displayPrice = product.salePrice || product.price
  const hasSale = product.salePrice && product.salePrice < product.price

  const handleAddToCart = async () => {
    setIsAddingToCart(true)
    await addToCart(product, quantity)
    setIsAddingToCart(false)
  }

  const updateQuantity = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity)
    }
  }

  const renderRating = () => {
    const fullStars = Math.floor(product.rating)
    const hasHalfStar = product.rating % 1 !== 0
    const emptyStars = 5 - Math.ceil(product.rating)

    return (
      <div className="flex items-center space-x-2">
        <div className="flex items-center space-x-1">
          {[...Array(fullStars)].map((_, i) => (
            <StarIconSolid key={`full-${i}`} className="w-5 h-5 text-yellow-400" />
          ))}
          {hasHalfStar && (
            <div className="relative">
              <StarIcon className="w-5 h-5 text-yellow-400" />
              <div className="absolute inset-0 overflow-hidden w-2.5">
                <StarIconSolid className="w-5 h-5 text-yellow-400" />
              </div>
            </div>
          )}
          {[...Array(emptyStars)].map((_, i) => (
            <StarIcon key={`empty-${i}`} className="w-5 h-5 text-yellow-400" />
          ))}
        </div>
        <span className="text-sm text-norelle-text-muted">
          {product.rating} ({product.reviewCount} reviews)
        </span>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-norelle-burgundy">
      <SalesPipeline />
      
      {/* Immersive Product Experience */}
      <div className="container-max section-padding">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Product Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square bg-norelle-burgundy-light border border-norelle-border rounded-lg overflow-hidden">
              <Image
                src={currentImage.url}
                alt={currentImage.alt}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              
              {/* Badges */}
              <div className="absolute top-4 left-4 space-y-2">
                {hasSale && (
                  <div className="bg-red-600 text-white px-3 py-1 text-sm font-medium rounded-sm">
                    -{Math.round(((product.price - product.salePrice!) / product.price) * 100)}%
                  </div>
                )}
                {product.stock <= 5 && product.stock > 0 && (
                  <div className="bg-orange-600 text-white px-3 py-1 text-sm font-medium rounded-sm">
                    Only {product.stock} left
                  </div>
                )}
                {product.featured && (
                  <div className="bg-norelle-cream text-norelle-burgundy px-3 py-1 text-sm font-medium rounded-sm">
                    Featured
                  </div>
                )}
              </div>

              {/* Wishlist Button */}
              <button
                onClick={() => setIsWishlist(!isWishlist)}
                className="absolute top-4 right-4 p-3 bg-black/20 backdrop-blur-sm rounded-full text-norelle-cream hover:bg-black/40 transition-all duration-300"
              >
                <HeartIcon className={`w-5 h-5 ${isWishlist ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Thumbnail Gallery */}
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {images.map((image, index) => (
                  <button
                    key={image.id}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`relative aspect-square bg-norelle-burgundy-light border rounded-lg overflow-hidden transition-all duration-300 ${
                      index === selectedImageIndex
                        ? 'border-norelle-cream ring-2 ring-norelle-cream/50'
                        : 'border-norelle-border hover:border-norelle-cream'
                    }`}
                  >
                    <Image
                      src={image.url}
                      alt={image.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 25vw, 100px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Information */}
          <div className="space-y-8">
            {/* Header */}
            <div>
              <div className="text-sm text-norelle-text-muted uppercase tracking-wider mb-2">
                {product.categories[0]?.name}
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-norelle-cream mb-4">
                {product.name}
              </h1>
              <p className="text-lg text-norelle-text-muted leading-relaxed">
                {product.shortDescription}
              </p>
            </div>

            {/* Rating */}
            {product.rating > 0 && renderRating()}

            {/* Price */}
            <div className="flex items-center space-x-4">
              <div className="text-3xl font-bold text-norelle-cream">
                &euro;{displayPrice.toFixed(2)}
              </div>
              {hasSale && (
                <div className="space-y-1">
                  <div className="text-lg text-norelle-text-muted line-through">
                    &euro;{product.price.toFixed(2)}
                  </div>
                  <div className="text-sm text-green-400">
                    Save &euro;{(product.price - product.salePrice!).toFixed(2)}
                  </div>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="prose prose-invert max-w-none">
              <p className="text-norelle-text-muted leading-relaxed whitespace-pre-line">
                {product.description}
              </p>
            </div>

            {/* Materials */}
            {product.materials.length > 0 && (
              <div>
                <h3 className="text-lg font-medium text-norelle-cream mb-3">Materials</h3>
                <div className="flex flex-wrap gap-2">
                  {product.materials.map((material, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-norelle-burgundy-light border border-norelle-border rounded-full text-sm text-norelle-cream"
                    >
                      {material}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity & Add to Cart */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-norelle-cream mb-3">
                  Quantity
                </label>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center border border-norelle-border rounded-sm">
                    <button
                      onClick={() => updateQuantity(quantity - 1)}
                      disabled={quantity <= 1}
                      className="p-3 text-norelle-cream hover:bg-norelle-burgundy transition-colors duration-200 disabled:opacity-50"
                    >
                      <MinusIcon className="w-5 h-5" />
                    </button>
                    <span className="px-6 py-3 text-norelle-cream min-w-[4rem] text-center font-medium">
                      {quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(quantity + 1)}
                      disabled={quantity >= product.stock}
                      className="p-3 text-norelle-cream hover:bg-norelle-burgundy transition-colors duration-200 disabled:opacity-50"
                    >
                      <PlusIcon className="w-5 h-5" />
                    </button>
                  </div>
                  
                  {product.stock <= 5 && product.stock > 0 && (
                    <span className="text-sm text-orange-400">
                      Only {product.stock} available
                    </span>
                  )}
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={isAddingToCart || product.stock === 0}
                className="w-full btn-primary text-lg py-4 inline-flex items-center justify-center disabled:opacity-50"
              >
                {isAddingToCart ? 'Adding to Bag...' : 'Add to Bag'}
                <ArrowRightIcon className="w-5 h-5 ml-2" />
              </button>

              {/* Trust Indicators */}
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="flex flex-col items-center space-y-2">
                  <TruckIcon className="w-6 h-6 text-norelle-cream" />
                  <span className="text-xs text-norelle-text-muted">Free Shipping</span>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <ShieldCheckIcon className="w-6 h-6 text-norelle-cream" />
                  <span className="text-xs text-norelle-text-muted">Pet Safe</span>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <ArrowRightIcon className="w-6 h-6 text-norelle-cream" />
                  <span className="text-xs text-norelle-text-muted">30 Day Returns</span>
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div className="border-t border-norelle-border pt-8">
              <h3 className="text-lg font-medium text-norelle-cream mb-4">Product Details</h3>
              <div className="grid md:grid-cols-2 gap-6 text-sm">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-norelle-text-muted">SKU</span>
                    <span className="text-norelle-cream">{product.sku}</span>
                  </div>
                  {product.weight ? (
                    <div className="flex justify-between">
                      <span className="text-norelle-text-muted">Weight</span>
                      <span className="text-norelle-cream">{product.weight}kg</span>
                    </div>
                  ) : null}
                </div>
                <div className="space-y-2">
                  {product.dimensions && (
                    <div className="flex justify-between">
                      <span className="text-norelle-text-muted">Dimensions</span>
                      <span className="text-norelle-cream">
                        {product.dimensions.length} &times; {product.dimensions.width} &times; {product.dimensions.height} cm
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Care Instructions */}
            {product.careInstructions.length > 0 && (
              <div className="border-t border-norelle-border pt-8">
                <h3 className="text-lg font-medium text-norelle-cream mb-4">Care Instructions</h3>
                <div className="space-y-2">
                  {product.careInstructions.map((instruction, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-norelle-cream rounded-full mt-2 flex-shrink-0" />
                      <span className="text-sm text-norelle-text-muted">{instruction}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Product Storytelling Section */}
      <ProductStorytelling product={product} />

      {/* Related Products */}
      <section className="section-padding">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-norelle-cream mb-4">
              Complete Your Collection
            </h2>
            <p className="text-norelle-text-muted max-w-2xl mx-auto">
              Discover fragrances that complement your selection.
            </p>
          </div>
          
          <div className="text-center py-12">
            <a href="/shop" className="btn-secondary inline-flex items-center group">
              Explore Collection
              <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
