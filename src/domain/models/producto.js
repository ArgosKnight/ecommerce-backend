class Producto {
  constructor({ id, nombre, descripcion, precio, stock, categoriaId, imagenes, activo }) {
    this.id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.precio = precio;
    this.stock = stock;
    this.categoriaId = categoriaId;
    this.imagenes = imagenes;
    this.activo = activo;
  }
}

module.exports = Producto;
