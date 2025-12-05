class PedidoItem {
  constructor({ productoId, cantidad, precioUnitario, subtotal }) {
    this.productoId = productoId;
    this.cantidad = cantidad;
    this.precioUnitario = precioUnitario;
    this.subtotal = subtotal;
  }
}

module.exports = PedidoItem;
