const { getDB } = require("../../config/mongo");
const { ObjectId } = require("mongodb");

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

// Obtener categoría por ID
async function obtenerCategoriaPorId(id) {
  const col = categoriaCollection();
  // Convertir string a ObjectId si es necesario
  const objectId = typeof id === 'string' ? new ObjectId(id) : id;
  return await col.findOne({ _id: objectId });
}

// Actualizar categoría
async function actualizarCategoria(id, data) {
  const col = categoriaCollection();
  // Convertir string a ObjectId si es necesario
  const objectId = typeof id === 'string' ? new ObjectId(id) : id;
  
  const dataActualizada = {
    nombre: data.nombre,
    descripcion: data.descripcion ?? "",
    updatedAt: new Date(),
  };

  await col.updateOne(
    { _id: objectId },
    { $set: dataActualizada }
  );

  return await obtenerCategoriaPorId(objectId);
}

// Eliminar categoría
async function eliminarCategoria(id) {
  const col = categoriaCollection();
  // Convertir string a ObjectId si es necesario
  const objectId = typeof id === 'string' ? new ObjectId(id) : id;
  const result = await col.deleteOne({ _id: objectId });
  return result.deletedCount > 0;
}

module.exports = {
  crearCategoria,
  obtenerCategorias,
  obtenerCategoriaPorId,
  actualizarCategoria,
  eliminarCategoria
};
