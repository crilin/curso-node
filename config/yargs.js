const argv = require('yargs')
            .options( {
                    'b': {
                    alias: 'base',
                    description: 'Base para multiplicar',
                    type: 'number',
                    default: 5,
                    demandOption: true
                    },
                    'h': {
                    alias: 'hasta',
                    description: 'cantidad de números a multiplicar',
                    type: 'number',
                    default: 10,
                    demandOption: true
                    },
                       'l': {
                    alias: 'listar',
                    description: 'Listar la tabla de multiplicar por consola',
                    type: 'boolean',
                    default: false
                    }
                })
            .check( (argv, options) => {
                if (isNaN(argv.b)){
                    throw 'la base tiene que ser un número'
                }
                return true;
            })
            .argv;

module.exports = {
    argv
}