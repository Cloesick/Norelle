import { getFeaturedProducts, getStaticCategories } from '@/lib/product-source'
import HomeClient from './HomeClient'

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts()
  const categories = getStaticCategories()

  return <HomeClient featuredProducts={featuredProducts} categories={categories} />
}
