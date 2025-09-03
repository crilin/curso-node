const {Router} = require('express');

const router = Router();
const {usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete } = require('../controllers/user');


/*****************************
 * METODOS DEL API
 *****************************/
// METODO GET
router.get('/', usuariosGet);


// METODO POST
router.post('/', usuariosPost )

// METODO PUT
router.put('/:id', usuariosPut )

// METODO DELETE
router.delete('/', usuariosDelete )

module.exports = router