const express = require("express");

const authRoutes = require("./auth.routes");
const productoRoutes = require("./producto.routes");
const categoriaRoutes = require("./categoria.routes");
const carritoRoutes = require("./carrito.routes");
const pedidoRoutes = require("./pedido.routes");

const router = express.Router();

// Definir prefijos
router.use("/auth", authRoutes);
router.use("/productos", productoRoutes);
router.use("/categorias", categoriaRoutes);
router.use("/carrito", carritoRoutes);
router.use("/pedidos", pedidoRoutes);

module.exports = router;
