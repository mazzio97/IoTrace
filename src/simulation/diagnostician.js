import { generateSeed } from '../iota/generate.js'
import { MamGate } from '../iota/mam_gate.js'

class Diagnostician{
    constructor() {
        this.seed = generateSeed()
        this.channel = new MamGate('public', 'https://nodes.devnet.iota.org', this.seed)
    }

    certifyPositive(agent, date) {
        agent.medicalStatus.quarantined_date = new Date(date)
        this.channel.publish({
            message: agent.name + " infected",
            date: agent.medicalStatus.quarantined_date
        })
    }
}

export { Diagnostician }