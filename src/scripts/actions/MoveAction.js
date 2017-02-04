import _Action from './_Action'
import services from '../services'

export default class MoveAction extends _Action {
    _execute () {
        console.log('executing MoveAction')
        const pathfinder = services.pathfinding()

        return new Promise((resolve, reject) => {
            this.path = this.payload.destinationPath

            if (this.path.length < 2) { // at the end of the path
                this.path.shift()
                return resolve(this.actor.moveSpeed)
            }

            const angle = Phaser.Math.radToDeg(Phaser.Math.angleBetweenPoints(this.path[0], this.path[1]))
            this.actor.moveAngle(angle).then(() => {
                this.path.shift()
                resolve(this.actor.moveSpeed)
            })
        })
    }
}
