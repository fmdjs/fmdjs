/*! fmd.js v0.2.1 | http://fmdjs.org/ | MIT */
(function(b){if(!b.fmd){var d={},h=[],f=function(a){return d[a]},a=function(a,e,c){if(!d[a]){c||(c=e,e=[]);if("function"===typeof c){for(var b=[],g=0,f=e.length;g<f;g++)b.push(d[e[g]]);c=c.apply(null,b)}d[a]=c||1;h.push(a)}};a.version="0.2.1";a.cache={parts:h};a("global",b);a("require",function(){return f});a("env",function(){return a});a("cache",function(){return a.cache});b.fmd=a}})(this);
