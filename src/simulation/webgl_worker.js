import { Agent, MedicalStatus, State } from './agent.js'
import { Place, CovidCentre } from './places.js'
import { Time, Colors, Dim, Message } from './constants.js'

// Global Variables
let date = Time.initialDate

// Puase/Resume flag
var pause = true
// Index of the selected agent
var agentSelected = undefined

// Canvas info
var canvas = undefined
var canvasOffsetLeft = undefined
var canvasOffsetTop = undefined

// List of agents
var agents = undefined

onmessage = function(event) {
    var data = event.data
    if (data.message == Message.pause) { 
        pause = true 
    } else if (data.message == Message.resume) { 
        pause = false 
    } else if (data.message == Message.click) {
        GUIclicked(data.clientX, data.clientY)
    } else if (data.message == Message.startWebGLWorker) {
        GUIinit(data.canvas, data.width, data.height, data.offsetLeft, data.offsetTop)
    } else {
        throw new Error('Illegal message for the Web Worker')
    }
}

function GUIclicked(clickedX, clickedY) {
    clickedX -= canvasOffsetLeft
    clickedY -= canvasOffsetTop

    for (var i = 0; i < agents.length; i++) {
        var dx = clickedX - agents[i].x
        var dy = clickedY - agents[i].y

        // if an agent is clicked
        if((dx * dx + dy * dy) <= (Dim.agentRadius * Dim.agentRadius)) {
            // if it was the previous agent, it gets deselected
            // otherwise, the previous agent is deselected (if any) and the new one gets its place
            if (agentSelected == i) {
                agentSelected = undefined
                agents[agentSelected].selected = false
            } else {
                if (agentSelected !== undefined) {
                    agents[agentSelected].selected = false
                }
                agentSelected = i
                agents[i].selected = true
            }
            // the function stops here to avoid multiple selection
            return
        }
    }

    // if no agent has been clicked, it means that the user wants to move a previously selected agent (which gets unselected)
    if (agentSelected !== undefined) {
        agents[agentSelected].move(clickedX, clickedY)
        agents[agentSelected].selected = false
        agentSelected = undefined
    }
}

function GUIinit(canvas, width, height, offsetLeft, offsetTop) {
    // List of places
    let radius = 80
    let places = new Array(
        new Place('Giuliani\'s', radius + Dim.offset, radius + Dim.offset, radius),
        new Place('Mazzieri\'s', width - (radius + Dim.offset), radius + Dim.offset, radius),
        new Place('Lombardi\'s', radius + Dim.offset, height - (radius + Dim.offset), radius),
        new Place('SomeoneElse\'s', width - (radius + Dim.offset), height - (radius + Dim.offset), radius),
        new Place('Pub', 600, 200, radius),
        new Place('Mall', 1000, 450, 1.4 * radius),
        new Place('Campus', 550, 500, 1.2 * radius)
    )

    var covidCentres = new Array(
        new CovidCentre(900, 150, 1.2 * radius)
    )

    // List of agents
    agents = [...Array(Dim.numAgentsEachHouse).keys()].flatMap( idx => [
        new Agent("G" + idx, places[0], covidCentres),
        new Agent("M" + idx, places[1], covidCentres),
        new Agent("L" + idx, places[2], covidCentres),
        new Agent("S" + idx, places[3], covidCentres)
    ])
    agents[agents.length - 1].state = State.INFECTED
    agents[agents.length - 1].medicalStatus = new MedicalStatus(new Date(date))

    // Canvas info
    canvas.width = width - 30
    canvas.height = height - 30
    canvas.getContext("2d").font = "10px Arial"
    canvasOffsetLeft = offsetLeft
    canvasOffsetTop = offsetTop

    // const gl = canvas.getContext("webgl")

    var tick = function() {
        // Update simulation
        agents.forEach(a => a.updatePosition(places, date))

        // Diagnosticians writing on Mam
        agents.map((a, i) => [i, a]).filter(tuple => true /*tuple[1].medicalStatus.waitMedicalUpdate*/).forEach(tuple => {
            var index = tuple[0]
            var agent = tuple[1]
            postMessage({
                message: Message.diagnosticianWriteOnMam,
                agentIndex: index,
                agent: agent
            })
            agent.medicalStatus.waitMedicalUpdate = false
        })

        // Update infection simulation
        agents.forEach(a => a.checkInfection(agents, date))

        // Agents writing on Mam
        agents.forEach((a, i) => {
            if ((a.lastWriting == undefined || date - a.lastWriting >= Time.writingTime + a.randomDelay)) {
                a.lastWriting = new Date(date)
                a.updateHistory()
                if (a.needsToPublish) {
                    postMessage({
                        message: Message.agentWriteOnMam,
                        agentIndex: i,
                        agent: a
                    })
                    a.clearHistory()
                }
            }
        })

        // Update clock
        date.setMilliseconds(date.getMilliseconds() + Time.clockScale)
    }
    
    var draw = function() {
        var context = canvas.getContext("2d")
        context.clearRect(0, 0, canvas.width, canvas.height)
        covidCentres.forEach(c => c.draw(context))
        places.forEach(p => p.draw(context))
        agents.forEach(a => a.draw(context))
        context.fillStyle = Colors.text
        context.fillText(date.toLocaleString(), canvas.width / 2, canvas.height - 10);
    }

    function render(time) {
        if (!pause) {
            tick()
            draw()
        }
        requestAnimationFrame(render)
    }
    // Ack the creator that the initialization process has finished
    postMessage({
        message: Message.initMamChannels,
        agentsNumber: agents.length,
        diagnostNumber: covidCentres.length
    })

    // Start the rendering loop
    draw()
    requestAnimationFrame(render)
}