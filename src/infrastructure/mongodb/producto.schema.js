const mongoose = require("mongoose");

const ProductoSchema = new mongoose.Schema({
  nombre: String,
  descripcion: String,
  precio: Number,
  stock: Number,
  categoriaId: String,
  imagenes: [String],
  activo: { type: Boolean, default: true }
}, {
  timestamps: true
});

module.exports = mongoose.model("Producto", ProductoSchema);
