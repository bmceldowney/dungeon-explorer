export default {
    id: 'menu',
    component: 'Window',
    // header: { position: { x: 0, y: 0 }, height: 40, text: 'HEADER' },
    draggable: false,
    position: { x: 20, y: 20 },
    width: 360,
    height: 260,

    layout: [1, 3],
    children: [
        {
            id: 'label',
            component: 'Label',
            position: 'center',
            text: 'WELCOME TO DUNGEON EXPLORER',
            width: 340,
            height: 50
        },

        null,

        {
            id: 'startBtn',
            component: 'Button',
            position: 'center',
            text: 'EXPLORE',
            width: 100,
            height: 40
        }
    ]
}
