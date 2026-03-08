/**
 * Email Verification System for Norelle
 * Implements secure email verification with generated codes
 */

import crypto from 'crypto'
import { securityConfig } from './security-config'

export interface VerificationCode {
  code: string
  email: string
  expiresAt: Date
  attempts: number
  type: 'email_verification' | 'password_reset' | 'account_confirmation'
}

export interface EmailVerificationResult {
  success: boolean
  message: string
  error?: string
}

// In-memory store for verification codes (in production, use Redis)
const verificationStore = new Map<string, VerificationCode>()

/**
 * Generate a secure verification code
 */
export function generateVerificationCode(length: number = 6): string {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let result = ''
  
  for (let i = 0; i < length; i++) {
    const randomIndex = crypto.randomInt(0, chars.length)
    result += chars[randomIndex]
  }
  
  return result
}

/**
 * Create and store a verification code
 */
export function createVerificationCode(
  email: string,
  type: VerificationCode['type'] = 'email_verification'
): string {
  const code = generateVerificationCode(securityConfig.emailVerification.codeLength)
  const expiresAt = new Date(Date.now() + securityConfig.emailVerification.codeExpiry)
  
  // Remove any existing codes for this email
  for (const [key, value] of verificationStore.entries()) {
    if (value.email === email && value.type === type) {
      verificationStore.delete(key)
    }
  }
  
  // Store new verification code
  const verificationData: VerificationCode = {
    code,
    email: email.toLowerCase(),
    expiresAt,
    attempts: 0,
    type
  }
  
  verificationStore.set(code, verificationData)
  
  return code
}

/**
 * Verify a code
 */
export function verifyCode(
  code: string,
  email: string,
  type: VerificationCode['type'] = 'email_verification'
): EmailVerificationResult {
  const verification = verificationStore.get(code)
  
  if (!verification) {
    return {
      success: false,
      message: 'Invalid verification code',
      error: 'CODE_NOT_FOUND'
    }
  }
  
  // Check email match
  if (verification.email !== email.toLowerCase()) {
    return {
      success: false,
      message: 'Invalid verification code',
      error: 'EMAIL_MISMATCH'
    }
  }
  
  // Check type match
  if (verification.type !== type) {
    return {
      success: false,
      message: 'Invalid verification code',
      error: 'TYPE_MISMATCH'
    }
  }
  
  // Check expiration
  if (Date.now() > verification.expiresAt.getTime()) {
    verificationStore.delete(code)
    return {
      success: false,
      message: 'Verification code has expired',
      error: 'CODE_EXPIRED'
    }
  }
  
  // Check attempts
  if (verification.attempts >= securityConfig.emailVerification.maxAttempts) {
    verificationStore.delete(code)
    return {
      success: false,
      message: 'Too many attempts. Please request a new code.',
      error: 'MAX_ATTEMPTS_EXCEEDED'
    }
  }
  
  // Increment attempts
  verification.attempts++
  
  // Success - remove the code after successful verification
  verificationStore.delete(code)
  
  return {
    success: true,
    message: 'Email verified successfully'
  }
}

/**
 * Check if a verification code exists for an email
 */
export function hasPendingVerification(
  email: string,
  type: VerificationCode['type'] = 'email_verification'
): boolean {
  for (const [key, value] of verificationStore.entries()) {
    if (value.email === email.toLowerCase() && value.type === type) {
      // Check if not expired
      if (Date.now() <= value.expiresAt.getTime()) {
        return true
      } else {
        // Remove expired code
        verificationStore.delete(key)
      }
    }
  }
  
  return false
}

/**
 * Get remaining time for a verification code
 */
export function getCodeExpiryTime(code: string): number | null {
  const verification = verificationStore.get(code)
  
  if (!verification) {
    return null
  }
  
  const remainingTime = verification.expiresAt.getTime() - Date.now()
  return Math.max(0, Math.floor(remainingTime / 1000)) // Return seconds
}

/**
 * Clean up expired codes
 */
export function cleanupExpiredCodes(): void {
  const now = Date.now()
  
  for (const [key, value] of verificationStore.entries()) {
    if (now > value.expiresAt.getTime()) {
      verificationStore.delete(key)
    }
  }
}

/**
 * Rate limiting for verification requests
 */
export function checkVerificationRateLimit(email: string): EmailVerificationResult {
  const rateLimitKey = `verification_${email.toLowerCase()}`
  const now = Date.now()
  const windowMs = securityConfig.emailVerification.rateLimit.windowMs
  const maxRequests = securityConfig.emailVerification.rateLimit.max
  
  // Check if user has exceeded rate limit
  const recentRequests = Array.from(verificationStore.values()).filter(
    v => v.email === email.toLowerCase() && 
         v.type === 'email_verification' &&
         (now - (v.expiresAt.getTime() - windowMs)) < windowMs
  )
  
  if (recentRequests.length >= maxRequests) {
    return {
      success: false,
      message: 'Too many verification requests. Please try again later.',
      error: 'RATE_LIMIT_EXCEEDED'
    }
  }
  
  return { success: true, message: 'Rate limit check passed' }
}

/**
 * Send verification email (mock implementation)
 * In production, integrate with email service like SendGrid, AWS SES, etc.
 */
export async function sendVerificationEmail(
  email: string,
  code: string,
  type: VerificationCode['type'] = 'email_verification'
): Promise<EmailVerificationResult> {
  try {
    const template = securityConfig.emailVerification.templates[type]
    
    // Mock email sending - in production, use actual email service
    console.log(`Sending ${type} email to ${email} with code: ${code}`)
    
    // Example email content
    const emailContent = {
      to: email,
      subject: template.subject,
      html: generateEmailTemplate(code, type),
      text: generateTextTemplate(code, type)
    }
    
    // In production, send via email service
    // await emailService.send(emailContent)
    
    return {
      success: true,
      message: 'Verification email sent successfully'
    }
  } catch (error) {
    return {
      success: false,
      message: 'Failed to send verification email',
      error: error instanceof Error ? error.message : 'UNKNOWN_ERROR'
    }
  }
}

/**
 * Generate HTML email template
 */
function generateEmailTemplate(code: string, type: VerificationCode['type']): string {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://norelle.com'
  
  const templates = {
    email_verification: `
      <div style="font-family: 'Montserrat', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #F5F2E8;">
        <div style="background-color: #722F37; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
          <h1 style="color: #F5F2E8; font-family: 'Playfair Display', serif; font-size: 32px; margin: 0;">Norelle</h1>
          <p style="color: #D4AF37; margin: 10px 0 0; font-size: 16px;">Luxury Belgian Jewelry</p>
        </div>
        
        <div style="background-color: white; padding: 40px; border-radius: 0 0 8px 8px; text-align: center;">
          <h2 style="color: #722F37; font-family: 'Playfair Display', serif; font-size: 24px; margin-bottom: 20px;">Verify Your Email</h2>
          <p style="color: #2C2C2C; font-size: 16px; line-height: 1.6; margin-bottom: 30px;">
            Thank you for signing up with Norelle! Please use the verification code below to confirm your email address:
          </p>
          
          <div style="background-color: #F5F2E8; border: 2px solid #D4AF37; border-radius: 8px; padding: 20px; margin: 30px 0;">
            <p style="font-size: 24px; font-weight: bold; color: #722F37; letter-spacing: 4px; margin: 0;">
              ${code}
            </p>
          </div>
          
          <p style="color: #666666; font-size: 14px; margin-top: 30px;">
            This code will expire in 10 minutes. If you didn't request this verification, please ignore this email.
          </p>
          
          <div style="margin-top: 40px; padding-top: 30px; border-top: 1px solid #E8E5D8;">
            <p style="color: #666666; font-size: 12px; margin: 0;">
              © 2024 Norelle. All rights reserved.<br>
              <a href="${baseUrl}/privacy" style="color: #722F37;">Privacy Policy</a> | 
              <a href="${baseUrl}/terms" style="color: #722F37;">Terms of Service</a>
            </p>
          </div>
        </div>
      </div>
    `,
    password_reset: `
      <div style="font-family: 'Montserrat', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #F5F2E8;">
        <div style="background-color: #722F37; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
          <h1 style="color: #F5F2E8; font-family: 'Playfair Display', serif; font-size: 32px; margin: 0;">Norelle</h1>
          <p style="color: #D4AF37; margin: 10px 0 0; font-size: 16px;">Luxury Belgian Jewelry</p>
        </div>
        
        <div style="background-color: white; padding: 40px; border-radius: 0 0 8px 8px; text-align: center;">
          <h2 style="color: #722F37; font-family: 'Playfair Display', serif; font-size: 24px; margin-bottom: 20px;">Reset Your Password</h2>
          <p style="color: #2C2C2C; font-size: 16px; line-height: 1.6; margin-bottom: 30px;">
            We received a request to reset your password. Use the verification code below to proceed:
          </p>
          
          <div style="background-color: #F5F2E8; border: 2px solid #D4AF37; border-radius: 8px; padding: 20px; margin: 30px 0;">
            <p style="font-size: 24px; font-weight: bold; color: #722F37; letter-spacing: 4px; margin: 0;">
              ${code}
            </p>
          </div>
          
          <p style="color: #666666; font-size: 14px; margin-top: 30px;">
            This code will expire in 10 minutes. If you didn't request this password reset, please secure your account immediately.
          </p>
          
          <div style="margin-top: 40px; padding-top: 30px; border-top: 1px solid #E8E5D8;">
            <p style="color: #666666; font-size: 12px; margin: 0;">
              © 2024 Norelle. All rights reserved.<br>
              <a href="${baseUrl}/privacy" style="color: #722F37;">Privacy Policy</a> | 
              <a href="${baseUrl}/terms" style="color: #722F37;">Terms of Service</a>
            </p>
          </div>
        </div>
      </div>
    `,
    account_confirmation: `
      <div style="font-family: 'Montserrat', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #F5F2E8;">
        <div style="background-color: #722F37; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
          <h1 style="color: #F5F2E8; font-family: 'Playfair Display', serif; font-size: 32px; margin: 0;">Norelle</h1>
          <p style="color: #D4AF37; margin: 10px 0 0; font-size: 16px;">Luxury Belgian Jewelry</p>
        </div>
        
        <div style="background-color: white; padding: 40px; border-radius: 0 0 8px 8px; text-align: center;">
          <h2 style="color: #722F37; font-family: 'Playfair Display', serif; font-size: 24px; margin-bottom: 20px;">Confirm Your Account</h2>
          <p style="color: #2C2C2C; font-size: 16px; line-height: 1.6; margin-bottom: 30px;">
            Welcome to Norelle! Please use the verification code below to confirm your account:
          </p>
          
          <div style="background-color: #F5F2E8; border: 2px solid #D4AF37; border-radius: 8px; padding: 20px; margin: 30px 0;">
            <p style="font-size: 24px; font-weight: bold; color: #722F37; letter-spacing: 4px; margin: 0;">
              ${code}
            </p>
          </div>
          
          <p style="color: #666666; font-size: 14px; margin-top: 30px;">
            This code will expire in 10 minutes. If you didn't create an account with Norelle, please ignore this email.
          </p>
          
          <div style="margin-top: 40px; padding-top: 30px; border-top: 1px solid #E8E5D8;">
            <p style="color: #666666; font-size: 12px; margin: 0;">
              © 2024 Norelle. All rights reserved.<br>
              <a href="${baseUrl}/privacy" style="color: #722F37;">Privacy Policy</a> | 
              <a href="${baseUrl}/terms" style="color: #722F37;">Terms of Service</a>
            </p>
          </div>
        </div>
      </div>
    `
  }
  
  return templates[type] || templates.email_verification
}

/**
 * Generate text email template
 */
function generateTextTemplate(code: string, type: VerificationCode['type']): string {
  const templates = {
    email_verification: `
Norelle - Email Verification

Thank you for signing up with Norelle! Please use the verification code below to confirm your email address:

Verification Code: ${code}

This code will expire in 10 minutes. If you didn't request this verification, please ignore this email.

© 2024 Norelle. All rights reserved.
Privacy Policy: https://norelle.com/privacy
Terms of Service: https://norelle.com/terms
    `,
    password_reset: `
Norelle - Password Reset

We received a request to reset your password. Use the verification code below to proceed:

Verification Code: ${code}

This code will expire in 10 minutes. If you didn't request this password reset, please secure your account immediately.

© 2024 Norelle. All rights reserved.
Privacy Policy: https://norelle.com/privacy
Terms of Service: https://norelle.com/terms
    `,
    account_confirmation: `
Norelle - Account Confirmation

Welcome to Norelle! Please use the verification code below to confirm your account:

Verification Code: ${code}

This code will expire in 10 minutes. If you didn't create an account with Norelle, please ignore this email.

© 2024 Norelle. All rights reserved.
Privacy Policy: https://norelle.com/privacy
Terms of Service: https://norelle.com/terms
    `
  }
  
  return templates[type] || templates.email_verification
}

/**
 * Initialize verification process
 */
export async function initiateEmailVerification(
  email: string,
  type: VerificationCode['type'] = 'email_verification'
): Promise<EmailVerificationResult> {
  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return {
      success: false,
      message: 'Invalid email address',
      error: 'INVALID_EMAIL'
    }
  }
  
  // Check rate limit
  const rateLimitCheck = checkVerificationRateLimit(email)
  if (!rateLimitCheck.success) {
    return rateLimitCheck
  }
  
  // Generate and store verification code
  const code = createVerificationCode(email, type)
  
  // Send verification email
  const emailResult = await sendVerificationEmail(email, code, type)
  
  if (!emailResult.success) {
    // Remove the code if email failed to send
    verificationStore.delete(code)
    return emailResult
  }
  
  return {
    success: true,
    message: 'Verification code sent to your email'
  }
}

// Clean up expired codes periodically (every 5 minutes)
setInterval(cleanupExpiredCodes, 5 * 60 * 1000)
