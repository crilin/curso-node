const { response } = require("express");
const { ObjectId } = require("mongoose").Types;
const { Usuario, Producto, Categoria } = require('../models');

const coleccionBusqueda = [
    'productos',
    'categorias',
    'usuarios',
    'roles'
];

// Funcion para buscar Usuarios
const buscarUsuarios = async (termino = '', res = response) => {

    const isMongoId = ObjectId.isValid(termino);

    if( isMongoId ){
        const usuario = await Usuario.findById(termino);
        
        return res.json({
            results: (usuario) ? [ usuario ] : []
        });
    }

    const regex = new RegExp( termino, 'i' );
    const usuario = await Usuario.find({
        $or: [{ nombre: regex }, { correo: regex }],
        $and: [{ estado: true }]
    });

    res.json({
        result: usuario
    });

}

// Funcion para buscar productos
const buscarProducto = async (termino = '', res = response) => {

    const isMongoId = ObjectId.isValid(termino);

    if( isMongoId ){
        const producto = await Producto.findById(termino)
                                .populate('categoria', 'nombre');
        
        return res.json({
            results: (producto) ? [ producto ] : []
        });
    }

    const regex = new RegExp( termino, 'i' );
    const producto = await Producto.find( { nombre: regex, estado: true } )
                            .populate('categoria', 'nombre');

    res.json({
        result: producto
    });

}

// Funcion para buscar por categorias
const buscarCategorias = async (termino = '', res = response) => {

    const isMongoId = ObjectId.isValid(termino);

    if( isMongoId ){
        const categoria = await Categoria.findById(termino);
        
        return res.json({
            results: (categoria) ? [ categoria ] : []
        });
    }

    const regex = new RegExp( termino, 'i' );
    const categoria = await Categoria.find( { nombre: regex, estado: true } );

    res.json({
        result: categoria
    });

}

const buscar = (req, res = response) => {

    const { coleccion, termino } = req.params;

    if (!coleccionBusqueda.includes(coleccion) ){
        res.status(401).json({
            msg: `la colecciones de busqueda válidas son: ${coleccionBusqueda}`
        });
    }

    switch (coleccion) {
        case coleccionBusqueda[0]:
            buscarProducto(termino, res);
            break;
        case coleccionBusqueda[1]:
            buscarCategorias(termino, res);
            break;
        case coleccionBusqueda[2]:
            buscarUsuarios(termino, res);
            break;
    
        default:
            res.status(500).json({
                msg: `Falta configurar la busqueda de ${coleccion}`
            })
            break;
    }

}

module.exports = {
    buscar
}