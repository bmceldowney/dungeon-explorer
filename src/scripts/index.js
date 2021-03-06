import States from './states';

const width = 400;
const height = 300;
const renderer = Phaser.AUTO;
const parent = 'content';
const defaultState = null;
const transparent = false;
const antialias = false;
const physicsConfig = null;
const game = new Phaser.Game(
    width,
    height,
    renderer,
    parent,
    defaultState,
    transparent,
    antialias,
    physicsConfig
);

States.loading(game.state);
