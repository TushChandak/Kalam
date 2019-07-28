// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';
chrome.browserAction.onClicked.addListener(function (tab) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.executeScript(
            tabs[0].id,
            { code: 'nsUserFunctions.ApplyMouseUp();' });
    });
});

let btnHighLighterStart = document.getElementById('btnHighLighterStart');
let btnHighLighterStop = document.getElementById('btnHighLighterStop');
btnHighLighterStart.onclick = function (element) {
    let HighLighter = "false";
    $("#btnHighLighterStart").parent().addClass("active");
    $("#btnHighLighterStop").parent().attr("class","");
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.executeScript(
            tabs[0].id,
            { code: 'nsUserFunctions.ApplyMouseUp();' });
    });
    
};
btnHighLighterStop.onclick = function (element) {
    $("#btnHighLighterStop").parent().addClass("active");
    $("#btnHighLighterStart").parent().attr("class", "");
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.executeScript(
            tabs[0].id,
            { code: 'nsUserFunctions.removeMarkEvent();' });
    });
};