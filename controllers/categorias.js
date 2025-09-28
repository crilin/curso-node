const { response, request } = require("express");
const { Categoria } = require('../models');

/*-----------------------------------------------------
 * CREAR CATEGORIA
-------------------------------------------------------*/
/**
 * 
 * @param {request} req 
 * @param {response} res 
 * @returns async JSON con estatus del crear Categoria
 */
const categoriaPOST = async (req= request , res = response) => {

    const nombre = req.body.nombre.toUpperCase();

    const categoriaBD = await Categoria.findOne({nombre});

    if ( categoriaBD ) {
        return res.status(400).json({
            msg: `La Categoria ${categoriaBD.nombre} ya existe`
        })
    }

    // generar la data a guardar
    const data = {
        nombre,
        usuario: req.usuario._id
    }

    const categoria = await new Categoria(data);

    // Guardar en BD
    await categoria.save();

    res.status(201).json(categoria);
}

/******************************************************
 * OBTENER CATEGORIAS
*******************************************************
*******************************************************/
const categoriasGET = async (req = request, res = response) => {

    const {size = 5, page = 0} = req.query;

    // Query a la BD
    const query = {estado:true}

    // LLamadas a la BD de manera simultanea
    const [total, categorias] = await Promise.all([
        Categoria.countDocuments( query ),
        Categoria.find( query )
            .populate('usuario', 'nombre')
            .skip( Number(page) )
            .limit( Number(size) )
    ]);

    res.json({
            total,
            categorias
        });
}

/******************************************************
 * OBTENER CATEGORIA
*******************************************************
*******************************************************/
const categoriaGET = async (req = request, res = response) => {

    const { id } = req.params;

    const categoria = await Categoria.findById(id)
        .populate('usuario', 'nombre');

    res.status(200).json({
        categoria
    })
}

/******************************************************
 * ACTUALIZAR CATEGORIA
*******************************************************
*******************************************************/
const categoriaPUT = async (req = request, res = response) => {

    const {id} = req.params;
    const {estado, usuario, ...data} = req.body;

    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;

    const categoriaBD = await Categoria.findOne({nombre});

    if ( categoriaBD ) {
        return res.status(400).json({
            msg: `La Categoria ${categoriaBD.nombre} ya existe`
        })
    }

    const categoria = await Categoria.findByIdAndUpdate(id, data, {new:true});

    res.status(200).json({
        categoria
    })

}

/******************************************************
 * BORRAR CATEGORIA
*******************************************************
*******************************************************/
const categoriaDELETE = async (req = request, res = response) => {

    const {id} = req.params;

    const categoriaBorrada = await Categoria.findByIdAndUpdate(id, {estado:false}, {new:true});
    
    res.status(200).json({
        categoriaBorrada
    })
}

module.exports = {
    categoriaPOST,
    categoriasGET,
    categoriaGET,
    categoriaPUT,
    categoriaDELETE
}