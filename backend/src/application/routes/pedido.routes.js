const express = require("express");
const PedidoController = require("../controllers/pedido.controller");

const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");

const validate = require("../middleware/validator.middleware");
const { pedidoSchema, cambiarEstadoSchema } = require("../validators/pedido.validator");

// ✅ Primero se crea el router
const router = express.Router();

// -------------------------------------------------
// 📌 CLIENTE - Crear pedido
// -------------------------------------------------
router.post(
  "/",
  auth,
  role("CLIENTE"),
  validate(pedidoSchema),
  (req, res) => PedidoController.crear(req, res)
);

// -------------------------------------------------
// 📌 CLIENTE - Ver sus pedidos
// -------------------------------------------------
router.get(
  "/mios",
  auth,
  role("CLIENTE"),
  (req, res) => PedidoController.misPedidos(req, res)
);

// -------------------------------------------------
// 📌 ADMIN - Ver todos los pedidos
// -------------------------------------------------
router.get(
  "/",
  auth,
  role("ADMIN"),
  (req, res) => PedidoController.obtenerTodos(req, res)
);

// -------------------------------------------------
// 📌 ADMIN - Cambiar estado
// -------------------------------------------------
router.patch(
  "/:id/estado",
  auth,
  role("ADMIN"),
  validate(cambiarEstadoSchema),
  (req, res) => PedidoController.cambiarEstado(req, res)
);

module.exports = router;
