const consu = {
    
    init() {
        consu.searchConsummables();
    },

    //---------------------------
    //---- FUNCTIONS FILTER -----
    //---------------------------

    /**
     * Listen to the text put in the search bar and filter the weapons including the text
     */
    searchConsummables() {
        const searchInput = document.querySelector('.search-bar');
        const consummableCards = document.querySelectorAll('.consummable-card');
    
        searchInput.addEventListener('input', () => {
            const searchText = searchInput.value.toLowerCase();
    
            consummableCards.forEach(card => {
                const consummableName = card.querySelector('.name').textContent.toLowerCase();
                if (consummableName.includes(searchText)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
};

document.addEventListener('DOMContentLoaded', consu.init);