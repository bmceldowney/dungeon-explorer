import _Sprite from './_Sprite'

const KEY = 'actors'
const SRC = 'assets/8-bit-fantasy/actors.png'
const WIDTH = 8
const HEIGHT = 8
const animationKey = 'man01_'
const idleFrames = Phaser.Animation.generateFrameNames(animationKey, 1, 2, '', 2)
const walkFrames = [
  `${animationKey}01`,
  `${animationKey}03`,
  `${animationKey}04`,
  `${animationKey}05`
]
const walkUpFrames = [
  `${animationKey}13`,
  `${animationKey}14`,
  `${animationKey}15`,
  `${animationKey}14`
]
const attackFrames = [
  `${animationKey}02`,
  `${animationKey}07`,
  `${animationKey}08`,
  `${animationKey}09`,
  `${animationKey}08`,
  `${animationKey}07`,
  `${animationKey}02`
]

export default class PlayerSprite extends _Sprite {
  static loadResource (loader) {
    loader.load.spritesheet(KEY, SRC, WIDTH, HEIGHT)
  }

  constructor (game, x, y) {
    super(game, x, y, KEY)
    game.physics.enable(this)
    this.animations.add('idle', idleFrames, 3, true)
    this.animations.add('walk', walkFrames, 8, true)
    this.animations.add('walkUp', walkUpFrames, 6, true)
    this.animations.add('attack', attackFrames, 15, false)
    this.animations.play('idle')

    // this.idle()
    //
    // this.animations.add('normal', [0, 1, 2], 20, true)
    // this.animations.add('bank', [3, 4, 5], 20, true)
    // this.animations.add('explode', [6, 7, 8], 12, false)
    this.anchor.setTo(0.5, 1)
  }
}
