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
    const minimumLoadingTime = 3000; // tiempo en milisegundos-->1s
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

document.querySelectorAll(".rating").forEach((ratingEl) => {
    const starsEl = ratingEl.querySelectorAll(".fa-star");
    
    // Inicializar el rating
    updateRating(starsEl, 0);

    // Añadir eventos a cada estrella
    starsEl.forEach((starEl, index) => {
        // Evento click/touchstart para marcar las estrellas
        starEl.addEventListener("click", () => updateRating(starsEl, index));
        starEl.addEventListener("touchstart", () => updateRating(starsEl, index), { passive: true });

        // Evento hover/touchstart para mostrar las estrellas en hover/touch de izquierda a derecha
        starEl.addEventListener("mouseover", () => updateHover(starsEl, index));
        starEl.addEventListener("touchstart", () => updateHover(starsEl, index), { passive: true });

        // Eliminar el efecto hover cuando el mouse sale o se retira el dedo
        starEl.addEventListener("mouseout", () => removeHover(starsEl));
        starEl.addEventListener("touchend", () => removeHover(starsEl), { passive: true });
    });
});

// Función para actualizar las estrellas activadas al hacer clic o tocar
function updateRating(starsEl, index) {
    starsEl.forEach((starEl, idx) => {
        if (idx <= index) {
            starEl.classList.add("active");
        } else {
            starEl.classList.remove("active");
        }
    });
}

// Función para aplicar el hover o toque solo a las estrellas no activadas
function updateHover(starsEl, index) {
    starsEl.forEach((starEl, idx) => {
        if (!starEl.classList.contains("active") && idx <= index) {
            starEl.classList.add("hovered");
        }
    });
}

// Función para eliminar el hover cuando el mouse o toque termina
function removeHover(starsEl) {
    starsEl.forEach(starEl => {
        starEl.classList.remove("hovered");
    });
}
document.querySelectorAll('.btns a').forEach(btn => {
    const iconClass = btn.querySelector('i').classList;
  
    if (iconClass.contains('fa-github')) {
      btn.setAttribute('data-tooltip', 'GitHub');
    } else if (iconClass.contains('fa-code')) {
      btn.setAttribute('data-tooltip', 'Ver Código');
    }
  });