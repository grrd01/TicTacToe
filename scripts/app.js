/**
 * grrd's Tic Tac Toe
 * Copyright (c) 2018 Gerard Tyedmers, grrd@gmx.net
 * @license MPL-2.0
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
!function(){"use strict";var e=0;const t=[{desc:"grrd's Tic Tac Toe is a HTML5 Game that works offline",players:"2 Players",easy:"Easy",medium:"Medium",hard:"Hard",instr:"Who is the first to get 3 fields in a line?",dev:"Developed by Gérard Tyedmers.",puzzle:"Have a look at my other games:",begin:"begins",play:"plays",win:"wins",draw:"draw",player:"Player",won:"has won!",score:"Score:",draw2:"This game ends in a draw."},{desc:"grrd's Tic Tac Toe ist ein HTML5 Spiel, welches offline funktioniert",players:"2 Spieler",easy:"Einfach",medium:"Mittel",hard:"Schwierig",instr:"Wer besetzt zuerst drei Felder in einer Linie?",dev:"Entwickelt von Gérard Tyedmers.",puzzle:"Schau dir auch meine anderen Spiele an:",begin:"beginnt",play:"spielt",win:"gewinnt",draw:"unentschieden",player:"Spieler",won:"hat gewonnen!",score:"Resultat:",draw2:"Diese Partie endet unentschieden."},{desc:"grrd's Tic Tac Toe est un jeu HTML5 qui fonctionne hors ligne",players:"2 Joueurs",easy:"Facile",medium:"Moyen",hard:"Dur",instr:"Qui est le premier à obtenir 3 champs dans une ligne?",dev:"Développé par Gérard Tyedmers.",puzzle:"Regardez aussi mes autres jeux:",begin:"commence",play:"joue",win:"gagne",draw:"nul",player:"Joueur",won:"a gagné!",score:"Résultat:",draw2:"Ce jeu se termine par un match nul."}];var n=Array.from(new Array(3),()=>new Array(3).fill(void 0));const o=document.getElementsByClassName("grid-item");var a,r,i,s=0,c=0,l=["human","human"],d=["x.svg","o.svg"],u=[0,0],p=!1,m=function(e){return document.getElementById(e)},f=m("iPopupInfo"),h=m("iPopupScore"),g=m("iTitle"),w=m("iGame"),v=m("iInfoBody"),y=m("iClose");function E(){const e=[[1,0],[0,1],[1,1],[1,-1]];var t=!1;return i=[],n.forEach(function(o,a){o.forEach(function(o,r){n[a][r]===s&&e.forEach(function(o,c){void 0!==n[a+e[c][0]]&&void 0!==n[a+2*e[c][0]]&&n[a+e[c][0]][r+e[c][1]]===s&&n[a+2*e[c][0]][r+2*e[c][1]]===s&&(i.push([a,r]),i.push([a+e[c][0],r+e[c][1]]),i.push([a+2*e[c][0],r+2*e[c][1]]),t=!0)})})}),t}function L(){var e,t,o=[[0,0,0],[0,0,0],[0,0,0]];const a=[0,1,2];return t=0,a.forEach(function(a,r){0===(e=[n[r][0],n[r][1],n[r][2]]).filter(e=>e===1-s).length&&(t=e.filter(e=>void 0===e).length+Math.pow(3*e.filter(e=>e===s).length,2),o[r][0]+=t,o[r][1]+=t,o[r][2]+=t)}),a.forEach(function(a,r){0===(e=[n[0][r],n[1][r],n[2][r]]).filter(e=>e===1-s).length&&(t=e.filter(e=>void 0===e).length+Math.pow(3*e.filter(e=>e===s).length,2),o[0][r]+=t,o[1][r]+=t,o[2][r]+=t)}),0===(e=[n[0][0],n[1][1],n[2][2]]).filter(e=>e===1-s).length&&(t=e.filter(e=>void 0===e).length+Math.pow(3*e.filter(e=>e===s).length,2),o[0][0]+=t,o[1][1]+=t,o[2][2]+=t),0===(e=[n[0][2],n[1][1],n[2][0]]).filter(e=>e===1-s).length&&(t=e.filter(e=>void 0===e).length+Math.pow(3*e.filter(e=>e===s).length,2),o[0][2]+=t,o[1][1]+=t,o[2][0]+=t),n.forEach(function(e,t){e.forEach(function(e,a){void 0!==n[t][a]&&(o[t][a]=void 0)})}),o}function A(){var e,t,o,a,r,i,c={nScore:-1,nRow:void 0,nCol:void 0},d=[],u=[],m=L();s=1-s;var f=L();s=1-s,n.forEach(function(e,t){e.forEach(function(e,o){void 0!==n[t][o]&&u.push({nPlayer:n[t][o],nRow:t,nCol:o})})}),3===u.length&&n[1][1]===s&&(n[0][0]===1-s&&n[2][2]===1-s&&(m[0][2]=0,m[2][0]=0,f[0][2]=0,f[2][0]=0),n[0][2]===1-s&&n[2][0]===1-s&&(m[0][0]=0,m[2][2]=0,f[0][0]=0,f[2][2]=0)),2===u.length&&n[1][1]===1-s&&(n[0][0]===s&&(m[2][2]=1e3),n[0][2]===s&&(m[2][0]=1e3),n[2][0]===s&&(m[0][2]=1e3),n[2][2]===s&&(m[0][0]=1e3)),"hard"===l[s]&&3===u.length&&n[1][1]===1-s&&(n[0][0]===s&&n[2][2]===1-s||n[0][2]===s&&n[2][0]===1-s||n[2][0]===s&&n[0][2]===1-s||n[2][2]===s&&n[0][0]===1-s)&&(m[0][1]=0,m[1][0]=0,m[1][2]=0,m[2][1]=0,f[0][1]=0,f[1][0]=0,f[1][2]=0,f[2][1]=0);var h=0;m.forEach(function(e){e.forEach(function(e){e>h&&(h=e)})}),f.forEach(function(e,t){e.forEach(function(e,n){void 0!==e&&(c.nScore=e>h&&h<37?e:m[t][n],c.nRow=t,c.nCol=n,d.push({nScore:c.nScore,nRow:t,nCol:n}))})}),d.sort(function(e,t){return t.nScore-e.nScore}),"human"!==l[s]&&(p=!0,setTimeout(function(){p=!1,"easy"===l[s]&&(e=1,e=Math.min(e,d.length-1)),"medium"===l[s]&&((e=Math.floor(3*Math.random()))>1&&(e-=1),e=Math.min(e,d.length-1)),"hard"===l[s]&&(e=0),t=d[0].nScore,a=d.filter(e=>e.nScore>=t).length,o=d.filter(e=>e.nScore<t).length>0?d.filter(e=>e.nScore<t)[0].nScore:t,r=d.filter(e=>e.nScore>=o).length,i=0===e?Math.floor(Math.random()*a):Math.floor(Math.random()*r),document.querySelectorAll("[data-row='"+d[i].nRow+"'][data-col='"+d[i].nCol+"']")[0].click()},500))}function b(e,t){for(var n=m("iMessage");n.firstChild;)n.removeChild(n.firstChild);void 0!==e&&((r=document.createElement("img")).setAttribute("src","images/"+d[e]),r.setAttribute("class","text-img"),n.appendChild(r)),n.innerHTML=n.innerHTML+t}function T(o){if("BUTTON"===o.target.nodeName&&!1===p){var a=o.target.getAttribute("data-row"),c=o.target.getAttribute("data-col");void 0!==n[a][c]||E()||(n[a][c]=s,(r=document.createElement("img")).setAttribute("class","svg-xo"),r.setAttribute("src","images/"+d[s]),o.target.appendChild(r),E()?(u[s]+=1,b(s," "+t[e].win),Array.from(document.getElementsByClassName("svg-xo")).forEach(function(e){e.classList.add("svg-xo-dimmed")}),Array.from(i).forEach(function(e){document.querySelectorAll("[data-row='"+e[0]+"'][data-col='"+e[1]+"'] > img")[0].classList.remove("svg-xo-dimmed"),document.querySelectorAll("[data-row='"+e[0]+"'][data-col='"+e[1]+"'] > img")[0].classList.add("svg-xo-highlight")}),m("iGameField").disabled=!0,document.activeElement.blur(),h.getElementsByClassName("popup-content")[0].innerText=t[e].player+" "+(s+1)+" "+t[e].won,h.getElementsByClassName("popup-content")[1].innerText=t[e].score+" "+u[0]+" : "+u[1],h.classList.remove("popup-init"),h.classList.remove("popup-hide"),h.classList.add("popup-show-slow")):n.findIndex(e=>e.includes(void 0))<0?(b(void 0,t[e].draw),m("iGameField").disabled=!0,document.activeElement.blur(),h.getElementsByClassName("popup-content")[0].innerText=t[e].draw2,h.getElementsByClassName("popup-content")[1].innerText=t[e].score+" "+u[0]+" : "+u[1],h.classList.remove("popup-init"),h.classList.remove("popup-hide"),h.classList.add("popup-show-draw")):(b(s=1-s," "+t[e].play),A()))}}function S(){Array.from(o).forEach(function(e){for(;e.firstChild;)e.removeChild(e.firstChild)}),n.forEach(function(e,t){e.forEach(function(e,o){n[t][o]=void 0})}),m("iGameField").disabled=!1,h.classList.remove("popup-show-slow"),h.classList.remove("popup-show-draw"),h.classList.add("popup-hide"),s=c,c=1-c,b(s," "+t[e].begin),A()}function M(e){l[1]=e.target.getAttribute("data-payer2"),c=0,g.classList.remove("swipe-out-right"),w.classList.remove("swipe-in-left"),g.classList.add("swipe-out"),w.classList.add("swipe-in"),S()}function k(){S(),u=[0,0],g.classList.remove("swipe-out"),w.classList.remove("swipe-in"),g.classList.add("swipe-out-right"),w.classList.add("swipe-in-left")}function C(){m("iTitleField").disabled=!0,document.activeElement.blur(),f.classList.remove("popup-init"),f.classList.remove("popup-hide"),f.classList.add("popup-show")}function B(){m("iTitleField").disabled=!1,f.classList.remove("popup-show"),f.classList.add("popup-hide")}document.onkeydown=function(e){const t=document.activeElement;let n,o;if(f.classList.contains("popup-show"))switch(e.key){case"ArrowUp":case"ArrowLeft":case"ArrowDown":case"ArrowRight":m("iInfoClose").focus();break;case"Escape":B()}else if(h.classList.contains("popup-show")||h.classList.contains("popup-show-slow")||h.classList.contains("popup-show-draw"))switch(e.key){case"ArrowUp":case"ArrowLeft":case"ArrowDown":case"ArrowRight":m("iOK").focus();break;case"Escape":S()}else if(w.classList.contains("swipe-in")){const n=parseInt(t.getAttribute("data-row")),o=parseInt(t.getAttribute("data-col"));switch(e.key){case"ArrowUp":n>0?document.querySelectorAll("[data-row='"+(n-1)+"'][data-col='"+o+"']")[0].focus():0===n&&y.focus();break;case"ArrowLeft":o>0?document.querySelectorAll("[data-row='"+n+"'][data-col='"+(o-1)+"']")[0].focus():t===y?document.querySelectorAll("[data-row='0'][data-col='2']")[0].focus():0===n&&0===o&&y.focus();break;case"ArrowDown":n<2?document.querySelectorAll("[data-row='"+(n+1)+"'][data-col='"+o+"']")[0].focus():t===y?document.querySelectorAll("[data-row='0'][data-col='2']")[0].focus():2!==n&&y.focus();break;case"ArrowRight":o<2?document.querySelectorAll("[data-row='"+n+"'][data-col='"+(o+1)+"']")[0].focus():t===y?document.querySelectorAll("[data-row='0'][data-col='0']")[0].focus():2===o&&n>0||y.focus();break;case"Escape":k()}}else switch(o=(n=[m("iInfo"),m("i2Players"),m("iEasy"),m("iMedium"),m("iHard")]).indexOf(t),e.key){case"ArrowUp":case"ArrowLeft":o>0&&n[o-1].focus();break;case"ArrowDown":case"ArrowRight":o<n.length-1&&n[o+1].focus()}},function(){const r=(function(e){e=e.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");var t=new RegExp("[\\?&]"+e+"=([^&#]*)").exec(window.location.href);return null!==t&&t[1]}("lang")||navigator.language||navigator.browserLanguage||(navigator.languages||["en"])[0]).substring(0,2).toLowerCase();"de"===r?e=1:"fr"===r&&(e=2),e&&document.documentElement.setAttribute("lang",r),m("i2Players").getElementsByTagName("span")[0].innerHTML=t[e].players.replace(/\s/g," "),m("iEasy").getElementsByTagName("span")[0].innerHTML=t[e].easy,m("iMedium").getElementsByTagName("span")[0].innerHTML=t[e].medium,m("iHard").getElementsByTagName("span")[0].innerHTML=t[e].hard,v.getElementsByTagName("p")[0].innerHTML=t[e].instr,v.getElementsByTagName("p")[1].innerHTML=t[e].dev,m("iPuzzle").innerHTML=t[e].puzzle,document.querySelector("meta[name='description']").setAttribute("content",t[e].desc),"serviceWorker"in navigator&&window.addEventListener("load",function(){navigator.serviceWorker.register("sw.js").then(function(e){console.log("ServiceWorker registration successful with scope: ",e.scope)},function(e){console.log("ServiceWorker registration failed: ",e)})}),n.forEach(function(e,t){e.forEach(function(e,n){(a=document.createElement("button")).className="grid-item",a.setAttribute("data-row",t.toString()),a.setAttribute("data-col",n.toString()),document.getElementsByClassName("grid-container")[0].appendChild(a)})}),m("iInfo").addEventListener("click",C),m("iInfoClose").addEventListener("click",B),Array.from(document.getElementsByClassName("list-button")).forEach(function(e){e.addEventListener("click",M)}),y.addEventListener("click",k),Array.from(o).forEach(function(e){e.addEventListener("click",T)}),m("iOK").addEventListener("click",S)}()}();