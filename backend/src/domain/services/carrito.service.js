const {
  obtenerCarrito,
  crearCarrito,
  actualizarItems,
} = require("../../infrastructure/database/carrito.collection");

class CarritoService {
  async obtenerOCrearCarrito(usuarioId) {
    let carrito = await obtenerCarrito(usuarioId);

    if (!carrito) {
      carrito = await crearCarrito(usuarioId);
    }

    return carrito;
  }

  async agregarItem(usuarioId, producto, cantidad) {
    const carrito = await this.obtenerOCrearCarrito(usuarioId);

    const items = carrito.items || [];

    const existente = items.find((item) => item.productoId === producto._id.toString());

    if (existente) {
      existente.cantidad += cantidad;
      existente.precioUnitario = producto.precio;
    } else {
      items.push({
        productoId: producto._id.toString(),
        cantidad,
        precioUnitario: producto.precio,
      });
    }

    return await actualizarItems(usuarioId, items);
  }

  async eliminarItem(usuarioId, productoId) {
    const carrito = await this.obtenerOCrearCarrito(usuarioId);

    const itemsFiltrados = carrito.items.filter(
      (item) => item.productoId !== productoId
    );

    return await actualizarItems(usuarioId, itemsFiltrados);
  }

  async vaciar(usuarioId) {
    return await actualizarItems(usuarioId, []);
  }
}

module.exports = new CarritoService();
