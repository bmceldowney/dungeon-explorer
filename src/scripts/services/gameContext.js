const initialContext = {
    input: {
        isBlocked: false
    },
    player: {
        health: 10,
        speed: 10,
        position: {
            x: 2,
            y: 2
        },
        destinationPath: []
    },
    enemies: {}
}

export default {
    init: game => {
        game.gameContext = initialContext
    }
}
