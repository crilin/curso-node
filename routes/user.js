const {Router} = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { siExisteRole, siExisteCorreo, existeUserById } = require('../utils/db-validators');

const {usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete } = require('../controllers/user');

const router = Router();

/*****************************
 * METODOS DEL API
 *****************************/
// METODO GET
router.get('/', usuariosGet);


// METODO POST
router.post('/', [
    check('nombre', 'el nombre es obligatorio').not().isEmpty(),
    check('password', 'el password tiene que tener un mínimo de 6 caracteres').isLength({ min:6 }),
    check('correo', 'el correo no es válido').isEmail(),
    check('correo').custom( siExisteCorreo ),
    // check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom( siExisteRole ),
    validarCampos
], usuariosPost )

// METODO PUT
router.put('/:id', [
    check('id', 'El id no es válido').isMongoId(),
    check('id').custom( existeUserById ),
    check('rol').custom( siExisteRole ),
    validarCampos
],usuariosPut )

// METODO DELETE
router.delete('/:id',[
    check('id', 'El id no es válido').isMongoId(),
    check('id').custom( existeUserById ),
    validarCampos
], usuariosDelete )

module.exports = router