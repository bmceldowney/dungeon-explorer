import _Actor from './_Actor';
import behaviors from '../behaviors'

export default class Player extends _Actor {
    constructor (game, sprite) {
        super(game, sprite, behaviors.player(game));
    }
}
