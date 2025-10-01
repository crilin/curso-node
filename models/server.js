const express = require('express')
const cors = require('cors');
const fileUpload = require('express-fileupload');
const { dbConnection } = require('../database/config');
const socketController = require('../socket/controller');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.server = require('http').createServer(this.app);
        this.io     = require('socket.io')(this.server);



        this.paths = {
            auth:       '/api/auth',
            buscar:     '/api/buscar',
            categorias: '/api/categorias',
            productos:  '/api/productos',
            usuarios:   '/api/usuarios',
            uploads:    '/api/uploads'
        }

        // Conectar con la Base de Datos
        this.conectarDB();

        // Middleware
        this.middlewares();

        // Rutas de la aplicacion
        this.router();

        //sockets
        this.sockets();
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

        // Carga de archivos
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));
    }

    // Enrutado de los endpoint del API
    router() {

        this.app.use( this.paths.auth, require('../routes/auth') );
        this.app.use( this.paths.buscar, require('../routes/buscar') );
        this.app.use( this.paths.categorias, require('../routes/categorias') );
        this.app.use( this.paths.productos, require('../routes/productos') );
        this.app.use( this.paths.usuarios, require('../routes/user') );
        this.app.use( this.paths.uploads, require('../routes/uploads') );
    }

    sockets() {
        this.io.on('connection', (socket) => socketController(socket, this.io) );
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