const {request, response} = require('express');
const Usuario = require('../models/user');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../utils/generar-jwt');
const { googleVerify } = require('../utils/google-verify');

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

const googleSingIn = async(req, res=response) => {

    const {id_token} = req.body;

    try {

        // Se obtiene el token desde el Sign In de Google
        const {nombre, correo, img } = await googleVerify(id_token);

        // Verifica que el usuario exista
        let usuario = await Usuario.findOne({correo});

        if (!usuario) {

            const data = {
                nombre,
                correo,
                password: ':D',
                img,
                rol: 'USER_ROLE',
                google: true
            };

            usuario = new Usuario( data );
            await usuario.save();
        }

        // Si el usuario esta activo en la BD
        if (!usuario.estado){
            return  res.status(401).json({
            msg: 'Contacte su administrador, usuario bloqueado'
        })
        }

        // Generar el JWT
        const token = await generarJWT(usuario.id);
        
        res.json({
            usuario,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: 'El token no pudo ser validado'
        })
    }

}

const renovarToken = async (req, res) => {

    const {usuario} = req;

    // Generar el JWT
    const token = await generarJWT(usuario.id);

    res.json({
        usuario,
        token
    })
}

module.exports = {
    login,
    googleSingIn,
    renovarToken
}