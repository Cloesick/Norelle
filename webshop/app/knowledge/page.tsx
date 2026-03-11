'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { 
  BookOpenIcon,
  MagnifyingGlassIcon,
  QuestionMarkCircleIcon,
  SparklesIcon,
  ShieldCheckIcon,
  SwatchIcon,
  HeartIcon,
  ChatBubbleLeftRightIcon,
  ChevronRightIcon,
  MinusIcon,
  PlusIcon
} from '@heroicons/react/24/outline'

export default function KnowledgeBasePage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null)

  const categories = [
    {
      id: 'products',
      title: 'Product Information',
      icon: SparklesIcon,
      description: 'Detailed product specifications, materials, and collections',
      articles: [
        { id: 1, title: 'Aurelia Gold Collection', category: 'Necklaces' },
        { id: 2, title: 'Luna Pearl Collection', category: 'Necklaces' },
        { id: 3, title: 'Stellar Diamond Studs', category: 'Earrings' },
        { id: 4, title: 'Celestial Hoops', category: 'Earrings' },
        { id: 5, title: 'Ethereal Rose Ring', category: 'Rings' },
        { id: 6, title: 'Celestial Silver Bracelet', category: 'Bracelets' }
      ]
    },
    {
      id: 'materials',
      title: 'Materials & Craftsmanship',
      icon: ShieldCheckIcon,
      description: 'Learn about our precious metals, gemstones, and crafting process',
      articles: [
        { id: 7, title: 'Sterling Silver (925)', category: 'Metals' },
        { id: 8, title: '18k Gold', category: 'Metals' },
        { id: 9, title: 'Diamond Quality Guide', category: 'Gemstones' },
        { id: 10, title: 'Pearl Care & Selection', category: 'Gemstones' },
        { id: 11, title: 'Lab-Created vs Natural Gems', category: 'Gemstones' },
        { id: 12, title: 'Our Craftsmanship Process', category: 'Process' }
      ]
    },
    {
      id: 'care',
      title: 'Care & Maintenance',
      icon: HeartIcon,
      description: 'Essential tips for keeping your jewelry beautiful',
      articles: [
        { id: 13, title: 'Daily Jewelry Care', category: 'Routine' },
        { id: 14, title: 'Cleaning Your Jewelry', category: 'Maintenance' },
        { id: 15, title: 'Storage Solutions', category: 'Protection' },
        { id: 16, title: 'Silver Tarnish Prevention', category: 'Maintenance' },
        { id: 17, title: 'Pearl Special Care', category: 'Delicate Items' },
        { id: 18, title: 'Professional Services', category: 'Maintenance' }
      ]
    },
    {
      id: 'sizing',
      title: 'Sizing & Fit Guides',
      icon: SwatchIcon,
      description: 'Find your perfect size with our comprehensive guides',
      articles: [
        { id: 19, title: 'Ring Sizing Guide', category: 'Rings' },
        { id: 20, title: 'Necklace Length Guide', category: 'Necklaces' },
        { id: 21, title: 'Bracelet Sizing', category: 'Bracelets' },
        { id: 22, title: 'How to Measure at Home', category: 'General' },
        { id: 23, title: 'International Size Conversion', category: 'General' },
        { id: 24, title: 'Custom Sizing Options', category: 'Services' }
      ]
    },
    {
      id: 'styling',
      title: 'Styling & Usage Tips',
      icon: SparklesIcon,
      description: 'Professional styling advice and inspiration',
      articles: [
        { id: 25, title: 'Everyday Elegance', category: 'Daily Wear' },
        { id: 26, title: 'Professional Styling', category: 'Work' },
        { id: 27, title: 'Evening & Special Occasions', category: 'Formal' },
        { id: 28, title: 'Layering Techniques', category: 'Techniques' },
        { id: 29, title: 'Mixing Metals', category: 'Trends' },
        { id: 30, title: 'Seasonal Styling', category: 'Seasons' }
      ]
    },
    {
      id: 'warranty',
      title: 'Warranty & Services',
      icon: ShieldCheckIcon,
      description: 'Warranty information and professional services',
      articles: [
        { id: 31, title: 'Norelle Warranty Policy', category: 'Warranty' },
        { id: 32, title: 'Repair Services', category: 'Services' },
        { id: 33, title: 'Cleaning & Polishing', category: 'Services' },
        { id: 34, title: 'Engraving Services', category: 'Personalization' },
        { id: 35, title: 'Insurance Appraisal', category: 'Services' },
        { id: 36, title: 'Returns & Exchanges', category: 'Policies' }
      ]
    }
  ]

  const faqs = [
    {
      question: 'Are your materials hypoallergenic?',
      answer: 'Yes, all Norelle jewelry is nickel-free and lead-free. We use 925 sterling silver and 18k gold, which are hypoallergenic for most people. If you have severe metal allergies, contact us for custom options.'
    },
    {
      question: 'Do you use real diamonds and gemstones?',
      answer: 'We offer both natural and lab-created gemstones. All our diamonds are conflict-free and Kimberley Process compliant. Lab-created stones have identical chemical properties to natural stones but are more ethical and affordable.'
    },
    {
      question: 'How do I know my ring size?',
      answer: 'We recommend professional sizing at a Norelle boutique. For home sizing, use our printable ring sizer or measure with a string. Consider sizing up 1/4 size for wider bands.'
    },
    {
      question: 'Can I shower with my jewelry on?',
      answer: 'We recommend removing jewelry before showering. Water, soap, and shampoo can damage delicate pieces and cause premature tarnishing on silver.'
    },
    {
      question: 'How often should I clean my jewelry?',
      answer: 'Wipe with a soft cloth after each wear. Clean with mild soap and water weekly. Professional cleaning every 6-12 months maintains optimal condition.'
    },
    {
      question: 'Why is my silver jewelry tarnishing?',
      answer: 'Tarnish is a natural reaction between silver and sulfur in the air. Regular cleaning and proper storage in anti-tarnish pouches minimizes tarnishing.'
    }
  ]

  const quickLinks = [
    { title: 'Ring Sizing Guide', href: '/knowledge/sizing#rings', icon: SwatchIcon },
    { title: 'Jewelry Care', href: '/knowledge/care', icon: HeartIcon },
    { title: 'Warranty Info', href: '/knowledge/warranty', icon: ShieldCheckIcon },
    { title: 'Contact Support', href: '/contact', icon: ChatBubbleLeftRightIcon }
  ]

  const filteredCategories = categories.map(category => ({
    ...category,
    articles: category.articles.filter(article =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.category.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => 
    category.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.articles.length > 0
  )

  const toggleCategory = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId)
  }

  const toggleFAQ = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index)
  }

  return (
    <div className="min-h-screen bg-norelle-burgundy">
      <div className="container-max section-padding">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-norelle-cream mb-4">
            Knowledge Base
          </h1>
          <p className="text-lg text-norelle-text-muted max-w-2xl mx-auto">
            Your complete guide to Norelle jewelry. Find detailed product information, 
            care instructions, and expert styling advice.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for articles, products, or topics..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-norelle-burgundy-light border border-norelle-border rounded-lg text-norelle-cream placeholder-norelle-text-muted focus:outline-none focus:ring-2 focus:ring-norelle-cream focus:border-transparent"
            />
            <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-norelle-text-muted" />
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {quickLinks.map((link, index) => {
            const Icon = link.icon
            return (
              <Link
                key={index}
                href={link.href}
                className="flex items-center space-x-3 p-4 bg-norelle-burgundy-light border border-norelle-border rounded-lg hover:bg-norelle-burgundy transition-colors duration-200"
              >
                <Icon className="w-6 h-6 text-norelle-cream" />
                <span className="text-norelle-cream font-medium">{link.title}</span>
                <ChevronRightIcon className="w-4 h-4 text-norelle-text-muted ml-auto" />
              </Link>
            )
          })}
        </div>

        {/* Categories */}
        <div className="space-y-6 mb-12">
          <h2 className="text-2xl font-serif font-bold text-norelle-cream mb-6">Browse by Category</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredCategories.map((category) => {
              const Icon = category.icon
              const isExpanded = expandedCategory === category.id
              
              return (
                <div key={category.id} className="bg-norelle-burgundy-light border border-norelle-border rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleCategory(category.id)}
                    className="w-full p-6 flex items-center justify-between hover:bg-norelle-burgundy/50 transition-colors duration-200"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-norelle-burgundy rounded-full flex items-center justify-center">
                        <Icon className="w-6 h-6 text-norelle-cream" />
                      </div>
                      <div className="text-left">
                        <h3 className="text-lg font-serif font-bold text-norelle-cream">{category.title}</h3>
                        <p className="text-sm text-norelle-text-muted">{category.description}</p>
                      </div>
                    </div>
                    {isExpanded ? (
                      <MinusIcon className="w-5 h-5 text-norelle-cream" />
                    ) : (
                      <PlusIcon className="w-5 h-5 text-norelle-cream" />
                    )}
                  </button>
                  
                  {isExpanded && (
                    <div className="border-t border-norelle-border p-6">
                      <div className="space-y-3">
                        {category.articles.map((article) => (
                          <Link
                            key={article.id}
                            href={`/knowledge/article/${article.id}`}
                            className="flex items-center justify-between p-3 bg-norelle-burgundy/30 rounded hover:bg-norelle-burgundy/50 transition-colors duration-200"
                          >
                            <div>
                              <div className="text-norelle-cream font-medium">{article.title}</div>
                              <div className="text-sm text-norelle-text-muted">{article.category}</div>
                            </div>
                            <ChevronRightIcon className="w-4 h-4 text-norelle-text-muted" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Frequently Asked Questions */}
        <div className="space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-serif font-bold text-norelle-cream mb-4">Frequently Asked Questions</h2>
            <p className="text-norelle-text-muted">Quick answers to common questions about Norelle jewelry</p>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-norelle-burgundy-light border border-norelle-border rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-norelle-burgundy/50 transition-colors duration-200"
                >
                  <div className="flex items-center space-x-3">
                    <QuestionMarkCircleIcon className="w-5 h-5 text-norelle-cream" />
                    <span className="text-norelle-cream font-medium">{faq.question}</span>
                  </div>
                  {expandedFAQ === index ? (
                    <MinusIcon className="w-5 h-5 text-norelle-cream" />
                  ) : (
                    <PlusIcon className="w-5 h-5 text-norelle-cream" />
                  )}
                </button>
                
                {expandedFAQ === index && (
                  <div className="px-6 pb-6 border-t border-norelle-border">
                    <p className="text-norelle-text-muted leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact Support */}
        <div className="mt-16 text-center">
          <div className="bg-norelle-burgundy-light border border-norelle-border rounded-lg p-8">
            <ChatBubbleLeftRightIcon className="w-12 h-12 text-norelle-cream mx-auto mb-4" />
            <h2 className="text-2xl font-serif font-bold text-norelle-cream mb-4">Still Need Help?</h2>
            <p className="text-norelle-text-muted mb-6">
              Our customer service team is here to help you with any questions about our products.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn-primary inline-flex items-center justify-center">
                Contact Support
              </Link>
              <Link href="/faq" className="btn-secondary inline-flex items-center justify-center">
                View All FAQs
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
