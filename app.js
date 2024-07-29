const burger= document.querySelector(".burger")
const sidebar= document.querySelector(".links")
const links= document.querySelectorAll(".links li a")

burger.addEventListener("click", toggleSidebar)

links.forEach(link => {
    link.addEventListener("click", toggleSidebar)
})

function toggleSidebar(){
    sidebar.classList.toggle("show")
}

//Loader
document.addEventListener("DOMContentLoaded", function() {
    const loader = document.querySelector('.loader-container');
    const minimumLoadingTime = 4000; // tiempo en milisegundos-->4s
    let pageLoaded = false;

    // Verifica si la página ya se cargó completamente
    window.addEventListener("load", function() {
        pageLoaded = true;
    });

   
    setTimeout(function() {
        if (pageLoaded) {
            loader.style.display = 'none';
        } else {
            
            window.addEventListener("load", function() {
                loader.style.display = 'none';
            });
        }
    }, minimumLoadingTime);
});

//para header responsive 
let lastScrollTop = 0;
const header = document.getElementById('header');

window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop) {
        // Desplazando hacia abajo
        header.style.top = '-112px'; // Ajusta según la altura del header
    } else {
        // Desplazando hacia arriba
        header.style.top = '0';
    }
    lastScrollTop = scrollTop;
});


//para interactuar con las estrellas
document.querySelectorAll(".rating").forEach((ratingEl) => {
    const starsEl = ratingEl.querySelectorAll(".fa-star");
    updateRating(starsEl, 0);

    starsEl.forEach((starEl, index) => {
        starEl.addEventListener("click", () => updateRating(starsEl, index));
    });
});

function updateRating(starsEl, index) {
    starsEl.forEach((starEl, idx) => {
        if (idx < index + 1) {
            starEl.classList.add("active");
        } else {
            starEl.classList.remove("active");
        }
    });
}
//para interactuar con las estrellas