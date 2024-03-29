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
    let nLang = 0;
    const lLoc = [{
        desc: "grrd's Tic Tac Toe is a HTML5 Game that works offline",
        players: "2 Players",
        easy: "Easy",
        medium: "Medium",
        hard: "Hard",
        instr: "Who is the first to get 3 fields in a line?",
        dev: "Developed by Gérard Tyedmers.",
        puzzle: "Have a look at my other games:",
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
        puzzle: "Schau dir auch meine anderen Spiele an:",
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
        puzzle: "Regardez aussi mes autres jeux:",
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
    //let lGame = new Array(nRows).fill(undefined).map(row => new Array(nCols).fill(undefined));
    let lGame = Array.from(new Array(nRows), () => new Array(nCols).fill(undefined));

    // HTML-Elemente
    const lPanel = document.getElementsByClassName("grid-item");
    let eDiv;
    let eImg;

    // aktueller Spieler
    let nCurrentPlayer = 0;
    let nStartPlayer = 0;
    let lPlayers = ["human", "human"];
    let lImages = ["x.svg", "o.svg"];
    let lGewonnen;
    let lAnzGewonnen = [0, 0];
    let bWait = false;

    let $ = function (id) {
        return document.getElementById(id);
    };
    let iPopupInfo = $("iPopupInfo");
    let iPopupScore = $("iPopupScore");
    let iTitle = $("iTitle");
    let iGame = $("iGame");
    let iInfoBody = $("iInfoBody");
    let iClose = $("iClose");
    let iOK = $("iOK");

    function fCheckGewonnen() {
        // Richtungen zum Prüfen auf Sieg: - | \ /
        const lDirections = [[1, 0], [0, 1], [1, 1], [1, -1]];
        let bGewonnen = false;
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
        let lScore = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
        let lSet;
        let nScore;
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
        let rHighScore = {nScore: -1, nRow: undefined, nCol: undefined};
        let lHighScore = [];
        let nRandom;
        let nBest;
        let nSecond;
        let nAnzBest;
        let nAnzSecond;
        let nPlay;
        let lUsed = [];
        // Wert der Felder für aktuellen Spieler ermitteln
        let lScore = fAIscore();
        // Wert der Felder für Gegner ermitteln, dort spielen, falls höher als eigener Wert
        nCurrentPlayer = 1 - nCurrentPlayer;
        let lScoreOpponent = fAIscore();
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
        let nMyHighScore = 0;
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
                    // 1 zu 100 %
                    nRandom = 1;
                    nRandom = Math.min(nRandom, lHighScore.length - 1);
                }
                if (lPlayers[nCurrentPlayer] === "medium") {
                    // 0 oder 1 zu 66 % / 33 %
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
        let eMessage = $("iMessage");
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
            $("iGameField").disabled = true;
            // Fix for Firefox OnKeydown
            document.activeElement.blur();
            iPopupScore.getElementsByClassName("popup-content")[0].innerText = lLoc[nLang].player + " " + (nCurrentPlayer + 1) + " " + lLoc[nLang].won;
            iPopupScore.getElementsByClassName("popup-content")[1].innerText = lLoc[nLang].score + " " + lAnzGewonnen[0] + " : " + lAnzGewonnen[1];
            iPopupScore.classList.remove("popup-init");
            iPopupScore.classList.remove("popup-hide");
            iPopupScore.classList.add("popup-show-slow");
        } else if (lGame.findIndex((x) => x.includes(undefined)) < 0) {
            fSetMessage(undefined, lLoc[nLang].draw);
            $("iGameField").disabled = true;
            // Fix for Firefox OnKeydown
            document.activeElement.blur();
            iPopupScore.getElementsByClassName("popup-content")[0].innerText = lLoc[nLang].draw2;
            iPopupScore.getElementsByClassName("popup-content")[1].innerText = lLoc[nLang].score + " " + lAnzGewonnen[0] + " : " + lAnzGewonnen[1];
            iPopupScore.classList.remove("popup-init");
            iPopupScore.classList.remove("popup-hide");
            iPopupScore.classList.add("popup-show-draw");
        } else {
            nCurrentPlayer = 1 - nCurrentPlayer;
            fSetMessage(nCurrentPlayer, " " + lLoc[nLang].play);
            fAI();
        }
    }

    // Click auf ein Panel
    function fClickPanel(event) {
        if (event.target.nodeName === "BUTTON" && bWait === false) {
            let nRow = event.target.getAttribute("data-row");
            let nCol = event.target.getAttribute("data-col");
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
        $("iGameField").disabled = false;
        iPopupScore.classList.remove("popup-show-slow");
        iPopupScore.classList.remove("popup-show-draw");
        iPopupScore.classList.add("popup-hide");
        nCurrentPlayer = nStartPlayer;
        nStartPlayer = 1 - nStartPlayer;
        fSetMessage(nCurrentPlayer, " " + lLoc[nLang].begin);
        fAI();
    }

    // zu Spielpanel wechseln
    function fStartGame(event) {
        lPlayers[1] = event.target.getAttribute("data-payer2");
        nStartPlayer = 0;
        iTitle.classList.remove("swipe-out-right");
        iGame.classList.remove("swipe-in-left");
        iTitle.classList.add("swipe-out");
        iGame.classList.add("swipe-in");
        fResetGame();
    }

    // Spiel verlassen
    function fQuitGame() {
        fResetGame();
        lAnzGewonnen = [0, 0];
        iTitle.classList.remove("swipe-out");
        iGame.classList.remove("swipe-in");
        iTitle.classList.add("swipe-out-right");
        iGame.classList.add("swipe-in-left");
    }

    // Popup Info
    function fShowPopupInfo() {
        $("iTitleField").disabled = true;
        // Fix for Firefox OnKeydown
        document.activeElement.blur();
        iPopupInfo.classList.remove("popup-init");
        iPopupInfo.classList.remove("popup-hide");
        iPopupInfo.classList.add("popup-show");
    }
    function fHidePopupInfo() {
        $("iTitleField").disabled = false;
        iPopupInfo.classList.remove("popup-show");
        iPopupInfo.classList.add("popup-hide");
    }

    function urlQuery(query) {
        query = query.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        let expr = "[\\?&]" + query + "=([^&#]*)";
        let regex = new RegExp(expr);
        let results = regex.exec(window.location.href);
        if (results !== null) {
            return results[1];
        } else {
            return false;
        }
    }

    document.onkeydown = function (e) {
        // mit Pfeiltasten navigieren
        const cEl = document.activeElement;

        let lElements;
        let nIndexEl;

        if (iPopupInfo.classList.contains("popup-show")) {
            // im Info-Popup
            switch (e.key) {
                case "ArrowUp":
                case "ArrowLeft":
                case "ArrowDown":
                case "ArrowRight":
                    $("iInfoClose").focus();
                    break;
                case "Escape":
                    fHidePopupInfo();
                    break;
            }
        } else if (iPopupScore.classList.contains("popup-show") || iPopupScore.classList.contains("popup-show-slow") || iPopupScore.classList.contains("popup-show-draw")) {
            // im Score-Popup
            switch (e.key) {
                case "ArrowUp":
                case "ArrowLeft":
                case "ArrowDown":
                case "ArrowRight":
                    iOK.focus();
                    break;
                case "Escape":
                    fResetGame();
                    break;
            }
        } else if (iGame.classList.contains("swipe-in")) {
            // im Game
            const nRow = parseInt(cEl.getAttribute("data-row"));
            const nCol = parseInt(cEl.getAttribute("data-col"));
            switch (e.key) {
                case "ArrowUp":
                    if (nRow > 0) {
                        document.querySelectorAll("[data-row='" + (nRow - 1) + "'][data-col='" + nCol + "']")[0].focus();
                    } else if (nRow === 0) {
                        iClose.focus();
                    }
                    break;
                case "ArrowLeft":
                    if (nCol > 0) {
                        document.querySelectorAll("[data-row='" + (nRow) + "'][data-col='" + (nCol - 1) + "']")[0].focus();
                    } else if (cEl === iClose) {
                        document.querySelectorAll("[data-row='0'][data-col='2']")[0].focus();
                    } else if (nRow === 0 && nCol === 0) {
                        iClose.focus();
                    }
                    break;
                case "ArrowDown":
                    if (nRow < 2) {
                        document.querySelectorAll("[data-row='" + (nRow + 1) + "'][data-col='" + nCol + "']")[0].focus();
                    } else if (cEl === iClose) {
                        document.querySelectorAll("[data-row='0'][data-col='2']")[0].focus();
                    } else if (nRow !== 2) {
                        iClose.focus();
                    }
                    break;
                case "ArrowRight":
                    if (nCol < 2) {
                        document.querySelectorAll("[data-row='" + (nRow) + "'][data-col='" + (nCol + 1) + "']")[0].focus();
                    } else if (cEl === iClose) {
                        document.querySelectorAll("[data-row='0'][data-col='0']")[0].focus();
                    } else if (!(nCol === 2 && nRow > 0)) {
                        iClose.focus();
                    }
                    break;
                case "Escape":
                    fQuitGame();
                    break;
            }

        } else {
            // auf Titel-Screen
            lElements = [$("iInfo"), $("i2Players"), $("iEasy"), $("iMedium"), $("iHard")];
            nIndexEl = lElements.indexOf(cEl);
            switch (e.key) {
                case "ArrowUp":
                case "ArrowLeft":
                    if (nIndexEl > 0) {
                        lElements[nIndexEl - 1].focus();
                    }
                    break;
                case "ArrowDown":
                case "ArrowRight":
                    if (nIndexEl < lElements.length - 1) {
                        lElements[nIndexEl + 1].focus();
                    }
                    break;
            }
        }
    };

    function fInit() {
        // Localize
        // Example usage - https://grrd01.github.io/TicTacToe/?lang=en
        const cLang = (urlQuery("lang") || navigator.language || (navigator.languages || ["en"])[0]).substring(0, 2).toLowerCase();
        if (cLang === "de") {
            nLang = 1;
        } else if (cLang === "fr") {
            nLang = 2;
        }
        if (nLang) {
            document.documentElement.setAttribute("lang", cLang);
        }
        $("i2Players").getElementsByTagName("span")[0].innerHTML = lLoc[nLang].players.replace(/\s/g, "\u00a0");
        $("iEasy").getElementsByTagName("span")[0].innerHTML = lLoc[nLang].easy;
        $("iMedium").getElementsByTagName("span")[0].innerHTML = lLoc[nLang].medium;
        $("iHard").getElementsByTagName("span")[0].innerHTML = lLoc[nLang].hard;
        iInfoBody.getElementsByTagName("p")[0].innerHTML = lLoc[nLang].instr;
        iInfoBody.getElementsByTagName("p")[1].innerHTML = lLoc[nLang].dev;
        $("iPuzzle").innerHTML = lLoc[nLang].puzzle;
        document.querySelector("meta[name='description']").setAttribute("content", lLoc[nLang].desc);

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
                eDiv = document.createElement("button");
                eDiv.className = "grid-item";
                eDiv.setAttribute("data-row", nIndexRow.toString());
                eDiv.setAttribute("data-col", nIndexCol.toString());
                document.getElementsByClassName("grid-container")[0].appendChild(eDiv);
            });
        });

        // Click-Handler auf die Buttons & Panels legen
        $("iInfo").addEventListener("click", fShowPopupInfo);
        $("iInfoClose").addEventListener("click", fHidePopupInfo);
        iPopupInfo.addEventListener("click", function (e) {
            if (e.target === iPopupInfo) {
                fHidePopupInfo();
            }
        });
        Array.from(document.getElementsByClassName("list-button")).forEach(function (rButton) {
            rButton.addEventListener("click", fStartGame);
        });
        iClose.addEventListener("click", fQuitGame);
        Array.from(lPanel).forEach(function (rPanel) {
            rPanel.addEventListener("click", fClickPanel);
        });
        iOK.addEventListener("click", fResetGame);
        iPopupScore.addEventListener("click", function (e) {
            if (e.target === iPopupScore) {
                fResetGame();
            }
        });
    }

    fInit();

}());
