import pathfinding from './pathfinding'
import scheduling from './scheduling'
import gameContext from './gameContext'
import visibility from './visibility'

export default {
    pathfinding: () => {
        return pathfinding
    },
    scheduling: () => {
      return scheduling
    },
    context: () => {
        return gameContext
    },
    visibility: () => {
        return visibility
    }
}
