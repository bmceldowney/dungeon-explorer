import _Item from './_Item'

export default class Chest extends _Item {
    constructor (game, sprite, contents, isOpen = false) {
        super(game, sprite)

        this.isOpen = isOpen

        if (contents) {
            this.contents = contents
        }
    }

    setContents (contents) {
        this.contents = contents
    }

    getContents () {
        return this.contents
    }
}
