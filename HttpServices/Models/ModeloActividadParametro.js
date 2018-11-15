var restful = require('node-restful');
var mongoose = restful.mongoose;


const Actividad_Parameter = mongoose.Schema({

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

module.exports = restful.model('Actividad_Parametrizable', Actividad_Parameter);
/* 
// permite poner icono a al nodo.
expandedIcon: {
    type: String
},
collapsedIcon: {
    type: String
}, */