import _Sprite from './_Sprite'
import constants from '../constants'

export default class RatSprite extends _Sprite {
    constructor (game, x, y) {
        super(game, x, y, constants.SPRITEKEY)

        game.physics.enable(this)
        this.animations.add('idle', [1])
        this.animations.add('walk', [1])
        this.animations.add('walkUp', [1])
        this.animations.add('attack', [1])
        this.animations.play('idle')
    }
}
