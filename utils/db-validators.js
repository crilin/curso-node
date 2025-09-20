const categoria = require('../models/categoria');
const {Role, Usuario, Producto} = require('../models');

const siExisteRole = async (rol = '') => {

    const existeRol = await Role.findOne({rol})
    if (!existeRol){
        throw new Error(`El rol ${rol} no está registrado en la BD`)
    }
}

// Verificar que el Correo no exista en BD
const siExisteCorreo = async (correo) => {

    const existeCorreo = await Usuario.findOne({correo});
    if (existeCorreo){
        throw new Error(`El correo ${correo} ya fue registrado`)
    }
}

const existeUserById = async (id) => {

    const existeId = await Usuario.findById(id);
    if (!existeId){
        throw new Error(`El id no esta registrado ${id}`)
    }
}

const existeCategoriaById = async (id) => {

    const existeId = await categoria.findById(id);
    if (!existeId){
        throw new Error(`El id no esta registrado ${id}`)
    }
}

const existeProductoById = async (id) => {

    const existeId = await Producto.findById(id);
    if (!existeId){
        throw new Error(`El id no esta registrado ${id}`)
    }
}

const coleccionesPermitidas = (coleccion = '', colecciones = []) => {

    const incluida = colecciones.includes(coleccion);

    if(!incluida) {
        throw new Error(`La colección no es permitida - ${colecciones}`)
    }

    return true
}
module.exports = {
    siExisteRole,
    siExisteCorreo,
    existeUserById,
    existeCategoriaById,
    existeProductoById,
    coleccionesPermitidas
}