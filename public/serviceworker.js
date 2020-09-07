const CACHE_NAME = "Version-1";

// offline.html is for the no internet cases
const urlsToCache = ["index.html", "offline.html"];

const self = this;

// Install service worker
//self means here the service worker itself
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache");

      return cache.addAll(urlsToCache);
    })
  );
});

// listen for requests
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then(() => {
      return fetch(event.request).catch(() => caches.match("offline.html"));
    })
  );
});

// Activate the service worker
self.addEventListener("activate", (event) => {
  const cacheWhiteList = [];
  cacheWhiteList.push(CACHE_NAME); // It will always keep the whitelisted version

  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          // if cache name does not exist in the white list delete that cache
          if (!cacheWhiteList.includes(cacheName)) {
            return caches.delete(cacheName);
            // we r only keeping the specific cache version we need which is Version-1
          }
        })
      )
    )
  );
});
