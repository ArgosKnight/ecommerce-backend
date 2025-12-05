const { getDB } = require("../../config/mongo");

function pedidoCollection() {
  return getDB().collection("pedidos");
}

// Crear pedido
async function crearPedido(data) {
  const col = pedidoCollection();

  const nuevoPedido = {
    usuarioId: data.usuarioId,
    items: data.items,
    total: data.total,
    estado: "PENDIENTE",
    direccionEnvio: data.direccionEnvio,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const result = await col.insertOne(nuevoPedido);
  return { ...nuevoPedido, id: result.insertedId };
}

// Obtener pedidos de un usuario
async function obtenerPedidosPorUsuario(usuarioId) {
  const col = pedidoCollection();
  return await col.find({ usuarioId }).toArray();
}

// Cambiar estado del pedido
async function actualizarEstado(id, nuevoEstado) {
  const col = pedidoCollection();

  await col.updateOne(
    { _id: id },
    {
      $set: {
        estado: nuevoEstado,
        updatedAt: new Date(),
      },
    }
  );
}

module.exports = {
  crearPedido,
  obtenerPedidosPorUsuario,
  actualizarEstado
};
