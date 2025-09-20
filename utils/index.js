
const cargarArchivo = require('./cargar-archivo');
const dbValidators = require('./db-validators');
const generarJWT = require('./generar-jwt');
const googleVerify = require('./google-verify');

module.exports = {
    ...cargarArchivo,
    ...dbValidators,
    ...generarJWT,
    ...googleVerify
}