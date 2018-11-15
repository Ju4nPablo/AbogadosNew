var restful = require('node-restful');
var mongoose = restful.mongoose;


const Flujo_Proceso = mongoose.Schema({

    label: {
        type: String
    },
    data: {
        type: Object
    },
    children: {
        type: Array
    }

});

module.exports = restful.model('Flujo_Proceso', Flujo_Proceso);

/* 
// permite poner icono a al nodo.
expandedIcon: {
    type: String
},
collapsedIcon: {
    type: String
}, */