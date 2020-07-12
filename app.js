// ==UserScript==
// @name         MDN 语言助手 MDN Language Helper
// @namespace    https://github.com/moonflame/jump-to-chinese-page
// @version      0.3.2
// @description  检测当前浏览的 MDN 非中文页面，自动跳转到对应中文版页面。适用于 Tampermonkey Chrome 扩展
// @author       Rayan Zhang
// @match        *://developer.mozilla.org/*
// @grant        none
// @run-at       document-start // The script will be injected as fast as possible.
// ==/UserScript==

(function() {
    'use strict';
    let changeLang = true;

    // The page was accessed by navigating into the history.
    if (window.performance.navigation.type == window.performance.navigation.TYPE_BACK_FORWARD) {
        changeLang = false;
    }

    if (changeLang == true) {
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
    }

    return;
    // append a list named "Language Helper"
    let scriptName = "Language Helper";
    let el = document.createElement("li");
    let temp1, temp2, temp3, temp4;
    el.setAttribute("class", "top-level-entry-container");

    temp1 = document.createElement("button");
    temp1.setAttribute("type", "button");
    temp1.setAttribute("class", "top-level-entry");
    temp1.setAttribute("aria-haspopup", "true");

    temp2 = document.createTextNode(scriptName);
    temp1.appendChild(temp2);

    temp2 = document.createElement("span");
    temp2.setAttribute("class", "main-menu-arrow");
    temp2.setAttribute("aria-hidden", "true");
    temp2.appendChild(document.createTextNode("▼"));
    temp1.appendChild(temp2);

    el.appendChild(temp1);

    temp1 = document.createElement("ul");
    temp2 = document.createElement("li");
    temp2.setAttribute("data-item", scriptName);
    temp2.setAttribute("role", "menuitem");

    temp3 = document.createElement("a");
    temp3.setAttribute("href", "Javascript:void(0)");
    temp4 = document.createTextNode("On/Off On");

    el.appendChild(temp1);
    temp1.appendChild(temp2);
    temp2.appendChild(temp3);
    temp3.appendChild(temp4);

    let currentDiv = document.getElementsByClassName("main-menu");
    currentDiv[0].appendChild(el, currentDiv[0]);
})();