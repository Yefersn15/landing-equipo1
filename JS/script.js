function toggleBuscador() {
    var input = document.querySelector(".buscador input");
    if (input.style.display === "none" || input.style.display === "") {
        input.style.display = "block";
        input.focus();
    } else {
        input.style.display = "none"; 
    }
}

let lastScrollTop = 0;
let header = document.querySelector(".encabezado");
let barraAnuncios = document.querySelector(".barra-anuncios");

window.addEventListener("scroll", function() {
    let currentScroll = window.scrollY;

    if (currentScroll > lastScrollTop) {
        // Ocultar barra y encabezado al hacer scroll hacia abajo
        header.style.top = "-80px";
        barraAnuncios.style.top = "-80px";
    } else {
        // Mostrar barra y encabezado al hacer scroll hacia arriba
        header.style.top = "27px";
        barraAnuncios.style.top = "0px";
    }
    lastScrollTop = currentScroll;
});
