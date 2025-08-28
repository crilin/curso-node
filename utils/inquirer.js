const inquirer = require('inquirer');
const { validate } = require('uuid');
require('colors');

const preguntas = {
    type: 'list',
    name: 'opcion',
    message: '¿Qué desea hacer?',
    choices: [
        {
            value: 1,
            name: `${'1.'.blue} Crear Tarea`
        },
        {
            value: 2,
            name: `${'2.'.blue} Listar Tareas`
        },
        {
            value: 3,
            name: `${'3.'.blue} Listar Tareas completadas`
        },
        {
            value: 4,
            name: `${'4.'.blue} Listar Tareas pendientes`
        },
        {
            value: 5,
            name: `${'5.'.blue} Completar Tarea(s)`
        },
        {
            value: 6,
            name: `${'6.'.blue} Borrar Tarea`
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
    console.log('=============================='.brightRed)
    console.log('    Seleccione una opción'.yellow);
    console.log('=============================='.brightRed)
    
    const {opcion} = await inquirer.prompt(preguntas);
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
    await inquirer.prompt(pausaOpc);
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
    const {desc} = await inquirer.prompt(question);
    return desc; 

}

/*
* Funcion para mostrar las tareas a eliminar
*/ 
const borrarTareas = async(listaTareas) =>{

    const choices = listaTareas.map((e ,index ) => {

        const idx = `${index + 1}.`.green;
        return {
            value: e.id,
            name: `${idx} ${e.desc}`
        }
    });

    choices.unshift({
        value: '0',
        name: '0. '.green + 'Regresar.'
    });

    const preguntas = {
        type: 'list',
        name: 'borrar',
        message: 'Elija la tarea a borrar',
        choices
    }

    const {borrar} = await inquirer.prompt(preguntas);
    return borrar;
}

/*
* Funcion para mostrar las tareas a eliminar
*/ 
const completarTareas = async(listaTareas) =>{

    const choices = listaTareas.map((e ,index ) => {

        const idx = `${index + 1}.`.green;
        return {
            value: e.id,
            name: `${idx} ${e.desc}`,
            checked: (e.completadoEn) ? true : false
        }
    });

    const pregunta = {
        type: 'checkbox',
        name: 'ids',
        message: 'Seleccione',
        choices
    }

    const {ids} = await inquirer.prompt(pregunta);
    return ids;
}

const confirmar = async(message) => {

    const pregunta = {
        type: 'confirm',
        name: 'ok',
        message
    }

    const {ok} = await inquirer.prompt(pregunta);
    return ok;
}

module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    borrarTareas,
    confirmar,
    completarTareas
}