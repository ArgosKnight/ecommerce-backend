const PedidoService = require("../../domain/services/pedido.service");

class PedidoController {
  async crear(req, res) {
    try {
      const usuarioId = req.user.id;
      const { direccionEnvio, items } = req.body;

      const pedido = await PedidoService.crear(usuarioId, direccionEnvio, items);
      res.json(pedido);

    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async misPedidos(req, res) {
    try {
      const usuarioId = req.user.id;
      const pedidos = await PedidoService.obtenerMisPedidos(usuarioId);
      res.json(pedidos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async obtenerTodos(req, res) {
    try {
      const pedidos = await PedidoService.obtenerTodos();
      res.json(pedidos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async cambiarEstado(req, res) {
    try {
      const { id } = req.params;
      const { estado } = req.body;

      console.log('🔄 Cambiar estado - ID:', id, '| Nuevo estado:', estado);
      await PedidoService.cambiarEstado(id, estado);
      res.json({ message: "Estado actualizado" });

    } catch (error) {
      console.error('❌ Error al cambiar estado:', error.message);
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new PedidoController();
