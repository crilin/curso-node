const axios = require('axios');

const bd = require('../utils/driverArchivo');

class busquedas {
    
    historial = [];

    get historialCapitalizado() {

        return this.historial.map( e => {
            
            let arrayE = e.split(' ');
            arrayE = arrayE.map( p => p[0].toUpperCase() + p.substring(1) );
            // for (let i=0; i< arrayE.length; i++){

            //     newS = newS + arrayE[i][0].toUpperCase() + arrayE[i].substring(1) + " ";
            // }
            return arrayE.join(' ');
        })
    }

    // LA API LOCATIONIQ fue la utilizada par obtener la info de las ciudades
    // Dirección de referencia https://docs.locationiq.com/reference/search 
    get paramsLocationIQ() {
        return {
            'format':'json',
            'addressdetails':1,
            'statecode':1,
            'limit':5,
            'accept-language':'es',
            'key':process.env.LOCATIONIQ_KEY
        }
    }

    // API OPENWEATHER para obtener la información del clima
    // direccion de referencia https://openweathermap.org/current
    get paramsOW() {
        return {
            appid: process.env.OPENWEATHER_KEY,
            units: 'metric',
            lang: 'es'
        }
    } 

    constructor() {
        this.historial = bd.leerBD();
    }


    async ciudad (lugar = '') {

        try {
            
            const instance = axios.create({
                baseURL: `https://us1.locationiq.com/v1/search?q=${lugar}`,
                params: this.paramsLocationIQ
            })

            const resp = await instance
            .get();
            
            return resp.data.map( lugar => ({
                id: lugar.place_id,
                nombre: lugar.display_name,
                lat: lugar.lat,
                lon: lugar.lon,
                country_code: lugar.address.country_code
            }));
            
        } catch (err) {
            throw err;
        }
    }

    async climaLugar (lat, lon) {

        
        try {
            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: {...this.paramsOW, lat, lon}
            });

            const resp = await instance.get();
            const {weather, main} = resp.data;

            return {
                desc: weather[0].description,
                min: main.temp_min,
                max: main.temp_max,
                temp: main.temp
            };

        } catch (error) {
            console.error(error);
        }
    }

    agregarHistorial (lugar='') {

        if ( this.historial.includes(lugar) ) {
            return ;
        }

        this.historial.unshift( lugar.toLowerCase() );
        bd.guardarBD(this.historial);
    }

    leerBD() {

    }

}

module.exports = {
    busquedas
}