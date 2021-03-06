(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define("Repoll", ["react"], factory);
	else if(typeof exports === 'object')
		exports["Repoll"] = factory(require("react"));
	else
		root["Repoll"] = factory(root["react"]);
})(window, function(__WEBPACK_EXTERNAL_MODULE_react__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // object class checkers


var _is = __webpack_require__(/*! ./is */ "./src/is.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* eslint-disable no-console */

/**
 * send console error message identifying it as a TypeError
 *
 * @param {string} message
 */
var typeErrorWithConsole = function typeErrorWithConsole(message) {
  console.error('TypeError: ' + message);
};

/**
 * throw new TypeError with message
 *
 * @param {string} message
 */
var typeErrorFallback = function typeErrorFallback(message) {
  throw new TypeError(message);
};

var throwTypeError = window.console && window.console.error ? typeErrorWithConsole : typeErrorFallback;

/* eslint-enable */

/**
 * set the object of data for the interval
 *
 * @param {object} intervalMap
 * @param {string} key
 * @param {number} timeInMs
 * @param {function} fn
 * @returns {object}
 */
var setRepollIntervalData = function setRepollIntervalData(intervalMap, key, timeInMs, fn) {
  var intervalMetadata = {
    interval: null,
    name: key
  };

  intervalMetadata.stop = function () {
    clearInterval(intervalMap[key].interval);
    intervalMap[key].interval = null;
  };

  intervalMetadata.start = function () {
    if (!(0, _is.isNull)(intervalMap[key].interval)) {
      intervalMap[key].stop();
    }

    intervalMetadata.interval = setInterval(function () {
      fn(intervalMetadata);
    }, timeInMs);
  };

  return intervalMetadata;
};

/**
 * noop to return passed item
 *
 * @param {Component} ReactClass
 * @returns {Component}
 */
var returnSameClass = function returnSameClass(ReactClass) {
  return ReactClass;
};

var DEFAULT_OPTIONS = {
  autoStart: true,
  stopOnUnmount: true
};

/**
 * decorator to poll all functions based on map of polls passed
 *
 * @param {object} functionMap
 * @param {object} options={}
 * @returns {function(React.Component): React.Component}
 */
var repoll = function repoll(functionMap) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var hasError = false;

  if ((0, _is.isReactComponent)(functionMap)) {
    throwTypeError('Cannot decorate the provided React class directly, you must use repoll as a method passing an' + 'object of key: value pairs being functionName: polling interval.');

    hasError = true;
  } else if (!(0, _is.isObject)(functionMap)) {
    throwTypeError('You must pass in an object with key: value pairs being functionName: polling interval.');

    hasError = true;
  } else if (!(0, _is.isObject)(options)) {
    throwTypeError('Options passed must be an object.');

    hasError = true;
  }

  if (hasError) {
    return returnSameClass;
  }

  var coalescedOptions = _extends({}, DEFAULT_OPTIONS, options);

  return function (ReactClass) {
    if (!(0, _is.isReactComponent)(ReactClass)) {
      typeErrorWithConsole('Decorated function must be a ReactClass: functional components are not supported at this time.');

      return ReactClass;
    }

    var RepollComponent = function (_ReactClass) {
      _inherits(RepollComponent, _ReactClass);

      function RepollComponent() {
        _classCallCheck(this, RepollComponent);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        var _this = _possibleConstructorReturn(this, _ReactClass.call.apply(_ReactClass, [this].concat(args)));

        _this.repollIntervals = {};


        if ((0, _is.isFunction)(_ReactClass.prototype.constructor)) {
          var _ReactClass$prototype;

          (_ReactClass$prototype = _ReactClass.prototype.constructor).call.apply(_ReactClass$prototype, [_this].concat(args));
        }

        _this.repollIntervals = {};

        for (var key in functionMap) {
          var intervalTimeInMs = functionMap[key];

          if (!(0, _is.isNumber)(intervalTimeInMs)) {
            throwTypeError('Intervals must be specified as a number signifying the number of milliseconds to wait.');
          }

          if ((0, _is.isFunction)(_this[key])) {
            _this.repollIntervals[key] = setRepollIntervalData(_this.repollIntervals, key, intervalTimeInMs, _this[key]);

            if (coalescedOptions.autoStart) {
              _this.repollIntervals[key].start();
            }
          } else {
            throwTypeError(key + ' is not a function on the React Class being decorated.');
          }
        }
        return _this;
      }

      RepollComponent.prototype.componentWillUnmount = function componentWillUnmount() {
        if (coalescedOptions.stopOnUnmount && (0, _is.isFunction)(_ReactClass.prototype.componentWillUnmount)) {
          _ReactClass.prototype.componentWillUnmount.call(this);
        }

        for (var key in this.repollIntervals) {
          this.repollIntervals[key].stop();
        }

        this.repollIntervals = {};
      };

      RepollComponent.prototype.render = function render() {
        return _ReactClass.prototype.render.call(this);
      };

      return RepollComponent;
    }(ReactClass);

    return RepollComponent;
  };
};

exports.default = repoll;
module.exports = exports['default'];

/***/ }),

/***/ "./src/is.js":
/*!*******************!*\
  !*** ./src/is.js ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.isReactComponent = exports.isObject = exports.isNumber = exports.isNull = exports.isFunction = undefined;

var _react = __webpack_require__(/*! react */ "react");

/**
 * get the object class of the object passed
 *
 * @param {*} object
 * @returns {string}
 */
var toString = Object.prototype.toString;

/**
 * determine whether object passed is a function
 *
 * @param {*} object
 * @returns {boolean}
 */
// external dependencies

var isFunction = function isFunction(object) {
  return typeof object === 'function';
};

/**
 * determine whether object passed is a number
 *
 * @param {*} object
 * @returns {boolean}
 */
var isNumber = function isNumber(object) {
  return typeof object === 'number' && object === object;
};

/**
 * determine whether object passed is null
 *
 * @param {*} object
 * @returns {boolean}
 */
var isNull = function isNull(object) {
  return object === null;
};

/**
 * determine whether object passed is an object
 *
 * @param {*} object
 * @returns {boolean}
 */
var isObject = function isObject(object) {
  return !!object && toString.call(object) === '[object Object]';
};

/**
 * determine whether object passed is a ReactComponent
 *
 * @param {*} object
 * @returns {boolean}
 */
var isReactComponent = function isReactComponent(object) {
  return _react.Component.isPrototypeOf(object);
};

exports.isFunction = isFunction;
exports.isNull = isNull;
exports.isNumber = isNumber;
exports.isObject = isObject;
exports.isReactComponent = isReactComponent;

/***/ }),

/***/ 0:
/*!****************************!*\
  !*** multi ./src/index.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/tquetano/git/repoll/src/index.js */"./src/index.js");


/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_react__;

/***/ })

/******/ });
});
//# sourceMappingURL=repoll.js.map