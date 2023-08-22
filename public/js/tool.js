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
        tool.sortTools()
    },

     //----------------------------
    //---- FUNCTIONS SORT BY -----
    //----------------------------

    /**
     * Sort tools by sorting option
     */
    sortTools() {
        const sortOptions = document.querySelectorAll('.sort-option-btn');
    
        sortOptions.forEach(option => {
            option.addEventListener('click', () => {
                const sortType = option.getAttribute('data-sort');
                app.sortDirection = app.toggleSortDirection(app.sortDirection);
                const newSortDirection = app.sortDirection;
                if (sortType === "reset") {
                    const toolsContainer = document.querySelector('.tools-container');
                    toolsContainer.innerHTML = ''; 
                    tool.toolCardsArray.forEach(card => {
                        toolsContainer.appendChild(card);
                    });
                } else {
                    app.sortCards('tools', tool.toolCardsArray, newSortDirection, sortType);
                }
            });
        });
    }
};

document.addEventListener('DOMContentLoaded', tool.init);