import menuDefinition from './components/menu'

let menuScreen

export default {
    load: (game, callback) => {
        const uiAssets = [
            './images/btn-line.png',
            './images/btn-line-down.png'
        ]

        uiAssets.forEach((asset) => {
            game.load.image(asset, `assets/ui-theme/${asset}`)
        })

        game.load.onLoadComplete.add(() => {
            EZGUI.Compatibility.fixCache.call(game.load, uiAssets)

            EZGUI.Theme.load(['assets/ui-theme/ui-theme.json'], () => {
                menuScreen = EZGUI.create(menuDefinition, 'ui-theme')

                callback()
            })
        })
    },

    menu: {
        onStart: (cb) => {
            EZGUI.components.startBtn.on('click', () => {
                cb()
                menuScreen.visible = false
            })
        }
    }
}
