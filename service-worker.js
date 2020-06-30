const CACHE_NAME = 'info-pl-v1';
const urlsToCache = [
  '/',
  '/js/api/api.js',
  '/service-worker.js',
  '/js/main.js',
  '/css/materialize.min.css',
  '/css/style.css',
  '/icon/android-chrome-192x192.png',
  '/icon/android-chrome-512x512.png',
  '/icon/apple-touch-icon.png',
  '/icon/favicon-16x16.png',
  '/icon/favicon-32x32.png',
  '/favicon.ico',
  '/js/pages/loadJadwal.js',
  '/js/pages/loadJadwalYangDisimpan.js',
  '/js/pages/loadKelasemen.js',
  '/js/utils/db.js',
  '/js/utils/loading.js',
  '/js/idb.js',
  '/js/loadPage.js',
  '/js/materialize.min.js',
  '/js/nav.js',
  '/js/uuidv4.min.js',
  '/pages/jadwal-yang-disimpan.html',
  '/pages/jadwal.html',
  '/pages/kelasemen.html',
  '/index.html',
  '/manifest.json',
  '/nav.html'
];

const API_TOKEN = '326e766c25414180b4cd22c1e4b187b4';
const API_URL = 'https://api.football-data.org/v2';

const headers = {
  'X-Auth-Token': API_TOKEN
};

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async cache => {
      const jadawalUrl = `${API_URL}/competitions/2021/matches?status=SCHEDULED`;
      const kelasemenUrl = `${API_URL}/competitions/2021/standings`;
      
      const resJadwal = await fetch(jadawalUrl, { headers });
      cache.put(jadawalUrl, resJadwal.clone());

      const resKelasemen = await fetch(kelasemenUrl, { headers })
      cache.put(kelasemenUrl, resKelasemen.clone());

      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches
      .match(event.request, { cacheName: CACHE_NAME })
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
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
