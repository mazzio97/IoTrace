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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"generateSeed\": () => /* binding */ generateSeed\n/* harmony export */ });\nconst generateSeed = () => {\r\n    // The length of the seed and int array.\r\n    var length = 81\r\n    // The allowed characters in the seed.\r\n    var chars = \"ABCDEFGHIJKLMNOPQRSTUVWXYZ9\"\r\n    // An empty array to store the random values.\r\n    var randomValues = new Uint32Array(length)\r\n    // An empty array to store the seed characters.\r\n    var result = new Array(length)\r\n\r\n    // Generate random values and store them to array.\r\n    window.crypto.getRandomValues(randomValues)\r\n\r\n    // A cursor is introduced to remove modulus bias.\r\n    var cursor = 0\r\n    // Loop through each of the 81 random values.\r\n    for (var i = 0; i < randomValues.length; i++) {\r\n        // Add them to the cursor.\r\n        cursor += randomValues[i]\r\n        // Assign a new character to the seed based on cursor mod 81.\r\n        result[i] = chars[cursor % chars.length]\r\n    }\r\n\r\n    // Merge the array into a single string and return it.\r\n    return result.join('')\r\n}\r\n\r\n\n\n//# sourceURL=webpack://tracy/./src/iota/generate.js?");

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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"MamGate\": () => /* binding */ MamGate\n/* harmony export */ });\n/* harmony import */ var _iota_converter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @iota/converter */ \"./node_modules/@iota/converter/out/converter/src/index.js\");\n/* harmony import */ var _iota_converter__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_iota_converter__WEBPACK_IMPORTED_MODULE_0__);\n\r\n\r\nclass MamGate {\r\n\r\n\tconstructor(mode, provider, seed) {\r\n\t\tthis.mamState = Mam.init(provider, seed)\r\n\t\tthis.mode = mode\r\n\t\tthis.root = undefined\r\n\t}\r\n\r\n\tasync publish(packet, verbose=true) {\r\n\t\t// Create MAM message as a string of trytes\r\n\t\tconst trytes = (0,_iota_converter__WEBPACK_IMPORTED_MODULE_0__.asciiToTrytes)(JSON.stringify(packet))\r\n\t\tconst message = await Mam.create(this.mamState, trytes)\r\n\t\t\r\n\t\t// Save your new mamState\r\n\t\tthis.mamState = message.state\r\n\t\t\r\n\t\t// Attach the message to the Tangle\r\n\t\tawait Mam.attach(message.payload, message.address, 3, 9)\r\n\t\t\r\n\t\t// Store root of first message\r\n\t\tif (this.root == undefined) {\r\n\t\t\tthis.root = message.root\r\n\t\t}\r\n\t\t\r\n\t\t// Prints mam root and published packet\r\n\t\tif (verbose) {\r\n\t\t\tconsole.log('Published @ ' + this.root + ':', packet)\r\n\t\t}\r\n\t\t\r\n\t\treturn this.root\r\n\t}\r\n\r\n\tasync read() {\r\n\t\t// Output synchronously once fetch is completed\r\n\t\tconst result = await Mam.fetch(this.root, this.mode)\r\n\t\tresult.messages.forEach(message => console.log('Fetched and parsed', JSON.parse((0,_iota_converter__WEBPACK_IMPORTED_MODULE_0__.trytesToAscii)(message)), '\\n'))\r\n\t}\r\n}\r\n\r\n\r\n\n\n//# sourceURL=webpack://tracy/./src/iota/mam_gate.js?");

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! namespace exports */
/*! exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _simulation_agent_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./simulation/agent.js */ \"./src/simulation/agent.js\");\n/* harmony import */ var _simulation_places_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./simulation/places.js */ \"./src/simulation/places.js\");\n/* harmony import */ var _simulation_constants_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./simulation/constants.js */ \"./src/simulation/constants.js\");\n\r\n\r\n\r\n\r\n// Global Variables\r\nlet date = _simulation_constants_js__WEBPACK_IMPORTED_MODULE_2__.Time.initialDate\r\nlet intervalId = undefined\r\n\r\n// List of places\r\nlet radius = 80\r\nlet places = new Array(\r\n    new _simulation_places_js__WEBPACK_IMPORTED_MODULE_1__.Place('Giuliani\\'s', radius + _simulation_constants_js__WEBPACK_IMPORTED_MODULE_2__.Dim.offset, radius + _simulation_constants_js__WEBPACK_IMPORTED_MODULE_2__.Dim.offset, radius),\r\n    new _simulation_places_js__WEBPACK_IMPORTED_MODULE_1__.Place('Mazzieri\\'s', _simulation_constants_js__WEBPACK_IMPORTED_MODULE_2__.Dim.width - (radius + _simulation_constants_js__WEBPACK_IMPORTED_MODULE_2__.Dim.offset), radius + _simulation_constants_js__WEBPACK_IMPORTED_MODULE_2__.Dim.offset, radius),\r\n    new _simulation_places_js__WEBPACK_IMPORTED_MODULE_1__.Place('Lombardi\\'s', radius + _simulation_constants_js__WEBPACK_IMPORTED_MODULE_2__.Dim.offset, _simulation_constants_js__WEBPACK_IMPORTED_MODULE_2__.Dim.height - (radius + _simulation_constants_js__WEBPACK_IMPORTED_MODULE_2__.Dim.offset), radius),\r\n    new _simulation_places_js__WEBPACK_IMPORTED_MODULE_1__.Place('SomeoneElse\\'s', _simulation_constants_js__WEBPACK_IMPORTED_MODULE_2__.Dim.width - (radius + _simulation_constants_js__WEBPACK_IMPORTED_MODULE_2__.Dim.offset), _simulation_constants_js__WEBPACK_IMPORTED_MODULE_2__.Dim.height - (radius + _simulation_constants_js__WEBPACK_IMPORTED_MODULE_2__.Dim.offset), radius),\r\n    new _simulation_places_js__WEBPACK_IMPORTED_MODULE_1__.Place('Pub', 600, 200, radius),\r\n    new _simulation_places_js__WEBPACK_IMPORTED_MODULE_1__.Place('Mall', 1000, 450, 1.4 * radius),\r\n    new _simulation_places_js__WEBPACK_IMPORTED_MODULE_1__.Place('Campus', 550, 500, 1.2 * radius)\r\n)\r\nlet covidCentre = new _simulation_places_js__WEBPACK_IMPORTED_MODULE_1__.CovidCentre(900, 150, 1.2 * radius)\r\n\r\n// List of agents\r\nlet agents = [1, 2, 3, 4, 5].flatMap( idx => [\r\n    new _simulation_agent_js__WEBPACK_IMPORTED_MODULE_0__.Agent(\"G\" + idx, places[0], covidCentre),\r\n    new _simulation_agent_js__WEBPACK_IMPORTED_MODULE_0__.Agent(\"M\" + idx, places[1], covidCentre),\r\n    new _simulation_agent_js__WEBPACK_IMPORTED_MODULE_0__.Agent(\"L\" + idx, places[2], covidCentre),\r\n    new _simulation_agent_js__WEBPACK_IMPORTED_MODULE_0__.Agent(\"S\" + idx, places[3], covidCentre)\r\n])\r\nagents[agents.length - 1].state = _simulation_agent_js__WEBPACK_IMPORTED_MODULE_0__.State.INFECTED\r\nagents[agents.length - 1].medicalStatus = new _simulation_agent_js__WEBPACK_IMPORTED_MODULE_0__.MedicalStatus(new Date(date))\r\n\r\n// Index of the selected agent\r\nlet agent_selected = undefined\r\n\r\nwindow.onload = () => {\r\n    var toggle = document.getElementById(\"toggle\")\r\n    var canvas = document.getElementById(\"scene\")\r\n    // Stretch the canvas to the window size\r\n    canvas.width = _simulation_constants_js__WEBPACK_IMPORTED_MODULE_2__.Dim.width - 30\r\n    canvas.height = _simulation_constants_js__WEBPACK_IMPORTED_MODULE_2__.Dim.height - 30\r\n    canvas.getContext(\"2d\").font = \"10px Arial\"\r\n\r\n    // Canvas initialization\r\n    draw()\r\n\r\n    // Play/Pause Toggle\r\n    toggle.addEventListener(\"click\", _ => {\r\n        if (toggle.innerText == \"Play\") {\r\n            toggle.innerText = \"Pause\"\r\n            intervalId = setInterval(update, _simulation_constants_js__WEBPACK_IMPORTED_MODULE_2__.Time.clock)\r\n        } else {\r\n            toggle.innerText = \"Play\"\r\n            clearInterval(intervalId)\r\n            intervalId = undefined\r\n        }\r\n    })\r\n\r\n    // Click on agent\r\n    canvas.addEventListener(\"click\", event => {\r\n        var clicked_x = event.clientX\r\n        var clicked_y = event.clientY\r\n        clicked_x -= canvas.offsetLeft\r\n        clicked_y -= canvas.offsetTop\r\n\r\n        for (var i = 0; i < agents.length; i++) {\r\n            var dx = clicked_x - agents[i].x\r\n            var dy = clicked_y - agents[i].y\r\n            if((dx * dx + dy * dy) <= (_simulation_constants_js__WEBPACK_IMPORTED_MODULE_2__.Dim.agent_radius * _simulation_constants_js__WEBPACK_IMPORTED_MODULE_2__.Dim.agent_radius)) {\r\n                // Deselect the old agent\r\n                if (agent_selected !== undefined) {\r\n                    agents[agent_selected].selected = false\r\n                }\r\n\r\n                // If the clicked agent is a different one select it otherwise complete deselection\r\n                if (agent_selected != i) {\r\n                    agent_selected = i\r\n                    agents[i].selected = true\r\n                } else {\r\n                    agent_selected = undefined\r\n                }\r\n\r\n                // If more agents are there only the first encountered is taken\r\n                return\r\n            }\r\n        }\r\n        if (agent_selected !== undefined) {\r\n            agents[agent_selected].move(clicked_x, clicked_y)\r\n            agents[agent_selected].selected = false\r\n            agent_selected = undefined\r\n        }\r\n    }, false)\r\n\r\n    function update() {\r\n        tick()\r\n        draw()\r\n    }\r\n\r\n    function tick() {\r\n        agents.forEach(a => a.updatePosition(places, date))\r\n        agents.forEach(a => a.checkInfection(agents, date))\r\n        /* \r\n         * TODO: AVOID GUI BLOCKING\r\n         * agents.forEach(a => a.writeMessage(date))\r\n         */\r\n        date.setMilliseconds(date.getMilliseconds() + _simulation_constants_js__WEBPACK_IMPORTED_MODULE_2__.Time.clockScale)\r\n    }\r\n\r\n    function draw() {\r\n        var context = canvas.getContext(\"2d\")\r\n        context.clearRect(0, 0, canvas.width, canvas.height)\r\n        covidCentre.draw(context)\r\n        places.forEach(p => p.draw(context))\r\n        agents.forEach(a => a.draw(context))\r\n        context.fillStyle = _simulation_constants_js__WEBPACK_IMPORTED_MODULE_2__.Colors.text\r\n        context.fillText(date.toLocaleString(), canvas.width / 2, canvas.height - 10);\r\n    }    \r\n}\r\n\n\n//# sourceURL=webpack://tracy/./src/main.js?");

/***/ }),

/***/ "./src/simulation/agent.js":
/*!*********************************!*\
  !*** ./src/simulation/agent.js ***!
  \*********************************/
/*! namespace exports */
/*! export Agent [provided] [no usage info] [missing usage info prevents renaming] */
/*! export MedicalStatus [provided] [no usage info] [missing usage info prevents renaming] */
/*! export State [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Agent\": () => /* binding */ Agent,\n/* harmony export */   \"MedicalStatus\": () => /* binding */ MedicalStatus,\n/* harmony export */   \"State\": () => /* binding */ State\n/* harmony export */ });\n/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants.js */ \"./src/simulation/constants.js\");\n/* harmony import */ var _iota_generate_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../iota/generate.js */ \"./src/iota/generate.js\");\n/* harmony import */ var _iota_mam_gate_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../iota/mam_gate.js */ \"./src/iota/mam_gate.js\");\n\r\n\r\n\r\n\r\nclass Agent {\r\n    constructor(name, home, covidCentre, initialState = State.NORMAL, medicalStatus = new MedicalStatus()) {\r\n        this.name = name\r\n        this.home = home\r\n        this.x = home.getRandomX()\r\n        this.y = home.getRandomY()\r\n        this.covidCentre = covidCentre\r\n        this.target_x = undefined\r\n        this.target_y = undefined\r\n        this.state = initialState\r\n        this.medicalStatus = medicalStatus\r\n        this.selected = false\r\n        this.last_writing = undefined\r\n        this.seed = (0,_iota_generate_js__WEBPACK_IMPORTED_MODULE_1__.generateSeed)()\r\n        this.channel = new _iota_mam_gate_js__WEBPACK_IMPORTED_MODULE_2__.MamGate('public', 'https://nodes.devnet.iota.org', this.seed)\r\n    }\r\n\r\n    move(target_x, target_y) {\r\n        this.target_x = target_x\r\n        this.target_y = target_y\r\n    }\r\n\r\n    readNotification() {\r\n        // TODO: read notification blockchain\r\n        this.state = State.NOTIFIED\r\n        this.move(this.covidCentre.getRandomX(), this.covidCentre.getRandomY())\r\n    }\r\n\r\n    writeMessage(date) {\r\n        if (this.last_writing == undefined || date - this.last_writing >= _constants_js__WEBPACK_IMPORTED_MODULE_0__.Time.writingTime) {\r\n            this.last_writing = new Date(date)\r\n            this.channel.publish({\r\n                message: \"Message from \" + this.name,\r\n                position: this.x + \", \" + this.y,\r\n                date: this.last_writing\r\n            })\r\n        }\r\n    }\r\n\r\n    updatePosition(places, date) {\r\n        // If target_x is present, the agent moves towards the target\r\n        // Otherwise, if any (not quarantined) agent reaches the covid center, it gets a visit\r\n        if (this.target_x != undefined) {\r\n            var delta_x = (this.target_x - this.x)\r\n            var delta_y = (this.target_y - this.y)\r\n            var length = Math.sqrt(delta_x * delta_x + delta_y * delta_y)\r\n            // if target is reached both targets are set to undefined, otherwise the agent moves\r\n            if (Math.abs(delta_x) < _constants_js__WEBPACK_IMPORTED_MODULE_0__.Dim.epsilon && Math.abs(delta_y) < _constants_js__WEBPACK_IMPORTED_MODULE_0__.Dim.epsilon) {\r\n                this.target_x = undefined\r\n                this.target_y = undefined\r\n            } else {\r\n                this.x = this.x + delta_x * _constants_js__WEBPACK_IMPORTED_MODULE_0__.Time.agentVelocity / length      \r\n                this.y = this.y + delta_y * _constants_js__WEBPACK_IMPORTED_MODULE_0__.Time.agentVelocity / length\r\n            }\r\n        } else if (this.state != State.QUARANTINED && this.covidCentre.checkIn(this.x, this.y)) {\r\n            this.covidCentre.diagnostician.visit(this, date)\r\n        }\r\n        \r\n        // Finally, if the agent is still not quarantined, it can choose a new target with given probability\r\n        if (this.state != State.QUARANTINED && Math.random() < _constants_js__WEBPACK_IMPORTED_MODULE_0__.Probabilities.reachNewTarget) {\r\n            let place = places[Math.floor(places.length * Math.random())]\r\n            this.move(place.getRandomX(), place.getRandomY())\r\n        }\r\n    }\r\n\r\n    checkInfection(agents, date) {\r\n        if (this.state == State.NORMAL) {\r\n            // stores the array of infected agents that are in the infection range\r\n            let nearbyInfected = agents.filter(a => {\r\n                var dx = a.x - this.x\r\n                var dy = a.y - this.y\r\n                var dm = _constants_js__WEBPACK_IMPORTED_MODULE_0__.Dim.infection_radius + _constants_js__WEBPACK_IMPORTED_MODULE_0__.Dim.agent_radius // maximal distance\r\n                return a.state == State.INFECTED && dx * dx + dy * dy <= dm * dm\r\n            })\r\n            // for each one of them, there is a certain probability of getting infected\r\n            for (let i = 0; i < nearbyInfected.length; i++) {\r\n                if (Math.random() < _constants_js__WEBPACK_IMPORTED_MODULE_0__.Probabilities.passInfection) {\r\n                    this.state = State.INFECTED\r\n                    this.medicalStatus.infection_date = new Date(date)\r\n                    return\r\n                }\r\n            }\r\n        }\r\n    }\r\n\r\n    draw(context) {\r\n        // Body\r\n        context.beginPath()\r\n        context.arc(this.x, this.y, _constants_js__WEBPACK_IMPORTED_MODULE_0__.Dim.agent_radius, 0, 2 * Math.PI, false)\r\n\r\n        // Colors depend on the state\r\n        context.fillStyle = this.state.color\r\n\r\n        if (this.selected == true) {\r\n            context.lineWidth = _constants_js__WEBPACK_IMPORTED_MODULE_0__.Dim.selected_stroke_width\r\n            context.strokeStyle = _constants_js__WEBPACK_IMPORTED_MODULE_0__.Colors.selected_stroke\r\n            context.stroke()\r\n        }\r\n\r\n        context.fill()\r\n\r\n        // Infection area\r\n        if (this.state == State.INFECTED) {\r\n            context.beginPath()\r\n            context.arc(this.x, this.y, _constants_js__WEBPACK_IMPORTED_MODULE_0__.Dim.infection_radius, 0, 2 * Math.PI, false)\r\n            context.fillStyle = _constants_js__WEBPACK_IMPORTED_MODULE_0__.Colors.infection_area\r\n            context.fill()\r\n        }\r\n\r\n        // Name\r\n        context.fillStyle = _constants_js__WEBPACK_IMPORTED_MODULE_0__.Colors.text\r\n        context.fillText(this.name, this.x, this.y - _constants_js__WEBPACK_IMPORTED_MODULE_0__.Dim.agent_radius)\r\n    }\r\n}\r\n\r\nclass MedicalStatus {\r\n    constructor(infection_date = undefined, notification_date = undefined, quarantined_date = undefined) {\r\n        this.infection_date = infection_date\r\n        this.notification_date = notification_date\r\n        this.quarantined_date = quarantined_date\r\n    }\r\n}\r\n\r\nconst State = {\r\n    NORMAL: { status: \"normal\", color: _constants_js__WEBPACK_IMPORTED_MODULE_0__.Colors.normal },\r\n    INFECTED: { status: \"infected\", color: _constants_js__WEBPACK_IMPORTED_MODULE_0__.Colors.infected },\r\n    NOTIFIED: { status: \"notified\", color: _constants_js__WEBPACK_IMPORTED_MODULE_0__.Colors.notified },\r\n    QUARANTINED: { status: \"quarantined\", color: _constants_js__WEBPACK_IMPORTED_MODULE_0__.Colors.quarantined }\r\n}\r\n\r\n\r\n\n\n//# sourceURL=webpack://tracy/./src/simulation/agent.js?");

/***/ }),

/***/ "./src/simulation/constants.js":
/*!*************************************!*\
  !*** ./src/simulation/constants.js ***!
  \*************************************/
/*! namespace exports */
/*! export Colors [provided] [no usage info] [missing usage info prevents renaming] */
/*! export Dim [provided] [no usage info] [missing usage info prevents renaming] */
/*! export Probabilities [provided] [no usage info] [missing usage info prevents renaming] */
/*! export Time [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Colors\": () => /* binding */ Colors,\n/* harmony export */   \"Dim\": () => /* binding */ Dim,\n/* harmony export */   \"Probabilities\": () => /* binding */ Probabilities,\n/* harmony export */   \"Time\": () => /* binding */ Time\n/* harmony export */ });\nconst place_alpha_channel = 0.7\r\nconst agent_alpha_channel = 0.7\r\nconst infection_area_alpha_channel = 0.2\r\nconst timestep = 1000.0 / 30.0 // 30fps\r\n\r\nconst Colors = {\r\n\tnormal: \"rgba(0, 0, 0, \" + agent_alpha_channel + \")\",\r\n\tinfected: \"rgba(255, 0, 0, \" + agent_alpha_channel + \")\",\r\n\tnotified: \"rgba(255, 255, 0, \" + agent_alpha_channel + \")\",\r\n\tquarantined: \"rgba(100, 0, 135, \" + agent_alpha_channel + \")\",\r\n\r\n\tinfection_area: \"rgba(255, 0, 0, \" + infection_area_alpha_channel + \")\",\r\n\tselected_stroke: \"rgba(255, 0, 255, \" + agent_alpha_channel + \")\",\r\n\ttext: \"rgba(0, 0, 0, \" + agent_alpha_channel + \")\",\r\n\r\n\tplace_line: \"rgba(0, 0, 0, 1)\",\r\n\tplace_text: \"rgba(0, 0, 0, \" + place_alpha_channel + \")\"\r\n}\r\n\r\nconst Dim = {\r\n\tepsilon: 1, // Minimum distance used to stop agents which have reached their destinations\r\n\tagent_radius: 5,\r\n\tinfection_radius: 30,\r\n\tselected_stroke_width: 3,\r\n\toffset: 60,\r\n\twidth: window.innerWidth,\r\n\theight: window.innerHeight\r\n}\r\n\r\nconst Probabilities = {\r\n\treachNewTarget: 1e-3,\r\n\tpassInfection: 1e-2\r\n}\r\n\r\nconst Time = {\r\n\tclock: timestep,\r\n\tclockScale: 10 * 60 * timestep, // every second in the simulation corresponds to ten minutes\r\n\twritingTime: 10 * 60 * 1000, // agents write every ten (simulated) minute\r\n\tinitialDate: new Date(2020, 2), // initial date of the simulation\r\n\tagentVelocity: 1.0\r\n}\r\n\r\n\r\n\n\n//# sourceURL=webpack://tracy/./src/simulation/constants.js?");

/***/ }),

/***/ "./src/simulation/diagnostician.js":
/*!*****************************************!*\
  !*** ./src/simulation/diagnostician.js ***!
  \*****************************************/
/*! namespace exports */
/*! export Diagnostician [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Diagnostician\": () => /* binding */ Diagnostician\n/* harmony export */ });\n/* harmony import */ var _iota_generate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../iota/generate.js */ \"./src/iota/generate.js\");\n/* harmony import */ var _iota_mam_gate_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../iota/mam_gate.js */ \"./src/iota/mam_gate.js\");\n/* harmony import */ var _agent_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./agent.js */ \"./src/simulation/agent.js\");\n\r\n\r\n\r\n\r\nclass Diagnostician{\r\n    constructor() {\r\n        this.seed = (0,_iota_generate_js__WEBPACK_IMPORTED_MODULE_0__.generateSeed)()\r\n        this.channel = new _iota_mam_gate_js__WEBPACK_IMPORTED_MODULE_1__.MamGate('public', 'https://nodes.devnet.iota.org', this.seed)\r\n    }\r\n\r\n    // if an agent is infected and not yet quarantined it gets quarantined and a message is published on the infected blockchain\r\n    visit(agent, date) {\r\n        if (agent.state != _agent_js__WEBPACK_IMPORTED_MODULE_2__.State.QUARANTINED && agent.medicalStatus.infection_date !== undefined) {\r\n            agent.state = _agent_js__WEBPACK_IMPORTED_MODULE_2__.State.QUARANTINED\r\n            agent.medicalStatus.quarantined_date = new Date(date)\r\n            this.channel.publish({\r\n                message: agent.name + \" infected\",\r\n                date: agent.medicalStatus.quarantined_date\r\n            })\r\n        }\r\n    }\r\n}\r\n\r\n\n\n//# sourceURL=webpack://tracy/./src/simulation/diagnostician.js?");

/***/ }),

/***/ "./src/simulation/places.js":
/*!**********************************!*\
  !*** ./src/simulation/places.js ***!
  \**********************************/
/*! namespace exports */
/*! export CovidCentre [provided] [no usage info] [missing usage info prevents renaming] */
/*! export Place [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Place\": () => /* binding */ Place,\n/* harmony export */   \"CovidCentre\": () => /* binding */ CovidCentre\n/* harmony export */ });\n/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants.js */ \"./src/simulation/constants.js\");\n/* harmony import */ var _diagnostician_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./diagnostician.js */ \"./src/simulation/diagnostician.js\");\n\r\n\r\n\r\nclass Place {\r\n    constructor(name, x, y, r) {\r\n        this.name = name\r\n        this.xMin = x - r\r\n        this.xMax = x + r\r\n        this.yMin = y - r\r\n        this.yMax = y + r\r\n    }\r\n\r\n    getRandomX() {\r\n        return this.xMin + (this.xMax - this.xMin) * Math.random()\r\n    }\r\n\r\n    getRandomY() {\r\n        return this.yMin + (this.yMax - this.yMin) * Math.random()\r\n    }\r\n\r\n    checkIn(x, y) {\r\n        return x >= this.xMin && x <= this.xMax && y >= this.yMin && y <= this.yMax\r\n    }\r\n\r\n    draw(context) {\r\n        context.setLineDash([5, 5])\r\n        context.strokeStyle = _constants_js__WEBPACK_IMPORTED_MODULE_0__.Colors.place_line\r\n        context.lineWidth = 1\r\n        context.strokeRect(this.xMin, this.yMin, this.xMax - this.xMin, this.yMax - this.yMin)\r\n        context.fillText(this.name, this.xMin + 5, this.yMin - 5)\r\n    }\r\n}\r\n\r\nclass CovidCentre extends Place {\r\n    constructor(x, y, r) {\r\n        super('Covid Centre', x, y, r)\r\n        this.diagnostician = new _diagnostician_js__WEBPACK_IMPORTED_MODULE_1__.Diagnostician()\r\n    }\r\n}\r\n\r\n\r\n\n\n//# sourceURL=webpack://tracy/./src/simulation/places.js?");

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