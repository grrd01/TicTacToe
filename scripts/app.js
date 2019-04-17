/**
 * grrd's Tic Tac Toe
 * Copyright (c) 2018 Gerard Tyedmers, grrd@gmx.net
 * @license MPL-2.0
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

/*jslint browser:true, long: true, devel: true */

(function () {
    "use strict";

    // Localization
    var nLang = 0;
    var lLoc = [{
        desc: "grrd's Tic Tac Toe is a HTML5 Game that works offline",
        players: "2 Players",
        easy: "Easy",
        medium: "Medium",
        hard: "Hard",
        instr: "Who is the first to get 3 fields in a line?",
        dev: "Developed by Gérard Tyedmers.",
        puzzle: "Don't miss",
        dice: "Have a look at",
        row: "Try",
        begin: "begins",
        play: "plays",
        win: "wins",
        draw: "draw",
        player: "Player",
        won: "has won!",
        score: "Score:",
        draw2: "This game ends in a draw."
    }, {
        desc: "grrd's Tic Tac Toe ist ein HTML5 Spiel, welches offline funktioniert",
        players: "2 Spieler",
        easy: "Einfach",
        medium: "Mittel",
        hard: "Schwierig",
        instr: "Wer besetzt zuerst drei Felder in einer Linie?",
        dev: "Entwickelt von Gérard Tyedmers.",
        puzzle: "Probier auch",
        dice: "oder",
        row: "und",
        begin: "beginnt",
        play: "spielt",
        win: "gewinnt",
        draw: "unentschieden",
        player: "Spieler",
        won: "hat gewonnen!",
        score: "Resultat:",
        draw2: "Diese Partie endet unentschieden."
    }, {
        desc: "grrd's Tic Tac Toe est un jeu HTML5 qui fonctionne hors ligne",
        players: "2 Joueurs",
        easy: "Facile",
        medium: "Moyen",
        hard: "Dur",
        instr: "Qui est le premier à obtenir 3 champs dans une ligne?",
        dev: "Développé par Gérard Tyedmers.",
        puzzle: "Ne manquez pas",
        dice: "Jetez un coup d'oeil à",
        row: "Essayez ",
        begin: "commence",
        play: "joue",
        win: "gagne",
        draw: "nul",
        player: "Joueur",
        won: "a gagné!",
        score: "Résultat:",
        draw2: "Ce jeu se termine par un match nul."
    }];

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
    var nStartPlayer = 0;
    var lPlayers = ["human", "human"];
    var lImages = ["x.svg", "o.svg"];
    var lGewonnen;
    var lAnzGewonnen = [0, 0];
    var bWait = false;

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
        return lScore;
    }

    // Wohin spielen?
    function fAI() {
        var rHighScore = {nScore: -1, nRow: undefined, nCol: undefined};
        var lHighScore = [];
        var nRandom;
        var nBest;
        var nSecond;
        var nAnzBest;
        var nAnzSecond;
        var nPlay;
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
        // Zusatzregel 3: Falls dem Gegner die Mitte und eine Ecke und mir die gegenüberliegende Ecke gehört, nicht in Rand Mitte spielen
        if (lPlayers[nCurrentPlayer] === "hard" && lUsed.length === 3 && lGame[1][1] === 1 - nCurrentPlayer && (
            (lGame[0][0] === nCurrentPlayer && lGame[2][2] === 1 - nCurrentPlayer) ||
            (lGame[0][2] === nCurrentPlayer && lGame[2][0] === 1 - nCurrentPlayer) ||
            (lGame[2][0] === nCurrentPlayer && lGame[0][2] === 1 - nCurrentPlayer) ||
            (lGame[2][2] === nCurrentPlayer && lGame[0][0] === 1 - nCurrentPlayer)
        )) {
            lScore[0][1] = 0;
            lScore[1][0] = 0;
            lScore[1][2] = 0;
            lScore[2][1] = 0;
            lScoreOpponent[0][1] = 0;
            lScoreOpponent[1][0] = 0;
            lScoreOpponent[1][2] = 0;
            lScoreOpponent[2][1] = 0;
        }
        // Rangliste der Möglichkeiten erstellen
        var nMyHighScore = 0;
        lScore.forEach(function (lScoreRow) {
            lScoreRow.forEach(function (nScoreCol) {
                if (nScoreCol > nMyHighScore) {
                    nMyHighScore = nScoreCol;
                }
            });
        });
        lScoreOpponent.forEach(function (lScoreOpponentRow, nIndexRow) {
            lScoreOpponentRow.forEach(function (nScoreOpponentCol, nIndexCol) {
                if (nScoreOpponentCol !== undefined) {
                    // falls Wert des Feldes für den Gegner grösser ist als mein höchster Wert und ich nicht gewinnen kann, Wert des Gegners übernahmen
                    if (nScoreOpponentCol > nMyHighScore && nMyHighScore < 37) {
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
        if (lPlayers[nCurrentPlayer] !== "human") {
            // falls jetzt Computer dran ist
            bWait = true;
            setTimeout(function () {
                bWait = false;
                if (lPlayers[nCurrentPlayer] === "easy") {
                    // 1 zu 100%
                    nRandom = 1;
                    nRandom = Math.min(nRandom, lHighScore.length - 1);
                }
                if (lPlayers[nCurrentPlayer] === "medium") {
                    // 0 oder 1 zu 66% / 33%
                    nRandom = Math.floor(Math.random() * 3);
                    if (nRandom > 1) {
                        nRandom -= 1;
                    }
                    nRandom = Math.min(nRandom, lHighScore.length - 1);
                }
                if (lPlayers[nCurrentPlayer] === "hard") {
                    nRandom = 0;
                }
                // Falls mehrere Felder die gleiche Wertung haben, zufällig eines davon auswählen
                nBest = lHighScore[0].nScore;
                nAnzBest = lHighScore.filter((rHighScore) => rHighScore.nScore >= nBest).length;
                if (lHighScore.filter((rHighScore) => rHighScore.nScore < nBest).length > 0) {
                    nSecond = lHighScore.filter((rHighScore) => rHighScore.nScore < nBest)[0].nScore;
                } else {
                    nSecond = nBest;
                }
                nAnzSecond = lHighScore.filter((rHighScore) => rHighScore.nScore >= nSecond).length;
                if (nRandom === 0) {
                    nPlay = Math.floor(Math.random() * nAnzBest);
                } else {
                    nPlay = Math.floor(Math.random() * nAnzSecond);
                }
                document.querySelectorAll("[data-row='" + lHighScore[nPlay].nRow + "'][data-col='" + lHighScore[nPlay].nCol + "']")[0].click();
            }, 500);
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
            fSetMessage(nCurrentPlayer, " " + lLoc[nLang].win);
            Array.from(document.getElementsByClassName("svg-xo")).forEach(function (rSVG) {
                rSVG.classList.add("svg-xo-dimmed");
            });
            Array.from(lGewonnen).forEach(function (rGewonnen) {
                document.querySelectorAll("[data-row='" + rGewonnen[0] + "'][data-col='" + rGewonnen[1] + "'] > img")[0].classList.remove("svg-xo-dimmed");
                document.querySelectorAll("[data-row='" + rGewonnen[0] + "'][data-col='" + rGewonnen[1] + "'] > img")[0].classList.add("svg-xo-highlight");
            });
            popupScore.getElementsByClassName("popup-content")[0].innerText = lLoc[nLang].player + " " + (nCurrentPlayer + 1) + " " + lLoc[nLang].won;
            popupScore.getElementsByClassName("popup-content")[1].innerText = lLoc[nLang].score + " " + lAnzGewonnen[0] + " : " + lAnzGewonnen[1];
            popupScore.classList.remove("popup-init");
            popupScore.classList.remove("popup-hide");
            popupScore.classList.add("popup-show-slow");
        } else if (lGame.findIndex((x) => x.includes(undefined)) < 0) {
            fSetMessage(undefined, lLoc[nLang].draw);
            popupScore.getElementsByClassName("popup-content")[0].innerText = lLoc[nLang].draw2;
            popupScore.getElementsByClassName("popup-content")[1].innerText = lLoc[nLang].score + " " + lAnzGewonnen[0] + " : " + lAnzGewonnen[1];
            popupScore.classList.remove("popup-init");
            popupScore.classList.remove("popup-hide");
            popupScore.classList.add("popup-show-draw");
        } else {
            nCurrentPlayer = 1 - nCurrentPlayer;
            fSetMessage(nCurrentPlayer, " " + lLoc[nLang].play);
            fAI();
        }
    }

    // Click auf ein Panel
    function fClickPanel(event) {
        if (event.target.nodeName === "DIV" && bWait === false) {
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
        document.getElementById("iPopupScore").classList.remove("popup-show-draw");
        document.getElementById("iPopupScore").classList.add("popup-hide");
        nCurrentPlayer = nStartPlayer;
        nStartPlayer = 1 - nStartPlayer;
        fSetMessage(nCurrentPlayer, " " + lLoc[nLang].begin);
        fAI();
    }

    // zu Spielpanel wechseln
    function fStartGame(event) {
        lPlayers[1] = event.target.getAttribute("data-payer2");
        nStartPlayer = 0;
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

    function urlQuery(query) {
        query = query.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        var expr = "[\\?&]" + query + "=([^&#]*)";
        var regex = new RegExp(expr);
        var results = regex.exec(window.location.href);
        if (results !== null) {
            return results[1];
        } else {
            return false;
        }
    }

    function fInit() {
        // Localize
        // Example usage - https://grrd01.github.io/TicTacToe/?lang=en
        const cLang = (urlQuery("lang") || navigator.language || navigator.browserLanguage || (navigator.languages || ["en"])[0]).substring(0, 2).toLowerCase();
        document.documentElement.setAttribute('lang', cLang);
        if (cLang === "de") {
            nLang = 1;
        } else if (cLang === "fr") {
            nLang = 2;
        }
        document.getElementById("i2Players").getElementsByTagName("div")[0].innerHTML = lLoc[nLang].players.replace(/ /g, '\u00a0');
        document.getElementById("iEasy").getElementsByTagName("div")[0].innerHTML = lLoc[nLang].easy;
        document.getElementById("iMedium").getElementsByTagName("div")[0].innerHTML = lLoc[nLang].medium;
        document.getElementById("iHard").getElementsByTagName("div")[0].innerHTML = lLoc[nLang].hard;
        document.getElementById("iInfoBody").getElementsByTagName("div")[0].innerHTML = lLoc[nLang].instr;
        document.getElementById("iInfoBody").getElementsByTagName("div")[2].innerHTML = lLoc[nLang].dev;
        document.getElementById("iPuzzle").innerHTML = lLoc[nLang].puzzle;
        document.getElementById("iDice").innerHTML = lLoc[nLang].dice;
        document.getElementById("iRow").innerHTML = lLoc[nLang].row;
        document.querySelector('meta[name="description"]').setAttribute("content", lLoc[nLang].desc);
        
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