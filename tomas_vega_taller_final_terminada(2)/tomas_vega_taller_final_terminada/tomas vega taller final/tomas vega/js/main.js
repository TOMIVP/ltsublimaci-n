// PRODUCTOS
const productos = [
    // Abrigos
    {
        id: "VasoBlanco",
        titulo: "Vaso Blanco",
        imagen: "./img/vasos 3.jpeg",
        categoria: {
            nombre: "VasoBlanco",
            id: "VasoBlanco"
        },
        precio: 20000
    },
    {
        id: "VasoBlanco",
        titulo: "Vaso Blanco",
        imagen: "./img/vaso 5.jpeg",
        categoria: {
            nombre: "VasoBlancoanime",
            id: "VasoBlanco"
        },
        precio: 20000
    },

        {
        id: "VasoBlanco",
        titulo: "Vaso Blanco",
        imagen: "./img/vaso blanco toni.jpeg",
        categoria: {
            nombre: "VasoBlancosuperheroe",
            id: "VasoBlanco"
        },
        precio: 20000
    },
    // Vaso fondo color
    {
        id: "vasofondocolor",
        titulo: "Vaso fondo color",
        imagen: "./img/VASO6.jpeg",
        categoria: {
            nombre: "Vasofondocolor",
            id: "VasosFondocolor"
        },
        precio: 22000
    },
    {
        id: "vasofondocolor",
        titulo: "Vaso fondo color",
        imagen: "./img/vaso00.jpeg",
        categoria: {
            nombre: "Vasofondocolor",
            id: "VasosFondocolor"
        },
        precio: 22000
    },
    {
        id: "vasofondocolor",
        titulo: "Vaso fondo color",
        imagen: "./img/vasos1.jpeg",
        categoria: {
            nombre: "Vasofondocolor",
            id: "VasosFondocolor"
        },
        precio: 23000
    },
            {
        id: "vasofondocolor",
        titulo: "Vaso fondo color",
        imagen: "./img/vaso.jpeg",
        categoria: {
            nombre: "Vasofondocolor",
            id: "VasosFondocolor"
        },
        precio: 22000
    },
    // Lamina
    {
        id: "pantalon-01",
        titulo: "Laminas en aluminio sublimadas",
        imagen: "./img/laminagojo.jpeg",
        categoria: {
            nombre: "Laminasenaluminiosublimadas",
            id: "Laminasenaluminiosublimadas"
        },
        precio: 15000
    },
    {
        id: "pantalon-01",
        titulo: "Laminas en aluminio sublimadas",
        imagen: "./img/lamina02.JPG",
        categoria: {
            nombre: "Laminasenaluminiosublimadas",
            id: "Laminasenaluminiosublimadas"
        },
        precio: 15000
    },
    {
        id: "pantalon-01",
        titulo: "Laminas en aluminio sublimadas",
        imagen: "./img/lamina.jpeg",
        categoria: {
            nombre: "Laminasenaluminiosublimadas",
            id: "Laminasenaluminiosublimadas"
        },
        precio: 15000
    },
    {
        id: "pantalon-01",
        titulo: "Laminas en aluminio sublimadas",
        imagen: "./img/laminapro.jpeg",
        categoria: {
            nombre: "Laminasenaluminiosublimadas",
            id: "Laminasenaluminiosublimadas"
        },
        precio: 15000
    },
    {
        id: "pantalon-01",
        titulo: "Laminas en aluminio sublimadas",
        imagen: "./img/laminacur.jpeg",
        categoria: {
            nombre: "Laminasenaluminiosublimadas",
            id: "Laminasenaluminiosublimadas"
        },
        precio: 15000
    },

];

const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");

function cargarProductos(productosElegidos) {

    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto => {

        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">$${producto.precio}</p>
                <button class="producto-agregar" id="${producto.id}">Agregar</button>
            </div>
        `;

        contenedorProductos.append(div);
    })

    actualizarBotonesAgregar();
}

cargarProductos(productos);

botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {

        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if (e.currentTarget.id != "todos") {
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText = productoCategoria.categoria.nombre;
            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosBoton);
        } else {
            tituloPrincipal.innerText = "Todos los productos";
            cargarProductos(productos);
        }

    })
});

function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito();
} else {
    productosEnCarrito = [];
}

function agregarAlCarrito(e) {
    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if(productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }

    actualizarNumerito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}
