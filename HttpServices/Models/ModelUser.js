/**
 * Created by xaipo on 3/15/2018.
 */
'use strict'


var restful = require('node-restful');
var mongoose = restful.mongoose;


var UserSchema = new mongoose.Schema({

    /* user_name: String,
    password: String,
    estado: Number,
    tipo: String, */

	user_name: {
		type: String
	},
	password: {
		type: String
	},
	cedula: {
		type: String
	},
	nombres: {
		type: String
	},
	apellidos: {
		type: String
	},
	mail: {
		type: String
	},
	estado: {
		type: String
	},
	tipo: {
		type: String
	}

}, { collection: 'user' });

module.exports = restful.model('User', UserSchema);