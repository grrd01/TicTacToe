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
    var eDiv;
    var eImg;

    // aktueller Spieler
    var nCurrentPlayer = 0;
    var lPlayers = ["human", "human"];
    var lImages = ["x.svg", "o.svg"];
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

    // Wohin spielen?
    function fAIscore() {
        var lScore = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
        var lSet;
        var nScore;
        const lDrei = [0, 1, 2];

        nScore = 0;
        lDrei.forEach(function (ignore, nIndex3) {
            // horizontal -
            lSet = [lGame[nIndex3][0], lGame[nIndex3][1], lGame[nIndex3][2]];
            if (lSet.filter((x) => x === (1 - nCurrentPlayer)).length === 0) {
                // falls kein feld dem gegner gehört, 3pt pro eigenes feld, 1pt pro leeres feld
                nScore = lSet.filter((x) => x === undefined).length + Math.pow(lSet.filter((x) => x === nCurrentPlayer).length * 3, 2);
                lScore[nIndex3][0] += nScore;
                lScore[nIndex3][1] += nScore;
                lScore[nIndex3][2] += nScore;
            }
        });
        lDrei.forEach(function (ignore, nIndex3) {
            // vertikal   |
            lSet = [lGame[0][nIndex3], lGame[1][nIndex3], lGame[2][nIndex3]];
            if (lSet.filter((x) => x === (1 - nCurrentPlayer)).length === 0) {
                // falls kein feld dem gegner gehört, 3pt pro eigenes feld, 1pt pro leeres feld
                nScore = lSet.filter((x) => x === undefined).length + Math.pow(lSet.filter((x) => x === nCurrentPlayer).length * 3, 2);
                lScore[0][nIndex3] += nScore;
                lScore[1][nIndex3] += nScore;
                lScore[2][nIndex3] += nScore;
            }
        });
        // diagonal   \
        lSet = [lGame[0][0], lGame[1][1], lGame[2][2]];
        if (lSet.filter((x) => x === (1 - nCurrentPlayer)).length === 0) {
            // falls kein feld dem gegner gehört, 3pt pro eigenes feld, 1pt pro leeres feld
            nScore = lSet.filter((x) => x === undefined).length + Math.pow(lSet.filter((x) => x === nCurrentPlayer).length * 3, 2);
            lScore[0][0] += nScore;
            lScore[1][1] += nScore;
            lScore[2][2] += nScore;
        }
        // diagonal   /
        lSet = [lGame[0][2], lGame[1][1], lGame[2][0]];
        if (lSet.filter((x) => x === (1 - nCurrentPlayer)).length === 0) {
            // falls kein feld dem gegner gehört, 3pt pro eigenes feld, 1pt pro leeres feld
            nScore = lSet.filter((x) => x === undefined).length + Math.pow(lSet.filter((x) => x === nCurrentPlayer).length * 3, 2);
            lScore[0][2] += nScore;
            lScore[1][1] += nScore;
            lScore[2][0] += nScore;
        }
        // besetzte felder sperren
        lGame.forEach(function (rRow, nIndexRow) {
            rRow.forEach(function (ignore, nIndexCol) {
                // gehört das Feld einem Spieler? wenn nein abbrechen
                if (lGame[nIndexRow][nIndexCol] !== undefined) {
                    lScore[nIndexRow][nIndexCol] = undefined;
                }
            });
        });
        console.log(lScore);
        return lScore;
    }

    // Wohin spielen?
    function fAI() {
        var rHighScore = {nScore: -1, nRow: undefined, nCol: undefined};
        var lHighScore = [];
        var nRandom;
        var lUsed = [];
        // Wert der Felder für aktuellen Spieler ermitteln
        var lScore = fAIscore();
        // Wert der Felder für Gegner ermitteln, dort spielen, falls höher als eigener Wert
        nCurrentPlayer = 1 - nCurrentPlayer;
        var lScoreOpponent = fAIscore();
        nCurrentPlayer = 1 - nCurrentPlayer;
        // besetzte felder zählen
        lGame.forEach(function (rRow, nIndexRow) {
            rRow.forEach(function (ignore, nIndexCol) {
                // gehört das Feld einem Spieler? wenn nein abbrechen
                if (lGame[nIndexRow][nIndexCol] !== undefined) {
                    lUsed.push({nPlayer: lGame[nIndexRow][nIndexCol], nRow: nIndexRow, nCol: nIndexCol});
                }
            });
        });
        // Zusatzregel 1: Falls dem Gegner zwei gegenüberliegende Ecken gehören und mir die mitte, nicht in Ecke spielen
        if (lUsed.length === 3 && lGame[1][1] === nCurrentPlayer) {
            if (lGame[0][0] === 1 - nCurrentPlayer && lGame[2][2] === 1 - nCurrentPlayer) {
                lScore[0][2] = 0;
                lScore[2][0] = 0;
                lScoreOpponent[0][2] = 0;
                lScoreOpponent[2][0] = 0;
            }
            if (lGame[0][2] === 1 - nCurrentPlayer && lGame[2][0] === 1 - nCurrentPlayer) {
                lScore[0][0] = 0;
                lScore[2][2] = 0;
                lScoreOpponent[0][0] = 0;
                lScoreOpponent[2][2] = 0;
            }
        }
        // Zusatzregel 2: Falls dem Gegner die Mitte und mir eine Ecke gehört, gegenüber spielen
        if (lUsed.length === 2 && lGame[1][1] === 1 - nCurrentPlayer) {
            if (lGame[0][0] === nCurrentPlayer) {
                lScore[2][2] = 1000;
            }
            if (lGame[0][2] === nCurrentPlayer) {
                lScore[2][0] = 1000;
            }
            if (lGame[2][0] === nCurrentPlayer) {
                lScore[0][2] = 1000;
            }
            if (lGame[2][2] === nCurrentPlayer) {
                lScore[0][0] = 1000;
            }
        }
        // Rangliste der Möglichkeiten erstellen
        var nMyHighScore = 0;
        lScore.forEach(function (lScoreRow, nIndexRow) {
            lScoreRow.forEach(function (nScoreCol, nIndexCol) {
                if (nScoreCol > nMyHighScore) {
                    nMyHighScore = nScoreCol;
                }
            });
        });
        lScoreOpponent.forEach(function (lScoreOpponentRow, nIndexRow) {
            lScoreOpponentRow.forEach(function (nScoreOpponentCol, nIndexCol) {
                if (nScoreOpponentCol !== undefined) {
                    if (nScoreOpponentCol > nMyHighScore) {
                        rHighScore.nScore = nScoreOpponentCol;
                    } else {
                        rHighScore.nScore = lScore[nIndexRow][nIndexCol];
                    }
                    rHighScore.nRow = nIndexRow;
                    rHighScore.nCol = nIndexCol;
                    lHighScore.push({nScore: rHighScore.nScore, nRow: nIndexRow, nCol: nIndexCol});
                }
            });
        });
        lHighScore.sort(function (a, b) {
            return b.nScore - a.nScore;
        });
        console.log(lHighScore);
        if (lPlayers[nCurrentPlayer] === "easy") {
            nRandom = Math.floor(Math.random() * 3);
            document.querySelectorAll("[data-row='" + lHighScore[nRandom].nRow + "'][data-col='" + lHighScore[nRandom].nCol + "']")[0].click();
        }
        if (lPlayers[nCurrentPlayer] === "medium") {
            nRandom = Math.floor(Math.random() * 2);
            document.querySelectorAll("[data-row='" + lHighScore[nRandom].nRow + "'][data-col='" + lHighScore[nRandom].nCol + "']")[0].click();
        }
        if (lPlayers[nCurrentPlayer] === "hard") {
            document.querySelectorAll("[data-row='" + lHighScore[0].nRow + "'][data-col='" + lHighScore[0].nCol + "']")[0].click();
        }

    }

    // Nachricht über Spiel-Grid setzen
    function fSetMessage(nPlayer, cMsg) {
        var eMessage = document.getElementById("iMessage");
        while (eMessage.firstChild) {
            eMessage.removeChild(eMessage.firstChild);
        }
        if (nPlayer !== undefined) {
            eImg = document.createElement("img");
            eImg.setAttribute("src", "images/" + lImages[nPlayer]);
            eImg.setAttribute("class", "text-img");
            eMessage.appendChild(eImg);
        }
        eMessage.innerHTML = eMessage.innerHTML + cMsg;
    }


    // hat jemand gewonnen? endet das spiel unentschieden?
    function fCheckGame() {
        var popupScore = document.getElementById("iPopupScore");
        if (fCheckGewonnen()) {
            lAnzGewonnen[nCurrentPlayer] += 1;
            fSetMessage(nCurrentPlayer, " wins");
            Array.from(document.getElementsByClassName("svg-xo")).forEach(function (rSVG) {
                rSVG.classList.add("svg-xo-dimmed");
            });
            Array.from(lGewonnen).forEach(function (rGewonnen) {
                document.querySelectorAll("[data-row='" + rGewonnen[0] + "'][data-col='" + rGewonnen[1] + "'] > img")[0].classList.remove("svg-xo-dimmed");
            });
            popupScore.getElementsByClassName("popup-content")[0].innerText = "Player " + (nCurrentPlayer + 1) + " has won!";
            popupScore.getElementsByClassName("popup-content")[1].innerText = "Score: " + lAnzGewonnen[0] + " : " + lAnzGewonnen[1];
            popupScore.classList.remove("popup-init");
            popupScore.classList.remove("popup-hide");
            popupScore.classList.add("popup-show-slow");
        } else if (lGame.findIndex((x) => x.includes(undefined)) < 0) {
            fSetMessage(undefined, "Draw");
            popupScore.getElementsByClassName("popup-content")[0].innerText = "This game ends in a draw.";
            popupScore.getElementsByClassName("popup-content")[1].innerText = "Score: " + lAnzGewonnen[0] + " : " + lAnzGewonnen[1];
            popupScore.classList.remove("popup-init");
            popupScore.classList.remove("popup-hide");
            popupScore.classList.add("popup-show-slow");
        } else {
            nCurrentPlayer = 1 - nCurrentPlayer;
            fSetMessage(nCurrentPlayer, " plays");
            fAI();
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
        document.getElementById("iPopupScore").classList.remove("popup-show-slow");
        document.getElementById("iPopupScore").classList.add("popup-hide");
        nCurrentPlayer = 0;
        fSetMessage(nCurrentPlayer, " begins");
        fAI();
    }

    // zu Spielpanel wechseln
    function fStartGame() {
        lPlayers[1] = event.target.getAttribute("data-payer2");
        document.getElementById("iTitle").classList.remove("swipe-out-right");
        document.getElementById("iGame").classList.remove("swipe-in-left");
        document.getElementById("iTitle").classList.add("swipe-out");
        document.getElementById("iGame").classList.add("swipe-in");
        fResetGame();
    }

    // Spiel verlassen
    function fQuitGame() {
        fResetGame();
        lAnzGewonnen = [0, 0];
        document.getElementById("iTitle").classList.remove("swipe-out");
        document.getElementById("iGame").classList.remove("swipe-in");
        document.getElementById("iTitle").classList.add("swipe-out-right");
        document.getElementById("iGame").classList.add("swipe-in-left");
    }

    // Popup Info
    function fShowPopupInfo() {
        document.getElementById("iPopupInfo").classList.remove("popup-init");
        document.getElementById("iPopupInfo").classList.remove("popup-hide");
        document.getElementById("iPopupInfo").classList.add("popup-show");
    }
    function fHidePopupInfo() {
        document.getElementById("iPopupInfo").classList.remove("popup-show");
        document.getElementById("iPopupInfo").classList.add("popup-hide");
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

        // Click-Handler auf die Buttons & Panels legen
        document.getElementById("iInfo").addEventListener("click", fShowPopupInfo);
        document.getElementById("iInfoClose").addEventListener("click", fHidePopupInfo);
        Array.from(document.getElementsByClassName("list-button")).forEach(function (rButton) {
            rButton.addEventListener("click", fStartGame);
        });
        document.getElementById("iClose").addEventListener("click", fQuitGame);
        Array.from(lPanel).forEach(function (rPanel) {
            rPanel.addEventListener("click", fClickPanel);
        });
        document.getElementById("iOK").addEventListener("click", fResetGame);
    }

    fInit();

}());