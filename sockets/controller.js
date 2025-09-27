const TicketControl = require("../models/ticket-control");


const ticketControl = new TicketControl();

const serverController = (socket) => {

        // Se envia el ultimo ticket activo
        socket.emit('ultimo-ticket',  ticketControl.ultimo);
        // Se envia los ultimos 4 tickets atendidos
        socket.emit('estado-actual', ticketControl.ultimos4);

        socket.emit('tickets-pendientes', ticketControl.tickets.length);

        // Se recibe un nuevo ticket del cliente
        socket.on('siguiente-ticket', (payload, callback) =>{
            
            const siguiente = ticketControl.siguiente();
            callback( siguiente) ;

            //La cantidad de tickets sin atender
            socket.broadcast.emit('tickets-pendientes', ticketControl.tickets.length);

        })

        socket.on('atender-ticket', ({escritorio}, callback) =>{

            if(!escritorio){
                return callback({
                    ok: false,
                    msg: 'El escritorio es obligatorio'
                })
            } 

            const ticket = ticketControl.atenderTicket( escritorio );
            
            // Se notifica la nueva asignacion de los tickets
            socket.broadcast.emit('estado-actual', ticketControl.ultimos4);
            socket.emit('tickets-pendientes', ticketControl.tickets.length);
            socket.broadcast.emit('tickets-pendientes', ticketControl.tickets.length);

            
            if (!ticket) {
                callback({
                    ok: false,
                    msg: 'No quedan tickets por atender',
                    pendiente: 0
                });
            } else {
                callback({
                    ok: true,
                    ticket,
                    pendiente: ticketControl.tickets.length
                });
            }
        });

    }

module.exports = {
    serverController
}