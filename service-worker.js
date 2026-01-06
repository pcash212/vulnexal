var CACHE_NAME = 'vulnexal-v8';
var CACHE_URLS = [
  '/index.html',
  '/dashboard.html',
  '/signup.html',
  '/forgot-password.html',
  '/vulnerabilities-info.html',
  '/style.css',
  '/modal.js',
  '/validation.js',
  '/escape-helper.js',
  '/auth-manager.js',
  '/pwa.js',
  '/favicon.svg',
  '/icon-192.svg',
  '/icon-512.svg'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(CACHE_URLS);
      })
      .catch(function() {
        return Promise.resolve();
      })
  );
  self.skipWaiting();
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(names) {
      return Promise.all(
        names.filter(function(name) {
          return name !== CACHE_NAME;
        }).map(function(name) {
          return caches.delete(name);
        })
      );
    }).then(function() {
      return self.clients.claim();
    })
  );
});

self.addEventListener('fetch', function(event) {
  var req = event.request;
  var url = req.url;
  
  if (url.includes('firebase') || 
      url.includes('googleapis') || 
      url.includes('gstatic') ||
      url.includes('google.com') ||
      url.includes('cdnjs.cloudflare.com') ||
      req.method !== 'GET') {
    return;
  }

  event.respondWith(
    fetch(req)
      .then(function(response) {
        if (response && response.status === 200) {
          var clone = response.clone();
          caches.open(CACHE_NAME).then(function(cache) {
            cache.put(req, clone);
          });
        }
        return response;
      })
      .catch(function() {
        return caches.match(req).then(function(cached) {
          if (cached) return cached;
          if (req.mode === 'navigate') {
            return caches.match('/index.html');
          }
          return new Response('Offline', { status: 503 });
        });
      })
  );
});
