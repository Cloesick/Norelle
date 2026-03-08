// Norelle Knowledge Base Data Structure
// Comprehensive product information and support content

export interface KnowledgeArticle {
  id: string
  title: string
  category: string
  subcategory?: string
  author: string
  publishDate: string
  lastUpdated?: string
  readTime: string
  tags: string[]
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  content: {
    sections: {
      title: string
      content: string
      subsections?: {
        title: string
        content: string
      }[]
    }[]
    specifications?: Record<string, string>
    tips?: string[]
    warnings?: string[]
    faqs?: {
      question: string
      answer: string
    }[]
  }
  relatedArticles?: string[]
  products?: string[]
  seo?: {
    metaDescription: string
    keywords: string[]
  }
}

export interface KnowledgeCategory {
  id: string
  title: string
  description: string
  icon: string
  order: number
  articles: string[]
  subcategories?: {
    id: string
    title: string
    articles: string[]
  }[]
}

export interface KnowledgeFAQ {
  id: string
  question: string
  answer: string
  category: string
  popularity: number
  helpful: number
  notHelpful: number
  relatedArticles?: string[]
}

// Knowledge Base Categories
export const knowledgeCategories: KnowledgeCategory[] = [
  {
    id: 'products',
    title: 'Product Information',
    description: 'Detailed product specifications, materials, and collections',
    icon: 'sparkles',
    order: 1,
    articles: ['aurelia-gold', 'luna-pearl', 'stellar-diamond', 'celestial-hoops', 'ethereal-rose', 'celestial-bracelet'],
    subcategories: [
      {
        id: 'necklaces',
        title: 'Necklaces',
        articles: ['aurelia-gold', 'luna-pearl']
      },
      {
        id: 'earrings',
        title: 'Earrings',
        articles: ['stellar-diamond', 'celestial-hoops']
      },
      {
        id: 'rings',
        title: 'Rings',
        articles: ['ethereal-rose']
      },
      {
        id: 'bracelets',
        title: 'Bracelets',
        articles: ['celestial-bracelet']
      }
    ]
  },
  {
    id: 'materials',
    title: 'Materials & Craftsmanship',
    description: 'Learn about our precious metals, gemstones, and crafting process',
    icon: 'shield',
    order: 2,
    articles: ['sterling-silver', '18k-gold', 'diamond-quality', 'pearl-care', 'lab-gems', 'craftsmanship'],
    subcategories: [
      {
        id: 'metals',
        title: 'Precious Metals',
        articles: ['sterling-silver', '18k-gold']
      },
      {
        id: 'gemstones',
        title: 'Gemstones',
        articles: ['diamond-quality', 'pearl-care', 'lab-gems']
      },
      {
        id: 'process',
        title: 'Crafting Process',
        articles: ['craftsmanship']
      }
    ]
  },
  {
    id: 'care',
    title: 'Care & Maintenance',
    description: 'Essential tips for keeping your jewelry beautiful',
    icon: 'heart',
    order: 3,
    articles: ['daily-care', 'cleaning', 'storage', 'tarnish-prevention', 'pearl-special', 'professional-services'],
    subcategories: [
      {
        id: 'routine',
        title: 'Daily Care',
        articles: ['daily-care', 'storage']
      },
      {
        id: 'maintenance',
        title: 'Maintenance',
        articles: ['cleaning', 'tarnish-prevention', 'professional-services']
      },
      {
        id: 'delicate',
        title: 'Delicate Items',
        articles: ['pearl-special']
      }
    ]
  },
  {
    id: 'sizing',
    title: 'Sizing & Fit Guides',
    description: 'Find your perfect size with our comprehensive guides',
    icon: 'ruler',
    order: 4,
    articles: ['ring-sizing', 'necklace-lengths', 'bracelet-sizing', 'home-measurement', 'size-conversion', 'custom-sizing'],
    subcategories: [
      {
        id: 'rings',
        title: 'Rings',
        articles: ['ring-sizing', 'home-measurement']
      },
      {
        id: 'necklaces',
        title: 'Necklaces',
        articles: ['necklace-lengths']
      },
      {
        id: 'bracelets',
        title: 'Bracelets',
        articles: ['bracelet-sizing']
      },
      {
        id: 'general',
        title: 'General',
        articles: ['size-conversion', 'custom-sizing']
      }
    ]
  },
  {
    id: 'styling',
    title: 'Styling & Usage Tips',
    description: 'Professional styling advice and inspiration',
    icon: 'sparkles',
    order: 5,
    articles: ['everyday-elegance', 'professional-styling', 'evening-occasions', 'layering', 'mixing-metals', 'seasonal-styling'],
    subcategories: [
      {
        id: 'daily-wear',
        title: 'Daily Wear',
        articles: ['everyday-elegance']
      },
      {
        id: 'work',
        title: 'Work & Professional',
        articles: ['professional-styling']
      },
      {
        id: 'formal',
        title: 'Formal Occasions',
        articles: ['evening-occasions']
      },
      {
        id: 'techniques',
        title: 'Styling Techniques',
        articles: ['layering', 'mixing-metals']
      },
      {
        id: 'seasons',
        title: 'Seasonal',
        articles: ['seasonal-styling']
      }
    ]
  },
  {
    id: 'warranty',
    title: 'Warranty & Services',
    description: 'Warranty information and professional services',
    icon: 'shield',
    order: 6,
    articles: ['warranty-policy', 'repair-services', 'cleaning-polishing', 'engraving', 'insurance-appraisal', 'returns-exchanges'],
    subcategories: [
      {
        id: 'warranty',
        title: 'Warranty',
        articles: ['warranty-policy']
      },
      {
        id: 'services',
        title: 'Services',
        articles: ['repair-services', 'cleaning-polishing', 'engraving', 'insurance-appraisal']
      },
      {
        id: 'policies',
        title: 'Policies',
        articles: ['returns-exchanges']
      }
    ]
  }
]

// Knowledge Base Articles
export const knowledgeArticles: KnowledgeArticle[] = [
  {
    id: 'aurelia-gold',
    title: 'Aurelia Gold Collection',
    category: 'products',
    subcategory: 'necklaces',
    author: 'Norelle Team',
    publishDate: '2024-01-15',
    lastUpdated: '2024-01-20',
    readTime: '5 min read',
    tags: ['gold', 'necklace', 'everyday', 'elegant', 'dawn-inspired'],
    difficulty: 'beginner',
    content: {
      sections: [
        {
          title: 'Product Description',
          content: 'Inspired by the dawn goddess Aurora, the Aurelia collection captures the first light of day in 18k gold-plated sterling silver. Each piece is meticulously crafted to represent the beauty and hope of a new day.',
          subsections: [
            {
              title: 'Design Philosophy',
              content: 'The Aurelia collection embodies the concept of new beginnings and the gentle warmth of morning light. Each curve and contour is designed to catch and reflect light, creating a subtle sparkle that draws attention without overwhelming.'
            }
          ]
        },
        {
          title: 'Key Features',
          content: 'The Aurelia necklace features exceptional craftsmanship with premium materials and thoughtful design elements.',
          subsections: [
            {
              title: 'Materials',
              content: '18k gold-plated 925 sterling silver base ensures durability and lasting beauty. The gold plating is 2-3 microns thick, providing a rich, warm tone that resists fading.'
            },
            {
              title: 'Dimensions',
              content: 'The adjustable chain length of 16-18 inches (40-45 cm) makes it versatile for different necklines and layering preferences. The 20mm x 15mm pendant is substantial enough to make a statement while remaining delicate.'
            }
          ]
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
      ],
      specifications: {
        'Material': '18k gold-plated 925 sterling silver',
        'Chain Length': 'Adjustable 16-18 inches (40-45 cm)',
        'Pendant Size': '20mm x 15mm',
        'Weight': '12.5 grams',
        'Clasp': 'Secure lobster clasp with Norelle logo',
        'Finish': 'Polished gold with brushed texture details',
        'Plating Thickness': '2-3 microns 18k gold',
        'Base Metal': '925 sterling silver',
        'Hypoallergenic': 'Yes, nickel-free'
      },
      tips: [
        'Layer with shorter necklaces for a trendy, stacked look',
        'Pair with gold earrings for a coordinated set',
        'Adjust length based on neckline - shorter for crew necks, longer for V-necks',
        'Remove before swimming or showering to protect the gold plating'
      ],
      warnings: [
        'Avoid direct contact with perfumes, lotions, and harsh chemicals',
        'Do not wear while swimming or showering',
        'Store separately to prevent scratching',
        'Gold plating may wear over time with heavy use'
      ]
    },
    relatedArticles: ['luna-pearl', 'daily-care', 'necklace-lengths'],
    products: ['aurelia-gold-necklace'],
    seo: {
      metaDescription: 'Discover the Aurelia Gold Collection - 18k gold-plated sterling silver necklaces inspired by the dawn goddess Aurora.',
      keywords: ['aurelia', 'gold necklace', 'dawn jewelry', '18k gold plated', 'sterling silver']
    }
  },
  {
    id: 'luna-pearl',
    title: 'Luna Pearl Collection',
    category: 'products',
    subcategory: 'necklaces',
    author: 'Norelle Team',
    publishDate: '2024-01-12',
    readTime: '4 min read',
    tags: ['pearls', 'necklace', 'elegant', 'timeless', 'celestial'],
    difficulty: 'beginner',
    content: {
      sections: [
        {
          title: 'Product Description',
          content: 'Celestial elegance meets natural beauty in the Luna Pearl collection, featuring hand-selected freshwater pearls set in sterling silver. Each piece embodies the mystical beauty of moonlight on water.'
        },
        {
          title: 'Pearl Selection Process',
          content: 'Every pearl in the Luna collection is carefully selected for its superior luster and minimal blemishes. We use 6-7mm AA grade freshwater pearls that exhibit the perfect balance of size, shape, and shine.'
        },
        {
          title: 'Design Inspiration',
          content: 'Named after Luna, the Roman goddess of the moon, this collection captures the ethereal beauty of moonlight. Each pearl is chosen for its ability to reflect light softly, creating a gentle glow that complements any skin tone.'
        },
        {
          title: 'Special Care Instructions',
          content: 'Pearls are organic gems that require special attention. Apply cosmetics before putting on pearl jewelry, wipe with a damp cloth after wear, and store separately to prevent scratching.'
        }
      ],
      specifications: {
        'Material': '925 sterling silver, freshwater pearls',
        'Pearl Size': '6-7mm AA grade freshwater pearls',
        'Chain Length': '17 inches with 2-inch extender',
        'Clasp': 'Spring ring with safety chain',
        'Pearl Shape': 'Near-round with high luster',
        'Weight': '8.3 grams',
        'Pearl Grade': 'AA quality',
        'Origin': 'Freshwater cultured pearls'
      },
      tips: [
        'Apply perfume and hairspray before putting on pearls',
        'Wipe with a soft, damp cloth after each wear',
        'Store separately in a soft pouch to prevent scratching',
        'Restring pearl strands every 2-3 years'
      ],
      warnings: [
        'Never use ultrasonic cleaners on pearls',
        'Avoid harsh chemicals and cleaning solutions',
        'Do not expose to extreme temperatures or direct sunlight',
        'Perfumes and cosmetics can damage pearl luster'
      ]
    },
    relatedArticles: ['aurelia-gold', 'pearl-care', 'necklace-lengths'],
    products: ['luna-pearl-necklace']
  },
  {
    id: 'sterling-silver',
    title: 'Sterling Silver (925)',
    category: 'materials',
    subcategory: 'metals',
    author: 'Norelle Team',
    publishDate: '2024-01-10',
    readTime: '3 min read',
    tags: ['silver', 'metals', 'hypoallergenic', 'durable'],
    difficulty: 'beginner',
    content: {
      sections: [
        {
          title: 'What is Sterling Silver?',
          content: 'Sterling silver is an alloy of silver containing 92.5% pure silver and 7.5% other metals, usually copper. This composition makes sterling silver durable enough for everyday jewelry while maintaining the beautiful appearance of pure silver.'
        },
        {
          title: 'Properties & Benefits',
          content: 'Sterling silver offers the perfect balance of beauty and durability. It has a bright white luster, is hypoallergenic for most people, and is more affordable than pure gold while still offering excellent value and longevity.'
        },
        {
          title: 'Tarnish & Care',
          content: 'Tarnish is a natural process where silver reacts with sulfur in the air. Regular cleaning and proper storage can minimize tarnishing and keep your sterling silver looking beautiful for years.'
        }
      ],
      specifications: {
        'Silver Content': '92.5% pure silver',
        'Alloy Metals': '7.5% copper and other metals',
        'Hardness': '2.5-3 on Mohs scale',
        'Density': '10.3 g/cm³',
        'Melting Point': '893°C (1640°F)',
        'Hypoallergenic': 'Yes, nickel-free',
        'Hallmark': '925 stamped on all pieces'
      },
      tips: [
        'Store in anti-tarnish pouches or bags',
        'Clean regularly with silver polishing cloth',
        'Avoid exposure to harsh chemicals',
        'Remove before swimming or exercising'
      ],
      warnings: [
        'Tarnishes naturally over time',
        'Can be scratched by harder materials',
        'Avoid contact with sulfur-containing substances',
        'May cause reactions in extremely sensitive individuals'
      ]
    },
    relatedArticles: ['18k-gold', 'daily-care', 'tarnish-prevention']
  },
  {
    id: 'daily-care',
    title: 'Daily Jewelry Care',
    category: 'care',
    subcategory: 'routine',
    author: 'Norelle Team',
    publishDate: '2024-01-08',
    readTime: '4 min read',
    tags: ['care', 'maintenance', 'daily', 'routine'],
    difficulty: 'beginner',
    content: {
      sections: [
        {
          title: 'Daily Care Routine',
          content: 'Establishing a daily care routine for your jewelry ensures it remains beautiful and lasts for years. Simple habits can make a significant difference in maintaining your pieces.'
        },
        {
          title: 'Wearing Guidelines',
          content: 'Follow the "last on, first off" rule - put on jewelry after applying cosmetics and remove it before bed. Avoid exposing jewelry to water, chemicals, or physical activities that could damage delicate pieces.'
        },
        {
          title: 'After-Wear Care',
          content: 'Wipe each piece with a soft, dry cloth after wearing to remove oils and sweat. Check for any loose stones or damage before storing.'
        }
      ],
      tips: [
        'Apply cosmetics before putting on jewelry',
        'Remove jewelry before swimming, showering, or exercising',
        'Wipe with soft cloth after each wear',
        'Store pieces separately to prevent scratching'
      ],
      warnings: [
        'Avoid contact with perfumes, lotions, and hairspray',
        'Remove before hot tubs, saunas, or steam rooms',
        'Do not wear while sleeping to prevent tangling and damage',
        'Be cautious with delicate pieces during physical activities'
      ]
    },
    relatedArticles: ['cleaning', 'storage', 'professional-services']
  },
  {
    id: 'ring-sizing',
    title: 'Ring Sizing Guide',
    category: 'sizing',
    subcategory: 'rings',
    author: 'Norelle Team',
    publishDate: '2024-01-05',
    readTime: '6 min read',
    tags: ['sizing', 'rings', 'guide', 'measurement'],
    difficulty: 'intermediate',
    content: {
      sections: [
        {
          title: 'How to Measure Your Ring Size',
          content: 'Finding the perfect ring size is essential for comfort and security. There are several methods to determine your size, from professional measurement to at-home techniques.'
        },
        {
          title: 'Professional Sizing',
          content: 'The most accurate method is professional sizing at a jewelry store. Our experts use precise measuring tools to ensure the perfect fit.'
        },
        {
          title: 'At-Home Measurement Methods',
          content: 'If you can\'t visit a store, you can measure at home using a string, existing ring, or printable ring sizer. Each method has pros and cons for accuracy.'
        }
      ],
      specifications: {
        'US Size 5': '15.7mm diameter, 49.3mm circumference',
        'US Size 6': '16.5mm diameter, 51.9mm circumference',
        'US Size 7': '17.3mm diameter, 54.4mm circumference',
        'US Size 8': '18.1mm diameter, 56.9mm circumference',
        'US Size 9': '18.9mm diameter, 59.5mm circumference',
        'Wide Band Recommendation': 'Size up 1/4 to 1/2 size for bands 4mm+'
      },
      tips: [
        'Measure at room temperature for accuracy',
        'Measure later in the day when fingers are slightly swollen',
        'Consider knuckle size for comfortable fit',
        'Size up for wider bands (4mm or more)'
      ],
      warnings: [
        'Fingers swell in heat and during pregnancy',
        'Dominant hand may be slightly larger',
        'Seasonal changes can affect finger size',
        'Ring size can change with weight fluctuations'
      ],
      faqs: [
        {
          question: 'Should I size up or down for wide bands?',
          answer: 'Size up 1/4 to 1/2 size for bands 4mm or wider, as they fit more snugly than narrow bands.'
        },
        {
          question: 'What if I\'m between sizes?',
          answer: 'Choose the larger size for comfort, or consider custom sizing for the perfect fit.'
        }
      ]
    },
    relatedArticles: ['home-measurement', 'size-conversion', 'custom-sizing']
  }
]

// Frequently Asked Questions
export const knowledgeFAQs: KnowledgeFAQ[] = [
  {
    id: 'faq-1',
    question: 'Are your materials hypoallergenic?',
    answer: 'Yes, all Norelle jewelry is nickel-free and lead-free. We use 925 sterling silver and 18k gold, which are hypoallergenic for most people. If you have severe metal allergies, contact us for custom options.',
    category: 'materials',
    popularity: 85,
    helpful: 234,
    notHelpful: 12,
    relatedArticles: ['sterling-silver', '18k-gold']
  },
  {
    id: 'faq-2',
    question: 'Do you use real diamonds and gemstones?',
    answer: 'We offer both natural and lab-created gemstones. All our diamonds are conflict-free and Kimberley Process compliant. Lab-created stones have identical chemical properties to natural stones but are more ethical and affordable.',
    category: 'materials',
    popularity: 78,
    helpful: 189,
    notHelpful: 8,
    relatedArticles: ['diamond-quality', 'lab-gems']
  },
  {
    id: 'faq-3',
    question: 'How do I know my ring size?',
    answer: 'We recommend professional sizing at a Norelle boutique. For home sizing, use our printable ring sizer or measure with a string. Consider sizing up 1/4 size for wider bands.',
    category: 'sizing',
    popularity: 92,
    helpful: 312,
    notHelpful: 15,
    relatedArticles: ['ring-sizing', 'home-measurement']
  },
  {
    id: 'faq-4',
    question: 'Can I shower with my jewelry on?',
    answer: 'We recommend removing jewelry before showering. Water, soap, and shampoo can damage delicate pieces and cause premature tarnishing on silver.',
    category: 'care',
    popularity: 88,
    helpful: 267,
    notHelpful: 10,
    relatedArticles: ['daily-care', 'water-damage']
  },
  {
    id: 'faq-5',
    question: 'How often should I clean my jewelry?',
    answer: 'Wipe with a soft cloth after each wear. Clean with mild soap and water weekly. Professional cleaning every 6-12 months maintains optimal condition.',
    category: 'care',
    popularity: 76,
    helpful: 198,
    notHelpful: 14,
    relatedArticles: ['cleaning', 'professional-services']
  },
  {
    id: 'faq-6',
    question: 'Why is my silver jewelry tarnishing?',
    answer: 'Tarnish is a natural reaction between silver and sulfur in the air. Regular cleaning and proper storage in anti-tarnish pouches minimizes tarnishing.',
    category: 'care',
    popularity: 81,
    helpful: 245,
    notHelpful: 18,
    relatedArticles: ['tarnish-prevention', 'sterling-silver']
  }
]

// Helper functions
export function getArticleById(id: string): KnowledgeArticle | undefined {
  return knowledgeArticles.find(article => article.id === id)
}

export function getArticlesByCategory(category: string): KnowledgeArticle[] {
  return knowledgeArticles.filter(article => article.category === category)
}

export function getArticlesByTag(tag: string): KnowledgeArticle[] {
  return knowledgeArticles.filter(article => article.tags.includes(tag))
}

export function searchArticles(query: string): KnowledgeArticle[] {
  const lowercaseQuery = query.toLowerCase()
  return knowledgeArticles.filter(article => 
    article.title.toLowerCase().includes(lowercaseQuery) ||
    article.content.sections.some(section => 
      section.content.toLowerCase().includes(lowercaseQuery) ||
      section.subsections?.some(subsection => 
        subsection.content.toLowerCase().includes(lowercaseQuery)
      )
    ) ||
    article.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  )
}

export function getFAQsByCategory(category: string): KnowledgeFAQ[] {
  return knowledgeFAQs.filter(faq => faq.category === category)
}

export function getPopularFAQs(limit: number = 5): KnowledgeFAQ[] {
  return knowledgeFAQs
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, limit)
}

export function getRelatedArticles(articleId: string, limit: number = 3): KnowledgeArticle[] {
  const article = getArticleById(articleId)
  if (!article) return []
  
  const relatedIds = article.relatedArticles || []
  return relatedIds
    .map(id => getArticleById(id))
    .filter((a): a is KnowledgeArticle => a !== undefined)
    .slice(0, limit)
}
