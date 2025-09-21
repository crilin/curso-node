const path = require('path');
const fs = require('fs');

const { response } = require("express");
const { subirArchivo } = require('../utils');
const { Usuario, Producto } = require("../models");

/*-----------------------------------------------------
 * CARGAR ARCHIVO
-------------------------------------------------------*/
/**
 * Cargar imagenes al servidor
 * @param {file} req
 * @param {msg} res
 * @returns 
 */
const archivoPOST = async (req, res = response) => {

    try {
        // const nombre = await subirArchivo( req.files, ['txt','pdf'], 'textos');
        // Cargar imagenes
        const nombre = await subirArchivo( req.files, undefined, 'image');
    
        res.json({ nombre })
        
    } catch (msg) {
        res.json({ msg })        
    }
}

/*-----------------------------------------------------
 * ACTUALIZAR IMAGEN
-------------------------------------------------------*/
/**
 * Actualiza la imagen de los usuarios y productos
 * @param {coleccion, id} req 
 * @param {ruta} res 
 */
const archivosPUT = async (req, res = response) => {

    const { coleccion, id } = req.params;

    // el modelo a buscar en la BD
    let modelo;

    switch (coleccion) {
        case 'usuarios':
            
            modelo = await Usuario.findById(id);
            if(!modelo){
                return res.status(400).json({
                    msg: `No existe un usuario con el id: ${ id }`
                });
            }

            break;
    
        case 'productos':
            
            modelo = await Producto.findById(id);
            if(!modelo){
                return res.status(400).json({
                    msg: `No existe un producto con el id: ${ id }`
                });
            }

            break;
    
        default:
            return res.status(500).json({ 
                msg:`Falta configurar la colección ${coleccion}`
            })
            break;
    }

    // Limpiar imagenes previas
    if (modelo.img) {
        const pathImagen = path.join( __dirname, '../uploads', coleccion, modelo.img);
        if ( fs.existsSync(pathImagen) ){
            fs.unlinkSync(pathImagen);
        }
    }

    // Cargar imagen
    const nombre = await subirArchivo( req.files, undefined, coleccion);
    
    modelo.img = nombre;
    await modelo.save();

    res.json({
        modelo
    })
}

/*-----------------------------------------------------
 * OBTENER IMAGEN
-------------------------------------------------------*/
/**
 * Devuelva la imagen de un usuario o producto
 * @param {coleccion, id} req 
 * @param {ruta} res 
 */
const archivoGET = async (req, res = response) => {

    const { coleccion, id } = req.params;
    const defaultImage = path.join( __dirname, '../assets/', 'no-image.jpg');

    // el modelo a buscar en la BD
    let modelo;

    switch (coleccion) {
        case 'usuarios':
            
            modelo = await Usuario.findById(id);
            if(!modelo){
                // return res.status(400).json({
                //     msg: `No existe un usuario con el id: ${ id }`
                // });
                return res.sendFile( defaultImage );
            }

            break;
    
        case 'productos':
            
            modelo = await Producto.findById(id);
            if(!modelo){
                // return res.status(400).json({
                //     msg: `No existe un producto con el id: ${ id }`
                // });
                return res.sendFile( defaultImage );
            }

            break;
    
        default:
            return res.status(500).json({ 
                msg:`Falta configurar la colección ${coleccion}`
            })
            break;
    }

    // Limpiar imagenes previas
    if (modelo.img) {
        const pathImagen = path.join( __dirname, '../uploads', coleccion, modelo.img);
        if ( fs.existsSync(pathImagen) ){
            return res.sendFile(pathImagen);
        }
    }

    res.sendFile( defaultImage );
}


/**************************************************************************************** 
 * FIN FUENTES
*****************************************************************************************/
module.exports = {
    archivoPOST,
    archivosPUT,
    archivoGET
}