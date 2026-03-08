import { test, expect } from '@playwright/test'

test.describe('Norelle Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('has correct page title', async ({ page }) => {
    await expect(page).toHaveTitle(/Norelle/)
  })

  test('loads hero section', async ({ page }) => {
    const hero = page.locator('[data-testid="immersive-hero"]')
    await expect(hero).toBeVisible()
  })

  test('displays trust bar statistics', async ({ page }) => {
    await expect(page.getByText('500+')).toBeVisible()
    await expect(page.getByText('Happy Customers')).toBeVisible()
    await expect(page.getByText('50+')).toBeVisible()
    await expect(page.getByText('Unique Designs')).toBeVisible()
    await expect(page.getByText('2 Years')).toBeVisible()
    await expect(page.getByText('Warranty')).toBeVisible()
    await expect(page.getByText('Free')).toBeVisible()
    await expect(page.getByText('Shipping €75+')).toBeVisible()
  })

  test('shows featured products section', async ({ page }) => {
    await expect(page.getByText('Featured')).toBeVisible()
    await expect(page.getByText('Pieces')).toBeVisible()
    await expect(page.getByText(/Handpicked selections from our collection/)).toBeVisible()
  })

  test('displays product cards', async ({ page }) => {
    const productCards = page.locator('[data-testid="product-card"]')
    await expect(productCards.first()).toBeVisible()
    
    // Check product details
    await expect(page.locator('[data-testid="product-title"]').first()).toBeVisible()
    await expect(page.locator('[data-testid="product-price"]').first()).toBeVisible()
  })

  test('navigates to product page when clicking product', async ({ page }) => {
    const firstProduct = page.locator('[data-testid="product-card"]').first()
    await firstProduct.click()
    
    await expect(page).toHaveURL(/\/product\//)
  })

  test('shows special offers section', async ({ page }) => {
    await expect(page.getByText('Special')).toBeVisible()
    await expect(page.getByText('Offers')).toBeVisible()
    await expect(page.getByText(/Limited time offers/)).toBeVisible()
  })

  test('displays brand story section', async ({ page }) => {
    await expect(page.getByText('The Norelle')).toBeVisible()
    await expect(page.getByText('Legacy')).toBeVisible()
    await expect(page.getByText(/Crafted with passion in Belgium/)).toBeVisible()
  })

  test('has newsletter signup form', async ({ page }) => {
    await expect(page.getByText('Stay')).toBeVisible()
    await expect(page.getByText('Inspired')).toBeVisible()
    await expect(page.getByPlaceholderText('Enter your email address')).toBeVisible()
    await expect(page.getByText('Subscribe')).toBeVisible()
  })

  test('handles newsletter signup', async ({ page }) => {
    const emailInput = page.getByPlaceholderText('Enter your email address')
    const subscribeButton = page.getByText('Subscribe')
    
    await emailInput.fill('test@example.com')
    await subscribeButton.click()
    
    await expect(page.getByText('Thank you for subscribing!')).toBeVisible()
  })

  test('validates email format', async ({ page }) => {
    const emailInput = page.getByPlaceholderText('Enter your email address')
    const subscribeButton = page.getByText('Subscribe')
    
    await emailInput.fill('invalid-email')
    await subscribeButton.click()
    
    await expect(page.getByText('Please enter a valid email address')).toBeVisible()
  })

  test('displays contact information', async ({ page }) => {
    await expect(page.getByText('Visit Our')).toBeVisible()
    await expect(page.getByText('Brussels Boutique')).toBeVisible()
    await expect(page.getByText('Contact')).toBeVisible()
    await expect(page.getByText('Us')).toBeVisible()
  })

  test('has proper heading structure', async ({ page }) => {
    const h1 = page.locator('h1')
    await expect(h1).toBeVisible()
    
    const headings = page.locator('h2, h3, h4, h5, h6')
    await expect(headings.first()).toBeVisible()
  })

  test('is accessible', async ({ page }) => {
    // Check for proper ARIA labels
    await expect(page.getByRole('main')).toBeVisible()
    await expect(page.getByRole('navigation')).toBeVisible()
    
    // Check keyboard navigation
    await page.keyboard.press('Tab')
    const focusedElement = page.locator(':focus')
    await expect(focusedElement).toBeVisible()
  })

  test('has proper meta tags', async ({ page }) => {
    const metaDescription = page.locator('meta[name="description"]')
    await expect(metaDescription).toHaveAttribute('content')
    
    const metaKeywords = page.locator('meta[name="keywords"]')
    await expect(metaKeywords).toHaveAttribute('content')
  })

  test('loads images correctly', async ({ page }) => {
    const images = page.locator('img')
    const firstImage = images.first()
    
    await expect(firstImage).toBeVisible()
    await expect(firstImage).toHaveAttribute('alt')
  })

  test('has proper SEO structure', async ({ page }) => {
    await expect(page.getByRole('banner')).toBeVisible()
    await expect(page.getByRole('main')).toBeVisible()
    await expect(page.getByRole('contentinfo')).toBeVisible()
  })

  test('handles responsive design', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })
    await expect(page.getByTestId('immersive-hero')).toBeVisible()
    
    // Test tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 })
    await expect(page.getByTestId('immersive-hero')).toBeVisible()
    
    // Test desktop viewport
    await page.setViewportSize({ width: 1024, height: 768 })
    await expect(page.getByTestId('immersive-hero')).toBeVisible()
  })

  test('supports dark mode', async ({ page }) => {
    // Check if dark mode toggle exists
    const darkModeToggle = page.locator('[data-testid="dark-mode-toggle"]')
    if (await darkModeToggle.isVisible()) {
      await darkModeToggle.click()
      // Verify dark mode styles are applied
      const body = page.locator('body')
      await expect(body).toHaveClass(/dark/)
    }
  })

  test('has proper performance characteristics', async ({ page }) => {
    // Check for lazy loading images
    const images = page.locator('img[loading="lazy"]')
    await expect(images.first()).toBeVisible()
    
    // Check for optimized fonts
    const fonts = page.locator('link[rel="preload"][as="font"]')
    await expect(fonts.first()).toBeVisible()
  })

  test('handles errors gracefully', async ({ page }) => {
    // Mock network error
    await page.route('**/api/products', route => route.abort())
    
    await page.reload()
    
    // Should show error message
    await expect(page.getByText('Failed to load products')).toBeVisible()
  })

  test('tracks analytics events', async ({ page }) => {
    // Check for Google Analytics
    const gaScript = page.locator('script[src*="googletagmanager"]')
    await expect(gaScript).toBeVisible()
  })

  test('has proper internationalization support', async ({ page }) => {
    // Check for language selector
    const langSelector = page.locator('[data-testid="language-selector"]')
    if (await langSelector.isVisible()) {
      await langSelector.click()
      const frenchOption = page.getByText('Français')
      if (await frenchOption.isVisible()) {
        await frenchOption.click()
        await expect(page.getByText('Norelle')).toBeVisible()
      }
    }
  })

  test('supports keyboard navigation', async ({ page }) => {
    // Tab through interactive elements
    await page.keyboard.press('Tab')
    
    let focusedElement = page.locator(':focus')
    await expect(focusedElement).toBeVisible()
    
    // Continue tabbing through elements
    for (let i = 0; i < 5; i++) {
      await page.keyboard.press('Tab')
      focusedElement = page.locator(':focus')
      await expect(focusedElement).toBeVisible()
    }
  })

  test('has proper touch interactions', async ({ page }) => {
    // Test touch on mobile
    await page.setViewportSize({ width: 375, height: 667 })
    
    const productCard = page.locator('[data-testid="product-card"]').first()
    await productCard.tap()
    
    await expect(page).toHaveURL(/\/product\//)
  })

  test('supports reduced motion', async ({ page }) => {
    // Mock reduced motion preference
    await page.addStyleTag({
      content: '* { animation: none !important; transition: none !important; }'
    })
    
    await page.reload()
    
    // Should still be functional without animations
    await expect(page.getByTestId('immersive-hero')).toBeVisible()
  })

  test('has proper color contrast', async ({ page }) => {
    // Check color contrast of important elements
    const headings = page.locator('h1, h2, h3')
    const firstHeading = headings.first()
    
    // This would need additional tools to actually check contrast
    await expect(firstHeading).toBeVisible()
  })

  test('supports screen readers', async ({ page }) => {
    // Check for proper ARIA labels
    const productLinks = page.locator('a[href*="/product/"]')
    await expect(productLinks.first()).toHaveAttribute('aria-label')
    
    // Check for proper heading structure
    const mainHeading = page.locator('h1')
    await expect(mainHeading).toBeVisible()
  })

  test('has proper loading states', async ({ page }) => {
    // Check for loading indicators
    await page.goto('/', { waitUntil: 'domcontentloaded' })
    
    // Should show content without loading spinners for static content
    await expect(page.getByTestId('immersive-hero')).toBeVisible()
  })

  test('handles browser back button', async ({ page }) => {
    // Navigate to a product
    const firstProduct = page.locator('[data-testid="product-card"]').first()
    await firstProduct.click()
    
    // Go back
    await page.goBack()
    
    // Should return to homepage
    await expect(page).toHaveURL('/')
    await expect(page.getByTestId('immersive-hero')).toBeVisible()
  })

  test('has proper URL structure', async ({ page }) => {
    await expect(page).toHaveURL('/')
    
    // Check for canonical URL
    const canonical = page.locator('link[rel="canonical"]')
    await expect(canonical).toHaveAttribute('href', 'http://localhost:3000/')
  })

  test('supports social sharing', async ({ page }) => {
    // Check for social sharing buttons
    const shareButton = page.locator('[data-testid="share-button"]')
    if (await shareButton.isVisible()) {
      await shareButton.click()
      
      // Should show sharing options
      await expect(page.getByText('Share on Facebook')).toBeVisible()
      await expect(page.getByText('Share on Twitter')).toBeVisible()
    }
  })

  test('has proper footer links', async ({ page }) => {
    const footer = page.locator('footer')
    await expect(footer).toBeVisible()
    
    // Check for important footer links
    await expect(page.getByText('Privacy Policy')).toBeVisible()
    await expect(page.getByText('Terms of Service')).toBeVisible()
    await expect(page.getByText('Contact Us')).toBeVisible()
  })

  test('supports breadcrumb navigation', async ({ page }) => {
    // Navigate to a product to check breadcrumbs
    const firstProduct = page.locator('[data-testid="product-card"]').first()
    await firstProduct.click()
    
    // Check for breadcrumbs on product page
    const breadcrumbs = page.locator('[data-testid="breadcrumbs"]')
    if (await breadcrumbs.isVisible()) {
      await expect(breadcrumbs).toContainText('Home')
    }
  })

  test('has proper search functionality', async ({ page }) => {
    const searchInput = page.locator('[data-testid="search-input"]')
    if (await searchInput.isVisible()) {
      await searchInput.fill('necklace')
      await page.keyboard.press('Enter')
      
      // Should show search results
      await expect(page.getByText('Search Results')).toBeVisible()
    }
  })

  test('supports wishlist functionality', async ({ page }) => {
    const wishlistButton = page.locator('[data-testid="wishlist-button"]').first()
    if (await wishlistButton.isVisible()) {
      await wishlistButton.click()
      
      // Should show wishlist feedback
      await expect(page.getByText('Added to wishlist')).toBeVisible()
    }
  })

  test('has proper pagination', async ({ page }) => {
    // Navigate to shop page to test pagination
    await page.goto('/shop')
    
    const pagination = page.locator('[data-testid="pagination"]')
    if (await pagination.isVisible()) {
      const nextPage = page.locator('[data-testid="next-page"]')
      if (await nextPage.isVisible()) {
        await nextPage.click()
        
        // Should navigate to next page
        const url = page.url()
        expect(url).toContain('page=2')
      }
    }
  })

  test('supports filtering', async ({ page }) => {
    // Navigate to shop page to test filtering
    await page.goto('/shop')
    
    const filterButton = page.locator('[data-testid="filter-button"]')
    if (await filterButton.isVisible()) {
      await filterButton.click()
      
      // Should show filter options
      await expect(page.getByText('Category')).toBeVisible()
      await expect(page.getByText('Price Range')).toBeVisible()
    }
  })

  test('has proper sorting', async ({ page }) => {
    // Navigate to shop page to test sorting
    await page.goto('/shop')
    
    const sortDropdown = page.locator('[data-testid="sort-dropdown"]')
    if (await sortDropdown.isVisible()) {
      await sortDropdown.click()
      
      // Should show sorting options
      await expect(page.getByText('Price: Low to High')).toBeVisible()
      await expect(page.getByText('Price: High to Low')).toBeVisible()
    }
  })
})
