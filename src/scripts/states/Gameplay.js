import _State from './_State'
import actors from '../actors'
import levels from '../levels'
import services from '../services'
import constants from '../constants'
import groups from '../groups'
import items from '../items'

export default class Gameplay extends _State {
    constructor () {
        super()
        this.path = []
        this.playerTarget = null
    }

    preload () {
        this.gameContext = services.context()

        this.level = levels.getLevel(this.game)
        this.gameContext.init(this.game)
    }

    create () {
        const context = this.game.gameContext
        this.pathfinding = services.pathfinding()

        this.level.addMap()
        console.log(this.level)

        const playerObj = this.level.getPlayerPosition()

        this.player = actors.player(this.game, playerObj.x, playerObj.y, this.world)
        this.enemies = groups.enemies(this.game)
        this.enemies.initEnemies(this.level.getEnemies())

        this.items = groups.items(this.game)
        this.items.initItems(this.level.getItems())

        this.camera.follow(this.player.sprite, Phaser.Camera.FOLLOW_LOCKON)

        this.game.input.activePointer.leftButton.onUp.add(this.pointerClicked, this)

        this.pathfinding.loadLevel(this.level)
        this.scheduling = services.scheduling()

        this.scheduling.addActor(this.player)
        this.scheduling.start()

        this.visibility = services.visibility()
        this.visibility.update(this.player, this.level)

        this.scheduling.ticked.add(() => {
            // hide enemies and items that are not in LoS
            this.enemies.forEach((enemy) => {
                const tile = this.pathfinding.pointToTile(this.pathfinding.getCenteredPosition(enemy))
                enemy.renderable = this.level.isTileVisible(tile.x, tile.y)
            })

            this.visibility.update(this.player, this.level)
            this.updateTiles()
        })

        // this.game.input.mouse.mouseWheelCallback = this.onMouseWheel
        this.updateTiles()
    }

    onMouseWheel (evt) {
        const game = this
        // console.dir(this.game.input.mouse.wheelDelta)
        // console.log(`width: ${game.canvas.width}`)
        // console.log(`height: ${game.canvas.height}`)
        // game.scale.setGameSize(width, height)
        // game.scale.refresh()

        const scales = [
            {
                scaleFactor: 1,
                width: 800,
                height: 600
            },
            {
                scaleFactor: 2,
                width: 400,
                height: 300,
            },
            {
                scaleFactor: 3,
                width: 200,
                height: 150
            }
        ]

        // game.world.scale.set(game.input.mouse.wheelDelta / 10)

        const zoomAmount = game.input.mouse.wheelDelta
        const currentUserScaleFactor = game.scale._userScaleFactor.x;
        const currentScaleIndex = currentUserScaleFactor - 1;
        let scaleIndex = currentScaleIndex + 1;

        if (zoomAmount < 0) {
            scaleIndex = currentScaleIndex - 1;
        }

        if (scaleIndex >= scales.length || scaleIndex < 0) return;

        console.dir(`scaleIndex ${scaleIndex}`)
        const scale = scales[scaleIndex];
        game.scale.setUserScale(scale.scaleFactor, scale.scaleFactor);
            
        // game.width = scale.width;
        // game.height = scale.height;
        // game.scale.refresh()

        // game.camera.scale.x += zoomAmount
        // game.camera.scale.y += zoomAmount



        // game.camera.bounds.x = size.x * game.camera.scale.x
        // game.camera.bounds.y = size.y * game.camera.scale.y
        // game.camera.bounds.width = size.width * game.camera.scale.x
        // game.camera.bounds.height = size.height * game.camera.scale.y
        // game.camera.bounds.width = game.width * game.camera.scale.x
        // game.camera.bounds.height = game.height * game.camera.scale.y

        console.dir(`new scale factor ${scale.scaleFactor}`)
    }

    pointerClicked (btn) {
        const point = new Phaser.Point(Math.floor(btn.parent.worldX), Math.floor(btn.parent.worldY))

        // get the tile so that we can check to see if it's discovered, if there's
        // an item or if there's a monster
        const tileCoords = this.pathfinding.pointToTile(point)
        const tile = this.level.map.layer.data[tileCoords.y][tileCoords.x]

        // if we haven't seen the tile, we can't move there
        if (!tile.properties.revealed) return

        // if there's an item, interact with it
        const items = this.level.getItems()
        const item = items.find(item => item.x === tile.worldX && item.y === tile.worldY)

        if (item) {

            debugger
        }

        this.pathfinding.findPath(this.pathfinding.getCenteredPosition(this.player), point, result => {
            if (result && result.length) {
                this.game.gameContext.player.destinationPath = result
            }
        })
    }

    updateTiles () {
        this.level.map.layer.data.forEach((row) => {
            row.forEach((tile) => {

                // const point = this.pathfinding.tileToPoint({ x: tile.x, y: tile.y })

                if (tile.properties.visible) {
                    tile.alpha = 1
                } else if (tile.properties.revealed) {
                    tile.alpha = 0.35
                } else {
                    tile.alpha = 0
                }
            })
        })

        this.level.map.layer.dirty = true
    }

    render () {
        const mouseX = Phaser.Math.snapTo(Math.floor(this.game.input.activePointer.worldX - (constants.TILEWIDTH / 2)), constants.TILEWIDTH)
        const mouseY = Phaser.Math.snapTo(Math.floor(this.game.input.activePointer.worldY - (constants.TILEHEIGHT / 2)), constants.TILEHEIGHT)
        const worldPos = this.game.world.worldPosition

        const pixOffsetX = constants.TILEWIDTH - 2
        const pixOffsetY = constants.TILEHEIGHT - 2
        const x = mouseX + worldPos.x
        const y = mouseY + worldPos.y

        this.game.debug.pixel(x, y)
        this.game.debug.pixel(x + pixOffsetX, y)
        this.game.debug.pixel(x, y + pixOffsetY)
        this.game.debug.pixel(x + pixOffsetX, y + pixOffsetY)

        // if (this.path) {
        //   this.path.forEach(tile => {
        //     const point = this.pathfinding.tileToPoint(tile)
        //     this.game.debug.pixel(point.x + worldPos.x, point.y + worldPos.y, '#00FF00', constants.TILEWIDTH)
        //   })
        // }
    }
}
