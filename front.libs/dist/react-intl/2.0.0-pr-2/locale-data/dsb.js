(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.ReactIntlLocaleData || (g.ReactIntlLocaleData = {})).dsb = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports["default"]=[{locale:"dsb",pluralRuleFunction:function(e,a){var t=String(e).split("."),o=t[0],i=t[1]||"",n=!t[1],d=o.slice(-2),m=i.slice(-2);return a?"other":n&&1==d||1==m?"one":n&&2==d||2==m?"two":n&&(3==d||4==d)||3==m||4==m?"few":"other"},fields:{year:{displayName:"lěto",relative:{0:"lětosa",1:"znowa","-1":"łoni"},relativeTime:{future:{one:"za {0} lěto",two:"za {0} lěśe",few:"za {0} lěta",other:"za {0} lět"},past:{one:"pśed {0} lětom",two:"pśed {0} lětoma",few:"pśed {0} lětami",other:"pśed {0} lětami"}}},month:{displayName:"mjasec",relative:{0:"ten mjasec",1:"pśiducy mjasec","-1":"slědny mjasec"},relativeTime:{future:{one:"za {0} mjasec",two:"za {0} mjaseca",few:"za {0} mjasecy",other:"za {0} mjasecow"},past:{one:"pśed {0} mjasecom",two:"pśed {0} mjasecoma",few:"pśed {0} mjasecami",other:"pśed {0} mjasecami"}}},day:{displayName:"źeń",relative:{0:"źinsa",1:"witśe","-1":"cora"},relativeTime:{future:{one:"za {0} źeń",two:"za {0} dnja",few:"za {0} dny",other:"za {0} dnjow"},past:{one:"pśed {0} dnjom",two:"pśed {0} dnjoma",few:"pśed {0} dnjami",other:"pśed {0} dnjami"}}},hour:{displayName:"góźina",relativeTime:{future:{one:"za {0} góźinu",two:"za {0} góźinje",few:"za {0} góźiny",other:"za {0} góźin"},past:{one:"pśed {0} góźinu",two:"pśed {0} góźinoma",few:"pśed {0} góźinami",other:"pśed {0} góźinami"}}},minute:{displayName:"minuta",relativeTime:{future:{one:"za {0} minutu",two:"za {0} minuśe",few:"za {0} minuty",other:"za {0} minutow"},past:{one:"pśed {0} minutu",two:"pśed {0} minutoma",few:"pśed {0} minutami",other:"pśed {0} minutami"}}},second:{displayName:"sekunda",relative:{0:"now"},relativeTime:{future:{one:"za {0} sekundu",two:"za {0} sekunźe",few:"za {0} sekundy",other:"za {0} sekundow"},past:{one:"pśed {0} sekundu",two:"pśed {0} sekundoma",few:"pśed {0} sekundami",other:"pśed {0} sekundami"}}}}},{locale:"dsb-DE",parentLocale:"dsb"}],module.exports=exports["default"];
},{}]},{},[1])(1)
});