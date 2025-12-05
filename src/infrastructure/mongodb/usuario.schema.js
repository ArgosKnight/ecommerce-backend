const mongoose = require("mongoose");

const UsuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  passwordHash: { type: String, required: true },
  rol: { type: String, enum: ["ADMIN", "CLIENTE"], default: "CLIENTE" }
}, {
  timestamps: true
});

module.exports = mongoose.model("Usuario", UsuarioSchema);
