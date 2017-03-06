import PlayerSprite from './PlayerSprite';
import RatSprite from './RatSprite';

module.exports = {
    player: function player (game, x, y) {
        return new PlayerSprite(game, x, y);
    },

    rat: function rat (game, x, y) {
        return new RatSprite(game, x, y);
    }
};
