importScripts('js/lib/workbox-sw.js');

if (workbox) {
  console.log('Workbox berhasil dimuat');
  
  workbox.precaching.precacheAndRoute([
    { url: '/css/materialize.min.css', revision: '1' },
    { url: '/css/style.css', revision: '1' },
    { url: '/icon/android-chrome-192x192.png', revision: '1' },
    { url: '/icon/android-chrome-512x512.png', revision: '1' },
    { url: '/icon/apple-touch-icon.png', revision: '1' },
    { url: '/icon/favicon-16x16.png', revision: '1' },
    { url: '/icon/favicon-32x32.png', revision: '1' },
    { url: '/js/api/api.js', revision: '1' },
    { url: '/js/lib/idb.js', revision: '1' },
    { url: '/js/lib/materialize.min.js', revision: '1' },
    { url: '/js/lib/workbox-sw.js', revision: '1' },
    { url: '/js/pages/loadJadwal.js', revision: '1' },
    { url: '/js/pages/loadJadwalYangDisimpan.js', revision: '1' },
    { url: '/js/pages/loadKelasemen.js', revision: '1' },
    { url: '/js/utils/db.js', revision: '1' },
    { url: '/js/utils/loading.js', revision: '1' },
    { url: '/js/utils/urlBase64ToUint8Array.js', revision: '1' },
    { url: '/js/loadPage.js', revision: '1' },
    { url: '/js/main.js', revision: '1' },
    { url: '/js/nav.js', revision: '1' },
    { url: '/favicon.ico', revision: '1' },
    { url: '/index.html', revision: '1' },
    { url: '/manifest.json', revision: '1' },
    { url: '/nav.html', revision: '1' },
    { url: '/service-worker.js', revision: '1' }
  ], {
    ignoreURLParametersMatching: [/.*/]
  });

  workbox.routing.registerRoute(
    ({url}) => url.origin === 'https://api.football-data.org',
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: 'api',
      plugins: [
        new workbox.expiration.ExpirationPlugin({
          maxAgeSeconds: 60 * 60 * 24 * 365
        })
      ]
    })
  );

  workbox.routing.registerRoute(
    ({url}) => url.origin === 'https://upload.wikimedia.org',
    new workbox.strategies.CacheFirst({
      cacheName: 'icon-club'
    })
  );

  workbox.routing.registerRoute(
    new RegExp('/pages/'),
    new workbox.strategies.CacheFirst({
      cacheName: 'pages'
    })
  );
}
else {
  console.log('Workbox gagal dimuat');
}

self.addEventListener('push', event => {
  let body;
  
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload';
  }

  const options = {
    body: body,
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };

  event.waitUntil( self.registration.showNotification('Push Notification', options) );
});
