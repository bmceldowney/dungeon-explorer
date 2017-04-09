import Chest from './Chest'
import Sprites from '../sprites'

module.exports = {
    chest: function chest (game, x, y, group = null) {
        var sprite = Sprites.chest(game, x, y)
        var chest = new Chest(game, sprite)

        if (group) {
            group.add(chest.sprite)
        }

        return chest
    }
}
