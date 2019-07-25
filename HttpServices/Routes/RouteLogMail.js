var express = require('express');
var router = express.Router();

var routeExample = require('../Models/ModeloLogMail'); //copiar el modelo de la tabla

routeExample.methods(['get', 'put', 'post', 'delete', 'search']);
routeExample.register(router, '/log_mail'); //nombre ruta para acceder por web


//Return route
module.exports = router;