const productos = [];

// Entrada y Salida
const entradaDatos = (mensaje) => prompt(mensaje).trim();
const consola = (mensaje) => alert(mensaje);

// Validaciones
const validarInt = (numero) => !isNaN(numero) && parseInt(numero) > 0;
const validarFloat = (numero) => !isNaN(numero) && parseFloat(numero) > 0;
const validarString = (texto) => typeof texto === 'string' && isNaN(texto) && texto.trim().length > 0;

const validarCampos = (categoria, nombre, cantidad, precio) => {
    if (!categoria || !nombre || !cantidad || !precio) {
        consola('Todos los campos son obligatorios.');
        return false;
    }
    if (!validarString(categoria)) {
        consola('La categoría debe ser un texto y no debe contener números.');
        return false;
    }
    if (!validarInt(cantidad)) {
        consola('La cantidad debe ser un número entero positivo.');
        return false;
    }
    if (!validarFloat(precio)) {
        consola('El precio debe ser un número positivo.');
        return false;
    }
    return true;
};

// POST
const agregarProducto = () => {
    const categoria = entradaDatos('Ingrese la categoría del producto:');
    const nombre = entradaDatos('Ingrese el nombre del producto:');
    let cantidad = entradaDatos('Ingrese la cantidad del producto:');
    let precio = entradaDatos('Ingrese el precio unitario del producto:');

    if (!validarCampos(categoria, nombre, cantidad, precio)) return;

    cantidad = parseInt(cantidad);
    precio = parseFloat(precio);

    if (confirm('¿Desea agregar el siguiente producto ' + nombre + '?')) {
        productos.push({ nombre, categoria, cantidad, precio });
        consola('Producto ' + nombre + ' agregado con éxito.');
        mostrarInventario();
    }
};

// UPDATE
const editarProducto = () => {
    const nombre = entradaDatos('Ingrese el nombre del producto a editar:');
    const producto = productos.find(p => p.nombre.toLowerCase() === nombre.toLowerCase());

    if (!producto) {
        consola('Producto no encontrado.');
        return;
    }

    let nuevaCantidad = entradaDatos('Ingrese la nueva cantidad del producto (actual: ' + producto.cantidad + '):');
    let nuevoPrecio = entradaDatos('Ingrese el nuevo precio unitario del producto (actual: ' + producto.precio + '):');

    if (nuevaCantidad !== "") {
        if (!validarInt(nuevaCantidad)) {
            consola('La cantidad debe ser un número entero positivo.');
            return;
        }
        producto.cantidad = parseInt(nuevaCantidad);
    }

    if (nuevoPrecio !== "") {
        if (!validarFloat(nuevoPrecio)) {
            consola('El precio debe ser un número positivo.');
            return;
        }
        producto.precio = parseFloat(nuevoPrecio);
    }

    if (confirm('¿Desea editar el producto ' + nombre + '?')) {
        consola('Producto ' + nombre + ' editado con éxito.');
        mostrarInventario();
    }
};

// DELETE
const eliminarProducto = () => {
    const categoria = entradaDatos('Ingrese la categoría del producto a eliminar:').toLowerCase();
    if (!validarString(categoria)) {
        consola('La categoría debe ser un texto.');
        return;
    }
    
    const productosCategoria = productos.filter(p => p.categoria.toLowerCase() === categoria);

    if (productosCategoria.length === 0) {
        consola('No se encontraron productos en esta categoría.');
        return;
    }

    let mensajeCategoria = 'Categoría: ' + categoria + '\n';
    const nombre = entradaDatos(mensajeCategoria + 'Ingrese el nombre del producto a eliminar:').toLowerCase();
    const producto = productosCategoria.find(p => p.nombre.toLowerCase() === nombre.toLowerCase());

    if (!producto) {
        consola('No se encontró el producto con el nombre ingresado en esta categoría.');
        return;
    }

    if (confirm('¿Desea eliminar el producto ' + producto.nombre + '?')) {
        productos.splice(productos.indexOf(producto), 1);
        consola('Producto ' + producto.nombre + ' eliminado con éxito.');
        mostrarInventario();
    }
};

// GET
const buscarProducto = () => {
    const categoria = entradaDatos('Ingrese la categoría del producto a buscar:').toLowerCase();
    if (!validarString(categoria)) {
        consola('La categoría debe ser una palabra.');
        return;
    }
    
    const productosCategoria = productos.filter(p => p.categoria.toLowerCase() === categoria);

    if (productosCategoria.length === 0) {
        consola('No se encontraron productos en esta categoría.');
        return;
    }

    let mensajeCategoria = 'Categoría: ' + categoria + '\n';
    const nombre = entradaDatos(mensajeCategoria + 'Ingrese el nombre del producto a buscar:').toLowerCase();
    const productosEncontrados = productosCategoria.filter(p => p.nombre.toLowerCase().includes(nombre));

    if (productosEncontrados.length === 0) {
        consola('No se encontraron productos que coincidan con el nombre proporcionado en esta categoría.');
        return;
    }

    let mensaje = "Productos encontrados en la categoría '" + categoria + "':\n";
    for (const producto of productosEncontrados) {
        mensaje += '\nNombre: ' + producto.nombre + '\nCategoría: ' + producto.categoria + '\nCantidad: ' + producto.cantidad + '\nPrecio Unitario: ' + producto.precio.toFixed(2) + '\n';
    }
    consola(mensaje);
};

// GET
const mostrarInventario = () => {
    if (productos.length === 0) {
        consola('El inventario está vacío.');
        console.log('El inventario está vacío.');
        return;
    }

    let mensaje = "Inventario:\n";
    productos.sort((a, b) => {
        if (a.categoria !== b.categoria) {
            return a.categoria.localeCompare(b.categoria);
        } else if (a.nombre !== b.nombre) {
            return a.nombre.localeCompare(b.nombre);
        } else if (a.precio !== b.precio) {
            return a.precio - b.precio;
        } else {
            return a.cantidad - b.cantidad;
        }
    });
    for (const producto of productos) {
        mensaje += '\nNombre: ' + producto.nombre + '\nCategoría: ' + producto.categoria + '\nCantidad: ' + producto.cantidad + '\nPrecio Unitario: ' + producto.precio.toFixed(2) + '\n';
    }
    console.table(productos);
    consola(mensaje);
};


const iniciarSimulador = () => {
    let opcion;
    while (opcion !== "6") {
        opcion = entradaDatos("Seleccione una opción:\n1. Agregar Producto\n2. Editar Producto\n3. Eliminar Producto\n4. Buscar Producto\n5. Mostrar Inventario\n6. Salir");

        switch (opcion) {
            case "1":
                agregarProducto();
                break;
            case "2":
                editarProducto();
                break;
            case "3":
                eliminarProducto();
                break;
            case "4":
                buscarProducto();
                break;
            case "5":
                mostrarInventario();
                break;
            case "6":
                if (confirm("¿Está seguro de que desea salir del simulador?")) {
                    mostrarMensaje("Saliendo del simulador.");
                    return;
                }
                break;
            default:
                mostrarMensaje("Opción inválida. Por favor, ingrese un número del 1 al 6.");
        }
    }
}