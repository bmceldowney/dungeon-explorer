import _Sprite from './_Sprite'
import constants from '../constants'

export default class ChestSprite extends _Sprite {
    constructor (game, x, y) {
        super(game, x, y, constants.SPRITEKEY)

        game.physics.enable(this)
        this.animations.add('idle', [14])
        this.animations.play('idle')
    }
}
