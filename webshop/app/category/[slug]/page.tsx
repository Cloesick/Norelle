'use client'

import React from 'react'
import { useParams } from 'next/navigation'
import { getProductsByCategory, categories } from '@/data/products'
import { ProductCard } from '@/components/ProductCard'

export default function CategoryPage() {
  const params = useParams()
  const categorySlug = params.slug as string

  const category = categories.find(cat => cat.slug === categorySlug)
  const products = getProductsByCategory(categorySlug)

  if (!category) {
    return (
      <div className="min-h-screen bg-norelle-burgundy flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-serif font-bold text-norelle-cream mb-4">
            Category Not Found
          </h1>
          <p className="text-norelle-text-muted mb-8">
            The category you're looking for doesn't exist.
          </p>
          <a href="/shop" className="btn-primary">
            Back to Shop
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-norelle-burgundy">
      {/* Category Header */}
      <section className="bg-norelle-burgundy-light border-b border-norelle-border">
        <div className="container-max section-padding">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-norelle-cream mb-4">
              {category.name}
            </h1>
            <p className="text-norelle-text-muted text-lg">
              {category.description}
            </p>
            <div className="mt-6">
              <span className="text-norelle-text-muted">
                {products.length} products in this collection
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="section-padding">
        <div className="container-max">
          {products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-norelle-text-muted mb-8">
                No products available in this category yet.
              </p>
              <a href="/shop" className="btn-secondary">
                Browse Other Categories
              </a>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
