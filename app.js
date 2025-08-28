require('colors');
const { inquirerMenu, pausa, leerInput, borrarTareas, confirmar, completarTareas } = require('./utils/inquirer');
const Tareas = require('./models/tareas');
const { guardarBD, leerBD } = require('./utils/driverArchivo');




const main = async() => {
    
    // Variables locales
    let opc = 100;
    const tareas = new Tareas();
    const tareasBD = leerBD();

    if (tareasBD){
        // Se va a leer las tareas guardadas en el archivo
        tareas.cargarTareasFromArr(tareasBD);
    }

    // EJECUCION DEL MENU PRINCIPAL
    do {
    
        opc = await inquirerMenu();
        
        switch (opc) {
            case 1:
                const desc = await leerInput('Descripcion:');
                tareas.crearTarea(desc);
                break;
            case 2:
                tareas.listadoTareas();
                break;
            case 3:
                tareas.listadoCompletadasPendiente(true);
                break;
            case 4:
                tareas.listadoCompletadasPendiente(false);           
                break;
            case 5:
                const ids = await completarTareas(tareas.listadoArr);
                tareas.toggleCompletadas(ids);
                console.log('Tareas Completadas');
                break;
            case 6:
                const id = await borrarTareas(tareas.listadoArr);
                
                if(id !=='0'){

                    const ok = await confirmar('¿Esta seguro?')
                    if (ok) {
                        tareas.borrarTarea(id);
                        console.log('Tarea borrada');
                    }
                }
                break;
        
            default:
                break;
        }


        // Persitir las tareas en un archivo externo
        guardarBD(tareas.listadoArr);

        await pausa();
        
    } while (opc !== 0);

}

main();