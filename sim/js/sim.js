import { Agent, State } from './agent.js'
import MedicalStatus from './medic.js'
import { Colors, Dim, Time, timestep} from './view.js'

// Time counter
let date = new Date()

// List of agents
let agents = [
    new Agent("Alice", State.INFECTED, 50, 50, new MedicalStatus(new Date(date.getTime()))), 
    new Agent("Bob", State.NORMAL, 80, 150),
    new Agent("Charlie", State.NORMAL, 185, 120),
    new Agent("David", State.NORMAL, 40, 210),
    new Agent("Ellen", State.NORMAL, 220, 320)
]

// Index of the selected agent
let agent_selected = undefined

window.onload = function() {
    var canvas = document.getElementById("scene")
    // Stretch the canvas to the window size
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    var context = canvas.getContext("2d")
    context.font = "10px Arial"

    reset()

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

    // Model functions
    function reset() {
        // Reset (initial draw)
        agents.forEach(a => drawAgent(a))
    }

    function update() {
        // Clear canvas
        context.clearRect(0, 0, canvas.width, canvas.height)

        // For each agent update the position
        agents.forEach(a => a.update())

        // Update date
        date.setMilliseconds(date.getMilliseconds() + timestep)

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
        agents.forEach(a => a.notify(date))

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

        // Call this function again.
        window.requestAnimationFrame(update)
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
        context.fillText(agent.name, agent.x, agent.y - Dim.agent_radius);
    }

    function drawGUI() {
        // Draw clock
        context.fillStyle = Colors.text
        var date_string = (date.getDate()) + "/" +
            (date.getMonth() + 1) + " " + 
            date.getHours() + ":" + 
            date.getMinutes()
        context.fillText(date_string, 10, canvas.height - 10);
    }

    setTimeout(function() {
        window.requestAnimationFrame(update)
    }, 500)
}
