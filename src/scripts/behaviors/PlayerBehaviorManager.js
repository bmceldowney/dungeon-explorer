import _BehaviorManager from './_BehaviorManager'
import services from '../services'
import actions from '../actions'

export default class PlayerBehaviorManager extends _BehaviorManager {
    constructor (game) {
        super(game)
        this.pathfinder = services.pathfinding()
    }

    _getAction () {
        let action = null
        const position = Phaser.Point.parse(this.game.context.player.position)
        const destinationPath = this.game.context.player.destinationPath

        if (destinationPath.length > 0) {
            action = actions.move(this.game, this.actor, { position, destinationPath })
        }

        return action
    }
}
