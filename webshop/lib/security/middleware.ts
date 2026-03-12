/**
 * Security Middleware for Norelle
 * Implements anti-spam, anti-phishing, anti-scraping, and anti-penetration measures
 */

import { NextRequest, NextResponse } from 'next/server'
import { securityConfig } from './security-config'

// Rate limiting store (in production, use Redis)
const rateLimitStore = new Map()

// Blocked IPs store (in production, use database)
const blockedIPs = new Set()

/**
 * Rate limiting middleware
 */
export function rateLimit(ip: string | undefined, limit: any) {
  const safeIp = ip || '127.0.0.1'
  const key = `rate_limit_${safeIp}_${limit.windowMs}`
  const now = Date.now()
  const windowStart = now - limit.windowMs
  
  // Clean up old entries
  if (rateLimitStore.has(key)) {
    const data = rateLimitStore.get(key)
    if (data.windowStart < windowStart) {
      rateLimitStore.delete(key)
    }
  }
  
  // Check current count
  const current = rateLimitStore.get(key) || { count: 0, windowStart: now }
  
  if (current.count >= limit.max) {
    return {
      success: false,
      message: limit.message,
      retryAfter: Math.ceil((limit.windowMs - (now - current.windowStart)) / 1000)
    }
  }
  
  // Increment count
  current.count++
  rateLimitStore.set(key, current)
  
  return { success: true }
}

/**
 * Anti-scraping detection
 */
export function detectScraping(request: NextRequest) {
  const ip = request.ip || request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || '127.0.0.1'
  const userAgent = request.headers.get('user-agent') || ''
  
  // Check user agent
  const isBlockedUA = securityConfig.antiScraping.blockedUserAgents.some(pattern => 
    pattern.test(userAgent)
  )
  
  if (isBlockedUA) {
    return { blocked: true, reason: 'Blocked user agent' }
  }
  
  // Check rate limiting for scraping
  const scrapingKey = `scraping_${ip}`
  const now = Date.now()
  const windowStart = now - securityConfig.antiScraping.scrapingThreshold.timeWindow
  
  // Clean up old entries
  if (rateLimitStore.has(scrapingKey)) {
    const data = rateLimitStore.get(scrapingKey)
    if (data.windowStart < windowStart) {
      rateLimitStore.delete(scrapingKey)
    }
  }
  
  const current = rateLimitStore.get(scrapingKey) || { 
    count: 0, 
    windowStart: now,
    burstCount: 0,
    lastBurstReset: now 
  }
  
  // Check burst threshold
  if (now - current.lastBurstReset > 60000) { // Reset burst count every minute
    current.burstCount = 0
    current.lastBurstReset = now
  }
  
  current.burstCount++
  current.count++
  
  if (current.burstCount >= securityConfig.antiScraping.scrapingThreshold.burstThreshold ||
      current.count >= securityConfig.antiScraping.scrapingThreshold.requestsPerMinute) {
    blockedIPs.add(ip)
    return { blocked: true, reason: 'Scraping detected' }
  }
  
  rateLimitStore.set(scrapingKey, current)
  return { blocked: false }
}

/**
 * CSRF protection
 */
export function validateCSRF(request: NextRequest) {
  if (request.method === 'GET' || request.method === 'HEAD' || request.method === 'OPTIONS') {
    return { valid: true }
  }

  // CSRF enforcement requires a token generation endpoint first.
  // Skip in development; enforce in production once the token flow exists.
  if (process.env.NODE_ENV !== 'production') {
    return { valid: true }
  }
  
  const csrfToken = request.headers.get('x-csrf-token')
  const sessionToken = request.cookies.get('csrf-token')?.value
  
  if (!csrfToken || !sessionToken || csrfToken !== sessionToken) {
    return { valid: false, error: 'Invalid CSRF token' }
  }
  
  return { valid: true }
}

/**
 * Security headers middleware
 */
export function addSecurityHeaders(response: NextResponse) {
  // Content Security Policy — convert camelCase keys to kebab-case
  const cspDirectives = Object.entries(securityConfig.csp.directives)
    .map(([directive, values]) => {
      const kebab = directive.replace(/([A-Z])/g, '-$1').toLowerCase()
      if (typeof values === 'boolean') {
        return values ? kebab : null
      }
      const valueArray = Array.isArray(values) ? values : [values]
      return `${kebab} ${valueArray.join(' ')}`
    })
    .filter(Boolean)
    .join('; ')
  
  response.headers.set('Content-Security-Policy', cspDirectives)
  
  // Other security headers
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')
  response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains')
  
  return response
}

/**
 * Input sanitization
 */
export function sanitizeInput(input: any): any {
  if (typeof input === 'string') {
    // Remove potential XSS attacks
    return input
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/javascript:/gi, '')
      .replace(/on\w+\s*=/gi, '')
      .trim()
  }
  
  if (Array.isArray(input)) {
    return input.map(sanitizeInput)
  }
  
  if (typeof input === 'object' && input !== null) {
    const sanitized: any = {}
    for (const [key, value] of Object.entries(input)) {
      sanitized[key] = sanitizeInput(value)
    }
    return sanitized
  }
  
  return input
}

/**
 * Honey pot detection
 */
export function detectHoneyPot(data: Record<string, any>) {
  const honeyPotFields = securityConfig.antiScraping.honeyPotFields
  
  for (const field of honeyPotFields) {
    if (data[field] && data[field].toString().trim() !== '') {
      return { detected: true, field }
    }
  }
  
  return { detected: false }
}

/**
 * Email validation
 */
export function validateEmail(email: string): { valid: boolean; error?: string } {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  
  if (!emailRegex.test(email)) {
    return { valid: false, error: 'Invalid email format' }
  }
  
  // Check for disposable email domains
  const disposableDomains = [
    '10minutemail.com',
    'tempmail.org',
    'guerrillamail.com',
    'mailinator.com',
    'yopmail.com',
  ]
  
  const domain = email.split('@')[1].toLowerCase()
  if (disposableDomains.includes(domain)) {
    return { valid: false, error: 'Disposable email addresses are not allowed' }
  }
  
  return { valid: true }
}

/**
 * Main security middleware
 */
export function securityMiddleware(request: NextRequest) {
  const ip = request.ip || request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || '127.0.0.1'
  const url = request.nextUrl.pathname
  
  // Check if IP is blocked
  if (blockedIPs.has(ip)) {
    return NextResponse.json(
      { error: 'Access denied' },
      { status: 403 }
    )
  }
  
  // Anti-scraping + rate limiting only apply to API routes.
  // Page navigations are protected by security headers instead.
  if (url.startsWith('/api')) {
    // Anti-scraping detection
    const scrapingResult = detectScraping(request)
    if (scrapingResult.blocked) {
      return NextResponse.json(
        { error: 'Access denied', reason: scrapingResult.reason },
        { status: 403 }
      )
    }

    // Rate limiting based on endpoint
    let rateLimitConfig = securityConfig.rateLimiting.api

    if (url.startsWith('/api/auth')) {
      rateLimitConfig = {
        ...securityConfig.rateLimiting.api,
        ...securityConfig.rateLimiting.auth
      }
    } else if (url.startsWith('/api/contact')) {
      rateLimitConfig = {
        ...securityConfig.rateLimiting.api,
        ...securityConfig.rateLimiting.contact
      }
    }

    const rateLimitResult = rateLimit(ip, rateLimitConfig)
    if (!rateLimitResult.success) {
      const response = NextResponse.json(
        { error: rateLimitResult.message },
        { status: 429 }
      )
      response.headers.set('Retry-After', (rateLimitResult.retryAfter || 60).toString())
      return response
    }
  }
  
  // CSRF protection for state-changing requests
  const csrfResult = validateCSRF(request)
  if (!csrfResult.valid) {
    return NextResponse.json(
      { error: csrfResult.error },
      { status: 403 }
    )
  }
  
  return null // Continue processing
}

/**
 * Security event logger
 */
export function logSecurityEvent(
  event: string,
  details: Record<string, any>,
  request: NextRequest
) {
  if (!securityConfig.logging.securityEvents.includes(event)) {
    return
  }
  
  const logEntry = {
    timestamp: new Date().toISOString(),
    event,
    ip: request.ip,
    userAgent: request.headers.get('user-agent'),
    url: request.url,
    method: request.method,
    details,
  }
  
  // In production, send to logging service
  console.warn('SECURITY_EVENT', JSON.stringify(logEntry))
  
  // For critical events, trigger alerts
  const criticalEvents = [
    'ACCOUNT_LOCKOUT',
    'SUSPICIOUS_ACTIVITY',
    'SQL_INJECTION_ATTEMPT',
    'DATA_ACCESS_VIOLATION',
  ]
  
  if (criticalEvents.includes(event)) {
    // Trigger alert system
    console.error('CRITICAL_SECURITY_EVENT', JSON.stringify(logEntry))
  }
}

/**
 * Password strength validation
 */
export function validatePassword(password: string): { 
  valid: boolean 
  errors: string[] 
} {
  const policy = securityConfig.passwordPolicy
  const errors: string[] = []
  
  if (password.length < policy.minLength) {
    errors.push(`Password must be at least ${policy.minLength} characters long`)
  }
  
  if (policy.requireUppercase && !/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter')
  }
  
  if (policy.requireLowercase && !/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter')
  }
  
  if (policy.requireNumbers && !/\d/.test(password)) {
    errors.push('Password must contain at least one number')
  }
  
  if (policy.requireSpecialChars && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Password must contain at least one special character')
  }
  
  // Check for common passwords
  const commonPasswords = [
    'password', '123456', 'qwerty', 'abc123', 'password123',
    'admin', 'letmein', 'welcome', 'monkey', 'dragon'
  ]
  
  if (policy.preventCommonPasswords && 
      commonPasswords.some(common => password.toLowerCase().includes(common))) {
    errors.push('Password is too common, please choose a stronger password')
  }
  
  return {
    valid: errors.length === 0,
    errors
  }
}
