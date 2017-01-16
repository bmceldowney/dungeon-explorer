import _Action from './_Action'

const DURATION = 10

export default class WaitAction extends _Action {
    _execute () {
        return new Promise(resolve => resolve(DURATION))
    }
}
