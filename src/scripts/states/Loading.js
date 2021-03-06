import _State from './_State';
import Fonts from '../fonts';
import Sprites from '../sprites';
import constants from '../constants'
import ui from '../ui'
export default class Loading extends _State {
    init () {
        // Pixel-perfect canvas scaling!
        // Thanks to http://www.belenalbeza.com/retro-crisp-pixel-art-in-phaser/
        this.game.scale.setUserScale(2, 2);
        this.game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
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
        ui.load(this.game, () => {
            this.stateProvider.menu(this.state);
        })

        Fonts.loadResources(this);

        this.game.load.image('new', 'assets/16x16/retro_tiles.png');
        this.game.load.tilemap('testingGrounds', 'assets/testingGrounds.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.spritesheet(constants.SPRITEKEY, 'assets/16x16/retro_tiles.png', constants.TILEWIDTH, constants.TILEHEIGHT)
    }
}
