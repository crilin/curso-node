require('colors');

const mostrarMenu = () => {

    return new Promise(resolve => {
        
        console.clear();
        console.log('=============================='.brightRed)
        console.log('    Seleccione una opción'.brightRed);
        console.log('=============================='.brightRed)
                    
        console.log(`${'1.'.blue} Crear Tarea`);
        console.log(`${'2.'.blue} Listar Tareas`);
        console.log(`${'3.'.blue} Listar Tareas  completadas`);
        console.log(`${'4.'.blue} Listar Tareas pendientes`);
        console.log(`${'5.'.blue} Completar Tareas(s)`);
        console.log(`${'6.'.blue} Borrar Tarea`);
        console.log(`${'0.'.blue} Salir \n`);
    
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
    
        readline.question('Seleccione una opción: ', (opc) => {
            readline.close();
            resolve(opc);
        })
    })
}

const pausa = () => {

    return new Promise(resolve => {
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });

        readline.question(`\n presione ${'ENTER'.green} para continuar\n`, (opc) => {
        readline.close();

        resolve();
    })        
    })

}
module.exports = {
    mostrarMenu,
    pausa
}