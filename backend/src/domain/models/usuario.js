class Usuario {
  constructor({ id, nombre, email, passwordHash, rol }) {
    this.id = id;
    this.nombre = nombre;
    this.email = email;
    this.passwordHash = passwordHash;
    this.rol = rol; // "ADMIN" | "CLIENTE"
  }
}

module.exports = Usuario;
