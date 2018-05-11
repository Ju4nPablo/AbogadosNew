var restful = require('node-restful');
var mongoose = restful.mongoose;


const Cobro = mongoose.Schema({



    id_proceso: {
        type: Array
    },
    valor_inicial: {
        type: Number
    },
    estado_cobro: {
        type: String
    },
    valor_actual_pagado: {
        type: String
    },
    fecha_pago_inicial: {
        type: Date
    },

    fecha_pago_final: {
        type: Date
    },
    usuario: {
        type: mongoose.Schema.ObjectId,
    }
});

module.exports = restful.model('Cobro', Cobro);