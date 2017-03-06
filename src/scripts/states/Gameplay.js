import _State from './_State'
import actors from '../actors'
import levels from '../levels'
import services from '../services'
import constants from '../constants'
import groups from '../groups'

export default class Gameplay extends _State {
    constructor () {
        super()
        this.path = []
        this.playerTarget = null
    }

    preload () {
        this.context = services.context()

        this.level = levels.getLevel(this.game)
        this.context.init(this.game)
    }

    create () {
        const context = this.game.context
        this.pathfinding = services.pathfinding()

        this.level.addMap()
        console.log(this.level)

        const playerObj = this.level.getPlayerPosition()

        this.player = actors.player(this.game, playerObj.x, playerObj.y, this.world)
        this.enemies = groups.enemies(this.game)
        this.enemies.initEnemies(this.level.getEnemies())
        this.camera.follow(this.player.sprite, Phaser.Camera.FOLLOW_LOCKON)

        this.game.input.activePointer.leftButton.onUp.add(this.pointerClicked, this)

        this.pathfinding.loadLevel(this.level)
        this.scheduling = services.scheduling()

        this.scheduling.addActor(this.player)
        this.scheduling.start()

        this.visibility = services.visibility()
        this.visibility.update(this.player, this.level)

        this.scheduling.ticked.add(() => {
            this.visibility.update(this.player, this.level)
        })

        this.game.input.mouse.mouseWheelCallback = (evt) => {
            const wheelDelta = evt.wheelDelta
            console.dir(this.game.input.mouse.wheelDelta)
            const width = this.game.width + (this.game.input.mouse.wheelDelta * 5)
            const height = width * 0.625
            console.log(`width: ${this.game.canvas.width}`)
            console.log(`height: ${this.game.canvas.height}`)
            this.game.scale.setGameSize(width, height)
            this.game.scale.refresh()
            // this.game.world.scale.set(this.game.input.mouse.wheelDelta / 10)

            // console.dir(this.game.world.scale)
            // const zoomAmount = this.game.input.mouse.wheelDelta / 4
            //
            // this.game.camera.scale.x += zoomAmount
            // this.game.camera.scale.y += zoomAmount

            // this.game.camera.bounds.x = size.x * this.game.camera.scale.x
            // this.game.camera.bounds.y = size.y * this.game.camera.scale.y
            // this.game.camera.bounds.width = size.width * this.game.camera.scale.x
            // this.game.camera.bounds.height = size.height * this.game.camera.scale.y
            // this.game.camera.bounds.width = this.game.width * this.game.camera.scale.x
            // this.game.camera.bounds.height = this.game.height * this.game.camera.scale.y
        }
    }

    pointerClicked (btn) {
        const point = new Phaser.Point(Math.floor(btn.parent.worldX), Math.floor(btn.parent.worldY))

        this.pathfinding.findPath(this.player.getCenteredPosition(), point, result => {
            if (result && result.length) {
                this.game.context.player.destinationPath = result
            }
        })
    }

    update () {
    }

    render () {
        const mouseX = Phaser.Math.snapTo(Math.floor(this.game.input.activePointer.worldX - (constants.TILEWIDTH / 2)), constants.TILEWIDTH)
        const mouseY = Phaser.Math.snapTo(Math.floor(this.game.input.activePointer.worldY - (constants.TILEHEIGHT / 2)), constants.TILEHEIGHT)
        const worldPos = this.game.world.worldPosition

        const pixOffsetX = constants.TILEWIDTH - 2
        const pixOffsetY = constants.TILEHEIGHT - 2
        const x = mouseX + worldPos.x
        const y = mouseY + worldPos.y

        this.level.map.layer.data.forEach((row) => {
            row.forEach((tile) => {
                const point = this.pathfinding.tileToPoint({ x: tile.x, y: tile.y })
                const rect = new Phaser.Rectangle(point.x, point.y, 16, 16)

                if (tile.properties.visible) {

                } else if (tile.properties.revealed) {
                    this.game.debug.geom(rect, 'rgba(0, 0, 0, .65)')
                } else {
                    this.game.debug.geom(rect, 'rgba(0, 0, 0, 1)')
                }
            })
        })

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
