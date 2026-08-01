const CACHE_NAME = 'avima-arts-v50';
const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/styles.css?v=50',
    '/app.js?v=50',
    'https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Onest:wght@300;400;500;600;700&display=swap'
];

// Install Event - Pre-cache core assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(STATIC_ASSETS).catch((err) => {
                console.warn('Failed to pre-cache static assets:', err);
            });
        })
    );
    self.skipWaiting();
});

// Activate Event - Clean up old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

// Fetch Event - Cache First for Images & Media, Stale-While-Revalidate for CSS/JS
self.addEventListener('fetch', (event) => {
    const request = event.request;
    const url = new URL(request.url);

    if (request.method !== 'GET' || url.hostname.includes('formsubmit.co')) {
        return;
    }

    if (
        request.destination === 'image' ||
        request.destination === 'font' ||
        request.destination === 'video' ||
        url.pathname.match(/\.(webp|jpg|jpeg|png|gif|svg|mp4|woff2?|ttf)$/i)
    ) {
        event.respondWith(
            caches.open(CACHE_NAME).then((cache) => {
                return cache.match(request).then((cachedResponse) => {
                    if (cachedResponse) {
                        return cachedResponse;
                    }
                    return fetch(request).then((networkResponse) => {
                        if (networkResponse && networkResponse.status === 200) {
                            cache.put(request, networkResponse.clone());
                        }
                        return networkResponse;
                    }).catch(() => {
                        if (request.destination === 'image') {
                            return cache.match('/assets/mahogany/mahogany_plate_mandala.webp');
                        }
                    });
                });
            })
        );
        return;
    }

    event.respondWith(
        caches.match(request).then((cachedResponse) => {
            const fetchPromise = fetch(request).then((networkResponse) => {
                if (networkResponse && networkResponse.status === 200) {
                    caches.open(CACHE_NAME).then((cache) => cache.put(request, networkResponse.clone()));
                }
                return networkResponse;
            }).catch(() => cachedResponse);

            return cachedResponse || fetchPromise;
        })
    );
});
