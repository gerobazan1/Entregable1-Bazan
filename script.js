    const productos = []; 

    const agregarProducto = () => {
        let categoria = prompt("Ingrese la categoría del producto:");
        let nombre = prompt("Ingrese el nombre del producto:");
        let cantidad = prompt("Ingrese la cantidad del producto:");
        let precio = prompt("Ingrese el precio unitario del producto:");
    
        // Validaciones
        if (!categoria || !nombre || !cantidad || !precio) {
            alert("Todos los campos son obligatorios.");
            return;
        }
    
        cantidad = parseInt(cantidad);
        precio = parseFloat(precio);
    
        if (isNaN(cantidad) || cantidad <= 0) {
            alert("La cantidad debe ser un número entero positivo.");
            return;
        }
    
        if (isNaN(precio) || precio <= 0) {
            alert("El precio debe ser un número positivo.");
            return;
        }
    
        if (confirm(`¿Desea agregar el siguiente producto ${nombre}?`)) {
            productos.push({ nombre, categoria, cantidad, precio });
            alert(`Producto ${nombre} agregado con éxito.`);
            mostrarInventario();
        }
    }

    const editarProducto = () => {
        let nombre = prompt("Ingrese el nombre del producto a editar:");
        let producto = productos.find(p => p.nombre.toLowerCase() === nombre.toLowerCase());

        if (producto) {
            let nuevaCantidad = prompt(`Ingrese la nueva cantidad del producto (actual: ` + producto.cantidad + `):`);
            let nuevoPrecio = prompt(`Ingrese el nuevo precio unitario del producto (actual: `+ producto.precio + `):`);

            // Mantengo los valores existentes si no ingreso nuevos valores
            if (nuevaCantidad.trim() !== "") {
                producto.cantidad = parseInt(nuevaCantidad);
            }
            if (nuevoPrecio.trim() !== "") {
                producto.precio = parseFloat(nuevoPrecio);
            }

            if (confirm(`¿Desea editar el producto ` + nombre + `?`)) {
                alert(`Producto ` + nombre + ` editado con éxito.`);
            }
        } else {
            alert("Producto no encontrado. No se puede editar.");
        }
        mostrarInventario();
    }

    const eliminarProducto = () => {
        let categoria = prompt("Ingrese la categoría del producto a eliminar:").toLowerCase();
        let productosCategoria = productos.filter(p => p.categoria.toLowerCase() === categoria);

        if (productosCategoria.length > 0) {
            let nombre = prompt("Ingrese el nombre del producto a eliminar:").toLowerCase();
            let producto = productosCategoria.find(p => p.nombre.toLowerCase() === nombre.toLowerCase());

            if (producto) {
                if (confirm(`¿Desea eliminar el producto ` + nombre + `?`)) {
                    productos.splice(productos.indexOf(producto), 1);
                    alert(`Producto ` + producto.nombre + ` eliminado con éxito.`);
                }
            } else {
                alert("No se encontró el producto con el nombre proporcionado en esta categoría.");
            }
        } else {
            alert("No se encontraron productos en esta categoría.");
        }
        mostrarInventario();
    }

    const buscarProducto = () => {
        let categoria = prompt("Ingrese la categoría del producto a buscar:").toLowerCase();
        let productosCategoria = productos.filter(p => p.categoria.toLowerCase() === categoria);
    
        if (productosCategoria.length > 0) {
            let nombre = prompt("Ingrese parte del nombre del producto a buscar:").toLowerCase();
            let productosEncontrados = productosCategoria.filter(p => p.nombre.toLowerCase().includes(nombre));
    
            if (productosEncontrados.length > 0) {
                let mensaje = "Productos encontrados:\n";
                for (const producto of productosEncontrados){
                    mensaje += `\nNombre: `+ producto.nombre + `\nCategoría: ` + producto.categoria + `\nCantidad: ` + producto.cantidad + `\nPrecio Unitario: ` + producto.precio.toFixed(2) + `\n`;
                }
                alert(mensaje);
            } else {
                alert("No se encontraron productos que coincidan con el nombre proporcionado en esta categoría.");
            }
        } else {
            alert("No se encontraron productos en esta categoría.");
        }
    }

    const mostrarInventario = () => {
        if (productos.length === 0) {
            alert("El inventario está vacío.");
            console.log("El inventario está vacío.");
        } else {
            console.log("Inventario:");
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
            for (const producto of productos){
                mensaje += `\nNombre: `+ producto.nombre + `\nCategoría: ` + producto.categoria + `\nCantidad: ` + producto.cantidad + `\nPrecio Unitario: ` + producto.precio.toFixed(2) + `\n`;
            }
            console.table(productos);
            alert(mensaje);
        }
    }

    const iniciarSimulador = () => {
        let opcion;
        while (opcion !== "6") {
            opcion = prompt("Seleccione una opción:\n1. Agregar Producto\n2. Editar Producto\n3. Eliminar Producto\n4. Buscar Producto\n5. Mostrar Inventario\n6. Salir");

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
                        alert("Saliendo del simulador.");
                        return;
                    }
                    break;
                default:
                    alert("Opción inválida. Por favor, ingrese un número del 1 al 6.");
            }
        }
    }