const app = {
    
    init() {
        app.observeElements();
    },

    //---------------------------
    //---- FUNCTIONS SCROLL -----
    //---------------------------

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
     * @param {NodeList} cards 
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
     * Toggles the sorting direction between ascending and descending.
     */
     toggleSortDirection(sortDirection) {
        return sortDirection === 'desc' ? 'asc' : 'desc';
    },   

    /**
     * Filter, sort consumables by value ASC or DESC and display the sorted consumables
     * @param {string} sortData - Sorting option name
     */
    sortCards(data, cardsArray, sortDirection, sortData) {
        const itemsContainer = document.querySelector(`.${data}-container`);

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