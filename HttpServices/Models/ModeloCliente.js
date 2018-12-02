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
	estado: {
		type: String
	},
	direccion: {
		type: String
	},
	numeroCarpeta: {
		type: String
	},
	cedula: {
		type: String
	},
	mail: {
		type: String
	},
	telefono: {
		type: String
	},
	foto: {
		type: String
	}

});

module.exports = restful.model('Cliente', Cliente);