
function handleCredentialResponse(response) {

    // console.log("Encoded JWT ID token: " + response.credential);

    // const id_token = response.credential
    const body = { id_token: response.credential }

    // const responsePayload = decodeJWT(response.credential);

    // console.log("Decoded JWT ID token fields:");
    // console.log("  Full Name: " + responsePayload.name);
    // console.log("  Given Name: " + responsePayload.given_name);
    // console.log("  Family Name: " + responsePayload.family_name);
    // console.log("  Unique ID: " + responsePayload.sub);
    // console.log("  Profile image URL: " + responsePayload.picture);
    // console.log("  Email: " + responsePayload.email);

    fetch('http://localhost:3500/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(body)
    })
        .then(resp => resp.json() )
        .then( ( { token, usuario } ) => {
            
            localStorage.setItem('g_email', usuario.correo )
            localStorage.setItem('token', token);
            window.location = 'chat.html';
        })
        .catch( console.warn )
}

// Funcion para decodificar el Token
function decodeJWT(token) {

    let base64Url = token.split(".")[1];
    let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    let jsonPayload = decodeURIComponent(
        atob(base64)
        .split("")
        .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    return JSON.parse(jsonPayload);
}


// Maneja el cierre de sesión
function google_signout() {

    console.log(google.accounts.id);
    google.accounts.id.disableAutoSelect();
    
    google.accounts.id.revoke( localStorage.getItem('g_email'), done => {
        localStorage.clear();
        location.reload();
    })
}

