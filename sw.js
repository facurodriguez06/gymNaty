const CACHE_NAME = "gym-rutina-v14"; // Incrementar versión para forzar actualización
const urlsToCache = [
  "./",
  "./index.html",
  "./styles.css",
  "./script.js",
  "./favicon.svg",
];

self.addEventListener("install", (event) => {
  self.skipWaiting(); // Force activation
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    }),
  );
});

// Network First Strategy: siempre intenta buscar del servidor primero
// Solo usa caché si no hay conexión (para que funcione offline)
self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Si la respuesta es válida, guardarla en caché y devolverla
        if (response && response.status === 200) {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
        }
        return response;
      })
      .catch(() => {
        // Si falla la red, usar el caché (modo offline)
        return caches.match(event.request);
      }),
  );
});

self.addEventListener("activate", (event) => {
  // Eliminar cachés viejos
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              console.log("Eliminando caché viejo:", cacheName);
              return caches.delete(cacheName);
            }
          }),
        );
      })
      .then(() => {
        return self.clients.claim(); // Take control immediately
      }),
  );
});
