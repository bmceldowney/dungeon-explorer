export default class _Action {
    constructor (game, actor, payload) {
        this.game = game
        this.actor = actor
        this.payload = payload
        this.completed = new Phaser.Signal()
    }

    execute () {
        this._validatePayload()
        this._execute().then(duration => {
            this.completed.dispatch(duration)
        })
    }

    _validatePayload () {
        console.log('validate payload empty')
    }
}
