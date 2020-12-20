/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@iota/converter/out/converter/src/ascii.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@iota/converter/out/converter/src/ascii.js ***!
  \*****************************************************************/
/*! flagged exports */
/*! export __esModule [provided] [no usage info] [missing usage info prevents renaming] */
/*! export asciiToTrytes [provided] [no usage info] [missing usage info prevents renaming] */
/*! export trytesToAscii [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__ */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nexports.__esModule = true;\nvar _1 = __webpack_require__(/*! ./ */ \"./node_modules/@iota/converter/out/converter/src/index.js\");\nvar errors = __webpack_require__(/*! ./errors */ \"./node_modules/@iota/converter/out/converter/src/errors.js\");\n/**\n * This method converts ASCII characters to [trytes](https://docs.iota.org/docs/getting-started/0.1/introduction/ternary).\n *\n * ## Related methods\n *\n * To convert trytes to ASCII characters, use the [`trytesToAscii()`]{@link #module_converter.trytesToAscii} method.\n *\n * @method asciiToTrytes\n *\n * @summary Converts ASCII characters to trytes.\n *\n * @memberof module:converter\n *\n * @param {string} input - ASCII input\n *\n * @example\n * ```js\n * let trytes = Converter.asciiToTrytes('Hello, where is my coffee?');\n * ```\n *\n * @return {string} Trytes\n *\n * @throws {errors.INVALID_ASCII_CHARS}: Make sure that the `input` argument contains only valid ASCII characters.\n */\nexports.asciiToTrytes = function (input) {\n    // If input is not an ascii string, throw error\n    if (!/^[\\x00-\\x7F]*$/.test(input)) {\n        throw new Error(errors.INVALID_ASCII_CHARS);\n    }\n    var trytes = '';\n    for (var i = 0; i < input.length; i++) {\n        var dec = input[i].charCodeAt(0);\n        trytes += _1.TRYTE_ALPHABET[dec % 27];\n        trytes += _1.TRYTE_ALPHABET[(dec - (dec % 27)) / 27];\n    }\n    return trytes;\n};\n/**\n * This method converts trytes to ASCII characters.\n *\n * Because each ASCII character is represented as 2 trytes, the given trytes must be of an even length.\n *\n * ## Related methods\n *\n * To convert ASCII characters to trytes, use the [`asciiToTrytes()`]{@link #module_converter.asciiToTrytes} method.\n *\n * @method trytesToAscii\n *\n * @summary Converts trytes to ASCII characters.\n *\n * @memberof module:converter\n *\n * @param {string} trytes - An even number of trytes\n *\n * @example\n * ```js\n * let message = Converter.trytesToAscii('IOTA');\n * ```\n *\n * @return {string} ASCII characters\n *\n * @throws {errors.INVALID_TRYTES}: Make sure that the `trytes` argument contains only valid trytes (A-Z or 9).\n * @throws {errors.INVALID_ODD_LENGTH}: Make sure that the `trytes` argument contains an even number of trytes.\n */\nexports.trytesToAscii = function (trytes) {\n    if (typeof trytes !== 'string' || !new RegExp(\"^[9A-Z]{1,}$\").test(trytes)) {\n        throw new Error(errors.INVALID_TRYTES);\n    }\n    if (trytes.length % 2) {\n        throw new Error(errors.INVALID_ODD_LENGTH);\n    }\n    var ascii = '';\n    for (var i = 0; i < trytes.length; i += 2) {\n        var charCode = _1.TRYTE_ALPHABET.indexOf(trytes[i]) + _1.TRYTE_ALPHABET.indexOf(trytes[i + 1]) * 27;\n        if (charCode) {\n            ascii += String.fromCharCode(charCode);\n        }\n    }\n    return ascii;\n};\n//# sourceMappingURL=ascii.js.map\n\n//# sourceURL=webpack://tracy/./node_modules/@iota/converter/out/converter/src/ascii.js?");

/***/ }),

/***/ "./node_modules/@iota/converter/out/converter/src/errors.js":
/*!******************************************************************!*\
  !*** ./node_modules/@iota/converter/out/converter/src/errors.js ***!
  \******************************************************************/
/*! flagged exports */
/*! export INVALID_ASCII_CHARS [provided] [no usage info] [missing usage info prevents renaming] */
/*! export INVALID_ODD_LENGTH [provided] [no usage info] [missing usage info prevents renaming] */
/*! export INVALID_TRITS [provided] [no usage info] [missing usage info prevents renaming] */
/*! export INVALID_TRYTES [provided] [no usage info] [missing usage info prevents renaming] */
/*! export __esModule [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__ */
/***/ ((__unused_webpack_module, exports) => {

eval("\nexports.__esModule = true;\nexports.INVALID_TRYTES = 'Invalid trytes';\nexports.INVALID_TRITS = 'Invalid trits';\nexports.INVALID_ODD_LENGTH = 'Invalid trytes length. Expected trytes of even length.';\nexports.INVALID_ASCII_CHARS = 'Invalid ascii charactes.';\n//# sourceMappingURL=errors.js.map\n\n//# sourceURL=webpack://tracy/./node_modules/@iota/converter/out/converter/src/errors.js?");

/***/ }),

/***/ "./node_modules/@iota/converter/out/converter/src/index.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@iota/converter/out/converter/src/index.js ***!
  \*****************************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: __webpack_exports__, __webpack_require__ */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nfunction __export(m) {\n    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];\n}\nexports.__esModule = true;\n/** @module converter */\n__export(__webpack_require__(/*! ./ascii */ \"./node_modules/@iota/converter/out/converter/src/ascii.js\"));\n__export(__webpack_require__(/*! ./trits */ \"./node_modules/@iota/converter/out/converter/src/trits.js\"));\nexports.bytesToTrits = function (bytes) { return Int8Array.from(bytes); };\nexports.tritsToBytes = function (trits) { return Buffer.from(trits.buffer); };\n//# sourceMappingURL=index.js.map\n\n//# sourceURL=webpack://tracy/./node_modules/@iota/converter/out/converter/src/index.js?");

/***/ }),

/***/ "./node_modules/@iota/converter/out/converter/src/trits.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@iota/converter/out/converter/src/trits.js ***!
  \*****************************************************************/
/*! flagged exports */
/*! export TRYTES_TRITS_LUT [provided] [no usage info] [missing usage info prevents renaming] */
/*! export TRYTE_ALPHABET [provided] [no usage info] [missing usage info prevents renaming] */
/*! export TRYTE_WIDTH [provided] [no usage info] [missing usage info prevents renaming] */
/*! export __esModule [provided] [no usage info] [missing usage info prevents renaming] */
/*! export fromValue [provided] [no usage info] [missing usage info prevents renaming] */
/*! export trits [provided] [no usage info] [missing usage info prevents renaming] */
/*! export tritsToTrytes [provided] [no usage info] [missing usage info prevents renaming] */
/*! export tritsToValue [provided] [no usage info] [missing usage info prevents renaming] */
/*! export trytes [provided] [no usage info] [missing usage info prevents renaming] */
/*! export trytesToTrits [provided] [no usage info] [missing usage info prevents renaming] */
/*! export value [provided] [no usage info] [missing usage info prevents renaming] */
/*! export valueToTrits [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__ */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nexports.__esModule = true;\n__webpack_require__(/*! ../../typed-array */ \"./node_modules/@iota/converter/out/typed-array.js\");\nvar errors = __webpack_require__(/*! ./errors */ \"./node_modules/@iota/converter/out/converter/src/errors.js\");\nvar RADIX = 3;\nvar MAX_TRIT_VALUE = (RADIX - 1) / 2;\nvar MIN_TRIT_VALUE = -MAX_TRIT_VALUE;\nexports.TRYTE_WIDTH = MAX_TRIT_VALUE - MIN_TRIT_VALUE + 1;\n// All possible tryte values\nexports.TRYTE_ALPHABET = '9ABCDEFGHIJKLMNOPQRSTUVWXYZ';\n// Trytes to trits look up table\nexports.TRYTES_TRITS_LUT = [\n    [0, 0, 0],\n    [1, 0, 0],\n    [-1, 1, 0],\n    [0, 1, 0],\n    [1, 1, 0],\n    [-1, -1, 1],\n    [0, -1, 1],\n    [1, -1, 1],\n    [-1, 0, 1],\n    [0, 0, 1],\n    [1, 0, 1],\n    [-1, 1, 1],\n    [0, 1, 1],\n    [1, 1, 1],\n    [-1, -1, -1],\n    [0, -1, -1],\n    [1, -1, -1],\n    [-1, 0, -1],\n    [0, 0, -1],\n    [1, 0, -1],\n    [-1, 1, -1],\n    [0, 1, -1],\n    [1, 1, -1],\n    [-1, -1, 0],\n    [0, -1, 0],\n    [1, -1, 0],\n    [-1, 0, 0],\n];\n/**\n * Converts trytes or values to trits\n *\n * @method trits\n *\n * @ignore\n *\n * @memberof module:converter\n *\n * @param {String|Number} input - Tryte string or value to be converted.\n *\n * @return {Int8Array} trits\n */\nfunction trits(input) {\n    if (typeof input === 'number' && Number.isInteger(input)) {\n        return fromValue(input);\n    }\n    else if (typeof input === 'string') {\n        var result = new Int8Array(input.length * exports.TRYTE_WIDTH);\n        for (var i = 0; i < input.length; i++) {\n            var index = exports.TRYTE_ALPHABET.indexOf(input.charAt(i));\n            if (index === -1) {\n                throw new Error(errors.INVALID_TRYTES);\n            }\n            for (var j = 0; j < exports.TRYTE_WIDTH; j++) {\n                result[i * exports.TRYTE_WIDTH + j] = exports.TRYTES_TRITS_LUT[index][j];\n            }\n        }\n        return result;\n    }\n    else {\n        throw new Error(errors.INVALID_TRYTES);\n    }\n}\nexports.trits = trits;\n/**\n * This method converts [trytes](https://docs.iota.org/docs/getting-started/0.1/introduction/ternary) to trits.\n *\n * ## Related methods\n *\n * To convert ASCII characters to trytes, use the [`asciiToTrytes()`]{@link #module_converter.asciiToTrytes} method.\n *\n * @method trytesToTrits\n *\n * @summary Converts trytes to trits.\n *\n * @memberof module:converter\n *\n * @param {String|number} input - Trytes\n *\n * @example\n * ```js\n * let trits = Converter.trytesToTrits('IOTA');\n * ```\n *\n * @return {Int8Array} trits\n *\n * @throws {errors.INVALID_TRYTES}: Make sure that the `input` argument contains only valid trytes (A-Z or 9).\n */\nexports.trytesToTrits = trits;\n/**\n * Converts trits to trytes\n *\n * @method trytes\n *\n * @memberof module:converter\n *\n * @ignore\n *\n * @param {Int8Array} trits\n *\n * @return {String} trytes\n */\n// tslint:disable-next-line no-shadowed-variable\nfunction trytes(trits) {\n    if (!(trits instanceof Int8Array) && !Array.isArray(trits)) {\n        throw new Error(errors.INVALID_TRITS);\n    }\n    var result = '';\n    for (var i = 0; i < trits.length / exports.TRYTE_WIDTH; i++) {\n        var j = 0;\n        for (var k = 0; k < exports.TRYTE_WIDTH; k++) {\n            j += trits[i * exports.TRYTE_WIDTH + k] * Math.pow(exports.TRYTE_WIDTH, k);\n        }\n        if (j < 0) {\n            j += exports.TRYTE_ALPHABET.length;\n        }\n        result += exports.TRYTE_ALPHABET.charAt(j);\n    }\n    return result;\n}\nexports.trytes = trytes;\n/**\n * This method converts [trits](https://docs.iota.org/docs/getting-started/0.1/introduction/ternary) to trytes.\n *\n * ## Related methods\n *\n * To convert trytes to ASCII characters, use the [`trytesToAscii()`]{@link #module_converter.trytesToAscii} method.\n *\n * @method tritsToTrytes\n *\n * @summary Converts trits to trytes.\n *\n * @memberof module:converter\n *\n * @param {String|number} input - Trits\n *\n * @example\n * ```js\n * let trytes = Converter.tritsToTrytes(trits);\n * ```\n *\n * @return {Int8Array} trytes\n *\n * @throws {errors.INVALID_TRITS}: Make sure that the `input` argument contains an array of trits.\n */\nexports.tritsToTrytes = trytes;\n/**\n * Converts trits into an integer value\n *\n * @method value\n *\n * @ignore\n *\n * @memberof module:converter\n *\n * @param {Int8Array} trits\n *\n * @return {Number}\n */\n// tslint:disable-next-line no-shadowed-variable\nfunction value(trits) {\n    var returnValue = 0;\n    for (var i = trits.length; i-- > 0;) {\n        returnValue = returnValue * RADIX + trits[i];\n    }\n    return returnValue;\n}\nexports.value = value;\n/**\n * This method converts [trits](https://docs.iota.org/docs/getting-started/0.1/introduction/ternary) to a number.\n *\n * ## Related methods\n *\n * To convert trytes to trits, use the [`trytesToTrits()`]{@link #module_converter.trytesToTrits} method.\n * To convert trits to trytes, use the [`tritsToTrytes()`]{@link #module_converter.tritsToTrytes} method.\n *\n * @method tritsToValue\n *\n * @summary Converts trits to a number.\n *\n * @memberof module:converter\n *\n * @param {String|number} input - Trits\n *\n * @example\n * ```js\n * let number = Converter.tritsToValue(trits);\n * ```\n *\n * @return {Int8Array} number\n */\nexports.tritsToValue = value;\n/**\n * Converts an integer value to trits\n *\n * @method fromValue\n *\n * @ignore\n *\n * @memberof module:converter\n *\n * @param {Number} value\n *\n * @return {Int8Array} trits\n */\n// tslint:disable-next-line no-shadowed-variable\nfunction fromValue(value) {\n    var destination = new Int8Array(value ? 1 + Math.floor(Math.log(2 * Math.max(1, Math.abs(value))) / Math.log(RADIX)) : 0);\n    var absoluteValue = value < 0 ? -value : value;\n    var i = 0;\n    while (absoluteValue > 0) {\n        var remainder = absoluteValue % RADIX;\n        absoluteValue = Math.floor(absoluteValue / RADIX);\n        if (remainder > MAX_TRIT_VALUE) {\n            remainder = MIN_TRIT_VALUE;\n            absoluteValue++;\n        }\n        destination[i] = remainder;\n        i++;\n    }\n    if (value < 0) {\n        for (var j = 0; j < destination.length; j++) {\n            destination[j] = -destination[j];\n        }\n    }\n    return destination;\n}\nexports.fromValue = fromValue;\n/**\n * This method converts a number to [trits](https://docs.iota.org/docs/getting-started/0.1/introduction/ternary).\n *\n * ## Related methods\n *\n * To convert trits to trytes, use the [`tritsToTrytes()`]{@link #module_converter.tritsToTrytes} method.\n *\n * @method valueToTrits\n *\n * @summary Converts trits to a number.\n *\n * @memberof module:converter\n *\n * @param {String|number} input - Number\n *\n * @example\n * ```js\n * let trits = Converter.valueToTrits(9);\n * ```\n *\n * @return {Int8Array} trits\n */\nexports.valueToTrits = fromValue;\n//# sourceMappingURL=trits.js.map\n\n//# sourceURL=webpack://tracy/./node_modules/@iota/converter/out/converter/src/trits.js?");

/***/ }),

/***/ "./node_modules/@iota/converter/out/typed-array.js":
/*!*********************************************************!*\
  !*** ./node_modules/@iota/converter/out/typed-array.js ***!
  \*********************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */
/***/ (() => {

eval("\nif (!Int8Array.prototype.slice) {\n    Object.defineProperty(Int8Array.prototype, 'slice', {\n        value: Array.prototype.slice\n    });\n}\nif (!Int8Array.prototype.subarray) {\n    Object.defineProperty(Uint8Array.prototype, 'subarray', {\n        value: Array.prototype.slice\n    });\n}\nif (!Int8Array.prototype.map) {\n    Object.defineProperty(Int8Array.prototype, 'map', {\n        value: Array.prototype.map\n    });\n}\nif (!Int8Array.prototype.every) {\n    Object.defineProperty(Int8Array.prototype, 'every', {\n        value: Array.prototype.every\n    });\n}\nif (!Int8Array.prototype.some) {\n    Object.defineProperty(Uint8Array.prototype, 'some', {\n        value: Array.prototype.some\n    });\n}\nif (!Int8Array.prototype.indexOf) {\n    Object.defineProperty(Int8Array.prototype, 'indexOf', {\n        value: Array.prototype.indexOf\n    });\n}\n// Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/fill#Polyfill\n// Any copyright is dedicated to the Public Domain. http://creativecommons.org/publicdomain/zero/1.0/\nif (!Int8Array.prototype.fill) {\n    Object.defineProperty(Int8Array.prototype, 'fill', {\n        value: function (input) {\n            // Steps 1-2.\n            if (this == null) {\n                throw new TypeError('this is null or not defined');\n            }\n            var O = Object(this);\n            // Steps 3-5.\n            var len = O.length >>> 0;\n            // Steps 6-7.\n            var start = arguments[1];\n            var relativeStart = start >> 0;\n            // Step 8.\n            var k = relativeStart < 0 ? Math.max(len + relativeStart, 0) : Math.min(relativeStart, len);\n            // Steps 9-10.\n            var end = arguments[2];\n            var relativeEnd = end === undefined ? len : end >> 0;\n            // Step 11.\n            var last = relativeEnd < 0 ? Math.max(len + relativeEnd, 0) : Math.min(relativeEnd, len);\n            // Step 12.\n            while (k < last) {\n                O[k] = input;\n                k++;\n            }\n            // Step 13.\n            return O;\n        }\n    });\n}\nif (!Uint32Array.prototype.slice) {\n    Object.defineProperty(Uint8Array.prototype, 'slice', {\n        value: Array.prototype.slice\n    });\n}\nif (!Uint32Array.prototype.reverse) {\n    Object.defineProperty(Uint8Array.prototype, 'reverse', {\n        value: Array.prototype.reverse\n    });\n}\n//# sourceMappingURL=typed-array.js.map\n\n//# sourceURL=webpack://tracy/./node_modules/@iota/converter/out/typed-array.js?");

/***/ }),

/***/ "./src/iota/generate.js":
/*!******************************!*\
  !*** ./src/iota/generate.js ***!
  \******************************/
/*! namespace exports */
/*! export generateSeed [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"generateSeed\": () => /* binding */ generateSeed\n/* harmony export */ });\nconst generateSeed = () => {\n    // The length of the seed and int array.\n    var length = 81\n    // The allowed characters in the seed.\n    var chars = \"ABCDEFGHIJKLMNOPQRSTUVWXYZ9\"\n    // An empty array to store the random values.\n    var randomValues = new Uint32Array(length)\n    // An empty array to store the seed characters.\n    var result = new Array(length)\n\n    // Generate random values and store them to array.\n    crypto.getRandomValues(randomValues)\n\n    // A cursor is introduced to remove modulus bias.\n    var cursor = 0\n    // Loop through each of the 81 random values.\n    for (var i = 0; i < randomValues.length; i++) {\n        // Add them to the cursor.\n        cursor += randomValues[i]\n        // Assign a new character to the seed based on cursor mod 81.\n        result[i] = chars[cursor % chars.length]\n    }\n\n    // Merge the array into a single string and return it.\n    return result.join('')\n}\n\n\n\n//# sourceURL=webpack://tracy/./src/iota/generate.js?");

/***/ }),

/***/ "./src/iota/mam_gate.js":
/*!******************************!*\
  !*** ./src/iota/mam_gate.js ***!
  \******************************/
/*! namespace exports */
/*! export MamGate [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"MamGate\": () => /* binding */ MamGate\n/* harmony export */ });\n/* harmony import */ var _iota_converter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @iota/converter */ \"./node_modules/@iota/converter/out/converter/src/index.js\");\n/* harmony import */ var _iota_converter__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_iota_converter__WEBPACK_IMPORTED_MODULE_0__);\n\n\nclass MamGate {\n\n\tconstructor(mode, provider, seed, tag) {\n\t\tthis.mamState = Mam.init(provider, seed)\n\t\tthis.mode = mode\n\t\tthis.root = undefined\n\t\tthis.tag = tag\n\t}\n\n\tasync publish(packet, verbose=true) {\n\t\t// Create MAM message as a string of trytes\n\t\tconst trytes = (0,_iota_converter__WEBPACK_IMPORTED_MODULE_0__.asciiToTrytes)(JSON.stringify(packet))\n\t\tconst message = await Mam.create(this.mamState, trytes)\n\t\t\n\t\t// Save your new mamState\n\t\tthis.mamState = message.state\n\t\t\n\t\t// Attach the message to the Tangle\n\t\tawait Mam.attach(message.payload, message.address, 3, 9, this.tag)\n\t\t\n\t\t// Store root of first message\n\t\tif (this.root == undefined) {\n\t\t\tthis.root = message.root\n\t\t}\n\t\t\n\t\t// Prints mam root and published packet\n\t\tif (verbose) {\n\t\t\tconsole.log('Published @ ' + this.root + ':', packet)\n\t\t}\n\t\t\n\t\treturn this.root\n\t}\n\n\tasync read() {\n\t\t// Output synchronously once fetch is completed\n\t\tconst result = await Mam.fetch(this.root, this.mode)\n\t\tresult.messages.forEach(message => console.log('Fetched and parsed', JSON.parse((0,_iota_converter__WEBPACK_IMPORTED_MODULE_0__.trytesToAscii)(message)), '\\n'))\n\t}\n}\n\n\n\n\n//# sourceURL=webpack://tracy/./src/iota/mam_gate.js?");

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! namespace exports */
/*! exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _iota_generate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./iota/generate.js */ \"./src/iota/generate.js\");\n/* harmony import */ var _iota_mam_gate_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./iota/mam_gate.js */ \"./src/iota/mam_gate.js\");\n/* harmony import */ var _src_simulation_constants_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../src/simulation/constants.js */ \"./src/simulation/constants.js\");\n\n\n\n\nlet agentsMamChannels = []\nconst geotag = \"GEOPOSIOTRACE\"\n\nlet diagnosticianMamChannel = new _iota_mam_gate_js__WEBPACK_IMPORTED_MODULE_1__.MamGate('public', \n    'https://nodes.devnet.iota.org', \n    (0,_iota_generate_js__WEBPACK_IMPORTED_MODULE_0__.generateSeed)())\n\nwindow.onload = () => {\n    var canvas = document.getElementById('scene')\n    var toggle = document.getElementById('toggle')\n\n    // Stretch the canvas to the window size\n    canvas.width = window.innerWidth, - 30\n    canvas.height = window.innerHeight - 30\n\n    var worker = new Worker('./webgl_worker.bundle.js')\n    var offscreen = canvas.transferControlToOffscreen()\n\n    // Start WebGL worker\n    worker.postMessage({message: _src_simulation_constants_js__WEBPACK_IMPORTED_MODULE_2__.Message.startWebGLWorker,\n        canvas: offscreen,\n        width: window.innerWidth,\n        height: window.innerHeight,\n        offsetLeft: canvas.offsetLeft,\n        offsetTop: canvas.offsetTop}, [offscreen])    \n\n    // Play/Pause event listener\n    toggle.addEventListener('click', _ => {\n        if (toggle.innerText == 'Play') {\n            toggle.innerText = 'Pause'\n            worker.postMessage({message: _src_simulation_constants_js__WEBPACK_IMPORTED_MODULE_2__.Message.pauseResume})\n        } else {\n            toggle.innerText = 'Play'\n            worker.postMessage({message: _src_simulation_constants_js__WEBPACK_IMPORTED_MODULE_2__.Message.pauseResume})\n        }\n    })\n\n    // Add event listener to select agents\n    canvas.addEventListener(\"click\", event => { \n        worker.postMessage({message: _src_simulation_constants_js__WEBPACK_IMPORTED_MODULE_2__.Message.click, \n            clientX: event.clientX, \n            clientY: event.clientY})\n    }, false)\n    \n    // Main thread message handlers\n    worker.onmessage = function(event) {\n        console.log(event.data)\n\n        if (event.data.message == _src_simulation_constants_js__WEBPACK_IMPORTED_MODULE_2__.Message.initMamChannels) {\n            // Agents' mam channels initialization\n            for (const i of Array(event.data.agentsNumber).keys()) {\n                agentsMamChannels[i] = new _iota_mam_gate_js__WEBPACK_IMPORTED_MODULE_1__.MamGate('public', \n                    'https://nodes.devnet.iota.org', \n                    (0,_iota_generate_js__WEBPACK_IMPORTED_MODULE_0__.generateSeed)(), \n                    geotag)\n            }\n        } else if (event.data.message == _src_simulation_constants_js__WEBPACK_IMPORTED_MODULE_2__.Message.agentWriteOnMam) {\n            // Agent writing on Mam\n            agentsMamChannels[event.data.agentIndex].publish({\n                message: event.data.agent.name,\n                x: JSON.stringify(event.data.agent.x),\n                y: JSON.stringify(event.data.agent.y),\n                date: event.data.agent.lastWriting,\n                publicKey: event.data.agent.secutityToolbox.keys.publicKey\n            })\n        } else if (event.data.message == _src_simulation_constants_js__WEBPACK_IMPORTED_MODULE_2__.Message.diagnosticianWriteOnMam) {\n            // Diagnostician writing on Mam\n            diagnosticianMamChannel.publish({message: event.data.agent.name + \" infected\",\n                date: event.data.agent.medicalStatus.quarantinedDate\n            })\n        }\n    }\n}\n\n\n//# sourceURL=webpack://tracy/./src/main.js?");

/***/ }),

/***/ "./src/simulation/constants.js":
/*!*************************************!*\
  !*** ./src/simulation/constants.js ***!
  \*************************************/
/*! namespace exports */
/*! export Colors [provided] [no usage info] [missing usage info prevents renaming] */
/*! export Dim [provided] [no usage info] [missing usage info prevents renaming] */
/*! export Message [provided] [no usage info] [missing usage info prevents renaming] */
/*! export Probabilities [provided] [no usage info] [missing usage info prevents renaming] */
/*! export Security [provided] [no usage info] [missing usage info prevents renaming] */
/*! export Time [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Colors\": () => /* binding */ Colors,\n/* harmony export */   \"Dim\": () => /* binding */ Dim,\n/* harmony export */   \"Probabilities\": () => /* binding */ Probabilities,\n/* harmony export */   \"Time\": () => /* binding */ Time,\n/* harmony export */   \"Security\": () => /* binding */ Security,\n/* harmony export */   \"Message\": () => /* binding */ Message\n/* harmony export */ });\nconst placeAlphaChannel = 0.7\nconst agentAlphaChannel = 0.7\nconst infectionAreaAlphaChannel = 0.2\nconst timestep = 1000.0 / 30.0 // 30fps\n\nconst Colors = {\n\tnormal: \"rgba(0, 0, 0, \" + agentAlphaChannel + \")\",\n\tinfected: \"rgba(255, 0, 0, \" + agentAlphaChannel + \")\",\n\tnotified: \"rgba(255, 255, 0, \" + agentAlphaChannel + \")\",\n\tquarantined: \"rgba(100, 0, 135, \" + agentAlphaChannel + \")\",\n\n\tinfectionArea: \"rgba(255, 0, 0, \" + infectionAreaAlphaChannel + \")\",\n\tselectedStroke: \"rgba(255, 0, 255, \" + agentAlphaChannel + \")\",\n\ttext: \"rgba(0, 0, 0, \" + agentAlphaChannel + \")\",\n\n\tplaceLine: \"rgba(0, 0, 0, 1)\",\n\tplaceText: \"rgba(0, 0, 0, \" + placeAlphaChannel + \")\"\n}\n\nconst Dim = {\n\tepsilon: 1, // Minimum distance used to stop agents which have reached their destinations\n\tagentRadius: 5,\n\tinfectionRadius: 30,\n\tselectedStrokeWidth: 3,\n\toffset: 60\n}\n\nconst Probabilities = {\n\treachNewTarget: 1e-3,\n\tpassInfection: 1e-2\n}\n\nconst Time = {\n\tclock: timestep,\n\tclockScale: 10 * 60 * timestep, // every second in the simulation corresponds to ten minutes\n\twritingTime: 10 * 300 * 1000, // agents write every ten (simulated) minute\n\tinitialDate: new Date(2020, 2), // initial date of the simulation\n\tagentVelocity: 0.5\n}\n\nconst Security = {\n\tpasswordLength: 1024,\n\tpasswordCharset: \"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789\"\n}\n\nconst Message = {\n\tclick: 'click',\n\tpauseResume: 'pauseResume',\n\tstartWebGLWorker: 'startWebGLWorker',\n\tinitMamChannels: 'initMamChannels',\n\tagentWriteOnMam: 'agentWriteOnMam',\n\tdiagnosticianWriteOnMam: 'diagnosticianWriteOnMam'\n}\n\n\n\n\n//# sourceURL=webpack://tracy/./src/simulation/constants.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => module['default'] :
/******/ 				() => module;
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./src/main.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;