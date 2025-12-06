const { crearCategoria, obtenerCategorias, obtenerCategoriaPorId, actualizarCategoria, eliminarCategoria } = require("../../infrastructure/database/categoria.collection");

class CategoriaService {
  async crear(data) {
    if (!data.nombre) throw new Error("El nombre es obligatorio");
    return await crearCategoria(data);
  }

  async listar() {
    return await obtenerCategorias();
  }

  async obtenerPorId(id) {
    const categoria = await obtenerCategoriaPorId(id);
    if (!categoria) throw new Error("Categoría no encontrada");
    return categoria;
  }

  async actualizar(id, data) {
    if (!data.nombre) throw new Error("El nombre es obligatorio");
    const categoria = await obtenerCategoriaPorId(id);
    if (!categoria) throw new Error("Categoría no encontrada");
    return await actualizarCategoria(id, data);
  }

  async eliminar(id) {
    const categoria = await obtenerCategoriaPorId(id);
    if (!categoria) throw new Error("Categoría no encontrada");
    const eliminada = await eliminarCategoria(id);
    if (!eliminada) throw new Error("No se pudo eliminar la categoría");
    return { mensaje: "Categoría eliminada correctamente" };
  }
}

module.exports = new CategoriaService();
