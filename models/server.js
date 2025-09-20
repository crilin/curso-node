const express = require('express')
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.paths = {
            auth:       '/api/auth',
            buscar:     '/api/buscar',
            categorias: '/api/categorias',
            productos:  '/api/productos',
            usuarios:   '/api/usuarios'
        }

        // Conectar con la Base de Datos
        this.conectarDB();

        // Middleware
        this.middlewares();

        // Rutas de la aplicacion
        this.router();
    }

    // Función para conectar a MongoDB
    async conectarDB() {
        await dbConnection();
    } 

    // Middlewares de la API
    middlewares() {

        //CORS
        this.app.use( cors() );
    
        // Lectura y parseo del Body
        this.app.use( express.json() );

        // Directorio publico
        this.app.use(express.static('public'))
    }

    // Enrutado de los endpoint del API
    router() {

        this.app.use( this.paths.auth, require('../routes/auth') );
        this.app.use( this.paths.buscar, require('../routes/buscar') );
        this.app.use( this.paths.categorias, require('../routes/categorias') );
        this.app.use( this.paths.productos, require('../routes/productos') );
        this.app.use( this.paths.usuarios, require('../routes/user') );
    }

    // Configuración de la conexion a la API
    listen() {
        
        this.app.listen(this.port, () => {
        console.log(`app listening on port ${this.port}`)
        })
    }
}

module.exports = Server