const weapon = {

    weaponCards: document.querySelectorAll('.weapon-card'),
    
    init() {
        weapon.filterWeapons();
        weapon.searchWeapons();
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
    
        categoryButtons.forEach(button => {
            button.addEventListener('click', () => {
                button.classList.toggle('selected');
                weapon.toggleSelection(button, categoryButtons);
                weapon.applyFilters(categoryButtons, ammoButtons);
            });
        });
    
        ammoButtons.forEach(button => {
            button.addEventListener('click', () => {
                button.classList.toggle('selected');
                weapon.toggleSelection(button, ammoButtons);
                weapon.applyFilters(categoryButtons, ammoButtons);
            });
        });
    },

    /**
     * Toggle classList 'selected' if clicked button
     * 
     * @param {HTMLElement} button - Clicked button
     * @param {HTMLElements} buttons - Buttons list
     */
    toggleSelection(button, buttons) {
        buttons.forEach(btn => {
            if (btn === button) {
                btn.classList.add('selected');
            } else {
                btn.classList.remove('selected');
            }
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

            categoryButtons.forEach(btn => {
                if (btn.classList.contains('selected')) {
                    selectedCategories.push(btn.textContent.toLowerCase());
                }
            });
        
            ammoButtons.forEach(btn => {
                if (btn.classList.contains('selected')) {
                    selectedAmmoTypes.push(btn.textContent.toLowerCase());
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

            if(!resultFound) {
                weapon.createNoResultsFoundMessage(); 
            } else {
                weapon.hideNoResultsFoundMessage();
            }
        });
    },

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

            if(!resultFound) {
                weapon.createNoResultsFoundMessage(); 
            } else {
                weapon.hideNoResultsFoundMessage();
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
    },

    //----------------------------
    //---- FUNCTIONS SORT BY -----
    //----------------------------

};

document.addEventListener('DOMContentLoaded', weapon.init);