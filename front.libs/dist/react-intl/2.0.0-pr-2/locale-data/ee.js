(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.ReactIntlLocaleData || (g.ReactIntlLocaleData = {})).ee = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports["default"]=[{locale:"ee",pluralRuleFunction:function(e,a){return a?"other":1==e?"one":"other"},fields:{year:{displayName:"ƒe",relative:{0:"ƒe sia",1:"ƒe si gbɔ na","-1":"ƒe si va yi"},relativeTime:{future:{one:"le ƒe {0} me",other:"le ƒe {0} wo me"},past:{one:"ƒe {0} si va yi",other:"ƒe {0} si wo va yi"}}},month:{displayName:"ɣleti",relative:{0:"ɣleti sia",1:"ɣleti si gbɔ na","-1":"ɣleti si va yi"},relativeTime:{future:{one:"le ɣleti {0} me",other:"le ɣleti {0} wo me"},past:{one:"ɣleti {0} si va yi",other:"ɣleti {0} si wo va yi"}}},day:{displayName:"ŋkeke",relative:{0:"egbe",1:"etsɔ si gbɔna",2:"nyitsɔ si gbɔna","-1":"etsɔ si va yi","-2":"nyitsɔ si va yi"},relativeTime:{future:{one:"le ŋkeke {0} me",other:"le ŋkeke {0} wo me"},past:{one:"ŋkeke {0} si va yi",other:"ŋkeke {0} si wo va yi"}}},hour:{displayName:"gaƒoƒo",relativeTime:{future:{one:"le gaƒoƒo {0} me",other:"le gaƒoƒo {0} wo me"},past:{one:"gaƒoƒo {0} si va yi",other:"gaƒoƒo {0} si wo va yi"}}},minute:{displayName:"aɖabaƒoƒo",relativeTime:{future:{one:"le aɖabaƒoƒo {0} me",other:"le aɖabaƒoƒo {0} wo me"},past:{one:"aɖabaƒoƒo {0} si va yi",other:"aɖabaƒoƒo {0} si wo va yi"}}},second:{displayName:"sekend",relative:{0:"fifi"},relativeTime:{future:{one:"le sekend {0} me",other:"le sekend {0} wo me"},past:{one:"sekend {0} si va yi",other:"sekend {0} si wo va yi"}}}}},{locale:"ee-GH",parentLocale:"ee"},{locale:"ee-TG",parentLocale:"ee"}],module.exports=exports["default"];
},{}]},{},[1])(1)
});