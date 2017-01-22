export default class _Action {
    constructor (game, actor, payload) {
        this.game = game
        this.actor = actor
        this.payload = payload
    }

    execute () {
        return this._execute()
    }
}
