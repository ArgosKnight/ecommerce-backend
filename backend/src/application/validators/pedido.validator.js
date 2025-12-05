const Joi = require("joi");

const pedidoSchema = Joi.object({
  direccionEnvio: Joi.object({
    direccion: Joi.string().required(),
    ciudad: Joi.string().required(),
    pais: Joi.string().required(),
    codigoPostal: Joi.string().required(),
    telefono: Joi.string().required(),
  }).required(),
});

module.exports = { pedidoSchema };
