import { Agent, State } from './agent.js'
import { Colors, Dim } from './view.js'

// List of agents
let agents = [
    new Agent(State.INFECTED, 50, 50), 
    new Agent(State.NORMAL, 70, 100),
    new Agent(State.NORMAL, 170, 90),
    new Agent(State.NORMAL, 20, 190),
    new Agent(State.NORMAL, 200, 300)
]

// Index of the selected agent
let agent_selected = undefined

window.onload = function() {
    var canvas = document.getElementById("scene")
    // Stretch the canvas to the window size
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    var context = canvas.getContext("2d")

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

        // Draw agents
        agents.forEach(a => drawAgent(a))

        // Trigger events
        // Infection
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
                }
            })
        })

        // Call this function again.
        window.requestAnimationFrame(update)
    }

    // Graphic functions
    function drawAgent(agent) {
        // Agent
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

        // Infection radius
        if (agent.state == State.INFECTED) {
            context.beginPath()
            context.arc(agent.x, agent.y, Dim.infection_radius, 0, 2 * Math.PI, false)
            context.fillStyle = Colors.infection_area
            context.fill()
        }
    }

    setTimeout(function() {
        window.requestAnimationFrame(update)
    }, 500)
}
