var restful = require('node-restful');
var mongoose = restful.mongoose;


const Proceso = mongoose.Schema({



    nombre: {
        type: String
    },
    proceso_parametro: {
        type: mongoose.Schema.ObjectId,
    },
    actividades: {
        type: Array
    },
    estado_proceso: {
        type: String
    },
    fecha_max: {
        type: Date
    },

    codigo_proceso: {
        type: String
    },
    responsable: {
        type: mongoose.Schema.ObjectId,
    },
    cliente: {
        type: mongoose.Schema.ObjectId,
    },
    valor: {
        type: Number
    }
});

module.exports = restful.model('Proceso', Proceso);