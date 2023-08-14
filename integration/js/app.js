const app = {
    
    init() {
        app.observeElements();
        console.log("Hello");
    },

    //---------------------------
    //---- FUNCTIONS SCROLL -----
    //---------------------------

    observeElements() {
        const fadeInElements = document.querySelectorAll(".fade-in");

        const options = {
            root: null,
            rootMargin: "0px",
            threshold: 0.2 
        };

        const observer = new IntersectionObserver((entries, observer) => { 
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                entry.target.classList.add("fade-in-visible");
                observer.unobserve(entry.target);
                }
            });
        }, options);

        fadeInElements.forEach(element => {
            observer.observe(element);
        });
    }

};

document.addEventListener('DOMContentLoaded', app.init);