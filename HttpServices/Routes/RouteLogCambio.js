var express = require('express');
var router = express.Router();

var routeExample = require('../Models/ModeloLogCambio'); //copiar el modelo de la tabla

routeExample.methods(['get', 'put', 'post', 'delete', 'search']);
routeExample.register(router, '/log_cambio'); //nombre ruta para acceder por web

// Modificar Actividad por id de nodo. 
router.post('/prueba', function (req, res) {
    console.log(req.body);
    
});

//Return route
module.exports = router;