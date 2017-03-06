import constants from '../constants'

const MOVE_DURATION = 75
const MOVE_DISTANCE = constants.TILEWIDTH

export default class Actor {
    constructor (game, sprite, behaviorManager) {
        this.game = game
        this.sprite = sprite
        this.behaviorManager = behaviorManager
        this.behaviorManager.actor = this

        this.canMove = true
        this.isAlive = true

        this.sprite.body.onMoveComplete.add(() => {
            this.sprite.body.x = Phaser.Math.snapTo(this.sprite.body.x, constants.TILEWIDTH)
            this.sprite.body.y = Phaser.Math.snapTo(this.sprite.body.y, constants.TILEWIDTH)
            this.canMove = true
            this.sprite.animations.play('idle')
            this._updatePostion()
        })
    }

    get moveSpeed () {
        return 15
    }

    getCenteredPosition () {
        return new Phaser.Point(Math.floor(this.sprite.body.x + (constants.TILEWIDTH / 2)), Math.floor(this.sprite.body.y + (constants.TILEWIDTH / 2)))
    }

    kill () {
        this.sprite.kill()
        this.isAlive = false
    }

    move (facing, animation) {
        let promiseResolve
        const promise = new Promise(resolve => promiseResolve = resolve)

        if (this.canMove == false) {
            return promise
        }

        if (animation) {
            this.sprite.animations.play(animation)
        }

        this.canMove = false
        this.sprite.body.onMoveComplete.addOnce(promiseResolve)
        this.sprite.body.moveTo(MOVE_DURATION, MOVE_DISTANCE, facing)

        return promise
    }

    attack () {
        this.sprite.animations.play('attack')
    }

    moveAngle (angle) {
        if (Math.abs(angle) > 90) {
            this.sprite.scale.x = 1
        } else if (Math.abs(angle) < 90) {
            this.sprite.scale.x = -1
        }

        return this.move(angle, 'walk')
    }

    act () {
        let action = this.behaviorManager.getAction()

        if (action) {
            return action.execute()
        } else {
            return this._waitForInput()
        }
    }

    _waitForInput () {
        let promiseResolve
        let promiseReject

        const interval = setInterval(() => {
            let action = this.behaviorManager.getAction()

            if (action) {
                clearInterval(interval)
                action.execute()
                    .then(result => promiseResolve(result))
                    .catch(reason => promiseReject(reason))
            }
        }, 250)

        return new Promise((resolve, reject) => {
            promiseResolve = resolve
            promiseReject = reject
        })
    }

    _updatePostion () {
        // noop
    }
}
