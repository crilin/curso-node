const { crearF } = require('./utils/multiplicar');
const {argv} = require('./config/yargs');


console.clear()

// Forma tradicional de obtener valores de entrada por consola
// Se tiene que invocar con el argumento --base=5
// const [ , , arg3 = 'base=5' ] = process.argv;
// const [, base = 5] = arg3.split('=');
// console.log(process.argv);

// console.log(argv);

// const base = 2;
    
crearF(argv.b, argv.l, argv.h)
    .then( msg => console.log(msg))
    .catch(err => console.log(err));