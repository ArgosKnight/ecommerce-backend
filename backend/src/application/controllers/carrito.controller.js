const CarritoService = require("../../domain/services/carrito.service");
const ProductoService = require("../../domain/services/producto.service");

class CarritoController {
  async obtener(req, res) {
    try {
      const usuarioId = req.user.id;
      const carrito = await CarritoService.obtenerOCrearCarrito(usuarioId);
      res.json(carrito);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async agregar(req, res) {
    try {
      const usuarioId = req.user.id;
      const { productoId, cantidad } = req.body;

      const producto = await ProductoService.obtenerPorId(productoId);
      if (!producto) throw new Error("Producto no encontrado");

      const carrito = await CarritoService.agregarItem(usuarioId, producto, cantidad);
      res.json(carrito);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async eliminar(req, res) {
    try {
      const usuarioId = req.user.id;
      const productoId = req.params.productoId;

      const carrito = await CarritoService.eliminarItem(usuarioId, productoId);
      res.json(carrito);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async vaciar(req, res) {
    try {
      const usuarioId = req.user.id;
      const carrito = await CarritoService.vaciar(usuarioId);
      res.json(carrito);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new CarritoController();
