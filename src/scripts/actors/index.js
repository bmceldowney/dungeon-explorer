import Player from './Player';
import Sprites from '../sprites';

module.exports = {
  player: function player (game, x, y, group = null) {
    var sprite = Sprites.player(game, x, y);
    var player = new Player(game, sprite);

    if (group) {
      group.add(player.sprite);
    }

    return player;
  }
};
