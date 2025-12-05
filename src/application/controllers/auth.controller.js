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
      const data = req.body;
      const result = await UsuarioService.login(data);
      res.json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new AuthController();
