const {Schema, model} = require('mongoose');

const userSchema = Schema({
    nombre:{
        type: String,
        required: [true,'El nombre es obligatorio']
    },
    correo:{
        type: String,
        required: [true,'El correo es obligatorio'],
        unique: true
    },
    password:{
        type: String,
        required: [true,'la contraseña es obligatorio']
    },
    img:{
        type: String
    },
    rol:{
        type: String,
        required: true
    },
    estado:{
        type: Boolean,
        default: true
    },
    google:{
        type: Boolean,
        default: false
    },
    
})

userSchema.methods.toJSON = function() {
    const { __v, password, ...usuario } = this.toObject();
    return usuario
}

module.exports = model('Usuario', userSchema)