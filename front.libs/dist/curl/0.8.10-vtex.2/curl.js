(function(){/*
 MIT License (c) copyright 2010-2013 B Cavalier & J Hann */
(function(y){function T(){}function m(a,b){return 0==Z.call(a).indexOf("[object "+b)}function H(a){return a&&"/"==a.charAt(a.length-1)?a.substr(0,a.length-1):a}function U(a,b){var d,c,e,f;d=1;c=a;"."==c.charAt(0)&&(e=!0,c=c.replace($,function(a,b,c,e){c&&d++;return e||""}));if(e){e=b.split("/");f=e.length-d;if(0>f)return a;e.splice(f,d);return e.concat(c||[]).join("/")}return c}function I(a){var b=a.indexOf("!");return{f:a.substr(b+1),d:0<=b&&a.substr(0,b)}}function O(){}function t(a,b){O.prototype=
a||P;var d=new O;O.prototype=P;for(var c in b)d[c]=b[c];return d}function J(){function a(a,b,d){c.push([a,b,d])}function b(a,b){for(var d,e=0;d=c[e++];)(d=d[a])&&d(b)}var d,c,e;d=this;c=[];e=function(d,g){a=d?function(a){a&&a(g)}:function(a,b){b&&b(g)};e=T;b(d?0:1,g);b=T;c=k};this.then=function(b,c,e){a(b,c,e);return d};this.resolve=function(a){d.ma=a;e(!0,a)};this.reject=function(a){d.la=a;e(!1,a)};this.s=function(a){b(2,a)}}function K(a){return a instanceof J||a instanceof A}function u(a,b,d,c){K(a)?
a.then(b,d,c):b(a)}function B(a,b,d){var c;return function(){0<=--a&&b&&(c=b.apply(k,arguments));0==a&&d&&d(c);return c}}function z(){var a,b;C="";a=[].slice.call(arguments);m(a[0],"Object")&&(b=a.shift(),b=L(b));return new A(a[0],a[1],a[2],b)}function L(a,b,d){var c;C="";if(a&&(h.M(a),v=h.a(a),"preloads"in a&&(c=new A(a.preloads,k,d,D,!0),h.j(function(){D=c})),a=a.main))return new A(a,b,d)}function A(a,b,d,c,e){var f;f=h.h(v,k,[].concat(a),e);this.then=this.then=a=function(a,b){u(f,function(b){a&&
a.apply(k,b)},function(a){if(b)b(a);else throw a;});return this};this.next=function(a,b,c){return new A(a,b,c,f)};this.config=L;(b||d)&&a(b,d);h.j(function(){u(e||D,function(){u(c,function(){h.o(f)},d)})})}function V(a){var b,d;b=a.id;b==k&&(E!==k?E={C:"Multiple anonymous defines encountered"}:(b=h.Z())||(E=a));if(b!=k){d=l[b];b in l||(d=h.g(b,v),d=h.w(d.a,b),l[b]=d);if(!K(d))throw Error("duplicate define: "+b);d.aa=!1;h.A(d,a)}}function Q(){var a=h.W(arguments);V(a)}var C,v,w,F,x=window.document,
R=x&&(x.head||x.getElementsByTagName("head")[0]),aa=R&&R.getElementsByTagName("base")[0]||null,W={},X={},M={},ba="addEventListener"in window?{}:{loaded:1,complete:1},P={},Z=P.toString,k,l={},N={},D=!1,E,Y=/^\/|^[^:]+:\/\/|^[A-Za-z]:[\\/]/,$=/(\.)(\.?)(?:$|\/([^\.\/]+.*)?)/g,ca=/\/\*[\s\S]*?\*\/|\/\/.*?[\n\r]/g,da=/require\s*\(\s*(["'])(.*?[^\\])\1\s*\)|[^\\]?(["'])/g,ea=/\s*,\s*/,S,h;h={k:function(a,b,d){var c;a=U(a,b);if("."==a.charAt(0))return a;c=I(a);a=(b=c.d)||c.f;a in d.c&&(a=d.c[a].I||a);b&&
(0>b.indexOf("/")&&!(b in d.c)&&(a=H(d.K)+"/"+b),a=a+"!"+c.f);return a},h:function(a,b,d,c){function e(b,c){var d,f;d=h.k(b,g.id,a);if(!c)return d;f=I(d);if(!f.d)return d;d=l[f.d];f.f="normalize"in d?d.normalize(f.f,e,g.a)||"":e(f.f);return f.d+"!"+f.f}function f(b,d,f){var p;p=d&&function(a){d.apply(k,a)};if(m(b,"String")){if(p)throw Error("require(id, callback) not allowed");f=e(b,!0);b=l[f];if(!(f in l))throw Error("Module not resolved: "+f);return(f=K(b)&&b.b)||b}u(h.o(h.h(a,g.id,b,c)),p,f)}var g;
g=new J;g.id=b||"";g.$=c;g.B=d;g.a=a;g.t=f;f.toUrl=function(b){return h.g(e(b,!0),a).url};g.k=e;return g},w:function(a,b,d){var c,e,f;c=h.h(a,b,k,d);e=c.resolve;f=B(1,function(a){c.n=a;try{return h.Q(c)}catch(b){c.reject(b)}});c.resolve=function(a){u(d||D,function(){e(l[c.id]=N[c.url]=f(a))})};c.D=function(a){u(d||D,function(){c.b&&(f(a),c.s(X))})};return c},P:function(a,b,d,c){return h.h(a,d,k,c)},Y:function(a){return a.t},F:function(a){return a.b||(a.b={})},X:function(a){var b=a.p;b||(b=a.p={id:a.id,
uri:h.G(a),exports:h.F(a),config:function(){return a.a}},b.b=b.exports);return b},G:function(a){return a.url||(a.url=h.v(a.t.toUrl(a.id),a.a))},M:function(a){var b,d,c,e,f;b="curl";d="define";c=e=y;if(a&&(f=a.overwriteApi||a.ja,b=a.apiName||a.ca||b,c=a.apiContext||a.ba||c,d=a.defineName||a.ea||d,e=a.defineContext||a.da||e,w&&m(w,"Function")&&(y.curl=w),w=null,F&&m(F,"Function")&&(y.define=F),F=null,!f)){if(c[b]&&c[b]!=z)throw Error(b+" already exists");if(e[d]&&e[d]!=Q)throw Error(d+" already exists");
}c[b]=z;e[d]=Q},a:function(a){function b(a,b){var d,c,g,n,q;for(q in a){g=a[q];m(g,"String")&&(g={path:a[q]});g.name=g.name||q;n=e;c=I(H(g.name));d=c.f;if(c=c.d)n=f[c],n||(n=f[c]=t(e),n.c=t(e.c),n.e=[]),delete a[q];c=g;var l=b,G=void 0;c.path=H(c.path||c.location||"");l&&(G=c.main||"./main","."==G.charAt(0)||(G="./"+G),c.I=U(G,c.name+"/"));c.a=c.config;c.a&&(c.a=t(e,c.a));c.N=d.split("/").length;d?(n.c[d]=c,n.e.push(d)):n.l=h.L(g.path,e)}}function d(a){var b=a.c;a.J=new RegExp("^("+a.e.sort(function(a,
c){return b[c].N-b[a].N}).join("|").replace(/\/|\./g,"\\$&")+")(?=\\/|$)");delete a.e}var c,e,f,g;"baseUrl"in a&&(a.l=a.baseUrl);"main"in a&&(a.I=a.main);"preloads"in a&&(a.ka=a.preloads);"pluginPath"in a&&(a.K=a.pluginPath);if("dontAddFileExt"in a||a.i)a.i=new RegExp(a.dontAddFileExt||a.i);c=v;e=t(c,a);e.c=t(c.c);f=a.plugins||{};e.plugins=t(c.plugins);e.r=t(c.r,a.r);e.q=t(c.q,a.q);e.e=[];b(a.packages,!0);b(a.paths,!1);for(g in f)a=h.k(g+"!","",e),e.plugins[a.substr(0,a.length-1)]=f[g];f=e.plugins;
for(g in f)if(f[g]=t(e,f[g]),a=f[g].e)f[g].e=a.concat(e.e),d(f[g]);for(g in c.c)e.c.hasOwnProperty(g)||e.e.push(g);d(e);return e},g:function(a,b){var d,c,e,f;d=b.c;e=Y.test(a)?a:a.replace(b.J,function(a){c=d[a]||{};f=c.a;return c.path||""});return{a:f||v,url:h.L(e,b)}},L:function(a,b){var d=b.l;return d&&!Y.test(a)?H(d)+"/"+a:a},v:function(a,b){return a+((b||v).i.test(a)?"":".js")},H:function(a,b,d){var c=x.createElement("script");c.onload=c.onreadystatechange=function(d){d=d||window.event;if("load"==
d.type||ba[c.readyState])delete M[a.id],c.onload=c.onreadystatechange=c.onerror="",b()};c.onerror=function(){d(Error("Syntax or http error: "+a.url))};c.type=a.ga||"text/javascript";c.charset="utf-8";c.async=!a.ia;c.src=a.url;M[a.id]=c;R.insertBefore(c,aa);return c},R:function(a){var b=[],d;("string"==typeof a?a:a.toSource?a.toSource():a.toString()).replace(ca,"").replace(da,function(a,e,f,g){g?d=d==g?k:d:d||b.push(f);return""});return b},W:function(a){var b,d,c,e,f,g;f=a.length;c=a[f-1];e=m(c,"Function")?
c.length:-1;2==f?m(a[0],"Array")?d=a[0]:b=a[0]:3==f&&(b=a[0],d=a[1]);!d&&0<e&&(g=!0,d=["require","exports","module"].slice(0,e).concat(h.R(c)));return{id:b,n:d||[],u:0<=e?c:function(){return c},m:g}},Q:function(a){var b;b=a.u.apply(a.m?a.b:k,a.n);b===k&&a.b&&(b=a.p?a.b=a.p.exports:a.b);return b},A:function(a,b){a.u=b.u;a.m=b.m;a.B=b.n;h.o(a)},o:function(a){function b(a,b,c){g[b]=a;c&&r(a,b)}function d(b,c){var d,e,f,g;d=B(1,function(a){e(a);p(a,c)});e=B(1,function(a){r(a,c)});f=h.T(b,a);(g=K(f)&&
f.b)&&e(g);u(f,d,a.reject,a.b&&function(a){f.b&&(a==W?e(f.b):a==X&&d(f.b))})}function c(){a.resolve(g)}var e,f,g,l,s,r,p;g=[];f=a.B;l=f.length;0==f.length&&c();r=B(l,b,function(){a.D&&a.D(g)});p=B(l,b,c);for(e=0;e<l;e++)s=f[e],s in S?(p(S[s](a),e,!0),a.b&&a.s(W)):s?d(s,e):p(k,e,!0);return a},U:function(a){h.G(a);h.H(a,function(){var b=E;E=k;!1!==a.aa&&(!b||b.C?a.reject(Error(b&&b.C||"define() missing or duplicated: "+a.url)):h.A(a,b))},a.reject);return a},T:function(a,b){var d,c,e,f,g,k,s,r,p,m,n,
q;d=b.k;c=b.$;e=b.a||v;g=d(a);g in l?k=g:(f=I(g),r=f.f,k=f.d||r,p=h.g(k,e));if(!(g in l))if(q=h.g(r,e).a,f.d)s=k;else if(s=q.moduleLoader||q.ha||q.loader||q.fa)r=k,k=s,p=h.g(s,e);k in l?m=l[k]:p.url in N?m=l[k]=N[p.url]:(m=h.w(q,k,c),m.url=h.v(p.url,p.a),l[k]=N[p.url]=m,h.U(m));k==s&&(f.d&&e.plugins[f.d]&&(q=e.plugins[f.d]),n=new J,u(m,function(a){var b,e,f;f=a.dynamic;r="normalize"in a?a.normalize(r,d,m.a)||"":d(r);e=s+"!"+r;b=l[e];if(!(e in l)){b=h.P(q,e,r,c);f||(l[e]=b);var g=function(a){f||(l[e]=
a);b.resolve(a)};g.resolve=g;g.reject=g.error=b.reject;a.load(r,b.t,g,q)}n!=b&&u(b,n.resolve,n.reject,n.s)},n.reject));return n||m},Z:function(){var a;if(!m(window.opera,"Opera"))for(var b in M)if("interactive"==M[b].readyState){a=b;break}return a},V:function(a){var b=0,d,c;for(d=x&&(x.scripts||x.getElementsByTagName("script"));d&&(c=d[b++]);)if(a(c))return c},S:function(){var a,b="";(a=h.V(function(a){(a=a.getAttribute("data-curl-run"))&&(b=a);return a}))&&a.setAttribute("data-curl-run","");return b},
O:function(){function a(){h.H({url:c.shift()},b,b)}function b(){C&&(c.length?(h.j(d),a()):d("run.js script did not run."))}function d(a){throw Error(a||"Primary run.js failed. Trying fallback.");}var c=C.split(ea);c.length&&a()},j:function(a){setTimeout(a,0)}};S={require:h.Y,exports:h.F,module:h.X};z.version="0.8.10-vtex.1";z.config=L;Q.amd={plugins:!0,jQuery:!0,curl:"0.8.10-vtex.1"};v={l:"",K:"curl/plugin",i:/\?|\.js\b/,r:{},q:{},plugins:{},c:{},J:/$^/};w=y.curl;F=y.define;w&&m(w,"Object")?(y.curl=
k,L(w)):h.M();(C=h.S())&&h.j(h.O);l.curl=z;l["curl/_privileged"]={core:h,cache:l,config:function(){return v},_define:V,_curl:z,Promise:J}})(window.vtex||(window.vtex={}));
}).call(this);
