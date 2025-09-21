const {Router} = require('express');
const { check } = require('express-validator');
const { validarCampos, validarArchivo } = require('../middlewares');
const { archivosPUT, archivoPOST, archivoGET } = require('../controllers/uploads');
const { coleccionesPermitidas } = require('../utils');

const router = Router();

/**
 * Ruta /api/uploads
 */


/*---------------------------------
 * METODO POST
 ---------------------------------*/
router.post('/', validarArchivo, archivoPOST );


/*---------------------------------
 * METODO PUT
 ---------------------------------*/
router.put('/:coleccion/:id', [
    validarArchivo,
    check('id', 'el id tiene que ser válido').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas(c, ['usuarios', 'productos']) ),
    validarCampos
], archivosPUT);

/*---------------------------------
 * METODO GET
 ---------------------------------*/
router.get('/:coleccion/:id', [
    check('id', 'el id tiene que ser válido').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas(c, ['usuarios', 'productos']) ),
    validarCampos
], archivoGET);



/**************************************************************************************** 
 * FIN FUENTES
*****************************************************************************************/
module.exports = router