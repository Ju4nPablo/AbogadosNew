/**
 * Created by xaipo on 3/15/2018.
 */
'use strict'
var express = require('express');
var UserController = require('../Controllers/UserController');
var bcrypt = require('bcrypt-nodejs');
var api = express.Router();
var mdAuth = require('../Middlewares/authenticated');

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = require('../Config/config').database;

//modelos

var User = require('../Models/ModelUser');

//acciones

//service jwt

var jwt = require('../Services/jwt');

//routes

//api.get('/test', UserController.test());
api.get('/test', mdAuth.ensureAut, (req, res) => {
    res.status(200).send({
        message: 'Test Controller'
    });
});
//save user
api.post('/saveUser', (req, res) => {
    //crear objeto
    var user = new User();
    //params
    if (req.body.user_name && req.body.password && req.body.estado && req.body.tipo) {
        user.user_name = req.body.user_name;
        user.password = req.body.password;
        user.cedula = req.body.cedula;
        user.mail = req.body.mail;
        user.estado = req.body.estado;
        user.tipo = req.body.tipo;
        user.nombres = req.body.nombres;
        user.apellidos = req.body.apellidos;
        bcrypt.hash(user.password, null, null, function (err, hash) {
            user.password = hash;
            user.save((err, userStored) => {
                if (err) {
                    res.status(500).send({ message: 'Error al guardar el usuario' });
                } else {
                    if (!userStored) {
                        res.status(404).send({ message: 'No se ha registrado el usuario' })
                    } else {
                        res.status(200).send({ user: userStored });
                    }
                }
            })
        });

    } else {
        res.status(401).send({ message: 'Llenar los parametros de forma adecuada' })
    }

});

// Modificar user
api.post('/updateUserPassword', (req, res) => {
    //crear objeto
    var userDatos = {};
    //params
    if (req.body.password && req.body.estado && req.body.tipo) {
        var id = req.body._id;
        userDatos.user_name = req.body.user_name;
        userDatos.password = req.body.password;
        userDatos.cedula = req.body.cedula;
        userDatos.mail = req.body.mail;
        userDatos.estado = req.body.estado;
        userDatos.tipo = req.body.tipo;
        userDatos.nombres = req.body.nombres;
        userDatos.apellidos = req.body.apellidos;
        bcrypt.hash(userDatos.password, null, null, function (err, hash) {
            userDatos.password = hash;
            User.findByIdAndUpdate(id, userDatos, { new: true }, (err, userUpdated) => {
                if (err) {
                    res.status(500).send({ message: "Error al actualizar" });
                } else {
                    if (!userUpdated) {
                        res.status(500).send({ message: "No se pudo actualizar" });
                    } else {
                        res.status(200).send({ user: userUpdated });
                    }
                }
            })
        });

    } else {
        res.status(401).send({ message: 'Llenar los parametros de forma adecuada' })

    }
});

//login

api.post('/login', (req, res) => {
    var user = new User();
    if (req.body.user_name && req.body.password) {

        User.findOne({ user_name: req.body.user_name, estado: 1 }, (err, issetUser) => {

            if (err) {
                res.status(500).send({ message: 'Error al guardar el usuario' });
            } else {
                if (!issetUser) {
                    res.status(404).send({ message: 'No se ha registrado el usuario' })
                } else {
                    bcrypt.compare(req.body.password, issetUser.password, (err, check) => {

                        if (check) {
                            console.log(req.body.token)
                            var aux = req.body.token == "true";
                            if (aux) {
                                res.status(200).send({
                                    token: jwt.createToken(issetUser)
                                })
                            } else {
                                res.status(200).send({ user: issetUser });
                            }
                        } else {
                            res.status(404).send({ message: 'Error login' });
                        }

                    });
                }
            }

        })

    } else {
        res.status(401).send({ message: 'Llenar los parametros de forma adecuada' })
    }
});

/*los url debe tener este formato para que funcione localhost:3001/api/updateUser/5aab2bdd16991a4d482007b2*/
api.put('/updateUser/:id', mdAuth.ensureAut, (req, res) => {
    var userId = req.params.id;
    if (userId != req.user.sub) {
        return res.status(500).send({ messsage: "no tiene permiso para actualizar el usuario" })
    }
    //el new true hace que traiga el objeto nuevo para traer el objeto anterio debe quitarse eso
    User.findByIdAndUpdate(userId, req.body, { new: true }, (err, userUpdated) => {
        if (err) {
            res.status(500).send({ message: "Error al actualizar" });
        } else {
            if (!userUpdated) {
                res.status(500).send({ message: "No se pudo actualizar" });
            } else {
                res.status(200).send({ user: userUpdated });
            }
        }
    })
});


module.exports = api;