// ==UserScript==
// @name         MDN 语言助手 MDN Language Helper
// @namespace    https://github.com/moonflame/jump-to-chinese-page
// @version      0.4.0
// @description  检测当前浏览的 MDN 非中文页面，自动跳转到对应中文版页面。适用于 Tampermonkey Chrome 扩展
// @author       Rayan Zhang
// @match        *://developer.mozilla.org/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    let options = document.getElementById('select_language').children;
    let targetUrl = '';

    // won't continue when navigating into the history or using navigation buttons
    if (isCertainNavigationType()) {
        return;
    }

    if (isAlreadyPreferredLanguage()) {
        return;
    }

    if (!processUrl()) {
        return;
    }

    window.location.assign(targetUrl);
    return;


    function isCertainNavigationType() {
        return window.performance.navigation.type == window.performance.navigation.TYPE_BACK_FORWARD;
    }

    function isAlreadyPreferredLanguage() {
        return options[0].value.toLowerCase() === 'zh-CN'.toLowerCase();
    }

    function processUrl() {
        for (let el of options) {
            if (el.value.toLowerCase().includes('zh-CN'.toLowerCase()) === true) {
                targetUrl = document.location.origin + el.value;
                return true;
            }
        }
        return false;
    }
})();
