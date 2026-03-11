import { NextResponse } from 'next/server'
import { getProducts } from '@/lib/woocommerce'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  const params: Record<string, string | number | boolean> = {}
  if (searchParams.get('category')) params.category = Number(searchParams.get('category'))
  if (searchParams.get('featured')) params.featured = searchParams.get('featured') === 'true'
  if (searchParams.get('search')) params.search = searchParams.get('search')!
  if (searchParams.get('per_page')) params.per_page = Number(searchParams.get('per_page'))
  if (searchParams.get('page')) params.page = Number(searchParams.get('page'))
  if (searchParams.get('orderby')) params.orderby = searchParams.get('orderby')!
  if (searchParams.get('order')) params.order = searchParams.get('order') as 'asc' | 'desc'

  const products = await getProducts(params)

  return NextResponse.json(products)
}
