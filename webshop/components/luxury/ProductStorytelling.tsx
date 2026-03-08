'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Product } from '@/types'
import { 
  PlayIcon, 
  PauseIcon, 
  ChevronLeftIcon, 
  ChevronRightIcon,
  SparklesIcon,
  HeartIcon
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid'

interface ProductStorytellingProps {
  product: Product
}

export function ProductStorytelling({ product }: ProductStorytellingProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [isWishlist, setIsWishlist] = useState(false)
  const [activeTab, setActiveTab] = useState<'story' | 'craftsmanship' | 'heritage'>('story')

  const images = product.images
  const currentImage = images[currentImageIndex]

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const toggleVideo = () => {
    setIsVideoPlaying(!isVideoPlaying)
  }

  const toggleWishlist = () => {
    setIsWishlist(!isWishlist)
  }

  return (
    <div className="min-h-screen bg-norelle-burgundy">
      {/* Hero Section with Storytelling */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <Image
            src={currentImage.url}
            alt={currentImage.alt}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />
        </div>

        {/* Floating Navigation */}
        <div className="absolute top-8 left-8 right-8 z-20 flex justify-between items-center">
          <div className="text-norelle-cream">
            <div className="text-sm uppercase tracking-wider mb-1">Norelle</div>
            <div className="text-xs text-norelle-text-muted">Timeless Elegance</div>
          </div>
          
          <button
            onClick={toggleWishlist}
            className="p-3 bg-black/20 backdrop-blur-sm rounded-full text-norelle-cream hover:bg-black/40 transition-all duration-300"
          >
            <HeartIcon className={`w-6 h-6 ${isWishlist ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Image Navigation */}
        <div className="absolute left-8 right-8 top-1/2 transform -translate-y-1/2 z-20 flex justify-between">
          <button
            onClick={prevImage}
            className="p-3 bg-black/20 backdrop-blur-sm rounded-full text-norelle-cream hover:bg-black/40 transition-all duration-300"
          >
            <ChevronLeftIcon className="w-6 h-6" />
          </button>
          <button
            onClick={nextImage}
            className="p-3 bg-black/20 backdrop-blur-sm rounded-full text-norelle-cream hover:bg-black/40 transition-all duration-300"
          >
            <ChevronRightIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Image Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <div className="flex space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentImageIndex
                    ? 'bg-norelle-cream w-8'
                    : 'bg-white/50 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Product Story Overlay */}
        <div className="absolute bottom-0 left-0 right-0 z-10 p-8 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="mb-4">
              <SparklesIcon className="w-8 h-8 text-norelle-cream mx-auto animate-pulse" />
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-norelle-cream mb-6 leading-tight">
              {product.name}
            </h1>
            <p className="text-lg md:text-xl text-norelle-text-muted mb-8 max-w-2xl mx-auto leading-relaxed">
              {product.shortDescription}
            </p>
            
            {/* Story Tabs */}
            <div className="flex justify-center space-x-8 mb-8">
              {[
                { key: 'story', label: 'The Story' },
                { key: 'craftsmanship', label: 'Craftsmanship' },
                { key: 'heritage', label: 'Heritage' }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as any)}
                  className={`text-sm uppercase tracking-wider transition-colors duration-300 ${
                    activeTab === tab.key
                      ? 'text-norelle-cream'
                      : 'text-norelle-text-muted hover:text-norelle-cream'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="text-left max-w-3xl mx-auto">
              {activeTab === 'story' && (
                <div className="space-y-4 text-norelle-text-muted">
                  <p className="leading-relaxed">
                    Born from the romantic streets of Brussels, this piece embodies the perfect fusion 
                    of contemporary design and timeless elegance. Each curve and detail tells a story 
                    of passion, precision, and the pursuit of perfection.
                  </p>
                  <p className="leading-relaxed">
                    Created for the modern individual who appreciates the finer things in life, 
                    this piece transcends mere adornment to become a statement of personal style 
                    and sophistication.
                  </p>
                </div>
              )}

              {activeTab === 'craftsmanship' && (
                <div className="space-y-4 text-norelle-text-muted">
                  <p className="leading-relaxed">
                    Handcrafted by our master artisans with over 30 years of experience, each piece 
                    undergoes a meticulous 47-step process to ensure absolute perfection.
                  </p>
                  <div className="grid md:grid-cols-3 gap-6 mt-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-norelle-cream mb-2">47</div>
                      <div className="text-sm">Crafting Steps</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-norelle-cream mb-2">120h</div>
                      <div className="text-sm">Creation Time</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-norelle-cream mb-2">5</div>
                      <div className="text-sm">Quality Checks</div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'heritage' && (
                <div className="space-y-4 text-norelle-text-muted">
                  <p className="leading-relaxed">
                    Drawing inspiration from Belgium's rich artistic heritage and the elegant 
                    architecture of Brussels' Grand Place, this design pays homage to centuries 
                    of European craftsmanship.
                  </p>
                  <p className="leading-relaxed">
                    Part of our exclusive collection, this piece carries forward a legacy of 
                    excellence that has defined Norelle since our founding in 2010.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Immersive Product Details */}
      <section className="py-20 px-8">
        <div className="max-w-6xl mx-auto">
          {/* Product Specifications */}
          <div className="grid md:grid-cols-2 gap-16 mb-20">
            <div>
              <h2 className="text-3xl font-serif font-bold text-norelle-cream mb-8">
                Exquisite Details
              </h2>
              
              <div className="space-y-6">
                <div className="border-b border-norelle-border pb-6">
                  <h3 className="text-lg font-medium text-norelle-cream mb-3">Materials</h3>
                  <div className="space-y-2">
                    {product.materials.map((material, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-norelle-cream rounded-full" />
                        <span className="text-norelle-text-muted">{material}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-b border-norelle-border pb-6">
                  <h3 className="text-lg font-medium text-norelle-cream mb-3">Dimensions</h3>
                  <div className="space-y-2 text-norelle-text-muted">
                    <div className="flex justify-between">
                      <span>Length</span>
                      <span>{product.dimensions.length}cm</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Width</span>
                      <span>{product.dimensions.width}cm</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Height</span>
                      <span>{product.dimensions.height}cm</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Weight</span>
                      <span>{product.weight}g</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-norelle-cream mb-3">Care Instructions</h3>
                  <div className="space-y-2">
                    {product.careInstructions.map((instruction, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-norelle-cream rounded-full mt-2 flex-shrink-0" />
                        <span className="text-norelle-text-muted">{instruction}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-serif font-bold text-norelle-cream mb-8">
                The Experience
              </h2>
              
              <div className="space-y-8">
                {/* Video Section */}
                <div className="relative h-64 bg-norelle-burgundy-light border border-norelle-border rounded-lg overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button
                      onClick={toggleVideo}
                      className="p-4 bg-norelle-cream text-norelle-burgundy rounded-full hover:bg-white transition-colors duration-300"
                    >
                      {isVideoPlaying ? (
                        <PauseIcon className="w-8 h-8" />
                      ) : (
                        <PlayIcon className="w-8 h-8" />
                      )}
                    </button>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <div className="text-sm text-norelle-cream">The Making Of</div>
                    <div className="text-xs text-norelle-text-muted">Behind the scenes</div>
                  </div>
                </div>

                {/* 360 View */}
                <div className="relative h-64 bg-norelle-burgundy-light border border-norelle-border rounded-lg overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-6xl font-serif font-bold text-norelle-cream opacity-20">360°</div>
                      <div className="text-sm text-norelle-text-muted mt-2">Interactive View</div>
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <div className="text-sm text-norelle-cream">360° Experience</div>
                    <div className="text-xs text-norelle-text-muted">Drag to explore</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Personalization Section */}
          <div className="text-center py-16 border-t border-norelle-border">
            <h2 className="text-3xl font-serif font-bold text-norelle-cream mb-4">
              Made Uniquely Yours
            </h2>
            <p className="text-lg text-norelle-text-muted mb-8 max-w-2xl mx-auto">
              Personalize your piece with custom engraving or select from our exclusive 
              packaging options to create a truly unique gift.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary">
                Personalize Your Piece
              </button>
              <button className="btn-secondary">
                View Packaging Options
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
