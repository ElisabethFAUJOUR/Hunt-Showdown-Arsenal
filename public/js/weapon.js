const weapon = {

    /* Weapon card  element */
    weaponCards: document.querySelectorAll('.weapon-card'),

    /* Array for all weapon cards */
    weaponCardsArray: [],

    init() {
        weapon.weaponCardsArray = Array.from(document.querySelectorAll('.weapon-card'));
        weapon.filterWeapons();
        weapon.searchWeapons();
        weapon.toggleSortButton();
        weapon.sortWeapon();
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
        const selectedCategories = []; // Stock selected category buttons
        const selectedAmmoTypes = []; // Stock selected ammo buttons

        weapon.weaponCards.forEach(card => {
            let resultFound = false;

            categoryButtons.forEach(button => {
                if (button.classList.contains('selected')) {
                    selectedCategories.push(button.textContent.toLowerCase()); // If category button has 'selected' class, push the category name in the array
                }
            });

            ammoButtons.forEach(button => {
                if (button.classList.contains('selected')) {
                    selectedAmmoTypes.push(button.textContent.toLowerCase()); // If category button has 'selected' class, push the ammo name in the array
                }
            });

            const weaponCategory = card.getAttribute('data-category').toLowerCase(); // Get the data-attributes value for category
            const weaponAmmoType = card.getAttribute('data-ammo').toLowerCase(); // Get the data-attributes value for ammo

            const categoryMatch = selectedCategories.includes('all') || selectedCategories.includes(weaponCategory); // Check if category Array includes the selected category name OR 'All'
            const ammoTypeMatch = selectedAmmoTypes.includes('all') || selectedAmmoTypes.includes(weaponAmmoType); // Check if ammo Array includes the selected ammo name OR 'All'

            if ((selectedCategories.length === 0 || categoryMatch) && (selectedAmmoTypes.length === 0 || ammoTypeMatch)) { // If no filter button is selected OR if the selected button matches the category name && ammo name, then display all corresponding cards.
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
     * @param {HTMLElement} button - clicked button
     * @param {NodeList} buttons - all buttons in the same group (category or ammo)
     * @param {HTMLElement} allButton - button 'All'
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
                if ([...buttons].some(btn => btn.classList.contains('selected'))) { // Check if at least one element in the array (buttons) has the CSS class 'selected'.
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
     * Sort weapons by sorting option
     */
    sortWeapon() {
        const sortOptions = document.querySelectorAll('.sort-option-btn');
    
        sortOptions.forEach(option => {
            option.addEventListener('click', () => {
                const sortType = option.getAttribute('data-sort');
                weapon.toggleSortDirection();
                if (sortType === "reset") {
                    const weaponContainer = document.querySelector('.card-container');
                    weaponContainer.innerHTML = ''; 
                    weapon.weaponCardsArray.forEach(card => {
                        weaponContainer.appendChild(card);
                    });
                } else {
                    weapon.sortWeaponsBy(sortType);
                }
            });
        });
    },
    
    /**
     * Toggles the sorting direction between ascending and descending.
     */
    toggleSortDirection() {
        weapon.sortDirection = weapon.sortDirection === 'desc' ? 'asc' : 'desc'; 
    },
    
    /**
     * Filter, sort weapons by value ASC or DESC and display the sorted weapons
     * @param {string} sortData - Sorting option name
     */
    sortWeaponsBy(sortData) {
        const weaponContainer = document.querySelector('.card-container');
    
        const weaponsWithSortData = weapon.weaponCardsArray.filter(card => card.querySelector(`[data-value="${sortData}"]`));
    
        const sortedWeapons = weaponsWithSortData.sort((a, b) => {
            const valueA = parseFloat(a.querySelector(`[data-value="${sortData}"]`).textContent);
            const valueB = parseFloat(b.querySelector(`[data-value="${sortData}"]`).textContent);
    
            if (weapon.sortDirection === 'asc') {
                return valueA - valueB;
            } else {
                return valueB - valueA;
            }
        });
    
        weaponContainer.innerHTML = '';
    
        sortedWeapons.forEach(card => {
            weaponContainer.appendChild(card);
        });
    },

    /**
     * Listen to the click on the sort-by button to display the options
     */
    toggleSortButton() {
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