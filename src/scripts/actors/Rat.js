import _Actor from './_Actor';
import behaviors from '../behaviors'
import services from '../services'

export default class Rat extends _Actor {
    constructor (game, sprite) {
        super(game, sprite, behaviors.player(game));
    }
}
