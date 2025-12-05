const express = require("express");
const CategoriaController = require("../controllers/categoria.controller");
const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");
const validate = require("../middleware/validator.middleware");
const { categoriaSchema } = require("../validators/categoria.validator");

// ✅ Primero declaramos el router
const router = express.Router();

// ----------------------------------------
// 📌 RUTAS PÚBLICAS
// ----------------------------------------
router.get("/", (req, res) => CategoriaController.listar(req, res));

// ----------------------------------------
// 📌 RUTAS ADMIN + VALIDACIÓN
// ----------------------------------------
router.post(
  "/", 
  auth,
  role("ADMIN"),
  validate(categoriaSchema),
  (req, res) => CategoriaController.crear(req, res)
);

module.exports = router;
