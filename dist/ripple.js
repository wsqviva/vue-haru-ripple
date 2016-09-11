(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("Vue"));
	else if(typeof define === 'function' && define.amd)
		define(["Vue"], factory);
	else if(typeof exports === 'object')
		exports["VueHaruRipple"] = factory(require("Vue"));
	else
		root["VueHaruRipple"] = factory(root["Vue"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_4__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(1)
	__vue_script__ = __webpack_require__(3)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src/ripple.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(6)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "./ripple.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 1 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 2 */,
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _vue = __webpack_require__(4);
	
	var _vue2 = _interopRequireDefault(_vue);
	
	var _betterRaf = __webpack_require__(5);
	
	var _betterRaf2 = _interopRequireDefault(_betterRaf);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var raf = (0, _betterRaf2.default)();
	var vueUtil = _vue2.default.util;
	var sqrt = Math.sqrt;
	var round = Math.round;
	var SUPPORT_TOUCH = 'ontouchstart' in window;
	var INITIAL_SCALE = 0.001;
	var FINAL_SCALE = 1;
	
	var FRAME_CHECK_COUNT = 1;
	
	exports.default = {
	  name: 'vue-haru-ripple',
	
	  ready: function ready() {
	    this._boundDownAction = vueUtil.bind(this.downAction, this);
	    this._boundUpAction = vueUtil.bind(this.upAction, this);
	
	    if (SUPPORT_TOUCH) {
	      vueUtil.on(this.$el, 'touchstart', this._boundDownAction, false);
	      vueUtil.on(this.$el, 'touchend', this._boundUpAction, false);
	      vueUtil.on(this.$el, 'touchcancel', this._boundUpAction, false);
	    } else {
	      vueUtil.on(this.$el, 'mousedown', this._boundDownAction, false);
	      vueUtil.on(this.$el, 'mouseup', this._boundUpAction, false);
	    }
	
	    this._frameCount = 0;
	    var boundingRect = this._boundingRect = this.$el.getBoundingClientRect();
	    this._rippleSize = round(sqrt(boundingRect.width * boundingRect.width + boundingRect.height * boundingRect.height) * 2) + 2;
	
	    if (!this.color) {
	      var color = this.$els.content.firstElementChild && window.getComputedStyle(this.$els.content.firstElementChild).color;
	      this.color = color || '#fff';
	    }
	  },
	
	
	  transitions: {
	    spread: {
	      beforeEnter: function beforeEnter() {
	        this.waveClass.animating = true;
	      },
	      enter: function enter() {
	        var _this = this;
	
	        this.$nextTick(function () {
	          _this.setWaveStyle();
	        });
	      },
	      afterEnter: function afterEnter() {
	        this.showWave = false;
	        this.$emit('disappear');
	      }
	    }
	  },
	
	  props: {
	    opacity: {
	      type: Number | String,
	      default: 0.3
	    },
	
	    color: {
	      type: String
	    }
	  },
	
	  data: function data() {
	    return {
	      showWave: false,
	
	      waveClass: {
	        animating: false
	      },
	
	      waveStyle: {
	        backgroundColor: '',
	        opacity: '',
	        width: '',
	        height: '',
	        transform: ''
	      }
	    };
	  },
	
	
	  methods: {
	    setWaveStyle: function setWaveStyle() {
	      this.waveStyle.transform = this._rippleTranslate + ' scale(' + FINAL_SCALE + ', ' + FINAL_SCALE + ')';
	    },
	    frameCountCheck: function frameCountCheck() {
	      if (this._frameCount > 0) {
	        return false;
	      }
	      this._frameCount = FRAME_CHECK_COUNT;
	      return true;
	    },
	    animFrameHandler: function animFrameHandler() {
	      this._frameCount--;
	      this.showWave = true;
	    },
	    upAction: function upAction(event) {
	      this.handleMouseUp(event);
	      this.waveStyle.opacity = 0;
	    },
	    handleMouseUp: function handleMouseUp(event) {
	      if (event.type.indexOf('mouse') === 0) {
	        vueUtil.off(this.$el, 'mouseleave', this._boundUpAction, false);
	      }
	    },
	    handleMouseDown: function handleMouseDown(event) {
	      if (event.type === 'mousedown') {
	        if (event.button !== 0) {
	          return false;
	        }
	
	        vueUtil.on(this.$el, 'mouseleave', this._boundUpAction, false);
	      }
	    },
	    downAction: function downAction(event) {
	      var _this2 = this;
	
	      if (!this.frameCountCheck()) {
	        return;
	      }
	      if (this.handleMouseDown(event) === false) {
	        return;
	      }
	      var boundingRect = this._boundingRect;
	
	      var downX = event.touches ? event.touches[0].pageX : event.clientX;
	      var downY = event.touches ? event.touches[0].pageY : event.clientY;
	
	      var rippleX = round(downX - boundingRect.left);
	      var rippleY = round(downY - boundingRect.top);
	
	      var rippleTranslate = this._rippleTranslate = 'translate(-50%, -50%) translate(' + rippleX + 'px, ' + rippleY + 'px)';
	      var rippleSize = this._rippleSize;
	
	      this.showWave = false;
	
	      this.waveClass.animating = false;
	
	      this.waveStyle = {
	        opacity: this.opacity,
	        backgroundColor: this.color,
	        width: rippleSize + 'px',
	        height: rippleSize + 'px',
	        transform: rippleTranslate + ' scale(' + INITIAL_SCALE + ', ' + INITIAL_SCALE + ')'
	      };
	
	      raf.requestAnimationFrame(function () {
	        _this2.animFrameHandler();
	      });
	    }
	  }
	};

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	!function(t,e){ true?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.raf=e():t.raf=e()}(this,function(){return function(t){function e(n){if(i[n])return i[n].exports;var a=i[n]={exports:{},id:n,loaded:!1};return t[n].call(a.exports,a,a.exports,e),a.loaded=!0,a.exports}var i={};return e.m=t,e.c=i,e.p="",e(0)}([function(t,e,i){"use strict";function n(t){return this instanceof n?("number"==typeof t&&(t={frameRate:t}),t||(t={}),t.useNative!==!1&&(t.useNative=!0),this.options=t,this.frameRate=t.frameRate||n.DEFAULT_FRAMERATE,this.frameLength=1e3/this.frameRate,this._isCustomFrameRate=this.frameRate!==n.DEFAULT_FRAMERATE,this._lastTickTime=0,this._tickCount=0,this._currentKeymaps={},this.keymapsSize=0,this._delaying=!1,void(this.boundDelayCallback=a.bind(this))):new n(t)}function a(t){var e,i=this._lastTickTime;return t=t||0,0===i&&(this._lastTickTime=i=t),e=this.frameLength-(t-i),e<=0&&(this._lastTickTime=t+e,e=0),this.options.useNative?void(0===e?o.call(this):u(this.boundDelayCallback)):void s.call(this,e)}function s(t){var e=this;setTimeout(function(){o.call(e)},t)}function o(){var t,e,i,n;this._delaying=!1,t=this._currentKeymaps,this._currentKeymaps={},this.keymapsSize=0,e=c();for(i in t)n=t[i],n.cancelled||n.callback(e)}var r=i(1),c=i(2),u=r&&r.raf,f=r&&r.caf;n.DEFAULT_FRAMERATE=60,n.prototype.requestAnimationFrame=function(t){if(!this._isCustomFrameRate)return u(t);if("function"!=typeof t)throw new TypeError("arguments should be a callback function");var e=this;return this._tickCount++,this._delaying||(this._delaying=!0,this.options.useNative?u(this.boundDelayCallback):setTimeout(function(){e.boundDelayCallback()},0)),this._currentKeymaps[this._tickCount]={id:this._tickCount,callback:t,cancelled:!1},++this.keymapsSize,this._tickCount},n.prototype.cancelAnimationFrame=function(t){this._isCustomFrameRate||f(t),delete this._currentKeymaps[t],--this.keymapsSize},t.exports=n},function(t,e){"use strict";var i,n;!function(t){i=t.requestAnimationFrame,n=t.cancelAnimationFrame;var e,a,s=["webkit","moz","o","ms"];if(!i)for(a=0;a<s.length;a++)if(e=t[s[a]+"RequestAnimationFrame"]){i=e,n=t[s[a]+"CancelAnimationFrame"];break}}(window),t.exports.raf=i,t.exports.caf=n},function(t,e){"use strict";function i(){return Date.now()||(new Date).getTime()}function n(){return window.performance?window.performance.now():i()-a}var a=i();t.exports=n}])});
	//# sourceMappingURL=raf.js.map

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = "\n<div class=\"haru-ripple\" _v-1da45bca=\"\">\n  <div v-el:content=\"\" _v-1da45bca=\"\">\n    <slot _v-1da45bca=\"\"></slot>\n  </div>\n  <div v-show=\"showWave\" class=\"wave\" :class=\"waveClass\" :style=\"waveStyle\" transition=\"spread\" _v-1da45bca=\"\"></div>\n</div>\n";

/***/ }
/******/ ])
});
;
//# sourceMappingURL=ripple.js.map