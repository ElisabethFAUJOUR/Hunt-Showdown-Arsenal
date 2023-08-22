const consu = {

    /* Consumable cards elements */
    consumableCards: document.querySelectorAll('.consumable-card'),

    /* Array for all consumables */
    consumableCardsArray: [],
    
    init() {
        consu.consumableCardsArray = Array.from(document.querySelectorAll('.consumable-card'));
        console.log(consu.consumableCards);
        console.log(consu.consumableCardsArray);
        consu.searchConsumables();
        consu.toggleSortButton();
        consu.sortConsumables();
    },

    //---------------------------
    //---- FUNCTIONS FILTER -----
    //---------------------------

    /**
     * Listen to the text put in the search bar and filter the consumables including the text
     */
    searchConsumables() {
        const searchInput = document.querySelector('.search-bar');
        searchInput.addEventListener('input', () => {
            const searchText = searchInput.value.toLowerCase();
            let resultFound = false;
    
            consu.consumableCards.forEach(card => {
                const consumableName = card.querySelector('.header-name').textContent.toLowerCase();
                if (consumableName.includes(searchText)) {
                    card.classList.remove('hidden');
                    resultFound = true;
                } else {
                    card.classList.add('hidden');
                }
            });

            if(!resultFound) {
                consu.createNoResultsFoundMessage(); 
            } else {
                consu.hideNoResultsFoundMessage();
            }
        });
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
                consu.toggleSortDirection()

                if (sortType === "reset") {
                    const consumablesContainer = document.querySelector('.cards-container');
                    consumablesContainer.innerHTML = ''; 
                    consu.consumableCardsArray.forEach(card => {
                        consumablesContainer.appendChild(card);
                    });
                } else {
                    consu.sortConsumablesBy(sortType);
                }
            });
        });
    },
    
    /**
     * Toggles the sorting direction between ascending and descending.
     */
    toggleSortDirection() {
        consu.sortDirection = consu.sortDirection === 'desc' ? 'asc' : 'desc'; 
    },

    /**
     * Filter, sort consumables by value ASC or DESC and display the sorted consumables
     * @param {string} sortData - Sorting option name
     */
    sortConsumablesBy(sortData) {
        const consumablesContainer = document.querySelector('.cards-container');

        const consumablesWithSortData = consu.consumableCardsArray.filter(card => card.querySelector(`[data-value="${sortData}"]`));

        const sortedConsumables = consumablesWithSortData.sort((a, b) => {
            const valueA = parseFloat(a.querySelector(`[data-value="${sortData}"]`).textContent);
            const valueB = parseFloat(b.querySelector(`[data-value="${sortData}"]`).textContent);
    
            if (consu.sortDirection === 'asc') {
                return valueA - valueB;
            } else {
                return valueB - valueA;
            }
        });
    
        consumablesContainer.innerHTML = '';
    
        sortedConsumables.forEach(card => {
            consumablesContainer.appendChild(card);
        });
    },

    /**
     * Listen to the click on the sort-by button to display the options
     */
    toggleSortButton() {
        const sortButton = document.querySelector('.sort-button');
        const sortOptionsElem = document.querySelector('.sort-options');
    
        sortButton.addEventListener('click', (event) => {
            event.stopPropagation();
            sortButton.classList.toggle('is-clicked');
            sortOptionsElem.classList.toggle('hidden');
        });
    
        document.addEventListener('click', () => {
            sortButton.classList.remove('is-clicked');
            sortOptionsElem.classList.add('hidden');
        });
    },

    //--------------------------------------
    //---- FUNCTIONS MESSAGE NO RESULT -----
    //--------------------------------------

    /**
     * Creates the "No results found" message if it doesn't exist
     */
    createNoResultsFoundMessage() {
        const noResultsMessage = document.querySelector('.no-results-message');
        if (!noResultsMessage) {
            const mainContainer = document.querySelector('.main-container');
            const noResultsMessage = document.createElement('div');
            noResultsMessage.className = 'no-results-message';
            noResultsMessage.textContent = 'Whooops, no consumables found.';
            mainContainer.appendChild(noResultsMessage);
        } else {
            noResultsMessage.style.display = 'block';
        }
    },

    /**
     * Hides the "No results found" message
     */
    hideNoResultsFoundMessage() {
        const noResultsMessage = document.querySelector('.no-results-message');
        noResultsMessage.style.display = 'none';
    }

};

document.addEventListener('DOMContentLoaded', consu.init);