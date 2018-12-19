/*
 * grrd's Tic Tac Toe
 * Copyright (c) 2018 Gerard Tyedmers, grrd@gmx.net
 * Licensed under the MPL License
 */

/*jslint browser:true, long: true, devel: true */

(function () {
    "use strict";

    // Spielfeld
    const nRows = 3;
    const nCols = 3;
    //var lGame = new Array(nRows).fill(undefined).map(row => new Array(nCols).fill(undefined));
    var lGame = Array.from(new Array(nRows), () => new Array(nCols).fill(undefined));

    // HTML-Elemente
    const lPanel = document.getElementsByClassName("grid-item");
    const lImages = ["x.svg", "o.svg"];
    var eDiv;
    var eImg;

    // aktueller Spieler
    var nCurrentPlayer = 0;
    var lGewonnen;
    var lAnzGewonnen = [0, 0];

    function fCheckGewonnen() {
        // Richtungen zum Prüfen auf Sieg: - | \ /
        const lDirections = [[1, 0], [0, 1], [1, 1], [1, -1]];
        var bGewonnen = false;
        lGewonnen = [];

        lGame.forEach(function (rRow, nIndexRow) {
            rRow.forEach(function (ignore, nIndexCol) {
                // gehört das Feld dem Spieler? wenn nein abbrechen
                if (!(lGame[nIndexRow][nIndexCol] !== nCurrentPlayer)) {
                    lDirections.forEach(function (ignore, nIndexDir) {
                        // gehören in irgendeine Richtung dem Spieler drei Felder
                        if ((lGame[nIndexRow + lDirections[nIndexDir][0]] !== undefined) && (lGame[nIndexRow + (lDirections[nIndexDir][0] * 2)] !== undefined) &&
                                (lGame[nIndexRow + lDirections[nIndexDir][0]][nIndexCol + lDirections[nIndexDir][1]] === nCurrentPlayer) &&
                                (lGame[nIndexRow + (lDirections[nIndexDir][0] * 2)][nIndexCol + (lDirections[nIndexDir][1] * 2)] === nCurrentPlayer)) {
                            lGewonnen.push([nIndexRow, nIndexCol]);
                            lGewonnen.push([nIndexRow + lDirections[nIndexDir][0], nIndexCol + lDirections[nIndexDir][1]]);
                            lGewonnen.push([nIndexRow + (lDirections[nIndexDir][0] * 2), nIndexCol + (lDirections[nIndexDir][1] * 2)]);
                            bGewonnen = true;
                        }
                    });
                }
            });
        });
        return bGewonnen;
    }

    // hat jemand gewonnen? endet das spiel unentschieden?
    function fCheckGame() {
        if (fCheckGewonnen()) {
            lAnzGewonnen[nCurrentPlayer] += 1;
            Array.from(document.getElementsByClassName("svg-xo")).forEach(function (rSVG) {
                rSVG.classList.add("svg-xo-dimmed");
            });
            Array.from(lGewonnen).forEach(function (rGewonnen) {
                document.querySelectorAll("[data-row='" + rGewonnen[0] + "'][data-col='" + rGewonnen[1] + "'] > img")[0].classList.remove("svg-xo-dimmed");
            });
            document.getElementsByClassName("popup-content")[0].innerText = "Spieler " + (nCurrentPlayer + 1) + " hat gewonnen!";
            document.getElementsByClassName("popup-content")[1].innerText = "Spieler 1: " + lAnzGewonnen[0] + " - Spieler 2: " + lAnzGewonnen[1];
            document.getElementsByClassName("popup")[0].classList.remove("popup-init");
            document.getElementsByClassName("popup")[0].classList.remove("popup-hide");
            document.getElementsByClassName("popup")[0].classList.add("popup-show");
        } else if (lGame.findIndex((x) => x.includes(undefined)) < 0) {
            document.getElementsByClassName("popup-content")[0].innerText = "Dieses Spiel endet unentschieden.";
            document.getElementsByClassName("popup-content")[1].innerText = "Spieler 1: " + lAnzGewonnen[0] + " - Spieler 2: " + lAnzGewonnen[1];
            document.getElementsByClassName("popup")[0].classList.remove("popup-init");
            document.getElementsByClassName("popup")[0].classList.remove("popup-hide");
            document.getElementsByClassName("popup")[0].classList.add("popup-show");
        } else {
            nCurrentPlayer = 1 - nCurrentPlayer;
        }
    }

    // Click auf ein Panel
    function fClickPanel(event) {
        if (event.target.nodeName === "DIV") {
            var nRow = event.target.getAttribute("data-row");
            var nCol = event.target.getAttribute("data-col");
            // Panel ist noch leer und Spiel läuft noch
            if (lGame[nRow][nCol] === undefined && !fCheckGewonnen()) {
                lGame[nRow][nCol] = nCurrentPlayer;
                eImg = document.createElement("img");
                eImg.setAttribute("class", "svg-xo");
                eImg.setAttribute("src", "images/" + lImages[nCurrentPlayer]);
                event.target.appendChild(eImg);
                fCheckGame();
            }
        }
    }

    // Spiel zurücksetzen
    function fResetGame() {
        Array.from(lPanel).forEach(function (rPanel) {
            while (rPanel.firstChild) {
                rPanel.removeChild(rPanel.firstChild);
            }
        });
        lGame.forEach(function (rRow, nIndexRow) {
            rRow.forEach(function (ignore, nIndexCol) {
                lGame[nIndexRow][nIndexCol] = undefined;
            });
        });
        document.getElementsByClassName("popup")[0].classList.remove("popup-show");
        document.getElementsByClassName("popup")[0].classList.add("popup-hide");
    }

    function fInit() {
        // ServiceWorker initialisieren
        if ("serviceWorker" in navigator) {
            window.addEventListener("load", function () {
                navigator.serviceWorker.register("sw.js").then(function (registration) {
                    console.log("ServiceWorker registration successful with scope: ", registration.scope);
                }, function (err) {
                    console.log("ServiceWorker registration failed: ", err);
                });
            });
        }
        // Spielfeld mit Panels füllen
        lGame.forEach(function (rRow, nIndexRow) {
            rRow.forEach(function (ignore, nIndexCol) {
                eDiv = document.createElement("div");
                eDiv.className = "grid-item";
                eDiv.setAttribute("data-row", nIndexRow.toString());
                eDiv.setAttribute("data-col", nIndexCol.toString());
                document.getElementsByClassName("grid-container")[0].appendChild(eDiv);
            });
        });

        // Click-Handler auf die Panels legen
        Array.from(lPanel).forEach(function (rPanel) {
            rPanel.addEventListener("click", fClickPanel);
        });
        document.getElementById("iOK").addEventListener("click", fResetGame);
    }

    fInit();

}());