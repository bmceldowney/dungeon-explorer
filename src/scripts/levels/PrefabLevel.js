import Level from './_Level'

export default class PrefabLevel extends Level {
  constructor (game, levelName) {
    super(game)
    this.levelName = levelName
  }

  _subAddMap () {
    this.map = this.game.add.tilemap(this.levelName)
    let layers = []

    this.map.tilesets.forEach(tileSet => {
      this.map.addTilesetImage(tileSet.name)
    })

    this.map.layers.forEach(layer => {
      layers.push(this.map.createLayer(layer.name))
    })

    layers[0].resizeWorld()

    return this.map
  }
}
