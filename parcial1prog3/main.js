// array frutas
let frutas = [
    { id: 5, nombre: "frutilla", precio: 3000, img: "img/frutilla.jpg" },
    { id: 8, nombre: "manzana", precio: 1500, img: "img/manzana.jpg" },
    { id: 1, nombre: "anana", precio: 3000, img: "img/anana.jpg" },
    { id: 2, nombre: "arandano", precio: 5000, img: "img/arandano.jpg" },
    { id: 3, nombre: "banana", precio: 1000, img: "img/banana.jpg" },
    { id: 4, nombre: "frambuesa", precio: 4000, img: "img/frambuesa.png" },
    { id: 6, nombre: "kiwi", precio: 2000, img: "img/kiwi.jpg" },
    { id: 7, nombre: "mandarina", precio: 800, img: "img/mandarina.jpg" },
    { id: 9, nombre: "naranja", precio: 9000, img: "img/naranja.jpg" },
    { id: 10, nombre: "pera", precio: 2500, img: "img/pera.jpg" },
    { id: 11, nombre: "pomelo-amarillo", precio: 2000, img: "img/pomelo-amarillo.jpg" },
    { id: 12, nombre: "pomelo-rojo", precio: 2000, img: "img/pomelo-rojo.jpg" },
    { id: 13, nombre: "sandia", precio: 6000, img: "img/sandia.jpg" }
];

let alumno = { nombre: "rosario", apellido: "romero", dni: "47.298.731" };

// Variables para simplificar la lectura de lineas //

let productoContainer = document.querySelector(".contenedor-productos");
let barraBusqueda = document.querySelector(".barra-busqueda");
let itemsCarrito = document.getElementById("items-carrito");
let contadorCarrito = document.getElementById("contador-carrito");
let precioTotal = document.getElementById("precio-total");

let carrito = [];

///////////////////////////////
// Funcion mostrar Productos //
function mostrarProductos(array) {
    let cartaProducto = "";
    for (let i = 0; i < array.length; i++) {    /////////// crea la tarjeta de cada producto y la muestra
        cartaProducto += `<div class="card-producto">
                <img src="${array[i].img}" alt="">
                <h3>${array[i].nombre}</h3>
                <p>$${array[i].precio}</p>
                <button onclick="agregarCarrito(${array[i].id})" >Agregar al carrito</button>
            </div>`;

    }

    productoContainer.innerHTML = cartaProducto;
}

////////////////////////////////
// Filtrar por input busqueda //
barraBusqueda.addEventListener("keyup", function () { 

    let valorInput = barraBusqueda.value.toLowerCase();   
    console.log(valorInput);
    let productosFiltrados = frutas.filter(fruta => fruta.nombre.toLowerCase().includes(valorInput)); // creo el array de los productos que coinciden con la busqueda
    mostrarProductos(productosFiltrados); 
});

//////////////////////////////////////////////
// ordena la lista de productos de la A a la Z
function ordenarAZ() {
    frutas.sort((a, b) => a.nombre.localeCompare(b.nombre));
    mostrarProductos(frutas);
}

///////////////////////////////
// ordena la lista de productos de menor a mayor precio
function ordenarMenorMayorPrecio() {
    frutas.sort((a, b) => a.precio - b.precio);
    mostrarProductos(frutas);
}


//////////////////////////////////////////////////////////////////////////////////////////////
// Agrega un producto del carrito por su id, lo ordena, guarda en localStorage y actualiza
function agregarCarrito(id) {
    console.log(`El id del producto es: ${id}`);
    let nuevoProducto = frutas.find(producto => producto.id === id); // Si el producto está en la tienda lo carga
    console.log(nuevoProducto);
    carrito.push(nuevoProducto);

    console.log(carrito);
    carrito.sort((a, b) => a.nombre.localeCompare(b.nombre)); // ordeno el carrito alfabeticamente para que las mismas frutas queden juntas
    guardarCarritoLocalStorage();
    mostrarCarrito();
    totalItemsCarrito(); // cambio el contador de items en el carrito

}


//////////////////////////////////////////////////////////////////////////////////////////////
// Elimina un producto del carrito por su índice, lo ordena, guarda en localStorage y actualiza
function eliminarItemCarrito(indice) {
    console.log(`eliminmos ${carrito[indice].nombre}`);
    carrito.splice(indice, 1); // elimino el elemento en el indice
    carrito.sort((a, b) => a.nombre.localeCompare(b.nombre)); // ordeno el carrito alfabeticamente para que las mismas frutas queden juntas
    guardarCarritoLocalStorage();
    mostrarCarrito();
    totalItemsCarrito(); // cambio el contador de items en el carrito
}


//////////////////////
// Vacía el carrito //
function borrarCarrito() {
    let largo = carrito.length;
    for (let index = 0; index < largo; index++) {
        carrito.pop();
        mostrarCarrito();
    }
    localStorage.removeItem("carrito")
    console.log(carrito);
}


/////////////////////////////////////////
// Funcion Mostrar carrito en pantalla //
function mostrarCarrito() {
    let listaCarrito = "";
    carrito.forEach((item, indice) => {     // En cada iteracion agrego un bloque con sus atributos
        listaCarrito += `
        <li class="bloque-item">
            <p class="nombre-item">${item.nombre} - $${item.precio}</p>
            <button class="boton-eliminar" onclick="eliminarItemCarrito(${indice})">Eliminar</button>
        </li>`

    });

    itemsCarrito.innerHTML = listaCarrito;
    totalCarrito();
}


//////////////////////////////////////////////////////////////////////////////////
// Suma el precio de todos los items del carrito, actualiza y devuelve el total //
function totalCarrito() {
    let total = carrito.reduce((suma, item) => suma + item.precio, 0);
    precioTotal.innerHTML = `$${total}`;
    return total;
}

//////////////////////////////////////////////////////////
// Cuenta y actualiza la cantidad de productos comprados//
function totalItemsCarrito() {
    contadorCarrito.innerHTML = `<span id="contador-carrito">${carrito.length}</span>`;
}
////////////////////////////////////////////
// Funciones para manejar el Local Storage //
function guardarCarritoLocalStorage() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}
function cargarCarritoLocalStorage() {
    let carritoGuardado = localStorage.getItem("carrito");
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
        mostrarCarrito();
    }
}

///////////////////////////////
// Imprimir datos del alumno //
function imprimirDatosAlumno() {
    let queryNombreAlumno = document.querySelector(".nombreAlumno");
    let parrafoDatosAlumno = `<p>${alumno.nombre} </p>`;
    console.log(`${alumno.nombre} ${alumno.apellido}, ${alumno.dni}`);
    queryNombreAlumno.innerHTML = parrafoDatosAlumno;
}

////////////////////////////
// Funcion inicializadora //
function init() {
    imprimirDatosAlumno();
    mostrarProductos(frutas);
    cargarCarritoLocalStorage();
    totalItemsCarrito();
}

init();