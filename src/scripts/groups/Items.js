import constants from '../constants'
import items from '../items'

export default class Enemies extends Phaser.Group {
    constructor (game) {
        super(game)
    }

    initItem (itemObj) {
        const { name, x, y } = itemObj
        items[name](this.game, x, y, this)
    }

    initItems (itemObjs) {
        itemObjs.forEach((itemObj) => {
            this.initItem(itemObj)
        })
    }
}
