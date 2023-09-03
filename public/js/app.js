const app = {
    
    init() {
        app.observeElements();s
    },

    //---------------------------
    //---- FUNCTION FADE IN -----
    //---------------------------

     /**
     * Observe elements with the "fade-in" class and apply fade-in effect
     */
    observeElements() {
        const fadeInElements = document.querySelectorAll(".fade-in");

        const options = {
            root: null,
            rootMargin: "0px",
            threshold: 0.2 
        };

        const observer = new IntersectionObserver((entries, observer) => { 
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                entry.target.classList.add("fade-in-visible");
                observer.unobserve(entry.target);
                }
            });
        }, options);

        fadeInElements.forEach(element => {
            observer.observe(element);
        });
    },

    //---------------------------
    //---- FUNCTIONS SEARCH -----
    //---------------------------

    /**
     * Listen to the text put in the search bar and filter cards including the search text
     * @param {NodeList} cards - List of cards

     */
    searchCards(cards) {
        const searchInput = document.querySelector('.search-bar');
        searchInput.addEventListener('input', () => {
            const searchText = searchInput.value.toLowerCase();
            let resultFound = false;
    
            cards.forEach(card => {
                const cardName = card.querySelector('.header-name').textContent.toLowerCase();
                if (cardName.includes(searchText)) {
                    card.classList.remove('hidden');
                    resultFound = true;
                } else {
                    card.classList.add('hidden');
                }
            });
    
            if (!resultFound) {
                app.createNoResultsFoundMessage();
            } else {
                app.hideNoResultsFoundMessage();
            }
        });
    },

    //----------------------------
    //---- FUNCTIONS SORT BY -----
    //----------------------------
    
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

    /**
     * Toggles the sorting direction between ascending and descending
     * @param {string} sortDirection - Current sorting direction 
     * @returns {string} - New sorting direction ('asc' or 'desc')
     */
    toggleSortDirection(sortDirection) {
        return sortDirection === 'desc' ? 'asc' : 'desc';
    },   

    /**
     * Filter, sort items by a specific data attribute and display the sorted items
     * @param {string} itemType - Type of items ('weapons', 'consumables', 'tools')
     * @param {Array} cardsArray - Array of item card elements
     * @param {string} sortDirection - Sorting direction ('asc' or 'desc')
     * @param {string} sortData - Data attribute name for sorting
     */
    sortCardsByData(itemType, cardsArray, sortDirection, sortData) {
        const itemsContainer = document.querySelector(`.${itemType}-container`);

        const itemsWithSortData = cardsArray.filter(card => card.querySelector(`[data-value="${sortData}"]`));

        const sortedItems = itemsWithSortData.sort((a, b) => {
            const valueA = parseFloat(a.querySelector(`[data-value="${sortData}"]`).textContent);
            const valueB = parseFloat(b.querySelector(`[data-value="${sortData}"]`).textContent);

            if (sortDirection === 'asc') {
                return valueA - valueB;
            } else {
                return valueB - valueA;
            }
        });

        itemsContainer.innerHTML = '';

        sortedItems.forEach(card => {
            itemsContainer.appendChild(card);
        });
    },
    
    /**
     * Sort and update cards based on selected sorting option
     * @param {string} itemType - Type of items ('weapons', 'consumables', 'tools')
     * @param {Array} cardsArray - Array of item card elements
     */
    sortCards(itemType, cardsArray) {
        const sortOptions = document.querySelectorAll('.sort-option-btn');
    
        sortOptions.forEach(option => {
            option.addEventListener('click', () => {
                const sortType = option.getAttribute('data-sort');
                app.sortDirection = app.toggleSortDirection(app.sortDirection);
                const newSortDirection = app.sortDirection;
                const container = document.querySelector(`.${itemType}-container`);
    
                if (sortType === 'reset') {
                    container.innerHTML = '';
                    cardsArray.forEach(card => {
                        container.appendChild(card);
                    });
                } else {
                    app.sortCardsByData(itemType, cardsArray, newSortDirection, sortType);
                }
            });
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
            noResultsMessage.textContent = 'Whooops, no weapons found.';
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

document.addEventListener('DOMContentLoaded', app.init);

export default app;