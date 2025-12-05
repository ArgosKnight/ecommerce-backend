const { crearCategoria, obtenerCategorias } = require("../../infrastructure/database/categoria.collection");

class CategoriaService {
  async crear(data) {
    if (!data.nombre) throw new Error("El nombre es obligatorio");
    return await crearCategoria(data);
  }

  async listar() {
    return await obtenerCategorias();
  }
}

module.exports = new CategoriaService();
