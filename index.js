require('dotenv').config();
const { busquedas } = require("./models/busquedas");
const { leerInput, inquirerMenu, pausa, listarLugares } = require("./utils/inquirer")

const main = async() => {

    const busqueda = new busquedas();
    let opc = 100;
    do {

        opc = await inquirerMenu();

        switch (opc) {
            case 1:
                // Mostrar Mensaje de entrada
                const lugar = await leerInput('Ciudad ');
                
                // buscar los lugares
                const lugares = await busqueda.ciudad( lugar );

                // Seleccionar el lugar
                const id = await listarLugares(lugares);
                if (id ==='0') {
                    continue
                }

                const lugarSel = lugares.find( e => e.id === id);

                // Guardo el lugar en el historial
                busqueda.agregarHistorial(lugar);

                //Clima
                const climaSel = await busqueda.climaLugar(lugarSel.lat, lugarSel.lon);

                // Mostrar Lugar

                console.log('\n Información de la ciudad\n'.magenta);
                console.log('Ciudad: ', lugarSel.nombre);
                console.log('Lat: ', lugarSel.lat);
                console.log('Lng: ', lugarSel.lon);
                console.log('Temperatura: ', climaSel.temp);
                console.log('Minima:', climaSel.min);
                console.log('Máxima:', climaSel.max);
                console.log('información del clima:', climaSel.desc);
                break;
            case 2:
                    // busqueda.historial.forEach((element, index) => {
                    busqueda.historialCapitalizado.forEach((element, index) => {
                    const id = `${index +1}.`.magenta;

                    console.log(`${id} ${element}`);
                });

                break;
        
            default:
                break;
        }
        if (opc !==0) await pausa();

    } while(opc !==0)
}

 main();