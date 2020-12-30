import { State } from './agent.js'
import { Colors } from './constants.js'
import { generateSeed } from '../iota/generate.js'

class Place {
    constructor(name, x, y, r) {
        this.name = name
        this.xMin = x - r
        this.xMax = x + r
        this.yMin = y - r
        this.yMax = y + r
    }

    getRandomX() {
        return this.xMin + (this.xMax - this.xMin) * Math.random()
    }

    getRandomY() {
        return this.yMin + (this.yMax - this.yMin) * Math.random()
    }

    checkIn(x, y) {
        return x >= this.xMin && x <= this.xMax && y >= this.yMin && y <= this.yMax
    }

    draw(context) {
        context.setLineDash([5, 5])
        context.strokeStyle = Colors.placeLine
        context.lineWidth = 1
        context.strokeRect(this.xMin, this.yMin, this.xMax - this.xMin, this.yMax - this.yMin)
        context.fillText(this.name, this.xMin + 5, this.yMin - 5)
    }
}

class Diagnostician extends Place {
    constructor(id, x, y, r) {
        super('Diagnostician', x, y, r)
        this.id = id
        this.signature = generateSeed()
    }

    // if an agent is infected and not yet quarantined it gets quarantined and the agent is asked to publish on the infected blockchain
    visit(agent, date) {
        if (agent.state != State.QUARANTINED && agent.medicalStatus.infectionDate !== undefined) {
            agent.state = State.QUARANTINED
            if (agent.medicalStatus.certifiedPositiveBy == undefined) {
                agent.medicalStatus.certifiedPositiveBy = this.id
            }
            agent.medicalStatus.quarantinedDate = new Date(date)
        }
    }
}

export { Place, Diagnostician }
