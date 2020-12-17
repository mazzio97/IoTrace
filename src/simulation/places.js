import { Colors } from './constants.js'
import { Diagnostician } from './diagnostician.js'

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

class CovidCentre extends Place {
    constructor(x, y, r) {
        super('Covid Centre', x, y, r)
        this.diagnostician = new Diagnostician()
    }
}

export { Place, CovidCentre }
