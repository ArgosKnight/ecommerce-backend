class DireccionEnvio {
  constructor({ direccion, ciudad, pais, codigoPostal, telefono }) {
    this.direccion = direccion;
    this.ciudad = ciudad;
    this.pais = pais;
    this.codigoPostal = codigoPostal;
    this.telefono = telefono;
  }
}

module.exports = DireccionEnvio;
