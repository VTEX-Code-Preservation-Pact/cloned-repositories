/*! front-phone - v4.3.12 - https://vtex.github.io/front.phone/ */
!function(e){function n(o){if(t[o])return t[o].exports;var r=t[o]={exports:{},id:o,loaded:!1};return e[o].call(r.exports,r,r.exports,n),r.loaded=!0,r.exports}var t={};return n.m=e,n.c=t,n.p="/@vtex/phone/script/",n(0)}([function(e,n,t){window.angular.module("vtex.phoneFilter",[]).filter("phone",["$window",function(e){return function(n,t,o){var r;return n?(o&&(r=e.vtex.phone.getPhoneNational(n,o)),r&&o||(r=e.vtex.phone.getPhoneInternational(n)),t=t?e.vtex.phone[t.toUpperCase()]:e.vtex.phone.INTERNATIONAL,e.vtex.phone.format(r,t)):"N/A"}}])}]);