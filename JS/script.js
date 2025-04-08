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
let producto = document.querySelector(".Producto");

window.addEventListener("scroll", function() {
    let currentScroll = window.scrollY;

    if (currentScroll > lastScrollTop) {
        barraAnuncios.style.top = "-80px";
        header.style.top = "-80px";
    } else {
        barraAnuncios.style.top = "0px";
        header.style.top = "27px";
    }
    lastScrollTop = currentScroll;
});