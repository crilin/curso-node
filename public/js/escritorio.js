// Referencias a HTML
const lblEscritorio = document.querySelector('h1');
const btnAtender = document.querySelector('button');
const divAlert =  document.querySelector('#alert');
const lblSmall =  document.querySelector('small');
const lblPendientes =  document.querySelector('#lblPendientes');



const searchParams = new URLSearchParams( window.location.search);

if ( !searchParams.has('escritorio') ) {
    window.location ='index.html';
    throw new Error('El escritorio es obligatorio');
}

const escritorio = searchParams.get('escritorio');
lblEscritorio.innerText = escritorio;
divAlert.style.display = 'none';

const socket = io();


socket.on('connect', () => {
    
    btnAtender.disabled = false;
});

socket.on('disconnect', () => {

    btnAtender.disabled = true;

});
     
socket.on('tickets-pendientes', (payload) =>{
    if(payload===0){
        divAlert.style.display = '';
        divAlert.innerText = 'Sin tickets por asignar';
        btnAtender.disabled = true;   
    } else {
        btnAtender.disabled = false;
        divAlert.style.display = 'none';
    }
    lblPendientes.innerText = payload;
});

btnAtender.addEventListener( 'click', ( ) => {
    
    socket.emit('atender-ticket', {escritorio}, ({ok, msg, ticket, pendiente})=>{
        
        // Esta validación solo ocurre si hubo un error al enviar el escritorio
        if(!ok){
            
            lblSmall.innerText = `Nadie.`;
            divAlert.innerText = msg;
            return divAlert.style.display = '';
        }
        
        lblPendientes.innerText = pendiente;
        lblSmall.innerText = `ticket ${ticket.numero}`;
    
    });

});