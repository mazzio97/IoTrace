import { Colors, Dim, Probabilities, Time } from './constants.js'
import { generateSeed } from '../iota/generate.js'
import { MamGate } from '../iota/mam_gate.js'
import { SecurityToolBox } from '../iota/security.js'

class Agent {
    constructor(name, home, covidCentre, tag, initialState = State.NORMAL, medicalStatus = new MedicalStatus()) {
        this.name = name
        this.home = home
        this.x = home.getRandomX()
        this.y = home.getRandomY()
        this.covidCentre = covidCentre
        this.target_x = undefined
        this.target_y = undefined
        this.state = initialState
        this.medicalStatus = medicalStatus
        this.selected = false
        this.last_writing = undefined
        this.channel = new MamGate('public', 'https://nodes.devnet.iota.org', generateSeed(), tag)
        this.secutity_toolbox = new SecurityToolBox()
        this.geosolver_public_key = 'uhayO4JgKQ8SPZqg1xReY3USXTm1OrF3F8VzOfht1TE='
    }

    move(target_x, target_y) {
        this.target_x = target_x
        this.target_y = target_y
    }

    readNotification() {
        // TODO: read notification blockchain
        this.state = State.NOTIFIED
        this.move(this.covidCentre.getRandomX(), this.covidCentre.getRandomY())
    }

    writeMessage(date) {
        if (this.last_writing == undefined || date - this.last_writing >= Time.writingTime) {
            this.last_writing = new Date(date)
            this.channel.publish({
                message: this.secutity_toolbox.encryptMessage(this.name, 
                    this.secutity_toolbox.keys.publicKey),
                x: this.secutity_toolbox.encryptMessage(JSON.stringify(this.x), 
                    this.geosolver_public_key),
                y: this.secutity_toolbox.encryptMessage(JSON.stringify(this.y), 
                    this.geosolver_public_key),
                date: this.secutity_toolbox.encryptMessage(JSON.stringify(this.last_writing), 
                    this.geosolver_public_key),
                public_key: this.secutity_toolbox.keys.publicKey
            })
        }
    }

    updatePosition(places, date) {
        // If target_x is present, the agent moves towards the target
        // Otherwise, if any (not quarantined) agent reaches the covid center, it gets a visit
        if (this.target_x != undefined) {
            var delta_x = (this.target_x - this.x)
            var delta_y = (this.target_y - this.y)
            var length = Math.sqrt(delta_x * delta_x + delta_y * delta_y)
            // if target is reached both targets are set to undefined, otherwise the agent moves
            if (Math.abs(delta_x) < Dim.epsilon && Math.abs(delta_y) < Dim.epsilon) {
                this.target_x = undefined
                this.target_y = undefined
            } else {
                this.x = this.x + delta_x * Time.agentVelocity / length      
                this.y = this.y + delta_y * Time.agentVelocity / length
            }
        } else if (this.state != State.QUARANTINED && this.covidCentre.checkIn(this.x, this.y)) {
            this.covidCentre.diagnostician.visit(this, date)
        }
        
        // Finally, if the agent is still not quarantined, it can choose a new target with given probability
        if (this.state != State.QUARANTINED && Math.random() < Probabilities.reachNewTarget) {
            let place = places[Math.floor(places.length * Math.random())]
            this.move(place.getRandomX(), place.getRandomY())
        }
    }

    checkInfection(agents, date) {
        if (this.state == State.NORMAL) {
            // stores the array of infected agents that are in the infection range
            let nearbyInfected = agents.filter(a => {
                var dx = a.x - this.x
                var dy = a.y - this.y
                var dm = Dim.infection_radius + Dim.agent_radius // maximal distance
                return a.state == State.INFECTED && dx * dx + dy * dy <= dm * dm
            })
            // for each one of them, there is a certain probability of getting infected
            for (let i = 0; i < nearbyInfected.length; i++) {
                if (Math.random() < Probabilities.passInfection) {
                    this.state = State.INFECTED
                    this.medicalStatus.infection_date = new Date(date)
                    return
                }
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
