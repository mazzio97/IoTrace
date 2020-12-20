import { State } from './agent.js'

class Diagnostician{
    constructor() {
        this.visitors = Array()
    }

    // if an agent is infected and not yet quarantined it gets quarantined and a message is published on the infected blockchain
    visit(agent, date) {
        if (agent.state != State.QUARANTINED && agent.medicalStatus.infectionDate !== undefined) {
            agent.state = State.QUARANTINED
            agent.medicalStatus.quarantinedDate = new Date(date)

            this.visitors.push(agent)
        }
    }
}

export { Diagnostician }