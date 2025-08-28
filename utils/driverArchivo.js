const fs = require('fs');

const uri = './bd/data.json';

const guardarBD = (data) =>{


    fs.writeFileSync(uri, JSON.stringify(data));
}

const leerBD = () => {
    
    if ( !fs.readFileSync(uri) ){
        return null;
    }

    const dataRaw = fs.readFileSync(uri, {encoding: 'utf-8'});

    const data = JSON.parse(dataRaw);

    return data;
}


module.exports = { 
    guardarBD,
    leerBD
 }