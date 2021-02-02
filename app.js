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
    let changeLang = true;

    // The page was accessed by navigating into the history.
    if (window.performance.navigation.type == window.performance.navigation.TYPE_BACK_FORWARD) {
        changeLang = false;
        return;
    }

    let form = document.getElementsByClassName('language-menu')[0];
    let select = document.getElementById('select_language');
    let options = document.getElementById('select_language').children;
    let submitButton = document.getElementsByClassName('language-menu')[0].getElementsByTagName('button')[0];
    if (options[0].value === 'zh-CN') {
        changeLang = false;
        return;
    }


    if (changeLang == true) {

        for (let el of options) {
            if (el.value.includes('zh-CN')) {
                select.value = el.value;
                form.requestSubmit(submitButton);
                return;
            }
        }

    }
})();