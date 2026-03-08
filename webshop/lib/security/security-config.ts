/**
 * Security Configuration for Norelle
 * Based on Vanta compliance standards and GDPR/CCPA requirements
 */

export const securityConfig = {
  // Rate limiting configuration
  rateLimiting: {
    // API endpoints
    api: {
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // Limit each IP to 100 requests per windowMs
      message: 'Too many requests from this IP, please try again later.',
      standardHeaders: true,
      legacyHeaders: false,
    },
    
    // Authentication endpoints (stricter)
    auth: {
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 5, // Limit each IP to 5 auth attempts per windowMs
      skipSuccessfulRequests: false,
      message: 'Too many authentication attempts, please try again later.',
    },
    
    // Contact form
    contact: {
      windowMs: 60 * 60 * 1000, // 1 hour
      max: 3, // Limit each IP to 3 contact submissions per hour
      message: 'Too many contact form submissions, please try again later.',
    },
  },

  // CSRF protection
  csrf: {
    secretLength: 32,
    cookieOptions: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict' as const,
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  },

  // Content Security Policy
  csp: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: [
        "'self'",
        "'unsafe-eval'", // Required for Next.js development
        "'unsafe-inline'", // Required for some inline scripts
        "https://www.googletagmanager.com",
        "https://www.google-analytics.com",
        "https://js.stripe.com",
      ],
      styleSrc: [
        "'self'",
        "'unsafe-inline'", // Required for Tailwind CSS
        "https://fonts.googleapis.com",
      ],
      fontSrc: [
        "'self'",
        "https://fonts.gstatic.com",
      ],
      imgSrc: [
        "'self'",
        "data:",
        "https:",
        "blob:",
      ],
      connectSrc: [
        "'self'",
        "https://api.stripe.com",
        "https://www.google-analytics.com",
        "https://analytics.google.com",
      ],
      frameSrc: [
        "'self'",
        "https://js.stripe.com",
      ],
      objectSrc: ["'none'"],
      baseUri: ["'self'"],
      formAction: ["'self'"],
      frameAncestors: ["'none'"],
      upgradeInsecureRequests: process.env.NODE_ENV === 'production',
    },
  },

  // Anti-scraping measures
  antiScraping: {
    // User agent patterns to block
    blockedUserAgents: [
      /bot/i,
      /crawler/i,
      /spider/i,
      /scraper/i,
      /curl/i,
      /wget/i,
      /python/i,
      /java/i,
      /perl/i,
      /php/i,
      /ruby/i,
    ],
    
    // IP rate limiting for scraping detection
    scrapingThreshold: {
      requestsPerMinute: 30,
      burstThreshold: 10,
      timeWindow: 60 * 1000, // 1 minute
    },
    
    // Honey pot fields
    honeyPotFields: [
      'website',
      'fax',
      'phone_number',
      'company_name',
    ],
  },

  // Anti-phishing measures
  antiPhishing: {
    // Email authentication
    dkim: {
      enabled: true,
      domain: process.env.EMAIL_DOMAIN,
      selector: 'norelle',
    },
    
    dmarc: {
      enabled: true,
      policy: 'reject',
      subdomainPolicy: 'reject',
      rua: 'mailto:dmarc@norelle.com',
      ruf: 'mailto:dmarc@norelle.com',
      adkim: 'r',
      aspf: 's',
      pct: 100,
    },
    
    spf: {
      enabled: true,
      record: 'v=spf1 include:_spf.google.com include:sendgrid.net ~all',
    },
  },

  // Email verification
  emailVerification: {
    // Code generation
    codeLength: 6,
    codeExpiry: 10 * 60 * 1000, // 10 minutes
    maxAttempts: 3,
    
    // Rate limiting for verification requests
    rateLimit: {
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 3, // Max 3 verification requests per 15 minutes
    },
    
    // Email templates
    templates: {
      verification: {
        subject: 'Verify your Norelle account',
        template: 'email-verification',
      },
      passwordReset: {
        subject: 'Reset your Norelle password',
        template: 'password-reset',
      },
    },
  },

  // Session security
  session: {
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'strict' as const,
    rolling: true,
    resave: false,
    saveUninitialized: false,
  },

  // Password requirements
  passwordPolicy: {
    minLength: 12,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSpecialChars: true,
    preventCommonPasswords: true,
    preventUserInfoInPassword: true,
    maxAge: 90 * 24 * 60 * 60 * 1000, // 90 days
    history: 5, // Prevent reuse of last 5 passwords
  },

  // Data protection
  dataProtection: {
    encryption: {
      algorithm: 'aes-256-gcm',
      keyLength: 32,
      ivLength: 16,
      tagLength: 16,
    },
    
    // Data retention
    retention: {
      userAccounts: 365 * 7, // 7 years for GDPR compliance
      orders: 365 * 7, // 7 years for accounting
      analytics: 365 * 2, // 2 years for analytics
      logs: 90, // 90 days for security logs
    },
    
    // Anonymization
    anonymization: {
      orderData: true,
      userProfiles: true,
      analyticsData: true,
    },
  },

  // Logging and monitoring
  logging: {
    level: process.env.NODE_ENV === 'production' ? 'warn' : 'info',
    format: 'json',
    
    // Security events to log
    securityEvents: [
      'AUTHENTICATION_SUCCESS',
      'AUTHENTICATION_FAILURE',
      'PASSWORD_CHANGE',
      'PASSWORD_RESET_REQUEST',
      'ACCOUNT_LOCKOUT',
      'SUSPICIOUS_ACTIVITY',
      'RATE_LIMIT_EXCEEDED',
      'CSRF_FAILURE',
      'XSS_ATTEMPT',
      'SQL_INJECTION_ATTEMPT',
      'DATA_ACCESS_VIOLATION',
    ],
    
    // Log retention
    retention: {
      security: 365 * 2, // 2 years for security logs
      access: 90, // 90 days for access logs
      error: 30, // 30 days for error logs
    },
  },

  // Backup and recovery
  backup: {
    frequency: 'daily',
    retention: 30, // 30 days
    encryption: true,
    geoRedundancy: true,
    
    // Recovery objectives
    rto: 4 * 60 * 60, // 4 hours Recovery Time Objective
    rpo: 1 * 60 * 60, // 1 hour Recovery Point Objective
  },

  // Compliance frameworks
  compliance: {
    gdpr: {
      enabled: true,
      dataProcessingOfficer: 'dpo@norelle.com',
      privacyPolicy: '/privacy',
      cookiePolicy: '/cookies',
      dataSubjectRights: '/data-rights',
    },
    
    ccpa: {
      enabled: true,
      privacyPolicy: '/privacy',
      doNotSellLink: '/do-not-sell',
      consumerRights: '/consumer-rights',
    },
    
    soc2: {
      enabled: true,
      trustServices: ['security', 'availability', 'processing_integrity'],
    },
  },
}

export default securityConfig
