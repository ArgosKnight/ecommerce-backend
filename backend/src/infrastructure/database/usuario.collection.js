const { getDB } = require("../../config/mongo");

function usuarioCollection() {
  return getDB().collection("usuarios");
}

// Crear usuario
async function crearUsuario(data) {
  const col = usuarioCollection();

  const nuevoUsuario = {
    nombre: data.nombre,
    email: data.email,
    passwordHash: data.passwordHash,
    rol: data.rol ?? "CLIENTE",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const result = await col.insertOne(nuevoUsuario);
  return { ...nuevoUsuario, id: result.insertedId };
}

// Buscar usuario por email (para login)
async function buscarPorEmail(email) {
  const col = usuarioCollection();
  console.log('🔍 Buscando usuario con email:', email);
  const usuario = await col.findOne({ email });
  console.log('📦 Usuario encontrado:', usuario ? `Sí (${usuario.email})` : 'No');
  return usuario;
}

module.exports = {
  crearUsuario,
  buscarPorEmail
};

