const tool = {

    toolCards: document.querySelectorAll('.tool-card'),
    
    init() {
        tool.searchTools();
        tool.listenToClickOnSortButton();
        tool.closeSortOptions();
    },

    //---------------------------
    //---- FUNCTIONS FILTER -----
    //---------------------------

    /**
     * Listen to the text put in the search bar and filter the tools including the text
     */
    searchTools() {
        const searchInput = document.querySelector('.search-bar');
        searchInput.addEventListener('input', () => {
            const searchText = searchInput.value.toLowerCase();
            let resultFound = false;
    
            tool.toolCards.forEach(card => {
                const toolName = card.querySelector('.name').textContent.toLowerCase();
                if (toolName.includes(searchText)) {
                    card.classList.remove('hidden');
                    resultFound = true;
                } else {
                    card.classList.add('hidden');
                }
            });

            if(!resultFound) {
                tool.createNoResultsFoundMessage(); 
            } else {
                tool.hideNoResultsFoundMessage();
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
            noResultsMessage.textContent = 'Whooops, no tools found.';
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
        const sortButton = document.querySelector('.sort-by-btn');
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

document.addEventListener('DOMContentLoaded', tool.init);