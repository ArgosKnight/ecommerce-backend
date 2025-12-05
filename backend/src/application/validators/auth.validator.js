const Joi = require("joi");

const registerSchema = Joi.object({
  nombre: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  rol: Joi.string().valid("ADMIN", "CLIENTE").optional()
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});

module.exports = {
  registerSchema,
  loginSchema
};
