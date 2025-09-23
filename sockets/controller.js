

const serverController = (socket) => {
        console.log('Cliente conectado', socket.id);

        socket.on("disconnect", (reason) => {
            console.log("Cliente Desconectado", socket.id);
        });

        socket.on('enviar-mensaje', (payload, callback) =>{
            
            const id = '125864';
            callback (id);

            socket.broadcast.emit('front-mensaje', payload);
        })
    }

module.exports = {
    serverController
}