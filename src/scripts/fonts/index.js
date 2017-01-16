import MenuFont from './MenuFont';

module.exports = {
    loadResources: function loadResources (loader) {
        MenuFont.loadResource(loader);
    },

    menu: function menu (game, x, y, text, size, align, group) {
        var font = new MenuFont(game, x, y, text, size, align);

        if (group) {
            group.add(font);
        }

        return font;
    }
};
