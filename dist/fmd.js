/*! fmd.js v0.2.0 | http://fmdjs.org/ | MIT */
(function(e){if(!e.fmd){var n={},t=function(e){return n[e]},r=function(e,r,i){if(!n[e]){if(i||(i=r,r=[]),"function"==typeof i){for(var o=[],u=0,c=r.length;c>u;u++)o.push(t(r[u]));i=i.apply(null,o)}n[e]=i||1}};r.version="0.2.0",r.cache={},r("global",e),r("require",function(){return t}),r("env",function(){return r}),r("cache",function(){return r.cache}),e.fmd=r}})(this),fmd("lang",function(){var e={}.toString,n=Array.prototype,t={isFunction:function(n){return"[object Function]"===e.call(n)},isArray:Array.isArray||function(n){return"[object Array]"===e.call(n)},isString:function(e){return"string"==typeof e},forEach:n.forEach?function(e,n,t){e.forEach(n,t)}:function(e,n,t){for(var r=0,i=e.length;i>r;r++)n.call(t,e[r],r,e)},map:n.map?function(e,n,t){return e.map(n,t)}:function(e,n,r){var i=[];return t.forEach(e,function(e,t,o){i.push(n.call(r,e,t,o))}),i},inArray:n.indexOf?function(e,n){return e.indexOf(n)}:function(e,n){for(var t=0,r=e.length;r>t;t++)if(e[t]===n)return t;return-1}};return t}),fmd("event",["env","cache"],function(e,n){var t=n.events={},r=[].slice,i={on:function(e,n){var r=t[e]||(t[e]=[]);r.push(n)},emit:function(e){var n,i=r.call(arguments,1),o=t[e],u=0;if(o)for(;n=o[u++];)n.apply(null,i)},off:function(e,n){var r=t[e];if(r)if(n)for(var i=r.length-1;i>=0;i--)r[i]===n&&r.splice(i,1);else delete t[e]}};return e.on=i.on,e.off=i.off,i}),fmd("config",["env","cache","lang"],function(e,n,t){var r=n.config={},i=n.configRules={},o="_rule_",u=0,c=function(e,n,o){var u,c=!1;for(var a in i){if(c)break;u=i[a],c=t.inArray(u.keys,n)>-1&&void 0===u.rule.call(r,e,n,o)}return c},a={get:function(e){return r[e]},set:function(e){for(var n in e){var t=r[n],i=e[n];c(t,n,i)||(r[n]=i)}},register:function(e){var n;return t.isFunction(e.rule)&&(e.name||(e.name=o+u++),n=i[e.name]={rule:e.rule,keys:[]}),n||(n=i[e.name]),n&&e.keys&&(t.isArray(e.keys)?n.keys=n.keys.concat(e.keys):n.keys.push(e.keys)),this}};return a.register({name:"object",rule:function(e,n,t){if(!e)return!1;for(var r in t)e[r]=t[r]}}).register({name:"array",rule:function(e,n,t){e?e.push(t):this[n]=[t]}}),e.config=function(e){return t.isString(e)?a.get(e):(a.set(e),void 0)},a}),fmd("module",["global","env","cache","lang","event"],function(e,n,t,r,i){var o,u="",c=[],a="_!_fmd_anonymous_",f=0,s=t.modules={},l={require:function(e){return e.require=function(e){return d.require(e)},i.emit("makeRequire",e.require,e),e.require},exports:function(e){return e.exports},module:function(e){return e.module={id:e.id,exports:e.exports},e.module}},d=function(e,n,t){var r=this;r.id=e,r.deps=n||[],r.factory=t,r.exports={},r.unnamed()&&(e=a+f,f++),r.uid=e};d.prototype={unnamed:function(){return this.id===u},extract:function(){var e=this,n=e.deps,t=[];return r.isArray(n)&&r.forEach(n,function(n){var r,i;r=(i=l[n])?i(e):d.require(n),t.push(r)}),t},compile:function(){var e=this;try{if(r.isFunction(e.factory)){var n=e.extract(),t=e.factory.apply(null,n);t!==o?e.exports=t:e.module&&e.module.exports&&(e.exports=e.module.exports),e.module&&delete e.module}else e.factory!==o&&(e.exports=e.factory);i.emit("compiled",e)}catch(u){i.emit("compileFailed",u,e)}},autocompile:function(){this.unnamed()&&this.compile()}},d.get=function(e){var n={id:e};return i.emit("alias",n),s[n.id]},d.has=function(e){return d.get(e)||l[e]?!0:!1},d.save=function(e){s[e.uid]=e,i.emit("saved",e),e.autocompile()},d.require=function(e){var n=d.get(e);return n?(n.compiled||(n.compiled=!0,n.compile()),i.emit("required",n),n.exports):(i.emit("requireFailed",{id:e}),null)},d.define=function(e,n,t){var o=arguments.length;return 1===o?(t=e,e=u):2===o&&(t=n,n=c,r.isString(e)||(n=e,e=u)),d.has(e)?(i.emit("existed",{id:e}),null):(d.save(new d(e,n,t)),void 0)};var m=e.define;return n.noConflict=function(){e.define=m},n.define=e.define=d.define,d}),fmd("alias",["config","event"],function(e,n){var t="alias";e.register({keys:t,name:"object"}),n.on(t,function(n){var r,i=e.get(t);i&&(r=i[n.id])&&(n.id=r)})}),fmd("id2url",["global","event","config"],function(e,n,t){var r=/^https?:\/\//i,i=(new Date).getTime(),o="resolve",u="stamp";t.set({baseUrl:function(){var n=/(?:[\w]+)\:\/\/(?:[\w|\.|\:]+)\//i,t=e.document.getElementsByTagName("script"),r=t[t.length-1],i=(r.hasAttribute?r.src:r.getAttribute("src",4)).match(n);return i[0]}()}),t.register({keys:o,name:"array"}).register({keys:u,name:"object"});var c=function(e){var n,r=t.get(o);if(r)for(var i=0,u=r.length;u>i&&(n=r[i](e.id),n===e.id);i++);e.url=n?n:e.id},a=function(e){r.test(e.url)||(e.url=t.get("baseUrl")+e.url)},f=function(e){var n=e.url;n.lastIndexOf(".")<n.lastIndexOf("/")&&(e.url+=".js")},s=function(e){var n=t.get("hasStamp")?i:null,r=t.get(u);if(r)for(var o in r)if(RegExp(o).test(e.id)){n=r[o];break}n&&(e.url+="?fmd.stamp="+n)},l=function(e){n.emit("alias",e),n.emit(o,e),a(e),f(e),n.emit(u,e)};n.on(o,c),n.on(u,s),n.on("id2url",l)}),fmd("assets",["cache","lang","event","config","module"],function(e,n,t,r,i){var o=e.assets={},u={},c={make:function(e){if(u[e])return o[u[e]];var n={id:e};return t.emit("analyze",n),i.has(n.id)?n.url=n.id:t.emit("id2url",n),u[e]=n.url,o[n.url]=n},group:function(e){return n.map(e,function(e){return c.make(e)})}};return c}),fmd("when",function(){var e=function(){},n=function(n){var t=this,r=[],i=0,o=0;n=n||0;var u=function(){i+o===n&&c()},c=function(){t.then=o?function(e,n){n&&n()}:function(e){e&&e()},c=e,a(o?1:0),a=e,r=[]},a=function(e){for(var n,t,i=0;n=r[i++];)t=n[e],t&&t()};this.then=function(e,n){r.push([e,n])},this.resolve=function(){i++,u()},this.reject=function(){o++,u()},u()},t=function(){for(var e,t=arguments.length,r=new n(t),i=0;e=arguments[i++];)e(r);return r};return t}),fmd("request",["global","config","event"],function(e,n,t){var r=e.document,i=e.setTimeout,o=/\.css(?:\?|$)/i,u=/loaded|complete/,c=/security|denied/i,a="requested",f="charset",s=536>1*e.navigator.userAgent.replace(/.*AppleWebKit\/(\d+)\..*/,"$1"),l=r&&(r.head||r.getElementsByTagName("head")[0]||r.documentElement),d=function(e,i){var o;return i?(o=r.createElement("link"),o.rel="stylesheet",o.href=e.url):(o=r.createElement("script"),o.async=!0,o.src=e.url),n.get(f)&&(o.charset=n.get(f)),t.emit("createNode",o,e),o},m=function(e,n,r){var o,u,f=!1;try{o=e.sheet,o&&(u=o.cssRules,f=u?u.length>0:void 0!==u)}catch(s){f=c.test(s.message)}i(function(){f?(n&&n(),t.emit(a,r)):m(e,n,r)},20)},p=function(e,r,i,o,c){function f(){e.onload=e.onreadystatechange=e.onerror=null,c||n.get("debug")||e.parentNode&&e.parentNode.removeChild(e),e=void 0,r&&r()}i?(e.onload=function(){f(),t.emit(a,o)},e.onerror=function(){f(),t.emit("requestError",o)}):e.onreadystatechange=function(){u.test(e.readyState)&&(f(),t.emit(a,o))}},g=function(e,n,t,r){return s||!t?(i(function(){m(e,n,r)},1),void 0):(p(e,n,t,r,!0),void 0)},v=function(e,n){var t=o.test(e.url),r=d(e,t),i="onload"in r;t?g(r,n,i,e):p(r,n,i,e),l.appendChild(r)};return v}),fmd("loader",["global","event","config","request"],function(e,n,t,r){var i="loading",o="loaded",u="requestComplete",c=function(){};t.set({timeout:1e4}),n.on(u,function(e){var n,t;for(e.state=o,t=e.onload;n=t.shift();)n()});var a=function(a,f){return f||(f=c),a.state===o?(f(),void 0):a.state===i?(a.onload.push(f),void 0):(a.state=i,a.onload=[f],n.emit("request",a,f),a.requested||(a.timer=e.setTimeout(function(){n.emit("requestTimeout",a)},t.get("timeout")),r(a,function(){e.clearTimeout(a.timer),n.emit(u,a)})),void 0)};return a}),fmd("remote",["lang","event","module","assets","when","loader"],function(e,n,t,r,i,o){var u={};return u.bring=u.get=function(n,r){i.apply(null,e.map(n,function(e){return function(n){t.has(e.id)?n.resolve():o(e,function(){n.resolve()})}})).then(r)},u.fetch=function(o,c){var a=r.group(o);n.emit("fetch",a),u.bring(a,function(){i.apply(null,e.map(a,function(e){return function(n){var r=t.get(e.id);r&&!r.compiled&&r.deps.length?u.fetch(r.deps,function(){n.resolve()}):n.resolve()}})).then(function(){c.call(null,a)})})},u}),fmd("use",["lang","event","remote"],function(e,n,t){n.on("makeRequire",function(r,i){r.use=function(o,u){e.isArray(o)||(o=[o]),n.emit("use",o,i),t.fetch(o,function(n){var t=e.map(n,function(e){return r(e.id)});u&&u.apply(null,t)})}})}),fmd("async",["config","module","remote"],function(e,n,t){var r=n.prototype.autocompile,i=function(){var e=this;e.unnamed()&&t.fetch(e.deps,function(){e.compile()})};e.register({keys:"async",rule:function(e,t,o){o=!!o,e!==o&&(this.async=o,n.prototype.autocompile=o===!0?i:r)}}).set({async:!0})}),fmd("logger",["global","require","env","config","assets","loader","console"],function(e,n,t,r,i,o,u){var c=t.log=function(){},a=e.console,f=function(e){t.log=e?a&&a.warn?function(e,n){a[n||"log"](e)}:function(e,t){u?u(e,t):o&&o(i.make("fmd/console"),function(){u||(u=n("console")),u(e,t)})}:c};r.register({keys:"debug",rule:function(e,n,t){f(t),this.debug=t}})});