const { crearProducto, productoCollection } = require("../../infrastructure/database/producto.collection");
const { getDB } = require("../../config/mongo");
const { ObjectId } = require("mongodb");

class ProductoService {
  async crear(data) {
    // Validaciones básicas
    if (!data.nombre || !data.precio || !data.categoriaId) {
      throw new Error("Nombre, precio y categoría son obligatorios");
    }

    return await crearProducto(data);
  }

  async obtenerTodos() {
    const col = getDB().collection("productos");
    return await col.find().toArray();
  }

  async obtenerPorId(id) {
    try {
      const col = getDB().collection("productos");
      const objectId = ObjectId.isValid(id) ? new ObjectId(id) : id;
      return await col.findOne({ _id: objectId });
    } catch (error) {
      console.error("Error en obtenerPorId:", error);
      throw error;
    }
  }

  async actualizar(id, data) {
    try {
      const col = getDB().collection("productos");
      const objectId = ObjectId.isValid(id) ? new ObjectId(id) : id;
      
      const resultado = await col.updateOne(
        { _id: objectId },
        {
          $set: {
            ...data,
            updatedAt: new Date(),
          },
        }
      );

      if (resultado.matchedCount === 0) {
        throw new Error("Producto no encontrado");
      }

      return this.obtenerPorId(id);
    } catch (error) {
      console.error("Error en actualizar producto:", error);
      throw error;
    }
  }

  async cambiarEstado(id, activo) {
    try {
      const col = getDB().collection("productos");
      const objectId = ObjectId.isValid(id) ? new ObjectId(id) : id;

      await col.updateOne(
        { _id: objectId },
        { $set: { activo, updatedAt: new Date() } }
      );

      return this.obtenerPorId(id);
    } catch (error) {
      console.error("Error en cambiarEstado:", error);
      throw error;
    }
  }

  async obtenerPaginado(queryParams) {
    const page = parseInt(queryParams.page) || 1;
    const limit = parseInt(queryParams.limit) || 10;
    const skip = (page - 1) * limit;

    const col = getDB().collection("productos");

    const filters = {};

    // Filtro por categoría
    if (queryParams.categoria) {
      filters.categoriaId = queryParams.categoria;
    }

    // Filtro por precio mínimo
    if (queryParams.minPrecio) {
      filters.precio = { ...filters.precio, $gte: Number(queryParams.minPrecio) };
    }

    // Filtro por precio máximo
    if (queryParams.maxPrecio) {
      filters.precio = { ...filters.precio, $lte: Number(queryParams.maxPrecio) };
    }

    // -------------------------------------------------
    // 🔍 BÚSQUEDA POR TEXTO (search)
    // -------------------------------------------------
    if (queryParams.search) {
      const regex = new RegExp(queryParams.search, "i");

      filters.$or = [
        { nombre: regex },
        { descripcion: regex }
      ];
    }

    const [data, total] = await Promise.all([
      col.find(filters).skip(skip).limit(limit).toArray(),
      col.countDocuments(filters)
    ]);

    return {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      filters,
      data
    };
  }

  async eliminar(id) {
    try {
      const col = getDB().collection("productos");
      const objectId = ObjectId.isValid(id) ? new ObjectId(id) : id;
      const resultado = await col.deleteOne({ _id: objectId });
      
      if (resultado.deletedCount === 0) {
        throw new Error("Producto no encontrado");
      }
      
      return { mensaje: "Producto eliminado exitosamente" };
    } catch (error) {
      console.error("Error en eliminar:", error);
      throw error;
    }
  }

}

module.exports = new ProductoService();
