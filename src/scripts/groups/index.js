import Enemies from './Enemies';

module.exports = {
    enemies: function enemies (game) {
        return new Enemies(game);
    }
};
