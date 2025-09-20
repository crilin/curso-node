const {Router} = require('express');
const { check } = require('express-validator');

const { validarJWT, validarCampos, isAdminRole } = require('../middlewares');
const { categoriaPOST, categoriasGET, categoriaGET, categoriaPUT, categoriaDELETE } = require('../controllers/categorias');
const { existeCategoriaById } = require('../utils/db-validators');

const router = Router();

/**
 * Ruta /api/categorias
 */

// Listar todas las categorias - publico
router.get('/', categoriasGET );

// Obtener una categoria por id - publico
router.get('/:id', [
    check('id','El id no es válido').isMongoId(),
    check('id').custom(existeCategoriaById),
    validarCampos
], categoriaGET);

// Crear categoria - privado - cualquier persona con un token valido
router.post('/', [validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
], categoriaPOST );

// Actualizar categoria - privado - cualquier persona con un token valido
router.put('/:id', [ 
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id','El id no es válido').isMongoId(),
    check('id').custom(existeCategoriaById),
    validarCampos
], categoriaPUT );

// Borrar categoria
router.delete('/:id', [
    validarJWT,
    isAdminRole,
    check('id','El id no es válido').isMongoId(),
    check('id').custom(existeCategoriaById),
    validarCampos
], categoriaDELETE);



module.exports = router