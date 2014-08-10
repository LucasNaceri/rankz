!function(){var e,n,o="3.5.0";!function(){function o(n){var o=n.factory,t=function(o){var t=o;return"."===o.charAt(0)&&(t=n.id.slice(0,n.id.lastIndexOf(a))+a+o.slice(2)),e(t)};return n.exports={},delete n.factory,o(t,n.exports,n),n.exports}var t={},r=[],i={},a=".";e=function(e){if(!t[e])throw"module "+e+" not found";if(e in i){var n=r.slice(i[e]).join("->")+"->"+e;throw"Cycle in require graph: "+n}if(t[e].factory)try{return i[e]=r.length,r.push(e),o(t[e])}finally{delete i[e],r.pop()}return t[e].exports},n=function(e,n){if(t[e])throw"module "+e+" already defined";t[e]={id:e,factory:n}},n.remove=function(e){delete t[e]},n.moduleMap=t}(),"object"==typeof module&&"function"==typeof e&&(module.exports.require=e,module.exports.define=n),n("cordova",function(e,t,r){function i(e,n){var o=document.createEvent("Events");if(o.initEvent(e,!1,!1),n)for(var t in n)n.hasOwnProperty(t)&&(o[t]=n[t]);return o}var a=e("cordova/channel"),c=e("cordova/platform"),s=document.addEventListener,u=document.removeEventListener,l=window.addEventListener,d=window.removeEventListener,f={},p={};document.addEventListener=function(e,n,o){var t=e.toLowerCase();"undefined"!=typeof f[t]?f[t].subscribe(n):s.call(document,e,n,o)},window.addEventListener=function(e,n,o){var t=e.toLowerCase();"undefined"!=typeof p[t]?p[t].subscribe(n):l.call(window,e,n,o)},document.removeEventListener=function(e,n,o){var t=e.toLowerCase();"undefined"!=typeof f[t]?f[t].unsubscribe(n):u.call(document,e,n,o)},window.removeEventListener=function(e,n,o){var t=e.toLowerCase();"undefined"!=typeof p[t]?p[t].unsubscribe(n):d.call(window,e,n,o)};var v={define:n,require:e,version:o,platformId:c.id,addWindowEventHandler:function(e){return p[e]=a.create(e)},addStickyDocumentEventHandler:function(e){return f[e]=a.createSticky(e)},addDocumentEventHandler:function(e){return f[e]=a.create(e)},removeWindowEventHandler:function(e){delete p[e]},removeDocumentEventHandler:function(e){delete f[e]},getOriginalHandlers:function(){return{document:{addEventListener:s,removeEventListener:u},window:{addEventListener:l,removeEventListener:d}}},fireDocumentEvent:function(e,n,o){var t=i(e,n);"undefined"!=typeof f[e]?o?f[e].fire(t):setTimeout(function(){"deviceready"==e&&document.dispatchEvent(t),f[e].fire(t)},0):document.dispatchEvent(t)},fireWindowEvent:function(e,n){var o=i(e,n);"undefined"!=typeof p[e]?setTimeout(function(){p[e].fire(o)},0):window.dispatchEvent(o)},callbackId:Math.floor(2e9*Math.random()),callbacks:{},callbackStatus:{NO_RESULT:0,OK:1,CLASS_NOT_FOUND_EXCEPTION:2,ILLEGAL_ACCESS_EXCEPTION:3,INSTANTIATION_EXCEPTION:4,MALFORMED_URL_EXCEPTION:5,IO_EXCEPTION:6,INVALID_ACTION:7,JSON_EXCEPTION:8,ERROR:9},callbackSuccess:function(e,n){try{v.callbackFromNative(e,!0,n.status,[n.message],n.keepCallback)}catch(o){console.log("Error in error callback: "+e+" = "+o)}},callbackError:function(e,n){try{v.callbackFromNative(e,!1,n.status,[n.message],n.keepCallback)}catch(o){console.log("Error in error callback: "+e+" = "+o)}},callbackFromNative:function(e,n,o,t,r){var i=v.callbacks[e];i&&(n&&o==v.callbackStatus.OK?i.success&&i.success.apply(null,t):n||i.fail&&i.fail.apply(null,t),r||delete v.callbacks[e])},addConstructor:function(e){a.onCordovaReady.subscribe(function(){try{e()}catch(n){console.log("Failed to run constructor: "+n)}})}};r.exports=v}),n("cordova/argscheck",function(e,n,o){function t(e,n){return/.*?\((.*?)\)/.exec(e)[1].split(", ")[n]}function r(e,n,o,r){if(c.enableChecks){for(var i,u=null,l=0;l<e.length;++l){var d=e.charAt(l),f=d.toUpperCase(),p=o[l];if("*"!=d&&(i=a.typeName(p),(null!==p&&void 0!==p||d!=f)&&i!=s[f])){u="Expected "+s[f];break}}if(u)throw u+=", but got "+i+".",u='Wrong type for parameter "'+t(r||o.callee,l)+'" of '+n+": "+u,"undefined"==typeof jasmine&&console.error(u),TypeError(u)}}function i(e,n){return void 0===e?n:e}var a=(e("cordova/exec"),e("cordova/utils")),c=o.exports,s={A:"Array",D:"Date",N:"Number",S:"String",F:"Function",O:"Object"};c.checkArgs=r,c.getValue=i,c.enableChecks=!0}),n("cordova/base64",function(e,n){function o(e){for(var n,o=e.byteLength,t="",r=a(),c=0;o-2>c;c+=3)n=(e[c]<<16)+(e[c+1]<<8)+e[c+2],t+=r[n>>12],t+=r[4095&n];return o-c==2?(n=(e[c]<<16)+(e[c+1]<<8),t+=r[n>>12],t+=i[(4095&n)>>6],t+="="):o-c==1&&(n=e[c]<<16,t+=r[n>>12],t+="=="),t}var t=n;t.fromArrayBuffer=function(e){var n=new Uint8Array(e);return o(n)},t.toArrayBuffer=function(e){for(var n="undefined"!=typeof atob?atob(e):new Buffer(e,"base64").toString("binary"),o=new ArrayBuffer(n.length),t=new Uint8Array(o),r=0,i=n.length;i>r;r++)t[r]=n.charCodeAt(r);return o};var r,i="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",a=function(){r=[];for(var e=0;64>e;e++)for(var n=0;64>n;n++)r[64*e+n]=i[e]+i[n];return a=function(){return r},r}}),n("cordova/builder",function(e,n){function o(e,n,o){for(var t in e)e.hasOwnProperty(t)&&n.apply(o,[e[t],t])}function t(e,o,t){n.replaceHookForTesting(e,o),e[o]=t,e[o]!==t&&c.defineGetter(e,o,function(){return t})}function r(e,n,o,r){r?c.defineGetter(e,n,function(){return console.log(r),delete e[n],t(e,n,o),o}):t(e,n,o)}function i(n,t,s,u){o(t,function(o,t){try{var l=o.path?e(o.path):{};s?("undefined"==typeof n[t]?r(n,t,l,o.deprecated):"undefined"!=typeof o.path&&(u?a(n[t],l):r(n,t,l,o.deprecated)),l=n[t]):"undefined"==typeof n[t]?r(n,t,l,o.deprecated):l=n[t],o.children&&i(l,o.children,s,u)}catch(d){c.alert("Exception building Cordova JS globals: "+d+' for key "'+t+'"')}})}function a(e,n){for(var o in n)n.hasOwnProperty(o)&&(e.prototype&&e.prototype.constructor===e?t(e.prototype,o,n[o]):"object"==typeof n[o]&&"object"==typeof e[o]?a(e[o],n[o]):t(e,o,n[o]))}var c=e("cordova/utils");n.buildIntoButDoNotClobber=function(e,n){i(n,e,!1,!1)},n.buildIntoAndClobber=function(e,n){i(n,e,!0,!1)},n.buildIntoAndMerge=function(e,n){i(n,e,!0,!0)},n.recursiveMerge=a,n.assignOrWrapInDeprecateGetter=r,n.replaceHookForTesting=function(){}}),n("cordova/channel",function(e,n,o){function t(e){if("function"!=typeof e)throw"Function required as first argument!"}var r=e("cordova/utils"),i=1,a=function(e,n){this.type=e,this.handlers={},this.state=n?1:0,this.fireArgs=null,this.numHandlers=0,this.onHasSubscribersChange=null},c={join:function(e,n){for(var o=n.length,t=o,r=function(){--t||e()},i=0;o>i;i++){if(0===n[i].state)throw Error("Can only use join with sticky channels.");n[i].subscribe(r)}o||e()},create:function(e){return c[e]=new a(e,!1)},createSticky:function(e){return c[e]=new a(e,!0)},deviceReadyChannelsArray:[],deviceReadyChannelsMap:{},waitForInitialization:function(e){if(e){var n=c[e]||this.createSticky(e);this.deviceReadyChannelsMap[e]=n,this.deviceReadyChannelsArray.push(n)}},initializationComplete:function(e){var n=this.deviceReadyChannelsMap[e];n&&n.fire()}};a.prototype.subscribe=function(e,n){if(t(e),2==this.state)return void e.apply(n||this,this.fireArgs);var o=e,a=e.observer_guid;"object"==typeof n&&(o=r.close(n,e)),a||(a=""+i++),o.observer_guid=a,e.observer_guid=a,this.handlers[a]||(this.handlers[a]=o,this.numHandlers++,1==this.numHandlers&&this.onHasSubscribersChange&&this.onHasSubscribersChange())},a.prototype.unsubscribe=function(e){t(e);var n=e.observer_guid,o=this.handlers[n];o&&(delete this.handlers[n],this.numHandlers--,0===this.numHandlers&&this.onHasSubscribersChange&&this.onHasSubscribersChange())},a.prototype.fire=function(){var e=Array.prototype.slice.call(arguments);if(1==this.state&&(this.state=2,this.fireArgs=e),this.numHandlers){var n=[];for(var o in this.handlers)n.push(this.handlers[o]);for(var t=0;t<n.length;++t)n[t].apply(this,e);2==this.state&&this.numHandlers&&(this.numHandlers=0,this.handlers={},this.onHasSubscribersChange&&this.onHasSubscribersChange())}},c.createSticky("onDOMContentLoaded"),c.createSticky("onNativeReady"),c.createSticky("onCordovaReady"),c.createSticky("onPluginsReady"),c.createSticky("onDeviceReady"),c.create("onResume"),c.create("onPause"),c.createSticky("onDestroy"),c.waitForInitialization("onCordovaReady"),c.waitForInitialization("onDOMContentLoaded"),o.exports=c}),n("cordova/exec",function(e,n,o){function t(){var e=document.createElement("iframe");return e.style.display="none",document.body.appendChild(e),e}function r(){var e=t();return e.contentWindow.history.replaceState(null,null,"file:///#"),e}function i(){if(f===m.XHR_WITH_PAYLOAD)return!0;if(f===m.XHR_OPTIONAL_PAYLOAD){for(var e=0,n=0;n<E.length;++n)e+=E[n].length;return 4500>e}return!1}function a(e){if(!e||"Array"!=g.typeName(e))return e;var n=[];return e.forEach(function(e){n.push("ArrayBuffer"==g.typeName(e)?{CDVType:"ArrayBuffer",data:b.fromArrayBuffer(e)}:e)}),n}function c(e){if("ArrayBuffer"==e.CDVType){var n=function(e){for(var n=new Uint8Array(e.length),o=0;o<e.length;o++)n[o]=e.charCodeAt(o);return n.buffer},o=function(e){return n(atob(e))};e=o(e.data)}return e}function s(e){var n=[];return e&&e.hasOwnProperty("CDVType")?"MultiPart"==e.CDVType?e.messages.forEach(function(e){n.push(c(e))}):n.push(c(e)):n.push(e),n}function u(){void 0===f&&(f=-1==navigator.userAgent.indexOf(" 5_")?m.IFRAME_NAV:m.XHR_NO_PAYLOAD);var e,n,o,t,r,i,c=null;if("string"!=typeof arguments[0])e=arguments[0],n=arguments[1],o=arguments[2],t=arguments[3],r=arguments[4],c="INVALID";else try{return i=arguments[0].split("."),t=i.pop(),o=i.join("."),r=Array.prototype.splice.call(arguments,1),void console.log('The old format of this exec call has been removed (deprecated since 2.1). Change to: cordova.exec(null, null, "'+o+'", "'+t+'",'+JSON.stringify(r)+");")}catch(s){}r=r||[],(e||n)&&(c=o+y.callbackId++,y.callbacks[c]={success:e,fail:n}),r=a(r);var u=[c,o,t,r];if(E.push(JSON.stringify(u)),!S&&1==E.length)switch(f){case m.XHR_NO_PAYLOAD:case m.XHR_WITH_PAYLOAD:case m.XHR_OPTIONAL_PAYLOAD:l();break;default:d()}}function l(){h&&4!=h.readyState&&(h=null),h=h||new XMLHttpRequest,h.open("HEAD","/!gap_exec?"+ +new Date,!0),N||(N=/.*\((.*)\)/.exec(navigator.userAgent)[1]),h.setRequestHeader("vc",N),h.setRequestHeader("rc",++A),i()&&h.setRequestHeader("cmds",u.nativeFetchMessages()),h.send(null)}function d(){if(!document.body)return void setTimeout(d);if(f===m.IFRAME_HASH_NO_PAYLOAD||f===m.IFRAME_HASH_WITH_PAYLOAD){v=v||r(),v.contentWindow||(v=r()),w=3^w;var e="%0"+w;f===m.IFRAME_HASH_WITH_PAYLOAD&&(e+=u.nativeFetchMessages()),v.contentWindow.location.hash=e}else p=p||t(),p.contentWindow||(p=t()),p.src="gap://ready"}var f,p,v,h,y=e("cordova"),g=(e("cordova/channel"),e("cordova/utils")),b=e("cordova/base64"),m={IFRAME_NAV:0,XHR_NO_PAYLOAD:1,XHR_WITH_PAYLOAD:2,XHR_OPTIONAL_PAYLOAD:3,IFRAME_HASH_NO_PAYLOAD:4,IFRAME_HASH_WITH_PAYLOAD:5},w=1,A=0,N=null,E=[],S=0;u.jsToNativeModes=m,u.setJsToNativeBridgeMode=function(e){p&&(p.parentNode.removeChild(p),p=null),f=e},u.nativeFetchMessages=function(){if(!E.length)return"";var e="["+E.join(",")+"]";return E.length=0,e},u.nativeCallback=function(e,n,o,t){return u.nativeEvalAndFetch(function(){var r=0===n||1===n,i=s(o);y.callbackFromNative(e,r,n,i,t)})},u.nativeEvalAndFetch=function(e){S++;try{return e(),u.nativeFetchMessages()}finally{S--}},o.exports=u}),n("cordova/exec/proxy",function(e,n,o){var t={};o.exports={add:function(e,n){return console.log("adding proxy for "+e),t[e]=n,n},remove:function(e){var n=t[e];return delete t[e],t[e]=null,n},get:function(e,n){return t[e]?t[e][n]:null}}}),n("cordova/init",function(e){function n(e){for(var n=0;n<e.length;++n)2!=e[n].state&&console.log("Channel not fired: "+e[n].type)}function o(e){var n=function(){};n.prototype=e;var o=new n;if(n.bind)for(var t in e)"function"==typeof e[t]&&(o[t]=e[t].bind(e));return o}var t=e("cordova/channel"),r=e("cordova"),i=e("cordova/modulemapper"),a=e("cordova/platform"),c=e("cordova/pluginloader"),s=[t.onNativeReady,t.onPluginsReady];window.setTimeout(function(){2!=t.onDeviceReady.state&&(console.log("deviceready has not fired after 5 seconds."),n(s),n(t.deviceReadyChannelsArray))},5e3),window.navigator&&(window.navigator=o(window.navigator)),window.console||(window.console={log:function(){}}),window.console.warn||(window.console.warn=function(e){this.log("warn: "+e)}),t.onPause=r.addDocumentEventHandler("pause"),t.onResume=r.addDocumentEventHandler("resume"),t.onDeviceReady=r.addStickyDocumentEventHandler("deviceready"),"complete"==document.readyState||"interactive"==document.readyState?t.onDOMContentLoaded.fire():document.addEventListener("DOMContentLoaded",function(){t.onDOMContentLoaded.fire()},!1),window._nativeReady&&t.onNativeReady.fire(),i.clobbers("cordova","cordova"),i.clobbers("cordova/exec","cordova.exec"),i.clobbers("cordova/exec","Cordova.exec"),a.bootstrap&&a.bootstrap(),setTimeout(function(){c.load(function(){t.onPluginsReady.fire()})},0),t.join(function(){i.mapModules(window),a.initialize&&a.initialize(),t.onCordovaReady.fire(),t.join(function(){e("cordova").fireDocumentEvent("deviceready")},t.deviceReadyChannelsArray)},s)}),n("cordova/init_b",function(e){function n(e){for(var n=0;n<e.length;++n)2!=e[n].state&&console.log("Channel not fired: "+e[n].type)}function o(e){var n=function(){};n.prototype=e;var o=new n;if(n.bind)for(var t in e)"function"==typeof e[t]&&(o[t]=e[t].bind(e));return o}var t=e("cordova/channel"),r=e("cordova"),i=e("cordova/platform"),a=[t.onDOMContentLoaded,t.onNativeReady];r.exec=e("cordova/exec"),window.setTimeout(function(){2!=t.onDeviceReady.state&&(console.log("deviceready has not fired after 5 seconds."),n(a),n(t.deviceReadyChannelsArray))},5e3),window.navigator&&(window.navigator=o(window.navigator)),window.console||(window.console={log:function(){}}),window.console.warn||(window.console.warn=function(e){this.log("warn: "+e)}),t.onPause=r.addDocumentEventHandler("pause"),t.onResume=r.addDocumentEventHandler("resume"),t.onDeviceReady=r.addStickyDocumentEventHandler("deviceready"),"complete"==document.readyState||"interactive"==document.readyState?t.onDOMContentLoaded.fire():document.addEventListener("DOMContentLoaded",function(){t.onDOMContentLoaded.fire()},!1),window._nativeReady&&t.onNativeReady.fire(),i.bootstrap&&i.bootstrap(),t.join(function(){i.initialize&&i.initialize(),t.onCordovaReady.fire(),t.join(function(){e("cordova").fireDocumentEvent("deviceready")},t.deviceReadyChannelsArray)},a)}),n("cordova/modulemapper",function(e,o){function t(e,n,o,t){if(!(n in s))throw new Error("Module "+n+" does not exist.");i.push(e,n,o),t&&(a[o]=t)}function r(e,n){if(!e)return n;for(var o,t=e.split("."),r=n,i=0;o=t[i];++i)r=r[o]=r[o]||{};return r}var i,a,c=e("cordova/builder"),s=n.moduleMap;o.reset=function(){i=[],a={}},o.clobbers=function(e,n,o){t("c",e,n,o)},o.merges=function(e,n,o){t("m",e,n,o)},o.defaults=function(e,n,o){t("d",e,n,o)},o.runs=function(e){t("r",e,null)},o.mapModules=function(n){var o={};n.CDV_origSymbols=o;for(var t=0,s=i.length;s>t;t+=3){var u=i[t],l=i[t+1],d=e(l);if("r"!=u){var f=i[t+2],p=f.lastIndexOf("."),v=f.substr(0,p),h=f.substr(p+1),y=f in a?"Access made to deprecated symbol: "+f+". "+y:null,g=r(v,n),b=g[h];"m"==u&&b?c.recursiveMerge(b,d):("d"==u&&!b||"d"!=u)&&(f in o||(o[f]=b),c.assignOrWrapInDeprecateGetter(g,h,d,y))}}},o.getOriginalSymbol=function(e,n){var o=e.CDV_origSymbols;if(o&&n in o)return o[n];for(var t=n.split("."),r=e,i=0;i<t.length;++i)r=r&&r[t[i]];return r},o.reset()}),n("cordova/platform",function(e,n,o){o.exports={id:"ios",bootstrap:function(){e("cordova/channel").onNativeReady.fire()}}}),n("cordova/pluginloader",function(e,o){function t(e,t,r,i){i=i||r,e in n.moduleMap?r():o.injectScript(t,function(){e in n.moduleMap?r():i()},i)}function r(e,n){for(var o,t=0;o=e[t];t++){if(o.clobbers&&o.clobbers.length)for(var r=0;r<o.clobbers.length;r++)c.clobbers(o.id,o.clobbers[r]);if(o.merges&&o.merges.length)for(var i=0;i<o.merges.length;i++)c.merges(o.id,o.merges[i]);o.runs&&c.runs(o.id)}n()}function i(e,n,o){function i(){--a||r(n,o)}var a=n.length;if(!a)return void o();for(var c=0;c<n.length;c++)t(n[c].id,e+n[c].file,i)}function a(){for(var e=null,n=document.getElementsByTagName("script"),o="cordova.js",t=n.length-1;t>-1;t--){var r=n[t].src.replace(/\?.*$/,"");if(r.indexOf(o)==r.length-o.length){e=r.substring(0,r.length-o.length);break}}return e}{var c=e("cordova/modulemapper");e("cordova/urlutil")}o.injectScript=function(e,n,o){var t=document.createElement("script");t.onload=n,t.onerror=o,t.src=e,document.head.appendChild(t)},o.load=function(n){var o=a();null===o&&(console.log("Could not find cordova.js script tag. Plugin loading may fail."),o=""),t("cordova/plugin_list",o+"cordova_plugins.js",function(){var t=e("cordova/plugin_list");i(o,t,n)},n)}}),n("cordova/urlutil",function(e,n){n.makeAbsolute=function(e){var n=document.createElement("a");return n.href=e,n.href}}),n("cordova/utils",function(e,n){function o(e){for(var n="",o=0;e>o;o++){var t=parseInt(256*Math.random(),10).toString(16);1==t.length&&(t="0"+t),n+=t}return n}var t=n;t.defineGetterSetter=function(e,n,o,t){if(Object.defineProperty){var r={get:o,configurable:!0};t&&(r.set=t),Object.defineProperty(e,n,r)}else e.__defineGetter__(n,o),t&&e.__defineSetter__(n,t)},t.defineGetter=t.defineGetterSetter,t.arrayIndexOf=function(e,n){if(e.indexOf)return e.indexOf(n);for(var o=e.length,t=0;o>t;++t)if(e[t]==n)return t;return-1},t.arrayRemove=function(e,n){var o=t.arrayIndexOf(e,n);return-1!=o&&e.splice(o,1),-1!=o},t.typeName=function(e){return Object.prototype.toString.call(e).slice(8,-1)},t.isArray=function(e){return"Array"==t.typeName(e)},t.isDate=function(e){return"Date"==t.typeName(e)},t.clone=function(e){if(!e||"function"==typeof e||t.isDate(e)||"object"!=typeof e)return e;var n,o;if(t.isArray(e)){for(n=[],o=0;o<e.length;++o)n.push(t.clone(e[o]));return n}n={};for(o in e)o in n&&n[o]==e[o]||(n[o]=t.clone(e[o]));return n},t.close=function(e,n,o){return"undefined"==typeof o?function(){return n.apply(e,arguments)}:function(){return n.apply(e,o)}},t.createUUID=function(){return o(4)+"-"+o(2)+"-"+o(2)+"-"+o(2)+"-"+o(6)},t.extend=function(){var e=function(){};return function(n,o){e.prototype=o.prototype,n.prototype=new e,n.__super__=o.prototype,n.prototype.constructor=n}}(),t.alert=function(e){window.alert?window.alert(e):console&&console.log&&console.log(e)}}),window.cordova=e("cordova"),e("cordova/init")}(),cordova.define("cordova/plugin_list",function(e,n,o){o.exports=[{file:"plugins/com.ionic.keyboard/www/keyboard.js",id:"com.ionic.keyboard.keyboard",clobbers:["cordova.plugins.Keyboard"]},{file:"plugins/com.phonegap.plugins.barcodescanner/www/barcodescanner.js",id:"com.phonegap.plugins.barcodescanner.barcodescanner",clobbers:["plugins.barcodeScanner"]},{file:"plugins/org.apache.cordova.device/www/device.js",id:"org.apache.cordova.device.device",clobbers:["device"]},{file:"plugins/org.apache.cordova.dialogs/www/notification.js",id:"org.apache.cordova.dialogs.notification",merges:["navigator.notification"]},{file:"plugins/org.apache.cordova.splashscreen/www/splashscreen.js",id:"org.apache.cordova.splashscreen.SplashScreen",clobbers:["navigator.splashscreen"]},{file:"plugins/org.apache.cordova.statusbar/www/statusbar.js",id:"org.apache.cordova.statusbar.statusbar",clobbers:["window.StatusBar"]},{file:"plugins/com.pushwoosh.plugins.pushwoosh/www/PushNotification.js",id:"com.pushwoosh.plugins.pushwoosh.PushNotification",clobbers:["plugins.pushNotification"]}],o.exports.metadata={"com.ionic.keyboard":"1.0.2","com.phonegap.plugins.barcodescanner":"0.6.0","org.apache.cordova.device":"0.2.10","org.apache.cordova.dialogs":"0.2.8","org.apache.cordova.splashscreen":"0.3.1","org.apache.cordova.statusbar":"0.1.6","com.pushwoosh.plugins.pushwoosh":"3.2.0"}}),cordova.define("com.ionic.keyboard.keyboard",function(e,n,o){var t=(e("cordova/argscheck"),e("cordova/utils"),e("cordova/exec")),r=function(){};r.hideKeyboardAccessoryBar=function(e){t(null,null,"Keyboard","hideKeyboardAccessoryBar",[e])},r.close=function(){t(null,null,"Keyboard","close",[])},r.disableScroll=function(e){t(null,null,"Keyboard","disableScroll",[e])},r.isVisible=!1,o.exports=r}),cordova.define("com.phonegap.plugins.barcodescanner.barcodescanner",function(e,n,o){var t=(e("cordova/exec"),e("cordova")),r=function(){};r.Encode={TEXT_TYPE:"TEXT_TYPE",EMAIL_TYPE:"EMAIL_TYPE",PHONE_TYPE:"PHONE_TYPE",SMS_TYPE:"SMS_TYPE"},r.prototype.scan=function(e,n){return null==n&&(n=function(){}),"function"!=typeof n?void console.log("BarcodeScanner.scan failure: failure parameter not a function"):"function"!=typeof e?void console.log("BarcodeScanner.scan failure: success callback parameter must be a function"):void t.exec(e,n,"BarcodeScanner","scan",[])},r.prototype.encode=function(e,n,o,r,i){return null==r&&(r=function(){}),"function"!=typeof r?void console.log("BarcodeScanner.encode failure: failure parameter not a function"):"function"!=typeof o?void console.log("BarcodeScanner.encode failure: success callback parameter must be a function"):void t.exec(o,r,"BarcodeScanner","encode",[{type:e,data:n,options:i}])};var i=new r;o.exports=i}),cordova.define("org.apache.cordova.device.device",function(e,n,o){function t(){this.available=!1,this.platform=null,this.version=null,this.uuid=null,this.cordova=null,this.model=null;var e=this;i.onCordovaReady.subscribe(function(){e.getInfo(function(n){var o=s.version;e.available=!0,e.platform=n.platform,e.version=n.version,e.uuid=n.uuid,e.cordova=o,e.model=n.model,i.onCordovaInfoReady.fire()},function(n){e.available=!1,a.alert("[ERROR] Error initializing Cordova: "+n)})})}var r=e("cordova/argscheck"),i=e("cordova/channel"),a=e("cordova/utils"),c=e("cordova/exec"),s=e("cordova");i.createSticky("onCordovaInfoReady"),i.waitForInitialization("onCordovaInfoReady"),t.prototype.getInfo=function(e,n){r.checkArgs("fF","Device.getInfo",arguments),c(e,n,"Device","getDeviceInfo",[])},o.exports=new t}),cordova.define("org.apache.cordova.dialogs.notification",function(e,n,o){var t=e("cordova/exec"),r=e("cordova/platform");o.exports={alert:function(e,n,o,r){var i=o||"Alert",a=r||"OK";t(n,null,"Notification","alert",[e,i,a])},confirm:function(e,n,o,i){var a=o||"Confirm",c=i||["OK","Cancel"];if("string"==typeof c&&console.log("Notification.confirm(string, function, string, string) is deprecated.  Use Notification.confirm(string, function, string, array)."),"amazon-fireos"==r.id||"android"==r.id||"ios"==r.id||"windowsphone"==r.id||"firefoxos"==r.id||"ubuntu"==r.id){if("string"==typeof c){c=c.split(",")}}else if(Array.isArray(c)){var s=c;c=s.toString()}t(n,null,"Notification","confirm",[e,a,c])},prompt:function(e,n,o,r,i){var a=e||"Prompt message",c=o||"Prompt",s=r||["OK","Cancel"],u=i||"";t(n,null,"Notification","prompt",[a,c,s,u])},beep:function(e){t(null,null,"Notification","beep",[e])}}}),cordova.define("org.apache.cordova.splashscreen.SplashScreen",function(e,n,o){var t=e("cordova/exec"),r={show:function(){t(null,null,"SplashScreen","show",[])},hide:function(){t(null,null,"SplashScreen","hide",[])}};o.exports=r}),cordova.define("org.apache.cordova.statusbar.statusbar",function(e,n,o){var t=e("cordova/exec"),r={black:"#000000",darkGray:"#A9A9A9",lightGray:"#D3D3D3",white:"#FFFFFF",gray:"#808080",red:"#FF0000",green:"#00FF00",blue:"#0000FF",cyan:"#00FFFF",yellow:"#FFFF00",magenta:"#FF00FF",orange:"##FFA500",purple:"#800080",brown:"#A52A2A"},i={isVisible:!0,overlaysWebView:function(e){t(null,null,"StatusBar","overlaysWebView",[e])},styleDefault:function(){t(null,null,"StatusBar","styleDefault",[])},styleLightContent:function(){t(null,null,"StatusBar","styleLightContent",[])},styleBlackTranslucent:function(){t(null,null,"StatusBar","styleBlackTranslucent",[])},styleBlackOpaque:function(){t(null,null,"StatusBar","styleBlackOpaque",[])},backgroundColorByName:function(e){return i.backgroundColorByHexString(r[e])},backgroundColorByHexString:function(e){if(e.indexOf("#")<0&&(e="#"+e),4==e.length){{e.split("")}e="#"+e[1]+e[1]+e[2]+e[2]+e[3]+e[3]}t(null,null,"StatusBar","backgroundColorByHexString",[e])},hide:function(){t(null,null,"StatusBar","hide",[]),i.isVisible=!1},show:function(){t(null,null,"StatusBar","show",[]),i.isVisible=!0}};t(function(e){i.isVisible=e},null,"StatusBar","_ready",[]),o.exports=i}),cordova.define("com.pushwoosh.plugins.pushwoosh.PushNotification",function(e,n,o){function t(){}var r=e("cordova/exec");t.prototype.registerDevice=function(e,n){r(e,n,"PushNotification","registerDevice",[])},t.prototype.setTags=function(e,n,o){r(n,o,"PushNotification","setTags",e?[e]:[])},t.prototype.getPushToken=function(e){r(e,null,"PushNotification","getPushToken",[])},t.prototype.getPushwooshHWID=function(e){r(e,null,"PushNotification","getPushwooshHWID",[])},t.prototype.onDeviceReady=function(e){r(null,null,"PushNotification","onDeviceReady",e?[e]:[])},t.prototype.sendLocation=function(e,n,o){r(n,o,"PushNotification","sendLocation",e?[e]:[])},t.prototype.getTags=function(e,n){r(e,n,"PushNotification","getTags",[])},t.prototype.unregisterDevice=function(e,n){r(e,n,"PushNotification","unregisterDevice",[])},t.prototype.startLocationTracking=function(e,n){r(e,n,"PushNotification","startLocationTracking",[])},t.prototype.stopLocationTracking=function(e,n){r(e,n,"PushNotification","stopLocationTracking",[])},t.prototype.createLocalNotification=function(e,n,o){r(n,o,"PushNotification","createLocalNotification",e?[e]:[])},t.prototype.clearLocalNotification=function(){r(null,null,"PushNotification","clearLocalNotification",[])},t.prototype.startGeoPushes=function(e,n){r(e,n,"PushNotification","startGeoPushes",[])},t.prototype.stopGeoPushes=function(e,n){r(e,n,"PushNotification","stopGeoPushes",[])},t.prototype.setMultiNotificationMode=function(e,n){r(e,n,"PushNotification","setMultiNotificationMode",[])},t.prototype.setSingleNotificationMode=function(e,n){r(e,n,"PushNotification","setSingleNotificationMode",[])},t.prototype.setSoundType=function(e,n,o){r(n,o,"PushNotification","setSoundType",[e])},t.prototype.setVibrateType=function(e,n,o){r(n,o,"PushNotification","setVibrateType",[e])},t.prototype.setLightScreenOnNotification=function(e,n,o){r(n,o,"PushNotification","setLightScreenOnNotification",[e])},t.prototype.setEnableLED=function(e,n,o){r(n,o,"PushNotification","setEnableLED",[e])},t.prototype.sendGoalAchieved=function(e,n,o){r(n,o,"PushNotification","sendGoalAchieved",e?[e]:[])},t.prototype.getRemoteNotificationStatus=function(e){r(e,e,"PushNotification","getRemoteNotificationStatus",[])},t.prototype.setApplicationIconBadgeNumber=function(e,n){r(n,n,"PushNotification","setApplicationIconBadgeNumber",[{badge:e}])},t.prototype.cancelAllLocalNotifications=function(e){r(e,e,"PushNotification","cancelAllLocalNotifications",[])},t.prototype.notificationCallback=function(e){var n=document.createEvent("HTMLEvents");n.notification=e,n.initEvent("push-notification",!0,!0,arguments),document.dispatchEvent(n)},o.exports=new t});