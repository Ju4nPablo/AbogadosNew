var express = require('express');
var router = express.Router();


// </editor-fold>
// <editor-fold defaultstate="collapsed" desc="Modelos">
var routeExample = require('../Models/ModelUser'); //copiar el modelo de la tabla

// </editor-fold>

// <editor-fold defaultstate="collapsed" desc="Obtener Productos">
/*router.get('/productos',function(req,res){
 res.send("ingresa api");
 });*/


routeExample.methods(['get', 'put', 'post', 'delete', 'search']);
routeExample.register(router, '/user'); //nombre ruta para acceder por web



// </editor-fold>

//Return route
module.exports = router;