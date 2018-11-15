var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = require('../config/config').database;
// const passport = require('passport');
// const jwt = require('jsonwebtoken');

var routeExample = require('../Models/ModeloCaso'); //copiar el modelo de la tabla


routeExample.methods(['get', 'put', 'post', 'delete', 'search']);
routeExample.register(router, '/caso'); //nombre ruta para acceder por web

// casos pendeintes 
router.get('/getAllCasosPendientes', function (req, res) {
    var resultArray = [];
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("angell");
        var casos = dbo.collection("casos").find();

        casos.forEach(function (doc, err) {
            assert.equal(null, err);
            if (doc.data.estado.id == '1')
                resultArray.push(doc);
        }, function () {
            db.close();
            res.send(resultArray);
        });
    });
});

// todos los casos por abogado
router.post('/getAllCasosPorAbogado', function (req, res) {
    var resultArray = [];
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("angell");
        var casos = dbo.collection("casos").find();

        casos.forEach(function (doc, err) {
            assert.equal(null, err);
            if (doc.data.abogado.id == req.body.idAbogado)
                resultArray.push(doc);
        }, function () {
            db.close();
            res.send(resultArray);
        });
    });
});

// todos los casos por abogado y estado
router.post('/getAllCasosPorAbogadoEstado', function (req, res) {
    var resultArray = [];
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("angell");
        var casos = dbo.collection("casos").find();

        casos.forEach(function (doc, err) {
            assert.equal(null, err);
            if (doc.data.abogado.id == req.body.idAbogado && doc.data.estado.id == req.body.idEstado)
                resultArray.push(doc);
        }, function () {
            db.close();
            res.send(resultArray);
        });
    });
});

// Todos los casos de Cliente.
router.post('/getAllCasosPorCliente', function (req, res) {
    var resultArray = [];
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("angell");
        var casos = dbo.collection("casos").find();

        casos.forEach(function (doc, err) {
            assert.equal(null, err);
            if (doc.data.cliente.id == req.body.idCliente)
                resultArray.push(doc);
        }, function () {
            db.close();
            res.send(resultArray);
        });
    });
});

// Todos los casos de Cliente y estado.
router.post('/getAllCasosPorClienteEstado', function (req, res) {
    var resultArray = [];
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("angell");
        var casos = dbo.collection("casos").find();

        casos.forEach(function (doc, err) {
            assert.equal(null, err);
            if (doc.data.cliente.id == req.body.idCliente && doc.data.estado.id == req.body.idEstado)
                resultArray.push(doc);
        }, function () {
            db.close();
            res.send(resultArray);
        });
    });
});

// consulta por estado
router.post('/getAllCasosPorEstado', function (req, res) {
    var resultArray = [];
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("angell");
        var casos = dbo.collection("casos").find();

        casos.forEach(function (doc, err) {
            assert.equal(null, err);
            if (doc.data.estado.id == req.body.id)
                resultArray.push(doc);
        }, function () {
            db.close();
            res.send(resultArray);
        });
    });
});

// consulta por abogado y cliente
router.post('/getAllCasosAbogadoCliente', function (req, res) {
    var resultArray = [];
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("angell");
        var casos = dbo.collection("casos").find();

        casos.forEach(function (doc, err) {
            assert.equal(null, err);
            if (doc.data.cliente.id == req.body.idCliente && doc.data.abogado.id == req.body.idAbogado)
                resultArray.push(doc);
        }, function () {
            db.close();
            res.send(resultArray);
        });
    });
});

// consulta por abogado, cliente y estado
router.post('/getAllCasosAbogadoClienteEstado', function (req, res) {
    var resultArray = [];
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("angell");
        var casos = dbo.collection("casos").find();

        casos.forEach(function (doc, err) {
            assert.equal(null, err);
            if (doc.data.cliente.id == req.body.idCliente && doc.data.abogado.id == req.body.idAbogado && doc.data.estado.id == req.body.idEstado)
                resultArray.push(doc);
        }, function () {
            db.close();
            res.send(resultArray);
        });
    });
});

// consulta por abogado, cliente, estado y fechas
router.post('/getAllCasosAbogadoClienteEstadoFecha', function (req, res) {
    var resultArray = [];
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("angell");
        var casos = dbo.collection("casos").find();
        fib = new Date(req.body.fechaInicio).getTime();
        ffb = new Date(req.body.fechaFin).getTime();
        casos.forEach(function (doc, err) {
            assert.equal(null, err);
            fi = new Date(doc.data.fecha_inicio).getTime();
            ff = new Date(doc.data.fecha_fin).getTime();
            if (doc.data.cliente.id == req.body.idCliente && doc.data.abogado.id == req.body.idAbogado &&
                doc.data.estado.id == req.body.idEstado && fi >= fib && ff <= ffb)
                resultArray.push(doc);
        }, function () {
            db.close();
            res.send(resultArray);
        });
    });
});

// consulta todos los casos pendientes del cliente
router.post('/getAllCasoClientePendiente', function (req, res) {
    var resultArray = [];
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("angell");
        var casos = dbo.collection("casos").find();

        casos.forEach(function (doc, err) {
            assert.equal(null, err);
            if (doc.data.cliente.cedula == req.body.cedula && doc.data.estado.id == '1')
                resultArray.push(doc);
        }, function () {
            db.close();
            res.send(resultArray);
        });
    });
});

// consulta todos los casos pendientes del abogado.
router.post('/getAllCasoAbogadoPendiente', function (req, res) {
    var resultArray = [];
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("angell");
        var casos = dbo.collection("casos").find();

        casos.forEach(function (doc, err) {
            assert.equal(null, err);
            if (doc.data.abogado.cedula == req.body.cedula && doc.data.estado.id == '1')
                resultArray.push(doc);
        }, function () {
            db.close();
            res.send(resultArray);
        });
    });
});


// </editor-fold>

//Return route
module.exports = router;