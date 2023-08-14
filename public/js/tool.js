const tool = {
    
    init() {
        tool.searchTools();
    },

    //---------------------------
    //---- FUNCTIONS FILTER -----
    //---------------------------

    /**
     * Listen to the text put in the search bar and filter the weapons including the text
     */
    searchTools() {
        const searchInput = document.querySelector('.search-bar');
        const toolCards = document.querySelectorAll('.tool-card');
    
        searchInput.addEventListener('input', () => {
            const searchText = searchInput.value.toLowerCase();
    
            toolCards.forEach(card => {
                const toolName = card.querySelector('.name').textContent.toLowerCase();
                if (toolName.includes(searchText)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
};

document.addEventListener('DOMContentLoaded', tool.init);