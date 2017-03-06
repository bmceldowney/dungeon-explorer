import Player from './Player';
import Rat from './Rat';
import Sprites from '../sprites';

module.exports = {
    player: function player (game, x, y, group = null) {
        var sprite = Sprites.player(game, x, y);
        var player = new Player(game, sprite);

        if (group) {
            group.add(player.sprite);
        }

        return player;
    },

    rat: function rat (game, x, y, group = null) {
        var sprite = Sprites.rat(game, x, y);
        var rat = new Rat(game, sprite);

        if (group) {
            group.add(rat.sprite);
        }

        return rat;
    }
};
