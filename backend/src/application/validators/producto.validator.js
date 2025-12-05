const Joi = require("joi");

const crearProductoSchema = Joi.object({
  nombre: Joi.string().min(3).required(),
  descripcion: Joi.string().optional(),
  precio: Joi.number().positive().required(),
  stock: Joi.number().integer().min(0).optional(),
  categoriaId: Joi.string().required(),
  imagenes: Joi.array().items(Joi.string()).optional()
});

const actualizarProductoSchema = Joi.object({
  nombre: Joi.string().min(3).optional(),
  descripcion: Joi.string().optional(),
  precio: Joi.number().positive().optional(),
  stock: Joi.number().integer().min(0).optional(),
  categoriaId: Joi.string().optional(),
  imagenes: Joi.array().items(Joi.string()).optional(),
  activo: Joi.boolean().optional(),
});

module.exports = {
  crearProductoSchema,
  actualizarProductoSchema
};
