import PlayerBehaviorManager from './PlayerBehaviorManager'

export default {
    player: game => {
        return new PlayerBehaviorManager(game)
    }
}
