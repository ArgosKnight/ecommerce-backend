const UsuarioService = require("../../domain/services/usuario.service");

class AuthController {
  async registrar(req, res) {
    try {
      const data = req.body;
      const usuario = await UsuarioService.registrar(data);
      res.json(usuario);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async login(req, res) {
    try {
      console.log('📥 Login request body:', req.body);
      const data = req.body;
      const result = await UsuarioService.login(data);
      console.log('✅ Login exitoso:', result.usuario.email);
      res.json(result);
    } catch (error) {
      console.error('❌ Error en login:', error.message);
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new AuthController();
