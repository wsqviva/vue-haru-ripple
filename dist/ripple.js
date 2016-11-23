(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("Vue"));
	else if(typeof define === 'function' && define.amd)
		define(["Vue"], factory);
	else if(typeof exports === 'object')
		exports["VueHaruRipple"] = factory(require("Vue"));
	else
		root["VueHaruRipple"] = factory(root["Vue"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_11__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 47);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(2)(function(){
  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ },
/* 1 */
/***/ function(module, exports) {

var core = module.exports = {version: '2.4.0'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 2 */
/***/ function(module, exports) {

module.exports = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};

/***/ },
/* 3 */
/***/ function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 4 */
/***/ function(module, exports) {

module.exports = function(it){
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

/***/ },
/* 5 */
/***/ function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

var global    = __webpack_require__(3)
  , core      = __webpack_require__(1)
  , ctx       = __webpack_require__(26)
  , hide      = __webpack_require__(30)
  , PROTOTYPE = 'prototype';

var $export = function(type, name, source){
  var IS_FORCED = type & $export.F
    , IS_GLOBAL = type & $export.G
    , IS_STATIC = type & $export.S
    , IS_PROTO  = type & $export.P
    , IS_BIND   = type & $export.B
    , IS_WRAP   = type & $export.W
    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
    , expProto  = exports[PROTOTYPE]
    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
    , key, own, out;
  if(IS_GLOBAL)source = name;
  for(key in source){
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if(own && key in exports)continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function(C){
      var F = function(a, b, c){
        if(this instanceof C){
          switch(arguments.length){
            case 0: return new C;
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if(IS_PROTO){
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library` 
module.exports = $export;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(25);
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
  return cof(it) == 'String' ? it.split('') : Object(it);
};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

var anObject       = __webpack_require__(23)
  , IE8_DOM_DEFINE = __webpack_require__(31)
  , toPrimitive    = __webpack_require__(43)
  , dP             = Object.defineProperty;

exports.f = __webpack_require__(0) ? Object.defineProperty : function defineProperty(O, P, Attributes){
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if(IE8_DOM_DEFINE)try {
    return dP(O, P, Attributes);
  } catch(e){ /* empty */ }
  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
  if('value' in Attributes)O[P] = Attributes.value;
  return O;
};

/***/ },
/* 9 */
/***/ function(module, exports) {

// 7.1.4 ToInteger
var ceil  = Math.ceil
  , floor = Math.floor;
module.exports = function(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(7)
  , defined = __webpack_require__(5);
module.exports = function(it){
  return IObject(defined(it));
};

/***/ },
/* 11 */
/***/ function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_11__;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vue__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__constants__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils__ = __webpack_require__(16);


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
//
//





var utilBind = __WEBPACK_IMPORTED_MODULE_2_vue___default.a.util.bind;


/* harmony default export */ exports["default"] = {
  name: 'vue-haru-ripple',

  mounted: function mounted() {
    this._boundDownAction = utilBind(this.downAction, this);
    this._boundUpAction = utilBind(this.upAction, this);

    // pointerdown, pointerup
    // focus, blur
    if (__WEBPACK_IMPORTED_MODULE_3__constants__["a" /* SUPPORT_TOUCH */]) {
      this.$el.addEventListener('touchstart', this._boundDownAction);
      this.$el.addEventListener('touchend', this._boundUpAction);
      this.$el.addEventListener('touchcancel', this._boundUpAction);
    } else {
      this.$el.addEventListener('mousedown', this._boundDownAction);
      this.$el.addEventListener('mouseup', this._boundUpAction);
    }

    // el'rect
    var boundingRect = this._boundingRect = this.$el.getBoundingClientRect();

    // have not pass color prop
    if (!this.color) {
      var color = this.$refs.content.firstElementChild && window.getComputedStyle(this.$refs.content.firstElementChild).color;
      this.color = color || '#fff';
    }

    this.waveStyle.backgroundColor = this.color;
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
        opacity: this.opacity,
        width: '',
        height: '',
        marginLeft: '',
        marginTop: '',
        transform: ''
      }
    };
  },


  methods: {
    _forwardState: function _forwardState(el, hook) {
      var _rippleState;

      var rippleState = (_rippleState = {}, __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty___default()(_rippleState, __WEBPACK_IMPORTED_MODULE_3__constants__["b" /* RIPPLE_STATE_INIT */], __WEBPACK_IMPORTED_MODULE_3__constants__["c" /* RIPPLE_STATE_READY_TO_VANISH */]), __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty___default()(_rippleState, __WEBPACK_IMPORTED_MODULE_3__constants__["c" /* RIPPLE_STATE_READY_TO_VANISH */], __WEBPACK_IMPORTED_MODULE_3__constants__["d" /* RIPPLE_STATE_VANISH */]), __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty___default()(_rippleState, __WEBPACK_IMPORTED_MODULE_3__constants__["d" /* RIPPLE_STATE_VANISH */], __WEBPACK_IMPORTED_MODULE_3__constants__["b" /* RIPPLE_STATE_INIT */]), _rippleState);

      var currentRippleState = el.dataset.ripplestate;

      if (currentRippleState == __WEBPACK_IMPORTED_MODULE_3__constants__["c" /* RIPPLE_STATE_READY_TO_VANISH */]) {
        this.showWave = false;
        hook && hook();
      }

      el.dataset.ripplestate = rippleState[currentRippleState];
    },


    // prev ripple should vanish immediately
    // optimisticly remove
    beforeEnter: function beforeEnter(el) {
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils__["a" /* removeClass */])(el, 'animating');
      __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign___default()(el.style, { opacity: this.opacity, transform: '' + this._rippleTranslate + __WEBPACK_IMPORTED_MODULE_3__constants__["e" /* INITIAL_SCALE */] });
    },


    // after the subsequent two frames `spread-enter` class will be removed
    enter: function enter(el, done) {
      var _this = this;

      window.requestAnimationFrame(function () {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils__["b" /* addClass */])(el, 'animating');
        __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign___default()(el.style, { transform: '' + _this._rippleTranslate });
        _this._disposeTransHandler = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils__["c" /* onceTransitionEnds */])(el, 'transform', __WEBPACK_IMPORTED_MODULE_4__utils__["d" /* transitionEndEvent */], __WEBPACK_IMPORTED_MODULE_3__constants__["f" /* TRANSFORM_DURATION */], done);
      });
    },
    afterEnter: function afterEnter(el) {
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils__["a" /* removeClass */])(el, 'animating');

      this._forwardState(el);
    },
    afterLeave: function afterLeave(el) {
      if (this._upaction) {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils__["a" /* removeClass */])(el, 'vanish');
      }
    },
    enterCancelled: function enterCancelled(el) {
      el.style.setProperty('transform', '' + this._rippleTranslate + __WEBPACK_IMPORTED_MODULE_3__constants__["e" /* INITIAL_SCALE */] + ')');
    },
    animFrameHandler: function animFrameHandler() {
      this.showWave = true;
    },


    // mouseup event in task queue `should` trigger before raf animation frames
    upAction: function upAction(event) {
      var _this2 = this;

      var ripple = this.$refs.ripple;

      ripple.style.opacity = 0;

      this._upaction = false;
      this._forwardState(ripple, function () {
        _this2._upaction = true;
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils__["b" /* addClass */])(ripple, 'vanish');
      });

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
      var _this3 = this;

      if (this.handleMouseDown(event) === false) {
        return;
      }

      this._disposeTransHandler && this._disposeTransHandler();

      var boundingRect = this._boundingRect;

      // identify 'mousedown' or 'touchstart' x, y
      var downX = event.touches ? event.touches[0].pageX : event.clientX;
      var downY = event.touches ? event.touches[0].pageY : event.clientY;

      var rippleX = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils__["e" /* ceil */])(downX - boundingRect.left);
      var rippleY = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils__["e" /* ceil */])(downY - boundingRect.top);

      var rippleTranslate = this._rippleTranslate = 'translate(-50%, -50%) translate(' + rippleX + 'px, ' + rippleY + 'px)';
      // ripple diameter
      var rippleSize = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils__["e" /* ceil */])(2.05 * __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils__["f" /* furthestCornerDistanceFrom */])(rippleX, rippleY, boundingRect.width, boundingRect.height));

      this.showWave = false;

      this.waveStyle.width = rippleSize + 'px';
      this.waveStyle.height = rippleSize + 'px';

      this.$refs.ripple.dataset.ripplestate = __WEBPACK_IMPORTED_MODULE_3__constants__["b" /* RIPPLE_STATE_INIT */];

      __WEBPACK_IMPORTED_MODULE_2_vue___default.a.nextTick(function () {
        _this3.animFrameHandler();
      });
    }
  },

  beforeDestroy: function beforeDestroy() {
    console.log('beforeDestroy');
  }
};

/***/ },
/* 13 */
/***/ function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;
  return _vm._h('div', {
    staticClass: "haru-ripple"
  }, [_vm._h('div', {
    ref: "content"
  }, [_vm._t("default")]), " ", _vm._h('transition', {
    attrs: {
      "name": "spread"
    },
    on: {
      "before-enter": _vm.beforeEnter,
      "enter": _vm.enter,
      "after-enter": _vm.afterEnter,
      "enter-cancelled": _vm.enterCancelled,
      "after-leave": _vm.afterLeave
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
     require("vue-hot-reload-api").rerender("data-v-1da45bca", module.exports)
  }
}

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(exports, "e", function() { return INITIAL_SCALE; });
/* unused harmony export FINAL_SCALE */
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return SUPPORT_TOUCH; });
/* harmony export (binding) */ __webpack_require__.d(exports, "f", function() { return TRANSFORM_DURATION; });
/* harmony export (binding) */ __webpack_require__.d(exports, "b", function() { return RIPPLE_STATE_INIT; });
/* harmony export (binding) */ __webpack_require__.d(exports, "c", function() { return RIPPLE_STATE_READY_TO_VANISH; });
/* harmony export (binding) */ __webpack_require__.d(exports, "d", function() { return RIPPLE_STATE_VANISH; });


// ripple init scale
var INITIAL_SCALE = ' scale(0.01, 0.01)';

// ripple final scale
var FINAL_SCALE = '';

var SUPPORT_TOUCH = 'ontouchstart' in window;

var TRANSFORM_DURATION = 600;

var RIPPLE_STATE_INIT = 0;
var RIPPLE_STATE_READY_TO_VANISH = 1;
var RIPPLE_STATE_VANISH = 2;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony export (binding) */ __webpack_require__.d(exports, "d", function() { return transitionEndEvent; });
/* unused harmony export sqrt */
/* harmony export (binding) */ __webpack_require__.d(exports, "e", function() { return ceil; });
/* unused harmony export max */
/* harmony export (immutable) */ exports["c"] = onceTransitionEnds;
/* harmony export (immutable) */ exports["b"] = addClass;
/* harmony export (immutable) */ exports["a"] = removeClass;
/* unused harmony export on */
/* unused harmony export off */
/* unused harmony export calcBoundingRect */
/* harmony export (immutable) */ exports["f"] = furthestCornerDistanceFrom;

var _Vue$util = __WEBPACK_IMPORTED_MODULE_0_vue___default.a.util,
    inBrowser = _Vue$util.inBrowser,
    isIE9 = _Vue$util.isIE9;

// vue itself only support IE9=+

var hasTransition = inBrowser && !isIE9;

var transitionEndEvent = 'transitionend';
if (hasTransition) {
  if (window.ontransitionend === undefined && window.onwebkittransitionend !== undefined) {
    transitionEndEvent = 'webkitTransitionEnd';
  }
}



var sqrt = Math.sqrt;
var ceil = Math.ceil;
var max = Math.max;

function onceTransitionEnds(el, proptyName, transitionEndEvent, timeout, cb) {
  var timer = void 0;

  var dispose = function dispose() {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    off(el, transitionEndEvent, onEnd);
  };

  var end = function end() {
    dispose();
    cb();
  };

  var onEnd = function onEnd(e) {
    if (e.target === el && e.propertyName === proptyName) {
      end();
    }
  };

  on(el, transitionEndEvent, onEnd);

  setTimeout(function () {
    end();
  }, timeout + 1);

  return dispose;
}

function addClass(el, cls) {
  el.classList.add(cls);
}

function removeClass(el, cls) {
  el.classList.remove(cls);
}

function on(el, eventName, fn) {
  el.addEventListener(eventName, fn, false);
}

function off(el, eventName, fn) {
  el.removeEventListener(eventName, fn, false);
}

function calcBoundingRect(el) {
  return el.getBoundingClientRect();
}

function distance(x1, y1, x2, y2) {
  var xDelta = x1 - x2;
  var yDelta = y1 - y2;

  return sqrt(xDelta * xDelta + yDelta * yDelta);
}

function furthestCornerDistanceFrom(x, y, width, height) {
  var topLeft = distance(x, y, 0, 0);
  var topRight = distance(x, y, width, 0);
  var bottomLeft = distance(x, y, 0, height);
  var bottomRight = distance(x, y, width, height);

  return max(topLeft, topRight, bottomLeft, bottomRight);
}

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(20), __esModule: true };

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(21), __esModule: true };

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

exports.__esModule = true;

var _defineProperty = __webpack_require__(18);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (obj, key, value) {
  if (key in obj) {
    (0, _defineProperty2.default)(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

__webpack_require__(45);
module.exports = __webpack_require__(1).Object.assign;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

__webpack_require__(46);
var $Object = __webpack_require__(1).Object;
module.exports = function defineProperty(it, key, desc){
  return $Object.defineProperty(it, key, desc);
};

/***/ },
/* 22 */
/***/ function(module, exports) {

module.exports = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(4);
module.exports = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(10)
  , toLength  = __webpack_require__(41)
  , toIndex   = __webpack_require__(40);
module.exports = function(IS_INCLUDES){
  return function($this, el, fromIndex){
    var O      = toIObject($this)
      , length = toLength(O.length)
      , index  = toIndex(fromIndex, length)
      , value;
    // Array#includes uses SameValueZero equality algorithm
    if(IS_INCLUDES && el != el)while(length > index){
      value = O[index++];
      if(value != value)return true;
    // Array#toIndex ignores holes, Array#includes - not
    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
      if(O[index] === el)return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

/***/ },
/* 25 */
/***/ function(module, exports) {

var toString = {}.toString;

module.exports = function(it){
  return toString.call(it).slice(8, -1);
};

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(22);
module.exports = function(fn, that, length){
  aFunction(fn);
  if(that === undefined)return fn;
  switch(length){
    case 1: return function(a){
      return fn.call(that, a);
    };
    case 2: return function(a, b){
      return fn.call(that, a, b);
    };
    case 3: return function(a, b, c){
      return fn.call(that, a, b, c);
    };
  }
  return function(/* ...args */){
    return fn.apply(that, arguments);
  };
};

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(4)
  , document = __webpack_require__(3).document
  // in old IE typeof document.createElement is 'object'
  , is = isObject(document) && isObject(document.createElement);
module.exports = function(it){
  return is ? document.createElement(it) : {};
};

/***/ },
/* 28 */
/***/ function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

/***/ },
/* 29 */
/***/ function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function(it, key){
  return hasOwnProperty.call(it, key);
};

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

var dP         = __webpack_require__(8)
  , createDesc = __webpack_require__(37);
module.exports = __webpack_require__(0) ? function(object, key, value){
  return dP.f(object, key, createDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(0) && !__webpack_require__(2)(function(){
  return Object.defineProperty(__webpack_require__(27)('div'), 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';
// 19.1.2.1 Object.assign(target, source, ...)
var getKeys  = __webpack_require__(35)
  , gOPS     = __webpack_require__(33)
  , pIE      = __webpack_require__(36)
  , toObject = __webpack_require__(42)
  , IObject  = __webpack_require__(7)
  , $assign  = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(2)(function(){
  var A = {}
    , B = {}
    , S = Symbol()
    , K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function(k){ B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
  var T     = toObject(target)
    , aLen  = arguments.length
    , index = 1
    , getSymbols = gOPS.f
    , isEnum     = pIE.f;
  while(aLen > index){
    var S      = IObject(arguments[index++])
      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
      , length = keys.length
      , j      = 0
      , key;
    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
  } return T;
} : $assign;

/***/ },
/* 33 */
/***/ function(module, exports) {

exports.f = Object.getOwnPropertySymbols;

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

var has          = __webpack_require__(29)
  , toIObject    = __webpack_require__(10)
  , arrayIndexOf = __webpack_require__(24)(false)
  , IE_PROTO     = __webpack_require__(38)('IE_PROTO');

module.exports = function(object, names){
  var O      = toIObject(object)
    , i      = 0
    , result = []
    , key;
  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while(names.length > i)if(has(O, key = names[i++])){
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys       = __webpack_require__(34)
  , enumBugKeys = __webpack_require__(28);

module.exports = Object.keys || function keys(O){
  return $keys(O, enumBugKeys);
};

/***/ },
/* 36 */
/***/ function(module, exports) {

exports.f = {}.propertyIsEnumerable;

/***/ },
/* 37 */
/***/ function(module, exports) {

module.exports = function(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
};

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

var shared = __webpack_require__(39)('keys')
  , uid    = __webpack_require__(44);
module.exports = function(key){
  return shared[key] || (shared[key] = uid(key));
};

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

var global = __webpack_require__(3)
  , SHARED = '__core-js_shared__'
  , store  = global[SHARED] || (global[SHARED] = {});
module.exports = function(key){
  return store[key] || (store[key] = {});
};

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(9)
  , max       = Math.max
  , min       = Math.min;
module.exports = function(index, length){
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(9)
  , min       = Math.min;
module.exports = function(it){
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(5);
module.exports = function(it){
  return Object(defined(it));
};

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(4);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function(it, S){
  if(!isObject(it))return it;
  var fn, val;
  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  throw TypeError("Can't convert object to primitive value");
};

/***/ },
/* 44 */
/***/ function(module, exports) {

var id = 0
  , px = Math.random();
module.exports = function(key){
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(6);

$export($export.S + $export.F, 'Object', {assign: __webpack_require__(32)});

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

var $export = __webpack_require__(6);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(0), 'Object', {defineProperty: __webpack_require__(8).f});

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = {}

/* styles */
__webpack_require__(13)

/* script */
__vue_exports__ = __webpack_require__(12)

/* template */
var __vue_template__ = __webpack_require__(14)
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
  var hotAPI = require("vue-hot-reload-api")
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