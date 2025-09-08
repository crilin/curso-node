const Role = require('../models/role');
const user = require('../models/user');


const siExisteRole = async (rol = '') => {

    const existeRol = await Role.findOne({rol})
    if (!existeRol){
        throw new Error(`El rol ${rol} no está registrado en la BD`)
    }
}

// Verificar que el Correo no exista en BD
const siExisteCorreo = async (correo) => {

    const existeCorreo = await user.findOne({correo});
    if (existeCorreo){
        throw new Error(`El correo ${correo} ya fue registrado`)
    }
}

const existeUserById = async (id) => {

    const existeId = await user.findById(id);
    if (!existeId){
        throw new Error(`El id no esta registrado ${id}`)
    }
}


module.exports = {
    siExisteRole,
    siExisteCorreo,
    existeUserById
}