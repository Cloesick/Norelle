/**
 * Next.js Middleware for Security
 * Implements comprehensive security measures for Norelle
 */

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { 
  securityMiddleware, 
  addSecurityHeaders, 
  logSecurityEvent,
  detectHoneyPot,
  sanitizeInput
} from './lib/security/middleware'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()
  
  try {
    // Apply security middleware
    const securityResult = securityMiddleware(request)
    if (securityResult) {
      return securityResult
    }
    
    // Add security headers
    addSecurityHeaders(response)
    
    // Log security events for monitoring
    const ip = request.ip
    const userAgent = request.headers.get('user-agent') || ''
    const url = request.url
    
    // Log suspicious activity
    if (userAgent.includes('bot') || userAgent.includes('crawler')) {
      logSecurityEvent('SUSPICIOUS_ACTIVITY', {
        userAgent,
        endpoint: request.nextUrl.pathname,
        method: request.method
      }, request)
    }
    
    // Handle POST requests with input sanitization
    if (request.method === 'POST') {
      // Check for honey pot fields in form submissions
      const contentType = request.headers.get('content-type')
      if (contentType?.includes('application/x-www-form-urlencoded') || 
          contentType?.includes('multipart/form-data')) {
        
        // This would be handled in the actual API route
        // Here we just log the attempt
        logSecurityEvent('FORM_SUBMISSION', {
          endpoint: request.nextUrl.pathname,
          contentType
        }, request)
      }
    }
    
    return response
    
  } catch (error) {
    // Log security errors
    logSecurityEvent('SECURITY_ERROR', {
      error: error instanceof Error ? error.message : 'Unknown error',
      endpoint: request.nextUrl.pathname
    }, request)
    
    // Return error response
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files)
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
}
