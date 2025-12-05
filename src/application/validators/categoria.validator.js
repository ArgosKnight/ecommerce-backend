const Joi = require("joi");

const categoriaSchema = Joi.object({
  nombre: Joi.string().min(3).required(),
  descripcion: Joi.string().optional()
});

module.exports = { categoriaSchema };
