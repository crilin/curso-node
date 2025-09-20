const {Router} = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { cargaArchivos } = require('../controllers/uploads');

const router = Router();

/**
 * Ruta /api/uploads
 */

router.post('/', cargaArchivos )

module.exports = router