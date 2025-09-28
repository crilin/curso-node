const { response, request } = require("express");
const { Categoria, Producto } = require('../models');


/*-----------------------------------------------------
 * CREAR PRODUCTO
-------------------------------------------------------*/
/**
 * Creación de producto
 * @param {body} req 
 * @param {msg} res 
 * @returns async JSON con status del crear producto
 */
const productoPOST = async (req= request , res = response) => {

    const { estado, usuario, ...body } = req.body;

    const productoBD = await Producto.findOne({nombre: body.nombre.toUpperCase()});

    if ( productoBD ) {
        return res.status(400).json({
            msg: `El producto ${productoBD.nombre} ya existe`
        })
    }
    
    // generar la data a guardar
    const data = {
        ...body,
        nombre: body.nombre.toUpperCase(),
        usuario: req.usuario._id
    }

    const producto = await new Producto(data);

    // Guardar en BD
    await producto.save();

    res.status(201).json(producto);
}


/*-----------------------------------------------------
 * OBTENER PRODUCTO
-------------------------------------------------------*/
const productosGET = async (req, res = response) => {

    const {size = 5, page = 0} = req.query;

    // Query a la BD
    const query = {estado:true}

    // LLamadas a la BD de manera simultanea
    const [total, productos] = await Promise.all([
        Producto.countDocuments( query ),
        Producto.find( query )
            .populate('usuario', 'nombre')
            .populate('categoria','nombre')
            .skip( Number(page) )
            .limit( Number(size) )
    ]);

    res.json({
            total,
            productos
        });

}

/*-----------------------------------------------------
 * OBTENER PRODUCTO - ID
-------------------------------------------------------*/
const productoGET = async (req = request, res = response) => {

    const { id } = req.params;

    const producto = await Producto.findById(id)
        .populate('usuario', 'nombre')
        .populate('categoria', 'nombre')

    res.status(200).json({
        producto
    })
}

/*-----------------------------------------------------
 * ACTUALIZAR PRODUCTO - ID
-------------------------------------------------------*/
const productoPUT = async (req, res) => {

    const { id } = req.params;
    const { estado, usuario, ...body } = req.body;

    if (body.nombre){        
        const productoBD = await Producto.findOne({nombre: body.nombre.toUpperCase()});
    
        if ( productoBD ) {
            return res.status(400).json({
                msg: `El producto ${productoBD.nombre} ya existe`
            })
        }
        body.nombre = body.nombre.toUpperCase();
    }
    body.usuario = req.usuario._id;

    const producto = await Producto.findByIdAndUpdate(id, body, {new:true})

    res.json({
        producto
    })
}

/*-----------------------------------------------------
 * ACTUALIZAR PRODUCTO - ID
-------------------------------------------------------*/
const productoDELETE = async (req = request, res = response) => {

    const {id} = req.params;

    const productoBorrado = await Producto.findByIdAndUpdate(id, {estado:false}, {new:true});
    
    res.status(200).json({
        productoBorrado
    })
}

module.exports = {
    productoPOST,
    productosGET,
    productoGET,
    productoPUT,
    productoDELETE
}