// Hotel Sunny Point — Service Worker for Full Offline Capabilities
// Cache Name with build versioning
const CACHE_NAME = "sunny-point-cache-v1";
const OFFLINE_PAGE = "/offline";

// Critical core assets to pre-cache on installation
const PRECACHE_ASSETS = [
  "/",
  "/menu",
  "/about",
  "/offers",
  "/feedback",
  "/contact",
  "/offline",
  "/manifest.webmanifest",
  "/assets/brand/logo.jpg",
  "/assets/brand/facade.jpg",
  "/assets/brand/gazette-history.jpg",
  "/assets/dishes/masala-dosa.jpg",
  "/assets/dishes/filter-coffee.jpg",
  "/assets/dishes/idli-vada.jpg",
  "/assets/dishes/paneer-tikka-sizzler.jpg",
  "/assets/dishes/paneer-butter-masala.jpg",
  "/assets/dishes/veg-manchow-soup.jpg",
  "/assets/dishes/veg-crispy.jpg",
  "/assets/dishes/mysore-masala-dosa.jpg",
  "/assets/dishes/special-sunny-dosa.jpg",
];

// Install Event: Pre-cache vital resources and skip waiting
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then(async (cache) => {
        // Cache assets sequentially or in batch with error tolerance
        for (const asset of PRECACHE_ASSETS) {
          try {
            await cache.add(new Request(asset, { cache: "reload" }));
          } catch (err) {
            console.warn(`[SW] Precache failed for ${asset}:`, err);
          }
        }
      })
      .then(() => self.skipWaiting())
  );
});

// Activate Event: Purge older cache versions and take immediate control
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((name) => {
            if (name !== CACHE_NAME) {
              console.log("[SW] Removing old cache:", name);
              return caches.delete(name);
            }
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

// Fetch Event: Smart offline-first caching strategy
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Only handle GET requests and http/https schemes
  if (request.method !== "GET" || !url.protocol.startsWith("http")) {
    return;
  }

  // Bypass Google Maps, analytics, or external third-party requests
  if (url.origin !== self.location.origin) {
    // For external font files or images, allow standard caching if desired
    if (url.hostname.includes("fonts.googleapis.com") || url.hostname.includes("fonts.gstatic.com")) {
      event.respondWith(staleWhileRevalidate(request, CACHE_NAME));
    }
    return;
  }

  // 1. Navigation requests (HTML pages): Network-First with Cache Fallback & Offline Page
  if (request.mode === "navigate") {
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
          // Network failed: attempt to retrieve from cache
          const cachedResponse = await caches.match(request);
          if (cachedResponse) {
            return cachedResponse;
          }
          // If specific page isn't in cache, serve pre-cached fallback
          const offlineFallback = await caches.match(OFFLINE_PAGE);
          if (offlineFallback) {
            return offlineFallback;
          }
          // Fall back to homepage if available
          const homeFallback = await caches.match("/");
          return homeFallback || new Response("Offline — Please reconnect to view this page.", {
            status: 503,
            headers: { "Content-Type": "text/plain" },
          });
        })
    );
    return;
  }

  // 2. Images, Audio, and Media: Cache-First with Network Fallback
  if (
    request.destination === "image" ||
    request.destination === "audio" ||
    url.pathname.startsWith("/assets/") ||
    url.pathname.endsWith(".webp") ||
    url.pathname.endsWith(".jpg") ||
    url.pathname.endsWith(".png") ||
    url.pathname.endsWith(".mp3")
  ) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) {
          // Serve from cache immediately
          return cachedResponse;
        }
        // Fetch from network, put into cache, and return
        return fetch(request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              const responseClone = networkResponse.clone();
              caches.open(CACHE_NAME).then((cache) => cache.put(request, responseClone));
            }
            return networkResponse;
          })
          .catch(() => {
            // Provide a graceful fallback for broken images if needed
            return new Response("", { status: 408 });
          });
      })
    );
    return;
  }

  // 3. Static Next.js Chunks, Scripts & CSS: Stale-While-Revalidate
  if (
    request.destination === "script" ||
    request.destination === "style" ||
    url.pathname.startsWith("/_next/static/")
  ) {
    event.respondWith(staleWhileRevalidate(request, CACHE_NAME));
    return;
  }

  // 4. Default strategy for everything else: Network with Cache Fallback
  event.respondWith(
    fetch(request)
      .then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, responseClone));
        }
        return networkResponse;
      })
      .catch(() => caches.match(request))
  );
});

// Helper: Stale-While-Revalidate strategy
async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request);

  const fetchPromise = fetch(request)
    .then((networkResponse) => {
      if (networkResponse && networkResponse.status === 200) {
        cache.put(request, networkResponse.clone());
      }
      return networkResponse;
    })
    .catch((err) => {
      // In offline conditions, network failure is expected
      return cachedResponse;
    });

  return cachedResponse || fetchPromise;
}

// Listen for message events (e.g. skipWaiting trigger from frontend)
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});
