export default class _BehaviorManager {
    constructor (game) {
        this.game = game
    }

    getAction () {
        return this._getAction()
    }

    _getAction () {
        console.log('this should never fire')
    }
}
