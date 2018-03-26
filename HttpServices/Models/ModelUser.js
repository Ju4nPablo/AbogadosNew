/**
 * Created by xaipo on 3/15/2018.
 */
'use strict'

var mongoose = require('mongoose');

var Schema= mongoose.Schema;

var UserSchema= Schema({

    user_name: String,
    password: String,
    estado: Number,
    tipo: String,

},{collection: 'user'});

module.exports= mongoose.model('User',UserSchema);