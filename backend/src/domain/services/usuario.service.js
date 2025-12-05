const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { crearUsuario, buscarPorEmail } = require("../../infrastructure/database/usuario.collection");

class UsuarioService {
  
  async registrar(data) {
    const existente = await buscarPorEmail(data.email);
    if (existente) throw new Error("El email ya está registrado");

    const passwordHash = await bcrypt.hash(data.password, 10);

    return await crearUsuario({
      nombre: data.nombre,
      email: data.email,
      passwordHash,
      rol: data.rol ?? "CLIENTE",
    });
  }

  async login(data) {
    const usuario = await buscarPorEmail(data.email);
    if (!usuario) throw new Error("Usuario no encontrado");

    const esValido = await bcrypt.compare(data.password, usuario.passwordHash);
    if (!esValido) throw new Error("Contraseña incorrecta");

    const token = jwt.sign(
      {
        id: usuario._id,
        rol: usuario.rol,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return {
      token,
      usuario: {
        id: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol,
      },
    };
  }
}

module.exports = new UsuarioService();
