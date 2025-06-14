const CACHE_NAME = 'zunaid-invoice-cache-v1';
// নিচের লাইনে আপনার রিপোজিটরির সঠিক নামটি দিন
const GITHUB_REPO_NAME = '/Zunaid-Invoice'; 

const urlsToCache = [
  `${GITHUB_REPO_NAME}/`,
  `${GITHUB_REPO_NAME}/index.html`,
  `${GITHUB_REPO_NAME}/style.css`,
  `${GITHUB_REPO_NAME}/script.js`,
  `${GITHUB_REPO_NAME}/manifest.json`,
  `${GITHUB_REPO_NAME}/icon-192.png`,
  `${GITHUB_REPO_NAME}/icon-512.png`,
  `${GITHUB_REPO_NAME}/pin-icon.png`,
  `${GITHUB_REPO_NAME}/advance-icon.png`,
  `${GITHUB_REPO_NAME}/delete-icon.png`,
  'https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap',
  'https://html2canvas.hertzen.com/dist/html2canvas.min.js',
  'https://cdn-icons-png.flaticon.com/512/1828/1828911.png',
  'https://cdn-icons-png.flaticon.com/512/1170/1170627.png',
  'https://cdn-icons-png.flaticon.com/512/6488/6488677.png',
  'https://cdn-icons-png.flaticon.com/512/9377/9377574.png'
];

// Install service worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache and caching files');
        return cache.addAll(urlsToCache);
      })
  );
  self.skipWaiting();
});

// Activate service worker and remove old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      ).then(() => self.clients.claim());
    })
  );
});

// Serve cached content when offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});
