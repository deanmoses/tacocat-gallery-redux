importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

const staticCacheName = 'static-resources-TIMESTAMP';

// Precache the assets actually needed to run the app
workbox.precaching.precacheAndRoute([
	{ url: './', revision: 'TIMESTAMP' },
	{ url: 'main.css?t=TIMESTAMP', revision: 'null' },
	{ url: 'bundle.js?t=TIMESTAMP', revision: 'null' }
]);

// Cache manifest.json
workbox.routing.registerRoute(
	/manifest\.json/,
	// CacheFirst = serve from cache else fall back to network
	new workbox.strategies.CacheFirst({
		// Use a custom cache name
		cacheName: staticCacheName,
	})
);

// Cache everything in /images/
workbox.routing.registerRoute(
	/images\//,
	// CacheFirst = serve from cache else fall back to network
	new workbox.strategies.CacheFirst({
		// Use a custom cache name
		cacheName: staticCacheName,
	})
);
