---
---
    var CACHE_VERSION = 'rca-pa-v2';
	var CACHE_FILES = [
	    '/',
	    '/404',
	    '/offline',
	    '/assets/js/main.min.js',
		'/assets/css/main.min.css',
		'/assets/img/rca_logo--black.png',
		'/assets/img/rca_logo--white.png',
		'/assets/vendor/headroom.js/dist/headroom.min.js',
		'/assets/vendor/lazysizes/lazysizes.min.js',
		'/assets/vendor/smooth-scroll/dist/smooth-scroll.min.js',
	    '/assets/fonts/LaNord-SemiLight.otf'
	];


self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_VERSION).then(function(cache) {
            return cache.addAll(CACHE_FILES);
        })
    );
});

self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(keys) {
            return Promise.all(
                keys.map(function(key, i) {
                    if (key !== CACHE_VERSION) {
                        console.log('will delete ' + keys[i]);
                        return caches.delete(keys[i]);
                    }
                })
            )
        })
    )
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        // Try the cache
        caches.match(event.request).then(function(response) {
            // Fall back to network
            return response || fetch(event.request);
        }).catch(function() {
            // If both fail, show a generic fallback:
            return caches.match('/offline');
        })
    );
});
