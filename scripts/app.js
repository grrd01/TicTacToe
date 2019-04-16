/**
 * grrd's Tic Tac Toe
 * Copyright (c) 2018 Gerard Tyedmers, grrd@gmx.net
 * @license MPL-2.0
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
!function(){"use strict";var e=0,t=[{players:"2 Players",easy:"Easy",medium:"Medium",hard:"Hard",instr:"Who is the first to get 3 fields in a line?",dev:"Developed by Gérard Tyedmers.",puzzle:"Don't miss",dice:"Have a look at",row:"Try",begin:"begins",play:"plays",win:"wins",draw:"draw",player:"Player",won:"has won!",score:"Score:",draw2:"This game ends in a draw."},{players:"2 Spieler",easy:"Einfach",medium:"Mittel",hard:"Schwierig",instr:"Wer besetzt zuerst drei Felder in einer Linie?",dev:"Entwickelt von Gérard Tyedmers.",puzzle:"Probier auch",dice:"oder",row:"und",begin:"beginnt",play:"spielt",win:"gewinnt",draw:"unentschieden",player:"Spieler",won:"hat gewonnen!",score:"Resultat:",draw2:"Diese Partie endet unentschieden."},{players:"2 Joueurs",easy:"Facile",medium:"Moyen",hard:"Dur",instr:"Qui est le premier à obtenir 3 champs dans une ligne?",dev:"Développé par Gérard Tyedmers.",puzzle:"Ne manquez pas",dice:"Jetez un coup d'oeil à",row:"Essayez ",begin:"commence",play:"joue",win:"gagne",draw:"nul",player:"Joueur",won:"a gagné!",score:"Résultat:",draw2:"Ce jeu se termine par un match nul."}];var n=Array.from(new Array(3),()=>new Array(3).fill(void 0));const o=document.getElementsByClassName("grid-item");var i,r,a,s=0,d=0,l=["human","human"],c=["x.svg","o.svg"],u=[0,0],m=!1;function g(){const e=[[1,0],[0,1],[1,1],[1,-1]];var t=!1;return a=[],n.forEach(function(o,i){o.forEach(function(o,r){n[i][r]===s&&e.forEach(function(o,d){void 0!==n[i+e[d][0]]&&void 0!==n[i+2*e[d][0]]&&n[i+e[d][0]][r+e[d][1]]===s&&n[i+2*e[d][0]][r+2*e[d][1]]===s&&(a.push([i,r]),a.push([i+e[d][0],r+e[d][1]]),a.push([i+2*e[d][0],r+2*e[d][1]]),t=!0)})})}),t}function p(){var e,t,o=[[0,0,0],[0,0,0],[0,0,0]];const i=[0,1,2];return t=0,i.forEach(function(i,r){0===(e=[n[r][0],n[r][1],n[r][2]]).filter(e=>e===1-s).length&&(t=e.filter(e=>void 0===e).length+Math.pow(3*e.filter(e=>e===s).length,2),o[r][0]+=t,o[r][1]+=t,o[r][2]+=t)}),i.forEach(function(i,r){0===(e=[n[0][r],n[1][r],n[2][r]]).filter(e=>e===1-s).length&&(t=e.filter(e=>void 0===e).length+Math.pow(3*e.filter(e=>e===s).length,2),o[0][r]+=t,o[1][r]+=t,o[2][r]+=t)}),0===(e=[n[0][0],n[1][1],n[2][2]]).filter(e=>e===1-s).length&&(t=e.filter(e=>void 0===e).length+Math.pow(3*e.filter(e=>e===s).length,2),o[0][0]+=t,o[1][1]+=t,o[2][2]+=t),0===(e=[n[0][2],n[1][1],n[2][0]]).filter(e=>e===1-s).length&&(t=e.filter(e=>void 0===e).length+Math.pow(3*e.filter(e=>e===s).length,2),o[0][2]+=t,o[1][1]+=t,o[2][0]+=t),n.forEach(function(e,t){e.forEach(function(e,i){void 0!==n[t][i]&&(o[t][i]=void 0)})}),o}function f(){var e,t,o,i,r,a,d={nScore:-1,nRow:void 0,nCol:void 0},c=[],u=[],g=p();s=1-s;var f=p();s=1-s,n.forEach(function(e,t){e.forEach(function(e,o){void 0!==n[t][o]&&u.push({nPlayer:n[t][o],nRow:t,nCol:o})})}),3===u.length&&n[1][1]===s&&(n[0][0]===1-s&&n[2][2]===1-s&&(g[0][2]=0,g[2][0]=0,f[0][2]=0,f[2][0]=0),n[0][2]===1-s&&n[2][0]===1-s&&(g[0][0]=0,g[2][2]=0,f[0][0]=0,f[2][2]=0)),2===u.length&&n[1][1]===1-s&&(n[0][0]===s&&(g[2][2]=1e3),n[0][2]===s&&(g[2][0]=1e3),n[2][0]===s&&(g[0][2]=1e3),n[2][2]===s&&(g[0][0]=1e3)),"hard"===l[s]&&3===u.length&&n[1][1]===1-s&&(n[0][0]===s&&n[2][2]===1-s||n[0][2]===s&&n[2][0]===1-s||n[2][0]===s&&n[0][2]===1-s||n[2][2]===s&&n[0][0]===1-s)&&(g[0][1]=0,g[1][0]=0,g[1][2]=0,g[2][1]=0,f[0][1]=0,f[1][0]=0,f[1][2]=0,f[2][1]=0);var h=0;g.forEach(function(e){e.forEach(function(e){e>h&&(h=e)})}),f.forEach(function(e,t){e.forEach(function(e,n){void 0!==e&&(d.nScore=e>h&&h<37?e:g[t][n],d.nRow=t,d.nCol=n,c.push({nScore:d.nScore,nRow:t,nCol:n}))})}),c.sort(function(e,t){return t.nScore-e.nScore}),"human"!==l[s]&&(m=!0,setTimeout(function(){m=!1,"easy"===l[s]&&(e=1,e=Math.min(e,c.length-1)),"medium"===l[s]&&((e=Math.floor(3*Math.random()))>1&&(e-=1),e=Math.min(e,c.length-1)),"hard"===l[s]&&(e=0),t=c[0].nScore,i=c.filter(e=>e.nScore>=t).length,o=c.filter(e=>e.nScore<t).length>0?c.filter(e=>e.nScore<t)[0].nScore:t,r=c.filter(e=>e.nScore>=o).length,a=0===e?Math.floor(Math.random()*i):Math.floor(Math.random()*r),document.querySelectorAll("[data-row='"+c[a].nRow+"'][data-col='"+c[a].nCol+"']")[0].click()},500))}function h(e,t){for(var n=document.getElementById("iMessage");n.firstChild;)n.removeChild(n.firstChild);void 0!==e&&((r=document.createElement("img")).setAttribute("src","images/"+c[e]),r.setAttribute("class","text-img"),n.appendChild(r)),n.innerHTML=n.innerHTML+t}function y(o){if("DIV"===o.target.nodeName&&!1===m){var i=o.target.getAttribute("data-row"),d=o.target.getAttribute("data-col");void 0!==n[i][d]||g()||(n[i][d]=s,(r=document.createElement("img")).setAttribute("class","svg-xo"),r.setAttribute("src","images/"+c[s]),o.target.appendChild(r),l=document.getElementById("iPopupScore"),g()?(u[s]+=1,h(s," "+t[e].win),Array.from(document.getElementsByClassName("svg-xo")).forEach(function(e){e.classList.add("svg-xo-dimmed")}),Array.from(a).forEach(function(e){document.querySelectorAll("[data-row='"+e[0]+"'][data-col='"+e[1]+"'] > img")[0].classList.remove("svg-xo-dimmed"),document.querySelectorAll("[data-row='"+e[0]+"'][data-col='"+e[1]+"'] > img")[0].classList.add("svg-xo-highlight")}),l.getElementsByClassName("popup-content")[0].innerText=t[e].player+" "+(s+1)+" "+t[e].won,l.getElementsByClassName("popup-content")[1].innerText=t[e].score+" "+u[0]+" : "+u[1],l.classList.remove("popup-init"),l.classList.remove("popup-hide"),l.classList.add("popup-show-slow")):n.findIndex(e=>e.includes(void 0))<0?(h(void 0,t[e].draw),l.getElementsByClassName("popup-content")[0].innerText=t[e].draw2,l.getElementsByClassName("popup-content")[1].innerText=t[e].score+" "+u[0]+" : "+u[1],l.classList.remove("popup-init"),l.classList.remove("popup-hide"),l.classList.add("popup-show-draw")):(h(s=1-s," "+t[e].play),f()))}var l}function v(){Array.from(o).forEach(function(e){for(;e.firstChild;)e.removeChild(e.firstChild)}),n.forEach(function(e,t){e.forEach(function(e,o){n[t][o]=void 0})}),document.getElementById("iPopupScore").classList.remove("popup-show-slow"),document.getElementById("iPopupScore").classList.remove("popup-show-draw"),document.getElementById("iPopupScore").classList.add("popup-hide"),s=d,d=1-d,h(s," "+t[e].begin),f()}function E(e){l[1]=e.target.getAttribute("data-payer2"),d=0,document.getElementById("iTitle").classList.remove("swipe-out-right"),document.getElementById("iGame").classList.remove("swipe-in-left"),document.getElementById("iTitle").classList.add("swipe-out"),document.getElementById("iGame").classList.add("swipe-in"),v()}function w(){v(),u=[0,0],document.getElementById("iTitle").classList.remove("swipe-out"),document.getElementById("iGame").classList.remove("swipe-in"),document.getElementById("iTitle").classList.add("swipe-out-right"),document.getElementById("iGame").classList.add("swipe-in-left")}function B(){document.getElementById("iPopupInfo").classList.remove("popup-init"),document.getElementById("iPopupInfo").classList.remove("popup-hide"),document.getElementById("iPopupInfo").classList.add("popup-show")}function L(){document.getElementById("iPopupInfo").classList.remove("popup-show"),document.getElementById("iPopupInfo").classList.add("popup-hide")}!function(){const r=(function(e){e=e.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");var t=new RegExp("[\\?&]"+e+"=([^&#]*)").exec(window.location.href);return null!==t&&t[1]}("lang")||navigator.language||navigator.browserLanguage||(navigator.languages||["en"])[0]).substring(0,2).toLowerCase();"de"===r?e=1:"fr"===r&&(e=2),document.getElementById("i2Players").getElementsByTagName("div")[0].innerHTML=t[e].players.replace(/ /g," "),document.getElementById("iEasy").getElementsByTagName("div")[0].innerHTML=t[e].easy,document.getElementById("iMedium").getElementsByTagName("div")[0].innerHTML=t[e].medium,document.getElementById("iHard").getElementsByTagName("div")[0].innerHTML=t[e].hard,document.getElementById("iInfoBody").getElementsByTagName("div")[0].innerHTML=t[e].instr,document.getElementById("iInfoBody").getElementsByTagName("div")[2].innerHTML=t[e].dev,document.getElementById("iPuzzle").innerHTML=t[e].puzzle,document.getElementById("iDice").innerHTML=t[e].dice,document.getElementById("iRow").innerHTML=t[e].row,"serviceWorker"in navigator&&window.addEventListener("load",function(){navigator.serviceWorker.register("sw.js").then(function(e){console.log("ServiceWorker registration successful with scope: ",e.scope)},function(e){console.log("ServiceWorker registration failed: ",e)})}),n.forEach(function(e,t){e.forEach(function(e,n){(i=document.createElement("div")).className="grid-item",i.setAttribute("data-row",t.toString()),i.setAttribute("data-col",n.toString()),document.getElementsByClassName("grid-container")[0].appendChild(i)})}),document.getElementById("iInfo").addEventListener("click",B),document.getElementById("iInfoClose").addEventListener("click",L),Array.from(document.getElementsByClassName("list-button")).forEach(function(e){e.addEventListener("click",E)}),document.getElementById("iClose").addEventListener("click",w),Array.from(o).forEach(function(e){e.addEventListener("click",y)}),document.getElementById("iOK").addEventListener("click",v)}()}();