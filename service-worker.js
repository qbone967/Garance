// Auto Hájek · Garance PWA — Service Worker
// Cachuje všechny potřebné soubory pro offline režim

const CACHE_NAME = 'garance-v15';
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

// Fetch: nejdřív cache, fallback síť
self.addEventListener('fetch', event => {
  // Pouze GET požadavky
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) return response;
        return fetch(event.request).then(networkResponse => {
          // Pokud se podaří stáhnout ze sítě, uložíme do cache
          if (networkResponse && networkResponse.status === 200) {
            const cloned = networkResponse.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, cloned));
          }
          return networkResponse;
        });
      })
      .catch(() => {
        // Offline fallback pro HTML
        if (event.request.destination === 'document') {
          return caches.match('./index.html');
        }
      })
  );
});
