// ==UserScript==
// @name         获取中文版页面 Jump To Chinese Page
// @namespace    https://github.com/moonflame/jump-to-chinese-page
// @version      0.1.1
// @description  检测当前浏览的 MDN 非中文页面，自动跳转到对应中文版页面。适用于 Tampermonkey Chrome 扩展
// @author       Rayan Zhang
// @match        *://developer.mozilla.org/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let originalUrl = window.location.href;
    let dividedUrlArr = originalUrl.split('/');

    if (dividedUrlArr[2] == 'developer.mozilla.org') {
        if (dividedUrlArr[3] == 'zh-CN') {
            return;
        } else {
            dividedUrlArr[3] = 'zh-CN';
            window.location.href = dividedUrlArr.join('/');
            return;
        }
    }
})();