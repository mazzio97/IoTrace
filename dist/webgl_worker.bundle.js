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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Agent\": () => /* binding */ Agent,\n/* harmony export */   \"MedicalStatus\": () => /* binding */ MedicalStatus,\n/* harmony export */   \"State\": () => /* binding */ State\n/* harmony export */ });\n/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants.js */ \"./src/simulation/constants.js\");\n\n\nclass Agent {\n    constructor(name, home, covidCentre, initialState = State.NORMAL, medicalStatus = new MedicalStatus()) {\n        this.name = name\n        // Location info\n        this.home = home\n        this.x = home.getRandomX()\n        this.y = home.getRandomY()\n        this.targetX = undefined\n        this.targetY = undefined\n        this.covidCentre = covidCentre\n         // Positions not already saved in the Tangle\n        this.history = []\n        // Tangle related info\n        this.lastWriting = undefined\n        this.needsToPublish = false\n        // State\n        this.state = initialState\n        this.medicalStatus = medicalStatus\n        // GUI\n        this.selected = false\n    }\n\n    move(targetX, targetY) {\n        this.targetX = targetX\n        this.targetY = targetY\n    }\n\n    readNotification() {\n        // TODO: read notification blockchain\n        this.state = State.NOTIFIED\n        this.move(this.covidCentre.getRandomX(), this.covidCentre.getRandomY())\n    }\n\n    updatePosition(places, date) {\n        // If targetX is present, the agent moves towards the target\n        // Otherwise, if any (not quarantined) agent reaches the covid center, it gets a visit\n        if (this.targetX != undefined) {\n            var deltaX = (this.targetX - this.x)\n            var deltaY = (this.targetY - this.y)\n            var length = Math.sqrt(deltaX * deltaX + deltaY * deltaY)\n            // if target is reached both targets are set to undefined, otherwise the agent moves\n            if (Math.abs(deltaX) < _constants_js__WEBPACK_IMPORTED_MODULE_0__.Dim.epsilon && Math.abs(deltaY) < _constants_js__WEBPACK_IMPORTED_MODULE_0__.Dim.epsilon) {\n                this.targetX = undefined\n                this.targetY = undefined\n            } else {\n                this.x = this.x + deltaX * _constants_js__WEBPACK_IMPORTED_MODULE_0__.Time.agentVelocity / length      \n                this.y = this.y + deltaY * _constants_js__WEBPACK_IMPORTED_MODULE_0__.Time.agentVelocity / length\n            }\n        } else if (this.state != State.QUARANTINED && this.covidCentre.checkIn(this.x, this.y)) {\n            this.covidCentre.diagnostician.visit(this, date)\n        }\n        \n        // Finally, if the agent is still not quarantined, it can choose a new target with given probability\n        if (this.state != State.QUARANTINED && Math.random() < _constants_js__WEBPACK_IMPORTED_MODULE_0__.Probabilities.reachNewTarget) {\n            let place = places[Math.floor(places.length * Math.random())]\n            this.move(place.getRandomX(), place.getRandomY())\n        }\n\n        this.needsToPublish = this.history.length > 5\n    }\n\n    updateHistory() {\n        console.log(this.name + \": \" + this.x + \", \" + this.y + \" \" + this.lastWriting)\n        this.history.push({x: this.x, y: this.y, date: this.lastWriting})\n    }\n\n    clearHistory() {\n        this.history = []\n    }\n\n    checkInfection(agents, date) {\n        if (this.state == State.NORMAL) {\n            // stores the array of infected agents that are in the infection range\n            let nearbyInfected = agents.filter(a => {\n                var dx = a.x - this.x\n                var dy = a.y - this.y\n                var dm = _constants_js__WEBPACK_IMPORTED_MODULE_0__.Dim.infectionRadius + _constants_js__WEBPACK_IMPORTED_MODULE_0__.Dim.agentRadius // maximal distance\n                return a.state == State.INFECTED && dx * dx + dy * dy <= dm * dm\n            })\n            // for each one of them, there is a certain probability of getting infected\n            for (let i = 0; i < nearbyInfected.length; i++) {\n                if (Math.random() < _constants_js__WEBPACK_IMPORTED_MODULE_0__.Probabilities.passInfection) {\n                    this.state = State.INFECTED\n                    this.medicalStatus.infectionDate = new Date(date)\n                    return\n                }\n            }\n        }\n    }\n\n    draw(context) {\n        // Body\n        context.beginPath()\n        context.arc(this.x, this.y, _constants_js__WEBPACK_IMPORTED_MODULE_0__.Dim.agentRadius, 0, 2 * Math.PI, false)\n\n        // Colors depend on the state\n        context.fillStyle = this.state.color\n\n        if (this.selected == true) {\n            context.lineWidth = _constants_js__WEBPACK_IMPORTED_MODULE_0__.Dim.selectedStrokeWidth\n            context.strokeStyle = _constants_js__WEBPACK_IMPORTED_MODULE_0__.Colors.selectedStroke\n            context.stroke()\n        }\n\n        context.fill()\n\n        // Infection area\n        if (this.state == State.INFECTED) {\n            context.beginPath()\n            context.arc(this.x, this.y, _constants_js__WEBPACK_IMPORTED_MODULE_0__.Dim.infectionRadius, 0, 2 * Math.PI, false)\n            context.fillStyle = _constants_js__WEBPACK_IMPORTED_MODULE_0__.Colors.infectionArea\n            context.fill()\n        }\n\n        // Name\n        context.fillStyle = _constants_js__WEBPACK_IMPORTED_MODULE_0__.Colors.text\n        context.fillText(this.name, this.x, this.y - _constants_js__WEBPACK_IMPORTED_MODULE_0__.Dim.agentRadius)\n    }\n}\n\nclass MedicalStatus {\n    constructor(infectionDate = undefined, notificationDate = undefined, quarantinedDate = undefined) {\n        this.infectionDate = infectionDate\n        this.notificationDate = notificationDate\n        this.quarantinedDate = quarantinedDate\n        // If true the agent is ready to share his information on the blockchain\n        this.waitMedicalUpdate = false\n    }\n}\n\nconst State = {\n    NORMAL: { status: \"normal\", color: _constants_js__WEBPACK_IMPORTED_MODULE_0__.Colors.normal },\n    INFECTED: { status: \"infected\", color: _constants_js__WEBPACK_IMPORTED_MODULE_0__.Colors.infected },\n    NOTIFIED: { status: \"notified\", color: _constants_js__WEBPACK_IMPORTED_MODULE_0__.Colors.notified },\n    QUARANTINED: { status: \"quarantined\", color: _constants_js__WEBPACK_IMPORTED_MODULE_0__.Colors.quarantined }\n}\n\n\n\n\n//# sourceURL=webpack://tracy/./src/simulation/agent.js?");

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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Colors\": () => /* binding */ Colors,\n/* harmony export */   \"Dim\": () => /* binding */ Dim,\n/* harmony export */   \"Probabilities\": () => /* binding */ Probabilities,\n/* harmony export */   \"Time\": () => /* binding */ Time,\n/* harmony export */   \"Security\": () => /* binding */ Security,\n/* harmony export */   \"Message\": () => /* binding */ Message\n/* harmony export */ });\nconst placeAlphaChannel = 0.7\nconst agentAlphaChannel = 0.7\nconst infectionAreaAlphaChannel = 0.2\nconst timestep = 1000.0 / 30.0 // 30fps\n\nconst Colors = {\n\tnormal: \"rgba(0, 0, 0, \" + agentAlphaChannel + \")\",\n\tinfected: \"rgba(255, 0, 0, \" + agentAlphaChannel + \")\",\n\tnotified: \"rgba(255, 255, 0, \" + agentAlphaChannel + \")\",\n\tquarantined: \"rgba(100, 0, 135, \" + agentAlphaChannel + \")\",\n\n\tinfectionArea: \"rgba(255, 0, 0, \" + infectionAreaAlphaChannel + \")\",\n\tselectedStroke: \"rgba(255, 0, 255, \" + agentAlphaChannel + \")\",\n\ttext: \"rgba(0, 0, 0, \" + agentAlphaChannel + \")\",\n\n\tplaceLine: \"rgba(0, 0, 0, 1)\",\n\tplaceText: \"rgba(0, 0, 0, \" + placeAlphaChannel + \")\"\n}\n\nconst Dim = {\n\tepsilon: 1, // Minimum distance used to stop agents which have reached their destinations\n\tagentRadius: 5,\n\tinfectionRadius: 30,\n\tselectedStrokeWidth: 3,\n\toffset: 60\n}\n\nconst Probabilities = {\n\treachNewTarget: 1e-3,\n\tpassInfection: 1e-2\n}\n\nconst Time = {\n\tclock: timestep,\n\tclockScale: 10 * 60 * timestep, // every second in the simulation corresponds to ten minutes\n\twritingTime: 10 * 600 * 1000, // agents write every ten (simulated) minute\n\tinitialDate: new Date(2020, 2), // initial date of the simulation\n\tagentVelocity: 0.5\n}\n\nconst Security = {\n\tpasswordLength: 1024,\n\tpasswordCharset: \"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789\",\n\tgeosolverPrivatekey: '7KxRgYSISJ7sRUx3pc5hZZ7ptEQ+YPddp6rhC8Y1uUS6FrI7gmApDxI9mqDXFF5jdRJdObU6sXcXxXM5+G3VMQ==',\n\tgeosolverPublicKey: 'uhayO4JgKQ8SPZqg1xReY3USXTm1OrF3F8VzOfht1TE='\n}\n\nconst Message = {\n\tclick: 'click',\n\tpauseResume: 'pauseResume',\n\tstartWebGLWorker: 'startWebGLWorker',\n\tinitMamChannels: 'initMamChannels',\n\tagentWriteOnMam: 'agentWriteOnMam',\n\tdiagnosticianWriteOnMam: 'diagnosticianWriteOnMam'\n}\n\n\n\n\n//# sourceURL=webpack://tracy/./src/simulation/constants.js?");

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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Diagnostician\": () => /* binding */ Diagnostician\n/* harmony export */ });\n/* harmony import */ var _agent_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./agent.js */ \"./src/simulation/agent.js\");\n\n\nclass Diagnostician{\n\n    // if an agent is infected and not yet quarantined it gets quarantined and the agent is asked to publish on the infected blockchain\n    visit(agent, date) {\n        if (agent.state != _agent_js__WEBPACK_IMPORTED_MODULE_0__.State.QUARANTINED && agent.medicalStatus.infectionDate !== undefined) {\n            agent.state = _agent_js__WEBPACK_IMPORTED_MODULE_0__.State.QUARANTINED\n            agent.medicalStatus.waitMedicalUpdate = true\n            agent.medicalStatus.quarantinedDate = new Date(date)\n        }\n    }\n}\n\n\n\n//# sourceURL=webpack://tracy/./src/simulation/diagnostician.js?");

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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Place\": () => /* binding */ Place,\n/* harmony export */   \"CovidCentre\": () => /* binding */ CovidCentre\n/* harmony export */ });\n/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants.js */ \"./src/simulation/constants.js\");\n/* harmony import */ var _diagnostician_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./diagnostician.js */ \"./src/simulation/diagnostician.js\");\n\n\n\nclass Place {\n    constructor(name, x, y, r) {\n        this.name = name\n        this.xMin = x - r\n        this.xMax = x + r\n        this.yMin = y - r\n        this.yMax = y + r\n    }\n\n    getRandomX() {\n        return this.xMin + (this.xMax - this.xMin) * Math.random()\n    }\n\n    getRandomY() {\n        return this.yMin + (this.yMax - this.yMin) * Math.random()\n    }\n\n    checkIn(x, y) {\n        return x >= this.xMin && x <= this.xMax && y >= this.yMin && y <= this.yMax\n    }\n\n    draw(context) {\n        context.setLineDash([5, 5])\n        context.strokeStyle = _constants_js__WEBPACK_IMPORTED_MODULE_0__.Colors.placeLine\n        context.lineWidth = 1\n        context.strokeRect(this.xMin, this.yMin, this.xMax - this.xMin, this.yMax - this.yMin)\n        context.fillText(this.name, this.xMin + 5, this.yMin - 5)\n    }\n}\n\nclass CovidCentre extends Place {\n    constructor(x, y, r) {\n        super('Covid Centre', x, y, r)\n        this.diagnostician = new _diagnostician_js__WEBPACK_IMPORTED_MODULE_1__.Diagnostician()\n    }\n}\n\n\n\n\n//# sourceURL=webpack://tracy/./src/simulation/places.js?");

/***/ }),

/***/ "./src/simulation/webgl_worker.js":
/*!****************************************!*\
  !*** ./src/simulation/webgl_worker.js ***!
  \****************************************/
/*! namespace exports */
/*! exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _agent_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./agent.js */ \"./src/simulation/agent.js\");\n/* harmony import */ var _places_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./places.js */ \"./src/simulation/places.js\");\n/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constants.js */ \"./src/simulation/constants.js\");\n\n\n\n\n// Global Variables\nlet date = _constants_js__WEBPACK_IMPORTED_MODULE_2__.Time.initialDate\n\n// Puase/Resume flag\nvar pause = false\n// Index of the selected agent\nvar agentSelected = undefined\n\n// Canvas info\nvar canvas = undefined\nvar canvasOffsetLeft = undefined\nvar canvasOffsetTop = undefined\n\n// List of agents\nvar agents = undefined\n\nonmessage = function(event) {\n    if (event.data.message == _constants_js__WEBPACK_IMPORTED_MODULE_2__.Message.pauseResume) {\n        // Pause/Resume button handler\n        pause = !pause\n    } else if (event.data.message == _constants_js__WEBPACK_IMPORTED_MODULE_2__.Message.click) {\n        // Mouse click on canvas handler\n        var clickedX = event.data.clientX\n        var clickedY = event.data.clientY\n        clickedX -= canvasOffsetLeft\n        clickedY -= canvasOffsetTop\n\n        for (var i = 0; i < agents.length; i++) {\n            var dx = clickedX - agents[i].x\n            var dy = clickedY - agents[i].y\n\n            if((dx * dx + dy * dy) <= (_constants_js__WEBPACK_IMPORTED_MODULE_2__.Dim.agentRadius * _constants_js__WEBPACK_IMPORTED_MODULE_2__.Dim.agentRadius)) {\n                // Deselect the old agent\n                if (agentSelected !== undefined) {\n                    agents[agentSelected].selected = false\n                }\n\n                // If the clicked agent is a different one select it otherwise complete deselection\n                if (agentSelected != i) {\n                    agentSelected = i\n                    agents[i].selected = true\n                } else {\n                    agentSelected = undefined\n                }\n\n                // If more agents are there only the first encountered is taken\n                return\n            }\n        }\n        if (agentSelected !== undefined) {\n            agents[agentSelected].move(clickedX, clickedY)\n            agents[agentSelected].selected = false\n            agentSelected = undefined\n        }\n    } else {\n        // Worker initialization\n        // List of places\n        let radius = 80\n        let places = new Array(\n            new _places_js__WEBPACK_IMPORTED_MODULE_1__.Place('Giuliani\\'s', radius + _constants_js__WEBPACK_IMPORTED_MODULE_2__.Dim.offset, radius + _constants_js__WEBPACK_IMPORTED_MODULE_2__.Dim.offset, radius),\n            new _places_js__WEBPACK_IMPORTED_MODULE_1__.Place('Mazzieri\\'s', event.data.width - (radius + _constants_js__WEBPACK_IMPORTED_MODULE_2__.Dim.offset), radius + _constants_js__WEBPACK_IMPORTED_MODULE_2__.Dim.offset, radius),\n            new _places_js__WEBPACK_IMPORTED_MODULE_1__.Place('Lombardi\\'s', radius + _constants_js__WEBPACK_IMPORTED_MODULE_2__.Dim.offset, event.data.height - (radius + _constants_js__WEBPACK_IMPORTED_MODULE_2__.Dim.offset), radius),\n            new _places_js__WEBPACK_IMPORTED_MODULE_1__.Place('SomeoneElse\\'s', event.data.width - (radius + _constants_js__WEBPACK_IMPORTED_MODULE_2__.Dim.offset), event.data.height - (radius + _constants_js__WEBPACK_IMPORTED_MODULE_2__.Dim.offset), radius),\n            new _places_js__WEBPACK_IMPORTED_MODULE_1__.Place('Pub', 600, 200, radius),\n            new _places_js__WEBPACK_IMPORTED_MODULE_1__.Place('Mall', 1000, 450, 1.4 * radius),\n            new _places_js__WEBPACK_IMPORTED_MODULE_1__.Place('Campus', 550, 500, 1.2 * radius)\n        )\n\n        var covidCentre = new _places_js__WEBPACK_IMPORTED_MODULE_1__.CovidCentre(900, 150, 1.2 * radius)\n\n        // List of agents\n        agents = [1, 2, 3].flatMap( idx => [\n            new _agent_js__WEBPACK_IMPORTED_MODULE_0__.Agent(\"G\" + idx, places[0], covidCentre),\n            new _agent_js__WEBPACK_IMPORTED_MODULE_0__.Agent(\"M\" + idx, places[1], covidCentre),\n            new _agent_js__WEBPACK_IMPORTED_MODULE_0__.Agent(\"L\" + idx, places[2], covidCentre),\n            new _agent_js__WEBPACK_IMPORTED_MODULE_0__.Agent(\"S\" + idx, places[3], covidCentre)\n        ])\n        agents[agents.length - 1].state = _agent_js__WEBPACK_IMPORTED_MODULE_0__.State.INFECTED\n        agents[agents.length - 1].medicalStatus = new _agent_js__WEBPACK_IMPORTED_MODULE_0__.MedicalStatus(new Date(date))\n\n        // Canvas info\n        canvas = event.data.canvas\n        canvas.getContext(\"2d\").font = \"10px Arial\"\n        canvasOffsetLeft = event.data.offsetLeft\n        canvasOffsetTop = event.data.offsetTop\n\n        // const gl = canvas.getContext(\"webgl\")\n\n        var tick = function() {\n            // Update simulation\n            agents.forEach(a => a.updatePosition(places, date))\n\n            // Diagnosticians writing on Mam\n            agents.map((a, i) => [i, a]).filter(a => a[1].medicalStatus.waitMedicalUpdate).forEach(a => {\n                postMessage({message: _constants_js__WEBPACK_IMPORTED_MODULE_2__.Message.diagnosticianWriteOnMam,\n                    agentIndex: a[0],\n                    agent: a[1]})\n                a[1].medicalStatus.waitMedicalUpdate = false\n            })\n\n            // Update infection simulation\n            agents.forEach(a => a.checkInfection(agents, date))\n\n            // Agents writing on Mam\n            agents.forEach((a, i) => {\n                if ((a.lastWriting == undefined || date - a.lastWriting >= _constants_js__WEBPACK_IMPORTED_MODULE_2__.Time.writingTime)) {\n                    a.lastWriting = new Date(date)\n                    \n                    a.updateHistory()\n\n                    if (a.needsToPublish) {\n                        postMessage({message: _constants_js__WEBPACK_IMPORTED_MODULE_2__.Message.agentWriteOnMam,\n                            agentIndex: i,\n                            agent: a})\n\n                        a.clearHistory()\n                    }\n                }\n            })\n\n            // Update clock\n            date.setMilliseconds(date.getMilliseconds() + _constants_js__WEBPACK_IMPORTED_MODULE_2__.Time.clockScale)\n        }\n        \n        var draw = function() {\n            var context = canvas.getContext(\"2d\")\n            context.clearRect(0, 0, canvas.width, canvas.height)\n            covidCentre.draw(context)\n            places.forEach(p => p.draw(context))\n            agents.forEach(a => a.draw(context))\n            context.fillStyle = _constants_js__WEBPACK_IMPORTED_MODULE_2__.Colors.text\n            context.fillText(date.toLocaleString(), canvas.width / 2, canvas.height - 10);\n        }\n    \n        function render(time) {\n            if (!pause) {\n                tick()\n                draw()\n            }\n            requestAnimationFrame(render)\n        }\n        // Ack the creator that the initialization process has finished\n        postMessage({message: _constants_js__WEBPACK_IMPORTED_MODULE_2__.Message.initMamChannels,\n            agentsNumber: agents.length})\n\n        // Start the rendering loop\n        draw()\n        requestAnimationFrame(render)\n    }\n}\n\n\n//# sourceURL=webpack://tracy/./src/simulation/webgl_worker.js?");

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
/******/ 	__webpack_require__("./src/simulation/webgl_worker.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;