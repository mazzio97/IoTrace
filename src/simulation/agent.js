import { Colors, Dim, Probabilities, Seed, Time } from './constants.js'
import { generateSeed } from '../iota/generate.js'

class Agent {
    constructor(name, home, diagnostician, initialState = State.NORMAL, medicalStatus = new MedicalStatus()) {
        this.name = name
        // Location info
        this.home = home
        this.x = home.getRandomX()
        this.y = home.getRandomY()
        this.targetX = undefined
        this.targetY = undefined
        this.diagnostician = diagnostician
         // Positions not already saved in the Tangle
        this.history = []
        // Tangle related info
        this.lastWriting = undefined
        this.needsToPublish = false
        // State
        this.state = initialState
        this.medicalStatus = medicalStatus
        // GUI
        this.selected = false
        this.lastWriting = undefined
        this.id = generateSeed(Seed.appId + "-sim" + Seed.simId + '-' + Seed.agentId + this.name)
        this.needsToPublish = false
        this.randomDelay = Math.random() * 10000
    }

    move(targetX, targetY) {
        this.targetX = targetX
        this.targetY = targetY
    }

    notify() {
        if (this.state != State.QUARANTINED) {
            this.state = State.NOTIFIED
            this.move(this.diagnostician.getRandomX(), this.diagnostician.getRandomY())
        }
    }

    updatePosition(places, date) {
        // If targetX is present, the agent moves towards the target
        // Otherwise, if any (not quarantined) agent reaches the covid center, it gets a visit
        if (this.targetX != undefined) {
            var deltaX = (this.targetX - this.x)
            var deltaY = (this.targetY - this.y)
            var length = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
            // if target is reached both targets are set to undefined, otherwise the agent moves
            if (Math.abs(deltaX) < Dim.epsilon && Math.abs(deltaY) < Dim.epsilon) {
                this.targetX = undefined
                this.targetY = undefined
            } else {
                this.x = this.x + deltaX * Time.agentVelocity / length      
                this.y = this.y + deltaY * Time.agentVelocity / length
            }
        } else if (this.state != State.QUARANTINED && this.diagnostician.checkIn(this.x, this.y)) {
            this.diagnostician.visit(this, date)
        } else if (this.state != State.QUARANTINED && Math.random() < Probabilities.reachNewTarget) {
            let place = places[Math.floor(places.length * Math.random())]
            this.move(place.getRandomX(), place.getRandomY())
        }
    }

    updateHistory() {
        this.history.push({x: this.x, y: this.y, date: this.lastWriting})
        this.needsToPublish = this.history.length > Dim.historyDim
    }

    clearHistory() {
        this.history = []
    }

    checkInfection(agents, date) {
        if (this.state == State.NORMAL) {
            // stores the array of infected agents that are in the infection range
            let nearbyInfected = agents.filter(a => {
                var dx = a.x - this.x
                var dy = a.y - this.y
                var dm = Dim.infectionRadius + Dim.agentRadius // maximal distance
                return a.state == State.INFECTED && dx * dx + dy * dy <= dm * dm
            })
            // for each one of them, there is a certain probability of getting infected
            for (let i = 0; i < nearbyInfected.length; i++) {
                if (Math.random() < Probabilities.passInfection) {
                    this.state = State.INFECTED
                    this.medicalStatus.infectionDate = new Date(date)
                    return
                }
            }
        }
    }

    draw(context) {
        // Body
        context.beginPath()
        context.arc(this.x, this.y, Dim.agentRadius, 0, 2 * Math.PI, false)

        // Colors depend on the state
        context.fillStyle = this.state.color

        if (this.selected == true) {
            context.lineWidth = Dim.selectedStrokeWidth
            context.strokeStyle = Colors.selectedStroke
            context.stroke()
        }

        context.fill()

        // Infection area
        if (this.state == State.INFECTED) {
            context.beginPath()
            context.arc(this.x, this.y, Dim.infectionRadius, 0, 2 * Math.PI, false)
            context.fillStyle = Colors.infectionArea
            context.fill()
        }

        // Name
        context.fillStyle = Colors.text
        context.fillText(this.name, this.x, this.y - Dim.agentRadius)
    }
}

class MedicalStatus {
    constructor(infectionDate = undefined, notificationDate = undefined, quarantinedDate = undefined) {
        this.infectionDate = infectionDate
        this.notificationDate = notificationDate
        this.quarantinedDate = quarantinedDate
        // If true the agent is ready to share his information on the blockchain
        this.certifiedPositiveBy = undefined
    }
}

const State = {
    NORMAL: { status: "normal", color: Colors.normal },
    INFECTED: { status: "infected", color: Colors.infected },
    NOTIFIED: { status: "notified", color: Colors.notified },
    QUARANTINED: { status: "quarantined", color: Colors.quarantined }
}

export { Agent, MedicalStatus, State }
