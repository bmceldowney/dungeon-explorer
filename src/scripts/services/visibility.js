import pathfinding from './pathfinding'

export default {
    update: (player, level) => {
        level.map.layer.data.forEach((row) => {
            row.forEach((tile) => {
                tile.properties.visible = false
            })
        })

        const fov = new ROT.FOV.PreciseShadowcasting((x, y) => {
            const row = level.map.layer.data[y]
            if (!row) return false

            const tile = row[x]
            if (!tile) return false

            if (tile.properties.walkable) return true
            return false
        })

        const playerTile = pathfinding.pointToTile(player.getCenteredPosition())

        console.log(`player.getCenteredPosition: ${player.getCenteredPosition()}`)
        console.log(`playerTile: ${playerTile}`)
        fov.compute(playerTile.x, playerTile.y, 10, (x, y, r, visibility) => {
            const tile = level.map.layer.data[y][x]

            tile.properties.visible = true
            tile.properties.revealed = true
        })
    }
}
