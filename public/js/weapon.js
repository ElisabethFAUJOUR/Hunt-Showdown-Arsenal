const weapon = {

    weaponCards: document.querySelectorAll('.weapon-card'),

    init() {
        weapon.filterWeapons();
        weapon.searchWeapons();
        weapon.listenToClickOnSortButton();
        weapon.closeSortOptions();
    },

    //---------------------------
    //---- FUNCTIONS FILTER -----
    //---------------------------

    /**
     * Filter Weapons by selecting category or ammo types 
     */
    filterWeapons() {
        const categoryButtons = document.querySelectorAll('.filter-category-btn');
        const ammoButtons = document.querySelectorAll('.filter-ammo-btn');

        const allCategoryButton = document.querySelector('.filter-category-btn[data-action="reset"]');
        const allAmmoButton = document.querySelector('.filter-ammo-btn[data-action="reset"]');

        categoryButtons.forEach(button => {
            weapon.listenToClickOnFilterButton(button, categoryButtons, allCategoryButton);
        });

        ammoButtons.forEach(button => {
            weapon.listenToClickOnFilterButton(button, ammoButtons, allAmmoButton);
        });
    },

    /**
     * Apply filters to weapons based on selected categories and/or ammo types
     * @param {HTMLElement} categoryButtons 
     * @param {HTMLElement} ammoButtons 
     */
    applyFilters(categoryButtons, ammoButtons) {
        const selectedCategories = [];
        const selectedAmmoTypes = [];

        weapon.weaponCards.forEach(card => {
            let resultFound = false;

            categoryButtons.forEach(button => {
                if (button.classList.contains('selected')) {
                    console.log(button)
                    selectedCategories.push(button.textContent.toLowerCase());
                }
            });

            ammoButtons.forEach(button => {
                if (button.classList.contains('selected')) {
                    selectedAmmoTypes.push(button.textContent.toLowerCase());
                }
            });

            const weaponCategory = card.getAttribute('data-category').toLowerCase();
            const weaponAmmoType = card.getAttribute('data-ammo').toLowerCase();

            const categoryMatch = selectedCategories.includes('all') || selectedCategories.includes(weaponCategory);
            const ammoTypeMatch = selectedAmmoTypes.includes('all') || selectedAmmoTypes.includes(weaponAmmoType);

            if ((selectedCategories.length === 0 || categoryMatch) && (selectedAmmoTypes.length === 0 || ammoTypeMatch)) {
                card.classList.remove('hidden');
                resultFound = true;
            } else {
                card.classList.add('hidden');
            }

            if (!resultFound) {
                weapon.createNoResultsFoundMessage();
            } else {
                weapon.hideNoResultsFoundMessage();
            }
        });
    },

    /**
     * Listen to click on filter buttons
     * @param {HTMLElement} button clicked button
     * @param {NodeList} buttons all buttons in the same group (category or ammo)
     * @param {HTMLElement} allButton button 'All'
     */
    listenToClickOnFilterButton(button, buttons, allButton) {
        const categoryButtons = document.querySelectorAll('.filter-category-btn');
        const ammoButtons = document.querySelectorAll('.filter-ammo-btn');
        button.addEventListener('click', () => {
            if (button.dataset.action === "reset") {
                buttons.forEach(btn => {
                    if (btn === button) {
                        btn.classList.toggle('selected');
                    } else {
                        btn.classList.remove('selected');
                    }
                });
            } else {
                button.classList.toggle('selected');
                if (Array.from(buttons).some(btn => btn.classList.contains('selected'))) {
                    allButton.classList.remove('selected');
                }
            }
            weapon.applyFilters(categoryButtons, ammoButtons);
        });
    },

    //---------------------------
    //---- FUNCTIONS SEARCH -----
    //---------------------------

    /**
     * Listen to the text put in the search bar and filter weapons including the search text
     */
    searchWeapons() {
        const searchInput = document.querySelector('.search-bar');
        searchInput.addEventListener('input', () => {
            const searchText = searchInput.value.toLowerCase();
            let resultFound = false;

            weapon.weaponCards.forEach(card => {
                const weaponName = card.querySelector('.name').textContent.toLowerCase();
                const weaponType = card.querySelector('.type').textContent.toLowerCase();
                if (weaponName.includes(searchText) || weaponType.includes(searchText)) {
                    card.classList.remove('hidden');
                    resultFound = true;
                } else {
                    card.classList.add('hidden');
                }
            });

            if (!resultFound) {
                weapon.createNoResultsFoundMessage();
            } else {
                weapon.hideNoResultsFoundMessage();
            }
        });
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
    },

    /**
     * Listen to the click on the sort-by options to sort weapons
     */

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

document.addEventListener('DOMContentLoaded', weapon.init);