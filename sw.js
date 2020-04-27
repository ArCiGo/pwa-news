const staticAssets = [
  './',
  './style.css',
  './app.js'
];

self.addEventListener('install', async event => {
  const cache = await caches.open('news-static');
  cache.addAll(staticAssets);
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  const req = event.request;
  const url = new URL(req.url);
  console.log(url.origin)
  console.log(location.origin)

  if (url.origin === location.origin) {
    event.respondWith(cacheFirst(req));
    console.log('cache 1');
    
  } else {
    console.log('cache 2');
    event.respondWith(networkFirst(req))
  }

});

async function cacheFirst(req) {
  const cacheResponse = await caches.match(req);
  return cacheResponse || fetch(req)
}

async function networkFirst(req) {
  const dynamicCache = await caches.open('news-dynamic');

  try {
    console.log('and3')
    const res = await fetch(req);
    dynamicCache.put(req, res.clone());
    return res;
  } catch (error) {
    console.log('and')
    const cachedResponse = await dynamicCache.match(req);
    return cachedResponse || await caches.match('./fallback.json');
  }
}