import app from './app.js';

const tool = {

    /* Tool cards elements */
    toolCards: document.querySelectorAll('.tool-card'),

    /* Array for all tools */
    toolCardsArray: [],

    init() {
        tool.toolCardsArray = Array.from(document.querySelectorAll('.tool-card'));
        app.searchCards(tool.toolCards);
        app.toggleSortButton();
        app.sortCards('tools', tool.toolCardsArray);
    }
};

document.addEventListener('DOMContentLoaded', tool.init);