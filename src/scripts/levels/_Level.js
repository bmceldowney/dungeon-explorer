// assumptions:
//  - layer1 has all blocking tiles

export default class _Level {
  constructor (game) {
    this.game = game
  }

  addMap () {
    if (this._subAddMap) this._subAddMap()
  }

  _getWalkables () {
    this.map.tiles.forEach(tile)
  }
}
