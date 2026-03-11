import { getAllProducts } from '@/lib/product-source'
import ShopClient from './ShopClient'

export default async function ShopPage() {
  const products = await getAllProducts()
  return <ShopClient products={products} />
}
