import _Sprite from './_Sprite'

const KEY = 'player_sprite'
const SRC = 'assets/8-bit-fantasy/actors.png'
const WIDTH = 8
const HEIGHT = 8
const animationKey = 'man01_'
const idleFrames = Phaser.Animation.generateFrameNames(animationKey, 3, 3, '', 2)
const walkFrames = [
  `${animationKey}03`,
  `${animationKey}04`
]
const walkUpFrames = [
    `${animationKey}03`,
    `${animationKey}04`
]
const attackFrames = [
    `${animationKey}03`,
    `${animationKey}04`
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

    this.anchor.setTo(.5, 0)
  }
}
