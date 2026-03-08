// Norelle Luxury Jewelry Service Worker
// PWA functionality for offline support and performance

const CACHE_NAME = 'norelle-v1'
const STATIC_CACHE = 'norelle-static-v1'
const DYNAMIC_CACHE = 'norelle-dynamic-v1'
const IMAGE_CACHE = 'norelle-images-v1'

// Files to cache for offline functionality
const STATIC_ASSETS = [
  '/',
  '/offline',
  '/manifest.json',
  '/_next/static/css/app/layout.css',
  '/_next/static/css/app/page.css',
  '/images/brand-logo.png',
  '/images/brand-story.jpg'
]

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('[SW] Installing service worker')
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => {
        console.log('[SW] Caching static assets')
        return cache.addAll(STATIC_ASSETS)
      })
      .then(() => self.skipWaiting())
  )
})

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating service worker')
  
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames
            .filter(cacheName => 
              cacheName !== STATIC_CACHE && 
              cacheName !== DYNAMIC_CACHE && 
              cacheName !== IMAGE_CACHE
            )
            .map(cacheName => {
              console.log('[SW] Deleting old cache:', cacheName)
              return caches.delete(cacheName)
            })
        )
      })
      .then(() => self.clients.claim())
  )
})

// Fetch event - serve from cache when offline
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Skip non-HTTP requests
  if (!request.url.startsWith('http')) {
    return
  }

  // Handle different request types
  if (url.pathname.startsWith('/images/')) {
    event.respondWith(handleImageRequest(request))
  } else if (url.pathname.startsWith('/api/')) {
    event.respondWith(handleApiRequest(request))
  } else if (request.method === 'GET') {
    event.respondWith(handlePageRequest(request))
  }
})

// Handle page requests
async function handlePageRequest(request) {
  try {
    // Try network first
    const networkResponse = await fetch(request)
    
    // Cache successful responses
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE)
      cache.put(request, networkResponse.clone())
    }
    
    return networkResponse
  } catch (error) {
    // Fallback to cache
    const cachedResponse = await caches.match(request)
    
    if (cachedResponse) {
      return cachedResponse
    }
    
    // Fallback to offline page
    return caches.match('/offline')
  }
}

// Handle image requests with cache-first strategy
async function handleImageRequest(request) {
  // Try cache first for images
  const cachedResponse = await caches.match(request)
  
  if (cachedResponse) {
    return cachedResponse
  }
  
  try {
    // Fetch from network
    const networkResponse = await fetch(request)
    
    if (networkResponse.ok) {
      const cache = await caches.open(IMAGE_CACHE)
      cache.put(request, networkResponse.clone())
    }
    
    return networkResponse
  } catch (error) {
    // Return a placeholder image or error
    return new Response('Image not available offline', {
      status: 404,
      statusText: 'Not Found'
    })
  }
}

// Handle API requests
async function handleApiRequest(request) {
  try {
    // Always try network first for API requests
    const networkResponse = await fetch(request)
    
    // Cache successful GET requests
    if (networkResponse.ok && request.method === 'GET') {
      const cache = await caches.open(DYNAMIC_CACHE)
      cache.put(request, networkResponse.clone())
    }
    
    return networkResponse
  } catch (error) {
    // For GET requests, try cache
    if (request.method === 'GET') {
      const cachedResponse = await caches.match(request)
      if (cachedResponse) {
        return cachedResponse
      }
    }
    
    // Return error response
    return new Response(JSON.stringify({
      error: 'Network unavailable',
      offline: true
    }), {
      status: 503,
      statusText: 'Service Unavailable',
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync-cart') {
    event.waitUntil(syncCartData())
  }
})

// Sync cart data when back online
async function syncCartData() {
  try {
    // Get offline cart data from IndexedDB
    const offlineCart = await getOfflineCart()
    
    if (offlineCart && offlineCart.length > 0) {
      // Send to server
      const response = await fetch('/api/sync-cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ cart: offlineCart })
      })
      
      if (response.ok) {
        // Clear offline cart
        await clearOfflineCart()
        
        // Notify client
        const clients = await self.clients.matchAll()
        clients.forEach(client => {
          client.postMessage({
            type: 'CART_SYNCED',
            data: await response.json()
          })
        })
      }
    }
  } catch (error) {
    console.error('[SW] Failed to sync cart data:', error)
  }
}

// Push notifications
self.addEventListener('push', (event) => {
  const options = {
    body: event.data?.text() || 'New updates from Norelle',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/badge-72x72.png',
    vibrate: [200, 100, 200],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Explore',
        icon: '/icons/checkmark.png'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/icons/xmark.png'
      }
    ]
  }

  event.waitUntil(
    self.registration.showNotification('Norelle Luxury Jewelry', options)
  )
})

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  event.notification.close()

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/shop')
    )
  } else if (event.action === 'close') {
    // Just close the notification
  } else {
    // Default action - open the app
    event.waitUntil(
      clients.openWindow('/')
    )
  }
})

// Periodic background sync for content updates
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'content-sync') {
    event.waitUntil(updateContent())
  }
})

// Update cached content
async function updateContent() {
  try {
    // Fetch latest product data
    const response = await fetch('/api/products')
    
    if (response.ok) {
      const products = await response.json()
      
      // Update cache
      const cache = await caches.open(DYNAMIC_CACHE)
      await cache.put('/api/products', response.clone())
      
      // Notify clients
      const clients = await self.clients.matchAll()
      clients.forEach(client => {
        client.postMessage({
          type: 'CONTENT_UPDATED',
          data: { products }
        })
      })
    }
  } catch (error) {
    console.error('[SW] Failed to update content:', error)
  }
}

// IndexedDB helpers for offline storage
async function getOfflineCart() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('NorelleOfflineDB', 1)
    
    request.onerror = () => reject(request.error)
    request.onsuccess = () => {
      const db = request.result
      const transaction = db.transaction(['cart'], 'readonly')
      const store = transaction.objectStore('cart')
      const getRequest = store.getAll()
      
      getRequest.onsuccess = () => resolve(getRequest.result)
      getRequest.onerror = () => reject(getRequest.error)
    }
    
    request.onupgradeneeded = () => {
      const db = request.result
      db.createObjectStore('cart')
    }
  })
}

async function clearOfflineCart() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('NorelleOfflineDB', 1)
    
    request.onerror = () => reject(request.error)
    request.onsuccess = () => {
      const db = request.result
      const transaction = db.transaction(['cart'], 'readwrite')
      const store = transaction.objectStore('cart')
      const clearRequest = store.clear()
      
      clearRequest.onsuccess = () => resolve()
      clearRequest.onerror = () => reject(clearRequest.error)
    }
  })
}

// Cache management
self.addEventListener('message', (event) => {
  const { type, data } = event.data
  
  switch (type) {
    case 'SKIP_WAITING':
      self.skipWaiting()
      break
      
    case 'CACHE_UPDATE':
      updateCache(data.urls)
      break
      
    case 'CLEAR_CACHE':
      clearCache(data.cacheName)
      break
  }
})

// Update specific cache
async function updateCache(urls) {
  const cache = await caches.open(DYNAMIC_CACHE)
  
  for (const url of urls) {
    try {
      const response = await fetch(url)
      if (response.ok) {
        await cache.put(url, response)
      }
    } catch (error) {
      console.error(`[SW] Failed to cache ${url}:`, error)
    }
  }
}

// Clear specific cache
async function clearCache(cacheName) {
  await caches.delete(cacheName)
  
  // Notify clients
  const clients = await self.clients.matchAll()
  clients.forEach(client => {
    client.postMessage({
      type: 'CACHE_CLEARED',
      data: { cacheName }
    })
  })
}

// Network status monitoring
self.addEventListener('online', () => {
  // Notify clients that we're back online
  const clients = self.clients.matchAll()
  clients.then(clientList => {
    clientList.forEach(client => {
      client.postMessage({
        type: 'ONLINE'
      })
    })
  })
})

self.addEventListener('offline', () => {
  // Notify clients that we're offline
  const clients = self.clients.matchAll()
  clients.then(clientList => {
    clientList.forEach(client => {
      client.postMessage({
        type: 'OFFLINE'
      })
    })
  })
})
