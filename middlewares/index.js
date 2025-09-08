
const validarCampos = require('../middlewares/validar-campos');
const validarJWT = require('../middlewares/validar-jwt');
const validarRoles = require('../middlewares/validar-role');

// Organiza los middeware en un solo modulo de exportación

module.exports = {
    ...validarCampos,
    ...validarJWT,
    ...validarRoles
}