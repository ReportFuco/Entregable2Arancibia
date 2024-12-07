

let carrito = []; 


function agregarProducto(event) {
    const boton = event.target;
    const nombre = boton.getAttribute('data-nombre');
    const precio = parseInt(boton.getAttribute('data-precio'));

 
    const producto = { nombre, precio };


    carrito.push(producto);

    localStorage.setItem('carrito', JSON.stringify(carrito));

    actualizarCarrito();

    console.log(`Producto agregado: ${nombre}, Precio: ${precio}`);
}

function actualizarCarrito() {
    const carritoContainer = document.getElementById('carrito');
    carritoContainer.innerHTML = ''; 

    if (carrito.length === 0) {
        carritoContainer.innerHTML = '<p class="text-center">No hay productos en el carrito</p>';
        return;
    }

    carrito.forEach((producto, index) => {
        const productoHTML = `
            <div class="d-flex justify-content-between align-items-center mb-2">
                <p>${producto.nombre} - $${producto.precio}</p>
                <button class="btn btn-danger btn-sm eliminar-producto" data-index="${index}">Eliminar</button>
            </div>
        `;
        carritoContainer.innerHTML += productoHTML;
    });


    const botonesEliminar = document.querySelectorAll('.eliminar-producto');
    botonesEliminar.forEach((boton) =>
        boton.addEventListener('click', eliminarProducto)
    );
}


function eliminarProducto(event) {
    const index = event.target.getAttribute('data-index');
    carrito.splice(index, 1); 


    localStorage.setItem('carrito', JSON.stringify(carrito));


    actualizarCarrito();

    console.log(`Producto en el índice ${index} eliminado`);
}


function inicializar() {
    console.log("Inicializando el carrito...");


    const carritoGuardado = JSON.parse(localStorage.getItem('carrito'));
    if (Array.isArray(carritoGuardado)) {
        carrito = carritoGuardado;
    } else {
        carrito = [];
    }


    actualizarCarrito();


    const botonesAgregar = document.querySelectorAll('.agregar-carrito');
    console.log(`Botones encontrados: ${botonesAgregar.length}`);
    botonesAgregar.forEach((boton) =>
        boton.addEventListener('click', agregarProducto)
    );
}


window.addEventListener('DOMContentLoaded', inicializar);
