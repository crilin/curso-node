const path = require('path');
const { v4: uuidv4 } = require('uuid');

const subirArchivo = (files, extensionesValidas=[ 'png', 'jpg', 'jpeg', 'gif'], carpeta = '' ) => {

    return new Promise( (resolve, reject) =>{
        const { archivo } = files;
        const nombreCortado = archivo.name.split('.');
        const extension = nombreCortado[ nombreCortado.length -1 ];

        if (!extensionesValidas.includes( extension )) {
            return reject(`La extensión ${extension} no está permitida, ${extensionesValidas}`);
        }

        const nombreAux = uuidv4() + '.' + extension;
        const uploadPath = path.join(__dirname, '../uploads/', carpeta, nombreAux ) ;

        archivo.mv(uploadPath, (err) => {

            if (err) {
                reject({ error })
            }

            resolve( nombreAux );
        });
    })
}

module.exports = {
    subirArchivo
}

