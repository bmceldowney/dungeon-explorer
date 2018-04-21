import pathfinding from './pathfinding'

function getTile (level, x, y) {
    const row = level.map.layer.data[y]
    if (!row) return

    const tile = row[x]
    return tile
}

export default {
    update: (player, level) => {
        level.map.layer.data.forEach((row) => {
            row.forEach((tile) => {
                tile.properties.visible = false
            })
        })
        const playerTile = pathfinding.pointToTile(pathfinding.getCenteredPosition(player))

        const fov = new ROT.FOV.PreciseShadowcasting((x, y) => {
            const tile = getTile(level, x, y)
            if (!tile) return false

            return ((tile.properties.walkable && !tile.properties.blockLOS) || (x === playerTile.x && y === playerTile.y))
        })

        fov.compute(playerTile.x, playerTile.y, 10, (x, y, r, visibility) => {
            const tile = getTile(level, x, y)
            if (!tile) return

            tile.properties.visible = true
            tile.properties.revealed = true
        })
    }
}
