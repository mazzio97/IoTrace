import { State } from './agent.js'

class Diagnostician{

    // if an agent is infected and not yet quarantined it gets quarantined and the agent is asked to publish on the infected blockchain
    visit(agent, date) {
        if (agent.state != State.QUARANTINED && agent.medicalStatus.infectionDate !== undefined) {
            agent.state = State.QUARANTINED
            agent.medicalStatus.waitMedicalUpdate = true
            agent.medicalStatus.quarantinedDate = new Date(date)
        }
    }
}

export { Diagnostician }