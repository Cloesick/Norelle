// Comprehensive Competitor Pricing Data for High-End Perfume Segment
// Based on 2024-2026 market analysis

export interface CompetitorProduct {
  id: string
  brand: string
  name: string
  category: 'men' | 'women' | 'unisex'
  size: string
  concentration: 'EDT' | 'EDP' | 'Parfum' | 'Extrait'
  priceUSD: number
  priceEUR: number
  launchYear: number
  notes: string[]
  positioning: 'entry-luxury' | 'designer-luxury' | 'niche-luxury' | 'ultra-luxury'
  keyIngredients: string[]
  longevity: 'short' | 'medium' | 'long' | 'very-long'
  sillage: 'light' | 'moderate' | 'heavy' | 'very-heavy'
  availability: 'wide' | 'selective' | 'exclusive'
}

export interface MarketSegment {
  name: string
  priceRange: { min: number; max: number }
  targetAudience: string
  characteristics: string[]
  competitors: string[]
  marketShare: number
  growthRate: number
}

export const competitorProducts: CompetitorProduct[] = [
  // Designer Luxury Tier ($96-$144 USD)
  {
    id: 'chanel-bleu-edt',
    brand: 'Chanel',
    name: 'Bleu de Chanel',
    category: 'men',
    size: '100ml',
    concentration: 'EDT',
    priceUSD: 110,
    priceEUR: 145,
    launchYear: 2010,
    notes: ['Mass luxury leader', 'Celebrity endorsements', 'Wide distribution'],
    positioning: 'designer-luxury',
    keyIngredients: ['Citrus', 'Grapefruit', 'Incense', 'Ginger', 'Sandalwood'],
    longevity: 'medium',
    sillage: 'moderate',
    availability: 'wide'
  },
  {
    id: 'dior-sauvage-edt',
    brand: 'Dior',
    name: 'Sauvage',
    category: 'men',
    size: '100ml',
    concentration: 'EDT',
    priceUSD: 100,
    priceEUR: 135,
    launchYear: 2015,
    notes: ['Johnny Depp campaign', 'Mass market success', 'Fresh spicy profile'],
    positioning: 'designer-luxury',
    keyIngredients: ['Bergamot', 'Sichuan Pepper', 'Ambroxan', 'Geranium'],
    longevity: 'medium',
    sillage: 'moderate',
    availability: 'wide'
  },
  {
    id: 'chanel-no5-edp',
    brand: 'Chanel',
    name: 'No. 5',
    category: 'women',
    size: '100ml',
    concentration: 'EDP',
    priceUSD: 150,
    priceEUR: 195,
    launchYear: 1921,
    notes: ['Heritage icon', 'Queen of fragrance', 'Aldehydic floral'],
    positioning: 'designer-luxury',
    keyIngredients: ['Aldehydes', 'Ylang-Ylang', 'Iris', 'Sandalwood', 'Vanilla'],
    longevity: 'long',
    sillage: 'heavy',
    availability: 'wide'
  },
  {
    id: 'tom-ford-black-orchid',
    brand: 'Tom Ford',
    name: 'Black Orchid',
    category: 'women',
    size: '100ml',
    concentration: 'EDP',
    priceUSD: 200,
    priceEUR: 265,
    launchYear: 2006,
    notes: ['Dark sensual', 'Unisex appeal', 'Truffle note'],
    positioning: 'designer-luxury',
    keyIngredients: ['Black Truffle', 'Ylang-Ylang', 'Blackcurrant', 'Patchouli', 'Vanilla'],
    longevity: 'long',
    sillage: 'heavy',
    availability: 'wide'
  },

  // Niche Luxury Tier ($216-$420 USD)
  {
    id: 'creed-aventus',
    brand: 'Creed',
    name: 'Aventus',
    category: 'men',
    size: '100ml',
    concentration: 'EDP',
    priceUSD: 350,
    priceEUR: 465,
    launchYear: 2010,
    notes: ['Status fragrance', 'Pineapple note', 'Collector favorite'],
    positioning: 'niche-luxury',
    keyIngredients: ['Pineapple', 'Birch', 'Musk', 'Oakmoss', 'Ambergris'],
    longevity: 'long',
    sillage: 'heavy',
    availability: 'selective'
  },
  {
    id: 'le-labo-santal-33',
    brand: 'Le Labo',
    name: 'Santal 33',
    category: 'unisex',
    size: '100ml',
    concentration: 'EDP',
    priceUSD: 250,
    priceEUR: 330,
    launchYear: 2011,
    notes: ['Artisanal', 'Hand-blended', 'Sandalwood focus', 'Indian connection'],
    positioning: 'niche-luxury',
    keyIngredients: ['Sandalwood', 'Cedarwood', 'Leather', 'Violet', 'Cardamom'],
    longevity: 'very-long',
    sillage: 'moderate',
    availability: 'selective'
  },
  {
    id: 'byredo-mojave-ghost',
    brand: 'Byredo',
    name: 'Mojave Ghost',
    category: 'unisex',
    size: '50ml',
    concentration: 'EDP',
    priceUSD: 180,
    priceEUR: 240,
    launchYear: 2014,
    notes: ['Contemporary niche', 'Desert inspiration', 'Clean aesthetic'],
    positioning: 'niche-luxury',
    keyIngredients: ['Ambrette', 'Jamaica Berry', 'Sandalwood', 'Musk'],
    longevity: 'medium',
    sillage: 'light',
    availability: 'selective'
  },
  {
    id: 'tom-ford-tobacco-oud',
    brand: 'Tom Ford',
    name: 'Tobacco Oud',
    category: 'unisex',
    size: '100ml',
    concentration: 'EDP',
    priceUSD: 300,
    priceEUR: 395,
    launchYear: 2013,
    notes: ['Private Blend', 'Oud focus', '31% price increase since 2019'],
    positioning: 'niche-luxury',
    keyIngredients: ['Oud', 'Tobacco', 'Tonka Bean', 'Vanilla', 'Dried Fruits'],
    longevity: 'very-long',
    sillage: 'heavy',
    availability: 'selective'
  },

  // Ultra-Luxury Tier ($500+ USD)
  {
    id: 'creed-royal-service',
    brand: 'Creed',
    name: 'Royal Service',
    category: 'men',
    size: '100ml',
    concentration: 'EDP',
    priceUSD: 1750,
    priceEUR: 2325,
    launchYear: 2020,
    notes: ['Limited edition', 'Ultra-premium', 'Royal inspiration'],
    positioning: 'ultra-luxury',
    keyIngredients: ['Royal ingredients', 'Rare materials', 'Custom formulation'],
    longevity: 'very-long',
    sillage: 'very-heavy',
    availability: 'exclusive'
  },
  {
    id: 'roja-haute-luxe',
    brand: 'Roja Parfums',
    name: 'Haute Luxe',
    category: 'unisex',
    size: '100ml',
    concentration: 'Parfum',
    priceUSD: 4000,
    priceEUR: 5300,
    launchYear: 2011,
    notes: ['Ultra-luxury', 'Orris butter', 'Labor-intensive'],
    positioning: 'ultra-luxury',
    keyIngredients: ['Orris Butter', 'Rose', 'Ambergris', 'Saffron'],
    longevity: 'very-long',
    sillage: 'very-heavy',
    availability: 'exclusive'
  }
]

export const marketSegments: MarketSegment[] = [
  {
    name: 'Entry Luxury',
    priceRange: { min: 50, max: 100 },
    targetAudience: 'First-time luxury buyers, gift purchasers',
    characteristics: ['Accessible pricing', 'Wide distribution', 'Celebrity marketing'],
    competitors: ['Chanel', 'Dior', 'Tom Ford'],
    marketShare: 35,
    growthRate: 5.2
  },
  {
    name: 'Designer Luxury',
    priceRange: { min: 100, max: 200 },
    targetAudience: 'Established luxury consumers, brand loyalists',
    characteristics: ['Brand heritage', 'Marketing heavy', 'Global distribution'],
    competitors: ['Chanel', 'Dior', 'Tom Ford', 'Gucci'],
    marketShare: 40,
    growthRate: 6.8
  },
  {
    name: 'Niche Luxury',
    priceRange: { min: 200, max: 400 },
    targetAudience: 'Fragrance enthusiasts, collectors',
    characteristics: ['Artisanal quality', 'Rare ingredients', 'Selective distribution'],
    competitors: ['Le Labo', 'Byredo', 'Creed', 'Tom Ford Private'],
    marketShare: 20,
    growthRate: 13.2
  },
  {
    name: 'Ultra-Luxury',
    priceRange: { min: 400, max: 5000 },
    targetAudience: 'Ultra-high net worth, connoisseurs',
    characteristics: ['Extreme exclusivity', 'Bespoke services', 'Rare materials'],
    competitors: ['Roja Parfums', 'Clive Christian', 'Creed Limited'],
    marketShare: 5,
    growthRate: 8.5
  }
]

export const pricingStrategies = {
  entryLuxury: {
    targetMargin: 3.5,
    pricePositioning: '15-20% below designer luxury',
    distribution: 'Wide',
    marketing: 'Digital-first, influencer partnerships'
  },
  designerLuxury: {
    targetMargin: 4.5,
    pricePositioning: 'Competitive with established brands',
    distribution: 'Selective retail',
    marketing: 'Celebrity endorsements, global campaigns'
  },
  nicheLuxury: {
    targetMargin: 6.0,
    pricePositioning: 'Premium quality justification',
    distribution: 'Exclusive boutiques',
    marketing: 'Storytelling, craftsmanship focus'
  },
  ultraLuxury: {
    targetMargin: 10.0,
    pricePositioning: 'Extreme exclusivity premium',
    distribution: 'By appointment only',
    marketing: 'Word-of-mouth, private events'
  }
}

export const costBreakdown = {
  massMarket: {
    ingredients: 0.03, // 3% of total cost
    packaging: 0.15,   // 15% of total cost
    marketing: 0.60,  // 60% of retail price
    manufacturing: 0.10, // 10% of total cost
    distribution: 0.12, // 12% of total cost
    margin: 0.65      // 65% of retail price
  },
  niche: {
    ingredients: 0.45, // 45% of total cost
    packaging: 0.20,   // 20% of total cost
    marketing: 0.25,  // 25% of retail price
    manufacturing: 0.15, // 15% of total cost
    distribution: 0.20, // 20% of total cost
    margin: 0.75      // 75% of retail price
  },
  ultraLuxury: {
    ingredients: 0.60, // 60% of total cost
    packaging: 0.25,   // 25% of total cost
    marketing: 0.15,  // 15% of retail price
    manufacturing: 0.10, // 10% of total cost
    distribution: 0.05, // 5% of total cost
    margin: 0.85      // 85% of retail price
  }
}

export const regionalPricing = {
  europe: {
    multiplier: 1.0,   // Base pricing
    tax: 0.21,        // 21% VAT
    shipping: 8,      // €8 shipping
    preferredSize: '100ml'
  },
  northAmerica: {
    multiplier: 1.15, // 15% premium
    tax: 0.08,        // 8% sales tax average
    shipping: 12,     // $12 shipping
    preferredSize: '100ml'
  },
  asiaPacific: {
    multiplier: 1.25, // 25% premium
    tax: 0.10,        // 10% GST average
    shipping: 15,     // $15 shipping
    preferredSize: '50ml'
  },
  middleEast: {
    multiplier: 1.30, // 30% premium
    tax: 0.05,        // 5% VAT average
    shipping: 20,     // $20 shipping
    preferredSize: '100ml'
  }
}

// Helper functions for pricing analysis
export function getCompetitorAnalysis(brand: string) {
  return competitorProducts.filter(product => product.brand === brand)
}

export function getProductsBySegment(segment: string) {
  const segmentData = marketSegments.find(s => s.name === segment)
  if (!segmentData) return []
  
  return competitorProducts.filter(
    product => product.priceUSD >= segmentData.priceRange.min && 
             product.priceUSD <= segmentData.priceRange.max
  )
}

export function calculateOptimalPrice(
  targetSegment: string,
  costPerUnit: number,
  desiredMargin: number
) {
  const strategy = pricingStrategies[targetSegment as keyof typeof pricingStrategies]
  const basePrice = costPerUnit / (1 - desiredMargin)
  
  return {
    entryLevel: Math.round(basePrice * 0.8),
    core: Math.round(basePrice),
    premium: Math.round(basePrice * 1.3)
  }
}

export function getRegionalPricing(basePriceEUR: number, region: keyof typeof regionalPricing) {
  const config = regionalPricing[region]
  const localPrice = basePriceEUR * config.multiplier
  
  return {
    basePrice: Math.round(localPrice),
    withTax: Math.round(localPrice * (1 + config.tax)),
    shipping: config.shipping,
    totalWithShipping: Math.round(localPrice * (1 + config.tax) + config.shipping)
  }
}
