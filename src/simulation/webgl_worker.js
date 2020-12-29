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
    if (event.data.message == Message.pauseResume) {
        // Pause/Resume button handler
        pause = !pause
    } else if (event.data.message == Message.click) {
        // Mouse click on canvas handler
        var clickedX = event.data.clientX
        var clickedY = event.data.clientY
        clickedX -= canvasOffsetLeft
        clickedY -= canvasOffsetTop

        for (var i = 0; i < agents.length; i++) {
            var dx = clickedX - agents[i].x
            var dy = clickedY - agents[i].y

            if((dx * dx + dy * dy) <= (Dim.agentRadius * Dim.agentRadius)) {
                // Deselect the old agent
                if (agentSelected !== undefined) {
                    agents[agentSelected].selected = false
                }

                // If the clicked agent is a different one select it otherwise complete deselection
                if (agentSelected != i) {
                    agentSelected = i
                    agents[i].selected = true
                } else {
                    agentSelected = undefined
                }

                // If more agents are there only the first encountered is taken
                return
            }
        }
        if (agentSelected !== undefined) {
            agents[agentSelected].move(clickedX, clickedY)
            agents[agentSelected].selected = false
            agentSelected = undefined
        }
    } else {
        // Worker initialization
        // List of places
        let radius = 80
        let places = new Array(
            new Place('Giuliani\'s', radius + Dim.offset, radius + Dim.offset, radius),
            new Place('Mazzieri\'s', event.data.width - (radius + Dim.offset), radius + Dim.offset, radius),
            new Place('Lombardi\'s', radius + Dim.offset, event.data.height - (radius + Dim.offset), radius),
            new Place('SomeoneElse\'s', event.data.width - (radius + Dim.offset), event.data.height - (radius + Dim.offset), radius),
            new Place('Pub', 600, 200, radius),
            new Place('Mall', 1000, 450, 1.4 * radius),
            new Place('Campus', 550, 500, 1.2 * radius)
        )

        var covidCentre = new CovidCentre(900, 150, 1.2 * radius)

        // List of agents
        agents = [...Array(Dim.numAgentsEachHouse).keys()].flatMap( idx => [
            new Agent("G" + idx, places[0], covidCentre),
            new Agent("M" + idx, places[1], covidCentre),
            new Agent("L" + idx, places[2], covidCentre),
            new Agent("S" + idx, places[3], covidCentre)
        ])
        agents[agents.length - 1].state = State.INFECTED
        agents[agents.length - 1].medicalStatus = new MedicalStatus(new Date(date))

        // Canvas info
        canvas = event.data.canvas
        canvas.getContext("2d").font = "10px Arial"
        canvasOffsetLeft = event.data.offsetLeft
        canvasOffsetTop = event.data.offsetTop

        // const gl = canvas.getContext("webgl")

        var tick = function() {
            // Update simulation
            agents.forEach(a => a.updatePosition(places, date))

            // Diagnosticians writing on Mam
            agents.map((a, i) => [i, a]).filter(a => a[1].medicalStatus.waitMedicalUpdate).forEach(a => {
                postMessage({message: Message.diagnosticianWriteOnMam,
                    agentIndex: a[0],
                    agent: a[1]})
                a[1].medicalStatus.waitMedicalUpdate = false
            })

            // Update infection simulation
            agents.forEach(a => a.checkInfection(agents, date))

            // Agents writing on Mam
            agents.forEach((a, i) => {
                if ((a.lastWriting == undefined || date - a.lastWriting >= Time.writingTime + a.randomDelay)) {
                    a.lastWriting = new Date(date)
                    
                    a.updateHistory()

                    if (a.needsToPublish) {
                        postMessage({message: Message.agentWriteOnMam,
                            agentIndex: i,
                            agent: a})
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
            covidCentre.draw(context)
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
        postMessage({message: Message.initMamChannels,
            agentsNumber: agents.length, diagnostNumber: 1})

        // Start the rendering loop
        draw()
        requestAnimationFrame(render)
    }
}
