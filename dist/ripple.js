(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("Vue"));
	else if(typeof define === 'function' && define.amd)
		define(["Vue"], factory);
	else if(typeof exports === 'object')
		exports["VueHaruRipple"] = factory(require("Vue"));
	else
		root["VueHaruRipple"] = factory(root["Vue"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_3__) {
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
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// identity function for calling harmory imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmory exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		Object.defineProperty(exports, name, {
/******/ 			configurable: false,
/******/ 			enumerable: true,
/******/ 			get: getter
/******/ 		});
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vue = __webpack_require__(3);

var _vue2 = _interopRequireDefault(_vue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var utilBind = _vue2.default.util.bind; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var sqrt = Math.sqrt;
var round = Math.round;

var SUPPORT_TOUCH = 'ontouchstart' in window;

// ripple init scale
var INITIAL_SCALE = 0.1;
// ripple final scale
var FINAL_SCALE = '';

// used to handle downActions triggered within one animation frame time
var FRAME_CHECK_COUNT = 1;

exports.default = {
  name: 'vue-haru-ripple',

  mounted: function mounted() {
    this._boundDownAction = utilBind(this.downAction, this);
    this._boundUpAction = utilBind(this.upAction, this);

    if (SUPPORT_TOUCH) {
      this.$el.addEventListener('touchstart', this._boundDownAction);
      this.$el.addEventListener('touchend', this._boundUpAction);
      this.$el.addEventListener('touchcancel', this._boundUpAction);
    } else {
      this.$el.addEventListener('mousedown', this._boundDownAction);
      this.$el.addEventListener('mouseup', this._boundUpAction);
    }

    this._frameCount = 0;
    // fixed rect
    var boundingRect = this._boundingRect = this.$el.getBoundingClientRect();
    this._rippleSize = round(sqrt(boundingRect.width * boundingRect.width + boundingRect.height * boundingRect.height) * 2) + 2;

    // have not pass color prop
    if (!this.color) {
      var color = this.$refs.content.firstElementChild && window.getComputedStyle(this.$refs.content.firstElementChild).color;
      this.color = color || '#fff';
    }

    this._shouldFade = false;
    this._couldVanish = false;
  },


  props: {
    // ripple initial opacity
    opacity: {
      type: Number | String,
      default: 0.3
    },
    // ripple color, default is its color
    // TODO: support rgba
    color: {
      type: String
    }
  },

  data: function data() {
    return {
      showWave: false,

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
    fadeVanish: function fadeVanish() {
      if (this._shouldFade) {
        this.$refs.ripple.style.opacity = 0;
      }

      if (this._couldVaniash) {
        this.showWave = false;
        this.$emit('vanish');
      }

      this._shouldFade = !this._shouldFade;
      this._couldVanish = !this._couldVaniash;
    },
    beforeEnter: function beforeEnter(el) {
      // prev ripple should vanish immediately
      el.classList.remove('animating');
      el.style.opacity = this.opacity;
      el.style.transform = this._rippleTranslate + ' scale(' + INITIAL_SCALE + ', ' + INITIAL_SCALE + ')';
    },


    // after the next two frames `spread-enter` class will be removed
    enter: function enter(el) {
      var _this = this;

      window.requestAnimationFrame(function () {
        el.classList.add('animating');
        el.style.transform = '' + _this._rippleTranslate;
      });
    },


    // leave, afterLeave hooks not bound
    afterEnter: function afterEnter(el) {
      // 如果还没有up过就不能设为false
      el.classList.remove('animating');
      this.fadeVanish();
    },
    enterCancelled: function enterCancelled(el) {
      el.style.transform = this._rippleTranslate + ' scale(' + INITIAL_SCALE + ', ' + INITIAL_SCALE + ')';
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


    // mouseup event in task queue trigger before raf animation frames
    upAction: function upAction(event) {
      this.fadeVanish();
      this.handleMouseUp(event);
    },
    handleMouseUp: function handleMouseUp(event) {
      if (event.type.indexOf('mouse') === 0) {
        this.$el.removeEventListener('mouseleave', this._boundUpAction);
      }
    },
    handleMouseDown: function handleMouseDown(event) {
      if (event.type === 'mousedown') {
        // only left mouse button
        if (event.button !== 0) {
          return false;
        }
        this.$el.addEventListener('mouseleave', this._boundUpAction);
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

      // decide 'mousedown' or 'touchstart' x, y
      var downX = event.touches ? event.touches[0].pageX : event.clientX;
      var downY = event.touches ? event.touches[0].pageY : event.clientY;

      var rippleX = round(downX - boundingRect.left);
      var rippleY = round(downY - boundingRect.top);

      // ripple max diameter
      var rippleTranslate = this._rippleTranslate = 'translate(-50%, -50%) translate(' + rippleX + 'px, ' + rippleY + 'px)';
      var rippleSize = this._rippleSize;

      this.showWave = false;

      // this.waveStyle.opacity = this.opacity
      this.waveStyle.backgroundColor = this.color;
      this.waveStyle.width = rippleSize + 'px';
      this.waveStyle.height = rippleSize + 'px';
      // this.waveStyle.transform = `${rippleTranslate} scale(${INITIAL_SCALE}, ${INITIAL_SCALE})`

      _vue2.default.nextTick(function () {
        _this2.animFrameHandler();
      });
    }
  }
};

/***/ },
/* 1 */
/***/ function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;
  return _vm._h('div', {
    staticClass: "haru-ripple"
  }, [_vm._h('div', {
    ref: "content"
  }, [_vm._t("default")]), " ", _vm._h('transition', {
    attrs: {
      "name": "spread",
      "type": "transition"
    },
    on: {
      "before-enter": _vm.beforeEnter,
      "enter": _vm.enter,
      "after-enter": _vm.afterEnter,
      "enter-cancelled": _vm.enterCancelled
    }
  }, [_vm._h('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.showWave),
      expression: "showWave"
    }],
    ref: "ripple",
    staticClass: "wave",
    style: (_vm.waveStyle)
  })])])
},staticRenderFns: []}
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-1da45bca", module.exports)
  }
}

/***/ },
/* 3 */
/***/ function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = {}

/* styles */
__webpack_require__(1)

/* script */
__vue_exports__ = __webpack_require__(0)

/* template */
var __vue_template__ = __webpack_require__(2)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "/Users/wusiquan/github/vue-haru-ripple/src/ripple.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1da45bca", __vue_options__)
  } else {
    hotAPI.reload("data-v-1da45bca", __vue_options__)
  }
})()}
if (__vue_options__.functional) {console.error("[vue-loader] ripple.vue: functional components are not supported and should be defined in plain js files using render functions.")}

module.exports = __vue_exports__


/***/ }
/******/ ]);
});
//# sourceMappingURL=ripple.js.map