var restful = require('node-restful');
var mongoose = restful.mongoose;


const Casos = mongoose.Schema({

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

module.exports = restful.model('Casos', Casos);

/* 
// permite poner icono a al nodo.
expandedIcon: {
    type: String
},
collapsedIcon: {
    type: String
}, */