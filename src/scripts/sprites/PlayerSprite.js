import _Sprite from './_Sprite'
import constants from '../constants'

export default class PlayerSprite extends _Sprite {
    constructor (game, x, y) {
        super(game, x, y, constants.SPRITEKEY)

        game.physics.enable(this)
        this.animations.add('idle', [0,0,0])
        this.animations.add('walk', [0,0,0])
        this.animations.add('walkUp', [0,0,0])
        this.animations.add('attack', [0,0,0])
        this.animations.play('idle')
    }
}
