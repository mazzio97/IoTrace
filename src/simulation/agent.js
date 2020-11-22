import MedicalStatus from './medic.js'
import { Colors, Dim, Time } from './constants.js'
import { generateSeed } from '../iota/generate.js'
import { MamGate } from '../iota/mam_gate.js'

const newTargetProb = 0.003

export default class Agent {
    constructor(name, initial_state, home, medical_status = new MedicalStatus(), velocity=1.0) {
        this.name = name
        this.state = initial_state
        this.home = home
        this.x = home.getRandomX()
        this.y = home.getRandomY()
        this.target_x = this.x
        this.target_y = this.y
        this.velocity = velocity
        this.selected = false
        this.medical_status = medical_status
        this.last_writing = undefined
        this.seed = generateSeed()
        this.channel = new MamGate('public', 'https://nodes.devnet.iota.org', this.seed)
    }

    move(target_x, target_y) {
        this.target_x = target_x
        this.target_y = target_y
    }

    write(date) {
        if (this.last_writing == undefined || date - this.last_writing >= Time.writingTime) {
            this.last_writing = new Date(date)
            // console.log(this.last_writing)            
            // this.channel.publish({
            //     message: "Message from " + this.name,
            //     position: this.x + ", " + this.y,
            //     date: this.last_writing
            // })
        }
    }

    update(places) {
        var delta_x = (this.target_x - this.x)
        var delta_y = (this.target_y - this.y)
        var length = Math.sqrt(delta_x * delta_x + delta_y * delta_y)

        // Movement
        if (Math.abs(delta_x) > Dim.epsilon) {
            this.x = this.x + delta_x * this.velocity / length      
        }
        if (Math.abs(delta_y) > Dim.epsilon) {
            this.y = this.y + delta_y * this.velocity / length
        }

        // If quarantined, then stays at the home corner
        // Otherwise, when target is reached, new target can be chosen with probability p
        if (this.state == State.QUARANTINED) {
            let c = this.home.corner
            this.move(c[0], c[1])
        } else if (Math.abs(delta_x) < Dim.epsilon && Math.abs(delta_y) < Dim.epsilon) {
            if (Math.random() < newTargetProb) {
                let place = places[Math.floor(places.length * Math.random())]
                this.move(place.getRandomX(), place.getRandomY())
            }
        }        
    }

    draw(context) {
        // Body
        context.beginPath()
        context.arc(this.x, this.y, Dim.agent_radius, 0, 2 * Math.PI, false)

        // Colors depend on the state
        context.fillStyle = this.state.color

        if (this.selected == true) {
            context.lineWidth = Dim.selected_stroke_width
            context.strokeStyle = Colors.selected_stroke
            context.stroke()
        }

        context.fill()

        // Infection area
        if (this.state == State.INFECTED) {
            context.beginPath()
            context.arc(this.x, this.y, Dim.infection_radius, 0, 2 * Math.PI, false)
            context.fillStyle = Colors.infection_area
            context.fill()
        }

        // Name
        context.fillStyle = Colors.text
        context.fillText(this.name, this.x, this.y - Dim.agent_radius)
    }
}

// Model
const State = {
    NORMAL: { status: "normal", color: Colors.normal },
    INFECTED: { status: "infected", color: Colors.infected },
    NOTIFIED: { status: "notified", color: Colors.notified },
    QUARANTINED: { status: "quarantined", color: Colors.quarantined }
}

export { Agent, State }
