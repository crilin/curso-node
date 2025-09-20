
const { response } = require("express");
const { subirArchivo } = require('../utils');


const cargaArchivos = async (req, res = response) => {

    const extensionesValidas = [ 'png', 'jpg', 'jpeg', 'gif'];

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        
        res.status(400).json({
            msg: 'No hay archivo para cargar.'
        });
        return;
    }

    try {
        // const nombre = await subirArchivo( req.files, ['txt','pdf'], 'textos');
        // Cargar imagenes
        const nombre = await subirArchivo( req.files, undefined, 'image');
    
        res.json({ nombre })
        
    } catch (msg) {
        res.json({ msg })        
    }
}

const archivosPUT = async (req, res = response) => {

    const { coleccion, id } = req.params;

    res.json({
        coleccion,
        id
    })
}

module.exports = {
    cargaArchivos,
    archivosPUT
}