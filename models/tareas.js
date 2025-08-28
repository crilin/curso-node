const Tarea = require("./tarea");

class Tareas {

    _listado = {};

    get listadoArr() {
        const listado = [];
        Object.keys(this._listado).forEach( key => {
            const t = this._listado[key];
            listado.push(t);
        })

        return listado
    }

    constructor() {

        this._listado = {};
    }

    crearTarea( desc = '') {

        const t = new Tarea(desc);
        this._listado[t.id] = t;
    }

    cargarTareasFromArr( tareasArr = []) {
        
        tareasArr.forEach( (t) => {
            
            this._listado[t.id] = t;
        })
    }

    listadoTareas() {

        console.log();
        Object.keys(this._listado).forEach((key, index) => {
            
            const t = this._listado[key];
            const id = `${index+1}.-`.blue;
            
            const completada = t.completadoEn ? 'completada'.green : 'pendiente'.red;

            console.log(`${id} ${t.desc} :: ${completada}`);
            
        });

    }

    listadoCompletadasPendiente( completada = true) {
        
        let cont = 1;
        console.log();
        this.listadoArr.forEach( e => {
            
            const {desc, completadoEn} = e;
            const id = `${cont}.-`.blue;
            
            const completadaTxt = completadoEn ? 'completada'.green : 'pendiente'.red;

            if (completada){
                if (completadoEn){
                    console.log(`${id} ${desc} :: ${completadaTxt}`);
                    cont += cont;
                }
            } else {
                if (!completadoEn){
                    console.log(`${id} ${desc} :: ${completadaTxt}`);
                    cont += cont;
                }
            }
            
        })

    }

    borrarTarea(id='') {

        if (this._listado[id]){
            delete this._listado[id];
        }
    }

    toggleCompletadas( ids ) {

        ids.forEach(e => {
            const tarea = this._listado[e];
            if (!tarea.completadoEn){
                tarea.completadoEn = new Date().toISOString();
            }
        });

        this.listadoArr.forEach( e => {
            
            if (!ids.includes(e.id)){
                this._listado[e.id].completadoEn = null;
            }
        });
    }
}

module.exports = Tareas;