function validate(schema) {
  return (req, res, next) => {
    console.log('🔍 Validando body:', req.body);
    const { error } = schema.validate(req.body);

    if (error) {
      console.error('❌ Error de validación:', error.details[0].message);
      return res.status(400).json({
        error: error.details[0].message
      });
    }

    console.log('✅ Validación exitosa');
    next();
  };
}

module.exports = validate;
