var CACHE = 'putting-tempo-v26';
var ASSETS = ['./', './index.html', './manifest.webmanifest', './icons/icon-192.png', './icons/icon-512.png', './icons/apple-touch-icon.png', './sounds/metronome_start.wav','./sounds/metronome_impact.wav','./sounds/bat_start.wav','./sounds/bat_impact.wav','./sounds/deskbell_start.wav','./sounds/deskbell_impact.wav','./sounds/glock_start.wav','./sounds/glock_impact.wav','./sounds/bike_start.wav','./sounds/bike_impact.wav','./sounds/cowbell_start.wav','./sounds/cowbell_impact.wav','./sounds/bowl_start.wav','./sounds/bowl_impact.wav','./sounds/snap_start.wav','./sounds/snap_impact.wav','./sounds/marimba_start.wav','./sounds/marimba_impact.wav','./sounds/kalimba_start.wav','./sounds/kalimba_impact.wav','./sounds/retro_start.wav','./sounds/retro_impact.wav','./sounds/drip_start.wav','./sounds/drip_impact.wav','./sounds/pingpong_start.wav','./sounds/pingpong_impact.wav','./sounds/keyboard_start.wav','./sounds/keyboard_impact.wav','./sounds/wood_start.wav','./sounds/wood_impact.wav','./sounds/comic_start.wav','./sounds/comic_impact.wav'];

self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(ASSETS); }).then(function () { return self.skipWaiting(); }));
});

self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});

// Network first (so updates show up), fall back to cache offline. Fonts are cached as they are fetched.
self.addEventListener('fetch', function (e) {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request).then(function (res) {
      var copy = res.clone();
      caches.open(CACHE).then(function (c) { c.put(e.request, copy); });
      return res;
    }).catch(function () { return caches.match(e.request); })
  );
});
