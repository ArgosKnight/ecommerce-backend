const Joi = require("joi");

const pedidoSchema = Joi.object({
  items: Joi.array()
    .items(
      Joi.object({
        productoId: Joi.string().required(),
        cantidad: Joi.number().integer().min(1).required(),
        precio: Joi.number().positive().required(),
      })
    )
    .optional(),
  direccionEnvio: Joi.object({
    direccion: Joi.string().required(),
    ciudad: Joi.string().required(),
    pais: Joi.string().required(),
    codigoPostal: Joi.string().required(),
    telefono: Joi.string().required(),
  }).required(),
});

const cambiarEstadoSchema = Joi.object({
  estado: Joi.string()
    .valid("PENDIENTE", "EN_PROCESO", "ENVIADO", "ENTREGADO", "CANCELADO")
    .required(),
});

module.exports = { pedidoSchema, cambiarEstadoSchema };
