const {Router} = require('express');
const { check } = require('express-validator');

const { productoPOST, productosGET, productoGET, productoPUT, productoDELETE } = require('../controllers/productos');
const { validarJWT, validarCampos, isAdminRole } = require('../middlewares');
const { existeProductoById, existeCategoriaById } = require('../utils/db-validators');

const router = Router();

/**
 * Ruta /api/productos
 */

/*---------------------------------
 * METODO POST
 ---------------------------------*/
router.post('/', [validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('categoria','La categoria no es id válido').isMongoId(),
    check('categoria').custom(existeCategoriaById),
    validarCampos
], productoPOST );


/*--------------------------------
 * METODO GET-ALL
 --------------------------------*/
router.get('/', productosGET);

 /*--------------------------------
 * METODO GET
 --------------------------------*/
router.get('/:id',[
    check('id','El id no es válido').isMongoId(),
    check('id').custom(existeProductoById),
    validarCampos
], productoGET);


 /*--------------------------------
 * METODO PUT
 --------------------------------*/
router.put('/:id', [ 
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id','El id no es válido').isMongoId(),
    check('id').custom(existeProductoById),
    validarCampos
], productoPUT );

 /*--------------------------------
 * METODO DELETE
 --------------------------------*/
router.delete('/:id',[
    validarJWT,
    isAdminRole,
    check('id','El id no es válido').isMongoId(),
    check('id').custom(existeProductoById),
    validarCampos
], productoDELETE)

module.exports = router