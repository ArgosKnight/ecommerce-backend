const mongoose = require("mongoose");

const PedidoSchema = new mongoose.Schema({
  usuarioId: String,
  items: [
    {
      productoId: String,
      cantidad: Number,
      precioUnitario: Number,
      subtotal: Number
    }
  ],
  total: Number,
  estado: {
    type: String,
    enum: ["PENDIENTE", "PAGADO", "ENVIADO", "ENTREGADO", "CANCELADO"],
    default: "PENDIENTE"
  },
  direccionEnvio: {
    direccion: String,
    ciudad: String,
    pais: String,
    codigoPostal: String,
    telefono: String
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("Pedido", PedidoSchema);
