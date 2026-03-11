import { NextRequest, NextResponse } from 'next/server'
import { initiateEmailVerification } from '@/lib/security/email-verification'
import { validateEmail } from '@/lib/security/middleware'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, type = 'email_verification' } = body

    if (!email) {
      return NextResponse.json(
        { success: false, message: 'Email is required' },
        { status: 400 }
      )
    }

    // Validate email format and check for disposable domains
    const emailValidation = validateEmail(email)
    if (!emailValidation.valid) {
      return NextResponse.json(
        { success: false, message: emailValidation.error },
        { status: 400 }
      )
    }

    const result = await initiateEmailVerification(email, type)

    if (!result.success) {
      return NextResponse.json(result, { status: 429 })
    }

    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}
