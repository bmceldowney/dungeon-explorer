import _Sprite from './_Sprite'
import constants from '../constants'

const KEY = 'player_sprite'
const SRC = 'assets/dev/player_sprite.png'
const animationKey = 'man01_'
const idleFrames = Phaser.Animation.generateFrameNames(animationKey, 1, 1, '', 2)
const walkFrames = [
    `${animationKey}01`,
    `${animationKey}02`
]
const walkUpFrames = [
    `${animationKey}01`,
    `${animationKey}02`
]
const attackFrames = [
    `${animationKey}01`,
    `${animationKey}02`
]

export default class PlayerSprite extends _Sprite {
    static loadResource (loader) {
        loader.load.spritesheet(KEY, SRC, constants.TILEWIDTH, constants.TILEHEIGHT)
    }

    constructor (game, x, y) {
        super(game, x, y, KEY)

        game.physics.enable(this)
        this.animations.add('idle', idleFrames, 15, true)
        this.animations.add('walk', walkFrames, 15, true)
        this.animations.add('walkUp', walkUpFrames, 6, true)
        this.animations.add('attack', attackFrames, 15, false)
        this.animations.play('idle')
    }
}
