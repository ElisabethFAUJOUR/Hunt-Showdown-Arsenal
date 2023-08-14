const consu = {
    
    init() {
        consu.searchConsumables();
    },

    //---------------------------
    //---- FUNCTIONS FILTER -----
    //---------------------------

    /**
     * Listen to the text put in the search bar and filter the weapons including the text
     */
    searchConsumables() {
        const searchInput = document.querySelector('.search-bar');
        const consumableCards = document.querySelectorAll('.consumable-card');
    
        searchInput.addEventListener('input', () => {
            const searchText = searchInput.value.toLowerCase();
    
            consumableCards.forEach(card => {
                const consumableName = card.querySelector('.name').textContent.toLowerCase();
                if (consumableName.includes(searchText)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
};

document.addEventListener('DOMContentLoaded', consu.init);