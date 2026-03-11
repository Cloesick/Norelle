import { NextResponse } from 'next/server'
import { checkConnection } from '@/lib/woocommerce'

export async function GET() {
  const wooConnected = await checkConnection()

  return NextResponse.json({
    status: 'ok',
    woocommerce: wooConnected ? 'connected' : 'disconnected',
    timestamp: new Date().toISOString(),
  })
}
