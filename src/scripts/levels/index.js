import PrefabLevel from './PrefabLevel'

// provides a level
function getLevel (game, levelConfig) {
    if (levelConfig) {
        // TODO: build a level given config params
    } else {
        // provide the default level
        return buildPrefabLevel(game, 'testingGrounds')
    }
}

function buildPrefabLevel (game, levelName) {
    return new PrefabLevel(game, levelName)
}

export default {
    getLevel
}
