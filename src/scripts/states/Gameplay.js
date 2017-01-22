import _State from './_State'
import Actors from '../actors'
import Fonts from '../fonts'
import levels from '../levels'
import services from '../services'
import constants from '../constants'

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

        const playerStart = this.pathfinding.tileToPoint(context.player.position)

        this.player = Actors.player(this.game, playerStart.x, playerStart.y, this.world)
        this.camera.follow(this.player.sprite, Phaser.Camera.FOLLOW_LOCKON)

        this.game.input.activePointer.leftButton.onUp.add(this.pointerClicked, this)

        this.pathfinding.loadTiledMap(this.level.map)
        this.scheduling = services.scheduling()

        this.scheduling.addActor(this.player)
        this.scheduling.start()
        this.game.input.mouse.mouseWheelCallback = (evt) => {
            const wheelDelta = evt.wheelDelta
            console.dir(this.game.input.mouse.wheelDelta)
            const width = this.game.width + (this.game.input.mouse.wheelDelta * 5)
            const height = width * 0.625
            this.game.scale.setGameSize(width, height)
            // this.camera.setSize(1000,1000)
            // this.game.scale.refresh()


            // const scaleFactor = this.game.scale.scaleFactor
            // console.log(scaleFactor)
            // this.game.scale.setUserScale(.9,.9)
        }
    }

    pointerClicked (btn) {
        const point = new Phaser.Point(Math.floor(btn.parent.worldX), Math.floor(btn.parent.worldY))
        this.game.context.player.destination = this.pathfinding.pointToTile(point)
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
