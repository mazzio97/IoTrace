import { generateSeed } from '../iota/generate.js'
import { MamGate } from '../iota/mam_gate.js'
import { State } from './agent.js'

class Diagnostician{
    constructor() {
        this.seed = generateSeed()
        this.channel = new MamGate('public', 'https://nodes.devnet.iota.org', this.seed)
    }

    // if an agent is infected and not yet quarantined it gets quarantined and a message is published on the infected blockchain
    visit(agent, date) {
        if (agent.state != State.QUARANTINED && agent.medicalStatus.infectionDate !== undefined) {
            agent.state = State.QUARANTINED
            agent.medicalStatus.quarantinedDate = new Date(date)
            this.channel.publish({
                message: agent.name + " infected",
                date: agent.medicalStatus.quarantinedDate
            })
        }
    }
}

export { Diagnostician }