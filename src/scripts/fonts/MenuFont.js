import _BitmapFont from './_BitmapFont';

const KEY = 'alagard';
const FONT = '/assets/fonts/alagard_gradient.png';
const MAP = '/assets/fonts/alagard_gradient.fnt';

export default class MenuFont extends _BitmapFont {
  static loadResource (loader) {
    loader.load.bitmapFont(KEY, FONT, MAP);
  }

  constructor (game, x, y, text, size, align) {
    super(game, x, y, KEY, text, size, align);
  }
}
