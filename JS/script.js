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
        header.style.top = "-80px";
        barraAnuncios.style.top = "-80px";
    } else {
        header.style.top = "27px";
        barraAnuncios.style.top = "0px";
    }
    lastScrollTop = currentScroll;
});