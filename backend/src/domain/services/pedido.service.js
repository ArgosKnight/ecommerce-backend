const {
  crearPedido,
  obtenerPedidosPorUsuario,
  obtenerTodosPedidos,
  actualizarEstado,
} = require("../../infrastructure/database/pedido.collection");

const { obtenerCarrito } = require("../../infrastructure/database/carrito.collection");

class PedidoService {
  async crear(usuarioId, direccionEnvio, itemsFromRequest = null) {
    let items;
    
    // Si se envían items desde el request, usarlos (carrito del frontend)
    if (itemsFromRequest && itemsFromRequest.length > 0) {
      items = itemsFromRequest.map((i) => ({
        productoId: i.productoId,
        cantidad: i.cantidad,
        precioUnitario: i.precio,
        subtotal: i.cantidad * i.precio,
      }));
    } else {
      // Si no, obtener del carrito del backend
      const carrito = await obtenerCarrito(usuarioId);
      if (!carrito || carrito.items.length === 0) {
        throw new Error("El carrito está vacío");
      }

      items = carrito.items.map((i) => ({
        productoId: i.productoId,
        cantidad: i.cantidad,
        precioUnitario: i.precioUnitario,
        subtotal: i.cantidad * i.precioUnitario,
      }));
    }

    const total = items.reduce((acc, cur) => acc + cur.subtotal, 0);

    return await crearPedido({
      usuarioId,
      items,
      total,
      direccionEnvio,
    });
  }

  async obtenerMisPedidos(usuarioId) {
    return await obtenerPedidosPorUsuario(usuarioId);
  }

  async obtenerTodos() {
    return await obtenerTodosPedidos();
  }

  async cambiarEstado(id, nuevoEstado) {
    return await actualizarEstado(id, nuevoEstado);
  }
}

module.exports = new PedidoService();
