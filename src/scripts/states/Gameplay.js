import _State from './_State'
import Actors from '../actors'
import Fonts from '../fonts'
import levels from '../levels'

export default class Gameplay extends _State {
  preload () {
    this.level = levels.getLevel(this.game)
  }

  create () {
    this.level.addMap()

    this.player = Actors.player(this.game, this.world.centerX, 60, this.world);
    this.camera.follow(this.player.sprite, Phaser.Camera.FOLLOW_LOCKON);
  }

  createTitleText (x, y) {
    return Fonts.display(this.game, x, y, 'this is the game', 12, 'center', this.world)
  }

  update () {
    if (this.input.keyboard.isDown(Phaser.Keyboard.A)) {
      this.player.respawn(this.game.world.centerX, this.player.sprite.y)
    }

    if (this.input.keyboard.isDown(Phaser.Keyboard.O)) {
      this.player.kill()
    }

    if (this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
      this.player.attack()
    }

    if (this.input.keyboard.isDown(Phaser.Keyboard.UP)) {
      this.player.moveUp()
    }

    if (this.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
      this.player.moveDown()
    }

    if (this.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
      this.player.moveLeft()
    }

    if (this.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
      this.player.moveRight()
    }
  }
}
