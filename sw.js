/*
 * grrd's Tic Tac Toe
 * Copyright (c) 2018 Gerard Tyedmers, grrd@gmx.net
 * Licensed under the MPL License
 */

/*jslint devel: true, browser: true, long: true */ /*global self fetch */

var CACHE_NAME = "grrds-tictactoe-cache";
var CACHE_VERSION = "v1.0";
var CACHE = CACHE_NAME + "-" + CACHE_VERSION;

var urlsToCache = [
    "index.html",
    "images/2online.svg",
    "images/2player.svg",
    "images/4inarow.svg",
    "images/dice.svg",
    "images/easy.svg",
    "images/favicon.ico",
    "images/hard.svg",
    "images/info.svg",
    "images/mail.svg",
    "images/medium.svg",
    "images/o.svg",
    "images.puzzle.svg",
    "images/x.svg",
    "scripts/app.js",
    "styles/app.css"
];

self.addEventListener("install", function (event) {
    "use strict";
    // Perform install steps
    event.waitUntil(
        caches.open(CACHE).then(function (cache) {
            console.log("Opened cache");
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener("fetch", function (event) {
    "use strict";
    event.respondWith(
        caches.match(event.request).then(function (response) {
            // Cache hit - return response
            if (response) {
                return response;
            }

            // IMPORTANT: Clone the request. A request is a stream and
            // can only be consumed once. Since we are consuming this
            // once by cache and once by the browser for fetch, we need
            // to clone the response.
            var fetchRequest = event.request.clone();

            return fetch(fetchRequest).then(
                function (response) {
                    // Check if we received a valid response
                    if (!response || response.status !== 200 || response.type !== "basic") {
                        return response;
                    }

                    // IMPORTANT: Clone the response. A response is a stream
                    // and because we want the browser to consume the response
                    // as well as the cache consuming the response, we need
                    // to clone it so we have two streams.
                    var responseToCache = response.clone();

                    caches.open(CACHE).then(function (cache) {
                        cache.put(event.request, responseToCache);
                    });

                    return response;
                }
            );
        })
    );
});

self.addEventListener("activate", function (event) {
    "use strict";
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(cacheNames.map(function (cacheName) {
                if (cacheName.indexOf(CACHE_NAME) === 0 && cacheName.indexOf(CACHE_VERSION) === -1) {
                    console.log(cacheName + " deleted");
                    return caches.delete(cacheName);
                }
            }));
        })
    );
});
