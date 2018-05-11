var restful = require('node-restful');
var mongoose = restful.mongoose;


const Actividad_Parameter = mongoose.Schema({


    titulo: {
        type: String
    },
    dias_maximo: {
        type: Number
    },
    dias_amarillo: {
        type: Number
    },
    dias_rojo: {
        type: Number
    },
    descripcion: {
        type: String
    },
    estado_actividad_parametro: {
        type: String
    }
    

});

module.exports = restful.model('Actividad_Parametrizable', Actividad_Parameter);