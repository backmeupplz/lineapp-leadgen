/******/ (function(modules) { // webpackBootstrap
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(0);

var maxValue = 500;
var minValue = 1;
var countCustomers = document.getElementById("count-customers");
var countCustomersOutput = document.getElementById("count-customers-value");
var rangeBubble = document.getElementById('range-bubble');
var rangeMin = document.getElementById('range-min');
var rangeMax = document.getElementById('range-max');
var headerInfo = document.getElementById('b-header__info');
var rangeWrapper = document.getElementById('range-wrapper');
var body = document.body;

var pipe = function pipe(value) {
  return Math.ceil(value * 1.5);
};

var setPosition = function setPosition(position) {
  var width = countCustomers.offsetWidth;
  var bubleWidth = rangeBubble.offsetWidth;
  var sizeRangeThumb = body.offsetWidth <= 450 ? 35 : 25;
  var elemWidth = rangeMin.offsetWidth;
  var offsetThumb = sizeRangeThumb / 2 + (countCustomers.parentElement.offsetWidth > width ? elemWidth : 0);

  rangeBubble.style.marginLeft = (width - sizeRangeThumb) * position - bubleWidth / 2 + offsetThumb + "px";

  rangeBubble.style.marginTop = -rangeWrapper.offsetHeight - rangeBubble.offsetHeight - (body.offsetWidth <= 450 ? 16 : 4) + "px";
};

var setValue = function setValue(value) {
  if (value > maxValue) value = maxValue;else if (value < 0) value = 0;
  var result = pipe(value);
  countCustomersOutput.innerHTML = "$" + result;
  rangeBubble.innerHTML = value;
  setPosition((value - minValue) / (maxValue - minValue));
};

var changeInput = function changeInput(event) {
  return setValue(event.target.value);
};

var start = function start(value) {
  countCustomers.value = value;
  setValue(value);
};

countCustomers.addEventListener('input', changeInput);

var loadImage = function loadImage(src) {
  var old = document.getElementById('b-header__image');
  if (!old) {
    var _img = document.createElement('img');
    _img.className = 'b-header__image';
    _img.id = 'b-header__image';
    var newImg = new Image();
    newImg.onload = function () {
      _img.src = this.src;
    };
    newImg.src = src;
    headerInfo.appendChild(_img);
  } else {
    var _newImg = new Image();
    _newImg.onload = function () {
      old.src = this.src;
    };
    _newImg.src = src;
  }
};

document.addEventListener('DOMContentLoaded', function () {
  countCustomers.min = minValue;
  countCustomers.max = maxValue;

  rangeMin.innerHTML = minValue;
  rangeMax.innerHTML = maxValue;

  rangeBubble.style.display = "none";
  setTimeout(function () {
    rangeBubble.style.display = "block";
    onResize(100)();
  }, 600);
});

var onResize = function onResize(_value) {
  var value = _value;
  return function () {
    var langElem = document.getElementById('lang');
    var lang = langElem ? langElem.value : '';
    lang = lang == 'en' ? '' : '-' + lang;

    if (body.offsetWidth <= 600) {
      loadImage("/assets/img/main-phone-img" + lang + ".png");
    } else {
      loadImage("/assets/img/main-img" + lang + ".png");
    }
    start(value || countCustomers.value);
  };
};

var validateEmail = function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

var isValid = function isValid(data) {
  return validateEmail(data.email);
};

var isEnter = false;
var emailInput = document.getElementById('email_input');
var button = document.getElementById('send_email');
var buttonDone = document.getElementById('send_email_done');

var emailHandler = function emailHandler(event) {
  var email = event.target.value;
  isEnter = true;

  if (isValid({ email: email })) {
    button.disabled = false;
    buttonDone.disabled = false;
  } else {
    button.disabled = true;
    buttonDone.disabled = true;
  }
};

emailInput.addEventListener('change', emailHandler);
emailInput.addEventListener('keydown', emailHandler);

var send = function send() {
  var value = document.getElementById('count-customers').value;
  var email = document.getElementById('email_input').value;
  var lang = document.getElementById('lang').value;

  var res = { value: value, email: email, lang: lang };
  if (!isValid(res)) return;

  var xhr = new XMLHttpRequest();

  xhr.open('POST', '/email');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function () {
    if (xhr.status === 200) {
      button.classList.add('hide');
      buttonDone.className = buttonDone.className.replace(/hide/, '');
      setTimeout(function () {
        button.style.display = 'none';
        buttonDone.style.display = 'initial';
      }, 500);
    } else if (xhr.status !== 200) {
      buttonDone.classList.add('hide');
      button.className = button.className.replace(/hide/, '');
      setTimeout(function () {
        buttonDone.style.display = 'none';
        button.style.display = 'initial';
      }, 500);
    }
  };
  xhr.send(JSON.stringify(res));
};

document.getElementById('send_email').onclick = send;
document.getElementById('send_email_done').onclick = send;

window.onresize = onResize();

/***/ }
/******/ ]);