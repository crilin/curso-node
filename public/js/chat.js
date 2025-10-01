
const url = ( window.location.hostname.includes('localhost') )
            ? 'http://localhost:3500/api/auth' : 'URL_PROD'

let usuario = null;
let socket = null;

// Referencia a HTML
const txtUid     = document.querySelector('#txtUid');
const txtMsg     = document.querySelector('#txtMsg');
const ulUsuarios = document.querySelector('#ulUsuarios');
const ulMensajes = document.querySelector('#ulMensajes');
const btnSalir   = document.querySelector('#btnSalir');

// Validar el Token actual
const validarJWT = async() => {

    const token = localStorage.getItem('token') || '';

    if ( token.length <=10 ) {
        window.location = 'index.html';
        throw new Error('No hay token en el servidor');
    }

    const resp = await fetch (url, {
        headers: { 'x-token': token }
    });


    const {usuario: userDB, token: tokenDB } = await resp.json();
    
    localStorage.setItem('token', tokenDB);
    usuario = userDB;
    document.title = usuario.nombre;

    await conectarSocket();
}

const conectarSocket = async() => {

    socket = io({
        'extraHeaders': {
            'x-token': localStorage.getItem('token')
        }
    });

    socket.on('connect', () =>{
        console.log('Socket online');
    });

    socket.on('disconnect', () =>{
        console.log('Socket offline');
    });

    socket.on('recibir-mensajes', dibujarMensajes );

    socket.on('usuarios-activos', dibujarUsuarios );

    socket.on('mensaje-privado', (payload) =>{
        //TODO
        console.log(payload);
    });
}

const dibujarUsuarios = (usuarios = []) => {

    let usersHtml = '';
    usuarios.forEach( ({nombre, uid }) => {
        usersHtml += `
            <li>
                <p>
                    <h5 class="text-success"> ${ nombre } </h5>
                    <span class="fs-6 text-muted">${uid} </span>
                </p>
            </li>
        `;
    });

    ulUsuarios.innerHTML = usersHtml;
}

const dibujarMensajes = (mensajes = []) => {

    let mensajesHtml = '';
    mensajes.forEach( ({nombre, mensaje }) => {
        mensajesHtml += `
            <li>
                <p>
                    <span class="text-primary"> ${ nombre }: </span>
                    <span>${mensaje} </span>
                </p>
            </li>
        `;
    });

    ulMensajes.innerHTML = mensajesHtml;
}

// agrego un evento cuando una tecla es soltada
txtMsg.addEventListener('keyup', ({ keyCode }) => {
    
    const mensaje = txtMsg.value;
    const uid     = txtUid.value;

    if ( keyCode !== 13 ){ return; }

    if ( mensaje.length === 0 ) { return; }

    // const mensajeTrim = mensaje.trim();
    socket.emit('enviar-mensaje', { mensaje, uid });

    txtMsg.value = '';
});

btnSalir.addEventListener('click', () =>{
    
    localStorage.clear();
    window.location = 'index.html';
    
});

const main = async() => {
    await validarJWT();
}

main();
