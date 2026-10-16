// v4: нова версия, за да се изчистят v3 кешовете, в които може да има HTML под JS адреси
const CACHE_NAME = 'studybg-pwa-v4';
const ASSET_CACHE_NAME = 'studybg-assets-v4';
const MAX_ASSET_ENTRIES = 150;
const CORE_STATIC_ASSETS = [
  '/',
  '/index.html',
  '/favicon.svg',
  '/og-banner.png',
  '/manifest.webmanifest'
];

// Кешираме само истински успешни отговори — никога HTML на мястото на JS/CSS
const isCacheableAsset = (res) =>
  Boolean(res) && res.ok && !(res.headers.get('content-type') || '').includes('text/html');

// Пази кеша на асетите ограничен — най-старите записи се трият първи
async function trimCache(name, maxEntries) {
  const cache = await caches.open(name);
  const keys = await cache.keys();
  const excess = keys.length - maxEntries;
  if (excess > 0) {
    await Promise.all(keys.slice(0, excess).map((key) => cache.delete(key)));
  }
}

// 1. Install Event: Pre-cache core shell.
// Без skipWaiting тук — новата версия чака, докато потребителят натисне „Обнови“
// (съобщение 'SKIP_WAITING'), за да не прекъсваме изпит по средата.
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(CORE_STATIC_ASSETS))
  );
});

// 2. Activate Event: Clean up legacy caches & take control
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME && name !== ASSET_CACHE_NAME) {
            return caches.delete(name);
          }
          return undefined;
        })
      );
    }).then(() => self.clients.claim())
  );
});

// 3. Fetch Event: Intelligent offline caching strategy
self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);

  // Bypass non-GET requests and external API endpoints (e.g. Gemini Vision API, Supabase)
  if (request.method !== 'GET') return;
  if (url.hostname.includes('generativelanguage.googleapis.com')) return;

  // Navigation requests (HTML pages): NetworkFirst with index.html offline fallback
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, responseClone));
          }
          return networkResponse;
        })
        .catch(async () => {
          return (
            (await caches.match(request)) ||
            (await caches.match('/index.html')) ||
            (await caches.match('/')) ||
            Response.error()
          );
        })
    );
    return;
  }

  // Immutable content-hashed bundles (/assets/*.js, /assets/*.css): CacheFirst
  if (url.origin === self.location.origin && url.pathname.startsWith('/assets/')) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) return cachedResponse;
        return fetch(request).then((networkResponse) => {
          if (isCacheableAsset(networkResponse)) {
            const responseClone = networkResponse.clone();
            event.waitUntil(
              caches
                .open(ASSET_CACHE_NAME)
                .then((cache) => cache.put(request, responseClone))
                .then(() => trimCache(ASSET_CACHE_NAME, MAX_ASSET_ENTRIES))
            );
          }
          return networkResponse;
        });
      })
    );
    return;
  }

  // Other same-origin static assets (favicon.svg, manifest.webmanifest): Stale-while-revalidate
  if (url.origin === self.location.origin) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        const fetchPromise = fetch(request).then((networkResponse) => {
          if (isCacheableAsset(networkResponse)) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, responseClone));
          }
          return networkResponse;
        }).catch(() => cachedResponse || Response.error());

        // Return cached response immediately if available, otherwise wait for network
        return cachedResponse || fetchPromise;
      })
    );
    return;
  }

  // Google Fonts or static CDNs: Cache-first
  if (url.hostname.includes('fonts.googleapis.com') || url.hostname.includes('fonts.gstatic.com')) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) return cachedResponse;
        return fetch(request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, responseClone));
          }
          return networkResponse;
        });
      })
    );
    return;
  }

  // Default network with cache fallback
  event.respondWith(
    fetch(request).catch(async () => (await caches.match(request)) || Response.error())
  );
});

// Listen for skip waiting messages from the UI
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
