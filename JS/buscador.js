// Variable para almacenar la última posición del scroll
let lastScrollTop = 0;

// Seleccionamos el encabezado y la barra de anuncios
let header = document.querySelector(".encabezado");
let barraAnuncios = document.querySelector(".barra-anuncios");

// Evento que detecta el desplazamiento de la página
window.addEventListener("scroll", function () {
    let currentScroll = window.scrollY; // Obtiene la posición actual del scroll

    if (currentScroll > lastScrollTop) {
        // Si el usuario hace scroll hacia abajo, ocultamos el encabezado y la barra
        header.style.top = "-80px";
        barraAnuncios.style.top = "-80px";
    } else {
        // Si el usuario hace scroll hacia arriba, los mostramos nuevamente
        header.style.top = "27px";
        barraAnuncios.style.top = "0px";
    }

    // Actualizamos la última posición del scroll
    lastScrollTop = currentScroll;
});

// Función para mostrar u ocultar el menú de navegación con el encabezado correcto
function toggleMenu(id = null) {
    var menu = document.getElementById("menu"); // Contenedor del menú
    var menuHeader = document.getElementById("menu-header"); // Contenedor del header en el menú
    var menuContent = document.getElementById("menu-content"); // Contenido dinámico del menú
    var mainHeader = document.querySelector(".encabezado"); // Encabezado principal

    // Si el encabezado del menú aún no tiene contenido, clonamos solo lo necesario
    if (!menuHeader.hasChildNodes()) {
        var clonedLogo = mainHeader.querySelector(".logo").cloneNode(true);
        var clonedNav = mainHeader.querySelector(".menu-navegacion").cloneNode(true);

        menuHeader.appendChild(clonedLogo);
        menuHeader.appendChild(clonedNav);
    }

    // Alternamos la visibilidad del menú
    menu.classList.toggle("active");

    if (menu.classList.contains("active")) {
        menu.style.display = "flex";

        if (id) {
            var section = document.getElementById(id);
            if (section) {
                menuContent.innerHTML = section.innerHTML;
            } else {
                console.error("Sección no encontrada:", id);
                menuContent.innerHTML = `<li>Sección no encontrada</li>`;
            }
        }
    } else {
        setTimeout(() => (menu.style.display = "none"), 300);
    }
}

function toggleBuscador() {
    var input = document.querySelector(".buscador input");
    if (input.style.display === "none" || input.style.display === "") {
        input.style.display = "block";
        input.focus();
    } else {
        input.style.display = "none";
    }
}