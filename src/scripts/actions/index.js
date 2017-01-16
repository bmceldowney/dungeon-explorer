import MoveAction from './MoveAction'
import PauseForInputAction from './PauseForInputAction'
import WaitAction from './WaitAction'

export default {
    move: (game, actor, data) => {
        return new MoveAction(game, actor, data)
    },
    pauseForInput: (game, actor) => {
        return new PauseForInputAction(game, actor)
    },
    wait: (game, actor) => {
        return new WaitAction(game, actor)
    }
}
