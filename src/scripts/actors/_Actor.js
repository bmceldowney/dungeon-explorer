const MOVE_DURATION = 75
const MOVE_DISTANCE = 8

export default class Actor {
  constructor (game, sprite) {
    this.game = game
    this.sprite = sprite

    this.canMove = true;
    this.isAlive = true;

    this.sprite.body.onMoveComplete.add(() => {
        this.sprite.body.x = Phaser.Math.snapTo(this.sprite.body.x, 8);
        this.sprite.body.y = Phaser.Math.snapTo(this.sprite.body.y, 8);
        this.canMove = true
        this.sprite.animations.play('idle');
    })
  }

  getCenteredPosition () {
    return new Phaser.Point(Math.floor(this.sprite.body.x + 4), Math.floor(this.sprite.body.y + 4))
  }

  kill () {
    this.sprite.kill();
    this.isAlive = false;
  }

  move (facing, animation) {
    if (this.canMove == false) {
      return;
    }

    if (animation) {
      this.sprite.animations.play(animation);
    }

    this.canMove = false;

    this.sprite.body.moveTo(MOVE_DURATION, MOVE_DISTANCE, facing)
  }

  attack () {
    this.sprite.animations.play('attack');
  }

  moveAngle(angle) {
    if (Math.abs(angle) > 90) {
      this.sprite.scale.x = -1;
    } else if (Math.abs(angle) < 90) {
      this.sprite.scale.x = 1;
    }

    this.move(angle, 'walk');
  }

  moveTimer(){
    var moveDelay = this.game.time.create();
    moveDelay.loop(500, this.travel, this);
    moveDelay.start();
  }
}
