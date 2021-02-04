// ==UserScript==
// @name         MDN 语言助手 MDN Language Helper
// @namespace    https://github.com/moonflame/jump-to-chinese-page
// @version      1.0.0
// @description  检测当前浏览的 MDN 非中文页面，自动跳转到对应中文版页面。适用于 Tampermonkey Chrome 扩展
// @author       Rayan Zhang
// @match        *://developer.mozilla.org/*
// @grant        none
// @run-at       document-start // The script will be injected as fast as possible.
// ==/UserScript==

(function() {
    'use strict';
    let isChangeLang = true; // flag to determine whether to change language
    let options = document.getElementById('select_language').children;

    // if the page was accessed by navigating into the history, return.
    if (window.performance.navigation.type == window.performance.navigation.TYPE_BACK_FORWARD) {
        isChangeLang = false;
        return;
    }

    // if the current language is the target language, return.
    if (options[0].value === 'zh-CN') {
        isChangeLang = false;
        return;
    }

    // if the target language is not included in languages available, return.
    for (let el of options) {
        if (el.value.includes('zh-CN') === true) {
            isChangeLang = true;
            break;
        }
        isChangeLang = false;
    }

    // access the target language page
    if (isChangeLang === true) {
        let urlOriginal = window.location.href;
        let urlArrDivided = urlOriginal.split('/');
        let urlProcessing;

        if (urlArrDivided[2] === 'developer.mozilla.org') { // MDN
            if (urlArrDivided[3] === 'zh-CN') {
                return;
            } else {
                urlArrDivided[3] = 'zh-CN';
                urlProcessing = urlArrDivided.join('/'); // developer.mozilla.org/zh-CN/...
                // urlArrDivided = urlProcessing.split('#'); // after language change, parameters after "#" is useless
                window.location.href = urlProcessing; // load new page
                return;
            }
        }
    }
})();