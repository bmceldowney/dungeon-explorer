import _Actor from './_Actor';
import behaviors from '../behaviors'
import services from '../services'

export default class Player extends _Actor {
    constructor (game, sprite) {
        super(game, sprite, behaviors.player(game));
    }

    _updatePostion () {
        const pathfinder = services.pathfinding()
        const playerTile = pathfinder.pointToTile(this.getCenteredPosition())
        this.game.context.player.position = playerTile
    }
}
