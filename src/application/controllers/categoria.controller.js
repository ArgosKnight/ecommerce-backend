const CategoriaService = require("../../domain/services/categoria.service");

class CategoriaController {
  async crear(req, res) {
    try {
      const categoria = await CategoriaService.crear(req.body);
      res.json(categoria);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async listar(req, res) {
    try {
      const categorias = await CategoriaService.listar();
      res.json(categorias);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new CategoriaController();
