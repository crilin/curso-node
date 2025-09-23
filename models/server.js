const express = require('express')
const cors = require('cors');
const { serverController } = require('../sockets/controller');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        
        // Configuración Socket.io
        this.server = require('http').createServer(this.app);
        this.io = require('socket.io')(this.server);
        
        this.paths = {}
        
        // Middleware
        this.middlewares();

        // Rutas de la aplicacion
        this.router();

        this.sockets();
    }

    // Middlewares de la API
    middlewares() {

        //CORS
        this.app.use( cors() );
    
        // Directorio publico
        this.app.use(express.static('public'))

    }

    // Enrutado de los endpoint del API
    router() {

        // this.app.use( this.paths.auth, require('../routes/auth') );
    }

    sockets() {
        this.io.on("connection", serverController);
    }

    // Configuración de la conexion a la API
    listen() {
        
        this.server.listen(this.port, () => {
        console.log(`app listening on port ${this.port}`)
        })
    }
}

/**************************************************************************************** 
 * FIN FUENTES
*****************************************************************************************/
module.exports = Server