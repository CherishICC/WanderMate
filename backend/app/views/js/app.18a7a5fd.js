(function(e){function n(n){for(var r,a,c=n[0],i=n[1],s=n[2],l=0,d=[];l<c.length;l++)a=c[l],Object.prototype.hasOwnProperty.call(u,a)&&u[a]&&d.push(u[a][0]),u[a]=0;for(r in i)Object.prototype.hasOwnProperty.call(i,r)&&(e[r]=i[r]);f&&f(n);while(d.length)d.shift()();return o.push.apply(o,s||[]),t()}function t(){for(var e,n=0;n<o.length;n++){for(var t=o[n],r=!0,a=1;a<t.length;a++){var c=t[a];0!==u[c]&&(r=!1)}r&&(o.splice(n--,1),e=i(i.s=t[0]))}return e}var r={},a={app:0},u={app:0},o=[];function c(e){return i.p+"js/"+({}[e]||e)+"."+{"chunk-954bfc3e":"3d91413f","chunk-1f8e188e":"56397503","chunk-b44458fa":"5b7c322e","chunk-c4b87de6":"624fa300","chunk-e0f22474":"1ca12cf5","chunk-ece552be":"105d6e48"}[e]+".js"}function i(n){if(r[n])return r[n].exports;var t=r[n]={i:n,l:!1,exports:{}};return e[n].call(t.exports,t,t.exports,i),t.l=!0,t.exports}i.e=function(e){var n=[],t={"chunk-1f8e188e":1,"chunk-b44458fa":1,"chunk-c4b87de6":1,"chunk-e0f22474":1,"chunk-ece552be":1};a[e]?n.push(a[e]):0!==a[e]&&t[e]&&n.push(a[e]=new Promise((function(n,t){for(var r="css/"+({}[e]||e)+"."+{"chunk-954bfc3e":"31d6cfe0","chunk-1f8e188e":"1ae50cfb","chunk-b44458fa":"1ae50cfb","chunk-c4b87de6":"41f1e916","chunk-e0f22474":"41f1e916","chunk-ece552be":"4d9f074c"}[e]+".css",u=i.p+r,o=document.getElementsByTagName("link"),c=0;c<o.length;c++){var s=o[c],l=s.getAttribute("data-href")||s.getAttribute("href");if("stylesheet"===s.rel&&(l===r||l===u))return n()}var d=document.getElementsByTagName("style");for(c=0;c<d.length;c++){s=d[c],l=s.getAttribute("data-href");if(l===r||l===u)return n()}var f=document.createElement("link");f.rel="stylesheet",f.type="text/css",f.onload=n,f.onerror=function(n){var r=n&&n.target&&n.target.src||u,o=new Error("Loading CSS chunk "+e+" failed.\n("+r+")");o.code="CSS_CHUNK_LOAD_FAILED",o.request=r,delete a[e],f.parentNode.removeChild(f),t(o)},f.href=u;var h=document.getElementsByTagName("head")[0];h.appendChild(f)})).then((function(){a[e]=0})));var r=u[e];if(0!==r)if(r)n.push(r[2]);else{var o=new Promise((function(n,t){r=u[e]=[n,t]}));n.push(r[2]=o);var s,l=document.createElement("script");l.charset="utf-8",l.timeout=120,i.nc&&l.setAttribute("nonce",i.nc),l.src=c(e);var d=new Error;s=function(n){l.onerror=l.onload=null,clearTimeout(f);var t=u[e];if(0!==t){if(t){var r=n&&("load"===n.type?"missing":n.type),a=n&&n.target&&n.target.src;d.message="Loading chunk "+e+" failed.\n("+r+": "+a+")",d.name="ChunkLoadError",d.type=r,d.request=a,t[1](d)}u[e]=void 0}};var f=setTimeout((function(){s({type:"timeout",target:l})}),12e4);l.onerror=l.onload=s,document.head.appendChild(l)}return Promise.all(n)},i.m=e,i.c=r,i.d=function(e,n,t){i.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,n){if(1&n&&(e=i(e)),8&n)return e;if(4&n&&"object"===typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(i.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var r in e)i.d(t,r,function(n){return e[n]}.bind(null,r));return t},i.n=function(e){var n=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(n,"a",n),n},i.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},i.p="/",i.oe=function(e){throw console.error(e),e};var s=window["webpackJsonp"]=window["webpackJsonp"]||[],l=s.push.bind(s);s.push=n,s=s.slice();for(var d=0;d<s.length;d++)n(s[d]);var f=l;o.push([0,"chunk-vendors"]),t()})({0:function(e,n,t){e.exports=t("56d7")},"56d7":function(e,n,t){"use strict";t.r(n);t("e260"),t("e6cf"),t("cca6"),t("a79d");var r=t("2b0e"),a=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{attrs:{id:"app"}},[t("nav",{staticClass:"navbar navbar-expand navbar-dark bg-dark"},[t("router-link",{staticClass:"navbar-brand",attrs:{to:"/"}},[e._v("WanderMate")]),t("div",{staticClass:"navbar-nav mr-auto"},[t("li",{staticClass:"nav-item"},[t("router-link",{staticClass:"nav-link",attrs:{to:"/guides"}},[e._v("Guides")])],1),t("li",{staticClass:"nav-item"},[t("router-link",{staticClass:"nav-link",attrs:{to:"/add-guide"}},[e._v("Add Guide")])],1),t("li",{staticClass:"nav-item"},[t("router-link",{staticClass:"nav-link",attrs:{to:"/users"}},[e._v("Users")])],1)])],1),t("div",{staticClass:"container mt-3"},[t("router-view")],1)])},u=[],o={name:"app"},c=o,i=t("2877"),s=Object(i["a"])(c,a,u,!1,null,null,null),l=s.exports,d=(t("d3b7"),t("3ca3"),t("ddb0"),t("8c4f"));r["a"].use(d["a"]);var f=new d["a"]({routes:[{path:"/",alias:"/guides",name:"guides",component:function(){return Promise.all([t.e("chunk-954bfc3e"),t.e("chunk-1f8e188e")]).then(t.bind(null,"995d"))}},{path:"/guides/:id",name:"guides-details",component:function(){return Promise.all([t.e("chunk-954bfc3e"),t.e("chunk-e0f22474")]).then(t.bind(null,"f908"))}},{path:"/add-guide",name:"add-guide",component:function(){return Promise.all([t.e("chunk-954bfc3e"),t.e("chunk-ece552be")]).then(t.bind(null,"531c"))}},{path:"/users",name:"users",component:function(){return Promise.all([t.e("chunk-954bfc3e"),t.e("chunk-b44458fa")]).then(t.bind(null,"df1d"))}},{path:"/users/:id",name:"users-details",component:function(){return Promise.all([t.e("chunk-954bfc3e"),t.e("chunk-c4b87de6")]).then(t.bind(null,"7088"))}}]});r["a"].config.productionTip=!1,new r["a"]({router:f,render:function(e){return e(l)}}).$mount("#app")}});
//# sourceMappingURL=app.18a7a5fd.js.map