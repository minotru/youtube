/******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);
(function webpackMissingModule() { throw new Error("Cannot find module \"devserver\""); }());


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_SearchBar__ = __webpack_require__(2);


const body = document.getElementsByTagName("body")[0];

function onClientLoad() {
    gapi.client.load('youtube', 'v3', onYouTubeApiLoad);
}

// Called automatically when YouTube API interface is loaded (see line 9).
function onYouTubeApiLoad() {
    // This API key is intended for use only in this lesson.
    // See http://goo.gl/PdPA1 to get a key for your own applications.
    gapi.client.setApiKey('AIzaSyDKMfCEnxwMoBccp6pcZj1WjoyHTxDw4YE');
}

function search(text) {
    var request = gapi.client.youtube.search.list({
        part: 'snippet',
        q: text
    });
    request.execute(onSearchResponse);
}

function onSearchResponse(response) {
    console.log(response);
}


window.onYouTubeApiLoad = onYouTubeApiLoad.bind(this);
const searchBar = Object(__WEBPACK_IMPORTED_MODULE_0__src_SearchBar__["a" /* default */])({onSearch: search.bind(this)});


body.appendChild(searchBar);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = SearchBar;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Util__ = __webpack_require__(3);


function SearchBar(props) {
    const button = Object(__WEBPACK_IMPORTED_MODULE_0__Util__["b" /* createElementFromHTML */])(
    `<button type="button" class="search-button">
        <i class="material-icons">search</i>
    </button>`);
    const input = Object(__WEBPACK_IMPORTED_MODULE_0__Util__["b" /* createElementFromHTML */])(
        `<input type="search" class = "search-bar" placeholder = "Your request...">`);
    const element = Object(__WEBPACK_IMPORTED_MODULE_0__Util__["a" /* createElement */])(
        "div",
        {
            "class": "search-bar-box"
        },
        button,
        input
    );
    button.onclick = function() {
        props.onSearch(input.value);
    };
    // `<div class="search-bar-box">
    //     <button type="button" class="search-button">
    //         <i class="material-icons">search</i>
    //     </button>
    //     <input type="search" class = "search-bar" placeholder = "Your request...">
    // </div>`;
    // const element = createElementFromHTML(html);
    // element.firstChild.addEventListener("click", props.onSearch);

    return element;
}

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = createElement;
/* harmony export (immutable) */ __webpack_exports__["b"] = createElementFromHTML;
function createElement(name, attrs, ...children) {
    let el = document.createElement(name);
    if (attrs !== null)
        for (let attr in attrs)
            if (attrs.hasOwnProperty(attr))
                el.setAttribute(attr, attrs[attr]);
    children.forEach(child => {
        if (typeof(child) == "string")
            el.appendChild(document.createTextNode(child))
        else
            el.appendChild(child);
    });
    return el;
}

function createElementFromHTML(html) {
    let el = document.createElement("template");
    el.innerHTML = html;
    return el.content.firstChild;
}


/***/ })
/******/ ]);