import _State from './_State'
import Actors from '../actors'
import Fonts from '../fonts'
import levels from '../levels'
import services from '../services'

export default class Gameplay extends _State {
  constructor () {
    super()
    this.path = []
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

    this.pathfinding = services.pathfinding()
    this.pathfinding.loadTiledMap(this.level.map)
    this.scheduling = services.scheduling()
  }

  pointerClicked (btn) {
    const point = new Phaser.Point(Math.floor(btn.parent.worldX), Math.floor(btn.parent.worldY))
    this.playerTarget = point
    this.pathfinding.findPath(this.player.getCenteredPosition(), point, result => {
      this.path = result
      const angle = Phaser.Math.radToDeg(Phaser.Math.angleBetweenPoints(this.path[0], this.path[1]))
      this.player.moveAngle(angle)
    })
  }

  update () {
  }

  render () {
    const mouseX = Phaser.Math.snapTo(Math.floor(this.game.input.activePointer.x - 4), 8)
    const mouseY = Phaser.Math.snapTo(Math.floor(this.game.input.activePointer.y - 4), 8)

    this.game.debug.pixel(mouseX, mouseY)
    this.game.debug.pixel(mouseX + 6, mouseY)
    this.game.debug.pixel(mouseX, mouseY + 6)
    this.game.debug.pixel(mouseX + 6, mouseY + 6)

    // if (this.path) {
    //   this.path.forEach(tile => {
    //     const point = this.pathfinding.tileToPoint(tile)
    //     const worldPos = this.game.world.worldPosition
    //     this.game.debug.pixel(point.x + worldPos.x, point.y + worldPos.y, '#00FF00', 8)
    //   })
    // }
  }
}
