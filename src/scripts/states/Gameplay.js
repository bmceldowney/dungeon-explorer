import _State from './_State'
import Actors from '../actors'
import Fonts from '../fonts'
import levels from '../levels'

export default class Gameplay extends _State {
  constructor () {
    super()
    this.points = []
    this.playerTarget = null
  }

  preload () {
    this.level = levels.getLevel(this.game)
  }

  create () {
    this.level.addMap()

    let playerStartX = Phaser.Math.snapTo(this.world.centerX, 8)
    let playerStartY = Phaser.Math.snapTo(this.world.centerY, 8)
    this.player = Actors.player(this.game, playerStartX, playerStartY, this.world)
    this.camera.follow(this.player.sprite, Phaser.Camera.FOLLOW_LOCKON)

    this.game.input.activePointer.leftButton.onUp.add(this.pointerClicked, this)
  }

  pointerClicked (btn) {
    let point = new Phaser.Point(Math.floor(btn.parent.x), Math.floor(btn.parent.y))
    this.playerTarget = point
    this.points.push(point)
  }

  update () {
  }

  render () {
    this.points.forEach((point) => {
      this.game.debug.pixel(point.x, point.y)
    })
  }
}
