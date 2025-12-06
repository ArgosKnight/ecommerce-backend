const { crearProducto, productoCollection } = require("../../infrastructure/database/producto.collection");
const { getDB } = require("../../config/mongo");

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
    const col = getDB().collection("productos");
    return await col.findOne({ _id: id });
  }

  async actualizar(id, data) {
    const col = getDB().collection("productos");

    await col.updateOne(
      { _id: id },
      {
        $set: {
          ...data,
          updatedAt: new Date(),
        },
      }
    );

    return this.obtenerPorId(id);
  }

  async cambiarEstado(id, activo) {
    const col = getDB().collection("productos");

    await col.updateOne(
      { _id: id },
      { $set: { activo, updatedAt: new Date() } }
    );

    return this.obtenerPorId(id);
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



}

module.exports = new ProductoService();
