require('dotenv').config();
const express = require('express');
const hbs = require('hbs');


const app = express();
const port = process.env.PORT;

const htmlText = {
        nombre: 'Enrique josé Talavera',
        titulo: 'Curso Node Webserver'
    }

// handlebars
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');

// Servir contenido estatico
app.use(express.static('public'))

app.get('/', function(req, res) {
    
    res.render('home',{
        nombre: 'Enrique josé Talavera',
        titulo: 'Curso Node Webserver'
    })
})

app.get('/generic', function(req, res) {
    
    res.render('generic',htmlText)
})

app.get('/elements', function(req, res) {
    
    res.render('elements', htmlText)
})

app.get('/*splat', function(req, res) {
    
    res.sendFile(__dirname + '/public/404.html')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

console.log(`Escuchando por el puerto ${port}`);
