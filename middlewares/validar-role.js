const { response } = require("express");

// Valida que el usuario tenga Rol Administrador
const isAdminRole = (req, res = response, next) => {
 
    
    if(!req.usuario){
        return res.status(500).json({
            msg: `No se pudo validar el token contacte al administrador`
        });
    }

    const {rol, nombre} = req.usuario;

    if (rol !== 'ADMIN_ROLE'){
        return res.status(401).json({
            msg: `${nombre} no es administrador - No posee permisos`
        });
    }

    next();
}

// Valida que el usuario tenga un rol permitido
const tieneRole = ( ...roles ) => {

    return (req, res = response, next) => {

        if(!req.usuario){
            return res.status(500).json({
                msg: `No se pudo validar el token contacte al administrador`
            });
        }
        
        if (!roles.includes(req.usuario.rol)){
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles ${roles} `
            });
        }

        next();
    }
}

module.exports={
    isAdminRole,
    tieneRole
}