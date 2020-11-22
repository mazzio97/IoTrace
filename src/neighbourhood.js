import { Agent, State } from './simulation/agent.js'
import { Place } from './simulation/places.js'
import MedicalStatus from './simulation/medic.js'
import { Colors, Dim, Time, timestep } from './simulation/view.js'

// Time variables
let date = new Date()
let updateTime = 1 / 30.0 // 30 fps

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

window.onload = function() {
    var canvas = document.getElementById("scene")
    // Stretch the canvas to the window size
    canvas.width = Dim.width - 10
    canvas.height = Dim.height - 10
    var context = canvas.getContext("2d")
    context.font = "10px Arial"

    update()

    canvas.addEventListener("click", function(event) {
        var clicked_x = event.clientX
        var clicked_y = event.clientY
        clicked_x -= canvas.offsetLeft
        clicked_y -= canvas.offsetTop

        console.log("clicked on x:" + clicked_x + " y:" + clicked_y)

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
        // Call this function again.
        // window.requestAnimationFrame(update)
        setTimeout(function() {
            window.requestAnimationFrame(update)
        }, updateTime)

        // Clear canvas
        context.clearRect(0, 0, canvas.width, canvas.height)

        // For each agent update the position
        agents.forEach(a => a.update(places))

        // Update date
        date.setMilliseconds(date.getMilliseconds() + timestep)

        // Draw places
        places.forEach(p => drawPlace(p))

        // Draw agents
        agents.forEach(a => drawAgent(a))

        // Draw GUI
        drawGUI()

        // Trigger events
        // Infection (contact with an infected agent)
        agents.filter(a => {
            return a.state == State.INFECTED
        }).forEach(infected => {
            agents.filter(normal => {
                return normal.state != State.INFECTED
            }).forEach(normal => {
                var dx = infected.x - normal.x
                var dy = infected.y - normal.y

                if((dx * dx + dy * dy) <= (Dim.infection_radius * Dim.infection_radius)) {
                    normal.state = State.INFECTED
                    normal.medical_status.infection_date = new Date(date.getTime())
                }
            })
        })

        // Write notification (from the app)
        // agents.forEach(a => a.notify(date))

        // Read notification (from the app)
        // TODO

        // Quarantine (after 14 days from infection or after 2 days from notification)
        agents.filter(a => {
            return a.state == State.INFECTED || a.state == State.NOTIFIED
        }).forEach(a => {
            if ((a.medical_status.infection_date != undefined && 
                date - a.medical_status.infection_date > Time.sickness) || 
                (a.medical_status.notification_date != undefined &&
                date - a.medical_status.notification_date > Time.visit)) {

                a.medical_status.quarantined_date = new Date(date.getTime())
                a.state = State.QUARANTINED
            }
        })
    }

    function drawPlace(place) {
        context.setLineDash([5, 5])
        context.strokeStyle = Colors.place_line
        context.strokeRect(place.xMin, place.yMin, place.xMax - place.xMin, place.yMax - place.yMin)
        context.fillText(place.name, place.xMin + 5, place.yMin - 5)
    }

    // Agent graphic functions
    function drawAgent(agent) {
        // Body
        context.beginPath()
        context.arc(agent.x, agent.y, Dim.agent_radius, 0, 2 * Math.PI, false)

        // Colors depend on the state
        context.fillStyle = agent.state.color

        if (agent.selected == true) {
            context.lineWidth = Dim.selected_stroke_width
            context.strokeStyle = Colors.selected_stroke
            context.stroke()
        }

        context.fill()

        // Infection area
        if (agent.state == State.INFECTED) {
            context.beginPath()
            context.arc(agent.x, agent.y, Dim.infection_radius, 0, 2 * Math.PI, false)
            context.fillStyle = Colors.infection_area
            context.fill()
        }

        // Name
        context.fillStyle = Colors.text
        context.fillText(agent.name, agent.x, agent.y - Dim.agent_radius)
    }

    function drawGUI() {
        // Draw clock
        context.fillStyle = Colors.text
        var date_string = (date.getDate()) + "/" +
            (date.getMonth() + 1) + " " + 
            date.getHours() + ":" + 
            date.getMinutes()
        context.fillText(date_string, canvas.width / 2, canvas.height - 10);
    }
}
