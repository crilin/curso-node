const express = require('express')
const cors = require('cors');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios'

        // Middleware
        this.middlewares();

        // Rutas de la aplicacion
        this.router();
    }

    middlewares() {

        //CORS
        this.app.use( cors() );
    
        // Lectura y parseo del Body
        this.app.use( express.json() );

        // Directorio publico
        this.app.use(express.static('public'))
    }

    router() {

        this.app.use( this.usuariosPath, require('../routes/user') );
    }

    listen() {
        
        this.app.listen(this.port, () => {
        console.log(`app listening on port ${this.port}`)
        })
    }
}

module.exports = Server