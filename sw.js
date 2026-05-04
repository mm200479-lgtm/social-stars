// Social Stars - Service Worker
// Network-first strategy: always tries to get the latest, falls back to cache offline
var CACHE_NAME = "social-stars-v14";
var ASSETS = [
    "./",
    "./index.html",
    "./styles.css",
    "./scenarios.js",
    "./firebase-sync.js",
    "./games.js",
    "./game.js",
    "./manifest.json",
    "./icon.svg"
];

// Install: cache all assets immediately
self.addEventListener("install", function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.addAll(ASSETS);
        })
    );
    // Activate immediately, don't wait
    self.skipWaiting();
});

// Activate: delete ALL old caches and take control immediately
self.addEventListener("activate", function(event) {
    event.waitUntil(
        caches.keys().then(function(names) {
            return Promise.all(
                names.filter(function(n) { return n !== CACHE_NAME; })
                     .map(function(n) { return caches.delete(n); })
            );
        }).then(function() {
            // Take control of all pages immediately
            return self.clients.claim();
        })
    );
});

// Fetch: network-first — always try to get fresh content
// Only use cache as fallback when offline
self.addEventListener("fetch", function(event) {
    // Cache API only supports GET requests — skip caching for POST, etc.
    if (event.request.method !== "GET") {
        event.respondWith(fetch(event.request));
        return;
    }

    event.respondWith(
        fetch(event.request).then(function(networkResponse) {
            // Got fresh response — update the cache
            if (networkResponse && networkResponse.status === 200) {
                var responseClone = networkResponse.clone();
                caches.open(CACHE_NAME).then(function(cache) {
                    cache.put(event.request, responseClone);
                });
            }
            return networkResponse;
        }).catch(function() {
            // Offline — serve from cache
            return caches.match(event.request);
        })
    );
});
