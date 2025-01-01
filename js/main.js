let carrito = [];


function cargarProductos() {
  fetch('../assets/data/productos.json')
    .then((response) => response.json())
    .then((productos) => {
      console.log('Productos cargados:', productos);
      generarMenu(productos);
    })
    .catch((error) => console.error('Error al cargar los productos:', error));
}


function generarMenu(productos) {
  const menuContainer = document.getElementById('menu-container');
  menuContainer.innerHTML = '';

  productos.forEach((producto) => {
    const productoHTML = `
      <div class="col-md-6 col-lg-4">
        <div class="card h-100 shadow-sm">
          <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
          <div class="card-body text-center">
            <h3 class="card-title">${producto.nombre}</h3>
            <p class="card-text">${producto.descripcion}</p>
            <p class="card-text fw-bold">$${producto.precio}</p>
            <button class="btn btn-primary agregar-carrito" 
                    data-nombre="${producto.nombre}" 
                    data-precio="${producto.precio}">
              Agregar al carrito
            </button>
          </div>
        </div>
      </div>
    `;
    menuContainer.innerHTML += productoHTML;
  });

  
  const botonesAgregar = document.querySelectorAll('.agregar-carrito');
  botonesAgregar.forEach((boton) =>
    boton.addEventListener('click', agregarProducto)
  );
}


function agregarProducto(event) {
  const boton = event.target;
  const nombre = boton.getAttribute('data-nombre');
  const precio = parseInt(boton.getAttribute('data-precio'));

  const producto = { nombre, precio };
  carrito.push(producto);

  localStorage.setItem('carrito', JSON.stringify(carrito));

  actualizarCarrito();

  Swal.fire({
    title: 'Producto agregado',
    text: `${nombre} ha sido añadido al carrito.`,
    icon: 'success',
    confirmButtonText: 'OK',
  });
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

  Swal.fire({
    title: 'Producto eliminado',
    text: `El producto ha sido eliminado del carrito.`,
    icon: 'info',
    confirmButtonText: 'OK',
  });
}


function inicializar() {
  console.log('Inicializando la aplicación...');

  const carritoGuardado = JSON.parse(localStorage.getItem('carrito'));
  if (Array.isArray(carritoGuardado)) {
    carrito = carritoGuardado;
  } else {
    carrito = [];
  }

  actualizarCarrito();
  cargarProductos();
}

window.addEventListener('DOMContentLoaded', inicializar);