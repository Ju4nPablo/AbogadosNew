var restful = require('node-restful');
var mongoose = restful.mongoose;


const Proceso_Parameter = mongoose.Schema({


    nombre: {
        type: String
    },
    actividades: {
        type: Array
    },
    estado_proceso_parametro: {
        type: String
    },
    default: {
        type: String
    }

});

module.exports = restful.model('Proceso_Parametrizable', Proceso_Parameter);