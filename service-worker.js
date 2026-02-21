const CACHE_NAME = "douglas-player-v1";

const urlsToCache = [
  "./",
  "./index.html",
  "./manifest.json",
  "https://cdn.jsdelivr.net/npm/jsmediatags@3.9.7/dist/jsmediatags.min.js"
];

self.addEventListener("install", event=>{
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache=>cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

self.addEventListener("activate", event=>{
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", event=>{
  event.respondWith(
    caches.match(event.request).then(r=>r||fetch(event.request))
  );
});
