const express = require("express");
const ProductoController = require("../controllers/producto.controller");
const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");
const upload = require("../middleware/upload.middleware");

const { crearProductoSchema, actualizarProductoSchema } = require("../validators/producto.validator");
const validate = require("../middleware/validator.middleware");

// ✅ Primero se crea el router
const router = express.Router();

// ----------------------------------------
// 📌 RUTAS PÚBLICAS
// ----------------------------------------
router.get("/", (req, res) => ProductoController.listar(req, res));
router.get("/:id", (req, res) => ProductoController.obtenerPorId(req, res));

// ----------------------------------------
// 📌 RUTAS ADMIN con validación incluida
// ----------------------------------------
router.post(
  "/", 
  auth, 
  role("ADMIN"),
  upload.array("imagenes", 5), // Permitir hasta 5 imágenes
  (req, res) => ProductoController.crear(req, res)
);

router.put(
  "/:id", 
  auth, 
  role("ADMIN"), 
  upload.array("imagenes", 5), // Permitir hasta 5 imágenes
  (req, res) => ProductoController.actualizar(req, res)
);

router.patch(
  "/:id/estado", 
  auth, 
  role("ADMIN"), 
  (req, res) => ProductoController.cambiarEstado(req, res)
);

router.delete(
  "/:id",
  auth,
  role("ADMIN"),
  (req, res) => ProductoController.eliminar(req, res)
);

module.exports = router;
