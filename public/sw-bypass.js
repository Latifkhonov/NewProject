// Service Worker bypass script for API requests
// This Service Worker will explicitly ignore API requests to prevent interference

const CACHE_NAME = 'app-cache-v1';
const API_ROUTES = ['/api/', '/auth/', '/login', '/register'];

// Install event
self.addEventListener('install', (event) => {
  console.log('Service Worker: Install event');
  self.skipWaiting(); // Activate immediately
});

// Activate event
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activate event');
  event.waitUntil(self.clients.claim()); // Take control immediately
});

// Fetch event - bypass API requests
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  
  // Check if this is an API request
  const isApiRequest = API_ROUTES.some(route => url.pathname.includes(route)) ||
                      url.pathname.startsWith('/api/') ||
                      event.request.headers.get('Service-Worker') === 'bypass';
  
  // If it's an API request, let the browser handle it natively
  if (isApiRequest) {
    console.log('Service Worker: Bypassing API request:', url.pathname);
    return; // Don't call event.respondWith(), let browser handle natively
  }
  
  // For non-API requests, use normal caching strategy
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      })
      .catch((error) => {
        console.error('Service Worker: Fetch error:', error);
        return fetch(event.request);
      })
  );
});

// Message event for communication with main thread
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});