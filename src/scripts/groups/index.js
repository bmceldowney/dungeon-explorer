import Enemies from './Enemies';
import Items from './Items';

module.exports = {
    enemies: function enemies (game) {
        return new Enemies(game);
    },
    items: function items (game) {
        return new Items(game);
    }
};
