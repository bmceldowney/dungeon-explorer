const MOVE_DURATION = 75
const UP = 'up'
const DOWN = 'down'
const LEFT = 'left'
const RIGHT = 'right'
const MOVE_DISTANCE = 8

export default class Actor {
  constructor (game, sprite) {
    this.game = game
    this.sprite = sprite

    this.canMove = true;
    this.isAlive = true;
    this.facing = DOWN;

    this.sprite.body.onMoveComplete.add(() => {
        this.sprite.body.x = Phaser.Math.snapTo(this.sprite.body.x, 8);
        this.sprite.body.y = Phaser.Math.snapTo(this.sprite.body.y, 8);
        this.canMove = true
    })
    // this.sprite.body.onCollide.add(() => this.canMove = true)
  }

  kill () {
    this.sprite.kill();
    this.isAlive = false;
  }

  move (x, y, facing, animation) {
    if (this.canMove == false) {
      return;
    }

    if (animation) {
      this.sprite.animations.play(animation);
    }

    this.canMove = false;
    this.facing = facing;

    switch (this.facing) {
      case LEFT:
        this.sprite.body.moveTo(MOVE_DURATION, MOVE_DISTANCE, 180)
        break;
      case RIGHT:
        this.sprite.body.moveTo(MOVE_DURATION, MOVE_DISTANCE, 0)
        break;
      case UP:
        this.sprite.body.moveTo(MOVE_DURATION, MOVE_DISTANCE, 270)
        break;
      case DOWN:
        this.sprite.body.moveTo(MOVE_DURATION, MOVE_DISTANCE, 90)
        break;
    }
  }

  attack () {
    this.sprite.animations.play('attack');
  }

  moveLeft () {
    this.sprite.scale.x = -1;
    this.move(-MOVE_DISTANCE, 0, LEFT, 'walk');
  }

  moveRight () {
    this.sprite.scale.x = 1;
    this.move(MOVE_DISTANCE, 0, RIGHT, 'walk');
  }

  moveUp () {
    this.move(0, -MOVE_DISTANCE, UP, 'walkUp');
  }

  moveDown () {
    this.move(0, MOVE_DISTANCE, DOWN, 'walk');
  }

  moveTimer(){
    var moveDelay = this.game.time.create();
    moveDelay.loop(500, this.travel, this);
    moveDelay.start();
  }
}
