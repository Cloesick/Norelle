import { Product, Category } from '@/types'

export const categories: Category[] = [
  {
    id: 'eau-de-parfum',
    name: 'Eau de Parfum',
    slug: 'eau-de-parfum',
    description: 'Full-size luxury fragrances for your companion',
    order: 1,
  },
  {
    id: 'travel',
    name: 'Travel Sprays',
    slug: 'travel',
    description: 'Portable elegance for on the go',
    order: 2,
  },
  {
    id: 'gift-sets',
    name: 'Gift Sets',
    slug: 'gift-sets',
    description: 'Curated collections presented in luxury packaging',
    order: 3,
  },
]

export const products: Product[] = [
  {
    id: '1',
    sku: 'NOR-EL-001',
    name: 'Élevé — Eau de Parfum',
    slug: 'eleve-eau-de-parfum',
    description: 'Élevé means "elevated". It suggests a moment above the everyday — not festive in a playful sense, but a subtle form of ceremony. This fragrance positions the scent as something you use when the presence of your companion deserves that extra touch of radiance.\n\nComposed with warm amber, soft musk, and a hint of bergamot, Élevé is designed for special occasions: gatherings, celebrations, or simply those moments when care becomes ritual.',
    shortDescription: 'For special occasions. Warm amber & soft musk.',
    price: 89,
    categories: [categories[0]],
    tags: ['elevated', 'special-occasion', 'warm'],
    images: [
      {
        id: '1',
        url: '/images/products/eleve-edp.svg',
        alt: 'Élevé Eau de Parfum — burgundy sphere cap',
        isPrimary: true,
      },
    ],
    stock: 30,
    featured: true,
    rating: 4.9,
    reviewCount: 42,
    weight: 0.35,
    dimensions: { length: 8, width: 8, height: 12 },
    materials: ['Glass bottle', 'Natural fragrance oils', 'Pet-safe formula'],
    careInstructions: [
      'Store in a cool, dry place away from direct sunlight',
      'Spray onto coat, not onto face or eyes',
      'Allow to dry before petting',
      'Suitable for all coat types',
    ],
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z',
  },
  {
    id: '2',
    sku: 'NOR-SO-001',
    name: 'Solène — Eau de Parfum',
    slug: 'solene-eau-de-parfum',
    description: 'Solène has a soft, serene sound. It feels pure and refined. Instead of speaking about "masking" outdoor scents — functional and technical — this fragrance reframes the moment as a reset towards freshness and elegance. It\'s not about hiding, but about restoring.\n\nBuilt on notes of white tea, fresh linen, and subtle cedar, Solène transforms the post-walk moment into a quiet ritual of renewal.',
    shortDescription: 'For restoring freshness. White tea & linen.',
    price: 89,
    categories: [categories[0]],
    tags: ['serene', 'fresh', 'everyday'],
    images: [
      {
        id: '1',
        url: '/images/products/solene-edp.svg',
        alt: 'Solène Eau de Parfum — cream sphere cap',
        isPrimary: true,
      },
    ],
    stock: 25,
    featured: true,
    rating: 4.8,
    reviewCount: 38,
    weight: 0.35,
    dimensions: { length: 8, width: 8, height: 12 },
    materials: ['Glass bottle', 'Natural fragrance oils', 'Pet-safe formula'],
    careInstructions: [
      'Ideal for use after walks or outdoor activities',
      'Spray onto coat, avoiding face and eyes',
      'Store upright in original packaging',
      'Suitable for all coat types',
    ],
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z',
  },
  {
    id: '3',
    sku: 'NOR-FO-001',
    name: 'Fovère — Eau de Parfum',
    slug: 'fovere-eau-de-parfum',
    description: 'Fovère sounds warm and enveloping. It evokes harmony. This function is not about overpowering, but about integrating. The name supports the idea of fusion — as if the scent naturally becomes part of your interior.\n\nWith notes of cashmere woods, vanilla, and sandalwood, Fovère blends seamlessly with your home ambiance, making your companion\'s presence feel like an effortless extension of the space.',
    shortDescription: 'For blending with home. Cashmere woods & vanilla.',
    price: 89,
    categories: [categories[0]],
    tags: ['warm', 'home', 'harmonious'],
    images: [
      {
        id: '1',
        url: '/images/products/fovere-edp.svg',
        alt: 'Fovère Eau de Parfum — mocha sphere cap',
        isPrimary: true,
      },
    ],
    stock: 20,
    featured: true,
    rating: 4.9,
    reviewCount: 31,
    weight: 0.35,
    dimensions: { length: 8, width: 8, height: 12 },
    materials: ['Glass bottle', 'Natural fragrance oils', 'Pet-safe formula'],
    careInstructions: [
      'Best applied in the home environment',
      'Spray lightly onto coat from a distance',
      'Avoid spraying near food or water bowls',
      'Store in original packaging',
    ],
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z',
  },
  {
    id: '4',
    sku: 'NOR-EL-T01',
    name: 'Élevé — Travel Spray',
    slug: 'eleve-travel-spray',
    description: 'The same elevated composition in a sleek travel format. The Élevé Travel Spray fits effortlessly into your bag, ready for those special moments wherever you go.\n\n10ml of warm amber, soft musk, and bergamot — perfectly proportioned for on-the-go use.',
    shortDescription: 'Travel-size Élevé. 10ml spray.',
    price: 39,
    categories: [categories[1]],
    tags: ['travel', 'elevated', 'portable'],
    images: [
      {
        id: '1',
        url: '/images/products/eleve-travel.svg',
        alt: 'Élevé Travel Spray — burgundy cap',
        isPrimary: true,
      },
    ],
    stock: 50,
    featured: false,
    rating: 4.7,
    reviewCount: 19,
    weight: 0.05,
    dimensions: { length: 2, width: 2, height: 12 },
    materials: ['Glass vial', 'Natural fragrance oils', 'Pet-safe formula'],
    careInstructions: [
      'Keep cap on when not in use',
      'Store upright to prevent leakage',
      'Ideal for travel and day trips',
    ],
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z',
  },
  {
    id: '5',
    sku: 'NOR-SO-T01',
    name: 'Solène — Travel Spray',
    slug: 'solene-travel-spray',
    description: 'Fresh renewal in your pocket. The Solène Travel Spray brings the serene, restorative composition wherever your adventures take you.\n\n10ml of white tea, linen, and subtle cedar — the perfect post-walk refresher.',
    shortDescription: 'Travel-size Solène. 10ml spray.',
    price: 39,
    categories: [categories[1]],
    tags: ['travel', 'fresh', 'portable'],
    images: [
      {
        id: '1',
        url: '/images/products/solene-travel.svg',
        alt: 'Solène Travel Spray — cream cap',
        isPrimary: true,
      },
    ],
    stock: 45,
    featured: false,
    rating: 4.8,
    reviewCount: 22,
    weight: 0.05,
    dimensions: { length: 2, width: 2, height: 12 },
    materials: ['Glass vial', 'Natural fragrance oils', 'Pet-safe formula'],
    careInstructions: [
      'Keep cap on when not in use',
      'Store upright to prevent leakage',
      'Perfect for walks and outdoor activities',
    ],
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z',
  },
  {
    id: '6',
    sku: 'NOR-FO-T01',
    name: 'Fovère — Travel Spray',
    slug: 'fovere-travel-spray',
    description: 'Warm harmony on the move. The Fovère Travel Spray carries the enveloping blend of cashmere woods, vanilla, and sandalwood in a sleek portable format.\n\n10ml — for when you want your companion to feel right at home, anywhere.',
    shortDescription: 'Travel-size Fovère. 10ml spray.',
    price: 39,
    categories: [categories[1]],
    tags: ['travel', 'warm', 'portable'],
    images: [
      {
        id: '1',
        url: '/images/products/fovere-travel.svg',
        alt: 'Fovère Travel Spray — mocha cap',
        isPrimary: true,
      },
    ],
    stock: 40,
    featured: false,
    rating: 4.7,
    reviewCount: 15,
    weight: 0.05,
    dimensions: { length: 2, width: 2, height: 12 },
    materials: ['Glass vial', 'Natural fragrance oils', 'Pet-safe formula'],
    careInstructions: [
      'Keep cap on when not in use',
      'Store upright to prevent leakage',
      'Great for visiting friends and family',
    ],
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z',
  },
  {
    id: '7',
    sku: 'NOR-GS-001',
    name: 'The Ritual Collection',
    slug: 'the-ritual-collection',
    description: 'All three Norēlle fragrances united in one luxurious gift box. The Ritual Collection presents Élevé, Solène, and Fovère together — each addressing a different moment of care.\n\nPresented in custom Norēlle packaging with a handwritten thank-you card personalised with your pet\'s name. Because they give us everything, without condition.',
    shortDescription: 'All three fragrances in luxury gift packaging.',
    price: 239,
    salePrice: 219,
    categories: [categories[2]],
    tags: ['gift', 'collection', 'luxury'],
    images: [
      {
        id: '1',
        url: '/images/products/ritual-collection.svg',
        alt: 'The Ritual Collection gift box',
        isPrimary: true,
      },
    ],
    stock: 15,
    featured: true,
    rating: 5.0,
    reviewCount: 12,
    weight: 1.2,
    dimensions: { length: 30, width: 12, height: 14 },
    materials: ['3× Glass bottles', 'Natural fragrance oils', 'Premium gift box', 'Personalised card'],
    careInstructions: [
      'Each fragrance includes individual care instructions',
      'Store in original gift box when not in use',
      'Keep away from direct sunlight',
    ],
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z',
  },
  {
    id: '8',
    sku: 'NOR-GS-002',
    name: 'The Discovery Set',
    slug: 'the-discovery-set',
    description: 'Three travel sprays, one elegant pouch. The Discovery Set is the perfect introduction to the world of Norēlle — letting you explore Élevé, Solène, and Fovère before committing to a full size.\n\nPresented in a natural linen drawstring pouch with the Norēlle monogram.',
    shortDescription: 'Three travel sprays in a linen pouch.',
    price: 99,
    categories: [categories[2]],
    tags: ['discovery', 'gift', 'travel'],
    images: [
      {
        id: '1',
        url: '/images/products/discovery-set.svg',
        alt: 'The Discovery Set — three sprays in linen pouch',
        isPrimary: true,
      },
    ],
    stock: 35,
    featured: true,
    rating: 4.9,
    reviewCount: 27,
    weight: 0.25,
    dimensions: { length: 15, width: 10, height: 14 },
    materials: ['3× Glass vials', 'Natural fragrance oils', 'Linen drawstring pouch'],
    careInstructions: [
      'Store sprays upright in the pouch',
      'Keep caps secured when not in use',
      'Ideal as a gift or travel companion',
    ],
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z',
  },
]

export const getProductBySlug = (slug: string): Product | undefined => {
  return products.find(product => product.slug === slug)
}

export const getProductsByCategory = (categorySlug: string): Product[] => {
  return products.filter(product => 
    product.categories.some(category => category.slug === categorySlug)
  )
}

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured)
}

export const getSaleProducts = (): Product[] => {
  return products.filter(product => product.salePrice)
}

export const getNewCollectionProducts = (): Product[] => {
  return products.filter(product => product.tags.includes('new-collection'))
}

export const getOutletProducts = (): Product[] => {
  return products.filter(product => product.tags.includes('outlet'))
}
