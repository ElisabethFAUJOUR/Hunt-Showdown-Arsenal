import app from './app.js';


const weapon = {

    /* Weapon card element */
    weaponCards: document.querySelectorAll('.weapon-card'),

    /* Array for all weapon cards */
    weaponCardsArray: [],

    init() {
        weapon.weaponCardsArray = Array.from(document.querySelectorAll('.weapon-card'));
        weapon.filterWeapons();
        app.searchCards(weapon.weaponCards);
        app.toggleSortButton();
        weapon.sortWeapons();
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
        let resultFound = false;

        weapon.weaponCards.forEach(card => {
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
                app.createNoResultsFoundMessage();
            } else {
                app.hideNoResultsFoundMessage();
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

    //----------------------------
    //---- FUNCTIONS SORT BY -----
    //----------------------------          
    
    /**
     * Sort weapons by sorting option
     */
    sortWeapons() {
        const sortOptions = document.querySelectorAll('.sort-option-btn');
    
        sortOptions.forEach(option => {
            option.addEventListener('click', () => {
                const sortType = option.getAttribute('data-sort');
                app.sortDirection = app.toggleSortDirection(app.sortDirection);
                const newSortDirection = app.sortDirection;
                if (sortType === "reset") {
                    const weaponsContainer = document.querySelector('.cards-container');
                    weaponsContainer.innerHTML = ''; 
                    weapon.weaponCardsArray.forEach(card => {
                        weaponsContainer.appendChild(card);
                    });
                } else {
                    app.sortCards(weapon.weaponCardsArray, newSortDirection, sortType);
                }
            });
        });
    }
};

document.addEventListener('DOMContentLoaded', weapon.init);