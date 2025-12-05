const express = require("express");
const AuthController = require("../controllers/auth.controller");
const validate = require("../middleware/validator.middleware");
const { registerSchema, loginSchema } = require("../validators/auth.validator");

const router = express.Router();

router.post("/register", validate(registerSchema), (req, res) => AuthController.registrar(req, res));
router.post("/login", validate(loginSchema), (req, res) => AuthController.login(req, res));

module.exports = router;
