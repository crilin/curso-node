const {request, response} = require('express');

const usuariosGet = (req = request, res = response) => {
    
    const {q,name = 'Sin nombre',apikey,page=1} = req.query;

    res.json({
            msg:'get API - controlador',
            q,
            name,
            apikey,
            page

        })
}

const usuariosPost = (req = request, res) => {

    const {nombre, edad, id} = req.body;
    console.log(req);
    res.status(201).json({
            msg:'post API - controlador',
            nombre,
            edad,
            id
        })
}

const usuariosPut = (req, res) => {

    const {id} = req.params;

    res.json({
            msg:'put API - controlador',
            id
        })
}

const usuariosDelete = (req, res) => {
res.json({

            msg:'delete API - controlador'})
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete

}