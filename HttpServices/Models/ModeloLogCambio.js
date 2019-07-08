
var restful = require('node-restful');
var mongoose = restful.mongoose;


const Log_Cambio = mongoose.Schema({

    usuario: {
        type: String
    },
    cedula: {
        type: String
    },
    fecha: {
        type: Date
    },
    transaccion: {
        type: String
    },
    cambio_json: {
        type: Object
    },

});

module.exports = restful.model('Log_Cambio', Log_Cambio);