const app = {
    
    init() {
        app.filterWeapons();
    },

    filterWeapons() {
        const searchInput = document.querySelector('.search-bar');
        const weaponCards = document.querySelectorAll('.weapon-card');
    
        searchInput.addEventListener('input', () => {
            const searchText = searchInput.value.toLowerCase();
    
            weaponCards.forEach(card => {
                const weaponName = card.querySelector('.name').textContent.toLowerCase();
                if (weaponName.includes(searchText)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
}

document.addEventListener('DOMContentLoaded', app.init);
