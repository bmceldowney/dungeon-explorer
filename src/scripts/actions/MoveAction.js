import _Action from './_Action'
import services from '../services'

export default class MoveAction extends _Action {
    _execute () {
        console.log('executing MoveAction')
        const pathfinder = services.pathfinding()

        return new Promise((resolve, reject) => {
            const point = pathfinder.tileToPoint(this.payload.destination)
            pathfinder.findPath(this.actor.getCenteredPosition(), point, result => {
                if (result && result.length) {
                    this.path = result
                    const angle = Phaser.Math.radToDeg(Phaser.Math.angleBetweenPoints(this.path[0], this.path[1]))
                    this.actor.moveAngle(angle).then(() => {
                        resolve(this.actor.moveSpeed)
                    })
                }
            })
        })
    }
}
