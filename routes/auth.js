const {Router} = require('express');
const { check } = require('express-validator');
const { login, googleSingIn, renovarToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares');

const router = Router();

/**
 * Ruta /api/auth
 */

router.post('/login', [
        check('correo', 'El correo es obligatorio').isEmail(),
        check('password', 'la contraseña es obligatorio').not().isEmpty(),
        validarCampos
], login);

router.post('/google', [
        check('id_token', 'id_token es necesario').not().isEmpty(),
        validarCampos
], googleSingIn);

router.get('/', validarJWT, renovarToken );


module.exports = router