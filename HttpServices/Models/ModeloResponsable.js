var restful = require('node-restful');
var mongoose = restful.mongoose;


const Resposable = mongoose.Schema({


    nombre: {
        type: String
    },
    cedula_responsable: {
        type: String
    },
    estado_responsable: {
        type: String
    },
    direccion: {
        type: String
    },
    mail: {
        type: Date
    },
    telefonos: {
        type: Array
    },
    foto: {
        type: String
    }

});

module.exports = restful.model('Resposable', Resposable);