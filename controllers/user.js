const {request, response} = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');



const usuariosGet = async(req = request, res = response) => {
    
    const {limite = 5, desde = 0} = req.query;

    // Query a la BD
    const query = {estado:true}

    // LLamadas a la BD de manera simultanea
    const [total, users] = await Promise.all([
        User.countDocuments( query ),
        User.find( query )
            .skip( Number(desde) )
            .limit( Number(limite) )
    ]);

    res.json({
            total,
            users
        })
}

const usuariosPost = async (req = request, res) => {

    // Obtiene el request
    const {nombre, password, correo, rol} = req.body;

    // Crear el usuario
    const nUser = new User({nombre, password, correo, rol});

    // encriptar password
    const salt = bcrypt.genSaltSync(8);
    nUser.password = bcrypt.hashSync(password, salt);

    // Guarda en BD
    await nUser.save();

    res.status(201).json({
            nUser
        })
}

const usuariosPut = async(req = request, res) => {

    const {id} = req.params;
    
    const {_id, password, google, correo, ..._body } = req.body

    // TODO validar contra base de datos

    // encriptar password
    const salt = bcrypt.genSaltSync(8);
    _body.password = bcrypt.hashSync(password, salt);

    const user = await User.findByIdAndUpdate(id, _body, { new:true } );

    res.json({
            user
        })
}

const usuariosDelete = async (req, res) => {

    const { id } = req.params;
    const usuarioAuth = req.usuario;

    

    // Borrado lógico en la BD
    const _user = await User.findByIdAndUpdate(id, {estado: false}, {new:true});

    res.json({   
        _user,
        usuarioAuth
    });
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete

}