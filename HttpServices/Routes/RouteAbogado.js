var express = require('express');
var router = express.Router();

var routeExample = require('../Models/ModeloAbogado'); //copiar el modelo de la tabla

routeExample.methods(['get', 'put', 'post', 'delete', 'search']);
routeExample.register(router, '/abogado'); //nombre ruta para acceder por web



// </editor-fold>

//Return route
module.exports = router;