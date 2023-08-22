import app from './app.js';

const consu = {

    /* Consumable cards elements */
    consumableCards: document.querySelectorAll('.consumable-card'),

    /* Array for all consumables */
    consumableCardsArray: [],
    
    init() {
        consu.consumableCardsArray = Array.from(document.querySelectorAll('.consumable-card'));
        app.searchCards(consu.consumableCards);
        app.toggleSortButton();
        app.sortCards('consumables', consu.consumableCardsArray);
    }
};

document.addEventListener('DOMContentLoaded', consu.init);