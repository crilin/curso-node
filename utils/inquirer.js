const inquirer = require('inquirer');
require('colors');

const preguntas = {
    type: 'list',
    name: 'opcion',
    message: '¿Qué desea hacer?',
    choices: [
        {
            value: 1,
            name: `${'1.'.blue} Buscar Ciudad`
        },
        {
            value: 2,
            name: `${'2.'.blue} Historial`
        },
        {
            value: 0,
            name: `${'0.'.blue} Salir`
        },
    ]

}

/**
 * Funcion para mostrar el Menu de opciones
 * @returns 
 */
const inquirerMenu = async() => {

    console.clear();
    console.log('=============================='.cyan)
    console.log('    Seleccione una opción'.magenta);
    console.log('=============================='.cyan)
    
    const prompt = inquirer.createPromptModule();
    const {opcion} = await prompt(preguntas);
    return opcion;
}

/**
 * Funcion para realizar una pausa entre la seleccion de una opcion
 */
const pausa = async() => {
    const pausaOpc = {
        type: 'input',
        name: 'pausa',
        message: `presione ${'ENTER'.green} para continuar`
    }
    
    console.log('\n');
    const prompt = inquirer.createPromptModule();
    await prompt(pausaOpc);
}

/*
* Función para Leer una entrada por consola
*/
const leerInput = async(message) => {

    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate( value ) {
                if( value.lenght === 0 ) {
                    return 'Por favor regresar un valor';
                }
                return true;
            }
        }
    ];


    // Se obtiene el valor del campo name: desc desde consola
    const prompt = inquirer.createPromptModule();
    const {desc} = await prompt(question);
    return desc; 

}

/*
* Funcion para listar los lugares consultados
*/ 
const listarLugares = async(lugares) =>{

    const choices = lugares.map((e ,index ) => {

        const idx = `${index + 1}.`.grey;
        return {
            value: e.id,
            name: `${idx} ${e.nombre}`
        }
    });

    choices.unshift({
        value: '0',
        name: '0. '.gray + 'Regresar.'
    });

    const preguntas = {
        type: 'list',
        name: 'id',
        message: 'Elija un lugar',
        choices
    }
    
    const prompt = inquirer.createPromptModule();
    const {id} = await prompt(preguntas);
    return id;
}


module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listarLugares
}