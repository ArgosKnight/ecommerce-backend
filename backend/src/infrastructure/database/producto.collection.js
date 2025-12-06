const { getDB } = require("../../config/mongo");

function productoCollection() {
  return getDB().collection("productos");
}

async function crearProducto(data) {
  const col = productoCollection();
  
  console.log('🔵 [CREAR PRODUCTO] Datos recibidos:', data);
  console.log('🔵 [CREAR PRODUCTO] Colección:', col.collectionName);
  console.log('🔵 [CREAR PRODUCTO] Base de datos:', col.dbName);
  
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

  console.log('🔵 [CREAR PRODUCTO] Producto a insertar:', nuevoProducto);
  
  const result = await col.insertOne(nuevoProducto);
  
  console.log('🔵 [CREAR PRODUCTO] Resultado insertOne:', result);
  console.log('🔵 [CREAR PRODUCTO] ID insertado:', result.insertedId);
  
  const productoCreado = { ...nuevoProducto, _id: result.insertedId };
  console.log('🔵 [CREAR PRODUCTO] Producto creado:', productoCreado);
  
  return productoCreado;
}

module.exports = {
  productoCollection,
  crearProducto
};
