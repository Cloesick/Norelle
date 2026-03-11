import { NextRequest, NextResponse } from 'next/server'
import { verifyCode } from '@/lib/security/email-verification'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, code, type = 'email_verification' } = body

    if (!email || !code) {
      return NextResponse.json(
        { success: false, message: 'Email and verification code are required' },
        { status: 400 }
      )
    }

    const result = verifyCode(code.toUpperCase(), email, type)

    if (!result.success) {
      const status = result.error === 'MAX_ATTEMPTS_EXCEEDED' ? 429 : 400
      return NextResponse.json(result, { status })
    }

    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}
