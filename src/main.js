import { Agent, MedicalStatus, State } from './simulation/agent.js'
import { Place, CovidCentre } from './simulation/places.js'
import { Colors, Dim, Time } from './simulation/constants.js'
// import { GeoSolver } from './geosolver/geosolver.js'

// new GeoSolver(100, 20).updateInfected()

// Global Variables
let date = Time.initialDate
let intervalId = undefined

// List of places
let radius = 80
let places = new Array(
    new Place('Giuliani\'s', radius + Dim.offset, radius + Dim.offset, radius),
    new Place('Mazzieri\'s', Dim.width - (radius + Dim.offset), radius + Dim.offset, radius),
    new Place('Lombardi\'s', radius + Dim.offset, Dim.height - (radius + Dim.offset), radius),
    new Place('SomeoneElse\'s', Dim.width - (radius + Dim.offset), Dim.height - (radius + Dim.offset), radius),
    new Place('Pub', 600, 200, radius),
    new Place('Mall', 1000, 450, 1.4 * radius),
    new Place('Campus', 550, 500, 1.2 * radius)
)
let covidCentre = new CovidCentre(900, 150, 1.2 * radius)

const geotag = "GEOPOSIOTRACE"

// List of agents
let agents = [1, 2].flatMap( idx => [
    new Agent("G" + idx, places[0], covidCentre, geotag),
    new Agent("M" + idx, places[1], covidCentre, geotag),
    new Agent("L" + idx, places[2], covidCentre, geotag),
    new Agent("S" + idx, places[3], covidCentre, geotag)
])
agents[agents.length - 1].state = State.INFECTED
agents[agents.length - 1].medicalStatus = new MedicalStatus(new Date(date))

// Index of the selected agent
let agentSelected = undefined

window.onload = () => {
    var toggle = document.getElementById("toggle")
    var canvas = document.getElementById("scene")

    // Stretch the canvas to the window size
    canvas.width = Dim.width - 30
    canvas.height = Dim.height - 30
    canvas.getContext("2d").font = "10px Arial"

    // Canvas initialization
    draw()

    // Play/Pause Toggle
    toggle.addEventListener("click", _ => {
        if (toggle.innerText == "Play") {
            toggle.innerText = "Pause"
            intervalId = setInterval(update, Time.clock)
        } else {
            toggle.innerText = "Play"
            clearInterval(intervalId)
            intervalId = undefined
        }
    })

    // Click on agent
    canvas.addEventListener("click", event => {
        var clickedX = event.clientX
        var clickedY = event.clientY
        clickedX -= canvas.offsetLeft
        clickedY -= canvas.offsetTop

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
    }, false)

    function update() {
        tick()
        draw()
    }

    function tick() {
        agents.forEach(a => a.updatePosition(places, date))
        agents.forEach(a => a.checkInfection(agents, date))
        /* 
         * TODO: AVOID GUI BLOCKING
         * agents.forEach(a => a.writeMessage(date))
         */
        agents.forEach(a => a.writeMessage(date))
        date.setMilliseconds(date.getMilliseconds() + Time.clockScale)
    }

    function draw() {
        var context = canvas.getContext("2d")
        context.clearRect(0, 0, canvas.width, canvas.height)
        covidCentre.draw(context)
        places.forEach(p => p.draw(context))
        agents.forEach(a => a.draw(context))
        context.fillStyle = Colors.text
        context.fillText(date.toLocaleString(), canvas.width / 2, canvas.height - 10);
    }    
}
