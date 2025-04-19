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


// Función para cargar los datos del JSON
async function cargarProductos() {
    try {
        // Cargamos el JSON desde la carpeta /datos
        const respuesta = await fetch('js/datos/productos.json');
        
        // Verificamos si la respuesta es correcta
        if (!respuesta.ok) {
            throw new Error(`Error HTTP: ${respuesta.status}`);
        }
        
        // Convertimos la respuesta a JSON
        const datos = await respuesta.json();
        return datos.productos;
    } catch (error) {
        console.error('Error al cargar los productos:', error);
        
        // En caso de error, mostramos un mensaje en la consola y devolvemos un array vacío
        console.log('Asegúrate de que el archivo /datos/productos.json existe y es accesible');
        return [];
    }
}

// Función para crear una card de producto
function crearCardProducto(producto) {
    // Crear elementos
    const productoDiv = document.createElement('div');
    productoDiv.className = 'producto';
    
    // Agregar corazón de favoritos
    const corazonDiv = document.createElement('div');
    corazonDiv.className = 'corazon';
    
    const corazonButton = document.createElement('button');
    const corazonImg = document.createElement('img');
    corazonImg.src = "https://assets.lego.com/icons/v7.3.0/heart.svg";
    corazonImg.alt = "Favorito";
    corazonButton.appendChild(corazonImg);
    corazonDiv.appendChild(corazonButton);
    
    // Agregar enlace con imagen del producto
    const enlaceProducto = document.createElement('a');
    enlaceProducto.href = producto.enlace || "#";
    
    const imagenProducto = document.createElement('img');
    imagenProducto.src = producto.imagen;
    imagenProducto.alt = producto.nombre;
    // Imagen de respaldo en caso de error
    imagenProducto.onerror = function() {
        this.src = 'https://via.placeholder.com/250x250?text=Imagen+no+disponible';
    };
    
    enlaceProducto.appendChild(imagenProducto);
    
    // Agregar sección de puntuación
    const puntuacionDiv = document.createElement('div');
    puntuacionDiv.className = 'puntuacion';
    
    // Edad
    const edadImg = document.createElement('img');
    edadImg.src = "https://assets.lego.com/icons/v7.3.0/birthday-cake.svg";
    edadImg.alt = "Edad";
    const edadSpan = document.createElement('span');
    edadSpan.textContent = producto.edad || "";
    
    // Piezas
    const piezasImg = document.createElement('img');
    piezasImg.src = "https://assets.lego.com/icons/v7.3.0/brick-one-by-one-iso.svg";
    piezasImg.alt = "Piezas";
    const piezasSpan = document.createElement('span');
    piezasSpan.textContent = producto.piezas || "";
    
    // Calificación
    const calificacionImg = document.createElement('img');
    calificacionImg.src = "IMG/star-smile-fill.svg";
    calificacionImg.alt = "Calificación";
    const calificacionSpan = document.createElement('span');
    calificacionSpan.textContent = producto.calificacion || "";
    
    // Agregar elementos a puntuación
    puntuacionDiv.appendChild(edadImg);
    puntuacionDiv.appendChild(edadSpan);
    puntuacionDiv.appendChild(piezasImg);
    puntuacionDiv.appendChild(piezasSpan);
    puntuacionDiv.appendChild(calificacionImg);
    puntuacionDiv.appendChild(calificacionSpan);
    
    // Agregar nombre del producto con enlace
    const textoEnlace = document.createElement('a');
    textoEnlace.className = 'text_link';
    textoEnlace.href = producto.enlace || "#";
    
    const textoSpan = document.createElement('span');
    textoSpan.className = 'text';
    textoSpan.textContent = producto.nombre;
    
    textoEnlace.appendChild(textoSpan);
    
    // Agregar precio
    const precioDiv = document.createElement('div');
    precioDiv.className = 'precio';
    precioDiv.textContent = `$${producto.precio.toFixed(2)}`;
    
    // Agregar botón de comprar
    const botonComprar = document.createElement('button');
    botonComprar.className = 'boton-comprar';
    
    const bolsaImg = document.createElement('img');
    bolsaImg.src = "https://assets.lego.com/icons/v7.3.0/shopping-bag.svg";
    bolsaImg.alt = "Bolsa de compras";
    
    botonComprar.appendChild(bolsaImg);
    botonComprar.appendChild(document.createTextNode("Añadir a la Bolsa"));
    
    // Construir la estructura completa del producto
    productoDiv.appendChild(corazonDiv);
    productoDiv.appendChild(enlaceProducto);
    productoDiv.appendChild(puntuacionDiv);
    productoDiv.appendChild(textoEnlace);
    productoDiv.appendChild(precioDiv);
    productoDiv.appendChild(botonComprar);
    
    return productoDiv;
}

// Función para mostrar todos los productos en el contenedor
async function mostrarProductos() {
    const contenedorProductos = document.querySelector('.carrusel');
    
    if (!contenedorProductos) {
        console.error('No se encontró el contenedor del carrusel');
        return;
    }
    
    // Mostramos un mensaje de carga
    contenedorProductos.innerHTML = '<div>Cargando productos...</div>';
    
    const productos = await cargarProductos();
    
    // Limpiar el contenedor
    contenedorProductos.innerHTML = '';
    
    // Verificar si hay productos
    if (productos.length === 0) {
        contenedorProductos.innerHTML = '<div>No hay productos disponibles.</div>';
        return;
    }
    
    // Recorrer y añadir cada producto
    productos.forEach(producto => {
        const cardProducto = crearCardProducto(producto);
        contenedorProductos.appendChild(cardProducto);
    });
    
    // Agregar interactividad a los botones
    agregarInteractividad();
}

// Función para agregar interactividad a los botones
function agregarInteractividad() {
    // Función para los botones de favoritos
    document.querySelectorAll('.corazon button').forEach(boton => {
        boton.addEventListener('click', function() {
            const imagen = this.querySelector('img');
            if (imagen.src.includes('heart.svg')) {
                imagen.src = 'https://assets.lego.com/icons/v7.3.0/heart-fill.svg';
            } else {
                imagen.src = 'https://assets.lego.com/icons/v7.3.0/heart.svg';
            }
        });
    });
    
    // Función para los botones de comprar
    document.querySelectorAll('.boton-comprar').forEach(boton => {
        boton.addEventListener('click', function() {
            const nombreProducto = this.closest('.producto').querySelector('.text').textContent;
            alert(`Producto añadido a la bolsa: ${nombreProducto}`);
        });
    });
}

// Iniciar la carga de productos cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Si quieres utilizar los productos del JSON:
    mostrarProductos();
    
    // O si prefieres mantener los productos que ya están en el HTML
    // y solo agregar interactividad:
    // agregarInteractividad();
});