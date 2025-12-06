const { getDB } = require("../../config/mongo");
const { ObjectId } = require("mongodb");

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

// Obtener todos los pedidos (ADMIN)
async function obtenerTodosPedidos() {
  const col = pedidoCollection();
  return await col.find({}).sort({ createdAt: -1 }).toArray();
}

// Cambiar estado del pedido
async function actualizarEstado(id, nuevoEstado) {
  const col = pedidoCollection();

  const result = await col.updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        estado: nuevoEstado,
        updatedAt: new Date(),
      },
    }
  );
  
  console.log('🔄 Actualización de estado:', { id, nuevoEstado, modificados: result.modifiedCount });
  return result;
}

module.exports = {
  crearPedido,
  obtenerPedidosPorUsuario,
  obtenerTodosPedidos,
  actualizarEstado
};
