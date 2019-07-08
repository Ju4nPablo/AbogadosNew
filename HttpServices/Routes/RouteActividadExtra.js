var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = require('../Config/config').database;
var ObjectID = require('mongodb').ObjectID;
const ModelActividad = require('../Models/ModeloActividadExtra'); //copiar el modelo de la tabla

ModelActividad.methods(['get', 'put', 'post', 'delete', 'search']);
ModelActividad.register(router, '/actividad_extra'); //nombre ruta para acceder por web

// Modificar Actividad por id de nodo. 
router.post('/updateActividad', function (req, res) {
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
        if (err) throw err;
        req.body.abogado = ObjectID(req.body.abogado);
        var dbo = db.db("angell");
        dbo.collection("actividad_extras").updateOne({ 'id_actividad_caso': req.body.id_actividad_caso }, { $set: req.body }, (err, actividadUpdate) => {
            if (err) {
                res.status(500).send({ message: "Error al actualizar" });
                db.close();
            } else {
                if (!actividadUpdate) {
                    res.status(500).send({ message: "No se pudo actualizar" });
                    db.close();
                } else {
                    res.status(200).send({ actividad: actividadUpdate });
                    db.close();
                }
            }
        });
    });
});

// Eliminar Actividad solo en cambio de estado por id de nodo. 
router.post('/deleteActividadEstado', function (req, res) {
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
        if (err) throw err;
        let datos = {
            estado: req.body.estado,
            prioridad: req.body.prioridad
        }
        var dbo = db.db("angell");
        dbo.collection("actividad_extras").updateOne({ '_id': ObjectID(req.body.id) }, { $set: datos }, (err, actividadUpdate) => {
            if (err) {
                res.status(500).send({ message: "Error al actualizar" });
                db.close();
            } else {
                if (!actividadUpdate) {
                    res.status(500).send({ message: "No se pudo actualizar" });
                    db.close();
                } else {
                    res.status(200).send({ actividad: actividadUpdate });
                    db.close();
                }
            }
        });
    });
});

// Eliminar Actividad por id de nodo. 
router.post('/deleteActividad', function (req, res) {
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db("angell");
        var x = dbo.collection("actividad_extras").remove({ 'id_actividad_caso': req.body.id_actividad_caso });
        db.close();
    });
});

router.post('/getAllActividadesPorCedula', function (req, res) {
    var resultArray = [];
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db("angell");
        dbo.collection('abogados').findOne({ "cedula": req.body.cedula }, function (err, abogado) {
            assert.equal(null, err);
            var actividadesExtras = dbo.collection("actividad_extras").find({ 'abogado': ObjectID(abogado._id) });
            actividadesExtras.forEach(function (doc, err) {
                assert.equal(null, err);
                resultArray.push(doc);
            }, function () {
                db.close();
                res.send(resultArray);
            });
        });
    });
});

router.post('/getAllActividadesPorUsuario', function (req, res) {
    var resultArray = [];
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db("angell");
        var listActividades = dbo.collection('actividad_extras').find({ "id_user": ObjectID(req.body.id_user) });
        listActividades.forEach(function (doc, err) {
            assert.equal(null, err);
            resultArray.push(doc);
        }, function () {
            db.close();
            res.send(resultArray);
        });
    });
});

router.post('/getAllActividadesPorCedulaUsuario', function (req, res) {
    var resultArray = [];
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db("angell");
        dbo.collection('abogados').findOne({ "cedula": req.body.cedula }, function (err, abogado) {
            assert.equal(null, err);
            var actividadesExtras = dbo.collection("actividad_extras").find({ $or: [{ 'abogado': ObjectID(abogado._id) }, { "id_user": ObjectID(req.body.id_user) }] });
            actividadesExtras.forEach(function (doc, err) {
                assert.equal(null, err);
                resultArray.push(doc);
            }, function () {
                db.close();
                res.send(resultArray);
            });
        });
    });
});

module.exports = router;