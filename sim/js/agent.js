import { Colors, Dim } from './view.js'

export default class Agent {
    constructor(initial_state, x, y, velocity=0.35) {
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

        if (Math.abs(delta_x) > Dim.epsilon) { 
            delta_x /= length
            this.x = this.x + delta_x * this.velocity        
        }

        if (Math.abs(delta_y) > Dim.epsilon) {
            delta_y /= length
            this.y = this.y + delta_y * this.velocity
        }     
    }
}

// Model
const State = {
    NORMAL: { status: "normal", color: Colors.normal },
    NOTIFIED: { status: "notified", color: Colors.notified },
    INFECTED: { status: "infected", color: Colors.infected },
}

export { Agent, State }
