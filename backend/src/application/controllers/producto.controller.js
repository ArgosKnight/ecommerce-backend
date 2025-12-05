const ProductoService = require("../../domain/services/producto.service");

class ProductoController {
  async crear(req, res) {
    try {
      const producto = await ProductoService.crear(req.body);
      res.json(producto);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async listar(req, res) {
    try {
      const result = await ProductoService.obtenerPaginado(req.query);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }



  async obtenerPorId(req, res) {
    try {
      const { id } = req.params;
      const producto = await ProductoService.obtenerPorId(id);
      res.json(producto);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async actualizar(req, res) {
    try {
      const { id } = req.params;
      const producto = await ProductoService.actualizar(id, req.body);
      res.json(producto);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async cambiarEstado(req, res) {
    try {
      const { id } = req.params;
      const { activo } = req.body;
      const producto = await ProductoService.cambiarEstado(id, activo);
      res.json(producto);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new ProductoController();
