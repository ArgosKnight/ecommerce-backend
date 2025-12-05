const Joi = require("joi");

const agregarCarritoSchema = Joi.object({
  productoId: Joi.string().required(),
  cantidad: Joi.number().integer().min(1).required()
});

module.exports = { agregarCarritoSchema };
