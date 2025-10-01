// Referencia HTML
const miFormulario = document.querySelector('form');

miFormulario.addEventListener('submit', event => {

    event.preventDefault();

    const formData = {};

    for(let item of miFormulario.elements ) {

        if( item.name.length > 0 ){
            formData[item.name] = item.value;
        }
    }

    fetch('http://localhost:3500/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(formData)
    })
        .then(resp => resp.json() )
        .then( ( {token, msg } ) => {

            if (msg){
                return console.error( msg );
            }
            
            localStorage.setItem('token', token);
            window.location = 'chat.html';
        })
        .catch( console.warn )
});
