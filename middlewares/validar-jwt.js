const { request, response } = require('express');
const jwt = require('jsonwebtoken');
const user = require('../models/user');


const validarJWT = async (req = request, res = response, next ) =>{

    // Token recibido en el HEADER
    const token = req.header('x-token');

    if (!token){
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }

    try {
        
        // Obtener uid del token recibido en el Header
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        // Leer usuario que le corresponde el uid
        const userAuth = await user.findById(uid);

        if (!userAuth){
            return res.status(401).json({
                msg: 'usuario no registrado'
            })
        }
        
        // Validar que el usuario está activo
        if (!userAuth.estado){
            return res.status(401).json({
                msg: 'token no válido - usuario en false'
            })
        }
        
        // Se agrega el usuario obtenido del token al request
        req.usuario = userAuth;

        next();
    } catch (error) {
        console.error(error);

        res.status(401).json({
            msg: 'Token no válido'
        });
    }
}

module.exports = {
    validarJWT
}