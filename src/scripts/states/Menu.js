import _State from './_State';
import Fonts from '../fonts';
import ui from '../ui'

export default class Menu extends _State {
    create () {
        // this.titleText = this.createTitleText(this.world.centerX, 40);
        // this.actionText = this.createActionText(this.world.centerX, 120);
        // this.time.events.loop(1000, () => {
        //     this.actionText.visible = Boolean(!this.actionText.visible);
        // });
        ui.menu.onStart(() => {
            this.stateProvider.gameplay(this.state)
        })
    }

    // createTitleText (x, y) {
    //     return Fonts.menu(this.game, x, y, 'DUNGEON EXPLORER\r\nHEADER\r\nSTART', 8, 'center', this.world);
    // }
    //
    // createActionText (x, y) {
    //     return Fonts.menu(this.game, x, y, 'PRESS SPACE\r\nTO BEGIN EXPLORING', 8, 'center', this.world);
    // }

    // update () {
    //     if (this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
    //         this.stateProvider.gameplay(this.state);
    //     }
    // }
}
