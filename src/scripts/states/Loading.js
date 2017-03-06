import _State from './_State';
import Fonts from '../fonts';
import Sprites from '../sprites';
import constants from '../constants'

export default class Loading extends _State {
    init () {
        // Pixel-perfect canvas scaling!
        // Thanks to http://www.belenalbeza.com/retro-crisp-pixel-art-in-phaser/
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.scale.pageAlignHorizontally = true;
        this.game.scale.pageAlignVertically = true;

        // Rounds x/y positions to the nearest whole to avoid sub-pixel rendering
        this.game.renderer.renderSession.roundPixels = true;

        // Sets browser-prefixed "image-rendering" CSS property on the game canvas
        Phaser.Canvas.setImageRenderingCrisp(this.game.canvas);

        // Prevent these keys from being handled by the browser
        // when the game is in focus
        this.game.input.keyboard.addKeyCapture(Phaser.Keyboard.SPACEBAR);
    }

    preload () {
        Fonts.loadResources(this);

        this.game.load.image('tiles', 'assets/16x16/simpleGraphics_tiles16x16.png');
        this.game.load.image('new', 'assets/16x16/retro_tiles.png');
        this.game.load.tilemap('testingGrounds', 'assets/testingGrounds.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.spritesheet(constants.SPRITEKEY, 'assets/16x16/retro_tiles.png', constants.TILEWIDTH, constants.TILEHEIGHT)
    }

    // create() is automagically triggerd after preload completes
    create () {
        // this.stateProvider.menu(this.state);
        // TEMP
        this.stateProvider.gameplay(this.state);
    }
}
