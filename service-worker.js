const CACHE_NAME = 'info-pl-v1';
const urlsToCache = [
  '/',
  '/css/materialize.min.css',
  '/css/style.css',
  '/icon/android-chrome-192x192.png',
  '/icon/android-chrome-512x512.png',
  '/icon/apple-touch-icon.png',
  '/icon/favicon-16x16.png',
  '/icon/favicon-32x32.png',
  '/icon/favicon.ico',
  '/js/api/api.js',
  '/js/pages/loadJadwal.js',
  '/js/pages/loadJadwalYangDisimpan.js',
  '/js/pages/loadKelasemen.js',
  '/js/utils/db.js',
  '/js/utils/loading.js',
  '/js/idb.js',
  '/js/loadPage.js',
  '/js/main.js',
  '/js/materialize.min.js',
  '/js/nav.js',
  '/js/uuidv4.min.js',
  '/pages/jadwal-yang-disimpan.html',
  '/pages/jadwal.html',
  '/pages/kelasemen.html',
  '/index.html',
  '/manifest.json',
  '/nav.html',
  '/service-worker.js',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache =>{
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', event => {
  const base_url = 'https://api.football-data.org/v2';
  
  const API_TOKEN = '326e766c25414180b4cd22c1e4b187b4';

  const headers = {
    'X-Auth-Token': API_TOKEN
  }; 

  // change indexOf() to includes()

  if (event.request.url.indexOf(base_url) > -1) {
    event.respondWith(
      caches.open(CACHE_NAME).then(cache => {
        return fetch(event.request, { headers }).then(response => {
          cache.put(base_url, response.clone());
          return response
        })
      })
    );
  } else {
    event.respondWith(
      caches.match(event.request, { ignoreSearch: true }).then(response => {
        return response || fetch (event.request);
      })
    );
  }
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName != CACHE_NAME) {
            console.log(`ServiceWorker: cache ${cacheName} dihapus`);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
