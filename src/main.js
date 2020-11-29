import { Agent, MedicalStatus, State } from './simulation/agent.js'
import { Place } from './simulation/places.js'
import { Colors, Dim, Time } from './simulation/constants.js'

// Global Variables
let date = Time.initialDate
let intervalId = undefined

// List of places
let radius = 80
let places = new Array(
    new Place('Giuliani\'s', radius + Dim.offset, radius + Dim.offset, radius, 'TopLeft'),
    new Place('Mazzieri\'s', Dim.width - (radius + Dim.offset), radius + Dim.offset, radius, 'TopRight'),
    new Place('Lombardi\'s', radius + Dim.offset, Dim.height - (radius + Dim.offset), radius, 'DownLeft'),
    new Place('SomeoneElse\'s', Dim.width - (radius + Dim.offset), Dim.height - (radius + Dim.offset), radius, 'DownRight'),
    new Place('Pub', 600, 200, 1.2 * radius),
    new Place('Mall', 1000, 350, 1.6 * radius),
    new Place('Campus', 700, 500, 1.4 * radius)
)

// List of agents
let agents = [1, 2, 3, 4, 5].flatMap( idx => [
    new Agent("G" + idx, State.NORMAL, places[0]),
    new Agent("M" + idx, State.NORMAL, places[1]),
    new Agent("L" + idx, State.NORMAL, places[2]),
    new Agent("S" + idx, State.NORMAL, places[3])
])
agents[agents.length - 1].state = State.INFECTED
agents[agents.length - 1].medical_status = new MedicalStatus(new Date(date.getTime()))

// Index of the selected agent
let agent_selected = undefined

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
        var clicked_x = event.clientX
        var clicked_y = event.clientY
        clicked_x -= canvas.offsetLeft
        clicked_y -= canvas.offsetTop

        for (var i = 0; i < agents.length; i++) {
            var dx = clicked_x - agents[i].x
            var dy = clicked_y - agents[i].y
            if((dx * dx + dy * dy) <= (Dim.agent_radius * Dim.agent_radius)) {
                // Deselect the old agent
                if (agent_selected !== undefined) {
                    agents[agent_selected].selected = false
                }

                // If the clicked agent is a different one select it otherwise complete deselection
                if (agent_selected != i) {
                    agent_selected = i
                    agents[i].selected = true
                } else {
                    agent_selected = undefined
                }

                // If more agents are there only the first encountered is taken
                return
            }
        }
        if (agent_selected !== undefined) {
            agents[agent_selected].move(clicked_x, clicked_y)
        }
    }, false)

    function update() {
        tick()

        /*
         * TODO:
         * LOGIC SHOULD BE MOVED OUTSIDE
         */

        // // Read notification (from the app)
        // // TODO

        // // Quarantine (after 14 days from infection or after 2 days from notification)
        // agents.filter(a => {
        //     return a.state == State.INFECTED || a.state == State.NOTIFIED
        // }).forEach(a => {
        //     if ((a.medical_status.infection_date != undefined && 
        //         date - a.medical_status.infection_date > Time.sickness) || 
        //         (a.medical_status.notification_date != undefined &&
        //         date - a.medical_status.notification_date > Time.visit)) {

        //         a.medical_status.quarantined_date = new Date(date.getTime())
        //         a.state = State.QUARANTINED
        //     }
        // })

        draw()
    }

    function tick() {
        const writeDate = new Date(date) // used to handle asyncronous writing
        agents.forEach(a => a.updatePosition(places))
        agents.forEach(a => a.checkInfection(agents, date))
        /* 
         * TODO: AVOID GUI BLOCKING
         * agents.forEach(a => a.writeMessage(writeDate))
         */
        date.setMilliseconds(date.getMilliseconds() + Time.clockScale)
    }

    function draw() {
        var context = canvas.getContext("2d")
        context.clearRect(0, 0, canvas.width, canvas.height)
        places.forEach(p => p.draw(context))
        agents.forEach(a => a.draw(context))
        context.fillStyle = Colors.text
        context.fillText(date.toLocaleString(), canvas.width / 2, canvas.height - 10);
    }    
}
