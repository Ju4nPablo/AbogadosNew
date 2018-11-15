var restful = require('node-restful');
var mongoose = restful.mongoose;


const Actividad_Extra = mongoose.Schema({

    actividad: {
        type: String
    },
    fecha_inicio: {
        type: Date
    },
    fecha_fin: {
        type: Date
    },
    prioridad: {
        type: String
    },
    encargado: {
        type: mongoose.Schema.ObjectId,
    },
    hora_inicio: {
        type: String,
    },
    hora_fin: {
        type: String,
    },
    repetir: {
        type: String
    },
    recordatorio: {
        type: String
    }
});

module.exports = restful.model('Actividad_Extra', Actividad_Extra);