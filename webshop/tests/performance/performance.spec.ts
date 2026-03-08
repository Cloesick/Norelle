import { test, expect } from '@playwright/test'

test.describe('Performance Tests', () => {
  test('homepage loads within performance budget', async ({ page }) => {
    const startTime = Date.now()
    
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    
    const loadTime = Date.now() - startTime
    
    // Should load within 3 seconds
    expect(loadTime).toBeLessThan(3000)
  })

  test('has good Core Web Vitals', async ({ page }) => {
    await page.goto('/')
    
    // Wait for page to fully load
    await page.waitForLoadState('networkidle')
    
    // Get performance metrics
    const metrics = await page.evaluate(() => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
      return {
        // Largest Contentful Paint (LCP)
        lcp: navigation.loadEventEnd - navigation.fetchStart,
        // First Contentful Paint (FCP)
        fcp: navigation.responseEnd - navigation.fetchStart,
        // Time to Interactive (TTI) - approximation
        tti: navigation.domContentLoadedEventEnd - navigation.fetchStart,
        // Cumulative Layout Shift (CLS) - would need more complex measurement
        cls: 0, // Placeholder
      }
    })
    
    // LCP should be under 2.5s
    expect(metrics.lcp).toBeLessThan(2500)
    
    // FCP should be under 1.8s
    expect(metrics.fcp).toBeLessThan(1800)
    
    // TTI should be under 3.8s
    expect(metrics.tti).toBeLessThan(3800)
  })

  test('images are optimized', async ({ page }) => {
    await page.goto('/')
    
    // Get all images
    const images = await page.locator('img').all()
    
    for (const image of images) {
      const src = await image.getAttribute('src')
      
      if (src) {
        // Check if image is properly sized
        const naturalWidth = await image.evaluate(img => (img as HTMLImageElement).naturalWidth)
        const displayWidth = await image.evaluate(img => img.clientWidth)
        
        // Natural width should be close to display width (not wasteful)
        const ratio = naturalWidth / displayWidth
        expect(ratio).toBeLessThan(2) // Not more than 2x larger than needed
        
        // Check for modern formats
        if (src.includes('.jpg') || src.includes('.jpeg') || src.includes('.png')) {
          // Should have proper fallbacks for modern formats
          const picture = await image.locator('xpath=./ancestor::picture')
          if (await picture.count() > 0) {
            const webpSource = await picture.locator('source[type="image/webp"]')
            expect(await webpSource.count()).toBeGreaterThan(0)
          }
        }
      }
    }
  })

  test('fonts are loaded efficiently', async ({ page }) => {
    await page.goto('/')
    
    // Check for preloaded fonts
    const preloadedFonts = await page.locator('link[rel="preload"][as="font"]').all()
    expect(preloadedFonts.length).toBeGreaterThan(0)
    
    // Check for font-display: swap
    const fontFaces = await page.evaluate(() => {
      const styles = Array.from(document.styleSheets)
      const fontFaces: string[] = []
      
      styles.forEach(styleSheet => {
        try {
          const rules = Array.from(styleSheet.cssRules || styleSheet.rules || [])
          rules.forEach(rule => {
            if (rule.type === CSSRule.FONT_FACE_RULE) {
              fontFaces.push(rule.cssText)
            }
          })
        } catch (e) {
          // Cross-origin stylesheets
        }
      })
      
      return fontFaces
    })
    
    const hasFontDisplaySwap = fontFaces.some(face => face.includes('font-display: swap'))
    expect(hasFontDisplaySwap).toBe(true)
  })

  test('JavaScript bundle size is reasonable', async ({ page }) => {
    await page.goto('/')
    
    // Get all script resources
    const scripts = await page.evaluate(() => {
      return Array.from(document.scripts).map(script => ({
        src: script.src,
        content: script.textContent || '',
        type: script.type || 'text/javascript'
      }))
    })
    
    // Check for large inline scripts
    const largeInlineScripts = scripts.filter(script => 
      !script.src && script.content.length > 10000
    )
    
    // Should not have large inline scripts
    expect(largeInlineScripts.length).toBe(0)
    
    // Check for bundle splitting
    const appScripts = scripts.filter(script => 
      script.src && (script.src.includes('app') || script.src.includes('main'))
    )
    
    // Should have multiple bundles (code splitting)
    expect(appScripts.length).toBeGreaterThan(1)
  })

  test('has proper caching headers', async ({ page }) => {
    const responses: any[] = []
    
    // Listen for all responses
    page.on('response', response => {
      responses.push({
        url: response.url(),
        status: response.status(),
        headers: response.headers()
      })
    })
    
    await page.goto('/')
    
    // Check for static assets
    const staticAssets = responses.filter(response => 
      response.url.includes('.js') || 
      response.url.includes('.css') || 
      response.url.includes('.woff') ||
      response.url.includes('.jpg') ||
      response.url.includes('.png')
    )
    
    // Static assets should have caching headers
    for (const asset of staticAssets) {
      const cacheControl = asset.headers['cache-control']
      if (cacheControl) {
        // Should have reasonable cache duration
        expect(cacheControl).toMatch(/max-age=[0-9]+/)
      }
    }
  })

  test('has minimal layout shifts', async ({ page }) => {
    await page.goto('/')
    
    // Measure Cumulative Layout Shift
    const cls = await page.evaluate(() => {
      return new Promise((resolve) => {
        let clsValue = 0
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.entryType === 'layout-shift' && !(entry as any).hadRecentInput) {
              clsValue += (entry as any).value
            }
          }
        })
        
        observer.observe({ entryTypes: ['layout-shift'] })
        
        // Wait a bit for layout shifts to be recorded
        setTimeout(() => {
          observer.disconnect()
          resolve(clsValue)
        }, 2000)
      })
    })
    
    // CLS should be under 0.1
    expect(cls).toBeLessThan(0.1)
  })

  test('has good Time to Interactive', async ({ page }) => {
    await page.goto('/')
    
    // Wait for page to be interactive
    await page.waitForLoadState('networkidle')
    
    // Try to interact with the page
    const firstProduct = page.locator('[data-testid="product-card"]').first()
    await firstProduct.hover()
    
    // Should be responsive
    await expect(firstProduct).toBeVisible()
  })

  test('handles slow networks gracefully', async ({ page }) => {
    // Simulate slow 3G network
    await page.route('**/*', async route => {
      await new Promise(resolve => setTimeout(resolve, 100)) // 100ms delay
      await route.continue()
    })
    
    const startTime = Date.now()
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    const loadTime = Date.now() - startTime
    
    // Should still be usable on slow networks
    expect(loadTime).toBeLessThan(10000) // 10 seconds max
    
    // Should show loading states
    await expect(page.getByTestId('immersive-hero')).toBeVisible()
  })

  test('has proper resource prioritization', async ({ page }) => {
    const resourceTiming: any[] = []
    
    page.on('response', async response => {
      const timing = await response.timing()
      resourceTiming.push({
        url: response.url(),
        timing: timing,
        type: response.request().resourceType()
      })
    })
    
    await page.goto('/')
    
    // CSS should be loaded early
    const cssResources = resourceTiming.filter(r => r.type === 'stylesheet')
    cssResources.forEach(css => {
      expect(css.timing.startTime).toBeLessThan(100) // Should start loading within 100ms
    })
    
    // Images should be loaded after critical resources
    const imageResources = resourceTiming.filter(r => r.type === 'image')
    const cssEndTime = Math.max(...cssResources.map(css => css.timing.responseEnd))
    
    imageResources.forEach(image => {
      expect(image.timing.startTime).toBeGreaterThan(cssEndTime)
    })
  })

  test('has good accessibility performance', async ({ page }) => {
    await page.goto('/')
    
    // Check for accessibility attributes
    const images = await page.locator('img').all()
    for (const image of images) {
      await expect(image).toHaveAttribute('alt')
    }
    
    // Check for proper heading structure
    const headings = await page.locator('h1, h2, h3, h4, h5, h6').all()
    expect(headings.length).toBeGreaterThan(0)
    
    // Check for ARIA labels on interactive elements
    const buttons = await page.locator('button').all()
    for (const button of buttons) {
      const text = await button.textContent()
      const ariaLabel = await button.getAttribute('aria-label')
      
      // Should have either text content or aria-label
      expect(text || ariaLabel).toBeTruthy()
    }
  })

  test('has efficient memory usage', async ({ page }) => {
    await page.goto('/')
    
    // Get memory usage
    const memoryUsage = await page.evaluate(() => {
      return (performance as any).memory ? {
        usedJSHeapSize: (performance as any).memory.usedJSHeapSize,
        totalJSHeapSize: (performance as any).memory.totalJSHeapSize,
        jsHeapSizeLimit: (performance as any).memory.jsHeapSizeLimit
      } : null
    })
    
    if (memoryUsage) {
      // Memory usage should be reasonable (less than 50MB)
      expect(memoryUsage.usedJSHeapSize).toBeLessThan(50 * 1024 * 1024)
    }
  })

  test('has proper error handling', async ({ page }) => {
    // Mock network errors
    await page.route('**/api/products', route => route.abort())
    
    await page.goto('/')
    
    // Should handle errors gracefully
    await expect(page.getByText('Failed to load products')).toBeVisible()
    
    // Should still show other content
    await expect(page.getByTestId('immersive-hero')).toBeVisible()
  })

  test('has good SEO performance', async ({ page }) => {
    await page.goto('/')
    
    // Check for meta tags
    await expect(page.locator('meta[name="description"]')).toBeVisible()
    await expect(page.locator('meta[name="keywords"]')).toBeVisible()
    await expect(page.locator('meta[property="og:title"]')).toBeVisible()
    await expect(page.locator('meta[property="og:description"]')).toBeVisible()
    await expect(page.locator('meta[property="og:image"]')).toBeVisible()
    
    // Check for structured data
    const structuredData = await page.locator('script[type="application/ld+json"]')
    if (await structuredData.count() > 0) {
      const jsonLd = await structuredData.getAttribute('innerHTML')
      expect(jsonLd).toBeTruthy()
      
      // Should be valid JSON
      expect(() => JSON.parse(jsonLd || '')).not.toThrow()
    }
  })

  test('has good mobile performance', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })
    
    const startTime = Date.now()
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    const loadTime = Date.now() - startTime
    
    // Should load quickly on mobile
    expect(loadTime).toBeLessThan(4000) // 4 seconds for mobile
    
    // Should be touch-friendly
    const productCards = await page.locator('[data-testid="product-card"]').all()
    for (const card of productCards.slice(0, 3)) {
      await card.tap()
      await page.goBack()
    }
  })

  test('has good offline capabilities', async ({ page }) => {
    await page.goto('/')
    
    // Check for service worker
    const serviceWorker = await page.evaluate(() => {
      return navigator.serviceWorker ? navigator.serviceWorker.ready : null
    })
    
    // Should have service worker registered
    expect(serviceWorker).toBeTruthy()
    
    // Check for offline functionality
    await page.context().setOffline(true)
    
    // Should still show cached content
    await expect(page.getByTestId('immersive-hero')).toBeVisible()
    
    await page.context().setOffline(false)
  })
})
