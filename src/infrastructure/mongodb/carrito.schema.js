const mongoose = require("mongoose");

const CarritoSchema = new mongoose.Schema({
  usuarioId: { type: String, required: true },
  items: [
    {
      productoId: String,
      cantidad: Number,
      precioUnitario: Number
    }
  ]
}, {
  timestamps: true
});

module.exports = mongoose.model("Carrito", CarritoSchema);
