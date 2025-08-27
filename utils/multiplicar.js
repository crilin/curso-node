const fs = require('fs');
const colors = require('colors');

const crearArchivo = async(base = 5, listar, n = 10) => {

    try {
        let data = `====================\n    Tabla del: ${base}\n====================\n\n`;
        let title = "";

        for ( let i = 1; i <= n; i++){
            data += `${base} x ${i} = ${base * i}\n`;
            title += `${base} ${'x'.blue} ${i} ${'='.blue} ${base * i}\n`;
        }

        if (listar) {
            console.log('===================='.brightRed)
            console.log('    Tabla del:'.green, colors.brightGreen.underline(base));
            console.log('===================='.brightRed)
            console.log(title);
        }
        
        fs.writeFileSync(`salida\\tabla-${base}.txt`, data);
        
        return `tabla-${base}.txt se ha creado con exito`.rainbow;
    } catch (err) {
        throw err;
    }
}

module.exports = {
    crearF: crearArchivo
}