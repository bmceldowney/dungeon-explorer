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

    getWalkables () {
        const walkables = []

        this.map.tilesets.forEach(tileSet => {
            for (var prop in tileSet.tileProperties) {
                if (tileSet.tileProperties.hasOwnProperty(prop)) {
                    const tileGid = prop + tileSet.firstgid
                    if (tileSet.tileProperties[prop].walkable) {
                        walkables.push(parseInt(prop, 10) + tileSet.firstgid)
                    }
                }
            }
        })

        return walkables
    }

    getGrid () {
        return this.map.layers[0].data.map(row => row.map(column => column.index))
    }

    getPlayerPosition () {
        return this.findObjectsByName('player')[0]
    }

    getEnemies () {
        return this.findObjectsByType('enemy')
    }

    getItems () {
        return this.findObjectsByType('item')
    }

    isTileVisible (x, y) {
        return this.map.layer.data[y][x].properties.visible
    }

    findObjectsByType (objectType) {
        return this.map.objects.objectLayer.filter((obj) => {
            return obj.type === objectType
        })
    }

    findObjectsByName (objectName) {
        return this.map.objects.objectLayer.filter((obj) => {
            return obj.name === objectName
        })
    }
}
