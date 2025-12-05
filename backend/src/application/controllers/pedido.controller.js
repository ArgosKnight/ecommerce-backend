const PedidoService = require("../../domain/services/pedido.service");

class PedidoController {
  async crear(req, res) {
    try {
      const usuarioId = req.user.id;
      const { direccionEnvio } = req.body;

      const pedido = await PedidoService.crear(usuarioId, direccionEnvio);
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

  async cambiarEstado(req, res) {
    try {
      const { id } = req.params;
      const { estado } = req.body;

      await PedidoService.cambiarEstado(id, estado);
      res.json({ message: "Estado actualizado" });

    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new PedidoController();
