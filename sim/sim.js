// Minimum distance used to stop agents which have reached their destinations
const epsilon = 1e-3
const agent_radius = 10
const infection_radius = 35
const agent_speed = 0.35

// Colors
const agent_alpha_channel = 0.7
const infection_area_alpha_channel = 0.2

const StateColor = {
    "normal": "rgba(0, 0, 0, " + agent_alpha_channel + ")",
    "notified": "rgba(255, 255, 0, " + agent_alpha_channel + ")",
    "infected": "rgba(255, 0, 0, " + agent_alpha_channel + ")",
}

const infection_area_color = "rgba(255, 0, 0, " + infection_area_alpha_channel + ")"

const selected_stroke_color = "rgba(0, 255, 0, " + agent_alpha_channel + ")"
const selected_stroke_width = 3

// Model
const State = {
    NORMAL: "normal",
    NOTIFIED: "notified",
    INFECTED: "infected",
}

class Agent {
    constructor(initial_state, x, y, velocity) {
        this.state = initial_state
        this.x = x
        this.y = y
        this.target_x = x
        this.target_y = y
        this.velocity = velocity
        this.selected = false
    }

    move(target_x, target_y) {
        this.target_x = target_x
        this.target_y = target_y
    }

    update() {
        var delta_x = (this.target_x - this.x)
        var delta_y = (this.target_y - this.y)
        var length = Math.sqrt(delta_x * delta_x + delta_y * delta_y)

        if (Math.abs(delta_x) > epsilon) { 
            delta_x /= length
            this.x = this.x + delta_x * this.velocity        
        }

        if (Math.abs(delta_y) > epsilon) {
            delta_y /= length
            this.y = this.y + delta_y * this.velocity
        }     
    }
}

// List of agents
agents = [new Agent(State.INFECTED, 50, 50, agent_speed), 
    new Agent(State.NORMAL, 70, 100, agent_speed),
    new Agent(State.NORMAL, 170, 90, agent_speed),
    new Agent(State.NORMAL, 20, 190, agent_speed),
    new Agent(State.NORMAL, 200, 300, agent_speed)]

// Index of the selected agent
agent_selected = undefined

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

        for (i = 0; i < agents.length; i++) {
            var dx = clicked_x - agents[i].x
            var dy = clicked_y - agents[i].y
            if((dx * dx + dy * dy) <= (agent_radius * agent_radius)) {
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

                if((dx * dx + dy * dy) <= (infection_radius * infection_radius)) {
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
        context.arc(agent.x, agent.y, agent_radius, 0, 2 * Math.PI, false)

        // Colors depend on the state
        context.fillStyle = StateColor[agent.state]

        if (agent.selected == true) {
            context.lineWidth = selected_stroke_width
            context.strokeStyle = selected_stroke_color
            context.stroke()
        }

        context.fill()

        // Infection radius
        if (agent.state == State.INFECTED) {
            context.beginPath()
            context.arc(agent.x, agent.y, infection_radius, 0, 2 * Math.PI, false)
            context.fillStyle = infection_area_color
            context.fill()
        }
    }

    setTimeout(function() {
        window.requestAnimationFrame(update)
    }, 500)
}
