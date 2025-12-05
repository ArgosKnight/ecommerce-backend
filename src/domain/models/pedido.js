class Pedido {
  constructor({ id, usuarioId, items, total, estado, fechaCreacion, direccionEnvio }) {
    this.id = id;
    this.usuarioId = usuarioId;
    this.items = items;
    this.total = total;
    this.estado = estado; // enum
    this.fechaCreacion = fechaCreacion;
    this.direccionEnvio = direccionEnvio;
  }
}

module.exports = Pedido;
