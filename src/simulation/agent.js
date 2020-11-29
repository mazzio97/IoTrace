import { Colors, Dim, Time } from './constants.js'
import { generateSeed } from '../iota/generate.js'
import { MamGate } from '../iota/mam_gate.js'

const newTargetProb = 1

class Agent {
    constructor(name, home, covidCentre, initialState = State.NORMAL, medicalStatus = new MedicalStatus(), velocity=1.0) {
        this.name = name
        this.home = home
        this.x = home.getRandomX()
        this.y = home.getRandomY()
        this.covidCentre = covidCentre
        this.target_x = undefined
        this.target_y = undefined
        this.state = initialState
        this.velocity = velocity
        this.medicalStatus = medicalStatus
        this.selected = false
        this.last_writing = undefined
        this.seed = generateSeed()
        this.channel = new MamGate('public', 'https://nodes.devnet.iota.org', this.seed)
    }

    move(target_x, target_y) {
        this.target_x = target_x
        this.target_y = target_y
    }

    notify() {
        this.state = State.NOTIFIED
        this.move(this.covidCentre.getRandomX(), this.covidCentre.getRandomY())
    }

    writeMessage(date) {
        if (this.last_writing == undefined || date - this.last_writing >= Time.writingTime) {
            this.last_writing = new Date(date)
            this.channel.publish({
                message: "Message from " + this.name,
                position: this.x + ", " + this.y,
                date: this.last_writing
            })
        }
    }

    updatePosition(places, date) {
        // If target_x is present, the agent moves towards the target
        // If any infected agent reaches the covid center, it gets quarantined
        // Otherwise, if not quarantined, it can choose a new target with newTargetProb probability
        if (this.target_x != undefined) {
            var delta_x = (this.target_x - this.x)
            var delta_y = (this.target_y - this.y)
            var length = Math.sqrt(delta_x * delta_x + delta_y * delta_y)
            // if target is reached both targets are set to undefined, otherwise the agent moves
            if (Math.abs(delta_x) < Dim.epsilon && Math.abs(delta_y) < Dim.epsilon) {
                this.target_x = undefined
                this.target_y = undefined
            } else {
                this.x = this.x + delta_x * this.velocity / length      
                this.y = this.y + delta_y * this.velocity / length
            }
        } else if ((this.state == State.INFECTED || this.state == State.NOTIFIED) && this.covidCentre.checkIn(this.x, this.y)) {
            this.state = State.QUARANTINED
            this.covidCentre.diagnostician.certifyPositive(this, date)
        } else if (this.state != State.QUARANTINED && Math.random() < newTargetProb) {
            let place = places[Math.floor(places.length * Math.random())]
            this.move(place.getRandomX(), place.getRandomY())
        }
    }

    checkInfection(agents, date) {
        if (this.state == State.NORMAL) {
            agents.filter(a => a.state == State.INFECTED).forEach(infected => {
                var dx = infected.x - this.x
                var dy = infected.y - this.y
                if(dx * dx + dy * dy <= (Dim.infection_radius + Dim.agent_radius) * (Dim.infection_radius + Dim.agent_radius)) {
                    this.state = State.INFECTED
                    this.medicalStatus.infection_date = new Date(date)
                }
            })
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

class MedicalStatus {
    constructor(infection_date = undefined, notification_date = undefined, quarantined_date = undefined) {
        this.infection_date = infection_date
        this.notification_date = notification_date
        this.quarantined_date = quarantined_date
    }
}

const State = {
    NORMAL: { status: "normal", color: Colors.normal },
    INFECTED: { status: "infected", color: Colors.infected },
    NOTIFIED: { status: "notified", color: Colors.notified },
    QUARANTINED: { status: "quarantined", color: Colors.quarantined }
}

export { Agent, MedicalStatus, State }
