const { getDB } = require("../../config/mongo");

function productoCollection() {
  return getDB().collection("productos");
}

async function crearProducto(data) {
  const col = productoCollection();
  
  const nuevoProducto = {
    nombre: data.nombre,
    descripcion: data.descripcion,
    precio: data.precio,
    stock: data.stock ?? 0,
    categoriaId: data.categoriaId,
    imagenes: data.imagenes ?? [],
    activo: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const result = await col.insertOne(nuevoProducto);
  return { ...nuevoProducto, id: result.insertedId };
}

module.exports = {
  crearProducto
};


module.exports = productoCollection;
