import constants from '../constants'
import actors from '../actors'

export default class Enemies extends Phaser.Group {
    constructor (game) {
        super(game)
    }

    initEnemy (enemyObj) {
        const { name, x, y } = enemyObj
        actors[name](this.game, x, y, this)
    }

    initEnemies (enemyObjs) {
        enemyObjs.forEach((enemyObj) => {
            this.initEnemy(enemyObj)
        })
    }
}
