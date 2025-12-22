var CACHE_NAME = 'vulnexal-v3-clean';
var CACHE_URLS = [
  '/',
  '/index.html',
  '/dashboard.html',
  '/signup.html',
  '/forgot-password.html',
  '/vulnerabilities-info.html',
  '/style.css',
  '/modal.js',
  '/validation.js',
  '/auth-manager.js',
  '/pwa.js',
  '/favicon.svg',
  'https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/css/bootstrap.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.11.0/font/bootstrap-icons.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/js/bootstrap.bundle.min.js'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(CACHE_URLS);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(names) {
      return Promise.all(
        names.map(function(name) {
          if (name !== CACHE_NAME) {
            return caches.delete(name);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', function(event) {
  var url = event.request.url;
  
  if (url.includes('firebasejs') || 
      url.includes('googleapis') || 
      url.includes('firebaseio') || 
      url.includes('gstatic') ||
      event.request.method !== 'GET') {
    return;
  }

  event.respondWith(
    caches.match(event.request).then(function(cached) {
      if (cached) {
        return cached;
      }

      return fetch(event.request).then(function(response) {
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }

        var toCache = response.clone();
        caches.open(CACHE_NAME).then(function(cache) {
          cache.put(event.request, toCache);
        });

        return response;
      }).catch(function() {
        return caches.match('/index.html');
      });
    })
  );
});
