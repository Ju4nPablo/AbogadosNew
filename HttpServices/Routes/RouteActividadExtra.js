var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = require('../Config/config').database;

var routeExample = require('../Models/ModeloActividadExtra'); //copiar el modelo de la tabla



routeExample.methods(['get', 'put', 'post', 'delete', 'search']);
routeExample.register(router, '/actividad_extra'); //nombre ruta para acceder por web

// Modificar Actividad por id de nodo. 
router.post('/updateActividad', function (req, res) {
    console.log(req.body);
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("angell");
        var casos = dbo.collection("actividad_extras").update({ 'id_actividad_caso': req.body.id_actividad_caso }, req.body);
    });
});

// Eliminar Actividad por id de nodo. 
router.post('/deleteActividad', function (req, res) {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("angell");
        var x = dbo.collection("actividad_extras").remove({ 'id_actividad_caso': req.body.id_actividad_caso });
    });
});


module.exports = router;