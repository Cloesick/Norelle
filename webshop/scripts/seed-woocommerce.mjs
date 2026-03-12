/**
 * Seed Norēlle products into WooCommerce via REST API.
 *
 * Usage:
 *   node scripts/seed-woocommerce.mjs
 *
 * Requires WOOCOMMERCE_CONSUMER_KEY and WOOCOMMERCE_CONSUMER_SECRET
 * in webshop/.env.local (or set as environment variables).
 */

import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

// Load .env.local
const envPath = resolve(__dirname, '..', '.env.local')
try {
  const envContent = readFileSync(envPath, 'utf-8')
  for (const line of envContent.split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const [key, ...rest] = trimmed.split('=')
    process.env[key.trim()] = rest.join('=').trim()
  }
} catch {
  console.error('Could not read .env.local — make sure it exists in webshop/')
  process.exit(1)
}

const WC_URL = process.env.NEXT_PUBLIC_WOOCOMMERCE_URL || 'http://localhost:8080'
const WP_USER = process.env.WP_APPLICATION_USER
const WP_PASS = process.env.WP_APPLICATION_PASSWORD

if (!WP_USER || !WP_PASS) {
  console.error('Missing WP_APPLICATION_USER or WP_APPLICATION_PASSWORD in .env.local')
  process.exit(1)
}

const authHeader = 'Basic ' + Buffer.from(`${WP_USER}:${WP_PASS}`).toString('base64')

async function wcGet(endpoint) {
  const res = await fetch(`${WC_URL}/wp-json/wc/v3/${endpoint}`, {
    headers: { Authorization: authHeader },
  })
  if (!res.ok) throw new Error(`GET ${endpoint}: ${res.status} ${await res.text()}`)
  return res.json()
}

async function wcPost(endpoint, data) {
  const res = await fetch(`${WC_URL}/wp-json/wc/v3/${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: authHeader },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error(`POST ${endpoint}: ${res.status} ${await res.text()}`)
  return res.json()
}

// ─── Categories ─────────────────────────────────────────────

const categoryDefs = [
  { name: 'Eau de Parfum', slug: 'eau-de-parfum', description: 'Full-size luxury fragrances for your companion' },
  { name: 'Travel Sprays', slug: 'travel', description: 'Portable elegance for on the go' },
  { name: 'Gift Sets', slug: 'gift-sets', description: 'Curated collections presented in luxury packaging' },
]

// ─── Products ───────────────────────────────────────────────

const productDefs = [
  {
    name: 'Élevé — Eau de Parfum',
    slug: 'eleve-eau-de-parfum',
    sku: 'NOR-EL-001',
    regular_price: '89',
    description: 'Élevé means "elevated". It suggests a moment above the everyday — not festive in a playful sense, but a subtle form of ceremony. This fragrance positions the scent as something you use when the presence of your companion deserves that extra touch of radiance.\n\nComposed with warm amber, soft musk, and a hint of bergamot, Élevé is designed for special occasions: gatherings, celebrations, or simply those moments when care becomes ritual.',
    short_description: 'For special occasions. Warm amber & soft musk.',
    categories: ['eau-de-parfum'],
    featured: true,
    manage_stock: true,
    stock_quantity: 30,
    weight: '0.35',
    dimensions: { length: '8', width: '8', height: '12' },
  },
  {
    name: 'Solène — Eau de Parfum',
    slug: 'solene-eau-de-parfum',
    sku: 'NOR-SO-001',
    regular_price: '89',
    description: "Solène has a soft, serene sound. It feels pure and refined. Instead of speaking about \"masking\" outdoor scents — functional and technical — this fragrance reframes the moment as a reset towards freshness and elegance. It's not about hiding, but about restoring.\n\nBuilt on notes of white tea, fresh linen, and subtle cedar, Solène transforms the post-walk moment into a quiet ritual of renewal.",
    short_description: 'For restoring freshness. White tea & linen.',
    categories: ['eau-de-parfum'],
    featured: true,
    manage_stock: true,
    stock_quantity: 25,
    weight: '0.35',
    dimensions: { length: '8', width: '8', height: '12' },
  },
  {
    name: 'Fovère — Eau de Parfum',
    slug: 'fovere-eau-de-parfum',
    sku: 'NOR-FO-001',
    regular_price: '89',
    description: "Fovère sounds warm and enveloping. It evokes harmony. This function is not about overpowering, but about integrating. The name supports the idea of fusion — as if the scent naturally becomes part of your interior.\n\nWith notes of cashmere woods, vanilla, and sandalwood, Fovère blends seamlessly with your home ambiance, making your companion's presence feel like an effortless extension of the space.",
    short_description: 'For blending with home. Cashmere woods & vanilla.',
    categories: ['eau-de-parfum'],
    featured: true,
    manage_stock: true,
    stock_quantity: 20,
    weight: '0.35',
    dimensions: { length: '8', width: '8', height: '12' },
  },
  {
    name: 'Élevé — Travel Spray',
    slug: 'eleve-travel-spray',
    sku: 'NOR-EL-T01',
    regular_price: '39',
    description: 'The same elevated composition in a sleek travel format. The Élevé Travel Spray fits effortlessly into your bag, ready for those special moments wherever you go.\n\n10ml of warm amber, soft musk, and bergamot — perfectly proportioned for on-the-go use.',
    short_description: 'Travel-size Élevé. 10ml spray.',
    categories: ['travel'],
    featured: false,
    manage_stock: true,
    stock_quantity: 50,
    weight: '0.05',
    dimensions: { length: '2', width: '2', height: '12' },
  },
  {
    name: 'Solène — Travel Spray',
    slug: 'solene-travel-spray',
    sku: 'NOR-SO-T01',
    regular_price: '39',
    description: 'Fresh renewal in your pocket. The Solène Travel Spray brings the serene, restorative composition wherever your adventures take you.\n\n10ml of white tea, linen, and subtle cedar — the perfect post-walk refresher.',
    short_description: 'Travel-size Solène. 10ml spray.',
    categories: ['travel'],
    featured: false,
    manage_stock: true,
    stock_quantity: 45,
    weight: '0.05',
    dimensions: { length: '2', width: '2', height: '12' },
  },
  {
    name: 'Fovère — Travel Spray',
    slug: 'fovere-travel-spray',
    sku: 'NOR-FO-T01',
    regular_price: '39',
    description: 'Warm harmony on the move. The Fovère Travel Spray carries the enveloping blend of cashmere woods, vanilla, and sandalwood in a sleek portable format.\n\n10ml — for when you want your companion to feel right at home, anywhere.',
    short_description: 'Travel-size Fovère. 10ml spray.',
    categories: ['travel'],
    featured: false,
    manage_stock: true,
    stock_quantity: 40,
    weight: '0.05',
    dimensions: { length: '2', width: '2', height: '12' },
  },
  {
    name: 'The Ritual Collection',
    slug: 'the-ritual-collection',
    sku: 'NOR-GS-001',
    regular_price: '239',
    sale_price: '219',
    description: "All three Norēlle fragrances united in one luxurious gift box. The Ritual Collection presents Élevé, Solène, and Fovère together — each addressing a different moment of care.\n\nPresented in custom Norēlle packaging with a handwritten thank-you card personalised with your pet's name. Because they give us everything, without condition.",
    short_description: 'All three fragrances in luxury gift packaging.',
    categories: ['gift-sets'],
    featured: true,
    manage_stock: true,
    stock_quantity: 15,
    weight: '1.2',
    dimensions: { length: '30', width: '12', height: '14' },
  },
  {
    name: 'The Discovery Set',
    slug: 'the-discovery-set',
    sku: 'NOR-GS-002',
    regular_price: '99',
    description: 'Three travel sprays, one elegant pouch. The Discovery Set is the perfect introduction to the world of Norēlle — letting you explore Élevé, Solène, and Fovère before committing to a full size.\n\nPresented in a natural linen drawstring pouch with the Norēlle monogram.',
    short_description: 'Three travel sprays in a linen pouch.',
    categories: ['gift-sets'],
    featured: true,
    manage_stock: true,
    stock_quantity: 35,
    weight: '0.25',
    dimensions: { length: '15', width: '10', height: '14' },
  },
]

// ─── Main ───────────────────────────────────────────────────

async function main() {
  console.log(`\n🔌 Connecting to WooCommerce at ${WC_URL}...\n`)

  // 1. Check connection
  try {
    await wcGet('system_status')
    console.log('✅ WooCommerce API connected\n')
  } catch (err) {
    console.error('❌ Cannot connect to WooCommerce:', err.message)
    process.exit(1)
  }

  // 2. Create categories
  console.log('📁 Creating categories...')
  const existingCats = await wcGet('products/categories?per_page=100')
  const catMap = {} // slug -> id

  for (const cat of categoryDefs) {
    const existing = existingCats.find(c => c.slug === cat.slug)
    if (existing) {
      catMap[cat.slug] = existing.id
      console.log(`   ⏭️  ${cat.name} (already exists, id=${existing.id})`)
    } else {
      const created = await wcPost('products/categories', cat)
      catMap[cat.slug] = created.id
      console.log(`   ✅ ${cat.name} (id=${created.id})`)
    }
  }

  // 3. Create products
  console.log('\n📦 Creating products...')
  const existingProducts = await wcGet('products?per_page=100&status=any')

  for (const product of productDefs) {
    const existing = existingProducts.find(p => p.sku === product.sku)
    if (existing) {
      console.log(`   ⏭️  ${product.name} (already exists, sku=${product.sku})`)
      continue
    }

    const categoryIds = product.categories.map(slug => ({ id: catMap[slug] }))
    const { categories: _, ...rest } = product
    const created = await wcPost('products', {
      ...rest,
      status: 'publish',
      catalog_visibility: 'visible',
      categories: categoryIds,
    })
    console.log(`   ✅ ${product.name} (id=${created.id}, sku=${product.sku})`)
  }

  // 4. Verify
  const allProducts = await wcGet('products?per_page=100')
  console.log(`\n🎉 Done! ${allProducts.length} products in WooCommerce.\n`)
}

main().catch(err => {
  console.error('Fatal error:', err)
  process.exit(1)
})
