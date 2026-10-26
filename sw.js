// Lets the app open with no signal. Upload next to index.html.
const C = 'rh-v1';
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(clients.claim()));
self.addEventListener('fetch', e => {
  const r = e.request, u = new URL(r.url);
  if (r.method !== 'GET' || /script\.google|googleusercontent|nominatim/.test(u.host)) return;
  const keep = res => { const cp = res.clone(); caches.open(C).then(c => c.put(r, cp)); return res; };
  e.respondWith(u.origin === location.origin
    ? fetch(r).then(keep).catch(() => caches.match(r))
    : caches.match(r).then(hit => hit || fetch(r).then(keep)));
});