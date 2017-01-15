import pathfinding from './pathfinding'
import scheduling from './scheduling'
import gameContext from './gameContext'

export default {
    pathfinding: () => {
        return pathfinding
    },
    scheduling: () => {
      return scheduling
    },
    context: () => {
        return gameContext
    }
}
