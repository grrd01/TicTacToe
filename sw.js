/**
 * grrd's Tic Tac Toe
 * Copyright (c) 2018 Gerard Tyedmers, grrd@gmx.net
 * @license MPL-2.0
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

/*jslint devel: true, browser: true, long: true */ /*global self fetch */

const CACHE_NAME = "grrds-tictactoe-cache";
const CACHE_VERSION = "v1.22";
const CACHE = CACHE_NAME + "-" + CACHE_VERSION;

const urlsToCache = [
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
    "images/memo.svg",
    "images/o.svg",
    "images/ok.svg",
    "images/puzzle.svg",
    "images/reversi.svg",
    "images/ttt1.svg",
    "images/ttt2.svg",
    "images/ttt3.svg",
    "images/ttt4.svg",
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
            let fetchRequest = event.request.clone();

            return fetch(fetchRequest).then(
                function (response) {
                    // Check if we received a valid response
                    if (!response || response.status !== 200 || response.type !== "basic") {
                        return response;
                    }

                    // IMPORTANT: Clone the response. A response is a stream
                    // and because we want the browser to consume the response
                    // as well as the cache consuming the response, we need
                    // to clone it, so we have two streams.
                    let responseToCache = response.clone();

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
