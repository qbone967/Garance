// Auto Hájek · Garance PWA — Service Worker
// Cachuje všechny potřebné soubory pro offline režim

const CACHE_NAME = 'garance-v17';
const FILES_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

// Instalace: uložíme všechny soubory do cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(FILES_TO_CACHE))
      .then(() => self.skipWaiting())
  );
});

// Aktivace: smažeme staré verze cache
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME)
            .map(key => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

// Fetch: HTML vždy nejdřív ze sítě (aby se hned projevila nová verze),
// ostatní soubory (ikony, manifest) nejdřív z cache. Offline fallback z cache.
self.addEventListener('fetch', event => {
  // Pouze GET požadavky
  if (event.request.method !== 'GET') return;

  const isHTML = event.request.mode === 'navigate'
    || event.request.destination === 'document'
    || event.request.headers.get('accept')?.includes('text/html');

  if (isHTML) {
    event.respondWith(
      fetch(event.request)
        .then(networkResponse => {
          if (networkResponse && networkResponse.status === 200) {
            const cloned = networkResponse.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, cloned));
          }
          return networkResponse;
        })
        .catch(() => caches.match(event.request).then(r => r || caches.match('./index.html')))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) return response;
        return fetch(event.request).then(networkResponse => {
          if (networkResponse && networkResponse.status === 200) {
            const cloned = networkResponse.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, cloned));
          }
          return networkResponse;
        });
      })
  );
});
