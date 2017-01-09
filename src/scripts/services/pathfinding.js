import Easystar from 'easystarjs'

let easystar = new Easystar.js()
let mapData = []

easystar.enableDiagonals()

function pointToTile (point) {
  return new Phaser.Point(Phaser.Math.snapTo(Math.floor(point.x - 4), 8) / 8, Phaser.Math.snapTo(Math.floor(point.y - 4), 8) / 8)
}

function tileToPoint (point) {
  return new Phaser.Point(Math.floor(point.x * 8), Math.floor(point.y * 8))
}

export default {
  // uses a flood-fill to determine the area of an enclosed space
  // currently assumes 0 is passable and 1 is blocked
  // TODO: modify to use the walkables list 
  countContiguousTiles: (playerSprite, gridSize) => {
    const visitedTiles = []
    const tileQueue = []
    let currentTile = pointToTile(playerSprite.body.position)
    let tileCount = 1

    function queueAdjacentTiles (tile) {
      visitedTiles[tile.y][tile.x] = true

      if (mapData[tile.y][tile.x - 1] === 0 && !visitedTiles[tile.y][tile.x - 1]) {
        tileQueue.unshift({ x: tile.x - 1, y: tile.y })
        visitedTiles[tile.y][tile.x - 1] = true
      }
      if (mapData[tile.y][tile.x + 1] === 0 && !visitedTiles[tile.y][tile.x + 1]) {
        visitedTiles[tile.y][tile.x + 1] = true
        tileQueue.unshift({ x: tile.x + 1, y: tile.y })
      }
      if (mapData[tile.y - 1][tile.x] === 0 && !visitedTiles[tile.y - 1][tile.x]) {
        visitedTiles[tile.y - 1][tile.x] = true
        tileQueue.unshift({ x: tile.x, y: tile.y - 1 })
      }
      if (mapData[tile.y + 1][tile.x] === 0 && !visitedTiles[tile.y + 1][tile.x]) {
        tileQueue.unshift({ x: tile.x, y: tile.y + 1 })
        visitedTiles[tile.y + 1][tile.x] = true
      }
    }

    for (let i = 0; i < mapData.length; i++) {
      visitedTiles[i] = []
    }

    queueAdjacentTiles(currentTile)

    while (tileQueue.length) {
      console.log('queue length: ' + tileQueue.length)
      if (mapData[currentTile.y][currentTile.x] === 0) {
        console.log('x: ' + currentTile.x + ', y: ' + currentTile.y)
        tileCount++
      }

      currentTile = tileQueue.pop()
      queueAdjacentTiles(currentTile)
    }

    return tileCount
  },

  findPath: (startPosition, destinationPosition, callback) => {
    const actorTile = pointToTile(startPosition)
    const targetTile = pointToTile(destinationPosition)

    easystar.findPath(actorTile.x, actorTile.y, targetTile.x, targetTile.y, callback)
    easystar.calculate()
  },

  // used to load tilemap data that was generated in Tiled
  loadTiledMap: (tiledMap) => {
    const grid = tiledMap.layers[0].data.map(row => row.map(column => column.index))
    const walkables = []

    tiledMap.tilesets.forEach(tileSet => {
      for (var prop in tileSet.tileProperties) {
        if (tileSet.tileProperties.hasOwnProperty(prop)) {
          const tileGid = prop + tileSet.firstgid
          if (tileSet.tileProperties[prop].walkable) {
            walkables.push(parseInt(prop, 10) + tileSet.firstgid)
          }
        }
      }
    })

    easystar.setGrid(grid)
    easystar.setAcceptableTiles(walkables)
  },

  pointToTile: pointToTile,

  tileToPoint: tileToPoint
}
