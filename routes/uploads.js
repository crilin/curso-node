const {Router} = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { cargaArchivos, archivosPUT } = require('../controllers/uploads');
const { coleccionesPermitidas } = require('../utils');

const router = Router();

/**
 * Ruta /api/uploads
 */


/*---------------------------------
 * METODO POST
 ---------------------------------*/
router.post('/', cargaArchivos )


/*---------------------------------
 * METODO PUT
 ---------------------------------*/
router.put('/:coleccion/:id', [
    check('id', 'el id tiene que ser válido').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas(c, ['usuarios', 'productos']) ),
    validarCampos
],archivosPUT)

module.exports = router