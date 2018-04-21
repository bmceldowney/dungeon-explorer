import _BitmapFont from './_BitmapFont';

const KEY = 'apple';
const FONT = '/assets/fonts/apple.png';
const MAP = '/assets/fonts/apple.fnt';

export default class MenuFont extends _BitmapFont {
    static loadResource (loader) {
        loader.load.bitmapFont(KEY, FONT, MAP);
    }

    constructor (game, x, y, text, size, align) {
        super(game, x, y, KEY, text, size, align);
    }
}
