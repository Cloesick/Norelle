'use client'

import React, { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  ArrowLeftIcon,
  HeartIcon,
  ShareIcon,
  BookmarkIcon,
  ClockIcon,
  UserIcon,
  TagIcon,
  SparklesIcon,
  ShieldCheckIcon,
  SwatchIcon,
  HeartIcon as HeartSolidIcon
} from '@heroicons/react/24/outline'

export default function ArticlePage() {
  const params = useParams()
  const router = useRouter()
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [isLiked, setIsLiked] = useState(false)

  // Sample article data - in real app, this would come from a CMS or database
  const articles: Record<string, any> = {
    '1': {
      id: 1,
      title: 'Aurelia Gold Collection',
      category: 'Necklaces',
      author: 'Norelle Team',
      publishDate: '2024-01-15',
      readTime: '5 min read',
      tags: ['gold', 'necklace', 'everyday', 'elegant'],
      content: {
        sections: [
          {
            title: 'Product Description',
            content: 'Inspired by the dawn goddess Aurora, the Aurelia collection captures the first light of day in 18k gold-plated sterling silver. Each piece is meticulously crafted to represent the beauty and hope of a new day.'
          },
          {
            title: 'Key Features',
            content: 'The Aurelia necklace features exceptional craftsmanship with 18k gold-plated 925 sterling silver, an adjustable chain length of 16-18 inches (40-45 cm), and a 20mm x 15mm pendant that weighs 12.5 grams. The secure lobster clasp features the Norelle logo, ensuring your piece stays safely in place.'
          },
          {
            title: 'Design Inspiration',
            content: 'Named after Aurora, the Roman goddess of dawn, the Aurelia collection represents new beginnings and the beauty of morning light. The organic curves of the pendant are designed to catch light from every angle, creating a subtle sparkle that draws attention without overwhelming.'
          },
          {
            title: 'Styling Notes',
            content: 'The Aurelia necklace is incredibly versatile, perfect for both casual and formal occasions. Wear it alone for elegant simplicity, or layer it with shorter necklaces for a trendy, modern look. It pairs beautifully with both V-neck and crew neck tops, making it a staple piece for any wardrobe.'
          },
          {
            title: 'Care Instructions',
            content: 'To maintain the beauty of your Aurelia necklace, store it in the original Norelle pouch when not wearing. Avoid contact with perfumes, lotions, and harsh chemicals. Clean with a soft, dry cloth after each wear, and consider professional cleaning annually to maintain the gold plating.'
          }
        ]
      },
      specifications: {
        'Material': '18k gold-plated 925 sterling silver',
        'Chain Length': 'Adjustable 16-18 inches (40-45 cm)',
        'Pendant Size': '20mm x 15mm',
        'Weight': '12.5 grams',
        'Clasp': 'Secure lobster clasp with Norelle logo',
        'Finish': 'Polished gold with brushed texture details'
      },
      relatedArticles: [2, 3, 4]
    },
    '2': {
      id: 2,
      title: 'Luna Pearl Collection',
      category: 'Necklaces',
      author: 'Norelle Team',
      publishDate: '2024-01-12',
      readTime: '4 min read',
      tags: ['pearls', 'necklace', 'elegant', 'timeless'],
      content: {
        sections: [
          {
            title: 'Product Description',
            content: 'Celestial elegance meets natural beauty in the Luna Pearl collection, featuring hand-selected freshwater pearls set in sterling silver. Each piece embodies the mystical beauty of moonlight on water.'
          },
          {
            title: 'Pearl Selection Process',
            content: 'Every pearl in the Luna collection is carefully selected for its superior luster and minimal blemishes. We use 6-7mm AA grade freshwater pearls that exhibit the perfect balance of size, shape, and shine.'
          }
        ]
      }
    }
  }

  const article = articles[params.id as string]

  if (!article) {
    return (
      <div className="min-h-screen bg-norelle-burgundy flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-serif font-bold text-norelle-cream mb-4">Article Not Found</h1>
          <p className="text-norelle-text-muted mb-8">The article you're looking for doesn't exist.</p>
          <Link href="/knowledge" className="btn-primary">Back to Knowledge Base</Link>
        </div>
      </div>
    )
  }

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked)
  }

  const handleLike = () => {
    setIsLiked(!isLiked)
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: `Check out this article about ${article.title} from Norelle`,
        url: window.location.href
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
    }
  }

  return (
    <div className="min-h-screen bg-norelle-burgundy">
      <div className="container-max section-padding">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-norelle-text-muted">
            <li>
              <Link href="/knowledge" className="hover:text-norelle-cream transition-colors duration-200">
                Knowledge Base
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href={`/knowledge/${article.category.toLowerCase()}`} className="hover:text-norelle-cream transition-colors duration-200">
                {article.category}
              </Link>
            </li>
            <li>/</li>
            <li className="text-norelle-cream">{article.title}</li>
          </ol>
        </nav>

        {/* Article Header */}
        <div className="mb-12">
          <Link 
            href="/knowledge" 
            className="inline-flex items-center space-x-2 text-norelle-text-muted hover:text-norelle-cream mb-6 transition-colors duration-200"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            <span>Back to Knowledge Base</span>
          </Link>

          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-norelle-cream mb-6">
              {article.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-norelle-text-muted mb-8">
              <div className="flex items-center space-x-2">
                <UserIcon className="w-4 h-4" />
                <span>{article.author}</span>
              </div>
              <div className="flex items-center space-x-2">
                <ClockIcon className="w-4 h-4" />
                <span>{article.publishDate}</span>
              </div>
              <div className="flex items-center space-x-2">
                <ClockIcon className="w-4 h-4" />
                <span>{article.readTime}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-8">
              {article.tags.map((tag: string, index: number) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-norelle-burgundy-light border border-norelle-border rounded-full text-sm text-norelle-cream"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={handleLike}
                className={`flex items-center space-x-2 px-4 py-2 border rounded-lg transition-colors duration-200 ${
                  isLiked 
                    ? 'bg-norelle-cream text-norelle-burgundy border-norelle-cream' 
                    : 'border-norelle-border text-norelle-cream hover:border-norelle-cream'
                }`}
              >
                {isLiked ? (
                  <HeartSolidIcon className="w-5 h-5" />
                ) : (
                  <HeartIcon className="w-5 h-5" />
                )}
                <span>Like</span>
              </button>
              
              <button
                onClick={handleBookmark}
                className={`flex items-center space-x-2 px-4 py-2 border rounded-lg transition-colors duration-200 ${
                  isBookmarked 
                    ? 'bg-norelle-cream text-norelle-burgundy border-norelle-cream' 
                    : 'border-norelle-border text-norelle-cream hover:border-norelle-cream'
                }`}
              >
                <BookmarkIcon className="w-5 h-5" />
                <span>Save</span>
              </button>
              
              <button
                onClick={handleShare}
                className="flex items-center space-x-2 px-4 py-2 border border-norelle-border rounded-lg text-norelle-cream hover:border-norelle-cream transition-colors duration-200"
              >
                <ShareIcon className="w-5 h-5" />
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="prose prose-invert max-w-none">
              {article.content.sections.map((section: any, index: number) => (
                <div key={index} className="mb-12">
                  <h2 className="text-2xl font-serif font-bold text-norelle-cream mb-4">
                    {section.title}
                  </h2>
                  <p className="text-norelle-text-muted leading-relaxed mb-6">
                    {section.content}
                  </p>
                </div>
              ))}
            </div>

            {/* Specifications Table */}
            {article.specifications && (
              <div className="mb-12">
                <h2 className="text-2xl font-serif font-bold text-norelle-cream mb-6">Specifications</h2>
                <div className="bg-norelle-burgundy-light border border-norelle-border rounded-lg overflow-hidden">
                  <table className="w-full">
                    <tbody>
                      {Object.entries(article.specifications).map(([key, value]) => (
                        <tr key={key} className="border-b border-norelle-border/50 last:border-b-0">
                          <td className="py-3 px-6 text-norelle-text-muted font-medium">
                            {key}
                          </td>
                          <td className="py-3 px-6 text-norelle-cream">
                            {value as string}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Related Articles */}
            {article.relatedArticles && (
              <div>
                <h2 className="text-2xl font-serif font-bold text-norelle-cream mb-6">Related Articles</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {article.relatedArticles.map((relatedId: number) => {
                    const relatedArticle = articles[relatedId.toString()]
                    if (!relatedArticle) return null
                    
                    return (
                      <Link
                        key={relatedId}
                        href={`/knowledge/article/${relatedId}`}
                        className="block bg-norelle-burgundy-light border border-norelle-border rounded-lg p-6 hover:bg-norelle-burgundy/50 transition-colors duration-200"
                      >
                        <h3 className="text-lg font-serif font-bold text-norelle-cream mb-2">
                          {relatedArticle.title}
                        </h3>
                        <p className="text-norelle-text-muted text-sm mb-3">
                          {relatedArticle.category}
                        </p>
                        <div className="flex items-center space-x-4 text-sm text-norelle-text-muted">
                          <span>{relatedArticle.publishDate}</span>
                          <span>•</span>
                          <span>{relatedArticle.readTime}</span>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-8">
              {/* Quick Actions */}
              <div className="bg-norelle-burgundy-light border border-norelle-border rounded-lg p-6">
                <h3 className="text-lg font-serif font-bold text-norelle-cream mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Link href="/shop" className="block w-full btn-secondary text-center">
                    Shop This Collection
                  </Link>
                  <Link href="/contact" className="block w-full btn-secondary text-center">
                    Ask an Expert
                  </Link>
                  <Link href="/knowledge/sizing" className="block w-full btn-secondary text-center">
                    Sizing Guide
                  </Link>
                </div>
              </div>

              {/* Popular Articles */}
              <div className="bg-norelle-burgundy-light border border-norelle-border rounded-lg p-6">
                <h3 className="text-lg font-serif font-bold text-norelle-cream mb-4">Popular Articles</h3>
                <div className="space-y-3">
                  <Link href="/knowledge/article/13" className="block">
                    <div className="text-norelle-cream font-medium hover:text-norelle-text-muted transition-colors duration-200">
                      Daily Jewelry Care
                    </div>
                    <div className="text-sm text-norelle-text-muted">Essential maintenance tips</div>
                  </Link>
                  <Link href="/knowledge/article/19" className="block">
                    <div className="text-norelle-cream font-medium hover:text-norelle-text-muted transition-colors duration-200">
                      Ring Sizing Guide
                    </div>
                    <div className="text-sm text-norelle-text-muted">Find your perfect size</div>
                  </Link>
                  <Link href="/knowledge/article/31" className="block">
                    <div className="text-norelle-cream font-medium hover:text-norelle-text-muted transition-colors duration-200">
                      Warranty Policy
                    </div>
                    <div className="text-sm text-norelle-text-muted">Coverage and claims</div>
                  </Link>
                </div>
              </div>

              {/* Categories */}
              <div className="bg-norelle-burgundy-light border border-norelle-border rounded-lg p-6">
                <h3 className="text-lg font-serif font-bold text-norelle-cream mb-4">Categories</h3>
                <div className="space-y-2">
                  <Link href="/knowledge/products" className="flex items-center space-x-2 text-norelle-cream hover:text-norelle-text-muted transition-colors duration-200">
                    <SparklesIcon className="w-4 h-4" />
                    <span>Product Information</span>
                  </Link>
                  <Link href="/knowledge/care" className="flex items-center space-x-2 text-norelle-cream hover:text-norelle-text-muted transition-colors duration-200">
                    <HeartIcon className="w-4 h-4" />
                    <span>Care & Maintenance</span>
                  </Link>
                  <Link href="/knowledge/sizing" className="flex items-center space-x-2 text-norelle-cream hover:text-norelle-text-muted transition-colors duration-200">
                    <SwatchIcon className="w-4 h-4" />
                    <span>Sizing & Fit</span>
                  </Link>
                  <Link href="/knowledge/warranty" className="flex items-center space-x-2 text-norelle-cream hover:text-norelle-text-muted transition-colors duration-200">
                    <ShieldCheckIcon className="w-4 h-4" />
                    <span>Warranty & Services</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
