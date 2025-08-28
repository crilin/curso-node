const { v4 } = require('uuid');

class Tarea {
    
    
    id = '';
    desc = '';
    completadoEn = null;

    constructor( desc ) {

        this.id = v4();
        this.desc = desc;
    }
}

module.exports = Tarea;