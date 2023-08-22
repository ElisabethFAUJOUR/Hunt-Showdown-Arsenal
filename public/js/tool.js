const tool = {

    /* Tool cards elements */
    toolCards: document.querySelectorAll('.tool-card'),
    
    /* Array for all tools */
    toolCardsArray: [],

    init() {
        tool.toolCardsArray = Array.from(document.querySelectorAll('.tool-card'));
        console.log(tool.toolCards);
        console.log(tool.toolCardsArray);
        tool.searchTools();
        tool.toggleSortButton();
        tool.sortTools()
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
                const toolName = card.querySelector('.header-name').textContent.toLowerCase();
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
                tool.toggleSortDirection()

                if (sortType === "reset") {
                    const toolsContainer = document.querySelector('.cards-container');
                    toolsContainer.innerHTML = ''; 
                    tool.toolCardsArray.forEach(card => {
                        toolsContainer.appendChild(card);
                    });
                } else {
                    tool.sortToolsBy(sortType);
                }
            });
        });
    },
    
    /**
     * Toggles the sorting direction between ascending and descending.
     */
    toggleSortDirection() {
        tool.sortDirection = tool.sortDirection === 'desc' ? 'asc' : 'desc'; 
    },

    /**
     * Filter, sort tools by value ASC or DESC and display the sorted tools
     * @param {string} sortData - Sorting option name
     */
    sortToolsBy(sortData) {
        const toolsContainer = document.querySelector('.cards-container');
    
        const toolsWithSortData = tool.toolCardsArray.filter(card => card.querySelector(`[data-value="${sortData}"]`));
    
        const sortedTools = toolsWithSortData.sort((a, b) => {
            const valueA = parseFloat(a.querySelector(`[data-value="${sortData}"]`).textContent);
            const valueB = parseFloat(b.querySelector(`[data-value="${sortData}"]`).textContent);
    
            if (tool.sortDirection === 'asc') {
                return valueA - valueB;
            } else {
                return valueB - valueA;
            }
        });
    
        toolsContainer.innerHTML = '';
    
        sortedTools.forEach(card => {
            toolsContainer.appendChild(card);
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
    }
};

document.addEventListener('DOMContentLoaded', tool.init);