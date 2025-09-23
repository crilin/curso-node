
// Referencias a HTML
const lblOnline  = document.querySelector('#lblonline');
const lblOffline = document.querySelector('#lbloffline');
const txtMsg     = document.querySelector('#txtMsg');
const btnEnviar  = document.querySelector('#btnEnviar');

const client_socket = io();

// Evento conexión al servidor
client_socket.on( 'connect', () =>{
    // console.log('Conectado');

    lblOnline.style.display  = ''
    lblOffline.style.display = 'none'
});

// Evento desconexión al servidor
client_socket.on( 'disconnect', () =>{
    // console.log('Desconectado del servidor');

    lblOnline.style.display  = 'none'
    lblOffline.style.display = ''
});

// Evento mensaje del servidor
client_socket.on( 'front-mensaje', ( payload ) => {

    console.log('Mensaje desde servidor', payload);
})

// Recibir el valor del input txtMsg
btnEnviar.addEventListener( 'click', () =>{
    
    const mensaje = txtMsg.value;
    const payload = {
        mensaje: mensaje,
        id: '123ABC',
        fecha: new Date().getTime()
    }
    client_socket.emit('enviar-mensaje', payload, ( id ) => {

    console.log('Mensaje desde servidor', id);
});
})