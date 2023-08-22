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
        consu.sortConsumables();
    },

    //----------------------------
    //---- FUNCTIONS SORT BY -----
    //----------------------------

    /**
     * Sort consumables by sorting option
     */
    sortConsumables() {
        const sortOptions = document.querySelectorAll('.sort-option-btn');
    
        sortOptions.forEach(option => {
            option.addEventListener('click', () => {
                const sortType = option.getAttribute('data-sort');
                app.sortDirection = app.toggleSortDirection(app.sortDirection);
                const newSortDirection = app.sortDirection;
                if (sortType === "reset") {
                    const consumablesContainer = document.querySelector('.cards-container');
                    consumablesContainer.innerHTML = ''; 
                    consu.consumableCardsArray.forEach(card => {
                        consumablesContainer.appendChild(card);
                    });
                } else {
                    app.sortCards(consu.consumableCardsArray, newSortDirection, sortType);
                }
            });
        });
    },
    
    
};

document.addEventListener('DOMContentLoaded', consu.init);