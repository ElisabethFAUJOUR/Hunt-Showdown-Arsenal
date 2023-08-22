const consu = {

    consumableCards: document.querySelectorAll('.consumable-card'),
    
    init() {
        consu.searchConsumables();
        consu.listenToClickOnSortButton();
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
    },

    //----------------------------
    //---- FUNCTIONS SORT BY -----
    //----------------------------

    /**
     * Listen to the click on the sort-by button to display the options
     */
    listenToClickOnSortButton() {
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
    }
};

document.addEventListener('DOMContentLoaded', consu.init);