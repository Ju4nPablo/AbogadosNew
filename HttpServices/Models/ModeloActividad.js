var restful = require('node-restful');
var mongoose = restful.mongoose;


const Actividad = mongoose.Schema({


    actividad_parametros: {
        type: mongoose.Schema.ObjectId,
    },
    codigo_actividad: {
        type: String
    },
    observaciones: {
        type: Array
    },
    responsable: {
        type: mongoose.Schema.ObjectId,
    },
    documento: {
        type: String
    },
    estado_actividad: {
        type: String
    },
    fecha_caducidad: {
        type: Date
    }


});

module.exports = restful.model('Actividad', Actividad);