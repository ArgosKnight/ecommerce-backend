const express = require("express");
const CarritoController = require("../controllers/carrito.controller");
const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");
const validate = require("../middleware/validator.middleware");
const { agregarCarritoSchema } = require("../validators/carrito.validator");

// Crear router primero
const router = express.Router();

// -------------------------------------------------
// 📌 CLIENTE - Obtener carrito
// -------------------------------------------------
router.get(
  "/",
  auth,
  role("CLIENTE"),
  (req, res) => CarritoController.obtener(req, res)
);

// -------------------------------------------------
// 📌 CLIENTE - Agregar item al carrito
// -------------------------------------------------
router.post(
  "/agregar",
  auth,
  role("CLIENTE"),
  validate(agregarCarritoSchema),
  (req, res) => CarritoController.agregar(req, res)
);

// -------------------------------------------------
// 📌 CLIENTE - Eliminar item del carrito
// -------------------------------------------------
router.delete(
  "/eliminar/:productoId",
  auth,
  role("CLIENTE"),
  (req, res) => CarritoController.eliminar(req, res)
);

// -------------------------------------------------
// 📌 CLIENTE - Vaciar carrito
// -------------------------------------------------
router.delete(
  "/vaciar",
  auth,
  role("CLIENTE"),
  (req, res) => CarritoController.vaciar(req, res)
);

module.exports = router;
