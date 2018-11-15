var restful = require('node-restful');
var mongoose = restful.mongoose;


const Abogado = mongoose.Schema({

    nombre: {
        type: String
    },
    sexo: {
        type: String
    },
    codigo_acceso_temporal: {
        type: Array
    },
    estado: {
        type: String
    },
    direccion: {
        type: String
    },
    cedula: {
        type: String
    },
    mail: {
        type: String
    },
    telefono: {
        type: String
    },
    foto: {
        type: String
    }

});

module.exports = restful.model('Abogado', Abogado);