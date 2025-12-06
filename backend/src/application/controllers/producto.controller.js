const ProductoService = require("../../domain/services/producto.service");

class ProductoController {
  async crear(req, res) {
    try {
      // Validar campos requeridos
      if (!req.body.nombre || !req.body.precio || !req.body.categoriaId) {
        return res.status(400).json({ 
          error: 'Faltan campos requeridos: nombre, precio y categoriaId' 
        });
      }

      // Obtener las URLs de Cloudinary
      const imagenes = req.files ? req.files.map(file => file.path) : [];
      
      const productoData = {
        nombre: req.body.nombre,
        descripcion: req.body.descripcion || '',
        precio: parseFloat(req.body.precio),
        stock: parseInt(req.body.stock) || 0,
        categoriaId: req.body.categoriaId,
        imagenes
      };
      
      const producto = await ProductoService.crear(productoData);
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
      
      console.log('Actualizando producto:', id);
      console.log('Body:', req.body);
      console.log('Files:', req.files);
      
      // Obtener las URLs de Cloudinary (si hay nuevas imágenes)
      const nuevasImagenes = req.files && req.files.length > 0 
        ? req.files.map(file => file.path) 
        : [];
      
      const productoData = {};
      
      // Solo incluir campos que vengan en el body
      if (req.body.nombre) productoData.nombre = req.body.nombre;
      if (req.body.descripcion !== undefined) productoData.descripcion = req.body.descripcion;
      if (req.body.precio) productoData.precio = parseFloat(req.body.precio);
      if (req.body.stock !== undefined) productoData.stock = parseInt(req.body.stock);
      if (req.body.categoriaId) productoData.categoriaId = req.body.categoriaId;
      
      // Si hay nuevas imágenes, agregarlas
      if (nuevasImagenes.length > 0) {
        productoData.imagenes = nuevasImagenes;
      }
      
      console.log('Datos a actualizar:', productoData);
      
      const producto = await ProductoService.actualizar(id, productoData);
      res.json(producto);
    } catch (error) {
      console.error('Error al actualizar producto:', error);
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

  async eliminar(req, res) {
    try {
      const { id } = req.params;
      await ProductoService.eliminar(id);
      res.json({ mensaje: 'Producto eliminado exitosamente' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new ProductoController();
