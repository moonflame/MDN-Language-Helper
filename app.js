// ==UserScript==
// @name         获取中文版页面 Jump To Chinese Page
// @namespace    https://github.com/moonflame/jump-to-chinese-page
// @version      0.2.0
// @description  检测当前浏览的 MDN 非中文页面，自动跳转到对应中文版页面。适用于 Tampermonkey Chrome 扩展
// @author       Rayan Zhang
// @match        *://developer.mozilla.org/*
// @grant        none
// @run-at       document-start // The script will be injected as fast as possible.
// ==/UserScript==

(function() {
    'use strict';

    let urlOriginal = window.location.href;
    let urlArrDivided = urlOriginal.split('/');
    let urlProcessing;

    if (urlArrDivided[2] == 'developer.mozilla.org') { // MDN
        if (urlArrDivided[3] == 'zh-CN') {
            return;
        } else {
            urlArrDivided[3] = 'zh-CN';
            urlProcessing = urlArrDivided.join('/'); // developer.mozilla.org/zh-CN/...
            urlArrDivided = urlProcessing.split('#'); // after language change, parameters after "#" is useless
            window.location.href = urlArrDivided[0]; // load new page
            return;
        }
    }
})();