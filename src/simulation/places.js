import { Colors } from './constants.js'

export default class Place {
    constructor(name, x, y, r, corner='None') {
        this.name = name
        this.xMin = x - r
        this.xMax = x + r
        this.yMin = y - r
        this.yMax = y + r
        switch (corner) {
            case 'TopLeft':
                this.corner = [this.xMin - 10, this.yMin - 10]
                break
            case 'TopRight':
                this.corner = [this.xMax + 10, this.yMin - 10]
                break
            case 'DownLeft':
                this.corner = [this.xMin - 10, this.yMax + 10]
                break
            case 'DownRight':
                this.corner = [this.xMax + 10, this.yMax + 10]
                break
        }
    }

    getRandomX() {
        return this.xMin + (this.xMax - this.xMin) * Math.random()
    }

    getRandomY() {
        return this.yMin + (this.yMax - this.yMin) * Math.random()
    }

    draw(context) {
        context.setLineDash([5, 5])
        context.strokeStyle = Colors.place_line
        context.lineWidth = 1
        context.strokeRect(this.xMin, this.yMin, this.xMax - this.xMin, this.yMax - this.yMin)
        context.fillText(this.name, this.xMin + 5, this.yMin - 5)
    }
}

export { Place }
