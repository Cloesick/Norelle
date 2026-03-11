import { notFound } from 'next/navigation'
import { getProductBySlug } from '@/lib/product-source'
import ProductClient from './ProductClient'

interface ProductPageProps {
  params: { slug: string }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProductBySlug(params.slug)

  if (!product) {
    notFound()
  }

  return <ProductClient product={product} />
}
