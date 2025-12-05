const { getDB } = require("../../config/mongo");

function categoriaCollection() {
  return getDB().collection("categorias");
}

// Crear categoría
async function crearCategoria(data) {
  const col = categoriaCollection();

  const nuevaCategoria = {
    nombre: data.nombre,
    descripcion: data.descripcion ?? "",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const result = await col.insertOne(nuevaCategoria);
  return { ...nuevaCategoria, id: result.insertedId };
}

// Obtener todas las categorías
async function obtenerCategorias() {
  const col = categoriaCollection();
  return await col.find().toArray();
}

module.exports = {
  crearCategoria,
  obtenerCategorias
};
