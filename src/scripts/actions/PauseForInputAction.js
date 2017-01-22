import _Action from './_Action'

const DURATION = 0

export default class PauseForInputAction extends _Action {
    _execute () {
        console.log('executing PauseForInputAction')
        return new Promise(resolve => setTimeout(() => resolve(DURATION), 200))
    }
}
