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
let barraAnuncios = document.querySelector(".barra-anuncios");
let encabezado = document.querySelector(".encabezado");
let producto = document.querySelector(".producto-top");

window.addEventListener("scroll", function () {
  let currentScroll = window.scrollY;

  if (currentScroll > lastScrollTop) {
    barraAnuncios.style.top = "-80px";
    encabezado.style.top = "-80px";
    producto.style.top = "-80px";
  } else {
    barraAnuncios.style.top = "0px";
    encabezado.style.top = "27px";
    producto.style.top = "90px";
  }

  lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});

var miniaturas = document.querySelectorAll('.miniatura');
var contenedorPrincipal = document.querySelector('.imagen-principal');

for (var i = 0; i < miniaturas.length; i++) {
  var miniatura = miniaturas[i];

  miniatura.onclick = function () {
    for (var j = 0; j < miniaturas.length; j++) {
      miniaturas[j].classList.remove('activa');
    }
    this.classList.add('activa');

    contenedorPrincipal.innerHTML = '';

    var imagen = this.querySelector('img');
    var video = this.querySelector('video');

    if (imagen) {
      var nuevaImagen = document.createElement('img');
      nuevaImagen.src = imagen.src;
      nuevaImagen.alt = imagen.alt || '';
      contenedorPrincipal.appendChild(nuevaImagen);
    } else if (video) {
      var nuevoVideo = document.createElement('video');
      nuevoVideo.src = video.src;
      nuevoVideo.autoplay = true;
      nuevoVideo.loop = true;
      nuevoVideo.muted = true;
      nuevoVideo.playsInline = true; // útil para móviles
      contenedorPrincipal.appendChild(nuevoVideo);
    }
  };
}