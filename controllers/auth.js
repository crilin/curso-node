const {request, response} = require('express');
const Usuario = require('../models/user');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../utils/generar-jwt');

const login = async (req= request, res= response) => {

    const { correo, password } = req.body;

    try { 

        // Verificar si el correo existe
        const usuario = await Usuario.findOne({correo});
        
        if (!usuario){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - correo'
            })
        }


        // Si el usuario está activo
        if(!usuario.estado) {
            return res.status(401).json({
                msg: 'Usuario / Password no son correctos - estado - false'
            })
        }

        // Verificar la contraseña
        const validarPass = bcrypt.compareSync(password, usuario.password);
        if (!validarPass) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - password'
            })
        }

        // generar el JWT
        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error interno contacte al administrador'
        })
    }

}

module.exports = {
    login
}