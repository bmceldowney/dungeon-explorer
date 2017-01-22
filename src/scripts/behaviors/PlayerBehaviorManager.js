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
        const destination = Phaser.Point.parse(this.game.context.player.destination)

        if (!position.equals(destination)) {
            action = actions.move(this.game, this.actor, { position, destination })
        }

        return action
    }
}
