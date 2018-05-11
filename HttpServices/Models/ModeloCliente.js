var restful = require('node-restful');
var mongoose = restful.mongoose;


const Cliente = mongoose.Schema({


	nombre: {
		type: String
	},
	sexo: {
		type: String
	},
	codigo_acceso_temporal: {
		type: Array
	},
	estado_cliente: {
		type: String
	},
	direccion: {
		type: String
	},
	cedula_cliente: {
		type: String
	},
	mail: {
		type: Date
	},
	telefonos: {
		type: Array
	}

});

module.exports = restful.model('Cliente', Cliente);