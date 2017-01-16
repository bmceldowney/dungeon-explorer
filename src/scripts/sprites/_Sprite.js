import constants from '../constants'

const anchorX = 0.5
const anchorY = 0

export default class _Sprite extends Phaser.Sprite {
    constructor (game, x, y, key, frame) {
        // account for anchor
        const adjustedX = x + (constants.TILEWIDTH * anchorX)
        const adjustedY = y + (constants.TILEHEIGHT * anchorY)

        super(game, adjustedX, adjustedY, key, frame);
        this.anchor.setTo(anchorX, anchorY)
    }
}
