import PlayerSprite from './PlayerSprite';

module.exports = {
  loadResources: function loadResources (loader) {
    PlayerSprite.loadResource(loader);
  },

  player: function player (game, x, y) {
    return new PlayerSprite(game, x, y);
  }
};
