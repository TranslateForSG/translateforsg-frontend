const { registerRoute } = workbox.routing;
const { NetworkFirst, CacheFirst } = workbox.strategies;

workbox.core.setCacheNameDetails({ prefix: "TranslateForSG" });

workbox.core.skipWaiting();
workbox.core.clientsClaim();

registerRoute(
  ({ url }) => url.pathname.startsWith('/api/'),
  new NetworkFirst()
);

registerRoute(
  ({ url }) => url.hostname === 'storage.googleapis.com' && url.pathname.startsWith('/translateforsg-data/'),
  new CacheFirst()
);

self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});