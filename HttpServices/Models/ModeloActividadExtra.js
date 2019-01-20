var restful = require('node-restful');
var mongoose = restful.mongoose;


const Actividad_Extra = mongoose.Schema({
    
    id_actividad_caso: {
        type: String
    },
    caso_numero: {
        type: String
    },
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
    abogado: {
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