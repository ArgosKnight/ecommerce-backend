const { getDB } = require("../../config/mongo");

function carritoCollection() {
  return getDB().collection("carritos");
}

// Obtener carrito por usuarioId
async function obtenerCarrito(usuarioId) {
  const col = carritoCollection();
  return await col.findOne({ usuarioId });
}

// Crear carrito inicial (si el usuario no tiene uno)
async function crearCarrito(usuarioId) {
  const col = carritoCollection();

  const carrito = {
    usuarioId,
    items: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const result = await col.insertOne(carrito);
  return { ...carrito, id: result.insertedId };
}

// Actualizar items del carrito
async function actualizarItems(usuarioId, items) {
  const col = carritoCollection();

  await col.updateOne(
    { usuarioId },
    {
      $set: {
        items,
        updatedAt: new Date(),
      },
    }
  );

  return obtenerCarrito(usuarioId);
}

module.exports = {
  obtenerCarrito,
  crearCarrito,
  actualizarItems
};
