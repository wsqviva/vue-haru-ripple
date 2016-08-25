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
	__vue_template__ = __webpack_require__(9)
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
	
	var _rippleWave = __webpack_require__(5);
	
	var _rippleWave2 = _interopRequireDefault(_rippleWave);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var vueUtil = _vue2.default.util;
	var max = Math.max;
	var sqrt = Math.sqrt;
	var ceil = Math.ceil;
	
	function ElementMetrics(element) {
	  var boundingRect = this.boundingRect = element.getBoundingClientRect();
	
	  this.element = element;
	}
	
	ElementMetrics.prototype = {
	  distance: function distance(x1, y1, x2, y2) {
	    return sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
	  }
	};
	
	exports.default = {
	  name: 'vue-haru-ripple',
	
	  components: { rippleWave: _rippleWave2.default },
	
	  ready: function ready() {
	    vueUtil.on(this.$el, 'mousedown', vueUtil.bind(this.downAction, this), false);
	
	    this.metrics = new ElementMetrics(this.$el);
	  },
	
	
	  props: {
	    initialOpacity: {
	      type: Number,
	      default: 0.3
	    },
	
	    color: {
	      type: String,
	      default: 'green'
	    }
	  },
	
	  data: function data() {
	    return {
	      ripples: [],
	
	      waveBgStyle: {
	        backgroundColor: '',
	        opacity: ''
	      }
	    };
	  },
	
	  methods: {
	    downAction: function downAction(event) {
	      var self = this;
	
	      var ripple = {
	        x: event.clientX,
	        y: event.clientY,
	        metrics: this.metrics
	      };
	
	      this.waveBgStyle = {
	        backgroundColor: this.color,
	        opacity: this.initialOpacity
	      };
	
	      this.ripples.push(ripple);
	    },
	    vanish: function vanish(index) {
	      var list = this.ripples;
	      var i = void 0;
	      var k = void 0;
	      var len = list.length;
	      for (i = index, k = i + 1; k < len; i += 1, k += 1) {
	        list[i] = list[k];
	      }
	      list.pop();
	
	      if (!list.length) {
	        this.waveBgStyle = {
	          backgroundColor: '',
	          opacity: ''
	        };
	      }
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

	var __vue_script__, __vue_template__
	__webpack_require__(6)
	__vue_script__ = __webpack_require__(7)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src/rippleWave.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(8)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "./rippleWave.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 6 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var max = Math.max;
	var ceil = Math.ceil;
	
	var INITIAL_SCALE = 0.0001;
	var INITIAL_OPACITY = 0.3;
	var FINAL_SCALE = 1;
	var FINAL_OPACITY = 0;
	
	exports.default = {
	
	  props: ['ripple', 'index'],
	
	  transitions: {
	    'fade': {
	      enter: function enter(el) {
	        var _this = this;
	
	        this.$nextTick(function () {
	          _this.waveStyle.transform = _this.translateString + ' scale(1, 1)';
	        });
	      },
	
	      afterEnter: function afterEnter() {
	        this.waveStyle.opacity = 0;
	        this.$emit('after-enter', this.index);
	      }
	    }
	  },
	
	  data: function data() {
	    var metrics = this.ripple.metrics;
	    var boundingRect = metrics.boundingRect;
	    var rippleX = this.ripple.x - boundingRect.left;
	    var rippleY = this.ripple.y - boundingRect.top;
	
	    var size = Math.sqrt(boundingRect.width * boundingRect.width + boundingRect.height * boundingRect.height) * 2 + 2;
	    this.translateString = 'translate(-50%, -50%) translate(' + rippleX + 'px, ' + rippleY + 'px)';
	
	    return {
	      waveStyle: {
	        opacity: INITIAL_OPACITY,
	        backgroundColor: 'green',
	        width: size + 'px',
	        height: size + 'px',
	        transform: this.translateString + ' scale(' + INITIAL_SCALE + ', ' + INITIAL_SCALE + ')'
	      }
	    };
	  }
	};

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = "\n<div class=\"wave\" :style=\"waveStyle\" transition=\"fade\">\n</div>\n";

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = "\n<div class=\"haru-ripple\">\n  <slot></slot>\n  <div class=\"background\" :style=\"waveBgStyle\"></div>\n  <div class=\"waves\">\n    <ripple-wave v-for=\"ripple in ripples\" :ripple=\"ripple\" :index=\"$index\" @after-enter=\"vanish\">\n    </ripple-wave>\n  </div>\n</div>\n";

/***/ }
/******/ ])
});
;
//# sourceMappingURL=index.js.map