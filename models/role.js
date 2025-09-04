const { Schema, model } = require("mongoose");



const roleSchema = Schema({
    rol: {
        type: String,
        required: [true, 'El nombre del Rol es obligatorio']
    }
})

module.exports = model('Role', roleSchema)