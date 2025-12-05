class Carrito {
  constructor({ id, usuarioId, items }) {
    this.id = id;
    this.usuarioId = usuarioId;
    this.items = items; // array de CarritoItem
  }
}

module.exports = Carrito;
