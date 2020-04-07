// ==UserScript==
// @name         MDN 语言助手 MDN Language Helper
// @namespace    https://github.com/moonflame/jump-to-chinese-page
// @version      0.3.0
// @description  检测当前浏览的 MDN 非中文页面，自动跳转到对应中文版页面。适用于 Tampermonkey Chrome 扩展
// @author       Rayan Zhang
// @match        *://developer.mozilla.org/*
// @grant        none
// @run-at       document-end // The script will be injected when or after the DOMContentLoaded event was dispatched.
// ==/UserScript==

(function() {
    'use strict';

    let urlOriginal = window.location.href;
    let urlArrDivided = urlOriginal.split('/');
    let urlProcessing;

    if (urlArrDivided[2] == 'developer.mozilla.org') { // MDN
        if (urlArrDivided[3] == 'zh-CN') {
            // return;
        } else {
            urlArrDivided[3] = 'zh-CN';
            urlProcessing = urlArrDivided.join('/'); // developer.mozilla.org/zh-CN/...
            // urlArrDivided = urlProcessing.split('#'); // after language change, parameters after "#" is useless
            window.location.href = urlProcessing; // load new page
            // return;
        }
    }

    // append a list named "Language Helper"
    let el = document.createElement("li");
    el.setAttribute("class", "top-level-entry-container");

    let tempEl = document.createElement("button");
    tempEl.setAttribute("type", "button");
    tempEl.setAttribute("class", "top-level-entry");
    tempEl.setAttribute("aria-haspopup", "true");

    let tempTempEl = document.createTextNode("Language Helper");
    tempEl.appendChild(tempTempEl);

    tempTempEl = document.createElement("span");
    tempTempEl.setAttribute("class", "main-menu-arrow");
    tempTempEl.setAttribute("aria-hidden", "true");
    tempTempEl.appendChild(document.createTextNode("▼"));
    tempEl.appendChild(tempTempEl);

    el.appendChild(tempEl);

    let currentDiv = document.getElementsByClassName("main-nav");
    currentDiv[0].children[0].appendChild(el, currentDiv[0]);
})();