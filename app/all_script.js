/* svsdesigns / Surendra V. Singh / 2015-02-10 */
!function(){"use strict";var a,b;b=function(){function b(a,b){return encodeURIComponent(b?b+"["+a+"]":a)}function c(a,c){var d,e,f=[];for(d in a)if(a.hasOwnProperty(d)){var g=a[d];if(g instanceof Array)for(e=0;e<g.length;e++){var h=encodeURIComponent(g[e]);f.push(b(d,c)+"%5B%5D="+h)}else f.push("object"==typeof g?this.object_to_params(g,b(d,c)):b(d,c)+"="+encodeURIComponent(g))}return f.join("&")}var d,e,f,g,h,i,j,k,l,b,c,m,n,o=this,p="https://api.500px.com/",q="v1",r=p+q,s={};for(this.init=function(a){if(this.sdk_key)throw"init: Already initialized";if(!a||!a.sdk_key)throw"init: You must specify an sdk key";if(!document.body)throw"init: Could not find the body element, make sure the document is loaded before calling init";this.sdk_key=a.sdk_key,a&&a.oauth_token&&(d=a.oauth_token);var b,c=document.createElement("div");c.id="_500px_container",c.style.display="none",c.style.width=0,c.style.height=0,c.style.border=0,c.style.margin=0,c.style.padding=0,document.body.appendChild(c),e=document.getElementById("_500px_container"),b=function(){var a=document.getElementById("_500px_container");return document.body.removeChild(a),null}},this.api=function(){if(!this.sdk_key)throw"api: SDK not initialized. Use _500px.init() first.";var a,b,e,f,g,h,i,j;if(a=Array.prototype.slice.call(arguments),b=a.shift(),!b||""==b.replace(/^\s*/,"").replace(/\s*$/,""))throw"api: You must specify an end point";e="get",a[0]&&"string"==typeof a[0]&&(e=a.shift()),f={},a[0]&&"object"==typeof a[0]&&(f=a.shift()),g=function(){},a[0]&&"function"==typeof a[0]&&(g=a.shift()),f._method=e,d&&(f.oauth_token=d),f.sdk_key=this.sdk_key,h=document.createElement("script"),i=k(),window[i]=function(a){document.body.removeChild(h),l(g)(a)},j=r+b+".jsonp",f.callback=i,j+="?",j+=c(f),h.src=j,document.body.appendChild(h)},this.login=function(a){if(!this.sdk_key)throw"login: SDK not initialized. Use _500px.init() first.";var b,c,d;b=k(),window[b]=function(b){n.call(o,a,b)},c=screen.width/2-620,d=screen.height/2-240,window.open(p+"api/js-sdk/authorize?sdk_key="+this.sdk_key+"&callback="+b,"500px_js_sdk_login","width=1240,height=480,left="+c+",top="+d+",menu=no,location=yes,scrollbars=no,status=no,toolbar=no")},this.authorize=function(a){if(!this.sdk_key)throw"authorize: SDK not initialized. Use _500px.init() first.";this.login(a)},this.ensureAuthorization=function(a){if(!this.sdk_key)throw"ensureAuthorization: SDK not initialized. Use _500px.init() first.";var b=function(){a&&a.call(o)};return d?void b():void this.getAuthorizationStatus(function(a){"authorized"==a?b():o.login(function(a){"authorized"==a&&b()})})},this.getAuthorizationStatus=function(a){if(!this.sdk_key)throw"getAuthorizationStatus: SDK not initialized. Use _500px.init() first.";var b=k(),c=document.createElement("iframe");window[b]=function(b){setTimeout(function(){e.removeChild(c)},0),b.not_logged_in?(d=null,a&&"function"==typeof a&&a("not_logged_in")):b.not_authorized?(d=null,a&&"function"==typeof a&&a("not_authorized")):b.token&&(d=b.token,m("authorization_obtained"),a&&"function"==typeof a&&a("authorized"))},c.src=p+"api/js-sdk/check_authorization?sdk_key="+this.sdk_key+"&callback="+b,e.appendChild(c)},this.on=function(a,b){if(s[a]||(s[a]=[]),"function"!=typeof b)throw"on: Callback is not a function";s[a].push(b)},this.off=function(a,b){var c,d;if(b){if(!s[a])return;for(c=0;c<s[a].length;c++)d=s[a][c],d==b&&(s[a][c]=void 0)}else s[a]=[]},this.logout=function(a){if(!this.sdk_key)throw"logout: SDK not initialized. Use _500px.init() first.";if(!d)throw"logout: User is not logged in";var b,c,f=k(),g=document.createElement("iframe");window[f]=function(b){var c;setTimeout(function(){e.removeChild(g)},0),b.no_token_specified?c="no_token_specified":b.invalid_token?c="invalid_token":b.not_logged_in?c="not_logged_in":b.logged_out&&(c="logged_out"),a&&"function"==typeof a&&a(c),m("logout")},navigator.userAgent.match(/MSIE/)?(b=screen.width/2-620,c=screen.height/2-240,window.open(p+"api/js-sdk/authorize?sdk_key="+this.sdk_key+"&token="+d+"&_method=delete&callback="+f,"500px_logout_window","width=1240,height=480,left="+b+",top="+c+",menu=no,location=yes,scrollbars=no,status=yes,toolbar=yes")):g.src=p+"api/js-sdk/authorize?sdk_key="+this.sdk_key+"&token="+d+"&_method=delete&callback="+f,e.appendChild(g)},m=function(a){if(s[a]){var b;for(b=0;b<s[a].length;b++)s[a][b].call(o)}},n=function(a,b){b.denied&&a&&"function"==typeof a?(m("authorization_cancelled"),a.call(o,"denied")):b.token&&(d=b.token,m("authorization_obtained"),a&&"function"==typeof a&&a.call(o,"authorized"))},l=function(b){return function(c){var e=new a(c);b.call(o,e),c.status&&401==c.status&&(d=null,m("logout"))}},k=function(){return"_500pxCallback"+String(Math.round(1e8*Math.random()))},f=["init","api","login","authorize","ensureAuthorization","getAuthorizationStatus","on","off","logout"],g=function(a){return function(){a.apply(o,arguments)}},h=0;h<f.length;h++)i=f[h],j=this[i],this[i]=g(j)},window._500px=new b,a=function(a){this.success=!0,a.status&&200!=a.status&&a.error&&(this.success=!1,this.error_message=a.error,this.status=a.status),this.status||(this.status=200),this.error=!this.success,this.data=a}}();
(function(N,f,W){'use strict';f.module("ngAnimate",["ng"]).directive("ngAnimateChildren",function(){return function(X,C,g){g=g.ngAnimateChildren;f.isString(g)&&0===g.length?C.data("$$ngAnimateChildren",!0):X.$watch(g,function(f){C.data("$$ngAnimateChildren",!!f)})}}).factory("$$animateReflow",["$$rAF","$document",function(f,C){return function(g){return f(function(){g()})}}]).config(["$provide","$animateProvider",function(X,C){function g(f){for(var n=0;n<f.length;n++){var g=f[n];if(1==g.nodeType)return g}}
function ba(f,n){return g(f)==g(n)}var t=f.noop,n=f.forEach,da=C.$$selectors,aa=f.isArray,ea=f.isString,ga=f.isObject,r={running:!0},u;X.decorator("$animate",["$delegate","$$q","$injector","$sniffer","$rootElement","$$asyncCallback","$rootScope","$document","$templateRequest","$$jqLite",function(O,N,M,Y,y,H,P,W,Z,Q){function R(a,c){var b=a.data("$$ngAnimateState")||{};c&&(b.running=!0,b.structural=!0,a.data("$$ngAnimateState",b));return b.disabled||b.running&&b.structural}function D(a){var c,b=N.defer();
b.promise.$$cancelFn=function(){c&&c()};P.$$postDigest(function(){c=a(function(){b.resolve()})});return b.promise}function I(a){if(ga(a))return a.tempClasses&&ea(a.tempClasses)&&(a.tempClasses=a.tempClasses.split(/\s+/)),a}function S(a,c,b){b=b||{};var d={};n(b,function(e,a){n(a.split(" "),function(a){d[a]=e})});var h=Object.create(null);n((a.attr("class")||"").split(/\s+/),function(e){h[e]=!0});var f=[],l=[];n(c&&c.classes||[],function(e,a){var b=h[a],c=d[a]||{};!1===e?(b||"addClass"==c.event)&&
l.push(a):!0===e&&(b&&"removeClass"!=c.event||f.push(a))});return 0<f.length+l.length&&[f.join(" "),l.join(" ")]}function T(a){if(a){var c=[],b={};a=a.substr(1).split(".");(Y.transitions||Y.animations)&&c.push(M.get(da[""]));for(var d=0;d<a.length;d++){var f=a[d],k=da[f];k&&!b[f]&&(c.push(M.get(k)),b[f]=!0)}return c}}function U(a,c,b,d){function h(e,a){var b=e[a],c=e["before"+a.charAt(0).toUpperCase()+a.substr(1)];if(b||c)return"leave"==a&&(c=b,b=null),u.push({event:a,fn:b}),J.push({event:a,fn:c}),
!0}function k(c,l,w){var E=[];n(c,function(a){a.fn&&E.push(a)});var m=0;n(E,function(c,f){var p=function(){a:{if(l){(l[f]||t)();if(++m<E.length)break a;l=null}w()}};switch(c.event){case "setClass":l.push(c.fn(a,e,A,p,d));break;case "animate":l.push(c.fn(a,b,d.from,d.to,p));break;case "addClass":l.push(c.fn(a,e||b,p,d));break;case "removeClass":l.push(c.fn(a,A||b,p,d));break;default:l.push(c.fn(a,p,d))}});l&&0===l.length&&w()}var l=a[0];if(l){d&&(d.to=d.to||{},d.from=d.from||{});var e,A;aa(b)&&(e=
b[0],A=b[1],e?A?b=e+" "+A:(b=e,c="addClass"):(b=A,c="removeClass"));var w="setClass"==c,E=w||"addClass"==c||"removeClass"==c||"animate"==c,p=a.attr("class")+" "+b;if(x(p)){var ca=t,m=[],J=[],g=t,s=[],u=[],p=(" "+p).replace(/\s+/g,".");n(T(p),function(a){!h(a,c)&&w&&(h(a,"addClass"),h(a,"removeClass"))});return{node:l,event:c,className:b,isClassBased:E,isSetClassOperation:w,applyStyles:function(){d&&a.css(f.extend(d.from||{},d.to||{}))},before:function(a){ca=a;k(J,m,function(){ca=t;a()})},after:function(a){g=
a;k(u,s,function(){g=t;a()})},cancel:function(){m&&(n(m,function(a){(a||t)(!0)}),ca(!0));s&&(n(s,function(a){(a||t)(!0)}),g(!0))}}}}}function G(a,c,b,d,h,k,l,e){function A(e){var l="$animate:"+e;J&&J[l]&&0<J[l].length&&H(function(){b.triggerHandler(l,{event:a,className:c})})}function w(){A("before")}function E(){A("after")}function p(){p.hasBeenRun||(p.hasBeenRun=!0,k())}function g(){if(!g.hasBeenRun){m&&m.applyStyles();g.hasBeenRun=!0;l&&l.tempClasses&&n(l.tempClasses,function(a){u.removeClass(b,
a)});var w=b.data("$$ngAnimateState");w&&(m&&m.isClassBased?B(b,c):(H(function(){var e=b.data("$$ngAnimateState")||{};fa==e.index&&B(b,c,a)}),b.data("$$ngAnimateState",w)));A("close");e()}}var m=U(b,a,c,l);if(!m)return p(),w(),E(),g(),t;a=m.event;c=m.className;var J=f.element._data(m.node),J=J&&J.events;d||(d=h?h.parent():b.parent());if(z(b,d))return p(),w(),E(),g(),t;d=b.data("$$ngAnimateState")||{};var L=d.active||{},s=d.totalActive||0,q=d.last;h=!1;if(0<s){s=[];if(m.isClassBased)"setClass"==q.event?
(s.push(q),B(b,c)):L[c]&&(v=L[c],v.event==a?h=!0:(s.push(v),B(b,c)));else if("leave"==a&&L["ng-leave"])h=!0;else{for(var v in L)s.push(L[v]);d={};B(b,!0)}0<s.length&&n(s,function(a){a.cancel()})}!m.isClassBased||m.isSetClassOperation||"animate"==a||h||(h="addClass"==a==b.hasClass(c));if(h)return p(),w(),E(),A("close"),e(),t;L=d.active||{};s=d.totalActive||0;if("leave"==a)b.one("$destroy",function(a){a=f.element(this);var e=a.data("$$ngAnimateState");e&&(e=e.active["ng-leave"])&&(e.cancel(),B(a,"ng-leave"))});
u.addClass(b,"ng-animate");l&&l.tempClasses&&n(l.tempClasses,function(a){u.addClass(b,a)});var fa=K++;s++;L[c]=m;b.data("$$ngAnimateState",{last:m,active:L,index:fa,totalActive:s});w();m.before(function(e){var l=b.data("$$ngAnimateState");e=e||!l||!l.active[c]||m.isClassBased&&l.active[c].event!=a;p();!0===e?g():(E(),m.after(g))});return m.cancel}function q(a){if(a=g(a))a=f.isFunction(a.getElementsByClassName)?a.getElementsByClassName("ng-animate"):a.querySelectorAll(".ng-animate"),n(a,function(a){a=
f.element(a);(a=a.data("$$ngAnimateState"))&&a.active&&n(a.active,function(a){a.cancel()})})}function B(a,c){if(ba(a,y))r.disabled||(r.running=!1,r.structural=!1);else if(c){var b=a.data("$$ngAnimateState")||{},d=!0===c;!d&&b.active&&b.active[c]&&(b.totalActive--,delete b.active[c]);if(d||!b.totalActive)u.removeClass(a,"ng-animate"),a.removeData("$$ngAnimateState")}}function z(a,c){if(r.disabled)return!0;if(ba(a,y))return r.running;var b,d,g;do{if(0===c.length)break;var k=ba(c,y),l=k?r:c.data("$$ngAnimateState")||
{};if(l.disabled)return!0;k&&(g=!0);!1!==b&&(k=c.data("$$ngAnimateChildren"),f.isDefined(k)&&(b=k));d=d||l.running||l.last&&!l.last.isClassBased}while(c=c.parent());return!g||!b&&d}u=Q;y.data("$$ngAnimateState",r);var $=P.$watch(function(){return Z.totalPendingRequests},function(a,c){0===a&&($(),P.$$postDigest(function(){P.$$postDigest(function(){r.running=!1})}))}),K=0,V=C.classNameFilter(),x=V?function(a){return V.test(a)}:function(){return!0};return{animate:function(a,c,b,d,h){d=d||"ng-inline-animate";
h=I(h)||{};h.from=b?c:null;h.to=b?b:c;return D(function(b){return G("animate",d,f.element(g(a)),null,null,t,h,b)})},enter:function(a,c,b,d){d=I(d);a=f.element(a);c=c&&f.element(c);b=b&&f.element(b);R(a,!0);O.enter(a,c,b);return D(function(h){return G("enter","ng-enter",f.element(g(a)),c,b,t,d,h)})},leave:function(a,c){c=I(c);a=f.element(a);q(a);R(a,!0);return D(function(b){return G("leave","ng-leave",f.element(g(a)),null,null,function(){O.leave(a)},c,b)})},move:function(a,c,b,d){d=I(d);a=f.element(a);
c=c&&f.element(c);b=b&&f.element(b);q(a);R(a,!0);O.move(a,c,b);return D(function(h){return G("move","ng-move",f.element(g(a)),c,b,t,d,h)})},addClass:function(a,c,b){return this.setClass(a,c,[],b)},removeClass:function(a,c,b){return this.setClass(a,[],c,b)},setClass:function(a,c,b,d){d=I(d);a=f.element(a);a=f.element(g(a));if(R(a))return O.$$setClassImmediately(a,c,b,d);var h,k=a.data("$$animateClasses"),l=!!k;k||(k={classes:{}});h=k.classes;c=aa(c)?c:c.split(" ");n(c,function(a){a&&a.length&&(h[a]=
!0)});b=aa(b)?b:b.split(" ");n(b,function(a){a&&a.length&&(h[a]=!1)});if(l)return d&&k.options&&(k.options=f.extend(k.options||{},d)),k.promise;a.data("$$animateClasses",k={classes:h,options:d});return k.promise=D(function(e){var l=a.parent(),b=g(a),c=b.parentNode;if(!c||c.$$NG_REMOVED||b.$$NG_REMOVED)e();else{b=a.data("$$animateClasses");a.removeData("$$animateClasses");var c=a.data("$$ngAnimateState")||{},d=S(a,b,c.active);return d?G("setClass",d,a,l,null,function(){d[0]&&O.$$addClassImmediately(a,
d[0]);d[1]&&O.$$removeClassImmediately(a,d[1])},b.options,e):e()}})},cancel:function(a){a.$$cancelFn()},enabled:function(a,c){switch(arguments.length){case 2:if(a)B(c);else{var b=c.data("$$ngAnimateState")||{};b.disabled=!0;c.data("$$ngAnimateState",b)}break;case 1:r.disabled=!a;break;default:a=!r.disabled}return!!a}}}]);C.register("",["$window","$sniffer","$timeout","$$animateReflow",function(r,C,M,Y){function y(){b||(b=Y(function(){c=[];b=null;x={}}))}function H(a,e){b&&b();c.push(e);b=Y(function(){n(c,
function(a){a()});c=[];b=null;x={}})}function P(a,e){var b=g(a);a=f.element(b);k.push(a);b=Date.now()+e;b<=h||(M.cancel(d),h=b,d=M(function(){X(k);k=[]},e,!1))}function X(a){n(a,function(a){(a=a.data("$$ngAnimateCSS3Data"))&&n(a.closeAnimationFns,function(a){a()})})}function Z(a,e){var b=e?x[e]:null;if(!b){var c=0,d=0,f=0,g=0;n(a,function(a){if(1==a.nodeType){a=r.getComputedStyle(a)||{};c=Math.max(Q(a[z+"Duration"]),c);d=Math.max(Q(a[z+"Delay"]),d);g=Math.max(Q(a[K+"Delay"]),g);var e=Q(a[K+"Duration"]);
0<e&&(e*=parseInt(a[K+"IterationCount"],10)||1);f=Math.max(e,f)}});b={total:0,transitionDelay:d,transitionDuration:c,animationDelay:g,animationDuration:f};e&&(x[e]=b)}return b}function Q(a){var e=0;a=ea(a)?a.split(/\s*,\s*/):[];n(a,function(a){e=Math.max(parseFloat(a)||0,e)});return e}function R(b,e,c,d){b=0<=["ng-enter","ng-leave","ng-move"].indexOf(c);var f,p=e.parent(),h=p.data("$$ngAnimateKey");h||(p.data("$$ngAnimateKey",++a),h=a);f=h+"-"+g(e).getAttribute("class");var p=f+" "+c,h=x[p]?++x[p].total:
0,m={};if(0<h){var n=c+"-stagger",m=f+" "+n;(f=!x[m])&&u.addClass(e,n);m=Z(e,m);f&&u.removeClass(e,n)}u.addClass(e,c);var n=e.data("$$ngAnimateCSS3Data")||{},k=Z(e,p);f=k.transitionDuration;k=k.animationDuration;if(b&&0===f&&0===k)return u.removeClass(e,c),!1;c=d||b&&0<f;b=0<k&&0<m.animationDelay&&0===m.animationDuration;e.data("$$ngAnimateCSS3Data",{stagger:m,cacheKey:p,running:n.running||0,itemIndex:h,blockTransition:c,closeAnimationFns:n.closeAnimationFns||[]});p=g(e);c&&(I(p,!0),d&&e.css(d));
b&&(p.style[K+"PlayState"]="paused");return!0}function D(a,e,b,c,d){function f(){e.off(D,h);u.removeClass(e,k);u.removeClass(e,t);z&&M.cancel(z);G(e,b);var a=g(e),c;for(c in s)a.style.removeProperty(s[c])}function h(a){a.stopPropagation();var b=a.originalEvent||a;a=b.$manualTimeStamp||b.timeStamp||Date.now();b=parseFloat(b.elapsedTime.toFixed(3));Math.max(a-H,0)>=C&&b>=x&&c()}var m=g(e);a=e.data("$$ngAnimateCSS3Data");if(-1!=m.getAttribute("class").indexOf(b)&&a){var k="",t="";n(b.split(" "),function(a,
b){var e=(0<b?" ":"")+a;k+=e+"-active";t+=e+"-pending"});var s=[],q=a.itemIndex,v=a.stagger,r=0;if(0<q){r=0;0<v.transitionDelay&&0===v.transitionDuration&&(r=v.transitionDelay*q);var y=0;0<v.animationDelay&&0===v.animationDuration&&(y=v.animationDelay*q,s.push(B+"animation-play-state"));r=Math.round(100*Math.max(r,y))/100}r||(u.addClass(e,k),a.blockTransition&&I(m,!1));var F=Z(e,a.cacheKey+" "+k),x=Math.max(F.transitionDuration,F.animationDuration);if(0===x)u.removeClass(e,k),G(e,b),c();else{!r&&
d&&(F.transitionDuration||(e.css("transition",F.animationDuration+"s linear all"),s.push("transition")),e.css(d));var q=Math.max(F.transitionDelay,F.animationDelay),C=1E3*q;0<s.length&&(v=m.getAttribute("style")||"",";"!==v.charAt(v.length-1)&&(v+=";"),m.setAttribute("style",v+" "));var H=Date.now(),D=V+" "+$,q=1E3*(r+1.5*(q+x)),z;0<r&&(u.addClass(e,t),z=M(function(){z=null;0<F.transitionDuration&&I(m,!1);0<F.animationDuration&&(m.style[K+"PlayState"]="");u.addClass(e,k);u.removeClass(e,t);d&&(0===
F.transitionDuration&&e.css("transition",F.animationDuration+"s linear all"),e.css(d),s.push("transition"))},1E3*r,!1));e.on(D,h);a.closeAnimationFns.push(function(){f();c()});a.running++;P(e,q);return f}}else c()}function I(a,b){a.style[z+"Property"]=b?"none":""}function S(a,b,c,d){if(R(a,b,c,d))return function(a){a&&G(b,c)}}function T(a,b,c,d,f){if(b.data("$$ngAnimateCSS3Data"))return D(a,b,c,d,f);G(b,c);d()}function U(a,b,c,d,f){var g=S(a,b,c,f.from);if(g){var h=g;H(b,function(){h=T(a,b,c,d,f.to)});
return function(a){(h||t)(a)}}y();d()}function G(a,b){u.removeClass(a,b);var c=a.data("$$ngAnimateCSS3Data");c&&(c.running&&c.running--,c.running&&0!==c.running||a.removeData("$$ngAnimateCSS3Data"))}function q(a,b){var c="";a=aa(a)?a:a.split(/\s+/);n(a,function(a,d){a&&0<a.length&&(c+=(0<d?" ":"")+a+b)});return c}var B="",z,$,K,V;N.ontransitionend===W&&N.onwebkittransitionend!==W?(B="-webkit-",z="WebkitTransition",$="webkitTransitionEnd transitionend"):(z="transition",$="transitionend");N.onanimationend===
W&&N.onwebkitanimationend!==W?(B="-webkit-",K="WebkitAnimation",V="webkitAnimationEnd animationend"):(K="animation",V="animationend");var x={},a=0,c=[],b,d=null,h=0,k=[];return{animate:function(a,b,c,d,f,g){g=g||{};g.from=c;g.to=d;return U("animate",a,b,f,g)},enter:function(a,b,c){c=c||{};return U("enter",a,"ng-enter",b,c)},leave:function(a,b,c){c=c||{};return U("leave",a,"ng-leave",b,c)},move:function(a,b,c){c=c||{};return U("move",a,"ng-move",b,c)},beforeSetClass:function(a,b,c,d,f){f=f||{};b=q(c,
"-remove")+" "+q(b,"-add");if(f=S("setClass",a,b,f.from))return H(a,d),f;y();d()},beforeAddClass:function(a,b,c,d){d=d||{};if(b=S("addClass",a,q(b,"-add"),d.from))return H(a,c),b;y();c()},beforeRemoveClass:function(a,b,c,d){d=d||{};if(b=S("removeClass",a,q(b,"-remove"),d.from))return H(a,c),b;y();c()},setClass:function(a,b,c,d,f){f=f||{};c=q(c,"-remove");b=q(b,"-add");return T("setClass",a,c+" "+b,d,f.to)},addClass:function(a,b,c,d){d=d||{};return T("addClass",a,q(b,"-add"),c,d.to)},removeClass:function(a,
b,c,d){d=d||{};return T("removeClass",a,q(b,"-remove"),c,d.to)}}}])}])})(window,window.angular);
//# sourceMappingURL=angular-animate.min.js.map

(function(p,d,C){'use strict';function v(r,h,g){return{restrict:"ECA",terminal:!0,priority:400,transclude:"element",link:function(a,c,b,f,y){function z(){k&&(g.cancel(k),k=null);l&&(l.$destroy(),l=null);m&&(k=g.leave(m),k.then(function(){k=null}),m=null)}function x(){var b=r.current&&r.current.locals;if(d.isDefined(b&&b.$template)){var b=a.$new(),f=r.current;m=y(b,function(b){g.enter(b,null,m||c).then(function(){!d.isDefined(t)||t&&!a.$eval(t)||h()});z()});l=f.scope=b;l.$emit("$viewContentLoaded");
l.$eval(w)}else z()}var l,m,k,t=b.autoscroll,w=b.onload||"";a.$on("$routeChangeSuccess",x);x()}}}function A(d,h,g){return{restrict:"ECA",priority:-400,link:function(a,c){var b=g.current,f=b.locals;c.html(f.$template);var y=d(c.contents());b.controller&&(f.$scope=a,f=h(b.controller,f),b.controllerAs&&(a[b.controllerAs]=f),c.data("$ngControllerController",f),c.children().data("$ngControllerController",f));y(a)}}}p=d.module("ngRoute",["ng"]).provider("$route",function(){function r(a,c){return d.extend(Object.create(a),
c)}function h(a,d){var b=d.caseInsensitiveMatch,f={originalPath:a,regexp:a},g=f.keys=[];a=a.replace(/([().])/g,"\\$1").replace(/(\/)?:(\w+)([\?\*])?/g,function(a,d,b,c){a="?"===c?c:null;c="*"===c?c:null;g.push({name:b,optional:!!a});d=d||"";return""+(a?"":d)+"(?:"+(a?d:"")+(c&&"(.+?)"||"([^/]+)")+(a||"")+")"+(a||"")}).replace(/([\/$\*])/g,"\\$1");f.regexp=new RegExp("^"+a+"$",b?"i":"");return f}var g={};this.when=function(a,c){var b=d.copy(c);d.isUndefined(b.reloadOnSearch)&&(b.reloadOnSearch=!0);
d.isUndefined(b.caseInsensitiveMatch)&&(b.caseInsensitiveMatch=this.caseInsensitiveMatch);g[a]=d.extend(b,a&&h(a,b));if(a){var f="/"==a[a.length-1]?a.substr(0,a.length-1):a+"/";g[f]=d.extend({redirectTo:a},h(f,b))}return this};this.caseInsensitiveMatch=!1;this.otherwise=function(a){"string"===typeof a&&(a={redirectTo:a});this.when(null,a);return this};this.$get=["$rootScope","$location","$routeParams","$q","$injector","$templateRequest","$sce",function(a,c,b,f,h,p,x){function l(b){var e=s.current;
(v=(n=k())&&e&&n.$$route===e.$$route&&d.equals(n.pathParams,e.pathParams)&&!n.reloadOnSearch&&!w)||!e&&!n||a.$broadcast("$routeChangeStart",n,e).defaultPrevented&&b&&b.preventDefault()}function m(){var u=s.current,e=n;if(v)u.params=e.params,d.copy(u.params,b),a.$broadcast("$routeUpdate",u);else if(e||u)w=!1,(s.current=e)&&e.redirectTo&&(d.isString(e.redirectTo)?c.path(t(e.redirectTo,e.params)).search(e.params).replace():c.url(e.redirectTo(e.pathParams,c.path(),c.search())).replace()),f.when(e).then(function(){if(e){var a=
d.extend({},e.resolve),b,c;d.forEach(a,function(b,e){a[e]=d.isString(b)?h.get(b):h.invoke(b,null,null,e)});d.isDefined(b=e.template)?d.isFunction(b)&&(b=b(e.params)):d.isDefined(c=e.templateUrl)&&(d.isFunction(c)&&(c=c(e.params)),c=x.getTrustedResourceUrl(c),d.isDefined(c)&&(e.loadedTemplateUrl=c,b=p(c)));d.isDefined(b)&&(a.$template=b);return f.all(a)}}).then(function(c){e==s.current&&(e&&(e.locals=c,d.copy(e.params,b)),a.$broadcast("$routeChangeSuccess",e,u))},function(b){e==s.current&&a.$broadcast("$routeChangeError",
e,u,b)})}function k(){var a,b;d.forEach(g,function(f,g){var q;if(q=!b){var h=c.path();q=f.keys;var l={};if(f.regexp)if(h=f.regexp.exec(h)){for(var k=1,m=h.length;k<m;++k){var n=q[k-1],p=h[k];n&&p&&(l[n.name]=p)}q=l}else q=null;else q=null;q=a=q}q&&(b=r(f,{params:d.extend({},c.search(),a),pathParams:a}),b.$$route=f)});return b||g[null]&&r(g[null],{params:{},pathParams:{}})}function t(a,b){var c=[];d.forEach((a||"").split(":"),function(a,d){if(0===d)c.push(a);else{var f=a.match(/(\w+)(?:[?*])?(.*)/),
g=f[1];c.push(b[g]);c.push(f[2]||"");delete b[g]}});return c.join("")}var w=!1,n,v,s={routes:g,reload:function(){w=!0;a.$evalAsync(function(){l();m()})},updateParams:function(a){if(this.current&&this.current.$$route){var b={},f=this;d.forEach(Object.keys(a),function(c){f.current.pathParams[c]||(b[c]=a[c])});a=d.extend({},this.current.params,a);c.path(t(this.current.$$route.originalPath,a));c.search(d.extend({},c.search(),b))}else throw B("norout");}};a.$on("$locationChangeStart",l);a.$on("$locationChangeSuccess",
m);return s}]});var B=d.$$minErr("ngRoute");p.provider("$routeParams",function(){this.$get=function(){return{}}});p.directive("ngView",v);p.directive("ngView",A);v.$inject=["$route","$anchorScroll","$animate"];A.$inject=["$compile","$controller","$route"]})(window,window.angular);
//# sourceMappingURL=angular-route.min.js.map

!function(){function a(){var a=document.getElementById("hamburger");a.addEventListener("click",function(a){ga("send","event","button","click","menu-click"),document.body.classList.toggle("menu_open"),a.stopPropagation()})}function b(a,b){for(var c=0,d=4;d>c;c++){var e=b[c].lastElementChild.hash.split("#")[1];e===a?b[c].classList.add("current"):b[c].classList.remove("current")}}function c(){if(!e){var a=window.innerHeight;window.addEventListener("scroll",function(){if("/resume"!==d.hashPath){var b=document.body.scrollTop?document.body.scrollTop:document.documentElement.scrollTop,c=1-b/a,e=document.querySelector(".hero"),f=document.querySelector(".hero h1"),g=7*(100-100*c);c>0&&(e.style.WebkitTransform="translate3d(0, "+g+"px, 0)",e.style.MozTransform="translate3d(0, "+g+"px, 0)",e.style.transform="translate3d(0, "+g+"px, 0)",f.style.opacity=c,e.style.opacity=c)}})}}angular.module("folio",["ngRoute","ngAnimate","modResume","modPhotos","modWeb","modHome"]).run(["$rootScope","$window","$location","$routeParams","Behance","FiveHundred",function(a,b,e,f,g,h){a.$on("$routeChangeSuccess",function(){d.hashPath=e.path()}),c(),window.onload=function(){g.getProjects(),h.getPhotos(function(a){a.success||alert("Unable to complete request: "+a.status+" - "+a.error_message)})}}]).config(["$routeProvider","$locationProvider","$httpProvider",function(a){a.when("/",{templateUrl:"app/views/home.html",controller:"Home"}).when("/web",{templateUrl:"app/views/web.html",controller:"Web"}).when("/photos",{templateUrl:"app/views/photos.html",controller:"Photos"}).when("/resume",{templateUrl:"app/views/resume.html",controller:"Resume"}).otherwise({redirectTo:"/"})}]).directive("offcanvasMenu",function(){return{restrict:"A",scope:{},templateUrl:"app/directives/menu.html",controller:["$scope","$rootScope","$window","$location","$routeParams",function(c,d,e,f){a(),c.menu_items=document.querySelectorAll(".nav_primary li"),d.$on("$routeChangeSuccess",function(){d.currentPath=f.path(),c.currentPath=d.currentPath,b(d.currentPath,c.menu_items),ga("send","pageview",{page:f.path()})})}]}});var d={hashPath:""};_500px.init({sdk_key:"b3cf6701a6a5014444ee58f00fa11afd54ae6356"});var e=function(){return"ontouchstart"in window||navigator.MaxTouchPoints>0||navigator.msMaxTouchPoints>0}();document.addEventListener("click",function(){document.body.classList.contains("menu_open")&&document.body.classList.remove("menu_open")}),document.body.classList.add(e?"touch":"no-touch")}(),function(){function a(a){a.naam="Surendra Vikram Singh",a.intro="Front-End Developer/Designer",document.title="SVS Designs: Surendra Vikram Singh's Portfolio | UI Developer | India ",a.social=[{name:"Dribbble",url:"https://dribbble.com/svsdesigns"},{name:"Behance",url:"https://www.behance.net/svsdesigns"},{name:"Flickr",url:"https://www.flickr.com/photos/svsclicks"},{name:"Linkedin",url:"https://in.linkedin.com/in/svsdesigns"},{name:"Facebook",url:"https://www.facebook.com/svsdesigns"}]}angular.module("modHome",[]).controller("Home",["$scope",a])}(),function(){function a(a,b){a.heading="Photography",document.title="Portfolio | Photography",b.getPhotos(function(b){b.success?a.pics=b.data.photos:alert("Unable to complete request: "+b.status+" - "+b.error_message)})}function b(a,b){var c={};return c.getPhotos=function(c){var d=b.sessionStorage.getItem("pxData");return"undefined"!=typeof Storage&&null!==d?c(JSON.parse(d)):void _500px.api("/photos",{feature:"user",username:"svsclicks",image_size:"3",sort:"times_viewed",rpp:"30"},function(d){b.sessionStorage.setItem("pxData",JSON.stringify(d)),a.$apply(function(){return c(d)})})},c}angular.module("modPhotos",[]).controller("Photos",["$scope","FiveHundred",a]).factory("FiveHundred",["$rootScope","$window",b])}(),function(){function a(a,b,c){document.title="Resume | UI Developer | Surendra Vikram Singh";var d=c.sessionStorage.getItem("bioData");"undefined"!=typeof Storage&&null!==d?a.resumeData=angular.fromJson(d):b.getData().then(function(b){a.resumeData=b})}function b(a,b,c){var d={};return d.getData=function(){return q=c.defer(),b({method:"get",url:"/#/app/data/resume.json"}).success(function(b){a.sessionStorage.setItem("bioData",JSON.stringify(b)),q.resolve(b)}),q.promise},d}angular.module("modResume",[]).controller("Resume",["$scope","BioData","$window",a]).factory("BioData",["$window","$http","$q",b])}(),function(){function a(a,b,c){a.heading="Frontend Dev",document.title="Portfolio | Design | Development";var d=c.sessionStorage.getItem("beData");if("undefined"!=typeof Storage&&null!==d){var e=angular.fromJson(d);a.projects=e.projects}else b.getProjects().then(function(b){a.projects=b.projects})}function b(a,b,c){var d={};return d.getProjects=function(){var d="svsdesigns",e="Up1roNu2wpr0SAWvLkMkaE8d2sS2KWE1";return q=c.defer(),b({method:"jsonp",url:"https://www.behance.net/v2/users/"+d+"/projects",params:{client_id:e,callback:"JSON_CALLBACK",per_page:21,time:"all"}}).success(function(b){a.sessionStorage.setItem("beData",JSON.stringify(b)),q.resolve(b)}),q.promise},d}angular.module("modWeb",[]).controller("Web",["$scope","Behance","$window",a]).factory("Behance",["$window","$http","$q",b])}();