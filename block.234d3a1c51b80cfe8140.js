(()=>{"use strict";function e(e,n){var r="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!r){if(Array.isArray(e)||(r=function(e,n){if(!e)return;if("string"==typeof e)return t(e,n);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return t(e,n)}(e))||n&&e&&"number"==typeof e.length){r&&(e=r);var i=0,o=function(){};return{s:o,n:function(){return i>=e.length?{done:!0}:{done:!1,value:e[i++]}},e:function(e){throw e},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,l=!0,u=!1;return{s:function(){r=r.call(e)},n:function(){var e=r.next();return l=e.done,e},e:function(e){u=!0,a=e},f:function(){try{l||null==r.return||r.return()}finally{if(u)throw a}}}}function t(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function n(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var r=function(){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),this.cards=e,this.init(this.cards)}var r,i,o;return r=t,i=[{key:"cropTimes",value:function(t){var n=t.innerHTML;t.innerHTML="ещё...",t.addEventListener("click",(function(t){var r,i=e(document.querySelectorAll(".features__time-badge.visually-hidden"));try{for(i.s();!(r=i.n()).done;)r.value.classList.remove("visually-hidden")}catch(e){i.e(e)}finally{i.f()}t.target.innerHTML=n}));do{(t=t.nextElementSibling).classList.add("visually-hidden")}while(t.nextElementSibling)}},{key:"init",value:function(t){var n,r=window.matchMedia("(max-width: 991px)"),i=e(t);try{for(i.s();!(n=i.n()).done;){var o,a=n.value,l=a.querySelector(".features__closest"),u=a.querySelectorAll(".features__time-badge"),c=0,f=void 0,s=e(u);try{for(s.s();!(o=s.n()).done;){var y=o.value;if(y.offsetLeft===l.offsetLeft){if(f=y.previousElementSibling,r.matches){if(2!=++c)continue;f=y.previousElementSibling}this.cropTimes(f);break}}}catch(e){s.e(e)}finally{s.f()}}}catch(e){i.e(e)}finally{i.f()}}}],i&&n(r.prototype,i),o&&n(r,o),Object.defineProperty(r,"prototype",{writable:!1}),t}();new r(document.querySelectorAll(".card"))})();